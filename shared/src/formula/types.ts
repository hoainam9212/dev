export type ErrCode = '#DIV/0!' | '#N/A' | '#REF!' | '#NAME?' | '#VALUE!' | '#CIRC!';

export interface FormulaError { err: ErrCode }

export type CellValue = number | string | boolean | FormulaError;

export const ERR = (code: ErrCode): FormulaError => ({ err: code });

/**
 * Nhận `unknown` chứ không chỉ `CellValue`: các hàm trả về `number[] | FormulaError`
 * hay `{ picked } | FormulaError` cũng cần thu hẹp kiểu bằng đúng vệ sĩ này.
 */
export function isErr(v: unknown): v is FormulaError {
  return typeof v === 'object' && v !== null && 'err' in v;
}

/** Trình tính chỉ biết "cho tôi chữ trong ô này", không biết sổ tính trông ra sao. */
export interface CellSource {
  raw(sheet: string, row: number, col: number): string | null;
}

export interface EvalContext {
  src: CellSource;
  /** Sheet hiện hành, dùng cho địa chỉ không ghi tên sheet. */
  sheet: string;
  /** Mốc thời gian cho TODAY(); lõi KHÔNG bao giờ gọi Date.now(). */
  now: number;
  memo: Map<string, CellValue>;
  visiting: Set<string>;
}

export function newContext(src: CellSource, sheet: string, now: number): EvalContext {
  return { src, sheet, now, memo: new Map(), visiting: new Set() };
}
