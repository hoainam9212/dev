# Giai đoạn 5B (PowerPoint: trang trí, chuyển cảnh, trình chiếu) – tình trạng

Chưa bắt đầu. Nền: master b971042 (shared 440 / client 356 test), PowerPoint 6 bài / 2 chương.

Cập nhật **một dòng** sau mỗi task, trong cùng commit của task đó. Dòng đầu tiên chưa ☑ là task kế tiếp.

| Task | Xong | Commit | Ghi chú / việc còn treo |
|---|---|---|---|
| 1 shared: theme, chuyển cảnh, trình chiếu, 6 check | ☑ | (commit này) | shared 482 / client 356. `past` nay là `PptSnap {slides, theme}`. Trình chiếu nằm ở `show.ts`; `reducePpt` bỏ qua mọi action soạn thảo khi `show` khác null. **Ruling:** màu `accent` hạ tối hơn bảng plan (mochi `#B54C17`, bien `#1A5FA8`, la `#2B6E37`, hoa `#B03163`) để chắc ≥ 4.5 trên nền — test tương phản canh. `elFormat` so màu không phân biệt hoa thường; khoá thiếu lấy mặc định `layout.ts` (title 40 đậm giữa, body 24 trái) |
| 2 vẽ theo theme + thẻ Design | ☐ | | |
| 3 thẻ Transitions | ☐ | | |
| 4 thẻ Slide Show + trình chiếu | ☐ | | |
| 5 ảnh thật Design / Transitions / Slide Show | ☐ | | (ghi toạ độ khung đỏ ở đây cho Task 6–8) |
| 6 chương 3 Cho đẹp mắt | ☐ | | |
| 7 chương 4 Trình bày | ☐ | | |
| 8 dự án Giới thiệu bản thân | ☐ | | |
| 9 Hỏi Mèo, README, build, gộp | ☐ | | |

## Việc còn treo (ai phát hiện thì ghi vào đây, đừng sửa lạc task)

- Từ 5A: nút "Kiểm tra" ở màn hẹp đè mép dưới khung slide; hình chữ nhật mới chèn là hình vuông 160×160
  (cả hai xếp vào plan `2026-10-10-backlog/` Task 6).
- App theo Office 365 (có nhóm Undo ở Home), ảnh thật là Office 2019 (Undo trên thanh tiêu đề) — để nguyên.

## Cố ý KHÔNG làm

Slide Master; animation từng đối tượng; Variants/Customize của thẻ Design; Effect Options, Sound, Duration,
Advance Slide của thẻ Transitions; Rehearse Timings, Record Slide Show; ghi chú người trình bày.
