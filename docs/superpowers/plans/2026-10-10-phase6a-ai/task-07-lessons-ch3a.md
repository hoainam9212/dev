# Task 7: Chương 3 phần 1 — `ai.email`, `ai.summary`

**Files:**
- Create: `client/src/content/lessons/ai-work.ts` (export `AI_WORK: Lesson[]`; Task 8 thêm hai bài vào cùng file)
- Modify: `lessons/index.ts`, `tracks.ts`

## Interfaces

- Consumes: `aiPractice`, check `promptCriteria`, `pickSentence`.
- Produces: chương `{ id: 'ai.work', title: 'AI trong công việc', lessonIds: ['ai.email', 'ai.summary', 'ai.formula', 'ai.outline'] }`.
  **Lưu ý:** `content.test` đòi mọi `lessonIds` là bài có thật ⇒ ở task này chỉ ghi hai bài đầu; Task 8 thêm hai bài sau.

## Nội dung

**`ai.email` "Viết email nhờ AI"** — dùng đủ 5 phần cho email công việc; **đọc lại và sửa** trước khi gửi (AI không biết
lịch của bạn, tên người nhận). Thực hành 1 (chat): "Nhờ AI viết **email xin nghỉ phép 2 ngày** gửi trưởng phòng; prompt
đủ 5 phần." → `promptCriteria {required: all 5}`. `replies.good` là email đầy đủ có chỗ `[ngày]` rõ ràng.
Thực hành 2 (`pickSentence`): email AI viết có một câu **bịa** ("Tôi đã bàn giao xong cho chị Lan.") khi đề nói người
học **chưa** bàn giao — chọn câu đó. Kết: "AI viết nháp, bạn chịu trách nhiệm bản gửi đi."

**`ai.summary` "Tóm tắt văn bản dài"** — dán văn bản (đã bỏ thông tin nhạy cảm), nói rõ cần tóm tắt thành mấy ý, cho
ai đọc. Thực hành 1 (chat): đề có sẵn một biên bản họp 6–8 câu trong `task`; "Nhờ AI tóm tắt thành **3 gạch đầu dòng**
cho sếp đọc." → `promptCriteria {required:['task','format','context']}`. Thực hành 2 (`pickSentence`): bản tóm tắt AI có
một ý **sai số liệu** so với biên bản (ví dụ "doanh số tăng 15%" trong khi biên bản ghi 5%) — chọn câu sai.

## Bước

- [ ] **1. Viết hai bài** trong `ai-work.ts`; đăng ký bài + chương (chỉ hai `lessonIds` đã có).
- [ ] **2. `npm test -w client -- content`** xanh.
- [ ] **3. Học thật** cả hai bài; đọc lại đề: biên bản trong `task` hiện đủ, không quá dài phải cuộn trang (nếu dài, dùng
  explain riêng để đưa biên bản trước bước thực hành).
- [ ] **4. `npm test && npm run typecheck`**, commit `feat(ai): bài viết email và tóm tắt` + dòng STATUS.
