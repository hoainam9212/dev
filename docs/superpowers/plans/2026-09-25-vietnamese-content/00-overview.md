# Vietnamese content (waves 0–1: tooling + N5) — Implementation Plan · Overview

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans (native, one task at a time). Read this
> overview + `STATUS.md` + exactly ONE `task-NN-*.md`. Do 2–3 tasks per session, then start a new session.
> Translation tasks (05–07) are one batch = one commit; stop a session after 2–3 batches.
> Steps use checkbox (`- [ ]`) syntax.

**Goal:** Vietnamese meanings, Hán Việt, grammar explanations and sentence translations for all of N5, produced by
committed translation files merged into the content bundles at build time, shipped as APK 1.1.0.

**Architecture:** Pure functions in `data/src/` (open-data parsers, overlay loading/merging, checking, batching)
used by `data/scripts/build.ts` and a small CLI `data/scripts/tr.ts`. Translation files live in
`data/translations/vi/<level>/<type>-NNN.json`, keyed by stable natural keys with an English snapshot. The client
already reads `meaningsVi` / `hanViet` / `meaningVi` / `examples[].vi` / `vi` through its pickers.

**Tech Stack:** Node + tsx scripts, Vitest, TypeScript (`@nihongo/shared` types), existing fetch pipeline
(`adm-zip`, `unbzip2-stream`). React client only for the attribution line.

**Spec:** `docs/superpowers/specs/2026-09-25-vietnamese-content-design.md`

## Global Constraints

- No new runtime or dev dependency.
- Translation files only under `data/translations/vi/<level>/` (level folder lowercase `n5`…), file name
  `<type>-NNN.json` with `type` ∈ `vocab | kanji | grammar | sentences`, NNN zero-padded from 001.
- File shape: `{ "type": "<type>", "level": "N5", "entries": { "<key>": { … } } }`.
- Keys: vocab `word|reading`; kanji the character; grammar `LEVEL|title` (e.g. `N5|〜たい`); sentence the Tatoeba id
  without the `s-` prefix (e.g. `"100013"`).
- Entries: vocab `{ vi: string[], en: string[] }`; kanji `{ vi: string[], hanViet?: string, en: string[] }`;
  grammar `{ vi: string, examples: { ja: string, vi: string }[], en: string }`; sentence `{ vi: string, en: string }`.
  `en` is the English snapshot at translation time (copied from the batch skeleton, never edited by hand).
- Precedence: translation file → open data (Unihan Hán Việt, Tatoeba Vietnamese) → nothing (English shown).
- Hán Việt uppercase (`toLocaleUpperCase('vi')`), up to 3 readings joined with `, `.
- Raw open data goes to `data/raw/` (git-ignored); `data/translations/_work/` is git-ignored.
- `STYLE.md` (task 04) governs every translation batch.
- Commit messages in English with a body; end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
  Branch per task `vi/task-NN`, fast-forward to `master`. Update `STATUS.md` in the task's own commit (the sha of a
  task is written by the next task, same as the display-language plan).

## Shared interfaces

