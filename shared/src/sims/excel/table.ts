import { isErr, nameToCol, parseRange, type CellValue, type Range } from '../../formula';
import {
  cellKey,
  cellValue,
  refName,
  withEdit,
  type Cell,
  type ExcelAction,
  type Sheet,
  type WorkbookState,
} from './state';

/**
 * Xếp thứ tự hai ô: số trước chữ, số theo giá trị, chữ theo thứ tự chữ cái
 * không phân biệt hoa thường. Ô trống luôn xuống cuối, bất kể tăng hay giảm —
 * giống Excel, và cũng là điều người dùng mong đợi.
 */
function compareValues(a: CellValue, b: CellValue): number {
  const emptyA = a === '' || isErr(a);
  const emptyB = b === '' || isErr(b);
  if (emptyA && emptyB) return 0;
  if (emptyA) return 1;
  if (emptyB) return -1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  if (typeof a === 'number') return -1;
  if (typeof b === 'number') return 1;
  return String(a).localeCompare(String(b), 'vi', { sensitivity: 'base' });
}

/** Mỗi hàng của vùng: các ô nguyên vẹn (kể cả định dạng) và khoá để so sánh. */
interface Row {
  cells: (Cell | undefined)[];
  key: CellValue;
}

function readRows(s: WorkbookState, range: Range, byCol: number, from: number): Row[] {
  const sheet = s.sheets[s.active]!;
  const rows: Row[] = [];
  for (let row = from; row <= range.to.row; row++) {
    const cells: (Cell | undefined)[] = [];
    for (let col = range.from.col; col <= range.to.col; col++) {
      cells.push(sheet.cells[cellKey(row, col)]);
    }
    rows.push({ cells, key: cellValue(s, refName({ row, col: byCol })) });
  }
  return rows;
}

function writeRows(sheet: Sheet, range: Range, from: number, rows: Row[]): Sheet {
  const cells = { ...sheet.cells };
  rows.forEach((r, i) => {
    r.cells.forEach((cell, j) => {
      const k = cellKey(from + i, range.from.col + j);
      // Ô nguồn trống thì ô đích cũng phải trống, nếu không dữ liệu cũ còn sót lại.
      if (cell) cells[k] = cell;
      else delete cells[k];
    });
  });
  return { ...sheet, cells };
}

function sortRange(s: WorkbookState, a: Extract<ExcelAction, { type: 'sortRange' }>): WorkbookState {
  const range = parseRange(a.range);
  if (!range) return s;
  const byCol = nameToCol(a.by);
  if (byCol < range.from.col || byCol > range.to.col) return s;

  const first = a.header ? range.from.row + 1 : range.from.row;
  if (first > range.to.row) return s;

  const rows = readRows(s, range, byCol, first);
  const dir = a.dir === 'desc' ? -1 : 1;
  const sorted = [...rows].sort((x, y) => {
    const c = compareValues(x.key, y.key);
    // Ô trống xuống cuối cả khi giảm dần, nên không nhân `dir` vào nhánh trống.
    const bothFilled = !(x.key === '' || y.key === '');
    return bothFilled ? c * dir : c;
  });
  return withEdit(s, (sheet) => writeRows(sheet, range, first, sorted));
}

/** Vùng đã được sắp theo cột này chưa? Grader dùng lại hàm này. */
export function isSorted(s: WorkbookState, range: string, by: string, dir: 'asc' | 'desc'): boolean {
  const r = parseRange(range);
  if (!r) return false;
  const byCol = nameToCol(by);
  if (byCol < r.from.col || byCol > r.to.col) return false;
  const keys: CellValue[] = [];
  for (let row = r.from.row; row <= r.to.row; row++) {
    keys.push(cellValue(s, refName({ row, col: byCol })));
  }
  const dirN = dir === 'desc' ? -1 : 1;
  for (let i = 1; i < keys.length; i++) {
    const prev = keys[i - 1]!;
    const cur = keys[i]!;
    const c = compareValues(prev, cur);
    const bothFilled = !(prev === '' || cur === '');
    if ((bothFilled ? c * dirN : c) > 0) return false;
  }
  return true;
}

export function reduceTable(s: WorkbookState, a: ExcelAction): WorkbookState | null {
  switch (a.type) {
    case 'sortRange': return sortRange(s, a);
    default: return null;
  }
}
