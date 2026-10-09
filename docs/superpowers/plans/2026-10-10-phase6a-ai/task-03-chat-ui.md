# Task 3: `AiChatSim` chế độ chat + `aiPractice` + trang thử `/dev/aichat` (client)

**Files:**
- Create: `client/src/sims/aichat/AiChatSim.tsx`, `AiChatSim.test.tsx`, `client/src/sims/aichat/CriteriaBar.tsx`,
  `client/src/pages/DevAiPage.tsx` (tạm, xoá ở Task 9)
- Modify: `client/src/sims/registry.ts`, `client/src/content/lessonKit.ts`, `lessonKit.test.ts`,
  `client/src/content/help-ids.ts`, `client/src/App.tsx` (route tạm), `client/src/styles/theme.css`, `theme.test.ts`

## Interfaces

- Consumes (Task 1–2): `aichatSim.reduceAiChat`, `aiChatInitial`, `scorePrompt`, `CRITERIA`, `AiChatState`, `AiCheck`.
- Produces:
  - `SIMS.aichat = { kind: 'aichat', Component: AiChatSim, reduce: aichatSim.reduceAiChat }`.
  - `aiPractice(o: { mode?, greeting?, replies?, sentences?, items?, task: string; checks: AiCheck[];
    spotlight: Spotlight; hint: string; steps: string[]; solve: (s0) => AiChatAction[] })` trong `lessonKit.ts`,
    cùng dáng `pptPractice`.
  - Bố cục chế độ chat (khung `card`, cao tối đa ~28rem, cuộn trong):
    - Đầu khung: biểu tượng `Bot24Regular` + "Trợ lý AI (mô phỏng)"; dòng nhỏ "Câu trả lời soạn sẵn để luyện tập —
      không gửi đi đâu cả."
    - Danh sách tin: user bên phải nền màu nhấn nhạt, AI bên trái nền xám nhạt; vùng có `aria-live="polite"`;
      tự cuộn xuống tin mới nhất. Chữ AI hỗ trợ `**đậm**` và xuống dòng (dùng lại bộ vẽ chữ giàu `rich.ts` của shared
      nếu hợp, không thì chỉ `white-space: pre-wrap`).
    - Ô gõ `textarea` (helpId `ai.composer`, nhãn "Nhập prompt"), nút **Gửi** (helpId `ai.send`, `disabled` khi nháp
      rỗng). **Enter** gửi, **Shift+Enter** xuống dòng, Enter khi `isComposing` bỏ qua.
    - `CriteriaBar` (helpId `ai.criteria`) dưới ô gõ: 5 chip theo `CRITERIA`, chấm **trên nháp đang gõ**
      (`scorePrompt(draft)`). Chip là chữ, không phải nút: chip đạt có ✓, `aria-label="Vai trò: đã có"` /
      `"Vai trò: chưa có"`; di chuột hiện `tip`. Nháp ngắn hơn 25 ký tự: dòng "Prompt hơi ngắn, hãy nói rõ hơn."
  - `HELP_IDS`: `ai.composer` (Ô nhập prompt), `ai.send` (Nút Gửi), `ai.criteria` (Mochi chấm prompt: 5 phần của một
    prompt tốt), `ai.sentences`, `ai.items` (hai cái sau dùng ở Task 4, khai báo luôn để test helpId xanh).

## Bước

- [ ] **1. Test (FAIL)** — `AiChatSim.test.tsx`, `lessonKit.test.ts`:
  - Hiện chữ "Trợ lý AI (mô phỏng)" và dòng "không gửi đi đâu cả".
  - Tin chào hiện bên trái (thuộc nhóm tin AI).
  - Gõ prompt + bấm Gửi → `onState` nhận state có 2 tin mới; ô gõ trống lại.
  - Nút Gửi `disabled` khi ô trống.
  - Enter gửi; Shift+Enter không gửi; Enter với `isComposing: true` không gửi.
  - Gõ "Bạn là trợ lý" → chip Vai trò có nhãn "Vai trò: đã có", chip Giới hạn "…: chưa có".
  - Gõ "Viết thư" → hiện "Prompt hơi ngắn".
  - `aiPractice` dựng `PracticeStep` có `sim: 'aichat'`, `initial` từ `aiChatInitial`, `solution` = `solve(initial)`.
  - `SIMS.aichat` đã đăng ký.
- [ ] **2. Chạy FAIL** — `npm test -w client -- aichat lessonKit`.
- [ ] **3. Viết** `AiChatSim` (useReducer + onState như mọi sim), `CriteriaBar`, `aiPractice`, đăng ký `SIMS`.
- [ ] **4. Trang thử** `DevAiPage` ở route `/dev/aichat` (ngoài `RequireProfile`, giống `DevPptPage` của 5A): một
  state chat với ba câu trả lời mẫu ngắn.
- [ ] **5. Chạy xanh** — `npm test && npm run typecheck`.
- [ ] **6. Kiểm trên trình duyệt** (`/dev/aichat`): gõ prompt kém → câu trả lời chung chung; prompt đủ 5 phần → câu tốt;
  chip đổi ngay khi gõ; khung cuộn trong, trang không tràn ở 390px; gõ Telex bằng bộ gõ thật (nếu máy có) không gửi
  giữa chừng. Chụp ảnh so với giao diện chat quen thuộc (tin mình phải, AI trái).
- [ ] **7. Commit** `feat(aichat): giao diện chat mô phỏng + Mochi chấm prompt` + dòng STATUS (ghi: Task 9 phải xoá
  `DevAiPage` và route `/dev/aichat`).
