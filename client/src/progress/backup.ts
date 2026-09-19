import { dayKey } from '@office-neko/shared';
import { db, TABLES, type TableName } from '../db/db';

export const BACKUP_SCHEMA = 1;

export interface BackupFile {
  app: 'office-neko';
  schemaVersion: number;
  exportedAt: string;
  tables: Record<TableName, unknown[]>;
}

export async function exportBackup(now = new Date()): Promise<BackupFile> {
  const tables = {} as Record<TableName, unknown[]>;
  for (const name of TABLES) tables[name] = await db.table(name).toArray();
  return { app: 'office-neko', schemaVersion: BACKUP_SCHEMA, exportedAt: now.toISOString(), tables };
}

export function backupFileName(now = new Date()): string {
  return `tinhoc-mochi-backup-${dayKey(now).replace(/-/g, '')}.json`;
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
  if (b.schemaVersion !== BACKUP_SCHEMA) {
    throw new Error(`Phiên bản file sao lưu (${String(b.schemaVersion)}) không được hỗ trợ.`);
  }
  for (const name of TABLES) {
    if (!Array.isArray((b.tables as Record<string, unknown>)[name])) {
      throw new Error(`File sao lưu thiếu dữ liệu "${name}".`);
    }
  }
  return b as BackupFile;
}

export async function importBackup(b: BackupFile): Promise<void> {
  await db.transaction('rw', db.tables, async () => {
    for (const name of TABLES) {
      const t = db.table(name);
      await t.clear();
      await t.bulkPut(b.tables[name]);
    }
  });
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
