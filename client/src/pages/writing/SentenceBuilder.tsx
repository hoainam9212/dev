import { useMemo, useRef, useState } from 'react';
import { diffChars, exampleTranslation, similarity, type Grammar, type GrammarExample } from '@nihongo/shared';
import { shuffle } from '../../lib/quiz';
import { speak, useStopSpeechOnUnmount } from '../../lib/tts';
import { logSession } from '../../db';
import { saveWriting, useWritingsFor } from '../../db/writings';
import { useProgress } from '../../store/progress';
import { Mascot } from '../../components/Mascot';
import { useLang, useT } from '../../i18n';

const XP = 2;
const PASS = 0.8;

export function stripForCompare(s: string): string {
  return s.normalize('NFKC').replace(/[\s　。、．，,.!?！？「」『』（）()…・~〜]/g, '');
}

export function checkSentence(typed: string, expected: string): { ok: boolean; score: number } {
  const score = similarity(stripForCompare(typed), stripForCompare(expected));
  return { ok: score >= PASS, score };
}

interface Item {
  grammar: Grammar;
  ja: string;
  /** Kept whole so the prompt is translated at render. */
  example: GrammarExample;
}

export function pickSentenceItems(grammar: Grammar[], total: number, rng: () => number = Math.random): Item[] {
  const withEx = grammar.filter((g) => g.examples.length > 0 && [...g.examples[0]!.ja].length <= 30);
  return shuffle(withEx, rng)
    .slice(0, Math.min(total, withEx.length))
    .map((g) => ({ grammar: g, ja: g.examples[0]!.ja, example: g.examples[0]! }));
}

export function SentenceBuilder({ grammar, total = 8 }: { grammar: Grammar[]; total?: number }) {
  useStopSpeechOnUnmount();
  const t = useT();
  const lang = useLang();
  const [seed, setSeed] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const items = useMemo(() => pickSentenceItems(grammar, total), [grammar, total, seed]);
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState('');
  const [checked, setChecked] = useState<{ ok: boolean; score: number } | null>(null);
  const [correct, setCorrect] = useState(0);
  const [hint, setHint] = useState(false);
  const addXp = useProgress((s) => s.addXp);
  const startedAt = useRef(new Date().toISOString());
  const item = items[i];
  const previous = useWritingsFor(item?.grammar.id ?? null);

  const restart = () => {
    setSeed((s) => s + 1);
    setI(0);
    setTyped('');
    setChecked(null);
    setCorrect(0);
    setHint(false);
  };

  if (items.length === 0) return <p className="text-center text-muted">{t.writing.noExamples}</p>;
  if (!item) {
    return (
      <div className="flex flex-col items-center gap-3 py-6" data-testid="sentence-result">
        <Mascot mood={correct / items.length >= 0.8 ? 'happy' : 'neutral'} size={120} />
        <p className="text-xl font-black text-rose">
          {t.writing.result(correct, items.length)}
        </p>
        <button type="button" className="btn-primary" onClick={restart}>
          {t.common.retry}
        </button>
      </div>
    );
  }

  const diff = checked ? diffChars(stripForCompare(item.ja), stripForCompare(typed)) : [];

  return (
    <form
      className="flex flex-col items-center gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!checked) {
          if (!typed.trim()) return;
          const r = checkSentence(typed, item.ja);
          setChecked(r);
          if (r.ok) {
            addXp(XP);
            setCorrect((c) => c + 1);
          }
          // keep the sentence so it can be reviewed later
          void saveWriting({
            grammarId: item.grammar.id,
            grammarTitle: item.grammar.title,
            level: item.grammar.level,
            prompt: item.example.en,
            ...(item.example.vi ? { promptVi: item.example.vi } : {}),
            expected: item.ja,
            typed: typed.trim(),
            score: r.score,
            ok: r.ok,
          });
          speak(item.ja);
        } else {
          const n = i + 1;
          setI(n);
          setTyped('');
          setChecked(null);
          setHint(false);
          if (n >= items.length) {
            void logSession({ startedAt: startedAt.current, kind: 'sentence', type: 'writing', correct: correct + (checked.ok ? 0 : 0), total: items.length, xp: correct * XP });
          }
        }
      }}
    >
      <p className="text-sm font-bold text-muted">
        {t.writing.position(i + 1, items.length, correct)}
      </p>
      <div className="card w-full max-w-lg p-4 text-center">
        <p className="text-xs font-bold text-muted">{t.writing.pattern(item.grammar.title)}</p>
        <p className="text-lg font-bold">{exampleTranslation(item.example, lang)}</p>
        <button type="button" className="mt-2 text-xs text-rose underline" onClick={() => setHint((h) => !h)}>
          {hint ? t.writing.hideHint : t.writing.showHint}
        </button>
        {hint && <p className="mt-1 font-mono text-sm">{item.grammar.formation}</p>}
      </div>
      {previous && previous.length > 0 && (
        <details className="w-full max-w-lg rounded-2xl bg-lavender/20 p-3 text-sm" data-testid="previous-writing">
          <summary className="cursor-pointer font-bold">
            {t.writing.previous(previous.length)}
          </summary>
          <ul className="mt-2 space-y-1">
            {previous.map((w) => (
              <li key={w.id} className="flex items-baseline gap-2">
                <span className={`text-xs font-bold ${w.ok ? 'text-emerald-600' : 'text-rose'}`}>{Math.round(w.score * 100)}%</span>
                <span className="font-bold" lang="ja">
                  {w.typed}
                </span>
                <span className="ml-auto text-xs text-muted">{new Date(w.createdAt).toLocaleDateString(t.common.locale)}</span>
              </li>
            ))}
          </ul>
        </details>
      )}
      <textarea
        value={typed}
        onChange={(e) => setTyped(e.target.value)}
        disabled={!!checked}
        rows={2}
        lang="ja"
        placeholder={t.writing.placeholder}
        aria-label={t.writing.inputAria}
        className="w-full max-w-lg rounded-2xl bg-cream px-4 py-3 text-xl font-bold ring-2 ring-sakura/60 focus:outline-none focus:ring-rose dark:bg-bg"
      />
      {!checked ? (
        <button type="submit" className="btn-primary">
          {t.common.check}
        </button>
      ) : (
        <div className="flex flex-col items-center gap-2" data-testid="sentence-check">
          <p className={`font-bold ${checked.ok ? 'text-emerald-500' : 'text-rose'}`}>
            {checked.ok ? t.writing.match(Math.round(checked.score * 100)) : t.writing.noMatch(Math.round(checked.score * 100))}
          </p>
          <p className="text-xl font-black" lang="ja">
            {diff.map((d, k) => (
              <span key={k} className={d.ok ? '' : 'rounded bg-rose/30 px-0.5 text-rose'}>
                {d.ch}
              </span>
            ))}
          </p>
          <button type="submit" className="btn-primary" autoFocus>
            {t.common.next}
          </button>
        </div>
      )}
    </form>
  );
}
