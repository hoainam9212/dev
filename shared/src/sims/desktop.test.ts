import { describe, it, expect } from 'vitest';
import * as vfs from '../vfs';
import { desktopInitial, gradeDesktop, idAt, reduceDesktop, SHELL_APPS, uniqueName, type DesktopState } from './desktop';

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

  it('goes up from the trash to root', () => {
    let s = start();
    s = reduceDesktop(s, { type: 'remove', ids: [idAt(s.fs, '/ghi-chu.txt')] });
    s = reduceDesktop(s, { type: 'open', id: s.fs.trashId });
    expect(s.cwd).toBe(s.fs.trashId);
    s = reduceDesktop(s, { type: 'up' });
    expect(s.cwd).toBe(s.fs.rootId);
  });

  it('resets cwd to root when emptying the trash removes the folder being browsed, and recovers', () => {
    let s = start();
    const taiLieu = idAt(s.fs, '/Tài liệu');
    s = reduceDesktop(s, { type: 'remove', ids: [taiLieu] });
    s = reduceDesktop(s, { type: 'open', id: s.fs.trashId });
    s = reduceDesktop(s, { type: 'open', id: taiLieu });
    expect(s.cwd).toBe(taiLieu);
    s = reduceDesktop(s, { type: 'emptyTrash' });
    expect(s.cwd).toBe(s.fs.rootId);
    s = reduceDesktop(s, { type: 'mkdir', name: 'Sau khi dọn' });
    expect(s.error).toBeNull();
    expect(idAt(s.fs, '/Sau khi dọn')).toBeDefined();
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

describe('desktop shell (Start / Dock / Spotlight)', () => {
  it('starts with the menu closed, no query and no app open', () => {
    expect(start().shell).toEqual({ menuOpen: false, query: '', launched: null });
  });

  it('toggles the Start menu / Spotlight open and closed', () => {
    let s = reduceDesktop(start(), { type: 'toggleMenu' });
    expect(s.shell.menuOpen).toBe(true);
    s = reduceDesktop(s, { type: 'toggleMenu' });
    expect(s.shell.menuOpen).toBe(false);
  });

  it('keeps the typed query', () => {
    const s = reduceDesktop(reduceDesktop(start(), { type: 'toggleMenu' }), { type: 'setQuery', text: 'exc' });
    expect(s.shell.query).toBe('exc');
  });

  it('closing the menu clears the query', () => {
    let s = reduceDesktop(reduceDesktop(start(), { type: 'toggleMenu' }), { type: 'setQuery', text: 'wo' });
    s = reduceDesktop(s, { type: 'toggleMenu' });
    expect(s.shell.query).toBe('');
  });

  it('launch closes the menu, records the app and clears the query', () => {
    let s = reduceDesktop(reduceDesktop(start(), { type: 'toggleMenu' }), { type: 'setQuery', text: 'exc' });
    s = reduceDesktop(s, { type: 'launch', app: 'excel' });
    expect(s.shell).toEqual({ menuOpen: false, query: '', launched: 'excel' });
  });

  it('closeApp puts launched back to null', () => {
    const s = reduceDesktop(reduceDesktop(start(), { type: 'launch', app: 'word' }), { type: 'closeApp' });
    expect(s.shell.launched).toBeNull();
  });

  it('does not touch files or undo history', () => {
    const s0 = start();
    const s = reduceDesktop(reduceDesktop(s0, { type: 'toggleMenu' }), { type: 'launch', app: 'ppt' });
    expect(s.fs).toBe(s0.fs);
    expect(s.past).toHaveLength(0);
  });

  it('lists the five apps with Windows and Mac names', () => {
    expect(SHELL_APPS.map((a) => a.id)).toEqual(['word', 'excel', 'ppt', 'explorer', 'browser']);
    expect(SHELL_APPS.find((a) => a.id === 'explorer')).toMatchObject({ win: 'File Explorer', mac: 'Finder' });
    expect(SHELL_APPS.find((a) => a.id === 'browser')).toMatchObject({ win: 'Edge', mac: 'Safari' });
  });

  it('grades launched: passes for the right app, fails for none or another', () => {
    const want = { kind: 'launched', app: 'excel' } as const;
    expect(gradeDesktop(start(), want).ok).toBe(false);
    expect(gradeDesktop(reduceDesktop(start(), { type: 'launch', app: 'word' }), want).ok).toBe(false);
    const ok = gradeDesktop(reduceDesktop(start(), { type: 'launch', app: 'excel' }), want);
    expect(ok.ok).toBe(true);
    expect(ok.messageVi).toMatch(/Excel/);
    expect(gradeDesktop(start('mac'), { kind: 'launched', app: 'explorer' }).messageVi).toMatch(/Finder/);
  });
});
