import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../db/db';
import { createProfile } from '../db/profile';
import { TABLES } from '../db/db';
import { backupFileName, exportBackup, importBackup, parseBackup, profilesInBackup } from './backup';
import { getCurrentProfileId, setCurrentProfileId } from '../profiles/current';
import { resetDb } from '../test/utils';
import { createDoc, getDoc, listDocs, putDocState } from '../sandbox/docs';

describe('backup', () => {
  beforeEach(resetDb);

  it('names the file by date', () => {
    expect(backupFileName(new Date(2026, 8, 9))).toBe('tinhoc-mochi-backup-20260909.json');
  });

  it('round-trips all tables', async () => {
    await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    await db.lessonProgress.put({ profileId: 'p1', lessonId: 'x', stars: 3, hintsUsed: 0, bestTimeMs: 1, completedAt: 't' });
    const text = JSON.stringify(await exportBackup(new Date(2026, 8, 19)));
    await resetDb();
    await importBackup(parseBackup(text));
    expect((await db.profiles.get('p1'))?.name).toBe('An');
    expect((await db.lessonProgress.get(['p1', 'x']))?.stars).toBe(3);
  });

  it('replaces existing data on import', async () => {
    await createProfile({ name: 'Cũ', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    const b = await exportBackup();
    await db.lessonProgress.put({ profileId: 'p1', lessonId: 'y', stars: 1, hintsUsed: 0, bestTimeMs: 1, completedAt: 't' });
    await importBackup(b);
    expect(await db.lessonProgress.get(['p1', 'y'])).toBeUndefined();
  });

  it('rejects invalid files with Vietnamese messages', () => {
    expect(() => parseBackup('not json')).toThrow(/không đọc được/);
    expect(() => parseBackup('{"app":"other"}')).toThrow(/không phải file sao lưu/);
    expect(() => parseBackup('{"app":"office-neko","schemaVersion":9,"tables":{}}')).toThrow(/không được hỗ trợ/);
    expect(() => parseBackup('{"app":"office-neko","schemaVersion":1,"tables":{}}')).toThrow(/thiếu dữ liệu/);
  });

  it('rejects a file with all tables but a missing/invalid exportedAt instead of crashing later', () => {
    const tables = Object.fromEntries(TABLES.map((t) => [t, []]));
    const withoutExportedAt = JSON.stringify({ app: 'office-neko', schemaVersion: 2, tables });
    expect(() => parseBackup(withoutExportedAt)).toThrow(/exportedAt/);

    const withNumericExportedAt = JSON.stringify({ app: 'office-neko', schemaVersion: 2, tables, exportedAt: 123 });
    expect(() => parseBackup(withNumericExportedAt)).toThrow(/exportedAt/);
  });

  it('exports every table including profiles', async () => {
    await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    const b = await exportBackup();
    expect(b.schemaVersion).toBe(2);
    expect(Object.keys(b.tables).sort()).toEqual([...TABLES].sort());
    expect(b.tables.profiles).toHaveLength(1);
  });

  it('round-trips two learners', async () => {
    const a = await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    const c = await createProfile({ name: 'Bình', os: 'mac', dailyGoalMin: 5, avatar: 'tim' });
    await db.lessonProgress.put({ profileId: c.id, lessonId: 'l1', stars: 2, hintsUsed: 0, bestTimeMs: 1, completedAt: 'x' });
    const file = await exportBackup();
    await resetDb();
    await importBackup(parseBackup(JSON.stringify(file)));
    expect((await db.profiles.toArray()).map((p) => p.name).sort()).toEqual(['An', 'Bình']);
    expect(await db.lessonProgress.get([c.id, 'l1'])).toMatchObject({ stars: 2 });
    expect(await db.profiles.get(a.id)).toBeDefined();
  });

  it('round-trips the 6B data: accessory, testedOut, badges and a sandbox file', async () => {
    const p = await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    await db.profiles.update(p.id, { accessory: 'bow', testedOut: ['word'] });
    await db.earnedBadges.bulkPut([
      { profileId: p.id, id: 'first-step', earnedAt: '2026-11-10T00:00:00.000Z' },
      { profileId: p.id, id: 'fast-fingers', earnedAt: '2026-11-10T00:00:00.000Z' },
    ] as never);
    const doc = await createDoc(p.id, 'excel');
    await putDocState(doc, { marker: 'A1=123' });
    const text = JSON.stringify(await exportBackup());
    await resetDb();
    await importBackup(parseBackup(text));
    expect(await db.profiles.get(p.id)).toMatchObject({ accessory: 'bow', testedOut: ['word'] });
    expect((await db.earnedBadges.where('profileId').equals(p.id).toArray()).map((b) => b.id).sort())
      .toEqual(['fast-fingers', 'first-step']);
    expect(await getDoc(p.id, doc.id)).toMatchObject({ name: doc.name, sim: 'excel', state: { marker: 'A1=123' } });
  });

  it('imports a version 2 file made before 6B (no accessory, testedOut, badges or files)', async () => {
    const tables = Object.fromEntries(TABLES.map((t) => [t, [] as unknown[]]));
    tables.profiles = [{
      id: 'p1', name: 'Cũ', os: 'win', dailyGoalMin: 10, avatar: 'cam', xp: 120, streak: 2,
      fontScale: 'md', sound: true, reducedMotion: false, createdAt: '2026-10-01T00:00:00.000Z',
      lastActiveAt: '2026-10-05T00:00:00.000Z',
    }];
    tables.lessonProgress = [{ profileId: 'p1', lessonId: 'basics.welcome', stars: 3, hintsUsed: 0, bestTimeMs: 1, completedAt: 't' }];
    const old = JSON.stringify({ app: 'office-neko', schemaVersion: 2, exportedAt: '2026-10-05T00:00:00.000Z', tables });
    await importBackup(parseBackup(old));
    const restored = await db.profiles.get('p1');
    expect(restored).toMatchObject({ name: 'Cũ', xp: 120 });
    expect(restored?.accessory).toBeUndefined();
    expect(restored?.testedOut).toBeUndefined();
    expect(await db.earnedBadges.count()).toBe(0);
    expect(await listDocs('p1')).toEqual([]);
  });

  it('accepts a version 1 file and turns it into one learner', () => {
    const v1 = {
      app: 'office-neko', schemaVersion: 1, exportedAt: '2026-09-20T00:00:00.000Z',
      tables: {
        profile: [{ id: 'me', name: 'An', os: 'win', dailyGoalMin: 10, fontScale: 'md', sound: true, reducedMotion: false, xp: 60, createdAt: '2026-09-19T00:00:00.000Z' }],
        progress: [{ lessonId: 'basics.welcome', stars: 3, hintsUsed: 0, bestTimeMs: 1, completedAt: 'x' }],
        typingRuns: [], keyStats: [], activity: [{ day: '2026-09-20', minutes: 5, xp: 30 }], badges: [], sandboxDocs: [],
      },
    };
    const b = parseBackup(JSON.stringify(v1));
    expect(b.schemaVersion).toBe(2);
    expect(b.tables.profiles).toEqual([expect.objectContaining({ id: 'p1', name: 'An', xp: 60, avatar: 'cam', lastActiveAt: '2026-09-20T00:00:00.000Z' })]);
    expect(b.tables.lessonProgress).toEqual([expect.objectContaining({ profileId: 'p1', lessonId: 'basics.welcome' })]);
    expect(b.tables.dailyActivity).toEqual([expect.objectContaining({ profileId: 'p1', day: '2026-09-20' })]);
    expect(profilesInBackup(b)).toBe(1);
  });

  it('restores a version 1 file into a working database', async () => {
    const v1 = {
      app: 'office-neko', schemaVersion: 1, exportedAt: '2026-09-20T00:00:00.000Z',
      tables: {
        profile: [{ id: 'me', name: 'Cũ', os: 'mac', dailyGoalMin: 20, fontScale: 'lg', sound: false, reducedMotion: false, xp: 90, createdAt: '2026-09-18T00:00:00.000Z' }],
        progress: [{ lessonId: 'x', stars: 2, hintsUsed: 1, bestTimeMs: 5, completedAt: 'x' }],
        typingRuns: [{ at: '2026-09-20T01:00:00.000Z', mode: 'test-1', wpm: 21, accuracy: 93 }],
        keyStats: [{ key: 'f', hit: 3, miss: 1 }], activity: [], badges: [], sandboxDocs: [],
      },
    };
    await importBackup(parseBackup(JSON.stringify(v1)));
    expect((await db.profiles.get('p1'))?.name).toBe('Cũ');
    expect((await db.lessonProgress.get(['p1', 'x']))?.stars).toBe(2);
    expect((await db.keyPractice.get(['p1', 'f']))?.hit).toBe(3);
    expect((await db.typingRuns.toArray())[0]?.profileId).toBe('p1');
  });

  it('turns an ownerless version 1 file into an empty backup', () => {
    const v1 = { app: 'office-neko', schemaVersion: 1, exportedAt: '2026-09-20T00:00:00.000Z', tables: { profile: [], progress: [{ lessonId: 'x', stars: 1, hintsUsed: 0, bestTimeMs: 1, completedAt: 'x' }], typingRuns: [], keyStats: [], activity: [], badges: [], sandboxDocs: [] } };
    const b = parseBackup(JSON.stringify(v1));
    expect(b.tables.profiles).toEqual([]);
    expect(b.tables.lessonProgress).toEqual([]);
  });

  it('forgets who was learning after a restore', async () => {
    await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    setCurrentProfileId('p1');
    await importBackup(parseBackup(JSON.stringify(await exportBackup())));
    expect(getCurrentProfileId()).toBeNull();
  });

});
