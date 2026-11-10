import { describe, it, expect } from 'vitest';
import type { Lesson, QuizStep, Track } from './types';
import {
  computeStars, computeStreak, dayKey, levelFromXp, nextLessonId, PLACEMENT_PASS, placementPassed, unlockState,
  visibleLessons, xpGain,
} from './progress';

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
  it('lets an optional lesson be skipped without blocking anything', () => {
    const lessonsWithOptional: Record<string, Lesson> = {
      a1: L('a1', 'a'),
      a2: { ...L('a2', 'a'), optional: true },
      a3: L('a3', 'a'),
      b1: L('b1', 'b'),
    };
    const tracksWithOptional: Track[] = [
      { id: 'a', order: 0, title: 'A', emoji: '', blurb: '', color: '', chapters: [{ id: 'a.c', title: '', lessonIds: ['a1', 'a2', 'a3'] }] },
      { id: 'b', order: 1, title: 'B', emoji: '', blurb: '', color: '', chapters: [{ id: 'b.c', title: '', lessonIds: ['b1'] }] },
    ];
    // Học a1 rồi bỏ qua a2: a3 vẫn phải mở.
    const s = unlockState(tracksWithOptional, lessonsWithOptional, 'win', new Set(['a1']));
    expect(s.lessonUnlocked.has('a2')).toBe(true);
    expect(s.lessonUnlocked.has('a3')).toBe(true);
    // Xong a1 và a3, chưa đụng a2 — lộ trình sau vẫn mở.
    const done = unlockState(tracksWithOptional, lessonsWithOptional, 'win', new Set(['a1', 'a3']));
    expect(done.trackUnlocked.has('b')).toBe(true);
    expect(done.lessonUnlocked.has('b1')).toBe(true);
  });

  it('still hides an optional lesson until its own turn comes', () => {
    const lessonsWithOptional: Record<string, Lesson> = {
      a1: L('a1', 'a'),
      a2: { ...L('a2', 'a'), optional: true },
    };
    const tracksWithOptional: Track[] = [
      { id: 'a', order: 0, title: 'A', emoji: '', blurb: '', color: '', chapters: [{ id: 'a.c', title: '', lessonIds: ['a1', 'a2'] }] },
    ];
    const s = unlockState(tracksWithOptional, lessonsWithOptional, 'win', new Set());
    expect(s.lessonUnlocked.has('a1')).toBe(true);
    expect(s.lessonUnlocked.has('a2')).toBe(false);
  });

  it('does not let a lesson right after an optional one jump the queue', () => {
    // Bài tự chọn chỉ "trong suốt": a3 mở khi a2 đã tới lượt (a1 xong), không mở sẵn cho người mới.
    const lessonsWithOptional: Record<string, Lesson> = {
      a0: L('a0', 'a'),
      a1: L('a1', 'a'),
      a2: { ...L('a2', 'a'), optional: true },
      a3: L('a3', 'a'),
    };
    const tracksWithOptional: Track[] = [
      { id: 'a', order: 0, title: 'A', emoji: '', blurb: '', color: '', chapters: [{ id: 'a.c', title: '', lessonIds: ['a0', 'a1', 'a2', 'a3'] }] },
    ];
    const fresh = unlockState(tracksWithOptional, lessonsWithOptional, 'win', new Set());
    expect([...fresh.lessonUnlocked]).toEqual(['a0']);
    const half = unlockState(tracksWithOptional, lessonsWithOptional, 'win', new Set(['a0']));
    expect(half.lessonUnlocked.has('a2')).toBe(false);
    expect(half.lessonUnlocked.has('a3')).toBe(false);
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

describe('placement (testedOut)', () => {
  it('counts a tested-out track as done, so the next track opens', () => {
    const s = unlockState(tracks, lessons, 'win', new Set(), false, new Set(['a']));
    expect(s.trackUnlocked.has('b')).toBe(true);
    expect(s.lessonUnlocked.has('b1')).toBe(true);
  });
  it('opens every lesson of a tested-out track', () => {
    const s = unlockState(tracks, lessons, 'win', new Set(), false, new Set(['a']));
    expect([...s.lessonUnlocked]).toEqual(['a1', 'a2w', 'a3', 'b1']);
  });
  it('opens a tested-out track even when the tracks before it are not done', () => {
    const s = unlockState(tracks, lessons, 'win', new Set(), false, new Set(['b']));
    expect(s.trackUnlocked.has('b')).toBe(true);
    expect(s.lessonUnlocked.has('b1')).toBe(true);
    expect(s.lessonUnlocked.has('a2w')).toBe(false);
  });
  it('does not add anything to completed', () => {
    const completed = new Set<string>();
    unlockState(tracks, lessons, 'win', completed, false, new Set(['a']));
    expect(completed.size).toBe(0);
  });
  const quiz: QuizStep[] = Array.from({ length: 6 }, (_, i) => ({ kind: 'quiz', question: `q${i}`, choices: ['x', 'y'], answer: i % 2, why: '' }));
  it('passes with 5 of 6 right and fails with 4 of 6', () => {
    expect(PLACEMENT_PASS).toBe(5);
    expect(placementPassed([0, 1, 0, 1, 0, 0], quiz)).toBe(true);
    expect(placementPassed([0, 1, 0, 1, 1, 0], quiz)).toBe(false);
  });
  it('fails when answers are missing', () => {
    expect(placementPassed([0, 1, 0, 1], quiz)).toBe(false);
  });
});
