# Brief cho Claude cloud — đợt "Sách của tôi" (2026-11-14)

Cách dùng: New session → Cloud → repo `hoainam9212/dev`, dán nguyên một khối. Ba phiên (C, D, B) chạy song song
được vì mỗi phiên chỉ sửa file của mình. Phiên trên máy (local) đang sửa `tools/book-import/**`,
`client/src/pages/bjt/books/BookRunner.tsx` và `client/src/pages/bjt/books/book.ts` — cloud không đụng ba chỗ này.

Nền: `nihongo-sensei/master` commit `2def228` (màn "Sách của tôi" ở `/bjt/sach`, mỗi câu đã có ảnh riêng).

Ngắn gọn cho phiên cloud: nếu người dùng chỉ nói "làm Brief C" hay "làm Brief D", đọc khối tương ứng dưới đây và
làm đúng phạm vi file của khối đó.

## Ai giữ file nào (đợt này)

| Phiên | Nhánh | Được sửa |
|---|---|---|
| local (máy người dùng) | `nihongo-sensei/master` | `tools/book-import/**`, `client/src/pages/bjt/books/**`, `client/src/db/**`, gộp nhánh, APK |
| cloud C — zoom ảnh | `nihongo-sensei/feat/zoom-image` | `client/src/components/ZoomImage.tsx` (+ test), cuối khối `common` trong i18n |
| cloud D — thống kê sách | `nihongo-sensei/feat/bjt-book-stats` | `client/src/pages/bjt/BjtPage.tsx`, `bjt.ts`, `useBookStats.ts` (+ test), cuối khối `bjt` trong i18n |
| cloud A — đề nghe | `nihongo-sensei/feat/bjt-content-listening` | `data/authored/bjt/chokai*`, `chodokkai*` (tuần 1–7, 9–11 + nghe của mock1/mock2; local đang soát rồi gộp) |
| cloud B1/B2/B3 — đề đọc + từ vựng | `nihongo-sensei/feat/bjt-content-reading-1`, `-2`, `-3` | file tuần riêng trong `data/authored/bjt/dokkai/`, `goi/` + dòng của mình trong `dokkai.ts`, `goi.ts` — brief: `2026-11-14-brief-b-reading.md` |

Repo này PUBLIC: không đưa sách luyện thi, băng, chữ chép từ sách, vị trí thật hay bí mật vào commit.

---

## Brief C — khung xem ảnh phóng to bằng hai ngón tay

```
Repo hoainam9212/dev holds several projects and is PUBLIC. Run `git fetch origin && git checkout
nihongo-sensei/master` first (`main` has only a README). The repo root is then Nihongo Sensei, a
Japanese-learning app for Vietnamese speakers (React + Vite + Tailwind v4, Capacitor Android).

Context: the BJT page /bjt/sach shows scanned pages of the learner's own prep books (images kept on the device,
never in the repo). On a phone the small print needs zooming; today there is only a fixed 200% button. Build a
reusable zoomable image viewer. A local session will wire it into the book screen later; you do NOT touch the
book screen.

Read first: CLAUDE.md, client/src/pages/bjt/books/BookRunner.tsx (function PageImage: how a page is shown now,
read only), client/src/test/setup.ts (jsdom has PointerEvent emulated there).

Branch: create nihongo-sensei/feat/zoom-image from nihongo-sensei/master.

Files you may create or change — nothing else:
- client/src/components/ZoomImage.tsx and client/src/components/ZoomImage.test.tsx
- new keys at the END of the `common` block in client/src/i18n/vi.ts and client/src/i18n/en.ts (only if you need
  visible text, e.g. button labels). Do not touch any other i18n block.

Behaviour of <ZoomImage src alt className? children? />:
- Fits the width of its frame at scale 1. Two-finger pinch zooms between 1x and 4x around the pinch centre;
  one finger drags (pans) only while zoomed, so at 1x the page still scrolls normally; double-tap toggles 1x/2.5x
  at the tapped point; panning is clamped so the image never leaves an empty gap inside the frame.
- Mouse: ctrl+wheel zooms, drag pans while zoomed. Small "+", "−", "1:1" buttons in a corner for people who
  cannot pinch; buttons have aria-labels.
- Use pointer events + CSS transform (translate + scale) on the image, `touch-action: pan-y` at 1x and `none`
  while zoomed; no new npm dependency. Keep it smooth: update the transform in requestAnimationFrame.
- Optional `children` are rendered inside the transformed layer (the local session will pass a cropped page
  there instead of a plain <img>), so design the API as: <ZoomImage>{anything}</ZoomImage> with `src` optional.
- Pure maths (clamp, zoom around a point) in exported helper functions, unit-tested.

Checks: TDD; `npm install`, then `npm test -w client` and `npm run typecheck -w client` must pass. No Vietnamese
text outside client/src/i18n/ (a test enforces it). Commit email must be lehoainam.htd@gmail.com (check
`git config user.email`), English commit messages with a body. Push to origin nihongo-sensei/feat/zoom-image.
Do not merge into master, do not bump any version, do not build an APK.

Done: branch pushed, tests and typecheck green, final message in Vietnamese: the component API, what you tested,
what you could not test without a real phone.
```

