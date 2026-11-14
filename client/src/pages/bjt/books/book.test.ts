import { describe, expect, it } from 'vitest';
import { answerKey, bookExamSeconds, cropStyle, filesNeeded, groupsOf, j1plusNos, pagePath, pagesOf, parseBook, scoreTest, sectionName, sectionsOf, wrongNos } from './book';
import type { PackTest } from './book';

const q = (no: number, section: string, answer: number, extra: object = {}) => ({ no, section, n: no, page: 9, answer, ...extra });
const raw = (questions: object[]) => ({
  id: 'q4',
  title: 'Quyển 4',
  pages: 20,
  audio: [{ file: 'audio/a003.mp3', seconds: 30 }],
  tests: [{ id: 'mogi', title: '模擬テスト', questions }],
});

describe('parseBook', () => {
  it('accepts the index the tool writes', () => {
    const b = parseBook(JSON.stringify(raw([q(1, 'bamen', 1, { audio: 'audio/a003.mp3' }), q(2, 'goi', 4)])));
    expect(b.tests[0]!.questions).toHaveLength(2);
  });

  it.each([
    ['not json', '{'],
    ['no tests', JSON.stringify({ ...raw([]), tests: [] })],
    ['unknown section', JSON.stringify(raw([q(1, 'nope', 1)]))],
    ['answer out of range', JSON.stringify(raw([q(1, 'goi', 5)]))],
    ['listening without audio', JSON.stringify(raw([q(1, 'bamen', 1)]))],
  ])('refuses %s', (_, text) => {
    expect(() => parseBook(text)).toThrow('bad-book');
  });
});

describe('files of a book', () => {
  it('pagePath pads like the tool', () => {
    expect(pagePath(9)).toBe('pages/p0009.jpg');
    expect(pagePath(123)).toBe('pages/p0123.jpg');
  });

  it('filesNeeded lists every page and recording the tests use, once', () => {
    const b = parseBook(JSON.stringify(raw([q(1, 'bamen', 1, { audio: 'audio/a003.mp3', explainPage: 12 }), q(2, 'goi', 4)])));
    expect(filesNeeded(b)).toEqual(['audio/a003.mp3', 'pages/p0009.jpg', 'pages/p0012.jpg']);
  });
});

describe('cropStyle', () => {
  it('scales and shifts the image so only the printed area shows', () => {
    const s = cropStyle([0.2, 0.25, 0.7, 0.75], 1400, 2000);
    expect(s.frame.aspectRatio).toBe('700 / 1000');
    expect(s.img).toMatchObject({ width: '200.000%', left: '-40.000%', top: '-50.000%' });
  });

  it('shows the whole page without a box, or with a broken one', () => {
    for (const box of [undefined, [0.5, 0.5, 0.4, 0.9] as [number, number, number, number]]) {
      const s = cropStyle(box, 1400, 2000);
      expect(s.frame.aspectRatio).toBe('1400 / 2000');
      expect(s.img).toMatchObject({ width: '100.000%', left: '0.000%', top: '0.000%' });
    }
  });
});

describe('scoring', () => {
  const test = parseBook(
    JSON.stringify(raw([q(1, 'bamen', 1, { audio: 'audio/a003.mp3' }), q(2, 'bamen', 2, { audio: 'audio/a003.mp3' }), q(3, 'goi', 3), q(4, 'hyogen', 4)])),
  ).tests[0] as PackTest;

  it('counts per section in exam order and estimates the score', () => {
    const r = scoreTest(test, { 1: 1, 2: 3, 3: 3 });
    expect(r.correct).toBe(2);
    expect(r.total).toBe(4);
    expect(r.estimate).toEqual({ score: 400, level: 'J3' });
    expect(r.bySection).toEqual([
      { section: 'bamen', ja: '場面把握', correct: 1, total: 2 },
      { section: 'goi', ja: '語彙・文法', correct: 1, total: 1 },
      { section: 'hyogen', ja: '表現読解', correct: 0, total: 1 },
    ]);
    expect(r.wrong.map((x) => x.no)).toEqual([2, 4]);
  });

  it('sectionsOf follows the order of the real test', () => {
    expect(sectionsOf(test)).toEqual(['bamen', 'goi', 'hyogen']);
  });

  it('exam time is the official minutes of the parts the test holds', () => {
    expect(bookExamSeconds(test)).toBe((45 + 30) * 60);
  });

  it('answerKey is stable and separate from the app’s own questions', () => {
    expect(answerKey('q4', 'mogi', 7)).toBe('book:q4:mogi:7');
  });
});

