import { db } from './db';
import { recordReview, getProgressMap, countDue, dueItems, importAll, exportAll, logSession } from './srs';

const T0 = new Date('2026-09-19T08:00:00.000Z');
const days = (n: number) => new Date(T0.getTime() + n * 86_400_000);

beforeEach(async () => {
  await db.progress.clear();
  await db.sessions.clear();
});

it('recordReview creates then updates an item following SM-2', async () => {
  const a = await recordReview('v-n5-0001', 'vocab', 2, T0);
  expect(a).toMatchObject({ itemId: 'v-n5-0001', type: 'vocab', reps: 1, interval: 1 });
  const b = await recordReview('v-n5-0001', 'vocab', 2, days(1));
  expect(b.reps).toBe(2);
  expect(b.interval).toBe(3);
  const map = await getProgressMap('vocab');
  expect(map.get('v-n5-0001')?.interval).toBe(3);
  expect((await getProgressMap('kanji')).size).toBe(0);
});

it('countDue and dueItems reflect due dates', async () => {
  await recordReview('v-n5-0001', 'vocab', 2, T0); // due T0 + 1 day
  await recordReview('k-一', 'kanji', 0, T0); // due T0 + 10 min
  expect(await countDue(T0)).toEqual({ vocab: 0, kanji: 0, grammar: 0 });
  expect(await countDue(new Date(T0.getTime() + 15 * 60_000))).toEqual({ vocab: 0, kanji: 1, grammar: 0 });
  const due = await dueItems(days(2));
  expect(due.map((d) => d.itemId)).toEqual(['k-一', 'v-n5-0001']);
});

it('importAll keeps the newer record and appends sessions', async () => {
  const old = await recordReview('v-n5-0002', 'vocab', 2, T0);
  await importAll({
    progress: [{ ...old, interval: 30, updatedAt: days(5).toISOString() }, { ...old, itemId: 'v-n5-0003', interval: 7, updatedAt: days(-1).toISOString() }],
    sessions: [{ id: 99, startedAt: T0.toISOString(), kind: 'quiz', type: 'vocab', correct: 5, total: 10, xp: 10 }],
  });
  await importAll({ progress: [{ ...old, itemId: 'v-n5-0002', interval: 1, updatedAt: days(-3).toISOString() }] });
  const map = await getProgressMap();
  expect(map.get('v-n5-0002')?.interval).toBe(30);
  expect(map.get('v-n5-0003')?.interval).toBe(7);
  await logSession({ startedAt: T0.toISOString(), kind: 'flashcard', type: 'kanji', correct: 1, total: 1, xp: 3 });
  const all = await exportAll();
  expect(all.sessions).toHaveLength(2);
  expect(all.sessions[0]!.id).not.toBe(99);
});
