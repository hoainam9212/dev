import { useState } from 'react';
import type { excelSim } from '@office-neko/shared';

interface Props {
  state: excelSim.WorkbookState;
  dispatch: (a: excelSim.ExcelAction) => void;
}

export function SheetTabs({ state, dispatch }: Props) {
  // Tên đang sửa là trạng thái tạm của giao diện, không phải dữ liệu sổ tính,
  // nên để ở useState — đúng quy ước "state tạm thì được dùng useState".
  const [renaming, setRenaming] = useState<number | null>(null);
  const [draft, setDraft] = useState('');

  function commit(index: number) {
    const name = draft.trim();
    if (name) dispatch({ type: 'renameSheet', index, name });
    setRenaming(null);
  }

  return (
    <div className="flex items-center gap-1 text-xs">
      {state.sheets.map((sheet, i) =>
        renaming === i ? (
          <input
            key={sheet.name}
            data-testid="sheet-rename"
            aria-label="Tên sheet"
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={() => commit(i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commit(i);
              if (e.key === 'Escape') setRenaming(null);
            }}
            className="w-28 rounded-t-lg border border-black/10 px-2 py-1"
          />
        ) : (
          <button
            key={sheet.name}
            type="button"
            data-help-id="excel.sheetTab"
            onClick={() => dispatch({ type: 'switchSheet', index: i })}
            onDoubleClick={() => { setRenaming(i); setDraft(sheet.name); }}
            className={[
              'rounded-t-lg border border-b-0 border-black/10 px-3 py-1',
              i === state.active ? 'bg-white font-bold' : 'bg-black/5 text-muted',
            ].join(' ')}
          >
            {sheet.name}
          </button>
        ),
      )}
      <button
        type="button"
        data-help-id="excel.addSheet"
        aria-label="Thêm sheet"
        onClick={() => dispatch({ type: 'addSheet' })}
        className="rounded-lg border border-black/10 px-2 py-1"
      >
        +
      </button>
    </div>
  );
}
