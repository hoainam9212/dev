# Phase 1 – Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the Nihongo Sensei monorepo with tested shared algorithms (SM-2 SRS, kana utilities, scoring), an anime-themed React PWA shell with navigation, the Sakura mascot, and a working home page.

**Architecture:** npm workspaces monorepo. `shared` is pure TypeScript (no DOM) consumed by `client` and later `server`/`data`. `client` is Vite + React + Tailwind v4 with a `:root` token theme, an app shell (sidebar on desktop, bottom nav on mobile), and a Zustand store for XP/streak persisted to localStorage (IndexedDB sync arrives in Phase 5).

**Tech Stack:** Node 20, TypeScript 5 strict, Vitest, React 18, Vite 5, Tailwind CSS 4 (`@tailwindcss/vite`), react-router-dom 6, Zustand 4, Google Fonts (Zen Maru Gothic).

**Spec:** `docs/superpowers/specs/2026-09-19-nihongo-sensei-design.md`

## Global Constraints

- UI language: Vietnamese. Japanese text in Japanese. Dataset meanings stay English.
- Palette tokens exactly: sakura `#FFB7C5`, hồng đậm `#FF6F91`, xanh trời `#A0E7FF`, kem `#FFF8F0`, tím pastel `#C8B6FF`, dark background `#1E1B2E`. Defined on `:root`, overridden in dark mode.
- Font: Zen Maru Gothic via Google Fonts, system fallback.
- Mobile-first; bottom nav < 768px, sidebar ≥ 768px. Respect `prefers-reduced-motion`.
- No external UI kit. All components hand-written.
- TypeScript `strict: true` everywhere. Tests with Vitest.
- Commit after every task with message prefix `feat:`, `test:`, `chore:` or `docs:`.
- Work in repo root `nihongo-sensei/` (already a git repo with the spec committed).

---

### Task 1: Monorepo scaffold + `shared` package with SM-2 SRS

**Files:**
- Create: `package.json`, `.gitignore`, `tsconfig.base.json`
- Create: `shared/package.json`, `shared/tsconfig.json`, `shared/vitest.config.ts`
- Create: `shared/src/types.ts`, `shared/src/srs.ts`, `shared/src/index.ts`
- Test: `shared/src/srs.test.ts`

**Interfaces:**
- Produces: `Level`, `Vocab`, `Kanji`, `Grammar`, `Sentence`, `Question`, `ReadingLesson`, `ListeningLesson`, `BusinessTopic`, `BusinessItem`, `ItemType`, `ProgressItem` (types.ts); `Grade`, `SrsState`, `newState(now: Date): SrsState`, `review(state: SrsState, grade: Grade, now: Date): SrsState`, `isDue(state: SrsState, now: Date): boolean`, `buildQueue(items: {id: string; state?: SrsState}[], now: Date, opts?: {newLimit?: number}): string[]` (srs.ts).

- [ ] **Step 1: Root files**

`package.json`:
```json
{
  "name": "nihongo-sensei",
  "private": true,
  "workspaces": ["shared", "data", "client", "server"],
  "scripts": {
    "test": "npm run test --workspaces --if-present",
    "typecheck": "npm run typecheck --workspaces --if-present"
  }
}
```

`.gitignore`:
```
node_modules/
dist/
data/raw/
client/public/content/
*.db
.DS_Store
```

`tsconfig.base.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noUncheckedIndexedAccess": true,
    "resolveJsonModule": true
  }
}
```

- [ ] **Step 2: shared package files**

`shared/package.json`:
```json
{
  "name": "@nihongo/shared",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "src/index.ts",
  "types": "src/index.ts",
  "exports": { ".": "./src/index.ts" },
  "scripts": {
    "test": "vitest run",
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "vitest": "^2.1.0"
  }
}
```

`shared/tsconfig.json`:
```json
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": { "lib": ["ES2022"], "types": ["vitest/globals"] },
  "include": ["src"]
}
```

`shared/vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { globals: true } });
```

`shared/src/types.ts`:
```ts
export type Level = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
export const LEVELS: Level[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

export interface Vocab {
  id: string; level: Level; word: string; reading: string;
  meanings: string[]; tags: string[]; kanji: string[]; sentenceIds: string[];
}
export interface Kanji {
  id: string; char: string; level: Level; strokes: number;
  meanings: string[]; on: string[]; kun: string[]; grade?: number; freq?: number;
  strokePaths: string[]; vocabIds: string[];
}
export interface GrammarExample { ja: string; romaji: string; en: string }
export interface Grammar {
  id: string; level: Level; title: string; meaning: string; formation: string;
  examples: GrammarExample[];
}
export interface Sentence { id: string; level: Level; ja: string; en: string }
export interface Question {
  id: string; prompt: string; choices: string[]; answer: number; explain?: string;
}
export interface ReadingLesson {
  id: string; level: Level; title: string; body: string;
  vocab: { word: string; reading: string; vi: string }[]; questions: Question[];
}
export interface ListeningLine { speaker: string; ja: string; vi: string }
export interface ListeningLesson {
  id: string; level: Level; title: string; script: ListeningLine[];
  questions: Question[]; dictation: string[];
}
export type BusinessCategory = 'keigo' | 'email' | 'phone' | 'meeting' | 'meishi' | 'interview' | 'daily';
export interface BusinessItem {
  id: string; ja: string; reading: string; vi: string; note?: string;
  category: BusinessCategory;
  keigo?: { sonkei?: string; kenjou?: string; teinei?: string };
}
export interface BusinessTopic { id: string; title: string; intro: string; items: BusinessItem[] }

export type ItemType = 'vocab' | 'kanji' | 'grammar';
export interface ProgressItem {
  itemId: string; type: ItemType;
  ease: number; interval: number; due: string; reps: number; lapses: number;
  updatedAt: string;
}
```

`shared/src/index.ts`:
```ts
export * from './types';
export * from './srs';
```

- [ ] **Step 3: Write the failing SRS test**

`shared/src/srs.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { newState, review, isDue, buildQueue, type SrsState } from './srs';

const T0 = new Date('2026-09-19T08:00:00.000Z');
const days = (n: number) => new Date(T0.getTime() + n * 86_400_000);

describe('newState', () => {
  it('starts with ease 2.5, interval 0, due now', () => {
    const s = newState(T0);
    expect(s).toEqual({ ease: 2.5, interval: 0, due: T0.toISOString(), reps: 0, lapses: 0 });
  });
});

describe('review', () => {
  it('good on a new card schedules 1 day', () => {
    const s = review(newState(T0), 2, T0);
    expect(s.interval).toBe(1);
    expect(s.reps).toBe(1);
    expect(s.due).toBe(days(1).toISOString());
  });
  it('second good schedules 3 days, third uses ease', () => {
    let s = review(newState(T0), 2, T0);
    s = review(s, 2, days(1));
    expect(s.interval).toBe(3);
    s = review(s, 2, days(4));
    expect(s.interval).toBe(Math.round(3 * 2.5));
  });
  it('easy on a new card schedules 4 days and raises ease', () => {
    const s = review(newState(T0), 3, T0);
    expect(s.interval).toBe(4);
    expect(s.ease).toBeCloseTo(2.65);
  });
  it('hard grows interval slowly and lowers ease', () => {
    let s = review(newState(T0), 2, T0);
    s = review(s, 2, days(1)); // interval 3
    s = review(s, 1, days(4));
    expect(s.interval).toBe(Math.max(1, Math.round(3 * 1.2)));
    expect(s.ease).toBeCloseTo(2.35);
  });
  it('forget resets interval, counts a lapse, due in 10 minutes, ease floor 1.3', () => {
    let s: SrsState = { ease: 1.35, interval: 30, due: T0.toISOString(), reps: 5, lapses: 0 };
    s = review(s, 0, T0);
    expect(s.interval).toBe(0);
    expect(s.reps).toBe(0);
    expect(s.lapses).toBe(1);
    expect(s.ease).toBe(1.3);
    expect(s.due).toBe(new Date(T0.getTime() + 10 * 60_000).toISOString());
  });
});

describe('isDue', () => {
  it('is due when due <= now', () => {
    const s = review(newState(T0), 2, T0);
    expect(isDue(s, T0)).toBe(false);
    expect(isDue(s, days(1))).toBe(true);
  });
});

describe('buildQueue', () => {
  it('puts due items first then up to newLimit new items', () => {
    const due = review(newState(T0), 2, T0);
    const items = [
      { id: 'a' },
      { id: 'b', state: due },
      { id: 'c' },
      { id: 'd', state: review(newState(T0), 3, T0) },
    ];
    expect(buildQueue(items, days(1), { newLimit: 1 })).toEqual(['b', 'a']);
    expect(buildQueue(items, days(5), { newLimit: 5 })).toEqual(['b', 'd', 'a', 'c']);
  });
});
```

