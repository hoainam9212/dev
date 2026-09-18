import { useMemo, useState } from 'react';
import type { Grammar, ProgressItem } from '@nihongo/shared';
import { SrsBadge } from '../../components/SrsBadge';

interface Props {
  grammar: Grammar[];
  progress?: Map<string, ProgressItem>;
  onPick: (g: Grammar) => void;
}

export function GrammarList({ grammar, progress, onPick }: Props) {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return grammar;
    return grammar.filter((g) => g.title.toLowerCase().includes(t) || g.meaning.toLowerCase().includes(t));
  }, [grammar, q]);

  return (
    <div className="space-y-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Tìm mẫu ngữ pháp hoặc nghĩa…"
        aria-label="Tìm kiếm"
        className="w-full rounded-full bg-cream px-5 py-2.5 ring-2 ring-sakura/50 focus:outline-none focus:ring-rose dark:bg-bg"
      />
      <p className="text-sm text-muted">{filtered.length} mẫu ngữ pháp</p>
      <ul className="divide-y divide-sakura/30">
        {filtered.map((g) => (
          <li key={g.id}>
            <button type="button" onClick={() => onPick(g)} className="flex w-full items-center gap-3 py-3 text-left hover:bg-sakura/10">
              <div className="flex-1">
                <p className="font-black">{g.title}</p>
                <p className="text-sm text-muted">{g.meaning}</p>
              </div>
              <SrsBadge p={progress?.get(g.id)} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
