import { useState } from 'react';
import type { Kanji } from '@nihongo/shared';
import { WritingPractice } from '../../components/WritingPractice';
import { useProgress } from '../../store/progress';
import { useSwipe } from '../../lib/useSwipe';

export function KanjiWrite({ kanji }: { kanji: Kanji[] }) {
  const writable = kanji.filter((k) => k.strokePaths.length > 0);
  const [i, setI] = useState(0);
  const [round, setRound] = useState(0);
  const addXp = useProgress((s) => s.addXp);
  const [dir, setDir] = useState<'next' | 'prev' | null>(null);
  // no auto-advance after a kanji is written: learners often practise the same one several times
  const go = (d: 1 | -1) => {
    setI((i + d + writable.length) % writable.length);
    setRound((r) => r + 1);
    setDir(d > 0 ? 'next' : 'prev');
  };
  const swipe = useSwipe({ onNext: () => go(1), onPrev: () => go(-1) });
  const cur = writable[i];
  if (!cur) return <p className="text-center text-muted">Chưa có dữ liệu nét.</p>;

  return (
    <div data-testid="kanji-write" className="flex flex-col items-center gap-4" {...swipe}>
      <div className="flex w-full items-center gap-2">
        <button type="button" className="btn-soft" onClick={() => go(-1)} aria-label="Trước">
          ←
        </button>
        <select
          aria-label="Chọn kanji"
          value={i}
          onChange={(e) => {
            setI(Number(e.target.value));
            setDir(null);
          }}
          // min-w-0: a select is as wide as its longest option (N1 meanings are long) and would push the page sideways
          className="min-w-0 flex-1 truncate rounded-full bg-cream px-4 py-2 font-bold ring-2 ring-sakura/50 dark:bg-bg"
        >
          {writable.map((k, idx) => (
            <option key={k.id} value={idx}>
              {k.char} · {k.meanings[0]}
            </option>
          ))}
        </select>
        <button type="button" className="btn-soft" onClick={() => go(1)} aria-label="Sau">
          →
        </button>
      </div>
      <div
        key={`${cur.id}-${round}`}
        className={`flex flex-col items-center gap-4 ${
          dir === 'next' ? 'slide-from-right' : dir === 'prev' ? 'slide-from-left' : ''
        }`}
      >
        <p className="text-sm text-muted">{cur.meanings.slice(0, 3).join(', ')}</p>
        <WritingPractice paths={cur.strokePaths} label={cur.char} onComplete={({ score }) => addXp(score >= 80 ? 3 : 1)} />
      </div>
      <button type="button" className="btn-primary" onClick={() => go(1)}>
        Kanji tiếp theo →
      </button>
    </div>
  );
}
