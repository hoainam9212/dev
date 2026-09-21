/** Lưới của ta: 50 hàng × 26 cột, đúng bằng spec. */
export const MAX_ROWS = 50;
export const MAX_COLS = 26;

/** Một ô đã phân tích. `row`/`col` đếm từ 0; `absRow`/`absCol` là dấu `$`. */
export interface Ref {
  sheet?: string;
  row: number;
  col: number;
  absRow: boolean;
  absCol: boolean;
}

/** Vùng chữ nhật đã chuẩn hoá: `from` luôn ở trên-trái. */
export interface Range {
  sheet?: string;
  from: { row: number; col: number };
  to: { row: number; col: number };
}

export function colToName(col: number): string {
  let name = '';
  for (let n = col; n >= 0; n = Math.floor(n / 26) - 1) name = String.fromCharCode(65 + (n % 26)) + name;
  return name;
}

export function nameToCol(name: string): number {
  let col = 0;
  for (const ch of name.toUpperCase()) col = col * 26 + (ch.charCodeAt(0) - 64);
  return col - 1;
}

/** `Sheet2!$A$1` → ['Sheet2', '$A$1']; không có tên sheet thì phần đầu là undefined. */
function splitSheet(text: string): [string | undefined, string] {
  const bang = text.lastIndexOf('!');
  if (bang < 0) return [undefined, text];
  return [text.slice(0, bang).replace(/^'|'$/g, ''), text.slice(bang + 1)];
}

const REF_BODY = /^(\$?)([A-Za-z]{1,2})(\$?)([0-9]{1,4})$/;

export function parseRef(text: string): Ref | null {
  const [sheet, body] = splitSheet(text.trim());
  const m = REF_BODY.exec(body);
  if (!m) return null;
  const col = nameToCol(m[2]!);
  const row = Number(m[4]!) - 1;
  if (row < 0 || col < 0) return null;
  const ref: Ref = { row, col, absRow: m[3] === '$', absCol: m[1] === '$' };
  return sheet === undefined ? ref : { sheet, ...ref };
}

export function formatRef(ref: Ref): string {
  const body = `${ref.absCol ? '$' : ''}${colToName(ref.col)}${ref.absRow ? '$' : ''}${ref.row + 1}`;
  return ref.sheet ? `${ref.sheet}!${body}` : body;
}

export function parseRange(text: string): Range | null {
  const [sheet, body] = splitSheet(text.trim());
  const [a, b] = body.split(':');
  if (a === undefined) return null;
  const from = parseRef(a);
  if (!from) return null;
  const to = b === undefined ? from : parseRef(b);
  if (!to) return null;
  const range: Range = {
    from: { row: Math.min(from.row, to.row), col: Math.min(from.col, to.col) },
    to: { row: Math.max(from.row, to.row), col: Math.max(from.col, to.col) },
  };
  return sheet === undefined ? range : { sheet, ...range };
}

export function formatRange(r: Range): string {
  const body = `${colToName(r.from.col)}${r.from.row + 1}:${colToName(r.to.col)}${r.to.row + 1}`;
  return r.sheet ? `${r.sheet}!${body}` : body;
}

/** Mọi ô trong vùng, đọc theo hàng từ trái sang phải. */
export function cellsOf(r: Range): { row: number; col: number }[] {
  const cells: { row: number; col: number }[] = [];
  for (let row = r.from.row; row <= r.to.row; row++) {
    for (let col = r.from.col; col <= r.to.col; col++) cells.push({ row, col });
  }
  return cells;
}

export function inRange(r: Range, row: number, col: number): boolean {
  return row >= r.from.row && row <= r.to.row && col >= r.from.col && col <= r.to.col;
}

/**
 * Quét công thức theo thứ tự: chuỗi trong nháy kép TRƯỚC (để không đụng vào chữ
 * người dùng viết), rồi tên hàm kèm `(`, rồi mới tới địa chỉ. Nhờ thứ tự này
 * `=IF(A1>0,"B1 tốt")` chỉ dịch `A1`, còn `B1` trong câu chữ thì không.
 */
const SCAN = /("[^"]*")|([A-Za-z]+\s*\()|(\$?[A-Za-z]{1,2}\$?[0-9]{1,4})/g;

/** Dịch mọi địa chỉ TƯƠNG ĐỐI trong công thức đi `(dRow, dCol)` ô. Địa chỉ có `$` giữ nguyên. */
export function shiftFormula(formula: string, dRow: number, dCol: number): string {
  return formula.replace(SCAN, (whole, str: string | undefined, fn: string | undefined) => {
    if (str !== undefined || fn !== undefined) return whole;
    const ref = parseRef(whole);
    if (!ref) return whole;
    const row = ref.absRow ? ref.row : ref.row + dRow;
    const col = ref.absCol ? ref.col : ref.col + dCol;
    if (row < 0 || col < 0 || row >= MAX_ROWS || col >= MAX_COLS) return '#REF!';
    return formatRef({ ...ref, row, col });
  });
}
