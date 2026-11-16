import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { bjtEstimate, type BjtSection } from '@nihongo/shared';
import { db, type StoredBook } from '../../../db/db';
import { useBjt } from '../../../store/bjt';
import { useT } from '../../../i18n';
import { answerKey, bookExamSeconds, groupsOf, j1plusNos, tabLabel, wrongNos, type PackBook, type PackExtra, type PackTest } from './book';
import { deleteBook, importBook } from './library';
import { BookRunner } from './BookRunner';
import { useBookFile } from './useBookFile';
import { lastPlace } from '../../../lib/resume';
import { canRememberFiles, cleanCopy, forgetFile, pickFile, readFile, recentFiles, rememberFile, type PickedFile, type RecentFile } from './bookFiles';

interface Run {
  book: PackBook;
  test: PackTest;
  exam: boolean;
  sections?: BjtSection[];
  only?: number[];
  start?: number;
}

/** The tab shown last (a book id, or ADD), so the learner comes back to the book they study. */
const TAB_KEY = 'ns.bookTab';
const ADD = '+add';
const readTab = () => {
  try {
    return localStorage.getItem(TAB_KEY);
  } catch {
    return null;
  }
};

/** /bjt/sach: the learner's own prep books, imported from .zip and kept on the device. One tab per book. */
export function BooksPage() {
  const t = useT();
  const books = useLiveQuery(() => db.books.orderBy('importedAt').toArray(), []);
  const [tab, setTabState] = useState<string | null>(readTab);
  const setTab = (id: string) => {
    setTabState(id);
    try {
      localStorage.setItem(TAB_KEY, id);
    } catch {
      /* the tab is a convenience */
    }
  };
  const [run, setRun] = useState<Run | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [params, setParams] = useSearchParams();
  const redo = params.get('redo');
  const native = canRememberFiles();
  const [recent, setRecent] = useState<RecentFile[]>(() => (native ? recentFiles() : []));

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

  // /bjt/sach?resume=1 ("Continue"): the book question practised last
  const resume = params.get('resume');
  useEffect(() => {
    if (!resume || !books) return;
    const p = lastPlace();
    const book = p?.kind === 'book' ? (books.find((b) => b.id === p.bookId)?.book as PackBook | undefined) : undefined;
    const test = p?.kind === 'book' ? book?.tests.find((x) => x.id === p.testId) : undefined;
    if (p?.kind === 'book' && book && test) {
      setTab(book.id);
      setRun({ book, test, exam: false, only: p.only, sections: p.sections, start: p.i });
    }
    setParams({}, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resume, books, setParams]);

  if (run) {
    return (
      <section className="card p-4 md:p-6">
        <BookRunner key={`${run.test.id}-${run.exam}-${run.sections?.join()}-${run.only?.join()}`} {...run} onExit={() => setRun(null)} />
      </section>
    );
  }

  /** Imports a book; `place` is where the .zip is on the phone, remembered so the book can be opened again. */
  const load = async (read: () => Promise<Blob>, place?: PickedFile) => {
    setMessage(null);
    setProgress(0);
    try {
      const b = await importBook(await read(), (done, total) => setProgress(Math.round((done / total) * 100)));
      if (place) {
        rememberFile({
          ...place,
          bookId: b.id,
          title: b.title,
          openedAt: new Date().toISOString(),
        });
        setRecent(recentFiles());
      }
      setMessage({ ok: true, text: t.bjtBooks.imported(b.title) });
      setTab(b.id);
    } catch (e) {
      const code = e instanceof Error ? e.message : '';
      const errs = t.bjtBooks.errors;
      const text = code.startsWith('missing:')
        ? errs.missing(code.slice(8))
        : code === 'not-zip' || code === 'compressed' || code === 'no-index' || code === 'bad-book' || code === 'gone'
          ? errs[code]
          : errs.other;
      setMessage({ ok: false, text });
    } finally {
      setProgress(null);
      if (native) void cleanCopy();
    }
  };

  const onFile = (file: File | undefined) => (file ? load(async () => file) : undefined);

  const pickNative = async () => {
    try {
      const place = await pickFile();
      if (place) await load(() => readFile(place.uri), place);
    } catch {
      setMessage({ ok: false, text: t.bjtBooks.errors.other });
    }
  };

  const busy = progress !== null;
  // the stored tab when it still exists, else the first book; no book yet → the import tab
  const current = !books ? null : books.length === 0 ? ADD : tab === ADD || books.some((b) => b.id === tab) ? tab : books[0]!.id;
  const shown = books?.find((b) => b.id === current);

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <Link to="/bjt" className="text-sm font-bold text-muted hover:text-rose">
          {t.bjtBooks.back}
        </Link>
        <h1 className="text-2xl font-black text-rose">{t.bjtBooks.title}</h1>
        <p className="text-sm text-muted">{t.bjtBooks.subtitle}</p>
      </header>

      {message && (
        <p role="status" className={`text-sm font-bold ${message.ok ? 'text-emerald-600' : 'text-rose'}`}>
          {message.text}
        </p>
      )}

      {books && books.length > 0 && (
        <div role="tablist" aria-label={t.bjtBooks.tabs} className="flex flex-wrap gap-2">
          {[
            ...books.map((b) => ({
              id: b.id,
              label: tabLabel(b.title),
              title: b.title,
            })),
            {
              id: ADD,
              label: t.bjtBooks.addTab,
              title: t.bjtBooks.importTitle,
            },
          ].map((x) => {
            const selected = current === x.id;
            return (
              <button
                key={x.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="book-panel"
                title={x.title}
                onClick={() => setTab(x.id)}
                className={`max-w-[12rem] shrink-0 truncate rounded-full px-4 py-2 text-sm font-bold ring-1 transition ${
                  selected ? 'bg-rose-700 text-white ring-rose-700' : 'bg-surface ring-sakura/40 hover:bg-sakura/30'
                }`}
              >
                {x.label}
              </button>
            );
          })}
        </div>
      )}

      <div role="tabpanel" id="book-panel" className="space-y-4">
        {current === ADD && (
          <section className="card space-y-2 p-4">
            <h2 className="font-black">{t.bjtBooks.importTitle}</h2>
            <p className="text-sm text-muted">{t.bjtBooks.importHelp}</p>
            {native ? (
              <button type="button" className="btn-primary" disabled={busy} onClick={() => void pickNative()}>
                {busy ? t.bjtBooks.importing(progress ?? 0) : t.bjtBooks.pick}
              </button>
            ) : (
              <label className={`btn-primary inline-block cursor-pointer ${busy ? 'pointer-events-none opacity-60' : ''}`}>
                {busy ? t.bjtBooks.importing(progress ?? 0) : t.bjtBooks.pick}
                <input
                  type="file"
                  accept=".zip,application/zip"
                  className="sr-only"
                  data-testid="book-file"
                  disabled={busy}
                  onChange={(e) => {
                    void onFile(e.target.files?.[0]);
                    e.target.value = '';
                  }}
                />
              </label>
            )}
            {recent.length > 0 && (
              <div className="space-y-1 pt-2" data-testid="book-recent">
                <h3 className="text-sm font-black">{t.bjtBooks.recentTitle}</h3>
                <p className="text-xs text-muted">{t.bjtBooks.recentHelp}</p>
                <ul className="space-y-1">
                  {recent.map((f) => {
                    const inApp = !!books?.some((b) => b.id === f.bookId);
                    return (
                      <li key={f.uri} className="flex items-stretch gap-1">
                        <button
                          type="button"
                          disabled={busy}
                          aria-label={inApp ? t.bjtBooks.openBook(f.title) : t.bjtBooks.reopen(f.title)}
                          className="min-w-0 flex-1 rounded-xl bg-surface px-3 py-2 text-left ring-1 ring-sakura/40 hover:bg-sakura/30 disabled:opacity-60"
                          onClick={() => (inApp ? setTab(f.bookId) : void load(() => readFile(f.uri), f))}
                        >
                          <span className="block font-bold break-words">📖 {f.title}</span>
                          <span className="block text-xs text-muted break-all">
                            {f.name}
                            {f.size > 0 && ` · ${t.bjtBooks.size(Math.max(1, Math.round(f.size / 1048576)))}`}
                            {inApp && ` · ${t.bjtBooks.inApp}`}
                          </span>
                        </button>
                        {inApp && (
                          <button
                            type="button"
                            disabled={busy}
                            aria-label={t.bjtBooks.reimportOf(f.title)}
                            className="shrink-0 rounded-xl px-3 text-xs font-bold ring-1 ring-sakura/40 hover:bg-sakura/30 disabled:opacity-60"
                            onClick={() => void load(() => readFile(f.uri), f)}
                          >
                            {t.bjtBooks.reimport}
                          </button>
                        )}
                        <button
                          type="button"
                          disabled={busy}
                          aria-label={t.bjtBooks.forget(f.title)}
                          className="shrink-0 rounded-xl px-3 text-muted ring-1 ring-sakura/40 hover:bg-sakura/30"
                          onClick={() => {
                            forgetFile(f.uri);
                            setRecent(recentFiles());
                          }}
                        >
                          ✕
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </section>
        )}

        {books && books.length === 0 && <p className="text-center text-muted">{t.bjtBooks.empty}</p>}
        {shown && <BookCard key={shown.id} stored={shown} onRun={setRun} />}
      </div>
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
  // tests fold; the one taken last (else the first) starts open
  const lastAt = (id: string) => runs[`book:${book.id}:${id}`]?.at(-1)?.at ?? '';
  const openId = book.tests.reduce((a, x) => (lastAt(x.id) > lastAt(a.id) ? x : a), book.tests[0]!).id;
  return (
    <section id={`book-${book.id}`} className="card scroll-mt-4 space-y-3 p-4" data-testid="book-card">
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
          <details key={test.id} open={openId === test.id} className="rounded-2xl bg-cream p-3 dark:bg-bg" data-testid="book-test">
            <summary className="cursor-pointer">
              <span className="font-bold">
                {test.title} <span className="text-sm font-normal text-muted">· {t.bjtBooks.questions(test.questions.length)}</span>
              </span>
              {last && est && <span className="block text-xs text-muted">{t.bjtBooks.last(est.score, est.level, last.correct, last.total)}</span>}
              {last && test.legacy && <span className="block text-xs text-muted">{t.bjtBooks.lastLegacy(last.correct, last.total)}</span>}
            </summary>
            <div className="mt-2 space-y-2">
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
          </details>
        );
      })}
    </section>
  );
}
