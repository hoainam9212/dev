import { describe, it, expect } from 'vitest';
import * as vfs from '../vfs';
import { desktopInitial, gradeDesktop, idAt, reduceDesktop, uniqueName, type DesktopState } from './desktop';

const tree = [
  { name: 'Tài liệu', children: [{ name: 'hoa-don.pdf' }] },
  { name: 'Ảnh', children: [{ name: 'bien.jpg' }, { name: 'nui.jpg' }] },
  { name: 'ghi-chu.txt' },
];
const start = (os: 'win' | 'mac' = 'win') => desktopInitial(tree, os);
const path = (s: DesktopState, id: string) => vfs.pathOf(s.fs, id);

describe('desktop sim', () => {
  it('starts at the given folder', () => {
    const s = desktopInitial(tree, 'win', '/Ảnh');
    expect(path(s, s.cwd)).toBe('/Ảnh');
    expect(s.selected).toEqual([]);
  });

  it('opens folders, ignores files, goes up', () => {
    let s = start();
    s = reduceDesktop(s, { type: 'open', id: idAt(s.fs, '/ghi-chu.txt') });
    expect(s.cwd).toBe(s.fs.rootId);
    s = reduceDesktop(s, { type: 'open', id: idAt(s.fs, '/Ảnh') });
    expect(path(s, s.cwd)).toBe('/Ảnh');
    s = reduceDesktop(s, { type: 'up' });
    expect(s.cwd).toBe(s.fs.rootId);
    s = reduceDesktop(s, { type: 'up' });
    expect(s.cwd).toBe(s.fs.rootId);
  });

  it('creates a folder in cwd and selects it; errors on duplicates', () => {
    let s = start();
    s = reduceDesktop(s, { type: 'mkdir', name: 'Học tập' });
    const id = idAt(s.fs, '/Học tập');
    expect(s.selected).toEqual([id]);
    expect(s.past).toHaveLength(1);
    s = reduceDesktop(s, { type: 'mkdir', name: 'học tập' });
    expect(s.error).toBe('duplicate');
    expect(s.past).toHaveLength(1);
    s = reduceDesktop(s, { type: 'clearError' });
    expect(s.error).toBeNull();
  });

  it('renames and undoes', () => {
    let s = start();
    const id = idAt(s.fs, '/ghi-chu.txt');
    s = reduceDesktop(s, { type: 'rename', id, name: 'viec-can-lam.txt' });
    expect(path(s, id)).toBe('/viec-can-lam.txt');
    s = reduceDesktop(s, { type: 'undo' });
    expect(path(s, id)).toBe('/ghi-chu.txt');
    expect(s.past).toHaveLength(0);
  });

  it('cut + paste moves; copy + paste duplicates with OS naming', () => {
    let s = start('mac');
    const bien = idAt(s.fs, '/Ảnh/bien.jpg');
    s = reduceDesktop(s, { type: 'cut', ids: [bien] });
    s = reduceDesktop(s, { type: 'open', id: idAt(s.fs, '/Tài liệu') });
    s = reduceDesktop(s, { type: 'paste' });
    expect(path(s, bien)).toBe('/Tài liệu/bien.jpg');
    expect(s.clipboard).toBeNull();
    s = reduceDesktop(s, { type: 'copy', ids: [bien] });
    s = reduceDesktop(s, { type: 'paste' });
    expect(vfs.findByPath(s.fs, '/Tài liệu/bien copy.jpg')).toBeDefined();
    expect(s.clipboard?.mode).toBe('copy');
  });

  it('moves by drag, removes to trash, restores, empties', () => {
    let s = start();
    const nui = idAt(s.fs, '/Ảnh/nui.jpg');
    s = reduceDesktop(s, { type: 'move', ids: [nui], destId: idAt(s.fs, '/Tài liệu') });
    expect(path(s, nui)).toBe('/Tài liệu/nui.jpg');
    s = reduceDesktop(s, { type: 'remove', ids: [nui] });
    expect(path(s, nui)).toBe('/Thùng rác/nui.jpg');
    s = reduceDesktop(s, { type: 'restore', id: nui });
    expect(path(s, nui)).toBe('/Tài liệu/nui.jpg');
    s = reduceDesktop(s, { type: 'remove', ids: [nui] });
    s = reduceDesktop(s, { type: 'emptyTrash' });
    expect(s.fs.nodes[nui]).toBeUndefined();
  });

  it('returns to root when the open folder is removed', () => {
    let s = desktopInitial(tree, 'win', '/Ảnh');
    s = reduceDesktop(s, { type: 'remove', ids: [s.cwd] });
    expect(s.cwd).toBe(s.fs.rootId);
  });

  it('caps undo history', () => {
    let s = start();
    for (let i = 0; i < 35; i++) s = reduceDesktop(s, { type: 'mkdir', name: `F${i}` });
    expect(s.past).toHaveLength(30);
  });

  it('suggests unique names', () => {
    let s = start();
    expect(uniqueName(s.fs, s.fs.rootId, 'Thư mục mới')).toBe('Thư mục mới');
    s = reduceDesktop(s, { type: 'mkdir', name: 'Thư mục mới' });
    expect(uniqueName(s.fs, s.fs.rootId, 'Thư mục mới')).toBe('Thư mục mới (2)');
  });

  it('grades paths, trash and cwd', () => {
    let s = start();
    s = reduceDesktop(s, { type: 'remove', ids: [idAt(s.fs, '/ghi-chu.txt')] });
    expect(gradeDesktop(s, { kind: 'inTrash', name: 'ghi-chu.txt' }).ok).toBe(true);
    expect(gradeDesktop(s, { kind: 'notExists', path: '/ghi-chu.txt' }).ok).toBe(true);
    expect(gradeDesktop(s, { kind: 'pathExists', path: '/Ảnh', type: 'folder' }).ok).toBe(true);
    const bad = gradeDesktop(s, { kind: 'pathExists', path: '/Ảnh/bien.jpg', type: 'folder' });
    expect(bad.ok).toBe(false);
    expect(gradeDesktop(s, { kind: 'cwdIs', path: '/Ảnh' }).messageVi).toMatch(/Ảnh/);
  });

  it('idAt throws for missing paths', () => {
    expect(() => idAt(start().fs, '/khong-co')).toThrow(/khong-co/);
  });
});
