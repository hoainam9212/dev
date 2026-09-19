import type { OS } from '../types';

export type NodeType = 'folder' | 'file';
export interface VNode {
  id: string;
  name: string;
  type: NodeType;
  parentId: string | null;
  trashedFrom?: string;
}
export interface Vfs {
  nodes: Record<string, VNode>;
  rootId: string;
  trashId: string;
  seq: number;
}
export type VfsError = 'invalidName' | 'duplicate' | 'notFound' | 'notFolder' | 'intoSelf' | 'notInTrash';
export type VfsResult = { ok: true; fs: Vfs; id: string } | { ok: false; error: VfsError };
export interface TreeSpec {
  name: string;
  children?: TreeSpec[];
}

export const VFS_ERROR_VI: Record<VfsError, string> = {
  invalidName: 'Tên không hợp lệ. Tên không được để trống và không chứa các ký tự / \\ : * ? " < > |',
  duplicate: 'Ở đây đã có một mục cùng tên. Hãy chọn tên khác nhé!',
  notFound: 'Không tìm thấy mục này.',
  notFolder: 'Chỉ có thể đặt đồ vào trong thư mục.',
  intoSelf: 'Không thể chuyển một thư mục vào bên trong chính nó.',
  notInTrash: 'Mục này không nằm trong thùng rác.',
};

const ROOT = 'root';
const TRASH = 'trash';
const TRASH_NAME = 'Thùng rác';
const fail = (error: VfsError): VfsResult => ({ ok: false, error });

export function fromTree(children: TreeSpec[]): Vfs {
  let fs: Vfs = {
    nodes: {
      [ROOT]: { id: ROOT, name: '', type: 'folder', parentId: null },
      [TRASH]: { id: TRASH, name: TRASH_NAME, type: 'folder', parentId: null },
    },
    rootId: ROOT,
    trashId: TRASH,
    seq: 0,
  };
  const addSpec = (parentId: string, spec: TreeSpec) => {
    const r = spec.children ? mkdir(fs, parentId, spec.name) : createFile(fs, parentId, spec.name);
    if (!r.ok) throw new Error(`fromTree: ${r.error} (${spec.name})`);
    fs = r.fs;
    spec.children?.forEach((c) => addSpec(r.id, c));
  };
  children.forEach((c) => addSpec(ROOT, c));
  return fs;
}

