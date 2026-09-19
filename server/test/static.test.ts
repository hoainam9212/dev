import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { openDb } from '../src/db.js';
import { registerClient } from '../src/static.js';

let dir: string;
let app: FastifyInstance;

beforeEach(async () => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ns-dist-'));
  fs.mkdirSync(path.join(dir, 'assets'));
  fs.writeFileSync(path.join(dir, 'index.html'), '<!doctype html><div id="root"></div>');
  fs.writeFileSync(path.join(dir, 'assets', 'index-old.js'), 'console.log("old")');
  app = await buildApp({ db: openDb(':memory:'), jwtSecret: 'x' });
  await registerClient(app, dir);
  await app.ready();
});
afterEach(async () => {
  await app.close();
  fs.rmSync(dir, { recursive: true, force: true });
});

describe('client static serving', () => {
  it('serves files created after the server started (a rebuild with new hashes)', async () => {
    fs.writeFileSync(path.join(dir, 'assets', 'index-new.js'), 'console.log("new")');
    const res = await app.inject({ method: 'GET', url: '/assets/index-new.js' });
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/javascript/);
    expect(res.body).toContain('new');
  });

  it('returns 404 (not index.html) for missing static files', async () => {
    const res = await app.inject({ method: 'GET', url: '/assets/index-gone.js' });
    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).not.toMatch(/html/);
  });

  it('falls back to index.html for client routes and keeps API 404 as JSON', async () => {
    const page = await app.inject({ method: 'GET', url: '/reading' });
    expect(page.statusCode).toBe(200);
    expect(page.headers['content-type']).toMatch(/html/);
    expect(page.headers['cache-control']).toMatch(/no-cache/);
    const api = await app.inject({ method: 'GET', url: '/api/nope' });
    expect(api.statusCode).toBe(404);
    expect(api.json().error).toBeTruthy();
    expect((await app.inject({ method: 'GET', url: '/api/health' })).statusCode).toBe(200);
  });
});
