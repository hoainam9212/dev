# Task 9: Dự án `ai.project` "Prompt tạo báo cáo tuần", Hỏi Mèo, README, build, gộp

**Files:**
- Create: `client/src/content/lessons/ai-project.ts` (export `AI_PROJECT: Lesson[]`)
- Modify: `lessons/index.ts`, `tracks.ts`, `faq.json`, `glossary.json` (nếu cần), `README.md`, `CLAUDE.md`,
  `../ROADMAP.md`, `STATUS.md`
- Delete: `client/src/pages/DevAiPage.tsx`, route `/dev/aichat` + import trong `App.tsx`

## Dự án (chương `{ id: 'ai.final', title: 'Dự án: Báo cáo tuần', lessonIds: ['ai.project'] }`)

Explain mở đầu: ba chặng, ghi chú tuần (dựng sẵn trong `task`): 5–6 việc đã làm, 1 việc trễ, 2 việc tuần sau.
1. **Viết prompt** (chat): nhờ AI viết báo cáo tuần gửi trưởng phòng từ ghi chú → `promptCriteria` đủ 5 phần.
   `replies.good` là báo cáo 3 mục (Đã làm / Vướng mắc / Tuần sau).
2. **Soi lỗi** (`pickSentence`): báo cáo AI có một câu **sai so với ghi chú** (ví dụ ghi "đã xong" cho việc đang trễ).
3. **An toàn** (`pickItems`): trước khi dán ghi chú thật của công ty, chọn những thứ phải xoá/che: tên khách hàng kèm
   số điện thoại, số hợp đồng, doanh thu chi tiết từng khách (✓); tên công việc chung, ngày họp (không).
Kết: chúc mừng hoàn thành lộ trình AI (bước cuối là explain).

## Bước

- [ ] **1. Viết `ai-project.ts`**, đăng ký bài + chương. `npm test -w client -- content` xanh.
- [ ] **2. Học thật** dự án tới 3 sao bằng chuột + bàn phím.
- [ ] **3. Hỏi Mèo** — 5 câu, `keywords` có dấu + không dấu: prompt là gì; 5 phần của prompt; AI trả lời sai thì sao;
  có nên dán mật khẩu/CCCD; trợ lý trong app có phải AI thật không (→ không, mô phỏng ngoại tuyến).
- [ ] **4. Xoá** `DevAiPage` + route. README: mục lộ trình AI (10 bài / 4 chương, sim ngoại tuyến, cách chấm 5 tiêu chí).
- [ ] **5. `npm test && npm run typecheck && npm run build`** xanh; ghi số test vào STATUS.
- [ ] **6. Kiểm bản build** (cổng 4174, Chrome headless, hồ sơ mới): lộ trình AI hiện sau PowerPoint; học `ai.safety`
  tới 3 sao; 390px không tràn; ngắt mạng vẫn chạy (sim không gọi mạng — xem `read_network_requests`/log puppeteer
  không có request lạ khi bấm Gửi).
- [ ] **7. Gộp** `git checkout master && git merge --ff-only feat/phase6a-ai && git branch -d feat/phase6a-ai`;
  cập nhật `CLAUDE.md` (kế tiếp plan 6B), `ROADMAP.md` (☑ dòng 2), memory `office-neko-project`; commit
  `docs: 6A xong, gộp master`. Báo người dùng một dòng (review tuỳ họ; chưa push).
