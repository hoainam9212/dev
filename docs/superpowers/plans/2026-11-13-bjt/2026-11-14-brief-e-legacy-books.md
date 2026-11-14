# Brief E — "Sách của tôi" chạy được đề mẫu cũ 100 câu + ôn câu sai từ sách (2026-11-14)

Chạy song song với đợt cuối (A2, A3, B4, B5 chỉ sửa `data/`). Phiên local đang đóng gói sách riêng của người học
(nằm ngoài git) và sửa `tools/book-import/**`; phiên này không đụng `tools/` và `data/`.

Cách dùng: New session → Cloud → repo `hoainam9212/dev`, gõ: *"Đọc
docs/superpowers/plans/2026-11-13-bjt/2026-11-14-brief-e-legacy-books.md trên nhánh nihongo-sensei/master và làm
Brief E"*.

```
Repo hoainam9212/dev holds several projects and is PUBLIC. Run `git fetch origin && git checkout
nihongo-sensei/master` first (`main` has only a README). The repo root is then Nihongo Sensei, a
Japanese-learning app for Vietnamese speakers (React + Vite + Tailwind v4, zustand, Dexie, vitest).

Context: /bjt/sach ("Sách của tôi") runs tests from the learner's own prep books. A book is imported from a .zip
(page images + original recordings + book.json) into IndexedDB; nothing of the book is in the repo, and tests
must use small fake books only. So far every book was in today's BJT format: 80 questions, 9 sections, 45 + 30
+ 30 minutes, and the result shows an estimated BJT score/level (bjtEstimate).

The learner now has books in the OLD BJT format: 100 questions in 120 minutes, three parts with 3/2/3
"sections" (第1部 セクション1 描写問題, … 第3部 セクション3 短文読解). The local session maps each old section
onto the nearest of today's 9 section ids, and adds these OPTIONAL fields to book.json (already written into
real packs; the app currently ignores them):

  PackTest:
    minutes?: number        // official total time of this test; overrides bookExamSeconds()
    legacy?: boolean        // old-format test: do NOT show bjtEstimate anywhere (book result, last-run line
                            // on the book card, "Thi thử sách gần nhất" on /bjt, the book-runs list on the
                            // mock tab); show "Đề mẫu cũ — không quy đổi sang thang J1" instead, plus the raw
                            // score X/Y
    extras?: { title: string; audio: string }[]   // instruction and 練習 (example) recordings of the book:
                            // a "Băng hướng dẫn & bài mẫu" list on the test card, each with its own player;
                            // not part of the timed run
  PackQuestion:
    label?: string          // section name as printed in the book, e.g. "第1部 セクション1 描写問題";
                            // when present, show it instead of the section's Japanese name in the runner
                            // header, the wrong-answer list and the per-section chips ("n番" stays)
    pages?: number[]        // a question printed over several pages (a long text on one page, the
                            // question and choices on the next): show every page in this order, each in
                            // its own PageImage, instead of the single `page` (which is then pages[last]);
                            // filesNeeded() must include them
    textPage?: number       // same idea for one extra page shown ABOVE `page` (some packs write this
                            // instead of `pages`); treat it as pages = [textPage, page]

Example (fake):
  { "id": "old", "title": "Old book", "pages": 3, "audio": [...],
    "tests": [{ "id": "t", "title": "体験テスト", "minutes": 120, "legacy": true,
      "extras": [{ "title": "第1部 · 練習", "audio": "audio/a003.mp3" }],
      "questions": [{ "no": 1, "section": "bamen", "n": 1, "label": "第1部 セクション1 描写問題",
                      "page": 2, "answer": 3, "audio": "audio/a004.mp3" }, …] }] }

Note: the per-section chips on the book card group by `section`; an old section can map to two ids (old 第2部
セクション1 = q1–5 jokyo + q6–15 shiryo). Group the chips by `label` when labels exist, else by section.

Part 2 — one place to redo wrong answers. /bjt already has "redo wrong" for the app's own questions, and each
book test card now has "Làm lại câu sai (N)". Add to the /bjt plan tab, next to the app's own redo, a short list
"Câu sai trong sách" with one line per book test that has wrong answers (book title · test title · N câu) whose
button opens /bjt/sach straight into that redo run (e.g. a route state or query `?redo=<bookId>:<testId>`
read by BooksPage). Use the existing helpers wrongNos() in books/book.ts and useBookStats().

Read first: CLAUDE.md; client/src/pages/bjt/books/book.ts, BookRunner.tsx, BooksPage.tsx and their tests;
client/src/pages/bjt/BjtPage.tsx, bjt.ts, useBookStats.ts; client/src/i18n/vi.ts (blocks `bjt`, `bjtBooks`).

Branch: create nihongo-sensei/feat/bjt-legacy-books from nihongo-sensei/master.

Files you may change: client/src/pages/bjt/** (including books/**) and their tests; new keys at the END of the
`bjt` and `bjtBooks` blocks in client/src/i18n/vi.ts and en.ts. Nothing under tools/, data/, shared/, server/.

Checks: TDD; `npm install`, `npm test -w client`, `npm run typecheck -w client` green. No Vietnamese text outside
i18n (a test enforces it). The UI must not overflow at 390 px. Commit email lehoainam.htd@gmail.com, English
messages with a body. Push to origin nihongo-sensei/feat/bjt-legacy-books. Do not merge, do not bump versions,
no APK.

Done: branch pushed, tests + typecheck green, final message in Vietnamese: what changed on each screen, what you
could not check without a real book.
```
