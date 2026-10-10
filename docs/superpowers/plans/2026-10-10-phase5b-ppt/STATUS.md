# Giai đoạn 5B (PowerPoint: trang trí, chuyển cảnh, trình chiếu) – tình trạng

Chưa bắt đầu. Nền: master b971042 (shared 440 / client 356 test), PowerPoint 6 bài / 2 chương.

Cập nhật **một dòng** sau mỗi task, trong cùng commit của task đó. Dòng đầu tiên chưa ☑ là task kế tiếp.

| Task | Xong | Commit | Ghi chú / việc còn treo |
|---|---|---|---|
| 1 shared: theme, chuyển cảnh, trình chiếu, 6 check | ☑ | (commit này) | shared 482 / client 356. `past` nay là `PptSnap {slides, theme}`. Trình chiếu nằm ở `show.ts`; `reducePpt` bỏ qua mọi action soạn thảo khi `show` khác null. **Ruling:** màu `accent` hạ tối hơn bảng plan (mochi `#B54C17`, bien `#1A5FA8`, la `#2B6E37`, hoa `#B03163`) để chắc ≥ 4.5 trên nền — test tương phản canh. `elFormat` so màu không phân biệt hoa thường; khoá thiếu lấy mặc định `layout.ts` (title 40 đậm giữa, body 24 trái) |
| 2 vẽ theo theme + thẻ Design | ☑ | (commit này) | client 364. `ElementView` nhận `theme` (bắt buộc): chữ = `fmt.color ?? (title ? accent : fg)`, font theo theme; ô sửa chữ `inherit`. Chữ mờ "Bấm để nhập…" nay `opacity .5` theo màu theme (trước cứng đen 35%, chìm trên Đêm). Font Color có mục đầu **Automatic** → `setFmt {color: undefined}`; ô màu của nút hiện `fg` của theme khi chưa tô. **Lỗi bắt được khi nhìn ảnh:** ở 390px dải 6 theme rộng 543px bị cắt mất Tro/Đêm (không có vùng cuộn) ⇒ lưới `grid-cols-3 sm:grid-cols-6`. Đã thử bằng chuột: Đêm → tô Nâu đậm (chìm) → Automatic (hiện lại) → Undo ×4 về Mochi đúng từng bậc |
| 3 thẻ Transitions | ☑ | (commit này) | client 374. Đối tượng slide nay nằm trong `.ppt-slide-layer` (phủ kín khung, `pointer-events: none`, con thì `auto`) — hiệu ứng chạy trên lớp này vì `.ppt-canvas` đã dùng `transform: scale`. **Ruling:** prop `preview` của Canvas là `{n, slideId}` chứ không phải `number` như plan — chỉ slide được xem thử mới chạy hiệu ứng, nếu không chuyển sang slide khác có chuyển cảnh cũng làm nó nhảy. Canvas tự coi lớp vẽ là "chỗ trống" khi bấm (jsdom không nạp CSS nên `pointer-events` không đủ). Giảm chuyển động dùng luật chung có sẵn (`animation-duration: .001ms`). Chrome thật (script `scratchpad/shot/t3-transitions.cjs`): Fade/Push/Zoom chạy 300 ms rồi dừng, Push không tràn trang, đổi slide không chạy hiệu ứng, giảm chuyển động thì không còn animation; 390px không nút nào lọt khỏi thẻ |
| 4 thẻ Slide Show + trình chiếu | ☑ | (commit này) | client 391. `SlideShow` gắn vào `document.body` (portal), phím bắt ở pha **capture** của `window` + `stopPropagation` khi đang chiếu; không chiếu thì không gắn listener (Esc của RealShot không bị nuốt). `fullscreenchange` ra khỏi fullscreen ⇒ `endShow`. `PptSim` chặn F5/Shift+F5. Chrome thật (`scratchpad/shot/t4-slideshow.cjs`): F5 không tải lại trang (biến đánh dấu còn nguyên), vào fullscreen thật; khung 1280×720 @1280×900, 1920×1080, 390×219 — đều 16:9, canvas khớp khung; → ×3 tới "hết bài", → nữa thoát ở slide 3; Esc giữa chừng về slide 2 và rời fullscreen; thoát fullscreen bằng trình duyệt cũng kết thúc trình chiếu; 0 lỗi console |
| 5 ảnh thật Design / Transitions / Slide Show | ☑ | (commit này) | 3 ảnh 1000×160, cửa sổ 1000×650, cắt từ (0,0) như `ppt-04`. Tên tài khoản làm mờ `688,2,127,32`. PowerPoint đã đóng không lưu, MinimizeRibbon giữ False. **Zoom nằm trong More ▾** (hàng đầu bộ sưu tập Office 2019: None, Morph, Fade, Push, Wipe, Split). Thumbnail Themes hiện "亜あ" vì máy đặt ngôn ngữ soạn thảo tiếng Nhật — để nguyên (như ghi chú phông Đông Á ở ảnh cũ). **Toạ độ khung (%):** design: Themes `{1.1,45.6,37.4,35}`, More `{38.5,44.4,2.4,37.5}` · transitions: Preview `{0.9,42.5,4.6,43.1}`, Fade `{23.8,45.6,8.2,35}`, Push `{32,45.6,8.2,35}`, More `{56.7,44.4,2.4,37.5}`, Apply To All `{66.8,71.3,9.3,14.4}` · slideshow: From Beginning `{0.9,42.5,5.9,43.1}`, From Current Slide `{6.8,42.5,7.3,43.1}` · `ppt-02-home` (1018 rộng): Font Size `{39.7,47.5,4.5,14.4}`, Font Color `{48.3,66.9,3.6,14.4}`, Center `{55.9,66.9,2.2,14.4}` |
| 6 chương 3 Cho đẹp mắt | ☑ | (commit này) | shared 483 / client 392. 3 bài + glossary `theme`. **Ruling:** `ppt.format` định dạng **khung nội dung** (cỡ 32, Cam Mochi, căn giữa) chứ không phải tiêu đề như plan — tiêu đề vốn đã căn giữa nên dạy "Center" trên đó là vô nghĩa. **Lỗi bắt được khi học thật:** hàm dựng sẵn gõ vào slide 2 khi slide 1 đang mở ⇒ reducer bỏ qua im lặng, tiêu đề «Mèo và chó» trống — content test không kêu vì check không đọc tiêu đề. Đã sửa (`gotoSlide` trước) và thêm **chốt chặn trong `pptPractice`: bước `setup` nào không đổi state thì ném lỗi** (mọi bài cũ đều qua). Lời chấm `elFormat` nay gọi tên màu ("Cam Mochi") thay vì mã hex. **Sửa Task 5:** `SHOTS.ppt` trong `real-shots.mjs` thiếu ảnh mới ⇒ `realShots.test` đỏ; dòng ảnh 7–8 trong `docs/real-shots-ppt.md` chuyển sang Task 7–8 (test đòi bài trong cột "Dùng cho bài" phải có thật). Học bằng chuột trên Chrome (`t6-learn.cjs`): cả 3 bài đạt, gõ "MÈO" viết hoa vẫn đạt, ảnh thật tải đúng số khung |
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
