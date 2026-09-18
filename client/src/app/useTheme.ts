import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';
const KEY = 'ns.theme';

function apply(t: Theme) {
  const root = document.documentElement;
  if (t === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', t);
}

function read(): Theme {
  try {
    const v = localStorage.getItem(KEY);
    if (v === 'light' || v === 'dark' || v === 'system') return v;
  } catch {
    /* storage unavailable */
  }
  return 'system';
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(read);
  useEffect(() => {
    apply(theme);
  }, [theme]);
  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem(KEY, t);
    } catch {
      /* storage unavailable */
    }
    apply(t);
  }, []);
  return { theme, setTheme };
}
