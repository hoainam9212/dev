### Task 5: Biểu đồ SVG và tab Insert

Đọc `00-overview.md` trước. **Task giao diện — bắt buộc kiểm tra trên trình duyệt trong chính task này, và làm đủ ba điều tự soi ở overview.**

**Files:**
- Tạo: `client/src/sims/excel/ChartView.tsx`, `client/src/sims/excel/RibbonInsert.tsx`, `client/src/sims/excel/ChartView.test.tsx`
- Sửa: `client/src/sims/excel/Ribbon.tsx` (thay `SoonTab` của tab Insert), `client/src/sims/excel/ExcelSim.tsx` (vẽ biểu đồ dưới lưới), `client/src/content/help-ids.ts`

**Interfaces — Consumes:** `chartData`, `chartsOf`, `type Chart` (Task 3); `Group`, `ToolButton`, `Picker` từ `./RibbonHome`.

**Interfaces — Produces:**

```tsx
export function ChartView(props: { state: excelSim.WorkbookState; chart: excelSim.Chart; onRemove: () => void }): JSX.Element;
export function RibbonInsert(props: { state: excelSim.WorkbookState; dispatch: (a: excelSim.ExcelAction) => void }): JSX.Element;
```

**Tự vẽ bằng SVG, không thêm thư viện.** Bốn loại:
- `column` — cột dọc, cao theo giá trị / `max`.
- `bar` — thanh ngang, dài theo giá trị / `max`.
- `line` — đường gấp khúc qua các điểm, có dấu tròn ở mỗi điểm.
- `pie` — hình tròn chia múi theo tỉ lệ; dùng `path` với cung `A`.

Mỗi biểu đồ có tiêu đề, nhãn trục (hoặc chú giải với `pie`), và nút ✕ để xoá. `max === 0` thì vẽ khung rỗng kèm câu "Vùng chưa có số để vẽ" — **không được chia cho 0**.

Trợ năng: `<svg role="img">` kèm `aria-label` mô tả biểu đồ bằng tiếng Việt, ví dụ "Biểu đồ cột: Doanh thu. Tháng 1: 12.000.000; Tháng 2: 15.500.000".

Tab Insert: ô chọn **loại biểu đồ**, ô nhập **tiêu đề**, nút **Chèn biểu đồ** dùng vùng đang chọn. `id` sinh bằng `chart-${state.sheets[state.active].charts?.length ?? 0}` — **không dùng `Date.now()` hay `Math.random()`**, vì `solution` của bài học phải phát lại y hệt.

- [ ] **Step 1: Viết test FAIL** — `client/src/sims/excel/ChartView.test.tsx`

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { excelSim } from '@office-neko/shared';
import { ChartView } from './ChartView';
import { RibbonInsert } from './RibbonInsert';
import { HELP_IDS } from '../../content/help-ids';

const months = () => excelSim.excelInitial({
  cells: { A1: 'Tháng 1', B1: '12000000', A2: 'Tháng 2', B2: '15500000', A3: 'Tháng 3', B3: '9800000' },
});
const chart = (type: excelSim.Chart['type']): excelSim.Chart => ({ id: 'c1', type, range: 'A1:B3', title: 'Doanh thu' });

