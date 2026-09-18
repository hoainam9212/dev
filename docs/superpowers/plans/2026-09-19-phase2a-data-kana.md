# Phase 2a – Data Pipeline, Content Loader and Kana Module

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `data` workspace that downloads the open datasets and emits static JSON bundles for N5–N1, add the client content loader, TTS helper, stroke animation and handwriting canvas, and ship the Kana module (chart, recognition quiz, writing practice).

**Architecture:** `data/src/parse.ts` holds pure, tested parsers; `data/scripts/fetch.ts` downloads raw files into `data/raw/` (git-ignored); `data/scripts/build.ts` writes `client/public/content/**` (git-ignored). `shared/src/svgpath.ts` samples SVG path data to points so the client can score strokes with `scoreStroke`. Client pages read bundles through `content/loader.ts` and never import raw data.

**Tech Stack:** Node 20, tsx, unbzip2-stream, adm-zip, Vitest, React 18, Zustand, Web Speech API.

**Spec:** `docs/superpowers/specs/2026-09-19-nihongo-sensei-design.md` (sections 4, 5.3 Kana/Kanji canvas, 5.4)

## Global Constraints

- Bundle ids: `v-n5-0001`, `k-一`, `g-n4-0012`, `s-123456`. Build must be deterministic.
- Bundle paths: `client/public/content/vocab/n5.json`, `kanji/n5.json`, `grammar/n5.json`, `sentences/n5.json`, `kana.json`, `index.json`. Lower-case level in file names.
- Build fails if N5 vocab < 600, total kanji < 2000, total grammar < 800.
- KanjiVG canvas is 109×109; all stroke paths keep that coordinate space.
- UI text Vietnamese. Dataset meanings stay English.
- TypeScript strict; Vitest; commit after every task.
- Work on branch `feat/phase2-content`.

---

### Task 1: SVG path sampler in `shared`

**Files:**
- Create: `shared/src/svgpath.ts`
- Modify: `shared/src/index.ts` (add `export * from './svgpath';`)
- Test: `shared/src/svgpath.test.ts`

**Interfaces:**
- Produces: `pathToPoints(d: string, samplesPerCurve?: number): Point[]` supporting M/m, L/l, H/h, V/v, C/c, S/s, Q/q, T/t, Z/z (KanjiVG uses M, C, c, S, s). Curves are sampled at `samplesPerCurve` (default 12) points.

- [ ] **Step 1: Failing test**

`shared/src/svgpath.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { pathToPoints } from './svgpath';

describe('pathToPoints', () => {
  it('handles absolute M and L', () => {
    expect(pathToPoints('M10,20 L30,40')).toEqual([{ x: 10, y: 20 }, { x: 30, y: 40 }]);
  });
  it('handles relative l and implicit repeated commands', () => {
    expect(pathToPoints('M0 0 l10 0 10 0')).toEqual([{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 20, y: 0 }]);
  });
  it('samples cubic curves and ends at the curve end', () => {
    const pts = pathToPoints('M0,0 C0,10 10,10 10,0', 4);
    expect(pts[0]).toEqual({ x: 0, y: 0 });
    expect(pts[pts.length - 1]!.x).toBeCloseTo(10);
    expect(pts[pts.length - 1]!.y).toBeCloseTo(0);
    expect(pts.length).toBe(5);
  });
  it('parses a real KanjiVG stroke with c and s', () => {
    const d = 'M11,54.25c3.19,0.62,6.25,0.75,9.73,0.5c20.64-1.5,50.39-5.12,68.58-5.24c3.6-0.02,5.77,0.24,7.57,0.49';
    const pts = pathToPoints(d);
    expect(pts[0]).toEqual({ x: 11, y: 54.25 });
    const last = pts[pts.length - 1]!;
    expect(last.x).toBeCloseTo(11 + 9.73 + 68.58 + 7.57, 1);
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -w shared` → FAIL (module missing).

- [ ] **Step 3: Implement**

`shared/src/svgpath.ts`:
```ts
import type { Point } from './scoring';

const NUM = /-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi;

function cubic(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const mt = 1 - t;
  return {
    x: mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x,
    y: mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y,
  };
}

function quad(p0: Point, p1: Point, p2: Point, t: number): Point {
  const mt = 1 - t;
  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
  };
}

/** Sample an SVG path `d` string into a polyline (supports M L H V C S Q T Z, absolute and relative). */
export function pathToPoints(d: string, samplesPerCurve = 12): Point[] {
  const tokens = d.match(/[MmLlHhVvCcSsQqTtZz]|-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/g) ?? [];
  const pts: Point[] = [];
  let cur: Point = { x: 0, y: 0 };
  let start: Point = { x: 0, y: 0 };
  let prevCtrl: Point | null = null;
  let cmd = '';
  let i = 0;
  const next = () => parseFloat(tokens[i++]!);
  const isNum = () => i < tokens.length && NUM.test(tokens[i]!) && (NUM.lastIndex = 0) === 0;

  while (i < tokens.length) {
    const t = tokens[i]!;
    if (/^[A-Za-z]$/.test(t)) {
      cmd = t;
      i++;
    } else if (cmd === 'M') cmd = 'L';
    else if (cmd === 'm') cmd = 'l';

    const rel = cmd === cmd.toLowerCase();
    const dx = rel ? cur.x : 0;
    const dy = rel ? cur.y : 0;

    switch (cmd.toUpperCase()) {
      case 'M': {
        cur = { x: next() + dx, y: next() + dy };
        start = cur;
        pts.push(cur);
        prevCtrl = null;
        break;
      }
      case 'L': {
        cur = { x: next() + dx, y: next() + dy };
        pts.push(cur);
        prevCtrl = null;
        break;
      }
      case 'H': {
        cur = { x: next() + dx, y: cur.y };
        pts.push(cur);
        prevCtrl = null;
        break;
      }
      case 'V': {
        cur = { x: cur.x, y: next() + dy };
        pts.push(cur);
        prevCtrl = null;
        break;
      }
      case 'C':
      case 'S': {
        let c1: Point;
        if (cmd.toUpperCase() === 'C') c1 = { x: next() + dx, y: next() + dy };
        else c1 = prevCtrl ? { x: 2 * cur.x - prevCtrl.x, y: 2 * cur.y - prevCtrl.y } : cur;
        const c2 = { x: next() + dx, y: next() + dy };
        const end = { x: next() + dx, y: next() + dy };
        for (let k = 1; k <= samplesPerCurve; k++) pts.push(cubic(cur, c1, c2, end, k / samplesPerCurve));
        prevCtrl = c2;
        cur = end;
        break;
      }
      case 'Q':
      case 'T': {
        let c1: Point;
        if (cmd.toUpperCase() === 'Q') c1 = { x: next() + dx, y: next() + dy };
        else c1 = prevCtrl ? { x: 2 * cur.x - prevCtrl.x, y: 2 * cur.y - prevCtrl.y } : cur;
        const end = { x: next() + dx, y: next() + dy };
        for (let k = 1; k <= samplesPerCurve; k++) pts.push(quad(cur, c1, end, k / samplesPerCurve));
        prevCtrl = c1;
        cur = end;
        break;
      }
      case 'Z': {
        cur = start;
        pts.push(cur);
        prevCtrl = null;
        break;
      }
      default:
        i++;
    }
    if (!isNum() && i < tokens.length && !/^[A-Za-z]$/.test(tokens[i]!)) i++;
  }
  return pts;
}
```

- [ ] **Step 4: Run tests + typecheck** → `npm test -w shared && npm run typecheck -w shared` PASS.

- [ ] **Step 5: Commit** `git commit -am "feat(shared): SVG path sampler"` (add new files first).

---

