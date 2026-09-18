import { useState } from 'react';
import type { KanaChar } from '@nihongo/shared';
import { WritingPractice } from '../../components/WritingPractice';
import { useProgress } from '../../store/progress';

export function KanaWrite({ chars }: { chars: KanaChar[] }) {
  const writable = chars.filter((c) => c.strokePaths.length > 0);
  const [i, setI] = useState(0);
  const [doneKey, setDoneKey] = useState(0);
  const addXp = useProgress((s) => s.addXp);
  const cur = writable[i];

  if (!cur) return <p className="text-center text-muted">Chưa có dữ liệu nét cho nhóm này.</p>;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-1">
        {writable.map((c, k) => (
          <button
            key={c.kana}
            type="button"
            onClick={() => setI(k)}
            className={`rounded-full px-2 py-0.5 text-sm font-bold ${k === i ? 'bg-rose text-white' : 'bg-sakura/30'}`}
          >
            {c.kana}
          </button>
        ))}
      </div>
      <WritingPractice
        key={`${cur.kana}-${doneKey}`}
        paths={cur.strokePaths}
        label={`${cur.kana} (${cur.romaji})`}
        onComplete={({ score }) => addXp(score >= 80 ? 3 : 1)}
      />
      <button
        type="button"
        className="btn-primary"
        onClick={() => {
          setI((i + 1) % writable.length);
          setDoneKey((d) => d + 1);
        }}
      >
        Chữ tiếp theo →
      </button>
    </div>
  );
}
