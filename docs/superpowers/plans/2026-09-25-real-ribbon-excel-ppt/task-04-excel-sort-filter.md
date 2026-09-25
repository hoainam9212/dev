# Task 4: Excel — Data › Sort & Filter, hộp thoại Sort, mũi tên lọc trong ô

**Files:**
- Modify: `shared/src/sims/excel/state.ts` (`ExcelDialog` thêm `'sort'`), `shared/src/sims/excel/table.ts` (+ `currentRegion`), `table.test.ts`
- Rewrite: `client/src/sims/excel/RibbonData.tsx`, `RibbonData.test.tsx`; sửa test "tab Data có nút sắp xếp và lọc
  thật" trong `Ribbon.test.tsx` (tìm theo aria mới "Sắp tăng dần", "Bật tắt lọc")
- Modify: `client/src/sims/excel/dialogs.tsx` (+ hộp thoại Sort), `dialogs.test.tsx`
- Modify: `client/src/sims/excel/Grid.tsx` (mũi tên ▾ trong ô tiêu đề), `FilterMenu.tsx` (vẽ bằng portal)
- Create: `client/src/sims/excel/FilterArrow.test.tsx`
- Modify: `client/src/content/lessons/excel-data.ts`, `excel-project.ts`, `help-ids.ts`, `faq.json`

**Interfaces:**
- Produces (shared): `export type ExcelDialog = 'save' | 'print' | 'sort' | null;`
  `export function currentRegion(s: WorkbookState, at: CellRef): { range: string; header: boolean }` — khối ô liền
  nhau không trống chứa `at` (như Ctrl+A của Excel); `header` = hàng đầu toàn chữ **và** có ít nhất một số ở hàng
  dưới. `range` KHÔNG gồm hàng tiêu đề khi `header` là true.
