import type { ProgressItem } from '@nihongo/shared';
import { api } from '../api/client';
import { db, type SessionLog } from '../db/db';
import { importAll, progressEvents } from '../db/srs';
import { useAuth } from '../store/auth';
import { useProgress } from '../store/progress';

const LAST_SYNC_KEY = 'ns.lastSync';
const EPOCH = '1970-01-01T00:00:00.000Z';

export interface SyncResult {
  pulled: number;
  pushed: number;
  sessions: number;
}

export type SyncStatus = 'idle' | 'syncing' | 'ok' | 'error' | 'offline';
type Listener = (s: SyncStatus, detail?: string) => void;
const listeners = new Set<Listener>();
let status: SyncStatus = 'idle';
function setStatus(s: SyncStatus, detail?: string) {
  status = s;
  listeners.forEach((l) => l(s, detail));
}
export function getSyncStatus(): SyncStatus {
  return status;
}
export function onSyncStatus(l: Listener): () => void {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function getLastSync(): string {
  try {
    return localStorage.getItem(LAST_SYNC_KEY) ?? EPOCH;
  } catch {
    return EPOCH;
  }
}
function setLastSync(iso: string) {
  try {
    localStorage.setItem(LAST_SYNC_KEY, iso);
  } catch {
    /* ignore */
  }
}

const sessionClientId = (s: SessionLog) => `${s.startedAt}|${s.kind}|${s.type}|${s.id ?? 0}`;

/** Pull newer server rows, push newer local rows, merge stats. No-op without a token. */
export async function fullSync(): Promise<SyncResult | null> {
  const token = useAuth.getState().token;
  if (!token) return null;
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    setStatus('offline');
    return null;
  }
  setStatus('syncing');
  try {
    const since = getLastSync();
    // local rows changed since the last sync, captured before merging server rows
    const localChanged = (await db.progress.toArray()).filter((p) => p.updatedAt > since);
    // 1. pull
    const pulled = await api<{ items: ProgressItem[]; serverTime: string }>(`/progress?since=${encodeURIComponent(since)}`, { token });
    await importAll({ progress: pulled.items });
    const pulledAt = new Map(pulled.items.map((p) => [p.itemId, p.updatedAt]));
    // 2. push local rows that are newer than what the server sent
    const local = localChanged.filter((p) => (pulledAt.get(p.itemId) ?? '') < p.updatedAt);
    let pushedCount = 0;
    if (local.length) {
      const res = await api<{ accepted: number; newer: ProgressItem[]; serverTime: string }>('/progress', { method: 'PUT', token, body: { items: local } });
      pushedCount = res.accepted;
      if (res.newer.length) await importAll({ progress: res.newer });
    }
    // 3. sessions
    const sessions = (await db.sessions.toArray()).filter((s) => s.startedAt > since);
    let sessionCount = 0;
    if (sessions.length) {
      const r = await api<{ inserted: number }>('/sessions', {
        method: 'POST',
        token,
        body: { sessions: sessions.map((s) => ({ clientId: sessionClientId(s), startedAt: s.startedAt, kind: s.kind, type: s.type, correct: s.correct, total: s.total, xp: s.xp })) },
      });
      sessionCount = r.inserted;
    }
    // 4. stats: merge (max xp, most recent study day wins streak)
    const local2 = useProgress.getState();
    const remote = await api<{ xp: number; streak: number; lastStudyDay: string | null }>('/stats', { token });
    const remoteNewer = (remote.lastStudyDay ?? '') > (local2.lastStudyDay ?? '');
    const merged = {
      xp: Math.max(local2.xp, remote.xp),
      streak: remoteNewer ? remote.streak : local2.streak,
      lastStudyDay: remoteNewer ? remote.lastStudyDay : local2.lastStudyDay,
    };
    useProgress.setState(merged);
    await api('/stats', { method: 'PUT', token, body: merged });
    setLastSync(pulled.serverTime);
    setStatus('ok');
    return { pulled: pulled.items.length, pushed: pushedCount, sessions: sessionCount };
  } catch (e) {
    setStatus('error', (e as Error).message);
    throw e;
  }
}

let timer: ReturnType<typeof setTimeout> | null = null;
/** Debounced sync after local changes (5 s), swallowing errors. */
export function scheduleSync(delayMs = 5000): void {
  if (!useAuth.getState().token) return;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = null;
    fullSync().catch(() => {});
  }, delayMs);
}

let installed = false;
/** Wire change/online listeners once (call from app start). */
export function installSync(): void {
  if (installed || typeof window === 'undefined') return;
  installed = true;
  progressEvents.addEventListener('change', () => scheduleSync());
  window.addEventListener('online', () => scheduleSync(500));
  if (useAuth.getState().token) scheduleSync(1500);
}
