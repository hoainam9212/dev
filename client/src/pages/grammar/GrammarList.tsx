import { useMemo, useState } from 'react';
import { grammarMeaning, type Grammar, type ProgressItem } from '@nihongo/shared';
import { SrsBadge } from '../../components/SrsBadge';
import { useLang, useT } from '../../i18n';

interface Props {
  grammar: Grammar[];
  progress?: Map<string, ProgressItem>;
  onPick: (g: Grammar) => void;
}

export function GrammarList({ grammar, progress, onPick }: Props) {
  const t = useT();
  const lang = useLang();
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return grammar;
    return grammar.filter((g) => [g.title, g.meaning, g.meaningVi ?? ''].some((x) => x.toLowerCase().includes(s)));
  }, [grammar, q]);

  return (
    <div className="space-y-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t.grammar.searchPlaceholder}
        aria-label={t.common.search}
        className="w-full rounded-full bg-cream px-5 py-2.5 ring-2 ring-sakura/50 focus:outline-none focus:ring-rose dark:bg-bg"
      />
      <p className="text-sm text-muted">{t.grammar.count(filtered.length)}</p>
      <ul className="divide-y divide-sakura/30">
        {filtered.map((g) => (
          <li key={g.id}>
            <button type="button" onClick={() => onPick(g)} className="flex w-full items-center gap-3 py-3 text-left hover:bg-sakura/10">
              <div className="flex-1">
                <p className="font-black">{g.title}</p>
                <p className="text-sm text-muted">{grammarMeaning(g, lang)}</p>
              </div>
              <SrsBadge p={progress?.get(g.id)} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
