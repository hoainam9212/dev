### Task 6: Chương 5 — Đếm, cộng có điều kiện và tra cứu (4 bài)

Đọc `00-overview.md` trước. **Task nội dung — bắt buộc học thử ít nhất hai bài trên trình duyệt trong chính task này.**

**Files:**
- Tạo: `client/src/content/lessons/excel-lookup.ts`
- Sửa: `client/src/content/lessons/index.ts`, `client/src/content/tracks.ts`, `client/src/content/glossary.json`

**Interfaces — Consumes:** `excelPractice` (lessonKit); các loại check `cellValue`, `cellFormula`, `cellNotEmpty` (đã có từ 4A).

Chương `excel.cond` gồm bốn bài:

| id | Tựa | Điểm chính | Check chính |
|---|---|---|---|
| `excel.countif` | Đếm có điều kiện với COUNTIF | Đếm xem có bao nhiêu người thuộc một phòng | `cellFormula` `fn: 'COUNTIF'` + `cellValue` |
| `excel.sumif` | Cộng và tính trung bình có điều kiện | SUMIF ba đối số: vùng xét, điều kiện, vùng cộng | `cellFormula` `fn: 'SUMIF'`, `range` vùng xét |
| `excel.vlookup` | VLOOKUP tra bảng | Bảng tra, cột đầu phải chứa giá trị cần tìm, luôn dùng FALSE | `cellFormula` `fn: 'VLOOKUP'`, `absolute: true` |
| `excel.text` | Hàm chữ và dấu & | LEFT/RIGHT/LEN/UPPER/TRIM và nối chuỗi | `cellValue` |

**Những điều bắt buộc nói trong bài, vì bộ tính của ta cố ý giới hạn:**
- Điều kiện của COUNTIF/SUMIF **không hỗ trợ ký tự đại diện** `*` `?`. Nói thẳng trong bài: "ở đây ta gõ đủ chữ, không dùng dấu sao".
- `VLOOKUP` **luôn dạy `FALSE`** (tìm chính xác). Tra không thấy ra `#N/A` — và đó là câu quiz hay.
- Bảng tra phải **khoá bằng `$`** khi chép công thức xuống, nối tiếp đúng bài `excel.absolute` của 4A.

Mỗi bài: 2–3 bước `explain`, 1 `quiz`, 1–2 `practice`. Giọng động viên, chỉ dùng `**đậm**`, `[[id|chữ]]`, `{{phím}}` — **không có `*nghiêng*`**.

- [ ] **Step 1: Viết bài `excel.countif` và `excel.sumif`, chạy `content.test.ts`**

`npm test -w client -- content` — test này phát lại `solution` từng bài qua reducer rồi chấm; bài nào không giải được thì đỏ. Không sửa test cho qua.

Gợi ý bảng đầu bài dùng chung cho cả chương (bốn nhân viên, có phòng ban và lương) để người học không phải làm quen dữ liệu mới mỗi bài:

```ts
const STAFF = {
  A1: 'Nhân viên', B1: 'Phòng', C1: 'Lương',
  A2: 'Nguyễn Văn Nam', B2: 'Kế toán', C2: '7500000',
  A3: 'Trần Thị Lan', B3: 'Kinh doanh', C3: '6200000',
  A4: 'Lê Minh Tú', B4: 'Kế toán', C4: '8100000',
  A5: 'Phạm Thu Hà', B5: 'Kinh doanh', C5: '5500000',
};
```

- [ ] **Step 2: Viết bài `excel.vlookup`, chạy lại `content.test.ts`**

Bài này cần **bảng tra riêng** đặt cách ra, ví dụ `E1:F3` với xếp loại: `A`→`Giỏi`, `B`→`Khá`, `C`→`Trung bình`.

- [ ] **Step 3: Viết bài `excel.text`, chạy lại `content.test.ts`**

- [ ] **Step 4: Cập nhật `tracks.ts`** — thêm chương `{ id: 'excel.cond', title: 'Đếm, cộng có điều kiện và tra cứu', lessonIds: ['excel.countif', 'excel.sumif', 'excel.vlookup', 'excel.text'] }` vào track `excel`, sau chương `excel.ref`.

- [ ] **Step 5: Thêm mục từ điển** cho mọi `[[id|chữ]]` mới. Tối thiểu: `countif`, `sumif`, `vlookup`, `bang-tra` (bảng tra), `noi-chuoi` (toán tử &). Nhắc lại: cú pháp là `[[id|chữ hiện ra]]`, và `glossary.json` bị ép kiểu nên typecheck không bắt thiếu trường.

- [ ] **Step 6: Chạy toàn bộ** — `npm test && npm run typecheck`

- [ ] **Step 7: Kiểm tra trên trình duyệt** (bắt buộc)

Bản đồ phải hiện track Excel **16 bài / 5 chương**. **Học trọn bài `excel.vlookup` và `excel.countif`** cho tới lúc chấm đạt — gõ công thức thật vào ô, không chỉ đọc. Kiểm luôn: thẻ cú pháp có bật lên khi gõ `=VLOOKUP(` không, và đối số đang gõ có in đậm đúng không. Console sạch.

- [ ] **Step 8: Commit**

```bash
git add client/src docs/superpowers/plans/2026-09-22-phase4b-excel/STATUS.md
git commit -m "feat(content): Excel chapter 5 - conditional counting and lookup" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
