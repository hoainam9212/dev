import { useMemo, useState } from 'react';
import { pickText, type BusinessItem } from '@nihongo/shared';
import { speak, useStopSpeechOnUnmount } from '../../lib/tts';
import { useLang, useT } from '../../i18n';

/** Glossary categories in display order; labels live in `business.glossaryGroups`. */
export const GLOSSARY_GROUPS = ['process', 'docs', 'quality', 'pm', 'tech'] as const;

export function GlossaryList({ items }: { items: BusinessItem[] }) {
  useStopSpeechOnUnmount();
  const t = useT();
  const lang = useLang();
  const [q, setQ] = useState('');
  const [group, setGroup] = useState<string>('all');
  const [showEx, setShowEx] = useState(true);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    // meanings match in both languages: learners search in English while Vietnamese data is the source
    return items.filter(
      (i) =>
        (group === 'all' || i.category === group) &&
        (!s || i.ja.includes(s) || i.reading.includes(s) || i.vi.toLowerCase().includes(s) || !!i.en?.toLowerCase().includes(s) || i.example?.ja.includes(s)),
    );
  }, [items, q, group]);

  const groups = GLOSSARY_GROUPS.filter((g) => items.some((i) => i.category === g));

  return (
    <div className="space-y-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t.business.glossarySearch}
        aria-label={t.business.glossarySearchAria}
        className="w-full rounded-full bg-cream px-5 py-2.5 ring-2 ring-sakura/50 focus:outline-none focus:ring-rose dark:bg-bg"
      />
      <div className="flex flex-wrap items-center gap-2">
        {['all', ...groups].map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGroup(g)}
            className={`rounded-full px-3 py-1 text-xs font-bold ${group === g ? 'bg-lavender text-text' : 'bg-sakura/20 hover:bg-sakura/40'}`}
          >
            {g === 'all' ? t.common.all : t.business.glossaryGroups[g]}
          </button>
        ))}
        <label className="ml-auto flex items-center gap-1 text-xs text-muted">
          <input type="checkbox" checked={showEx} onChange={(e) => setShowEx(e.target.checked)} />
          {t.business.showExamples}
        </label>
      </div>
      <p className="text-sm text-muted">{t.business.terms(filtered.length)}</p>
      <ul className="grid gap-2 md:grid-cols-2">
        {filtered.map((i) => (
          <li key={i.id} className="rounded-2xl bg-cream p-3 dark:bg-bg">
            <div className="flex items-start gap-2">
              <button type="button" className="mt-1 text-rose" onClick={() => speak(i.ja)} aria-label={t.common.listenTo(i.ja)}>
                🔊
              </button>
              <div className="flex-1">
                <p className="text-lg font-black" lang="ja">
                  {i.ja} <span className="text-xs font-normal text-muted">{i.reading}</span>
                </p>
                <p className="text-sm font-bold text-rose">{pickText(i.vi, i.en, lang)}</p>
                {showEx && i.example && (
                  <button type="button" className="mt-1 block text-left text-sm" onClick={() => speak(i.example!.ja)}>
                    <span lang="ja">{i.example.ja}</span>
                    <span className="block text-xs text-muted">{pickText(i.example.vi, i.example.en, lang)}</span>
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
