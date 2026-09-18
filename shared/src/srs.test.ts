import { describe, it, expect } from 'vitest';
import { newState, review, isDue, buildQueue, type SrsState } from './srs';

const T0 = new Date('2026-09-19T08:00:00.000Z');
const days = (n: number) => new Date(T0.getTime() + n * 86_400_000);

describe('newState', () => {
  it('starts with ease 2.5, interval 0, due now', () => {
    const s = newState(T0);
    expect(s).toEqual({ ease: 2.5, interval: 0, due: T0.toISOString(), reps: 0, lapses: 0 });
  });
});

describe('review', () => {
  it('good on a new card schedules 1 day', () => {
    const s = review(newState(T0), 2, T0);
    expect(s.interval).toBe(1);
    expect(s.reps).toBe(1);
    expect(s.due).toBe(days(1).toISOString());
  });
  it('second good schedules 3 days, third uses ease', () => {
    let s = review(newState(T0), 2, T0);
    s = review(s, 2, days(1));
    expect(s.interval).toBe(3);
    s = review(s, 2, days(4));
    expect(s.interval).toBe(Math.round(3 * 2.5));
  });
  it('easy on a new card schedules 4 days and raises ease', () => {
    const s = review(newState(T0), 3, T0);
    expect(s.interval).toBe(4);
    expect(s.ease).toBeCloseTo(2.65);
  });
  it('hard grows interval slowly and lowers ease', () => {
    let s = review(newState(T0), 2, T0);
    s = review(s, 2, days(1)); // interval 3
    s = review(s, 1, days(4));
    expect(s.interval).toBe(Math.max(1, Math.round(3 * 1.2)));
    expect(s.ease).toBeCloseTo(2.35);
  });
  it('forget resets interval, counts a lapse, due in 10 minutes, ease floor 1.3', () => {
    let s: SrsState = { ease: 1.35, interval: 30, due: T0.toISOString(), reps: 5, lapses: 0 };
    s = review(s, 0, T0);
    expect(s.interval).toBe(0);
    expect(s.reps).toBe(0);
    expect(s.lapses).toBe(1);
    expect(s.ease).toBe(1.3);
    expect(s.due).toBe(new Date(T0.getTime() + 10 * 60_000).toISOString());
  });
});

describe('isDue', () => {
  it('is due when due <= now', () => {
    const s = review(newState(T0), 2, T0);
    expect(isDue(s, T0)).toBe(false);
    expect(isDue(s, days(1))).toBe(true);
  });
});

describe('buildQueue', () => {
  it('puts due items first then up to newLimit new items', () => {
    const due = review(newState(T0), 2, T0);
    const items = [
      { id: 'a' },
      { id: 'b', state: due },
      { id: 'c' },
      { id: 'd', state: review(newState(T0), 3, T0) },
    ];
    expect(buildQueue(items, days(1), { newLimit: 1 })).toEqual(['b', 'a']);
    expect(buildQueue(items, days(5), { newLimit: 5 })).toEqual(['b', 'd', 'a', 'c']);
  });
});
