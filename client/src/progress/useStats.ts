import { useLiveQuery } from 'dexie-react-hooks';
import { computeStreak, dayKey } from '@office-neko/shared';
import { db, type ActivityRow, type ProgressRow } from '../db/db';

const NO_PROGRESS: ProgressRow[] = [];
const NO_ACTIVITY: ActivityRow[] = [];

export function useCompleted(profileId: string | null): { completed: Set<string>; stars: Record<string, number>; loaded: boolean } {
  const raw = useLiveQuery(
    async () => (profileId ? db.lessonProgress.where('profileId').equals(profileId).toArray() : NO_PROGRESS),
    [profileId],
  );
  const rows = raw ?? NO_PROGRESS;
  const completed = new Set(rows.filter((r) => r.stars > 0).map((r) => r.lessonId));
  const stars = Object.fromEntries(rows.map((r) => [r.lessonId, r.stars]));
  // Chưa chọn ai thì không có gì để tải; `loaded` false giữ các màn hình ở trạng
  // thái chờ thay vì khẳng định "người này chưa học bài nào".
  return { completed, stars, loaded: profileId !== null && raw !== undefined };
}

function useActivity(profileId: string | null): ActivityRow[] {
  return useLiveQuery(
    async () => (profileId ? db.dailyActivity.where('profileId').equals(profileId).toArray() : NO_ACTIVITY),
    [profileId],
    NO_ACTIVITY,
  );
}

export function useStreak(profileId: string | null): number {
  return computeStreak(useActivity(profileId).map((r) => r.day), dayKey(new Date()));
}

export function useTodayMinutes(profileId: string | null): number {
  const today = dayKey(new Date());
  return useActivity(profileId).find((r) => r.day === today)?.minutes ?? 0;
}
