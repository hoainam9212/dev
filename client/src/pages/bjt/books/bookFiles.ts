// Where the learner's book .zip files are on the phone, so a book can be opened again without searching for it.
// The WebView's <input type="file"> forgets the file at once; the native plugin `BookFiles` (MainActivity's package)
// picks through Android's document picker and keeps read permission on the file, so it can be read again later.
import { Capacitor, registerPlugin } from '@capacitor/core';

export interface PickedFile {
  uri: string;
  name: string;
  size: number;
}

interface BookFilesPlugin {
  /** Rejects with code `cancelled` when the picker is closed. */
  pick(): Promise<PickedFile>;
  /** Copies the file into the app's cache; rejects with code `gone` when it was moved, deleted or access was lost. */
  copy(o: { uri: string }): Promise<{ path: string; size: number }>;
  /** Deletes the cache copy. */
  clean(): Promise<void>;
  /** Gives the lasting read permission back. */
  release(o: { uri: string }): Promise<void>;
}

const plugin = registerPlugin<BookFilesPlugin>('BookFiles');

/** Only the Android app can keep a file's place; the web keeps the plain file input. */
export const canRememberFiles = () => Capacitor.isNativePlatform();

export interface RecentFile extends PickedFile {
  bookId: string;
  title: string;
  openedAt: string;
}

const KEY = 'ns.bookRecent';
const MAX = 12;

export function recentFiles(): RecentFile[] {
  try {
    const list: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(list) ? list.filter((f): f is RecentFile => typeof f?.uri === 'string' && typeof f?.bookId === 'string') : [];
  } catch {
    return [];
  }
}

const save = (list: RecentFile[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX)));
  } catch {
    /* storage full or blocked: the list is a convenience */
  }
};

/** Newest first; a newer file of the same book replaces the older place. */
export function rememberFile(f: RecentFile): void {
  const old = recentFiles();
  const list = [f, ...old.filter((x) => x.uri !== f.uri && x.bookId !== f.bookId)].slice(0, MAX);
  save(list);
  for (const x of old) if (!list.some((y) => y.uri === x.uri)) release(x.uri);
}

export function forgetFile(uri: string): void {
  save(recentFiles().filter((x) => x.uri !== uri));
  release(uri);
}

const release = (uri: string) => void plugin.release({ uri }).catch(() => {});

const codeOf = (e: unknown) => (e as { code?: string } | null)?.code ?? (e instanceof Error ? e.message : '');

/** Opens the document picker; undefined when the learner closed it. */
export async function pickFile(): Promise<PickedFile | undefined> {
  try {
    return await plugin.pick();
  } catch (e) {
    if (codeOf(e) === 'cancelled') return undefined;
    throw e;
  }
}

/** The file's content: native copies it into the app cache and the WebView reads that copy. Throws `gone`. */
export async function readFile(uri: string): Promise<Blob> {
  let path: string;
  try {
    ({ path } = await plugin.copy({ uri }));
  } catch (e) {
    // `failed`: the copy could not be written (no space): the file is fine, say the general error
    throw new Error(codeOf(e) === 'gone' ? 'gone' : 'other');
  }
  const res = await fetch(Capacitor.convertFileSrc(path));
  if (!res.ok) throw new Error('gone');
  return res.blob();
}

export const cleanCopy = () => plugin.clean().catch(() => {});
