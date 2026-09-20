# Task 6: Tìm & Thay thế, mục lục, lưu và in mô phỏng

Đọc `00-overview.md` trước. Task này không có giao diện.

**Files:**
- Create: `shared/src/sims/word/doc.ts`, `shared/src/sims/word/doc.test.ts`
- Modify: `shared/src/sims/word/state.ts`, `shared/src/sims/word/index.ts`

**Interfaces:**
- Consumes: `WordState`, `reduceWord`, `findText`, `plainText` (Task 1–2); `blockOf` (Task 4).
- Produces — thêm vào `WordAction`:
```ts
  | { type: 'replaceAll'; find: string; replace: string }
  | { type: 'replaceOne'; find: string; replace: string; nth?: number }
  | { type: 'insertToc' }
  | { type: 'refreshToc' }
  | { type: 'openDialog'; dialog: 'find' | 'save' | 'print' | 'image' | null }
  | { type: 'save'; name: string; at: number }
  | { type: 'print' }
```
  và:
```ts
export function countMatches(doc: WordDoc, find: string): number;
/** Các dòng mục lục hiện có trong tài liệu, theo thứ tự. */
export function tocEntries(doc: WordDoc): { level: number; title: string }[];
export function hasToc(doc: WordDoc): boolean;
/** Heading 1–3 trong tài liệu — nguồn để sinh mục lục. */
export function headingsOf(doc: WordDoc): { level: number; title: string }[];
```
- **Quy tắc:**
  - Tìm kiếm **không phân biệt hoa thường, có phân biệt dấu** (dùng `toLowerCase()`; `'Nam'` khớp `'nam'`, nhưng `'nam'` không khớp `'năm'`).
  - `replaceAll` thay mọi lần xuất hiện trong một lần đẩy `past` (một lần hoàn tác là về như cũ). Không có kết quả nào → giữ nguyên state.
  - `replaceOne` thay lần thứ `nth` (mặc định 1).
  - Mục lục là **một khối riêng**: node `paragraph` có attr… không — để đơn giản và không phải sửa schema, mục lục là một `bulletList` đặt ngay đầu tài liệu, mỗi `listItem` chứa một đoạn có text `"<tiền tố><title>"`, trong đó tiền tố là `''` (level 1), `'   '` (level 2), `'      '` (level 3). Khối đứng **ngay trước** nó là một `heading` level 1 có text `'Mục lục'`. `hasToc` đúng khi có cặp này. Cách này giữ `insertToc` thuần và grader kiểm tra được bằng text.
  - `insertToc` khi đã có mục lục → không nhân đôi, hành xử như `refreshToc`.
  - `refreshToc` dựng lại danh sách từ `headingsOf` (bỏ qua chính heading `'Mục lục'`).
  - `save` đặt `saved = { name, at }`; `print` đặt `printed = true`. Cả hai **không** đổi `doc`, nên không đẩy `past`. `at` do action mang vào — reducer không gọi `Date.now()`.
  - `openDialog` chỉ đổi `dialog`.

- [ ] **Step 1: Viết test (FAIL trước)**