### Task 2: `data` workspace – parsers (TDD)

**Files:**
- Create: `data/package.json`, `data/tsconfig.json`, `data/vitest.config.ts`
- Create: `data/src/parse.ts`
- Test: `data/src/parse.test.ts`
- Modify: `shared/src/types.ts` (add `KanaChar`, `KanaBundle`, `ContentIndex`)

**Interfaces:**
- Produces (parse.ts): `parseCsv(text): string[][]`, `splitMeanings(s): string[]`, `parseVocabCsv(text, level): Vocab[]`, `parseKanjiJson(raw: Record<string, RawKanji>): Kanji[]`, `parseGrammarCsv(text): Grammar[]`, `extractStrokes(svg): string[]`, `kanjivgFilename(ch): string`, `parseTsvSentences(tsv): Map<number, string>`, `parseLinks(tsv): Map<number, number[]>`, `assignSentences(vocab, sentences: {id: string; ja: string}[], max?): Set<string>`, `attachVocabToKanji(kanji, vocab, max?): void`, `levelRank(level): number`, `dedupeVocab(all: Vocab[]): Vocab[]`.
- Produces (types.ts):
```ts
export interface KanaChar { kana: string; romaji: string; row: string; group: 'basic' | 'dakuten' | 'yoon'; mnemonic?: string; strokePaths: string[] }
export interface KanaBundle { hiragana: KanaChar[]; katakana: KanaChar[] }
export interface ContentIndex { builtAt: string; counts: Record<string, Record<Level, number>>; }
```

- [ ] **Step 1: Package files**

`data/package.json`:
```json
{
  "name": "@nihongo/data",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "fetch": "tsx scripts/fetch.ts",
    "build": "tsx scripts/build.ts",
    "test": "vitest run",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@nihongo/shared": "*",
    "adm-zip": "^0.5.16",
    "unbzip2-stream": "^1.4.3"
  },
  "devDependencies": {
    "@types/adm-zip": "^0.5.5",
    "@types/node": "^20.16.0",
    "@types/unbzip2-stream": "^1.4.3",
    "tsx": "^4.19.0",
    "typescript": "^5.6.0",
    "vitest": "^2.1.0"
  }
}
```
`data/tsconfig.json`:
```json
{ "extends": "../tsconfig.base.json", "compilerOptions": { "lib": ["ES2022"], "types": ["node", "vitest/globals"] }, "include": ["src", "scripts", "authored"] }
```
`data/vitest.config.ts`: same as shared.
Root `package.json` scripts add: `"data:fetch": "npm run fetch -w data"`, `"data:build": "npm run build -w data"`.

- [ ] **Step 2: Failing tests**

`data/src/parse.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import {
  parseCsv, splitMeanings, parseVocabCsv, parseKanjiJson, parseGrammarCsv, extractStrokes,
  kanjivgFilename, parseTsvSentences, parseLinks, assignSentences, attachVocabToKanji, dedupeVocab,
} from './parse';

describe('parseCsv', () => {
  it('handles quotes, embedded commas and escaped quotes', () => {
    expect(parseCsv('a,b\n"x, y","he said ""hi"""\n')).toEqual([['a', 'b'], ['x, y', 'he said "hi"']]);
  });
});

describe('splitMeanings', () => {
  it('splits on commas outside parentheses', () => {
    expect(splitMeanings('to meet, to see (e.g. a friend, a doctor)')).toEqual(['to meet', 'to see (e.g. a friend, a doctor)']);
  });
});

describe('parseVocabCsv', () => {
  const csv = 'expression,reading,meaning,tags\n会う,あう,"to meet, to see",JLPT JLPT_5\n青い,あおい,blue,JLPT JLPT_5\n';
  it('builds Vocab with ids, kanji list and split meanings', () => {
    const v = parseVocabCsv(csv, 'N5');
    expect(v[0]).toEqual({
      id: 'v-n5-0001', level: 'N5', word: '会う', reading: 'あう',
      meanings: ['to meet', 'to see'], tags: ['JLPT', 'JLPT_5'], kanji: ['会'], sentenceIds: [],
    });
    expect(v[1]!.id).toBe('v-n5-0002');
  });
});

describe('dedupeVocab', () => {
  it('keeps the lowest level entry for the same word+reading', () => {
    const a = parseVocabCsv('expression,reading,meaning,tags\n青い,あおい,blue,x\n', 'N3');
    const b = parseVocabCsv('expression,reading,meaning,tags\n青い,あおい,blue,x\n', 'N5');
    const out = dedupeVocab([...a, ...b]);
    expect(out).toHaveLength(1);
    expect(out[0]!.level).toBe('N5');
  });
});

describe('parseKanjiJson', () => {
  it('keeps only kanji with a JLPT level, sorted by level then frequency', () => {
    const raw = {
      '一': { strokes: 1, grade: 1, freq: 2, jlpt_new: 5, meanings: ['One'], readings_on: ['いち'], readings_kun: ['ひと-'] },
      '二': { strokes: 2, grade: 1, freq: 9, jlpt_new: 5, meanings: ['Two'], readings_on: ['に'], readings_kun: ['ふた'] },
      '龍': { strokes: 16, grade: null, freq: null, jlpt_new: null, meanings: ['dragon'], readings_on: [], readings_kun: [] },
      '愛': { strokes: 13, grade: 4, freq: 640, jlpt_new: 3, meanings: ['Love'], readings_on: ['あい'], readings_kun: [] },
    };
    const k = parseKanjiJson(raw);
    expect(k.map((x) => x.char)).toEqual(['一', '二', '愛']);
    expect(k[0]).toEqual({ id: 'k-一', char: '一', level: 'N5', strokes: 1, meanings: ['One'], on: ['いち'], kun: ['ひと-'], grade: 1, freq: 2, strokePaths: [], vocabIds: [] });
  });
});

describe('parseGrammarCsv', () => {
  it('groups example rows by title and level with sequential ids per level', () => {
    const csv = '"Grammar Point","Meaning","Formation","Example (Japanese)","Example (Romaji)","Example (English)","JLPT Level"\n' +
      '"A が いちばん","superlative","N + が + いちばん","寿司が一番好き。","Sushi ga ichiban suki.","I like sushi most.","JLPT N5"\n' +
      '"A が いちばん","superlative","N + が + いちばん","猫が一番。","Neko ga ichiban.","Cats are best.","JLPT N5"\n' +
      '"〜ながら","while","V-stem + ながら","歩きながら話す。","Arukinagara hanasu.","Talk while walking.","JLPT N4"\n';
    const g = parseGrammarCsv(csv);
    expect(g).toHaveLength(2);
    expect(g[0]).toMatchObject({ id: 'g-n5-0001', level: 'N5', title: 'A が いちばん', meaning: 'superlative' });
    expect(g[0]!.examples).toHaveLength(2);
    expect(g[1]!.id).toBe('g-n4-0001');
  });
});

describe('KanjiVG helpers', () => {
  it('maps a char to its file name', () => {
    expect(kanjivgFilename('一')).toBe('04e00.svg');
    expect(kanjivgFilename('あ')).toBe('03042.svg');
  });
  it('extracts stroke paths in order, ignoring non-stroke paths', () => {
    const svg = '<svg><g id="kvg:StrokePaths_04e8c"><path id="kvg:04e8c-s1" d="M1,2 L3,4"/><path id="kvg:04e8c-s2" d="M5,6"/></g><g id="kvg:StrokeNumbers_04e8c"><text>1</text></g></svg>';
    expect(extractStrokes(svg)).toEqual(['M1,2 L3,4', 'M5,6']);
  });
});

describe('Tatoeba', () => {
  it('parses sentence and link TSVs', () => {
    expect(parseTsvSentences('1\tjpn\t猫が好き。\n2\tjpn\t犬。\n')).toEqual(new Map([[1, '猫が好き。'], [2, '犬。']]));
    expect(parseLinks('1\t100\n1\t101\n2\t200\n')).toEqual(new Map([[1, [100, 101]], [2, [200]]]));
  });
});

describe('assignSentences', () => {
  it('assigns up to max short sentences containing the word and returns used ids', () => {
    const vocab = parseVocabCsv('expression,reading,meaning,tags\n猫,ねこ,cat,x\nあう,あう,meet,x\n', 'N5');
    const sentences = [
      { id: 's-1', ja: '猫が好きです。' },
      { id: 's-2', ja: '黒い猫と白い猫がいます。' },
      { id: 's-3', ja: '犬がいます。' },
      { id: 's-4', ja: '猫。' },
    ];
    const used = assignSentences(vocab, sentences, 2);
    expect(vocab[0]!.sentenceIds).toEqual(['s-4', 's-1']);
    expect(vocab[1]!.sentenceIds).toEqual([]);
    expect([...used]).toEqual(['s-4', 's-1']);
  });
});

describe('attachVocabToKanji', () => {
  it('lists vocab containing the kanji, lowest level first, capped', () => {
    const kanji = parseKanjiJson({ '猫': { strokes: 11, grade: null, freq: 1000, jlpt_new: 3, meanings: ['cat'], readings_on: [], readings_kun: [] } });
    const v1 = parseVocabCsv('expression,reading,meaning,tags\n猫,ねこ,cat,x\n', 'N5');
    const v2 = parseVocabCsv('expression,reading,meaning,tags\n子猫,こねこ,kitten,x\n', 'N3');
    attachVocabToKanji(kanji, [...v2, ...v1], 1);
    expect(kanji[0]!.vocabIds).toEqual(['v-n5-0001']);
  });
});
```

