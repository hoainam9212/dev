import { nextStreak, levelFromXp } from './streak';

describe('nextStreak', () => {
  it('starts at 1 on first study', () => expect(nextStreak(null, 0, '2026-09-19')).toBe(1));
  it('keeps streak when studying the same day', () => expect(nextStreak('2026-09-19', 3, '2026-09-19')).toBe(3));
  it('increments on consecutive day', () => expect(nextStreak('2026-09-18', 3, '2026-09-19')).toBe(4));
  it('resets after a gap', () => expect(nextStreak('2026-09-16', 3, '2026-09-19')).toBe(1));
});

describe('levelFromXp', () => {
  it('level 1 needs 100 xp', () => expect(levelFromXp(0)).toEqual({ level: 1, into: 0, need: 100 }));
  it('accumulates: 100 -> level 2, level 2 needs 200', () => expect(levelFromXp(150)).toEqual({ level: 2, into: 50, need: 200 }));
  it('300 -> level 3', () => expect(levelFromXp(300)).toEqual({ level: 3, into: 0, need: 300 }));
});
