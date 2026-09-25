import { onTestFinished } from 'vitest';
import type { Lang } from '../i18n';
import { useSettings } from '../store/settings';

/** Call inside a test: switches the display language now and back to 'vi' when the test ends. */
export function withLang(l: Lang): void {
  useSettings.getState().setLang(l);
  onTestFinished(() => useSettings.getState().setLang('vi'));
}
