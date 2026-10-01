import { useCallback, useMemo, useState } from 'react';
import { excelSim, formula } from '@office-neko/shared';
import { ChevronDown12Regular } from '@fluentui/react-icons';
import { FilterMenu } from './FilterMenu';
import { nativeTitle } from '../../help/nativeTitle';

const ROW_H = 26;
const COL_W = 96;
/** Chỉ dựng phần nhìn thấy: 1.300 ô DOM cùng lúc làm cuộn giật trên máy yếu. */
const VIEW_ROWS = 18;
const VIEW_COLS = 10;

interface Props {
  state: excelSim.WorkbookState;
  dispatch: (a: excelSim.ExcelAction) => void;
  gridRef?: React.RefObject<HTMLDivElement>;
}

function window1(anchor: number, span: number, max: number): number {
  return Math.max(0, Math.min(max - span, anchor - Math.floor(span / 2)));
}

export function Grid({ state, dispatch, gridRef }: Props) {
  const sel = state.sel;
  const rowStart = window1(sel.from.row, VIEW_ROWS, formula.MAX_ROWS);
  const colStart = window1(sel.from.col, VIEW_COLS, formula.MAX_COLS);

  // Hàng bị lọc ẩn thì KHÔNG dựng ra; bỏ qua nó rồi lấy tiếp cho đủ cửa sổ, kẻo
  // lưới trống hoác. Đầu hàng vẫn đánh số thật (1, 2, 5…) như Excel — nhìn số
  // nhảy là biết đang lọc.
  const hidden = excelSim.hiddenRows(state);
  const rows = useMemo(() => {
    const out: number[] = [];
    for (let row = rowStart; row < formula.MAX_ROWS && out.length < VIEW_ROWS; row++) {
      if (!hidden.has(row)) out.push(row);
    }
    return out;
  }, [rowStart, hidden]);
  const cols = useMemo(() => Array.from({ length: VIEW_COLS }, (_, i) => colStart + i), [colStart]);

  const lo = { row: Math.min(sel.from.row, sel.to.row), col: Math.min(sel.from.col, sel.to.col) };
  const hi = { row: Math.max(sel.from.row, sel.to.row), col: Math.max(sel.from.col, sel.to.col) };
  const inSel = (row: number, col: number) => row >= lo.row && row <= hi.row && col >= lo.col && col <= hi.col;

  // Đang lọc thì mỗi ô ở hàng đầu vùng lọc có mũi tên ▾ — như AutoFilter của Excel.
  const filter = state.sheets[state.active]!.filter ?? null;
  const hasArrow = (row: number, col: number) =>
    !!filter && row === filter.range.from.row && col >= filter.range.from.col && col <= filter.range.to.col;
  const [menu, setMenu] = useState<{ col: string; anchor: DOMRect } | null>(null);
  const closeMenu = useCallback(() => setMenu(null), []);

  function onKeyDown(e: React.KeyboardEvent) {
    const move = (dRow: number, dCol: number) => {
      e.preventDefault();
      dispatch({ type: 'moveSel', dRow, dCol, extend: e.shiftKey });
    };
    switch (e.key) {
      case 'ArrowUp': return move(-1, 0);
      case 'ArrowDown': return move(1, 0);
      case 'ArrowLeft': return move(0, -1);
      case 'ArrowRight': return move(0, 1);
      case 'Delete':
      case 'Backspace':
        e.preventDefault();
        return dispatch({ type: 'clear' });
      case 'F2':
        e.preventDefault();
        return dispatch({ type: 'startEdit' });
      case 'Enter':
        e.preventDefault();
        // Đang sửa thì ghi lại rồi xuống; không sửa thì chỉ xuống một ô.
        return dispatch(state.editing !== null ? { type: 'commitEdit', move: 'down' } : { type: 'moveSel', dRow: 1, dCol: 0 });
      case 'Tab':
        e.preventDefault();
        return dispatch(state.editing !== null ? { type: 'commitEdit', move: 'right' } : { type: 'moveSel', dRow: 0, dCol: 1 });
      case 'Escape':
        e.preventDefault();
        return dispatch({ type: 'cancelEdit' });
      default: break;
    }
    if (e.ctrlKey || e.metaKey) {
      const k = e.key.toLowerCase();
      if (k === 'c') { e.preventDefault(); return dispatch({ type: 'copy' }); }
      if (k === 'v') { e.preventDefault(); return dispatch({ type: 'paste' }); }
      if (k === 'z') { e.preventDefault(); return dispatch({ type: 'undo' }); }
      return;
    }
    // Gõ thẳng một ký tự là bắt đầu sửa ô, y như Excel.
    if (e.key.length === 1 && !e.altKey) {
      e.preventDefault();
      dispatch({ type: 'startEdit', text: e.key });
    }
  }

  return (
    <div
      ref={gridRef}
      data-testid="grid"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="overflow-auto rounded-xl border border-black/10 bg-white outline-none focus:ring-2 focus:ring-excel-ink/40"
    >
      <div className="inline-block min-w-full">
        <div className="flex sticky top-0 z-10">
          <div className="gridhead shrink-0" style={{ width: 44, height: ROW_H }} />
          {cols.map((col) => (
            <button
              key={col}
              type="button"
              data-testid={`colhead-${formula.colToName(col)}`}
              onClick={() => dispatch({ type: 'selectRange', range: `${formula.colToName(col)}1:${formula.colToName(col)}${formula.MAX_ROWS}` })}
              className="gridhead shrink-0"
              style={{ width: state.sheets[state.active]!.colWidths?.[col] ?? COL_W, height: ROW_H }}
            >
              {formula.colToName(col)}
            </button>
          ))}
        </div>
        {rows.map((row) => (
          <div key={row} className="flex">
            <button
              type="button"
              data-testid={`rowhead-${row + 1}`}
              onClick={() => dispatch({ type: 'selectRange', range: `A${row + 1}:${formula.colToName(formula.MAX_COLS - 1)}${row + 1}` })}
              className="gridhead shrink-0"
              style={{ width: 44, height: ROW_H }}
            >
              {row + 1}
            </button>
            {cols.map((col) => {
              const name = `${formula.colToName(col)}${row + 1}`;
              const value = excelSim.cellValue(state, name);
              const fmt = excelSim.formatOf(state, name);
              const align = fmt.align ?? formula.defaultAlign(value);
              const anchored = sel.from.row === row && sel.from.col === col;
              const arrow = hasArrow(row, col);
              const cell = (
                <button
                  key={col}
                  type="button"
                  data-testid={`cell-${name}`}
                  onClick={(e) => dispatch(e.shiftKey
                    ? { type: 'selectRange', range: `${excelSim.refName(sel.from)}:${name}` }
                    : { type: 'select', cell: name })}
                  onDoubleClick={() => dispatch({ type: 'startEdit' })}
                  className={[
                    'cellbox shrink-0',
                    `text-${align}`,
                    fmt.bold ? 'font-bold' : '',
                    fmt.italic ? 'italic' : '',
                    arrow ? 'pr-6' : '',
                    anchored ? 'ring-2 ring-excel-ink z-10' : inSel(row, col) ? 'bg-excel-ink/10' : '',
                  ].filter(Boolean).join(' ')}
                  style={{
                    width: state.sheets[state.active]!.colWidths?.[col] ?? COL_W,
                    height: ROW_H,
                    color: fmt.color,
                    backgroundColor: fmt.fill,
                  }}
                >
                  {formula.displayValue(value, fmt)}
                </button>
              );
              if (!arrow) return cell;
              // Mũi tên là nút riêng nằm CẠNH nút ô (không lồng button trong button), cả hai trong một khung.
              const colName = formula.colToName(col);
              const label = `Mở menu lọc cột ${colName}`;
              return (
                <div key={col} className="relative shrink-0">
                  {cell}
                  <button
                    type="button"
                    data-filter-arrow
                    data-help-id="excel.filterCol"
                    aria-label={label}
                    aria-expanded={menu?.col === colName}
                    title={nativeTitle('excel.filterCol', label)}
                    onClick={(e) => {
                      const anchor = e.currentTarget.getBoundingClientRect();
                      setMenu(menu?.col === colName ? null : { col: colName, anchor });
                    }}
                    className="absolute right-0.5 top-1/2 z-20 grid h-[18px] w-[18px] -translate-y-1/2 place-items-center rounded-sm border border-neutral-400 bg-white text-neutral-700 hover:bg-neutral-100"
                  >
                    <ChevronDown12Regular />
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {menu ? (
        <FilterMenu state={state} col={menu.col} anchor={menu.anchor} dispatch={dispatch} onClose={closeMenu} />
      ) : null}
    </div>
  );
}
