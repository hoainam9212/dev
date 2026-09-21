import { describe, it, expect } from 'vitest';
import type { Lesson, Track } from './types';
import { computeStars, computeStreak, dayKey, levelFromXp, nextLessonId, unlockState, visibleLessons, xpGain } from './progress';

const L = (id: string, trackId: string, os?: 'win' | 'mac'): Lesson => ({
  id, trackId, chapterId: `${trackId}.c`, title: id, minutes: 3, os, steps: [],
});
const lessons: Record<string, Lesson> = {
  a1: L('a1', 'a'), a2w: L('a2w', 'a', 'win'), a2m: L('a2m', 'a', 'mac'), a3: L('a3', 'a'),
  b1: L('b1', 'b'),
};
const tracks: Track[] = [
  { id: 'b', order: 1, title: 'B', emoji: '', blurb: '', color: '', chapters: [{ id: 'b.c', title: '', lessonIds: ['b1'] }] },
  { id: 'a', order: 0, title: 'A', emoji: '', blurb: '', color: '', chapters: [{ id: 'a.c', title: '', lessonIds: ['a1', 'a2w', 'a2m', 'a3'] }] },
  { id: 'c', order: 2, title: 'C', emoji: '', blurb: '', color: '', chapters: [] },
];

describe('stars and xp', () => {
  it('computes stars from hints and failures', () => {
    expect(computeStars({ maxHintLevel: 0, failures: 0 })).toBe(3);
    expect(computeStars({ maxHintLevel: 0, failures: 1 })).toBe(3);
    expect(computeStars({ maxHintLevel: 1, failures: 0 })).toBe(2);
    expect(computeStars({ maxHintLevel: 0, failures: 3 })).toBe(2);
    expect(computeStars({ maxHintLevel: 2, failures: 0 })).toBe(1);
    expect(computeStars({ maxHintLevel: 0, failures: 4 })).toBe(1);
  });
  it('awards xp only for improvement', () => {
    expect(xpGain(0, 3)).toBe(30);
    expect(xpGain(2, 3)).toBe(10);
    expect(xpGain(3, 1)).toBe(0);
  });
  it('derives level from xp', () => {
    expect(levelFromXp(0)).toEqual({ level: 1, into: 0, need: 50 });
    expect(levelFromXp(50)).toEqual({ level: 2, into: 0, need: 150 });
    expect(levelFromXp(199)).toEqual({ level: 2, into: 149, need: 150 });
  });
});

describe('streak', () => {
  it('formats local day keys', () => {
    expect(dayKey(new Date(2026, 0, 5))).toBe('2026-01-05');
  });
  it('counts consecutive days ending today or yesterday', () => {
    expect(computeStreak(['2026-09-17', '2026-09-18', '2026-09-19'], '2026-09-19')).toBe(3);
    expect(computeStreak(['2026-09-17', '2026-09-18'], '2026-09-19')).toBe(2);
    expect(computeStreak(['2026-09-16'], '2026-09-19')).toBe(0);
    expect(computeStreak(['2026-02-28', '2026-03-01'], '2026-03-01')).toBe(2);
  });
});

describe('unlocking', () => {
  it('filters lessons by OS in chapter order', () => {
    expect(visibleLessons(tracks[1]!, lessons, 'mac').map((l) => l.id)).toEqual(['a1', 'a2m', 'a3']);
  });
  it('unlocks the first lesson and each lesson after a completed one', () => {
    const s = unlockState(tracks, lessons, 'win', new Set(['a1']));
    expect([...s.trackUnlocked]).toEqual(['a']);
    expect([...s.lessonUnlocked]).toEqual(['a1', 'a2w']);
  });
  it('unlocks the next track when the previous one is complete', () => {
    const s = unlockState(tracks, lessons, 'win', new Set(['a1', 'a2w', 'a3']));
    expect(s.trackUnlocked.has('b')).toBe(true);
    expect(s.lessonUnlocked.has('b1')).toBe(true);
    expect(s.trackUnlocked.has('c')).toBe(false);
  });
  it('unlocks every track and lesson when unlockAll is on', () => {
    const s = unlockState(tracks, lessons, 'win', new Set(), true);
    expect([...s.trackUnlocked]).toEqual(['a', 'b', 'c']);
    expect([...s.lessonUnlocked]).toEqual(['a1', 'a2w', 'a3', 'b1']);
  });
  it('still hides lessons of the other operating system when unlockAll is on', () => {
    const s = unlockState(tracks, lessons, 'mac', new Set(), true);
    expect(s.lessonUnlocked.has('a2m')).toBe(true);
    expect(s.lessonUnlocked.has('a2w')).toBe(false);
  });
  it('finds the next lesson across tracks', () => {
    expect(nextLessonId(tracks, lessons, 'mac', 'a2m')).toBe('a3');
    expect(nextLessonId(tracks, lessons, 'mac', 'a3')).toBe('b1');
    expect(nextLessonId(tracks, lessons, 'mac', 'b1')).toBeNull();
  });
  it('treats an OS-paired lesson as satisfied when its sibling is completed', () => {
    const pairLessons: Record<string, Lesson> = {
      'x.win': L('x.win', 'a', 'win'),
      'x.mac': L('x.mac', 'a', 'mac'),
      'y.win': L('y.win', 'a', 'win'),
      'y.mac': L('y.mac', 'a', 'mac'),
      b1: L('b1', 'b'),
    };
    const pairTracks: Track[] = [
      { id: 'a', order: 0, title: 'A', emoji: '', blurb: '', color: '', chapters: [{ id: 'a.c', title: '', lessonIds: ['x.win', 'x.mac', 'y.win', 'y.mac'] }] },
      { id: 'b', order: 1, title: 'B', emoji: '', blurb: '', color: '', chapters: [{ id: 'b.c', title: '', lessonIds: ['b1'] }] },
    ];
    // Completed on 'win': both lessons of track 'a', identified by their .win ids.
    const completed = new Set(['x.win', 'y.win']);
    const s = unlockState(pairTracks, pairLessons, 'mac', completed);
    // Viewed as 'mac', the .mac siblings should unlock (not just the first one) …
    expect(s.lessonUnlocked.has('x.mac')).toBe(true);
    expect(s.lessonUnlocked.has('y.mac')).toBe(true);
    // … and the next track should unlock too, since track 'a' counts as finished.
    expect(s.trackUnlocked.has('b')).toBe(true);
    expect(s.lessonUnlocked.has('b1')).toBe(true);
  });
});
