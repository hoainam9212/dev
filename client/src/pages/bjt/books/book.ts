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
  /** Part of `page` that holds only this question [x0, y0, x1, y1], when the page holds several. */
  crop?: [number, number, number, number];
  /** Section name as printed in the book (old format), shown instead of the section's Japanese name. */
  label?: string;
  /** A question printed over several pages, in reading order; `page` is then the last one. */
  pages?: number[];
  /** One extra page shown above `page` (same idea as `pages`, written by some packs). */
  textPage?: number;
}

export interface PackExtra {
  title: string;
  audio: string;
}

export interface PackTest {
  id: string;
  title: string;
  answerPages?: [number, number];
  scriptPages?: [number, number];
  /** Official total minutes of this test; overrides the minutes of today's parts. */
  minutes?: number;
  /** Old-format test (100 questions, 120 minutes): no estimate on today's J1 scale. */
  legacy?: boolean;
  /** Instruction and example recordings of the book, outside the timed run. */
  extras?: PackExtra[];
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
            (bjtPartOf(q.section) === 'dokkai' || typeof q.audio === 'string') &&
            (q.pages === undefined || (Array.isArray(q.pages) && q.pages.length > 0 && q.pages.every(Number.isInteger))) &&
            (q.textPage === undefined || Number.isInteger(q.textPage)),
        ) &&
        (t.extras === undefined || (Array.isArray(t.extras) && t.extras.every((x) => typeof x?.audio === 'string'))),
    );
  if (!ok) throw new Error('bad-book');
  return b;
}

export const pagePath = (n: number) => `pages/p${String(n).padStart(4, '0')}.jpg`;

/** Pages a question is printed on, in reading order. */
export const pagesOf = (q: PackQuestion): number[] => (q.pages?.length ? q.pages : q.textPage ? [q.textPage, q.page] : [q.page]);

/** Every page and recording the tests point at, sorted, once each. */
export function filesNeeded(b: PackBook): string[] {
  const set = new Set<string>();
  for (const t of b.tests) {
    for (const q of t.questions) {
      for (const p of pagesOf(q)) set.add(pagePath(p));
      if (q.explainPage) set.add(pagePath(q.explainPage));
      if (q.audio) set.add(q.audio);
    }
    for (const x of t.extras ?? []) set.add(x.audio);
  }
  return [...set].sort();
}

/** Name of a question's section: the label printed in the book, else the section's Japanese name. */
export const sectionName = (q: PackQuestion): string => q.label ?? BJT_SECTIONS.find((x) => x.id === q.section)!.ja;

export interface QuestionGroup {
  key: string;
  name: string;
  /** Question numbers of the group, in test order. */
  nos: number[];
}

/**
 * Sections of a test as the learner sees them: by printed label when the test has labels (an old section can map
 * onto two of today's ids), else by section id in the order of the real exam.
 */
export function groupsOf(t: PackTest): QuestionGroup[] {
  if (t.questions.some((q) => q.label)) {
    const out = new Map<string, QuestionGroup>();
    for (const q of t.questions) {
      const name = sectionName(q);
      const g = out.get(name) ?? out.set(name, { key: name, name, nos: [] }).get(name)!;
      g.nos.push(q.no);
    }
    return [...out.values()];
  }
  return sectionsOf(t).map((s) => ({
    key: s,
    name: BJT_SECTIONS.find((x) => x.id === s)!.ja,
    nos: t.questions.filter((q) => q.section === s).map((q) => q.no),
  }));
}

/** Key under which a book answer is kept in the BJT store, apart from the app's own question ids. */
export const answerKey = (bookId: string, testId: string, no: number) => `book:${bookId}:${testId}:${no}`;

/** Questions of `test` whose latest saved answer is wrong (never-answered ones are not counted). */
export const wrongNos = (bookId: string, test: PackTest, answers: Record<string, boolean>): number[] =>
  test.questions.filter((q) => answers[answerKey(bookId, test.id, q.no)] === false).map((q) => q.no);

/** Questions marked as the ones that sort J1 from J1+. */
export const j1plusNos = (test: PackTest): number[] => test.questions.filter((q) => q.j1plus).map((q) => q.no);

/** Sections present in the test, in the order of the real exam. */
export const sectionsOf = (t: PackTest): BjtSection[] =>
  [...new Set(t.questions.map((q) => q.section))].sort((a, b) => ORDER.get(a)! - ORDER.get(b)!);

/** The test's own official minutes, else those of each part it contains (a full test: 45 + 30 + 30). */
export function bookExamSeconds(t: PackTest): number {
  if (typeof t.minutes === 'number' && t.minutes > 0) return t.minutes * 60;
  const parts = new Set(t.questions.map((q) => bjtPartOf(q.section)));
  return BJT_PARTS.filter((p) => parts.has(p.id)).reduce((s, p) => s + p.minutes * 60, 0);
}

export interface TestScore {
  correct: number;
  total: number;
  estimate: { score: number; level: string };
  /** Per group of groupsOf(): `ja` is the printed label when the test has labels. */
  bySection: { section: string; ja: string; correct: number; total: number }[];
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
    bySection: groupsOf(t).map((g) => {
      const mine = t.questions.filter((q) => g.nos.includes(q.no));
      return { section: g.key, ja: g.name, correct: mine.filter(right).length, total: mine.length };
    }),
    wrong: t.questions.filter((q) => !right(q)),
  };
}
