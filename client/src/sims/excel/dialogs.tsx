import { useEffect, useState } from 'react';
import { excelSim, formula } from '@office-neko/shared';
import { sortTarget } from './RibbonData';

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

/** Cột này có ít nhất một số? Có thì Excel gọi thứ tự là Smallest to Largest, không thì A to Z. */
function hasNumber(s: excelSim.WorkbookState, range: formula.Range, col: number): boolean {
  for (let row = range.from.row; row <= range.to.row; row++) {
    if (typeof excelSim.cellValue(s, excelSim.refName({ row, col })) === 'number') return true;
  }
  return false;
}

/**
 * Hộp thoại Sort như Excel: Sort by (cột) + Order (thứ tự). Mở ra là chọn sẵn cột của
 * ô đang đứng, thứ tự tăng dần — giống bản thật.
 */
function SortDialog({ state, dispatch, onClose }: { state: excelSim.WorkbookState; dispatch: Props['dispatch']; onClose: () => void }) {
  const target = sortTarget(state);
  const range = formula.parseRange(target.range)!;
  const cols: string[] = [];
  for (let c = range.from.col; c <= range.to.col; c++) cols.push(formula.colToName(c));
  const [by, setBy] = useState(cols.includes(target.by) ? target.by : cols[0]!);
  const [dir, setDir] = useState<'asc' | 'desc'>('asc');
  const numeric = hasNumber(state, range, formula.nameToCol(by));
  const select = 'w-full rounded border border-neutral-400 bg-white px-2 py-1 text-sm';

  return (
    <Shell title="Sort" onClose={onClose}>
      <p className="text-sm text-muted">Vùng sắp: <b className="font-mono">{target.range}</b></p>
      <div className="grid grid-cols-2 gap-3">
        <label className="block space-y-1">
          <span className="text-sm font-bold">Sort by</span>
          <select aria-label="Sắp theo cột" value={by} onChange={(e) => setBy(e.target.value)} className={select}>
            {cols.map((c) => <option key={c} value={c}>Column {c}</option>)}
          </select>
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-bold">Order</span>
          <select aria-label="Thứ tự" value={dir} onChange={(e) => setDir(e.target.value as 'asc' | 'desc')} className={select}>
            <option value="asc">{numeric ? 'Smallest to Largest' : 'A to Z'}</option>
            <option value="desc">{numeric ? 'Largest to Smallest' : 'Z to A'}</option>
          </select>
        </label>
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            dispatch({ type: 'sortRange', range: target.range, by, dir });
            onClose();
          }}
        >
          OK
        </button>
        <button type="button" className="btn" onClick={onClose}>Cancel</button>
      </div>
    </Shell>
  );
}

export function ExcelDialogs({ state, dispatch, now }: Props) {
  const close = () => dispatch({ type: 'openDialog', dialog: null });
  const [name, setName] = useState('bang-tinh.xlsx');

  if (!state.dialog) return null;

  if (state.dialog === 'sort') return <SortDialog state={state} dispatch={dispatch} onClose={close} />;

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
