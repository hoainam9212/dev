export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const API_BASE_KEY = 'ns.apiBase';

/** Server origin for the API, e.g. "https://nihongo.example.com". Empty = same origin (web). */
export function getApiBase(): string {
  try {
    return (localStorage.getItem(API_BASE_KEY) ?? '').replace(/\/+$/, '');
  } catch {
    return '';
  }
}
export function setApiBase(origin: string): void {
  try {
    const v = origin.trim().replace(/\/+$/, '');
    if (v) localStorage.setItem(API_BASE_KEY, v);
    else localStorage.removeItem(API_BASE_KEY);
  } catch {
    /* ignore */
  }
}

/** JSON fetch wrapper. Throws ApiError with the server's Vietnamese message. */
export async function api<T>(path: string, opts: { method?: string; body?: unknown; token?: string | null } = {}): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (opts.body !== undefined) headers['Content-Type'] = 'application/json';
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;
  let res: Response;
  try {
    res = await fetch(`${getApiBase()}/api${path}`, { method: opts.method ?? 'GET', headers, body: opts.body === undefined ? undefined : JSON.stringify(opts.body) });
  } catch {
    throw new ApiError(0, 'Không kết nối được máy chủ.');
  }
  if (!res.ok) {
    let msg = `Lỗi ${res.status}`;
    try {
      const j = (await res.json()) as { error?: string };
      if (j.error) msg = j.error;
    } catch {
      /* non-json */
    }
    throw new ApiError(res.status, msg);
  }
  return (await res.json()) as T;
}
