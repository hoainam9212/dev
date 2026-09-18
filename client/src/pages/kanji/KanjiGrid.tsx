import { useMemo, useState } from 'react';
import type { Kanji, ProgressItem } from '@nihongo/shared';
import { srsStatus } from '../../components/SrsBadge';

interface Props {
  kanji: Kanji[];
  progress?: Map<string, ProgressItem>;
  onPick: (k: Kanji) => void;
}

const DOT: Record<ReturnType<typeof srsStatus>, string> = {
  new: 'bg-sky',
  due: 'bg-rose',
  learned: 'bg-emerald-400',
};

export function KanjiGrid({ kanji, progress, onPick }: Props) {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return kanji;
    return kanji.filter(
      (k) =>
        k.char === t ||
        k.meanings.some((m) => m.toLowerCase().includes(t)) ||
        k.on.some((r) => r.includes(t)) ||
        k.kun.some((r) => r.includes(t)),
    );
  }, [kanji, q]);

  return (
    <div className="space-y-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Tìm kanji, nghĩa hoặc âm đọc…"
        aria-label="Tìm kiếm"
        className="w-full rounded-full bg-cream px-5 py-2.5 ring-2 ring-sakura/50 focus:outline-none focus:ring-rose dark:bg-bg"
      />
      <p className="text-sm text-muted">{filtered.length} kanji</p>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
        {filtered.map((k) => (
          <button
            key={k.id}
            type="button"
            onClick={() => onPick(k)}
            className="card relative flex flex-col items-center py-2 transition hover:-translate-y-0.5"
            aria-label={`${k.char} ${k.meanings[0] ?? ''}`}
          >
            <span className={`absolute right-2 top-2 h-2 w-2 rounded-full ${DOT[srsStatus(progress?.get(k.id))]}`} />
            <span className="text-3xl font-black">{k.char}</span>
            <span className="w-full truncate px-1 text-center text-[11px] text-muted">{k.meanings[0]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
