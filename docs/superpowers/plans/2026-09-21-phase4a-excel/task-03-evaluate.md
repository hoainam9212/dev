### Task 3: Trình tính (`evaluate.ts`)

Đọc `00-overview.md` trước. Task 1 cho `refs`, Task 2 cho `parse`/`Ast`.

**Files:**
- Tạo: `shared/src/formula/evaluate.ts`, `shared/src/formula/evaluate.test.ts`, `shared/src/formula/types.ts`
- Sửa: `shared/src/formula/index.ts`

**Interfaces — Produces:**

```ts
// types.ts
export type ErrCode = '#DIV/0!' | '#N/A' | '#REF!' | '#NAME?' | '#VALUE!' | '#CIRC!';
export interface FormulaError { err: ErrCode }
export type CellValue = number | string | boolean | FormulaError;
export function isErr(v: CellValue): v is FormulaError;
export const ERR: (code: ErrCode) => FormulaError;

export interface CellSource { raw(sheet: string, row: number, col: number): string | null }
export interface EvalContext {
  src: CellSource;
  sheet: string;        // sheet hiện hành, dùng cho địa chỉ không ghi tên sheet
  now: number;          // mốc thời gian cho TODAY(); KHÔNG gọi Date.now() trong lõi
  memo: Map<string, CellValue>;
  visiting: Set<string>;
}
export function newContext(src: CellSource, sheet: string, now: number): EvalContext;

// evaluate.ts
export function evaluateCell(ctx: EvalContext, sheet: string, row: number, col: number): CellValue;
/** Tính một công thức rời (chữ có hoặc không có dấu = đứng đầu). */
export function evaluateFormula(ctx: EvalContext, text: string): CellValue;
/** Ô chứa gì: số, chữ, hay công thức. Dùng chung cho cả giao diện. */
export function readRaw(raw: string | null): { kind: 'blank' } | { kind: 'number'; v: number } | { kind: 'text'; v: string } | { kind: 'formula'; src: string };
```

Task này **không** cài hàm nào: nhánh `call` luôn trả `#NAME?`, Task 4 sẽ cắm bảng hàm vào. Test dưới đây chỉ dùng toán tử và tham chiếu.

**Quy tắc cưỡng ép kiểu** (trùng Excel, Task 4 dùng lại):
- Ô trống trong phép tính số = `0`; trong phép nối chuỗi = `""`.
- Chuỗi không phải số mà gặp toán tử số → `#VALUE!`.
- `TRUE` = 1, `FALSE` = 0 khi tính số.
- Lỗi lan truyền: toán hạng nào là lỗi thì kết quả là chính lỗi đó.
- So sánh chuỗi không phân biệt hoa thường, so sánh theo thứ tự chữ cái.