const BAD_CHARS = /[\\/:*?"<>|]/;
export function validName(name: string): boolean {
  const t = name.trim();
  return t.length > 0 && t.length <= 100 && !BAD_CHARS.test(t) && t !== '.' && t !== '..';
}

export function childrenOf(fs: Vfs, parentId: string): VNode[] {
  return Object.values(fs.nodes)
    .filter((n) => n.parentId === parentId)
    .sort((a, b) => (a.type === b.type ? a.name.localeCompare(b.name, 'vi') : a.type === 'folder' ? -1 : 1));
}

export function isInside(fs: Vfs, id: string, ancestorId: string): boolean {
  let cur = fs.nodes[id];
  while (cur) {
    if (cur.id === ancestorId) return true;
    cur = cur.parentId ? fs.nodes[cur.parentId] : undefined;
  }
  return false;
}

export function pathOf(fs: Vfs, id: string): string {
  const parts: string[] = [];
  let cur = fs.nodes[id];
  while (cur && cur.parentId !== null) {
    parts.unshift(cur.name);
    cur = fs.nodes[cur.parentId];
  }
  if (cur?.id === TRASH) parts.unshift(TRASH_NAME);
  return '/' + parts.join('/');
}

export function findByPath(fs: Vfs, path: string): VNode | undefined {
  const parts = path.split('/').filter(Boolean);
  let cur = fs.nodes[ROOT];
  if (parts[0] === TRASH_NAME) {
    cur = fs.nodes[TRASH];
    parts.shift();
  }
  for (const p of parts) {
    if (!cur) return undefined;
    const key = p.toLowerCase();
    cur = childrenOf(fs, cur.id).find((n) => n.name.toLowerCase() === key);
  }
  return cur;
}

function nameTaken(fs: Vfs, parentId: string, name: string, exceptId?: string): boolean {
  const key = name.trim().toLowerCase();
  return Object.values(fs.nodes).some((n) => n.parentId === parentId && n.id !== exceptId && n.name.toLowerCase() === key);
}

function withNode(fs: Vfs, node: VNode): Vfs {
  return { ...fs, nodes: { ...fs.nodes, [node.id]: node } };
}

function withoutTrashMark(n: VNode): VNode {
  const copyNode = { ...n };
  delete copyNode.trashedFrom;
  return copyNode;
}

function addNode(fs: Vfs, parentId: string, name: string, type: NodeType): VfsResult {
  const parent = fs.nodes[parentId];
  if (!parent) return fail('notFound');
  if (parent.type !== 'folder') return fail('notFolder');
  if (!validName(name)) return fail('invalidName');
  if (nameTaken(fs, parentId, name)) return fail('duplicate');
  const id = `n${fs.seq + 1}`;
  return { ok: true, id, fs: { ...withNode(fs, { id, name: name.trim(), type, parentId }), seq: fs.seq + 1 } };
}

export const mkdir = (fs: Vfs, parentId: string, name: string): VfsResult => addNode(fs, parentId, name, 'folder');
export const createFile = (fs: Vfs, parentId: string, name: string): VfsResult => addNode(fs, parentId, name, 'file');

export function rename(fs: Vfs, id: string, name: string): VfsResult {
  const n = fs.nodes[id];
  if (!n || n.parentId === null) return fail('notFound');
  if (!validName(name)) return fail('invalidName');
  if (nameTaken(fs, n.parentId, name, id)) return fail('duplicate');
  return { ok: true, id, fs: withNode(fs, { ...n, name: name.trim() }) };
}

export function move(fs: Vfs, id: string, destId: string): VfsResult {
  if (destId === TRASH) return remove(fs, id);
  const n = fs.nodes[id];
  const d = fs.nodes[destId];
  if (!n || !d || n.parentId === null) return fail('notFound');
  if (d.type !== 'folder') return fail('notFolder');
  if (isInside(fs, destId, id)) return fail('intoSelf');
  if (n.parentId === destId) return { ok: true, fs, id };
  if (nameTaken(fs, destId, n.name)) return fail('duplicate');
  return { ok: true, id, fs: withNode(fs, { ...withoutTrashMark(n), parentId: destId }) };
}

function splitExt(name: string, type: NodeType): [string, string] {
  if (type === 'folder') return [name, ''];
  const i = name.lastIndexOf('.');
  return i > 0 ? [name.slice(0, i), name.slice(i)] : [name, ''];
}

function copyName(fs: Vfs, destId: string, name: string, type: NodeType, os: OS): string {
  if (!nameTaken(fs, destId, name)) return name;
  const [base, ext] = splitExt(name, type);
  for (let n = 1; ; n++) {
    let candidate: string;
    if (os === 'win') candidate = n === 1 ? `${base} - Copy${ext}` : `${base} - Copy (${n})${ext}`;
    else candidate = n === 1 ? `${base} copy${ext}` : `${base} copy ${n}${ext}`;
    if (!nameTaken(fs, destId, candidate)) return candidate;
  }
}

export function copy(fs: Vfs, id: string, destId: string, os: OS): VfsResult {
  const n = fs.nodes[id];
  const d = fs.nodes[destId];
  if (!n || !d || n.parentId === null) return fail('notFound');
  if (d.type !== 'folder') return fail('notFolder');
  if (n.type === 'folder' && isInside(fs, destId, id)) return fail('intoSelf');
  let cur = fs;
  const dup = (srcId: string, parentId: string, name: string): string => {
    const src = fs.nodes[srcId]!;
    const r = addNode(cur, parentId, name, src.type);
    if (!r.ok) throw new Error(r.error);
    cur = r.fs;
    for (const c of childrenOf(fs, srcId)) dup(c.id, r.id, c.name);
    return r.id;
  };
  const newId = dup(id, destId, copyName(fs, destId, n.name, n.type, os));
  return { ok: true, id: newId, fs: cur };
}

export function remove(fs: Vfs, id: string): VfsResult {
  const n = fs.nodes[id];
  if (!n || n.parentId === null || n.parentId === TRASH) return fail('notFound');
  return { ok: true, id, fs: withNode(fs, { ...n, parentId: TRASH, trashedFrom: n.parentId }) };
}

export function restore(fs: Vfs, id: string): VfsResult {
  const n = fs.nodes[id];
  if (!n) return fail('notFound');
  if (n.parentId !== TRASH) return fail('notInTrash');
  const from = n.trashedFrom ? fs.nodes[n.trashedFrom] : undefined;
  const dest = from && !isInside(fs, from.id, TRASH) ? from.id : ROOT;
  if (nameTaken(fs, dest, n.name)) return fail('duplicate');
  return { ok: true, id, fs: withNode(fs, { ...withoutTrashMark(n), parentId: dest }) };
}

export function emptyTrash(fs: Vfs): Vfs {
  const nodes: Record<string, VNode> = {};
  for (const n of Object.values(fs.nodes)) {
    if (n.id === TRASH || !isInside(fs, n.id, TRASH)) nodes[n.id] = n;
  }
  return { ...fs, nodes };
}
