# Phase 5 – Server, Accounts, Sync, PWA, Production build

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Fastify + SQLite server with email/password accounts and progress sync, the client login/register/sync flow with an offline queue, PWA offline support for the content bundles, and a one-command production build that serves the client from the server.

**Architecture:** `server/` (Fastify 4, better-sqlite3, bcrypt, @fastify/jwt, @fastify/cors, @fastify/rate-limit, @fastify/static). Client `src/api/` wraps fetch with the stored token; `src/sync/` merges Dexie progress with the server by `updatedAt` (last-write-wins per item) and retries when `online`. `vite-plugin-pwa` precaches the app shell and runtime-caches `/content/**` (cache-first).

**Spec:** sections 3 (luồng dữ liệu), 5.5, 6.

## Global Constraints

- API base `/api`; JWT in `Authorization: Bearer`. Token stored in `localStorage` key `ns.token`, user in `ns.user`.
- Password ≥ 8 chars; email unique (409). Rate limit 20 req/min on auth routes.
- `PUT /api/progress` is idempotent: server keeps the newer `updated_at`; response returns server rows newer than the client's.
- Server tests use an in-memory SQLite (`:memory:`) and `fastify.inject`.
- Branch `feat/phase5-server-sync`; commit per task.

---

### Task 1: Server scaffold, DB schema, auth
Files: `server/package.json`, `server/tsconfig.json`, `server/src/db.ts` (schema + migrations), `server/src/app.ts` (`buildApp({ dbPath })`), `server/src/routes/auth.ts`, `server/src/index.ts`, tests `server/test/auth.test.ts` (node:test).
Endpoints: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/me`.
Commit: `feat(server): fastify app with sqlite and JWT auth`.

### Task 2: Progress + sessions + stats routes
Files: `server/src/routes/progress.ts`, `server/src/routes/sessions.ts`, tests `server/test/progress.test.ts`.
Endpoints: `GET /api/progress?since=ISO`, `PUT /api/progress {items}` → `{ accepted, newer }`, `POST /api/sessions {sessions}`, `GET /api/stats`.
Commit: `feat(server): progress sync, sessions and stats`.

### Task 3: Client auth + sync
Files: `client/src/api/client.ts`, `client/src/store/auth.ts`, `client/src/sync/sync.ts` (+test with mocked fetch), `client/src/pages/LoginPage.tsx`, `RegisterPage.tsx`, modify `SettingsPage.tsx` (account card: login state, "Đồng bộ ngay", logout), `AppShell.tsx` (sync status dot), routes `/login`, `/register`; Vite dev proxy `/api` → `http://localhost:8787`.
Behaviour: after login → full pull (`since` = last sync or epoch) → merge into Dexie via `importAll` → push all local rows newer than last sync → store `ns.lastSync`. Every `recordReview` enqueues the item id in `syncQueue` (Dexie table v2) and a debounced push runs when online; on `online` event retry. XP/streak also synced via `/api/stats`.
Commit: `feat(client): accounts and progress sync with offline queue`.

### Task 4: PWA + production
Files: `client/vite.config.ts` (VitePWA: manifest, icons from `client/public/icons/*.png` generated SVG→PNG by a small script, runtime caching for `/content/`), `client/public/manifest` assets, `server/src/index.ts` static serving of `client/dist` with SPA fallback, root scripts `build` (data:build + client build + server build) and `start`, `README.md` (deploy steps, env `PORT`, `JWT_SECRET`, `DB_PATH`), `Dockerfile` (optional, small).
Verify: `npm run build && npm start` serves the app on `http://localhost:8787`, Lighthouse-style check: offline reload works after first visit.
Commit: `feat: PWA offline support and production server`.
