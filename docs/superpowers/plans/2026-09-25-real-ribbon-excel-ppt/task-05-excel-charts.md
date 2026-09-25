# Task 5: Excel — Insert › Charts, sửa tiêu đề trên biểu đồ

**Files:**
- Modify: `shared/src/sims/excel/state.ts` (action `setChartTitle`), `shared/src/sims/excel/chart.ts`, `chart.test.ts`
- Rewrite: `client/src/sims/excel/RibbonInsert.tsx`; sửa test Insert trong `Ribbon.test.tsx`
- Modify: `client/src/sims/excel/ChartView.tsx` (+ `onRename`), `ChartView.test.tsx`, chỗ gọi `ChartView` trong `ExcelSim.tsx`
- Modify: `client/src/content/lessons/excel-data.ts`, `excel-project.ts`, `help-ids.ts`, `faq.json`

**Interfaces:**
- Produces (shared): `| { type: 'setChartTitle'; id: string; title: string }` — `title.trim()` rỗng thì **giữ tiêu đề
  cũ**; id không có thì không đổi gì. Đổi tiêu đề là một bậc hoàn tác như `insertChart` (xem cách `insertChart`
  ghi lịch sử trong `state.ts` và làm y hệt). Hằng `export const DEFAULT_CHART_TITLE = 'Chart Title';`
- Produces (client): Group **"Charts"** gồm ba `MenuButton variant="office"`:

| aria-label | helpId | Nút | Mục trong menu → loại |
|---|---|---|---|
| Biểu đồ cột hoặc thanh | `excel.chartColumn` | `DataBarVertical20Regular` ▾ | "Clustered Column" → `column`, "Clustered Bar" (`DataBarHorizontal20Regular`) → `bar` |
| Biểu đồ đường | `excel.chartLine` | `DataLine20Regular` ▾ | "Line" → `line` |
| Biểu đồ tròn | `excel.chartPie` | `DataPie20Regular` ▾ | "Pie" → `pie` |

  Chọn mục là chèn ngay: `{ type: 'insertChart', chart: { id: \`chart-${chartsOf(state).length}\`, type, range: <vùng
  đang chọn>, title: DEFAULT_CHART_TITLE } }`. Bỏ `Picker` loại, ô gõ tiêu đề, nút "Chèn biểu đồ", và helpId
  `excel.chartType`, `excel.insertChart`. Dòng "Vẽ từ vùng đang chọn: A2:B5" giữ lại bên phải nhóm.
- `ChartView`: tiêu đề là nút (aria "Sửa tiêu đề biểu đồ", `data-help-id="excel.chartTitle"`); bấm → `<input
  aria-label="Tiêu đề biểu đồ">` có sẵn chữ cũ, được chọn hết; Enter hoặc rời ô → `onRename(text)`; Esc → thôi sửa.

- [ ] **Bước 1: Test shared (FAIL)** — `chart.test.ts`:

```ts
it('setChartTitle đổi tiêu đề, chuỗi trống thì giữ tiêu đề cũ', () => {
  let s = reduce(withChart(), { type: 'setChartTitle', id: 'chart-0', title: '  Lương nhân viên ' });
  expect(chartsOf(s)[0]!.title).toBe('Lương nhân viên');
  s = reduce(s, { type: 'setChartTitle', id: 'chart-0', title: '   ' });
  expect(chartsOf(s)[0]!.title).toBe('Lương nhân viên');
  expect(reduce(s, { type: 'undo' }).sheets[0]!.charts?.[0]?.title).toBe('Chart Title');
});
```
(`withChart()` = bảng A1:B5 + `insertChart` với `title: DEFAULT_CHART_TITLE`; tên trường `charts` lấy theo `state.ts`.)

- [ ] **Bước 2: Test client (FAIL)** — `Ribbon.test.tsx` thay test "tab Insert chèn được biểu đồ":

```tsx
it('Insert › Charts: chọn Clustered Column là chèn ngay với tiêu đề Chart Title', () => {
  const dispatch = vi.fn();
  render(<Ribbon state={excelSim.reduceExcel(state, { type: 'selectRange', range: 'A2:B5' })} dispatch={dispatch} />);
  fireEvent.click(screen.getByRole('tab', { name: 'Insert' }));
  fireEvent.click(screen.getByRole('button', { name: 'Biểu đồ cột hoặc thanh' }));
  fireEvent.click(screen.getByRole('button', { name: 'Clustered Column' }));
  expect(dispatch).toHaveBeenCalledWith({ type: 'insertChart', chart: { id: 'chart-0', type: 'column', range: 'A2:B5', title: 'Chart Title' } });
});
```
`ChartView.test.tsx`: bấm "Sửa tiêu đề biểu đồ", gõ "Lương" + Enter → `onRename('Lương')`; lần khác gõ rồi Esc →
`onRename` không được gọi và tiêu đề cũ vẫn hiện.

- [ ] **Bước 3: Chạy** `npm test -w shared -- chart`, `npm test -w client -- excel` → FAIL.
- [ ] **Bước 4: Code** shared → `RibbonInsert` → `ChartView` + `ExcelSim` truyền `onRename={(title) =>
  dispatch({ type: 'setChartTitle', id: chart.id, title })}`. PASS.
- [ ] **Bước 5: Lời bài.** `excel.chart`: giải thích + bước giải "Chọn A2:B5 → thẻ Insert › nhóm Charts › nút Insert
  Column or Bar Chart ▾ › Clustered Column → bấm chữ **Chart Title** trên biểu đồ, gõ Lương nhân viên, Enter";
  spotlight `excel.chartColumn`; `solve` thêm `{ type: 'setChartTitle', id: 'chart-0', title: 'Lương nhân viên' }`
  sau `insertChart` (với `title: 'Chart Title'`). `excel-project.ts` (biểu đồ tròn): Insert Pie Chart ▾ › Pie. Soát FAQ.
- [ ] **Bước 6:** `npm test && npm run typecheck` (content.test phát lại `solve` mới).
- [ ] **Bước 7: Trình duyệt:** học `excel.chart` bằng chuột tới "Giỏi quá!", sửa tiêu đề trên biểu đồ, thử Esc và
  xoá trắng. Ba menu Charts không bị cắt. Ctrl+Z trả tiêu đề về "Chart Title".
- [ ] **Bước 8: Commit** `feat(excel): Insert › Charts như Excel thật, sửa tiêu đề ngay trên biểu đồ` + STATUS.
