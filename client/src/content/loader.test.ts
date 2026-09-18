import { loadJson, clearContentCache } from './loader';

beforeEach(() => {
  clearContentCache();
  vi.restoreAllMocks();
});

it('fetches /content/<path> once and caches', async () => {
  const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ ok: 1 })));
  await loadJson('kana.json');
  await loadJson('kana.json');
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock.mock.calls[0]![0]).toBe('/content/kana.json');
});

it('throws on non-200 and does not cache the failure', async () => {
  const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('nope', { status: 404 }));
  await expect(loadJson('x.json')).rejects.toThrow(/404/);
  await expect(loadJson('x.json')).rejects.toThrow(/404/);
  expect(fetchMock).toHaveBeenCalledTimes(2);
});