- [ ] **Step 3: Install and verify failure** → `npm install && npm test -w data` FAIL.

- [ ] **Step 4: Implement parse.ts**

```ts
import { LEVELS, hasKanji, type Grammar, type Kanji, type Level, type Vocab } from '@nihongo/shared';

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i]!;
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false;
      } else field += c;
    } else if (c === '"') inQ = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.some((f) => f !== '')) rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== '' || row.length) { row.push(field); if (row.some((f) => f !== '')) rows.push(row); }
  return rows;
}

export function splitMeanings(s: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let cur = '';
  for (const c of s) {
    if (c === '(') depth++;
    if (c === ')') depth = Math.max(0, depth - 1);
    if (c === ',' && depth === 0) { out.push(cur.trim()); cur = ''; } else cur += c;
  }
  if (cur.trim()) out.push(cur.trim());
  return out.filter(Boolean);
}

export function levelRank(level: Level): number { return LEVELS.indexOf(level); }

const pad = (n: number) => String(n).padStart(4, '0');

export function parseVocabCsv(text: string, level: Level): Vocab[] {
  const rows = parseCsv(text);
  const header = rows[0] ?? [];
  const idx = (name: string) => header.indexOf(name);
  const iw = idx('expression'), ir = idx('reading'), im = idx('meaning'), it = idx('tags');
  const out: Vocab[] = [];
  for (const r of rows.slice(1)) {
    const word = (r[iw] ?? '').trim();
    if (!word) continue;
    out.push({
      id: `v-${level.toLowerCase()}-${pad(out.length + 1)}`,
      level,
      word,
      reading: (r[ir] ?? '').trim() || word,
      meanings: splitMeanings(r[im] ?? ''),
      tags: (r[it] ?? '').split(/\s+/).filter(Boolean),
      kanji: [...word].filter((ch) => hasKanji(ch)),
      sentenceIds: [],
    });
  }
  return out;
}

export function dedupeVocab(all: Vocab[]): Vocab[] {
  const best = new Map<string, Vocab>();
  for (const v of all) {
    const key = `${v.word}|${v.reading}`;
    const prev = best.get(key);
    if (!prev || levelRank(v.level) < levelRank(prev.level)) best.set(key, v);
  }
  return [...best.values()];
}

export interface RawKanji {
  strokes: number; grade: number | null; freq: number | null; jlpt_new: number | null;
  meanings: string[]; readings_on: string[]; readings_kun: string[];
}

export function parseKanjiJson(raw: Record<string, RawKanji>): Kanji[] {
  const out: Kanji[] = [];
  for (const [char, k] of Object.entries(raw)) {
    if (!k.jlpt_new) continue;
    const level = `N${k.jlpt_new}` as Level;
    const item: Kanji = {
      id: `k-${char}`, char, level, strokes: k.strokes, meanings: k.meanings,
      on: k.readings_on, kun: k.readings_kun, strokePaths: [], vocabIds: [],
    };
    if (k.grade != null) item.grade = k.grade;
    if (k.freq != null) item.freq = k.freq;
    out.push(item);
  }
  out.sort((a, b) => levelRank(a.level) - levelRank(b.level) || (a.freq ?? 9999) - (b.freq ?? 9999) || a.strokes - b.strokes || a.char.localeCompare(b.char));
  return out;
}

export function parseGrammarCsv(text: string): Grammar[] {
  const rows = parseCsv(text).slice(1);
  const byKey = new Map<string, Grammar>();
  const counters: Record<string, number> = {};
  for (const r of rows) {
    const [title = '', meaning = '', formation = '', ja = '', romaji = '', en = '', lv = ''] = r;
    const m = lv.match(/N[1-5]/);
    if (!m || !title.trim()) continue;
    const level = m[0] as Level;
    const key = `${level}|${title.trim()}`;
    let g = byKey.get(key);
    if (!g) {
      const n = (counters[level] = (counters[level] ?? 0) + 1);
      g = { id: `g-${level.toLowerCase()}-${pad(n)}`, level, title: title.trim(), meaning: meaning.trim(), formation: formation.trim(), examples: [] };
      byKey.set(key, g);
    }
    if (ja.trim()) g.examples.push({ ja: ja.trim(), romaji: romaji.trim(), en: en.trim() });
  }
  return [...byKey.values()];
}

export function kanjivgFilename(ch: string): string {
  return ch.codePointAt(0)!.toString(16).padStart(5, '0') + '.svg';
}

export function extractStrokes(svg: string): string[] {
  const out: string[] = [];
  const re = /<path\b[^>]*\bid="kvg:[0-9a-f]+-s\d+"[^>]*\bd="([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(svg))) out.push(m[1]!);
  return out;
}

export function parseTsvSentences(tsv: string): Map<number, string> {
  const map = new Map<number, string>();
  for (const line of tsv.split('\n')) {
    const [id, , text] = line.split('\t');
    if (id && text) map.set(Number(id), text.trim());
  }
  return map;
}

export function parseLinks(tsv: string): Map<number, number[]> {
  const map = new Map<number, number[]>();
  for (const line of tsv.split('\n')) {
    const [a, b] = line.split('\t');
    if (!a || !b) continue;
    const from = Number(a), to = Number(b.trim());
    const arr = map.get(from);
    if (arr) arr.push(to); else map.set(from, [to]);
  }
  return map;
}

export function assignSentences(vocab: Vocab[], sentences: { id: string; ja: string }[], max = 3): Set<string> {
  const byFirst = new Map<string, Vocab[]>();
  for (const v of vocab) {
    const key = v.word;
    if (key.length < 2 && !hasKanji(key)) continue;
    const arr = byFirst.get(key[0]!);
    if (arr) arr.push(v); else byFirst.set(key[0]!, [v]);
  }
  const cands = new Map<string, { id: string; len: number }[]>();
  for (const s of sentences) {
    const chars = [...s.ja];
    const seen = new Set<string>();
    for (let i = 0; i < chars.length; i++) {
      const list = byFirst.get(chars[i]!);
      if (!list) continue;
      for (const v of list) {
        if (seen.has(v.id)) continue;
        if (s.ja.startsWith(v.word, s.ja.indexOf(chars[i]!, i === 0 ? 0 : undefined as never) === -1 ? 0 : chars.slice(0, i).join('').length)) {
          seen.add(v.id);
          const arr = cands.get(v.id);
          const entry = { id: s.id, len: chars.length };
          if (arr) arr.push(entry); else cands.set(v.id, [entry]);
        }
      }
    }
  }
  const used = new Set<string>();
  for (const v of vocab) {
    const arr = cands.get(v.id);
    if (!arr) continue;
    arr.sort((a, b) => a.len - b.len || a.id.localeCompare(b.id));
    v.sentenceIds = arr.slice(0, max).map((x) => x.id);
    v.sentenceIds.forEach((id) => used.add(id));
  }
  return used;
}

export function attachVocabToKanji(kanji: Kanji[], vocab: Vocab[], max = 8): void {
  const byChar = new Map<string, Vocab[]>();
  for (const v of vocab) for (const ch of v.kanji) {
    const arr = byChar.get(ch);
    if (arr) arr.push(v); else byChar.set(ch, [v]);
  }
  for (const k of kanji) {
    const list = byChar.get(k.char) ?? [];
    list.sort((a, b) => levelRank(a.level) - levelRank(b.level) || [...a.word].length - [...b.word].length || a.id.localeCompare(b.id));
    k.vocabIds = list.slice(0, max).map((v) => v.id);
  }
}
```

