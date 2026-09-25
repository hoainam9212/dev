# Display language (VI/EN) — Implementation Plan · Overview

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans (native, one task at a time). Read this
> overview + `STATUS.md` + exactly ONE `task-NN-*.md`. Do 2–3 tasks per session, then start a new session.
> Steps use checkbox (`- [ ]`) syntax.

**Goal:** A VI/EN switch in the menu and Settings that turns every piece of interface text into English or
Vietnamese, and routes all content through helpers so later translation phases are data-only.

**Architecture:** In-house typed dictionary (`client/src/i18n/vi.ts` is the source of truth, `en.ts` must match
its type), `useT()` hook reading `lang` from the persisted `useSettings` store, pure content pickers in
`shared/src/i18n.ts`. Area-by-area migration guarded by a test that fails on Vietnamese literals outside
`i18n/`, with a shrinking allow-list of not-yet-migrated files.

**Tech Stack:** React 18 + Vite + Tailwind v4 + zustand (persist) + Vitest/Testing Library (jsdom); headless
Chrome via puppeteer-core for layout checks.

**Spec:** `docs/superpowers/specs/2026-09-25-display-language-design.md`

## Global Constraints

- No new runtime dependency. Default language `'vi'`; existing users see no change.
- `type Lang = 'vi' | 'en'` lives in `shared/src/i18n.ts`; the client re-exports it from `client/src/i18n`.
- Never store translated strings in state, IndexedDB or the server — store data/keys, translate at render
  (so switching language re-translates what is already on screen).
- Dictionary leaves are plain strings or small functions (interpolation/plurals). No markup in strings.
- English plurals: every count function handles `1` vs other (`1 card`, `2 cards`).
- Dates/numbers: `lang === 'vi' ? 'vi-VN' : 'en-US'` wherever `toLocale*String` is used.
- Japanese text (kana, kanji, example sentences, grammar titles) is never translated.
- Content shown to the learner goes through the pickers (below) — never `v.meanings` directly in UI code.
- Existing tests keep asserting Vietnamese text (default language); don't rewrite them.
- Commit messages in English with a body; end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
  Update `STATUS.md` inside the task's own commit. Branch per task `i18n/task-NN`, fast-forward to `master`.

## Shared interfaces (created in task 01, used everywhere)

```ts
// shared/src/i18n.ts
export type Lang = 'vi' | 'en';
export function pickText(vi: string | undefined, en: string | undefined, lang: Lang): string;
export function pickList(vi: string[] | undefined, en: string[] | undefined, lang: Lang): string[];
export const vocabMeanings = (v: Vocab, lang: Lang) => pickList(v.meaningsVi, v.meanings, lang);
export const kanjiMeanings = (k: Kanji, lang: Lang) => pickList(k.meaningsVi, k.meanings, lang);
export const grammarMeaning = (g: Grammar, lang: Lang) => pickText(g.meaningVi, g.meaning, lang);
export const exampleTranslation = (e: GrammarExample, lang: Lang) => pickText(e.vi, e.en, lang);
export const sentenceTranslation = (s: Sentence, lang: Lang) => pickText(s.vi, s.en, lang);
export const kanaMnemonic = (c: KanaChar, lang: Lang) => pickText(c.mnemonic, c.mnemonicEn, lang);
// Vietnamese-source authored objects with {vi, en?}: pickText(x.vi, x.en, lang) inline.

// client/src/i18n/index.ts
export type { Lang } from '@nihongo/shared';
export type Dict = typeof vi;                 // from ./vi
export function useLang(): Lang;              // useSettings((s) => s.lang)
export function useT(): Dict;                 // DICTS[useLang()]
export function getT(): Dict;                 // DICTS[useSettings.getState().lang] — non-React callers
export function useSyncHtmlLang(): void;      // sets document.documentElement.lang; called once in App

// client/src/store/settings.ts (added fields)
lang: Lang;                 // default 'vi'
setLang: (l: Lang) => void;

// client/src/components/LangSwitch.tsx
export function LangSwitch(): JSX.Element;   // Segmented, ariaLabel t.settings.language, options 'VI' | 'EN'

// client/src/i18n/vi.ts (task 01) — plural pattern every later count function copies
common: { cards: (n: number) => `${n} thẻ` }            // en: n === 1 ? '1 card' : `${n} cards`

// client/src/test/lang.ts (task 02; used by tests in tasks 02–08)
export function withLang(l: Lang): void;     // setLang(l) now, registers afterEach → setLang('vi')
```

Dictionary shape: one top-level group per area — `common, nav, app, home, progress, settings, auth, kana, vocab,
kanji, grammar, reading, listening, speaking, writing, business, review, mascot, errors`. Each task adds its own
group(s) to **both** `vi.ts` and `en.ts`. Keys are camelCase English descriptions (`nextChar`, `closeSheet`).

## Verification (every UI task)

- Check command: `npm run typecheck && npm test` from the repo root (all workspaces).
- `node scripts/ui-check.cjs --lang en --shots <routes>` (created in task 01, needs `npm run dev` on :5173):
  overflow sweep over every route × `[role=tab]` combination at 360 and 390px, plus 390×844 screenshots of the
  given routes into `.ui-check/` (git-ignored). Look at every screenshot before finishing the task.
- Grep guard: `npx vitest run src/i18n/no-hardcoded.test.ts` (client) must pass with the task's files removed
  from `client/src/i18n/pending-files.ts`.

## Review Focus

1. Old `ns.settings` in localStorage without `lang` → app opens in Vietnamese, nothing reset (task 01 test).
2. English labels are longer → segmented controls / buttons wrap or overflow at 360px (ui-check every task).
3. Count strings with 0/1/many in English (`0 cards`, `1 card`) (task 01 dictionary test pattern; each task
   that adds a count function adds a one-line test).
4. Text already on screen (mascot bubble, toast, quiz feedback) when the user flips the switch updates in place
   (task 03 test on Home mascot; rule in Global Constraints).
5. Non-React messages (API errors, speech-recognition errors, loader errors) use the language active at call
   time via `getT()` (task 03 test).

## Task index

| # | File | Scope |
|---|------|-------|
| 01 | task-01-infrastructure.md | settings.lang, dictionary skeleton, useT, LangSwitch in menu/Settings, nav, pickers + optional types, guard test, ui-check script |
| 02 | task-02-shared-components.md | components/*, app/* chrome, App.tsx, Placeholder |
| 03 | task-03-home-progress-settings.md | Home, Progress, Settings, mascot, db/*, api/client, content/loader, lib/stt |
| 04 | task-04-kana-vocab.md | pages/kana/*, pages/vocab/* + vocab/kana pickers |
| 05 | task-05-kanji-grammar.md | pages/kanji/*, pages/grammar/* + kanji/grammar pickers |
| 06 | task-06-reading-listening-speaking.md | pages/reading/*, pages/listening/*, pages/speaking/* |
| 07 | task-07-writing-review-auth.md | pages/writing/*, ReviewPage, LoginPage |
| 08 | task-08-business.md | pages/business/* |
| 09 | task-09-final-release.md | empty allow-list, full EN pass, release APK |
