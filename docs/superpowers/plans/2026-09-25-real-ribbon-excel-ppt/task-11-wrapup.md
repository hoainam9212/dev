# Task 11: Kiểm tổng thể ba app, ghi nhớ, gộp nhánh

Task này **không thêm tính năng**. Lỗi tìm thấy ở đây thì sửa theo nhịp TDD (test đỏ trước), mỗi lỗi một commit.

**Files:**
- Modify: `README.md` (mục "Ribbon giống Office thật": ba app, cách thêm ảnh thật, `real-shots.mjs <app>`, `blur-names.ps1`)
- Modify: memory `office-neko-project.md`, `office-neko-real-ribbon-idea.md` (ngoài repo)
- Modify: `STATUS.md` của plan này

- [ ] **Bước 1: Soát nhất quán bằng lệnh** (mỗi lệnh phải trả về rỗng; không rỗng thì sửa):
  - `grep -rnE "\btab (Home|Insert|File|Data|Formulas|Design)" client/src/content` — lời bài còn chữ "tab" thay vì "thẻ".
  - `grep -rn "overflow-x-auto" client/src/sims/*/Ribbon*.tsx` — khung cuộn quanh menu.
  - `grep -rn "Kiểu số\|Tiền ₫\|Cột cần sắp\|Chèn biểu đồ\|nhóm Sửa" client/src/content` — tên cũ.
  - `grep -rnE "label: '[^']+ — " client/src/content/help-ids.ts` — gợi ý còn dạng "A — B" thay vì "A (B)".
- [ ] **Bước 2: Toàn bộ** `npm test && npm run typecheck && npm run build` — xanh.
- [ ] **Bước 3: Học thật, headless Chrome trên bản build** (`npm run preview`, hồ sơ mới, bật mở khoá toàn bộ):
  mỗi app học trọn **một bài có menu thả xuống** (Word `word.spacing`, Excel `excel.filter`, PowerPoint
  `ppt.slides`) tới màn hình kết quả, dừng ở bước ảnh thật chụp lại. Đổi thẻ ở cả ba app: chiều cao ribbon không đổi,
  màu gạch chân đúng app (xanh dương / xanh lá / cam).
- [ ] **Bước 4: Ảnh chụp so sánh** — đặt cạnh nhau ribbon trong app và ảnh `client/public/images/real/*-02-home.png`
  của từng app, gửi người dùng.
- [ ] **Bước 5: Memory.** `office-neko-project.md`: ba app đã có ribbon kiểu office; **5B phải dựng Design / Transitions
  / Slide Show bằng `RibbonTabs`/`RibbonPanel`/`variant="office"`, tên tiếng Anh, và thêm ảnh thật vào
  `real-shots-ppt.md`**. `office-neko-real-ribbon-idea.md`: trạng thái xong, commit tip. Cập nhật dòng `MEMORY.md`.
- [ ] **Bước 6: README** như mục Files.
- [ ] **Bước 7: Commit** `docs: ribbon giống Office thật cho cả ba app` + STATUS "XONG".
- [ ] **Bước 8: Gộp.** Hỏi người dùng có muốn chạy review toàn nhánh không (quy ước: chỉ khi được bảo). Rồi
  `git checkout master && git merge --ff-only feat/real-ribbon-excel-ppt && git branch -d feat/real-ribbon-excel-ppt`.
