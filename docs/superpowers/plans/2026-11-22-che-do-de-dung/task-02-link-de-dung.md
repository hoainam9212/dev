# Task 2: Link `/de-dung`

**Ra được:** mở `…/de-dung` là vào màn chào ngắn, hỏi tên, rồi tạo hồ sơ dễ dùng và vào trang chủ.

## Giao diện

- `client/src/profiles/manage.ts` › `createProfile(p, now)`: `NewProfile` thêm tuỳ chọn
  `easyMode?`, `fontScale?`, `unlockAll?` (mặc định như cũ: không có, `'md'`, `false`).
- `client/src/pages/EasyWelcomePage.tsx` (mới):
  - Hồ sơ đang chọn đã `easyMode` ⇒ `<Navigate to="/" replace />`.
  - Màn 1: Mochi `happy` 180px, lời chào ngắn: "Xin chào! Mình là Mochi. Mình sẽ cùng bạn học dùng máy tính,
    từng chút một." Nút "Bắt đầu".
  - Màn 2: "Bạn tên là gì?" ô nhập to; nút "Xong".
  - Bấm "Xong": `createProfile({ name, os: 'win', dailyGoalMin: 10, avatar: 'cam', easyMode: true,
    fontScale: 'xxl', unlockAll: true })`, `setCurrentProfileId`, rồi về `/` (theo cách của `WelcomePage`: không
    gọi `navigate()` thủ công, để `useProfile()` tự đưa đi).
  - Bỏ các bước chọn HĐH, mục tiêu, ảnh, kiểm tra đầu vào (đổi sau trong Cài đặt nếu cần).
  - Trang này đặt `data-font="xxl"` và `data-easy="1"` ngay từ đầu (chưa có hồ sơ nên effect của `ProfileProvider`
    chưa làm); trả lại khi rời trang.
- `client/src/App.tsx`: `<Route path="/de-dung" element={<EasyWelcomePage />} />` ngoài `RequireProfile`.
- Cloudflare tự trả `index.html` cho `/de-dung` (không có `404.html`), không cần cấu hình thêm.

## Test (vitest)

- `manage`: `createProfile` không truyền cờ mới ⇒ hồ sơ y như trước (`fontScale 'md'`, `unlockAll false`, không `easyMode`).
- `manage`: truyền `easyMode/fontScale/unlockAll` ⇒ lưu đúng.
- `EasyWelcomePage`: nhập tên, bấm Xong ⇒ có hồ sơ `easyMode`, `os 'win'`, `xxl`, `unlockAll`, là hồ sơ đang chọn.
- `EasyWelcomePage`: tên trống ⇒ nút Xong bị khoá.
- `EasyWelcomePage`: hồ sơ đang chọn đã dễ dùng ⇒ chuyển về `/`.
- `EasyWelcomePage`: máy đã có hồ sơ thường ⇒ vẫn tạo hồ sơ mới, hồ sơ cũ không đổi.

## Kiểm trình duyệt

Xoá IndexedDB, mở `/de-dung` ⇒ 2 màn, vào trang chủ chữ to. Mở `/` ở hồ sơ thường khác ⇒ như cũ.

## Commit

`feat(de-dung): trang /de-dung tạo hồ sơ dễ dùng` + dòng STATUS.
