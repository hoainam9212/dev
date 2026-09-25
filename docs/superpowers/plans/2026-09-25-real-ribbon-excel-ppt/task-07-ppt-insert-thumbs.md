# Task 7: PowerPoint — Insert, menu chuột phải trên hình thu nhỏ, lời "thẻ"

**Files:**
- Rewrite: `client/src/sims/ppt/RibbonInsert.tsx`, `RibbonInsert.test.tsx`
- Modify: `client/src/sims/ppt/RibbonHome.tsx` (export `NewSlideButton` để Insert dùng lại)
- Modify: `client/src/sims/ppt/SlideList.tsx` (+ menu chuột phải, phím Delete), `SlideList.test.tsx`, `PptSim.test.tsx`
- Modify: `client/src/content/lessons/ppt-basics.ts`, `ppt-objects.ts`, `faq.json`, `help-ids.ts`

**Interfaces:**
- Consumes: Task 6 `SplitButton`; action `gotoSlide`, `duplicateSlide`, `deleteSlide`, `addText`, `addShape`, `openDialog 'image'`.
- Produces: `export function NewSlideButton(p: { state: pptSim.PptState; dispatch: Dispatch<pptSim.PptAction> })` —
  đúng cái `SplitButton` New Slide của Task 6, chuyển thành component để Home và Insert **cùng một bản**.
- Insert (spec §2 #9): **Slides** (`NewSlideButton`) \| **Images** (Pictures large `Image20Regular`, aria "Chèn ảnh",
  `ppt.pictures`) \| **Illustrations** (Shapes ▾ large `Shapes20Regular`, aria "Hình khối", `ppt.shapes`, mục như cũ) \|
  **Text** (Text Box large `Textbox20Regular`, aria "Hộp chữ", `ppt.textBox`). Toạ độ chèn giữ `NEW_TEXT`, `NEW_SHAPE`.
- Hình thu nhỏ: chuột phải → menu (portal ra `document.body`, `position: fixed` tại con trỏ, **kẹp trong khung nhìn**:
  `left = min(x, innerWidth - rộng menu - 8)`, tương tự `top`) gồm "Duplicate Slide" (label "Nhân đôi slide",
  `ppt.duplicate`) → `gotoSlide i` rồi `duplicateSlide`; "Delete Slide" (label "Xoá slide", `ppt.deleteSlide`) →
  `gotoSlide i` rồi `deleteSlide`, **khoá khi chỉ còn 1 slide**. Đóng khi bấm ra ngoài / Esc. Phím Delete hoặc
  Backspace khi **chính nút hình thu nhỏ đang focus** → xoá slide đó (nếu > 1). Nút "+ Slide mới" dưới cột giữ nguyên.

- [ ] **Bước 1: Test (FAIL)** — `RibbonInsert.test.tsx`:

```tsx
it('Insert xếp nhóm như PowerPoint 365', () => {
  render(<RibbonInsert state={pptSim.pptInitial()} dispatch={vi.fn()} />);
  expect([...document.querySelectorAll('[data-variant="office"] > span')].map((e) => e.textContent))
    .toEqual(['Slides', 'Images', 'Illustrations', 'Text']);
});
```
`SlideList.test.tsx`:

```tsx
it('chuột phải trên slide 2 rồi Delete Slide thì xoá đúng slide 2', () => {
  const dispatch = vi.fn();
  render(<SlideList state={twoSlides} dispatch={dispatch} />);
  fireEvent.contextMenu(screen.getByRole('button', { name: 'Slide 2' }), { clientX: 50, clientY: 50 });
  fireEvent.click(screen.getByRole('button', { name: 'Xoá slide' }));
  expect(dispatch.mock.calls.map((c) => c[0])).toEqual([{ type: 'gotoSlide', index: 1 }, { type: 'deleteSlide' }]);
});
it('không xoá được slide cuối cùng, kể cả bằng phím Delete', () => {
  const dispatch = vi.fn();
  render(<SlideList state={pptSim.pptInitial()} dispatch={dispatch} />);
  fireEvent.contextMenu(screen.getByRole('button', { name: 'Slide 1' }), { clientX: 50, clientY: 50 });
  expect(screen.getByRole('button', { name: 'Xoá slide' })).toBeDisabled();
  fireEvent.keyDown(screen.getByRole('button', { name: 'Slide 1' }), { key: 'Delete' });
  expect(dispatch).not.toHaveBeenCalledWith({ type: 'deleteSlide' });
});
it('menu bấm sát mép phải vẫn nằm trong màn hình', () => {
  render(<SlideList state={twoSlides} dispatch={vi.fn()} />);
  fireEvent.contextMenu(screen.getByRole('button', { name: 'Slide 1' }), { clientX: window.innerWidth - 2, clientY: 10 });
  expect(parseFloat(screen.getByRole('menu').style.left)).toBeLessThan(window.innerWidth - 2);
});
```
(`twoSlides` = `reducePpt(pptInitial(), { type: 'addSlide' })`.) `PptSim.test.tsx`: nháy đúp vào tiêu đề để sửa,
`keyDown` Delete trong ô chữ → vẫn còn đủ số slide (Delete khi sửa chữ không xoá slide).

- [ ] **Bước 2: Chạy** `npm test -w client -- ppt/` → FAIL.
- [ ] **Bước 3: Code** `NewSlideButton` → `RibbonInsert` → `SlideList`. PASS.
- [ ] **Bước 4: Lời bài.** `grep -nE "\btab\b|Tab " client/src/content/lessons/ppt-*.ts client/src/content/faq.json` —
  mọi "tab X" → "thẻ X", theo mẫu "thẻ Insert › nhóm Text › nút Text Box", "thẻ Home › nhóm Slides › New Slide",
  "thẻ Insert › nhóm Illustrations › Shapes ▾", "thẻ Home › nhóm Drawing › Shape Fill". FAQ xoá slide: "bấm
  **chuột phải** vào hình slide ở cột trái › Delete Slide". `help-ids.ts` các `ppt.*` còn lại: label "English (Tiếng Việt)".
- [ ] **Bước 5:** `npm test && npm run typecheck`.
- [ ] **Bước 6: Trình duyệt:** học `ppt.textbox`, `ppt.shape`, `ppt.image` bằng chuột. Chuột phải lên slide ở mép dưới
  cột và ở màn 375px (cột nằm ngang): menu không tràn, Delete Slide xoá đúng slide; Tab tới hình thu nhỏ, Delete xoá.
  Đang sửa chữ trong hộp, bấm Delete: chỉ xoá ký tự.
- [ ] **Bước 7: Commit** `feat(ppt): thẻ Insert, menu chuột phải trên slide, lời bài viết "thẻ"` + STATUS.
