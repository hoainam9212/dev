# Task 1: Bộ chấm prompt `scorePrompt` (shared)

**Files:**
- Create: `shared/src/sims/aichat/criteria.ts`, `criteria.test.ts`, `shared/src/sims/aichat/index.ts`
- Modify: `shared/src/index.ts` (`export * as aichatSim from './sims/aichat'`)

Trước khi làm: `git checkout -b feat/phase6a-ai` từ `master`; soát `git config user.email` là gmail.

## Interfaces (Produces)

```ts
export type Criterion = 'role' | 'context' | 'task' | 'format' | 'limits';
export const CRITERIA: readonly { id: Criterion; vi: string; tip: string }[];
//   role    'Vai trò'    'Bảo AI đóng vai ai, ví dụ: "Bạn là nhân viên hành chính giỏi viết thư."'
//   context 'Bối cảnh'   'Bạn là ai, viết cho ai, chuyện gì đang xảy ra.'
//   task    'Nhiệm vụ'   'Việc cần làm, bắt đầu bằng một động từ: viết, tóm tắt, liệt kê…'
//   format  'Định dạng'  'Kết quả trông ra sao: gạch đầu dòng, bảng, 3 đoạn…'
//   limits  'Giới hạn'   'Độ dài, giọng văn, điều không được làm.'
export type Tier = 'weak' | 'ok' | 'good';
export interface PromptScore { hits: Record<Criterion, boolean>; score: number; tier: Tier; tooShort: boolean }
export function foldVi(text: string): string;       // NFD, bỏ dấu, đ→d, chữ thường, gộp khoảng trắng
export function scorePrompt(text: string): PromptScore;
export function tierOf(score: number): Tier;        // 0–2 weak, 3–4 ok, 5 good
export const MIN_PROMPT_LEN = 25;
```

Mẫu từ khoá (viết **không dấu**, so trên `foldVi(text)`, ranh giới từ `\b`):

| Tiêu chí | Khớp khi có một trong |
|---|---|
| role | `ban la`, `dong vai`, `vai tro`, `voi tu cach`, `hay la mot`, `nhu mot (chuyen gia\|nhan vien\|giao vien\|tro ly)` |
| context | `toi la`, `toi dang`, `minh la`, `minh dang`, `chung toi`, `cong ty`, `phong `, `boi canh`, `khach hang`, `nguoi nhan`, `nguoi doc`, `gui cho`, `danh cho`, `sep`, `dong nghiep`, `hoc sinh`, `phu huynh` |
| task | `viet`, `soan`, `tom tat`, `liet ke`, `tao`, `lap`, `giai thich`, `dich`, `de xuat`, `goi y`, `kiem tra`, `sua`, `len dan y` |
| format | `gach dau dong`, `dang bang`, `bang gom`, `doan van`, `tieu de`, `danh so`, `\d+ (y\|cau\|dong\|muc\|doan\|slide\|buoc)`, `theo mau`, `dinh dang` |
| limits | `khong qua`, `toi da`, `it hon`, `duoi \d+`, `ngan gon`, `khoang \d+`, `giong (van )?`, `lich su`, `trang trong`, `than thien`, `khong dung`, `tranh`, `chi dung`, `bang tieng viet` |

Chuỗi đã `trim()` ngắn hơn `MIN_PROMPT_LEN` → `tooShort: true`, mọi `hits` false, `score 0`.

## Bước

- [ ] **1. Test (FAIL)** — `criteria.test.ts`, mỗi dòng một `it`:
  - `foldVi('Đơn XIN   việc')` → `'don xin viec'`.
  - "Viết email" (ngắn) → `tooShort`, score 0, tier weak.
  - "Viết cho tôi một email xin nghỉ phép" → đúng 1 tiêu chí (`task`); "cho tôi" không phải bối cảnh.
  - Prompt đủ 5 phần có dấu (vai trò nhân viên hành chính, tôi là trưởng phòng, viết email, 3 đoạn, không quá 150 chữ,
    giọng lịch sự) → score 5, tier good.
  - Cùng prompt đó gõ **không dấu** → score 5.
  - Prompt có vai trò + nhiệm vụ + định dạng → score 3, tier ok.
  - "Liệt kê 5 ý chính" có `format` nhờ `\d+ y`.
  - "dưới 100 chữ" khớp `limits`; "khoảng 3 câu" khớp cả `format` lẫn `limits`.
  - Chữ "sửa" trong "sửa soạn" vẫn tính `task` (chấp nhận; ghi chú trong test rằng đây là góp ý không chấm khắt khe).
  - `CRITERIA` có đúng 5 mục theo thứ tự role, context, task, format, limits.
  - `tierOf`: 0,2 → weak; 3,4 → ok; 5 → good.
- [ ] **2. Chạy FAIL** — `npm test -w shared -- aichat`.
- [ ] **3. Viết `criteria.ts`** (regex dựng một lần ở cấp module), `index.ts`, export ở `shared/src/index.ts`.
- [ ] **4. Chạy xanh** — `npm test -w shared -- aichat && npm run typecheck`.
- [ ] **5. Commit** `feat(aichat): chấm prompt theo 5 tiêu chí, nhận cả chữ không dấu` + dòng Task 1 trong `STATUS.md`.
