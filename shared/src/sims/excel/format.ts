import { nameToCol, parseRange, type CellFormat, type Range } from '../../formula';
import {
  cellKey,
  cellsIn,
  withEdit,
  withSheets,
  type Cell,
  type ExcelAction,
  type Sheet,
  type WorkbookState,
} from './state';

function sameRange(a: Range, b: Range): boolean {
  return a.from.row === b.from.row && a.from.col === b.from.col && a.to.row === b.to.row && a.to.col === b.to.col;
}

function contains(r: Range, row: number, col: number): boolean {
  return row >= r.from.row && row <= r.to.row && col >= r.from.col && col <= r.to.col;
}

/** Vùng gộp chứa ô này, `null` nếu ô không nằm trong vùng gộp nào. */
export function mergedAt(s: WorkbookState, cell: string): Range | null {
  const range = parseRange(cell);
  if (!range) return null;
  const sheet = s.sheets[s.active]!;
  return (sheet.merges ?? []).find((m) => contains(m, range.from.row, range.from.col)) ?? null;
}

function withCell(sheet: Sheet, row: number, col: number, edit: (cell: Cell) => Cell): Sheet {
  const k = cellKey(row, col);
  // Ô trống cũng định dạng được, nên tạo ô rỗng nếu chưa có.
  const cell = sheet.cells[k] ?? { raw: '' };
  return { ...sheet, cells: { ...sheet.cells, [k]: edit(cell) } };
}

function setFormat(s: WorkbookState, fmt: Partial<CellFormat>): WorkbookState {
  return withEdit(s, (sheet) => {
    let next = sheet;
    for (const at of cellsIn(s.sel)) {
      // Gộp với định dạng cũ: bấm B rồi bấm màu thì ô vừa đậm vừa có màu.
      next = withCell(next, at.row, at.col, (cell) => ({ ...cell, fmt: { ...cell.fmt, ...fmt } }));
    }
    return next;
  });
}

function clearFormat(s: WorkbookState): WorkbookState {
  return withEdit(s, (sheet) => {
    let next = sheet;
    for (const at of cellsIn(s.sel)) {
      next = withCell(next, at.row, at.col, ({ raw }) => ({ raw }));
    }
    return next;
  });
}

function merge(s: WorkbookState): WorkbookState {
  const sel: Range = {
    from: { row: Math.min(s.sel.from.row, s.sel.to.row), col: Math.min(s.sel.from.col, s.sel.to.col) },
    to: { row: Math.max(s.sel.from.row, s.sel.to.row), col: Math.max(s.sel.from.col, s.sel.to.col) },
  };
  // Một ô đơn lẻ thì không có gì để gộp.
  if (sel.from.row === sel.to.row && sel.from.col === sel.to.col) return s;
  return withEdit(s, (sheet) => {
    const merges = sheet.merges ?? [];
    const already = merges.some((m) => sameRange(m, sel));
    return {
      ...sheet,
      merges: already ? merges.filter((m) => !sameRange(m, sel)) : [...merges, sel],
    };
  });
}

function nextSheetName(sheets: Sheet[]): string {
  for (let i = sheets.length + 1; ; i++) {
    const name = `Sheet${i}`;
    if (!sheets.some((x) => x.name === name)) return name;
  }
}

export function reduceFormat(s: WorkbookState, a: ExcelAction): WorkbookState | null {
  switch (a.type) {
    case 'setFormat': return setFormat(s, a.fmt);
    case 'clearFormat': return clearFormat(s);
    case 'merge': return merge(s);
    case 'setColWidth': {
      const col = nameToCol(a.col);
      if (col < 0) return s;
      return withEdit(s, (sheet) => ({ ...sheet, colWidths: { ...sheet.colWidths, [col]: a.px } }));
    }
    case 'addSheet':
      return withSheets(s, (sheets) => [...sheets, { name: a.name ?? nextSheetName(sheets), cells: {}, charts: [] }]);
    case 'renameSheet':
      return withSheets(s, (sheets) => sheets.map((sh, i) => (i === a.index ? { ...sh, name: a.name } : sh)));
    case 'switchSheet': {
      if (a.index < 0 || a.index >= s.sheets.length) return s;
      // Vùng chọn về A1: vùng của sheet cũ có thể trỏ ra ngoài dữ liệu sheet mới.
      return { ...s, active: a.index, sel: { from: { row: 0, col: 0 }, to: { row: 0, col: 0 } }, editing: null };
    }
    default: return null;
  }
}
