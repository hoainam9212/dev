# Task 2: `WordState`, gõ chữ, xoá, chọn vùng, hoàn tác

Đọc `00-overview.md` trước. Task này không có giao diện.

**Files:**
- Create: `shared/src/sims/word/state.ts`, `shared/src/sims/word/text.ts`, `shared/src/sims/word/text.test.ts`
- Modify: `shared/src/sims/word/index.ts`

**Interfaces:**
- Consumes (Task 1): `wordSchema`, `docFromJSON`, `docToJSON`, `emptyDoc`, `plainText`, `WordDoc`.
- Produces:
```ts
export const WORD_UNDO_LIMIT = 30;

export interface WordState {
  doc: WordDoc;
  sel: { from: number; to: number };
  past: WordDoc[];
  /** Task 6 dùng; khai báo sẵn để kiểu không đổi giữa các task. */
  saved: { name: string; at: number } | null;
  printed: boolean;
  dialog: 'find' | 'save' | 'print' | 'image' | null;
}

export type WordAction =
  | { type: 'insertText'; text: string }
  | { type: 'backspace' }
  | { type: 'selectText'; text: string; nth?: number }
  | { type: 'selectAll' }
  | { type: 'setSelection'; from: number; to: number }
  | { type: 'splitBlock' }
  | { type: 'undo' };
  // Task 3–6 thêm nhánh vào union này.

export function wordInitial(o?: { doc?: WordDoc; text?: string }): WordState;
export function reduceWord(s: WordState, a: WordAction): WordState;
export function findText(doc: WordDoc, text: string, nth?: number): { from: number; to: number } | null;
export function selectedText(s: WordState): string;
```
- **Quy tắc:**
  - `wordInitial()` → doc rỗng, `sel = { from: 1, to: 1 }` (đầu đoạn đầu tiên), `past: []`, `saved: null`, `printed: false`, `dialog: null`.
  - Mọi action làm đổi `doc` đều đẩy doc cũ vào `past` (giữ tối đa `WORD_UNDO_LIMIT`). Action chỉ đổi `sel` hoặc `dialog` thì **không** đẩy.
  - `insertText` thay vùng chọn bằng `text` rồi đặt con trỏ ngay sau. `text` có thể nhiều ký tự (bài học gõ cả câu bằng một action cho gọn).
  - `backspace`: có vùng chọn thì xoá vùng chọn; không thì xoá một ký tự phía trước. Ở đầu tài liệu thì không làm gì.
  - `selectText` tìm lần xuất hiện thứ `nth` (mặc định 1, đếm từ 1) của `text` trong `plainText(doc)` và đặt `sel` trùm đúng đoạn chữ đó. Không thấy → giữ nguyên state. **Bài học luôn dùng `selectText`, không bao giờ viết `from/to` bằng số** — số sẽ lệch ngay khi sửa nội dung bài.
  - `splitBlock` tách đoạn tại con trỏ (Enter).
  - `undo` lấy doc cuối trong `past`, kẹp `sel` vào kích thước doc đó.
  - Reducer thuần: không `Date.now()`, không random.

- [ ] **Step 1: Viết test (FAIL trước)**

