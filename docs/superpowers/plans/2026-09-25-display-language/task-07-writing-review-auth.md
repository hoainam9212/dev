# Task 07 — Writing, Review, Login/Register

Branch `i18n/task-07`. Read `00-overview.md` first. Consumes `useT`, `useLang` (task 01), `exampleTranslation`,
`sentenceTranslation`, `vocabMeanings`, `kanjiMeanings`, `grammarMeaning` (shared, task 01), `withLang` (task 02).

**Files** (under `client/src`; remove each from `i18n/pending-files.ts`)
- `pages/writing/`: WritingLog.tsx (15 VI lines), SentenceBuilder.tsx (12), WritingPage.tsx (8)
- `pages/ReviewPage.tsx` (6), `pages/LoginPage.tsx` (10)
- Modify: `i18n/vi.ts`, `i18n/en.ts` — groups `writing`, `review`, `auth`

**Interfaces / rules**
- SentenceBuilder prompt: today it shows `item.en` → use `exampleTranslation(item, lang)` (Vietnamese once
  translated, English otherwise).
- WritingLog: the saved sentences are the learner's own Japanese — never translated; only chrome and dates
  (`toLocaleDateString` per overview rule).
- ReviewPage card backs use the matching picker for each card kind (vocab → `vocabMeanings`, kanji →
  `kanjiMeanings`, grammar → `grammarMeaning`).
- LoginPage: labels, placeholders, validation and server messages. Server error strings come from
  `api/client.ts` (task 03); the page must not hard-code a Vietnamese fallback.
- Review count line uses a plural-aware function: EN `1 card due` / `12 cards due`.

- [ ] **Step 1: Tests first (fail)**
  - WritingPage in English shows its tabs in English.
  - SentenceBuilder in VI with `examples[].vi` shows the Vietnamese prompt; without it the English one.
  - WritingLog in English shows the empty-state text and an `en-US` formatted date for a saved entry.
  - ReviewPage in English: "1 card due" vs "2 cards due"; card back for a vocab with `meaningsVi` is Vietnamese
    in VI mode.
  - LoginPage in English: field labels and submit button English; `mode="register"` title English.
- [ ] **Step 2:** Run → fail.
- [ ] **Step 3:** Migrate `pages/writing/*`.
- [ ] **Step 4:** Migrate ReviewPage and LoginPage.
- [ ] **Step 5:** Remove paths from `PENDING`; guard + check command → green.
- [ ] **Step 6: Verify in Chrome:** `node scripts/ui-check.cjs --lang en --shots /writing,/review,/login,/register`
  → `NO OVERFLOW`; open PNGs (form fields at 360px, long English labels).
- [ ] **Step 7: Commit** (`feat(i18n): translate writing, review and sign-in`) + STATUS; ff `master`.
