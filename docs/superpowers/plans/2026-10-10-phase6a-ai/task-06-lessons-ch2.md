# Task 6: Chương 2 "Viết prompt tốt" — `ai.structure`, `ai.context`

**Files:**
- Create: `client/src/content/lessons/ai-prompt.ts` (export `AI_PROMPT: Lesson[]`)
- Modify: `lessons/index.ts`, `tracks.ts`, `glossary.json`

## Interfaces

- Consumes: `aiPractice`, check `promptCriteria`, `sent`; helpId `ai.composer`, `ai.criteria`.
- Produces: chương `{ id: 'ai.prompt', title: 'Viết prompt tốt', lessonIds: ['ai.structure', 'ai.context'] }`.
  Glossary `prompt` (Prompt / prôm / Câu lệnh gửi cho AI → `ai.structure`).

## Nội dung

**`ai.structure` "Năm phần của một prompt"** — so sánh hai prompt cho cùng việc ("Viết lời mời sinh nhật"): prompt một
dòng → câu trả lời chung chung; prompt có đủ **Vai trò · Bối cảnh · Nhiệm vụ · Định dạng · Giới hạn** → câu trả lời
dùng được ngay. Một explain liệt kê 5 phần kèm ví dụ ngắn từng phần (lấy đúng `tip` trong `CRITERIA`). Quiz: "«Không
quá 100 chữ» thuộc phần nào?" (Giới hạn). Thực hành 1: đề "Viết prompt nhờ AI soạn **lời mời sinh nhật** cho bé, có
**Vai trò** và **Nhiệm vụ**." — check `promptCriteria {required:['role','task']}`. Ba `replies`: weak = lời mời chung
chung không tên không giờ; ok = có khung lời mời, còn chỗ trống [tên], [giờ]; good = lời mời hoàn chỉnh ấm áp.

**`ai.context` "Thêm bối cảnh và giới hạn"** — AI không biết bạn là ai; thêm bối cảnh (ai viết, gửi ai, vì sao) và giới
hạn (độ dài, giọng văn). Mẹo: **gửi tiếp** để sửa ("ngắn hơn", "trang trọng hơn") — AI nhớ cuộc trò chuyện. Quiz.
Thực hành: đề "Nhờ AI viết **thông báo nghỉ Tết** dán ở cửa hàng. Prompt cần ít nhất **4 trên 5 phần**, trong đó phải có
**Bối cảnh** và **Giới hạn**." — check `promptCriteria {required:['context','limits'], minScore:4}`.
`replies` ba mức tương ứng.

Lời giải mẫu (`solve`) mỗi bài là **một** prompt đạt đủ, viết tự nhiên như người thật gõ; test nội dung chứng minh nó đạt.

## Bước

- [ ] **1. Viết `ai-prompt.ts`**; kiểm tay bằng `scorePrompt` (một test nhỏ tạm trong REPL hoặc chạy content test) rằng
  prompt mẫu đạt và một prompt "kém" điển hình trượt.
- [ ] **2. Đăng ký** bài, chương, glossary. `[[prompt]]` dùng trong explain đầu.
- [ ] **3. `npm test -w client -- content`** xanh.
- [ ] **4. Học thật** bằng chuột + bàn phím; thử gõ **không dấu** một prompt đủ phần → đạt; gửi prompt kém trước rồi
  prompt tốt → đạt; chip tiêu chí đổi đúng lúc gõ.
- [ ] **5. `npm test && npm run typecheck`**, commit `feat(ai): chương 2 Viết prompt tốt (2 bài)` + dòng STATUS.
