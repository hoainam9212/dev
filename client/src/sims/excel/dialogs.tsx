import { useEffect, useState } from 'react';
import type { excelSim } from '@office-neko/shared';

interface Props {
  state: excelSim.WorkbookState;
  dispatch: (a: excelSim.ExcelAction) => void;
  /** Thời điểm hiện tại, truyền từ component — reducer không được gọi Date.now(). */
  now: number;
}

function Shell({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/20 p-4">
      <div role="dialog" aria-modal="true" aria-label={title} className="card w-full max-w-lg space-y-3 p-5">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-extrabold">{title}</h2>
          <button type="button" aria-label="Đóng" className="btn ml-auto !px-3 !py-1" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ExcelDialogs({ state, dispatch, now }: Props) {
  const close = () => dispatch({ type: 'openDialog', dialog: null });
  const [name, setName] = useState('bang-tinh.xlsx');

  if (!state.dialog) return null;

  if (state.dialog === 'save') {
    return (
      <Shell title="Lưu bảng tính" onClose={close}>
        <label className="block space-y-1">
          <span className="text-sm font-bold">Đặt tên tệp</span>
          <input
            aria-label="Tên tệp"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border-2 border-peach/50 px-3 py-2"
          />
        </label>
        <p className="text-sm text-muted">
          Đuôi <b>.xlsx</b> là đuôi tệp bảng tính. Đây là bản mô phỏng nên không có tệp thật nào được tạo ra trên máy bạn.
        </p>
        <button type="button" className="btn-primary" onClick={() => dispatch({ type: 'save', name, at: now })}>
          Lưu
        </button>
      </Shell>
    );
  }

  return (
    <Shell title="In bảng tính" onClose={close}>
      <p className="text-sm">
        Trước khi in, người ta thường xem lại: bảng có vừa một trang giấy không, hàng tiêu đề đã rõ chưa.
      </p>
      <p className="text-sm text-muted">Đây là bản mô phỏng nên không có gì được gửi tới máy in thật.</p>
      <button type="button" className="btn-primary" onClick={() => dispatch({ type: 'print' })}>
        In
      </button>
    </Shell>
  );
}
