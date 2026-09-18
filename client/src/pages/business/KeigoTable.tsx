import { useMemo, useState } from 'react';
import type { BusinessItem } from '@nihongo/shared';
import { speak } from '../../lib/tts';

/** "申す・申し上げる" → "申す" for TTS. */
export const firstForm = (s?: string) => (s ?? '').split('・')[0]!.trim();

function Cell({ text }: { text?: string }) {
  if (!text || text === '—') return <span className="text-muted">—</span>;
  return (
    <button type="button" className="text-left font-bold hover:text-rose" onClick={() => speak(firstForm(text))} aria-label={`Nghe ${text}`}>
      {text}
    </button>
  );
}

export function KeigoTable({ items }: { items: BusinessItem[] }) {
  const [q, setQ] = useState('');
  const rows = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return items;
    return items.filter((i) => i.ja.includes(t) || i.reading.includes(t) || i.vi.toLowerCase().includes(t) || Object.values(i.keigo ?? {}).some((v) => v?.includes(t)));
  }, [items, q]);

  return (
    <div className="space-y-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Tìm động từ…"
        aria-label="Tìm kiếm"
        className="w-full rounded-full bg-cream px-5 py-2.5 ring-2 ring-sakura/50 focus:outline-none focus:ring-rose dark:bg-bg"
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="text-left text-xs text-muted">
              <th className="py-2 pr-3">Thường</th>
              <th className="py-2 pr-3 text-rose">尊敬語 Tôn kính</th>
              <th className="py-2 pr-3 text-lavender">謙譲語 Khiêm nhường</th>
              <th className="py-2 pr-3 text-sky">丁寧語 Lịch sự</th>
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
                    {i.reading} · {i.vi}
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
