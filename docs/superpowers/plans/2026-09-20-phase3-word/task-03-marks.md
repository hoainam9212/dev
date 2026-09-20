# Task 3: Định dạng chữ (bold, italic, underline, font, cỡ, màu, tô nền)

Đọc `00-overview.md` trước. Task này không có giao diện.

**Files:**
- Create: `shared/src/sims/word/marks.ts`, `shared/src/sims/word/marks.test.ts`
- Modify: `shared/src/sims/word/state.ts` (thêm nhánh action), `shared/src/sims/word/index.ts`

**Interfaces:**
- Consumes: `WordState`, `reduceWord`, `findText` (Task 2); `wordSchema` (Task 1).
- Produces — thêm vào `WordAction`:
```ts
  | { type: 'toggleMark'; mark: 'bold' | 'italic' | 'underline' }
  | { type: 'setStyle'; attr: 'color' | 'fontFamily' | 'fontSize'; value: string | null }
  | { type: 'setHighlight'; color: string | null }
```
  và hàm tra cứu dùng chung cho grader (Task 7) và ribbon (Task 9):
```ts
/** Các mark đang phủ **toàn bộ** đoạn chữ `text` (lần xuất hiện thứ `nth`). */
export function marksOnText(doc: WordDoc, text: string, nth?: number): { bold: boolean; italic: boolean; underline: boolean; color: string | null; fontFamily: string | null; fontSize: string | null; highlight: string | null } | null;
/** Trạng thái định dạng của vùng đang chọn — ribbon dùng để tô sáng nút đang bật. */
export function activeMarks(s: WordState): ReturnType<typeof marksOnText>;
```
- **Quy tắc:**
  - Ba action trên chỉ tác động lên **vùng đang chọn**; chọn rỗng (`from === to`) thì không làm gì (không có khái niệm "mark chờ gõ" — bài học luôn chọn chữ rồi mới định dạng).
  - `toggleMark`: nếu mark đã phủ toàn bộ vùng chọn thì gỡ, ngược lại thì phủ.
  - `setStyle` đặt một attr của mark `textStyle`, giữ nguyên hai attr kia. `value: null` gỡ attr đó; `textStyle` không còn attr nào khác `null` thì gỡ hẳn mark.
  - `fontSize` lưu chuỗi kèm đơn vị: `'11pt'`, `'14pt'`. `fontFamily` lưu đúng tên: `'Times New Roman'`, `'Arial'`, `'Calibri'`, `'Tahoma'`, `'Courier New'`.
  - `setHighlight(null)` gỡ mark `highlight`.
  - `marksOnText` trả `null` khi không tìm thấy `text`. Mark chỉ phủ một phần đoạn chữ ⇒ trường boolean là `false`, trường chuỗi là `null`.

- [ ] **Step 1: Viết test (FAIL trước)**

`shared/src/sims/word/marks.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { marksOnText } from './marks';
import { reduceWord, wordInitial, type WordAction, type WordState } from './state';

const run = (s: WordState, ...as: WordAction[]) => as.reduce(reduceWord, s);
const doc = (t: string) => wordInitial({ text: t });

describe('word marks', () => {
  it('bolds the selected phrase only', () => {
    const s = run(doc('Kính gửi Quý công ty'), { type: 'selectText', text: 'Quý công ty' }, { type: 'toggleMark', mark: 'bold' });
    expect(marksOnText(s.doc, 'Quý công ty')?.bold).toBe(true);
    expect(marksOnText(s.doc, 'Kính gửi')?.bold).toBe(false);
  });

  it('toggles a mark off again', () => {
    let s = run(doc('Xin chào'), { type: 'selectText', text: 'Xin' }, { type: 'toggleMark', mark: 'italic' });
    expect(marksOnText(s.doc, 'Xin')?.italic).toBe(true);
    s = run(s, { type: 'selectText', text: 'Xin' }, { type: 'toggleMark', mark: 'italic' });
    expect(marksOnText(s.doc, 'Xin')?.italic).toBe(false);
  });

  it('applies font, size and colour without losing each other', () => {
    const s = run(doc('ĐƠN XIN VIỆC'),
      { type: 'selectText', text: 'ĐƠN XIN VIỆC' },
      { type: 'setStyle', attr: 'fontFamily', value: 'Times New Roman' },
      { type: 'setStyle', attr: 'fontSize', value: '16pt' },
      { type: 'setStyle', attr: 'color', value: '#C2185B' },
    );
    expect(marksOnText(s.doc, 'ĐƠN XIN VIỆC')).toMatchObject({ fontFamily: 'Times New Roman', fontSize: '16pt', color: '#C2185B' });
  });

  it('clears one style attribute and keeps the rest', () => {
    const s = run(doc('Nam'), { type: 'selectText', text: 'Nam' },
      { type: 'setStyle', attr: 'color', value: '#C2185B' },
      { type: 'setStyle', attr: 'fontSize', value: '14pt' },
      { type: 'setStyle', attr: 'color', value: null });
    expect(marksOnText(s.doc, 'Nam')).toMatchObject({ color: null, fontSize: '14pt' });
  });

  it('highlights and un-highlights', () => {
    let s = run(doc('quan trọng'), { type: 'selectText', text: 'quan trọng' }, { type: 'setHighlight', color: '#FFF3B0' });
    expect(marksOnText(s.doc, 'quan trọng')?.highlight).toBe('#FFF3B0');
    s = run(s, { type: 'selectText', text: 'quan trọng' }, { type: 'setHighlight', color: null });
    expect(marksOnText(s.doc, 'quan trọng')?.highlight).toBeNull();
  });

  it('reports false when a mark covers only part of the phrase', () => {
    const s = run(doc('Hà Nội'), { type: 'selectText', text: 'Hà' }, { type: 'toggleMark', mark: 'bold' });
    expect(marksOnText(s.doc, 'Hà Nội')?.bold).toBe(false);
  });

  it('ignores formatting with an empty selection and unknown text', () => {
    const s = doc('Xin chào');
    expect(reduceWord(s, { type: 'toggleMark', mark: 'bold' })).toEqual(s);
    expect(marksOnText(s.doc, 'không có')).toBeNull();
  });
});
```

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `npm test -w shared -- marks`

- [ ] **Step 3: Viết code**

`shared/src/sims/word/marks.ts`: dùng `tr.addMark` / `tr.removeMark` với `wordSchema.marks.*`, tính "đã phủ toàn bộ chưa" bằng `doc.rangeHasMark(from, to, markType)`. Với `textStyle`, đọc mark hiện có ở đầu vùng chọn, trộn attr mới, `removeMark` rồi `addMark` bản đã trộn để tránh chồng hai mark `textStyle` khác attrs trên cùng một đoạn.

`marksOnText` dùng `findText` (Task 2) lấy `{from,to}` rồi đọc từng `textNode` trong khoảng; trường chuỗi chỉ trả giá trị khi **mọi** text node trong khoảng có cùng giá trị đó.

Thêm nhánh vào `reduceWord` và `export * from './marks';` vào `index.ts`.

- [ ] **Step 4: Chạy test, xác nhận PASS**

Run: `npm test && npm run typecheck`

- [ ] **Step 5: Commit + STATUS**

```bash
git add -A
git commit -m "feat(shared): character formatting actions for the Word simulator" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
