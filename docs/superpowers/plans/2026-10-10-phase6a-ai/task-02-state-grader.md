# Task 2: `AiChatState`, reducer, bốn check, đăng ký grader (shared)

**Files:**
- Create: `shared/src/sims/aichat/state.ts`, `state.test.ts`, `grade.ts`, `grade.test.ts`
- Modify: `shared/src/sims/aichat/index.ts`, `shared/src/grading/index.ts`, `shared/src/grading/grading.test.ts`

## Interfaces

- Consumes (Task 1): `scorePrompt`, `PromptScore`, `Tier`, `Criterion`, `CRITERIA`.
- Produces:

```ts
export type AiMode = 'chat' | 'pickSentence' | 'pickItems';
export interface AiMessage { from: 'user' | 'ai'; text: string; score?: PromptScore }  // score chỉ có ở tin 'user'
export interface AiChatState {
  mode: AiMode;
  messages: AiMessage[];
  draft: string;
  replies: Record<Tier, string>;   // chế độ chat: câu trả lời soạn sẵn theo mức prompt
  sentences: string[];             // pickSentence: các câu của câu trả lời AI cần soi
  items: string[];                 // pickItems: các mẩu thông tin
  picked: number[];                // chỉ số đang chọn (pickSentence: tối đa 1)
}
export type AiChatAction =
  | { type: 'setDraft'; text: string }
  | { type: 'send' }               // nháp rỗng → no-op; thêm tin user (kèm score) + tin ai = replies[tier]; xoá nháp
  | { type: 'pick'; index: number }// pickSentence: chọn đúng 1 (bấm lại câu đang chọn → bỏ chọn); pickItems: bật/tắt
  | { type: 'clearChat' };         // xoá messages (giữ tin chào đầu nếu có `greeting`)
export function aiChatInitial(o: {
  mode?: AiMode;                   // mặc định 'chat'
  greeting?: string;               // tin 'ai' đầu tiên
  replies?: Partial<Record<Tier, string>>; // thiếu mức nào thì dùng mức gần nhất có (good→ok→weak)
  sentences?: string[];
  items?: string[];
}): AiChatState;
export function reduceAiChat(s: AiChatState, a: AiChatAction): AiChatState;

export type AiCheck =
  | { kind: 'sent'; min?: number }                                  // số prompt đã gửi ≥ min (mặc định 1)
  | { kind: 'promptCriteria'; required: Criterion[]; minScore?: number } // BẤT KỲ prompt đã gửi đạt cả hai điều kiện
  | { kind: 'pickSentence'; answer: number }
  | { kind: 'pickItems'; answer: number[] };                        // tập chọn phải TRÙNG KHÍT tập đáp án
export const gradeAiChat: Grader<AiChatState, AiCheck>;
```

Ở chế độ `pickSentence`, `greeting` là câu hỏi người dùng đã hỏi, và câu trả lời AI là `sentences.join(' ')` — giao diện
vẽ nó như một tin của AI (Task 4). Ở `pickItems`, `items` vẽ thành danh sách bấm chọn.

Thông báo grader (giọng như `gradePpt`):
- `promptCriteria` trượt: "Prompt còn thiếu: Bối cảnh, Giới hạn." (tên theo `CRITERIA.vi`, đúng thứ tự); chưa gửi gì:
  "Hãy gõ prompt rồi bấm Gửi."; đủ tiêu chí nhưng điểm thấp: "Prompt mới đạt 3/5 tiêu chí, cần 4."
- `pickSentence` sai: "Câu này đúng đấy. Đọc lại thật kỹ con số và tên riêng trong từng câu nhé."
- `pickItems` thiếu/thừa: "Còn 1 thông tin nhạy cảm chưa chọn." / "«<mục>» thì đưa cho AI được." (nêu mục thừa đầu tiên).

## Bước

- [ ] **1. Test (FAIL)** — `state.test.ts`, `grade.test.ts`:
  - `aiChatInitial({greeting:'Chào bạn'})` có 1 tin `ai`; `draft ''`; mode `chat`.
  - `replies` chỉ có `good` → cả ba mức trả về câu `good`.
  - `setDraft` rồi `send` → thêm tin user có `score`, thêm tin ai đúng câu theo `tier`, `draft` về `''`.
  - `send` với nháp `'   '` → state y nguyên (cùng tham chiếu).
  - Prompt yếu → câu `weak`; prompt đủ 5 → câu `good`.
  - `pick` ở pickSentence: chọn 2 rồi chọn 0 → `picked [0]`; bấm lại 0 → `[]`.
  - `pick` ở pickItems: bật 1, bật 3, tắt 1 → `[3]`; chỉ số ngoài phạm vi → no-op.
  - `clearChat` giữ tin chào, xoá phần còn lại.
  - `sent`: chưa gửi trượt; gửi 1 đạt; `min: 2` cần hai lần.
  - `promptCriteria`: thiếu tiêu chí nêu đúng tên theo thứ tự; gửi prompt tốt rồi prompt kém → **vẫn đạt**.
  - `promptCriteria` có `minScore: 4` nhưng prompt chỉ 3 → trượt với lời "đạt 3/5".
  - `pickSentence` đúng/sai/chưa chọn (chưa chọn: "Bấm vào câu bạn thấy sai.").
  - `pickItems` trùng khít đạt; thiếu một trượt; thừa một trượt và nêu tên mục thừa.
  - Đăng ký: `grade('aichat', state, [{kind:'sent'}])` chạy được qua `GRADERS`.
- [ ] **2. Chạy FAIL** — `npm test -w shared -- aichat`.
- [ ] **3. Viết `state.ts`, `grade.ts`**; đăng ký `aichat: gradeAiChat` trong `GRADERS`; export trong `index.ts`.
- [ ] **4. Sửa `grading.test.ts`** case "sim chưa có grader" (đang dùng `'aichat'`): nếu không còn kind nào thiếu grader thì
  đổi test thành "kind lạ ép kiểu `'nope' as SimKind` → kết quả trượt có lời báo", giữ đúng ý kiểm nhánh phòng thủ.
- [ ] **5. Chạy xanh** — `npm test -w shared && npm run typecheck`.
- [ ] **6. Commit** `feat(aichat): reducer, 4 check và đăng ký grader` + dòng STATUS.
