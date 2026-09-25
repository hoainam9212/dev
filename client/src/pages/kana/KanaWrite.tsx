import { useState } from 'react';
import type { KanaChar } from '@nihongo/shared';
import { WritingPractice } from '../../components/WritingPractice';
import { useProgress } from '../../store/progress';
import { useSwipe } from '../../lib/useSwipe';

export function KanaWrite({ chars }: { chars: KanaChar[] }) {
  const writable = chars.filter((c) => c.strokePaths.length > 0);
  const [i, setI] = useState(0);
  const [doneKey, setDoneKey] = useState(0);
  const addXp = useProgress((s) => s.addXp);
  const [dir, setDir] = useState<'next' | 'prev' | null>(null);
  // no auto-advance after a character is written: learners often practise the same one several times
  const go = (d: 1 | -1) => {
    setI((i + d + writable.length) % writable.length);
    setDoneKey((k) => k + 1);
    setDir(d > 0 ? 'next' : 'prev');
  };
  const swipe = useSwipe({ onNext: () => go(1), onPrev: () => go(-1) });
  const cur = writable[i];

  if (!cur) return <p className="text-center text-muted">Chưa có dữ liệu nét cho nhóm này.</p>;

  return (
    <div data-testid="kana-write" className="flex flex-col items-center gap-4" {...swipe}>
      <div className="flex flex-wrap justify-center gap-1">
        {writable.map((c, k) => (
          <button
            key={c.kana}
            type="button"
            onClick={() => {
              setI(k);
              setDir(null);
            }}
            className={`rounded-full px-2 py-0.5 text-sm font-bold ${k === i ? 'bg-rose text-white' : 'bg-sakura/30'}`}
          >
            {c.kana}
          </button>
        ))}
      </div>
      <div
        key={`${cur.kana}-${doneKey}`}
        className={dir === 'next' ? 'slide-from-right' : dir === 'prev' ? 'slide-from-left' : undefined}
      >
        <WritingPractice
          paths={cur.strokePaths}
          split={cur.strokeSplit}
          label={`${cur.kana} (${cur.romaji})`}
          onComplete={({ score }) => addXp(score >= 80 ? 3 : 1)}
        />
      </div>
      <button type="button" className="btn-primary" onClick={() => go(1)}>
        Chữ tiếp theo →
      </button>
    </div>
  );
}
