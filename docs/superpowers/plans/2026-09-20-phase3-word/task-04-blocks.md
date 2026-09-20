# Task 4: Đoạn văn — căn lề, giãn dòng, Heading 1–3, danh sách

Đọc `00-overview.md` trước. Task này không có giao diện.

**Files:**
- Create: `shared/src/sims/word/blocks.ts`, `shared/src/sims/word/blocks.test.ts`
- Modify: `shared/src/sims/word/state.ts`, `shared/src/sims/word/index.ts`

**Interfaces:**
- Consumes: `WordState`, `reduceWord`, `findText` (Task 2).
- Produces — thêm vào `WordAction`:
```ts
  | { type: 'setAlign'; align: 'left' | 'center' | 'right' | 'justify' }
  | { type: 'setLineHeight'; value: '1' | '1.5' | '2' }
  | { type: 'setHeading'; level: 0 | 1 | 2 | 3 }   // 0 = trả về đoạn thường
  | { type: 'toggleList'; list: 'bullet' | 'ordered' }
```
  và hàm tra cứu dùng cho grader (Task 7) + ribbon (Task 9):
```ts
/** Thông tin khối chứa đoạn chữ `text`. `list` là loại danh sách bao ngoài, nếu có. */
export function blockOf(doc: WordDoc, text: string, nth?: number):
  | { type: 'paragraph' | 'heading'; level: number; align: string; lineHeight: string; list: 'bullet' | 'ordered' | null }
  | null;
export function activeBlock(s: WordState): ReturnType<typeof blockOf>;
```
- **Quy tắc:**
  - Bốn action tác động lên **mọi khối giao với vùng chọn** (chọn rỗng vẫn tính là khối chứa con trỏ — khác Task 3).
  - `align` mặc định khi chưa đặt là `'left'`; `lineHeight` mặc định `'1'`. `blockOf` trả giá trị mặc định này chứ không trả `null`, để bài học viết check gọn.
  - `setHeading` giữ nguyên nội dung và `textAlign`/`lineHeight` của khối. `level: 0` chuyển về `paragraph`.
  - `toggleList`: khối chưa nằm trong danh sách → bọc vào `bulletList`/`orderedList`; đang nằm trong đúng loại đó → gỡ ra; đang nằm trong loại kia → đổi loại.
  - Đẩy `past` như mọi thay đổi doc (Task 2).

- [ ] **Step 1: Viết test (FAIL trước)**

`shared/src/sims/word/blocks.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { plainText } from './schema';
import { blockOf } from './blocks';
import { reduceWord, wordInitial, type WordAction, type WordState } from './state';

const run = (s: WordState, ...as: WordAction[]) => as.reduce(reduceWord, s);
/** Tài liệu ba đoạn: "Tiêu đề", "Đoạn một", "Đoạn hai". */
function threeParagraphs(): WordState {
  return run(wordInitial({ text: 'Tiêu đề' }), { type: 'splitBlock' }, { type: 'insertText', text: 'Đoạn một' }, { type: 'splitBlock' }, { type: 'insertText', text: 'Đoạn hai' });
}

describe('word blocks', () => {
  it('builds the three-paragraph fixture', () => {
    expect(plainText(threeParagraphs().doc)).toBe('Tiêu đề\nĐoạn một\nĐoạn hai');
  });

  it('defaults to left alignment and single line spacing', () => {
    expect(blockOf(threeParagraphs().doc, 'Đoạn một')).toMatchObject({ type: 'paragraph', align: 'left', lineHeight: '1', list: null, level: 0 });
  });

  it('centres only the selected paragraph', () => {
    const s = run(threeParagraphs(), { type: 'selectText', text: 'Tiêu đề' }, { type: 'setAlign', align: 'center' });
    expect(blockOf(s.doc, 'Tiêu đề')?.align).toBe('center');
    expect(blockOf(s.doc, 'Đoạn một')?.align).toBe('left');
  });

  it('sets line spacing', () => {
    const s = run(threeParagraphs(), { type: 'selectText', text: 'Đoạn hai' }, { type: 'setLineHeight', value: '1.5' });
    expect(blockOf(s.doc, 'Đoạn hai')?.lineHeight).toBe('1.5');
  });

  it('turns a paragraph into Heading 1 and back, keeping alignment', () => {
    let s = run(threeParagraphs(), { type: 'selectText', text: 'Tiêu đề' }, { type: 'setAlign', align: 'center' }, { type: 'setHeading', level: 1 });
    expect(blockOf(s.doc, 'Tiêu đề')).toMatchObject({ type: 'heading', level: 1, align: 'center' });
    s = run(s, { type: 'selectText', text: 'Tiêu đề' }, { type: 'setHeading', level: 0 });
    expect(blockOf(s.doc, 'Tiêu đề')).toMatchObject({ type: 'paragraph', level: 0, align: 'center' });
  });

  it('makes a bullet list, switches it to numbered, then removes it', () => {
    let s = run(threeParagraphs(), { type: 'selectText', text: 'Đoạn một' }, { type: 'toggleList', list: 'bullet' });
    expect(blockOf(s.doc, 'Đoạn một')?.list).toBe('bullet');
    s = run(s, { type: 'selectText', text: 'Đoạn một' }, { type: 'toggleList', list: 'ordered' });
    expect(blockOf(s.doc, 'Đoạn một')?.list).toBe('ordered');
    s = run(s, { type: 'selectText', text: 'Đoạn một' }, { type: 'toggleList', list: 'ordered' });
    expect(blockOf(s.doc, 'Đoạn một')?.list).toBeNull();
    expect(plainText(s.doc)).toBe('Tiêu đề\nĐoạn một\nĐoạn hai');
  });

  it('applies to every paragraph the selection touches', () => {
    const s = run(threeParagraphs(), { type: 'selectAll' }, { type: 'toggleList', list: 'bullet' });
    for (const t of ['Tiêu đề', 'Đoạn một', 'Đoạn hai']) expect(blockOf(s.doc, t)?.list, t).toBe('bullet');
  });

  it('returns null for text that is not there', () => {
    expect(blockOf(threeParagraphs().doc, 'không có')).toBeNull();
  });
});
```

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `npm test -w shared -- blocks`

- [ ] **Step 3: Viết code**

`shared/src/sims/word/blocks.ts`:
- Căn lề / giãn dòng: duyệt `tr.doc.nodesBetween(from, to)` và `tr.setNodeMarkup` cho node `paragraph`/`heading`, chỉ đổi attr cần đổi.
- Heading: `setBlockType` (`@tiptap/pm/transform`) sang `wordSchema.nodes.heading` với `attrs` gồm `level` + attr cũ, hoặc sang `paragraph` khi `level === 0`.
- Danh sách: `wrapInList` / `liftListItem` từ `@tiptap/pm/schema-list`; đổi loại danh sách thì gỡ rồi bọc lại loại mới (đơn giản và đủ cho phạm vi bài học).
- `blockOf`: lấy `{from}` từ `findText`, dùng `doc.resolve(from)` rồi leo `$pos.node(depth)` từ trong ra để tìm khối và danh sách bao ngoài.

Thêm nhánh vào `reduceWord`, `export * from './blocks';` vào `index.ts`.

- [ ] **Step 4: Chạy test, xác nhận PASS**

Run: `npm test && npm run typecheck`

- [ ] **Step 5: Commit + STATUS**

```bash
git add -A
git commit -m "feat(shared): paragraph, heading and list actions for the Word simulator" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
