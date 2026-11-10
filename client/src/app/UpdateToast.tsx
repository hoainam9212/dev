import { useEffect, useState } from 'react';
import { onPwaEvent, type PwaEvent } from '../pwa';

type Shown = { kind: PwaEvent; update: () => void } | null;

/** Thông báo nhỏ góc dưới bên trái: app đã dùng được offline, hoặc có bản mới đang chờ tải lại. */
export function UpdateToast() {
  const [shown, setShown] = useState<Shown>(null);

  useEffect(() => onPwaEvent((kind, update) => setShown({ kind, update })), []);

  useEffect(() => {
    if (shown?.kind !== 'offlineReady') return;
    const t = setTimeout(() => setShown(null), 5000);
    return () => clearTimeout(t);
  }, [shown]);

  if (!shown) return null;
  return (
    <div role="status"
      className="fixed bottom-5 left-4 right-24 z-40 mx-auto flex max-w-md flex-wrap items-center gap-3 rounded-2xl bg-white p-4 font-semibold shadow-lg ring-2 ring-mint sm:right-auto">
      {shown.kind === 'needRefresh' ? (
        <>
          <span className="flex-1">Có bản mới của Tin Học Cùng Mochi.</span>
          <span className="flex gap-2">
            <button type="button" className="btn-primary !px-4 !py-1.5" onClick={shown.update}>Tải lại</button>
            <button type="button" className="btn !px-3 !py-1.5" onClick={() => setShown(null)}>Để sau</button>
          </span>
        </>
      ) : (
        <span>Đã sẵn sàng dùng khi không có mạng.</span>
      )}
    </div>
  );
}
