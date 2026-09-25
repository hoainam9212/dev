# Task 06 — Reading, Listening, Speaking

Branch `i18n/task-06`. Read `00-overview.md` first. Consumes `useT`, `useLang` (task 01), `pickText`,
`sentenceTranslation` (shared, task 01), `withLang` (task 02).

**Files** (under `client/src`; remove each from `i18n/pending-files.ts`)
- `pages/reading/`: ReadingLessonView.tsx (11 VI lines), ReadingPage.tsx (4)
- `pages/listening/`: ListeningLessonView.tsx (17), ListeningPage.tsx (1)
- `pages/speaking/`: Roleplay.tsx (14), Shadowing.tsx (9), SpeakingPage.tsx (3)
- Modify: `i18n/vi.ts`, `i18n/en.ts` — groups `reading`, `listening`, `speaking`

**Interfaces / rules**
- Authored Vietnamese content goes through `pickText(x.vi, x.en, lang)`: reading `vocab[].vi` (+ `en?`),
  reading `explain` → `pickText(lesson.explain, lesson.explainEn, lang)`, listening `script[].vi` (+ `en?`).
  In EN mode these show Vietnamese until a later translation phase — expected, not a bug.
- Shadowing translation line → `sentenceTranslation(s, lang)` (English source today).
- Speech-recognition result texts (heard / score / try again) come from the dictionary; error texts come from
  `lib/stt.ts` (already migrated in task 03).
- Question prompts and choices are Japanese — unchanged.

- [ ] **Step 1: Tests first (fail)**
  - ReadingLessonView in English: section headings and the "show translation"/"check" buttons are English.
  - ReadingLessonView vocab gloss uses `en` when present in EN mode and falls back to `vi` when absent.
  - ListeningLessonView in English: play/replay/show-script controls are English; script line shows `vi` in VI.
  - Shadowing in VI with `Sentence.vi` shows the Vietnamese translation; without it shows English.
  - Roleplay in English: turn prompts and result text are English.
- [ ] **Step 2:** Run → fail.
- [ ] **Step 3:** Migrate `pages/reading/*`.
- [ ] **Step 4:** Migrate `pages/listening/*` and `pages/speaking/*`.
- [ ] **Step 5:** Remove paths from `PENDING`; guard + check command → green.
- [ ] **Step 6: Verify in Chrome:** `node scripts/ui-check.cjs --lang en --shots /reading,/listening,/speaking`
  → `NO OVERFLOW`; open PNGs; open one reading lesson and one listening lesson in EN and screenshot them too
  (lesson views are behind a click, not a tab).
- [ ] **Step 7: Commit** (`feat(i18n): translate reading, listening and speaking`) + STATUS; ff `master`.
