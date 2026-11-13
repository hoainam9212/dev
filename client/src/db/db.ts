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
  /** Vietnamese prompt, when the example had one; the log picks by display language. */
  promptVi?: string;
  /** The sample Japanese sentence. */
  expected: string;
  /** What the learner typed. */
  typed: string;
  /** Similarity with the sample, 0..1. */
  score: number;
  ok: boolean;
  createdAt: string;
}

/** A BJT prep book the learner imported from a .zip made by tools/book-import (stays on the device). */
export interface StoredBook {
  id: string;
  title: string;
  /** book.json as imported (see pages/bjt/books/book.ts). */
  book: unknown;
  bytes: number;
  importedAt: string;
}

/** One page image or recording of an imported book; key = `<bookId>/<path>`. */
export interface BookFile {
  key: string;
  bookId: string;
  type: string;
  data: ArrayBuffer;
}

export class NihongoDB extends Dexie {
  progress!: Table<ProgressItem, string>;
  sessions!: Table<SessionLog, number>;
  writings!: Table<Writing, number>;
  books!: Table<StoredBook, string>;
  bookFiles!: Table<BookFile, string>;

  constructor(name = 'nihongo-sensei') {
    super(name);
    this.version(1).stores({
      progress: 'itemId, type, due, updatedAt',
      sessions: '++id, startedAt, type',
    });
    this.version(2).stores({
      writings: '++id, grammarId, createdAt, level',
    });
    this.version(3).stores({
      books: 'id, importedAt',
      bookFiles: 'key, bookId',
    });
  }
}

export const db = new NihongoDB();
