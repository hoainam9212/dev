import { isErr, type CellValue } from './types';

export interface CellFormat {
  numFmt?: 'general' | 'number' | 'currencyVnd' | 'percent' | 'date';
  decimals?: number;
  bold?: boolean;
  italic?: boolean;
  color?: string;
  fill?: string;
  align?: 'left' | 'center' | 'right';
  border?: 'none' | 'all' | 'outer';
}

/**
 * Việt Nam dùng dấu CHẤM ngăn nghìn và dấu PHẨY cho phần lẻ — ngược với mặc
 * định tiếng Anh, nên phải nói rõ `vi-VN` chứ đừng tự nối chuỗi.
 */
function group(n: number, decimals: number): string {
  return new Intl.NumberFormat('vi-VN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

/** Giá trị đã tính + định dạng → đúng chữ hiện trong ô. */
export function displayValue(v: CellValue, fmt?: CellFormat): string {
  if (isErr(v)) return v.err;
  if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
  // Định dạng số không đụng tới chữ: ô ghi "Nam" thì vẫn là "Nam".
  if (typeof v !== 'number') return v;

  const kind = fmt?.numFmt ?? 'general';
  const decimals = fmt?.decimals;
  switch (kind) {
    case 'number': return group(v, decimals ?? 0);
    case 'currencyVnd': return `${group(v, decimals ?? 0)} ₫`;
    case 'percent': return `${group(v * 100, decimals ?? 0)}%`;
    case 'date': return v === 0 ? '' : String(v);
    default: return String(v);
  }
}

/** Căn lề mặc định của Excel khi người dùng chưa chọn. */
export function defaultAlign(v: CellValue): 'left' | 'center' | 'right' {
  if (isErr(v)) return 'center';
  if (typeof v === 'number') return 'right';
  if (typeof v === 'boolean') return 'center';
  return 'left';
}
