import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { unlockState, visibleLessons } from '@office-neko/shared';
import { LESSONS, TRACKS } from '../content';
import { useProfile } from '../db/profile';
import { useCompleted, useStreak, useTodayMinutes } from '../progress/useStats';
import { Mochi } from '../components/Mochi';
import { TrackMap } from '../home/TrackMap';
import { GoalRing } from '../home/GoalRing';

export function HomePage() {
  const profile = useProfile()!;
  const { completed, stars } = useCompleted();
  const today = useTodayMinutes();
  const streak = useStreak();
  const doneKey = [...completed].sort().join('|');
  const unlock = useMemo(
    () => unlockState(TRACKS, LESSONS, profile.os, completed),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profile.os, doneKey],
  );
  const next = [...TRACKS]
    .sort((a, b) => a.order - b.order)
    .flatMap((t) => visibleLessons(t, LESSONS, profile.os))
    .find((l) => unlock.lessonUnlocked.has(l.id) && !completed.has(l.id));

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 pb-24">
      <section className="card flex flex-wrap items-center gap-4 p-5">
        <Mochi mood="happy" size={110} />
        <div className="min-w-48 flex-1">
          <h1 className="text-2xl font-extrabold">Chào {profile.name}! 👋</h1>
          <p className="text-muted">
            {next ? `Bài tiếp theo: ${next.title}` : 'Bạn đã học hết các bài hiện có. Mochi đang soạn thêm bài mới!'}
          </p>
          {next && <Link to={`/lesson/${next.id}`} className="btn-primary mt-3">Học tiếp ▶</Link>}
        </div>
        <GoalRing minutes={today} goal={profile.dailyGoalMin} />
        <div className="text-center">
          <div className="text-3xl">🔥</div>
          <div className="font-extrabold">{streak} ngày</div>
        </div>
      </section>
      <TrackMap tracks={TRACKS} lessons={LESSONS} os={profile.os} unlock={unlock} stars={stars} currentId={next?.id} />
    </div>
  );
}
