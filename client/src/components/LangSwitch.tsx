import type { Lang } from '@nihongo/shared';
import { useSettings } from '../store/settings';
import { useT } from '../i18n';
import { Segmented } from './Segmented';

const OPTIONS: { value: Lang; label: string }[] = [
  { value: 'vi', label: 'VI' },
  { value: 'en', label: 'EN' },
];

export function LangSwitch() {
  const t = useT();
  const lang = useSettings((s) => s.lang);
  const setLang = useSettings((s) => s.setLang);
  return <Segmented value={lang} onChange={setLang} options={OPTIONS} ariaLabel={t.settings.language} />;
}
