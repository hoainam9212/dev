import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { bjtEstimate, type BjtSection } from '@nihongo/shared';
import { db, type StoredBook } from '../../../db/db';
import { useBjt } from '../../../store/bjt';
import { useT } from '../../../i18n';
import { answerKey, bookExamSeconds, groupsOf, j1plusNos, wrongNos, type PackBook, type PackExtra, type PackTest } from './book';
import { deleteBook, importBook } from './library';
import { BookRunner } from './BookRunner';
import { useBookFile } from './useBookFile';

interface Run {
  book: PackBook;
  test: PackTest;
  exam: boolean;
  sections?: BjtSection[];
  only?: number[];
}

/** /bjt/sach: the learner's own prep books, imported from .zip and kept on the device. */
export function BooksPage() {
  const t = useT();
  const books = useLiveQuery(() => db.books.orderBy('importedAt').toArray(), []);
  const [run, setRun] = useState<Run | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [params, setParams] = useSearchParams();
  const redo = params.get('redo');

  // /bjt/sach?redo=<bookId>:<testId> (from the /bjt plan tab): open that test's wrong answers once the books are loaded
  useEffect(() => {
    if (!redo || !books) return;
    const cut = redo.lastIndexOf(':');
    const book = books.find((b) => b.id === redo.slice(0, cut))?.book as PackBook | undefined;
    const test = book?.tests.find((x) => x.id === redo.slice(cut + 1));
    const only = book && test ? wrongNos(book.id, test, useBjt.getState().answers) : [];
    if (book && test && only.length) setRun({ book, test, exam: false, only });
    setParams({}, { replace: true });
  }, [redo, books, setParams]);

  if (run) {
    return (
      <section className="card p-4 md:p-6">
        <BookRunner key={`${run.test.id}-${run.exam}-${run.sections?.join()}-${run.only?.join()}`} {...run} onExit={() => setRun(null)} />
      </section>
    );
  }

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setMessage(null);
    setProgress(0);
    try {
      const b = await importBook(file, (done, total) => setProgress(Math.round((done / total) * 100)));
      setMessage({ ok: true, text: t.bjtBooks.imported(b.title) });
    } catch (e) {
      const code = e instanceof Error ? e.message : '';
      const errs = t.bjtBooks.errors;
      const text = code.startsWith('missing:')
        ? errs.missing(code.slice(8))
        : code === 'not-zip' || code === 'compressed' || code === 'no-index' || code === 'bad-book'
          ? errs[code]
          : errs.other;
      setMessage({ ok: false, text });
    } finally {
      setProgress(null);
    }
  };

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <Link to="/bjt" className="text-sm font-bold text-muted hover:text-rose">
          {t.bjtBooks.back}
        </Link>
        <h1 className="text-2xl font-black text-rose">{t.bjtBooks.title}</h1>
        <p className="text-sm text-muted">{t.bjtBooks.subtitle}</p>
      </header>

      <section className="card space-y-2 p-4">
        <h2 className="font-black">{t.bjtBooks.importTitle}</h2>
        <p className="text-sm text-muted">{t.bjtBooks.importHelp}</p>
        <label className={`btn-primary inline-block cursor-pointer ${progress !== null ? 'pointer-events-none opacity-60' : ''}`}>
          {progress !== null ? t.bjtBooks.importing(progress) : t.bjtBooks.pick}
          <input
            type="file"
            accept=".zip,application/zip"
            className="sr-only"
            data-testid="book-file"
            disabled={progress !== null}
            onChange={(e) => {
              void onFile(e.target.files?.[0]);
              e.target.value = '';
            }}
          />
        </label>
        {message && (
          <p role="status" className={`text-sm font-bold ${message.ok ? 'text-emerald-600' : 'text-rose'}`}>
            {message.text}
          </p>
        )}
      </section>

      {books && books.length === 0 && <p className="text-center text-muted">{t.bjtBooks.empty}</p>}
      {books?.map((b) => <BookCard key={b.id} stored={b} onRun={setRun} />)}
    </div>
  );
}

