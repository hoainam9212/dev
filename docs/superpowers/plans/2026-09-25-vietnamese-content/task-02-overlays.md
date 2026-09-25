# Task 02 — Translation files: keys, loading, merging

Branch `vi/task-02`. Read `00-overview.md` first.

**Files**
- Modify: `data/scripts/sources.ts` (add `TRANSLATIONS_DIR`)
- Create: `data/src/translate.ts`
- Test: `data/src/translate.test.ts`

**Interfaces**
- Consumes: `Vocab`, `Kanji`, `Grammar`, `Sentence`, `Level`, `LEVELS` from `@nihongo/shared`.
- Produces: everything listed under `data/src/translate.ts` in the overview (types, key functions, `readTrFiles`,
  `toOverlays`, `loadBuiltSources`, `applyVocab`, `applyKanji`, `applyGrammar`, `applySentences`).

- [ ] **Step 1: Write the failing test** — `data/src/translate.test.ts`

```ts
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { Grammar, Kanji, Sentence, Vocab } from '@nihongo/shared';
import {
  readTrFiles, toOverlays, applyVocab, applyKanji, applyGrammar, applySentences,
  vocabKey, grammarKey, sentenceKey, type Overlays,
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
```

- [ ] **Step 2: Run it** — `npx vitest run src/translate.test.ts` (in `data/`). Expected: FAIL, cannot resolve `./translate`.

- [ ] **Step 3: Implement** — add to `data/scripts/sources.ts`:

```ts
export const TRANSLATIONS_DIR = path.join(DATA_DIR, 'translations');
```

  and create `data/src/translate.ts`:

```ts
import fs from 'node:fs';
import path from 'node:path';
import { LEVELS, type Grammar, type Kanji, type Level, type Sentence, type Vocab } from '@nihongo/shared';

export type TrType = 'vocab' | 'kanji' | 'grammar' | 'sentences';
export const TR_TYPES: TrType[] = ['vocab', 'kanji', 'grammar', 'sentences'];

export interface VocabEntry { vi: string[]; en: string[] }
export interface KanjiEntry { vi: string[]; hanViet?: string; en: string[] }
export interface GrammarEntry { vi: string; examples: { ja: string; vi: string }[]; en: string }
export interface SentenceEntry { vi: string; en: string }
export interface EntryOf { vocab: VocabEntry; kanji: KanjiEntry; grammar: GrammarEntry; sentences: SentenceEntry }
export interface TrFile<T extends TrType = TrType> { type: T; level: Level; entries: Record<string, EntryOf[T]> }
export interface LoadedFile { path: string; file: TrFile }
export type Overlays = { [T in TrType]: Map<string, EntryOf[T]> };
export interface Sources { vocab: Vocab[]; kanji: Kanji[]; grammar: Grammar[]; sentences: Sentence[] }
export interface ApplyReport { total: number; fromFile: number; fromOpen: number; stale: string[] }

export const vocabKey = (v: Pick<Vocab, 'word' | 'reading'>) => `${v.word}|${v.reading}`;
export const kanjiKey = (k: Pick<Kanji, 'char'>) => k.char;
export const grammarKey = (g: Pick<Grammar, 'level' | 'title'>) => `${g.level}|${g.title}`;
export const sentenceKey = (s: Pick<Sentence, 'id'>) => s.id.replace(/^s-/, '');

/** Every `vi/<level>/*.json` under `dir`, sorted by path. A parse error names the file. */
export function readTrFiles(dir: string): LoadedFile[] {
  const root = path.join(dir, 'vi');
  if (!fs.existsSync(root)) return [];
  const out: LoadedFile[] = [];
  for (const lv of fs.readdirSync(root).sort()) {
    const d = path.join(root, lv);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const name of fs.readdirSync(d).filter((n) => n.endsWith('.json')).sort()) {
      const rel = `vi/${lv}/${name}`;
      try {
        out.push({ path: rel, file: JSON.parse(fs.readFileSync(path.join(d, name), 'utf8')) as TrFile });
      } catch (e) {
        throw new Error(`${rel}: ${(e as Error).message}`);
      }
    }
  }
  return out;
}

