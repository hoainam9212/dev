import { compare, evalAst, rangeValues, registerFunctions, toNumber, toText } from './evaluate';
import type { Ast } from './parse';
import { ERR, isErr, type CellValue, type EvalContext, type FormulaError } from './types';

/** Đối số đã tính. Vùng giữ nguyên dạng danh sách để SUM/COUNTIF dùng được. */
export type Arg =
  | { a: 'value'; v: CellValue }
  /** `width` là số cột của vùng; VLOOKUP cần nó để biết cột tra nằm đâu. */
  | { a: 'range'; values: CellValue[]; width?: number };

export type FormulaFn = (args: Arg[], ctx: EvalContext) => CellValue;

/** Mọi giá trị của đối số, vùng thì trải phẳng. */
function flat(args: Arg[]): CellValue[] {
  return args.flatMap((a) => (a.a === 'range' ? a.values : [a.v]));
}

/** Giá trị đơn của đối số thứ i; vùng lấy ô đầu. */
function one(args: Arg[], i: number): CellValue | undefined {
  const a = args[i];
  if (!a) return undefined;
  return a.a === 'value' ? a.v : a.values[0];
}

function firstErr(vs: CellValue[]): FormulaError | null {
  for (const v of vs) if (isErr(v)) return v;
  return null;
}

/** Chỉ những giá trị LÀ SỐ; ô trống và ô chữ bị bỏ qua, đúng như Excel. */
function numbers(args: Arg[]): number[] | FormulaError {
  const vs = flat(args);
  const e = firstErr(vs);
  if (e) return e;
  return vs.filter((v): v is number => typeof v === 'number');
}

function needNum(args: Arg[], i: number): number | FormulaError {
  const v = one(args, i);
  if (v === undefined) return ERR('#VALUE!');
  return toNumber(v);
}

function needText(args: Arg[], i: number): string | FormulaError {
  const v = one(args, i);
  if (v === undefined) return ERR('#VALUE!');
  if (isErr(v)) return v;
  return toText(v);
}

/**
 * Khớp một giá trị với điều kiện: số, chữ, hoặc chuỗi so sánh (">5", "<=10",
 * "<>x"). KHÔNG hỗ trợ ký tự đại diện `*` `?` — giới hạn có chủ ý, bài học nói rõ.
 */
export function matchCriteria(value: CellValue, criteria: CellValue): boolean {
  const text = typeof criteria === 'string' ? criteria.trim() : null;
  const m = text ? /^(<=|>=|<>|<|>|=)(.*)$/.exec(text) : null;
  if (m) {
    const op = m[1] === '=' ? '=' : m[1]!;
    const rhsText = m[2]!.trim();
    const rhsNum = Number(rhsText);
    const rhs: CellValue = rhsText !== '' && Number.isFinite(rhsNum) ? rhsNum : rhsText;
    return compare(op, value, rhs) === true;
  }
  return compare('=', value, criteria) === true;
}

function condition(args: Arg[], valueIndex: number): { picked: CellValue[] } | FormulaError {
  const rangeArg = args[0];
  const criteria = one(args, 1);
  if (!rangeArg || rangeArg.a !== 'range' || criteria === undefined) return ERR('#VALUE!');
  const target = args[valueIndex];
  const values = target && target.a === 'range' ? target.values : rangeArg.values;
  const picked: CellValue[] = [];
  rangeArg.values.forEach((v, i) => {
    if (matchCriteria(v, criteria)) picked.push(values[i] ?? '');
  });
  return { picked };
}

/** AND/OR: lỗi trong đối số lan lên kết quả thay vì bị coi là false. */
function logic(args: Arg[], how: 'every' | 'some'): CellValue {
  const vs = flat(args);
  const e = firstErr(vs);
  if (e) return e;
  const truthy = vs.map((v) => (typeof v === 'boolean' ? v : toNumber(v) !== 0));
  return how === 'every' ? truthy.every(Boolean) : truthy.some(Boolean);
}