- Produces (client): nhóm **"Sort & Filter"**: A→Z `TextSortAscending20Regular` (aria "Sắp tăng dần", `excel.sortAsc`),
  Z→A `TextSortDescending20Regular` ("Sắp giảm dần", `excel.sortDesc`), **Sort** large `ArrowSort20Regular` ("Sắp xếp
  tuỳ chọn", `excel.sort`, mở `dialog: 'sort'`), **Filter** large `Filter20Regular` ("Bật tắt lọc", `excel.filter`).
  A→Z/Z→A: vùng chọn nhiều ô → sắp vùng đó theo **cột của ô neo `sel.from`**; chỉ một ô → `currentRegion`.
  Bỏ ô "Cột cần sắp" và các nút "B ▾" trên ribbon; bỏ helpId `excel.sortBy`.
- Hộp thoại Sort (trong `ExcelDialogs`): tiêu đề "Sort"; `<select aria-label="Sắp theo cột">` các cột của vùng
  ("Column A"…), `<select aria-label="Thứ tự">` — cột có số: "Smallest to Largest"/"Largest to Smallest", còn lại
  "A to Z"/"Z to A"; OK → `sortRange` rồi `openDialog null`; Cancel/Esc → `openDialog null`.
- Mũi tên lọc: khi `sheet.filter` bật, mỗi ô ở **hàng đầu** vùng lọc có nút ▾ (aria `Mở menu lọc cột C`, helpId
  `excel.filterCol`) nằm **cạnh** nút ô (không lồng `<button>` trong `<button>`: bọc cả hai trong `div.relative`).
  `FilterMenu` nhận thêm `anchor: DOMRect`, vẽ bằng `createPortal(…, document.body)` với `position: fixed` ngay dưới
  mũi tên; đóng khi bấm ra ngoài, Esc, hoặc cuộn.

- [ ] **Bước 1: Test shared (FAIL)** — `table.test.ts`:

```ts
it('currentRegion mở rộng một ô thành cả bảng và nhận ra hàng tiêu đề', () => {
  const s = withCells({ A1: 'Tên', B1: 'Lương', A2: 'An', B2: '7', A3: 'Bình', B3: '5', D9: 'lạc' });
  expect(currentRegion(s, { row: 2, col: 1 })).toEqual({ range: 'A2:B3', header: true });
});
it('currentRegion không có hàng tiêu đề khi hàng đầu có số', () => {
  const s = withCells({ A1: 'An', B1: '7', A2: 'Bình', B2: '5' });
  expect(currentRegion(s, { row: 0, col: 0 })).toEqual({ range: 'A1:B2', header: false });
});
```
(`withCells` = dựng `workbookInitial` rồi `setRaw` từng ô; dùng helper sẵn có trong `table.test.ts` nếu đã có.)

- [ ] **Bước 2: Test client (FAIL)** — `RibbonData.test.tsx` (thay các test "Cột cần sắp", "lọc cột C"):

```tsx
it('kéo chọn từ C5 lên A2 rồi Z→A thì sắp theo cột C — cột của ô neo', () => {
  const dispatch = vi.fn();
  const s = { ...state, sel: { from: { row: 4, col: 2 }, to: { row: 1, col: 0 } } };
  render(<RibbonData state={s} dispatch={dispatch} />);
  fireEvent.click(screen.getByRole('button', { name: 'Sắp giảm dần' }));
  expect(dispatch).toHaveBeenCalledWith({ type: 'sortRange', range: 'A2:C5', by: 'C', dir: 'desc' });
});
it('chỉ chọn một ô thì A→Z sắp cả bảng, chừa hàng tiêu đề', () => {
  const dispatch = vi.fn();
  render(<RibbonData state={excelSim.reduceExcel(state, { type: 'select', cell: 'B3' })} dispatch={dispatch} />);
  fireEvent.click(screen.getByRole('button', { name: 'Sắp tăng dần' }));
  expect(dispatch).toHaveBeenCalledWith({ type: 'sortRange', range: 'A2:C5', by: 'B', dir: 'asc' });
});
it('nút Sort mở hộp thoại Sort', () => {
  const dispatch = vi.fn();
  render(<RibbonData state={state} dispatch={dispatch} />);
  fireEvent.click(screen.getByRole('button', { name: 'Sắp xếp tuỳ chọn' }));
  expect(dispatch).toHaveBeenCalledWith({ type: 'openDialog', dialog: 'sort' });
});
```
`dialogs.test.tsx`: mở `dialog: 'sort'` với vùng `A2:C5`, cột C là số → ô Thứ tự có "Largest to Smallest"; chọn
Column C + Largest to Smallest, bấm OK → `sortRange {range:'A2:C5', by:'C', dir:'desc'}` rồi `openDialog null`.
`FilterArrow.test.tsx` (render `ExcelSim` với bảng STAFF đã `enableFilter A1:C5`):

```tsx
it('mũi tên lọc nằm trong ô tiêu đề và menu không bị lưới cắt', () => {
  render(<ExcelSim initial={filtered} onState={vi.fn()} os="win" spotlight={null} />);
  expect(screen.queryByRole('button', { name: 'Mở menu lọc cột D' })).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: 'Mở menu lọc cột B' }));
  const box = screen.getByRole('checkbox', { name: 'Kế toán' });
  expect(box.closest('.overflow-auto')).toBeNull(); // portal ra body, ngoài khung cuộn của lưới
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('checkbox', { name: 'Kế toán' })).toBeNull();
});
```

- [ ] **Bước 3: Chạy** `npm test -w shared -- table` và `npm test -w client -- excel` → FAIL đúng chỗ.
- [ ] **Bước 4: Code** shared → ribbon → hộp thoại → Grid/FilterMenu. PASS cả hai gói.
- [ ] **Bước 5: Lời bài.** `excel.sort`: bước giải "Chọn A2:C5 → thẻ Data › nhóm Sort & Filter › Sort → Sort by
  Column C, Order Largest to Smallest → OK"; spotlight `excel.sort`. Câu quiz: "Bạn chỉ bôi đen cột Lương, bấm A→Z,
  Excel hỏi Sort Warning và bạn chọn **Continue with the current selection**. Chuyện gì xảy ra?" (đáp án, lời giải
  giữ ý cũ). `excel.filter`: "bấm mũi tên ▾ ở ô **B1** (tiêu đề Phòng)". Soát `excel-project.ts` + FAQ cùng mẫu.
- [ ] **Bước 6:** `npm test && npm run typecheck`.
- [ ] **Bước 7: Trình duyệt:** học `excel.sort` (qua hộp thoại) và `excel.filter` bằng chuột tới "Giỏi quá!". Thử
  thêm: bấm một ô cột Lương rồi Z→A → cả bảng sắp, tiêu đề đứng yên. Menu lọc mở ngay dưới ô, không bị cắt ở cả
  ô cột cuối bên phải; cuộn lưới thì menu đóng. 375px không tràn.
- [ ] **Bước 8: Commit** `feat(excel): Sort & Filter như Excel thật — hộp thoại Sort, mũi tên lọc trong ô` + STATUS.
