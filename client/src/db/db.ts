import Dexie, { type Table } from 'dexie';
import type { LessonProgress, OS, SimKind } from '@office-neko/shared';

export interface Profile {
  id: 'me';
  name: string;
  os: OS;
  dailyGoalMin: 5 | 10 | 20;
  fontScale: 'md' | 'lg' | 'xl';
  sound: boolean;
  reducedMotion: boolean;
  xp: number;
  createdAt: string;
}
export type ProgressRow = LessonProgress;
export interface TypingRun {
  id?: number;
  at: string;
  mode: string;
  wpm: number;
  accuracy: number;
}
export interface KeyStatRow {
  key: string;
  hit: number;
  miss: number;
}
export interface ActivityRow {
  day: string;
  minutes: number;
  xp: number;
}
export interface BadgeRow {
  id: string;
  earnedAt: string;
}
export interface SandboxDoc {
  id: string;
  sim: SimKind;
  name: string;
  state: unknown;
  updatedAt: string;
}

export const TABLES = ['profile', 'progress', 'typingRuns', 'keyStats', 'activity', 'badges', 'sandboxDocs'] as const;
export type TableName = (typeof TABLES)[number];

export class NekoDB extends Dexie {
  profile!: Table<Profile, string>;
  progress!: Table<ProgressRow, string>;
  typingRuns!: Table<TypingRun, number>;
  keyStats!: Table<KeyStatRow, string>;
  activity!: Table<ActivityRow, string>;
  badges!: Table<BadgeRow, string>;
  sandboxDocs!: Table<SandboxDoc, string>;

  constructor(name = 'office-neko') {
    super(name);
    this.version(1).stores({
      profile: 'id',
      progress: 'lessonId',
      typingRuns: '++id, at',
      keyStats: 'key',
      activity: 'day',
      badges: 'id',
      sandboxDocs: 'id, sim, updatedAt',
    });
  }
}

export const db = new NekoDB();
