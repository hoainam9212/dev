import { useState } from 'react';
import { pronunciationScore } from '@nihongo/shared';
import { canRecognize, recognizeOnce, type SttError } from '../lib/stt';
import { useProgress } from '../store/progress';
import { useT } from '../i18n';

export interface SpeakResult {
  heard: string;
  score: number;
}

interface Props {
  expected: string;
  onResult: (r: SpeakResult) => void;
  disabled?: boolean;
}

export function xpForScore(score: number): number {
  return score >= 70 ? 3 : score >= 40 ? 1 : 0;
}

/** 🎤 button: records once, scores against `expected`, awards XP. Falls back to self-assessment when unsupported. */
export function SpeakButton({ expected, onResult, disabled }: Props) {
  const t = useT();
  const [state, setState] = useState<'idle' | 'listening' | 'error'>('idle');
  const [error, setError] = useState<SttError | null>(null);
  const addXp = useProgress((s) => s.addXp);

  const finish = (heard: string, score: number) => {
    const xp = xpForScore(score);
    if (xp) addXp(xp);
    onResult({ heard, score });
  };

  if (!canRecognize()) {
    return (
      <div className="flex flex-col items-center gap-2" data-testid="self-assess">
        <p className="text-center text-xs text-muted">{t.errors.stt.unsupported} {t.quiz.selfAssess}</p>
        <div className="flex gap-2">
          <button type="button" className="btn-primary" disabled={disabled} onClick={() => finish('', 100)}>
            {t.quiz.saidIt}
          </button>
          <button type="button" className="btn-soft" disabled={disabled} onClick={() => finish('', 30)}>
            {t.quiz.notYet}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        className={`btn-primary ${state === 'listening' ? 'animate-pulse' : ''}`}
        disabled={disabled || state === 'listening'}
        onClick={async () => {
          setState('listening');
          setError(null);
          try {
            const heard = await recognizeOnce();
            setState('idle');
            finish(heard, pronunciationScore(expected, heard));
          } catch (e) {
            setState('error');
            const code = (e as Error).message as SttError;
            setError(code in t.errors.stt ? code : 'error');
          }
        }}
      >
        {state === 'listening' ? t.quiz.listening : t.quiz.speak}
      </button>
      {error && <p className="text-xs text-rose">{t.errors.stt[error]}</p>}
    </div>
  );
}
