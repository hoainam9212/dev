# Task 6: Đi một vòng toàn app, sao lưu khứ hồi, README, gộp

**Files:**
- Modify: `client/src/progress/backup.ts` (+ test, nếu cần), `README.md`, `CLAUDE.md`, `../ROADMAP.md`, `STATUS.md`

## Bước

- [ ] **1. Test sao lưu (FAIL nếu thiếu)** trong `backup.test.ts`:
  - Xuất rồi nhập lại hồ sơ có `accessory`, `testedOut`, 2 huy hiệu, 1 tệp Phòng tự do → còn đủ.
  - Nhập file `schemaVersion: 2` tạo **trước** 6B (dựng tay, không có các trường mới) → nhập được, `accessory`
    `undefined`, `testedOut` `undefined`, app vẫn mở trang chủ.
  - Nhập file v1 vẫn chạy như cũ.
- [ ] **2. Sửa `backup.ts`** nếu test đỏ; `npm test && npm run typecheck && npm run build` xanh. Ghi số test.
- [ ] **3. Đi một vòng bản build** (cổng 4174, Chrome headless + puppeteer-core, hồ sơ mới), mỗi mục một ảnh chụp:
  - Màn chào → Kiểm tra đầu vào → mở Word.
  - Bài đầu của **mọi** lộ trình (Làm quen, Gõ phím, Word, Excel, PowerPoint, AI) mở được ở 1280 và 390, không tràn ngang.
  - Học xong một bài → huy hiệu đầu tiên; kệ huy hiệu trang chủ.
  - Phòng tự do: tạo tệp, tải lại còn nguyên.
  - Cài đặt: phụ kiện, sao lưu xuất/nhập.
  - Ngắt mạng → tải lại → mọi trang trên vẫn chạy.
  Lỗi nào thấy: sửa ngay nếu nhỏ (commit riêng `fix: …`), lớn thì ghi "Việc còn treo".
- [ ] **4. README** — cập nhật tổng quan: đủ 6 lộ trình, huy hiệu, phụ kiện, Phòng tự do, kiểm tra đầu vào, cách chạy.
- [ ] **5. Gộp** `git checkout master && git merge --ff-only feat/phase6b-polish && git branch -d feat/phase6b-polish`;
  cập nhật `CLAUDE.md` (kế tiếp plan backlog), `ROADMAP.md` (☑ dòng 3), memory `office-neko-project`; commit
  `docs: 6B xong, gộp master`. Báo người dùng một dòng (review tuỳ họ; chưa push).
