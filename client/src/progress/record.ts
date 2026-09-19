import { dayKey, xpGain } from '@office-neko/shared';
import { db } from '../db/db';

export async function recordLessonResult(r: {
  lessonId: string;
  stars: 1 | 2 | 3;
  hintsUsed: number;
  timeMs: number;
  now?: Date;
}): Promise<{ xpGained: number; prevStars: number }> {
  const now = r.now ?? new Date();
  return db.transaction('rw', db.progress, db.profile, db.activity, async () => {
    const prev = await db.progress.get(r.lessonId);
    const prevStars = prev?.stars ?? 0;
    const gained = xpGain(prevStars, r.stars);
    await db.progress.put({
      lessonId: r.lessonId,
      stars: Math.max(prevStars, r.stars) as 1 | 2 | 3,
      hintsUsed: prev ? Math.min(prev.hintsUsed, r.hintsUsed) : r.hintsUsed,
      bestTimeMs: prev ? Math.min(prev.bestTimeMs, r.timeMs) : r.timeMs,
      completedAt: now.toISOString(),
    });
    const profile = await db.profile.get('me');
    if (profile && gained) await db.profile.update('me', { xp: profile.xp + gained });
    const day = dayKey(now);
    const act = (await db.activity.get(day)) ?? { day, minutes: 0, xp: 0 };
    await db.activity.put({
      day,
      minutes: act.minutes + Math.max(1, Math.round(r.timeMs / 60_000)),
      xp: act.xp + gained,
    });
    return { xpGained: gained, prevStars };
  });
}