- [ ] **Step 4: Install and run to verify failure**

Run (from repo root):
```bash
npm install
npm test -w shared
```
Expected: FAIL – cannot resolve `./srs`.

- [ ] **Step 5: Implement srs.ts**

`shared/src/srs.ts`:
```ts
export type Grade = 0 | 1 | 2 | 3; // 0 quên, 1 khó, 2 tốt, 3 dễ

export interface SrsState {
  ease: number;
  interval: number; // days
  due: string; // ISO
  reps: number;
  lapses: number;
}

const DAY = 86_400_000;
const MIN_EASE = 1.3;

export function newState(now: Date): SrsState {
  return { ease: 2.5, interval: 0, due: now.toISOString(), reps: 0, lapses: 0 };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function review(state: SrsState, grade: Grade, now: Date): SrsState {
  let { ease, interval, reps, lapses } = state;
  let dueMs: number;

  if (grade === 0) {
    lapses += 1;
    reps = 0;
    interval = 0;
    ease = Math.max(MIN_EASE, round2(ease - 0.2));
    dueMs = now.getTime() + 10 * 60_000;
    return { ease, interval, due: new Date(dueMs).toISOString(), reps, lapses };
  }

  if (grade === 1) {
    interval = reps === 0 ? 1 : Math.max(1, Math.round(interval * 1.2));
    ease = Math.max(MIN_EASE, round2(ease - 0.15));
  } else if (grade === 2) {
    if (reps === 0) interval = 1;
    else if (reps === 1) interval = 3;
    else interval = Math.max(interval + 1, Math.round(interval * ease));
  } else {
    interval = reps === 0 ? 4 : Math.max(interval + 1, Math.round(interval * ease * 1.3));
    ease = round2(ease + 0.15);
  }
  reps += 1;
  dueMs = now.getTime() + interval * DAY;
  return { ease, interval, due: new Date(dueMs).toISOString(), reps, lapses };
}

export function isDue(state: SrsState, now: Date): boolean {
  return new Date(state.due).getTime() <= now.getTime();
}

export interface QueueItem { id: string; state?: SrsState }

export function buildQueue(
  items: QueueItem[],
  now: Date,
  opts: { newLimit?: number } = {},
): string[] {
  const newLimit = opts.newLimit ?? 20;
  const due = items
    .filter((i) => i.state && isDue(i.state, now))
    .sort((a, b) => new Date(a.state!.due).getTime() - new Date(b.state!.due).getTime())
    .map((i) => i.id);
  const fresh = items.filter((i) => !i.state).slice(0, newLimit).map((i) => i.id);
  return [...due, ...fresh];
}
```

- [ ] **Step 6: Run tests and typecheck**

```bash
npm test -w shared
npm run typecheck -w shared
```
Expected: all PASS, no type errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(shared): monorepo scaffold, content types and SM-2 SRS"
```

---

### Task 2: Kana utilities (`shared/src/kana.ts`)

**Files:**
- Create: `shared/src/kana.ts`
- Modify: `shared/src/index.ts` (add `export * from './kana';`)
- Test: `shared/src/kana.test.ts`

**Interfaces:**
- Produces: `toHiragana(s: string): string` (katakana → hiragana, other chars unchanged), `toKatakana(s: string): string`, `romajiToHiragana(romaji: string): string`, `normalizeKana(s: string): string` (NFKC, romaji→kana, katakana→hiragana, strip spaces & punctuation, long vowel mark kept), `isKana(s: string): boolean`, `hasKanji(s: string): boolean`.

- [ ] **Step 1: Write the failing test**

`shared/src/kana.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { toHiragana, toKatakana, romajiToHiragana, normalizeKana, isKana, hasKanji } from './kana';

describe('toHiragana / toKatakana', () => {
  it('converts scripts and leaves other chars', () => {
    expect(toHiragana('カタカナ 漢字')).toBe('かたかな 漢字');
    expect(toKatakana('ひらがな')).toBe('ヒラガナ');
    expect(toHiragana('ー')).toBe('ー');
  });
});

describe('romajiToHiragana', () => {
  it('converts simple syllables', () => {
    expect(romajiToHiragana('konnichiha')).toBe('こんにちは');
    expect(romajiToHiragana('arigatou')).toBe('ありがとう');
  });
  it('handles sokuon, n, and yōon', () => {
    expect(romajiToHiragana('gakkou')).toBe('がっこう');
    expect(romajiToHiragana('kyou')).toBe('きょう');
    expect(romajiToHiragana('shinbun')).toBe('しんぶん');
    expect(romajiToHiragana('kinen')).toBe('きねん');
    expect(romajiToHiragana("kin'en")).toBe('きんえん');
    expect(romajiToHiragana('hon')).toBe('ほん');
    expect(romajiToHiragana('tsu')).toBe('つ');
    expect(romajiToHiragana('ja')).toBe('じゃ');
    expect(romajiToHiragana('cha')).toBe('ちゃ');
  });
  it('keeps unknown characters', () => {
    expect(romajiToHiragana('a-b')).toBe('あ-b');
  });
});

describe('normalizeKana', () => {
  it('normalizes katakana, romaji, spaces and width', () => {
    expect(normalizeKana('トウキョウ')).toBe('とうきょう');
    expect(normalizeKana('toukyou')).toBe('とうきょう');
    expect(normalizeKana('とう きょう。')).toBe('とうきょう');
    expect(normalizeKana('ｶﾀｶﾅ')).toBe('かたかな');
  });
  it('is case-insensitive for romaji', () => {
    expect(normalizeKana('Sakura')).toBe('さくら');
  });
});

