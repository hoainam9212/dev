### Task 1: Sắp xếp vùng theo một cột (`table.ts`)

Đọc `00-overview.md` trước.

**Files:**
- Tạo: `shared/src/sims/excel/table.ts`, `shared/src/sims/excel/table.test.ts`
- Sửa: `shared/src/sims/excel/state.ts` (thêm nhánh action, gọi `reduceTable`), `shared/src/sims/excel/index.ts`
- Tạo branch: `git checkout -b feat/phase4b-excel`

**Interfaces — Consumes:** `withEdit`, `cellKey`, `cellsIn`, `type Cell`, `type Sheet`, `type WorkbookState` (state.ts); `parseRange`, `nameToCol`, `cellsOf` (formula).

**Interfaces — Produces:** thêm vào `ExcelAction`:

```ts
  | { type: 'sortRange'; range: string; by: string; dir: 'asc' | 'desc'; header?: boolean }
```

`range` là vùng cần sắp (`'A2:C11'`), `by` là **tên cột** (`'B'`), `header: true` nghĩa là hàng đầu của vùng là tiêu đề nên giữ nguyên chỗ.

và trong `table.ts`:

```ts
/** Nhánh action của sắp xếp và lọc. Trả null nếu action không thuộc nhóm này. */
export function reduceTable(s: WorkbookState, a: ExcelAction): WorkbookState | null;
/** Vùng đã được sắp theo cột này chưa? Grader ở Task 3 dùng lại. */
export function isSorted(s: WorkbookState, range: string, by: string, dir: 'asc' | 'desc'): boolean;
```

**Sắp xếp là đổi chỗ `raw` của CẢ HÀNG**, không phải sắp giá trị hiển thị. Nhờ vậy tên và lương đi cùng nhau. So sánh: số trước chữ, số theo giá trị, chữ theo thứ tự chữ cái không phân biệt hoa thường; ô trống luôn xuống cuối bất kể `dir`.

- [ ] **Step 1: Viết test FAIL** — `shared/src/sims/excel/table.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { cellRaw, cellValue, excelInitial, reduceExcel, type ExcelAction, type WorkbookState } from './state';
import { isSorted } from './table';

const run = (s: WorkbookState, ...as: ExcelAction[]) => as.reduce(reduceExcel, s);

/** Ba nhân viên, cột A tên, cột B lương; hàng 1 là tiêu đề. */
const table = () => excelInitial({
  cells: {
    A1: 'Nhân viên', B1: 'Lương',
    A2: 'Nguyễn Văn Nam', B2: '7500000',
    A3: 'Trần Thị Lan', B3: '6200000',
    A4: 'Lê Minh Tú', B4: '8100000',
  },
});

describe('sắp xếp', () => {
  it('sắp tăng dần theo cột lương, cả hàng đi theo', () => {
    const s = run(table(), { type: 'sortRange', range: 'A2:B4', by: 'B', dir: 'asc' });
    expect(cellRaw(s, 'A2')).toBe('Trần Thị Lan');
    expect(cellValue(s, 'B2')).toBe(6200000);
    expect(cellRaw(s, 'A4')).toBe('Lê Minh Tú');
  });

  it('sắp giảm dần', () => {
    const s = run(table(), { type: 'sortRange', range: 'A2:B4', by: 'B', dir: 'desc' });
    expect(cellValue(s, 'B2')).toBe(8100000);
    expect(cellValue(s, 'B4')).toBe(6200000);
  });

  it('sắp theo cột chữ, không phân biệt hoa thường', () => {
    const s = run(excelInitial({ cells: { A1: 'bút', A2: 'Áo', A3: 'Cặp' } }),
      { type: 'sortRange', range: 'A1:A3', by: 'A', dir: 'asc' });
    expect([cellRaw(s, 'A1'), cellRaw(s, 'A2'), cellRaw(s, 'A3')]).toEqual(['Áo', 'bút', 'Cặp']);
  });

  it('giữ hàng tiêu đề tại chỗ khi header: true', () => {
    const s = run(table(), { type: 'sortRange', range: 'A1:B4', by: 'B', dir: 'asc', header: true });
    expect(cellRaw(s, 'A1')).toBe('Nhân viên');
    expect(cellRaw(s, 'A2')).toBe('Trần Thị Lan');
  });

  it('ô trống luôn xuống cuối', () => {
    const s = run(excelInitial({ cells: { A1: '5', A3: '1' } }),
      { type: 'sortRange', range: 'A1:A3', by: 'A', dir: 'asc' });
    expect([cellRaw(s, 'A1'), cellRaw(s, 'A2'), cellRaw(s, 'A3')]).toEqual(['1', '5', '']);
  });

  it('công thức trong hàng đi theo hàng, KHÔNG bị dịch địa chỉ', () => {
    // Sắp xếp là đổi chỗ nội dung, không phải chép công thức sang chỗ khác.
    let s = excelInitial({ cells: { A1: '2', B1: '=A1*10', A2: '1', B2: '=A2*10' } });
    s = run(s, { type: 'sortRange', range: 'A1:B2', by: 'A', dir: 'asc' });
    expect(cellRaw(s, 'A1')).toBe('1');
    expect(cellRaw(s, 'B1')).toBe('=A2*10');
    expect(cellValue(s, 'B1')).toBe(20);
  });

  it('là một bước hoàn tác', () => {
    const s = run(table(), { type: 'sortRange', range: 'A2:B4', by: 'B', dir: 'asc' }, { type: 'undo' });
    expect(cellRaw(s, 'A2')).toBe('Nguyễn Văn Nam');
  });

  it('cột sắp nằm ngoài vùng thì không đổi gì', () => {
    const s = table();
    expect(reduceExcel(s, { type: 'sortRange', range: 'A2:B4', by: 'E', dir: 'asc' })).toEqual(s);
  });
});

describe('isSorted', () => {
  it('biết vùng đã sắp hay chưa', () => {
    const before = table();
    expect(isSorted(before, 'A2:B4', 'B', 'asc')).toBe(false);
    const after = reduceExcel(before, { type: 'sortRange', range: 'A2:B4', by: 'B', dir: 'asc' });
    expect(isSorted(after, 'A2:B4', 'B', 'asc')).toBe(true);
    expect(isSorted(after, 'A2:B4', 'B', 'desc')).toBe(false);
  });

  it('vùng một hàng thì coi như đã sắp', () => {
    expect(isSorted(table(), 'A2:B2', 'B', 'asc')).toBe(true);
  });
});
```

- [ ] **Step 2: Chạy, xác nhận FAIL** — `npm test -w shared -- table`

- [ ] **Step 3: Viết `table.ts` và nối vào `reduceExcel`**

`state.ts` hiện gọi `reduceEdit(s, a) ?? reduceFormat(s, a) ?? s` ở nhánh `default`; đổi thành `reduceEdit(s, a) ?? reduceFormat(s, a) ?? reduceTable(s, a) ?? s`. Import vòng giữa các file này là **cố ý và an toàn** (đều là khai báo hàm) — đừng dựng lại kiểu "đăng ký", 4A đã thử và nó im lặng không chạy khi test import thẳng `./state`.

Chỗ dễ sai: đọc **giá trị đã tính** để so sánh (dùng `cellValue`), nhưng **ghi lại `raw`**; một lần `withEdit` cho cả phép sắp.

- [ ] **Step 4: Chạy, xác nhận PASS** — `npm test -w shared && npm run typecheck`

- [ ] **Step 5: Commit**

```bash
git add shared/src/sims/excel docs/superpowers/plans/2026-09-22-phase4b-excel/STATUS.md
git commit -m "feat(excel): sort a range by one column" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
