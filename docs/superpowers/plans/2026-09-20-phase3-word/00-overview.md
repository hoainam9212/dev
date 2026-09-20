# Giai đoạn 3 – Word Implementation Plan (tổng quan)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans.
> **Cách đọc plan này:** đọc **đúng file này + đúng một file `task-NN-*.md`**. Không đọc các task khác. Mọi thứ dùng chung đã nằm ở đây; mỗi task tự đủ phần còn lại. Đọc `STATUS.md` (20 dòng) để biết đã làm tới đâu.

**Goal:** Trình mô phỏng Word (`sim: 'word'`) chạy được như các sim giai đoạn 2, kèm 15 bài lộ trình Word, mục từ điển và FAQ liên quan.

**Architecture:** Giữ nguyên quy tắc giai đoạn 2 — **logic thuần trong `shared`, giao diện trong `client`**. Tài liệu Word là **JSON ProseMirror**; `shared/src/sims/word/` giữ schema + reducer thuần + grader (dùng `prosemirror-*` qua `@tiptap/pm/*`, không chạm DOM). `client/src/sims/word/` dùng TipTap làm phần gõ chữ, nhưng **state vẫn do `useReducer(reduceWord, initial)` giữ**: TipTap chỉ phát action vào reducer và nhận doc mới trở lại. Nhờ vậy test nội dung vẫn phát lại `solution` qua đúng reducer mà giao diện đang dùng.

**Tech Stack:** giữ nguyên TypeScript 5.6, React 18.3, react-router-dom 6, zustand, Dexie 4, Tailwind 4, Vitest 2, Testing Library. **Thư viện mới duy nhất:** họ `@tiptap/*` v2 (MIT) — xem Task 1.

**Spec:** `docs/superpowers/specs/2026-09-19-office-neko-design.md` — mục 4 (bảng lộ trình, dòng `2 | Word`), 5 (Trợ giúp), 6.1–6.2 (mô hình bài học), **7.4 (Word)**, 9 (Kiểm thử), 10 (thứ tự triển khai).

---

## Global Constraints

- Thư mục dự án: `C:\Users\vnext\Desktop\Project Manager\97. Tools\Dev\office-neko` (git repo riêng, branch `master`). Chạy lệnh bằng Git Bash từ thư mục này.
- Tên package: `@office-neko/shared`, `@office-neko/client`. Tên hiển thị **Tin Học Cùng Mochi**; mascot mèo **Mochi**.
- Toàn bộ chữ giao diện là **tiếng Việt**, file UTF-8 dạng NFC. Nhãn nút ribbon giữ tên tiếng Anh thật (Bold, Heading 1…) kèm tooltip tiếng Việt qua `helpId`.
- Không server, không gọi mạng lúc chạy. Không dùng logo/thương hiệu Microsoft: vỏ Word vẽ bằng CSS/emoji, gọi là "trình soạn thảo mô phỏng".
- `tsconfig` bật `strict` và `noUncheckedIndexedAccess`. Test import rõ từ `vitest`.
- Màu chữ dùng token có sẵn: `text-rose-ink`, `text-excel-ink`, `text-muted`. Nút chính `.btn-primary`.
- **Quy tắc trình mô phỏng (bất di bất dịch):** Component giữ state bằng `useReducer(def.reduce, initial)` và gọi `onState(state)` mỗi khi state đổi. Không có logic trạng thái nằm ngoài reducer.
- Mỗi task kết thúc bằng **một commit**: `git commit -m "<subject>" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"`.
- Sau mỗi task: cập nhật `STATUS.md` (1 dòng) **trong cùng commit**, và tick các `- [ ]` của task vừa xong.

## Quy ước chung cho mọi task

**Lệnh kiểm tra** (chạy từ gốc repo):
- Test một phần: `npm test -w shared -- <tên>` hoặc `npm test -w client -- <tên>`
- Toàn bộ: `npm test && npm run typecheck`
- Chạy thử: preview `office-neko` (dev server `npm run dev -w client`, cổng 5174)

**Nhịp TDD mỗi task:** viết test FAIL → chạy xác nhận FAIL → viết code tối thiểu → chạy xác nhận PASS → (task giao diện: **kiểm tra trên trình duyệt ngay trong task này**) → commit.

**Kiểm tra trình duyệt là việc của từng task, không dồn về cuối.** Task nào đẻ ra thành phần tương tác đều có một step mở preview, thử 3–4 thao tác của riêng thành phần đó và xác nhận console sạch. Giai đoạn 2 dồn việc này vào task cuối và phải trả giá bằng 11 commit sửa lỗi trong 30 phút.

