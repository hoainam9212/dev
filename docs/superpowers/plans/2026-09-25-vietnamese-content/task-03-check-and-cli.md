# Task 03 — Check, batching and the `tr` CLI

Branch `vi/task-03`. Read `00-overview.md` first.

**Files**
- Create: `data/src/translate-check.ts`, `data/src/tr-batch.ts`, `data/scripts/tr.ts`
- Modify: `data/package.json` (script `"tr": "tsx scripts/tr.ts"`)
- Test: `data/src/translate-check.test.ts`, `data/src/tr-batch.test.ts`, `data/src/translations.test.ts`

**Interfaces**
- Consumes (task 02): `LoadedFile`, `TrFile`, `TrType`, `TR_TYPES`, `Overlays`, `Sources`, `readTrFiles`,
  `toOverlays`, `loadBuiltSources`, `vocabKey`, `kanjiKey`, `grammarKey`, `sentenceKey`; `OUT_DIR`,
  `TRANSLATIONS_DIR` from `scripts/sources.ts`.
- Produces: `Issue`, `looksVietnamese`, `checkTranslations`; `Batch`, `pendingItems`, `nextIndex`, `makeBatch`,
  `SampleRow`, `sampleEntries`; the CLI commands in the overview.

Rules (spec › Tooling): **errors** — unknown key for its type/level, wrong folder level or file-name prefix,
duplicate key, empty text, identical to the English, missing `en` snapshot, grammar examples not matching the source
(count and Japanese), Hán Việt not uppercase. **Warnings** — stale `en` snapshot, no Vietnamese letter and not all
loanwords, Vietnamese longer than `4 × English + 40` characters.

- [ ] **Step 1: Write the failing tests**

`data/src/translate-check.test.ts`:

```ts
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
```

`data/src/tr-batch.test.ts`:

```ts
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
  const k = makeBatch('kanji', 'N5', src.kanji, 1);
  expect(k.file.entries).toEqual({ 一: { vi: [], en: ['one'] }, '々': { vi: [], hanViet: '', en: ['repeat'] } });
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
```

`data/src/translations.test.ts` (the committed translations must pass; skipped until content is built):

```ts
import fs from 'node:fs';
import path from 'node:path';
import { OUT_DIR, TRANSLATIONS_DIR } from '../scripts/sources';
import { loadBuiltSources, readTrFiles } from './translate';
import { checkTranslations } from './translate-check';

const built = fs.existsSync(path.join(OUT_DIR, 'vocab/n5.json'));

it.skipIf(!built)('every committed translation passes the check', () => {
  const { errors } = checkTranslations(readTrFiles(TRANSLATIONS_DIR), loadBuiltSources(OUT_DIR));
  expect(errors.map((e) => `${e.file} ${e.key}: ${e.msg}`)).toEqual([]);
});
```

- [ ] **Step 2: Run them** — `npx vitest run src/translate-check.test.ts src/tr-batch.test.ts src/translations.test.ts`
  (in `data/`). Expected: the first two FAIL (cannot resolve modules); `translations.test.ts` FAILS to import
  `./translate-check`.

- [ ] **Step 3: Implement `data/src/translate-check.ts`**

