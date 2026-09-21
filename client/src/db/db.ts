import Dexie, { type Table } from 'dexie';
import type { LessonProgress, OS, SimKind } from '@office-neko/shared';

export type AvatarId = 'cam' | 'hong' | 'xanh' | 'tim' | 'vang' | 'mint';

export interface Profile {
  id: string;
  name: string;
  avatar: AvatarId;
  os: OS;
  dailyGoalMin: 5 | 10 | 20;
  fontScale: 'md' | 'lg' | 'xl';
  sound: boolean;
  reducedMotion: boolean;
  /** Chế độ mở khoá toàn bộ bài học (dành cho người hướng dẫn). Hồ sơ cũ không có trường này. */
  unlockAll?: boolean;
  xp: number;
  createdAt: string;
  lastActiveAt: string;
}

/** Mọi dòng dữ liệu đều thuộc về một hồ sơ. */
export interface OwnedRow {
  profileId: string;
}

export type ProgressRow = LessonProgress & OwnedRow;
export interface TypingRun extends OwnedRow {
  id?: number;
  at: string;
  mode: string;
  wpm: number;
  accuracy: number;
}
export interface KeyStatRow extends OwnedRow {
  key: string;
  hit: number;
  miss: number;
}
export interface ActivityRow extends OwnedRow {
  day: string;
  minutes: number;
  xp: number;
}
export interface BadgeRow extends OwnedRow {
  id: string;
  earnedAt: string;
}
export interface SandboxDoc extends OwnedRow {
  id: string;
  sim: SimKind;
  name: string;
  state: unknown;
  updatedAt: string;
}

export const TABLES = ['profiles', 'lessonProgress', 'typingRuns', 'keyPractice', 'dailyActivity', 'earnedBadges', 'sandboxDocs'] as const;
export type TableName = (typeof TABLES)[number];

/** Các bảng dữ liệu học tập — mọi dòng mang `profileId`. */
export const OWNED_TABLES = ['lessonProgress', 'typingRuns', 'keyPractice', 'dailyActivity', 'earnedBadges', 'sandboxDocs'] as const;

/**
 * Bốn bảng đổi tên ở v2 (`progress`→`lessonProgress`, `keyStats`→`keyPractice`,
 * `activity`→`dailyActivity`, `badges`→`earnedBadges`). Lý do: khoá chính của
 * chúng đổi từ khoá đơn sang khoá kép `[profileId+…]`, mà Dexie không đổi được
 * khoá chính của một bảng đã tồn tại ("Not yet support for changing primary
 * key"). Cách rẻ và ít rủi ro nhất là tạo bảng mới, chép sang một lần, rồi xoá
 * bảng cũ ở v3. `typingRuns` và `sandboxDocs` giữ nguyên tên vì khoá chính của
 * chúng (`++id`, `id`) không đổi — chỉ thêm chỉ mục.
 */
const RENAMED_AT_V2: [from: string, to: string][] = [
  ['progress', 'lessonProgress'],
  ['keyStats', 'keyPractice'],
  ['activity', 'dailyActivity'],
  ['badges', 'earnedBadges'],
];

export class NekoDB extends Dexie {
  profiles!: Table<Profile, string>;
  lessonProgress!: Table<ProgressRow, [string, string]>;
  typingRuns!: Table<TypingRun, number>;
  keyPractice!: Table<KeyStatRow, [string, string]>;
  dailyActivity!: Table<ActivityRow, [string, string]>;
  earnedBadges!: Table<BadgeRow, [string, string]>;
  sandboxDocs!: Table<SandboxDoc, string>;

  constructor(name = 'office-neko') {
    super(name);
    // v1: một người học duy nhất (hàng `profile` khoá 'me'), dữ liệu không ghi chủ.
    this.version(1).stores({
      profile: 'id',
      progress: 'lessonId',
      typingRuns: '++id, at',
      keyStats: 'key',
      activity: 'day',
      badges: 'id',
      sandboxDocs: 'id, sim, updatedAt',
    });
    // v2: nhiều người học trên một máy; mọi dòng gắn với `profileId`.
    // Bảng cũ vẫn còn ở v2 để `upgrade` đọc được; v3 mới xoá chúng đi.
    this.version(2)
      .stores({
        profiles: 'id, lastActiveAt',
        lessonProgress: '[profileId+lessonId], profileId',
        typingRuns: '++id, [profileId+at], profileId',
        keyPractice: '[profileId+key], profileId',
        dailyActivity: '[profileId+day], profileId',
        earnedBadges: '[profileId+id], profileId',
        sandboxDocs: 'id, [profileId+updatedAt], profileId',
      })
      .upgrade(async (tx) => {
        const old = await tx.table('profile').get('me');
        if (!old) return;
        const { id: _dropped, ...rest } = old as Record<string, unknown>;
        await tx.table('profiles').put({
          ...rest,
          id: 'p1',
          avatar: 'cam',
          lastActiveAt: new Date().toISOString(),
        });
        for (const [from, to] of RENAMED_AT_V2) {
          const rows = await tx.table(from).toArray();
          if (rows.length) await tx.table(to).bulkPut(rows.map((r) => ({ ...r, profileId: 'p1' })));
        }
        for (const name of ['typingRuns', 'sandboxDocs'] as const) {
          await tx.table(name).toCollection().modify((row: Record<string, unknown>) => {
            row.profileId = 'p1';
          });
        }
      });
    // v3: dọn các bảng cũ sau khi đã chép xong.
    this.version(3).stores({
      profile: null,
      progress: null,
      keyStats: null,
      activity: null,
      badges: null,
    });
  }
}

export const db = new NekoDB();
