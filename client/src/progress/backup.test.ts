import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../db/db';
import { createProfile } from '../db/profile';
import { backupFileName, exportBackup, importBackup, parseBackup } from './backup';
import { resetDb } from '../test/utils';

describe('backup', () => {
  beforeEach(resetDb);

  it('names the file by date', () => {
    expect(backupFileName(new Date(2026, 8, 9))).toBe('tinhoc-mochi-backup-20260909.json');
  });

  it('round-trips all tables', async () => {
    await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10 });
    await db.progress.put({ lessonId: 'x', stars: 3, hintsUsed: 0, bestTimeMs: 1, completedAt: 't' });
    const text = JSON.stringify(await exportBackup(new Date(2026, 8, 19)));
    await resetDb();
    await importBackup(parseBackup(text));
    expect((await db.profile.get('me'))?.name).toBe('An');
    expect((await db.progress.get('x'))?.stars).toBe(3);
  });

  it('replaces existing data on import', async () => {
    await createProfile({ name: 'Cũ', os: 'win', dailyGoalMin: 10 });
    const b = await exportBackup();
    await db.progress.put({ lessonId: 'y', stars: 1, hintsUsed: 0, bestTimeMs: 1, completedAt: 't' });
    await importBackup(b);
    expect(await db.progress.get('y')).toBeUndefined();
  });

  it('rejects invalid files with Vietnamese messages', () => {
    expect(() => parseBackup('not json')).toThrow(/không đọc được/);
    expect(() => parseBackup('{"app":"other"}')).toThrow(/không phải file sao lưu/);
    expect(() => parseBackup('{"app":"office-neko","schemaVersion":9,"tables":{}}')).toThrow(/không được hỗ trợ/);
    expect(() => parseBackup('{"app":"office-neko","schemaVersion":1,"tables":{}}')).toThrow(/thiếu dữ liệu/);
  });
});
