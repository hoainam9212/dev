# Task 02 — Shared components and app chrome

Branch `i18n/task-02`. Read `00-overview.md` first. Consumes `useT`, `useLang`, `Dict` from task 01.

**Files** (all under `client/src`; remove each from `i18n/pending-files.ts`)
- `components/`: AccountCard.tsx (17 lines of VI text), FlashcardSession.tsx (11), QuizRunner.tsx (5),
  TypingAnswer.tsx (5), SpeakButton.tsx (4), QuizChoice.tsx (3), SrsBadge.tsx (3), WritingPractice.tsx (3),
  LoadingCat.tsx (2), BarChart.tsx (1), XpBar.tsx (1), StrokeAnimation.tsx (1), LevelPicker.tsx (1)
- `app/`: TtsNotice.tsx (4), Celebration.tsx (2), ThemeToggle.tsx (2), SyncDot.tsx (1)
- `App.tsx` (1), `pages/Placeholder.tsx` (1)
- Modify: `i18n/vi.ts`, `i18n/en.ts` — add groups `common` (shared words: close, next, back, retry, correct,
  wrong, score…), `app` (toasts, TTS notice, sync, theme), `flashcards`, `quiz`, `account`.

**Interfaces**
- Components keep their props; text comes from `useT()` inside them. If a component exports a helper that
  returns text (e.g. `srsStatus` label), change it to return a key/enum and translate at render.
- `SrsBadge`, `FlashcardSession` grade labels, `QuizRunner` result lines and `TypingAnswer` feedback become
  dictionary entries (`flashcards.grades.again|hard|good|easy` + hint functions `(interval: string) => string`).
- AccountCard: login/logout/sync texts under `account.*`; server error text is task 03 (`api/client.ts`).

**English copy rules:** short labels (buttons ≤ 2 words where the VI one is short), sentence case, no trailing
period on buttons. Count functions handle singular/plural.

- [ ] **Step 1: Tests first (fail)** — one test per line, in the existing test files next to each component
  (create when missing):
  - FlashcardSession in English shows "Tap to flip" and grade buttons "Again / Hard / Good / Easy".
  - QuizRunner in English shows the final score line with correct singular/plural (1 question vs 5 questions).
  - TypingAnswer in English shows the correct/wrong feedback.
  - WritingPractice in English shows "Stroke 1 / 3" and, after completion, "Done! Score: N".
  - TtsNotice in English renders its message; LoadingCat/ErrorCat default texts are English.
  - AccountCard in English shows the signed-out call to action.
  Helper for all: render inside a wrapper that calls `useSettings.getState().setLang('en')` before render and
  resets to `'vi'` in `afterEach` (put it in `client/src/test/lang.ts`: `export function withLang(l: Lang): void`).
- [ ] **Step 2:** Run them → fail.
- [ ] **Step 3:** Migrate `components/*` listed above (dictionary entries in both files).
- [ ] **Step 4:** Migrate `app/*`, `App.tsx`, `Placeholder.tsx`.
- [ ] **Step 5:** Remove the migrated paths from `PENDING`; guard test + check command → green (existing
  Vietnamese assertions must still pass untouched).
- [ ] **Step 6: Verify in Chrome:** `node scripts/ui-check.cjs --lang en --shots /,/review,/vocab` →
  `NO OVERFLOW`; open the PNGs: flashcard/quiz chrome English, no Vietnamese in shared widgets.
- [ ] **Step 7: Commit** (`feat(i18n): translate shared components and app chrome`) + STATUS; ff `master`.
