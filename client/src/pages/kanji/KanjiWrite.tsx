import { useState } from 'react';
import type { Kanji } from '@nihongo/shared';
import { WritingPractice } from '../../components/WritingPractice';
import { useProgress } from '../../store/progress';

export function KanjiWrite({ kanji }: { kanji: Kanji[] }) {
  const writable = kanji.filter((k) => k.strokePaths.length > 0);
  const [i, setI] = useState(0);
  const [round, setRound] = useState(0);
  const addXp = useProgress((s) => s.addXp);
  const cur = writable[i];
  if (!cur) return <p className="text-center text-muted">Chưa có dữ liệu nét.</p>;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full items-center gap-2">
        <button type="button" className="btn-soft" onClick={() => setI((i - 1 + writable.length) % writable.length)} aria-label="Trước">
          ←
        </button>
        <select
          aria-label="Chọn kanji"
          value={i}
          onChange={(e) => setI(Number(e.target.value))}
          className="flex-1 rounded-full bg-cream px-4 py-2 font-bold ring-2 ring-sakura/50 dark:bg-bg"
        >
          {writable.map((k, idx) => (
            <option key={k.id} value={idx}>
              {k.char} · {k.meanings[0]}
            </option>
          ))}
        </select>
        <button type="button" className="btn-soft" onClick={() => setI((i + 1) % writable.length)} aria-label="Sau">
          →
        </button>
      </div>
      <p className="text-sm text-muted">{cur.meanings.slice(0, 3).join(', ')}</p>
      <WritingPractice
        key={`${cur.id}-${round}`}
        paths={cur.strokePaths}
        label={cur.char}
        onComplete={({ score }) => addXp(score >= 80 ? 3 : 1)}
      />
      <button
        type="button"
        className="btn-primary"
        onClick={() => {
          setI((i + 1) % writable.length);
          setRound((r) => r + 1);
        }}
      >
        Kanji tiếp theo →
      </button>
    </div>
  );
}
