# Giai đoạn 4A – Excel nền tảng (tổng quan)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans.
> **Cách đọc plan này:** đọc **đúng file này + đúng một file `task-NN-*.md`**. Không đọc các task khác. Mọi thứ dùng chung đã nằm ở đây. Đọc `STATUS.md` (ngắn) để biết đã làm tới đâu.

**Goal:** Bộ tính công thức Excel + trình mô phỏng bảng tính (`sim: 'excel'`) chạy được như các sim trước, kèm 12 bài đầu của lộ trình Excel (chương 1–4).

**Architecture:** Giữ nguyên quy tắc từ giai đoạn 2 — **logic thuần trong `shared`, giao diện trong `client`**. Bộ tính công thức (`shared/src/formula/`) không biết gì về sổ tính: nó nhận một `CellSource`. Sổ tính (`shared/src/sims/excel/`) giữ **chữ người dùng gõ** trong mỗi ô, giá trị là dẫn xuất — không bao giờ lưu. `client/src/sims/excel/` chỉ vẽ và phát action; state do `useReducer(reduceExcel, initial)` giữ.

**Tech Stack:** giữ nguyên TypeScript 5.6, React 18.3, react-router-dom 6, zustand, Dexie 4, Tailwind 4, Vitest 2, Testing Library. **Không thêm thư viện nào** — lưới, biểu đồ, mọi thứ đều tự dựng.

**Spec:** `docs/superpowers/specs/2026-09-21-excel-design.md` (chi tiết) và `docs/superpowers/specs/2026-09-19-office-neko-design.md` §7.5, §6.1, §9.

---

## Global Constraints

- Thư mục dự án: `C:\Users\vnext\Desktop\Project Manager\97. Tools\Dev\office-neko` (git repo riêng). Branch của giai đoạn: `feat/phase4a-excel`, tạo tại chỗ (không dùng git worktree, kẻo preview `office-neko` cổng 5174 hỏng).
- Tên package: `@office-neko/shared`, `@office-neko/client`. Tên hiển thị **Tin Học Cùng Mochi**; mascot mèo **Mochi**.
- Toàn bộ chữ giao diện là **tiếng Việt**, file UTF-8 dạng NFC. Nhãn nút ribbon giữ tên tiếng Anh thật (SUM, Merge…) kèm tooltip tiếng Việt qua `helpId`.
- Không server, không gọi mạng lúc chạy. Không dùng logo/thương hiệu Microsoft: gọi là "bảng tính mô phỏng".
- `tsconfig` bật `strict` và `noUncheckedIndexedAccess`. Test import rõ từ `vitest`.
- Màu: dùng token có sẵn, bảng tính lấy tông `text-excel-ink`. Nút chính `.btn-primary`.
- **Quy tắc trình mô phỏng (bất di bất dịch):** Component giữ state bằng `useReducer(def.reduce, initial)` và gọi `onState(state)` mỗi khi state đổi. Không có logic trạng thái nằm ngoài reducer.
- Mỗi task kết thúc bằng **một commit**: `git commit -m "<subject>" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"`.
- Sau mỗi task: cập nhật `STATUS.md` (1 dòng) **trong cùng commit**, và tick các `- [ ]` của task vừa xong.

## Quy ước chung cho mọi task

**Lệnh kiểm tra** (chạy từ gốc repo, Git Bash):
- Một phần: `npm test -w shared -- <tên>` hoặc `npm test -w client -- <tên>`
- Toàn bộ: `npm test && npm run typecheck`
- Chạy thử: preview `office-neko` (cổng 5174)

**Nhịp TDD mỗi task:** viết test FAIL → chạy xác nhận FAIL vì đúng lý do → viết code tối thiểu → chạy xác nhận PASS → (task giao diện: **kiểm tra trên trình duyệt ngay trong task này**) → commit.

**Kiểm tra trình duyệt là việc của từng task, không dồn về cuối.** Task nào đẻ ra thành phần tương tác đều có step mở preview, thử 3–4 thao tác của riêng nó, xác nhận console sạch.

**Không placeholder:** không "TODO", không "xử lý lỗi phù hợp", không "tương tự Task N".

## Bảng thuật ngữ trong plan

| Tên | Nghĩa |
|---|---|
| `CellValue` | `number \| string \| boolean \| FormulaError` |
| `CellSource` | Giao diện `raw(sheet, row, col): string \| null` mà trình tính đọc qua |
| `raw` | Đúng chữ người dùng gõ trong ô: `"120000"`, `"=SUM(B2:B5)"`, `"Nguyễn Văn A"` |
| `Ref` | Địa chỉ một ô đã phân tích: `{ sheet?, row, col, absRow, absCol }`, đếm từ 0 |
| `A1` | Cách viết địa chỉ của người dùng: cột chữ + hàng đếm từ 1 |
| khoá ô | Chuỗi `"r,c"` làm khoá trong `Sheet.cells`, đếm từ 0 |