Note: in `assignSentences`, use the simple form `s.ja.startsWith(v.word, offset)` where `offset = chars.slice(0, i).join('').length` (UTF-16 offset of the i-th code point). Write it that way; the expression above is shown only to make the offset requirement explicit.

- [ ] **Step 5: Run tests + typecheck** → PASS.

- [ ] **Step 6: Commit** `feat(data): dataset parsers`.

---

### Task 3: Kana authored data + fetch + build scripts

**Files:**
- Create: `data/authored/kana.ts`, `data/scripts/sources.ts`, `data/scripts/fetch.ts`, `data/scripts/build.ts`, `data/src/kana.ts`
- Create: `ATTRIBUTION.md`
- Test: `data/src/kana.test.ts`

**Interfaces:**
- Produces: `buildKana(readSvg: (ch: string) => string | null): KanaBundle` (kana.ts), `content/index.json` of type `ContentIndex`, bundles listed in Global Constraints.

- [ ] **Step 1: Failing test**

`data/src/kana.test.ts`:
```ts
import { buildKana } from './kana';

it('builds 46 basic + dakuten + yoon rows for both scripts with strokes when available', () => {
  const b = buildKana((ch) => (ch === 'あ' ? '<path id="kvg:03042-s1" d="M1,1"/><path id="kvg:03042-s2" d="M2,2"/><path id="kvg:03042-s3" d="M3,3"/>' : null));
  const basic = b.hiragana.filter((k) => k.group === 'basic');
  expect(basic).toHaveLength(46);
  expect(b.hiragana.filter((k) => k.group === 'dakuten')).toHaveLength(25);
  expect(b.hiragana.filter((k) => k.group === 'yoon')).toHaveLength(33);
  expect(b.katakana).toHaveLength(b.hiragana.length);
  const a = b.hiragana[0]!;
  expect(a).toMatchObject({ kana: 'あ', romaji: 'a', row: 'a', group: 'basic' });
  expect(a.strokePaths).toEqual(['M1,1', 'M2,2', 'M3,3']);
  expect(a.mnemonic).toBeTruthy();
  expect(b.katakana[0]).toMatchObject({ kana: 'ア', romaji: 'a' });
});
```

- [ ] **Step 2: Implement `data/authored/kana.ts`** – tables (hiragana; katakana derived via `toKatakana`):

```ts
export interface KanaRow { row: string; items: [string, string][] } // [hiragana, romaji]

export const BASIC: KanaRow[] = [
  { row: 'a', items: [['あ', 'a'], ['い', 'i'], ['う', 'u'], ['え', 'e'], ['お', 'o']] },
  { row: 'k', items: [['か', 'ka'], ['き', 'ki'], ['く', 'ku'], ['け', 'ke'], ['こ', 'ko']] },
  { row: 's', items: [['さ', 'sa'], ['し', 'shi'], ['す', 'su'], ['せ', 'se'], ['そ', 'so']] },
  { row: 't', items: [['た', 'ta'], ['ち', 'chi'], ['つ', 'tsu'], ['て', 'te'], ['と', 'to']] },
  { row: 'n', items: [['な', 'na'], ['に', 'ni'], ['ぬ', 'nu'], ['ね', 'ne'], ['の', 'no']] },
  { row: 'h', items: [['は', 'ha'], ['ひ', 'hi'], ['ふ', 'fu'], ['へ', 'he'], ['ほ', 'ho']] },
  { row: 'm', items: [['ま', 'ma'], ['み', 'mi'], ['む', 'mu'], ['め', 'me'], ['も', 'mo']] },
  { row: 'y', items: [['や', 'ya'], ['ゆ', 'yu'], ['よ', 'yo']] },
  { row: 'r', items: [['ら', 'ra'], ['り', 'ri'], ['る', 'ru'], ['れ', 're'], ['ろ', 'ro']] },
  { row: 'w', items: [['わ', 'wa'], ['を', 'wo'], ['ん', 'n']] },
];
export const DAKUTEN: KanaRow[] = [
  { row: 'g', items: [['が', 'ga'], ['ぎ', 'gi'], ['ぐ', 'gu'], ['げ', 'ge'], ['ご', 'go']] },
  { row: 'z', items: [['ざ', 'za'], ['じ', 'ji'], ['ず', 'zu'], ['ぜ', 'ze'], ['ぞ', 'zo']] },
  { row: 'd', items: [['だ', 'da'], ['ぢ', 'ji'], ['づ', 'zu'], ['で', 'de'], ['ど', 'do']] },
  { row: 'b', items: [['ば', 'ba'], ['び', 'bi'], ['ぶ', 'bu'], ['べ', 'be'], ['ぼ', 'bo']] },
  { row: 'p', items: [['ぱ', 'pa'], ['ぴ', 'pi'], ['ぷ', 'pu'], ['ぺ', 'pe'], ['ぽ', 'po']] },
];
export const YOON: KanaRow[] = [
  { row: 'ky', items: [['きゃ', 'kya'], ['きゅ', 'kyu'], ['きょ', 'kyo']] },
  { row: 'sh', items: [['しゃ', 'sha'], ['しゅ', 'shu'], ['しょ', 'sho']] },
  { row: 'ch', items: [['ちゃ', 'cha'], ['ちゅ', 'chu'], ['ちょ', 'cho']] },
  { row: 'ny', items: [['にゃ', 'nya'], ['にゅ', 'nyu'], ['にょ', 'nyo']] },
  { row: 'hy', items: [['ひゃ', 'hya'], ['ひゅ', 'hyu'], ['ひょ', 'hyo']] },
  { row: 'my', items: [['みゃ', 'mya'], ['みゅ', 'myu'], ['みょ', 'myo']] },
  { row: 'ry', items: [['りゃ', 'rya'], ['りゅ', 'ryu'], ['りょ', 'ryo']] },
  { row: 'gy', items: [['ぎゃ', 'gya'], ['ぎゅ', 'gyu'], ['ぎょ', 'gyo']] },
  { row: 'j', items: [['じゃ', 'ja'], ['じゅ', 'ju'], ['じょ', 'jo']] },
  { row: 'by', items: [['びゃ', 'bya'], ['びゅ', 'byu'], ['びょ', 'byo']] },
  { row: 'py', items: [['ぴゃ', 'pya'], ['ぴゅ', 'pyu'], ['ぴょ', 'pyo']] },
];
export const MNEMONIC_HIRAGANA: Record<string, string> = { /* 46 Vietnamese mnemonics, e.g. */ 'あ': 'Chữ "a" giống ăng-ten trên mái nhà.', /* ... */ };
export const MNEMONIC_KATAKANA: Record<string, string> = { /* 46 entries */ };
```
The implementer writes all 46 + 46 mnemonic strings in Vietnamese (short, one sentence each, image-based).

