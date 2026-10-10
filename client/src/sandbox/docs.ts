import { excelSim, pptSim, wordSim } from '@office-neko/shared';
import { db, type SandboxDoc } from '../db/db';

export type SandboxSim = 'word' | 'excel' | 'ppt';

export const SANDBOX_SIMS: readonly { sim: SandboxSim; label: string; emoji: string; base: string }[] = [
  { sim: 'word', label: 'Word – Văn bản', emoji: '📝', base: 'Văn bản' },
  { sim: 'excel', label: 'Excel – Bảng tính', emoji: '📊', base: 'Bảng tính' },
  { sim: 'ppt', label: 'PowerPoint – Trình chiếu', emoji: '🎞️', base: 'Bài trình chiếu' },
];

/** Tệp trắng, dựng như `wordPractice` / `excelPractice` / `pptPractice` dựng đầu bài. */
export function blankState(sim: SandboxSim): unknown {
  switch (sim) {
    case 'word':
      return { ...wordSim.wordInitial(), past: [], dialog: null } satisfies wordSim.WordState;
    case 'excel':
      return { ...excelSim.excelInitial(), past: [], editing: null, clipboard: null } satisfies excelSim.WorkbookState;
    case 'ppt':
      // Trình chiếu trắng mở với một slide tiêu đề, như PowerPoint thật.
      return { ...pptSim.pptInitial(), past: [], sel: null, editing: null, editBackup: null } satisfies pptSim.PptState;
  }
}

async function owned(profileId: string, id: string): Promise<SandboxDoc | undefined> {
  const d = await db.sandboxDocs.get(id);
  return d && d.profileId === profileId ? d : undefined;
}

export async function listDocs(profileId: string): Promise<SandboxDoc[]> {
  const rows = await db.sandboxDocs.where('profileId').equals(profileId).toArray();
  return rows.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function createDoc(profileId: string, sim: SandboxSim, now = new Date()): Promise<SandboxDoc> {
  const base = SANDBOX_SIMS.find((s) => s.sim === sim)!.base;
  return db.transaction('rw', db.sandboxDocs, async () => {
    const mine = await db.sandboxDocs.where('profileId').equals(profileId).toArray();
    // Số tăng theo tên đã dùng, để xoá "Văn bản 1" rồi tạo mới không ra hai tệp "Văn bản 2".
    const used = new Set(mine.filter((d) => d.sim === sim).map((d) => d.name));
    let n = mine.filter((d) => d.sim === sim).length + 1;
    while (used.has(`${base} ${n}`)) n++;
    const doc: SandboxDoc = { profileId, id: crypto.randomUUID(), sim, name: `${base} ${n}`, state: null, updatedAt: now.toISOString() };
    await db.sandboxDocs.add(doc);
    return doc;
  });
}

export function getDoc(profileId: string, id: string): Promise<SandboxDoc | undefined> {
  return owned(profileId, id);
}

/** Bỏ lịch sử hoàn tác (cho nhẹ) và những thứ đang mở dở như hộp thoại, trình chiếu — mở lại tệp là về màn soạn. */
function persistable(state: unknown): unknown {
  if (!state || typeof state !== 'object') return state;
  const s = { ...(state as Record<string, unknown>) };
  if (Array.isArray(s.past)) s.past = [];
  if ('dialog' in s) s.dialog = null;
  if ('show' in s) s.show = null;
  return s;
}

export async function saveDocState(profileId: string, id: string, state: unknown, now = new Date()): Promise<void> {
  await db.transaction('rw', db.sandboxDocs, async () => {
    if (!(await owned(profileId, id))) return;
    await db.sandboxDocs.update(id, { state: persistable(state), updatedAt: now.toISOString() });
  });
}

/**
 * Ghi state bằng MỘT lệnh `put`, không đọc trước. Dùng khi đang mở tệp: lúc đóng tab hay rời trang, trình duyệt có
 * thể huỷ trang trước khi một giao dịch đọc-rồi-ghi kịp chạy bước thứ hai. Chỉ truyền `doc` đã lấy qua
 * `getDoc(profileId, …)` (đã soát chủ) và giữ `doc.name` khớp với tên mới nhất.
 */
export async function putDocState(doc: SandboxDoc, state: unknown, now = new Date()): Promise<void> {
  await db.sandboxDocs.put({ ...doc, state: persistable(state), updatedAt: now.toISOString() });
}

export async function renameDoc(profileId: string, id: string, name: string): Promise<void> {
  const trimmed = name.trim();
  if (!trimmed) return;
  await db.transaction('rw', db.sandboxDocs, async () => {
    if (await owned(profileId, id)) await db.sandboxDocs.update(id, { name: trimmed.slice(0, 60) });
  });
}

export async function deleteDoc(profileId: string, id: string): Promise<void> {
  await db.transaction('rw', db.sandboxDocs, async () => {
    if (await owned(profileId, id)) await db.sandboxDocs.delete(id);
  });
}
