# Giai đoạn 5A (PowerPoint: lõi và soạn slide) – tình trạng

**CHƯA BẮT ĐẦU.** Plan viết ngày 2026-09-22, ngay sau khi 4B xong.

Cập nhật 1 dòng sau mỗi task, trong cùng commit của task đó. Phiên mới đọc file này trước, không đọc lại các file task đã xong.

Nền: 4B đã lên `master`, lộ trình Excel 20 bài / 7 chương, shared 330+ và client 224+ test.

| Task | Xong | Commit | Ghi chú / việc còn treo |
|---|---|---|---|
| 1 mô hình slide + bố cục | ☑ | (commit này) | 15 test (4 layout + 11 state). Không phải dùng `it.todo`: test `duplicateSlide` và "đổi slide thì bỏ chọn" viết bằng cách **dựng state trực tiếp** thay vì gọi `setText`/`selectEl` của Task 2–3. `applyLayout` giữ **cả `fmt`** của chỗ dành sẵn cũ, không chỉ chữ |
| 2 đối tượng | ☑ | (commit này) | 18 test. **`pptInitial` đặt `nextId = nextId + số slide`** để id slide (`s<n>`) không đụng id đối tượng sau này ⇒ đối tượng đầu tiên là `e2` chứ không phải `e1`: test **không được hardcode id**, phải lấy từ `slideOf(s).els`. Mảng action literal trong test phải khai báo `PptAction[]`, nếu không `reduce` suy kiểu lỏng và typecheck đỏ |
| 3 chữ + định dạng + hoàn tác | ☑ | (commit này) | 15 test. Hết phần lõi state của 5A (shared 411 test). **`startEditEl` là chỗ chụp bậc hoàn tác cho CẢ lần sửa** (`withSlides(s, s.slides, …)`); `setText`/`cancelEdit` gọi `withEls(..., track=false)` nên gõ từng ký tự không sinh bậc mới. Undo sau một lần sửa trả chữ về đúng nguyên văn trước lúc bắt đầu sửa |
| 4 grader | ☑ | (commit này) | 12 test. Phải sửa `grading.test.ts`: case "sim chưa có grader" đang dùng `'ppt'`, đổi sang `'aichat'`. Test **không hardcode id** — lấy id chỗ dành sẵn qua `role === 'title'`, id đối tượng vừa chèn qua phần tử cuối `slideOf(s).els`. Shared xong phần 5A: 423 test |
| 5 vỏ sim + thumbnail | ☑ | (commit này) | 9 test client. **`scale(calc(100cqw / 960))` KHÔNG chạy** — `scale()` cần số, phải viết `calc(100cqw / 960px)`; kiểm bằng `getComputedStyle(...).transform` khác `none`. `.ppt-stage` phải `overflow: hidden`, nếu không khung 960px chưa co giãn làm tràn ngang cả trang. Thumbnail dùng `ElementView hint={false}` để chữ mờ chỉ hiện một lần (test `getByText` số ít). **Task 11 PHẢI xoá** `client/src/pages/DevPptPage.tsx`, route `/dev/ppt` + import trong `App.tsx`, và mục `office-neko-5a` trong `Dev/.claude/launch.json` |
| 6 kéo–thả + tay nắm | ☑ | (commit này) | 8 test Canvas (client 264). Đo thật trên trình duyệt: kéo 100px màn hình ⇒ 112/960px state ở scale 0.872, và 188 ở scale 0.535 — **chia đúng scale**, khớp con trỏ ở mọi cỡ cửa sổ. Tay nắm `nw` kéo vào trong dừng ở 64×32, kéo ra mép dừng ở x=0 / y=508: không đối tượng nào lọt khung. **Bẫy test:** `addShape` chọn luôn đối tượng nên phải dựng thêm state `sel: null` mới kiểm được "chưa chọn thì không có tay nắm". `setPointerCapture` đặt trên `e.currentTarget`, không phải `e.target` (tay nắm nhỏ, target có thể là con). Lưu ý khi thử tay: phím `Return` của công cụ tự động gửi `key: ""` nên tưởng Enter không chốt — Enter thật vẫn chạy đúng |
| 7 tab Home | ☑ | (commit này) | 10 test (7 RibbonHome + 3 Ribbon), client 276. **`Group`/`ToolButton`/`Picker` nay ở `client/src/components/ribbon.tsx`**, Excel đã đổi import; `ToolButton` thêm `disabled`. Thêm **`MenuButton`** (nút + bảng thả xuống `.ribbon-menu` định vị tuyệt đối, đóng khi bấm ra ngoài/Esc) vì test đòi mục chọn là `button` — `Picker` là `<select>` nên không dùng được cho Layout/cỡ/màu. Test plan "Delete Slide và Undo" bấm nút ĐANG KHOÁ trên state 1 slide — đã tách: một test kiểm khoá, một test dùng state sau `addSlide`. Id hình khối không phải `e2` (là `e3`): test dùng thẳng `withShape` vì `addShape` đã chọn sẵn. Test SlideList đổi regex thành `/^\+ Slide mới/` vì ribbon cũng có nút "Slide mới". Đã thử trên trình duyệt: menu Layout/màu hiện đủ, chuỗi thêm slide → Hai cột → tiêu đề → 32 → cam → Undo đúng từng bước |
| 8 tab Insert + hộp thoại | ☑ | (commit này) | 9 test (3 RibbonInsert + 5 dialogs + 1 Shape Fill), shared 424 / client 285. Hết phần giao diện 5A. **Thêm ngoài plan:** (a) nút **Shape Fill** (nhóm Drawing ở Home, helpId `ppt.fill`) — plan bảo "chèn ngôi sao, đổi màu" mà Font color chỉ đổi màu CHỮ, không có cách tô hình; (b) `.ppt-canvas` `user-select: none`, `<img draggable={false}>` + `pointer-events: none` — kéo ảnh trên Chrome thật bị tô xanh vùng chọn; (c) placeholder Title Slide `y: 180 → 176` (vi phạm bất biến 6, có từ Task 1) + test mọi chỗ dành sẵn nằm trên lưới 8. `MenuButton`: `▾` rơi xuống dòng riêng vì `ToolButton` là `grid` — đã bọc trong `flex`. **Plan sai một chỗ:** hộp chữ mới `(80,400,480,80)` VẪN đè chỗ nội dung của Tiêu đề và nội dung (y 176–480, không còn dải trống 80px nào); giữ nguyên vì nó vẽ sau nên vẫn bấm được — bài học Task 9–10 đừng hứa "không đè". Đã soạn thật trên trình duyệt: tiêu đề → hộp chữ 3 dòng (Shift+Enter) → ngôi sao tô xanh → ảnh Mèo Mochi kéo nhỏ 320×240→280×208 → Lưu; mọi `.ppt-el` trong khung |
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