```ts
// data/src/opendata.ts (task 01)
export function parseUnihanField(txt: string, field: string): Map<string, string>;   // char → value
export function parseUnihanVariants(txt: string): Map<string, string[]>;             // char → variants
export function hanVietFor(ch: string, readings: Map<string, string>, variants: Map<string, string[]>): string | undefined;
export function tatoebaVietnamese(links: Map<number, number[]>, vie: Map<number, string>): Map<number, string>;

// data/src/translate.ts (task 02)
export type TrType = 'vocab' | 'kanji' | 'grammar' | 'sentences';
export const TR_TYPES: TrType[];
export interface VocabEntry { vi: string[]; en: string[] }
export interface KanjiEntry { vi: string[]; hanViet?: string; en: string[] }
export interface GrammarEntry { vi: string; examples: { ja: string; vi: string }[]; en: string }
export interface SentenceEntry { vi: string; en: string }
export interface EntryOf { vocab: VocabEntry; kanji: KanjiEntry; grammar: GrammarEntry; sentences: SentenceEntry }
export interface TrFile<T extends TrType = TrType> { type: T; level: Level; entries: Record<string, EntryOf[T]> }
export interface LoadedFile { path: string; file: TrFile }          // path like 'vi/n5/vocab-001.json'
export type Overlays = { [T in TrType]: Map<string, EntryOf[T]> };
export interface Sources { vocab: Vocab[]; kanji: Kanji[]; grammar: Grammar[]; sentences: Sentence[] }
export interface ApplyReport { total: number; fromFile: number; fromOpen: number; stale: string[] }
export const vocabKey, kanjiKey, grammarKey, sentenceKey;           // (item) => string
export function readTrFiles(dir: string): LoadedFile[];
export function toOverlays(files: LoadedFile[]): Overlays;          // throws on duplicate key
export function loadBuiltSources(outDir: string): Sources;
export function applyVocab(items: Vocab[], o: Overlays['vocab']): ApplyReport;
export function applyKanji(items: Kanji[], o: Overlays['kanji'], openHanViet: (ch: string) => string | undefined):
  ApplyReport & { hanVietOpen: number; hanVietFile: number; hanVietMissing: string[] };
export function applyGrammar(items: Grammar[], o: Overlays['grammar']): ApplyReport;
export function applySentences(items: Sentence[], o: Overlays['sentences'], openVi: Map<number, string>): ApplyReport;

// data/src/translate-check.ts (task 03)
export interface Issue { file: string; key: string; msg: string }
export function looksVietnamese(s: string): boolean;
export function checkTranslations(files: LoadedFile[], src: Sources): { errors: Issue[]; warnings: Issue[] };

// data/src/tr-batch.ts (task 03)
export interface Batch { writeTo: string; context: Record<string, unknown>; file: TrFile }
export function pendingItems(type: TrType, level: Level, src: Sources, o: Overlays): (Vocab | Kanji | Grammar | Sentence)[];
export function nextIndex(existing: string[], type: TrType): number;
export function makeBatch(type: TrType, level: Level, items: (Vocab | Kanji | Grammar | Sentence)[], index: number,
  sentencesById?: Map<string, Sentence>): Batch;
export interface SampleRow { type: TrType; key: string; ja: string; en: string; vi: string }
export function sampleEntries(files: LoadedFile[], src: Sources, n: number, rng?: () => number): SampleRow[];

// data/scripts/sources.ts (task 01 adds, task 02 adds TRANSLATIONS_DIR)
export const TRANSLATIONS_DIR: string;   // <data>/translations
```

CLI (task 03): `npm run tr -w data -- status [--level n5]` · `next --level n5 --type vocab [--size 250]` ·
`check` · `sample (--file vi/n5/vocab-001.json | --level n5) [--n 20]`.

## Verification (every task)

- Check command: `npm run typecheck && npm test` from the repo root (all workspaces).
- Tasks 04–08 also: `npm run data:build` and read its `vi` coverage lines.
- Translation tasks: `npm run tr -w data -- check` → `0 errors`; read every warning and fix or accept it.

## Review Focus

1. A `data/raw/` from before this plan (no Unihan / Tatoeba-vie files) → `data:fetch` downloads only the new files
   and `data:build` stops with "missing raw/unihan … run npm run data:fetch" instead of a stack trace (task 04).
2. A sentence used by two levels (same Tatoeba id in N5 and N4 bundles) → translated once, applied to both,
   never offered again by `next` for the other level, and accepted by `check` in either level folder (task 03).
3. Shinjitai kanji with no `kVietnamese` of its own (学, 気) → Hán Việt from its traditional variant, uppercase;
   kanji with several readings → at most 3 (task 01).
4. The source changes a grammar example after it was translated → `check` reports it; the build applies the
   meaning and the still-matching examples without crashing (tasks 02, 03).
5. A hand-edited translation file with a JSON syntax error → the build/CLI error names the file (task 02).

## Task index

| # | File | Scope |
|---|------|-------|
| 01 | task-01-open-data.md | fetch Unihan + Tatoeba VI; parsers; Hán Việt with variant fallback |
| 02 | task-02-overlays.md | translation file format, keys, loading, apply* merge functions |
| 03 | task-03-check-and-cli.md | checkTranslations, batching, `tr status/next/check/sample` |
| 04 | task-04-build-style-attribution.md | build integration, STYLE.md, Settings attribution, gitignore |
| 05 | task-05-n5-kanji-grammar.md | translate N5 kanji (79) + grammar (136 + examples) |
| 06 | task-06-n5-vocab.md | translate N5 vocab (718, 3 batches) |
| 07 | task-07-n5-sentences.md | translate N5 sentences not covered by Tatoeba (batches of 300) |
| 08 | task-08-n5-release.md | user sample, VI screenshots, APK 1.1.0 |

Later waves (N4 → N1, big levels split into sub-waves): `wave-checklist.md`.