/** The book's instruction and example recordings: each with its own player, outside the timed run. */
function Extras({ bookId, extras }: { bookId: string; extras: PackExtra[] }) {
  const t = useT();
  return (
    <details className="rounded-xl bg-surface px-3 py-2 ring-1 ring-sakura/40" data-testid="book-extras" open>
      <summary className="cursor-pointer text-sm font-bold">{t.bjtBooks.extras}</summary>
      <ul className="mt-2 space-y-2">
        {extras.map((x) => (
          <li key={x.audio} className="space-y-1">
            <p className="text-xs font-bold break-words">{x.title}</p>
            <ExtraAudio bookId={bookId} path={x.audio} />
          </li>
        ))}
      </ul>
    </details>
  );
}

function ExtraAudio({ bookId, path }: { bookId: string; path: string }) {
  const url = useBookFile(bookId, path);
  return <audio src={url} controls preload="none" className="w-full" data-testid="book-extra-audio" />;
}

function BookCard({ stored, onRun }: { stored: StoredBook; onRun: (r: Run) => void }) {
  const t = useT();
  const book = stored.book as PackBook;
  const runs = useBjt((s) => s.runs);
  const answers = useBjt((s) => s.answers);
  return (
    <section className="card space-y-3 p-4" data-testid="book-card">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <h2 className="font-black break-words">{book.title}</h2>
          <p className="text-xs text-muted">
            {t.bjtBooks.tests(book.tests.length)} · {t.bjtBooks.size(Math.round(stored.bytes / 1048576))}
          </p>
        </div>
        <button
          type="button"
          className="btn-soft text-xs"
          onClick={() => {
            if (window.confirm(t.bjtBooks.confirmRemove(book.title))) void deleteBook(book.id);
          }}
        >
          {t.bjtBooks.remove}
        </button>
      </div>

      {book.tests.map((test) => {
        const last = runs[`book:${book.id}:${test.id}`]?.at(-1);
        const est = last && !test.legacy && bjtEstimate(last.correct, last.total);
        const minutes = bookExamSeconds(test) / 60;
        const wrong = wrongNos(book.id, test, answers);
        const plus = j1plusNos(test);
        return (
          <div key={test.id} className="space-y-2 rounded-2xl bg-cream p-3 dark:bg-bg">
            <p className="font-bold">
              {test.title} <span className="text-sm font-normal text-muted">· {t.bjtBooks.questions(test.questions.length)}</span>
            </p>
            {last && est && <p className="text-xs text-muted">{t.bjtBooks.last(est.score, est.level, last.correct, last.total)}</p>}
            {last && test.legacy && <p className="text-xs text-muted">{t.bjtBooks.lastLegacy(last.correct, last.total)}</p>}
            {test.legacy && <p className="text-xs font-bold text-muted">{t.bjtBooks.legacyNote}</p>}
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn-primary text-sm" onClick={() => onRun({ book, test, exam: true })}>
                {t.bjtBooks.exam(minutes)}
              </button>
              <button type="button" className="btn-soft text-sm" onClick={() => onRun({ book, test, exam: false })}>
                {t.bjtBooks.practice}
              </button>
              {wrong.length > 0 && (
                <button type="button" className="btn-sky text-sm" onClick={() => onRun({ book, test, exam: false, only: wrong })}>
                  {t.bjtBooks.redoWrong(wrong.length)}
                </button>
              )}
              {plus.length > 0 && (
                <button type="button" className="btn-soft text-sm" onClick={() => onRun({ book, test, exam: false, only: plus })}>
                  {t.bjtBooks.j1plusOnly(plus.length)}
                </button>
              )}
            </div>
            <p className="text-xs text-muted">{t.bjtBooks.examRules}</p>
            {!!test.extras?.length && <Extras bookId={book.id} extras={test.extras} />}
            <ul className={`grid grid-cols-1 gap-1 ${test.questions.some((q) => q.label) ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
              {groupsOf(test).map((g) => {
                const keys = g.nos.map((no) => answerKey(book.id, test.id, no));
                const seen = keys.filter((k) => k in answers);
                const right = seen.filter((k) => answers[k]).length;
                return (
                  <li key={g.key}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-2 rounded-xl bg-surface px-3 py-2 text-left text-sm ring-1 ring-sakura/40 hover:bg-sakura/30"
                      onClick={() => onRun({ book, test, exam: false, only: g.nos })}
                    >
                      <span className="min-w-0 font-bold break-words">{g.name}</span>
                      <span className="shrink-0 text-xs text-muted tabular-nums">{seen.length ? t.bjtBooks.sectionDone(right, seen.length, g.nos.length) : t.bjtBooks.questions(g.nos.length)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
