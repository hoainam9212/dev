# Task 9: Hỏi Mèo, README, kiểm tra bản build, gộp master

**Files:**
- Modify: `client/src/content/faq.json`, `README.md`, `CLAUDE.md`, `docs/superpowers/plans/ROADMAP.md`, `STATUS.md`

## Bước

- [ ] **1. Hỏi Mèo** — 5 câu mới, mỗi câu có `keywords` cả có dấu lẫn không dấu (file bị ép kiểu, typecheck không bắt
  thiếu trường): đổi theme thế nào; chữ biến mất khi đổi theme tối (→ Font Color › Automatic); thêm chuyển cảnh cho
  mọi slide (Apply To All); bắt đầu trình chiếu (F5 / Shift+F5); thoát trình chiếu (Esc). Lời theo mẫu
  "thẻ **X** › nhóm **Y** › nút **Z**", không chữ "tab".
- [ ] **2. README** — mục PowerPoint: 12 bài / 5 chương, theme, chuyển cảnh, trình chiếu.
- [ ] **3. Toàn bộ** — `npm test && npm run typecheck && npm run build` xanh. Ghi số test shared/client vào STATUS.
- [ ] **4. Kiểm bản build** (`office-neko-preview`, cổng 4174, Chrome headless + puppeteer-core, hồ sơ mới):
  - Học `ppt.present` tới 3 sao bằng chuột + F5 thật.
  - Bề rộng 390: thẻ Design/Transitions/Slide Show cuộn ngang, không tràn trang; trình chiếu vẫn 16:9.
  - Ngắt mạng (`setOfflineMode`) rồi tải lại: bài PowerPoint mới vẫn mở được (service worker đã cache ảnh `ppt-06..08`).
  - Đổi sang hồ sơ khác rồi quay lại: tiến độ PowerPoint còn nguyên (việc treo từ 5A).
- [ ] **5. Gộp** — `git checkout master && git merge --ff-only feat/phase5b-ppt && git branch -d feat/phase5b-ppt`
  (nhánh chưa từng push nên `-d` được; nếu từ chối thì để nguyên, không `-D`).
- [ ] **6. Cập nhật** `CLAUDE.md` (dòng nhánh làm dở → "kế tiếp: plan 6A"), `ROADMAP.md` (☑ dòng 1), memory
  `office-neko-project` (một đoạn ngắn: 5B xong, số test, bẫy mới nếu có). Commit trên master
  `docs: 5B xong, gộp master` kèm STATUS ghi "☑ XONG".
- [ ] **7. Báo người dùng** một dòng: 5B đã gộp, có thể review cả nhánh nếu muốn; chưa push.
