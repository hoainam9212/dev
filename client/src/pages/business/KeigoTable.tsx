import { useMemo, useState } from 'react';
import { pickText, type BusinessItem } from '@nihongo/shared';
import { speak, useStopSpeechOnUnmount } from '../../lib/tts';
import { useLang, useT } from '../../i18n';

/** "申す・申し上げる" → "申す" for TTS. */
export const firstForm = (s?: string) => (s ?? '').split('・')[0]!.trim();

function Cell({ text }: { text?: string }) {
  const t = useT();
  if (!text || text === '—') return <span className="text-muted">—</span>;
  return (
    <button type="button" className="text-left font-bold hover:text-rose" onClick={() => speak(firstForm(text))} aria-label={t.common.listenTo(text)}>
      {text}
    </button>
  );
}

export function KeigoTable({ items }: { items: BusinessItem[] }) {
  useStopSpeechOnUnmount();
  const t = useT();
  const lang = useLang();
  const [q, setQ] = useState('');
  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter(
      (i) =>
        i.ja.includes(s) ||
        i.reading.includes(s) ||
        i.vi.toLowerCase().includes(s) ||
        !!i.en?.toLowerCase().includes(s) ||
        Object.values(i.keigo ?? {}).some((v) => v?.includes(s)),
    );
  }, [items, q]);

  return (
    <div className="space-y-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t.business.keigoSearch}
        aria-label={t.common.search}
        className="w-full rounded-full bg-cream px-5 py-2.5 ring-2 ring-sakura/50 focus:outline-none focus:ring-rose dark:bg-bg"
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="text-left text-xs text-muted">
              <th className="py-2 pr-3">{t.business.keigoHeaders.plain}</th>
              <th className="py-2 pr-3 text-rose">{t.business.keigoHeaders.sonkei}</th>
              <th className="py-2 pr-3 text-lavender">{t.business.keigoHeaders.kenjou}</th>
              <th className="py-2 pr-3 text-sky">{t.business.keigoHeaders.teinei}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sakura/30">
            {rows.map((i) => (
              <tr key={i.id}>
                <td className="py-2 pr-3">
                  <button type="button" className="font-black hover:text-rose" onClick={() => speak(i.ja)}>
                    {i.ja}
                  </button>
                  <div className="text-xs text-muted">
                    {i.reading} · {pickText(i.vi, i.en, lang)}
                  </div>
                </td>
                <td className="py-2 pr-3">
                  <Cell text={i.keigo?.sonkei} />
                </td>
                <td className="py-2 pr-3">
                  <Cell text={i.keigo?.kenjou} />
                </td>
                <td className="py-2 pr-3">
                  <Cell text={i.keigo?.teinei} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
