import { dayKey } from '@office-neko/shared';
import { db, TABLES, type TableName } from '../db/db';
import { clearCurrentProfileId } from '../profiles/current';

export const BACKUP_SCHEMA = 2;

export interface BackupFile {
  app: 'office-neko';
  schemaVersion: number;
  exportedAt: string;
  tables: Record<TableName, unknown[]>;
}

/** Bảng của file phiên bản 1 (một người học duy nhất). */
const V1_TABLES = ['profile', 'progress', 'typingRuns', 'keyStats', 'activity', 'badges', 'sandboxDocs'] as const;

/** Bảng v1 → bảng v2 tương ứng. Giống hệt luật di trú CSDL trong `db.ts`. */
const V1_TO_V2: Record<string, TableName> = {
  progress: 'lessonProgress',
  keyStats: 'keyPractice',
  activity: 'dailyActivity',
  badges: 'earnedBadges',
  typingRuns: 'typingRuns',
  sandboxDocs: 'sandboxDocs',
};

export async function exportBackup(now = new Date()): Promise<BackupFile> {
  const tables = {} as Record<TableName, unknown[]>;
  for (const name of TABLES) tables[name] = await db.table(name).toArray();
  return { app: 'office-neko', schemaVersion: BACKUP_SCHEMA, exportedAt: now.toISOString(), tables };
}

export function backupFileName(now = new Date()): string {
  return `tinhoc-mochi-backup-${dayKey(now).replace(/-/g, '')}.json`;
}

/** Số người học trong file — Cài đặt nói rõ con số này trước khi thay dữ liệu. */
export function profilesInBackup(b: BackupFile): number {
  return b.tables.profiles.length;
}

function emptyTables(): Record<TableName, unknown[]> {
  const tables = {} as Record<TableName, unknown[]>;
  for (const t of TABLES) tables[t] = [];
  return tables;
}

/**
 * File v1 chỉ có một người học (hàng `profile` khoá 'me'): dựng lại thành hồ sơ
 * `p1` và gán mọi dòng cho người đó. File v1 không có hàng `profile` thì dữ liệu
 * là vô chủ — bỏ hết, vì không có cách nào biết nó của ai.
 */
function migrateV1(b: BackupFile): BackupFile {
  const tables = emptyTables();
  const old = (b.tables as unknown as Record<string, unknown[]>)['profile']?.[0] as Record<string, unknown> | undefined;
  if (old) {
    const { id: _dropped, ...rest } = old;
    tables.profiles = [{ ...rest, id: 'p1', avatar: 'cam', lastActiveAt: b.exportedAt }];
    for (const [from, to] of Object.entries(V1_TO_V2)) {
      const rows = ((b.tables as unknown as Record<string, unknown[]>)[from] ?? []) as Record<string, unknown>[];
      tables[to] = rows.map((r) => ({ ...r, profileId: 'p1' }));
    }
  }
  return { app: 'office-neko', schemaVersion: BACKUP_SCHEMA, exportedAt: b.exportedAt, tables };
}

export function parseBackup(text: string): BackupFile {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('File này không đọc được (không phải JSON hợp lệ).');
  }
  const b = data as Partial<BackupFile> | null;
  if (!b || b.app !== 'office-neko' || typeof b.tables !== 'object' || b.tables === null) {
    throw new Error('File này không phải file sao lưu của Tin Học Cùng Mochi.');
  }
  if (b.schemaVersion !== 1 && b.schemaVersion !== BACKUP_SCHEMA) {
    throw new Error(`Phiên bản file sao lưu (${String(b.schemaVersion)}) không được hỗ trợ.`);
  }
  const expected: readonly string[] = b.schemaVersion === 1 ? V1_TABLES : TABLES;
  for (const name of expected) {
    if (!Array.isArray((b.tables as Record<string, unknown>)[name])) {
      throw new Error(`File sao lưu thiếu dữ liệu "${name}".`);
    }
  }
  if (typeof b.exportedAt !== 'string') {
    throw new Error('File sao lưu thiếu ngày xuất file (exportedAt).');
  }
  return b.schemaVersion === 1 ? migrateV1(b as BackupFile) : (b as BackupFile);
}

export async function importBackup(b: BackupFile): Promise<void> {
  await db.transaction('rw', db.tables, async () => {
    for (const name of TABLES) {
      const t = db.table(name);
      await t.clear();
      await t.bulkPut(b.tables[name]);
    }
  });
  // Người đang học có thể không còn trong dữ liệu vừa khôi phục — về màn chọn người.
  clearCurrentProfileId();
}

export function downloadJson(fileName: string, data: unknown): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function readFileText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(new Error('Không đọc được file.'));
    reader.readAsText(file);
  });
}
