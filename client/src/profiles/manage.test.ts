import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../db/db';
import { resetDb } from '../test/utils';
import { countProfiles, createProfile, deleteProfile, listProfiles, nextProfileId, touchProfile, updateProfile } from './manage';

describe('profile management', () => {
  beforeEach(async () => {
    await resetDb();
  });

  it('numbers new profiles and never reuses an id', () => {
    expect(nextProfileId([])).toBe('p1');
    expect(nextProfileId(['p1', 'p2'])).toBe('p3');
    expect(nextProfileId(['p1', 'p9', 'rac'])).toBe('p10');
  });

  it('creates a profile with zero xp and trims the name', async () => {
    const p = await createProfile({ name: '  Lan  ', os: 'mac', dailyGoalMin: 5, avatar: 'hong' });
    expect(p).toMatchObject({ id: 'p1', name: 'Lan', xp: 0, unlockAll: false, avatar: 'hong', os: 'mac', dailyGoalMin: 5 });
    expect(p.createdAt).toBe(p.lastActiveAt);
    expect(await countProfiles()).toBe(1);
  });

  it('lists the most recent learner first', async () => {
    await createProfile({ name: 'A', os: 'win', dailyGoalMin: 10, avatar: 'cam' }, new Date('2026-09-19T00:00:00Z'));
    const b = await createProfile({ name: 'B', os: 'win', dailyGoalMin: 10, avatar: 'tim' }, new Date('2026-09-20T00:00:00Z'));
    expect((await listProfiles()).map((p) => p.id)).toEqual([b.id, 'p1']);
    await touchProfile('p1', new Date('2026-09-21T00:00:00Z'));
    expect((await listProfiles())[0]?.id).toBe('p1');
  });

  it('updates one profile without touching the others', async () => {
    const a = await createProfile({ name: 'A', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    const b = await createProfile({ name: 'B', os: 'win', dailyGoalMin: 10, avatar: 'tim' });
    await updateProfile(a.id, { name: 'An', fontScale: 'xl' });
    expect(await db.profiles.get(a.id)).toMatchObject({ name: 'An', fontScale: 'xl' });
    expect(await db.profiles.get(b.id)).toMatchObject({ name: 'B', fontScale: 'md' });
  });

  it('deletes a profile with all of its rows and leaves the others alone', async () => {
    const a = await createProfile({ name: 'A', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    const b = await createProfile({ name: 'B', os: 'win', dailyGoalMin: 10, avatar: 'tim' });
    await db.lessonProgress.bulkPut([
      { profileId: a.id, lessonId: 'l1', stars: 3, hintsUsed: 0, bestTimeMs: 1, completedAt: 'x' },
      { profileId: b.id, lessonId: 'l1', stars: 1, hintsUsed: 0, bestTimeMs: 1, completedAt: 'x' },
    ]);
    await db.keyPractice.put({ profileId: a.id, key: 'f', hit: 1, miss: 0 });
    await db.dailyActivity.put({ profileId: a.id, day: '2026-09-20', minutes: 5, xp: 10 });
    await db.typingRuns.add({ profileId: a.id, at: '2026-09-20T00:00:00.000Z', mode: 'test', wpm: 20, accuracy: 0.9 });

    await deleteProfile(a.id);

    expect(await db.profiles.count()).toBe(1);
    expect(await db.lessonProgress.toArray()).toEqual([expect.objectContaining({ profileId: b.id })]);
    expect(await db.keyPractice.count()).toBe(0);
    expect(await db.dailyActivity.count()).toBe(0);
    expect(await db.typingRuns.count()).toBe(0);
  });

  it('ignores a delete for an id that is not there', async () => {
    await createProfile({ name: 'A', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    await expect(deleteProfile('p99')).resolves.toBeUndefined();
    expect(await db.profiles.count()).toBe(1);
  });
});
