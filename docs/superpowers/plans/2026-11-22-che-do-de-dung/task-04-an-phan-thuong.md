# Task 4: Ẩn phần thưởng

**Ra được:** hồ sơ dễ dùng không thấy XP, cấp, phụ kiện, huy hiệu. Vẫn thấy sao, lời khen, Mochi, pháo giấy.
Dữ liệu XP/huy hiệu vẫn ghi như cũ (tắt chế độ là thấy lại), chỉ ẩn phần hiển thị.

## Giao diện (`useEasyMode()` ở từng chỗ)

- `app/AppShell.tsx`: ẩn chip "Cấp N · X XP"; ảnh đại diện bỏ `accessory` (`wearable(profile)` ⇒ `null`).
- `pages/HomePage.tsx`: ẩn `BadgeShelf`.
- `player/FinishView.tsx`: ẩn dòng `+N XP`, khối "Huy hiệu mới!", dòng phụ kiện mới. Thay dòng XP bằng một câu
  khen theo số sao:
  - 3 sao: "Tuyệt vời! Bạn làm rất giỏi."
  - 2 sao: "Giỏi lắm! Lần sau thử ít gợi ý hơn nhé."
  - 1 sao: "Bạn đã làm xong rồi! Học lại lúc nào cũng được."
  Bỏ dòng "Gợi ý đã dùng · Lần kiểm tra chưa đúng" (con số làm người lớn tuổi lo).
- `pages/SettingsPage.tsx`: ẩn mục "Phụ kiện cho Mochi".
- Giữ nguyên: `Confetti`, Mochi `happy`, lời "Giỏi quá! Bạn làm đúng rồi 🎉" ở `PracticeView`, `why` của quiz,
  `🔥` chuỗi ngày và vòng mục tiêu.

## Test (vitest)

- `AppShell` dễ dùng: không có chữ "XP", không có "Cấp".
- `AppShell` thường: vẫn có "Cấp".
- `FinishView` dễ dùng 3 sao: có "Tuyệt vời!", không có "XP", không có "Gợi ý đã dùng".
- `FinishView` dễ dùng có `newBadges`, `newAccessories`: không hiện "Huy hiệu mới!", không hiện "phụ kiện".
- `FinishView` thường: như cũ (`+10 XP`).
- `HomePage` dễ dùng: không có kệ huy hiệu.
- `SettingsPage` dễ dùng: không có mục "Phụ kiện cho Mochi".

## Kiểm trình duyệt

Hồ sơ dễ dùng làm xong `basics.mouse.click`: màn xong có sao, câu khen, Mochi vui, pháo giấy; không XP.

## Commit

`feat(de-dung): ẩn XP, cấp, phụ kiện, huy hiệu; câu khen theo số sao` + dòng STATUS.
