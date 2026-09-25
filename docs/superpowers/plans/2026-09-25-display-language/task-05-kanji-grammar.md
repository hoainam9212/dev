# Task 05 — Kanji and Grammar pages (+ kanji / grammar content pickers)

Branch `i18n/task-05`. Read `00-overview.md` first. Consumes `useT`, `useLang` (task 01), `kanjiMeanings`,
`grammarMeaning`, `exampleTranslation` (shared, task 01), `withLang` (task 02).

**Files** (under `client/src`; remove each from `i18n/pending-files.ts`)
- `pages/kanji/`: KanjiDetail.tsx (9 VI lines), KanjiPage.tsx (6), KanjiQuiz.tsx (5), KanjiWrite.tsx (4),
  KanjiGrid.tsx (2), KanjiFlashcards.tsx (1)
- `pages/grammar/`: SentenceScramble.tsx (8), GrammarPage.tsx (7), GrammarLesson.tsx (7), GrammarQuiz.tsx (4),
  GrammarList.tsx (3), GrammarFlashcards.tsx (1)
- Modify: `i18n/vi.ts`, `i18n/en.ts` — groups `kanji`, `grammar`

**Interfaces / rules**
- Every display of `k.meanings` → `kanjiMeanings(k, lang)`: grid caption, detail, flashcards, quiz (prompt,
  options, distractors), writing picker (`<select>` option text), grid search (search matches **both**
  `meanings` and `meaningsVi`).
- `Kanji.hanViet` (optional): when present, KanjiDetail shows a "Hán Việt" row (label from dictionary; EN label
  "Sino-Vietnamese") under On/Kun, in both languages. Nothing shows while the field is absent.
- Grammar `meaning` → `grammarMeaning(g, lang)`; example translation → `exampleTranslation(e, lang)`
  (list, lesson, flashcards, quiz, sentence scramble prompt). `formation` and `title` stay as they are.
- KanjiDetail header labels ("Kanji trước/sau", position, "Đóng") and "nét · lớp" line come from the
  dictionary: EN `N5 · 8 strokes · grade 2`, with singular "1 stroke".
- KanjiGrid count line: EN `79 kanji`; KanjiPage "đã học N" → "N learned".

- [ ] **Step 1: Tests first (fail)**
  - KanjiDetail in English: buttons "Previous kanji / Next kanji / Close", "1 stroke" vs "8 strokes".
  - KanjiDetail shows a Hán Việt row only when `hanViet` is set.
  - KanjiGrid search finds a kanji by a `meaningsVi` word.
  - KanjiQuiz options use `kanjiMeanings` (fixture with `meaningsVi` → Vietnamese options in VI).
  - GrammarLesson in VI with `meaningVi` / `examples[].vi` shows them; in EN shows `meaning` / `en`.
  - GrammarPage in English shows its mode tabs in English.
- [ ] **Step 2:** Run → fail.
- [ ] **Step 3:** Migrate `pages/kanji/*` (keep existing swipe/detail tests green — they query by aria-label
  text that stays Vietnamese in VI mode).
- [ ] **Step 4:** Migrate `pages/grammar/*`.
- [ ] **Step 5:** Remove paths from `PENDING`; guard + check command → green.
- [ ] **Step 6: Verify in Chrome:** `node scripts/ui-check.cjs --lang en --shots /kanji,/grammar` →
  `NO OVERFLOW`; open PNGs; open a kanji detail in EN (header ‹ n/N › ✕ fits at 360px).
- [ ] **Step 7: Commit** (`feat(i18n): translate kanji and grammar`) + STATUS; ff `master`.