---

## Brief D — đưa kết quả làm sách vào thống kê BJT

```
Repo hoainam9212/dev holds several projects and is PUBLIC. Run `git fetch origin && git checkout
nihongo-sensei/master` first (`main` has only a README). The repo root is then Nihongo Sensei, a
Japanese-learning app for Vietnamese speakers (React + Vite + Tailwind v4, zustand, Dexie).

Context: /bjt has tabs (plan, sections, vocab, mock). The learner can now also sit tests from their own prep
books at /bjt/sach. Book answers are saved in the zustand store `useBjt` (client/src/store/bjt.ts) under keys
`book:<bookId>:<testId>:<no>` (true = right), and timed runs under `runs['book:<bookId>:<testId>']`. Book
indexes live in IndexedDB table `db.books` (client/src/db/db.ts); `stored.book` is a PackBook
(client/src/pages/bjt/books/book.ts) whose questions carry `section` (one of the 9 BJT sections). Today the
/bjt tabs ignore book results entirely.

Read first: CLAUDE.md, client/src/pages/bjt/BjtPage.tsx, client/src/pages/bjt/bjt.ts,
client/src/pages/bjt/books/book.ts and BooksPage.tsx (read only), client/src/store/bjt.ts.

Branch: create nihongo-sensei/feat/bjt-book-stats from nihongo-sensei/master.

Files you may create or change — nothing else:
- client/src/pages/bjt/BjtPage.tsx, BjtPage.test.tsx, client/src/pages/bjt/bjt.ts, bjt.test.ts
- new file client/src/pages/bjt/useBookStats.ts (+ test)
- new keys at the END of the `bjt` block in client/src/i18n/vi.ts and en.ts. Do not touch other i18n blocks.
Do not edit anything under client/src/pages/bjt/books/, client/src/db/, client/src/store/, tools/, data/.

What to build:
1. A pure function (in bjt.ts) that, from the stored books and the `answers` map, returns per BJT section
   {answered, correct} for book questions only. A hook useBookStats() reads db.books with useLiveQuery
   (dexie-react-hooks) and useBjt answers and returns that.
2. "sections" tab: each section card already shows the accuracy of the app's own questions; add a second small
   line "Sách: đúng X/Y" (only when Y > 0) so the learner sees both sources apart. Do not merge the two numbers.
3. "plan" tab: on the existing "📚 Sách của tôi" card, when there are wrong book answers, show
   "Câu sai trong sách: N" (link stays /bjt/sach). When a timed book run exists, show the latest one as
   "Thi thử sách gần nhất: S điểm (level)" using bjtEstimate from @nihongo/shared.
4. "mock" tab: list timed book runs (title of book + test, latest score, date) under the app's own mocks.

Checks: TDD; `npm install`, `npm test -w client`, `npm run typecheck -w client` green. Tests use
fake-indexeddb (already in the setup) — put a small book into db.books in the test, never real book content.
No Vietnamese text outside i18n (a test enforces it). The UI must not overflow at 390 px width. Commit email
lehoainam.htd@gmail.com, English messages with a body. Push to origin nihongo-sensei/feat/bjt-book-stats. Do not
merge, do not bump versions, no APK.

Done: branch pushed, tests + typecheck green, final message in Vietnamese with what changed on each tab and
anything unsure.
```
