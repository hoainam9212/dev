### Task 4: Tab Data — Sort, Filter, và lưới ẩn hàng đã lọc

Đọc `00-overview.md` trước. **Task giao diện — bắt buộc kiểm tra trên trình duyệt trong chính task này, và làm đủ ba điều tự soi ở overview.**

**Files:**
- Tạo: `client/src/sims/excel/RibbonData.tsx`, `client/src/sims/excel/FilterMenu.tsx`, `client/src/sims/excel/RibbonData.test.tsx`
- Sửa: `client/src/sims/excel/Ribbon.tsx` (thay `SoonTab` của tab Data), `client/src/sims/excel/Grid.tsx` (ẩn hàng), `client/src/content/help-ids.ts`

**Interfaces — Consumes:** `hiddenRows`, `filterOptions` (Task 2); `Group`, `ToolButton`, `Picker` từ `./RibbonHome` — **dùng lại, đừng viết kiểu nút mới**.

**Interfaces — Produces:**

```tsx
export function RibbonData(props: { state: excelSim.WorkbookState; dispatch: (a: excelSim.ExcelAction) => void }): JSX.Element;
export function FilterMenu(props: { state: excelSim.WorkbookState; col: string; dispatch: (a: excelSim.ExcelAction) => void; onClose: () => void }): JSX.Element;
```

Tab Data có: ô chọn **cột** để sắp, hai nút **A→Z** / **Z→A** (sắp vùng đang chọn), nút **Filter** bật/tắt AutoFilter cho vùng đang chọn, và khi lọc đang bật thì mỗi cột trong vùng có một nút mũi tên mở `FilterMenu` — hộp tích chọn các giá trị, kèm nút "Chọn tất cả".

Lưới: hàng nằm trong `hiddenRows(state)` **không được dựng ra**. Đầu hàng vẫn đánh số thật (1, 2, 5, 6…) như Excel — nhìn số nhảy là biết đang lọc.

- [ ] **Step 1: Viết test FAIL** — `client/src/sims/excel/RibbonData.test.tsx`

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { excelSim } from '@office-neko/shared';
import { RibbonData } from './RibbonData';
import { ExcelSim } from './ExcelSim';
import { HELP_IDS } from '../../content/help-ids';

const staff = () => excelSim.excelInitial({
  cells: {
    A1: 'Nhân viên', B1: 'Lương', C1: 'Phòng',
    A2: 'Nam', B2: '7500000', C2: 'Kế toán',
    A3: 'Lan', B3: '6200000', C3: 'Kinh doanh',
    A4: 'Tú', B4: '8100000', C4: 'Kế toán',
  },
});
const run = (s: excelSim.WorkbookState, ...as: excelSim.ExcelAction[]) => as.reduce(excelSim.reduceExcel, s);

describe('Tab Data', () => {
  it('A→Z sắp vùng đang chọn theo cột đã chọn', () => {
    const dispatch = vi.fn();
    const s = run(staff(), { type: 'selectRange', range: 'A2:C4' });
    render(<RibbonData state={s} dispatch={dispatch} />);
    fireEvent.change(screen.getByLabelText('Cột cần sắp'), { target: { value: 'B' } });
    fireEvent.click(screen.getByRole('button', { name: /A→Z/i }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'sortRange', range: 'A2:C4', by: 'B', dir: 'asc' });
  });

  it('Z→A sắp giảm dần', () => {
    const dispatch = vi.fn();
    const s = run(staff(), { type: 'selectRange', range: 'A2:C4' });
    render(<RibbonData state={s} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: /Z→A/i }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'sortRange', dir: 'desc' }));
  });

  it('Filter bật AutoFilter cho vùng đang chọn, bấm lần nữa thì tắt', () => {
    const dispatch = vi.fn();
    const s = run(staff(), { type: 'selectRange', range: 'A1:C4' });
    render(<RibbonData state={s} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: /filter/i }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'enableFilter', range: 'A1:C4' });

    const on = run(s, { type: 'enableFilter', range: 'A1:C4' });
    const d2 = vi.fn();
    render(<RibbonData state={on} dispatch={d2} />);
    fireEvent.click(screen.getAllByRole('button', { name: /filter/i })[1]!);
    expect(d2).toHaveBeenCalledWith({ type: 'disableFilter' });
  });

  it('mọi nút và ô chọn đều có helpId đã khai báo', () => {
    render(<RibbonData state={staff()} dispatch={() => {}} />);
    for (const el of [...screen.getAllByRole('button'), ...screen.getAllByRole('combobox')]) {
      const id = el.getAttribute('data-help-id');
      expect(id, el.getAttribute('aria-label') ?? '').toBeTruthy();
      expect(HELP_IDS, id!).toHaveProperty(id!);
    }
  });
});

describe('Lưới khi đang lọc', () => {
  const show = (s: excelSim.WorkbookState) =>
    render(<ExcelSim initial={s} onState={() => {}} os="win" spotlight={null} />);

  it('ẩn hàng không thoả điều kiện, giữ số hàng thật', () => {
    const s = run(staff(),
      { type: 'enableFilter', range: 'A1:C4' },
      { type: 'setFilterValues', col: 'C', values: ['Kế toán'] });
    show(s);
    expect(screen.getByTestId('cell-A2')).toBeInTheDocument();   // Nam, Kế toán
    expect(screen.queryByTestId('cell-A3')).toBeNull();          // Lan, Kinh doanh → ẩn
    expect(screen.getByTestId('cell-A4')).toBeInTheDocument();   // Tú, Kế toán
    expect(screen.getByTestId('rowhead-4')).toBeInTheDocument(); // số hàng vẫn là 4
  });

  it('không lọc thì không ẩn hàng nào', () => {
    show(staff());
    expect(screen.getByTestId('cell-A3')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Chạy, xác nhận FAIL** — `npm test -w client -- RibbonData`

- [ ] **Step 3: Viết `RibbonData.tsx`, `FilterMenu.tsx`, thêm `helpId`, lắp vào `Ribbon.tsx` và `Grid.tsx`**

`Grid` đang dựng cửa sổ 18 hàng quanh ô chọn; khi lọc thì **bỏ qua hàng bị ẩn rồi lấy tiếp cho đủ cửa sổ**, đừng để lưới trống hoác.

- [ ] **Step 4: Chạy, xác nhận PASS** — `npm test -w client && npm run typecheck`

- [ ] **Step 5: Kiểm tra trên trình duyệt** (bắt buộc)

Chưa có bài nào dùng tab Data, nên thêm route tạm `/dev/excel` (trang `client/src/pages/DevExcelPage.tsx` dựng `ExcelSim` với bảng bốn nhân viên) để thử tay — **Task 7 phải xoá route này**, ghi ngay vào `STATUS.md`.

Làm đủ: (a) chọn A2:C4, chọn cột B, bấm A→Z — thứ tự đổi đúng, tên đi theo lương; (b) chọn A1:C4, bấm Filter, mở menu cột Phòng, bỏ tích "Kinh doanh" — hai hàng biến mất, số hàng nhảy 1, 2, 4; (c) bấm Filter lần nữa — mọi hàng hiện lại; (d) `Ctrl+Z` sau khi sắp. **Chụp một ảnh và tự nhìn**: tab Data có giống các tab khác trong app không. Console phải sạch.

- [ ] **Step 6: Commit**

```bash
git add client/src docs/superpowers/plans/2026-09-22-phase4b-excel/STATUS.md
git commit -m "feat(excel): Data tab with sort and AutoFilter" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
