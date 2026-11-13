// Imported books on this device: IndexedDB tables `books` and `bookFiles` (see db.ts).
import { db } from '../../../db/db';
import { filesNeeded, parseBook, type PackBook } from './book';
import { readStoredZip } from './zip';

const TYPES: Record<string, string> = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', mp3: 'audio/mpeg', m4a: 'audio/mp4', aac: 'audio/aac', wav: 'audio/wav', ogg: 'audio/ogg', opus: 'audio/ogg' };
const typeOf = (path: string) => TYPES[path.split('.').pop()!.toLowerCase()] ?? 'application/octet-stream';
const CHUNK = 8; // files per transaction: one file is read into memory at a time, a few are written together

/**
 * Store a book from the .zip that `node cli.mjs zip` makes. Replaces a book with the same id.
 * Throws `not-zip`, `compressed`, `no-index`, `bad-book` or `missing:<path>`.
 */
export async function importBook(zip: Blob, onProgress?: (done: number, total: number) => void): Promise<PackBook> {
  const files = await readStoredZip(zip);
  const index = files.get('book.json');
  if (!index) throw new Error('no-index');
  const book = parseBook(new TextDecoder().decode(new Uint8Array(await index.arrayBuffer())));
  for (const f of filesNeeded(book)) if (!files.has(f)) throw new Error(`missing:${f}`);

  const paths = [...files.keys()].filter((p) => p !== 'book.json');
  await deleteBook(book.id);
  let done = 0;
  for (let i = 0; i < paths.length; i += CHUNK) {
    const rows = [];
    for (const path of paths.slice(i, i + CHUNK)) {
      rows.push({ key: `${book.id}/${path}`, bookId: book.id, type: typeOf(path), data: await files.get(path)!.arrayBuffer() });
    }
    await db.bookFiles.bulkPut(rows);
    done += rows.length;
    onProgress?.(done, paths.length);
  }
  await db.books.put({ id: book.id, title: book.title, book, bytes: zip.size, importedAt: new Date().toISOString() });
  onProgress?.(paths.length, paths.length);
  return book;
}

export async function deleteBook(id: string): Promise<void> {
  await db.transaction('rw', db.books, db.bookFiles, async () => {
    await db.bookFiles.where('bookId').equals(id).delete();
    await db.books.delete(id);
  });
}

/** A page image or recording of an imported book, or undefined when it is not there. */
export async function loadFile(bookId: string, path: string): Promise<Blob | undefined> {
  const f = await db.bookFiles.get(`${bookId}/${path}`);
  return f ? new Blob([f.data], { type: f.type }) : undefined;
}
