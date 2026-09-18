import { shuffle, makeChoices, mulberry32 } from './quiz';

it('shuffle is deterministic with a seeded rng and keeps all items', () => {
  const out = shuffle([1, 2, 3, 4, 5], mulberry32(42));
  expect([...out].sort()).toEqual([1, 2, 3, 4, 5]);
  expect(shuffle([1, 2, 3, 4, 5], mulberry32(42))).toEqual(out);
});

it('makeChoices includes the answer and unique distractors', () => {
  const pool = ['a', 'b', 'c', 'd', 'e', 'a'];
  const out = makeChoices('a', pool, 4, (x) => x, mulberry32(1));
  expect(out).toHaveLength(4);
  expect(out).toContain('a');
  expect(new Set(out).size).toBe(4);
});

it('makeChoices returns fewer when the pool is small', () => {
  expect(makeChoices('a', ['a', 'b'], 4)).toHaveLength(2);
});