`data/src/kana.ts`:
```ts
import { toKatakana, type KanaBundle, type KanaChar } from '@nihongo/shared';
import { BASIC, DAKUTEN, YOON, MNEMONIC_HIRAGANA, MNEMONIC_KATAKANA, type KanaRow } from '../authored/kana';
import { extractStrokes } from './parse';

function expand(rows: KanaRow[], group: KanaChar['group'], katakana: boolean, readSvg: (ch: string) => string | null): KanaChar[] {
  const out: KanaChar[] = [];
  for (const r of rows) for (const [h, romaji] of r.items) {
    const kana = katakana ? toKatakana(h) : h;
    const paths = [...kana].flatMap((ch) => { const svg = readSvg(ch); return svg ? extractStrokes(svg) : []; });
    const mn = (katakana ? MNEMONIC_KATAKANA : MNEMONIC_HIRAGANA)[kana];
    const item: KanaChar = { kana, romaji, row: r.row, group, strokePaths: paths };
    if (mn) item.mnemonic = mn;
    out.push(item);
  }
  return out;
}

export function buildKana(readSvg: (ch: string) => string | null): KanaBundle {
  const build = (kk: boolean) => [
    ...expand(BASIC, 'basic', kk, readSvg), ...expand(DAKUTEN, 'dakuten', kk, readSvg), ...expand(YOON, 'yoon', kk, readSvg),
  ];
  return { hiragana: build(false), katakana: build(true) };
}
```

- [ ] **Step 3: `data/scripts/sources.ts`**

```ts
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const DATA_DIR = path.dirname(fileURLToPath(new URL('../package.json', import.meta.url)));
export const RAW_DIR = path.join(DATA_DIR, 'raw');
export const OUT_DIR = path.resolve(DATA_DIR, '..', 'client', 'public', 'content');
export const KANJIVG_TAG = 'r20250816';

export interface Source { url: string; file: string; kind: 'plain' | 'bz2' | 'zip-kanjivg' }
export const SOURCES: Source[] = [
  ...['n5', 'n4', 'n3', 'n2', 'n1'].map((l) => ({ url: `https://raw.githubusercontent.com/elzup/jlpt-word-list/master/src/${l}.csv`, file: `vocab/${l}.csv`, kind: 'plain' as const })),
  { url: 'https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json', file: 'kanji.json', kind: 'plain' },
  { url: 'https://hanabira.org/downloads/csv/hanabira_all_jlpt_grammar.csv', file: 'grammar.csv', kind: 'plain' },
  { url: 'https://downloads.tatoeba.org/exports/per_language/jpn/jpn_sentences.tsv.bz2', file: 'tatoeba/jpn_sentences.tsv', kind: 'bz2' },
  { url: 'https://downloads.tatoeba.org/exports/per_language/jpn/jpn-eng_links.tsv.bz2', file: 'tatoeba/jpn-eng_links.tsv', kind: 'bz2' },
  { url: 'https://downloads.tatoeba.org/exports/per_language/eng/eng_sentences.tsv.bz2', file: 'tatoeba/eng_sentences.tsv', kind: 'bz2' },
  { url: `https://github.com/KanjiVG/kanjivg/releases/download/${KANJIVG_TAG}/kanjivg-${KANJIVG_TAG.slice(1)}-main.zip`, file: 'kanjivg/.done', kind: 'zip-kanjivg' },
];
```

- [ ] **Step 4: `data/scripts/fetch.ts`**

```ts
import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import unbzip2 from 'unbzip2-stream';
import AdmZip from 'adm-zip';
import { RAW_DIR, SOURCES } from './sources';

async function download(url: string): Promise<Readable> {
  const res = await fetch(url);
  if (!res.ok || !res.body) throw new Error(`${res.status} ${url}`);
  return Readable.fromWeb(res.body as never);
}

async function main() {
  for (const s of SOURCES) {
    const target = path.join(RAW_DIR, s.file);
    if (fs.existsSync(target)) { console.log('skip', s.file); continue; }
    fs.mkdirSync(path.dirname(target), { recursive: true });
    console.log('fetch', s.url);
    if (s.kind === 'plain') {
      await pipeline(await download(s.url), fs.createWriteStream(target + '.part'));
      fs.renameSync(target + '.part', target);
    } else if (s.kind === 'bz2') {
      await pipeline(await download(s.url), unbzip2(), fs.createWriteStream(target + '.part'));
      fs.renameSync(target + '.part', target);
    } else {
      const zipPath = target + '.zip';
      await pipeline(await download(s.url), fs.createWriteStream(zipPath));
      const zip = new AdmZip(zipPath);
      const outDir = path.dirname(target);
      let n = 0;
      for (const e of zip.getEntries()) {
        if (e.isDirectory || !/(^|\/)kanji\/[0-9a-f]{5}\.svg$/.test(e.entryName)) continue;
        fs.mkdirSync(path.join(outDir, 'kanji'), { recursive: true });
        fs.writeFileSync(path.join(outDir, 'kanji', path.basename(e.entryName)), e.getData());
        n++;
      }
      fs.unlinkSync(zipPath);
      fs.writeFileSync(target, `${n} files\n`);
      console.log('extracted', n, 'svg');
    }
  }
  console.log('done');
}
main().catch((e) => { console.error(e); process.exit(1); });
```

- [ ] **Step 5: `data/scripts/build.ts`**

```ts
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { LEVELS, type ContentIndex, type Kanji, type Level, type Sentence, type Vocab } from '@nihongo/shared';
import { RAW_DIR, OUT_DIR } from './sources';
import {
  parseVocabCsv, dedupeVocab, parseKanjiJson, parseGrammarCsv, extractStrokes, kanjivgFilename,
  parseTsvSentences, parseLinks, assignSentences, attachVocabToKanji, levelRank, type RawKanji,
} from '../src/parse';
import { buildKana } from '../src/kana';

const read = (p: string) => fs.readFileSync(path.join(RAW_DIR, p), 'utf8');
const readSvg = (ch: string): string | null => {
  const p = path.join(RAW_DIR, 'kanjivg', 'kanji', kanjivgFilename(ch));
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null;
};
function write(rel: string, data: unknown) {
  const p = path.join(OUT_DIR, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data));
}
function assert(cond: boolean, msg: string) { if (!cond) { console.error('BUILD FAILED:', msg); process.exit(1); } }

async function loadEnglish(needed: Set<number>): Promise<Map<number, string>> {
  const map = new Map<number, string>();
  const rl = readline.createInterface({ input: fs.createReadStream(path.join(RAW_DIR, 'tatoeba/eng_sentences.tsv')) });
  for await (const line of rl) {
    const tab = line.indexOf('\t');
    const id = Number(line.slice(0, tab));
    if (needed.has(id)) map.set(id, line.slice(line.lastIndexOf('\t') + 1).trim());
  }
  return map;
}

