# Task 08 — Business

Branch `i18n/task-08`. Read `00-overview.md` first. Consumes `useT`, `useLang` (task 01), `pickText` (shared,
task 01), `withLang` (task 02).

**Files** (under `client/src`; remove each from `i18n/pending-files.ts`)
- `pages/business/`: ScenarioView.tsx (21 VI lines), BusinessRoleplay.tsx (13), GlossaryList.tsx (10),
  BusinessQuiz.tsx (9), BusinessPage.tsx (7), KeigoTable.tsx (6), RephraseList.tsx (2), EmailTemplates.tsx (1),
  PhraseList.tsx (1)
- Modify: `i18n/vi.ts`, `i18n/en.ts` — group `business`

**Interfaces / rules**
- Business content is Vietnamese-authored: `pickText(item.vi, item.en, lang)`, `pickText(item.example.vi,
  item.example.en, lang)`, scenario lines `pickText(line.vi, line.en, lang)`. EN mode shows Vietnamese until a
  translation phase — expected.
- Scenario `title` / `intro` are content (Vietnamese) — leave them as data; do not move them into the dictionary.
- Hard-coded Vietnamese that is **UI** (tab names, column headers of KeigoTable, "NG → OK" captions, quiz
  feedback, roleplay controls) moves to the dictionary. KeigoTable column headers: EN "Plain / Polite /
  Respectful / Humble" (keep 丁寧語/尊敬語/謙譲語 Japanese labels if present).
- BusinessQuiz options built from `vi` fields use `pickText` too (consistent language within one question).

- [ ] **Step 1: Tests first (fail)**
  - BusinessPage in English shows its section tabs in English.
  - GlossaryList shows `en` when present in EN mode, `vi` otherwise; search matches both.
  - KeigoTable in English shows the English column headers.
  - BusinessQuiz in English: feedback text English; options use `pickText` (fixture with `en` → English options).
  - ScenarioView/BusinessRoleplay in English: controls ("Next", "Show translation", result) English.
- [ ] **Step 2:** Run → fail.
- [ ] **Step 3:** Migrate GlossaryList, PhraseList, RephraseList, EmailTemplates, KeigoTable, BusinessPage.
- [ ] **Step 4:** Migrate BusinessQuiz, ScenarioView, BusinessRoleplay.
- [ ] **Step 5:** Remove paths from `PENDING`; guard + check command → green.
- [ ] **Step 6: Verify in Chrome:** `node scripts/ui-check.cjs --lang en --shots /business` → `NO OVERFLOW`
  (business has several tabs — the sweep visits each); open PNGs; open one scenario in EN and screenshot it.
- [ ] **Step 7: Commit** (`feat(i18n): translate business`) + STATUS; ff `master`.
