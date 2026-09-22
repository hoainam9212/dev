### Task 8: Dự án Bảng lương 10 nhân viên (3 chặng)

Đọc `00-overview.md` trước. **Task nội dung — bắt buộc học trọn cả ba chặng trên trình duyệt trong chính task này.**

**Files:**
- Tạo: `client/src/content/lessons/excel-project.ts`
- Sửa: `client/src/content/lessons/index.ts`, `client/src/content/tracks.ts`

**Interfaces — Consumes:** `excelPractice`; mọi loại check đã có.

Một bài duy nhất `excel.project`, chương `excel.final`, **ba bước `practice` nối tiếp** — đúng khuôn dự án Đơn xin việc của Word (`word.project`, xem `client/src/content/lessons/word-project.ts`): mỗi chặng có `task`, `checks`, `hints`, `solve` riêng, và chặng sau **dựng sẵn kết quả của chặng trước** qua `cells`, đừng bắt người học làm lại chặng cũ.

Dữ liệu: **10 nhân viên**, các cột Họ tên, Phòng, Lương cơ bản, Số ngày làm, Phụ cấp, Xếp loại, Thực lĩnh. Thêm hai ô tham số dùng chung để có chỗ dùng `$` (tỉ lệ phụ cấp, số ngày chuẩn) và một bảng tra xếp loại đặt cách ra, ví dụ `J1:K3`.

| Chặng | Việc | Check chính |
|---|---|---|
| 1 | Nhập và định dạng bảng: tiêu đề gộp ô, hàng tiêu đề đậm + màu nền, cột lương định dạng Tiền ₫ | `merged`, `cellFormat` (`bold`, `numFmt: 'currencyVnd'`) |
| 2 | Tính toán: phụ cấp nhân với ô tỉ lệ đã khoá `$`, xếp loại bằng `VLOOKUP` với bảng tra khoá `$`, thực lĩnh, rồi `SUM` và `AVERAGE` ở dòng tổng | `cellFormula` (`absolute: true`, `fn: 'VLOOKUP'`, `fn: 'SUM'`), `cellValue` |
| 3 | Trình bày: sắp xếp theo thực lĩnh giảm dần, lọc một phòng, chèn biểu đồ cột, rồi Lưu tệp | `rangeSorted`, `filterActive`, `chart` |

Chặng 3 kết thúc bằng `save` trong `solve` với `at` là **một số cố định** (reducer thuần không được lấy thời gian thực). Việc đã lưu thì **không chấm** — muốn chấm phải thêm một loại check mới, và 4B cố ý không làm; hộp thoại Lưu chỉ để trọn vẹn câu chuyện.

- [ ] **Step 1: Viết chặng 1, chạy `content.test.ts`**

`npm test -w client -- content`.

- [ ] **Step 2: Viết chặng 2, chạy lại**

Cẩn thận: mọi công thức trong `solve` phải ra đúng con số mà `cellValue` trong `checks` đòi. **Tự tính lại bằng tay một hàng** trước khi viết, đừng đoán.

- [ ] **Step 3: Viết chặng 3, chạy lại**

- [ ] **Step 4: Cập nhật `tracks.ts`** — thêm `{ id: 'excel.final', title: 'Dự án: Bảng lương', lessonIds: ['excel.project'] }`. Track Excel giờ đủ **20 bài / 7 chương**; spec gốc nói 6 chương, ta có 7 vì tách "Ô nào cố định" ra riêng — ghi chuyện này vào `STATUS.md` cho khỏi ai tưởng đếm sai.

- [ ] **Step 5: Chạy toàn bộ** — `npm test && npm run typecheck && npm run build -w client`

- [ ] **Step 6: Kiểm tra trên trình duyệt** (bắt buộc)

**Học trọn cả ba chặng của dự án**, làm thật từng việc, tới lúc hiện "Giỏi quá!". Đây là bài dài nhất của lộ trình Excel — chỗ nào đề bài mơ hồ hoặc chấm khắt khe quá thì **sửa đề bài cho rõ, đừng nới check**. Console sạch.

- [ ] **Step 7: Commit**

```bash
git add client/src docs/superpowers/plans/2026-09-22-phase4b-excel/STATUS.md
git commit -m "feat(content): the payroll project, three stages" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