- [ ] **Step 1: Viết test FAIL** — `shared/src/formula/evaluate.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { evaluateCell, evaluateFormula, newContext, readRaw } from './evaluate';
import type { CellSource } from './types';

/** Nguồn ô từ một bảng A1 -> chữ gõ vào. */
function source(cells: Record<string, string>): CellSource {
  return {
    raw(_sheet, row, col) {
      const name = String.fromCharCode(65 + col) + String(row + 1);
      return cells[name] ?? null;
    },
  };
}
const ctx = (cells: Record<string, string>) => newContext(source(cells), 'Sheet1', 0);
const calc = (cells: Record<string, string>, f: string) => evaluateFormula(ctx(cells), f);

describe('đọc nội dung ô', () => {
  it('phân biệt trống, số, chữ và công thức', () => {
    expect(readRaw(null)).toEqual({ kind: 'blank' });
    expect(readRaw('')).toEqual({ kind: 'blank' });
    expect(readRaw('120000')).toEqual({ kind: 'number', v: 120000 });
    expect(readRaw('Nam')).toEqual({ kind: 'text', v: 'Nam' });
    expect(readRaw('=A1+1')).toEqual({ kind: 'formula', src: 'A1+1' });
  });
});

describe('phép tính', () => {
  it('tính số học theo đúng ưu tiên', () => {
    expect(calc({}, '=1+2*3')).toBe(7);
    expect(calc({}, '=(1+2)*3')).toBe(9);
    expect(calc({}, '=2^3')).toBe(8);
    expect(calc({}, '=-3+1')).toBe(-2);
    expect(calc({}, '=200*20%')).toBe(40);
  });

  it('nối chuỗi và so sánh', () => {
    expect(calc({ A1: 'Nguyễn', B1: 'Nam' }, '=A1&" "&B1')).toBe('Nguyễn Nam');
    expect(calc({ A1: '5' }, '=A1>3')).toBe(true);
    expect(calc({ A1: 'abc' }, '=A1="ABC"')).toBe(true);
    expect(calc({ A1: '5' }, '=A1<>5')).toBe(false);
  });

  it('đọc giá trị ô và ô trống là 0', () => {
    expect(calc({ A1: '10', A2: '5' }, '=A1-A2')).toBe(5);
    expect(calc({ A1: '10' }, '=A1+B9')).toBe(10);
    expect(calc({ A1: '10' }, '=A1&B9')).toBe('10');
  });

  it('đi theo chuỗi công thức nhiều tầng', () => {
    const c = ctx({ A1: '2', A2: '=A1*3', A3: '=A2+1' });
    expect(evaluateCell(c, 'Sheet1', 2, 0)).toBe(7);
  });

  it('nhớ kết quả đã tính trong cùng một lượt', () => {
    const c = ctx({ A1: '2', A2: '=A1*3' });
    evaluateCell(c, 'Sheet1', 1, 0);
    expect(c.memo.size).toBeGreaterThan(0);
  });
});

describe('lỗi', () => {
  it('chia cho không', () => {
    expect(calc({ A1: '0' }, '=10/A1')).toEqual({ err: '#DIV/0!' });
  });

  it('chữ gặp toán tử số', () => {
    expect(calc({ A1: 'Nam' }, '=A1+1')).toEqual({ err: '#VALUE!' });
  });

  it('tên hàm không biết', () => {
    expect(calc({}, '=XYZ(1)')).toEqual({ err: '#NAME?' });
  });

  it('cú pháp sai thành #NAME? chứ không ném ra ngoài', () => {
    expect(calc({}, '=1+')).toEqual({ err: '#NAME?' });
  });

  it('lan truyền lỗi lên công thức cha', () => {
    expect(calc({ A1: '=1/0' }, '=A1+5')).toEqual({ err: '#DIV/0!' });
  });

  it('bắt tham chiếu vòng, cả vòng gián tiếp', () => {
    const c1 = ctx({ A1: '=A1+1' });
    expect(evaluateCell(c1, 'Sheet1', 0, 0)).toEqual({ err: '#CIRC!' });
    const c2 = ctx({ A1: '=B1', B1: '=A1' });
    expect(evaluateCell(c2, 'Sheet1', 0, 0)).toEqual({ err: '#CIRC!' });
  });

  it('địa chỉ ngoài lưới là #REF!', () => {
    expect(calc({}, '=#REF!+1')).toEqual({ err: '#REF!' });
  });
});
```

- [ ] **Step 2: Chạy, xác nhận FAIL** — `npm test -w shared -- evaluate`

- [ ] **Step 3: Viết `types.ts` rồi `evaluate.ts`**

Chỗ dễ sai: `visiting` phải **xoá khoá ra** sau khi tính xong ô đó, nếu không hai ô cùng trỏ vào một ô thứ ba sẽ bị báo nhầm là vòng. Ném `ParseError` từ Task 2 phải bắt lại và đổi thành `#NAME?`, không cho lọt ra ngoài — giao diện không được phép sập vì học sinh gõ sai.

- [ ] **Step 4: Chạy, xác nhận PASS** — `npm test -w shared -- evaluate`, rồi `npm test -w shared && npm run typecheck`

- [ ] **Step 5: Commit**

```bash
git add shared/src/formula docs/superpowers/plans/2026-09-21-phase4a-excel/STATUS.md
git commit -m "feat(formula): evaluator with coercion, errors and circular detection" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