async function main() {
  // vocab
  const vocab = dedupeVocab(LEVELS.flatMap((l) => parseVocabCsv(read(`vocab/${l.toLowerCase()}.csv`), l)));
  // kanji
  const kanji = parseKanjiJson(JSON.parse(read('kanji.json')) as Record<string, RawKanji>);
  for (const k of kanji) { const svg = readSvg(k.char); k.strokePaths = svg ? extractStrokes(svg) : []; }
  attachVocabToKanji(kanji, vocab);
  // grammar
  const grammar = parseGrammarCsv(read('grammar.csv'));
  // sentences
  const jpn = parseTsvSentences(read('tatoeba/jpn_sentences.tsv'));
  const links = parseLinks(read('tatoeba/jpn-eng_links.tsv'));
  const needed = new Set<number>();
  for (const [id, targets] of links) if (jpn.has(id)) targets.forEach((t) => needed.add(t));
  const eng = await loadEnglish(needed);
  const pool: Sentence[] = [];
  for (const [id, ja] of jpn) {
    if ([...ja].length > 40) continue;
    const en = (links.get(id) ?? []).map((t) => eng.get(t)).filter((x): x is string => !!x).sort((a, b) => a.length - b.length)[0];
    if (!en) continue;
    pool.push({ id: `s-${id}`, level: 'N5', ja, en });
  }
  pool.sort((a, b) => a.id.localeCompare(b.id));
  assignSentences(vocab, pool);
  const byId = new Map(pool.map((s) => [s.id, s]));
  // per-level outputs
  const counts: ContentIndex['counts'] = { vocab: {} as never, kanji: {} as never, grammar: {} as never, sentences: {} as never };
  for (const l of LEVELS) {
    const lv = l.toLowerCase();
    const v = vocab.filter((x) => x.level === l).sort((a, b) => a.id.localeCompare(b.id));
    const k = kanji.filter((x) => x.level === l);
    const g = grammar.filter((x) => x.level === l);
    const sIds = new Set(v.flatMap((x) => x.sentenceIds));
    const s = [...sIds].map((id) => ({ ...byId.get(id)!, level: l })).sort((a, b) => a.id.localeCompare(b.id));
    write(`vocab/${lv}.json`, v); write(`kanji/${lv}.json`, k); write(`grammar/${lv}.json`, g); write(`sentences/${lv}.json`, s);
    counts.vocab![l] = v.length; counts.kanji![l] = k.length; counts.grammar![l] = g.length; counts.sentences![l] = s.length;
    console.log(l, { vocab: v.length, kanji: k.length, grammar: g.length, sentences: s.length });
  }
  write('kana.json', buildKana(readSvg));
  const index: ContentIndex = { builtAt: new Date().toISOString(), counts };
  write('index.json', index);
  assert(counts.vocab!.N5 >= 600, 'N5 vocab < 600');
  assert(kanji.length >= 2000, 'kanji < 2000');
  assert(grammar.length >= 800, 'grammar < 800');
  const withStrokes = kanji.filter((k) => k.strokePaths.length).length;
  console.log('kanji with strokes', withStrokes, '/', kanji.length);
  console.log('wrote', OUT_DIR);
}
main().catch((e) => { console.error(e); process.exit(1); });
```

- [ ] **Step 6: `ATTRIBUTION.md`** listing each source, URL, license (as in spec table).

- [ ] **Step 7: Run** `npm test -w data`, `npm run typecheck -w data`, then `npm run data:fetch` (downloads ~45 MB) and `npm run data:build`. Expected: counts printed per level; thresholds pass; `client/public/content/index.json` exists.

- [ ] **Step 8: Commit** `feat(data): fetch and build pipeline with kana bundle`.

---

### Task 4: Client content loader, TTS helper, quiz utils

**Files:**
- Create: `client/src/content/loader.ts`, `client/src/lib/tts.ts`, `client/src/lib/quiz.ts`
- Test: `client/src/content/loader.test.ts`, `client/src/lib/quiz.test.ts`

**Interfaces:**
- `loadJson<T>(path: string): Promise<T>` (cached by path; path relative to `/content/`), `useJson<T>(path): { data?: T; error?: string; loading: boolean }`, `useKana()`, `useVocab(level)`, `useKanji(level)`, `useSentences(level)`, `useGrammar(level)`, `clearContentCache()`.
- `speak(text: string, opts?: { rate?: number; lang?: string }): boolean`, `canSpeak(): boolean`, `stopSpeaking()`.
- `shuffle<T>(arr: T[], rng?: () => number): T[]`, `makeChoices<T>(correct: T, pool: T[], n?: number, key?: (t: T) => string, rng?): T[]` (returns n items including `correct`, unique by key, shuffled), `mulberry32(seed: number): () => number`.

- [ ] **Step 1: Failing tests**

`client/src/lib/quiz.test.ts`:
```ts
import { shuffle, makeChoices, mulberry32 } from './quiz';

it('shuffle is deterministic with a seeded rng and keeps all items', () => {
  const rng = mulberry32(42);
  const out = shuffle([1, 2, 3, 4, 5], rng);
  expect([...out].sort()).toEqual([1, 2, 3, 4, 5]);
  expect(shuffle([1, 2, 3, 4, 5], mulberry32(42))).toEqual(out);
});

it('makeChoices includes the answer and unique distractors', () => {
  const pool = ['a', 'b', 'c', 'd', 'e', 'a'];
  const out = makeChoices('a', pool, 4, (x) => x, mulberry32(1));
  expect(out).toHaveLength(4);
  expect(out).toContain('a');
  expect(new Set(out).size).toBe(4);
});

it('makeChoices returns fewer when the pool is small', () => {
  expect(makeChoices('a', ['a', 'b'], 4)).toHaveLength(2);
});
```

`client/src/content/loader.test.ts`:
```ts
import { loadJson, clearContentCache } from './loader';

beforeEach(() => { clearContentCache(); vi.restoreAllMocks(); });

it('fetches /content/<path> once and caches', async () => {
  const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ ok: 1 })));
  await loadJson('kana.json');
  await loadJson('kana.json');
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock.mock.calls[0]![0]).toBe('/content/kana.json');
});

it('throws on non-200', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('nope', { status: 404 }));
  await expect(loadJson('x.json')).rejects.toThrow(/404/);
});
```

- [ ] **Step 2: Implement**

`client/src/lib/quiz.ts`:
```ts
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function shuffle<T>(arr: T[], rng: () => number = Math.random): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j]!, a[i]!]; }
  return a;
}
export function makeChoices<T>(correct: T, pool: T[], n = 4, key: (t: T) => string = (t) => String(t), rng: () => number = Math.random): T[] {
  const ck = key(correct);
  const seen = new Set([ck]);
  const distractors: T[] = [];
  for (const p of shuffle(pool, rng)) {
    const k = key(p);
    if (seen.has(k)) continue;
    seen.add(k); distractors.push(p);
    if (distractors.length >= n - 1) break;
  }
  return shuffle([correct, ...distractors], rng);
}
```

`client/src/lib/tts.ts`:
```ts
export function canSpeak(): boolean { return typeof window !== 'undefined' && 'speechSynthesis' in window; }
export function stopSpeaking(): void { if (canSpeak()) window.speechSynthesis.cancel(); }
export function speak(text: string, opts: { rate?: number; lang?: string } = {}): boolean {
  if (!canSpeak()) return false;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = opts.lang ?? 'ja-JP';
  u.rate = opts.rate ?? 0.9;
  const voice = window.speechSynthesis.getVoices().find((v) => v.lang.replace('_', '-').startsWith('ja'));
  if (voice) u.voice = voice;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
  return true;
}
```

`client/src/content/loader.ts`:
```ts
import { useEffect, useState } from 'react';
import type { Grammar, Kanji, KanaBundle, Level, Sentence, Vocab } from '@nihongo/shared';

