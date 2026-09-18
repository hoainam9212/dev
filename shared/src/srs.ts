export type Grade = 0 | 1 | 2 | 3; // 0 quên, 1 khó, 2 tốt, 3 dễ

export interface SrsState {
  ease: number;
  interval: number; // days
  due: string; // ISO
  reps: number;
  lapses: number;
}

const DAY = 86_400_000;
const MIN_EASE = 1.3;

export function newState(now: Date): SrsState {
  return { ease: 2.5, interval: 0, due: now.toISOString(), reps: 0, lapses: 0 };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function review(state: SrsState, grade: Grade, now: Date): SrsState {
  let { ease, interval, reps, lapses } = state;

  if (grade === 0) {
    lapses += 1;
    reps = 0;
    interval = 0;
    ease = Math.max(MIN_EASE, round2(ease - 0.2));
    const dueMs = now.getTime() + 10 * 60_000;
    return { ease, interval, due: new Date(dueMs).toISOString(), reps, lapses };
  }

  if (grade === 1) {
    interval = reps === 0 ? 1 : Math.max(1, Math.round(interval * 1.2));
    ease = Math.max(MIN_EASE, round2(ease - 0.15));
  } else if (grade === 2) {
    if (reps === 0) interval = 1;
    else if (reps === 1) interval = 3;
    else interval = Math.max(interval + 1, Math.round(interval * ease));
  } else {
    interval = reps === 0 ? 4 : Math.max(interval + 1, Math.round(interval * ease * 1.3));
    ease = round2(ease + 0.15);
  }
  reps += 1;
  const dueMs = now.getTime() + interval * DAY;
  return { ease, interval, due: new Date(dueMs).toISOString(), reps, lapses };
}

export function isDue(state: SrsState, now: Date): boolean {
  return new Date(state.due).getTime() <= now.getTime();
}

export interface QueueItem {
  id: string;
  state?: SrsState;
}

export function buildQueue(
  items: QueueItem[],
  now: Date,
  opts: { newLimit?: number } = {},
): string[] {
  const newLimit = opts.newLimit ?? 20;
  const due = items
    .filter((i) => i.state && isDue(i.state, now))
    .sort((a, b) => new Date(a.state!.due).getTime() - new Date(b.state!.due).getTime())
    .map((i) => i.id);
  const fresh = items
    .filter((i) => !i.state)
    .slice(0, newLimit)
    .map((i) => i.id);
  return [...due, ...fresh];
}
