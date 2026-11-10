import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../db/db';
import { createProfile } from '../profiles/manage';
import { practiceMinutes, recordTypingPractice, recordTypingRun } from './typing';
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

describe('phút luyện gõ theo thời gian thật', () => {
  beforeEach(resetDb);

  it('practiceMinutes: dưới 5 giây là 0, còn lại làm tròn xuống, ít nhất 1 phút', () => {
    expect(practiceMinutes(0)).toBe(0);
    expect(practiceMinutes(4_999)).toBe(0);
    expect(practiceMinutes(5_000)).toBe(1);
    expect(practiceMinutes(10_000)).toBe(1);
    expect(practiceMinutes(119_000)).toBe(1);
    expect(practiceMinutes(180_000)).toBe(3);
  });

  it('bài bỏ dở chỉ cộng phút đã gõ, không ghi typingRun', async () => {
    const p = await learner();
    const now = new Date(2026, 8, 20, 10);
    await recordTypingPractice({ profileId: p.id, elapsedMs: 130_000, keyStats: { a: { hit: 4, miss: 1 } }, now });
    expect(await db.typingRuns.count()).toBe(0);
    expect((await db.dailyActivity.get([p.id, '2026-09-20']))?.minutes).toBe(2);
    expect(await db.keyPractice.get([p.id, 'a'])).toEqual({ profileId: p.id, key: 'a', hit: 4, miss: 1 });
  });

  it('bài bỏ dở dưới 5 giây không ghi gì', async () => {
    const p = await learner();
    await recordTypingPractice({ profileId: p.id, elapsedMs: 3_000, keyStats: { a: { hit: 2, miss: 0 } }, now: new Date(2026, 8, 20, 10) });
    expect(await db.dailyActivity.count()).toBe(0);
    expect(await db.keyPractice.count()).toBe(0);
  });

  it('recordTypingRun cộng phút theo thời gian thật, không làm tròn lên', async () => {
    const p = await learner();
    await recordTypingRun({ profileId: p.id, mode: 'test-3', wpm: 20, accuracy: 90, elapsedMs: 100_000, keyStats: {}, now: new Date(2026, 8, 20, 10) });
    expect((await db.dailyActivity.get([p.id, '2026-09-20']))?.minutes).toBe(1);
  });
});
