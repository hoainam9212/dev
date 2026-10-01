import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { excelSim, formula } from '@office-neko/shared';

interface Props {
  state: excelSim.WorkbookState;
  col: string;
  /** Khung của mũi tên ▾ vừa bấm; menu mở ngay dưới nó. */
  anchor: DOMRect;
  dispatch: (a: excelSim.ExcelAction) => void;
  onClose: () => void;
}

const WIDTH = 208;

/**
 * Menu thả xuống của một cột đang lọc: tích chọn giá trị nào muốn thấy.
 * Không tích gì cả nghĩa là không lọc cột này (giống Excel: "Select All").
 *
 * Vẽ bằng portal ra `body` với `position: fixed`: mũi tên nằm trong lưới, mà lưới
 * là khung `overflow-auto` — vẽ tại chỗ thì menu bị cắt cụt ở mép lưới.
 */
export function FilterMenu({ state, col, anchor, dispatch, onClose }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const options = excelSim.filterOptions(state, col);
  const sheet = state.sheets[state.active]!;
  const picked = sheet.filter?.conditions[formula.nameToCol(col)] ?? [];
  // Chưa lọc gì thì coi như đang chọn tất cả — người học thấy mọi ô đều tích.
  const active = picked.length ? picked : options;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    // Bấm lại đúng mũi tên thì để nút đó tự đóng/mở, kẻo đóng xong lại mở ngay.
    const onDown = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (box.current?.contains(t) || t?.closest?.('[data-filter-arrow]')) return;
      onClose();
    };
    // Menu đứng yên theo cửa sổ, lưới cuộn thì mũi tên chạy mất — đóng luôn cho khỏi lệch.
    const onScroll = (e: Event) => {
      if (!box.current?.contains(e.target as Node)) onClose();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    window.addEventListener('scroll', onScroll, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [onClose]);

  const toggle = (value: string) => {
    const next = active.includes(value) ? active.filter((v) => v !== value) : [...active, value];
    // Tích lại đủ hết thì trả về "không lọc", cho state gọn.
    dispatch({ type: 'setFilterValues', col, values: next.length === options.length ? [] : next });
  };

  // Mép phải menu thẳng mép phải mũi tên, nhưng không tràn ra ngoài cửa sổ ở cột cuối.
  const left = Math.max(8, Math.min(anchor.right - WIDTH, window.innerWidth - WIDTH - 8));

  return createPortal(
    <div
      ref={box}
      role="menu"
      aria-label={`Lọc cột ${col}`}
      className="fixed z-50 space-y-1 rounded-sm border border-neutral-300 bg-white p-2 text-neutral-800 shadow-lg"
      style={{ top: anchor.bottom + 2, left, width: WIDTH }}
    >
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold">Lọc cột {col}</span>
        <button type="button" aria-label="Đóng menu lọc" className="ml-auto px-1 text-xs" onClick={onClose}>✕</button>
      </div>
      <button
        type="button"
        data-help-id="excel.filterAll"
        aria-label="Chọn tất cả"
        className="w-full rounded-sm bg-neutral-100 px-2 py-1 text-left text-xs hover:bg-neutral-200"
        onClick={() => dispatch({ type: 'setFilterValues', col, values: [] })}
      >
        (Select All)
      </button>
      {options.length === 0 ? <p className="text-xs text-muted">Cột này chưa có dữ liệu.</p> : null}
      {options.map((value) => (
        <label key={value} className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            aria-label={value}
            checked={active.includes(value)}
            onChange={() => toggle(value)}
          />
          {value}
        </label>
      ))}
    </div>,
    document.body,
  );
}
