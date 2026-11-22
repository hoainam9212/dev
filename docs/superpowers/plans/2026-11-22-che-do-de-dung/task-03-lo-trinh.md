# Task 3: Lộ trình cho chế độ dễ dùng

**Ra được:** hồ sơ dễ dùng chỉ thấy 4 lộ trình theo thứ tự Làm quen máy tính → PowerPoint → Word → Excel;
"Học tiếp" và "Bài tiếp theo" đi đúng thứ tự đó.

## Giao diện

- `client/src/lib/easy.ts`: `EASY_TRACK_ORDER = ['basics', 'ppt', 'word', 'excel'] as const`;
  `tracksFor(easy: boolean): Track[]`: tắt ⇒ `TRACKS` (cùng tham chiếu); bật ⇒ 4 lộ trình đó, bản sao với
  `order` = vị trí trong `EASY_TRACK_ORDER`. `useTracks(): Track[]` = `tracksFor(useEasyMode())`.
- Thay `TRACKS` bằng `useTracks()` ở: `pages/HomePage.tsx` (`unlockState`, `todo`, `TrackMap`),
  `pages/LessonPage.tsx` (`unlockState`, `nextLessonId`).
- Bài thuộc lộ trình bị ẩn (ví dụ mở link `/lesson/typing.home1`) ⇒ `LessonPage` về `/` như bài bị khoá.
- `app/AppShell.tsx`: bật thì ẩn chip "Luyện gõ".
- `pages/HomePage.tsx`: bật thì không truyền `placeable` (ẩn nút kiểm tra đầu vào trên bản đồ).
- `PlacementPage`, `GlossaryPanel`: giữ `TRACKS` (không ảnh hưởng người học dễ dùng; ghi chú một dòng).

## Test (vitest)

- `tracksFor(false)` trả đúng `TRACKS`.
- `tracksFor(true)`: id theo thứ tự `basics, ppt, word, excel`, `order` 0..3; `TRACKS` gốc không bị đổi `order`.
- `nextLessonId(tracksFor(true), …)` sau bài cuối của basics (Windows) là bài đầu của ppt.
- `HomePage` hồ sơ dễ dùng: thấy 4 tiêu đề lộ trình theo đúng thứ tự, không thấy "Gõ phím 10 ngón", "Dùng AI".
- `HomePage` hồ sơ thường: vẫn đủ 6 lộ trình.
- `AppShell` hồ sơ dễ dùng: không có nút "Luyện gõ".
- `LessonPage` hồ sơ dễ dùng mở bài typing ⇒ chuyển về `/`.

## Kiểm trình duyệt

Hồ sơ dễ dùng: bản đồ 4 lộ trình, bấm "Học tiếp" vào `basics.welcome`. Hồ sơ thường: như cũ.

## Commit

`feat(de-dung): thứ tự lộ trình Máy tính → PowerPoint → Word → Excel, ẩn Gõ phím và AI` + dòng STATUS.
