import { Link } from 'react-router-dom';
import { visibleLessons, type Lesson, type OS, type Track } from '@office-neko/shared';
import { Mochi } from '../components/Mochi';

interface Props {
  tracks: Track[];
  lessons: Record<string, Lesson>;
  os: OS;
  unlock: { trackUnlocked: Set<string>; lessonUnlocked: Set<string> };
  stars: Record<string, number>;
  currentId?: string;
}

export function TrackMap({ tracks, lessons, os, unlock, stars, currentId }: Props) {
  return (
    <div className="space-y-6">
      {[...tracks].sort((a, b) => a.order - b.order).map((t) => {
        const ls = visibleLessons(t, lessons, os);
        const open = unlock.trackUnlocked.has(t.id);
        return (
          <section key={t.id} aria-label={t.title} className="card p-5" style={{ borderTop: `6px solid ${t.color}` }}>
            <h2 className="text-xl font-extrabold">{t.emoji} {t.order}. {t.title}</h2>
            <p className="text-muted">{t.blurb}</p>
            {ls.length === 0 ? (
              <p className="mt-3 rounded-2xl bg-cream p-3 text-muted">📝 Mochi đang soạn bài cho phần này, bạn chờ chút nhé!</p>
            ) : !open ? (
              <p className="mt-3 text-muted">🔒 Hoàn thành phần trước để mở khoá.</p>
            ) : null}
            {ls.length > 0 && (
              <ol className="mt-6 flex flex-wrap gap-x-6 gap-y-10">
                {ls.map((l, i) => {
                  const unlocked = unlock.lessonUnlocked.has(l.id);
                  const s = stars[l.id] ?? 0;
                  return (
                    <li key={l.id} className={`flex w-24 flex-col items-center text-center ${i % 2 ? 'translate-y-4' : ''}`}>
                      {unlocked ? (
                        <Link
                          to={`/lesson/${l.id}`}
                          aria-label={s ? `${l.title}, ${s} sao` : l.title}
                          className="relative grid h-16 w-16 place-items-center rounded-full text-2xl font-extrabold text-white shadow-md transition hover:scale-105"
                          style={{ background: t.color }}
                        >
                          {i + 1}
                          {l.id === currentId && (
                            <span className="absolute -top-10"><Mochi size={34} mood="happy" /></span>
                          )}
                        </Link>
                      ) : (
                        <span aria-label={`${l.title} (đang khoá)`} className="grid h-16 w-16 place-items-center rounded-full bg-muted/20 text-2xl">🔒</span>
                      )}
                      <span aria-hidden className="mt-1 text-xs text-butter">{'★'.repeat(s)}<span className="text-muted/40">{'★'.repeat(3 - s)}</span></span>
                      <span className="text-sm font-semibold leading-tight">{l.title}</span>
                    </li>
                  );
                })}
              </ol>
            )}
          </section>
        );
      })}
    </div>
  );
}
