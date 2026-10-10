import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../db/db';
import { createProfile } from '../profiles/manage';
import { recordLessonResult } from './record';
import { recordTypingRun } from './typing';
import { awardBadges } from './badges';
import { resetDb } from '../test/utils';

const now = new Date(2026, 9, 10, 10);
const learner = (name = 'An') => createProfile({ name, os: 'win', dailyGoalMin: 10, avatar: 'cam' });

describe('awardBadges', () => {
  beforeEach(resetDb);

  it('awards first-step once', async () => {
    const p = await learner();
    await recordLessonResult({ profileId: p.id, lessonId: 'basics.welcome', stars: 3, hintsUsed: 0, timeMs: 60_000, now });
    expect(await awardBadges(p.id, now)).toEqual(['first-step']);
    expect(await awardBadges(p.id, now)).toEqual([]);
    expect(await db.earnedBadges.where('profileId').equals(p.id).count()).toBe(1);
  });

  it('keeps two learners apart', async () => {
    const a = await learner('A');
    const b = await learner('B');
    await recordLessonResult({ profileId: a.id, lessonId: 'basics.welcome', stars: 3, hintsUsed: 0, timeMs: 60_000, now });
    await awardBadges(a.id, now);
    expect(await awardBadges(b.id, now)).toEqual([]);
    expect(await db.earnedBadges.where('profileId').equals(b.id).count()).toBe(0);
  });

  it('awards fast-fingers from a typing run', async () => {
    const p = await learner();
    await recordTypingRun({ profileId: p.id, mode: 'test-1', wpm: 41, accuracy: 95, elapsedMs: 60_000, keyStats: {}, now });
    expect(await awardBadges(p.id, now)).toContain('fast-fingers');
  });

  it('ignores lessons with zero stars', async () => {
    const p = await learner();
    await db.lessonProgress.put({ profileId: p.id, lessonId: 'x', stars: 0 as 1, hintsUsed: 0, bestTimeMs: 1, completedAt: now.toISOString() });
    expect(await awardBadges(p.id, now)).toEqual([]);
  });
});
