# Task 04 — Kana and Vocabulary pages (+ vocab / kana content pickers)

Branch `i18n/task-04`. Read `00-overview.md` first. Consumes `useT`, `useLang` (task 01), `vocabMeanings`,
`kanaMnemonic` (shared, task 01), `withLang` (task 02).

**Files** (under `client/src`; remove each from `i18n/pending-files.ts`)
- `pages/kana/`: KanaPage.tsx (12 VI lines), KanaChart.tsx (5), KanaWrite.tsx (2), KanaQuiz.tsx (2)
- `pages/vocab/`: VocabPage.tsx (7), VocabList.tsx (6), VocabQuiz.tsx (4), VocabTyping.tsx (3),
  VocabListening.tsx (3), VocabFlashcards.tsx (1)
- Modify: `i18n/vi.ts`, `i18n/en.ts` — groups `kana`, `vocab`

**Interfaces / rules**
- Every display of `v.meanings` → `vocabMeanings(v, lang)` (list, quiz prompt, quiz options and their
  distractors, typing check, listening, flashcard back). For typing answers, accept a match against **either**
  language's list (a learner may type the English meaning in VI mode while `meaningsVi` is partial).
- Kana mnemonic → `kanaMnemonic(c, lang)` (Vietnamese source; English falls back to Vietnamese until a later
  translation phase).
- Segmented labels: Hiragana/Katakana stay; "Bảng chữ / Nhận diện / Luyện viết" → "Chart / Recognize / Write";
  "Cơ bản / Dakuten / Yōon / Tất cả" → "Basic / Dakuten / Yōon / All" (keep them short — these rows wrap at 360px).
- aria-labels in the kana sheet ("Chi tiết chữ", "Đóng", "Thứ tự nét") come from the dictionary; update the
  existing tests that query them **only** if they query by a label whose Vietnamese text changes (it must not).

- [ ] **Step 1: Tests first (fail)**
  - KanaPage in English shows tabs "Chart / Recognize / Write" and group tabs "Basic / … / All".
  - KanaChart in English: the sheet's close button is "Close" and the empty hint is English.
  - VocabList in VI with an item having `meaningsVi` shows the Vietnamese meaning; the same item in EN shows
    the English one; an item without `meaningsVi` shows English in both.
  - VocabQuiz options use `vocabMeanings` (a fixture with `meaningsVi` shows Vietnamese options in VI mode).
  - VocabTyping accepts the English meaning in VI mode when `meaningsVi` exists.
- [ ] **Step 2:** Run → fail.
- [ ] **Step 3:** Migrate `pages/kana/*`.
- [ ] **Step 4:** Migrate `pages/vocab/*` with `vocabMeanings`.
- [ ] **Step 5:** Remove paths from `PENDING`; guard + check command → green.
- [ ] **Step 6: Verify in Chrome:** `node scripts/ui-check.cjs --lang en --shots /kana,/vocab` → `NO OVERFLOW`
  (360px is where the kana tab rows are tightest); open PNGs; also tap a kana in the EN screenshot run's chart
  (bottom sheet English).
- [ ] **Step 7: Commit** (`feat(i18n): translate kana and vocabulary`) + STATUS; ff `master`.
