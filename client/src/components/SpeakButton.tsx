import { useState } from 'react';
import { pronunciationScore } from '@nihongo/shared';
import { canRecognize, recognizeOnce, STT_MESSAGES, type SttError } from '../lib/stt';
import { useProgress } from '../store/progress';

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
  const [state, setState] = useState<'idle' | 'listening' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const addXp = useProgress((s) => s.addXp);

  const finish = (heard: string, score: number) => {
    const xp = xpForScore(score);
    if (xp) addXp(xp);
    onResult({ heard, score });
  };

  if (!canRecognize()) {
    return (
      <div className="flex flex-col items-center gap-2" data-testid="self-assess">
        <p className="text-center text-xs text-muted">{STT_MESSAGES.unsupported} Hãy tự đánh giá:</p>
        <div className="flex gap-2">
          <button type="button" className="btn-primary" disabled={disabled} onClick={() => finish('', 100)}>
            Nói được 👍
          </button>
          <button type="button" className="btn-soft" disabled={disabled} onClick={() => finish('', 30)}>
            Chưa được 🙈
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
            setError(STT_MESSAGES[(e as Error).message as SttError] ?? STT_MESSAGES.error);
          }
        }}
      >
        {state === 'listening' ? '🎙️ Đang nghe…' : '🎤 Nói'}
      </button>
      {error && <p className="text-xs text-rose">{error}</p>}
    </div>
  );
}
