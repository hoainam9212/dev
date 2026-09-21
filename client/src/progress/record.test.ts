import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../db/db';
import { createProfile } from '../profiles/manage';
import { recordLessonResult } from './record';
import { resetDb } from '../test/utils';

const now = new Date(2026, 8, 19, 10, 0, 0);
const learner = (name = 'An') => createProfile({ name, os: 'win', dailyGoalMin: 10, avatar: 'cam' });

describe('recordLessonResult', () => {
  beforeEach(async () => {
    await resetDb();
  });

  it('stores progress, xp and activity for a first completion', async () => {
    const p = await learner();
    const r = await recordLessonResult({ profileId: p.id, lessonId: 'x', stars: 2, hintsUsed: 1, timeMs: 150_000, now });
    expect(r).toEqual({ xpGained: 20, prevStars: 0 });
    expect(await db.lessonProgress.get([p.id, 'x'])).toMatchObject({ stars: 2, hintsUsed: 1, bestTimeMs: 150_000 });
    expect((await db.profiles.get(p.id))?.xp).toBe(20);
    expect(await db.dailyActivity.get([p.id, '2026-09-19'])).toEqual({ profileId: p.id, day: '2026-09-19', minutes: 3, xp: 20 });
  });

  it('keeps the best result and only adds xp for improvement', async () => {
    const p = await learner();
    await recordLessonResult({ profileId: p.id, lessonId: 'x', stars: 3, hintsUsed: 0, timeMs: 60_000, now });
    const r = await recordLessonResult({ profileId: p.id, lessonId: 'x', stars: 1, hintsUsed: 3, timeMs: 20_000, now });
    expect(r).toEqual({ xpGained: 0, prevStars: 3 });
    expect(await db.lessonProgress.get([p.id, 'x'])).toMatchObject({ stars: 3, hintsUsed: 0, bestTimeMs: 20_000 });
    expect((await db.profiles.get(p.id))?.xp).toBe(30);
    expect((await db.dailyActivity.get([p.id, '2026-09-19']))?.minutes).toBe(2);
  });

  it('keeps two learners apart', async () => {
    const a = await learner('A');
    const b = await learner('B');
    await recordLessonResult({ profileId: a.id, lessonId: 'basics.welcome', stars: 3, hintsUsed: 0, timeMs: 60_000, now });
    expect((await db.profiles.get(a.id))?.xp).toBe(30);
    expect((await db.profiles.get(b.id))?.xp).toBe(0);
    expect(await db.lessonProgress.get([b.id, 'basics.welcome'])).toBeUndefined();
    expect((await db.lessonProgress.get([a.id, 'basics.welcome']))?.stars).toBe(3);
    expect(await db.dailyActivity.get([b.id, '2026-09-19'])).toBeUndefined();
  });
});