describe('isKana / hasKanji', () => {
  it('detects scripts', () => {
    expect(isKana('さくら')).toBe(true);
    expect(isKana('サクラー')).toBe(true);
    expect(isKana('桜')).toBe(false);
    expect(hasKanji('桜が咲く')).toBe(true);
    expect(hasKanji('さくら')).toBe(false);
  });
});
```

- [ ] **Step 2: Run to verify failure**

```bash
npm test -w shared
```
Expected: FAIL – cannot resolve `./kana`.

- [ ] **Step 3: Implement kana.ts**

`shared/src/kana.ts`:
```ts
const ROMAJI: Record<string, string> = {
  a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お',
  ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ',
  sa: 'さ', shi: 'し', si: 'し', su: 'す', se: 'せ', so: 'そ',
  ta: 'た', chi: 'ち', ti: 'ち', tsu: 'つ', tu: 'つ', te: 'て', to: 'と',
  na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の',
  ha: 'は', hi: 'ひ', fu: 'ふ', hu: 'ふ', he: 'へ', ho: 'ほ',
  ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も',
  ya: 'や', yu: 'ゆ', yo: 'よ',
  ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ',
  wa: 'わ', wo: 'を', n: 'ん', nn: 'ん',
  ga: 'が', gi: 'ぎ', gu: 'ぐ', ge: 'げ', go: 'ご',
  za: 'ざ', ji: 'じ', zi: 'じ', zu: 'ず', ze: 'ぜ', zo: 'ぞ',
  da: 'だ', di: 'ぢ', du: 'づ', de: 'で', do: 'ど',
  ba: 'ば', bi: 'び', bu: 'ぶ', be: 'べ', bo: 'ぼ',
  pa: 'ぱ', pi: 'ぴ', pu: 'ぷ', pe: 'ぺ', po: 'ぽ',
  kya: 'きゃ', kyu: 'きゅ', kyo: 'きょ',
  sha: 'しゃ', shu: 'しゅ', sho: 'しょ', sya: 'しゃ', syu: 'しゅ', syo: 'しょ',
  cha: 'ちゃ', chu: 'ちゅ', cho: 'ちょ', tya: 'ちゃ', tyu: 'ちゅ', tyo: 'ちょ',
  nya: 'にゃ', nyu: 'にゅ', nyo: 'にょ',
  hya: 'ひゃ', hyu: 'ひゅ', hyo: 'ひょ',
  mya: 'みゃ', myu: 'みゅ', myo: 'みょ',
  rya: 'りゃ', ryu: 'りゅ', ryo: 'りょ',
  gya: 'ぎゃ', gyu: 'ぎゅ', gyo: 'ぎょ',
  ja: 'じゃ', ju: 'じゅ', jo: 'じょ', jya: 'じゃ', jyu: 'じゅ', jyo: 'じょ',
  bya: 'びゃ', byu: 'びゅ', byo: 'びょ',
  pya: 'ぴゃ', pyu: 'ぴゅ', pyo: 'ぴょ',
  fa: 'ふぁ', fi: 'ふぃ', fe: 'ふぇ', fo: 'ふぉ',
  va: 'ゔぁ', vi: 'ゔぃ', vu: 'ゔ', ve: 'ゔぇ', vo: 'ゔぉ',
  ti_: 'てぃ', di_: 'でぃ', // not reachable; kept for clarity
  '-': 'ー',
};
delete ROMAJI['ti_'];
delete ROMAJI['di_'];

const VOWELS = new Set(['a', 'i', 'u', 'e', 'o']);
const CONSONANTS = 'bcdfghjklmnpqrstvwxyz';

export function toHiragana(s: string): string {
  let out = '';
  for (const ch of s) {
    const c = ch.codePointAt(0)!;
    // Katakana ァ(30A1)..ヶ(30F6) -> Hiragana ぁ(3041)..ゖ(3096)
    if (c >= 0x30a1 && c <= 0x30f6) out += String.fromCodePoint(c - 0x60);
    else out += ch;
  }
  return out;
}

export function toKatakana(s: string): string {
  let out = '';
  for (const ch of s) {
    const c = ch.codePointAt(0)!;
    if (c >= 0x3041 && c <= 0x3096) out += String.fromCodePoint(c + 0x60);
    else out += ch;
  }
  return out;
}

export function romajiToHiragana(input: string): string {
  const s = input.toLowerCase();
  let out = '';
  let i = 0;
  while (i < s.length) {
    const c = s[i]!;
    const next = s[i + 1];

    // apostrophe separates n from a vowel: kin'en
    if (c === "'") { i += 1; continue; }

    // sokuon: doubled consonant (not n, not vowel), e.g. kk, tt, pp, ss, tch
    if (
      CONSONANTS.includes(c) && c !== 'n' && next === c
    ) {
      out += 'っ';
      i += 1;
      continue;
    }
    if (c === 't' && next === 'c' && s[i + 2] === 'h') {
      out += 'っ';
      i += 1;
      continue;
    }

    // syllabic n: "n" followed by consonant (not y) or end, or "nn"
    if (c === 'n') {
      if (next === 'n') { out += 'ん'; i += 2; continue; }
      if (next === undefined || (!VOWELS.has(next) && next !== 'y')) { out += 'ん'; i += 1; continue; }
    }

    // longest match 3,2,1
    let matched = false;
    for (const len of [3, 2, 1]) {
      const piece = s.slice(i, i + len);
      const kana = ROMAJI[piece];
      if (kana !== undefined && piece.length === len) {
        out += kana;
        i += len;
        matched = true;
        break;
      }
    }
    if (!matched) {
      out += c;
      i += 1;
    }
  }
  return out;
}

