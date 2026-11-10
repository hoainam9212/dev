# Làn desktop – tình trạng

Nhánh: `office-neko/feat/lane-desktop`. Chỉ làn desktop sửa file này. Mỗi task sửa một dòng, trong cùng commit, rồi push.

| Task | Xong | Commit | Ghi chú |
|---|---|---|---|
| D1 6B Task 6: đi một vòng, sao lưu, gộp master | ☑ | 55f03ff + (commit này) | 6B gộp `master` (ff) và đã push. Chi tiết ở `2026-10-10-phase6b-polish/STATUS.md` dòng 6. Không có lỗi nào trong file của làn cloud. |
| D2 đưa bản online lên mạng | ☐ | | chờ người dùng chọn host + đăng nhập |
| D3 bài Start/Taskbar, Dock/Spotlight | ☑ | (commit này) | Chương "Mở ứng dụng" trước "Thư mục và file", 2 bài **tự chọn** (`optional`) để người đã xong basics không bị khoá lại Gõ phím; test mở khoá đặt ở `content.test.ts` (dùng lộ trình thật) thay vì `progress.test.ts`. Học thật cả hai bản trên Chrome, 390 px không tràn. D2 vẫn chờ host. |
| D4 copy + hoàn tác, Shift+click, menu không tràn, trợ năng FileArea/MouseSim | ☐ | | |
| D5 gộp lane-cloud, đi một vòng, kết thúc dự án | ☐ | | |

## Đã gộp từ lane-cloud

- 2026-11-10: C1 + C2 từ `claude/vigilant-galileo-8wdiu6` (merge `2302f2d`), sạch, chỉ file của cloud; shared 551 /
  client 511 xanh.

## Nhờ làn cloud

1. **Nhánh cloud (sửa luật 2026-11-10):** phiên cloud chỉ push được lên `claude/*`, mỗi phiên một tên mới. Từ nay:
   đầu phiên, `git fetch origin`, lấy tên nhánh cloud **mới nhất** ghi ở dòng "Nhánh thật trên GitHub" của
   STATUS-cloud trên nhánh đó (hiện là `claude/vigilant-galileo-8wdiu6`), rồi
   `git checkout -B <nhánh-phiên-này> origin/<nhánh-cloud-mới-nhất>` — **nối tiếp**, không tách lại từ
   `office-neko/feat/lane-cloud`. Push xong thì sửa dòng "Nhánh thật trên GitHub" thành tên nhánh của phiên này.
   Nhờ vậy nhánh cloud mới nhất luôn chứa mọi task cloud trước đó, và desktop chỉ cần gộp nhánh đó.
2. Ba mục "Nhờ làn desktop" của C1 (truy vấn `menuitem` trong test ribbon, phím trong lưới Excel, vùng chọn bằng phím
   trong Word) đã nhận; desktop xếp vào sau D3 (ghi ở bảng trên khi làm).
3. **Mục 1 (test ribbon) XONG — cloud đặt được `MENU_ITEM_ROLE = 'menuitem'`.** 10 test Excel/Word giờ tìm mục menu
   bằng `menuItem()`/`menuItems()` trong `client/src/test/menu.ts` (`within(getByRole('menu')).getByLabelText`). Desktop
   đã thử bật `'menuitem'` tại chỗ (không commit): mọi test của desktop xanh. Còn **11 test đỏ trong file của cloud**,
   cloud sửa cùng lúc bật: `components/ribbon.test.tsx` (SplitButton, 1), `ppt/RibbonHome.test.tsx` (8),
   `ppt/RibbonInsert.test.tsx` (2). Dùng lại `menuItem` từ `../../test/menu` được.
4. **Mục 2 (lưới Excel) XONG.** Nguyên nhân gốc: **thanh công thức nuốt Tab** kể cả khi không sửa gì, nên Tab
   không bao giờ tới lưới; người dùng tưởng đang ở lưới nhưng thật ra gõ vào thanh công thức (= sửa ô A1, Enter
   xuống A2, đúng như Excel). Thêm: lưới thôi tự giật con trỏ lúc mở bài (lần Tab đầu từng dời ô chọn sang B1),
   Tab ở lưới khi không sửa thì ra khỏi lưới (không kẹt), Home / Ctrl+Home, `role="grid"` "Bảng tính" +
   `aria-activedescendant` + `aria-selected`, nút ô/đầu cột/đầu hàng `tabIndex=-1` (cả lưới một điểm dừng Tab).
   Chrome thật: 25 Tab từ đầu trang tới lưới, Ctrl+Home → ↓×4 gõ `=SUM(B2:B4)` vào đúng B5 (37300000).
5. **Mục 3 (vùng chọn bằng phím trong Word) XONG.** Chỉ lộ ra khi bấm phím **liền nhau** (công cụ tự động qua CDP;
   nghỉ 150 ms giữa các phím thì luôn đúng). Nguyên nhân gốc ở ProseMirror: Shift+End/Home/↓ do trình duyệt tự dời
   con trỏ, ProseMirror chỉ đọc vùng chọn mới khi `selectionchange` tới; keydown của nó chỉ `forceFlush` khi có thay
   đổi nội dung chờ. Ctrl+U đến trước sự kiện đó → gạch chân vùng chọn cũ. Sửa: `editorProps.handleKeyDown` (chạy trước
   keymap) lấy vùng chọn trên màn hình nếu khác (bỏ qua bộ gõ keyCode 229 và vùng chọn ảnh/ô bảng). Chrome thật bấm liền
   6/6 lần đúng (bản build + dev); Hoàn tác ribbon, bôi đen chuột + I, gõ nhanh vẫn đúng.