`shared/src/sims/word/text.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { plainText } from './schema';
import { findText, reduceWord, selectedText, wordInitial, type WordAction, type WordState } from './state';

const run = (s: WordState, ...as: WordAction[]) => as.reduce(reduceWord, s);
const text = (s: WordState) => plainText(s.doc);

describe('word text editing', () => {
  it('starts empty with the cursor inside the first paragraph', () => {
    const s = wordInitial();
    expect(text(s)).toBe('');
    expect(s.sel).toEqual({ from: 1, to: 1 });
    expect(s.past).toEqual([]);
  });

  it('types text at the cursor', () => {
    const s = run(wordInitial(), { type: 'insertText', text: 'Kính gửi' }, { type: 'insertText', text: ' Quý công ty' });
    expect(text(s)).toBe('Kính gửi Quý công ty');
    expect(s.past).toHaveLength(2);
  });

  it('selects a phrase by its text, not by numbers', () => {
    let s = run(wordInitial({ text: 'Tôi tên là Nam, tôi rất vui' }), { type: 'selectText', text: 'Nam' });
    expect(selectedText(s)).toBe('Nam');
    s = run(s, { type: 'insertText', text: 'Lan' });
    expect(text(s)).toBe('Tôi tên là Lan, tôi rất vui');
  });

  it('finds the nth occurrence and ignores missing text', () => {
    const s = wordInitial({ text: 'mèo và mèo' });
    expect(findText(s.doc, 'mèo', 2)).not.toEqual(findText(s.doc, 'mèo', 1));
    expect(findText(s.doc, 'chó')).toBeNull();
    expect(run(s, { type: 'selectText', text: 'chó' })).toEqual(s);
  });

  it('backspaces a character and a selection', () => {
    let s = run(wordInitial({ text: 'Xin chàoo' }), { type: 'setSelection', from: 10, to: 10 }, { type: 'backspace' });
    expect(text(s)).toBe('Xin chào');
    s = run(s, { type: 'selectText', text: 'Xin ' }, { type: 'backspace' });
    expect(text(s)).toBe('chào');
  });

  it('does nothing when backspacing an empty document', () => {
    const s = wordInitial();
    expect(reduceWord(s, { type: 'backspace' })).toEqual(s);
  });

  it('splits a paragraph with Enter', () => {
    const s = run(wordInitial({ text: 'Dòng mộtDòng hai' }), { type: 'selectText', text: 'Dòng hai' }, { type: 'setSelection', from: 9, to: 9 }, { type: 'splitBlock' });
    expect(text(s)).toBe('Dòng một\nDòng hai');
  });

  it('selects everything', () => {
    const s = run(wordInitial({ text: 'Một hai' }), { type: 'selectAll' });
    expect(selectedText(s)).toBe('Một hai');
  });

  it('undoes the last document change and caps history', () => {
    let s = run(wordInitial(), { type: 'insertText', text: 'a' }, { type: 'insertText', text: 'b' });
    s = reduceWord(s, { type: 'undo' });
    expect(text(s)).toBe('a');
    let t = wordInitial();
    for (let i = 0; i < 35; i++) t = reduceWord(t, { type: 'insertText', text: 'x' });
    expect(t.past).toHaveLength(30);
  });
});
```

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `npm test -w shared -- text`
Expected: FAIL — thiếu `./state`.

- [ ] **Step 3: Viết code**

`shared/src/sims/word/state.ts` giữ kiểu `WordState`, `WordAction`, `wordInitial`, và `reduceWord` — `reduceWord` là một `switch` gọi sang các hàm xử lý ở file khác (`text.ts` ở task này, `marks.ts`/`blocks.ts`/`objects.ts`/`doc.ts` ở task sau). Giữ `state.ts` mỏng: mỗi nhánh một dòng.

`shared/src/sims/word/text.ts` làm phần việc thật bằng ProseMirror:
- Dựng `EditorState` tạm từ `docFromJSON(s.doc)` và `TextSelection.create(doc, from, to)` (`@tiptap/pm/state`), áp `tr.replaceSelectionWith` / `tr.delete` / `tr.split`, rồi trả `{ doc: docToJSON(tr.doc), sel: { from: tr.selection.from, to: tr.selection.to } }`. Không giữ `EditorState` trong `WordState` — state phải là JSON thuần, so sánh được bằng `toEqual` và lưu được vào Dexie.
- `findText` dựng bản đồ từ chỉ số ký tự trong `plainText` sang pos ProseMirror bằng cách duyệt doc một lần (mỗi node `text` cộng `text.length`, mỗi ranh giới block cộng 1 cho `\n` và 1 cho thẻ mở/đóng). Viết hàm này cẩn thận — Task 3 tới 7 đều dựa vào nó.

Thêm vào `shared/src/sims/word/index.ts`:
```ts
export * from './state';
export * from './text';
```

- [ ] **Step 4: Chạy test, xác nhận PASS**

Run: `npm test && npm run typecheck`
Expected: PASS.

- [ ] **Step 5: Commit + STATUS**

```bash
git add -A
git commit -m "feat(shared): Word document state with typing, selection by text and undo" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
