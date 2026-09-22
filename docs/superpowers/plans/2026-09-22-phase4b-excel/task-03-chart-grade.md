### Task 3: Biểu đồ trong sổ tính và ba loại check mới

Đọc `00-overview.md` trước. Task này xong là hết phần `shared` của 4B.

**Files:**
- Tạo: `shared/src/sims/excel/chart.ts`, `shared/src/sims/excel/chart.test.ts`
- Sửa: `shared/src/sims/excel/state.ts` (nhánh action), `shared/src/sims/excel/grade.ts`, `shared/src/sims/excel/grade.test.ts`, `shared/src/sims/excel/index.ts`

**Interfaces — Consumes:** `Chart` (`{ id, type, range, title }`) và `Sheet.charts` đã khai báo ở 4A; `isSorted` (Task 1); `hiddenRows` (Task 2); `cellValue`, `cellText`, `withEdit`.

**Interfaces — Produces:** thêm vào `ExcelAction`:

```ts
  | { type: 'insertChart'; chart: Chart }
  | { type: 'removeChart'; id: string }
```

trong `chart.ts`:

```ts
/** Số liệu đã bóc ra từ vùng, sẵn sàng để vẽ. Cột đầu là nhãn, cột sau là số. */
export interface ChartData {
  labels: string[];
  values: number[];
  max: number;   // 0 khi không có số nào
}
export function chartData(s: WorkbookState, range: string): ChartData;
export function reduceChart(s: WorkbookState, a: ExcelAction): WorkbookState | null;
export function chartsOf(s: WorkbookState): Chart[];
```

và ba loại check trong `grade.ts`:

```ts
  | { kind: 'rangeSorted'; range: string; by: string; dir: 'asc' | 'desc' }
  | { kind: 'filterActive'; col: string; values?: string[] }
  | { kind: 'chart'; chartType: Chart['type']; range?: string }
```

Tên trường là `chartType`, **không** phải `type` — `ExcelCheck` đã dùng `kind` để phân biệt nhánh, thêm `type` nữa sẽ rất dễ đọc lẫn.

- [ ] **Step 1: Viết test FAIL** — `shared/src/sims/excel/chart.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { excelInitial, reduceExcel, type ExcelAction, type WorkbookState } from './state';
import { chartData, chartsOf } from './chart';

const run = (s: WorkbookState, ...as: ExcelAction[]) => as.reduce(reduceExcel, s);
const months = () => excelInitial({
  cells: {
    A1: 'Tháng 1', B1: '12000000',
    A2: 'Tháng 2', B2: '15500000',
    A3: 'Tháng 3', B3: '9800000',
  },
});

describe('số liệu cho biểu đồ', () => {
  it('bóc nhãn ở cột đầu và số ở cột sau', () => {
    const d = chartData(months(), 'A1:B3');
    expect(d.labels).toEqual(['Tháng 1', 'Tháng 2', 'Tháng 3']);
    expect(d.values).toEqual([12000000, 15500000, 9800000]);
    expect(d.max).toBe(15500000);
  });

  it('vùng một cột thì nhãn là địa chỉ ô', () => {
    const d = chartData(months(), 'B1:B3');
    expect(d.labels).toEqual(['B1', 'B2', 'B3']);
    expect(d.values).toEqual([12000000, 15500000, 9800000]);
  });

  it('ô chữ hoặc ô lỗi trong cột số được coi là 0', () => {
    const s = excelInitial({ cells: { A1: 'x', B1: 'chữ', A2: 'y', B2: '=1/0', A3: 'z', B3: '5' } });
    const d = chartData(s, 'A1:B3');
    expect(d.values).toEqual([0, 0, 5]);
    expect(d.max).toBe(5);
  });

  it('vùng rỗng thì max là 0, không chia cho 0 ở chỗ vẽ', () => {
    expect(chartData(excelInitial(), 'A1:B3').max).toBe(0);
  });
});

describe('chèn và xoá biểu đồ', () => {
  const chart = { id: 'c1', type: 'column' as const, range: 'A1:B3', title: 'Doanh thu' };

  it('chèn biểu đồ vào sheet đang mở', () => {
    const s = run(months(), { type: 'insertChart', chart });
    expect(chartsOf(s)).toEqual([chart]);
  });

  it('xoá biểu đồ theo id', () => {
    const s = run(months(), { type: 'insertChart', chart }, { type: 'removeChart', id: 'c1' });
    expect(chartsOf(s)).toEqual([]);
  });

  it('chèn biểu đồ là một bước hoàn tác', () => {
    const s = run(months(), { type: 'insertChart', chart }, { type: 'undo' });
    expect(chartsOf(s)).toEqual([]);
  });

  it('mỗi sheet giữ biểu đồ riêng', () => {
    let s = excelInitial({ sheets: ['Sheet1', 'Sheet2'] });
    s = run(s, { type: 'insertChart', chart }, { type: 'switchSheet', index: 1 });
    expect(chartsOf(s)).toEqual([]);
  });
});
```

