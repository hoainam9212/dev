import { parse, type Ast } from './parse';
import { cellsOf, parseRange, parseRef } from './refs';
import { ERR, isErr, type CellValue, type EvalContext, type ErrCode, type FormulaError } from './types';

export { newContext } from './types';

/** Ô chứa gì. Dùng chung cho cả giao diện. */
export type RawKind =
  | { kind: 'blank' }
  | { kind: 'number'; v: number }
  | { kind: 'text'; v: string }
  | { kind: 'formula'; src: string };

export function readRaw(raw: string | null): RawKind {
  if (raw === null || raw.trim() === '') return { kind: 'blank' };
  if (raw.startsWith('=')) return { kind: 'formula', src: raw.slice(1) };
  const n = Number(raw.trim().replace(',', '.'));
  if (raw.trim() !== '' && Number.isFinite(n)) return { kind: 'number', v: n };
  return { kind: 'text', v: raw };
}

const ERR_CODES = new Set<string>(['#DIV/0!', '#N/A', '#REF!', '#NAME?', '#VALUE!', '#CIRC!']);

const key = (sheet: string, row: number, col: number) => `${sheet}!${row},${col}`;

/**
 * Giá trị của một ô. `visiting` phải được XOÁ sau khi tính xong, nếu không hai ô
 * cùng trỏ vào một ô thứ ba sẽ bị báo nhầm là tham chiếu vòng.
 */
export function evaluateCell(ctx: EvalContext, sheet: string, row: number, col: number): CellValue {
  const k = key(sheet, row, col);
  const done = ctx.memo.get(k);
  if (done !== undefined) return done;
  if (ctx.visiting.has(k)) return ERR('#CIRC!');

  const raw = readRaw(ctx.src.raw(sheet, row, col));
  let value: CellValue;
  if (raw.kind === 'blank') value = '';
  else if (raw.kind === 'number') value = raw.v;
  else if (raw.kind === 'text') value = raw.v;
  else {
    ctx.visiting.add(k);
    try {
      value = evaluateIn(ctx, sheet, raw.src);
    } finally {
      ctx.visiting.delete(k);
    }
  }
  ctx.memo.set(k, value);
  return value;
}

/** Tính một công thức rời (có hoặc không có dấu `=` đứng đầu). */
export function evaluateFormula(ctx: EvalContext, text: string): CellValue {
  return evaluateIn(ctx, ctx.sheet, text.startsWith('=') ? text.slice(1) : text);
}

function evaluateIn(ctx: EvalContext, sheet: string, src: string): CellValue {
  let ast: Ast;
  try {
    ast = parse(src);
  } catch {
    // Gõ sai cú pháp là chuyện thường của người mới; giao diện không được sập.
    return ERR('#NAME?');
  }
  return evalAst(ctx, sheet, ast);
}

/** Vùng trải thành danh sách giá trị; hàm ở Task 4 nhận dạng này. */
export function rangeValues(ctx: EvalContext, sheet: string, text: string): CellValue[] | FormulaError {
  const range = parseRange(text);
  if (!range) return ERR('#REF!');
  const on = range.sheet ?? sheet;
  return cellsOf(range).map((c) => evaluateCell(ctx, on, c.row, c.col));
}

export function evalAst(ctx: EvalContext, sheet: string, ast: Ast): CellValue {
  switch (ast.k) {
    case 'num': return ast.v;
    case 'str': return ast.v;
    case 'bool': return ast.v;
    case 'ref': {
      const ref = parseRef(ast.v);
      if (!ref) return ERR('#REF!');
      return evaluateCell(ctx, ref.sheet ?? sheet, ref.row, ref.col);
    }
    case 'range': {
      // Một vùng đứng ngoài lời gọi hàm không có nghĩa gì trong Excel.
      return ERR('#VALUE!');
    }
    case 'neg': {
      const v = evalAst(ctx, sheet, ast.e);
      const n = toNumber(v);
      return isErr(n) ? n : -n;
    }
    case 'pct': {
      const v = evalAst(ctx, sheet, ast.e);
      const n = toNumber(v);
      return isErr(n) ? n : n / 100;
    }
    case 'bin': return binary(ctx, sheet, ast);
    case 'call': return call(ctx, sheet, ast);
  }
}

function binary(ctx: EvalContext, sheet: string, ast: { op: string; l: Ast; r: Ast }): CellValue {
  const l = evalAst(ctx, sheet, ast.l);
  if (isErr(l)) return l;
  const r = evalAst(ctx, sheet, ast.r);
  if (isErr(r)) return r;

  if (ast.op === '&') return toText(l) + toText(r);
  if (['=', '<>', '<', '>', '<=', '>='].includes(ast.op)) return compare(ast.op, l, r);

  const a = toNumber(l);
  if (isErr(a)) return a;
  const b = toNumber(r);
  if (isErr(b)) return b;
  switch (ast.op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b === 0 ? ERR('#DIV/0!') : a / b;
    case '^': return a ** b;
    default: return ERR('#VALUE!');
  }
}

/** Bảng hàm được Task 4 cắm vào; trước đó mọi lời gọi đều là `#NAME?`. */
export interface FnTable {
  has(name: string): boolean;
  call(name: string, ctx: EvalContext, sheet: string, args: Ast[]): CellValue;
}
let FN_TABLE: FnTable | null = null;
export function registerFunctions(table: FnTable): void {
  FN_TABLE = table;
}

function call(ctx: EvalContext, sheet: string, ast: { name: string; args: Ast[] }): CellValue {
  if (ERR_CODES.has(ast.name)) return ERR(ast.name as ErrCode);
  if (FN_TABLE && FN_TABLE.has(ast.name)) return FN_TABLE.call(ast.name, ctx, sheet, ast.args);
  return ERR('#NAME?');
}

// ——— cưỡng ép kiểu, đúng như Excel ———

export function toNumber(v: CellValue): number | FormulaError {
  if (isErr(v)) return v;
  if (typeof v === 'number') return v;
  if (typeof v === 'boolean') return v ? 1 : 0;
  if (v.trim() === '') return 0;
  const n = Number(v.trim());
  return Number.isFinite(n) ? n : ERR('#VALUE!');
}

export function toText(v: CellValue): string {
  if (isErr(v)) return v.err;
  if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
  return String(v);
}

export function compare(op: string, l: CellValue, r: CellValue): CellValue {
  const ln = toNumber(l);
  const rn = toNumber(r);
  let c: number;
  if (!isErr(ln) && !isErr(rn) && !(typeof l === 'string' && l.trim() !== '' && Number.isNaN(Number(l)))) {
    c = ln === rn ? 0 : ln < rn ? -1 : 1;
  } else {
    const a = toText(l).trim().toLowerCase();
    const b = toText(r).trim().toLowerCase();
    c = a === b ? 0 : a < b ? -1 : 1;
  }
  switch (op) {
    case '=': return c === 0;
    case '<>': return c !== 0;
    case '<': return c < 0;
    case '>': return c > 0;
    case '<=': return c <= 0;
    case '>=': return c >= 0;
    default: return ERR('#VALUE!');
  }
}
