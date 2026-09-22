# Giai đoạn 4B – Excel: tra cứu, dữ liệu, biểu đồ (tổng quan)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans.
> **Cách đọc plan này:** đọc **đúng file này + đúng một file `task-NN-*.md`**. Không đọc các task khác. Đọc `STATUS.md` trước để biết đã làm tới đâu.

**Goal:** Hoàn tất lộ trình Excel: sắp xếp, AutoFilter, bốn loại biểu đồ SVG, và 8 bài cuối (chương 5–6) kết thúc bằng dự án Bảng lương 10 nhân viên. Sau 4B, lộ trình Excel đủ **20 bài / 6 chương** như spec gốc.

**Architecture:** Không có gì mới về kiến trúc — 4A đã dựng xong bộ tính công thức (`shared/src/formula/`, đủ 25 hàm kể cả VLOOKUP, SUMIF, hàm chữ) và sổ tính (`shared/src/sims/excel/`). 4B chỉ thêm **hành vi dữ liệu** (sắp xếp, lọc) và **biểu đồ** vào đúng khuôn đã có: reducer thuần trong `shared`, React vẽ và phát action trong `client`.

**Tech Stack:** giữ nguyên TypeScript 5.6, React 18.3, Tailwind 4, Vitest 2, Testing Library. **Không thêm thư viện** — biểu đồ tự vẽ bằng SVG.

**Spec:** `docs/superpowers/specs/2026-09-21-excel-design.md` (mục 1 "4B", 3.2, 4, 5, 6 chương 5–6) và `2026-09-19-office-neko-design.md` §7.5.

---

## Global Constraints

- Thư mục dự án: `C:\Users\vnext\Desktop\Project Manager\97. Tools\Dev\office-neko`. Branch: `feat/phase4b-excel`, tạo tại chỗ (không dùng git worktree, kẻo preview cổng 5174 hỏng).
- Toàn bộ chữ giao diện là **tiếng Việt**, UTF-8 dạng NFC. Nhãn nút giữ tên tiếng Anh thật (Sort, Filter, Chart) kèm giải nghĩa tiếng Việt ở `title` + `helpId`.
- Không server, không gọi mạng. Không dùng logo/thương hiệu Microsoft.
- `tsconfig` bật `strict` và `noUncheckedIndexedAccess`.
- **Quy tắc trình mô phỏng:** Component giữ state bằng `useReducer(def.reduce, initial)` và gọi `onState(state)` mỗi khi state đổi. Không có logic trạng thái nằm ngoài reducer.
- Mỗi task kết thúc bằng **một commit**: `git commit -m "<subject>" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"`, kèm cập nhật `STATUS.md` một dòng trong cùng commit.

## Quy ước chung cho mọi task

**Lệnh kiểm tra** (từ gốc repo, Git Bash): `npm test -w shared -- <tên>`, `npm test -w client -- <tên>`, toàn bộ `npm test && npm run typecheck`. Chạy thử: preview `office-neko`, cổng 5174.

**Nhịp TDD:** viết test FAIL → chạy xác nhận FAIL vì đúng lý do → code tối thiểu → chạy xác nhận PASS → (task giao diện: **kiểm tra trên trình duyệt ngay trong task này**) → commit.

**Ba điều phải tự soi trước khi nói xong một task giao diện** (bài học đắt của 4A — người dùng bắt được cả ba):
1. **Nhìn ảnh chụp thật**, đừng chỉ hỏi DOM. Có giống Excel thật không? Có giống ribbon Word/Excel đã làm trong app không? Dùng lại `Group`, `ToolButton`, `Picker` trong `client/src/sims/excel/RibbonHome.tsx`, đừng phát minh kiểu nút mới.
2. **Kiểm CSS có hiệu lực** bằng `getComputedStyle`. Lớp thành phần mới phải nằm ở **cấp đầu** của `@layer components` trong `theme.css` — `theme.test.ts` canh chuyện này, và hãy thêm tên lớp mới vào danh sách nó kiểm.
3. **Đọc lại đề bài:** người học làm đúng ý đề mà vẫn trượt được không? Đề mở thì check phải mở (`cellNotEmpty`), đừng lấy `solution` mẫu làm đáp án duy nhất.

**Không placeholder:** không "TODO", không "xử lý lỗi phù hợp", không "tương tự Task N".

## Những gì 4A đã có, cứ dùng, đừng làm lại

