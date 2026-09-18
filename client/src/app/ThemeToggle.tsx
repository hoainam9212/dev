import { useTheme, type Theme } from './useTheme';

const ORDER: Theme[] = ['light', 'dark', 'system'];
const LABEL: Record<Theme, string> = { light: '☀️ Sáng', dark: '🌙 Tối', system: '🖥️ Hệ thống' };

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length]!;
  return (
    <button type="button" className="btn-soft text-sm" onClick={() => setTheme(next)} aria-label="Đổi giao diện">
      {LABEL[theme]}
    </button>
  );
}
