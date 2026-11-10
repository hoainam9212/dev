# Làn desktop – tình trạng

Nhánh: `office-neko/feat/lane-desktop`. Chỉ làn desktop sửa file này. Mỗi task sửa một dòng, trong cùng commit, rồi push.

| Task | Xong | Commit | Ghi chú |
|---|---|---|---|
| D1 6B Task 6: đi một vòng, sao lưu, gộp master | ☑ | 55f03ff + (commit này) | 6B gộp `master` (ff) và đã push. Chi tiết ở `2026-10-10-phase6b-polish/STATUS.md` dòng 6. Không có lỗi nào trong file của làn cloud. |
| D2 đưa bản online lên mạng | ☑ | (commit này) | Người dùng chọn Cloudflare Pages, tên `mochi-office` → <https://mochi-office.pages.dev>, đưa lên bản lane ce080c5. Đăng nhập: `wrangler@3 login` lỗi (CSRF/400), `wrangler@4` được. Không cần luật SPA (không có `404.html` thì Pages tự trả `index.html`). Chrome thật: manifest `application/manifest+json`, `sw.js` `max-age=0`, link sâu 200, Chrome bắn `beforeinstallprompt` → nút "Cài vào máy" hiện, mất mạng `/`, `/settings`, `/typing`, `/lesson/excel.sum` vẫn mở, 390 px không tràn. Lệnh đưa bản mới ghi ở README. |
| D3 bài Start/Taskbar, Dock/Spotlight | ☑ | (commit này) | Chương "Mở ứng dụng" trước "Thư mục và file", 2 bài **tự chọn** (`optional`) để người đã xong basics không bị khoá lại Gõ phím; test mở khoá đặt ở `content.test.ts` (dùng lộ trình thật) thay vì `progress.test.ts`. Học thật cả hai bản trên Chrome, 390 px không tràn. D2 vẫn chờ host. **Sửa sau (người dùng chụp màn hình):** `lessonSatisfied` coi bài tự chọn luôn xong nên bài NGAY SAU nó (Mở File Explorer; ở Gõ phím là "Chơi Mèo bắt cá" sau 2 bài VNI) mở sẵn cho người mới. Nay bài tự chọn chỉ "trong suốt" (bài sau mở theo lượt của nó); test người mới chỉ mở `basics.welcome` ở `content.test.ts`. |
| D4 copy + hoàn tác, Shift+click, menu không tràn, trợ năng FileArea/MouseSim | ☑ | (commit này) | Bài `basics.files.copy.*` "Sao chép và hoàn tác" sau `move`, **tự chọn** như D3 (test: người học xong chương cũ không bị khoá). Tệp lấy từ `HOME` sẵn có (`bang-luong.xlsx` → Tài liệu; xoá nhầm `don-xin-viec.docx` thay cho `ke-hoach.xlsx` bịa trong plan), check `pathExists` có sẵn nên không thêm `exists`; `desktopPractice({ undoableSetup })` giữ lỡ tay của `setup` trong lịch sử hoàn tác. `lib/clampMenu.ts` (kẹp + lật lên, `isMenuKey`) dùng chung cho FileArea (thay `placePopover`) và MouseSim. Vùng file: `listbox` "Các file và thư mục" + `aria-multiselectable`, mục `option`/`aria-selected`, một điểm dừng Tab, mũi tên/Home/End, Shift+mũi tên/click theo mốc, Ctrl/⌘+click, Space; menu chuột phải mở bằng Shift+F10/phím Menu, dùng `menuKeyDown` của ribbon, Esc/Tab trả focus. Chrome thật: học trọn bài cả Win (nút) lẫn Mac (⌘C/⌘V/⌘Z); phòng tập chuột chuột phải 4 góc mỗi thùng 24/24 menu trọn (1280 + 390 px), Shift+F10 → ↓ → Enter trúng; vùng file Shift+click, Ctrl+click, phím, Shift+F10 → "Cắt". Mục cloud 5 (`data-cell`), 6 (nút "?") vẫn để task riêng. |
| D5 gộp lane-cloud, đi một vòng, kết thúc dự án | ☐ | | |

## Đã gộp từ lane-cloud

- 2026-11-10: C1 + C2 từ `claude/vigilant-galileo-8wdiu6` (merge `2302f2d`), sạch, chỉ file của cloud; shared 551 /
  client 511 xanh.
- 2026-11-10: C3 + C4 + C1b từ `claude/vigilant-galileo-8wdiu6` @ `33ed155` (merge `676bd2e`), không xung đột. Cloud
  thêm 6 test shared + 18 test client. Ngoài file của cloud chỉ đụng `help/spotlight.test.tsx` (1 dòng, test của
  `SpotlightOverlay` cloud sửa ở C3) — giữ nguyên. Gộp xong **2 test `PlacementPage` đỏ**: bài gõ kết thúc khi hồ sơ
  chưa nạp, rồi effect reset của `SpeedTestPage` (deps nay có `profileId`) xoá kết quả. Sửa test của desktop: chờ hồ sơ
  nạp xong rồi mới gõ (như app thật); lỗi tiềm ẩn ghi ở "Nhờ làn cloud" 6. Sau gộp + mục 4, 7: shared 559 / client 539.

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
6. **Nhờ cloud — `SpeedTestPage.tsx`:** effect `[attempt, minutes, profileId]` vừa reset (`saved=false`,
   `setResult(null)`) vừa gắn `pagehide`. Hồ sơ đổi hoặc nạp muộn sau khi bài đã xong thì kết quả bị xoá (con chạy
   `onState` trước, effect cha reset sau). Nên tách: reset theo `[attempt, minutes]`, listener rời trang theo
   `profileId` (đọc qua ref). Không gấp: trên app thật hồ sơ nạp xong từ lâu trước khi gõ hết giờ.
7. **Mục "Nhờ làn desktop" của STATUS-cloud:** 1 xong (`baaf407`), 2 xong (`1375d4e`), 3 xong (`ce080c5`),
   **4 xong** (`typingMetrics` dùng `composedAccuracy` khi có `ime`; test `typingSession.test`: Telex đúng 100%,
   "dương " thay "đường " 67%), **7 xong** (`MENU_ITEM_ROLE = 'menuitem'`, cả bộ xanh không phải sửa test nào).
   5 (`data-cell` cho ô Excel) và 6 (nút "?" ở 390 px) để D4 hoặc task riêng. Chrome thật: Tab tới "Giãn dòng",
   Enter mở menu, focus vào `menuitem` "Giãn dòng 1,0", ↓ sang 1,5, Esc đóng và trả focus về nút; `typing.telex2`
   gõ đúng 100%, "hocs" (hóc) thay "hocj" → 92% (12/13 chữ).
