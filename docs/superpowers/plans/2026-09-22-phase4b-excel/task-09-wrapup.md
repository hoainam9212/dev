### Task 9: Từ điển, Hỏi Mèo, tổng kết và gộp nhánh

Đọc `00-overview.md` trước.

**Files:**
- Sửa: `client/src/content/glossary.json`, `client/src/content/faq.json`, `README.md`, `docs/superpowers/plans/2026-09-22-phase4b-excel/STATUS.md`

- [ ] **Step 1: Bổ sung từ điển**

Rà lại toàn bộ bài chương 5–6 và dự án: mọi `[[id|chữ]]` phải có mục trong `glossary.json`. Tối thiểu: `countif`, `sumif`, `vlookup`, `bang-tra`, `noi-chuoi`, `sap-xep`, `loc`, `bieu-do`, `bieu-do-cot`, `bieu-do-tron`.

Chạy `npm test -w client -- content` — test này bắt thiếu mục từ điển.

- [ ] **Step 2: Thêm ít nhất 10 câu Hỏi Mèo vào `faq.json`**

**Mỗi mục bắt buộc có `keywords`**, viết cả dạng **không dấu** vì người học hay gõ không dấu. `faq.json` bị ép kiểu nên typecheck KHÔNG bắt thiếu trường — đã một lần làm Hỏi Mèo văng ở giai đoạn 3.

Những câu đáng có, lấy đúng chỗ người mới hay vướng:
- Sắp xếp xong thì tên và lương lệch nhau, vì sao? (chọn thiếu cột)
- Lọc rồi thì dữ liệu có bị xoá không? (không, chỉ ẩn hàng)
- Sao SUM vẫn cộng cả những hàng đang bị lọc ẩn?
- Số hàng nhảy 1, 2, 5 nghĩa là gì?
- VLOOKUP báo #N/A, sửa thế nào?
- Vì sao bảng tra trong VLOOKUP phải khoá bằng $?
- COUNTIF dùng được dấu * không? (bản mô phỏng này thì không)
- Nên chọn biểu đồ cột hay biểu đồ tròn?
- Làm sao xoá một biểu đồ đã chèn?
- Sắp xếp và lọc khác nhau ở đâu?

- [ ] **Step 3: Cập nhật `README.md`**

Sửa đoạn về Excel: đã đủ **20 bài**, có sắp xếp, AutoFilter, bốn loại biểu đồ SVG và dự án Bảng lương. **Bỏ câu** "Phần tra cứu, sắp xếp, lọc và biểu đồ thuộc giai đoạn 4B, chưa làm".

- [ ] **Step 4: Kiểm tra tổng thể**

```bash
npm test && npm run typecheck && npm run build -w client
```

- [ ] **Step 5: Kiểm tra trên trình duyệt** (bắt buộc)

(a) Bản đồ hiện track Excel đủ **20 bài / 7 chương**; (b) Hỏi Mèo gõ **không dấu** `sap xep lech`, `loc co xoa du lieu khong`, `bieu do nao` — ra đúng câu trả lời; (c) bấm một `[[id|chữ]]` trong bài chương 6, thấy mục từ điển; (d) bật "Mở khoá toàn bộ bài học" trong Cài đặt rồi vào thẳng bài dự án — vào được. Console sạch.

- [ ] **Step 6: Tổng kết `STATUS.md`**

Đánh dấu 9/9 xong, chép mọi việc còn treo sang phần "Việc còn treo" (đặc biệt những gì đã thấy nhưng cố ý không làm ở 4B), và ghi một dòng cho phiên sau: giai đoạn 5 là PowerPoint, chưa có plan.

- [ ] **Step 7: Commit rồi gộp nhánh**

```bash
git add -A
git commit -m "docs: Excel glossary, FAQ and phase 4B wrap-up" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
git checkout master && git merge --ff-only feat/phase4b-excel && git branch -d feat/phase4b-excel
```

Nếu `--ff-only` không chạy được thì **dừng và hỏi người dùng**, đừng tự merge kiểu khác.

- [ ] **Step 8: Cập nhật memory**

`office-neko-project.md`: 4B đã xong, tip mới, và những cái bẫy mới phát hiện. `MEMORY.md`: đổi dòng chỉ mục sang "next is phase 5 (PowerPoint)".
