import { levelFromVocabId, loadVocabByIds } from './useVocabByIds';
import { clearContentCache } from './loader';

it('derives the level from a vocab id', () => {
  expect(levelFromVocabId('v-n3-0012')).toBe('N3');
  expect(levelFromVocabId('k-一')).toBeNull();
});

it('loads only the needed level bundles and keeps id order', async () => {
  clearContentCache();
  const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
    const url = String(input);
    if (url.endsWith('vocab/n5.json'))
      return new Response(JSON.stringify([{ id: 'v-n5-0001', word: 'a' }, { id: 'v-n5-0002', word: 'b' }]));
    if (url.endsWith('vocab/n3.json')) return new Response(JSON.stringify([{ id: 'v-n3-0001', word: 'c' }]));
    return new Response('nope', { status: 404 });
  });
  const out = await loadVocabByIds(['v-n3-0001', 'v-n5-0002', 'v-n5-0001', 'v-n5-9999']);
  expect(out.map((v) => v.word)).toEqual(['c', 'b', 'a']);
  expect(fetchMock).toHaveBeenCalledTimes(2);
  vi.restoreAllMocks();
});