describe('picking questions to redo', () => {
  const test = parseBook(
    JSON.stringify(raw([q(1, 'goi', 1), q(2, 'goi', 2, { j1plus: true }), q(3, 'goi', 3), q(4, 'hyogen', 4, { j1plus: true })])),
  ).tests[0] as PackTest;

  it('wrongNos: questions whose latest answer was wrong, unanswered ones left out', () => {
    const answers = { 'book:q4:mogi:1': false, 'book:q4:mogi:2': true, 'book:q4:mogi:4': false, 'book:other:mogi:3': false };
    expect(wrongNos('q4', test, answers)).toEqual([1, 4]);
  });

  it('j1plusNos: the questions that sort J1 from J1+', () => {
    expect(j1plusNos(test)).toEqual([2, 4]);
  });
});

describe('old-format tests (100 questions, 120 minutes)', () => {
  const L1 = '第1部 セクション1 描写問題';
  const L2 = '第2部 セクション1 状況把握';
  const questions = [
    q(1, 'bamen', 1, { audio: 'audio/a004.mp3', label: L1 }),
    q(2, 'jokyo', 2, { audio: 'audio/a005.mp3', label: L2 }),
    q(3, 'shiryo', 3, { audio: 'audio/a005.mp3', label: L2, pages: [7, 8], page: 8 }),
    q(4, 'goi', 4, { label: '第3部 セクション1 語彙・文法', textPage: 5, page: 6 }),
  ];
  const extras = [{ title: '第1部 · 練習', audio: 'audio/a003.mp3' }];
  const old = parseBook(
    JSON.stringify({ ...raw([]), tests: [{ id: 't', title: '体験テスト', minutes: 120, legacy: true, extras, questions }] }),
  );
  const t = old.tests[0]!;

  it('keeps the optional fields and uses the official minutes', () => {
    expect(t.legacy).toBe(true);
    expect(t.extras).toEqual([{ title: '第1部 · 練習', audio: 'audio/a003.mp3' }]);
    expect(bookExamSeconds(t)).toBe(120 * 60);
  });

  it('pagesOf: pages in order, textPage above page, else the single page', () => {
    expect(t.questions.map(pagesOf)).toEqual([[9], [9], [7, 8], [5, 6]]);
  });

  it('filesNeeded includes every page of a question and the extra recordings', () => {
    expect(filesNeeded(old)).toEqual(['audio/a003.mp3', 'audio/a004.mp3', 'audio/a005.mp3', 'pages/p0005.jpg', 'pages/p0006.jpg', 'pages/p0007.jpg', 'pages/p0008.jpg', 'pages/p0009.jpg']);
  });

  it('sectionName: the printed label first, else the Japanese section name', () => {
    expect(sectionName(t.questions[0]!)).toBe(L1);
    expect(sectionName({ ...t.questions[0]!, label: undefined })).toBe('場面把握');
  });

  it('groupsOf: by label when the test has labels, so one old section spans two ids', () => {
    expect(groupsOf(t).map((g) => [g.name, g.nos])).toEqual([
      [L1, [1]],
      [L2, [2, 3]],
      ['第3部 セクション1 語彙・文法', [4]],
    ]);
    expect(scoreTest(t, { 2: 2 }).bySection.map((s) => [s.ja, s.correct, s.total])).toEqual([
      [L1, 0, 1],
      [L2, 1, 2],
      ['第3部 セクション1 語彙・文法', 0, 1],
    ]);
  });

  it('groupsOf: by section in exam order without labels', () => {
    const plain = parseBook(JSON.stringify(raw([q(1, 'goi', 1), q(2, 'bamen', 2, { audio: 'a.mp3' }), q(3, 'goi', 3)]))).tests[0]!;
    expect(groupsOf(plain).map((g) => [g.name, g.nos])).toEqual([
      ['場面把握', [2]],
      ['語彙・文法', [1, 3]],
    ]);
  });

  it('refuses broken optional fields', () => {
    expect(() => parseBook(JSON.stringify(raw([q(1, 'goi', 1, { pages: ['x'] })])))).toThrow('bad-book');
    expect(() => parseBook(JSON.stringify(raw([q(1, 'goi', 1, { pages: [] })])))).toThrow('bad-book');
  });
});
