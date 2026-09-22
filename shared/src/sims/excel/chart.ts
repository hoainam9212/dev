import { cellsOf, isErr, parseRange } from '../../formula';
import {
  cellText,
  cellValue,
  refName,
  withEdit,
  type Chart,
  type ExcelAction,
  type WorkbookState,
} from './state';

/** Số liệu đã bóc ra từ vùng, sẵn sàng để vẽ. Cột đầu là nhãn, cột sau là số. */
export interface ChartData {
  labels: string[];
  values: number[];
  /** 0 khi vùng không có số nào — chỗ vẽ phải tự tránh chia cho 0. */
  max: number;
}

export function chartData(s: WorkbookState, range: string): ChartData {
  const r = parseRange(range);
  if (!r) return { labels: [], values: [], max: 0 };

  const oneColumn = r.from.col === r.to.col;
  const labelCol = r.from.col;
  const valueCol = oneColumn ? r.from.col : r.from.col + 1;

  const labels: string[] = [];
  const values: number[] = [];
  for (let row = r.from.row; row <= r.to.row; row++) {
    // Vùng một cột không có chỗ đặt nhãn, nên lấy chính địa chỉ ô làm nhãn.
    labels.push(oneColumn ? refName({ row, col: labelCol }) : cellText(s, refName({ row, col: labelCol })));
    const v = cellValue(s, refName({ row, col: valueCol }));
    // Ô chữ hoặc ô lỗi coi như 0: biểu đồ vẫn vẽ được, người học thấy cột lùn mà biết ô sai.
    values.push(typeof v === 'number' && !isErr(v) ? v : 0);
  }
  return { labels, values, max: values.length ? Math.max(0, ...values) : 0 };
}

export function chartsOf(s: WorkbookState): Chart[] {
  return s.sheets[s.active]!.charts ?? [];
}

/** Số ô có nội dung trong vùng — dùng để đặt tên biểu đồ mặc định nếu cần. */
export function filledCount(s: WorkbookState, range: string): number {
  const r = parseRange(range);
  if (!r) return 0;
  return cellsOf(r).filter((c) => cellText(s, refName(c)) !== '').length;
}

export function reduceChart(s: WorkbookState, a: ExcelAction): WorkbookState | null {
  switch (a.type) {
    case 'insertChart':
      return withEdit(s, (sheet) => ({ ...sheet, charts: [...(sheet.charts ?? []), a.chart] }));
    case 'removeChart':
      return withEdit(s, (sheet) => ({ ...sheet, charts: (sheet.charts ?? []).filter((c) => c.id !== a.id) }));
    default:
      return null;
  }
}
