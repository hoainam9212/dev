# Giai đoạn 4B (Excel: tra cứu, dữ liệu, biểu đồ) – tình trạng

Cập nhật 1 dòng sau mỗi task, trong cùng commit của task đó. Phiên mới đọc file này trước, không đọc lại các file task đã xong.

Nền: 4A đã lên `master` (tip `d125e6b`), shared 330 + client 224 test.

| Task | Xong | Commit | Ghi chú / việc còn treo |
|---|---|---|---|
| 1 sortRange | ☑ | (commit này) | 11 test. Sắp xếp đổi chỗ **cả object `Cell`** nên định dạng đi theo hàng; ô nguồn trống thì `delete` ô đích, kẻo dữ liệu cũ sót lại. `isSorted` dùng chung cho grader Task 3 |
| 2 AutoFilter | ☑ | (commit này) | 9 test. `conditions` khoá theo **chỉ số cột**, giá trị `[]` là bỏ lọc cột đó. `filterOptions`/`hiddenRows` bỏ hàng tiêu đề (hàng đầu của vùng). So sánh theo chữ hiển thị đã trim, không phân biệt hoa thường |
| 3 chart + grader | ☑ | (commit này) | 12 test. Hết phần `shared` của 4B. `chartData` vùng một cột thì lấy địa chỉ ô làm nhãn; ô chữ/ô lỗi coi là 0. Check dùng `chartType`, không phải `type` |
| 4 tab Data | ☐ | | |
| 5 ChartView + tab Insert | ☐ | | |
| 6 Bài chương 5 | ☐ | | |
| 7 Bài chương 6 | ☐ | | |
| 8 Dự án Bảng lương | ☐ | | |
| 9 Từ điển + tổng kết + gộp | ☐ | | |

## Quyết định đã chốt

- 2026-09-21 (spec): không có đồ thị phụ thuộc; ô chỉ lưu `raw`; `VLOOKUP` mặc định TRUE như Excel thật nhưng bài học luôn dạy FALSE; điều kiện `SUMIF`/`COUNTIF` **không** hỗ trợ ký tự đại diện `*` `?`.
- 2026-09-22: **sắp xếp đổi chỗ `raw`**, không sắp xếp giá trị hiển thị — nhờ vậy công thức trong hàng vẫn đi theo hàng.
- 2026-09-22: **lọc chỉ ẩn hàng khi vẽ**, không xoá dữ liệu; `SUM` vẫn cộng cả hàng đang ẩn (đúng như Excel với hàm thường, và đó là một điểm dạy học).

## Việc còn treo (ai phát hiện thì ghi vào đây, đừng sửa lạc task)

- Từ 4A: gợi ý bậc 2 trỏ vào một ô cụ thể (`spotlight: { cell }`) chưa thử với lưới cuộn được; `SpotlightOverlay` hỏi lại vị trí mỗi 250 ms.
- Từ 4A: PWA ngoại tuyến chưa kiểm lại từ sau multi-profile (`npm run preview` rồi ngắt mạng).
- Từ giai đoạn 3, chưa xếp lịch: bài cho vỏ máy tính (Start/Taskbar/Dock/Spotlight); một lượt rà soát trợ năng cho toàn bộ sim; bàn phím ảo theo HĐH; Shift+click chọn dải trong vùng file.
- Sau 4B là giai đoạn 5 (PowerPoint) — chưa có plan.
