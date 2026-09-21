import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../db/db';
import { createProfile } from '../profiles/manage';
import { recordTypingRun } from './typing';
import { resetDb } from '../test/utils';

const learner = (name = 'An') => createProfile({ name, os: 'win', dailyGoalMin: 10, avatar: 'cam' });

describe('recordTypingRun', () => {
  beforeEach(resetDb);

  it('stores the run, merges key stats and counts minutes', async () => {
    const p = await learner();
    const now = new Date(2026, 8, 20, 10);
    await recordTypingRun({ profileId: p.id, mode: 'test-1', wpm: 30, accuracy: 96, elapsedMs: 60_000, keyStats: { a: { hit: 5, miss: 1 } }, now });
    await recordTypingRun({ profileId: p.id, mode: 'test-1', wpm: 35, accuracy: 97, elapsedMs: 60_000, keyStats: { a: { hit: 2, miss: 0 }, b: { hit: 1, miss: 1 } }, now });
    expect(await db.typingRuns.count()).toBe(2);
    expect(await db.keyPractice.get([p.id, 'a'])).toEqual({ profileId: p.id, key: 'a', hit: 7, miss: 1 });
    expect(await db.keyPractice.get([p.id, 'b'])).toEqual({ profileId: p.id, key: 'b', hit: 1, miss: 1 });
    expect((await db.dailyActivity.get([p.id, '2026-09-20']))?.minutes).toBe(2);
  });

  it('keeps two learners apart', async () => {
    const a = await learner('A');
    const b = await learner('B');
    const now = new Date(2026, 8, 20, 10);
    await recordTypingRun({ profileId: a.id, mode: 'test-1', wpm: 30, accuracy: 96, elapsedMs: 60_000, keyStats: { f: { hit: 9, miss: 2 } }, now });
    expect(await db.typingRuns.where('profileId').equals(b.id).count()).toBe(0);
    expect(await db.keyPractice.get([b.id, 'f'])).toBeUndefined();
    expect(await db.dailyActivity.get([b.id, '2026-09-20'])).toBeUndefined();
    expect((await db.keyPractice.get([a.id, 'f']))?.hit).toBe(9);
  });
});
