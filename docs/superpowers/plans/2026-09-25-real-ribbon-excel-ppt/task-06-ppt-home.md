# Task 6: PowerPoint — thanh thẻ + Home + File

**Files:**
- Modify: `client/src/components/ribbon.tsx` (+ `SplitButton`), `client/src/components/ribbon.test.tsx`
- Modify: `client/src/sims/ppt/Ribbon.tsx` (`RibbonTabs app="ppt"`, `RibbonPanel`, File); `Ribbon.test.tsx`
- Rewrite: `client/src/sims/ppt/RibbonHome.tsx`, `RibbonHome.test.tsx`
- Modify: `client/src/content/help-ids.ts` (`ppt.*` Home: label "English (Tiếng Việt)"; thêm `ppt.arrange`; bỏ `ppt.front`, `ppt.back`)

**Interfaces:**
- Produces (dùng chung, Task 7 và 5B dùng lại):
```ts
/** Nút lớn tách đôi như New Slide của Office: nửa trên làm việc chính, nửa dưới "▾" mở menu. */
export function SplitButton(p: {
  helpId: string; label: string; menuLabel: string; icon: ReactNode; text: string; disabled?: boolean;
  onClick: () => void; items: { value: string; label: string; content: ReactNode }[]; onPick: (value: string) => void;
}): JSX.Element;
```
  Nửa trên: `<button aria-label={label}>` icon to + không chữ; nửa dưới: `<button aria-label={menuLabel}>{text} ▾`;
  menu dùng chung lớp `.ribbon-menu` và cách đóng (ra ngoài / Esc) như `MenuButton` — **tách phần menu của
  `MenuButton` thành hàm dùng chung**, đừng chép.
- Home (spec §2 #8), trái → phải, mọi Group `variant="office"`:

| Group | Nội dung |
|---|---|
| Undo | large `ArrowUndo20Regular`, aria "Hoàn tác", `ppt.undo`, khoá khi `past` rỗng |
| Slides | `SplitButton` New Slide (`SlideAdd20Regular`; aria "Slide mới", menuLabel "Chọn bố cục cho slide mới", `ppt.newSlide`; mục = 4 bố cục (xem trước như nút Layout cũ) → `addSlide` rồi `setLayout`, và mục "Duplicate Selected Slides" (label "Nhân đôi slide đang chọn") → `duplicateSlide`) \| Layout ▾ nhỏ `SlideLayout20Regular` + chữ "Layout" (aria "Bố cục", `ppt.layout`) |
| Font | Cỡ chữ ▾ (aria "Cỡ chữ", `ppt.size`) \| B, I (aria "In đậm", "In nghiêng") \| Font Color ▾ (`Swatched` `TextColor20Regular`, aria "Màu chữ", `ppt.color`) |
| Paragraph | `TextAlignLeft/Center/Right20Regular` (aria "Căn trái/giữa/phải", `ppt.align`) |
| Drawing | Arrange ▾ large `LayerDiagonal20Regular` + "Arrange" (aria "Sắp xếp lớp", `ppt.arrange`): "Bring to Front" `PositionToFront20Regular` (label "Đưa lên trên cùng") → `bringToFront`, "Send to Back" `PositionToBack20Regular` ("Đưa xuống dưới cùng") → `sendToBack` \| Shape Fill ▾ (`Swatched` `PaintBucket20Regular`, aria "Màu nền hình", `ppt.fill`, chỉ bật khi đang chọn hình khối) |

  Mọi nút định dạng/Arrange **khoá khi chưa chọn đối tượng** như hiện nay. Bỏ nút Duplicate và Delete Slide khỏi
  ribbon (Task 7 đưa sang menu chuột phải). File: Group "File" với Save As (`Save20Regular`, aria "Lưu tệp",
  `ppt.save`) và Print (`Print20Regular`, aria "In", `ppt.print`); dòng "Đã lưu thành …" giữ nguyên.

- [ ] **Bước 1: Test (FAIL).** `components/ribbon.test.tsx` thêm:

```tsx
it('SplitButton: nửa trên làm việc chính, nửa dưới mở menu', () => {
  const onClick = vi.fn(); const onPick = vi.fn();
  render(<SplitButton helpId="x" label="Slide mới" menuLabel="Chọn bố cục" icon={<span />} text="New Slide"
    onClick={onClick} items={[{ value: 'a', label: 'Mục A', content: 'A' }]} onPick={onPick} />);
  fireEvent.click(screen.getByRole('button', { name: 'Slide mới' }));
  expect(onClick).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByRole('button', { name: 'Chọn bố cục' }));
  fireEvent.click(screen.getByRole('button', { name: 'Mục A' }));
  expect(onPick).toHaveBeenCalledWith('a');
  expect(onClick).toHaveBeenCalledTimes(1);
});
```
`ppt/RibbonHome.test.tsx` viết lại (giữ ý các test cũ, đổi tên nút sang tiếng Việt):

```tsx
it('xếp nhóm như PowerPoint 365', () => {
  setup();
  expect([...document.querySelectorAll('[data-variant="office"] > span')].map((e) => e.textContent))
    .toEqual(['Undo', 'Slides', 'Font', 'Paragraph', 'Drawing']);
});
it('New Slide ▾ chọn bố cục thì thêm slide rồi đặt bố cục', () => {
  const { dispatch } = setup();
  fireEvent.click(screen.getByRole('button', { name: 'Chọn bố cục cho slide mới' }));
  fireEvent.click(screen.getByRole('button', { name: /Hai cột nội dung/ }));
  expect(dispatch.mock.calls.map((c) => c[0])).toEqual([{ type: 'addSlide' }, { type: 'setLayout', layout: 'twoContent' }]);
});
it('Arrange ▾ đưa đối tượng lên trên cùng, khoá khi chưa chọn gì', () => {
  const { dispatch } = setup({ ...withShape, sel: lastElId(withShape) });
  fireEvent.click(screen.getByRole('button', { name: 'Sắp xếp lớp' }));
  fireEvent.click(screen.getByRole('button', { name: 'Đưa lên trên cùng' }));
  expect(dispatch).toHaveBeenCalledWith({ type: 'bringToFront' });
  cleanup(); setup();
  expect(screen.getByRole('button', { name: 'Sắp xếp lớp' })).toBeDisabled();
});
```
(`lastElId(s)` = id phần tử cuối của `pptSim.slideOf(s).els` — **không hardcode id**, bài học Task 2 của 5A.)

- [ ] **Bước 2: Chạy** `npm test -w client -- ribbon ppt/` → FAIL.
- [ ] **Bước 3: Code** `SplitButton` (tách menu dùng chung) → `ppt/Ribbon.tsx` → `ppt/RibbonHome.tsx`. PASS. Chạy lại
  test Word + Excel (MenuButton đổi ruột): phải xanh.
- [ ] **Bước 4:** `npm test && npm run typecheck`.
- [ ] **Bước 5: Trình duyệt:** học `ppt.slides` bằng New Slide ▾ (chọn bố cục ngay từ menu) và bằng New Slide + Layout ▾;
  chọn hình → Shape Fill, Arrange ▾ đổi lớp; bỏ chọn → các nút khoá. Mọi menu không bị cắt; ribbon mọi thẻ cao bằng
  nhau; gạch chân thẻ màu cam PowerPoint; 375px không tràn.
- [ ] **Bước 6: Commit** `feat(ppt): thẻ Home và File theo PowerPoint 365 thật` + STATUS.
