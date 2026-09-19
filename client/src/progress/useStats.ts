import { useLiveQuery } from 'dexie-react-hooks';
import { computeStreak, dayKey } from '@office-neko/shared';
import { db, type ActivityRow, type ProgressRow } from '../db/db';

const NO_PROGRESS: ProgressRow[] = [];
const NO_ACTIVITY: ActivityRow[] = [];

export function useCompleted(): { completed: Set<string>; stars: Record<string, number> } {
  const rows = useLiveQuery(() => db.progress.toArray(), [], NO_PROGRESS);
  const completed = new Set(rows.filter((r) => r.stars > 0).map((r) => r.lessonId));
  const stars = Object.fromEntries(rows.map((r) => [r.lessonId, r.stars]));
  return { completed, stars };
}

function useActivity(): ActivityRow[] {
  return useLiveQuery(() => db.activity.toArray(), [], NO_ACTIVITY);
}

export function useStreak(): number {
  return computeStreak(useActivity().map((r) => r.day), dayKey(new Date()));
}

export function useTodayMinutes(): number {
  const today = dayKey(new Date());
  return useActivity().find((r) => r.day === today)?.minutes ?? 0;
}
