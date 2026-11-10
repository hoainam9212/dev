export type PwaEvent = 'offlineReady' | 'needRefresh';
export type PwaListener = (e: PwaEvent, update: () => void) => void;

const listeners = new Set<PwaListener>();
let last: [PwaEvent, () => void] | null = null;

/** Phát một sự kiện của service worker tới mọi nơi đang nghe (và nhớ lại cho nơi mở sau). */
export function publishPwaEvent(e: PwaEvent, update: () => void): void {
  last = [e, update];
  listeners.forEach((l) => l(e, update));
}

/** Nghe sự kiện service worker. Sự kiện gần nhất được phát lại ngay, vì nó có thể đến trước khi giao diện dựng xong. */
export function onPwaEvent(l: PwaListener): () => void {
  listeners.add(l);
  if (last) l(...last);
  return () => void listeners.delete(l);
}

export function resetPwaEvents(): void {
  last = null;
}

/** Đăng ký service worker để app chạy offline; báo khi đã sẵn sàng offline và khi có bản mới đang chờ. */
export async function setupPwa(onEvent: PwaListener = publishPwaEvent): Promise<void> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator) || import.meta.env.DEV) return;
  try {
    const { registerSW } = await import('virtual:pwa-register');
    const updateSW = registerSW({
      immediate: true,
      onOfflineReady: () => onEvent('offlineReady', () => undefined),
      onNeedRefresh: () => onEvent('needRefresh', () => void updateSW(true)),
    });
  } catch {
    /* offline là tuỳ chọn */
  }
}
