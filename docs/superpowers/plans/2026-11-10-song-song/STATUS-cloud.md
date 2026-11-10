# Làn cloud – tình trạng

Nhánh: `office-neko/feat/lane-cloud`. Chỉ làn cloud sửa file này. Mỗi task sửa một dòng, trong cùng commit, rồi push.

**Nhánh thật trên GitHub:** phiên cloud chỉ được push lên nhánh `claude/...`, nên C1 nằm ở
`claude/vigilant-galileo-8wdiu6` (tách từ `office-neko/feat/lane-cloud`, không gộp gì khác). Desktop gộp nhánh này thay
cho `lane-cloud`: `git fetch github && git merge --no-ff github/claude/vigilant-galileo-8wdiu6`.

| Task | Xong | Commit | Ghi chú |
|---|---|---|---|
| C1 trợ năng (trừ FileArea/MouseSim) | ☑ | (commit này) | menu ribbon + menu slide bằng phím, `useDialogFocus`, listbox slide + Alt+↑/↓, Enter/F2 gõ chữ, aria-live, vòng focus. `ppt.textbox` học trọn bằng phím trên Chromium. Mục menu ribbon tạm giữ vai trò `button` (xem Nhờ làn desktop 1) |
| C2 bàn phím ảo theo HĐH + bàn tay | ☑ | (commit này) | `keyboardRows(os)` đủ 5 hàng (Win `Ctrl ⊞ Alt`, Mac `⌃ ⌥ ⌘`), phím co theo đơn vị bề rộng; `fingersForChar` dùng chung; `Hands` SVG tô ngón (+ út tay kia khi Shift). `typing.home1` cả hai HĐH, 1280 + 390px không tràn (đã xem ảnh). `KeyHeatmap` (desktop) vẫn dùng `KEY_ROWS` cũ, không đổi |
| C3 Telex/VNI, bài tốc độ bỏ dở, spotlight | ☐ | | |
| C4 lỗi PowerPoint mục 1–2 | ☐ | | |

## Nhờ làn desktop

1. **Test tìm mục menu ribbon bằng `button`.** Mục trong bảng thả xuống (`MenuButton`/`SplitButton`) đúng chuẩn phải
   là `role="menuitem"`, nhưng đổi thì 10 test của desktop đỏ: `excel/Ribbon.test.tsx`, `excel/RibbonHome.test.tsx`,
   `excel/ChartView.test.tsx`, `word/RibbonHome.test.tsx` (chúng gọi `getByRole('button', { name: <tên mục> })`).
   Nhờ đổi các truy vấn đó sang dạng không phụ thuộc vai trò, ví dụ
   `within(screen.getByRole('menu')).getByLabelText('<tên mục>')` (mục nào cũng có `aria-label`). Xong thì ghi vào
   STATUS-desktop, cloud đặt `MENU_ITEM_ROLE = 'menuitem'` trong `components/ribbon.tsx`.
2. **Lưới Excel (`excel/Grid.tsx`)** chưa có `role="grid"` hay `aria-label` (mục 3 của task-03). Thử `excel.sum` chỉ bằng
   phím trên Chromium: Tab tới được khung lưới, nhưng Ctrl+Home, →, ↓×4 rồi gõ `=SUM(B2:B4)` thì chữ vào **A1** và ô
   chọn nhảy về **A2**, không tới B5. Cần soi phím mũi tên/gõ trong lưới.
3. **Trình soạn Word (`word/Editor.tsx`)**: thử `word.bold` chỉ bằng phím. Ctrl+Home, Shift+End, Ctrl+B làm được dòng
   đầu; nhưng sau đó ↓, Home, Shift+End, Ctrl+U vẫn gạch chân **dòng đầu**, không chọn được dòng "Trân trọng". Có vẻ
   phím di chuyển con trỏ chưa cập nhật vùng chọn của trình mô phỏng.

## Cần desktop soi ảnh

(trống)
