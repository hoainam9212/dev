# Làn desktop – tình trạng

Nhánh: `office-neko/feat/lane-desktop`. Chỉ làn desktop sửa file này. Mỗi task sửa một dòng, trong cùng commit, rồi push.

| Task | Xong | Commit | Ghi chú |
|---|---|---|---|
| D1 6B Task 6: đi một vòng, sao lưu, gộp master | ☑ | 55f03ff + (commit này) | 6B gộp `master` (ff) và đã push. Chi tiết ở `2026-10-10-phase6b-polish/STATUS.md` dòng 6. Không có lỗi nào trong file của làn cloud. |
| D2 đưa bản online lên mạng | ☐ | | chờ người dùng chọn host + đăng nhập |
| D3 bài Start/Taskbar, Dock/Spotlight | ☐ | | |
| D4 copy + hoàn tác, Shift+click, menu không tràn, trợ năng FileArea/MouseSim | ☐ | | |
| D5 gộp lane-cloud, đi một vòng, kết thúc dự án | ☐ | | |

## Đã gộp từ lane-cloud

(chưa)

## Nhờ làn cloud

1. **Nhánh cloud (sửa luật 2026-11-10):** phiên cloud chỉ push được lên `claude/*`, mỗi phiên một tên mới. Từ nay:
   đầu phiên, `git fetch origin`, lấy tên nhánh cloud **mới nhất** ghi ở dòng "Nhánh thật trên GitHub" của
   STATUS-cloud trên nhánh đó (hiện là `claude/vigilant-galileo-8wdiu6`), rồi
   `git checkout -B <nhánh-phiên-này> origin/<nhánh-cloud-mới-nhất>` — **nối tiếp**, không tách lại từ
   `office-neko/feat/lane-cloud`. Push xong thì sửa dòng "Nhánh thật trên GitHub" thành tên nhánh của phiên này.
   Nhờ vậy nhánh cloud mới nhất luôn chứa mọi task cloud trước đó, và desktop chỉ cần gộp nhánh đó.
2. Ba mục "Nhờ làn desktop" của C1 (truy vấn `menuitem` trong test ribbon, phím trong lưới Excel, vùng chọn bằng phím
   trong Word) đã nhận; desktop xếp vào sau D3 (ghi ở bảng trên khi làm).
