import { useLiveQuery } from 'dexie-react-hooks';
import { Link } from 'react-router-dom';
import { LEVELS, type ContentIndex, type ItemType } from '@nihongo/shared';
import { db } from '../db/db';
import { xpByDay, statusCounts, dueForecast, todayStats } from '../db/stats';
import { useJson } from '../content/loader';
import { useProgress } from '../store/progress';
import { levelFromXp } from '../store/streak';
import { BarChart } from '../components/BarChart';
import { LoadingCat } from '../components/LoadingCat';
import { Mascot } from '../components/Mascot';

const TYPE_LABEL: Record<ItemType, string> = { vocab: 'Từ vựng', kanji: 'Kanji', grammar: 'Ngữ pháp' };
const KIND_LABEL: Record<string, string> = {
  flashcard: 'Thẻ ghi nhớ', quiz: 'Trắc nghiệm', typing: 'Gõ đáp án', listening: 'Nghe', writing: 'Viết',
  speaking: 'Nói', reading: 'Đọc', dictation: 'Chính tả', scramble: 'Sắp xếp câu', sentence: 'Đặt câu',
};

export function ProgressPage() {
  const progress = useLiveQuery(() => db.progress.toArray(), []);
  const sessions = useLiveQuery(() => db.sessions.orderBy('startedAt').reverse().limit(500).toArray(), []);
  const index = useJson<ContentIndex>('index.json');
  const xp = useProgress((s) => s.xp);
  const streak = useProgress((s) => s.streak);

  if (!progress || !sessions) return <LoadingCat />;

  const lv = levelFromXp(xp);
  const today = todayStats(sessions);
  const week = xpByDay(sessions, 7);
  const status = statusCounts(progress);
  const forecast = dueForecast(progress, 7);
  const totals = (type: ItemType) => LEVELS.reduce((a, l) => a + (index.data?.counts[type]?.[l] ?? 0), 0);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black text-rose">Tiến độ</h1>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Cấp độ" value={`Cấp ${lv.level}`} sub={`${lv.into}/${lv.need} XP`} />
        <Stat label="Tổng XP" value={String(xp)} sub="tích lũy" />
        <Stat label="Chuỗi ngày" value={`${streak} 🔥`} sub="học liên tiếp" />
        <Stat label="Hôm nay" value={`+${today.xp} XP`} sub={`${today.sessions} phiên học`} />
      </section>

      <section className="card p-4 md:p-6">
        <h2 className="mb-2 font-black">XP 7 ngày qua</h2>
        <BarChart data={week.map((d) => ({ label: d.label, value: d.xp }))} />
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {(['vocab', 'kanji', 'grammar'] as ItemType[]).map((t) => {
          const c = status[t];
          const total = totals(t);
          const started = c.learning + c.learned;
          const pct = total ? Math.round((started / total) * 100) : 0;
          return (
            <div key={t} className="card p-4">
              <div className="flex items-baseline justify-between">
                <h3 className="font-black">{TYPE_LABEL[t]}</h3>
                <span className="text-xs text-muted">
                  {started}/{total || '…'} · {pct}%
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-sakura/30">
                <div className="h-full rounded-full bg-gradient-to-r from-rose to-lavender" style={{ width: `${pct}%` }} />
              </div>
              <dl className="mt-3 grid grid-cols-3 gap-1 text-center text-xs">
                <div>
                  <dt className="text-muted">Đang học</dt>
                  <dd className="text-lg font-black text-lavender">{c.learning}</dd>
                </div>
                <div>
                  <dt className="text-muted">Đã thuộc</dt>
                  <dd className="text-lg font-black text-emerald-500">{c.learned}</dd>
                </div>
                <div>
                  <dt className="text-muted">Đến hạn</dt>
                  <dd className="text-lg font-black text-rose">{c.due}</dd>
                </div>
              </dl>
            </div>
          );
        })}
      </section>

      <section className="card p-4 md:p-6">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-black">Lịch ôn 7 ngày tới</h2>
          {forecast[0]!.count > 0 && (
            <Link to="/review" className="btn-primary text-sm">
              Ôn ngay ({forecast[0]!.count})
            </Link>
          )}
        </div>
        <BarChart data={forecast.map((d) => ({ label: d.label, value: d.count }))} color="var(--color-sky)" />
      </section>

      <section className="card p-4 md:p-6">
        <h2 className="mb-2 font-black">Phiên học gần đây</h2>
        {sessions.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-4">
            <Mascot mood="sleepy" size={90} />
            <p className="text-sm text-muted">Chưa có phiên học nào. Bắt đầu thôi!</p>
          </div>
        ) : (
          <ul className="divide-y divide-sakura/30 text-sm">
            {sessions.slice(0, 10).map((s) => (
              <li key={s.id} className="flex items-center gap-3 py-2">
                <span className="w-28 text-xs text-muted">{new Date(s.startedAt).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })}</span>
                <span className="flex-1 font-bold">
                  {KIND_LABEL[s.kind] ?? s.kind} · {TYPE_LABEL[s.type as ItemType] ?? s.type}
                </span>
                <span className="text-muted">
                  {s.correct}/{s.total}
                </span>
                <span className="font-bold text-rose">+{s.xp} XP</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="card p-4">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="text-2xl font-black text-rose">{value}</p>
      <p className="text-xs text-muted">{sub}</p>
    </div>
  );
}
