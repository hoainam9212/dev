import { describe, it, expect } from 'vitest';
import { BADGES, badgesEarned, type BadgeStats } from './badges';

const base: BadgeStats = { completed: new Set(), bestWpm: 0, streak: 0, level: 1 };
const has = (s: Partial<BadgeStats>, id: string) => badgesEarned({ ...base, ...s }).includes(id);
const done = (...ids: string[]) => new Set(ids);

describe('badges', () => {
  it('has 8 badges with unique ids', () => {
    expect(BADGES).toHaveLength(8);
    expect(new Set(BADGES.map((b) => b.id)).size).toBe(8);
  });
  it('earns nothing on a fresh profile', () => {
    expect(badgesEarned(base)).toEqual([]);
  });
  it('first-step after one lesson', () => {
    expect(has({ completed: done('basics.welcome') }, 'first-step')).toBe(true);
  });
  it('fast-fingers at 40 wpm, not 39', () => {
    expect(has({ bestWpm: 39 }, 'fast-fingers')).toBe(false);
    expect(has({ bestWpm: 40 }, 'fast-fingers')).toBe(true);
  });
  it('word-writer needs word.project', () => {
    expect(has({ completed: done('word.intro') }, 'word-writer')).toBe(false);
    expect(has({ completed: done('word.project') }, 'word-writer')).toBe(true);
  });
  it('formula-wizard needs the whole lookup chapter', () => {
    expect(has({ completed: done('excel.countif', 'excel.sumif', 'excel.text') }, 'formula-wizard')).toBe(false);
    expect(has({ completed: done('excel.countif', 'excel.sumif', 'excel.vlookup', 'excel.text') }, 'formula-wizard')).toBe(true);
  });
  it('storyteller needs ppt.project', () => {
    expect(has({ completed: done('ppt.project') }, 'storyteller')).toBe(true);
  });
  it('ai-buddy needs ai.project', () => {
    expect(has({ completed: done('ai.intro') }, 'ai-buddy')).toBe(false);
    expect(has({ completed: done('ai.project') }, 'ai-buddy')).toBe(true);
  });
  it('streak-7 at 7 days, not 6', () => {
    expect(has({ streak: 6 }, 'streak-7')).toBe(false);
    expect(has({ streak: 7 }, 'streak-7')).toBe(true);
  });
  it('level-5 at level 5, not 4', () => {
    expect(has({ level: 4 }, 'level-5')).toBe(false);
    expect(has({ level: 5 }, 'level-5')).toBe(true);
  });
  it('keeps BADGES order', () => {
    const all: BadgeStats = {
      completed: done('ai.project', 'ppt.project', 'word.project', 'excel.countif', 'excel.sumif', 'excel.vlookup', 'excel.text'),
      bestWpm: 60, streak: 9, level: 6,
    };
    expect(badgesEarned(all)).toEqual(BADGES.map((b) => b.id));
  });
});
