import { useMemo, useState } from 'react';
import type { BusinessItem } from '@nihongo/shared';
import { speak } from '../../lib/tts';

export const GLOSSARY_GROUPS: Record<string, string> = {
  process: 'Công đoạn dự án',
  docs: 'Tài liệu',
  quality: 'Chất lượng & lỗi',
  pm: 'Quản lý dự án',
  tech: 'Kỹ thuật',
};

export function GlossaryList({ items }: { items: BusinessItem[] }) {
  const [q, setQ] = useState('');
  const [group, setGroup] = useState<string>('all');
  const [showEx, setShowEx] = useState(true);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return items.filter(
      (i) =>
        (group === 'all' || i.category === group) &&
        (!t || i.ja.includes(t) || i.reading.includes(t) || i.vi.toLowerCase().includes(t) || i.example?.ja.includes(t)),
    );
  }, [items, q, group]);

  const groups = Object.keys(GLOSSARY_GROUPS).filter((g) => items.some((i) => i.category === g));

  return (
    <div className="space-y-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Tìm thuật ngữ, cách đọc hoặc nghĩa…"
        aria-label="Tìm thuật ngữ"
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
            {g === 'all' ? 'Tất cả' : GLOSSARY_GROUPS[g]}
          </button>
        ))}
        <label className="ml-auto flex items-center gap-1 text-xs text-muted">
          <input type="checkbox" checked={showEx} onChange={(e) => setShowEx(e.target.checked)} />
          Hiện câu ví dụ
        </label>
      </div>
      <p className="text-sm text-muted">{filtered.length} thuật ngữ</p>
      <ul className="grid gap-2 md:grid-cols-2">
        {filtered.map((i) => (
          <li key={i.id} className="rounded-2xl bg-cream p-3 dark:bg-bg">
            <div className="flex items-start gap-2">
              <button type="button" className="mt-1 text-rose" onClick={() => speak(i.ja)} aria-label={`Nghe ${i.ja}`}>
                🔊
              </button>
              <div className="flex-1">
                <p className="text-lg font-black" lang="ja">
                  {i.ja} <span className="text-xs font-normal text-muted">{i.reading}</span>
                </p>
                <p className="text-sm font-bold text-rose">{i.vi}</p>
                {showEx && i.example && (
                  <button type="button" className="mt-1 block text-left text-sm" onClick={() => speak(i.example!.ja)}>
                    <span lang="ja">{i.example.ja}</span>
                    <span className="block text-xs text-muted">{i.example.vi}</span>
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
