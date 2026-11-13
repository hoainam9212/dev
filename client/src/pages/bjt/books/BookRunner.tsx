import { useEffect, useMemo, useRef, useState } from 'react';
import { BJT_SECTIONS, bjtPartOf, type BjtSection } from '@nihongo/shared';
import { Mascot } from '../../../components/Mascot';
import { useProgress } from '../../../store/progress';
import { useBjt } from '../../../store/bjt';
import { useT } from '../../../i18n';
import { clock } from '../bjt';
import { answerKey, bookExamSeconds, cropStyle, pagePath, scoreTest, type PackBook, type PackQuestion, type PackTest } from './book';
import { useBookFile } from './useBookFile';

const XP_PER_CORRECT = 2;
const ja = (s: BjtSection) => BJT_SECTIONS.find((x) => x.id === s)!.ja;

interface Props {
  book: PackBook;
  test: PackTest;
  /** Timed: recordings play once, no explanation until the end, no going back. */
  exam?: boolean;
  /** Practice only these sections (practice mode). */
  sections?: BjtSection[];
  /** Practice only these question numbers (redo wrong answers, J1+ only). */
  only?: number[];
  onExit: () => void;
}

const CHOICE: Record<string, string> = {
  idle: 'bg-surface ring-2 ring-sakura/50 hover:bg-sakura/30',
  chosen: 'bg-sky-200 text-sky-950 ring-2 ring-sky-400',
  correct: 'bg-emerald-200 text-emerald-900 ring-2 ring-emerald-400',
  wrong: 'bg-rose/30 text-text ring-2 ring-rose',
};

