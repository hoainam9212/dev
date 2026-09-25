import type { Grammar, Kanji, Sentence, Vocab } from '@nihongo/shared';
import { makeBatch, nextIndex, pendingItems, sampleEntries } from './tr-batch';
import { toOverlays, type LoadedFile, type Sources } from './translate';

const S = (id: number, level: 'N5' | 'N4', vi?: string): Sentence => ({ id: `s-${id}`, level, ja: `ja${id}`, en: `en${id}`, ...(vi ? { vi } : {}) });
const src: Sources = {
  vocab: [
    { id: 'v1', level: 'N5', word: '赤い', reading: 'あかい', meanings: ['red'], tags: [], kanji: ['赤'], sentenceIds: ['s-1'] } as Vocab,
    { id: 'v2', level: 'N5', word: '青い', reading: 'あおい', meanings: ['blue'], tags: [], kanji: ['青'], sentenceIds: [] } as Vocab,
  ],
  kanji: [
    { id: 'k-一', char: '一', level: 'N5', strokes: 1, meanings: ['one'], hanViet: 'NHẤT', on: ['イチ'], kun: [], strokePaths: [], vocabIds: [] } as Kanji,
    { id: 'k-々', char: '々', level: 'N5', strokes: 3, meanings: ['repeat'], on: [], kun: [], strokePaths: [], vocabIds: [] } as Kanji,
  ],
  grammar: [{ id: 'g1', level: 'N5', title: '〜たい', meaning: 'want to', formation: 'V-stem + たい', examples: [{ ja: '行きたい。', romaji: '', en: 'I want to go.' }] } as Grammar],
  sentences: [S(1, 'N5'), S(2, 'N5', 'Có sẵn.'), S(3, 'N5'), S(3, 'N4')],
};
const files: LoadedFile[] = [
  { path: 'vi/n5/vocab-001.json', file: { type: 'vocab', level: 'N5', entries: { '赤い|あかい': { vi: ['đỏ'], en: ['red'] } } } },
  { path: 'vi/n5/sentences-001.json', file: { type: 'sentences', level: 'N5', entries: { '3': { vi: 'Ba.', en: 'en3' } } } },
];

it('lists what is left to translate, skipping Tatoeba-covered and already translated sentences in any level', () => {
  const o = toOverlays(files);
  expect(pendingItems('vocab', 'N5', src, o).map((v) => (v as Vocab).word)).toEqual(['青い']);
  expect(pendingItems('sentences', 'N5', src, o).map((s) => s.id)).toEqual(['s-1']);
  expect(pendingItems('sentences', 'N4', src, o)).toEqual([]);
});

it('numbers the next batch file after the existing ones of that type', () => {
  expect(nextIndex(['vi/n5/vocab-001.json', 'vi/n5/vocab-002.json', 'vi/n5/kanji-001.json'], 'vocab')).toBe(3);
  expect(nextIndex([], 'grammar')).toBe(1);
});

it('makes skeletons with English snapshots and context', () => {
  const byId = new Map(src.sentences.map((s) => [s.id, s]));
  const v = makeBatch('vocab', 'N5', [src.vocab[0]!], 2, byId);
  expect(v.writeTo).toBe('vi/n5/vocab-002.json');
  expect(v.file).toEqual({ type: 'vocab', level: 'N5', entries: { '赤い|あかい': { vi: [], en: ['red'] } } });
  expect(v.context['赤い|あかい']).toEqual({ reading: 'あかい', example: { ja: 'ja1', en: 'en1' } });
  const hint = (ch: string) => (ch === '一' ? { value: 'NHẤT', kanjidic: ['Nhất'], hanviet: ['nhất'] } : { kanjidic: ['Sông'], hanviet: [] });
  const k = makeBatch('kanji', 'N5', src.kanji, 1, undefined, hint);
  expect(k.file.entries).toEqual({ 一: { vi: [], en: ['one'] }, '々': { vi: [], hanViet: '', en: ['repeat'] } });
  expect(k.context['一']).toEqual({ on: ['イチ'], kun: [], hanVietOpen: 'NHẤT' });
  expect(k.context['々']).toEqual({ on: [], kun: [], hanVietCandidates: { kanjidic: ['Sông'], hanviet: [] } });
  const g = makeBatch('grammar', 'N5', src.grammar, 1);
  expect(g.file.entries['N5|〜たい']).toEqual({ vi: '', examples: [{ ja: '行きたい。', vi: '' }], en: 'want to' });
  const s = makeBatch('sentences', 'N5', [src.sentences[0]!], 1);
  expect(s.file.entries['1']).toEqual({ vi: '', en: 'en1' });
  expect(s.context['1']).toEqual({ ja: 'ja1' });
});

it('samples rows across types with the Japanese next to the translation', () => {
  const rows = sampleEntries(files, src, 10, () => 0);
  expect(rows).toEqual([
    { type: 'vocab', key: '赤い|あかい', ja: '赤い（あかい）', en: 'red', vi: 'đỏ' },
    { type: 'sentences', key: '3', ja: 'ja3', en: 'en3', vi: 'Ba.' },
  ]);
});