const STRIP = /[\s　。、．，,.!?！？「」『』（）()\-–—~〜・…:;"'“”‘’]/g;

export function normalizeKana(s: string): string {
  let t = s.normalize('NFKC');
  t = t.replace(STRIP, (m) => (m === 'ー' ? m : ''));
  t = toHiragana(t);
  if (/[a-zA-Z]/.test(t)) t = romajiToHiragana(t);
  return t;
}

export function isKana(s: string): boolean {
  return s.length > 0 && /^[ぁ-ゖァ-ヶー]+$/.test(s);
}

export function hasKanji(s: string): boolean {
  return /[一-龯㐀-䶿]/.test(s);
}
```

Update `shared/src/index.ts`:
```ts
export * from './types';
export * from './srs';
export * from './kana';
```

- [ ] **Step 4: Run tests and typecheck**

```bash
npm test -w shared
npm run typecheck -w shared
```
Expected: PASS. If `kinen` yields `きんえん`, the n-rule is wrong: `n` before a vowel must NOT become ん (it forms `ne`). If `hon` fails, the end-of-string rule is missing.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(shared): kana conversion and normalization utilities"
```

---

### Task 3: Scoring utilities (`shared/src/scoring.ts`)

**Files:**
- Create: `shared/src/scoring.ts`
- Modify: `shared/src/index.ts` (add `export * from './scoring';`)
- Test: `shared/src/scoring.test.ts`

**Interfaces:**
- Produces: `levenshtein(a: string, b: string): number`, `similarity(a: string, b: string): number` (0..1), `pronunciationScore(expected: string, heard: string): number` (0..100 integer, both normalized via `normalizeKana`), `Point = { x: number; y: number }`, `resample(points: Point[], n: number): Point[]`, `scoreStroke(user: Point[], ref: Point[], opts?: { size?: number }): { score: number; reversed: boolean }` (score 0..1; `size` is canvas size, default 109 like KanjiVG), `diffChars(expected: string, actual: string): { ch: string; ok: boolean }[]` (per-char of expected: ok when present at LCS alignment).

- [ ] **Step 1: Write the failing test**

`shared/src/scoring.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { levenshtein, similarity, pronunciationScore, resample, scoreStroke, diffChars } from './scoring';

describe('levenshtein / similarity', () => {
  it('computes edit distance', () => {
    expect(levenshtein('kitten', 'sitting')).toBe(3);
    expect(levenshtein('', 'abc')).toBe(3);
    expect(levenshtein('さくら', 'さくら')).toBe(0);
  });
  it('similarity is 1 for equal, 0 for totally different', () => {
    expect(similarity('abc', 'abc')).toBe(1);
    expect(similarity('abc', 'xyz')).toBe(0);
    expect(similarity('', '')).toBe(1);
  });
});

describe('pronunciationScore', () => {
  it('normalizes scripts before comparing', () => {
    expect(pronunciationScore('おはようございます', 'オハヨウゴザイマス')).toBe(100);
    expect(pronunciationScore('おはよう', 'ohayou')).toBe(100);
  });
  it('penalizes differences proportionally', () => {
    const s = pronunciationScore('こんにちは', 'こんにちわ');
    expect(s).toBeGreaterThan(70);
    expect(s).toBeLessThan(100);
    expect(pronunciationScore('こんにちは', '')).toBe(0);
  });
});

describe('resample', () => {
  it('returns n evenly spaced points along the polyline', () => {
    const pts = resample([{ x: 0, y: 0 }, { x: 10, y: 0 }], 3);
    expect(pts).toHaveLength(3);
    expect(pts[1]!.x).toBeCloseTo(5);
    expect(pts[2]!.x).toBeCloseTo(10);
  });
  it('handles a single point', () => {
    expect(resample([{ x: 3, y: 3 }], 4)).toHaveLength(4);
  });
});

describe('scoreStroke', () => {
  const ref = [{ x: 10, y: 50 }, { x: 100, y: 50 }]; // horizontal stroke L->R
  it('scores an accurate stroke near 1', () => {
    const { score, reversed } = scoreStroke([{ x: 12, y: 52 }, { x: 60, y: 51 }, { x: 98, y: 49 }], ref);
    expect(score).toBeGreaterThan(0.85);
    expect(reversed).toBe(false);
  });
  it('flags a reversed stroke', () => {
    const { score, reversed } = scoreStroke([{ x: 100, y: 50 }, { x: 10, y: 50 }], ref);
    expect(reversed).toBe(true);
    expect(score).toBeLessThan(0.6);
  });
  it('scores a far-off stroke low', () => {
    const { score } = scoreStroke([{ x: 10, y: 10 }, { x: 20, y: 100 }], ref);
    expect(score).toBeLessThan(0.5);
  });
});

describe('diffChars', () => {
  it('marks matching characters ok', () => {
    expect(diffChars('さくら', 'さくら').every((d) => d.ok)).toBe(true);
    const d = diffChars('さくら', 'さら');
    expect(d.map((x) => x.ok)).toEqual([true, false, true]);
  });
});
```

- [ ] **Step 2: Run to verify failure**

```bash
npm test -w shared
```
Expected: FAIL – cannot resolve `./scoring`.

- [ ] **Step 3: Implement scoring.ts**

`shared/src/scoring.ts`:
```ts
import { normalizeKana } from './kana';

export function levenshtein(a: string, b: string): number {
  const A = [...a];
  const B = [...b];
  if (A.length === 0) return B.length;
  if (B.length === 0) return A.length;
  let prev = new Array<number>(B.length + 1);
  let cur = new Array<number>(B.length + 1);
  for (let j = 0; j <= B.length; j++) prev[j] = j;
  for (let i = 1; i <= A.length; i++) {
    cur[0] = i;
    for (let j = 1; j <= B.length; j++) {
      const cost = A[i - 1] === B[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j]! + 1, cur[j - 1]! + 1, prev[j - 1]! + cost);
    }
    [prev, cur] = [cur, prev];
  }
  return prev[B.length]!;
}

export function similarity(a: string, b: string): number {
  const len = Math.max([...a].length, [...b].length);
  if (len === 0) return 1;
  return 1 - levenshtein(a, b) / len;
}

export function pronunciationScore(expected: string, heard: string): number {
  const e = normalizeKana(expected);
  const h = normalizeKana(heard);
  if (e.length === 0) return 100;
  return Math.round(Math.max(0, similarity(e, h)) * 100);
}

export interface Point { x: number; y: number }

function dist(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function resample(points: Point[], n: number): Point[] {
  if (points.length === 0) return [];
  if (points.length === 1) return Array.from({ length: n }, () => ({ ...points[0]! }));
  let total = 0;
  for (let i = 1; i < points.length; i++) total += dist(points[i - 1]!, points[i]!);
  if (total === 0) return Array.from({ length: n }, () => ({ ...points[0]! }));
  const step = total / (n - 1);
  const out: Point[] = [{ ...points[0]! }];
  let acc = 0;
  let i = 1;
  let prev = points[0]!;
  while (out.length < n - 1 && i < points.length) {
    const cur = points[i]!;
    const d = dist(prev, cur);
    if (acc + d >= step) {
      const t = (step - acc) / d;
      const p = { x: prev.x + (cur.x - prev.x) * t, y: prev.y + (cur.y - prev.y) * t };
      out.push(p);
      prev = p;
      acc = 0;
    } else {
      acc += d;
      prev = cur;
      i += 1;
    }
  }
  while (out.length < n) out.push({ ...points[points.length - 1]! });
  return out;
}

export function scoreStroke(
  user: Point[],
  ref: Point[],
  opts: { size?: number } = {},
): { score: number; reversed: boolean } {
  const size = opts.size ?? 109;
  if (user.length === 0 || ref.length === 0) return { score: 0, reversed: false };
  const N = 32;
  const u = resample(user, N);
  const r = resample(ref, N);
  const rRev = [...r].reverse();
  const mean = (a: Point[], b: Point[]) =>
    a.reduce((s, p, i) => s + dist(p, b[i]!), 0) / N;
  const forward = mean(u, r);
  const backward = mean(u, rRev);
  const reversed = backward < forward;
  // tolerance: ~18% of canvas size gives zero score; scale linearly
  const tol = size * 0.18;
  const score = Math.max(0, Math.min(1, 1 - forward / tol));
  return { score: reversed ? Math.min(score, 0.4) : score, reversed };
}

export function diffChars(expected: string, actual: string): { ch: string; ok: boolean }[] {
  const E = [...expected];
  const A = [...actual];
  // LCS table
  const dp: number[][] = Array.from({ length: E.length + 1 }, () => new Array<number>(A.length + 1).fill(0));
  for (let i = E.length - 1; i >= 0; i--)
    for (let j = A.length - 1; j >= 0; j--)
      dp[i]![j] = E[i] === A[j] ? dp[i + 1]![j + 1]! + 1 : Math.max(dp[i + 1]![j]!, dp[i]![j + 1]!);
  const ok = new Array<boolean>(E.length).fill(false);
  let i = 0, j = 0;
  while (i < E.length && j < A.length) {
    if (E[i] === A[j]) { ok[i] = true; i++; j++; }
    else if (dp[i + 1]![j]! >= dp[i]![j + 1]!) i++;
    else j++;
  }
  return E.map((ch, k) => ({ ch, ok: ok[k]! }));
}
```

Update `shared/src/index.ts` to also `export * from './scoring';`.

- [ ] **Step 4: Run tests and typecheck**

```bash
npm test -w shared
npm run typecheck -w shared
```
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(shared): pronunciation, stroke and diff scoring"
```

---

### Task 4: Client scaffold with Tailwind v4 theme and fonts

**Files:**
- Create: `client/package.json`, `client/tsconfig.json`, `client/vite.config.ts`, `client/index.html`
- Create: `client/src/main.tsx`, `client/src/App.tsx`, `client/src/styles/theme.css`
- Create: `client/src/test/setup.ts`
- Test: `client/src/App.test.tsx`

**Interfaces:**
- Produces: CSS custom properties `--color-sakura`, `--color-rose`, `--color-sky`, `--color-cream`, `--color-lavender`, `--color-bg`, `--color-surface`, `--color-text`, `--color-muted`; Tailwind utilities `bg-sakura`, `text-rose`, `bg-sky`, `bg-cream`, `bg-lavender`, `bg-bg`, `bg-surface`, `text-text`, `text-muted`; `@nihongo/shared` importable from client.

- [ ] **Step 1: Package and config files**

`client/package.json`:
```json
{
  "name": "@nihongo/client",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --port 5173 --strictPort",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@nihongo/shared": "*",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "zustand": "^4.5.5"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/react": "^16.0.1",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "jsdom": "^25.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.6.0",
    "vite": "^5.4.0",
    "vitest": "^2.1.0"
  }
}
```

`client/tsconfig.json`:
```json
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "types": ["vitest/globals", "@testing-library/jest-dom"],
    "noEmit": true,
    "allowImportingTsExtensions": true
  },
  "include": ["src", "vite.config.ts"]
}
```

`client/vite.config.ts`:
```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173 },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

