### Task 11: Ribbon Home và thanh sheet (client)

Đọc `00-overview.md` trước. **Task giao diện — bắt buộc kiểm tra trên trình duyệt trong chính task này.**

**Files:**
- Tạo: `client/src/sims/excel/RibbonHome.tsx`, `client/src/sims/excel/SheetTabs.tsx`, `client/src/sims/excel/RibbonHome.test.tsx`
- Sửa: `client/src/sims/excel/ExcelSim.tsx` (lắp ribbon + thanh sheet), `client/src/content/help-ids.ts`

**Interfaces — Consumes:** `ExcelAction` (Task 6–8), `HELP_IDS`.

**Interfaces — Produces:**

```tsx
export function RibbonHome(props: { state: WorkbookState; dispatch: (a: ExcelAction) => void }): JSX.Element;
export function SheetTabs(props: { state: WorkbookState; dispatch: (a: ExcelAction) => void }): JSX.Element;
```

Nút trên ribbon Home, mỗi nút một `helpId` mới trong `HELP_IDS`:

| Nhóm | Nút | Action |
|---|---|---|
| Hoàn tác | Hoàn tác | `undo` |
| Clipboard | Copy, Dán | `copy`, `paste` |
| Chữ | **B**, *I*, màu chữ, màu nền | `setFormat` |
| Căn lề | Trái / Giữa / Phải | `setFormat { align }` |
| Gộp | Merge | `merge` |
| Số | General, Number, **Tiền VNĐ**, Phần trăm, Ngày; thêm/bớt số lẻ | `setFormat { numFmt }`, `setFormat { decimals }` |
| Ô | Viền (không / tất cả / ngoài) | `setFormat { border }` |
| Sửa | Fill xuống, Fill phải, Xoá | `fillDown`, `fillRight`, `clear` |

`SheetTabs`: danh sách tab sheet, bấm để chuyển, nút `+` thêm sheet, bấm đúp để đổi tên.

- [ ] **Step 1: Viết test FAIL** — `client/src/sims/excel/RibbonHome.test.tsx`

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { excelSim } from '@office-neko/shared';
import { RibbonHome } from './RibbonHome';
import { SheetTabs } from './SheetTabs';
import { HELP_IDS } from '../../content/help-ids';

const state = excelSim.excelInitial({ cells: { B2: '7500000' } });

describe('Ribbon Home', () => {
  it('bấm Tiền VNĐ thì phát đúng action', () => {
    const dispatch = vi.fn();
    render(<RibbonHome state={state} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: /tiền vnđ/i }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setFormat', fmt: { numFmt: 'currencyVnd' } });
  });

  it('bấm B phát định dạng đậm', () => {
    const dispatch = vi.fn();
    render(<RibbonHome state={state} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: /^bold/i }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setFormat', fmt: { bold: true } });
  });

  it('bấm Merge và Fill xuống', () => {
    const dispatch = vi.fn();
    render(<RibbonHome state={state} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: /merge/i }));
    fireEvent.click(screen.getByRole('button', { name: /fill xuống/i }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'merge' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'fillDown' });
  });

  it('mọi nút đều có helpId đã khai báo', () => {
    render(<RibbonHome state={state} dispatch={() => {}} />);
    for (const btn of screen.getAllByRole('button')) {
      const id = btn.getAttribute('data-help-id');
      expect(id, btn.textContent ?? '').toBeTruthy();
      expect(HELP_IDS, id!).toHaveProperty(id!);
    }
  });
});

describe('Thanh sheet', () => {
  it('hiện tên sheet và chuyển được', () => {
    const dispatch = vi.fn();
    const two = excelSim.excelInitial({ sheets: ['Sheet1', 'Bảng tra'] });
    render(<SheetTabs state={two} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: 'Bảng tra' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'switchSheet', index: 1 });
  });

  it('nút + thêm sheet', () => {
    const dispatch = vi.fn();
    render(<SheetTabs state={state} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: /thêm sheet/i }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'addSheet' });
  });
});
```

- [ ] **Step 2: Chạy, xác nhận FAIL** — `npm test -w client -- RibbonHome`

- [ ] **Step 3: Viết `RibbonHome.tsx`, `SheetTabs.tsx`, thêm `helpId` vào `help-ids.ts`**

Nút định dạng bật/tắt (B, I) phải **nhìn thấy trạng thái hiện tại** của ô đang chọn: nút sáng khi ô đang đậm, và bấm lần nữa thì gửi `{ bold: false }`.

- [ ] **Step 4: Chạy, xác nhận PASS** — `npm test -w client && npm run typecheck`

- [ ] **Step 5: Kiểm tra trên trình duyệt** (bắt buộc)

`/dev/excel`: (a) gõ `7500000` rồi bấm Tiền VNĐ — thấy `7.500.000 ₫`; (b) chọn A1:C1, bấm Merge — ô gộp lại; (c) B, I, màu nền; (d) chọn C1:C4 có công thức ở C1, bấm Fill xuống — địa chỉ tự dịch; (e) thêm sheet, đổi tên, gõ `=Sheet1!A1` từ sheet mới; (f) Hoàn tác. Console sạch.

- [ ] **Step 6: Commit**

```bash
git add client/src docs/superpowers/plans/2026-09-21-phase4a-excel/STATUS.md
git commit -m "feat(excel): Home ribbon and sheet tabs" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
