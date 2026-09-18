import type { ProgressItem } from '@nihongo/shared';
import { xpByDay, statusCounts, dueForecast, todayStats } from './stats';
import type { SessionLog } from './db';

const T = new Date(2026, 8, 19, 12, 0, 0); // local 2026-09-19 noon
const iso = (d: Date) => d.toISOString();
const S = (daysAgo: number, xp: number): SessionLog => ({ startedAt: iso(new Date(T.getTime() - daysAgo * 86_400_000)), kind: 'quiz', type: 'vocab', correct: 1, total: 1, xp });
const P = (id: string, type: ProgressItem['type'], interval: number, dueInDays: number): ProgressItem => ({
  itemId: id, type, ease: 2.5, interval, due: iso(new Date(T.getTime() + dueInDays * 86_400_000)), reps: 1, lapses: 0, updatedAt: iso(T),
});

it('xpByDay sums xp per day over the window', () => {
  const rows = xpByDay([S(0, 5), S(0, 7), S(1, 3), S(9, 100)], 7, T);
  expect(rows).toHaveLength(7);
  expect(rows[6]!.xp).toBe(12);
  expect(rows[5]!.xp).toBe(3);
  expect(rows.reduce((a, r) => a + r.xp, 0)).toBe(15);
});

it('statusCounts splits learning/learned/due', () => {
  const c = statusCounts([P('a', 'vocab', 3, -1), P('b', 'vocab', 30, 5), P('c', 'kanji', 1, 1)], T);
  expect(c.vocab).toEqual({ learning: 1, learned: 1, due: 1 });
  expect(c.kanji).toEqual({ learning: 1, learned: 0, due: 0 });
});

it('dueForecast buckets by day with overdue on today', () => {
  const f = dueForecast([P('a', 'vocab', 3, -2), P('b', 'vocab', 3, 0.1), P('c', 'vocab', 3, 2), P('d', 'vocab', 3, 30)], 7, T);
  expect(f[0]!.count).toBe(2);
  expect(f[2]!.count).toBe(1);
  expect(f.reduce((a, r) => a + r.count, 0)).toBe(3);
});

it('todayStats counts only today', () => {
  expect(todayStats([S(0, 4), S(0, 6), S(2, 9)], T)).toEqual({ sessions: 2, xp: 10 });
});
