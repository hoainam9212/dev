# Phase 2b – Vocabulary, Kanji and SRS Review

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Persist SRS progress in IndexedDB and ship the Vocabulary module (list, flashcards, quiz, typing, listening), the Kanji module (grid, detail with stroke order, flashcards, quiz, writing) and the combined Review session, plus due counts on the home page.

**Architecture:** `client/src/db/` wraps Dexie: one `progress` table keyed by item id, one `sessions` log. `srs.ts` is the only writer (applies `review()` from shared). Pages read bundles with the loader hooks and progress via `useLiveQuery`. A generic `FlashcardSession` component drives any item list with grade buttons; Vocab, Kanji and Review pages adapt their items to it.

**Tech Stack:** dexie 4, dexie-react-hooks, fake-indexeddb (tests), React 18, Zustand, Web Speech API.

**Spec:** `docs/superpowers/specs/2026-09-19-nihongo-sensei-design.md` (5.3 Từ vựng, Kanji, SRS; 5.5)

## Global Constraints

- Item ids come from the bundles (`v-n5-0001`, `k-一`). `ProgressItem.type` is `'vocab' | 'kanji' | 'grammar'`.
- SM-2 grades: 0 Quên, 1 Khó, 2 Tốt, 3 Dễ. Session: all due + up to 20 new.
- XP: flashcard grade ≥ 2 → +3, grade 1 → +1; quiz/typing/listening correct → +2.
- Selected level persists in `localStorage` key `ns.level` (default `N5`).
- Vietnamese UI; dataset meanings English.
- Work on branch `feat/phase2-content`; commit after each task.

---

### Task 1: Dexie progress store

**Files:** `client/src/db/db.ts`, `client/src/db/srs.ts`, test `client/src/db/srs.test.ts`; add deps `dexie`, `dexie-react-hooks`, dev `fake-indexeddb`; test setup imports `fake-indexeddb/auto`.

**Interfaces:**
```ts
// db.ts
export class NihongoDB extends Dexie { progress!: Table<ProgressItem, string>; sessions!: Table<SessionLog, number>; }
export interface SessionLog { id?: number; startedAt: string; kind: 'flashcard'|'quiz'|'typing'|'listening'|'writing'; type: ItemType|'kana'; correct: number; total: number; xp: number }
export const db: NihongoDB;
// srs.ts
export function toState(p: ProgressItem): SrsState;
export async function getProgressMap(type?: ItemType): Promise<Map<string, ProgressItem>>;
export async function recordReview(itemId: string, type: ItemType, grade: Grade, now?: Date): Promise<ProgressItem>;
export async function countDue(now?: Date): Promise<{ vocab: number; kanji: number; grammar: number }>;
export async function dueIds(now?: Date): Promise<ProgressItem[]>;  // sorted by due
export function useProgressMap(type?: ItemType): Map<string, ProgressItem> | undefined; // useLiveQuery
export function useDueCounts(): { vocab: number; kanji: number; grammar: number } | undefined;
export async function logSession(s: Omit<SessionLog, 'id'>): Promise<void>;
export async function exportAll(): Promise<{ progress: ProgressItem[]; sessions: SessionLog[] }>;
export async function importAll(data: { progress: ProgressItem[]; sessions: SessionLog[] }): Promise<void>; // merge by updatedAt
```
Test: recordReview twice on a new item → reps 2, interval 3; countDue after forgetting → item due within 10 minutes; importAll keeps newer updatedAt.

Commit: `feat(client): dexie progress store with SRS review recording`.

---

### Task 2: Shared learning components

**Files:** `client/src/components/LevelPicker.tsx`, `client/src/store/level.ts`, `client/src/components/FlashcardSession.tsx`, `client/src/components/TypingAnswer.tsx`, `client/src/components/SrsBadge.tsx`; tests `FlashcardSession.test.tsx`, `TypingAnswer.test.tsx`.

