import { useLiveQuery } from 'dexie-react-hooks';
import { badgesEarned, computeStreak, dayKey, levelFromXp } from '@office-neko/shared';
import { db, type BadgeRow } from '../db/db';

/** Gom số liệu của một hồ sơ, ghi huy hiệu mới đạt; trả id những huy hiệu MỚI lần này. Gọi lại không tạo bản ghi trùng. */
export async function awardBadges(profileId: string, now = new Date()): Promise<string[]> {
  return db.transaction('rw', [db.lessonProgress, db.typingRuns, db.dailyActivity, db.profiles, db.earnedBadges], async () => {
    const progress = await db.lessonProgress.where('profileId').equals(profileId).toArray();
    const runs = await db.typingRuns.where('profileId').equals(profileId).toArray();
    const days = await db.dailyActivity.where('profileId').equals(profileId).toArray();
    const profile = await db.profiles.get(profileId);
    const earned = badgesEarned({
      completed: new Set(progress.filter((r) => r.stars > 0).map((r) => r.lessonId)),
      bestWpm: runs.reduce((m, r) => Math.max(m, r.wpm), 0),
      streak: computeStreak(days.map((d) => d.day), dayKey(now)),
      level: levelFromXp(profile?.xp ?? 0).level,
    });
    const have = new Set((await db.earnedBadges.where('profileId').equals(profileId).toArray()).map((r) => r.id));
    const fresh = earned.filter((id) => !have.has(id));
    if (fresh.length) {
      await db.earnedBadges.bulkPut(fresh.map((id) => ({ profileId, id, earnedAt: now.toISOString() })));
    }
    return fresh;
  });
}

const NO_BADGES: BadgeRow[] = [];

export function useBadges(profileId: string | null): { earned: Set<string>; loaded: boolean } {
  const raw = useLiveQuery(
    async () => (profileId ? db.earnedBadges.where('profileId').equals(profileId).toArray() : NO_BADGES),
    [profileId],
  );
  return { earned: new Set((raw ?? NO_BADGES).map((r) => r.id)), loaded: profileId !== null && raw !== undefined };
}
