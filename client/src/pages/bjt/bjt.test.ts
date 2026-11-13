import type { BjtItem, BjtSection } from '@nihongo/shared';
import { audioLines, bookRuns, bookSectionStats, clock, currentWeek, examOrder, examSeconds, pickPractice, sectionStats, toSteps, weekSet } from './bjt';
import type { PackBook } from './books/book';

function mk(id: string, section: BjtSection, nq = 1, extra: Partial<BjtItem> = {}): BjtItem {
  return {
    id,
    section,
    set: 'w01',
    questions: Array.from({ length: nq }, (_, i) => ({ id: `${id}-q${i + 1}`, prompt: 'p', choices: ['a', 'b', 'c', 'd'], answer: 0, explain: 'e' })),
    ...extra,
  };
}

it('orders items like the exam and keeps the order inside a section', () => {
  const items = [mk('r1', 'goi'), mk('l2', 'hatsugen'), mk('l1', 'bamen'), mk('r2', 'goi'), mk('m1', 'shiryo')];
  expect(examOrder(items).map((x) => x.id)).toEqual(['l1', 'l2', 'm1', 'r1', 'r2']);
});

it('turns items into one step per question and marks the first question of each item', () => {
  const steps = toSteps([mk('a', 'sogo-chokai', 2), mk('b', 'goi')]);
  expect(steps.map((s) => [s.q.id, s.first])).toEqual([
    ['a-q1', true],
    ['a-q2', false],
    ['b-q1', true],
  ]);
});

it('reads the numbered choices aloud only when they are not printed', () => {
  const script = [{ speaker: 'x', ja: '何と言いますか。', vi: 'v' }];
  expect(audioLines(mk('a', 'hatsugen', 1, { script, spokenChoices: true }))).toEqual(['何と言いますか。', '1番。a', '2番。b', '3番。c', '4番。d']);
  expect(audioLines(mk('b', 'sogo-chokai', 2, { script }))).toEqual(['何と言いますか。']);
  expect(audioLines(mk('c', 'goi'))).toEqual([]);
});

it('counts correct answers per section, in exam order, skipping absent sections', () => {
  const steps = toSteps([mk('r', 'goi'), mk('l', 'sogo-chokai', 2)]);
  expect(sectionStats(steps, { 'l-q1': true, 'l-q2': false, 'r-q1': true })).toEqual([
    { section: 'sogo-chokai', ja: '総合聴解', correct: 1, total: 2 },
    { section: 'goi', ja: '語彙・文法', correct: 1, total: 1 },
  ]);
});

it('practises unseen items first, then wrong ones, then the rest, up to the question limit', () => {
  const items = [mk('right', 'goi'), mk('wrong', 'goi'), mk('new1', 'goi'), mk('half', 'sogo-dokkai', 2), mk('new2', 'goi')];
  const answers = { 'right-q1': true, 'wrong-q1': false, 'half-q1': true };
  expect(pickPractice(items, answers, 10).map((x) => x.id)).toEqual(['new1', 'half', 'new2', 'wrong', 'right']);
  expect(pickPractice(items, answers, 3).map((x) => x.id)).toEqual(['new1', 'half']);
});

it('scales the exam time by the questions present, never below a minute', () => {
  // 語彙・文法 only, 10 of the 30 reading questions → a third of 30 minutes
  expect(examSeconds(Array.from({ length: 10 }, (_, i) => mk(`g${i}`, 'goi')))).toBe(600);
  expect(examSeconds([mk('g', 'goi')])).toBe(60);
  expect(examSeconds([])).toBe(60);
});

it('finds the plan week from the start date', () => {
  const at = (d: string) => new Date(`${d}T12:00:00`);
  expect(currentWeek(null, at('2026-11-13'))).toBeNull();
  expect(currentWeek('2026-11-13', at('2026-11-13'))).toBe(1);
  expect(currentWeek('2026-11-13', at('2026-11-19'))).toBe(1);
  expect(currentWeek('2026-11-13', at('2026-11-20'))).toBe(2);
  expect(currentWeek('2026-11-13', at('2027-06-01'))).toBe(16);
  expect(currentWeek('2026-11-13', at('2026-11-01'))).toBeNull();
});

it('formats set ids and the clock', () => {
  expect(weekSet(3)).toBe('w03');
  expect(weekSet(12)).toBe('w12');
  expect(clock(605)).toBe('10:05');
  expect(clock(-4)).toBe('0:00');
});

const BOOK: PackBook = {
  id: 'b1',
  title: 'Book one',
  pages: 3,
  audio: [],
  tests: [
    {
      id: 't1',
      title: 'Test 1',
      questions: [
        { no: 1, section: 'bamen', n: 1, page: 1, answer: 1, audio: 'a/1.mp3' },
        { no: 2, section: 'bamen', n: 2, page: 1, answer: 2, audio: 'a/1.mp3' },
        { no: 3, section: 'goi', n: 1, page: 2, answer: 3 },
      ],
    },
    { id: 't2', title: 'Test 2', questions: [{ no: 1, section: 'goi', n: 1, page: 3, answer: 4 }] },
  ],
};

it('counts book answers per section, only for questions of stored books', () => {
  const answers = {
    'book:b1:t1:1': true,
    'book:b1:t1:2': false,
    'book:b1:t1:3': false,
    'book:b1:t2:1': true,
    'book:gone:t1:1': true, // a removed book is not counted
    'g1-q1': true, // the app's own questions are not counted
  };
  const s = bookSectionStats([{ book: BOOK }], answers);
  expect(s.bamen).toEqual({ answered: 2, correct: 1 });
  expect(s.goi).toEqual({ answered: 2, correct: 1 });
  expect(s.hatsugen).toEqual({ answered: 0, correct: 0 });
  expect(bookSectionStats([{ book: { id: 'x' } }], answers).goi).toEqual({ answered: 0, correct: 0 }); // malformed index
});

it('lists the latest timed run of each book test, newest first, with titles', () => {
  const run = (at: string, correct: number) => ({ at, correct, total: 4, seconds: 60 });
  const runs = {
    'book:b1:t1': [run('2026-11-01T00:00:00Z', 1), run('2026-11-10T00:00:00Z', 3)],
    'book:b1:t2': [run('2026-11-12T00:00:00Z', 2)],
    'book:gone:t1': [run('2026-11-13T00:00:00Z', 4)],
    mock1: [run('2026-11-13T00:00:00Z', 4)],
  };
  expect(bookRuns([{ book: BOOK }], runs)).toEqual([
    { key: 'book:b1:t2', book: 'Book one', test: 'Test 2', last: run('2026-11-12T00:00:00Z', 2) },
    { key: 'book:b1:t1', book: 'Book one', test: 'Test 1', last: run('2026-11-10T00:00:00Z', 3) },
  ]);
  expect(bookRuns([], runs)).toEqual([]);
});
