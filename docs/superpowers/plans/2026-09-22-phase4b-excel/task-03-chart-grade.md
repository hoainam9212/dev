### Task 3: Biểu đồ trong sổ tính và ba loại check mới

Đọc `00-overview.md` trước. Xong task này là hết phần `shared` của 4B.

**Files:** tạo `shared/src/sims/excel/chart.ts` + `chart.test.ts`; sửa `state.ts` (nhánh action), `grade.ts`, `grade.test.ts`, `index.ts`.

**Consumes:** `Chart` (`{ id, type, range, title }`) và `Sheet.charts` đã khai báo ở 4A; `isSorted` (Task 1); `withEdit`, `cellValue`, `cellText`.

**Produces** — thêm vào `ExcelAction`:

```ts
  | { type: 'insertChart'; chart: Chart }
  | { type: 'removeChart'; id: string }
```

trong `chart.ts`:

```ts
export interface ChartData { labels: string[]; values: number[]; max: number }  // max = 0 khi không có số
export function chartData(s: WorkbookState, range: string): ChartData;
export function chartsOf(s: WorkbookState): Chart[];
export function reduceChart(s: WorkbookState, a: ExcelAction): WorkbookState | null;
```

ba loại check trong `grade.ts`:

```ts
  | { kind: 'rangeSorted'; range: string; by: string; dir: 'asc' | 'desc' }
  | { kind: 'filterActive'; col: string; values?: string[] }
  | { kind: 'chart'; chartType: Chart['type']; range?: string }
```

Tên trường là **`chartType`**, không phải `type` — `ExcelCheck` đã dùng `kind` để phân nhánh, thêm `type` nữa rất dễ đọc lẫn.

Nhánh `default` của `reduceExcel` thành `reduceEdit ?? reduceFormat ?? reduceTable ?? reduceChart ?? s`.

Tên tiếng Việt cho câu chấm: `column` → "biểu đồ cột", `bar` → "biểu đồ thanh ngang", `line` → "biểu đồ đường", `pie` → "biểu đồ tròn".

**Test `chart.test.ts` phải viết** (bảng ba tháng: cột A tên tháng, cột B doanh thu):
1. `chartData('A1:B3')` bóc nhãn ở cột đầu, số ở cột sau, `max` đúng
2. vùng một cột (`B1:B3`) thì nhãn là địa chỉ ô
3. ô chữ hoặc ô lỗi trong cột số được coi là 0
4. vùng rỗng thì `max === 0` (chỗ vẽ không được chia cho 0)
5. `insertChart` thêm vào sheet đang mở; `chartsOf` trả đúng
6. `removeChart` xoá theo id
7. chèn biểu đồ là một bước hoàn tác
8. mỗi sheet giữ biểu đồ riêng

**Test thêm vào `grade.test.ts`:**
9. `rangeSorted` sai trước khi sắp, đúng sau khi sắp
10. `filterActive` đòi đúng cột; có `values` thì đòi đúng giá trị; cột khác thì trượt
11. `chart` đòi đúng loại; có `range` thì đòi đúng vùng
12. câu báo lỗi của `chart` có chữ "biểu đồ"

- [ ] **Step 1: Viết 12 test trên, chạy xác nhận FAIL** — `npm test -w shared -- excel`
- [ ] **Step 2: Viết `chart.ts`, nối `reduceChart`, thêm ba nhánh vào `gradeExcel`**
- [ ] **Step 3: Chạy xác nhận PASS** — `npm test && npm run typecheck` (cả client, vì `GRADERS` được client dùng)
- [ ] **Step 4: Commit**

```bash
git add shared/src docs/superpowers/plans/2026-09-22-phase4b-excel/STATUS.md
git commit -m "feat(excel): chart model and checks for sort, filter and chart" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
