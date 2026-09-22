import { isErr, nameToCol, parseRange, type CellValue, type Range } from '../../formula';
import {
  cellKey,
  cellText,
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

// ——— AutoFilter ———

/**
 * Lọc **chỉ ẩn hàng khi vẽ**, không xoá dữ liệu: `SUM` vẫn cộng cả hàng đang ẩn,
 * đúng như Excel với hàm thường (và đó là một điểm dạy học ở bài chương 6).
 */
function filterOf(s: WorkbookState) {
  return s.sheets[s.active]!.filter ?? null;
}

/** Chữ hiển thị của một ô, đã chuẩn hoá để so sánh. */
function keyOf(s: WorkbookState, row: number, col: number): string {
  return cellText(s, refName({ row, col })).trim();
}

/** Giá trị đang có ở một cột của vùng lọc, không trùng lặp, theo thứ tự xuất hiện. */
export function filterOptions(s: WorkbookState, col: string): string[] {
  const f = filterOf(s);
  if (!f) return [];
  const c = nameToCol(col);
  if (c < f.range.from.col || c > f.range.to.col) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  // Bỏ hàng tiêu đề (hàng đầu của vùng).
  for (let row = f.range.from.row + 1; row <= f.range.to.row; row++) {
    const v = keyOf(s, row, c);
    if (v === '' || seen.has(v.toLowerCase())) continue;
    seen.add(v.toLowerCase());
    out.push(v);
  }
  return out;
}

/** Hàng (đếm từ 0) bị ẩn vì không thoả điều kiện lọc. Lưới dùng cái này để bỏ qua hàng. */
export function hiddenRows(s: WorkbookState): ReadonlySet<number> {
  const hidden = new Set<number>();
  const f = filterOf(s);
  if (!f) return hidden;
  const conds = Object.entries(f.conditions).filter(([, vs]) => vs.length > 0);
  if (conds.length === 0) return hidden;
  for (let row = f.range.from.row + 1; row <= f.range.to.row; row++) {
    // Một hàng phải thoả MỌI cột đang lọc mới được hiện.
    const ok = conds.every(([col, values]) => {
      const here = keyOf(s, row, Number(col)).toLowerCase();
      return values.some((v) => v.trim().toLowerCase() === here);
    });
    if (!ok) hidden.add(row);
  }
  return hidden;
}

function setFilterValues(s: WorkbookState, col: string, values: string[]): WorkbookState {
  const f = filterOf(s);
  if (!f) return s;
  const c = nameToCol(col);
  if (c < f.range.from.col || c > f.range.to.col) return s;
  return withEdit(s, (sheet) => {
    const conditions = { ...(sheet.filter?.conditions ?? {}) };
    if (values.length === 0) delete conditions[c];
    else conditions[c] = values;
    return { ...sheet, filter: { range: f.range, conditions } };
  });
}

export function reduceTable(s: WorkbookState, a: ExcelAction): WorkbookState | null {
  switch (a.type) {
    case 'sortRange': return sortRange(s, a);
    case 'enableFilter': {
      const range = parseRange(a.range);
      if (!range) return s;
      return withEdit(s, (sheet) => ({ ...sheet, filter: { range, conditions: {} } }));
    }
    case 'disableFilter':
      return withEdit(s, (sheet) => ({ ...sheet, filter: null }));
    case 'setFilterValues':
      return setFilterValues(s, a.col, a.values);
    default: return null;
  }
}
