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

it('translates known server errors in English and keeps the server text in Vietnamese', async () => {
  const reply = (status: number, error: string) => vi.fn().mockResolvedValue(new Response(JSON.stringify({ error }), { status }));
  withLang('en');
  vi.stubGlobal('fetch', reply(401, 'Email hoặc mật khẩu không đúng.'));
  await expect(api('/auth/login', { method: 'POST', body: {} })).rejects.toThrow('Wrong email or password.');
  vi.stubGlobal('fetch', reply(401, 'Chưa đăng nhập hoặc phiên đã hết hạn.'));
  await expect(api('/sync/pull')).rejects.toThrow('Not signed in, or your session has expired.');
  vi.stubGlobal('fetch', reply(409, 'Email này đã được đăng ký.'));
  await expect(api('/auth/register', { method: 'POST', body: {} })).rejects.toThrow('This email is already registered.');
  vi.stubGlobal('fetch', reply(400, 'Dữ liệu không hợp lệ.'));
  await expect(api('/auth/register', { method: 'POST', body: {} })).rejects.toThrow('Invalid data.');
  vi.stubGlobal('fetch', reply(500, 'Lỗi máy chủ.'));
  await expect(api('/me')).rejects.toThrow('Server error.');
  vi.stubGlobal('fetch', reply(418, 'Ấm trà'));
  await expect(api('/me')).rejects.toThrow('Error 418');
  useSettings.getState().setLang('vi');
  vi.stubGlobal('fetch', reply(401, 'Email hoặc mật khẩu không đúng.'));
  await expect(api('/auth/login', { method: 'POST', body: {} })).rejects.toThrow('Email hoặc mật khẩu không đúng.');
});
