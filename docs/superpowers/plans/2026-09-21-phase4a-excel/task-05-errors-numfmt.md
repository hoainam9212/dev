### Task 5: Lỗi nói tiếng Việt và hiển thị số (`errors.ts`, `numfmt.ts`)

Đọc `00-overview.md` trước. Task 3 cho `CellValue`, `ErrCode`, `isErr`.

Đây là task khiến bảng tính **dạy được** thay vì chỉ chạy được: người mới nhìn `#VALUE!` thì chịu, nhìn câu tiếng Việt thì sửa được.

**Files:**
- Tạo: `shared/src/formula/errors.ts`, `shared/src/formula/errors.test.ts`, `shared/src/formula/numfmt.ts`, `shared/src/formula/numfmt.test.ts`
- Sửa: `shared/src/formula/index.ts`

**Interfaces — Produces:**

```ts
// errors.ts
export function explainError(code: ErrCode): { what: string; fix: string };
/** True khi ô là chữ nhưng trông y hệt công thức thiếu dấu =, ví dụ "SUM(A1:A5)". */
export function looksLikeForgottenEquals(raw: string): boolean;

// numfmt.ts  — CellFormat định nghĩa tại đây, Task 6 import lại
export interface CellFormat {
  numFmt?: 'general' | 'number' | 'currencyVnd' | 'percent' | 'date';
  decimals?: number;
  bold?: boolean; italic?: boolean;
  color?: string; fill?: string;
  align?: 'left' | 'center' | 'right';
  border?: 'none' | 'all' | 'outer';
}
/** Giá trị đã tính + định dạng -> đúng chữ hiện trong ô. */
export function displayValue(v: CellValue, fmt?: CellFormat): string;
/** Căn lề mặc định của Excel khi người dùng chưa chọn: số phải, chữ trái, lỗi giữa. */
export function defaultAlign(v: CellValue): 'left' | 'center' | 'right';
```

- [ ] **Step 1: Viết test FAIL** — `shared/src/formula/errors.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { explainError, looksLikeForgottenEquals } from './errors';

describe('giải thích lỗi', () => {
  it('có câu cho cả sáu mã lỗi', () => {
    for (const code of ['#DIV/0!', '#N/A', '#REF!', '#NAME?', '#VALUE!', '#CIRC!'] as const) {
      const e = explainError(code);
      expect(e.what.length, code).toBeGreaterThan(10);
      expect(e.fix.length, code).toBeGreaterThan(10);
    }
  });

  it('nói bằng tiếng Việt, không phải chữ Anh nguyên gốc', () => {
    expect(explainError('#DIV/0!').what).toContain('chia');
    expect(explainError('#N/A').what).toContain('không tìm thấy');
    expect(explainError('#NAME?').fix).toContain('tên hàm');
  });
});

describe('quên dấu bằng', () => {
  it('nhận ra công thức thiếu dấu =', () => {
    expect(looksLikeForgottenEquals('SUM(A1:A5)')).toBe(true);
    expect(looksLikeForgottenEquals('A1+B1')).toBe(true);
  });

  it('không báo nhầm với chữ bình thường', () => {
    expect(looksLikeForgottenEquals('Nguyễn Văn Nam')).toBe(false);
    expect(looksLikeForgottenEquals('=SUM(A1:A5)')).toBe(false);
    expect(looksLikeForgottenEquals('120000')).toBe(false);
    expect(looksLikeForgottenEquals('Ca 1')).toBe(false);
  });
});
```

- [ ] **Step 2: Viết test FAIL** — `shared/src/formula/numfmt.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { defaultAlign, displayValue } from './numfmt';

describe('hiển thị giá trị trong ô', () => {
  it('General: số như đã gõ, chữ như đã gõ', () => {
    expect(displayValue(1234.5)).toBe('1234.5');
    expect(displayValue('Nam')).toBe('Nam');
    expect(displayValue(true)).toBe('TRUE');
  });

  it('Number: dấu chấm ngăn nghìn và số lẻ theo yêu cầu', () => {
    expect(displayValue(1234567, { numFmt: 'number' })).toBe('1.234.567');
    expect(displayValue(1234.5, { numFmt: 'number', decimals: 2 })).toBe('1.234,50');
  });

  it('Tiền VNĐ', () => {
    expect(displayValue(7500000, { numFmt: 'currencyVnd' })).toBe('7.500.000 ₫');
  });

  it('Phần trăm', () => {
    expect(displayValue(0.155, { numFmt: 'percent' })).toBe('16%');
    expect(displayValue(0.155, { numFmt: 'percent', decimals: 1 })).toBe('15,5%');
  });

  it('lỗi hiện đúng mã, không bị định dạng số làm méo', () => {
    expect(displayValue({ err: '#DIV/0!' }, { numFmt: 'currencyVnd' })).toBe('#DIV/0!');
  });

  it('ô trống hiện chuỗi rỗng', () => {
    expect(displayValue('')).toBe('');
  });
});

describe('căn lề mặc định', () => {
  it('số phải, chữ trái, lỗi giữa', () => {
    expect(defaultAlign(5)).toBe('right');
    expect(defaultAlign('Nam')).toBe('left');
    expect(defaultAlign({ err: '#N/A' })).toBe('center');
  });
});
```

- [ ] **Step 3: Chạy cả hai, xác nhận FAIL** — `npm test -w shared -- errors numfmt`

- [ ] **Step 4: Viết `errors.ts` và `numfmt.ts`**

Chỗ dễ sai: định dạng Việt Nam dùng **dấu chấm ngăn nghìn, dấu phẩy cho phần lẻ** — ngược với mặc định của `toLocaleString('en')`. Dùng `Intl.NumberFormat('vi-VN', …)` rồi kiểm lại bằng test trên, đừng tự nối chuỗi. `looksLikeForgottenEquals` chỉ true khi chuỗi bắt đầu bằng tên hàm đã biết kèm `(`, hoặc khớp hẳn mẫu "địa chỉ + toán tử + gì đó"; đừng bắt rộng hơn kẻo "Ca 1" cũng bị nhắc.

- [ ] **Step 5: Chạy, xác nhận PASS** — `npm test -w shared && npm run typecheck`

- [ ] **Step 6: Commit**

```bash
git add shared/src/formula docs/superpowers/plans/2026-09-21-phase4a-excel/STATUS.md
git commit -m "feat(formula): Vietnamese error help and number formatting" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
