# Task 5: Bảng và ảnh

Đọc `00-overview.md` trước. Task này không có giao diện.

**Files:**
- Create: `shared/src/sims/word/objects.ts`, `shared/src/sims/word/objects.test.ts`
- Modify: `shared/src/sims/word/state.ts`, `shared/src/sims/word/index.ts`

**Interfaces:**
- Consumes: `WordState`, `reduceWord`, `findText` (Task 2).
- Produces — thêm vào `WordAction`:
```ts
  | { type: 'insertTable'; rows: number; cols: number }
  | { type: 'tableRow'; op: 'add' | 'remove' }
  | { type: 'tableCol'; op: 'add' | 'remove' }
  | { type: 'fillCell'; row: number; col: number; text: string }   // 0-indexed, bảng đầu tiên chứa con trỏ
  | { type: 'insertImage'; src: string; alt: string }
  | { type: 'setImageWidth'; width: '25%' | '40%' | '60%' | '100%' }
```
  và:
```ts
export function tableSizeOf(doc: WordDoc, nth?: number): { rows: number; cols: number } | null;
export function cellText(doc: WordDoc, row: number, col: number, nth?: number): string | null;
export function imagesOf(doc: WordDoc): { src: string; alt: string; width: string }[];
export const IMAGE_LIBRARY: { src: string; alt: string }[];   // 6 ảnh SVG có sẵn, xem Step 3
```
- **Quy tắc:**
  - `insertTable` chèn bảng ngay sau khối chứa con trỏ, hàng đầu là `tableHeader`, các ô rỗng, rồi đặt con trỏ vào ô đầu tiên.
  - `tableRow`/`tableCol` tác động lên bảng chứa con trỏ; `add` thêm **sau** vị trí hiện tại, `remove` xoá hàng/cột hiện tại. Con trỏ không ở trong bảng → không làm gì. Bảng còn 1 hàng (không kể hàng tiêu đề) hoặc 1 cột thì `remove` không làm gì.
  - `fillCell` đặt text cho ô `(row, col)` của bảng chứa con trỏ; ô ngoài phạm vi → không làm gì. Action này chỉ để bài học viết `solution` gọn, ribbon không dùng.
  - `insertImage` chèn node `image` (`width` mặc định `'40%'`) sau khối chứa con trỏ. `setImageWidth` đổi độ rộng ảnh **được chọn**, không có ảnh nào trong vùng chọn thì đổi ảnh cuối cùng trong tài liệu.
  - `src` luôn là đường dẫn tĩnh trong `client/public/images/word/`, không tải mạng.

- [ ] **Step 1: Viết test (FAIL trước)**

`shared/src/sims/word/objects.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { IMAGE_LIBRARY, cellText, imagesOf, tableSizeOf } from './objects';
import { reduceWord, wordInitial, type WordAction, type WordState } from './state';

const run = (s: WordState, ...as: WordAction[]) => as.reduce(reduceWord, s);

describe('word tables', () => {
  it('inserts a table of the requested size', () => {
    const s = run(wordInitial({ text: 'Bảng điểm' }), { type: 'insertTable', rows: 3, cols: 2 });
    expect(tableSizeOf(s.doc)).toEqual({ rows: 3, cols: 2 });
  });

  it('fills cells and reads them back', () => {
    const s = run(wordInitial(), { type: 'insertTable', rows: 2, cols: 2 },
      { type: 'fillCell', row: 0, col: 0, text: 'Môn' },
      { type: 'fillCell', row: 1, col: 1, text: '9' });
    expect(cellText(s.doc, 0, 0)).toBe('Môn');
    expect(cellText(s.doc, 1, 1)).toBe('9');
    expect(cellText(s.doc, 5, 5)).toBeNull();
  });

  it('adds and removes rows and columns', () => {
    let s = run(wordInitial(), { type: 'insertTable', rows: 2, cols: 2 }, { type: 'tableRow', op: 'add' });
    expect(tableSizeOf(s.doc)).toEqual({ rows: 3, cols: 2 });
    s = run(s, { type: 'tableCol', op: 'add' });
    expect(tableSizeOf(s.doc)).toEqual({ rows: 3, cols: 3 });
    s = run(s, { type: 'tableRow', op: 'remove' }, { type: 'tableCol', op: 'remove' });
    expect(tableSizeOf(s.doc)).toEqual({ rows: 2, cols: 2 });
  });

  it('never destroys the last body row or column', () => {
    let s = run(wordInitial(), { type: 'insertTable', rows: 2, cols: 1 }, { type: 'tableRow', op: 'remove' });
    const size = tableSizeOf(s.doc);
    s = run(s, { type: 'tableCol', op: 'remove' });
    expect(tableSizeOf(s.doc)).toEqual(size);
  });

  it('ignores table actions outside a table', () => {
    const s = wordInitial({ text: 'Không có bảng' });
    expect(reduceWord(s, { type: 'tableRow', op: 'add' })).toEqual(s);
    expect(tableSizeOf(s.doc)).toBeNull();
  });
});

describe('word images', () => {
  it('ships a small library of local images', () => {
    expect(IMAGE_LIBRARY.length).toBeGreaterThanOrEqual(6);
    for (const i of IMAGE_LIBRARY) expect(i.src.startsWith('/images/word/')).toBe(true);
  });

  it('inserts an image with alt text and default width', () => {
    const s = run(wordInitial({ text: 'Ảnh của tôi' }), { type: 'insertImage', src: '/images/word/meo.svg', alt: 'Mèo Mochi' });
    expect(imagesOf(s.doc)).toEqual([{ src: '/images/word/meo.svg', alt: 'Mèo Mochi', width: '40%' }]);
  });

  it('resizes the image', () => {
    const s = run(wordInitial(), { type: 'insertImage', src: '/images/word/meo.svg', alt: 'Mèo' }, { type: 'setImageWidth', width: '100%' });
    expect(imagesOf(s.doc)[0]?.width).toBe('100%');
  });

  it('counts several images', () => {
    const s = run(wordInitial(), { type: 'insertImage', src: '/images/word/a.svg', alt: 'a' }, { type: 'insertImage', src: '/images/word/b.svg', alt: 'b' });
    expect(imagesOf(s.doc)).toHaveLength(2);
  });
});
```

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `npm test -w shared -- objects`

- [ ] **Step 3: Viết code + ảnh**

`shared/src/sims/word/objects.ts` dùng `@tiptap/pm/tables`: `addRowAfter`, `deleteRow`, `addColumnAfter`, `deleteColumn` (các hàm này nhận `(state, dispatch)`), `tableSizeOf` đọc `table.childCount` và `row.childCount`. Đếm `rows` **gồm cả hàng tiêu đề** (fixture 3×2 nghĩa là 1 hàng tiêu đề + 2 hàng thân).

Tạo 6 ảnh SVG nhẹ (mỗi file < 2 KB, vẽ bằng tay, không có logo thương hiệu) trong `client/public/images/word/`: `meo.svg` (Mochi), `hoa.svg`, `bien.svg`, `nui.svg`, `sach.svg`, `may-tinh.svg`. `IMAGE_LIBRARY` liệt kê đúng 6 file này kèm `alt` tiếng Việt.

Thêm nhánh vào `reduceWord`, `export * from './objects';` vào `index.ts`.

- [ ] **Step 4: Chạy test, xác nhận PASS**

Run: `npm test && npm run typecheck`

- [ ] **Step 5: Commit + STATUS**

```bash
git add -A
git commit -m "feat(shared): table and image actions for the Word simulator" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
