import Dexie, { type Table } from 'dexie';
import type { ItemType, Level, ProgressItem } from '@nihongo/shared';

export interface SessionLog {
  id?: number;
  startedAt: string;
  kind: 'flashcard' | 'quiz' | 'typing' | 'listening' | 'writing' | 'speaking' | 'reading' | 'dictation' | 'scramble' | 'sentence';
  type: ItemType | 'kana' | 'reading' | 'listening' | 'speaking' | 'writing' | 'business';
  correct: number;
  total: number;
  xp: number;
}

/** A sentence the learner wrote in "Đặt câu", kept so they can review it later. */
export interface Writing {
  id?: number;
  grammarId: string;
  grammarTitle: string;
  level: Level;
  /** English prompt shown for the sentence. */
  prompt: string;
  /** The sample Japanese sentence. */
  expected: string;
  /** What the learner typed. */
  typed: string;
  /** Similarity with the sample, 0..1. */
  score: number;
  ok: boolean;
  createdAt: string;
}

export class NihongoDB extends Dexie {
  progress!: Table<ProgressItem, string>;
  sessions!: Table<SessionLog, number>;
  writings!: Table<Writing, number>;

  constructor(name = 'nihongo-sensei') {
    super(name);
    this.version(1).stores({
      progress: 'itemId, type, due, updatedAt',
      sessions: '++id, startedAt, type',
    });
    this.version(2).stores({
      writings: '++id, grammarId, createdAt, level',
    });
  }
}

export const db = new NihongoDB();