const cache = new Map<string, Promise<unknown>>();
export function clearContentCache() { cache.clear(); }
export function loadJson<T>(path: string): Promise<T> {
  let p = cache.get(path);
  if (!p) {
    p = fetch(`/content/${path}`).then(async (r) => {
      if (!r.ok) throw new Error(`Không tải được ${path} (${r.status})`);
      return r.json();
    });
    cache.set(path, p);
    p.catch(() => cache.delete(path));
  }
  return p as Promise<T>;
}
export function useJson<T>(path: string | null) {
  const [state, set] = useState<{ data?: T; error?: string; loading: boolean }>({ loading: !!path });
  useEffect(() => {
    if (!path) return;
    let alive = true;
    set({ loading: true });
    loadJson<T>(path).then((data) => alive && set({ data, loading: false }), (e: Error) => alive && set({ error: e.message, loading: false }));
    return () => { alive = false; };
  }, [path]);
  return state;
}
const lv = (l: Level) => l.toLowerCase();
export const useKana = () => useJson<KanaBundle>('kana.json');
export const useVocab = (level: Level) => useJson<Vocab[]>(`vocab/${lv(level)}.json`);
export const useKanji = (level: Level) => useJson<Kanji[]>(`kanji/${lv(level)}.json`);
export const useSentences = (level: Level) => useJson<Sentence[]>(`sentences/${lv(level)}.json`);
export const useGrammar = (level: Level) => useJson<Grammar[]>(`grammar/${lv(level)}.json`);
```

- [ ] **Step 3: Tests + typecheck PASS. Commit** `feat(client): content loader, tts and quiz utilities`.

---

### Task 5: Stroke animation, drawing canvas, writing practice

**Files:**
- Create: `client/src/components/StrokeAnimation.tsx`, `client/src/components/DrawCanvas.tsx`, `client/src/components/WritingPractice.tsx`, `client/src/components/strokes.css`
- Test: `client/src/components/WritingPractice.test.tsx`

**Interfaces:**
- `StrokeAnimation({ paths: string[]; size?: number; playKey?: number; showNumbers?: boolean })` – renders 109×109 viewBox SVG, animates strokes sequentially with `stroke-dasharray`; `playKey` change replays.
- `DrawCanvas({ size?: number; guide?: string[]; guideUpTo?: number; onStroke(points: Point[]): void; clearKey?: number })` – pointer drawing in 109-space coordinates; renders faint guide paths up to `guideUpTo` (all if undefined).
- `WritingPractice({ paths: string[]; label: string; onComplete?(result: { score: number }): void })` – state machine: expects stroke i; scores via `scoreStroke(user, pathToPoints(paths[i]))`; pass ≥ 0.55 → next stroke; fail → shake + hint (show reference stroke i); when all done show average score and mascot mood.

- [ ] **Step 1: Failing test**

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { WritingPractice } from './WritingPractice';

it('shows progress and accepts a matching stroke drawn on the canvas', () => {
  const onComplete = vi.fn();
  render(<WritingPractice paths={['M10,50 L100,50']} label="一" onComplete={onComplete} />);
  expect(screen.getByText(/Nét 1 \/ 1/)).toBeInTheDocument();
  const canvas = screen.getByTestId('draw-canvas');
  Object.defineProperty(canvas, 'getBoundingClientRect', { value: () => ({ left: 0, top: 0, width: 218, height: 218 }) });
  fireEvent.pointerDown(canvas, { clientX: 20, clientY: 100, pointerId: 1 });
  fireEvent.pointerMove(canvas, { clientX: 120, clientY: 100, pointerId: 1 });
  fireEvent.pointerMove(canvas, { clientX: 200, clientY: 100, pointerId: 1 });
  fireEvent.pointerUp(canvas, { clientX: 200, clientY: 100, pointerId: 1 });
  expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({ score: expect.any(Number) }));
  expect(screen.getByText(/Hoàn thành/)).toBeInTheDocument();
});
```

- [ ] **Step 2: Implement** (full code):

`strokes.css`:
```css
.stroke-anim { stroke: var(--app-text); fill: none; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 400; stroke-dashoffset: 400; animation: stroke-draw 0.7s ease forwards; }
@keyframes stroke-draw { to { stroke-dashoffset: 0; } }
.stroke-guide { stroke: #C8B6FF; fill: none; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; opacity: .45; }
.stroke-hint { stroke: #FF6F91; fill: none; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 4 6; }
.shake { animation: shake .3s; }
@keyframes shake { 25% { transform: translateX(-4px);} 75% { transform: translateX(4px);} }
```

`StrokeAnimation.tsx`:
```tsx
import './strokes.css';

export function StrokeAnimation({ paths, size = 160, playKey = 0, showNumbers = true }: { paths: string[]; size?: number; playKey?: number; showNumbers?: boolean }) {
  return (
    <svg key={playKey} viewBox="0 0 109 109" width={size} height={size} className="rounded-2xl bg-cream dark:bg-bg" aria-label="Thứ tự nét">
      <g stroke="#FFB7C5" strokeWidth="0.8" strokeDasharray="3 3"><line x1="54.5" y1="0" x2="54.5" y2="109" /><line x1="0" y1="54.5" x2="109" y2="54.5" /></g>
      {paths.map((d, i) => (
        <path key={i} d={d} className="stroke-anim" style={{ animationDelay: `${i * 0.75}s` }} />
      ))}
      {showNumbers && paths.map((d, i) => {
        const m = d.match(/^M\s*(-?[\d.]+)[ ,](-?[\d.]+)/);
        return m ? <text key={i} x={Number(m[1]) - 4} y={Number(m[2]) - 2} fontSize="7" fill="#FF6F91" fontWeight="700">{i + 1}</text> : null;
      })}
    </svg>
  );
}
```

`DrawCanvas.tsx`:
```tsx
import { useRef, useState, type PointerEvent } from 'react';
import type { Point } from '@nihongo/shared';
import './strokes.css';

interface Props { size?: number; guide?: string[]; guideUpTo?: number; hint?: string; onStroke: (pts: Point[]) => void; strokes?: Point[][]; shaking?: boolean }

export function DrawCanvas({ size = 218, guide = [], guideUpTo, hint, onStroke, strokes = [], shaking = false }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const [cur, setCur] = useState<Point[]>([]);
  const toLocal = (e: PointerEvent): Point => {
    const r = ref.current!.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * 109, y: ((e.clientY - r.top) / r.height) * 109 };
  };
  const toD = (pts: Point[]) => pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const shown = guideUpTo === undefined ? guide : guide.slice(0, guideUpTo);
  return (
    <svg
      ref={ref} data-testid="draw-canvas" viewBox="0 0 109 109" width={size} height={size}
      className={`touch-none rounded-2xl bg-cream ring-2 ring-sakura/60 dark:bg-bg ${shaking ? 'shake' : ''}`}
      onPointerDown={(e) => { (e.target as Element).setPointerCapture?.(e.pointerId); setCur([toLocal(e)]); }}
      onPointerMove={(e) => { if (cur.length) setCur((c) => [...c, toLocal(e)]); }}
      onPointerUp={() => { if (cur.length > 1) onStroke(cur); setCur([]); }}
      onPointerLeave={() => { if (cur.length > 1) onStroke(cur); setCur([]); }}
    >
      <g stroke="#FFB7C5" strokeWidth="0.8" strokeDasharray="3 3"><line x1="54.5" y1="0" x2="54.5" y2="109" /><line x1="0" y1="54.5" x2="109" y2="54.5" /></g>
      {shown.map((d, i) => <path key={i} d={d} className="stroke-guide" />)}
      {hint && <path d={hint} className="stroke-hint" />}
      {strokes.map((s, i) => <path key={i} d={toD(s)} fill="none" stroke="var(--app-text)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />)}
      {cur.length > 1 && <path d={toD(cur)} fill="none" stroke="#FF6F91" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}
```

