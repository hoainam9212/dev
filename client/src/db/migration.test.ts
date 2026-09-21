import { describe, it, expect } from 'vitest';
import Dexie from 'dexie';
import { NekoDB } from './db';

/** Dựng một database đúng như bản v1 đã phát hành, rồi đóng lại. */
async function seedV1(name: string): Promise<void> {
  const old = new Dexie(name);
  old.version(1).stores({
    profile: 'id',
    progress: 'lessonId',
    typingRuns: '++id, at',
    keyStats: 'key',
    activity: 'day',
    badges: 'id',
    sandboxDocs: 'id, sim, updatedAt',
  });
  await old.open();
  await old.table('profile').put({
    id: 'me', name: 'An', os: 'win', dailyGoalMin: 10, fontScale: 'lg',
    sound: false, reducedMotion: false, unlockAll: true, xp: 130, createdAt: '2026-09-19T00:00:00.000Z',
  });
  await old.table('progress').bulkPut([
    { lessonId: 'basics.welcome', stars: 3, hintsUsed: 0, bestTimeMs: 1000, completedAt: '2026-09-20T00:00:00.000Z' },
    { lessonId: 'basics.mouse.click', stars: 2, hintsUsed: 1, bestTimeMs: 2000, completedAt: '2026-09-20T00:00:00.000Z' },
  ]);
  await old.table('activity').put({ day: '2026-09-20', minutes: 12, xp: 50 });
  await old.table('keyStats').put({ key: 'f', hit: 20, miss: 3 });
  await old.table('typingRuns').add({ at: '2026-09-20T01:00:00.000Z', mode: 'test', wpm: 25, accuracy: 0.96 });
  await old.table('badges').put({ id: 'fast-fingers', earnedAt: '2026-09-20T01:00:00.000Z' });
  old.close();
}

describe('database migration v1 → v2', () => {
  it('keeps the old learner and hands every row to them', async () => {
    const name = `neko-mig-${Date.now()}`;
    await seedV1(name);
    const db = new NekoDB(name);
    await db.open();

    const profiles = await db.profiles.toArray();
    expect(profiles).toHaveLength(1);
    expect(profiles[0]).toMatchObject({
      id: 'p1', name: 'An', os: 'win', fontScale: 'lg', unlockAll: true, xp: 130, avatar: 'cam',
      createdAt: '2026-09-19T00:00:00.000Z',
    });
    expect(profiles[0]?.lastActiveAt).toEqual(expect.any(String));

    expect(await db.lessonProgress.count()).toBe(2);
    for (const t of ['lessonProgress', 'dailyActivity', 'keyPractice', 'typingRuns', 'earnedBadges'] as const) {
      const rows = await db.table(t).toArray();
      expect(rows.length, t).toBeGreaterThan(0);
      for (const r of rows) expect((r as { profileId?: string }).profileId, `${t} row without profileId`).toBe('p1');
    }
    expect((await db.lessonProgress.get(['p1', 'basics.welcome']))?.stars).toBe(3);
    expect((await db.lessonProgress.get(['p1', 'basics.mouse.click']))?.hintsUsed).toBe(1);
    expect((await db.dailyActivity.get(['p1', '2026-09-20']))?.minutes).toBe(12);
    expect((await db.keyPractice.get(['p1', 'f']))?.hit).toBe(20);
    // Các bảng cũ đã được dọn sau khi chép xong.
    for (const gone of ['profile', 'progress', 'keyStats', 'activity', 'badges']) {
      expect(db.tables.map((t) => t.name)).not.toContain(gone);
    }
    await db.delete();
  });

  it('opens a fresh database with no profiles and loses nothing', async () => {
    const db = new NekoDB(`neko-fresh-${Date.now()}`);
    await db.open();
    expect(await db.profiles.count()).toBe(0);
    await db.delete();
  });
});
