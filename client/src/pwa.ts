/** Đăng ký service worker để app chạy offline và tự cập nhật. */
export async function setupPwa(): Promise<void> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator) || import.meta.env.DEV) return;
  try {
    const { registerSW } = await import('virtual:pwa-register');
    registerSW({ immediate: true });
  } catch {
    /* offline là tuỳ chọn */
  }
}
