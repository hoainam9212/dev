import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../db/db';
import { recordTypingRun } from './typing';
import { resetDb } from '../test/utils';

describe('recordTypingRun', () => {
  beforeEach(resetDb);
  it('stores the run, merges key stats and counts minutes', async () => {
    const now = new Date(2026, 8, 20, 10);
    await recordTypingRun({ mode: 'test-1', wpm: 30, accuracy: 96, elapsedMs: 60_000, keyStats: { a: { hit: 5, miss: 1 } }, now });
    await recordTypingRun({ mode: 'test-1', wpm: 35, accuracy: 97, elapsedMs: 60_000, keyStats: { a: { hit: 2, miss: 0 }, b: { hit: 1, miss: 1 } }, now });
    expect(await db.typingRuns.count()).toBe(2);
    expect(await db.keyStats.get('a')).toEqual({ key: 'a', hit: 7, miss: 1 });
    expect(await db.keyStats.get('b')).toEqual({ key: 'b', hit: 1, miss: 1 });
    expect((await db.activity.get('2026-09-20'))?.minutes).toBe(2);
  });
});