`client/index.html`:
```html
<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#FFB7C5" />
    <title>Nihongo Sensei</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700;900&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`client/src/styles/theme.css`:
```css
@import "tailwindcss";

@theme {
  --font-sans: "Zen Maru Gothic", "Hiragino Maru Gothic ProN", "Yu Gothic", "Segoe UI", system-ui, sans-serif;
  --color-sakura: #FFB7C5;
  --color-rose: #FF6F91;
  --color-sky: #A0E7FF;
  --color-cream: #FFF8F0;
  --color-lavender: #C8B6FF;
  --color-bg: var(--app-bg);
  --color-surface: var(--app-surface);
  --color-text: var(--app-text);
  --color-muted: var(--app-muted);
  --radius-card: 24px;
  --shadow-soft: 0 8px 24px rgba(255, 111, 145, 0.15);
}

:root {
  --app-bg: #FFF8F0;
  --app-surface: #FFFFFF;
  --app-text: #3B2E4A;
  --app-muted: #8A7C99;
  color-scheme: light;
}

:root[data-theme="dark"] {
  --app-bg: #1E1B2E;
  --app-surface: #2A2640;
  --app-text: #F5EFFF;
  --app-muted: #B3A8C9;
  color-scheme: dark;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --app-bg: #1E1B2E;
    --app-surface: #2A2640;
    --app-text: #F5EFFF;
    --app-muted: #B3A8C9;
    color-scheme: dark;
  }
}

html, body, #root { min-height: 100%; }
body {
  background: var(--app-bg);
  color: var(--app-text);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

.card {
  background: var(--app-surface);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-soft);
}
.btn {
  @apply inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-bold transition active:scale-95 disabled:opacity-50;
}
.btn-primary { @apply btn bg-rose text-white hover:brightness-110; }
.btn-soft { @apply btn bg-sakura/40 text-text hover:bg-sakura/70; }
.btn-sky { @apply btn bg-sky text-text hover:brightness-105; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
}
```

`client/src/test/setup.ts`:
```ts
import '@testing-library/jest-dom/vitest';
```

`client/src/main.tsx`:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/theme.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
```

`client/src/App.tsx`:
```tsx
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<h1 className="text-3xl font-black text-rose">Nihongo Sensei</h1>} />
    </Routes>
  );
}
```

- [ ] **Step 2: Write the failing smoke test**

`client/src/App.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

it('renders the app title on the home route', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  expect(screen.getByText('Nihongo Sensei')).toBeInTheDocument();
});
```

- [ ] **Step 3: Install and run**

```bash
npm install
npm test -w client
npm run typecheck -w client
```
Expected: PASS (1 test), no type errors.

- [ ] **Step 4: Verify dev server renders**

Create `.claude/launch.json` at repo root:
```json
{
  "version": "0.0.1",
  "configurations": [
    { "name": "client", "runtimeExecutable": "npm", "runtimeArgs": ["run", "dev", "-w", "client"], "port": 5173 }
  ]
}
```
Start the preview with `preview_start {name: "client"}` and confirm the title renders in Zen Maru Gothic, rose colour, cream background.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(client): vite + tailwind scaffold with anime theme tokens"
```

---

### Task 5: App shell – sidebar, bottom nav, routes, dark mode toggle

**Files:**
- Create: `client/src/app/nav.ts`, `client/src/app/AppShell.tsx`, `client/src/app/ThemeToggle.tsx`, `client/src/app/useTheme.ts`
- Create: `client/src/pages/Placeholder.tsx`
- Modify: `client/src/App.tsx`
- Test: `client/src/app/AppShell.test.tsx`, `client/src/app/useTheme.test.ts`

**Interfaces:**
- Produces: `NAV: { to: string; label: string; icon: string; short: string }[]` (13 entries in spec order), `AppShell` (renders `<Outlet/>`), `useTheme(): { theme: 'light'|'dark'|'system'; setTheme(t): void }`, `Placeholder({ title })`.

- [ ] **Step 1: Write failing tests**

`client/src/app/useTheme.test.ts`:
```ts
import { renderHook, act } from '@testing-library/react';
import { useTheme } from './useTheme';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});

it('defaults to system and writes data-theme when set', () => {
  const { result } = renderHook(() => useTheme());
  expect(result.current.theme).toBe('system');
  act(() => result.current.setTheme('dark'));
  expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  expect(localStorage.getItem('ns.theme')).toBe('dark');
  act(() => result.current.setTheme('system'));
  expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
});
```

`client/src/app/AppShell.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './AppShell';
import { NAV } from './nav';

it('renders navigation links and the outlet', () => {
  render(
    <MemoryRouter initialEntries={['/vocab']}>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/vocab" element={<p>VOCAB PAGE</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
  expect(screen.getByText('VOCAB PAGE')).toBeInTheDocument();
  for (const item of NAV) {
    expect(screen.getAllByRole('link', { name: new RegExp(item.label) }).length).toBeGreaterThan(0);
  }
});
```

- [ ] **Step 2: Run to verify failure**

```bash
npm test -w client
```
Expected: FAIL – modules not found.

- [ ] **Step 3: Implement**

`client/src/app/nav.ts`:
```ts
export interface NavItem { to: string; label: string; icon: string; short: string }

export const NAV: NavItem[] = [
  { to: '/', label: 'Trang chủ', icon: '🏠', short: 'Home' },
  { to: '/kana', label: 'Kana', icon: 'あ', short: 'Kana' },
  { to: '/vocab', label: 'Từ vựng', icon: '📚', short: 'Từ' },
  { to: '/kanji', label: 'Kanji', icon: '漢', short: 'Kanji' },
  { to: '/grammar', label: 'Ngữ pháp', icon: '📝', short: 'NP' },
  { to: '/reading', label: 'Đọc hiểu', icon: '📖', short: 'Đọc' },
  { to: '/listening', label: 'Nghe', icon: '🎧', short: 'Nghe' },
  { to: '/speaking', label: 'Nói', icon: '🎤', short: 'Nói' },
  { to: '/writing', label: 'Viết', icon: '✍️', short: 'Viết' },
  { to: '/business', label: 'Business', icon: '💼', short: 'Biz' },
  { to: '/review', label: 'Ôn tập', icon: '🔁', short: 'Ôn' },
  { to: '/progress', label: 'Tiến độ', icon: '📈', short: 'Tiến độ' },
  { to: '/settings', label: 'Cài đặt', icon: '⚙️', short: 'Cài đặt' },
];

// Items shown in the mobile bottom bar (max 5); the rest live in the "Thêm" sheet.
export const MOBILE_PRIMARY = ['/', '/vocab', '/kanji', '/review', '/progress'];
```

`client/src/app/useTheme.ts`:
```ts
import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';
const KEY = 'ns.theme';

function apply(t: Theme) {
  const root = document.documentElement;
  if (t === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', t);
}

function read(): Theme {
  try {
    const v = localStorage.getItem(KEY);
    if (v === 'light' || v === 'dark' || v === 'system') return v;
  } catch { /* ignore */ }
  return 'system';
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(read);
  useEffect(() => { apply(theme); }, [theme]);
  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try { localStorage.setItem(KEY, t); } catch { /* ignore */ }
    apply(t);
  }, []);
  return { theme, setTheme };
}
```

`client/src/app/ThemeToggle.tsx`:
```tsx
import { useTheme, type Theme } from './useTheme';

