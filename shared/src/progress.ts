import type { Lesson, OS, Track } from './types';

export interface LessonOutcome {
  maxHintLevel: 0 | 1 | 2 | 3;
  failures: number;
}

export function computeStars(o: LessonOutcome): 1 | 2 | 3 {
  if (o.maxHintLevel >= 2 || o.failures >= 4) return 1;
  if (o.maxHintLevel === 1 || o.failures >= 2) return 2;
  return 3;
}

export const XP_PER_STAR = 10;
export function xpGain(prevStars: number, newStars: number): number {
  return Math.max(0, newStars - prevStars) * XP_PER_STAR;
}

export function levelFromXp(xp: number): { level: number; into: number; need: number } {
  const level = Math.floor(Math.sqrt(Math.max(0, xp) / 50)) + 1;
  const base = 50 * (level - 1) ** 2;
  const next = 50 * level ** 2;
  return { level, into: xp - base, need: next - base };
}

export function dayKey(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

function shiftDay(key: string, delta: number): string {
  const [y, m, d] = key.split('-').map(Number);
  return dayKey(new Date(y!, m! - 1, d! + delta));
}

export function computeStreak(days: Iterable<string>, today: string): number {
  const set = new Set(days);
  let cur = set.has(today) ? today : shiftDay(today, -1);
  let n = 0;
  while (set.has(cur)) {
    n++;
    cur = shiftDay(cur, -1);
  }
  return n;
}

export function visibleLessons(track: Track, lessons: Record<string, Lesson>, os: OS): Lesson[] {
  return track.chapters
    .flatMap((c) => c.lessonIds)
    .map((id) => lessons[id])
    .filter((l): l is Lesson => !!l && (!l.os || l.os === os));
}

const byOrder = (tracks: Track[]) => [...tracks].sort((a, b) => a.order - b.order);

export function unlockState(
  tracks: Track[],
  lessons: Record<string, Lesson>,
  os: OS,
  completed: ReadonlySet<string>,
): { trackUnlocked: Set<string>; lessonUnlocked: Set<string> } {
  const trackUnlocked = new Set<string>();
  const lessonUnlocked = new Set<string>();
  let prevDone = true;
  for (const t of byOrder(tracks)) {
    const ls = visibleLessons(t, lessons, os);
    if (prevDone) {
      trackUnlocked.add(t.id);
      ls.forEach((l, i) => {
        if (i === 0 || completed.has(ls[i - 1]!.id)) lessonUnlocked.add(l.id);
      });
    }
    prevDone = prevDone && ls.every((l) => completed.has(l.id));
  }
  return { trackUnlocked, lessonUnlocked };
}

export function nextLessonId(tracks: Track[], lessons: Record<string, Lesson>, os: OS, currentId: string): string | null {
  const order = byOrder(tracks).flatMap((t) => visibleLessons(t, lessons, os).map((l) => l.id));
  const i = order.indexOf(currentId);
  return i >= 0 && i + 1 < order.length ? order[i + 1]! : null;
}
