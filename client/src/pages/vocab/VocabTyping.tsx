import { useMemo, useRef, useState } from 'react';
import { vocabMeanings, type Vocab } from '@nihongo/shared';
import { TypingAnswer } from '../../components/TypingAnswer';
import { Mascot } from '../../components/Mascot';
import { shuffle } from '../../lib/quiz';
import { speak, useStopSpeechOnUnmount } from '../../lib/tts';
import { logSession } from '../../db';
import { useProgress } from '../../store/progress';
import { useLang, useT } from '../../i18n';

const XP = 2;

export function VocabTyping({ vocab, total = 10 }: { vocab: Vocab[]; total?: number }) {
  useStopSpeechOnUnmount();
  const t = useT();
  const lang = useLang();
  const [seed, setSeed] = useState(0);
  const [i, setI] = useState(0);
  const [correct, setCorrect] = useState(0);
  const addXp = useProgress((s) => s.addXp);
  const startedAt = useRef(new Date().toISOString());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const items = useMemo(() => shuffle(vocab).slice(0, Math.min(total, vocab.length)), [vocab, total, seed]);
  const v = items[i];

  const restart = () => {
    setSeed((s) => s + 1);
    setI(0);
    setCorrect(0);
    startedAt.current = new Date().toISOString();
  };

  if (!v) {
    return (
      <div className="flex flex-col items-center gap-3 py-6" data-testid="typing-result">
        <Mascot mood={correct / items.length >= 0.8 ? 'happy' : 'neutral'} size={120} />
        <p className="text-xl font-black text-rose">{t.quiz.result(correct, items.length)}</p>
        <button type="button" className="btn-primary" onClick={restart}>
          {t.common.retry}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm font-bold text-muted">{t.quiz.position(i + 1, items.length, correct)}</p>
      <div className="text-center">
        <p className="text-5xl font-black">{v.word}</p>
        <p className="mt-1 text-muted">{vocabMeanings(v, lang).slice(0, 3).join(', ')}</p>
      </div>
      <TypingAnswer
        key={v.id}
        expected={v.reading}
        onResult={(ok) => {
          const c = ok ? correct + 1 : correct;
          if (ok) addXp(XP);
          speak(v.word);
          setCorrect(c);
          const next = i + 1;
          setI(next);
          if (next >= items.length) {
            void logSession({ startedAt: startedAt.current, kind: 'typing', type: 'vocab', correct: c, total: items.length, xp: c * XP });
          }
        }}
      />
    </div>
  );
}
