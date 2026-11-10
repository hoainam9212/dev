# Làn cloud – tình trạng

Nhánh: `office-neko/feat/lane-cloud`. Chỉ làn cloud sửa file này. Mỗi task sửa một dòng, trong cùng commit, rồi push.

**Nhánh thật trên GitHub:** phiên cloud chỉ được push lên nhánh `claude/...`, nên C1 nằm ở
`claude/vigilant-galileo-8wdiu6` (tách từ `office-neko/feat/lane-cloud`, không gộp gì khác). Desktop gộp nhánh này thay
cho `lane-cloud`: `git fetch github && git merge --no-ff github/claude/vigilant-galileo-8wdiu6`.

| Task | Xong | Commit | Ghi chú |
|---|---|---|---|
| C1 trợ năng (trừ FileArea/MouseSim) | ☑ | (commit này) | menu ribbon + menu slide bằng phím, `useDialogFocus`, listbox slide + Alt+↑/↓, Enter/F2 gõ chữ, aria-live, vòng focus. `ppt.textbox` học trọn bằng phím trên Chromium. Mục menu ribbon tạm giữ vai trò `button` (xem Nhờ làn desktop 1) |
| C2 bàn phím ảo theo HĐH + bàn tay | ☑ | (commit này) | `keyboardRows(os)` đủ 5 hàng (Win `Ctrl ⊞ Alt`, Mac `⌃ ⌥ ⌘`), phím co theo đơn vị bề rộng; `fingersForChar` dùng chung; `Hands` SVG tô ngón (+ út tay kia khi Shift). `typing.home1` cả hai HĐH, 1280 + 390px không tràn (đã xem ảnh). `KeyHeatmap` (desktop) vẫn dùng `KEY_ROWS` cũ, không đổi |
| C3 Telex/VNI, bài tốc độ bỏ dở, spotlight | ☑ | (commit này) | (1) `composedAccuracy` trong `shared/src/typing` (đếm theo chữ đã ghép), **chưa nối dây**: `typingSession.ts` của desktop (Nhờ làn desktop 4). (2) phút = thời gian gõ thật (phím đầu → phím cuối), làm tròn xuống, ≥ 5 s thì ít nhất 1 phút; bỏ dở chỉ cộng phút, không ghi `typingRun`. (3) spotlight theo resize/scroll/ResizeObserver/MutationObserver + rAF; sửa luôn spotlight ô Excel không tìm thấy ô. Chromium: gõ 10 s rồi rời bài → vòng 0→1 phút; khung B5 bám đúng khi cuộn/đổi cỡ |
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
4. **Độ chính xác Telex/VNI (C3 mục 1)**: hàm đã có, chỉ cần nối một dòng trong `shared/src/sims/typingSession.ts`,
   `typingMetrics`: `accuracy: s.ime ? composedAccuracy(s.target, text, s.keystrokes - s.correctKeys) : accuracy(s.correctKeys, s.keystrokes)`
   (import `composedAccuracy` từ `'../typing'`). Test trong `shared/src/typing/typing.test.ts` đã chạy qua reducer thật
   (`dduwowngf` → 100%, "dương " thay "đường " → 67%). Nối xong thì `typing.telex2` gõ đúng vẫn 100%, gõ sai dấu tụt theo chữ.
5. **Lưới Excel**: ô không có `data-cell`, nên spotlight `{ cell }` (gợi ý bậc 2) trước giờ không hiện. Cloud đã cho
   `spotlightSelector` tìm cả `[data-testid="cell-B5"]`, chạy được rồi; nếu desktop thêm `data-cell={name}` vào nút ô thì
   gọn hơn (không bắt buộc).

## Cần desktop soi ảnh

(trống)
