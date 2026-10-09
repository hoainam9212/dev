# Task 5: Chương 1 "Làm quen AI" — `ai.intro`, `ai.safety`, `ai.verify`

**Files:**
- Create: `client/src/content/lessons/ai-start.ts` (export `AI_START: Lesson[]`)
- Modify: `client/src/content/lessons/index.ts`, `client/src/content/tracks.ts`, `client/src/content/glossary.json`

## Interfaces

- Consumes: `aiPractice` (Task 3), check `sent`, `pickItems`, `pickSentence` (Task 2); helpId `ai.composer`, `ai.send`,
  `ai.items`, `ai.sentences`.
- Produces: chương `{ id: 'ai.start', title: 'Làm quen AI', lessonIds: ['ai.intro', 'ai.safety', 'ai.verify'] }` là
  chương đầu của track `ai`. Glossary (trường `id, term, say, vi, explain, lessonIds`):
  `ai` (AI / ây-ai / Trí tuệ nhân tạo → `ai.intro`), `du-lieu-nhay-cam` (Sensitive data / sen-si-tiv đây-ta /
  Dữ liệu nhạy cảm → `ai.safety`), `ao-giac` (Hallucination / hơ-lu-xi-nây-sần / Ảo giác của AI → `ai.verify`).

Cấu trúc mỗi bài như các bài cũ: 2–3 explain (có `mood`), 1 quiz, 1–2 thực hành, explain kết. 6–9 phút. Không realShot.
Lời bài giọng Mochi, câu ngắn, ví dụ đời thường; liên kết từ điển `[[id|chữ]]`.

## Nội dung

**`ai.intro` "AI là gì?"** — AI trò chuyện (ví dụ Claude) trả lời bằng chữ, học từ rất nhiều văn bản nên viết trôi chảy,
nhưng **có thể sai** và không biết việc riêng của bạn trừ khi bạn kể. Quiz: "Câu nào đúng về AI?" (đáp án: viết nhanh
nhưng có thể sai). Thực hành: `greeting` "Chào bạn! Mình là trợ lý AI mô phỏng. Bạn muốn hỏi gì?"; đề "Hãy gửi câu hỏi
đầu tiên: hỏi AI cách luộc trứng."; ba `replies` cùng nội dung cơ bản (mức `good` chi tiết hơn); check `sent`.

**`ai.safety` "Thông tin không nên đưa cho AI"** — những gì gõ vào ô chat có thể được lưu ở máy chủ của công ty làm AI;
quy định công ty; cách **thay tên thật bằng "Nhân viên A"**. Quiz về mã OTP. Thực hành `pickItems`, đề "Chọn tất cả
thông tin KHÔNG nên dán vào ô chat":
items = `["Mật khẩu email của bạn", "Câu hỏi: cách viết hàm cộng trong Excel", "Số căn cước công dân", "Bảng lương có tên và số tài khoản của đồng nghiệp", "Một đoạn văn bạn tự viết cần sửa chính tả", "Mã OTP ngân hàng vừa nhận", "Tên món ăn bạn muốn nấu"]`,
answer `[0, 2, 3, 5]`.

**`ai.verify` "Bắt lỗi AI"** — [[ao-giac|ảo giác]]: AI nói sai một cách rất tự tin; cách kiểm chứng: thử lại (ví dụ gõ
công thức vào Excel), đối chiếu với tài liệu gốc, hỏi người biết. Hai thực hành `pickSentence`:
1. `greeting` "Giải thích giúp tôi các hàm SUM, AVERAGE, COUNT, MAX." — sentences
   `["Hàm SUM cộng tất cả các số trong vùng bạn chọn.", "Hàm AVERAGE tính giá trị trung bình.", "Hàm COUNT đếm các ô có chữ.", "Hàm MAX tìm số lớn nhất."]`,
   answer `2` (COUNT đếm ô có **số**; người học đã gặp ở bài Excel `excel.stats`).
2. Đề kèm tài liệu gốc ngay trong `task`: "Thư gốc: «Họp phòng lúc **9 giờ sáng thứ Ba** ở phòng 302.» AI tóm tắt như
   bên dưới. Câu nào sai?" — sentences `["Cuộc họp của phòng diễn ra lúc 9 giờ sáng.", "Họp vào thứ Hai.", "Địa điểm là phòng 302."]`, answer `1`.

## Bước

- [ ] **1. Viết `ai-start.ts`**; `solve` dùng `{type:'setDraft'}`+`{type:'send'}` hoặc các `{type:'pick'}`.
- [ ] **2. Đăng ký** bài, chương (track `ai` hết `chapters: []`), glossary.
- [ ] **3. `npm test -w client -- content`** xanh (mọi bước không đạt sẵn: `pickItems` với `picked []` phải trượt).
- [ ] **4. Học thật** cả ba bài bằng chuột trên dev server; thử chọn thừa "Tên món ăn" → lời nhắn nêu đúng mục đó.
  Trang chủ hiện lộ trình AI với chương 1 (mở khoá toàn bộ để vào).
- [ ] **5. `npm test && npm run typecheck`**, commit `feat(ai): chương 1 Làm quen AI (3 bài)` + dòng STATUS.
