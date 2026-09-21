import { shiftFormula } from '../../formula';
import {
  cellKey,
  cellsIn,
  withEdit,
  type Cell,
  type ExcelAction,
  type Sheet,
  type WorkbookState,
} from './state';

/** Ô đã chép, ghi theo ĐỘ LỆCH so với ô trên-trái của vùng chép. */
export interface ClipCell {
  dRow: number;
  dCol: number;
  cell: Cell;
}

function topLeft(s: WorkbookState): { row: number; col: number } {
  return {
    row: Math.min(s.sel.from.row, s.sel.to.row),
    col: Math.min(s.sel.from.col, s.sel.to.col),
  };
}

function putCell(sheet: Sheet, row: number, col: number, cell: Cell): Sheet {
  return { ...sheet, cells: { ...sheet.cells, [cellKey(row, col)]: cell } };
}

/** Một ô chép sang chỗ mới: công thức dịch địa chỉ tương đối, chữ và số giữ nguyên. */
function moved(cell: Cell, dRow: number, dCol: number): Cell {
  if (!cell.raw.startsWith('=')) return { ...cell };
  return { ...cell, raw: shiftFormula(cell.raw, dRow, dCol) };
}

export function copy(s: WorkbookState): WorkbookState {
  const sheet = s.sheets[s.active]!;
  const origin = topLeft(s);
  const cells: ClipCell[] = cellsIn(s.sel).map((at) => ({
    dRow: at.row - origin.row,
    dCol: at.col - origin.col,
    cell: sheet.cells[cellKey(at.row, at.col)] ?? { raw: '' },
  }));
  // Chép không sửa tài liệu nên KHÔNG đẩy lịch sử hoàn tác.
  return { ...s, clipboard: { origin, cells } };
}

export function paste(s: WorkbookState): WorkbookState {
  const clip = s.clipboard;
  if (!clip || clip.cells.length === 0) return s;
  const target = topLeft(s);
  const dRow = target.row - clip.origin.row;
  const dCol = target.col - clip.origin.col;
  // Một lần withEdit cho cả vùng: dán nhiều ô vẫn là MỘT bước hoàn tác.
  return withEdit(s, (sheet) => {
    let next = sheet;
    for (const c of clip.cells) {
      next = putCell(next, target.row + c.dRow, target.col + c.dCol, moved(c.cell, dRow, dCol));
    }
    return next;
  });
}

/** Đổ ô mẫu (hàng trên cùng khi xuống, cột trái nhất khi sang phải) ra hết vùng chọn. */
export function fill(s: WorkbookState, dir: 'down' | 'right'): WorkbookState {
  const origin = topLeft(s);
  const sheet = s.sheets[s.active]!;
  return withEdit(s, (sh) => {
    let next = sh;
    for (const at of cellsIn(s.sel)) {
      if (dir === 'down' ? at.row === origin.row : at.col === origin.col) continue;
      const srcRow = dir === 'down' ? origin.row : at.row;
      const srcCol = dir === 'down' ? at.col : origin.col;
      const src = sheet.cells[cellKey(srcRow, srcCol)];
      if (!src) continue;
      next = putCell(next, at.row, at.col, moved(src, at.row - srcRow, at.col - srcCol));
    }
    return next;
  });
}

export function reduceEdit(s: WorkbookState, a: ExcelAction): WorkbookState | null {
  switch (a.type) {
    case 'copy': return copy(s);
    case 'paste': return paste(s);
    case 'fillDown': return fill(s, 'down');
    case 'fillRight': return fill(s, 'right');
    default: return null;
  }
}
