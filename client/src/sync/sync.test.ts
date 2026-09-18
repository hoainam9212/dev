import type { ProgressItem } from '@nihongo/shared';
import { fullSync, getLastSync } from './sync';
import { db } from '../db/db';
import { recordReview, logSession } from '../db/srs';
import { useAuth } from '../store/auth';
import { useProgress } from '../store/progress';

const T0 = new Date('2026-09-19T08:00:00.000Z');

function mockServer(serverItems: ProgressItem[]) {
  const calls: { method: string; url: string; body?: unknown }[] = [];
  vi.spyOn(globalThis, 'fetch').mockImplementation(async (input, init) => {
    const url = String(input);
    const method = init?.method ?? 'GET';
    const body = init?.body ? JSON.parse(String(init.body)) : undefined;
    calls.push({ method, url, body });
    const json = (o: unknown, status = 200) => new Response(JSON.stringify(o), { status, headers: { 'Content-Type': 'application/json' } });
    if (url.startsWith('/api/progress') && method === 'GET') return json({ items: serverItems, serverTime: '2026-09-19T12:00:00.000Z' });
    if (url === '/api/progress' && method === 'PUT') return json({ accepted: (body as { items: unknown[] }).items.length, newer: [], serverTime: '2026-09-19T12:00:00.000Z' });
    if (url === '/api/sessions') return json({ inserted: (body as { sessions: unknown[] }).sessions.length });
    if (url === '/api/stats' && method === 'GET') return json({ xp: 40, streak: 5, lastStudyDay: '2026-09-18' });
    if (url === '/api/stats' && method === 'PUT') return json(body);
    return json({ error: 'nope' }, 404);
  });
  return calls;
}

beforeEach(async () => {
  await db.progress.clear();
  await db.sessions.clear();
  localStorage.clear();
  useAuth.setState({ token: 'tok', user: { id: 1, email: 'a@b.c', displayName: 'A' } });
  useProgress.setState({ xp: 10, streak: 2, lastStudyDay: '2026-09-19' });
});
afterEach(() => vi.restoreAllMocks());

it('does nothing without a token', async () => {
  useAuth.setState({ token: null, user: null });
  const spy = vi.spyOn(globalThis, 'fetch');
  expect(await fullSync()).toBeNull();
  expect(spy).not.toHaveBeenCalled();
});

it('pulls server rows, pushes local changes and merges stats', async () => {
  await recordReview('v-n5-0001', 'vocab', 2, T0);
  await logSession({ startedAt: T0.toISOString(), kind: 'quiz', type: 'vocab', correct: 1, total: 1, xp: 2 });
  const serverRow: ProgressItem = { itemId: 'k-一', type: 'kanji', ease: 2.5, interval: 4, due: '2026-09-23T08:00:00.000Z', reps: 1, lapses: 0, updatedAt: '2026-09-19T09:00:00.000Z' };
  const calls = mockServer([serverRow]);
  const r = await fullSync();
  expect(r).toEqual({ pulled: 1, pushed: 1, sessions: 1 });
  expect(await db.progress.get('k-一')).toMatchObject({ interval: 4 });
  const put = calls.find((c) => c.method === 'PUT' && c.url === '/api/progress')!;
  expect((put.body as { items: ProgressItem[] }).items.map((i) => i.itemId)).toEqual(['v-n5-0001']);
  // stats: max xp, local day is newer so local streak kept
  expect(useProgress.getState()).toMatchObject({ xp: 40, streak: 2, lastStudyDay: '2026-09-19' });
  expect(getLastSync()).toBe('2026-09-19T12:00:00.000Z');
  // second sync pushes nothing new
  const r2 = await fullSync();
  expect(r2?.pushed).toBe(0);
});
