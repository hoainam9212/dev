# Giai đoạn 4A (Excel nền tảng) – tình trạng

Cập nhật 1 dòng sau mỗi task, trong cùng commit của task đó. Phiên mới đọc file này trước, không đọc lại các file task đã xong.

| Task | Xong | Commit | Ghi chú / việc còn treo |
|---|---|---|---|
| 1 refs | ☑ | (commit này) | 11 test; `shiftFormula` quét regex 3 nhánh (chuỗi → tên hàm → địa chỉ), Task 7 dùng lại, đừng viết regex mới |
| 2 lex + parse | ☑ | (commit này) | 11 test; `lex` thử vùng → ô → tên theo đúng thứ tự đó, và giữ `#REF!` lại làm `name` để Task 3 đổi thành lỗi |
| 3 evaluate | ☑ | (commit này) | 14 test. Bảng hàm cắm vào bằng `registerFunctions()` chứ không import thẳng — `functions.ts` phải import `evaluate`, nên import ngược sẽ thành vòng. Task 4 gọi nó lúc nạp module |
| 4 functions | ☐ | | |
| 5 errors + numfmt | ☐ | | |
| 6 workbook | ☐ | | |
| 7 copy + fill | ☐ | | |
| 8 format + sheets | ☐ | | |
| 9 grader | ☐ | | |
| 10 grid | ☐ | | |
| 11 ribbon Home | ☐ | | |
| 12 FnTip + chương 1 | ☐ | | |
| 13 chương 2–4 + tổng kết | ☐ | | |

## Quyết định đã chốt

- 2026-09-21 (spec): **không có đồ thị phụ thuộc**. Tính theo yêu cầu, memo + tập "đang thăm" để bắt tham chiếu vòng. Lưới 1.300 ô, tính lại toàn bộ là đủ nhanh và ít lỗi hơn nhiều.
- 2026-09-21 (spec): ô lưu `raw` (chữ người dùng gõ), **không lưu giá trị đã tính**.
- 2026-09-21 (spec): `VLOOKUP` mặc định `TRUE` như Excel thật, nhưng mọi bài học đều dạy `FALSE`.
- 2026-09-21 (spec): điều kiện `SUMIF`/`COUNTIF` **không** hỗ trợ ký tự đại diện `*` `?`; giới hạn có chủ ý, nói rõ trong bài.

## Việc còn treo (ai phát hiện thì ghi vào đây, đừng sửa lạc task)

- Từ giai đoạn 3 để lại, **chưa xếp lịch**: bài cho vỏ máy tính (Start/Taskbar/Dock/Spotlight); một lượt rà soát trợ năng cho toàn bộ sim; bàn phím ảo theo HĐH; Shift+click chọn dải trong vùng file; `SpotlightOverlay` hỏi lại mỗi 250 ms (**sẽ cắn ở lưới Excel** — Task 10 phải để ý).
- PWA ngoại tuyến chưa kiểm lại từ sau multi-profile (`npm run preview` rồi ngắt mạng).
- 4B (VLOOKUP, SUMIF, hàm chữ, sắp xếp/lọc, biểu đồ, dự án Bảng lương, 8 bài) chưa có plan.