/** One map per type; a key present in two files is an error (one translation per item). */
export function toOverlays(files: LoadedFile[]): Overlays {
  const o: Overlays = { vocab: new Map(), kanji: new Map(), grammar: new Map(), sentences: new Map() };
  const seen = new Map<string, string>();
  for (const { path: p, file } of files) {
    const map = o[file.type] as Map<string, unknown> | undefined;
    if (!map) throw new Error(`${p}: unknown type ${String(file.type)}`);
    for (const [key, entry] of Object.entries(file.entries)) {
      const id = `${file.type} key ${key}`;
      const prev = seen.get(id);
      if (prev) throw new Error(`duplicate ${id} in ${prev} and ${p}`);
      seen.set(id, p);
      map.set(key, entry);
    }
  }
  return o;
}

/** The built bundles in client/public/content (English sources + whatever open data the last build added). */
export function loadBuiltSources(outDir: string): Sources {
  const read = <T>(rel: string): T[] => JSON.parse(fs.readFileSync(path.join(outDir, rel), 'utf8')) as T[];
  const src: Sources = { vocab: [], kanji: [], grammar: [], sentences: [] };
  for (const l of LEVELS) {
    const lv = l.toLowerCase();
    src.vocab.push(...read<Vocab>(`vocab/${lv}.json`));
    src.kanji.push(...read<Kanji>(`kanji/${lv}.json`));
    src.grammar.push(...read<Grammar>(`grammar/${lv}.json`));
    src.sentences.push(...read<Sentence>(`sentences/${lv}.json`));
  }
  return src;
}

const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const report = (total: number): ApplyReport => ({ total, fromFile: 0, fromOpen: 0, stale: [] });

export function applyVocab(items: Vocab[], o: Overlays['vocab']): ApplyReport {
  const r = report(items.length);
  for (const v of items) {
    const e = o.get(vocabKey(v));
    if (!e) continue;
    v.meaningsVi = e.vi;
    r.fromFile++;
    if (!same(e.en, v.meanings)) r.stale.push(vocabKey(v));
  }
  return r;
}

export function applyKanji(
  items: Kanji[],
  o: Overlays['kanji'],
  openHanViet: (ch: string) => string | undefined,
): ApplyReport & { hanVietOpen: number; hanVietFile: number; hanVietMissing: string[] } {
  const r = { ...report(items.length), hanVietOpen: 0, hanVietFile: 0, hanVietMissing: [] as string[] };
  for (const k of items) {
    const e = o.get(kanjiKey(k));
    if (e?.hanViet) {
      k.hanViet = e.hanViet;
      r.hanVietFile++;
    } else {
      const hv = openHanViet(k.char);
      if (hv) {
        k.hanViet = hv;
        r.hanVietOpen++;
      } else r.hanVietMissing.push(k.char);
    }
    if (!e) continue;
    k.meaningsVi = e.vi;
    r.fromFile++;
    if (!same(e.en, k.meanings)) r.stale.push(k.char);
  }
  return r;
}

export function applyGrammar(items: Grammar[], o: Overlays['grammar']): ApplyReport {
  const r = report(items.length);
  for (const g of items) {
    const e = o.get(grammarKey(g));
    if (!e) continue;
    g.meaningVi = e.vi;
    const byJa = new Map(e.examples.map((x) => [x.ja, x.vi]));
    for (const ex of g.examples) {
      const vi = byJa.get(ex.ja);
      if (vi) ex.vi = vi;
    }
    r.fromFile++;
    if (e.en !== g.meaning) r.stale.push(grammarKey(g));
  }
  return r;
}

export function applySentences(items: Sentence[], o: Overlays['sentences'], openVi: Map<number, string>): ApplyReport {
  const r = report(items.length);
  for (const s of items) {
    const key = sentenceKey(s);
    const e = o.get(key);
    if (e) {
      s.vi = e.vi;
      r.fromFile++;
      if (e.en !== s.en) r.stale.push(key);
      continue;
    }
    const open = openVi.get(Number(key));
    if (open) {
      s.vi = open;
      r.fromOpen++;
    }
  }
  return r;
}
```

- [ ] **Step 4: Run it** — `npx vitest run src/translate.test.ts`. Expected: PASS (8 tests).

- [ ] **Step 5: Check command** → green. **Commit** `feat(data): translation overlay files and merge functions`
  + STATUS (fill 01's sha, line 02); ff `master`.