| Có sẵn | Ở đâu |
|---|---|
| 25 hàm, kể cả `VLOOKUP`, `SUMIF`, `COUNTIF`, `AVERAGEIF`, `LEFT/RIGHT/MID/LEN/UPPER/TRIM/CONCAT` | `shared/src/formula/functions.ts` |
| `parseRange`, `formatRange`, `cellsOf`, `shiftFormula`, `colToName` | `shared/src/formula/refs.ts` |
| `WorkbookState`, `reduceExcel`, `withEdit`, `withSheets`, `cellRaw`, `cellValue`, `cellText`, `formatOf`, `cellsIn`, `refName` | `shared/src/sims/excel/state.ts` |
| `Chart` (`{ id, type, range, title }`) và trường `Sheet.charts`, `Sheet.filter` — **đã khai báo, chưa có hành động nào dùng** | `shared/src/sims/excel/state.ts` |
| `gradeExcel` + `ExcelCheck` (`cellValue`, `cellNotEmpty`, `cellFormula`, `cellFormat`, `merged`, `sheetNamed`) | `shared/src/sims/excel/grade.ts` |
| Ribbon có tab (File/Home/Insert/Formulas/Data/View), `Group`/`ToolButton`/`Picker`, `SoonTab` | `client/src/sims/excel/Ribbon.tsx`, `RibbonHome.tsx`, `RibbonFormulas.tsx` |
| `excelPractice({ cells, sheets, task, checks, spotlight, hint, steps, setup?, solve })` | `client/src/content/lessonKit.ts` |
| `FN_HELP` + `activeFn` cho thẻ cú pháp | `client/src/content/fnHelp.ts` |

Tab **Insert** và **Data** hiện đang hiện `SoonTab` ("sẽ có ở phần sau") — Task 4 và 5 thay chúng bằng nội dung thật.

## Danh sách task

Thứ tự bắt buộc: Task N chỉ bắt đầu khi Task N−1 đã commit.

| # | File | Nội dung | Ước lượng |
|---|---|---|---|
| 1 | `task-01-sort.md` | Sắp xếp vùng theo một cột (shared) | 1 phiên nhỏ |
| 2 | `task-02-filter.md` | AutoFilter: bật/tắt, chọn giá trị, hàng bị ẩn (shared) | 1 phiên |
| 3 | `task-03-chart-grade.md` | Hành động biểu đồ + `rangeSorted`/`filterActive`/`chart` cho grader (shared) | 1 phiên |
| 4 | `task-04-ribbon-data.md` | Tab **Data**: Sort, Filter + lưới ẩn hàng đã lọc (client) | 1 phiên |
| 5 | `task-05-chartview.md` | `ChartView` SVG bốn loại + tab **Insert** (client) | 1 phiên |
| 6 | `task-06-lessons-ch5.md` | Chương 5: COUNTIF, SUMIF/AVERAGEIF, VLOOKUP, hàm chữ (4 bài) | 1 phiên |
| 7 | `task-07-lessons-ch6.md` | Chương 6: sắp xếp, lọc, biểu đồ (3 bài) | 1 phiên |
| 8 | `task-08-project.md` | Dự án Bảng lương 10 nhân viên, 3 chặng (1 bài) | 1 phiên |
| 9 | `task-09-wrapup.md` | Từ điển, Hỏi Mèo, README, kiểm tra tổng thể, gộp nhánh | 1 phiên nhỏ |

## Cấu trúc file sẽ tạo

```
shared/src/sims/excel/
  table.ts        # sortRange, setFilter, hàng bị ẩn      (Task 1–2)
  chart.ts        # insertChart, removeChart, chartData    (Task 3)
  (sửa) state.ts  # thêm nhánh action
  (sửa) grade.ts  # thêm 3 loại check
client/src/sims/excel/
  RibbonData.tsx  # tab Data: Sort, Filter                (Task 4)
  FilterMenu.tsx  # thả xuống chọn giá trị của một cột     (Task 4)
  ChartView.tsx   # vẽ SVG 4 loại biểu đồ                  (Task 5)
  RibbonInsert.tsx# tab Insert: chèn biểu đồ               (Task 5)
client/src/content/lessons/excel-lookup.ts                 (Task 6)
client/src/content/lessons/excel-data.ts                   (Task 7)
client/src/content/lessons/excel-project.ts                (Task 8)
```

## Bất biến phải luôn đúng

1. `client/src/content/content.test.ts` phát lại `solution` của **mọi** `PracticeStep` rồi chấm — phải `pass`. Đừng sửa test này để "cho qua".
2. Mọi `[[id|chữ]]` trong bài phải có trong `glossary.json`; mọi mục FAQ bắt buộc có `keywords` (hai file bị **ép kiểu**, typecheck không bắt thiếu trường).
3. Mọi `helpId` trong `hints[1]` phải có trong `HELP_IDS`.
4. `reduceExcel` **thuần**: không `Date.now()`, không random. Thời gian đi kèm trong action (`save` đã làm vậy).
5. **Ô chỉ lưu `raw`**, không bao giờ lưu giá trị đã tính. Sắp xếp là **đổi chỗ `raw` của các ô**, không phải sắp xếp giá trị hiển thị.
6. Thêm thứ mới vào `shared` mà giao diện báo `undefined` → **`rm -rf client/node_modules/.vite`** rồi khởi động lại dev server (bộ nhớ đệm giữ bản `shared` cũ).