const ORDER: Theme[] = ['light', 'dark', 'system'];
const LABEL: Record<Theme, string> = { light: '☀️ Sáng', dark: '🌙 Tối', system: '🖥️ Hệ thống' };

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length]!;
  return (
    <button type="button" className="btn-soft text-sm" onClick={() => setTheme(next)} aria-label="Đổi giao diện">
      {LABEL[theme]}
    </button>
  );
}
```

`client/src/app/AppShell.tsx`:
```tsx
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { NAV, MOBILE_PRIMARY } from './nav';
import { ThemeToggle } from './ThemeToggle';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-full px-4 py-2 font-bold transition ${
    isActive ? 'bg-rose text-white shadow-md' : 'text-text hover:bg-sakura/40'
  }`;

export function AppShell() {
  const [more, setMore] = useState(false);
  const primary = NAV.filter((n) => MOBILE_PRIMARY.includes(n.to));
  const secondary = NAV.filter((n) => !MOBILE_PRIMARY.includes(n.to));

  return (
    <div className="min-h-screen md:flex">
      <aside className="hidden md:flex md:w-64 md:flex-col md:gap-1 md:border-r md:border-sakura/40 md:bg-surface md:p-4 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
        <div className="mb-4 flex items-center gap-2 px-2">
          <span className="text-2xl">🌸</span>
          <span className="text-xl font-black text-rose">Nihongo Sensei</span>
        </div>
        <nav className="flex flex-col gap-1" aria-label="Điều hướng chính">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={linkClass}>
              <span className="w-6 text-center">{n.icon}</span>
              <span>{n.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto pt-4"><ThemeToggle /></div>
      </aside>

      <main className="flex-1 px-4 pb-24 pt-4 md:px-8 md:pb-8">
        <div className="mx-auto max-w-5xl">
          <Outlet />
        </div>
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex justify-around border-t border-sakura/50 bg-surface/95 px-1 py-1 backdrop-blur md:hidden"
        aria-label="Điều hướng di động"
        style={{ paddingBottom: 'max(4px, env(safe-area-inset-bottom))' }}
      >
        {primary.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center rounded-2xl px-2 py-1 text-xs font-bold ${isActive ? 'text-rose' : 'text-muted'}`
            }
          >
            <span className="text-lg">{n.icon}</span>
            <span>{n.label}</span>
          </NavLink>
        ))}
        <button
          type="button"
          className="flex flex-col items-center rounded-2xl px-2 py-1 text-xs font-bold text-muted"
          onClick={() => setMore((m) => !m)}
          aria-expanded={more}
        >
          <span className="text-lg">✨</span>
          <span>Thêm</span>
        </button>
      </nav>

      {more && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setMore(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="card absolute inset-x-3 bottom-20 grid grid-cols-3 gap-2 p-4" onClick={(e) => e.stopPropagation()}>
            {secondary.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setMore(false)}
                className="flex flex-col items-center rounded-2xl bg-cream px-2 py-3 text-sm font-bold text-text dark:bg-bg"
              >
                <span className="text-2xl">{n.icon}</span>
                <span>{n.label}</span>
              </NavLink>
            ))}
            <div className="col-span-3 flex justify-center pt-2"><ThemeToggle /></div>
          </div>
        </div>
      )}
    </div>
  );
}
```

`client/src/pages/Placeholder.tsx`:
```tsx
export function Placeholder({ title }: { title: string }) {
  return (
    <section className="card p-8 text-center">
      <h1 className="text-2xl font-black text-rose">{title}</h1>
      <p className="mt-2 text-muted">Sakura đang chuẩn bị bài học này… 🌸</p>
    </section>
  );
}
```

`client/src/App.tsx`:
```tsx
import { Routes, Route } from 'react-router-dom';
import { AppShell } from './app/AppShell';
import { NAV } from './app/nav';
import { Placeholder } from './pages/Placeholder';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<h1 className="text-3xl font-black text-rose">Nihongo Sensei</h1>} />
        {NAV.filter((n) => n.to !== '/').map((n) => (
          <Route key={n.to} path={n.to} element={<Placeholder title={n.label} />} />
        ))}
      </Route>
    </Routes>
  );
}
```

- [ ] **Step 4: Run tests, typecheck, preview**

```bash
npm test -w client
npm run typecheck -w client
```
Expected: PASS. In the preview, resize to mobile: bottom bar with 5 items + "Thêm"; desktop: sidebar. Toggle theme and confirm `data-theme` changes the background.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(client): app shell with sidebar, mobile nav, routes and theme toggle"
```

---

### Task 6: Sakura mascot and speech bubble

**Files:**
- Create: `client/src/components/Mascot.tsx`, `client/src/components/SpeechBubble.tsx`, `client/src/components/mascot.css`
- Test: `client/src/components/Mascot.test.tsx`

**Interfaces:**
- Produces: `Mood = 'happy'|'sad'|'surprised'|'sleepy'|'neutral'`, `Mascot({ mood?: Mood; size?: number; className?: string })` renders an `<svg role="img" aria-label="Sakura {mood}">`, `SpeechBubble({ children, tail?: 'left'|'bottom' })`.

- [ ] **Step 1: Write failing test**

`client/src/components/Mascot.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { Mascot } from './Mascot';
import { SpeechBubble } from './SpeechBubble';

it('renders mascot with mood in the accessible label', () => {
  render(<Mascot mood="happy" />);
  expect(screen.getByRole('img', { name: /Sakura happy/ })).toBeInTheDocument();
});

it('renders bubble content', () => {
  render(<SpeechBubble>おはよう！</SpeechBubble>);
  expect(screen.getByText('おはよう！')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify failure**

```bash
npm test -w client
```
Expected: FAIL – modules not found.

- [ ] **Step 3: Implement**

`client/src/components/mascot.css`:
```css
.mascot-blink { animation: mascot-blink 4s infinite; transform-origin: center; }
@keyframes mascot-blink {
  0%, 92%, 100% { transform: scaleY(1); }
  95% { transform: scaleY(0.1); }
}
.mascot-bob { animation: mascot-bob 3s ease-in-out infinite; }
@keyframes mascot-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
```

`client/src/components/Mascot.tsx`:
```tsx
import './mascot.css';

export type Mood = 'happy' | 'sad' | 'surprised' | 'sleepy' | 'neutral';

