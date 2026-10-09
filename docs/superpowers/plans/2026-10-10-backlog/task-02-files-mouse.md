# Task 2: Bài copy + hoàn tác; Shift+click chọn dải; menu chuột phải không tràn khung

**Files:**
- Modify: `client/src/content/lessons/basics-files.ts`, `tracks.ts`, `client/src/sims/desktop/FileArea.tsx`,
  `DesktopSim.test.tsx`, `client/src/sims/mouse/MouseSim.tsx`, `MouseSim.test.tsx`

## 1. Bài `basics.files.copy.${os}` "Sao chép và hoàn tác"

Sim desktop đã có `copy`/`cut`/`paste`/`undo` — chỉ thiếu bài. Đặt sau `basics.files.move` trong chương `basics.files`
(nhớ Review Focus 1: người đã xong chương không bị khoá lại — dùng cùng cách Task 1 đã chọn).
- Dạy: Ctrl+C / Ctrl+V (⌘ trên Mac), chuột phải › Copy / Paste; khác "cắt" ở chỗ file gốc còn nguyên; Ctrl+Z hoàn tác.
- Thực hành 1: chép một tệp tài liệu sang một thư mục khác. Lấy tệp và hai thư mục từ `fs` mẫu đã dựng ở đầu
  `basics-files.ts` (đừng bịa đường dẫn); check: tệp có ở **cả hai** nơi (dùng loại check desktop sẵn có;
  nếu chưa có check "tồn tại ở đường dẫn", thêm `{ kind: 'exists'; path: string }` vào grader desktop kèm test).
- Thực hành 2: `setup` xoá nhầm một file; đề "Bạn vừa lỡ xoá «ke-hoach.xlsx». Lấy lại bằng **hoàn tác**." → check file
  tồn tại lại ở chỗ cũ; lời giải `{type:'undo'}`.

## 2. Shift+click chọn dải trong vùng file

`FileArea.tsx`: nhớ `anchor` (mục bấm thường gần nhất). Shift+click → chọn mọi mục từ anchor tới mục bấm theo thứ tự
đang hiện; Ctrl/⌘+click bật/tắt một mục (nếu đã có thì giữ). Phát `select {ids}` như cũ — reducer không đổi.

## 3. Menu chuột phải của phòng tập chuột không tràn khung

`MouseSim.tsx` (khung trò chơi `overflow-hidden`): mở menu ở toạ độ con trỏ rồi **kẹp** để menu nằm trọn trong khung —
dùng lại cách `FileArea` đang kẹp (đọc hàm đó, tách thành `clampMenu(x, y, menuW, menuH, boxW, boxH)` dùng chung trong
`client/src/lib/` nếu hai nơi giống nhau).

## Bước

- [ ] **1. Test (FAIL)**: bài copy — content.test (solution đạt, không đạt sẵn); Shift+click mục 2 rồi Shift+click mục 5
  → chọn 2..5; Ctrl+click thêm/bớt; `clampMenu` ở góc dưới phải trả toạ độ để menu nằm trọn; MouseSim chuột phải sát
  mép phải → `style.left + width ≤ khung`.
- [ ] **2. Sửa** ba phần; `npm test && npm run typecheck` xanh.
- [ ] **3. Kiểm trên trình duyệt**: học bài copy cả Win/Mac; chuột phải ở bốn góc phòng tập chuột → menu luôn trọn;
  Shift+click trong vùng file.
- [ ] **4. Commit** `feat(basics): bài sao chép + hoàn tác, Shift+click, menu không tràn` + dòng STATUS.