**Không placeholder:** không "TODO", không "xử lý lỗi phù hợp", không "tương tự Task N".

## Bảng thuật ngữ trong plan

| Tên | Nghĩa |
|---|---|
| `WordState` | State của sim Word, xem Task 2 |
| `WordAction` | Union action của reducer, mỗi task thêm nhánh của mình |
| `WordCheck` | Union điều kiện chấm, xem Task 7 |
| doc JSON | Cây `{ type, attrs?, content?, marks?, text? }` kiểu ProseMirror |
| pos | Vị trí con trỏ trong doc JSON theo cách đếm của ProseMirror |

## Danh sách task

Thứ tự bắt buộc: Task N chỉ bắt đầu khi Task N−1 đã commit.

| # | File | Nội dung | Ước lượng |
|---|---|---|---|
| 1 | `task-01-deps-schema.md` | Cài `@tiptap/*`, schema tài liệu Word (shared) | 1 phiên nhỏ |
| 2 | `task-02-core-reducer.md` | `WordState`, gõ chữ, xoá, chọn vùng, undo (shared) | 1 phiên |
| 3 | `task-03-marks.md` | Định dạng chữ: bold/italic/underline/font/size/màu/highlight (shared) | 1 phiên nhỏ |
| 4 | `task-04-blocks.md` | Căn lề, giãn dòng, Heading 1–3, danh sách (shared) | 1 phiên |
| 5 | `task-05-table-image.md` | Bảng và ảnh (shared) | 1 phiên |
| 6 | `task-06-find-toc-save.md` | Tìm & Thay thế, mục lục, lưu/in mô phỏng (shared) | 1 phiên |
| 7 | `task-07-grader.md` | `gradeWord` + đăng ký `GRADERS.word` (shared) | 1 phiên nhỏ |
| 8 | `task-08-wordsim-shell.md` | `WordSim` + cầu nối TipTap ↔ reducer + trang A4 (client) | 1 phiên |
| 9 | `task-09-ribbon-home.md` | Ribbon tab Home + helpId (client) | 1 phiên |
| 10 | `task-10-ribbon-rest.md` | Tab File/Insert/Layout/References/View + hộp thoại (client) | 1 phiên |
| 11 | `task-11-lessons-1-2.md` | `wordPractice`, đăng ký sim, chương 1–2 (6 bài) | 1 phiên |
| 12 | `task-12-lessons-3-4.md` | Chương 3–4 (5 bài) | 1 phiên |
| 13 | `task-13-lessons-5-project.md` | Chương 5 + dự án Đơn xin việc (4 bài) | 1 phiên |
| 14 | `task-14-glossary-wrapup.md` | Từ điển, FAQ, README, kiểm tra tổng thể | 1 phiên nhỏ |

## Cấu trúc file sẽ tạo

```
shared/src/sims/word/
  schema.ts        # schema ProseMirror + kiểu doc JSON              (Task 1)
  state.ts         # WordState, WordAction, reduceWord, helper vị trí (Task 2–6)
  text.ts          # gõ/xoá/chọn                                      (Task 2)
  marks.ts         # định dạng chữ                                    (Task 3)
  blocks.ts        # đoạn, heading, danh sách                         (Task 4)
  objects.ts       # bảng, ảnh                                        (Task 5)
  doc.ts           # tìm & thay thế, mục lục, lưu/in                  (Task 6)
  grade.ts         # gradeWord                                        (Task 7)
  index.ts         # gom export, `export * as wordSim` từ shared/src/index.ts
client/src/sims/word/
  WordSim.tsx      # khung + useReducer + onState                     (Task 8)
  Editor.tsx       # cầu nối TipTap                                   (Task 8)
  Page.tsx         # trang A4                                         (Task 8)
  RibbonHome.tsx   # tab Home                                         (Task 9)
  Ribbon.tsx       # thanh tab + các tab còn lại                      (Task 10)
  dialogs.tsx      # Tìm&Thay thế, Lưu, In, Thư viện ảnh              (Task 10)
client/src/content/lessons/word-*.ts                                  (Task 11–13)
```

## Bất biến phải luôn đúng

1. `client/src/content/content.test.ts` (đã có) phát lại `solution` của **mọi** `PracticeStep` qua reducer rồi chấm — phải `pass`. Đây là lưới an toàn chính; đừng sửa test này để "cho qua".
2. Mọi `[[thuật ngữ]]` trong bài phải có trong `glossary.json`.
3. Mọi `helpId` trong `hints[1]` phải có trong `HELP_IDS`.
4. `reduceWord` phải **thuần**: cùng state + action ra cùng kết quả, không đụng `Date.now()`, không random. Thời gian, nếu cần, đi kèm trong action.
