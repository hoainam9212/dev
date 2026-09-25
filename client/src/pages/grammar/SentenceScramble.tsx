import { useMemo, useRef, useState } from 'react';
import { exampleTranslation, type Grammar, type GrammarExample } from '@nihongo/shared';
import { chunkSentence } from '../../lib/chunk';
import { shuffle } from '../../lib/quiz';
import { speak, useStopSpeechOnUnmount } from '../../lib/tts';
import { logSession } from '../../db';
import { useProgress } from '../../store/progress';
import { Mascot } from '../../components/Mascot';
import { useLang, useT } from '../../i18n';

const XP = 2;

interface Item {
  grammar: Grammar;
  ja: string;
  example: GrammarExample; // translated at render, so a language switch updates the prompt in place
  chunks: string[];
  shuffled: string[];
}

export function buildScrambleItems(grammar: Grammar[], total: number, rng: () => number = Math.random): Item[] {
  const withEx = grammar.filter((g) => g.examples.length > 0 && [...g.examples[0]!.ja].length >= 6);
  return shuffle(withEx, rng)
    .slice(0, Math.min(total, withEx.length))
    .map((g) => {
      const ex = g.examples[0]!;
      const chunks = chunkSentence(ex.ja, 4);
      let shuffled = shuffle(chunks, rng);
      if (shuffled.join('') === ex.ja && chunks.length > 1) shuffled = [...chunks].reverse();
      return { grammar: g, ja: ex.ja, example: ex, chunks, shuffled };
    });
}

export function SentenceScramble({ grammar, total = 8 }: { grammar: Grammar[]; total?: number }) {
  useStopSpeechOnUnmount();
  const t = useT();
  const lang = useLang();
  const [seed, setSeed] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const items = useMemo(() => buildScrambleItems(grammar, total), [grammar, total, seed]);
  const [i, setI] = useState(0);
  const [used, setUsed] = useState<number[]>([]);
  const [checked, setChecked] = useState<boolean | null>(null);
  const [correct, setCorrect] = useState(0);
  const addXp = useProgress((s) => s.addXp);
  const startedAt = useRef(new Date().toISOString());
  const item = items[i];

  const restart = () => {
    setSeed((s) => s + 1);
    setI(0);
    setUsed([]);
    setChecked(null);
    setCorrect(0);
  };

  if (items.length === 0) return <p className="text-center text-muted">{t.grammar.notEnoughExamples}</p>;

  if (!item) {
    return (
      <div className="flex flex-col items-center gap-3 py-6" data-testid="scramble-result">
        <Mascot mood={correct / items.length >= 0.8 ? 'happy' : 'neutral'} size={120} />
        <p className="text-xl font-black text-rose">{t.quiz.result(correct, items.length)}</p>
        <button type="button" className="btn-primary" onClick={restart}>
          {t.common.retry}
        </button>
      </div>
    );
  }

  const answer = used.map((k) => item.shuffled[k]!).join('');
  const complete = used.length === item.shuffled.length;

  const check = () => {
    const ok = answer === item.ja;
    setChecked(ok);
    if (ok) {
      addXp(XP);
      setCorrect((c) => c + 1);
    }
    speak(item.ja);
  };
  const next = () => {
    const n = i + 1;
    setI(n);
    setUsed([]);
    setChecked(null);
    if (n >= items.length) {
      void logSession({
        startedAt: startedAt.current,
        kind: 'scramble',
        type: 'grammar',
        correct: correct + (checked ? 0 : 0),
        total: items.length,
        xp: correct * XP,
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm font-bold text-muted">{t.quiz.position(i + 1, items.length, correct)}</p>
      <div className="text-center">
        <p className="text-xs font-bold text-muted">{item.grammar.title}</p>
        <p className="text-lg">{exampleTranslation(item.example, lang)}</p>
      </div>
      <div
        className="flex min-h-14 w-full max-w-lg flex-wrap items-center justify-center gap-1 rounded-2xl bg-cream p-3 text-xl font-bold ring-2 ring-sakura/50 dark:bg-bg"
        data-testid="scramble-answer"
      >
        {used.map((k, idx) => (
          <button
            key={idx}
            type="button"
            disabled={checked !== null}
            onClick={() => setUsed((u) => u.filter((_, j) => j !== idx))}
            className="rounded-xl bg-surface px-2 py-1 shadow"
          >
            {item.shuffled[k]}
          </button>
        ))}
        {used.length === 0 && <span className="text-sm font-normal text-muted">{t.grammar.scrambleHint}</span>}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {item.shuffled.map((c, k) => (
          <button
            key={k}
            type="button"
            disabled={used.includes(k) || checked !== null}
            onClick={() => setUsed((u) => [...u, k])}
            className="rounded-xl bg-lavender/40 px-3 py-2 text-lg font-bold transition hover:bg-lavender/70 disabled:opacity-30"
          >
            {c}
          </button>
        ))}
      </div>
      {checked === null ? (
        <button type="button" className="btn-primary" disabled={!complete} onClick={check}>
          {t.common.check}
        </button>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <p className={`font-bold ${checked ? 'text-emerald-500' : 'text-rose'}`}>{checked ? t.common.correct : t.quiz.notQuite}</p>
          {!checked && <p className="text-xl font-black">{item.ja}</p>}
          <button type="button" className="btn-primary" onClick={next} autoFocus>
            {t.common.next}
          </button>
        </div>
      )}
    </div>
  );
}
