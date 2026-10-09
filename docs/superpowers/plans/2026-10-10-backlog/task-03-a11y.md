# Task 3: Một lượt trợ năng cho mọi sim

**Files (sửa, không tạo mới trừ test):** `client/src/components/ribbon.tsx` (`MenuButton`, `SplitButton`), hộp thoại
`client/src/sims/{word,excel,ppt}/dialogs.tsx`, `client/src/sims/desktop/FileArea.tsx`, `client/src/sims/mouse/MouseSim.tsx`,
`client/src/sims/fish/FishSim.tsx`, `client/src/sims/ppt/Canvas.tsx`, `SlideList.tsx`; test cạnh từng file.

## Việc cần đạt (mỗi dòng một test trước, rồi sửa)

1. **Menu thả xuống** (`MenuButton`, `SplitButton`, menu chuột phải FileArea/SlideList): nút có `aria-haspopup="menu"`,
   `aria-expanded`; bảng có `role="menu"`, mục `role="menuitem"`; mở bằng Enter/Space/↓ thì focus mục đầu; ↑/↓ đi
   vòng; Esc đóng và **trả focus về nút**; Tab ra ngoài thì đóng.
2. **Hộp thoại** (Lưu, In, chèn ảnh, xác nhận xoá): `role="dialog"`, `aria-modal`, `aria-labelledby`; mở thì focus ô
   đầu tiên; Tab bị **giữ trong** hộp thoại; Esc đóng; đóng thì trả focus về nút đã mở. Tách hook `useDialogFocus(ref,
   open, returnTo)` trong `client/src/lib/` dùng chung.
3. **Vùng có nhãn**: lưới Excel (`role="grid"` đã có? kiểm), cột thumbnail PowerPoint (`role="listbox"`, mục
   `role="option"`, `aria-selected`), vùng file (`role="listbox"` + `aria-multiselectable`) — mỗi vùng có `aria-label`.
4. **Kéo–thả bằng phím**: PowerPoint đã có mũi tên dời 8px (kiểm còn chạy); thumbnail: Alt+↑/↓ đổi thứ tự slide
   (`moveSlide`); vùng file: thao tác chuyển thư mục có đường bằng menu (Cut/Paste) — ghi chú trong lời bài nếu bài kéo
   –thả có cách khác.
5. **aria-live**: trò chơi Mèo bắt cá báo điểm/từ kế tiếp qua `aria-live="polite"`; kết quả "Kiểm tra" của
   `PracticeView` đọc được (kiểm đã có chưa).
6. **Vòng focus thấy được** trên mọi nút ribbon (`:focus-visible` rõ trên cả nền sáng/tối).

## Bước

- [ ] **1. Test (FAIL)** cho từng mục 1–5 (Testing Library `user.keyboard`, `toHaveFocus`, `toHaveAttribute`).
- [ ] **2. Sửa** theo thứ tự 1 → 6; chạy `npm test -w client` sau mỗi mục.
- [ ] **3. `npm test && npm run typecheck`** xanh.
- [ ] **4. Kiểm bằng bàn phím thật** trên dev server, **không dùng chuột**: học trọn `word.bold`, `excel.sum`,
  `ppt.textbox` chỉ bằng Tab/Enter/Space/mũi tên/Esc. Ghi bước nào không làm được vào "Việc còn treo" nếu quá lớn.
  Chạy axe-core nếu có sẵn trong puppeteer (không thêm vào dependencies dự án) — tuỳ chọn.
- [ ] **5. Commit** `fix(a11y): menu, hộp thoại, vùng có nhãn, điều khiển bằng phím` + dòng STATUS.
