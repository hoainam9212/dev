# Giai đoạn 5B (PowerPoint: trang trí, chuyển cảnh, trình chiếu) – tình trạng

Chưa bắt đầu. Nền: master b971042 (shared 440 / client 356 test), PowerPoint 6 bài / 2 chương.

Cập nhật **một dòng** sau mỗi task, trong cùng commit của task đó. Dòng đầu tiên chưa ☑ là task kế tiếp.

| Task | Xong | Commit | Ghi chú / việc còn treo |
|---|---|---|---|
| 1 shared: theme, chuyển cảnh, trình chiếu, 6 check | ☑ | (commit này) | shared 482 / client 356. `past` nay là `PptSnap {slides, theme}`. Trình chiếu nằm ở `show.ts`; `reducePpt` bỏ qua mọi action soạn thảo khi `show` khác null. **Ruling:** màu `accent` hạ tối hơn bảng plan (mochi `#B54C17`, bien `#1A5FA8`, la `#2B6E37`, hoa `#B03163`) để chắc ≥ 4.5 trên nền — test tương phản canh. `elFormat` so màu không phân biệt hoa thường; khoá thiếu lấy mặc định `layout.ts` (title 40 đậm giữa, body 24 trái) |
| 2 vẽ theo theme + thẻ Design | ☑ | (commit này) | client 364. `ElementView` nhận `theme` (bắt buộc): chữ = `fmt.color ?? (title ? accent : fg)`, font theo theme; ô sửa chữ `inherit`. Chữ mờ "Bấm để nhập…" nay `opacity .5` theo màu theme (trước cứng đen 35%, chìm trên Đêm). Font Color có mục đầu **Automatic** → `setFmt {color: undefined}`; ô màu của nút hiện `fg` của theme khi chưa tô. **Lỗi bắt được khi nhìn ảnh:** ở 390px dải 6 theme rộng 543px bị cắt mất Tro/Đêm (không có vùng cuộn) ⇒ lưới `grid-cols-3 sm:grid-cols-6`. Đã thử bằng chuột: Đêm → tô Nâu đậm (chìm) → Automatic (hiện lại) → Undo ×4 về Mochi đúng từng bậc |
| 3 thẻ Transitions | ☑ | (commit này) | client 374. Đối tượng slide nay nằm trong `.ppt-slide-layer` (phủ kín khung, `pointer-events: none`, con thì `auto`) — hiệu ứng chạy trên lớp này vì `.ppt-canvas` đã dùng `transform: scale`. **Ruling:** prop `preview` của Canvas là `{n, slideId}` chứ không phải `number` như plan — chỉ slide được xem thử mới chạy hiệu ứng, nếu không chuyển sang slide khác có chuyển cảnh cũng làm nó nhảy. Canvas tự coi lớp vẽ là "chỗ trống" khi bấm (jsdom không nạp CSS nên `pointer-events` không đủ). Giảm chuyển động dùng luật chung có sẵn (`animation-duration: .001ms`). Chrome thật (script `scratchpad/shot/t3-transitions.cjs`): Fade/Push/Zoom chạy 300 ms rồi dừng, Push không tràn trang, đổi slide không chạy hiệu ứng, giảm chuyển động thì không còn animation; 390px không nút nào lọt khỏi thẻ |
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
