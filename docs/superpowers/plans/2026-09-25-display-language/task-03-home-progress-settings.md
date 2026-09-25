# Task 03 — Home, Progress, Settings, mascot, non-React messages

Branch `i18n/task-03`. Read `00-overview.md` first. Consumes `useT`, `useLang`, `getT` (task 01), `withLang`
test helper (task 02, `client/src/test/lang.ts`).

**Files** (under `client/src`; remove each from `i18n/pending-files.ts`)
- `pages/SettingsPage.tsx` (27 VI lines), `pages/ProgressPage.tsx` (16), `pages/Home.tsx` (4)
- `lib/mascot.ts` (8): `LEVEL_NAMES` and every `MascotLine`
- `db/stats.ts` (1), `db/db.ts` (1), `api/client.ts` (2), `content/loader.ts` (1), `lib/stt.ts` (6)
- Modify: `i18n/vi.ts`, `i18n/en.ts` — groups `home`, `progress`, `settings`, `mascot`, `errors`

**Interfaces**
- `MascotLine` becomes `{ ja: string; vi: string; en: string }` (`en` required — write the English now). Callers
  display `pickText(line.vi, line.en, lang)`; the Japanese line is unchanged.
- `LEVEL_NAMES` moves into the dictionary as `progress.levelNames: string[]` (7 entries, same emoji). Replace
  `export const LEVEL_NAMES` with `export function levelName(level: number, t: Dict): string` in `lib/mascot.ts`
  and update its callers.
- Functions in `lib/mascot.ts` that pick a line must return the `MascotLine` object (not a pre-translated
  string), so a language switch re-renders the same line in the new language.
- Non-React messages (`api/client.ts`, `content/loader.ts`, `lib/stt.ts`, `db/*.ts`): build the text with
  `getT()` at the moment the error/message is created — never at module load.
- Dates on Progress: `toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', …)`.

- [ ] **Step 1: Tests first (fail)**
  - Home in English shows the English greeting/mascot line; flipping to Vietnamese while mounted switches the
    same mascot bubble to its `vi` text (Review Focus #4).
  - Progress in English shows the streak tile label "Day streak" and the English level name for level 1.
  - Settings in English shows card titles Appearance / Voice / Backup / Data sources and the language row.
  - `api/client.ts`: a failed request's error message is English when lang is 'en' at call time and Vietnamese
    after switching back (Review Focus #5) — mock `fetch` to reject.
  - `lib/stt.ts`: the "not supported" message follows the current language (existing `stt.test.ts`: add a case).
  - `levelName(0, en)` returns the English first level; every `vi`/`en` levelNames array has 7 entries.
- [ ] **Step 2:** Run → fail.
- [ ] **Step 3:** Migrate `lib/mascot.ts` (+ callers) and the non-React files.
- [ ] **Step 4:** Migrate Home, Progress, Settings pages (Settings: all remaining text; the language row from
  task 01 stays).
- [ ] **Step 5:** Remove paths from `PENDING`; guard + check command → green.
- [ ] **Step 6: Verify in Chrome:** `node scripts/ui-check.cjs --lang en --shots /,/progress,/settings` →
  `NO OVERFLOW`; open the PNGs: stat tiles and settings rows fit at 390px in English, level name English.
- [ ] **Step 7: Commit** (`feat(i18n): translate home, progress, settings and messages`) + STATUS; ff `master`.
