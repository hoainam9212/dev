import { displayValue, formatRange, isErr, parseRange, type CellFormat, type CellValue } from '../../formula';
import type { CheckResult } from '../../grading/core';
import { mergedAt } from './format';
import { cellRaw, cellValue, formatOf, type WorkbookState } from './state';

export type ExcelCheck =
  | { kind: 'cellValue'; cell: string; value: string | number | boolean; sheet?: string }
  /** Ô có nội dung gì cũng được. Dùng cho bài bảo học viên gõ tên mình. */
  | { kind: 'cellNotEmpty'; cell: string; sheet?: string }
  | { kind: 'cellFormula'; cell: string; fn?: string; range?: string; absolute?: boolean; contains?: string; sheet?: string }
  | { kind: 'cellFormat'; cell: string; fmt: Partial<CellFormat>; sheet?: string }
  | { kind: 'merged'; range: string }
  | { kind: 'sheetNamed'; name: string };

const ok = (messageVi: string): CheckResult => ({ ok: true, messageVi });
const no = (messageVi: string): CheckResult => ({ ok: false, messageVi });

/** Địa chỉ kèm tên sheet nếu check nói rõ sheet. */
function at(cell: string, sheet?: string): string {
  return sheet ? `${sheet}!${cell}` : cell;
}

const FMT_VI: Record<string, string> = {
  general: 'General',
  number: 'Number',
  currencyVnd: 'tiền VNĐ',
  percent: 'phần trăm',
  date: 'ngày',
};

function fmtValueVi(key: string, value: unknown): string {
  if (key === 'numFmt') return FMT_VI[String(value)] ?? String(value);
  if (key === 'bold') return value ? 'in đậm' : 'không in đậm';
  if (key === 'italic') return value ? 'in nghiêng' : 'không in nghiêng';
  if (key === 'align') return `căn ${String(value) === 'center' ? 'giữa' : String(value) === 'right' ? 'phải' : 'trái'}`;
  return String(value);
}

/** So sánh giá trị đã tính: số theo sai số nhỏ, chữ bỏ qua hoa thường và khoảng trắng thừa. */
function sameValue(actual: CellValue, want: string | number | boolean): boolean {
  if (isErr(actual)) return false;
  if (typeof want === 'number') return typeof actual === 'number' && Math.abs(actual - want) < 1e-9;
  if (typeof want === 'boolean') return actual === want;
  return String(actual).trim().toLowerCase() === want.trim().toLowerCase();
}

/** Bỏ khoảng trắng và viết hoa đồng loạt, để so công thức mà không bắt bẻ cách gõ. */
function normalize(formula: string): string {
  return formula.replace(/\s+/g, '').toUpperCase();
}

export function gradeExcel(state: WorkbookState, check: ExcelCheck): CheckResult {
  switch (check.kind) {
    case 'cellValue': {
      const cell = at(check.cell, check.sheet);
      const actual = cellValue(state, cell);
      if (sameValue(actual, check.value)) return ok(`Ô ${check.cell} đã đúng.`);
      if (isErr(actual)) return no(`Ô ${check.cell} đang báo lỗi ${actual.err}. Xem lại công thức nhé.`);
      const shown = displayValue(actual);
      return no(`Ô ${check.cell} đang là "${shown}", cần là "${String(check.value)}".`);
    }
    case 'cellNotEmpty': {
      const raw = cellRaw(state, at(check.cell, check.sheet)).trim();
      return raw === '' ? no(`Ô ${check.cell} vẫn đang trống.`) : ok(`Ô ${check.cell} đã có nội dung.`);
    }
    case 'cellFormula': {
      const cell = at(check.cell, check.sheet);
      const raw = cellRaw(state, cell);
      if (!raw.startsWith('=')) {
        return no(`Ô ${check.cell} chưa có công thức. Công thức phải bắt đầu bằng dấu =`);
      }
      const norm = normalize(raw);
      if (check.fn && !norm.includes(`${check.fn.toUpperCase()}(`)) {
        return no(`Ô ${check.cell} chưa dùng hàm ${check.fn.toUpperCase()}.`);
      }
      if (check.range) {
        const want = parseRange(check.range);
        const wanted = want ? normalize(formatRange(want)) : normalize(check.range);
        if (!norm.includes(wanted)) return no(`Ô ${check.cell} chưa trỏ tới vùng ${check.range}.`);
      }
      if (check.absolute && !raw.includes('$')) {
        return no(`Ô ${check.cell} chưa khoá ô bằng dấu $.`);
      }
      if (check.contains && !norm.includes(normalize(check.contains))) {
        return no(`Công thức ở ô ${check.cell} chưa có "${check.contains}".`);
      }
      return ok(`Công thức ở ô ${check.cell} đã đúng.`);
    }
    case 'cellFormat': {
      const cell = at(check.cell, check.sheet);
      const actual = formatOf(state, cell);
      for (const [key, want] of Object.entries(check.fmt)) {
        if (actual[key as keyof CellFormat] !== want) {
          return no(`Ô ${check.cell} chưa được đặt ${fmtValueVi(key, want)}.`);
        }
      }
      return ok(`Ô ${check.cell} đã định dạng đúng.`);
    }
    case 'merged': {
      const want = parseRange(check.range);
      const from = want ? `${check.range.split(':')[0]}` : check.range;
      const merged = mergedAt(state, from);
      if (want && merged
        && merged.from.row === want.from.row && merged.from.col === want.from.col
        && merged.to.row === want.to.row && merged.to.col === want.to.col) {
        return ok(`Đã gộp ô ${check.range}.`);
      }
      return no(`Chưa gộp vùng ${check.range} thành một ô.`);
    }
    case 'sheetNamed': {
      const found = state.sheets.some((s) => s.name.trim().toLowerCase() === check.name.trim().toLowerCase());
      return found ? ok(`Đã có sheet "${check.name}".`) : no(`Chưa có sheet nào tên "${check.name}".`);
    }
  }
}
