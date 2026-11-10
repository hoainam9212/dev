# Việc lẻ sau khi dự án hoàn tất – tình trạng

Người dùng báo khi dùng bản online trên điện thoại (2026-11-10). Phiên cloud làm cả 5 việc trên nhánh
`claude/vigilant-galileo-8wdiu6` (tách lại từ `office-neko/master` @ `a5c4933`; các làn đã đóng nên không chia file).
Gộp: `git merge --no-ff origin/claude/vigilant-galileo-8wdiu6` vào `office-neko/master`.

| # | Việc | Xong | Ghi chú |
|---|---|---|---|
| 1 | Khung slide lẫn vào nền trang | ☑ | Vùng làm việc xám `.ppt-workspace` quanh khung (như PowerPoint); viền + bóng chuyển từ `.ppt-canvas` (bị `overflow: hidden` của `.ppt-stage` cắt) sang `.ppt-stage`. Chromium 390/1280: nền `#E4E1E6`, không tràn; kéo hình vẫn đúng (lệch bắt lưới như cũ) |
| 2 | Chat AI chấm đúng dù lạc đề, trả lời không khớp câu hỏi | ☐ | |
| 3 | Chú thích nút kẹt lại trên điện thoại sau khi chạm | ☐ | |
| 4 | Chạm ô Excel trên điện thoại không hiện bàn phím | ☐ | |
| 5 | Ghi chú nhãn hiệu Microsoft, nguồn ảnh chụp Office | ☐ | |
