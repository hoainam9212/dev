# Task 4: Chế độ `pickSentence` và `pickItems` (client)

**Files:**
- Modify: `client/src/sims/aichat/AiChatSim.tsx`, `AiChatSim.test.tsx`, `DevAiPage.tsx`, `theme.css`, `theme.test.ts`

## Interfaces

- Consumes (Task 2–3): `AiChatState.mode/sentences/items/picked`, action `pick`; helpId `ai.sentences`, `ai.items`.
- Produces:
  - **pickSentence:** dưới đầu khung, tin chào (`greeting`) là câu hỏi của người dùng (bên phải), rồi một tin AI bên
    trái mà **mỗi câu là một nút** (`<button>` nội dòng, trông như chữ thường, gạch chân chấm khi di chuột),
    `aria-pressed` theo `picked`, câu đang chọn tô nền vàng nhạt + viền đỏ. Vùng có helpId `ai.sentences`. Ô gõ và
    `CriteriaBar` **ẩn**. Dòng hướng dẫn trên tin: "Bấm vào câu bạn thấy sai."
  - **pickItems:** khung tiêu đề "Bạn định dán những thông tin này vào ô chat:" và danh sách `items`, mỗi mục là nút
    bật/tắt (`role="checkbox"`, `aria-checked`), mục đã chọn có biểu tượng 🚫 và chữ "Không đưa". helpId `ai.items`.
    Ô gõ ẩn.
  - Lớp CSS mới (`.ai-sentence`, `.ai-sentence-picked`, `.ai-item`) ở cấp đầu layer components.

## Bước

- [ ] **1. Test (FAIL)**:
  - pickSentence: có đủ số nút bằng số câu; bấm câu 2 phát `pick {index:1}`; câu đã chọn `aria-pressed="true"`.
  - pickSentence: không có `textarea` và không có chip tiêu chí.
  - pickItems: mỗi mục là `checkbox`; bấm phát `pick`; mục đã chọn hiện "Không đưa".
  - pickItems: điều khiển được bằng bàn phím (Tab tới, Space bật) — Testing Library `user.keyboard`.
  - `theme.test.ts`: lớp mới ở cấp đầu.
- [ ] **2. Chạy FAIL** — `npm test -w client -- aichat`.
- [ ] **3. Viết** hai chế độ trong `AiChatSim` (tách hàm con `SentencePicker`, `ItemPicker` trong cùng file nếu file
  vượt ~200 dòng thì tách file).
- [ ] **4. `DevAiPage`** thêm hai nút chuyển sang state mẫu của từng chế độ.
- [ ] **5. Chạy xanh** — `npm test && npm run typecheck`.
- [ ] **6. Kiểm trên trình duyệt**: nhìn ảnh chụp — câu bấm được nhưng vẫn đọc trôi như một đoạn văn (không thành
  danh sách nút to); mục pickItems đủ lớn để bấm trên màn cảm ứng (≥ 44px cao); 390px không tràn.
- [ ] **7. Commit** `feat(aichat): chế độ bắt câu sai và chọn thông tin nhạy cảm` + dòng STATUS.
