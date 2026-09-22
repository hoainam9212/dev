import { excelSim, formula } from '@office-neko/shared';

interface Props {
  state: excelSim.WorkbookState;
  col: string;
  dispatch: (a: excelSim.ExcelAction) => void;
  onClose: () => void;
}

/**
 * Menu thả xuống của một cột đang lọc: tích chọn giá trị nào muốn thấy.
 * Không tích gì cả nghĩa là không lọc cột này (giống Excel: "Select All").
 */
export function FilterMenu({ state, col, dispatch, onClose }: Props) {
  const options = excelSim.filterOptions(state, col);
  const sheet = state.sheets[state.active]!;
  const picked = sheet.filter?.conditions[formula.nameToCol(col)] ?? [];
  // Chưa lọc gì thì coi như đang chọn tất cả — người học thấy mọi ô đều tích.
  const active = picked.length ? picked : options;

  const toggle = (value: string) => {
    const next = active.includes(value) ? active.filter((v) => v !== value) : [...active, value];
    // Tích lại đủ hết thì trả về "không lọc", cho state gọn.
    dispatch({ type: 'setFilterValues', col, values: next.length === options.length ? [] : next });
  };

  return (
    <div className="w-52 space-y-1 rounded-xl border border-black/10 bg-white p-2 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold">Lọc cột {col}</span>
        <button type="button" aria-label="Đóng menu lọc" className="ml-auto px-1 text-xs" onClick={onClose}>✕</button>
      </div>
      <button
        type="button"
        data-help-id="excel.filterAll"
        aria-label="Chọn tất cả"
        className="w-full rounded-lg bg-black/5 px-2 py-1 text-xs"
        onClick={() => dispatch({ type: 'setFilterValues', col, values: [] })}
      >
        Chọn tất cả
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
    </div>
  );
}
