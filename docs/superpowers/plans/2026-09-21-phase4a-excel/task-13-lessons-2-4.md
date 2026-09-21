### Task 13: Chương 2–4 (9 bài) và tổng kết 4A

Đọc `00-overview.md` trước. **Task nội dung — bắt buộc học thử vài bài trên trình duyệt trong chính task này.**

**Files:**
- Tạo: `client/src/content/lessons/excel-format.ts`, `client/src/content/lessons/excel-formula.ts`, `client/src/content/lessons/excel-absolute.ts`
- Sửa: `client/src/content/lessons/index.ts`, `client/src/content/tracks.ts`, `client/src/content/glossary.json`, `client/src/content/faq.json`, `README.md`

**Interfaces — Consumes:** `excelPractice` (Task 12), `ExcelCheck` (Task 9).

**Chương 2 — Định dạng cho dễ đọc** (`excel.format`):

| id | Tựa | Điểm chính | Check chính |
|---|---|---|---|
| `excel.numfmt` | Số, tiền và phần trăm | Cùng một số, ba cách hiện | `cellFormat` `numFmt: 'currencyVnd'` |
| `excel.look` | Đậm, màu, căn lề, viền | Làm nổi hàng tiêu đề | `cellFormat` `bold`, `fill` |
| `excel.width` | Độ rộng cột và gộp ô tiêu đề | `#####` là cột hẹp chứ không phải lỗi | `merged` |

**Chương 3 — Công thức đầu tiên** (`excel.calc`):

| id | Tựa | Điểm chính | Check chính |
|---|---|---|---|
| `excel.equals` | Dấu = và bốn phép tính | Bắt buộc có `=`; ô hiện kết quả, thanh công thức hiện công thức | `cellFormula` + `cellValue` |
| `excel.sum` | SUM và AVERAGE | Vì sao SUM hơn cộng tay | `cellFormula` `fn: 'SUM'`, `range` |
| `excel.stats` | MIN, MAX, COUNT, COUNTA, ROUND | Đếm số khác đếm ô có chữ | `cellValue` |

**Chương 4 — Ô nào cố định** (`excel.ref`):

| id | Tựa | Điểm chính | Check chính |
|---|---|---|---|
| `excel.copy` | Copy công thức, địa chỉ tự đổi | Fill xuống một cột thành tiền | `cellFormula` ở ô cuối cột |
| `excel.absolute` | Dấu $ khoá ô | Nhân với một ô tỉ lệ cố định | `cellFormula` `absolute: true` |
| `excel.if` | IF và câu điều kiện | "Nếu… thì… ngược lại…" | `cellValue` hai ô khác nhánh |

Mỗi bài: 2–3 bước `explain`, 1 `quiz`, 1–2 `practice`. Bài `excel.if` phải **tránh** mẫu `=IF(A1=0,0,10/A1)` — `IF` tính sẵn cả hai nhánh, xem ghi chú Task 4 trong `STATUS.md`.

- [ ] **Step 1: Viết chương 2 (3 bài) và chạy `content.test.ts`**

`npm test -w client -- content` — nó phát lại `solution` từng bài; bài nào không giải được thì đỏ. Không sửa test cho qua.

- [ ] **Step 2: Viết chương 3 (3 bài) và chạy lại**

- [ ] **Step 3: Viết chương 4 (3 bài) và chạy lại**

- [ ] **Step 4: Cập nhật `tracks.ts`** — track `excel` đủ 4 chương, 12 bài, theo đúng id ở trên.

- [ ] **Step 5: Từ điển và Hỏi Mèo**

Thêm mục từ điển cho mọi `[[thuật ngữ]]` mới (tối thiểu: `công thức`, `hàm`, `vùng`, `địa chỉ tương đối`, `địa chỉ tuyệt đối`, `SUM`, `AVERAGE`, `IF`, `định dạng số`, `gộp ô`). Thêm ít nhất 10 câu FAQ Excel vào `faq.json` — **mỗi mục bắt buộc có `keywords`**, file này bị ép kiểu nên typecheck không bắt thiếu (đã làm Hỏi Mèo văng một lần ở giai đoạn 3).

- [ ] **Step 6: Kiểm tra toàn bộ**

```bash
npm test && npm run typecheck && npm run build -w client
```

- [ ] **Step 7: Kiểm tra trên trình duyệt** (bắt buộc)

(a) Bản đồ hiện lộ trình Excel đủ **12 bài / 4 chương**; (b) **học trọn bài `excel.sum` và bài `excel.absolute`** cho tới khi chấm đạt; (c) mở Hỏi Mèo gõ không dấu `cong thuc` — ra kết quả Excel; (d) bấm một `[[thuật ngữ]]` trong bài, thấy mục từ điển. Console sạch.

- [ ] **Step 8: Tổng kết 4A**

Cập nhật `README.md` (một đoạn về Excel) và `STATUS.md`: đánh dấu xong 13/13, chép mọi việc còn treo sang phần "Việc còn treo" để plan 4B nhặt lại.

- [ ] **Step 9: Commit**

```bash
git add . && git commit -m "feat(content): Excel chapters 2-4, glossary and FAQ" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

- [ ] **Step 10: Gộp nhánh**

```bash
git checkout master && git merge --ff-only feat/phase4a-excel && git branch -d feat/phase4a-excel
```

Nếu `--ff-only` không chạy được thì **dừng và hỏi người dùng**, đừng tự merge kiểu khác.