`WritingPractice.tsx`:
```tsx
import { useMemo, useState } from 'react';
import { pathToPoints, scoreStroke, type Point } from '@nihongo/shared';
import { DrawCanvas } from './DrawCanvas';
import { Mascot, type Mood } from './Mascot';

const PASS = 0.55;

export function WritingPractice({ paths, label, onComplete }: { paths: string[]; label: string; onComplete?: (r: { score: number }) => void }) {
  const refs = useMemo(() => paths.map((d) => pathToPoints(d)), [paths]);
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState<Point[][]>([]);
  const [scores, setScores] = useState<number[]>([]);
  const [fails, setFails] = useState(0);
  const [shake, setShake] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const finished = idx >= paths.length;
  const avg = scores.length ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100) : 0;

  const handle = (pts: Point[]) => {
    if (finished) return;
    const { score } = scoreStroke(pts, refs[idx]!);
    if (score >= PASS) {
      const ns = [...scores, score];
      setScores(ns); setDone([...done, pts]); setFails(0);
      const next = idx + 1;
      setIdx(next);
      if (next >= paths.length) onComplete?.({ score: Math.round((ns.reduce((a, b) => a + b, 0) / ns.length) * 100) });
    } else {
      setFails((f) => f + 1); setShake(true); setTimeout(() => setShake(false), 300);
    }
  };
  const reset = () => { setIdx(0); setDone([]); setScores([]); setFails(0); };
  const mood: Mood = finished ? (avg >= 80 ? 'happy' : 'neutral') : fails >= 2 ? 'sad' : 'neutral';

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-4">
        <span className="text-5xl font-black">{label}</span>
        <Mascot mood={mood} size={70} />
      </div>
      <p className="text-sm font-bold text-muted">{finished ? `Hoàn thành! Điểm: ${avg}` : `Nét ${idx + 1} / ${paths.length}`}</p>
      <DrawCanvas guide={showGuide ? paths : []} guideUpTo={showGuide ? undefined : 0} hint={fails >= 1 && !finished ? paths[idx] : undefined} onStroke={handle} strokes={done} shaking={shake} />
      <div className="flex gap-2">
        <button type="button" className="btn-soft text-sm" onClick={() => setShowGuide((g) => !g)}>{showGuide ? 'Ẩn mẫu' : 'Hiện mẫu'}</button>
        <button type="button" className="btn-soft text-sm" onClick={reset}>Vẽ lại</button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Tests + typecheck PASS. Commit** `feat(client): stroke animation, drawing canvas and writing practice`.

---

### Task 6: Kana page (chart, recognition quiz, writing)

**Files:**
- Create: `client/src/pages/kana/KanaPage.tsx`, `client/src/pages/kana/KanaChart.tsx`, `client/src/pages/kana/KanaQuiz.tsx`, `client/src/pages/kana/KanaWrite.tsx`, `client/src/components/Segmented.tsx`, `client/src/components/QuizChoice.tsx`, `client/src/components/LoadingCat.tsx`
- Modify: `client/src/App.tsx` (route `/kana` → `<KanaPage/>`)
- Test: `client/src/pages/kana/KanaQuiz.test.tsx`, `client/src/components/QuizChoice.test.tsx`

**Interfaces:**
- `Segmented<T extends string>({ value, onChange, options: { value: T; label: string }[] })`
- `QuizChoice({ prompt: ReactNode; choices: string[]; answer: number; onAnswer(correct: boolean): void; explain?: string })` – shows 4 buttons; after click colours correct/incorrect, shows "Tiếp" button that calls `onAnswer`.
- `LoadingCat({ text? })` – mascot sleepy + text.
- `KanaQuiz({ chars: KanaChar[]; onFinish(result: { correct: number; total: number }): void; total?: number; mode: 'kana→romaji' | 'romaji→kana' })` – builds `total` (default 10) questions via `makeChoices`; awards XP `+2` per correct via `useProgress().addXp`.
- `KanaChart({ chars: KanaChar[]; onPick(k: KanaChar): void })` – groups rows; clicking opens detail panel (big char, romaji, mnemonic, StrokeAnimation with replay, 🔊 `speak`).
- `KanaWrite({ chars: KanaChar[] })` – select a char (only with `strokePaths.length`), then `WritingPractice`; "Tiếp theo" picks the next char.
- `KanaPage` – loads `useKana()`, script toggle (hiragana/katakana), group filter (basic/dakuten/yoon), tab (chart/quiz/write).

- [ ] **Step 1: Failing tests**

`QuizChoice.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { QuizChoice } from './QuizChoice';

it('marks the answer and reports correctness on continue', () => {
  const onAnswer = vi.fn();
  render(<QuizChoice prompt="あ" choices={['a', 'i', 'u', 'e']} answer={0} onAnswer={onAnswer} />);
  fireEvent.click(screen.getByRole('button', { name: 'i' }));
  expect(screen.getByRole('button', { name: 'a' })).toHaveAttribute('data-state', 'correct');
  expect(screen.getByRole('button', { name: 'i' })).toHaveAttribute('data-state', 'wrong');
  fireEvent.click(screen.getByRole('button', { name: /Tiếp/ }));
  expect(onAnswer).toHaveBeenCalledWith(false);
});
```

`KanaQuiz.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { KanaQuiz } from './KanaQuiz';
import { useProgress } from '../../store/progress';

const chars = [
  { kana: 'あ', romaji: 'a', row: 'a', group: 'basic' as const, strokePaths: [] },
  { kana: 'い', romaji: 'i', row: 'a', group: 'basic' as const, strokePaths: [] },
  { kana: 'う', romaji: 'u', row: 'a', group: 'basic' as const, strokePaths: [] },
  { kana: 'え', romaji: 'e', row: 'a', group: 'basic' as const, strokePaths: [] },
];

it('runs through the questions and reports the score', () => {
  useProgress.setState({ xp: 0, streak: 0, lastStudyDay: null });
  const onFinish = vi.fn();
  render(<KanaQuiz chars={chars} total={2} mode="kana→romaji" onFinish={onFinish} />);
  for (let q = 0; q < 2; q++) {
    const prompt = screen.getByTestId('quiz-prompt').textContent!;
    const answer = chars.find((c) => c.kana === prompt)!.romaji;
    fireEvent.click(screen.getByRole('button', { name: answer }));
    fireEvent.click(screen.getByRole('button', { name: /Tiếp/ }));
  }
  expect(onFinish).toHaveBeenCalledWith({ correct: 2, total: 2 });
  expect(useProgress.getState().xp).toBe(4);
});
```

- [ ] **Step 2: Implement all components and page** (Vietnamese labels: "Bảng chữ", "Nhận diện", "Luyện viết", "Hiragana", "Katakana", "Cơ bản", "Dakuten", "Yōon", "Nghe", "Phát lại", "Tiếp", "Kết quả", "Làm lại"). Quiz result screen shows Mascot happy if ≥ 80 %, else neutral, with `{correct}/{total}` and buttons "Làm lại" / "Về bảng chữ".

- [ ] **Step 3: Tests + typecheck PASS; verify in preview** (`/kana`): chart renders 46 basic hiragana; click あ shows detail with stroke animation; quiz works end-to-end; writing practice accepts a stroke with mouse.

- [ ] **Step 4: Commit** `feat(client): kana module with chart, quiz and writing practice`.
