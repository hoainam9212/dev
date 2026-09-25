# Display language (Tiếng Việt / English) — design

Date: 2026-09-25 · Status: approved in chat, awaiting spec review · App version at start: 1.0.10

## Goal

A learner can switch the whole interface between Vietnamese and English from the menu. With English selected,
menus, instructions, messages and explanations written by the app are English; with Vietnamese selected they are
Vietnamese. **This phase covers the interface only.** Vietnamese content (vocab/kanji meanings, grammar
explanations, sentence translations) comes in later, separate translation phases; this phase makes those phases
data-only (no UI change needed).

Success criteria:

1. A VI/EN switch in the menu (desktop sidebar, mobile "Thêm"/"More" sheet) and in Settings › Giao diện;
   the choice persists and applies instantly without reload. Default: Vietnamese (existing users see no change).
2. In English mode no Vietnamese UI text remains in any page, dialog, toast, mascot line or `aria-label`.
3. Content is read through one helper that picks the selected language and falls back to the other one, so
   adding `…Vi` / `…En` fields to the data later changes what is shown with no component edits.
4. No layout regression in English (longer strings): the 360/390px horizontal-overflow sweep stays clean.

## Current state (surveyed 2026-09-25)

- No i18n library or mechanism. ~314 distinct Vietnamese literals in 68 of 74 non-test `.tsx` files, plus
  `app/nav.ts`, `lib/mascot.ts`, `content/loader.ts`, `api/client.ts`, `db/*.ts`, `lib/chunk.ts`, `lib/stt.ts`.
- Settings: zustand `useSettings` persisted as `ns.settings` (`ttsRate`, `newLimit`, `petals`); theme separate
  (`app/useTheme.ts`). `SettingsPage` cards: Giao diện, Giọng đọc, Sao lưu, Nguồn dữ liệu.
- Menu: `NAV` in `app/nav.ts` (`label`, `short`, 13 items), `MOBILE_PRIMARY` 5 routes; `AppShell.tsx` adds
  "Thêm" and nav `aria-label`s.
- Content language: English-only datasets — vocab `meanings` (7,972), kanji `meanings` (2,211), grammar
  `meaning` + `examples[].en` (826), sentences `en` (18,637). Vietnamese-only authored content — kana
  `mnemonic` (92), reading `vocab[].vi`/`explain` (33), listening `script[].vi` (15), business `vi` fields (342
  items, 12 scenarios), mascot lines `{ja, vi}`, `LEVEL_NAMES`.

## Design

### Dictionary (approach A — in-house, typed; no dependency)

- `client/src/i18n/vi.ts` — the source of truth: a nested `as const`-free object of strings and small functions
  for interpolation, grouped by area (`nav`, `common`, `home`, `kana`, `vocab`, `kanji`, `grammar`, `reading`,
  `listening`, `speaking`, `writing`, `business`, `review`, `progress`, `settings`, `auth`, `mascot`, `errors`).
  Example: `review: { due: (n: number) => \`Có ${n} thẻ đến hạn\` }`.
- `client/src/i18n/en.ts` — `export const en: Dict = { … }` where `type Dict = typeof vi` (widened: string
  leaves are `string`, function leaves keep their parameter types). A missing or extra key, or a function with
  the wrong parameters, is a **typecheck error**.
- `client/src/i18n/index.ts`:
  - `type Lang = 'vi' | 'en'`
  - `useT(): Dict` — returns the dictionary for the current language (re-renders on change).
  - `useLang(): Lang` and `getT(): Dict` (non-React callers such as `api/client.ts`, `db/*.ts`, `lib/stt.ts`).
  - Sets `document.documentElement.lang` to `vi` / `en` on change.
- Usage: `const t = useT(); … {t.kana.nextChar}` / `aria-label={t.common.close}` / `t.review.due(n)`.
- Plain strings only (no rich-text markup in the dictionary); a sentence with inline emphasis is split into
  pieces in the component.

### Language setting and switch

- `useSettings` gains `lang: Lang` (default `'vi'`) and `setLang`. Persisted with the other settings; old stored
  settings without `lang` read as `'vi'`.
- `LangSwitch` component: a two-option segmented control "VI | EN" (labels are the same in both languages).
  Placed in the desktop sidebar under the "Hệ thống"/theme button, in the mobile "More" sheet, and in
  Settings › Giao diện (with a label from the dictionary).
- `NAV` keeps routes/icons only; labels come from `t.nav[<key>]` (`label` and `short` per item). "Thêm"/"More"
  and nav `aria-label`s from the dictionary.

### Content helpers (prepared now, filled by later translation phases)

- `shared/src/i18n.ts` (pure, testable, used by the client):
  - `pickText(vi: string | undefined, en: string | undefined, lang): string` — selected language first, else the
    other, else `''`.
  - `pickList(vi: string[] | undefined, en: string[] | undefined, lang): string[]` — same for lists (non-empty
    wins).
- Types gain **optional** sibling fields (no data yet): `Vocab.meaningsVi?`, `Kanji.meaningsVi?`,
  `Kanji.hanViet?`, `Grammar.meaningVi?`, `GrammarExample.vi?`, `Sentence.vi?`; Vietnamese-source authored types
  gain `…En?` siblings: `KanaChar.mnemonicEn?`, `ReadingLesson.explainEn?`, `ReadingLesson.vocab[].en?`,
  `ListeningLine.en?`, `BusinessItem.en?` (+ `example.en?`), `ScenarioLine.en?`, `MascotLine.en?`.
- Every place that shows content calls the helper, e.g. `pickList(v.meaningsVi, v.meanings, lang)`,
  `pickText(line.vi, line.en, lang)`. Quiz distractors and flashcard backs use the same helpers.
- Mascot lines and `LEVEL_NAMES` are UI text: their English goes in this phase (dictionary / `en` field), not
  in a translation phase.

### Out of scope

- Translating datasets into Vietnamese (later phases), English versions of authored lesson content (reading,
  listening, business, kana mnemonics — shown in Vietnamese as fallback in English mode until a later phase).
- Japanese-language UI, auto-detecting device language, server-side (account/sync) messages beyond what the
  client displays.

## Testing and verification

- **Type-level completeness**: `en` typed as `Dict` (typecheck is part of every task's check command).
- **Leftover-literal guard** (`client/src/i18n/no-hardcoded.test.ts`): scans `client/src/**/*.{ts,tsx}` except
  `i18n/`, tests and `test/`; fails listing `file:line` for any string/JSX text containing Vietnamese-specific
  letters (ăâđêôơư and tone-marked vowels). Until the last migration task it runs with an **allow-list of files
  not yet migrated**; each area task removes its files from the list; the final task empties it.
- Unit tests: `pickText`/`pickList`; `useSettings` default and migration of old stored settings; `LangSwitch`
  flips nav labels and `<html lang>`; per area, at least one test renders the area in English and asserts a key
  string.
- Existing tests keep querying Vietnamese text (default language), so they need no rewrite.
- Every UI task: headless-Chrome check of its pages in **English** at 390px (screenshot) and the overflow sweep
  (route × tab, 360/390px) — longer English labels are the main layout risk.

## Delivery

~10 tasks, split plan (overview + `STATUS.md` + one file per task, per the "entry tax" lessons): infrastructure;
app shell + home + progress + settings; kana; vocab; kanji; grammar; reading + listening; speaking + writing;
business + review + auth + remaining `.ts` messages; final (guard at zero, full sweep, release APK). Run 2–3 tasks
per session.