```ts
import type { Level } from '@nihongo/shared';
import { grammarKey, kanjiKey, sentenceKey, toOverlays, vocabKey, type LoadedFile, type Sources } from './translate';

export interface Issue { file: string; key: string; msg: string }

const VI_LETTER = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
const LOANWORDS = new Set([
  'ok', 'email', 'e-mail', 'tivi', 'radio', 'video', 'taxi', 'pizza', 'internet', 'web', 'app', 'game', 'piano',
  'golf', 'tennis', 'menu', 'bar', 'pin', 'karaoke', 'sushi', 'kimono', 'manga', 'anime', 'yen', 'cm', 'km', 'kg', 'mm',
]);

/** Has a Vietnamese letter, or no Latin letters at all, or only allow-listed loanwords. */
export function looksVietnamese(s: string): boolean {
  const t = s.trim();
  if (!t) return false;
  if (VI_LETTER.test(t)) return true;
  if (!/[a-z]/i.test(t)) return true;
  return t.toLowerCase().split(/[^a-z-]+/).filter(Boolean).every((w) => LOANWORDS.has(w));
}

const lower = (xs: string[]) => xs.map((x) => x.trim().toLowerCase());
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

export function checkTranslations(files: LoadedFile[], src: Sources): { errors: Issue[]; warnings: Issue[] } {
  const errors: Issue[] = [];
  const warnings: Issue[] = [];
  try {
    toOverlays(files);
  } catch (e) {
    errors.push({ file: '', key: '', msg: (e as Error).message });
  }
  const at = <T>(items: T[], level: (x: T) => Level, key: (x: T) => string) => new Map(items.map((x) => [`${level(x)}|${key(x)}`, x]));
  const vocab = at(src.vocab, (v) => v.level, vocabKey);
  const kanji = at(src.kanji, (k) => k.level, kanjiKey);
  const grammar = at(src.grammar, (g) => g.level, grammarKey);
  const sentences = at(src.sentences, (s) => s.level, sentenceKey);

  for (const { path: p, file } of files) {
    const [, folder, name] = p.split('/');
    if (folder !== file.level.toLowerCase()) errors.push({ file: p, key: '', msg: `file level ${file.level} does not match folder ${folder}` });
    if (!name?.startsWith(`${file.type}-`)) errors.push({ file: p, key: '', msg: `file name must start with "${file.type}-"` });
    for (const [key, raw] of Object.entries(file.entries)) {
      const err = (msg: string) => errors.push({ file: p, key, msg });
      const warn = (msg: string) => warnings.push({ file: p, key, msg });
      const id = `${file.level}|${key}`;
      const text = (vi: string[], en: string[] | string | undefined, source: string[]) => {
        if (!vi.length || vi.some((x) => !x?.trim())) err('empty translation');
        else if (same(lower(vi), lower(source))) err('identical to the English');
        if (en === undefined) err('missing en snapshot');
        else if (!same(Array.isArray(en) ? en : [en], source)) warn('stale: the English changed since translation');
        const joined = vi.join(', ');
        if (joined.trim() && !looksVietnamese(joined)) warn('no Vietnamese letter');
        if (joined.length > source.join(', ').length * 4 + 40) warn('much longer than the English');
      };
      if (file.type === 'vocab') {
        const s = vocab.get(id);
        if (!s) { err(`not a ${file.level} vocab key`); continue; }
        const e = raw as { vi: string[]; en: string[] };
        text(e.vi ?? [], e.en, s.meanings);
      } else if (file.type === 'kanji') {
        const s = kanji.get(id);
        if (!s) { err(`not a ${file.level} kanji key`); continue; }
        const e = raw as { vi: string[]; hanViet?: string; en: string[] };
        text(e.vi ?? [], e.en, s.meanings);
        if (e.hanViet !== undefined && (!e.hanViet.trim() || e.hanViet !== e.hanViet.toLocaleUpperCase('vi'))) err('Hán Việt must be uppercase');
      } else if (file.type === 'grammar') {
        const s = grammar.get(id);
        if (!s) { err(`not a ${file.level} grammar key`); continue; }
        const e = raw as { vi: string; examples: { ja: string; vi: string }[]; en: string };
        text([e.vi ?? ''], e.en, [s.meaning]);
        const ex = e.examples ?? [];
        if (ex.length !== s.examples.length || ex.some((x, i) => x.ja !== s.examples[i]!.ja)) err("examples don't match the source");
        else if (ex.some((x) => !x.vi?.trim())) err('empty translation');
      } else {
        const s = sentences.get(id);
        if (!s) { err(`not a ${file.level} sentence key`); continue; }
        const e = raw as { vi: string; en: string };
        text([e.vi ?? ''], e.en, [s.en]);
      }
    }
  }
  return { errors, warnings };
}
```

  Note: every lookup map is keyed `LEVEL|<key>`; grammar keys already contain the level, so their map keys look
  like `N5|N5|〜たい` — consistent with `id`, just doubled.

- [ ] **Step 4: Implement `data/src/tr-batch.ts`**

