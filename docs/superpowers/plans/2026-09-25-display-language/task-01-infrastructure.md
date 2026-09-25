# Task 01 — Infrastructure: setting, dictionary, switch, pickers, guard, ui-check

Branch `i18n/task-01`. Read `00-overview.md` first (interfaces, constraints).

**Files**
- Create: `shared/src/i18n.ts`, `shared/src/i18n.test.ts`
- Modify: `shared/src/types.ts` (optional fields), `shared/src/index.ts` (`export * from './i18n'`)
- Create: `client/src/i18n/vi.ts`, `client/src/i18n/en.ts`, `client/src/i18n/index.ts`, `client/src/i18n/i18n.test.tsx`
- Create: `client/src/i18n/pending-files.ts`, `client/src/i18n/no-hardcoded.test.ts`
- Create: `client/src/components/LangSwitch.tsx`
- Modify: `client/src/store/settings.ts`, `client/src/app/nav.ts`, `client/src/app/AppShell.tsx`,
  `client/src/App.tsx` (call `useSyncHtmlLang()`), `client/src/pages/SettingsPage.tsx` (only: add `<LangSwitch/>`
  row in the "Giao diện" card — the rest of the page is task 03)
- Create: `scripts/ui-check.cjs`; add `.ui-check/` to `.gitignore`

**Interfaces** — Produces everything in the overview's "Shared interfaces" block, plus:
- `client/src/i18n/pending-files.ts`: `export const PENDING: string[]` — paths relative to `client/src`, POSIX
  slashes, e.g. `'pages/kana/KanaPage.tsx'`. Tasks 02–08 delete their entries; task 09 asserts it is empty.
- `nav.ts`: `export type NavKey = 'home'|'kana'|'vocab'|'kanji'|'grammar'|'reading'|'listening'|'speaking'|'writing'|'business'|'review'|'progress'|'settings'`;
  `NavItem = { to: string; icon: string; key: NavKey }`; dictionary `nav: Record<NavKey, { label: string; short: string }>`
  plus `nav.more`, `nav.mainAria`, `nav.mobileAria`. Keep today's Vietnamese labels/shorts verbatim in `vi.ts`;
  English: Home, Kana, Vocabulary/Vocab, Kanji, Grammar, Reading, Listening, Speaking, Writing, Business/Biz,
  Review, Progress, Settings; "More".
- Types (all optional, no data): `Vocab.meaningsVi?: string[]`, `Kanji.meaningsVi?: string[]`, `Kanji.hanViet?: string`,
  `Grammar.meaningVi?: string`, `GrammarExample.vi?: string`, `Sentence.vi?: string`, `KanaChar.mnemonicEn?: string`,
  `ReadingLesson.explainEn?: string` and its vocab item `en?: string`, `ListeningLine.en?: string`,
  `BusinessItem.en?: string` and `example.en?: string`, `ScenarioLine.en?: string`.
  (`MascotLine.en` is added in task 03 where `client/src/lib/mascot.ts` is migrated.)
- `settings.ts`: `lang: 'vi'` in the initial state (zustand `persist` shallow-merges, so old stored state without
  `lang` gets `'vi'`; do not bump the persist version).

**Guard test rules** (`no-hardcoded.test.ts`): walk `client/src` for `*.ts`/`*.tsx`, skip `i18n/`, `test/`,
`*.test.*`, and files in `PENDING`; ignore lines whose trimmed text starts with `//`, `*`, `/*` or `{/*`; flag any
line matching `/[ăâđêôơưàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i`. Failure message lists
`file:line: text`. Seed `PENDING` with every file the guard flags after this task's own migrations (run it once
with an empty list, paste the flagged file paths, sorted).

**ui-check.cjs** (Node CJS, no deps beyond puppeteer-core):
`require(process.env.APPDATA + '/npm/node_modules/@modelcontextprotocol/server-puppeteer/node_modules/puppeteer-core')`,
Chrome `C:/Program Files/Google/Chrome/Application/chrome.exe`, `headless: 'new'`, fresh `userDataDir` in os.tmpdir.
Args: `--lang vi|en` (default vi) → `page.evaluateOnNewDocument` sets
`localStorage['ns.settings'] = JSON.stringify({ state: { lang }, version: 0 })` only if not already set;
`--widths 360,390` (default); `--shots /,/kana` (optional) → full-page 390×844 PNGs `.ui-check/<lang>-<route>.png`;
`--base http://localhost:5173`. Routes: `/ /kana /vocab /kanji /review /grammar /reading /listening /speaking /writing /business /progress /settings /login /register`.
For each route: visit, then for each `[role=tablist]` click each `[role=tab]`, and for each later tablist each tab;
after each state, flag if `document.documentElement.scrollWidth > clientWidth` and list the deepest overflowing
elements (outside `nav.fixed`). Print `states checked: N` and `NO OVERFLOW` or JSON problems; exit 1 on problems.
(Proven version: session 2026-09-25 scratchpad `sweep.cjs` — same algorithm.)

- [ ] **Step 1: Tests first (fail)**
  - `shared/src/i18n.test.ts`: pickText returns the selected language · falls back to the other when missing or
    `''` · returns `''` when both missing · pickList prefers a non-empty list of the selected language · falls back
    on empty array · vocabMeanings uses meaningsVi in vi and meanings in en.
  - `client/src/i18n/i18n.test.tsx`: default lang is vi (useT().nav.home.label === 'Trang chủ') · stored
    `{state:{ttsRate:1}}` without lang rehydrates to 'vi' and keeps ttsRate 1 · setLang('en') makes useT() English
    and sets `<html lang="en">` · clicking EN in AppShell's LangSwitch changes the sidebar "Từ vựng" to "Vocabulary"
    · nav more/aria labels come from the dictionary · `en.common.cards` gives '0 cards', '1 card', '2 cards'
    and `vi.common.cards(2)` gives '2 thẻ'.
- [ ] **Step 2:** Run `npx vitest run` in `shared` and `client` → the new tests fail (missing modules).
- [ ] **Step 3:** `shared/src/i18n.ts` + optional type fields; `settings.ts` lang/setLang.
- [ ] **Step 4:** `vi.ts` (groups `common` with `cards`, `nav`, `settings` with at least `language`), `en.ts: Dict`, `index.ts`,
  `LangSwitch`, wire `nav.ts` + `AppShell.tsx` (sidebar under the theme button; mobile "More" sheet) +
  SettingsPage row + `useSyncHtmlLang()` in `App.tsx`. Update existing code that reads `item.label`/`item.short`.
- [ ] **Step 5:** Guard test + seed `PENDING` as described; run → green.
- [ ] **Step 6:** `scripts/ui-check.cjs` + `.gitignore`. Check command from the overview → all green.
- [ ] **Step 7: Verify in Chrome:** `npm run dev` (preview server `nihongo-client`), then
  `node scripts/ui-check.cjs --lang en --shots /,/settings` → `NO OVERFLOW`; look at both PNGs: sidebar/bottom bar
  English, VI|EN switch visible; repeat `--lang vi` → unchanged Vietnamese.
- [ ] **Step 8: Commit** (`feat(i18n): display-language setting, typed dictionary and switch`) with STATUS line
  updated; fast-forward `master`.