- [ ] **Step 2: Viết test FAIL cho grader** — thêm vào `shared/src/sims/excel/grade.test.ts`

```ts
describe('chấm sắp xếp, lọc và biểu đồ', () => {
  const staff = () => excelInitial({
    cells: {
      A1: 'Nhân viên', B1: 'Lương', C1: 'Phòng',
      A2: 'Nam', B2: '7500000', C2: 'Kế toán',
      A3: 'Lan', B3: '6200000', C3: 'Kinh doanh',
    },
  });

  it('rangeSorted', () => {
    const before = staff();
    expect(check(before, { kind: 'rangeSorted', range: 'A2:C3', by: 'B', dir: 'asc' }).pass).toBe(false);
    const after = reduceExcel(before, { type: 'sortRange', range: 'A2:C3', by: 'B', dir: 'asc' });
    expect(check(after, { kind: 'rangeSorted', range: 'A2:C3', by: 'B', dir: 'asc' }).pass).toBe(true);
  });

  it('filterActive đòi đúng cột, và đòi đúng giá trị nếu check nói rõ', () => {
    const s = run(staff(),
      { type: 'enableFilter', range: 'A1:C3' },
      { type: 'setFilterValues', col: 'C', values: ['Kế toán'] });
    expect(check(s, { kind: 'filterActive', col: 'C' }).pass).toBe(true);
    expect(check(s, { kind: 'filterActive', col: 'C', values: ['Kế toán'] }).pass).toBe(true);
    expect(check(s, { kind: 'filterActive', col: 'C', values: ['Kinh doanh'] }).pass).toBe(false);
    expect(check(s, { kind: 'filterActive', col: 'A' }).pass).toBe(false);
  });

  it('chart đòi đúng loại, và đúng vùng nếu check nói rõ', () => {
    const s = reduceExcel(staff(), { type: 'insertChart', chart: { id: 'c1', type: 'pie', range: 'A2:B3', title: 'Lương' } });
    expect(check(s, { kind: 'chart', chartType: 'pie' }).pass).toBe(true);
    expect(check(s, { kind: 'chart', chartType: 'pie', range: 'A2:B3' }).pass).toBe(true);
    expect(check(s, { kind: 'chart', chartType: 'column' }).pass).toBe(false);
    expect(check(s, { kind: 'chart', chartType: 'pie', range: 'A1:B9' }).pass).toBe(false);
  });

  it('câu báo lỗi nói rõ phải làm gì', () => {
    const r = check(staff(), { kind: 'chart', chartType: 'column' });
    expect(r.results[0]!.messageVi).toContain('biểu đồ');
  });
});
```

- [ ] **Step 3: Chạy cả hai, xác nhận FAIL** — `npm test -w shared -- excel`

- [ ] **Step 4: Viết `chart.ts`, nối `reduceChart` vào `reduceExcel`, thêm ba nhánh vào `gradeExcel`**

Nhánh `default` của `reduceExcel` thành `reduceEdit(s, a) ?? reduceFormat(s, a) ?? reduceTable(s, a) ?? reduceChart(s, a) ?? s`.

Tên loại biểu đồ tiếng Việt cho câu chấm: `column` → "biểu đồ cột", `bar` → "biểu đồ thanh ngang", `line` → "biểu đồ đường", `pie` → "biểu đồ tròn".

- [ ] **Step 5: Chạy, xác nhận PASS** — `npm test && npm run typecheck` (chạy cả client, vì `GRADERS` được client dùng)

- [ ] **Step 6: Commit**

```bash
git add shared/src docs/superpowers/plans/2026-09-22-phase4b-excel/STATUS.md
git commit -m "feat(excel): chart model and checks for sort, filter and chart" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
