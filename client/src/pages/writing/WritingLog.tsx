import { useMemo, useState } from 'react';
import type { Writing } from '../../db';
import { useWritings, deleteWriting, clearWritings } from '../../db/writings';
import { speak, useStopSpeechOnUnmount } from '../../lib/tts';
import { LoadingCat } from '../../components/LoadingCat';
import { Mascot } from '../../components/Mascot';

const day = (iso: string) => new Date(iso).toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
const time = (iso: string) => new Date(iso).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

/** Everything the learner wrote in "Đặt câu", newest first, grouped by day. */
export function WritingLog() {
  useStopSpeechOnUnmount();
  const writings = useWritings();
  const [q, setQ] = useState('');
  const [confirmClear, setConfirmClear] = useState(false);

  const groups = useMemo(() => {
    const t = q.trim().toLowerCase();
    const rows = (writings ?? []).filter(
      (w) => !t || w.typed.includes(t) || w.expected.includes(t) || w.grammarTitle.toLowerCase().includes(t) || w.prompt.toLowerCase().includes(t),
    );
    const out: { day: string; items: Writing[] }[] = [];
    for (const w of rows) {
      const d = day(w.createdAt);
      const last = out[out.length - 1];
      if (last && last.day === d) last.items.push(w);
      else out.push({ day: d, items: [w] });
    }
    return out;
  }, [writings, q]);

  if (!writings) return <LoadingCat text="Đang mở sổ câu của bạn…" />;

  if (writings.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <Mascot mood="neutral" size={110} />
        <p className="font-bold">Chưa có câu nào được lưu.</p>
        <p className="text-sm text-muted">Hãy vào phần “Đặt câu”, viết một câu rồi bấm “Kiểm tra”. Câu của bạn sẽ được lưu ở đây.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tìm trong câu đã đặt, mẫu ngữ pháp…"
          aria-label="Tìm câu đã đặt"
          className="min-w-48 flex-1 rounded-full bg-cream px-5 py-2.5 ring-2 ring-sakura/50 focus:outline-none focus:ring-rose dark:bg-bg"
        />
        <span className="text-sm text-muted">{writings.length} câu</span>
        {!confirmClear ? (
          <button type="button" className="text-sm text-rose underline" onClick={() => setConfirmClear(true)}>
            Xóa tất cả
          </button>
        ) : (
          <span className="flex items-center gap-2 text-sm">
            <button type="button" className="btn-primary px-3 py-1 text-sm" onClick={() => void clearWritings().then(() => setConfirmClear(false))}>
              Xóa hết
            </button>
            <button type="button" className="btn-soft px-3 py-1 text-sm" onClick={() => setConfirmClear(false)}>
              Hủy
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
                  <span>{time(w.createdAt)}</span>
                  <span className={`ml-auto rounded-full px-2 py-0.5 font-bold ${w.ok ? 'bg-emerald-100 text-emerald-700' : 'bg-rose/20 text-rose'}`}>
                    {w.ok ? 'Khớp mẫu' : 'Chưa khớp'} {Math.round(w.score * 100)}%
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">{w.prompt}</p>
                <p className="text-lg font-bold" lang="ja">
                  {w.typed}
                </p>
                <div className="mt-1 flex items-start gap-2">
                  <button type="button" className="text-rose" onClick={() => speak(w.expected)} aria-label="Nghe câu mẫu">
                    🔊
                  </button>
                  <p className="text-sm" lang="ja">
                    <span className="text-muted">Câu mẫu: </span>
                    {w.expected}
                  </p>
                  <button
                    type="button"
                    className="ml-auto text-xs text-muted underline"
                    aria-label="Xóa câu này"
                    onClick={() => void deleteWriting(w.id!)}
                  >
                    Xóa
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
