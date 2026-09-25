import { api, ApiError } from './client';
import { withLang } from '../test/lang';
import { useSettings } from '../store/settings';

afterEach(() => vi.unstubAllGlobals());

it('builds the connection error in the language active at call time', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
  withLang('en');
  await expect(api('/me')).rejects.toThrow("Can't reach the server.");
  useSettings.getState().setLang('vi');
  const err = await api('/me').catch((e: unknown) => e);
  expect(err).toBeInstanceOf(ApiError);
  expect((err as ApiError).message).toBe('Không kết nối được máy chủ.');
});
