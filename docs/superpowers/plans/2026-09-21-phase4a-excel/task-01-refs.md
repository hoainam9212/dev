### Task 1: Địa chỉ ô (`refs.ts`)

Nền của mọi thứ còn lại. Đọc `00-overview.md` trước.

**Files:**
- Tạo: `shared/src/formula/refs.ts`, `shared/src/formula/refs.test.ts`, `shared/src/formula/index.ts`
- Sửa: `shared/src/index.ts` (thêm `export * as formula from './formula';`)
- Tạo branch: `git checkout -b feat/phase4a-excel`

**Interfaces — Produces:**

```ts
/** Một ô đã phân tích. row/col đếm từ 0. `absRow`/`absCol` là dấu $. */
export interface Ref { sheet?: string; row: number; col: number; absRow: boolean; absCol: boolean }
/** Vùng chữ nhật, hai đầu đã chuẩn hoá: from luôn ở trên-trái. */
export interface Range { sheet?: string; from: { row: number; col: number }; to: { row: number; col: number } }

export function colToName(col: number): string;        // 0 -> 'A', 25 -> 'Z', 26 -> 'AA'
export function nameToCol(name: string): number;       // 'A' -> 0, 'AA' -> 26
export function parseRef(text: string): Ref | null;    // 'B2', '$A$1', 'Sheet2!A1'
export function formatRef(ref: Ref): string;           // Ref -> 'B2', '$A$1'
export function parseRange(text: string): Range | null;// 'B2:B10', 'A1' (một ô cũng là vùng 1x1)
export function formatRange(r: Range): string;
export function cellsOf(r: Range): { row: number; col: number }[];
export function inRange(r: Range, row: number, col: number): boolean;
/** Dịch mọi địa chỉ TƯƠNG ĐỐI trong một công thức đi (dRow, dCol) ô. Địa chỉ có $ giữ nguyên. */
export function shiftFormula(formula: string, dRow: number, dCol: number): string;
export const MAX_ROWS = 50;
export const MAX_COLS = 26;
```

`shiftFormula` làm việc bằng biểu thức chính quy trên chữ, **không** cần AST — nhờ vậy Task 7 (copy/fill) không phụ thuộc Task 2. Ra ngoài lưới thì trả `#REF!` ngay trong chuỗi.

- [ ] **Step 1: Viết test FAIL** — `shared/src/formula/refs.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { cellsOf, colToName, formatRef, nameToCol, parseRange, parseRef, shiftFormula } from './refs';

describe('tên cột', () => {
  it('đổi qua lại giữa số và chữ', () => {
    expect(colToName(0)).toBe('A');
    expect(colToName(25)).toBe('Z');
    expect(colToName(26)).toBe('AA');
    expect(nameToCol('A')).toBe(0);
    expect(nameToCol('aa')).toBe(26);
  });
});

describe('địa chỉ ô', () => {
  it('đọc địa chỉ thường, có $ và có tên sheet', () => {
    expect(parseRef('B2')).toEqual({ row: 1, col: 1, absRow: false, absCol: false });
    expect(parseRef('$A$1')).toEqual({ row: 0, col: 0, absRow: true, absCol: true });
    expect(parseRef('A$1')).toEqual({ row: 0, col: 0, absRow: true, absCol: false });
    expect(parseRef('Sheet2!C3')).toEqual({ sheet: 'Sheet2', row: 2, col: 2, absRow: false, absCol: false });
  });

  it('từ chối chữ không phải địa chỉ', () => {
    expect(parseRef('SUM')).toBeNull();
    expect(parseRef('A0')).toBeNull();
    expect(parseRef('')).toBeNull();
  });

  it('viết lại đúng như người dùng gõ', () => {
    expect(formatRef({ row: 1, col: 1, absRow: false, absCol: false })).toBe('B2');
    expect(formatRef({ row: 0, col: 0, absRow: true, absCol: true })).toBe('$A$1');
  });
});

describe('vùng', () => {
  it('đọc vùng và liệt kê ô theo hàng', () => {
    const r = parseRange('B2:C3');
    expect(r).not.toBeNull();
    expect(cellsOf(r!)).toEqual([
      { row: 1, col: 1 }, { row: 1, col: 2 },
      { row: 2, col: 1 }, { row: 2, col: 2 },
    ]);
  });

  it('chuẩn hoá vùng gõ ngược', () => {
    expect(parseRange('C3:B2')).toEqual(parseRange('B2:C3'));
  });

  it('coi một ô là vùng 1x1', () => {
    expect(cellsOf(parseRange('A1')!)).toEqual([{ row: 0, col: 0 }]);
  });
});

describe('dịch địa chỉ khi copy', () => {
  it('dịch địa chỉ tương đối, giữ nguyên địa chỉ có $', () => {
    expect(shiftFormula('=A1+B1', 1, 0)).toBe('=A2+B2');
    expect(shiftFormula('=$A$1*B1', 2, 0)).toBe('=$A$1*B3');
    expect(shiftFormula('=A$1+$B2', 1, 1)).toBe('=B$1+$B3');
  });

  it('dịch cả hai đầu của vùng', () => {
    expect(shiftFormula('=SUM(B2:B5)', 0, 1)).toBe('=SUM(C2:C5)');
  });

  it('trả #REF! khi trôi ra ngoài lưới', () => {
    expect(shiftFormula('=A1', -1, 0)).toBe('=#REF!');
  });

  it('không đụng vào chữ trong dấu nháy và tên hàm', () => {
    expect(shiftFormula('=IF(A1>0,"B1 tốt","B1 xấu")', 1, 0)).toBe('=IF(A2>0,"B1 tốt","B1 xấu")');
  });
});
```

- [ ] **Step 2: Chạy, xác nhận FAIL vì thiếu module**

`npm test -w shared -- refs` → FAIL "Cannot find module './refs'".

- [ ] **Step 3: Viết `refs.ts` tối thiểu cho các test trên**

Gợi ý những chỗ dễ sai: `nameToCol` phải không phân biệt hoa thường; `parseRef` chỉ nhận hàng ≥ 1; `shiftFormula` quét bằng một regex có nhánh chuỗi (`"[^"]*"`) đứng TRƯỚC nhánh địa chỉ, để bỏ qua nội dung trong nháy kép; nhánh địa chỉ phải khớp cả dạng `$A$1` và `Sheet2!A1`.

- [ ] **Step 4: Chạy, xác nhận PASS**

`npm test -w shared -- refs` → PASS. Rồi `npm test -w shared && npm run typecheck`.

- [ ] **Step 5: Gom export**

`shared/src/formula/index.ts` re-export `./refs`; `shared/src/index.ts` thêm `export * as formula from './formula';`.

- [ ] **Step 6: Commit**

```bash
git add shared/src/formula shared/src/index.ts docs/superpowers/plans/2026-09-21-phase4a-excel/STATUS.md
git commit -m "feat(formula): cell references, ranges and copy shifting" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
