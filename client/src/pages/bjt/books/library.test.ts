import { afterEach, describe, expect, it } from 'vitest';
import { db } from '../../../db/db';
import { deleteBook, importBook, loadFile } from './library';
import { makeZip } from './zip.testutil';

const enc = new TextEncoder();
const index = {
  id: 'q4',
  title: 'Quyển 4',
  pages: 9,
  audio: [{ file: 'audio/a003.mp3', seconds: 30 }],
  tests: [{ id: 'mogi', title: '模擬', questions: [{ no: 1, section: 'bamen', n: 1, page: 9, answer: 1, audio: 'audio/a003.mp3' }] }],
};
const files = (book: object = index): [string, Uint8Array][] => [
  ['book.json', enc.encode(JSON.stringify(book))],
  ['pages/p0009.jpg', new Uint8Array([1, 2, 3])],
  ['audio/a003.mp3', new Uint8Array([4, 5])],
];

afterEach(async () => {
  await db.books.clear();
  await db.bookFiles.clear();
});

describe('importBook', () => {
  it('keeps the index and every file, and reports progress', async () => {
    const seen: number[] = [];
    const b = await importBook(makeZip(files()), (done, total) => seen.push(done / total));
    expect(b.id).toBe('q4');
    expect((await db.books.get('q4'))?.title).toBe('Quyển 4');
    expect(await db.bookFiles.where('bookId').equals('q4').count()).toBe(2);
    const page = await loadFile('q4', 'pages/p0009.jpg');
    expect(page?.type).toBe('image/jpeg');
    expect([...new Uint8Array(await page!.arrayBuffer())]).toEqual([1, 2, 3]);
    expect((await loadFile('q4', 'audio/a003.mp3'))?.type).toBe('audio/mpeg');
    expect(seen.at(-1)).toBe(1);
  });

  it('importing the same book again replaces it', async () => {
    await importBook(makeZip(files()));
    await importBook(makeZip(files({ ...index, title: 'Quyển 4 (mới)' })));
    expect(await db.books.count()).toBe(1);
    expect((await db.books.get('q4'))?.title).toBe('Quyển 4 (mới)');
  });

  it('refuses a zip without book.json, or one missing a page it needs', async () => {
    await expect(importBook(makeZip(files().slice(1)))).rejects.toThrow('no-index');
    await expect(importBook(makeZip(files().filter(([n]) => n !== 'pages/p0009.jpg')))).rejects.toThrow('missing:pages/p0009.jpg');
    expect(await db.books.count()).toBe(0);
  });

  it('deleteBook removes the book and its files', async () => {
    await importBook(makeZip(files()));
    await deleteBook('q4');
    expect(await db.books.count()).toBe(0);
    expect(await db.bookFiles.count()).toBe(0);
  });
});
