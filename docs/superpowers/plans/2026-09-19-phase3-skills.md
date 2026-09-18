# Phase 3 – Grammar, Reading, Listening, Speaking, Writing

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the five remaining skill modules on top of the Phase 2 infrastructure: grammar lessons with SRS and quizzes, reading passages with furigana and tap-to-lookup, listening lessons with TTS playback and dictation, speaking practice with speech recognition scoring, and writing (sentence building) practice.

**Architecture:** Grammar comes from the Hanabira bundle already built. Reading and listening lessons are authored in `data/authored/{reading,listening}.ts` and emitted per level by `build.ts`. A furigana mini-markup `[漢字|かんじ]` is parsed by `shared/src/furigana.ts`. Speech recognition is wrapped in `client/src/lib/stt.ts`; scoring uses `pronunciationScore` from shared. Pages follow the Phase 2 pattern (LevelPicker + Segmented modes + QuizRunner/FlashcardSession).

**Tech Stack:** as before; Web Speech `SpeechRecognition` (Chrome/Edge).

**Spec:** `docs/superpowers/specs/2026-09-19-nihongo-sensei-design.md` (5.3 Ngữ pháp, Đọc, Nghe, Nói, Viết)

## Global Constraints

- Authored content: at least 3 reading lessons and 3 listening lessons per level (N5–N1), Vietnamese translations included. Dictation lines are kana-only so typed answers compare with `normalizeKana`.
- Grammar SRS uses `ItemType 'grammar'` and ids `g-nX-####`.
- Speaking pass threshold: `pronunciationScore ≥ 70` (+3 XP), 40–69 (+1 XP).
- Unsupported browser → clear Vietnamese message, never a crash.
- Branch `feat/phase3-skills`; commit per task.

---

### Task 1: Furigana parser (shared) + authored reading/listening content + build

**Files:** `shared/src/furigana.ts` (+test), `data/authored/reading.ts`, `data/authored/listening.ts`, modify `data/scripts/build.ts` (emit `reading/nX.json`, `listening/nX.json`, counts), test `data/src/authored.test.ts` (≥3 lessons per level, questions have valid `answer` index, dictation lines are kana).

**Interfaces:**
```ts
// shared/src/furigana.ts
export interface FuriSeg { text: string; ruby?: string }
export function parseFurigana(s: string): FuriSeg[];      // "[漢字|かんじ]を読む" → [{text:'漢字',ruby:'かんじ'},{text:'を読む'}]
export function stripFurigana(s: string): string;         // "漢字を読む"
export function furiganaToKana(s: string): string;        // "かんじを読む" (rubies replace their bases)
```

Commit: `feat: furigana parser, authored reading/listening lessons, build output`.

---

### Task 2: Grammar module

**Files:** `client/src/pages/grammar/GrammarPage.tsx`, `GrammarList.tsx`, `GrammarLesson.tsx`, `GrammarFlashcards.tsx`, `GrammarQuiz.tsx`, `client/src/lib/chunk.ts` (+test), route `/grammar`, test `GrammarQuiz.test.tsx`.

**Interfaces:**
```ts
export function chunkSentence(ja: string, parts?: number): string[]; // deterministic split at kana/kanji/punct boundaries, 3–6 chunks
export function buildGrammarQuestions(grammar: Grammar[], dir: 'meaning→title' | 'example→title', total: number, rng?): QuizQuestion[];
```
Behaviour: list with search (title/meaning) + SrsBadge; lesson view: title, meaning, formation, examples (ja/romaji/en + 🔊), "Đánh dấu đã học"; flashcards (front: title; back: meaning + formation + first example); quiz (4-choice) and "Sắp xếp câu" (tap chunks in order; correct → +2 XP).

Commit: `feat(client): grammar module`.

---

### Task 3: Reading module

**Files:** `client/src/pages/reading/ReadingPage.tsx`, `ReadingLessonView.tsx`, `client/src/components/Furigana.tsx` (+test), route `/reading`.

Behaviour: level → lesson cards (title, vocab count, questions count) → lesson: `<ruby>` rendering with furigana toggle; tapping a vocab word (from `lesson.vocab`) opens a popover with reading + Vietnamese meaning + 🔊; "🔊 Đọc cả bài" (TTS on stripped text) with rate slider; questions via QuizRunner (kind 'quiz', type 'grammar' is wrong → add `'reading' | 'listening' | 'speaking' | 'writing'` to `SessionLog.type`).

Commit: `feat(client): reading module`.

---

### Task 4: Listening module

**Files:** `client/src/pages/listening/ListeningPage.tsx`, `ListeningLessonView.tsx`, `client/src/lib/tts.ts` (add `speakSequence(lines: string[], opts): { cancel(): void; done: Promise<void> }`), route `/listening`, test `tts.test.ts` for `speakSequence` ordering with a mocked speechSynthesis.

Behaviour: lesson: play all lines sequentially with rate control (0.6–1.2) and per-line play; script hidden by default ("Hiện lời thoại" reveals ja + vi); questions via QuizRunner; dictation: for each line, 🔊 then `TypingAnswer` (expected kana line) with diff; +2 XP each.

Commit: `feat(client): listening module`.

---

### Task 5: Speaking module

**Files:** `client/src/lib/stt.ts` (+test with a fake recognizer), `client/src/pages/speaking/SpeakingPage.tsx`, `Shadowing.tsx`, `Roleplay.tsx`, route `/speaking`.

**Interfaces:**
```ts
export function canRecognize(): boolean;
export function recognizeOnce(opts?: { lang?: string; timeoutMs?: number }): Promise<string>; // rejects with Error('unsupported'|'no-speech'|'aborted')
```
Behaviour: Shadowing: sentences from `sentences/nX.json` (≤ 25 chars), show ja + en, 🔊, 🎤 → transcript + score bar + mascot mood; "Câu tiếp". Roleplay: pick a listening lesson; mascot speaks speaker-A lines (TTS); user speaks speaker-B lines; score each; summary.

Commit: `feat(client): speaking module`.

---

### Task 6: Writing module

**Files:** `client/src/pages/writing/WritingPage.tsx`, `SentenceBuilder.tsx`, route `/writing`, test `SentenceBuilder.test.tsx`.

Behaviour: tabs "Kana" (reuses `KanaWrite` with script toggle), "Kanji" (reuses `KanjiWrite` with level), "Đặt câu": from grammar examples of the level: show en + grammar title + formation; user types ja; pass when `similarity(strip(typed), strip(example.ja)) ≥ 0.8` (strip punctuation/spaces); show diff; +2 XP.

Commit: `feat(client): writing module`.
