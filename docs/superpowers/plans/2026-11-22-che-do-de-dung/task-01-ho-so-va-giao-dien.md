# Task 1: Hồ sơ và giao diện

**Ra được:** hồ sơ có cờ `easyMode`; bật thì chữ, nút to và rõ hơn. Cài đặt có công tắc và cỡ chữ "Cực lớn".

## Giao diện

- `client/src/db/db.ts` › `Profile`: thêm `easyMode?: boolean` (chú thích: hồ sơ cũ không có trường này);
  `fontScale: 'md' | 'lg' | 'xl' | 'xxl'`. Không cần nâng phiên bản Dexie (trường không đánh chỉ mục).
- `client/src/lib/easy.ts` (mới): `useEasyMode(): boolean` = `useProfile()?.easyMode ?? false`.
- `client/src/db/profile.tsx`: effect gán `root.dataset.font` như cũ; thêm `root.dataset.easy = '1'` khi bật, xoá khi tắt.
- `client/src/styles/theme.css`:
  - `:root[data-font="xxl"] { font-size: 24px; }`
  - Trong `@layer components`, khi `:root[data-easy="1"]`: `.btn*` cao tối thiểu 3.25rem, chữ to hơn một bậc;
    `--app-muted` đậm hơn (chữ phụ dễ đọc); `body` `line-height: 1.7`.
- `client/src/pages/SettingsPage.tsx`:
  - Cỡ chữ thêm `{ value: 'xxl', label: 'Cực lớn' }`.
  - Mục "Hiển thị" thêm Toggle "Chế độ dễ dùng" (`easyMode`), dòng mô tả: "Chữ to, nút to, chỉ hiện Làm quen máy
    tính, PowerPoint, Word, Excel; lời giải thích dễ hiểu hơn."
  - Bật công tắc thì đồng thời đặt `fontScale: 'xxl'` nếu đang nhỏ hơn và `unlockAll: true`; tắt thì chỉ đổi `easyMode`.

## Test (vitest)

- `profile.tsx`: hồ sơ `easyMode: true` ⇒ `<html>` có `data-easy="1"`; tắt ⇒ không có.
- `profile.tsx`: `fontScale: 'xxl'` ⇒ `data-font="xxl"`.
- `SettingsPage`: có lựa chọn "Cực lớn"; bấm thì hồ sơ lưu `xxl`.
- `SettingsPage`: bật "Chế độ dễ dùng" ⇒ hồ sơ có `easyMode: true`, `fontScale: 'xxl'`, `unlockAll: true`.
- `SettingsPage`: tắt "Chế độ dễ dùng" ⇒ `easyMode: false`, cỡ chữ giữ nguyên.

## Kiểm trình duyệt

Cổng dev 5174. Hồ sơ thường: trang chủ y như trước. Bật công tắc: chữ 24px, nút to, không tràn ở 1280 và 390.

## Commit

`feat(de-dung): cờ easyMode, cỡ chữ Cực lớn, công tắc trong Cài đặt` + dòng STATUS.
