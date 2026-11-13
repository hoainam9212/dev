// A prep book the learner imported: page images + original recordings + the index written by
// tools/book-import (book.json). Nothing here is bundled with the app; it lives in IndexedDB.
import { BJT_PARTS, BJT_SECTIONS, bjtEstimate, bjtPartOf, type BjtSection } from '@nihongo/shared';

export interface PackKey {
  ja: string;
  reading: string;
  vi: string;
}

export interface PackQuestion {
  /** Number in the whole test, 1…80. */
  no: number;
  section: BjtSection;
  /** Number inside its section, as printed (1番, 2番…). */
  n: number;
  /** Page image the question is printed on. */
  page: number;
  answer: number;
  /** Recording of a listening question. */
  audio?: string;
  explain?: string;
  keys?: PackKey[];
  /** 1 easy · 2 J1 · 3 sorts J1 from J1+. */
  level?: 1 | 2 | 3;
  j1plus?: boolean;
  /** Page of the book's own explanation. */
  explainPage?: number;
}

export interface PackTest {
  id: string;
  title: string;
  answerPages?: [number, number];
  scriptPages?: [number, number];
  questions: PackQuestion[];
}

export interface PackBook {
  id: string;
  title: string;
  pages: number;
  audio: { file: string; seconds?: number; title?: string }[];
  tests: PackTest[];
  notes?: string;
  /** Printed area of each page as fractions [x0, y0, x1, y1], so the white margins can be left out. */
  boxes?: Record<string, [number, number, number, number]>;
}

/** CSS that shows only `box` of an image of `w`×`h` pixels inside a full-width frame. */
export function cropStyle(box: [number, number, number, number] | undefined, w: number, h: number) {
  const [x0, y0, x1, y1] = box && box[2] > box[0] && box[3] > box[1] ? box : [0, 0, 1, 1];
  const bw = x1 - x0;
  const bh = y1 - y0;
  return {
    frame: { position: 'relative' as const, overflow: 'hidden' as const, width: '100%', aspectRatio: `${Math.round(bw * w)} / ${Math.round(bh * h)}` },
    img: { position: 'absolute' as const, maxWidth: 'none', width: `${(100 / bw).toFixed(3)}%`, left: `${((-x0 / bw) * 100).toFixed(3)}%`, top: `${((-y0 / bh) * 100).toFixed(3)}%` },
  };
}

const SECTION_IDS = new Set<string>(BJT_SECTIONS.map((s) => s.id));
const ORDER = new Map<string, number>(BJT_SECTIONS.map((s, i) => [s.id, i]));

/** book.json → PackBook; throws `bad-book` when it is not an index the app can run. */
export function parseBook(text: string): PackBook {
  let b: PackBook;
  try {
    b = JSON.parse(text) as PackBook;
  } catch {
    throw new Error('bad-book');
  }
  const ok =
    typeof b?.id === 'string' &&
    typeof b.title === 'string' &&
    Array.isArray(b.tests) &&
    b.tests.length > 0 &&
    b.tests.every(
      (t) =>
        typeof t.id === 'string' &&
        Array.isArray(t.questions) &&
        t.questions.length > 0 &&
        t.questions.every(
          (q) =>
            SECTION_IDS.has(q.section) &&
            Number.isInteger(q.page) &&
            [1, 2, 3, 4].includes(q.answer) &&
            (bjtPartOf(q.section) === 'dokkai' || typeof q.audio === 'string'),
        ),
    );
  if (!ok) throw new Error('bad-book');
  return b;
}

export const pagePath = (n: number) => `pages/p${String(n).padStart(4, '0')}.jpg`;

/** Every page and recording the tests point at, sorted, once each. */
export function filesNeeded(b: PackBook): string[] {
  const set = new Set<string>();
  for (const t of b.tests)
    for (const q of t.questions) {
      set.add(pagePath(q.page));
      if (q.explainPage) set.add(pagePath(q.explainPage));
      if (q.audio) set.add(q.audio);
    }
  return [...set].sort();
}

/** Key under which a book answer is kept in the BJT store, apart from the app's own question ids. */
export const answerKey = (bookId: string, testId: string, no: number) => `book:${bookId}:${testId}:${no}`;

/** Sections present in the test, in the order of the real exam. */
export const sectionsOf = (t: PackTest): BjtSection[] =>
  [...new Set(t.questions.map((q) => q.section))].sort((a, b) => ORDER.get(a)! - ORDER.get(b)!);

/** Official minutes of each part the test contains (a full test: 45 + 30 + 30). */
export function bookExamSeconds(t: PackTest): number {
  const parts = new Set(t.questions.map((q) => bjtPartOf(q.section)));
  return BJT_PARTS.filter((p) => parts.has(p.id)).reduce((s, p) => s + p.minutes * 60, 0);
}

export interface TestScore {
  correct: number;
  total: number;
  estimate: { score: number; level: string };
  bySection: { section: BjtSection; ja: string; correct: number; total: number }[];
  wrong: PackQuestion[];
}

/** `picked` maps question number → chosen option (1–4); an unanswered question counts as wrong. */
export function scoreTest(t: PackTest, picked: Record<number, number>): TestScore {
  const right = (q: PackQuestion) => picked[q.no] === q.answer;
  const correct = t.questions.filter(right).length;
  return {
    correct,
    total: t.questions.length,
    estimate: bjtEstimate(correct, t.questions.length),
    bySection: sectionsOf(t).map((s) => {
      const mine = t.questions.filter((q) => q.section === s);
      return { section: s, ja: BJT_SECTIONS.find((x) => x.id === s)!.ja, correct: mine.filter(right).length, total: mine.length };
    }),
    wrong: t.questions.filter((q) => !right(q)),
  };
}
