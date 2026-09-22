# Giai đoạn 5A (PowerPoint: lõi và soạn slide) – tình trạng

**CHƯA BẮT ĐẦU.** Plan viết ngày 2026-09-22, ngay sau khi 4B xong.

Cập nhật 1 dòng sau mỗi task, trong cùng commit của task đó. Phiên mới đọc file này trước, không đọc lại các file task đã xong.

Nền: 4B đã lên `master`, lộ trình Excel 20 bài / 7 chương, shared 330+ và client 224+ test.

| Task | Xong | Commit | Ghi chú / việc còn treo |
|---|---|---|---|
| 1 mô hình slide + bố cục | ☑ | (commit này) | 15 test (4 layout + 11 state). Không phải dùng `it.todo`: test `duplicateSlide` và "đổi slide thì bỏ chọn" viết bằng cách **dựng state trực tiếp** thay vì gọi `setText`/`selectEl` của Task 2–3. `applyLayout` giữ **cả `fmt`** của chỗ dành sẵn cũ, không chỉ chữ |
| 2 đối tượng | ☐ | | |
| 3 chữ + định dạng + hoàn tác | ☐ | | |
| 4 grader | ☐ | | |
| 5 vỏ sim + thumbnail | ☐ | | |
| 6 kéo–thả + tay nắm | ☐ | | |
| 7 tab Home | ☐ | | |
| 8 tab Insert + hộp thoại | ☐ | | |
| 9 bài chương 1 | ☐ | | |
| 10 bài chương 2 | ☐ | | |
| 11 từ điển + tổng kết + gộp | ☐ | | |

## Quyết định đã chốt

- 2026-09-22 (spec `2026-09-22-ppt-design.md`): toạ độ px trên khung 960×540, không dùng phần trăm; chỗ dành sẵn của bố cục là **đối tượng thật** có `role`; lưới hít 8px; không có ô ghi chú người trình bày.
- 2026-09-22: 5A dừng ở chỗ soạn được slide. Theme, chuyển cảnh, trình chiếu, 6 bài còn lại và dự án thuộc 5B.

## Việc còn treo (ai phát hiện thì ghi vào đây, đừng sửa lạc task)

- Từ 4A: gợi ý bậc 2 trỏ vào một ô cụ thể (`spotlight: { cell }`) chưa thử với lưới cuộn được.
- Từ 4A: PWA ngoại tuyến chưa kiểm lại từ sau multi-profile (`npm run preview` rồi ngắt mạng).
- Từ giai đoạn 3, chưa xếp lịch: bài cho vỏ máy tính (Start/Taskbar/Dock/Spotlight); một lượt rà soát trợ năng cho toàn bộ sim; bàn phím ảo theo HĐH; Shift+click chọn dải trong vùng file.
- Sau 5A là 5B (theme, chuyển cảnh, trình chiếu, chương 3–5) — chưa có plan.
- **Cố ý KHÔNG làm ở 5A** (ghi để ai sau khỏi tưởng bỏ sót): Slide Master; animation từng đối tượng; xoay và nhóm đối tượng; bảng/biểu đồ trong slide; ghi chú người trình bày; xuất PDF; chọn nhiều đối tượng một lúc.
