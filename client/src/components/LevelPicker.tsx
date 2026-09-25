import { LEVELS, type Level } from '@nihongo/shared';
import { Segmented } from './Segmented';
import { useLevel } from '../store/level';
import { useT } from '../i18n';

export function LevelPicker() {
  const t = useT();
  const level = useLevel((s) => s.level);
  const setLevel = useLevel((s) => s.setLevel);
  return (
    <Segmented<Level>
      ariaLabel={t.common.jlptLevel}
      value={level}
      onChange={setLevel}
      options={LEVELS.map((l) => ({ value: l, label: l }))}
    />
  );
}
