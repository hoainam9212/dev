import { useLiveQuery } from 'dexie-react-hooks';
import { newState, review, isDue, type Grade, type ItemType, type ProgressItem, type SrsState } from '@nihongo/shared';
import { db, type SessionLog, type Writing } from './db';

/** Fires 'change' after every local progress write (used by sync). */
export const progressEvents = new EventTarget();

export function toState(p: ProgressItem): SrsState {
  return { ease: p.ease, interval: p.interval, due: p.due, reps: p.reps, lapses: p.lapses };
}

export async function getProgressMap(type?: ItemType): Promise<Map<string, ProgressItem>> {
  const rows = type ? await db.progress.where('type').equals(type).toArray() : await db.progress.toArray();
  return new Map(rows.map((r) => [r.itemId, r]));
}

/** Apply an SM-2 review to an item and persist it. */
export async function recordReview(itemId: string, type: ItemType, grade: Grade, now = new Date()): Promise<ProgressItem> {
  const existing = await db.progress.get(itemId);
  const state = review(existing ? toState(existing) : newState(now), grade, now);
  const item: ProgressItem = { itemId, type, ...state, updatedAt: now.toISOString() };
  await db.progress.put(item);
  progressEvents.dispatchEvent(new Event('change'));
  return item;
}

export async function dueItems(now = new Date()): Promise<ProgressItem[]> {
  const rows = await db.progress.where('due').belowOrEqual(now.toISOString()).toArray();
  return rows.filter((r) => isDue(toState(r), now)).sort((a, b) => a.due.localeCompare(b.due));
}

export async function countDue(now = new Date()): Promise<Record<ItemType, number>> {
  const counts: Record<ItemType, number> = { vocab: 0, kanji: 0, grammar: 0 };
  for (const r of await dueItems(now)) counts[r.type] += 1;
  return counts;
}

export function useProgressMap(type?: ItemType): Map<string, ProgressItem> | undefined {
  return useLiveQuery(() => getProgressMap(type), [type]);
}

export function useDueCounts(): Record<ItemType, number> | undefined {
  return useLiveQuery(() => countDue(), []);
}

export async function logSession(s: Omit<SessionLog, 'id'>): Promise<void> {
  await db.sessions.add(s);
}

export async function exportAll(): Promise<{ progress: ProgressItem[]; sessions: SessionLog[]; writings: Writing[] }> {
  return { progress: await db.progress.toArray(), sessions: await db.sessions.toArray(), writings: await db.writings.toArray() };
}

/** Merge imported progress: newer `updatedAt` wins per item; sessions are appended. */
export async function importAll(data: { progress: ProgressItem[]; sessions?: SessionLog[]; writings?: Writing[] }): Promise<void> {
  await db.transaction('rw', db.progress, db.sessions, db.writings, async () => {
    for (const p of data.progress) {
      const cur = await db.progress.get(p.itemId);
      if (!cur || cur.updatedAt < p.updatedAt) await db.progress.put(p);
    }
    for (const s of data.sessions ?? []) {
      const { id: _id, ...rest } = s;
      await db.sessions.add(rest);
    }
    for (const w of data.writings ?? []) {
      const { id: _id, ...rest } = w;
      const exists = await db.writings
        .where('grammarId')
        .equals(rest.grammarId)
        .filter((x) => x.createdAt === rest.createdAt && x.typed === rest.typed)
        .count();
      if (!exists) await db.writings.add(rest);
    }
  });
}