**Interfaces:**
```ts
export const useLevel: () => { level: Level; setLevel(l: Level): void }; // zustand persist 'ns.level'
export function LevelPicker(): JSX.Element; // Segmented N5..N1 bound to useLevel
export interface CardItem { id: string; type: ItemType; front: ReactNode; back: ReactNode; speakText?: string }
export function FlashcardSession({ items, onFinish }: { items: CardItem[]; onFinish(r: { reviewed: number; correct: number }): void });
//  - shows card i, "Lật thẻ" flips, then 4 grade buttons (Quên/Khó/Tốt/Dễ) → recordReview + addXp → next.
//  - grade 0 re-queues the card at the end of the session (max once).
//  - end screen: Mascot + counts; calls onFinish once.
export function TypingAnswer({ expected, onResult, placeholder }: { expected: string; onResult(ok: boolean, typed: string): void; placeholder?: string });
//  - input (IME friendly), Enter or "Kiểm tra": ok = normalizeKana(typed) === normalizeKana(expected); shows diffChars colouring; "Tiếp" → onResult.
export function SrsBadge({ p }: { p?: ProgressItem }); // "Mới" / "Đến hạn" / "Đã học · 3 ngày"
```
Commit: `feat(client): flashcard session, typing answer, level picker`.

---

### Task 3: Vocabulary module

**Files:** `client/src/pages/vocab/VocabPage.tsx`, `VocabList.tsx`, `VocabFlashcards.tsx`, `VocabQuiz.tsx`, `VocabTyping.tsx`, `VocabListening.tsx`; `client/src/content/useSentenceMap.ts`; route `/vocab`; test `VocabQuiz.test.tsx` (mock loader data), `VocabPage.test.tsx` smoke with mocked fetch.

Behaviour:
- Header: title, `LevelPicker`, Segmented modes: Danh sách / Thẻ ghi nhớ / Trắc nghiệm / Gõ đáp án / Nghe.
- List: search box (matches word/reading/meaning), virtual-ish paging (50 per page, "Xem thêm"), each row: word, reading, meanings, `SrsBadge`, 🔊; click row → expand sentences (ja + en, 🔊).
- Flashcards: items = `buildQueue(level vocab with progress)`; front = word (+ 🔊), back = reading + meanings + first sentence.
- Quiz: 10 questions; direction toggle (word→meaning, meaning→word); distractors from same level; XP.
- Typing: show word + meanings, type reading; accepts romaji; XP.
- Listening: TTS speaks the word (no text), choose among 4 words; "Nghe lại" button; XP.
- Each mode logs a session on finish.

Commit: `feat(client): vocabulary module`.

---

### Task 4: Kanji module

**Files:** `client/src/pages/kanji/KanjiPage.tsx`, `KanjiGrid.tsx`, `KanjiDetail.tsx`, `KanjiFlashcards.tsx`, `KanjiQuiz.tsx`, `KanjiWrite.tsx`; `client/src/content/useVocabByIds.ts` (loads the level bundles implied by ids `v-nX-…`); route `/kanji`; tests `KanjiQuiz.test.tsx`, `useVocabByIds.test.ts`.

Behaviour:
- Grid: level picker, cards `char` + first meaning + SRS colour dot; search by char/meaning/reading; click → detail drawer.
- Detail: big char, StrokeAnimation (replay), strokes count, meanings, 音 on / 訓 kun (🔊 each), vocab list (from `useVocabByIds(k.vocabIds)`), buttons "Luyện viết" (opens WritingPractice inline) and "Đánh dấu đã học" (recordReview grade 2).
- Flashcards: front = char; back = meanings + on/kun + 2 vocab.
- Quiz: char → meaning (4 choices) or meaning → char; XP.
- Write: pick from level list; WritingPractice; XP on completion (≥80 → +3 else +1).

Commit: `feat(client): kanji module`.

---

### Task 5: Review page and home due counts

**Files:** `client/src/pages/ReviewPage.tsx`, modify `Home.tsx` (due counts card linking to `/review`), route `/review`; test `ReviewPage.test.tsx`.

Behaviour:
- Loads `dueIds()`; groups by type; loads needed bundles (vocab by ids via `useVocabByIds`; kanji: all levels, pick by id); builds `CardItem[]` (vocab + kanji) → `FlashcardSession`.
- Empty state: Mascot happy "Không có thẻ đến hạn. Học bài mới nhé!" with links to /vocab and /kanji.
- Home: "Ôn tập đến hạn: {n} thẻ" chip; if n > 0 primary button "Ôn ngay".

Commit: `feat(client): review session and due counts`.
