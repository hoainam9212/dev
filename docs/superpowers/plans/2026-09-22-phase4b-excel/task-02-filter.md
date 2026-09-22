### Task 2: AutoFilter (`table.ts`)

Đọc `00-overview.md` trước. Task 1 đã tạo `table.ts` và nối `reduceTable` vào `reduceExcel`.

**Files:**
- Sửa: `shared/src/sims/excel/table.ts`, `shared/src/sims/excel/state.ts` (thêm nhánh action)
- Sửa: `shared/src/sims/excel/table.test.ts` (thêm `describe` mới, giữ test cũ)

**Interfaces — Produces:** thêm vào `ExcelAction`:

```ts
  | { type: 'enableFilter'; range: string }                          // bật AutoFilter cho vùng
  | { type: 'disableFilter' }
  | { type: 'setFilterValues'; col: string; values: string[] }       // [] nghĩa là bỏ lọc cột đó
```

và trong `table.ts`:

```ts
/** Những giá trị ĐANG hiện ở một cột của vùng lọc, để dựng menu thả xuống. */
export function filterOptions(s: WorkbookState, col: string): string[];
/** Hàng (đếm từ 0) bị ẩn vì không thoả điều kiện lọc. Lưới ở Task 4 dùng cái này. */
export function hiddenRows(s: WorkbookState): ReadonlySet<number>;
```

**Lọc chỉ ẩn hàng khi vẽ, không xoá dữ liệu.** `SUM` vẫn cộng cả hàng đang ẩn — đúng như Excel với hàm thường, và đó là một điểm đáng dạy (bài Task 7 nói rõ chuyện này).

Hàng tiêu đề của vùng lọc (hàng đầu tiên) **không bao giờ bị ẩn**.

- [ ] **Step 1: Viết test FAIL** — thêm vào cuối `shared/src/sims/excel/table.test.ts`

```ts
describe('AutoFilter', () => {
  /** Bảng bốn nhân viên, cột C là phòng ban. */
  const staff = () => excelInitial({
    cells: {
      A1: 'Nhân viên', B1: 'Lương', C1: 'Phòng',
      A2: 'Nam', B2: '7500000', C2: 'Kế toán',
      A3: 'Lan', B3: '6200000', C3: 'Kinh doanh',
      A4: 'Tú', B4: '8100000', C4: 'Kế toán',
      A5: 'Hà', B5: '5500000', C5: 'Kinh doanh',
    },
  });

  it('bật AutoFilter thì nhớ vùng, chưa ẩn hàng nào', () => {
    const s = run(staff(), { type: 'enableFilter', range: 'A1:C5' });
    expect(s.sheets[0]!.filter).not.toBeNull();
    expect([...hiddenRows(s)]).toEqual([]);
  });

  it('liệt kê các giá trị của một cột, không trùng lặp', () => {
    const s = run(staff(), { type: 'enableFilter', range: 'A1:C5' });
    expect(filterOptions(s, 'C')).toEqual(['Kế toán', 'Kinh doanh']);
  });

  it('chọn một giá trị thì các hàng khác bị ẩn, tiêu đề vẫn hiện', () => {
    const s = run(staff(),
      { type: 'enableFilter', range: 'A1:C5' },
      { type: 'setFilterValues', col: 'C', values: ['Kế toán'] });
    // hàng 0 là tiêu đề (A1), hàng 1 và 3 là Kế toán → còn lại bị ẩn.
    expect([...hiddenRows(s)].sort((x, y) => x - y)).toEqual([2, 4]);
  });

  it('lọc KHÔNG xoá dữ liệu, và SUM vẫn cộng cả hàng đang ẩn', () => {
    let s = run(staff(),
      { type: 'enableFilter', range: 'A1:C5' },
      { type: 'setFilterValues', col: 'C', values: ['Kế toán'] });
    expect(cellRaw(s, 'B3')).toBe('6200000');
    s = reduceExcel(s, { type: 'setCell', cell: 'B7', raw: '=SUM(B2:B5)' });
    expect(cellValue(s, 'B7')).toBe(27300000);
  });

  it('lọc nhiều cột thì hàng phải thoả CẢ HAI', () => {
    const s = run(staff(),
      { type: 'enableFilter', range: 'A1:C5' },
      { type: 'setFilterValues', col: 'C', values: ['Kế toán'] },
      { type: 'setFilterValues', col: 'A', values: ['Tú'] });
    expect([...hiddenRows(s)].sort((x, y) => x - y)).toEqual([1, 2, 4]);
  });

  it('chọn lại danh sách rỗng là bỏ lọc cột đó', () => {
    const s = run(staff(),
      { type: 'enableFilter', range: 'A1:C5' },
      { type: 'setFilterValues', col: 'C', values: ['Kế toán'] },
      { type: 'setFilterValues', col: 'C', values: [] });
    expect([...hiddenRows(s)]).toEqual([]);
  });

  it('tắt AutoFilter thì mọi hàng hiện lại', () => {
    const s = run(staff(),
      { type: 'enableFilter', range: 'A1:C5' },
      { type: 'setFilterValues', col: 'C', values: ['Kế toán'] },
      { type: 'disableFilter' });
    expect(s.sheets[0]!.filter ?? null).toBeNull();
    expect([...hiddenRows(s)]).toEqual([]);
  });

  it('chưa bật lọc thì không ẩn gì và không có lựa chọn nào', () => {
    const s = staff();
    expect([...hiddenRows(s)]).toEqual([]);
    expect(filterOptions(s, 'C')).toEqual([]);
  });

  it('bật lọc là một bước hoàn tác', () => {
    const s = run(staff(), { type: 'enableFilter', range: 'A1:C5' }, { type: 'undo' });
    expect(s.sheets[0]!.filter ?? null).toBeNull();
  });
});
```

Thêm import ở đầu file test: `import { filterOptions, hiddenRows, isSorted } from './table';`

- [ ] **Step 2: Chạy, xác nhận FAIL** — `npm test -w shared -- table`

- [ ] **Step 3: Cài `enableFilter` / `disableFilter` / `setFilterValues`**

Trường đã có sẵn trong `Sheet`: `filter?: { range: Range; conditions: Record<number, string[]> } | null`. Khoá của `conditions` là **chỉ số cột đếm từ 0**. So sánh giá trị bằng chữ hiển thị đã `trim()`, không phân biệt hoa thường — người học gõ "kế toán" hay "Kế toán" đều khớp.

- [ ] **Step 4: Chạy, xác nhận PASS** — `npm test -w shared && npm run typecheck`

- [ ] **Step 5: Commit**

```bash
git add shared/src/sims/excel docs/superpowers/plans/2026-09-22-phase4b-excel/STATUS.md
git commit -m "feat(excel): AutoFilter that hides rows without deleting data" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
