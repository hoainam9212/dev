import { useMemo, useRef, useState } from 'react';
import { diffChars, similarity, type Grammar } from '@nihongo/shared';
import { shuffle } from '../../lib/quiz';
import { speak } from '../../lib/tts';
import { logSession } from '../../db';
import { useProgress } from '../../store/progress';
import { Mascot } from '../../components/Mascot';

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
  en: string;
}

export function pickSentenceItems(grammar: Grammar[], total: number, rng: () => number = Math.random): Item[] {
  const withEx = grammar.filter((g) => g.examples.length > 0 && [...g.examples[0]!.ja].length <= 30);
  return shuffle(withEx, rng)
    .slice(0, Math.min(total, withEx.length))
    .map((g) => ({ grammar: g, ja: g.examples[0]!.ja, en: g.examples[0]!.en }));
}

export function SentenceBuilder({ grammar, total = 8 }: { grammar: Grammar[]; total?: number }) {
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

  const restart = () => {
    setSeed((s) => s + 1);
    setI(0);
    setTyped('');
    setChecked(null);
    setCorrect(0);
    setHint(false);
  };

  if (items.length === 0) return <p className="text-center text-muted">Chưa có ví dụ cho cấp này.</p>;
  if (!item) {
    return (
      <div className="flex flex-col items-center gap-3 py-6" data-testid="sentence-result">
        <Mascot mood={correct / items.length >= 0.8 ? 'happy' : 'neutral'} size={120} />
        <p className="text-xl font-black text-rose">
          Kết quả: {correct} / {items.length}
        </p>
        <button type="button" className="btn-primary" onClick={restart}>
          Làm lại
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
        Câu {i + 1} / {items.length} · Đúng: {correct}
      </p>
      <div className="card w-full max-w-lg p-4 text-center">
        <p className="text-xs font-bold text-muted">Mẫu ngữ pháp: {item.grammar.title}</p>
        <p className="text-lg font-bold">{item.en}</p>
        <button type="button" className="mt-2 text-xs text-rose underline" onClick={() => setHint((h) => !h)}>
          {hint ? 'Ẩn gợi ý' : 'Gợi ý cấu trúc'}
        </button>
        {hint && <p className="mt-1 font-mono text-sm">{item.grammar.formation}</p>}
      </div>
      <textarea
        value={typed}
        onChange={(e) => setTyped(e.target.value)}
        disabled={!!checked}
        rows={2}
        lang="ja"
        placeholder="Viết câu tiếng Nhật ở đây…"
        aria-label="Câu tiếng Nhật"
        className="w-full max-w-lg rounded-2xl bg-cream px-4 py-3 text-xl font-bold ring-2 ring-sakura/60 focus:outline-none focus:ring-rose dark:bg-bg"
      />
      {!checked ? (
        <button type="submit" className="btn-primary">
          Kiểm tra
        </button>
      ) : (
        <div className="flex flex-col items-center gap-2" data-testid="sentence-check">
          <p className={`font-bold ${checked.ok ? 'text-emerald-500' : 'text-rose'}`}>
            {checked.ok ? `正解！ Chính xác (${Math.round(checked.score * 100)}%)` : `Chưa khớp (${Math.round(checked.score * 100)}%). Câu mẫu:`}
          </p>
          <p className="text-xl font-black" lang="ja">
            {diff.map((d, k) => (
              <span key={k} className={d.ok ? '' : 'rounded bg-rose/30 px-0.5 text-rose'}>
                {d.ch}
              </span>
            ))}
          </p>
          <button type="submit" className="btn-primary" autoFocus>
            Tiếp →
          </button>
        </div>
      )}
    </form>
  );
}
