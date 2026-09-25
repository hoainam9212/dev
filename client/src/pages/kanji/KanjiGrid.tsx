import { useMemo, useState } from 'react';
import { kanjiMeanings, type Kanji, type ProgressItem } from '@nihongo/shared';
import { srsStatus } from '../../components/SrsBadge';
import { useLang, useT } from '../../i18n';

interface Props {
  kanji: Kanji[];
  progress?: Map<string, ProgressItem>;
  /** Also passes the list as currently shown (after search), so the detail can step through it. */
  onPick: (k: Kanji, shown: Kanji[]) => void;
}

const DOT: Record<ReturnType<typeof srsStatus>, string> = {
  new: 'bg-sky',
  due: 'bg-rose',
  learned: 'bg-emerald-400',
};

export function KanjiGrid({ kanji, progress, onPick }: Props) {
  const t = useT();
  const lang = useLang();
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return kanji;
    return kanji.filter(
      (k) =>
        k.char === s ||
        [...k.meanings, ...(k.meaningsVi ?? [])].some((m) => m.toLowerCase().includes(s)) ||
        k.on.some((r) => r.includes(s)) ||
        k.kun.some((r) => r.includes(s)),
    );
  }, [kanji, q]);

  return (
    <div className="space-y-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t.kanji.searchPlaceholder}
        aria-label={t.common.search}
        className="w-full rounded-full bg-cream px-5 py-2.5 ring-2 ring-sakura/50 focus:outline-none focus:ring-rose dark:bg-bg"
      />
      <p className="text-sm text-muted">{t.kanji.count(filtered.length)}</p>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
        {filtered.map((k) => {
          const meaning = kanjiMeanings(k, lang)[0] ?? '';
          return (
            <button
              key={k.id}
              type="button"
              onClick={() => onPick(k, filtered)}
              className="card relative flex flex-col items-center py-2 transition hover:-translate-y-0.5"
              aria-label={`${k.char} ${meaning}`}
            >
              <span className={`absolute right-2 top-2 h-2 w-2 rounded-full ${DOT[srsStatus(progress?.get(k.id))]}`} />
              <span className="text-3xl font-black">{k.char}</span>
              <span className="w-full truncate px-1 text-center text-[11px] text-muted">{meaning}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
