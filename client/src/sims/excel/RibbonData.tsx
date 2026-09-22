import { useState } from 'react';
import { excelSim, formula } from '@office-neko/shared';
import { Group, Picker, ToolButton } from './RibbonHome';
import { FilterMenu } from './FilterMenu';

interface Props {
  state: excelSim.WorkbookState;
  dispatch: (a: excelSim.ExcelAction) => void;
}

/** Vùng đang chọn, viết dạng A1:C4 — cả Sort và Filter đều làm việc trên vùng này. */
function selectedRange(s: excelSim.WorkbookState): string {
  const lo = { row: Math.min(s.sel.from.row, s.sel.to.row), col: Math.min(s.sel.from.col, s.sel.to.col) };
  const hi = { row: Math.max(s.sel.from.row, s.sel.to.row), col: Math.max(s.sel.from.col, s.sel.to.col) };
  return `${excelSim.refName(lo)}:${excelSim.refName(hi)}`;
}

/** Các cột nằm trong vùng đang chọn, để đổ vào ô chọn "Cột cần sắp". */
function columnsOf(range: string): string[] {
  const r = formula.parseRange(range);
  if (!r) return [];
  const out: string[] = [];
  for (let c = r.from.col; c <= r.to.col; c++) out.push(formula.colToName(c));
  return out;
}

export function RibbonData({ state, dispatch }: Props) {
  const range = selectedRange(state);
  const cols = columnsOf(range);
  const [by, setBy] = useState<string>('');
  const [openCol, setOpenCol] = useState<string | null>(null);

  const sortBy = cols.includes(by) ? by : (cols[0] ?? 'A');
  const filter = state.sheets[state.active]!.filter ?? null;
  const filterCols = filter
    ? columnsOf(formula.formatRange(filter.range))
    : [];

  return (
    <div className="space-y-2">
      {/*
        Hàng nút cuộn ngang được, NHƯNG menu lọc phải nằm NGOÀI nó: `overflow-x: auto`
        cũng cắt theo chiều dọc, nên menu thả xuống bị cụt mất nửa dưới. jsdom không
        thấy lỗi này — chỉ nhìn ảnh chụp trên trình duyệt mới phát hiện.
      */}
      <div className="flex flex-wrap items-start gap-y-2 overflow-x-auto py-1">
      <Group title="Sắp xếp">
        <Picker
          helpId="excel.sortBy"
          label="Cột cần sắp"
          value={sortBy}
          options={cols.map((c) => ({ value: c, label: `Cột ${c}` }))}
          onChange={setBy}
        />
        <ToolButton
          helpId="excel.sortAsc"
          label="A→Z (tăng dần)"
          onClick={() => dispatch({ type: 'sortRange', range, by: sortBy, dir: 'asc' })}
        >
          A→Z
        </ToolButton>
        <ToolButton
          helpId="excel.sortDesc"
          label="Z→A (giảm dần)"
          onClick={() => dispatch({ type: 'sortRange', range, by: sortBy, dir: 'desc' })}
        >
          Z→A
        </ToolButton>
      </Group>

      <Group title="Lọc">
        <ToolButton
          helpId="excel.filter"
          label="Filter — bật/tắt lọc"
          pressed={!!filter}
          onClick={() => dispatch(filter ? { type: 'disableFilter' } : { type: 'enableFilter', range })}
        >
          Filter
        </ToolButton>
        {filterCols.map((c) => (
          <ToolButton
            key={c}
            helpId="excel.filterCol"
            label={`Mở menu lọc cột ${c}`}
            pressed={openCol === c}
            onClick={() => setOpenCol(openCol === c ? null : c)}
          >
            {c} ▾
          </ToolButton>
        ))}
        </Group>
      </div>

      {openCol ? (
        <FilterMenu state={state} col={openCol} dispatch={dispatch} onClose={() => setOpenCol(null)} />
      ) : null}
    </div>
  );
}