```ts
import type { Grammar, Kanji, Level, Sentence, Vocab } from '@nihongo/shared';
import {
  grammarKey, kanjiKey, sentenceKey, toOverlays, vocabKey,
  type LoadedFile, type Overlays, type Sources, type TrFile, type TrType,
} from './translate';

type Item = Vocab | Kanji | Grammar | Sentence;
export interface Batch { writeTo: string; context: Record<string, unknown>; file: TrFile }
export interface SampleRow { type: TrType; key: string; ja: string; en: string; vi: string }

/** Items of a level still without a translation file entry (sentences: also without a Tatoeba translation). */
export function pendingItems(type: TrType, level: Level, src: Sources, o: Overlays): Item[] {
  switch (type) {
    case 'vocab':
      return src.vocab.filter((v) => v.level === level && !o.vocab.has(vocabKey(v)));
    case 'kanji':
      return src.kanji.filter((k) => k.level === level && !o.kanji.has(kanjiKey(k)));
    case 'grammar':
      return src.grammar.filter((g) => g.level === level && !o.grammar.has(grammarKey(g)));
    case 'sentences':
      return src.sentences.filter((s) => s.level === level && !s.vi && !o.sentences.has(sentenceKey(s)));
  }
}

export function nextIndex(existing: string[], type: TrType): number {
  const nums = existing
    .map((p) => p.split('/').pop()!)
    .filter((n) => n.startsWith(`${type}-`))
    .map((n) => Number(n.slice(type.length + 1, -'.json'.length)));
  return (nums.length ? Math.max(...nums) : 0) + 1;
}

export function makeBatch(type: TrType, level: Level, items: Item[], index: number, sentencesById?: Map<string, Sentence>): Batch {
  const entries: Record<string, unknown> = {};
  const context: Record<string, unknown> = {};
  for (const item of items) {
    if (type === 'vocab') {
      const v = item as Vocab;
      const ex = v.sentenceIds.map((id) => sentencesById?.get(id)).find(Boolean);
      entries[vocabKey(v)] = { vi: [], en: v.meanings };
      context[vocabKey(v)] = { reading: v.reading, ...(ex ? { example: { ja: ex.ja, en: ex.en } } : {}) };
    } else if (type === 'kanji') {
      const k = item as Kanji;
      entries[kanjiKey(k)] = { vi: [], ...(k.hanViet ? {} : { hanViet: '' }), en: k.meanings };
      context[kanjiKey(k)] = { on: k.on, kun: k.kun, ...(k.hanViet ? { hanVietOpen: k.hanViet } : {}) };
    } else if (type === 'grammar') {
      const g = item as Grammar;
      entries[grammarKey(g)] = { vi: '', examples: g.examples.map((e) => ({ ja: e.ja, vi: '' })), en: g.meaning };
      context[grammarKey(g)] = { formation: g.formation, examples: g.examples.map((e) => e.en) };
    } else {
      const s = item as Sentence;
      entries[sentenceKey(s)] = { vi: '', en: s.en };
      context[sentenceKey(s)] = { ja: s.ja };
    }
  }
  return {
    writeTo: `vi/${level.toLowerCase()}/${type}-${String(index).padStart(3, '0')}.json`,
    context,
    file: { type, level, entries } as TrFile,
  };
}

/** Up to n rows, spread evenly across the types present, each with its Japanese for side-by-side review. */
export function sampleEntries(files: LoadedFile[], src: Sources, n: number, rng: () => number = Math.random): SampleRow[] {
  const o = toOverlays(files);
  const vocab = new Map(src.vocab.map((v) => [vocabKey(v), v]));
  const kanji = new Map(src.kanji.map((k) => [kanjiKey(k), k]));
  const grammar = new Map(src.grammar.map((g) => [grammarKey(g), g]));
  const sentences = new Map(src.sentences.map((s) => [sentenceKey(s), s]));
  const rows: Record<TrType, SampleRow[]> = { vocab: [], kanji: [], grammar: [], sentences: [] };
  for (const [key, e] of o.vocab) { const v = vocab.get(key); rows.vocab.push({ type: 'vocab', key, ja: v ? `${v.word}（${v.reading}）` : key, en: e.en.join(', '), vi: e.vi.join(', ') }); }
  for (const [key, e] of o.kanji) rows.kanji.push({ type: 'kanji', key, ja: `${key} ${e.hanViet ?? kanji.get(key)?.hanViet ?? ''}`.trim(), en: e.en.join(', '), vi: e.vi.join(', ') });
  for (const [key, e] of o.grammar) rows.grammar.push({ type: 'grammar', key, ja: `${grammar.get(key)?.title ?? key} · ${e.examples[0]?.ja ?? ''}`, en: e.en, vi: `${e.vi} · ${e.examples[0]?.vi ?? ''}` });
  for (const [key, e] of o.sentences) rows.sentences.push({ type: 'sentences', key, ja: sentences.get(key)?.ja ?? key, en: e.en, vi: e.vi });
  const present = (Object.keys(rows) as TrType[]).filter((t) => rows[t].length);
  const per = Math.ceil(n / Math.max(present.length, 1));
  const out: SampleRow[] = [];
  for (const t of present) {
    const pool = [...rows[t]];
    for (let i = 0; i < per && pool.length; i++) out.push(pool.splice(Math.floor(rng() * pool.length), 1)[0]!);
  }
  return out.slice(0, n);
}
```

- [ ] **Step 5: Run the three test files.** Expected: PASS (8 + 4 tests; `translations.test.ts` passes, or is skipped
  when `client/public/content` is absent). If `looksVietnamese('email, OK')` fails, check the split regex keeps
  `e-mail`/`email` whole.

- [ ] **Step 6: CLI** — `data/scripts/tr.ts` and `"tr": "tsx scripts/tr.ts"` in `data/package.json` scripts.

