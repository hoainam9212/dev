import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { openDb } from '../src/db.js';

let app: FastifyInstance;

beforeEach(async () => {
  app = await buildApp({ db: openDb(':memory:'), jwtSecret: 'test-secret' });
});
afterEach(async () => {
  await app.close();
});

async function register(email = 'sakura@example.com', password = 'password123') {
  const res = await app.inject({ method: 'POST', url: '/api/auth/register', payload: { email, password, displayName: 'Sakura' } });
  return res;
}

describe('auth', () => {
  it('registers, logs in and returns the profile', async () => {
    const reg = await register();
    expect(reg.statusCode).toBe(201);
    const { token, user } = reg.json();
    expect(user).toMatchObject({ email: 'sakura@example.com', displayName: 'Sakura' });
    const me = await app.inject({ method: 'GET', url: '/api/me', headers: { authorization: `Bearer ${token}` } });
    expect(me.statusCode).toBe(200);
    expect(me.json().user.email).toBe('sakura@example.com');
    const login = await app.inject({ method: 'POST', url: '/api/auth/login', payload: { email: 'SAKURA@example.com', password: 'password123' } });
    expect(login.statusCode).toBe(200);
    expect(login.json().token).toBeTruthy();
  });
  it('rejects duplicates, short passwords, bad logins and missing tokens', async () => {
    await register();
    expect((await register()).statusCode).toBe(409);
    expect((await register('x@example.com', 'short')).statusCode).toBe(400);
    const bad = await app.inject({ method: 'POST', url: '/api/auth/login', payload: { email: 'sakura@example.com', password: 'wrongpass1' } });
    expect(bad.statusCode).toBe(401);
    expect((await app.inject({ method: 'GET', url: '/api/me' })).statusCode).toBe(401);
  });
});

describe('progress sync', () => {
  const item = (id: string, updatedAt: string, interval = 1) => ({
    itemId: id, type: 'vocab', ease: 2.5, interval, due: '2026-09-20T00:00:00.000Z', reps: 1, lapses: 0, updatedAt,
  });

  it('upserts by updatedAt and reports newer server rows', async () => {
    const { token } = (await register()).json();
    const h = { authorization: `Bearer ${token}` };
    const put1 = await app.inject({ method: 'PUT', url: '/api/progress', headers: h, payload: { items: [item('v-1', '2026-09-19T10:00:00.000Z'), item('v-2', '2026-09-19T10:00:00.000Z')] } });
    expect(put1.json()).toMatchObject({ accepted: 2, newer: [] });
    // older client copy of v-1, newer copy of v-2
    const put2 = await app.inject({
      method: 'PUT', url: '/api/progress', headers: h,
      payload: { items: [item('v-1', '2026-09-19T09:00:00.000Z', 99), item('v-2', '2026-09-19T11:00:00.000Z', 3)] },
    });
    const body = put2.json();
    expect(body.accepted).toBe(1);
    expect(body.newer).toHaveLength(1);
    expect(body.newer[0].itemId).toBe('v-1');
    expect(body.newer[0].interval).toBe(1);
    const get = await app.inject({ method: 'GET', url: '/api/progress?since=2026-09-19T10:30:00.000Z', headers: h });
    expect(get.json().items.map((i: { itemId: string }) => i.itemId)).toEqual(['v-2']);
  });

  it('isolates users, stores sessions idempotently and merges stats', async () => {
    const a = (await register('a@example.com')).json().token;
    const b = (await register('b@example.com')).json().token;
    await app.inject({ method: 'PUT', url: '/api/progress', headers: { authorization: `Bearer ${a}` }, payload: { items: [item('v-1', '2026-09-19T10:00:00.000Z')] } });
    const getB = await app.inject({ method: 'GET', url: '/api/progress', headers: { authorization: `Bearer ${b}` } });
    expect(getB.json().items).toHaveLength(0);

    const s = { clientId: 'c1', startedAt: '2026-09-19T10:00:00.000Z', kind: 'quiz', type: 'vocab', correct: 5, total: 10, xp: 10 };
    const r1 = await app.inject({ method: 'POST', url: '/api/sessions', headers: { authorization: `Bearer ${a}` }, payload: { sessions: [s] } });
    const r2 = await app.inject({ method: 'POST', url: '/api/sessions', headers: { authorization: `Bearer ${a}` }, payload: { sessions: [s] } });
    expect(r1.json().inserted).toBe(1);
    expect(r2.json().inserted).toBe(0);

    await app.inject({ method: 'PUT', url: '/api/stats', headers: { authorization: `Bearer ${a}` }, payload: { xp: 50, streak: 3, lastStudyDay: '2026-09-19' } });
    await app.inject({ method: 'PUT', url: '/api/stats', headers: { authorization: `Bearer ${a}` }, payload: { xp: 20, streak: 1, lastStudyDay: '2026-09-10' } });
    const st = await app.inject({ method: 'GET', url: '/api/stats', headers: { authorization: `Bearer ${a}` } });
    expect(st.json()).toMatchObject({ xp: 50, streak: 3, lastStudyDay: '2026-09-19', progressCounts: { vocab: 1 } });
  });
});
