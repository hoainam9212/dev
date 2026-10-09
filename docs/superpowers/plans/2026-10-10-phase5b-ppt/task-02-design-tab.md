# Task 2: Vẽ theo theme + thẻ Design + Font Color "Automatic" (client)

**Files:**
- Create: `client/src/sims/ppt/RibbonDesign.tsx`, `RibbonDesign.test.tsx`
- Modify: `client/src/sims/ppt/ElementView.tsx`, `Canvas.tsx`, `SlideList.tsx`, `Ribbon.tsx`, `RibbonHome.tsx`,
  `RibbonHome.test.tsx`, `client/src/content/help-ids.ts`, `client/src/styles/theme.css` (nếu thêm lớp)

## Interfaces

- Consumes (Task 1): `pptSim.PPT_THEMES`, `pptSim.themeOf`, action `setTheme`.
- Produces:
  - `ElementView` nhận thêm prop `theme: pptSim.PptTheme` (bắt buộc). Màu chữ = `fmt.color ?? (role === 'title' ? theme.accent : theme.fg)`;
    `font-family` = `theme.font`. Hình khối và ảnh không đổi theo theme.
  - Khung slide (canvas, thumbnail) đặt `background: theme.bg` và `data-theme={theme.id}`.
  - `RibbonDesign({ state, dispatch })`: nhóm **Themes** gồm 6 nút `ToolButton variant="office"`, mỗi nút là một
    slide tí hon (nền `bg`, chữ "Aa" màu `accent` bằng `font`), `aria-pressed` = theme đang dùng,
    `label` = `"<name> – chủ đề trang trí"`, helpId `ppt.themes` trên `Group`/nút đầu.
  - Font Color của thẻ Home có mục đầu tiên **"Automatic"** (Tự động) → `setFmt { color: undefined }`.
  - `HELP_IDS['ppt.themes']`: label `Themes (Chủ đề)`, vi: "Đổi cùng lúc màu nền, màu chữ và kiểu chữ cho **mọi slide**. Chữ bạn đã tô màu riêng thì giữ màu đó."

Thẻ Design của PowerPoint thật có Themes | Variants | Customize. Chỉ làm **Themes**; Variants/Customize không có
trong bài nào (YAGNI). Ảnh thật ở Task 5 sẽ cho người học thấy đủ.

## Bước

- [ ] **1. Test (FAIL)** — `RibbonDesign.test.tsx` và thêm vào test có sẵn:
  - Thẻ Design hiện 6 nút theme, đúng tên theo thứ tự `PPT_THEMES`.
  - Nút của theme đang dùng có `aria-pressed="true"`, các nút khác `false`.
  - Bấm nút "Biển" phát `{ type: 'setTheme', theme: 'bien' }`.
  - `Ribbon`: bấm thẻ Design không còn chữ "sắp có" của `SoonTab`.
  - `ElementView` (qua Canvas): tiêu đề không có `fmt.color` mang màu `accent` của theme; nội dung mang `fg`.
  - Đối tượng có `fmt.color: '#000000'` giữ đen dù theme là `dem`.
  - Canvas và thumbnail có `data-theme` đúng theme state.
  - Font Color › "Automatic" phát `setFmt` với `color: undefined`.
- [ ] **2. Chạy, xác nhận FAIL** — `npm test -w client -- ppt`.
- [ ] **3. Truyền theme** — `Canvas` và `SlideList` tính `const theme = pptSim.themeOf(state.theme)` một lần, truyền xuống
  `ElementView`. Chữ mờ "Bấm để nhập…" dùng `theme.fg` với `opacity: .5` (trên nền tối vẫn đọc được).
- [ ] **4. `RibbonDesign`** — dựng theo `RibbonInsert.tsx`; thay `SoonTab` của Design trong `Ribbon.tsx`.
  Bỏ chữ "sắp có" của Design khỏi test cũ nếu có.
- [ ] **5. "Automatic" trong Font Color** — `RibbonHome.tsx`, dùng `MenuButton` có sẵn; mục đầu có ô màu viền đứt.
- [ ] **6. Chạy xanh** — `npm test && npm run typecheck`.
- [ ] **7. Kiểm trên trình duyệt** (preview `office-neko`, một bài PowerPoint bất kỳ có thực hành):
  - Đổi lần lượt cả 6 theme: chụp ảnh từng theme, chữ tiêu đề và nội dung đều đọc rõ; thumbnail đổi theo.
  - Theme `dem`: tô một hộp chữ màu đen → chữ chìm → Font Color › Automatic → chữ hiện lại.
  - Undo sau khi đổi theme quay về theme cũ.
  - `getComputedStyle` của khung slide: `background-color` khớp `bg`.
  - Nhóm Themes không tràn ribbon ở bề rộng 1280 và 390 (ribbon cuộn ngang như các thẻ khác).
- [ ] **8. Commit** `feat(ppt): thẻ Design với 6 theme, chữ theo màu theme` kèm dòng Task 2 trong `STATUS.md`.
