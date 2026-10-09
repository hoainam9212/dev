import type { ThemeId } from './state';

/** Một theme áp cho CẢ bài trình chiếu: nền, màu chữ, màu tiêu đề, kiểu chữ. */
export interface PptTheme {
  id: ThemeId;
  name: string;
  bg: string;
  fg: string;
  /** Màu tiêu đề. */
  accent: string;
  font: string;
}

const SANS = '"Segoe UI", system-ui, sans-serif';

export const PPT_THEMES: readonly PptTheme[] = [
  { id: 'mochi', name: 'Mochi', bg: '#FFF8EE', fg: '#3B2F2A', accent: '#B54C17', font: SANS },
  { id: 'bien', name: 'Biển', bg: '#EAF4FF', fg: '#1E3A5F', accent: '#1A5FA8', font: 'Georgia, "Times New Roman", serif' },
  { id: 'la', name: 'Lá', bg: '#EEF8EC', fg: '#24452A', accent: '#2B6E37', font: '"Trebuchet MS", "Segoe UI", sans-serif' },
  { id: 'hoa', name: 'Hoa', bg: '#FFF0F5', fg: '#4A2838', accent: '#B03163', font: SANS },
  { id: 'tro', name: 'Tro', bg: '#F2F2F2', fg: '#2E2E2E', accent: '#4F5B6A', font: 'Calibri, "Segoe UI", sans-serif' },
  { id: 'dem', name: 'Đêm', bg: '#1F2430', fg: '#F3F4F8', accent: '#FFB86B', font: SANS },
];

export function themeOf(id: ThemeId): PptTheme {
  return PPT_THEMES.find((t) => t.id === id) ?? PPT_THEMES[0]!;
}

/** Độ chói tương đối theo WCAG 2.x của một màu '#RRGGBB'. */
function luminance(hex: string): number {
  const ch = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = ch.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Tỉ lệ tương phản WCAG giữa hai màu: 1 (như nhau) tới 21 (đen trên trắng). */
export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}
