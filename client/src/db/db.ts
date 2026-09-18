import Dexie, { type Table } from 'dexie';
import type { ItemType, ProgressItem } from '@nihongo/shared';

export interface SessionLog {
  id?: number;
  startedAt: string;
  kind: 'flashcard' | 'quiz' | 'typing' | 'listening' | 'writing';
  type: ItemType | 'kana';
  correct: number;
  total: number;
  xp: number;
}

export class NihongoDB extends Dexie {
  progress!: Table<ProgressItem, string>;
  sessions!: Table<SessionLog, number>;

  constructor(name = 'nihongo-sensei') {
    super(name);
    this.version(1).stores({
      progress: 'itemId, type, due, updatedAt',
      sessions: '++id, startedAt, type',
    });
  }
}

export const db = new NihongoDB();
