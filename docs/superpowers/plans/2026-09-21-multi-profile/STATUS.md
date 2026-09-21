# Nhiều người học trên một máy – tình trạng

Cập nhật một dòng sau mỗi task, trong cùng commit của task đó. Phiên mới đọc file này trước.

Nhánh: `feat/multi-profile` (tạo ở Task 1, gộp `--ff-only` vào `master` ở Task 6).

| Task | Xong | Commit | Ghi chú / việc còn treo |
|---|---|---|---|
| 1 Schema v2 + di trú | ☐ | | |
| 2 Người đang học + hàm nhận profileId | ☐ | | |
| 3 Màn "Ai đang học?" | ☐ | | |
| 4 Cài đặt: quản lý hồ sơ | ☐ | | |
| 5 Sao lưu v2 | ☐ | | |
| 6 Kiểm tra tổng thể + gộp nhánh | ☐ | | |

## Quyết định đã chốt

- 2026-09-21: luôn hiện màn chọn người khi mở app; không PIN, không mật khẩu; một file sao lưu chứa mọi người.
- 2026-09-21: một database, mọi bảng thêm `profileId` vào khoá (đã loại: mỗi hồ sơ một DB riêng; khoá tổ hợp dạng chuỗi).

## Việc còn treo

- (trống)
