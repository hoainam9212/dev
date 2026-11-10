import { useCallback, useSyncExternalStore } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Chrome/Edge bắn 'beforeinstallprompt' ngay lúc tải trang, trước khi người học mở Cài đặt: phải bắt ở cấp module.
let deferred: BeforeInstallPromptEvent | null = null;
const subs = new Set<() => void>();
const notify = () => subs.forEach((f) => f());

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferred = e as BeforeInstallPromptEvent;
    notify();
  });
  window.addEventListener('appinstalled', () => {
    deferred = null;
    notify();
  });
}

const subscribe = (f: () => void) => {
  subs.add(f);
  return () => void subs.delete(f);
};

/** Có đang mở dưới dạng app đã cài (cửa sổ riêng) không. */
export function isStandalone(): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    && window.matchMedia('(display-mode: standalone)').matches;
}

export function useInstallPrompt(): { canInstall: boolean; install: () => Promise<void> } {
  const canInstall = useSyncExternalStore(subscribe, () => deferred !== null, () => false);
  const install = useCallback(async () => {
    const e = deferred;
    if (!e) return;
    deferred = null; // mỗi sự kiện chỉ gọi prompt() được một lần
    notify();
    await e.prompt();
  }, []);
  return { canInstall, install };
}
