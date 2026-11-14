import { useMemo } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import type { BjtSection } from '@nihongo/shared';
import { db, type StoredBook } from '../../db/db';
import { useBjt } from '../../store/bjt';
import { bookRuns, bookSectionStats, bookWrongTests, type BookRun, type BookStat, type BookWrongTest } from './bjt';

export interface BookStats {
  /** Book answers per BJT section (the app's own questions are not counted). */
  bySection: Record<BjtSection, BookStat>;
  /** Book questions whose last answer was wrong. */
  wrong: number;
  /** Latest timed run of each book test, newest first. */
  runs: BookRun[];
  /** Book tests that have questions last answered wrong. */
  wrongTests: BookWrongTest[];
}

const NONE: StoredBook[] = [];

/** Results of the learner's own prep books (IndexedDB `books` + the BJT store), for the /bjt tabs. */
export function useBookStats(): BookStats {
  const books = useLiveQuery(() => db.books.toArray(), []) ?? NONE;
  const answers = useBjt((s) => s.answers);
  const runs = useBjt((s) => s.runs);
  return useMemo(() => {
    const bySection = bookSectionStats(books, answers);
    const wrong = Object.values(bySection).reduce((n, s) => n + s.answered - s.correct, 0);
    return { bySection, wrong, runs: bookRuns(books, runs), wrongTests: bookWrongTests(books, answers) };
  }, [books, answers, runs]);
}
