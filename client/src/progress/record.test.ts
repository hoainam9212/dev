import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../db/db';
import { createProfile } from '../db/profile';
import { recordLessonResult } from './record';
import { resetDb } from '../test/utils';

const now = new Date(2026, 8, 19, 10, 0, 0);

describe('recordLessonResult', () => {
  beforeEach(async () => {
    await resetDb();
    await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10 });
  });

  it('stores progress, xp and activity for a first completion', async () => {
    const r = await recordLessonResult({ lessonId: 'x', stars: 2, hintsUsed: 1, timeMs: 150_000, now });
    expect(r).toEqual({ xpGained: 20, prevStars: 0 });
    expect(await db.progress.get('x')).toMatchObject({ stars: 2, hintsUsed: 1, bestTimeMs: 150_000 });
    expect((await db.profile.get('me'))?.xp).toBe(20);
    expect(await db.activity.get('2026-09-19')).toEqual({ day: '2026-09-19', minutes: 3, xp: 20 });
  });

  it('keeps the best result and only adds xp for improvement', async () => {
    await recordLessonResult({ lessonId: 'x', stars: 3, hintsUsed: 0, timeMs: 60_000, now });
    const r = await recordLessonResult({ lessonId: 'x', stars: 1, hintsUsed: 3, timeMs: 20_000, now });
    expect(r).toEqual({ xpGained: 0, prevStars: 3 });
    expect(await db.progress.get('x')).toMatchObject({ stars: 3, hintsUsed: 0, bestTimeMs: 20_000 });
    expect((await db.profile.get('me'))?.xp).toBe(30);
    expect((await db.activity.get('2026-09-19'))?.minutes).toBe(2);
  });
});