interface Props { mood?: Mood; size?: number; className?: string }

function Eyes({ mood }: { mood: Mood }) {
  if (mood === 'happy') {
    return (
      <g stroke="#3B2E4A" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M38 62 q7 -8 14 0" />
        <path d="M68 62 q7 -8 14 0" />
      </g>
    );
  }
  if (mood === 'sleepy') {
    return (
      <g stroke="#3B2E4A" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M38 64 h14" />
        <path d="M68 64 h14" />
      </g>
    );
  }
  const ry = mood === 'surprised' ? 9 : 7;
  return (
    <g className="mascot-blink">
      <ellipse cx="45" cy="63" rx="6" ry={ry} fill="#3B2E4A" />
      <ellipse cx="75" cy="63" rx="6" ry={ry} fill="#3B2E4A" />
      <circle cx="47" cy="60" r="2" fill="#fff" />
      <circle cx="77" cy="60" r="2" fill="#fff" />
      {mood === 'sad' && (
        <g stroke="#3B2E4A" strokeWidth="2.5" strokeLinecap="round">
          <path d="M37 52 l14 4" />
          <path d="M83 52 l-14 4" />
        </g>
      )}
    </g>
  );
}

function Mouth({ mood }: { mood: Mood }) {
  switch (mood) {
    case 'happy': return <path d="M50 78 q10 10 20 0" stroke="#D94F70" strokeWidth="3" fill="none" strokeLinecap="round" />;
    case 'sad': return <path d="M50 84 q10 -8 20 0" stroke="#D94F70" strokeWidth="3" fill="none" strokeLinecap="round" />;
    case 'surprised': return <ellipse cx="60" cy="81" rx="5" ry="7" fill="#D94F70" />;
    case 'sleepy': return <path d="M54 80 h12" stroke="#D94F70" strokeWidth="3" strokeLinecap="round" />;
    default: return <path d="M52 80 q8 4 16 0" stroke="#D94F70" strokeWidth="3" fill="none" strokeLinecap="round" />;
  }
}

export function Mascot({ mood = 'neutral', size = 160, className = '' }: Props) {
  return (
    <svg
      role="img"
      aria-label={`Sakura ${mood}`}
      viewBox="0 0 120 150"
      width={size}
      height={(size * 150) / 120}
      className={`mascot-bob ${className}`}
    >
      {/* back hair */}
      <path d="M22 70 q-6 60 20 76 h36 q26 -16 20 -76 z" fill="#FF8FB1" />
      {/* body: sailor uniform */}
      <path d="M38 100 h44 l8 44 h-60 z" fill="#5B7DB1" />
      <path d="M38 100 h44 l-22 14 z" fill="#FFF" />
      <path d="M52 108 l8 10 l8 -10 l-8 -4 z" fill="#FF6F91" />
      {/* neck */}
      <rect x="52" y="92" width="16" height="12" rx="6" fill="#FFE1D6" />
      {/* face */}
      <ellipse cx="60" cy="66" rx="34" ry="36" fill="#FFE9E0" />
      {/* blush */}
      <ellipse cx="36" cy="74" rx="6" ry="3.5" fill="#FFB7C5" opacity="0.9" />
      <ellipse cx="84" cy="74" rx="6" ry="3.5" fill="#FFB7C5" opacity="0.9" />
      {/* front hair / bangs */}
      <path d="M24 60 q4 -40 36 -40 q32 0 36 40 q-10 -14 -20 -10 q-8 -14 -16 -8 q-8 -6 -16 8 q-10 -4 -20 10 z" fill="#FF8FB1" />
      {/* sakura hairpin */}
      <g transform="translate(86 40)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-5" rx="3" ry="5" fill="#FFF" transform={`rotate(${a})`} />
        ))}
        <circle r="2" fill="#FFD166" />
      </g>
      <Eyes mood={mood} />
      <Mouth mood={mood} />
    </svg>
  );
}
```

`client/src/components/SpeechBubble.tsx`:
```tsx
import type { ReactNode } from 'react';

export function SpeechBubble({ children, tail = 'left' }: { children: ReactNode; tail?: 'left' | 'bottom' }) {
  return (
    <div className="relative rounded-3xl bg-surface px-5 py-3 shadow-md ring-2 ring-sakura/60">
      {children}
      {tail === 'left' ? (
        <span className="absolute -left-2 top-6 h-4 w-4 rotate-45 bg-surface ring-2 ring-sakura/60 [clip-path:polygon(0_0,0_100%,100%_100%)]" aria-hidden />
      ) : (
        <span className="absolute -bottom-2 left-8 h-4 w-4 rotate-45 bg-surface ring-2 ring-sakura/60 [clip-path:polygon(0_100%,100%_100%,100%_0)]" aria-hidden />
      )}
    </div>
  );
}
```

- [ ] **Step 4: Run tests, typecheck, preview**

```bash
npm test -w client
npm run typecheck -w client
```
Expected: PASS. Temporarily render `<Mascot mood="happy" />` on the home route in preview and take a screenshot to confirm the character reads as an anime girl with pink hair and sailor uniform. Remove the temporary render before commit (Task 7 wires it for real).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(client): Sakura mascot SVG with moods and speech bubble"
```

---

### Task 7: Progress store (XP, streak) and Home page with sakura petals

**Files:**
- Create: `client/src/store/progress.ts`, `client/src/store/streak.ts`
- Create: `client/src/components/XpBar.tsx`, `client/src/components/Petals.tsx`
- Create: `client/src/pages/Home.tsx`
- Modify: `client/src/App.tsx` (route `/` → `<Home/>`)
- Test: `client/src/store/streak.test.ts`, `client/src/store/progress.test.ts`, `client/src/pages/Home.test.tsx`

**Interfaces:**
- Produces: `nextStreak(prevDay: string|null, prevStreak: number, today: string): number` (pure), `levelFromXp(xp: number): { level: number; into: number; need: number }` (level n needs `100 * n` xp to reach n+1), `useProgress()` Zustand store `{ xp, streak, lastStudyDay, addXp(n: number, today?: string): void }` persisted under `ns.progress`, `XpBar()`, `Petals()`, `Home()`.

- [ ] **Step 1: Write failing tests**

`client/src/store/streak.test.ts`:
```ts
import { nextStreak, levelFromXp } from './streak';

describe('nextStreak', () => {
  it('starts at 1 on first study', () => expect(nextStreak(null, 0, '2026-09-19')).toBe(1));
  it('keeps streak when studying the same day', () => expect(nextStreak('2026-09-19', 3, '2026-09-19')).toBe(3));
  it('increments on consecutive day', () => expect(nextStreak('2026-09-18', 3, '2026-09-19')).toBe(4));
  it('resets after a gap', () => expect(nextStreak('2026-09-16', 3, '2026-09-19')).toBe(1));
});

describe('levelFromXp', () => {
  it('level 1 needs 100 xp', () => expect(levelFromXp(0)).toEqual({ level: 1, into: 0, need: 100 }));
  it('accumulates: 100 -> level 2, level 2 needs 200', () => expect(levelFromXp(150)).toEqual({ level: 2, into: 50, need: 200 }));
  it('300 -> level 3', () => expect(levelFromXp(300)).toEqual({ level: 3, into: 0, need: 300 }));
});
```

