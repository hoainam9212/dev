export function todayStr(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function dayDiff(a: string, b: string): number {
  return Math.round((Date.parse(b + 'T00:00:00Z') - Date.parse(a + 'T00:00:00Z')) / 86_400_000);
}

export function nextStreak(prevDay: string | null, prevStreak: number, today: string): number {
  if (!prevDay) return 1;
  const diff = dayDiff(prevDay, today);
  if (diff === 0) return prevStreak;
  if (diff === 1) return prevStreak + 1;
  return 1;
}

/** Level n needs 100*n XP to reach n+1. */
export function levelFromXp(xp: number): { level: number; into: number; need: number } {
  let level = 1;
  let rest = xp;
  while (rest >= 100 * level) {
    rest -= 100 * level;
    level += 1;
  }
  return { level, into: rest, need: 100 * level };
}
