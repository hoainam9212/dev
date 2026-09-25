# Task 2: Excel — thanh thẻ + Home

**Files:**
- Modify: `client/src/sims/excel/Ribbon.tsx` (dùng `RibbonTabs app="excel"` + `RibbonPanel`)
- Rewrite: `client/src/sims/excel/RibbonHome.tsx`; sửa `RibbonHome.test.tsx`
- Modify: `client/src/content/help-ids.ts` (các `excel.*` của Home), `client/src/content/faq.json`
- Modify: `client/src/content/lessons/excel-format.ts`, `excel-absolute.ts`, `excel-lookup.ts`, `excel-project.ts`

**Interfaces:**
- Consumes: Task 1 `RibbonTabs`, `RibbonPanel`, `Swatched`, `Labeled`; `Group`/`Row`/`ToolButton large`/`Picker`/
  `MenuButton variant` sẵn có; action Excel sẵn có `undo`, `copy`, `paste`, `setFormat`, `merge`, `fillDown`,
  `fillRight`, `clear`; `excelSim.formatOf(state, excelSim.refName(state.sel.from))`.
- Produces: bố cục Home dưới đây. `aria-label` cũ giữ nguyên chữ tiếng Việt (test cũ tìm `/in đậm/i`, `/gộp ô/i`…).