/** Runs one test of an imported book: page image, the book's own recording, answer 1–4. */
export function BookRunner({ book, test, exam = false, sections, only, onExit }: Props) {
  const t = useT();
  const questions = useMemo(
    () =>
      test.questions.filter((q) => (!sections?.length || sections.includes(q.section)) && (!only || only.includes(q.no))),
    [test, sections, only],
  );
  const run: PackTest = useMemo(() => ({ ...test, questions }), [test, questions]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);
  const [left, setLeft] = useState(() => bookExamSeconds(run));
  const startedAt = useRef(Date.now());
  const record = useBjt((s) => s.record);
  const saveRun = useBjt((s) => s.saveRun);
  const addXp = useProgress((s) => s.addXp);
  const q = questions[i];

  const finish = () => {
    if (exam) {
      const results = Object.fromEntries(questions.map((x) => [answerKey(book.id, test.id, x.no), picked[x.no] === x.answer]));
      const correct = Object.values(results).filter(Boolean).length;
      record(results);
      if (correct) addXp(correct * XP_PER_CORRECT);
      saveRun(`book:${book.id}:${test.id}`, {
        at: new Date().toISOString(),
        correct,
        total: questions.length,
        seconds: Math.round((Date.now() - startedAt.current) / 1000),
      });
    }
    setFinished(true);
  };

  useEffect(() => {
    if (!exam || finished) return;
    const id = setInterval(() => setLeft((l) => l - 1), 1000);
    return () => clearInterval(id);
  }, [exam, finished]);
  useEffect(() => {
    if (exam && !finished && left <= 0) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left]);

  if (finished || !q) return <BookResult book={book} test={run} picked={picked} exam={exam} onExit={onExit} />;

  const mine = picked[q.no];
  const revealed = !exam && mine !== undefined;
  const last = i === questions.length - 1;
  const pick = (c: number) => {
    if (revealed) return;
    setPicked((p) => ({ ...p, [q.no]: c }));
    if (!exam) {
      const ok = c === q.answer;
      record({ [answerKey(book.id, test.id, q.no)]: ok });
      if (ok) addXp(XP_PER_CORRECT);
    }
  };
  const state = (c: number) => {
    if (!revealed) return mine === c ? 'chosen' : 'idle';
    if (c === q.answer) return 'correct';
    return c === mine ? 'wrong' : 'idle';
  };

  return (
    <div className="space-y-3" data-testid="book-runner">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button type="button" className="btn-soft text-sm" onClick={onExit}>
          {t.bjtBooks.quit}
        </button>
        <p className="text-sm font-bold text-muted">
          {t.bjtBooks.questionOf(i + 1, questions.length)}
          {exam && (
            <span className={`ml-3 tabular-nums ${left <= 60 ? 'text-rose' : ''}`} data-testid="book-clock">
              ⏱ {clock(left)}
            </span>
          )}
        </p>
      </div>
      <p className="text-sm font-bold text-rose">
        {t.bjtBooks.sectionNo(ja(q.section), q.n)} <span className="font-normal text-muted">· {test.title}</span>
      </p>

      {q.audio && <Recording key={q.no} bookId={book.id} path={q.audio} exam={exam} />}

      <PageImage book={book} page={q.page} box={q.crop} />

      <div>
        <p className="mb-1 text-xs font-bold text-muted">{t.bjtBooks.pickAnswer(q.n)}</p>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((c) => (
            <button
              key={c}
              type="button"
              data-state={state(c)}
              aria-pressed={mine === c}
              disabled={revealed}
              onClick={() => pick(c)}
              className={`rounded-2xl py-3 text-center text-xl font-black transition active:scale-[0.98] disabled:cursor-default ${CHOICE[state(c)]}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {revealed && <Explanation book={book} q={q} mine={mine} />}

      <div className="flex justify-end">
        <button type="button" className="btn-primary" onClick={() => (last ? finish() : setI(i + 1))}>
          {last ? t.bjtBooks.finish : t.bjtBooks.next}
        </button>
      </div>
    </div>
  );
}

/** The book's recording. Practice: player with controls. Exam: plays once by itself, no controls. */
function Recording({ bookId, path, exam }: { bookId: string; path: string; exam: boolean }) {
  const t = useT();
  const url = useBookFile(bookId, path);
  const audio = useRef<HTMLAudioElement>(null);
  const [status, setStatus] = useState<'idle' | 'playing' | 'played'>('idle');

  const play = () => {
    const a = audio.current;
    if (!a) return;
    a.currentTime = 0;
    void a.play().then(
      () => setStatus('playing'),
      () => setStatus('idle'), // autoplay refused: the button stays
    );
  };
  useEffect(() => {
    if (exam && url) play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exam, url]);

  if (!exam) {
    return <audio ref={audio} src={url} controls preload="auto" className="w-full" data-testid="book-audio" />;
  }
  return (
    <div className="flex items-center gap-2">
      <audio ref={audio} src={url} preload="auto" onEnded={() => setStatus('played')} data-testid="book-audio" />
      <button type="button" className="btn-sky" disabled={!url || status !== 'idle'} onClick={play}>
        {status === 'playing' ? t.bjtBooks.playing : status === 'played' ? t.bjtBooks.played : t.bjtBooks.play}
      </button>
    </div>
  );
}

/** A page image without its white margins, full width; zoom doubles it inside a scrolling frame. */
export function PageImage({ book, page, box }: { book: PackBook; page: number; box?: [number, number, number, number] }) {
  const t = useT();
  const url = useBookFile(book.id, pagePath(page));
  const [zoom, setZoom] = useState(false);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const crop = size ? cropStyle(box ?? book.boxes?.[page], size.w, size.h) : null;
  return (
    <div className="space-y-1">
      <div className={`overflow-auto rounded-2xl bg-white ring-1 ring-sakura/40 ${zoom ? 'max-h-[70vh]' : ''}`}>
        {url ? (
          <div style={zoom ? { width: '200%' } : undefined}>
            <div style={crop?.frame}>
              <img
                src={url}
                alt={`p.${page}`}
                className={crop ? '' : 'w-full'}
                style={crop?.img}
                onLoad={(e) => setSize({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })}
                data-testid="book-page"
              />
            </div>
          </div>
        ) : (
          <p className="p-6 text-center text-sm text-muted">{t.bjtBooks.loading}</p>
        )}
      </div>
      <div className="flex justify-end">
        <button type="button" className="btn-soft text-xs" onClick={() => setZoom((z) => !z)}>
          {zoom ? t.bjtBooks.zoomOut : t.bjtBooks.zoomIn}
        </button>
      </div>
    </div>
  );
}

function Explanation({ book, q, mine }: { book: PackBook; q: PackQuestion; mine: number | undefined }) {
  const t = useT();
  const [bookPage, setBookPage] = useState(false);
  return (
    <div className="space-y-3 rounded-2xl bg-cream p-4 dark:bg-bg" data-testid="book-feedback">
      {mine !== undefined && (
        <p className={`font-black ${mine === q.answer ? 'text-emerald-500' : 'text-rose'}`}>{mine === q.answer ? t.bjtBooks.correct : t.bjtBooks.wrong(q.answer)}</p>
      )}
      {(q.level || q.j1plus) && (
        <p className="text-xs font-bold text-muted">
          {q.level ? t.bjtBooks.level[q.level] : ''}
          {q.j1plus && <span className="ml-2 text-rose">{t.bjtBooks.j1plus}</span>}
        </p>
      )}
      {q.explain && (
        <div>
          <p className="text-xs font-bold text-muted">{t.bjtBooks.explain}</p>
          <p className="leading-relaxed">{q.explain}</p>
        </div>
      )}
      {!!q.keys?.length && (
        <div>
          <p className="text-xs font-bold text-muted">{t.bjtBooks.keys}</p>
          <ul className="mt-1 space-y-1 text-sm">
            {q.keys.map((k) => (
              <li key={k.ja}>
                <span className="font-bold">{k.ja}</span>
                <span className="mx-1 text-muted">（{k.reading}）</span>
                {k.vi}
              </li>
            ))}
          </ul>
        </div>
      )}
      {q.explainPage && (
        <div className="space-y-2">
          <button type="button" className="btn-soft text-sm" onClick={() => setBookPage((v) => !v)}>
            {bookPage ? t.bjtBooks.hideBookExplain : t.bjtBooks.bookExplain(q.explainPage)}
          </button>
          {bookPage && <PageImage book={book} page={q.explainPage} />}
        </div>
      )}
    </div>
  );
}

function BookResult({ book, test, picked, exam, onExit }: { book: PackBook; test: PackTest; picked: Record<number, number>; exam: boolean; onExit: () => void }) {
  const t = useT();
  const r = scoreTest(test, picked);
  const [open, setOpen] = useState<number | null>(null);
  const full = new Set(test.questions.map((q) => bjtPartOf(q.section))).size === 3;
  return (
    <div className="space-y-4" data-testid="book-result">
      <div className="flex flex-col items-center gap-2 py-2">
        <Mascot mood={r.correct / Math.max(1, r.total) >= 0.7 ? 'happy' : 'neutral'} size={110} />
        <p className="text-sm font-bold text-muted">
          {t.bjtBooks.result} · {test.title}
        </p>
        <p className="text-2xl font-black text-rose">{t.bjtBooks.score(r.correct, r.total)}</p>
        {exam && full && (
          <>
            <p className="font-bold">{t.bjtBooks.estimate(r.estimate.score, r.estimate.level)}</p>
            <p className="text-center text-xs text-muted">{t.bjtBooks.estimateNote}</p>
          </>
        )}
      </div>

      <div>
        <p className="mb-1 text-sm font-bold text-muted">{t.bjtBooks.bySection}</p>
        <ul className="space-y-1">
          {r.bySection.map((s) => (
            <li key={s.section} className="flex items-center gap-2 text-sm">
              <span className="w-24 shrink-0 font-bold">{s.ja}</span>
              <span className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-sakura/30">
                <span className="block h-full bg-emerald-400" style={{ width: `${(s.correct / s.total) * 100}%` }} />
              </span>
              <span className="w-10 text-right tabular-nums">
                {s.correct}/{s.total}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-1 text-sm font-bold text-muted">{t.bjtBooks.wrongList}</p>
        {r.wrong.length === 0 && <p className="font-bold text-emerald-500">{t.bjtBooks.allRight}</p>}
        <ul className="space-y-3">
          {r.wrong.map((q) => (
            <li key={q.no} className="space-y-2 rounded-2xl bg-cream p-3 dark:bg-bg">
              <p className="text-xs font-bold text-rose">{t.bjtBooks.sectionNo(ja(q.section), q.n)}</p>
              <p className="text-sm text-muted">
                {t.bjtBooks.yourAnswer(picked[q.no])} · <span className="font-bold text-emerald-600">✓ {q.answer}</span>
              </p>
              {q.explain && <p className="text-sm leading-relaxed">{q.explain}</p>}
              <button type="button" className="btn-soft text-xs" onClick={() => setOpen(open === q.no ? null : q.no)}>
                {t.bjtBooks.showPage}
              </button>
              {open === q.no && <PageImage book={book} page={q.page} box={q.crop} />}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center">
        <button type="button" className="btn-primary" onClick={onExit}>
          {t.bjtBooks.done}
        </button>
      </div>
    </div>
  );
}
