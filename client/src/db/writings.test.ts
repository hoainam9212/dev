import { db } from './db';
import { saveWriting, writingsFor, listWritings, deleteWriting, clearWritings, countWritings } from './writings';
import { exportAll, importAll } from './srs';

const base = {
  grammarId: 'g-n5-0001',
  grammarTitle: '〜たい',
  level: 'N5' as const,
  prompt: 'I want to go to Japan.',
  expected: '日本へ行きたいです。',
};

beforeEach(async () => {
  await db.writings.clear();
  await db.progress.clear();
  await db.sessions.clear();
});

it('saves an attempt and reads it back, newest first', async () => {
  await saveWriting({ ...base, typed: '日本に行きたい', score: 0.85, ok: true }, new Date('2026-09-20T01:00:00.000Z'));
  await saveWriting({ ...base, typed: '日本へ行きたいです', score: 1, ok: true }, new Date('2026-09-20T02:00:00.000Z'));
  const mine = await writingsFor('g-n5-0001');
  expect(mine.map((w) => w.typed)).toEqual(['日本へ行きたいです', '日本に行きたい']);
  expect(mine[0]).toMatchObject({ grammarTitle: '〜たい', level: 'N5', ok: true, expected: base.expected });
  expect(await countWritings()).toBe(2);
  expect(await writingsFor('g-n5-9999')).toEqual([]);
});

it('lists across grammar points and deletes one or all', async () => {
  await saveWriting({ ...base, typed: 'A', score: 0.5, ok: false }, new Date('2026-09-20T01:00:00.000Z'));
  await saveWriting({ ...base, grammarId: 'g-n4-0002', grammarTitle: '〜ながら', typed: 'B', score: 0.9, ok: true }, new Date('2026-09-20T03:00:00.000Z'));
  const all = await listWritings();
  expect(all.map((w) => w.typed)).toEqual(['B', 'A']);
  await deleteWriting(all[0]!.id!);
  expect((await listWritings()).map((w) => w.typed)).toEqual(['A']);
  await clearWritings();
  expect(await listWritings()).toEqual([]);
});

it('keeps only the newest attempts per grammar point (cap of 5)', async () => {
  for (let i = 1; i <= 7; i++) {
    await saveWriting({ ...base, typed: `文${i}`, score: 0.5, ok: false }, new Date(Date.UTC(2026, 8, 20, i)));
  }
  const mine = await writingsFor('g-n5-0001');
  expect(mine).toHaveLength(5);
  expect(mine.map((w) => w.typed)).toEqual(['文7', '文6', '文5', '文4', '文3']);
});

it('is included in backup export and import', async () => {
  await saveWriting({ ...base, typed: '日本へ行きたいです', score: 1, ok: true }, new Date('2026-09-20T02:00:00.000Z'));
  const dump = await exportAll();
  expect(dump.writings).toHaveLength(1);
  await clearWritings();
  await importAll({ progress: [], writings: dump.writings });
  expect((await listWritings())[0]).toMatchObject({ typed: '日本へ行きたいです' });
  // importing the same backup twice must not duplicate
  await importAll({ progress: [], writings: dump.writings });
  expect(await countWritings()).toBe(1);
});