`client/src/store/progress.test.ts`:
```ts
import { useProgress } from './progress';

beforeEach(() => {
  localStorage.clear();
  useProgress.setState({ xp: 0, streak: 0, lastStudyDay: null });
});

it('addXp increases xp and updates streak once per day', () => {
  useProgress.getState().addXp(10, '2026-09-19');
  useProgress.getState().addXp(5, '2026-09-19');
  expect(useProgress.getState().xp).toBe(15);
  expect(useProgress.getState().streak).toBe(1);
  useProgress.getState().addXp(1, '2026-09-20');
  expect(useProgress.getState().streak).toBe(2);
  expect(useProgress.getState().lastStudyDay).toBe('2026-09-20');
});
```

`client/src/pages/Home.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Home } from './Home';
import { useProgress } from '../store/progress';

it('shows greeting, streak and xp', () => {
  useProgress.setState({ xp: 150, streak: 4, lastStudyDay: '2026-09-19' });
  render(<MemoryRouter><Home /></MemoryRouter>);
  expect(screen.getByRole('img', { name: /Sakura/ })).toBeInTheDocument();
  expect(screen.getByText(/4 ngày/)).toBeInTheDocument();
  expect(screen.getByText(/Cấp 2/)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify failure**

```bash
npm test -w client
```
Expected: FAIL – modules not found.

- [ ] **Step 3: Implement**

`client/src/store/streak.ts`:
```ts
export function todayStr(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function dayDiff(a: string, b: string): number {
  return Math.round((Date.parse(b + 'T00:00:00Z') - Date.parse(a + 'T00:00:00Z')) / 86_400_000);
}

export function nextStreak(prevDay: string | null, prevStreak: number, today: string): number {
  if (!prevDay) return 1;
  const diff = dayDiff(prevDay, today);
  if (diff === 0) return prevStreak;
  if (diff === 1) return prevStreak + 1;
  return 1;
}

export function levelFromXp(xp: number): { level: number; into: number; need: number } {
  let level = 1;
  let rest = xp;
  while (rest >= 100 * level) {
    rest -= 100 * level;
    level += 1;
  }
  return { level, into: rest, need: 100 * level };
}
```

`client/src/store/progress.ts`:
```ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { nextStreak, todayStr } from './streak';

interface ProgressState {
  xp: number;
  streak: number;
  lastStudyDay: string | null;
  addXp: (n: number, today?: string) => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      xp: 0,
      streak: 0,
      lastStudyDay: null,
      addXp: (n, today = todayStr()) => {
        const { xp, streak, lastStudyDay } = get();
        set({ xp: xp + n, streak: nextStreak(lastStudyDay, streak, today), lastStudyDay: today });
      },
    }),
    { name: 'ns.progress', storage: createJSONStorage(() => localStorage) },
  ),
);
```

`client/src/components/XpBar.tsx`:
```tsx
import { useProgress } from '../store/progress';
import { levelFromXp } from '../store/streak';

export function XpBar() {
  const xp = useProgress((s) => s.xp);
  const { level, into, need } = levelFromXp(xp);
  const pct = Math.round((into / need) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm font-bold">
        <span className="text-rose">Cấp {level}</span>
        <span className="text-muted">{into} / {need} XP</span>
      </div>
      <div className="mt-1 h-3 w-full overflow-hidden rounded-full bg-sakura/30" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-gradient-to-r from-rose to-lavender transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
```

`client/src/components/Petals.tsx`:
```tsx
import { useEffect, useRef } from 'react';

interface Petal { x: number; y: number; r: number; vx: number; vy: number; rot: number; vr: number }

export function Petals({ count = 18 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;
    const petals: Petal[] = [];
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    for (let i = 0; i < count; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 4 + Math.random() * 5,
        vx: -0.3 + Math.random() * 0.6,
        vy: 0.4 + Math.random() * 0.8,
        rot: Math.random() * Math.PI,
        vr: -0.02 + Math.random() * 0.04,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of petals) {
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        if (p.y > canvas.height + 10) { p.y = -10; p.x = Math.random() * canvas.width; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = 'rgba(255,183,197,0.8)';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [count]);
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />;
}
```

`client/src/pages/Home.tsx`:
```tsx
import { Link } from 'react-router-dom';
import { Mascot } from '../components/Mascot';
import { SpeechBubble } from '../components/SpeechBubble';
import { XpBar } from '../components/XpBar';
import { Petals } from '../components/Petals';
import { useProgress } from '../store/progress';
import { NAV } from '../app/nav';

const GREETINGS = [
  { ja: 'おはよう！今日もがんばろうね！', vi: 'Chào buổi sáng! Hôm nay cùng cố gắng nhé!' },
  { ja: 'こんにちは！勉強の時間だよ〜', vi: 'Xin chào! Đến giờ học rồi~' },
  { ja: 'こんばんは！今日はどこまで進む？', vi: 'Chào buổi tối! Hôm nay học đến đâu nào?' },
];

function pickGreeting(d = new Date()) {
  const h = d.getHours();
  return h < 11 ? GREETINGS[0]! : h < 18 ? GREETINGS[1]! : GREETINGS[2]!;
}

export function Home() {
  const streak = useProgress((s) => s.streak);
  const g = pickGreeting();
  const quick = NAV.filter((n) => !['/', '/settings', '/progress'].includes(n.to));

  return (
    <div className="space-y-6">
      <section className="card relative overflow-hidden p-6 md:p-8">
        <Petals />
        <div className="relative flex flex-col items-center gap-4 md:flex-row md:items-end">
          <Mascot mood="happy" size={180} />
          <div className="flex-1 space-y-3">
            <SpeechBubble>
              <p className="text-lg font-bold">{g.ja}</p>
              <p className="text-sm text-muted">{g.vi}</p>
            </SpeechBubble>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-2xl bg-sakura/30 px-4 py-2 font-bold">🔥 Chuỗi: {streak} ngày</div>
            </div>
            <XpBar />
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-black text-rose">Bắt đầu học</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {quick.map((n) => (
            <Link key={n.to} to={n.to} className="card flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-lg">
              <span className="text-2xl">{n.icon}</span>
              <span className="font-bold">{n.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
```

`client/src/App.tsx` – replace the `/` route element with `<Home />` (import from `./pages/Home`).

- [ ] **Step 4: Run tests, typecheck, preview**

```bash
npm test -w client
npm run typecheck -w client
```
Expected: PASS. In the preview take a screenshot of the home page in light and dark mode; petals fall; mascot bobs; quick links navigate to placeholders.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(client): home page with mascot greeting, XP bar, streak and petals"
```

---

### Task 8: README and phase wrap-up

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write README**

```markdown
# 🌸 Nihongo Sensei

Ứng dụng web học tiếng Nhật toàn diện (N5–N1): kana, từ vựng, kanji, ngữ pháp, đọc, nghe, nói, viết, tiếng Nhật business. Giao diện anime với mascot Sakura.

## Chạy nhanh

```bash
npm install
npm run dev -w client      # http://localhost:5173
npm test                   # chạy test mọi workspace
```

## Cấu trúc

- `shared/` – kiểu dữ liệu và thuật toán dùng chung (SM-2, kana, chấm điểm)
- `client/` – React + Vite + Tailwind PWA
- `data/` – pipeline tải và build nội dung (giai đoạn 2)
- `server/` – Fastify + SQLite tài khoản và đồng bộ (giai đoạn 5)
- `docs/superpowers/` – spec và kế hoạch

Xem `docs/superpowers/specs/2026-09-19-nihongo-sensei-design.md`.
```

- [ ] **Step 2: Run the whole suite**

```bash
npm test
npm run typecheck
```
Expected: all PASS.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "docs: README with quick start"
```
