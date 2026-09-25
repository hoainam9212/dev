import type { Grammar, Kanji, Sentence, Vocab } from '@nihongo/shared';
import { checkTranslations, looksVietnamese } from './translate-check';
import type { LoadedFile, Sources, TrFile } from './translate';

const src: Sources = {
  vocab: [{ id: 'v1', level: 'N5', word: '食べる', reading: 'たべる', meanings: ['to eat'], tags: [], kanji: [], sentenceIds: [] } as Vocab],
  kanji: [{ id: 'k-一', char: '一', level: 'N5', strokes: 1, meanings: ['one'], on: [], kun: [], strokePaths: [], vocabIds: [] } as Kanji],
  grammar: [{ id: 'g1', level: 'N5', title: '〜たい', meaning: 'want to', formation: '', examples: [{ ja: '行きたい。', romaji: '', en: 'I want to go.' }] } as Grammar],
  sentences: [
    { id: 's-5', level: 'N5', ja: '猫だ。', en: 'A cat.' } as Sentence,
    { id: 's-5', level: 'N4', ja: '猫だ。', en: 'A cat.' } as Sentence,
  ],
};
const f = (path: string, file: TrFile): LoadedFile => ({ path, file });
const ok = [
  f('vi/n5/vocab-001.json', { type: 'vocab', level: 'N5', entries: { '食べる|たべる': { vi: ['ăn'], en: ['to eat'] } } }),
  f('vi/n5/kanji-001.json', { type: 'kanji', level: 'N5', entries: { 一: { vi: ['một'], hanViet: 'NHẤT', en: ['one'] } } }),
  f('vi/n5/grammar-001.json', { type: 'grammar', level: 'N5', entries: { 'N5|〜たい': { vi: 'muốn', examples: [{ ja: '行きたい。', vi: 'Tôi muốn đi.' }], en: 'want to' } } }),
  f('vi/n5/sentences-001.json', { type: 'sentences', level: 'N5', entries: { '5': { vi: 'Một con mèo.', en: 'A cat.' } } }),
];
const msgs = (issues: { msg: string }[]) => issues.map((i) => i.msg);

it('accepts valid files of every type', () => {
  expect(checkTranslations(ok, src)).toEqual({ errors: [], warnings: [] });
});

it('reports unknown keys, a wrong level folder and a wrong file prefix', () => {
  const { errors } = checkTranslations(
    [
      f('vi/n5/vocab-002.json', { type: 'vocab', level: 'N5', entries: { '飲む|のむ': { vi: ['uống'], en: ['to drink'] } } }),
      f('vi/n5/kanji-002.json', { type: 'kanji', level: 'N4', entries: {} }),
      f('vi/n5/words-001.json', { type: 'vocab', level: 'N5', entries: {} }),
    ],
    src,
  );
  expect(msgs(errors)).toEqual([
    'not a N5 vocab key',
    'file level N4 does not match folder n5',
    'file name must start with "vocab-"',
  ]);
});

it('reports empty text, text identical to the English and a missing snapshot', () => {
  const { errors } = checkTranslations(
    [f('vi/n5/vocab-001.json', { type: 'vocab', level: 'N5', entries: { '食べる|たべる': { vi: ['To eat'], en: undefined as never } } }),
     f('vi/n5/sentences-001.json', { type: 'sentences', level: 'N5', entries: { '5': { vi: ' ', en: 'A cat.' } } })],
    src,
  );
  expect(msgs(errors)).toEqual(['identical to the English', 'missing en snapshot', 'empty translation']);
});

it('reports grammar examples that no longer match and lowercase Hán Việt', () => {
  const { errors } = checkTranslations(
    [f('vi/n5/grammar-001.json', { type: 'grammar', level: 'N5', entries: { 'N5|〜たい': { vi: 'muốn', examples: [{ ja: '古い。', vi: 'Cũ.' }], en: 'want to' } } }),
     f('vi/n5/kanji-001.json', { type: 'kanji', level: 'N5', entries: { 一: { vi: ['một'], hanViet: 'Nhất', en: ['one'] } } })],
    src,
  );
  expect(msgs(errors)).toEqual(["examples don't match the source", 'Hán Việt must be uppercase']);
});

it('rejects the same key in two files', () => {
  const { errors } = checkTranslations([ok[0]!, f('vi/n5/vocab-009.json', ok[0]!.file)], src);
  expect(msgs(errors)[0]).toMatch(/duplicate vocab key/);
});

it('warns about a stale snapshot, missing Vietnamese letters and an overlong text', () => {
  const { errors, warnings } = checkTranslations(
    [f('vi/n5/vocab-001.json', { type: 'vocab', level: 'N5', entries: { '食べる|たべる': { vi: ['hai'], en: ['to consume'] } } }),
     f('vi/n5/sentences-001.json', { type: 'sentences', level: 'N5', entries: { '5': { vi: 'Mèo '.repeat(30), en: 'A cat.' } } })],
    src,
  );
  expect(errors).toEqual([]);
  expect(msgs(warnings)).toEqual(['stale: the English changed since translation', 'no Vietnamese letter', 'much longer than the English']);
});

it('accepts a sentence shared by two levels in either level folder', () => {
  const n4 = f('vi/n4/sentences-001.json', { type: 'sentences', level: 'N4', entries: { '5': { vi: 'Một con mèo.', en: 'A cat.' } } });
  expect(checkTranslations([n4], src).errors).toEqual([]);
});

it('treats loanwords and symbols as Vietnamese enough', () => {
  expect(looksVietnamese('tivi')).toBe(true);
  expect(looksVietnamese('email, OK')).toBe(true);
  expect(looksVietnamese('〜 (số) 3')).toBe(true);
  expect(looksVietnamese('the cat')).toBe(false);
  expect(looksVietnamese('con mèo')).toBe(true);
});
