import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { Grammar, Kanji, Sentence, Vocab } from '@nihongo/shared';
import {
  readTrFiles, toOverlays, applyVocab, applyKanji, applyGrammar, applySentences,
  vocabKey, grammarKey, sentenceKey, hanVietGaps, type Overlays,
} from './translate';

const V = (word: string, reading: string, meanings: string[]): Vocab => ({ id: 'v', level: 'N5', word, reading, meanings, tags: [], kanji: [], sentenceIds: [] });
const K = (char: string, meanings: string[]): Kanji => ({ id: `k-${char}`, char, level: 'N5', strokes: 1, meanings, on: [], kun: [], strokePaths: [], vocabIds: [] });
const G = (title: string, meaning: string, jas: string[]): Grammar => ({
  id: 'g', level: 'N5', title, meaning, formation: '', examples: jas.map((ja) => ({ ja, romaji: '', en: `en ${ja}` })),
});
const S = (id: number, en: string): Sentence => ({ id: `s-${id}`, level: 'N5', ja: `ja${id}`, en });
const empty = (): Overlays => ({ vocab: new Map(), kanji: new Map(), grammar: new Map(), sentences: new Map() });

function tmp(files: Record<string, unknown>): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tr-'));
  for (const [rel, body] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
    fs.writeFileSync(path.join(dir, rel), typeof body === 'string' ? body : JSON.stringify(body));
  }
  return dir;
}

it('builds stable keys', () => {
  expect(vocabKey(V('食べる', 'たべる', []))).toBe('食べる|たべる');
  expect(grammarKey(G('〜たい', '', []))).toBe('N5|〜たい');
  expect(sentenceKey(S(100013, ''))).toBe('100013');
});

it('reads batch files in order and merges entries per type', () => {
  const dir = tmp({
    'vi/n5/vocab-001.json': { type: 'vocab', level: 'N5', entries: { '食べる|たべる': { vi: ['ăn'], en: ['to eat'] } } },
    'vi/n5/kanji-001.json': { type: 'kanji', level: 'N5', entries: { 一: { vi: ['một'], en: ['one'] } } },
  });
  const files = readTrFiles(dir);
  expect(files.map((f) => f.path)).toEqual(['vi/n5/kanji-001.json', 'vi/n5/vocab-001.json']);
  const o = toOverlays(files);
  expect(o.vocab.get('食べる|たべる')?.vi).toEqual(['ăn']);
  expect(o.kanji.get('一')?.vi).toEqual(['một']);
  expect(readTrFiles(path.join(dir, 'missing'))).toEqual([]);
});

it('rejects a key that appears in two files', () => {
  const entry = { '食べる|たべる': { vi: ['ăn'], en: ['to eat'] } };
  const dir = tmp({
    'vi/n5/vocab-001.json': { type: 'vocab', level: 'N5', entries: entry },
    'vi/n5/vocab-002.json': { type: 'vocab', level: 'N5', entries: entry },
  });
  expect(() => toOverlays(readTrFiles(dir))).toThrow(/duplicate vocab key 食べる\|たべる in vi\/n5\/vocab-001\.json and vi\/n5\/vocab-002\.json/);
});

it('names the file when a translation file is not valid JSON', () => {
  const dir = tmp({ 'vi/n5/vocab-002.json': '{ "type": "vocab", oops' });
  expect(() => readTrFiles(dir)).toThrow(/vi\/n5\/vocab-002\.json/);
});

it('names the file when valid JSON has the wrong shape', () => {
  const cases: [unknown, RegExp][] = [
    [{ type: 'vocab', entries: {} }, /vi\/n5\/bad\.json: .*level/],
    [{ type: 'vocab', level: 'N5' }, /vi\/n5\/bad\.json: .*entries/],
    [{ type: 'nope', level: 'N5', entries: {} }, /vi\/n5\/bad\.json: .*type/],
    [{ type: 'grammar', level: 'N5', entries: { 'N5|x': { vi: 'a', en: 'b' } } }, /vi\/n5\/bad\.json: .*N5\|x.*examples/],
    [{ type: 'vocab', level: 'N5', entries: { 'a|a': { en: ['x'] } } }, /vi\/n5\/bad\.json: .*a\|a.*vi/],
  ];
  for (const [body, re] of cases) {
    expect(() => readTrFiles(tmp({ 'vi/n5/bad.json': body }))).toThrow(re);
  }
});

