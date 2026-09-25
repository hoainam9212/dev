import { useTheme, type Theme } from './useTheme';
import { useT } from '../i18n';

const ORDER: Theme[] = ['light', 'dark', 'system'];

export function ThemeToggle() {
  const t = useT();
  const { theme, setTheme } = useTheme();
  const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length]!;
  return (
    <button type="button" className="btn-soft text-sm" onClick={() => setTheme(next)} aria-label={t.app.changeTheme}>
      {t.app.theme[theme]}
    </button>
  );
}
