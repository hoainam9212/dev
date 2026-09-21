### Task 10: Lưới, thanh công thức và bàn phím (client)

Đọc `00-overview.md` trước. **Task giao diện — bắt buộc kiểm tra trên trình duyệt trong chính task này.**

**Files:**
- Tạo: `client/src/sims/excel/ExcelSim.tsx`, `client/src/sims/excel/Grid.tsx`, `client/src/sims/excel/FormulaBar.tsx`, `client/src/sims/excel/ExcelSim.test.tsx`
- Sửa: `client/src/sims/registry.ts` (thêm `excel`), `client/src/styles/theme.css` (lớp `.cellbox`, `.gridhead` — **đặt trong `@layer components`**, xem bất biến bên dưới)

**Interfaces — Consumes:** `excelSim.reduceExcel`, `excelInitial`, `cellText`, `cellRaw`, `formatOf`, `mergedAt`; `formula.displayValue`, `defaultAlign`, `colToName`, `looksLikeForgottenEquals`, `explainError`.

**Interfaces — Produces:**

```tsx
export function ExcelSim(props: SimProps<WorkbookState>): JSX.Element;  // theo client/src/sims/types.ts
```

**Bất biến bắt buộc:**
1. State **chỉ** nằm trong `useReducer(excelSim.reduceExcel, initial)`; `onState(state)` gọi mỗi khi state đổi. Không có `useState` cho dữ liệu ô.
2. Lớp CSS dùng chung phải nằm trong `@layer components` của `theme.css` — CSS không phân lớp thắng `@layer utilities`, và đó đúng là lỗi "không chọn được gì" ở màn hình chào hồi 2026-09-21. `client/src/styles/theme.test.ts` canh chuyện này.
3. Lưới chỉ dựng phần nhìn thấy (cửa sổ ~20 hàng × 12 cột quanh vùng chọn) — 1.300 ô DOM làm cuộn giật.
4. `SpotlightOverlay` hỏi lại vị trí mỗi 250 ms; với lưới cuộn được, gợi ý bậc 2 trỏ vào ô có thể lệch. Nếu thấy lệch thì **ghi vào `STATUS.md`**, đừng sửa `SpotlightOverlay` trong task này.

Bàn phím: mũi tên (di chuyển), Shift+mũi tên (mở rộng), Enter (ghi và xuống), Tab (ghi và sang phải), F2 hoặc gõ ký tự (bắt đầu sửa), Delete (xoá vùng), Escape (bỏ sửa), Ctrl+C / Ctrl+V, Ctrl+Z.

- [ ] **Step 1: Viết test FAIL** — `client/src/sims/excel/ExcelSim.test.tsx`

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { excelSim } from '@office-neko/shared';
import { ExcelSim } from './ExcelSim';

const initial = excelSim.excelInitial({ cells: { A1: 'Họ tên', B1: '10', B2: '20' } });

describe('ExcelSim', () => {
  it('hiện chữ trong ô và tên cột', () => {
    render(<ExcelSim initial={initial} onState={() => {}} />);
    expect(screen.getByText('Họ tên')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('bấm vào ô thì Name Box đổi theo', () => {
    render(<ExcelSim initial={initial} onState={() => {}} />);
    fireEvent.click(screen.getByTestId('cell-B2'));
    expect(screen.getByTestId('name-box')).toHaveValue('B2');
  });

  it('gõ công thức rồi Enter thì ô hiện kết quả và báo state ra ngoài', () => {
    const onState = vi.fn();
    render(<ExcelSim initial={initial} onState={onState} />);
    fireEvent.click(screen.getByTestId('cell-B3'));
    fireEvent.change(screen.getByTestId('formula-input'), { target: { value: '=SUM(B1:B2)' } });
    fireEvent.keyDown(screen.getByTestId('grid'), { key: 'Enter' });
    expect(screen.getByTestId('cell-B3')).toHaveTextContent('30');
    const last = onState.mock.calls.at(-1)![0] as excelSim.WorkbookState;
    expect(excelSim.cellRaw(last, 'B3')).toBe('=SUM(B1:B2)');
  });

  it('thanh công thức hiện CÔNG THỨC còn ô hiện kết quả', () => {
    const s = excelSim.reduceExcel(initial, { type: 'setCell', cell: 'B3', raw: '=B1+B2' });
    render(<ExcelSim initial={s} onState={() => {}} />);
    fireEvent.click(screen.getByTestId('cell-B3'));
    expect(screen.getByTestId('formula-input')).toHaveValue('=B1+B2');
    expect(screen.getByTestId('cell-B3')).toHaveTextContent('30');
  });

  it('mũi tên di chuyển ô đang chọn', () => {
    render(<ExcelSim initial={initial} onState={() => {}} />);
    fireEvent.click(screen.getByTestId('cell-A1'));
    fireEvent.keyDown(screen.getByTestId('grid'), { key: 'ArrowDown' });
    expect(screen.getByTestId('name-box')).toHaveValue('A2');
  });

  it('nhắc nhẹ khi quên dấu bằng', () => {
    const s = excelSim.reduceExcel(initial, { type: 'setCell', cell: 'C1', raw: 'SUM(B1:B2)' });
    render(<ExcelSim initial={s} onState={() => {}} />);
    fireEvent.click(screen.getByTestId('cell-C1'));
    expect(screen.getByText(/quên dấu =/i)).toBeInTheDocument();
  });

  it('ô lỗi hiện mã lỗi kèm lời giải thích tiếng Việt', () => {
    const s = excelSim.reduceExcel(initial, { type: 'setCell', cell: 'C1', raw: '=1/0' });
    render(<ExcelSim initial={s} onState={() => {}} />);
    expect(screen.getByTestId('cell-C1')).toHaveTextContent('#DIV/0!');
    fireEvent.click(screen.getByTestId('cell-C1'));
    expect(screen.getByText(/chia/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Chạy, xác nhận FAIL** — `npm test -w client -- ExcelSim`

- [ ] **Step 3: Viết `ExcelSim.tsx`, `Grid.tsx`, `FormulaBar.tsx`**

Mỗi ô có `data-testid="cell-B2"`. Ô đang chọn viền đậm; vùng chọn nền nhạt. Ô hiện `displayValue(cellValue, formatOf)`; căn lề lấy `fmt.align ?? defaultAlign(value)`.

- [ ] **Step 4: Chạy, xác nhận PASS** — `npm test -w client -- ExcelSim`

- [ ] **Step 5: Đăng ký sim và mở đường thử tạm**

`registry.ts`: `excel: { kind: 'excel', Component: ExcelSim, reduce: excelSim.reduceExcel }`. Thêm route tạm `/dev/excel` để thử tay — **Task 12 phải xoá route này**, ghi ngay vào `STATUS.md`.

- [ ] **Step 6: Kiểm tra trên trình duyệt** (bắt buộc)

Mở preview `office-neko` → `/dev/excel`. Làm đủ: (a) bấm ô, gõ `10`, Enter — con trỏ xuống ô dưới; (b) gõ `=A1*2` — hiện kết quả, thanh công thức hiện công thức; (c) mũi tên và Shift+mũi tên; (d) Ctrl+Z; (e) gõ `SUM(A1:A2)` không có dấu `=` — thấy câu nhắc; (f) cuộn xuống hàng 40 rồi bấm một ô, xem địa chỉ có đúng không. Console phải sạch.

- [ ] **Step 7: Commit**

```bash
git add client/src docs/superpowers/plans/2026-09-21-phase4a-excel/STATUS.md
git commit -m "feat(excel): grid, formula bar and keyboard navigation" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
