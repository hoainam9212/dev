import { useLiveQuery } from 'dexie-react-hooks';
import { db, type Writing } from './db';

/** Attempts kept per grammar point (older ones are dropped). */
export const MAX_PER_GRAMMAR = 5;

export type NewWriting = Omit<Writing, 'id' | 'createdAt'>;

/** Save one sentence the learner wrote, keeping the newest attempts for that grammar point. */
export async function saveWriting(w: NewWriting, now = new Date()): Promise<void> {
  await db.transaction('rw', db.writings, async () => {
    await db.writings.add({ ...w, createdAt: now.toISOString() });
    const mine = await db.writings.where('grammarId').equals(w.grammarId).toArray();
    const extra = mine.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(MAX_PER_GRAMMAR);
    if (extra.length) await db.writings.bulkDelete(extra.map((x) => x.id!));
  });
}

/** Attempts for one grammar point, newest first. */
export async function writingsFor(grammarId: string): Promise<Writing[]> {
  const rows = await db.writings.where('grammarId').equals(grammarId).toArray();
  return rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** All saved sentences, newest first. */
export async function listWritings(limit = 500): Promise<Writing[]> {
  return db.writings.orderBy('createdAt').reverse().limit(limit).toArray();
}

export async function countWritings(): Promise<number> {
  return db.writings.count();
}

export async function deleteWriting(id: number): Promise<void> {
  await db.writings.delete(id);
}

export async function clearWritings(): Promise<void> {
  await db.writings.clear();
}

export function useWritingsFor(grammarId: string | null): Writing[] | undefined {
  return useLiveQuery(() => (grammarId ? writingsFor(grammarId) : Promise.resolve([])), [grammarId]);
}

export function useWritingCount(): number | undefined {
  return useLiveQuery(() => countWritings(), []);
}

export function useWritings(limit = 500): Writing[] | undefined {
  return useLiveQuery(() => listWritings(limit), [limit]);
}