**Bố cục (spec §2 #1–#3), trái → phải:**
| Group | Nội dung (icon Fluent) |
|---|---|
| Undo | `ArrowUndo20Regular` large, helpId `excel.undo` |
| Clipboard | Paste large `ClipboardPaste20Regular` (`excel.paste`), Copy nhỏ `Copy20Regular` + chữ "Copy" (`excel.copy`) |
| Font | Row: B `TextBold`, I `TextItalic` \| Borders ▾ `BorderAll20Regular` (menu: "All Borders" → `border:'all'`, "No Border" → `border:'none'`, helpId `excel.border`) \| Fill Color (`Swatched` `PaintBucket20Regular` + Picker `excel.fill`) \| Font Color (`Swatched` `TextColor20Regular` + Picker `excel.color`) |
| Alignment | Row: `TextAlignLeft/Center/Right20Regular` \| "Merge & Center" `TableCellsMerge20Regular` + chữ (`excel.merge`) |
| Number | Picker Number Format (`excel.numFmt`, width 7.5rem) \| Increase Decimal `DecimalArrowLeft20Regular` (`excel.decimals`), Decrease Decimal `DecimalArrowRight20Regular` (`excel.decimalsLess`) |
| Editing | Fill ▾ `ArrowDown20Regular` + "Fill" (menu "Down" → `fillDown`, "Right" → `fillRight`; helpId `excel.fillDown`) \| Clear ▾ `Eraser20Regular` + "Clear" (menu "Clear Contents" → `clear`; `excel.clear`) |

Number Format — nhãn mới, **giá trị giữ nguyên**: `general` General, `number` Number, `currencyVnd` "Currency (₫)",
`percent` Percentage, `date` Short Date. Không bọc khung `overflow-x-auto` (bỏ lớp đó ở div ngoài).

- [ ] **Bước 1: Viết test (FAIL)** — thêm vào `excel/RibbonHome.test.tsx`, sửa test "chọn Tiền ₫" thành Currency:

```tsx
const groupTitles = () => [...document.querySelectorAll('[data-variant="office"] > span')].map((e) => e.textContent);

it('xếp nhóm đúng như Excel 365', () => {
  render(<RibbonHome state={state} dispatch={() => {}} />);
  expect(groupTitles()).toEqual(['Undo', 'Clipboard', 'Font', 'Alignment', 'Number', 'Editing']);
});

it('Number Format hiện tên tiếng Anh nhưng giá trị bài học không đổi', () => {
  render(<RibbonHome state={state} dispatch={() => {}} />);
  const opts = [...screen.getByLabelText('Kiểu số').querySelectorAll('option')].map((o) => [o.value, o.textContent]);
  expect(opts).toEqual([['general', 'General'], ['number', 'Number'], ['currencyVnd', 'Currency (₫)'], ['percent', 'Percentage'], ['date', 'Short Date']]);
});

it('Fill ▾ có Down và Right, Clear ▾ có Clear Contents', () => {
  const dispatch = vi.fn();
  render(<RibbonHome state={state} dispatch={dispatch} />);
  fireEvent.click(screen.getByRole('button', { name: 'Fill' }));
  fireEvent.click(screen.getByRole('button', { name: 'Fill xuống' }));
  fireEvent.click(screen.getByRole('button', { name: 'Fill' }));
  fireEvent.click(screen.getByRole('button', { name: 'Fill sang phải' }));
  fireEvent.click(screen.getByRole('button', { name: 'Xoá' }));
  fireEvent.click(screen.getByRole('button', { name: 'Xoá nội dung' }));
  expect(dispatch.mock.calls.map((c) => c[0].type)).toEqual(['fillDown', 'fillRight', 'clear']);
});

it('Borders ▾ kẻ và bỏ viền', () => {
  const dispatch = vi.fn();
  render(<RibbonHome state={state} dispatch={dispatch} />);
  fireEvent.click(screen.getByRole('button', { name: 'Viền ô' }));
  fireEvent.click(screen.getByRole('button', { name: 'Kẻ mọi viền' }));
  expect(dispatch).toHaveBeenCalledWith({ type: 'setFormat', fmt: { border: 'all' } });
});
```
(Tên menu item: "Fill xuống", "Fill sang phải", "Xoá nội dung", "Kẻ mọi viền", "Bỏ viền" là `label` của item;
chữ hiện ra là "Down", "Right", "Clear Contents", "All Borders", "No Border".) Sửa test cũ "bấm Merge và Fill
xuống": Fill giờ đi qua menu như trên.

- [ ] **Bước 2: Chạy** `npm test -w client -- excel/Ribbon` → FAIL đúng các test mới.

- [ ] **Bước 3: Code** `Ribbon.tsx` dùng `RibbonTabs`/`RibbonPanel` (giữ 6 thẻ cũ), rồi `RibbonHome.tsx` theo bảng.
  Chép khuôn `word/RibbonHome.tsx` (Row, Swatched + Picker có `style={{ width: '1.1rem', border: 'none', background:
  'transparent' }}`). Chạy lại tới PASS; chạy `help/doubleTooltip.test.tsx` (không `title` thừa).

- [ ] **Bước 4: Lời bài + gợi ý + Hỏi Mèo** theo mẫu "thẻ X › nhóm Y › nút Z": tìm bằng
  `grep -nE "Kiểu số|Tiền ₫|Fill xuống|nhóm Sửa|Gộp ô|Màu nền|Viền" client/src/content/lessons/excel-*.ts client/src/content/faq.json`.
  Ví dụ: "ô Kiểu số và chọn Tiền ₫" → "thẻ Home › nhóm Number › ô Number Format, chọn Currency (₫)";
  "nút Fill xuống ở nhóm Sửa" → "thẻ Home › nhóm Editing › Fill ▾ › Down"; "nút Gộp ô (Merge)" → "nút Merge &
  Center". `help-ids.ts`: label dạng `'Merge & Center (Gộp ô)'`, `'Fill (Đổ xuống/sang phải)'`, `'Number Format (Kiểu số)'`…

- [ ] **Bước 5: Toàn bộ** `npm test && npm run typecheck`.

- [ ] **Bước 6: Trình duyệt** (quy tắc ở tổng quan): học bằng chuột `excel.numfmt`, `excel.look`, `excel.width`,
  `excel.copy` tới "Giỏi quá!". Mở Borders ▾, Fill ▾, Clear ▾ — không bị cắt. Bấm sang ô khác: B sáng/tắt đúng ô đó.
  Ribbon mọi thẻ cùng chiều cao; 375px không tràn ngang.

- [ ] **Bước 7: Commit** `feat(excel): thẻ Home theo Excel 365 thật` + dòng STATUS.
