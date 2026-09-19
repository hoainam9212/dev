import { Capacitor } from '@capacitor/core';

/** Caches written by older app versions that must not be served any more. */
export const LEGACY_CACHES = ['content'];

async function deleteCaches(names: string[] | null): Promise<void> {
  if (typeof caches === 'undefined') return;
  const keys = await caches.keys();
  await Promise.all(keys.filter((k) => names === null || names.includes(k)).map((k) => caches.delete(k)));
}

/**
 * Web: register the service worker (offline support, auto-update) and drop legacy caches.
 * Native app: content ships inside the APK, so remove any service worker and its caches —
 * otherwise an app update could keep showing lessons from the old cache.
 */
export async function setupPwa(): Promise<void> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
  try {
    if (Capacitor.isNativePlatform()) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));
      await deleteCaches(null);
      return;
    }
    await deleteCaches(LEGACY_CACHES);
    const { registerSW } = await import('virtual:pwa-register');
    registerSW({ immediate: true });
  } catch {
    /* offline support is optional */
  }
}
