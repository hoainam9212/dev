import { useMemo, useState } from 'react';
import { pickText } from '@nihongo/shared';
import type { Writing } from '../../db';
import { useWritings, deleteWriting, clearWritings } from '../../db/writings';
import { speak, useStopSpeechOnUnmount } from '../../lib/tts';
import { LoadingCat } from '../../components/LoadingCat';
import { Mascot } from '../../components/Mascot';
import { useLang, useT } from '../../i18n';

const day = (iso: string, locale: string) => new Date(iso).toLocaleDateString(locale, { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
const time = (iso: string, locale: string) => new Date(iso).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });

/** Everything the learner wrote in the sentence builder, newest first, grouped by day. */
export function WritingLog() {
  useStopSpeechOnUnmount();
  const t = useT();
  const lang = useLang();
  const locale = t.common.locale;
  const writings = useWritings();
  const [q, setQ] = useState('');
  const [confirmClear, setConfirmClear] = useState(false);

  const groups = useMemo(() => {
    const s = q.trim().toLowerCase();
    const rows = (writings ?? []).filter(
      (w) =>
        !s ||
        w.typed.includes(s) ||
        w.expected.includes(s) ||
        w.grammarTitle.toLowerCase().includes(s) ||
        w.prompt.toLowerCase().includes(s) ||
        !!w.promptVi?.toLowerCase().includes(s),
    );
    const out: { day: string; items: Writing[] }[] = [];
    for (const w of rows) {
      const d = day(w.createdAt, locale);
      const last = out[out.length - 1];
      if (last && last.day === d) last.items.push(w);
      else out.push({ day: d, items: [w] });
    }
    return out;
  }, [writings, q, locale]);

  if (!writings) return <LoadingCat text={t.writing.logLoading} />;

  if (writings.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <Mascot mood="neutral" size={110} />
        <p className="font-bold">{t.writing.logEmpty}</p>
        <p className="text-sm text-muted">{t.writing.logEmptyHint}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.writing.logSearch}
          aria-label={t.writing.logSearchAria}
          className="min-w-48 flex-1 rounded-full bg-cream px-5 py-2.5 ring-2 ring-sakura/50 focus:outline-none focus:ring-rose dark:bg-bg"
        />
        <span className="text-sm text-muted">{t.writing.sentences(writings.length)}</span>
        {!confirmClear ? (
          <button type="button" className="text-sm text-rose underline" onClick={() => setConfirmClear(true)}>
            {t.writing.clearAll}
          </button>
        ) : (
          <span className="flex items-center gap-2 text-sm">
            <button type="button" className="btn-primary px-3 py-1 text-sm" onClick={() => void clearWritings().then(() => setConfirmClear(false))}>
              {t.writing.confirmClear}
            </button>
            <button type="button" className="btn-soft px-3 py-1 text-sm" onClick={() => setConfirmClear(false)}>
              {t.writing.cancel}
            </button>
          </span>
        )}
      </div>

      {groups.map((g) => (
        <section key={g.day} className="space-y-2">
          <h3 className="text-xs font-black uppercase text-muted">{g.day}</h3>
          <ul className="space-y-2">
            {g.items.map((w) => (
              <li key={w.id} className="rounded-2xl bg-cream p-3 dark:bg-bg">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                  <span className="rounded-full bg-lavender/40 px-2 py-0.5 font-bold text-text">{w.level}</span>
                  <span className="font-bold text-rose">{w.grammarTitle}</span>
                  <span>{time(w.createdAt, locale)}</span>
                  <span className={`ml-auto rounded-full px-2 py-0.5 font-bold ${w.ok ? 'bg-emerald-100 text-emerald-700' : 'bg-rose/20 text-rose'}`}>
                    {w.ok ? t.writing.matched : t.writing.notMatched} {Math.round(w.score * 100)}%
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">{pickText(w.promptVi, w.prompt, lang)}</p>
                <p className="text-lg font-bold" lang="ja">
                  {w.typed}
                </p>
                <div className="mt-1 flex items-start gap-2">
                  <button type="button" className="text-rose" onClick={() => speak(w.expected)} aria-label={t.writing.listenSample}>
                    🔊
                  </button>
                  <p className="text-sm" lang="ja">
                    <span className="text-muted">{t.writing.sample}</span>
                    {w.expected}
                  </p>
                  <button
                    type="button"
                    className="ml-auto text-xs text-muted underline"
                    aria-label={t.writing.deleteOneAria}
                    onClick={() => void deleteWriting(w.id!)}
                  >
                    {t.writing.delete}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
