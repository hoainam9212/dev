// Where the learner left off, for "Continue" on the home page and the phone's "Continue" shortcut.
// Kept in localStorage: it is a convenience of this device, not progress to sync.
import type { BjtSection } from '@nihongo/shared';

export interface BookPlace {
  bookId: string;
  testId: string;
  /** Index in the practised list (after `only` / `sections`). */
  i: number;
  only?: number[];
  sections?: BjtSection[];
  title: string;
  testTitle: string;
}

export type Place = ({ kind: 'book' } & BookPlace) | { kind: 'page'; path: string };

const KEY = 'ns.resume';

/** Pages worth going back to; hubs (home, the learn list, review, the "me" pages) are not. */
const LESSONS = ['/kana', '/vocab', '/kanji', '/grammar', '/reading', '/listening', '/speaking', '/writing', '/business', '/bjt'];

export function lastPlace(): Place | null {
  try {
    const p = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Place | null;
    return p && (p.kind === 'page' ? typeof p.path === 'string' : typeof p.bookId === 'string') ? p : null;
  } catch {
    return null;
  }
}

const save = (p: Place) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* a convenience only */
  }
};

export function noteVisit(path: string): void {
  if (!LESSONS.some((l) => path === l || path.startsWith(`${l}/`))) return;
  // the BJT pages lead to the book being practised: keep its question
  if (path.startsWith('/bjt') && lastPlace()?.kind === 'book') return;
  save({ kind: 'page', path });
}

export function saveBookPlace(b: BookPlace): void {
  save({ kind: 'book', ...b });
}

/** Where "Continue" goes; the learn list when there is nothing to go back to. */
export function resumePath(): string {
  const p = lastPlace();
  if (!p) return '/learn';
  return p.kind === 'book' ? '/bjt/sach?resume=1' : p.path;
}