`shared/src/sims/word/doc.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { plainText } from './schema';
import { countMatches, hasToc, headingsOf, tocEntries } from './doc';
import { reduceWord, wordInitial, type WordAction, type WordState } from './state';

const run = (s: WordState, ...as: WordAction[]) => as.reduce(reduceWord, s);

/** Tài liệu hai Heading 1: "Giới thiệu" rồi "Nội dung". */
function report(): WordState {
  let s = run(wordInitial({ text: 'Giới thiệu' }), { type: 'splitBlock' }, { type: 'insertText', text: 'Nội dung' });
  s = run(s, { type: 'selectText', text: 'Giới thiệu' }, { type: 'setHeading', level: 1 });
  s = run(s, { type: 'selectText', text: 'Nội dung' }, { type: 'setHeading', level: 1 });
  return s;
}

describe('word find and replace', () => {
  it('counts matches case-insensitively', () => {
    const s = wordInitial({ text: 'Nam và nam và năm' });
    expect(countMatches(s.doc, 'nam')).toBe(2);
    expect(countMatches(s.doc, 'xyz')).toBe(0);
  });

  it('replaces every match in a single undo step', () => {
    let s = run(wordInitial({ text: 'công ty ABC, công ty ABC' }), { type: 'replaceAll', find: 'ABC', replace: 'Mochi' });
    expect(plainText(s.doc)).toBe('công ty Mochi, công ty Mochi');
    s = run(s, { type: 'undo' });
    expect(plainText(s.doc)).toBe('công ty ABC, công ty ABC');
  });

  it('replaces only the nth match', () => {
    const s = run(wordInitial({ text: 'mèo mèo mèo' }), { type: 'replaceOne', find: 'mèo', replace: 'cá', nth: 2 });
    expect(plainText(s.doc)).toBe('mèo cá mèo');
  });

  it('does nothing when there is no match', () => {
    const s = wordInitial({ text: 'xin chào' });
    expect(reduceWord(s, { type: 'replaceAll', find: 'zzz', replace: 'a' })).toEqual(s);
  });
});

describe('word table of contents', () => {
  it('lists the headings', () => {
    const s = report();
    expect(headingsOf(s.doc)).toEqual([{ level: 1, title: 'Giới thiệu' }, { level: 1, title: 'Nội dung' }]);
    expect(hasToc(s.doc)).toBe(false);
  });

  it('inserts a table of contents built from the headings', () => {
    const s = run(report(), { type: 'insertToc' });
    expect(hasToc(s.doc)).toBe(true);
    expect(tocEntries(s.doc)).toEqual([{ level: 1, title: 'Giới thiệu' }, { level: 1, title: 'Nội dung' }]);
    expect(plainText(s.doc).startsWith('Mục lục')).toBe(true);
  });

  it('refreshes instead of duplicating', () => {
    let s = run(report(), { type: 'insertToc' });
    s = run(s, { type: 'selectText', text: 'Nội dung' }, { type: 'insertText', text: 'Nội dung chính' }, { type: 'refreshToc' });
    expect(tocEntries(s.doc).map((e) => e.title)).toEqual(['Giới thiệu', 'Nội dung chính']);
    s = run(s, { type: 'insertToc' });
    expect(tocEntries(s.doc)).toHaveLength(2);
  });
});

describe('word save and print', () => {
  it('records the saved name and the print, without touching the document', () => {
    const before = wordInitial({ text: 'Đơn xin việc' });
    const s = run(before, { type: 'save', name: 'don-xin-viec.docx', at: 1700000000000 }, { type: 'print' });
    expect(s.saved).toEqual({ name: 'don-xin-viec.docx', at: 1700000000000 });
    expect(s.printed).toBe(true);
    expect(s.doc).toEqual(before.doc);
    expect(s.past).toEqual([]);
  });

  it('opens and closes dialogs', () => {
    let s = run(wordInitial(), { type: 'openDialog', dialog: 'find' });
    expect(s.dialog).toBe('find');
    s = run(s, { type: 'openDialog', dialog: null });
    expect(s.dialog).toBeNull();
  });
});
```

> Hàm `report()` ở trên dựng tài liệu hai heading. Nếu chuỗi action không ra đúng như mong đợi khi chạy thật, **sửa fixture cho tới khi `headingsOf` trả đúng hai mục** — đừng nới lỏng phần `expect`.

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `npm test -w shared -- doc`

- [ ] **Step 3: Viết code**

`shared/src/sims/word/doc.ts`:
- Tìm kiếm: duyệt `plainText` bản `toLowerCase()`, ánh xạ về pos bằng cùng bản đồ vị trí đã viết ở Task 2 (tách hàm dùng chung nếu cần, đừng chép lại logic).
- `replaceAll`: gom mọi khoảng khớp, áp `tr.replaceWith` từ **cuối về đầu** trong **một** `tr` để pos không lệch.
- Mục lục: xoá cặp heading `'Mục lục'` + `bulletList` ngay sau nó (nếu có) rồi chèn cặp mới ở đầu tài liệu.

Thêm nhánh vào `reduceWord`, `export * from './doc';` vào `index.ts`.

- [ ] **Step 4: Chạy test, xác nhận PASS**

Run: `npm test && npm run typecheck`

- [ ] **Step 5: Commit + STATUS**

```bash
git add -A
git commit -m "feat(shared): find/replace, table of contents and simulated save/print" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
