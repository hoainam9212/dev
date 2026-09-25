import { useState } from 'react';
import { useLevel } from '../../store/level';
import { LevelPicker } from '../../components/LevelPicker';
import { Segmented } from '../../components/Segmented';
import { canRecognize, sttMessage } from '../../lib/stt';
import { Shadowing } from './Shadowing';
import { Roleplay } from './Roleplay';
import { useT } from '../../i18n';

type Mode = 'shadowing' | 'roleplay';

export function SpeakingPage() {
  const t = useT();
  const level = useLevel((s) => s.level);
  const [mode, setMode] = useState<Mode>('shadowing');

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-black text-rose">{t.speaking.title}</h1>
        <LevelPicker />
      </header>
      <div className="flex flex-wrap items-center gap-3">
        <Segmented<Mode>
          ariaLabel={t.common.mode}
          value={mode}
          onChange={setMode}
          options={[
            { value: 'shadowing', label: t.speaking.modes.shadowing },
            { value: 'roleplay', label: t.speaking.modes.roleplay },
          ]}
        />
        {!canRecognize() && <span className="text-xs text-rose">{sttMessage('unsupported')}</span>}
      </div>
      <section className="card p-4 md:p-6">
        {mode === 'shadowing' && <Shadowing key={level} level={level} />}
        {mode === 'roleplay' && <Roleplay key={level} level={level} />}
      </section>
    </div>
  );
}