describe('ChartView', () => {
  it('cột: một hình chữ nhật cho mỗi giá trị, cao nhất là cột lớn nhất', () => {
    render(<ChartView state={months()} chart={chart('column')} onRemove={() => {}} />);
    const bars = screen.getAllByTestId(/^chart-bar-/);
    expect(bars).toHaveLength(3);
    const h = (i: number) => Number(bars[i]!.getAttribute('height'));
    expect(h(1)).toBeGreaterThan(h(0));
    expect(h(0)).toBeGreaterThan(h(2));
  });

  it('tròn: một múi cho mỗi giá trị', () => {
    render(<ChartView state={months()} chart={chart('pie')} onRemove={() => {}} />);
    expect(screen.getAllByTestId(/^chart-slice-/)).toHaveLength(3);
  });

  it('đường: một đường gấp khúc và ba điểm', () => {
    render(<ChartView state={months()} chart={chart('line')} onRemove={() => {}} />);
    expect(screen.getByTestId('chart-line')).toBeInTheDocument();
    expect(screen.getAllByTestId(/^chart-dot-/)).toHaveLength(3);
  });

  it('hiện tiêu đề và nhãn từ bảng', () => {
    render(<ChartView state={months()} chart={chart('column')} onRemove={() => {}} />);
    expect(screen.getByText('Doanh thu')).toBeInTheDocument();
    expect(screen.getByText('Tháng 2')).toBeInTheDocument();
  });

  it('có aria-label đọc được bằng tiếng Việt', () => {
    render(<ChartView state={months()} chart={chart('column')} onRemove={() => {}} />);
    const svg = screen.getByRole('img');
    expect(svg.getAttribute('aria-label')).toContain('Tháng 1');
    expect(svg.getAttribute('aria-label')).toContain('Doanh thu');
  });

  it('vùng chưa có số thì nói ra, không chia cho 0', () => {
    render(<ChartView state={excelSim.excelInitial()} chart={chart('column')} onRemove={() => {}} />);
    expect(screen.getByText(/chưa có số/i)).toBeInTheDocument();
    expect(screen.queryAllByTestId(/^chart-bar-/)).toHaveLength(0);
  });

  it('nút ✕ gọi onRemove', () => {
    const onRemove = vi.fn();
    render(<ChartView state={months()} chart={chart('column')} onRemove={onRemove} />);
    fireEvent.click(screen.getByRole('button', { name: /xoá biểu đồ/i }));
    expect(onRemove).toHaveBeenCalled();
  });
});

describe('Tab Insert', () => {
  it('chèn biểu đồ loại đã chọn cho vùng đang chọn, id không dùng thời gian thực', () => {
    const dispatch = vi.fn();
    const s = excelSim.reduceExcel(months(), { type: 'selectRange', range: 'A1:B3' });
    render(<RibbonInsert state={s} dispatch={dispatch} />);
    fireEvent.change(screen.getByLabelText('Loại biểu đồ'), { target: { value: 'pie' } });
    fireEvent.change(screen.getByLabelText('Tiêu đề biểu đồ'), { target: { value: 'Doanh thu' } });
    fireEvent.click(screen.getByRole('button', { name: /chèn biểu đồ/i }));
    expect(dispatch).toHaveBeenCalledWith({
      type: 'insertChart',
      chart: { id: 'chart-0', type: 'pie', range: 'A1:B3', title: 'Doanh thu' },
    });
  });

  it('mọi nút và ô chọn đều có helpId đã khai báo', () => {
    render(<RibbonInsert state={months()} dispatch={() => {}} />);
    for (const el of [...screen.getAllByRole('button'), ...screen.getAllByRole('combobox')]) {
      const id = el.getAttribute('data-help-id');
      expect(id, el.getAttribute('aria-label') ?? '').toBeTruthy();
      expect(HELP_IDS, id!).toHaveProperty(id!);
    }
  });
});
```

- [ ] **Step 2: Chạy, xác nhận FAIL** — `npm test -w client -- ChartView`

- [ ] **Step 3: Viết `ChartView.tsx` và `RibbonInsert.tsx`**

Màu lấy từ token có sẵn (`--color-excel-ink` và các màu pastel trong `theme.css`); lớp CSS dùng chung nếu cần **phải nằm ở cấp đầu của `@layer components`** và thêm tên lớp vào danh sách `theme.test.ts` kiểm.

- [ ] **Step 4: Chạy, xác nhận PASS** — `npm test -w client && npm run typecheck`

- [ ] **Step 5: Kiểm tra trên trình duyệt** (bắt buộc)

Qua route tạm `/dev/excel` (Task 4 đã thêm). Chèn lần lượt **cả bốn loại** biểu đồ cho vùng A1:B3, **chụp ảnh và tự nhìn**: cột có cao thấp đúng tỉ lệ không, múi tròn có kín vòng không, đường có đi qua đúng điểm không, nhãn có bị chồng chữ không. Sửa một ô số rồi xem biểu đồ có đổi theo. Bấm ✕ xoá. Console sạch.

- [ ] **Step 6: Commit**

```bash
git add client/src docs/superpowers/plans/2026-09-22-phase4b-excel/STATUS.md
git commit -m "feat(excel): SVG charts and the Insert tab" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
