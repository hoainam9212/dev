import { describe, it, expect } from 'vitest';
import * as vfs from './index';

const sample = () =>
  vfs.fromTree([
    { name: 'Tài liệu', children: [{ name: '2026', children: [] }, { name: 'ghi-chu.txt' }] },
    { name: 'Ảnh', children: [{ name: 'meo.jpg' }] },
    { name: 'bien-lai.pdf' },
  ]);

const ok = (r: vfs.VfsResult) => {
  if (!r.ok) throw new Error(r.error);
  return r;
};

describe('vfs', () => {
  it('builds a tree and resolves paths', () => {
    const fs = sample();
    const y = vfs.findByPath(fs, '/Tài liệu/2026');
    expect(y?.type).toBe('folder');
    expect(vfs.pathOf(fs, y!.id)).toBe('/Tài liệu/2026');
    expect(vfs.pathOf(fs, fs.rootId)).toBe('/');
    expect(vfs.findByPath(fs, '/tài liệu/GHI-CHU.txt')?.name).toBe('ghi-chu.txt');
    expect(vfs.findByPath(fs, '/Không có')).toBeUndefined();
  });

  it('lists folders first, then files by name', () => {
    const fs = sample();
    expect(vfs.childrenOf(fs, fs.rootId).map((n) => n.name)).toEqual(['Ảnh', 'Tài liệu', 'bien-lai.pdf']);
  });

  it('creates folders and rejects duplicates and bad names', () => {
    const fs = sample();
    const r = ok(vfs.mkdir(fs, fs.rootId, 'Nhạc'));
    expect(vfs.pathOf(r.fs, r.id)).toBe('/Nhạc');
    expect(fs.nodes[r.id]).toBeUndefined();
    expect(vfs.mkdir(r.fs, fs.rootId, 'nhạc')).toEqual({ ok: false, error: 'duplicate' });
    expect(vfs.mkdir(fs, fs.rootId, '  ')).toEqual({ ok: false, error: 'invalidName' });
    expect(vfs.mkdir(fs, fs.rootId, 'a/b')).toEqual({ ok: false, error: 'invalidName' });
    const file = vfs.findByPath(fs, '/bien-lai.pdf')!;
    expect(vfs.mkdir(fs, file.id, 'x')).toEqual({ ok: false, error: 'notFolder' });
  });

  it('renames', () => {
    const fs = sample();
    const f = vfs.findByPath(fs, '/bien-lai.pdf')!;
    const r = ok(vfs.rename(fs, f.id, 'hoa-don.pdf'));
    expect(vfs.pathOf(r.fs, f.id)).toBe('/hoa-don.pdf');
    expect(vfs.rename(fs, f.id, 'Ảnh')).toEqual({ ok: false, error: 'duplicate' });
  });

  it('moves and blocks moving a folder into itself', () => {
    const fs = sample();
    const f = vfs.findByPath(fs, '/bien-lai.pdf')!;
    const y = vfs.findByPath(fs, '/Tài liệu/2026')!;
    const r = ok(vfs.move(fs, f.id, y.id));
    expect(vfs.pathOf(r.fs, f.id)).toBe('/Tài liệu/2026/bien-lai.pdf');
    const docs = vfs.findByPath(fs, '/Tài liệu')!;
    expect(vfs.move(fs, docs.id, y.id)).toEqual({ ok: false, error: 'intoSelf' });
  });

  it('copies deeply with Windows and Mac naming', () => {
    const fs = sample();
    const pics = vfs.findByPath(fs, '/Ảnh')!;
    const w1 = ok(vfs.copy(fs, pics.id, fs.rootId, 'win'));
    expect(vfs.pathOf(w1.fs, w1.id)).toBe('/Ảnh - Copy');
    expect(vfs.findByPath(w1.fs, '/Ảnh - Copy/meo.jpg')).toBeDefined();
    const w2 = ok(vfs.copy(w1.fs, pics.id, fs.rootId, 'win'));
    expect(vfs.pathOf(w2.fs, w2.id)).toBe('/Ảnh - Copy (2)');
    const cat = vfs.findByPath(fs, '/Ảnh/meo.jpg')!;
    const m1 = ok(vfs.copy(fs, cat.id, pics.id, 'mac'));
    expect(vfs.pathOf(m1.fs, m1.id)).toBe('/Ảnh/meo copy.jpg');
    const m2 = ok(vfs.copy(m1.fs, cat.id, pics.id, 'mac'));
    expect(vfs.pathOf(m2.fs, m2.id)).toBe('/Ảnh/meo copy 2.jpg');
  });

  it('removes to trash and restores', () => {
    const fs = sample();
    const f = vfs.findByPath(fs, '/Tài liệu/ghi-chu.txt')!;
    const del = ok(vfs.remove(fs, f.id));
    expect(vfs.pathOf(del.fs, f.id)).toBe('/Thùng rác/ghi-chu.txt');
    const back = ok(vfs.restore(del.fs, f.id));
    expect(vfs.pathOf(back.fs, f.id)).toBe('/Tài liệu/ghi-chu.txt');
    expect(vfs.restore(fs, f.id)).toEqual({ ok: false, error: 'notInTrash' });
  });

  it('restores to root when the original folder is gone', () => {
    const fs = sample();
    const f = vfs.findByPath(fs, '/Tài liệu/ghi-chu.txt')!;
    const docs = vfs.findByPath(fs, '/Tài liệu')!;
    const a = ok(vfs.remove(fs, f.id));
    const b = ok(vfs.remove(a.fs, docs.id));
    const c = ok(vfs.restore(b.fs, f.id));
    expect(vfs.pathOf(c.fs, f.id)).toBe('/ghi-chu.txt');
  });

  it('moving into the trash behaves like remove', () => {
    const fs = sample();
    const f = vfs.findByPath(fs, '/Tài liệu/ghi-chu.txt')!;
    const r = ok(vfs.move(fs, f.id, fs.trashId));
    expect(r.fs.nodes[f.id]?.trashedFrom).toBe(vfs.findByPath(fs, '/Tài liệu')!.id);
    const back = ok(vfs.restore(r.fs, f.id));
    expect(vfs.pathOf(back.fs, f.id)).toBe('/Tài liệu/ghi-chu.txt');
  });

  it('empties the trash permanently', () => {
    const fs = sample();
    const docs = vfs.findByPath(fs, '/Tài liệu')!;
    const a = ok(vfs.remove(fs, docs.id));
    const b = vfs.emptyTrash(a.fs);
    expect(b.nodes[docs.id]).toBeUndefined();
    expect(Object.values(b.nodes).some((n) => n.name === '2026')).toBe(false);
    expect(vfs.childrenOf(b, b.trashId)).toEqual([]);
  });
});