it('applies vocab meanings and reports stale English', () => {
  const items = [V('食べる', 'たべる', ['to eat']), V('飲む', 'のむ', ['to drink', 'to swallow']), V('見る', 'みる', ['to see'])];
  const o = empty();
  o.vocab.set('食べる|たべる', { vi: ['ăn'], en: ['to eat'] });
  o.vocab.set('飲む|のむ', { vi: ['uống'], en: ['to drink'] });
  const r = applyVocab(items, o.vocab);
  expect(items.map((v) => v.meaningsVi)).toEqual([['ăn'], ['uống'], undefined]);
  expect(r).toEqual({ total: 3, fromFile: 2, fromOpen: 0, stale: ['飲む|のむ'] });
});

it('prefers a file Hán Việt over open data and counts missing ones', () => {
  const items = [K('一', ['one']), K('学', ['study']), K('々', ['repeat'])];
  const o = empty();
  o.kanji.set('学', { vi: ['học'], hanViet: 'HỌC', en: ['study'] });
  const open = (ch: string) => (ch === '一' ? 'NHẤT' : ch === '学' ? 'HẠC' : undefined);
  const r = applyKanji(items, o.kanji, open);
  expect(items.map((k) => k.hanViet)).toEqual(['NHẤT', 'HỌC', undefined]);
  expect(items.map((k) => k.meaningsVi)).toEqual([undefined, ['học'], undefined]);
  expect(r).toMatchObject({ total: 3, fromFile: 1, hanVietOpen: 1, hanVietFile: 1, hanVietMissing: ['々'], stale: [] });
});

it('applies the grammar meaning and only the examples whose Japanese still matches', () => {
  const g = G('〜たい', 'want to', ['行きたい。', '食べたい。']);
  const o = empty();
  o.grammar.set('N5|〜たい', { vi: 'muốn', examples: [{ ja: '行きたい。', vi: 'Muốn đi.' }, { ja: '古い例。', vi: 'Cũ.' }], en: 'want to' });
  const r = applyGrammar([g], o.grammar);
  expect(g.meaningVi).toBe('muốn');
  expect(g.examples.map((e) => e.vi)).toEqual(['Muốn đi.', undefined]);
  expect(r).toEqual({ total: 1, fromFile: 1, fromOpen: 0, stale: [] });
});

it('prefers a file sentence over Tatoeba and falls back to Tatoeba', () => {
  const items = [S(1, 'Hello.'), S(2, 'Bye.'), S(3, 'Hm.')];
  const o = empty();
  o.sentences.set('1', { vi: 'Xin chào.', en: 'Hello.' });
  const r = applySentences(items, o.sentences, new Map([[1, 'Chào.'], [2, 'Tạm biệt.']]));
  expect(items.map((s) => s.vi)).toEqual(['Xin chào.', 'Tạm biệt.', undefined]);
  expect(r).toEqual({ total: 3, fromFile: 1, fromOpen: 1, stale: [] });
});

it('lists kanji without Hán Việt once a level has every kanji meaning translated', () => {
  const a = { ...K('一', ['one']), meaningsVi: ['một'], hanViet: 'NHẤT' };
  const b = { ...K('二', ['two']), meaningsVi: ['hai'] };
  const c = K('三', ['three']);
  expect(hanVietGaps([a, b])).toEqual(['二']);
  expect(hanVietGaps([a, b, c])).toEqual([]); // level not finished yet — no gate
  expect(hanVietGaps([])).toEqual([]);
});
