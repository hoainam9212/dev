# Nhiều người học trên một máy – tình trạng

Cập nhật một dòng sau mỗi task, trong cùng commit của task đó. Phiên mới đọc file này trước.

Nhánh: `feat/multi-profile` (tạo ở Task 1, gộp `--ff-only` vào `master` ở Task 6).

| Task | Xong | Commit | Ghi chú / việc còn treo |
|---|---|---|---|
| 1 Schema v2 + di trú | ☑ | (commit này) | Đích cho Task 2: 28 test đỏ / 10 file, 58 lỗi typecheck — đều do mã cũ còn dùng `db.profile`, `db.progress`… |
| 2 Người đang học + hàm nhận profileId | ☑ | (commit này) | client: 140 test xanh (trước tính năng này là 124), typecheck sạch |
| 3 Màn "Ai đang học?" | ☐ | | |
| 4 Cài đặt: quản lý hồ sơ | ☐ | | |
| 5 Sao lưu v2 | ☐ | | |
| 6 Kiểm tra tổng thể + gộp nhánh | ☐ | | |

## Quyết định đã chốt

- 2026-09-21: luôn hiện màn chọn người khi mở app; không PIN, không mật khẩu; một file sao lưu chứa mọi người.
- 2026-09-21: một database, mọi bảng thêm `profileId` vào khoá (đã loại: mỗi hồ sơ một DB riêng; khoá tổ hợp dạng chuỗi).
- 2026-09-21 (Task 1, phát sinh khi làm): **bốn bảng phải đổi tên** vì Dexie không đổi được khoá chính của bảng đã có
  (`UpgradeError: Not yet support for changing primary key`): `progress`→`lessonProgress`, `keyStats`→`keyPractice`,
  `activity`→`dailyActivity`, `badges`→`earnedBadges`. Di trú làm hai bước: v2 tạo bảng mới và chép sang, v3 xoá bảng cũ.
  `typingRuns` và `sandboxDocs` giữ tên (khoá chính không đổi). Spec mục 4.2 đã cập nhật theo.

## Việc còn treo

- (xong ở Task 2) đổi tên bảng ở mọi chỗ dùng.
- Task 3 lưu ý: `WelcomePage` hiện tạm đặt `avatar: 'cam'` cho mọi hồ sơ mới — bước chọn ảnh là việc của Task 3.
