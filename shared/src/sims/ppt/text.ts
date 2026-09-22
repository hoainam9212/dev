import type { El, ElFormat } from './state';

/** Cỡ chữ mời sẵn trong ribbon (pt). */
export const PPT_SIZES = [12, 16, 20, 24, 28, 32, 40, 54];

/** Bảng màu chữ và màu nền hình khối, đặt tên tiếng Việt để đọc bài học dễ hiểu. */
export const PPT_COLORS: { id: string; vi: string }[] = [
  { id: '#2F2A26', vi: 'Nâu đậm' },
  { id: '#D2691E', vi: 'Cam Mochi' },
  { id: '#3FB871', vi: 'Xanh lá' },
  { id: '#3B82F6', vi: 'Xanh biển' },
  { id: '#E11D74', vi: 'Hồng' },
  { id: '#FFFFFF', vi: 'Trắng' },
];

/** Gộp định dạng mới vào định dạng cũ; trường không nói tới thì giữ nguyên. */
export function mergeFmt(el: El, fmt: Partial<ElFormat>): El {
  return { ...el, fmt: { ...el.fmt, ...fmt } };
}