```ts
import fs from 'node:fs';
import path from 'node:path';
import { LEVELS, type Level } from '@nihongo/shared';
import { OUT_DIR, TRANSLATIONS_DIR } from './sources';
import { loadBuiltSources, readTrFiles, toOverlays, TR_TYPES, type TrType } from '../src/translate';
import { checkTranslations } from '../src/translate-check';
import { makeBatch, nextIndex, pendingItems, sampleEntries } from '../src/tr-batch';

const [cmd, ...rest] = process.argv.slice(2);
const arg = (name: string) => {
  const i = rest.indexOf(`--${name}`);
  return i >= 0 ? rest[i + 1] : undefined;
};
const levelArg = (): Level | undefined => {
  const l = arg('level')?.toUpperCase();
  if (l && !LEVELS.includes(l as Level)) throw new Error(`unknown level ${l}`);
  return l as Level | undefined;
};
const DEFAULT_SIZE: Record<TrType, number> = { vocab: 250, kanji: Infinity, grammar: Infinity, sentences: 300 };

if (!fs.existsSync(path.join(OUT_DIR, 'vocab/n5.json'))) {
  console.error('No built content: run npm run data:build first.');
  process.exit(1);
}
const src = loadBuiltSources(OUT_DIR);
const files = readTrFiles(TRANSLATIONS_DIR);
const o = toOverlays(files);

if (cmd === 'status') {
  const only = levelArg();
  for (const l of LEVELS.filter((x) => !only || x === only)) {
    const parts = TR_TYPES.map((t) => {
      const total = (src[t] as { level: Level }[]).filter((x) => x.level === l).length;
      return `${t} ${total - pendingItems(t, l, src, o).length}/${total}`;
    });
    console.log(l, parts.join(' · '));
  }
  const { errors, warnings } = checkTranslations(files, src);
  console.log(`${files.length} files · ${errors.length} errors · ${warnings.length} warnings`);
} else if (cmd === 'next') {
  const level = levelArg();
  const type = arg('type') as TrType;
  if (!level || !TR_TYPES.includes(type)) throw new Error('usage: next --level n5 --type vocab|kanji|grammar|sentences [--size N]');
  const size = Number(arg('size') ?? DEFAULT_SIZE[type]);
  const items = pendingItems(type, level, src, o).slice(0, size);
  if (!items.length) {
    console.log(`nothing pending for ${level} ${type}`);
  } else {
    const byId = new Map(src.sentences.map((s) => [s.id, s]));
    const batch = makeBatch(type, level, items, nextIndex(files.map((f) => f.path).filter((p) => p.startsWith(`vi/${level.toLowerCase()}/`)), type), byId);
    const out = path.join(TRANSLATIONS_DIR, '_work', batch.writeTo.replace(/\//g, '_'));
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, JSON.stringify(batch, null, 2));
    console.log(`${items.length} ${type} → ${path.relative(process.cwd(), out)}`);
    console.log(`fill "vi" (and empty "hanViet"), then write the "file" object to translations/${batch.writeTo}`);
  }
} else if (cmd === 'check') {
  const { errors, warnings } = checkTranslations(files, src);
  for (const w of warnings) console.log(`warn  ${w.file} ${w.key}: ${w.msg}`);
  for (const e of errors) console.log(`ERROR ${e.file} ${e.key}: ${e.msg}`);
  console.log(`${files.length} files · ${errors.length} errors · ${warnings.length} warnings`);
  process.exit(errors.length ? 1 : 0);
} else if (cmd === 'sample') {
  const file = arg('file');
  const level = levelArg();
  const chosen = files.filter((f) => (file ? f.path === file : !level || f.file.level === level));
  for (const r of sampleEntries(chosen, src, Number(arg('n') ?? 20))) console.log(`[${r.type}] ${r.ja}\n    en: ${r.en}\n    vi: ${r.vi}`);
} else {
  console.log('usage: tr status [--level n5] | next --level n5 --type vocab [--size 250] | check | sample (--file vi/n5/vocab-001.json | --level n5) [--n 20]');
}
```

- [ ] **Step 7: Try it** — from the repo root: `npm run tr -w data -- status`. Expected: five lines like
  `N5 vocab 0/718 · kanji 0/79 · grammar 0/136 · sentences 0/1833` (the bundles carry no Vietnamese until task 04's
  build adds Tatoeba's) and `0 files · 0 errors · 0 warnings`.
  `npm run tr -w data -- next --level n5 --type grammar` → writes `data/translations/_work/vi_n5_grammar-001.json`
  with 136 entries; delete that file afterwards (task 05 regenerates it).

- [ ] **Step 8: Check command** → green. **Commit** `feat(data): translation check, batches and tr CLI`
  + STATUS (fill 02's sha, line 03); ff `master`.
