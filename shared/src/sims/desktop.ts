import type { CheckResult } from '../grading/core';
import type { OS } from '../types';
import * as vfs from '../vfs';

type Vfs = vfs.Vfs;

export const UNDO_LIMIT = 30;

export interface DesktopState {
  os: OS;
  fs: Vfs;
  cwd: string;
  selected: string[];
  clipboard: { ids: string[]; mode: 'copy' | 'cut' } | null;
  past: Vfs[];
  error: vfs.VfsError | null;
}

export type DesktopAction =
  | { type: 'open'; id: string }
  | { type: 'up' }
  | { type: 'select'; ids: string[] }
  | { type: 'mkdir'; name: string }
  | { type: 'rename'; id: string; name: string }
  | { type: 'remove'; ids: string[] }
  | { type: 'restore'; id: string }
  | { type: 'emptyTrash' }
  | { type: 'copy'; ids: string[] }
  | { type: 'cut'; ids: string[] }
  | { type: 'paste' }
  | { type: 'move'; ids: string[]; destId: string }
  | { type: 'undo' }
  | { type: 'clearError' };

export type DesktopCheck =
  | { kind: 'pathExists'; path: string; type?: vfs.NodeType }
  | { kind: 'notExists'; path: string }
  | { kind: 'inTrash'; name: string }
  | { kind: 'cwdIs'; path: string };

export function idAt(fs: Vfs, path: string): string {
  const n = vfs.findByPath(fs, path);
  if (!n) throw new Error(`idAt: no node at ${path}`);
  return n.id;
}

export function desktopInitial(tree: vfs.TreeSpec[], os: OS, cwdPath = '/'): DesktopState {
  const fs = vfs.fromTree(tree);
  return { os, fs, cwd: idAt(fs, cwdPath), selected: [], clipboard: null, past: [], error: null };
}

export function uniqueName(fs: Vfs, parentId: string, base: string): string {
  const taken = new Set(vfs.childrenOf(fs, parentId).map((n) => n.name.toLowerCase()));
  if (!taken.has(base.toLowerCase())) return base;
  for (let i = 2; ; i++) {
    const name = `${base} (${i})`;
    if (!taken.has(name.toLowerCase())) return name;
  }
}

/** cwd sau khi fs đổi: giữ nguyên nếu node còn tồn tại và không rơi vào trong thùng rác
 * (trừ khi chính cwd là thùng rác — khi đó vẫn ở lại đó); ngược lại quay về gốc. */
function nextCwd(s: DesktopState, fs: Vfs): string {
  if (s.cwd === fs.trashId) return s.cwd;
  return fs.nodes[s.cwd] && !vfs.isInside(fs, s.cwd, fs.trashId) ? s.cwd : fs.rootId;
}

/** Áp một chuỗi thao tác vfs; dừng ở lỗi đầu tiên. */
function applyAll(s: DesktopState, ops: ((fs: Vfs) => vfs.VfsResult)[], after?: (fs: Vfs, ids: string[]) => Partial<DesktopState>): DesktopState {
  let fs = s.fs;
  const ids: string[] = [];
  for (const op of ops) {
    const r = op(fs);
    if (!r.ok) return { ...s, error: r.error };
    fs = r.fs;
    ids.push(r.id);
  }
  const cwd = nextCwd(s, fs);
  return {
    ...s,
    fs,
    cwd,
    error: null,
    past: [...s.past, s.fs].slice(-UNDO_LIMIT),
    selected: s.selected.filter((id) => fs.nodes[id]),
    ...(after ? after(fs, ids) : {}),
  };
}

export function reduceDesktop(s: DesktopState, a: DesktopAction): DesktopState {
  switch (a.type) {
    case 'open': {
      const n = s.fs.nodes[a.id];
      if (!n || n.type !== 'folder') return s;
      return { ...s, cwd: a.id, selected: [] };
    }
    case 'up': {
      const n = s.fs.nodes[s.cwd];
      if (!n || n.parentId === null) return s.cwd === s.fs.trashId ? { ...s, cwd: s.fs.rootId, selected: [] } : s;
      return { ...s, cwd: n.parentId, selected: [] };
    }
    case 'select':
      return { ...s, selected: a.ids.filter((id) => s.fs.nodes[id]) };
    case 'mkdir':
      return applyAll(s, [(fs) => vfs.mkdir(fs, s.cwd, a.name)], (_fs, ids) => ({ selected: ids }));
    case 'rename':
      return applyAll(s, [(fs) => vfs.rename(fs, a.id, a.name)]);
    case 'remove':
      return applyAll(s, a.ids.map((id) => (fs: Vfs) => vfs.remove(fs, id)), () => ({ selected: [] }));
    case 'restore':
      return applyAll(s, [(fs) => vfs.restore(fs, a.id)], () => ({ selected: [] }));
    case 'emptyTrash': {
      const fs = vfs.emptyTrash(s.fs);
      return {
        ...s,
        fs,
        cwd: nextCwd(s, fs),
        past: [...s.past, s.fs].slice(-UNDO_LIMIT),
        selected: s.selected.filter((id) => fs.nodes[id]),
        error: null,
      };
    }
    case 'copy':
    case 'cut':
      return { ...s, clipboard: { ids: [...a.ids], mode: a.type } };
    case 'paste': {
      const clip = s.clipboard;
      if (!clip) return s;
      const ops = clip.ids.map((id) =>
        clip.mode === 'cut' ? (fs: Vfs) => vfs.move(fs, id, s.cwd) : (fs: Vfs) => vfs.copy(fs, id, s.cwd, s.os),
      );
      return applyAll(s, ops, (_fs, ids) => ({ selected: ids, clipboard: clip.mode === 'cut' ? null : clip }));
    }
    case 'move':
      return applyAll(s, a.ids.map((id) => (fs: Vfs) => vfs.move(fs, id, a.destId)), () => ({ selected: [] }));
    case 'undo': {
      const prev = s.past[s.past.length - 1];
      if (!prev) return s;
      const cwd = prev.nodes[s.cwd] ? s.cwd : prev.rootId;
      return { ...s, fs: prev, past: s.past.slice(0, -1), cwd, selected: [], error: null };
    }
    case 'clearError':
      return { ...s, error: null };
  }
}

export function gradeDesktop(s: DesktopState, c: DesktopCheck): CheckResult {
  switch (c.kind) {
    case 'pathExists': {
      const n = vfs.findByPath(s.fs, c.path);
      const ok = !!n && (!c.type || n.type === c.type);
      const what = c.type === 'folder' ? 'thư mục' : c.type === 'file' ? 'file' : 'mục';
      return { ok, messageVi: ok ? `Đã có ${what} ${c.path}.` : `Chưa thấy ${what} ${c.path}.` };
    }
    case 'notExists': {
      const ok = !vfs.findByPath(s.fs, c.path);
      return { ok, messageVi: ok ? `${c.path} đã được dọn đi.` : `${c.path} vẫn còn ở đó.` };
    }
    case 'inTrash': {
      const key = c.name.toLowerCase();
      const ok = vfs.childrenOf(s.fs, s.fs.trashId).some((n) => n.name.toLowerCase() === key);
      return { ok, messageVi: ok ? `“${c.name}” đang nằm trong thùng rác.` : `Chưa thấy “${c.name}” trong thùng rác.` };
    }
    case 'cwdIs': {
      const here = vfs.pathOf(s.fs, s.cwd);
      const ok = here.toLowerCase() === c.path.toLowerCase();
      return { ok, messageVi: ok ? `Bạn đang mở ${c.path}.` : `Hãy mở ${c.path} (bạn đang ở ${here}).` };
    }
  }
}
