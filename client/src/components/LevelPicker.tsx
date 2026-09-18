import { LEVELS, type Level } from '@nihongo/shared';
import { Segmented } from './Segmented';
import { useLevel } from '../store/level';

export function LevelPicker() {
  const level = useLevel((s) => s.level);
  const setLevel = useLevel((s) => s.setLevel);
  return (
    <Segmented<Level>
      ariaLabel="Cấp JLPT"
      value={level}
      onChange={setLevel}
      options={LEVELS.map((l) => ({ value: l, label: l }))}
    />
  );
}