function sumOf(vs: CellValue[]): number {
  return vs.reduce<number>((acc, v) => acc + (typeof v === 'number' ? v : 0), 0);
}

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export const FUNCTIONS: Record<string, FormulaFn> = {
  SUM: (args) => {
    const ns = numbers(args);
    return isErr(ns) ? ns : ns.reduce((a, b) => a + b, 0);
  },
  AVERAGE: (args) => {
    const ns = numbers(args);
    if (isErr(ns)) return ns;
    return ns.length ? ns.reduce((a, b) => a + b, 0) / ns.length : ERR('#DIV/0!');
  },
  MIN: (args) => {
    const ns = numbers(args);
    if (isErr(ns)) return ns;
    return ns.length ? Math.min(...ns) : 0;
  },
  MAX: (args) => {
    const ns = numbers(args);
    if (isErr(ns)) return ns;
    return ns.length ? Math.max(...ns) : 0;
  },
  COUNT: (args) => flat(args).filter((v) => typeof v === 'number').length,
  COUNTA: (args) => flat(args).filter((v) => v !== '' && v !== null).length,
  ROUND: (args) => {
    if (args.length < 2) return ERR('#VALUE!');
    const n = needNum(args, 0);
    if (isErr(n)) return n;
    const d = needNum(args, 1);
    if (isErr(d)) return d;
    const f = 10 ** d;
    // Math.round(-2.5) là -2 trong JS; Excel làm tròn ra xa số 0.
    const r = Math.sign(n) * Math.round(Math.abs(n) * f) / f;
    return Object.is(r, -0) ? 0 : r;
  },
  ABS: (args) => {
    const n = needNum(args, 0);
    return isErr(n) ? n : Math.abs(n);
  },
  IF: (args) => {
    const cond = one(args, 0);
    if (cond === undefined) return ERR('#VALUE!');
    if (isErr(cond)) return cond;
    const n = typeof cond === 'boolean' ? (cond ? 1 : 0) : toNumber(cond);
    if (isErr(n)) return n;
    if (n !== 0) return one(args, 1) ?? '';
    return args.length >= 3 ? (one(args, 2) ?? '') : false;
  },
  AND: (args) => logic(args, 'every'),
  OR: (args) => logic(args, 'some'),
  SUMIF: (args) => {
    const r = condition(args, 2);
    return isErr(r) ? r : sumOf(r.picked);
  },
  COUNTIF: (args) => {
    const r = condition(args, 2);
    return isErr(r) ? r : r.picked.length;
  },
  AVERAGEIF: (args) => {
    const r = condition(args, 2);
    if (isErr(r)) return r;
    const ns = r.picked.filter((v): v is number => typeof v === 'number');
    return ns.length ? ns.reduce((a, b) => a + b, 0) / ns.length : ERR('#DIV/0!');
  },
  VLOOKUP: (args) => {
    const needle = one(args, 0);
    const table = args[1];
    const colArg = needNum(args, 2);
    if (needle === undefined || !table || table.a !== 'range') return ERR('#VALUE!');
    if (isErr(colArg)) return colArg;
    const width = table.width ?? 0;
    if (colArg < 1 || colArg > width) return ERR('#REF!');
    const rows = width ? table.values.length / width : 0;
    for (let r = 0; r < rows; r++) {
      const key = table.values[r * width];
      if (key !== undefined && compare('=', key, needle) === true) {
        return table.values[r * width + (colArg - 1)] ?? '';
      }
    }
    return ERR('#N/A');
  },
  LEFT: (args) => {
    const s = needText(args, 0);
    if (isErr(s)) return s;
    const n = args.length >= 2 ? needNum(args, 1) : 1;
    return isErr(n) ? n : s.slice(0, n);
  },
  RIGHT: (args) => {
    const s = needText(args, 0);
    if (isErr(s)) return s;
    const n = args.length >= 2 ? needNum(args, 1) : 1;
    if (isErr(n)) return n;
    return n <= 0 ? '' : s.slice(-n);
  },
  MID: (args) => {
    if (args.length < 3) return ERR('#VALUE!');
    const s = needText(args, 0);
    if (isErr(s)) return s;
    const start = needNum(args, 1);
    if (isErr(start)) return start;
    const len = needNum(args, 2);
    if (isErr(len)) return len;
    return s.slice(start - 1, start - 1 + len);
  },
  LEN: (args) => {
    if (args.length < 1) return ERR('#VALUE!');
    const s = needText(args, 0);
    return isErr(s) ? s : s.length;
  },
  UPPER: (args) => {
    const s = needText(args, 0);
    return isErr(s) ? s : s.toUpperCase();
  },
  LOWER: (args) => {
    const s = needText(args, 0);
    return isErr(s) ? s : s.toLowerCase();
  },
  PROPER: (args) => {
    const s = needText(args, 0);
    if (isErr(s)) return s;
    return s.toLowerCase().replace(/(^|\s)(\S)/gu, (_m, sep: string, ch: string) => sep + ch.toUpperCase());
  },
  TRIM: (args) => {
    const s = needText(args, 0);
    return isErr(s) ? s : s.trim().replace(/\s+/g, ' ');
  },
  CONCAT: (args) => {
    const vs = flat(args);
    const e = firstErr(vs);
    return e ?? vs.map(toText).join('');
  },
  TODAY: (_args, ctx) => {
    const d = new Date(ctx.now);
    return `${pad2(d.getUTCDate())}/${pad2(d.getUTCMonth() + 1)}/${d.getUTCFullYear()}`;
  },
};

registerFunctions({
  has: (name) => name in FUNCTIONS,
  call: (name, ctx, sheet, astArgs: Ast[]) => {
    const args: Arg[] = [];
    for (const a of astArgs) {
      if (a.k === 'range') {
        const vs = rangeValues(ctx, sheet, a.v);
        if (isErr(vs)) return vs;
        args.push({ a: 'range', values: vs, width: widthOf(a.v) });
      } else {
        args.push({ a: 'value', v: evalAst(ctx, sheet, a) });
      }
    }
    return FUNCTIONS[name]!(args, ctx);
  },
});

function widthOf(rangeText: string): number {
  const body = rangeText.includes('!') ? rangeText.slice(rangeText.lastIndexOf('!') + 1) : rangeText;
  const [a, b] = body.split(':');
  if (!a || !b) return 1;
  const colOf = (s: string) => {
    const m = /\$?([A-Za-z]+)/.exec(s);
    if (!m) return 0;
    let c = 0;
    for (const ch of m[1]!.toUpperCase()) c = c * 26 + (ch.charCodeAt(0) - 64);
    return c - 1;
  };
  return Math.abs(colOf(b) - colOf(a)) + 1;
}