## Danh sách task

Thứ tự bắt buộc: Task N chỉ bắt đầu khi Task N−1 đã commit.

| # | File | Nội dung | Ước lượng |
|---|---|---|---|
| 1 | `task-01-refs.md` | `refs.ts`: A1 ↔ `Ref`, vùng, dịch địa chỉ khi copy (shared) | 1 phiên nhỏ |
| 2 | `task-02-lex-parse.md` | `lex.ts` + `parse.ts`: token và AST (shared) | 1 phiên |
| 3 | `task-03-evaluate.md` | `evaluate.ts`: toán tử, tham chiếu, memo, tham chiếu vòng (shared) | 1 phiên |
| 4 | `task-04-functions.md` | 25 hàm trong `functions.ts` (shared) | 1 phiên |
| 5 | `task-05-errors-numfmt.md` | `errors.ts` nói tiếng Việt + `numfmt.ts` hiển thị số/tiền VNĐ (shared) | 1 phiên nhỏ |
| 6 | `task-06-workbook.md` | `state.ts` + `edit.ts`: sổ tính, nhập ô, chọn, undo (shared) | 1 phiên |
| 7 | `task-07-copy-fill.md` | Copy/paste và fill có dịch địa chỉ tương đối (shared) | 1 phiên nhỏ |
| 8 | `task-08-format-sheets.md` | Định dạng ô, gộp ô, độ rộng cột, nhiều sheet (shared) | 1 phiên |
| 9 | `task-09-grader.md` | `gradeExcel` + `GRADERS.excel` (shared) | 1 phiên nhỏ |
| 10 | `task-10-grid.md` | `ExcelSim`, `Grid`, `FormulaBar`, bàn phím (client) | 1 phiên |
| 11 | `task-11-ribbon-home.md` | Ribbon Home + `SheetTabs` (client) | 1 phiên |
| 12 | `task-12-fntip-lessons-1.md` | `FnTip` thẻ cú pháp + `excelPractice` + chương 1 (3 bài) | 1 phiên |
| 13 | `task-13-lessons-2-4.md` | Chương 2–4 (9 bài) + từ điển + tổng kết 4A | 1 phiên |

## Cấu trúc file sẽ tạo

```
shared/src/formula/
  refs.ts        # A1 ↔ Ref, vùng, shiftRef                    (Task 1)
  lex.ts         # chuỗi → token                                (Task 2)
  parse.ts       # token → AST                                  (Task 2)
  evaluate.ts    # AST + CellSource → CellValue                 (Task 3)
  functions.ts   # 25 hàm                                       (Task 4)
  errors.ts      # giải thích lỗi tiếng Việt                    (Task 5)
  numfmt.ts      # CellValue + CellFormat → chữ hiển thị        (Task 5)
  index.ts       # gom export, `export * as formula` từ shared/src/index.ts
shared/src/sims/excel/
  state.ts       # WorkbookState, ExcelAction, reduceExcel      (Task 6)
  edit.ts        # nhập, xoá, chọn, copy/paste, fill            (Task 6–7)
  format.ts      # định dạng, gộp ô, cột, sheet                 (Task 8)
  grade.ts       # gradeExcel                                   (Task 9)
  index.ts       # gom export, `export * as excelSim`
client/src/sims/excel/
  ExcelSim.tsx   # khung + useReducer + onState                 (Task 10)
  Grid.tsx       # lưới ảo hoá                                  (Task 10)
  FormulaBar.tsx # Name Box + thanh công thức                    (Task 10)
  RibbonHome.tsx # tab Home                                      (Task 11)
  SheetTabs.tsx  # thanh tab sheet                               (Task 11)
  FnTip.tsx      # thẻ cú pháp hàm tiếng Việt                    (Task 12)
client/src/content/lessons/excel-*.ts                            (Task 12–13)
```

## Bất biến phải luôn đúng

1. `client/src/content/content.test.ts` phát lại `solution` của **mọi** `PracticeStep` qua reducer rồi chấm — phải `pass`. Đây là lưới an toàn chính; đừng sửa test này để "cho qua".
2. Mọi `[[thuật ngữ]]` trong bài phải có trong `glossary.json`; mọi mục FAQ bắt buộc có `keywords` (hai file này bị **ép kiểu**, typecheck KHÔNG bắt thiếu trường).
3. Mọi `helpId` trong `hints[1]` phải có trong `HELP_IDS`.
4. `reduceExcel` phải **thuần**: không `Date.now()`, không random. `TODAY()` lấy ngày từ tham số `now` truyền vào trình tính.
5. **Ô không bao giờ lưu giá trị đã tính**, chỉ lưu `raw`. Ai thấy mình muốn thêm trường `value` vào `Cell` thì dừng lại — đó là dấu hiệu đang đi sai.
6. Trình kể chuyện của bài học chỉ hiểu `**đậm**`, `[[thuật ngữ]]`, `{{phím}}` — **không có `*nghiêng*`**.
