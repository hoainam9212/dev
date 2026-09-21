### Task 4: Hai mươi lăm hàm (`functions.ts`)

Đọc `00-overview.md` trước. Task 3 cho `CellValue`, `EvalContext`, `ERR`, `isErr` và quy tắc cưỡng ép kiểu.

**Files:**
- Tạo: `shared/src/formula/functions.ts`, `shared/src/formula/functions.test.ts`
- Sửa: `shared/src/formula/evaluate.ts` (nhánh `call` gọi bảng hàm thay vì luôn trả `#NAME?`), `shared/src/formula/index.ts`

**Interfaces — Produces:**

```ts
/** Đối số đã tính. Vùng giữ nguyên dạng danh sách để SUM/COUNTIF dùng được. */
export type Arg = { a: 'value'; v: CellValue } | { a: 'range'; values: CellValue[] };
export type FormulaFn = (args: Arg[], ctx: EvalContext) => CellValue;
export const FUNCTIONS: Record<string, FormulaFn>;
/** Khớp một giá trị với điều kiện kiểu ">5", "<=10", "<>x", "Nam", 5. */
export function matchCriteria(value: CellValue, criteria: CellValue): boolean;
```

`IF`, `AND`, `OR` vẫn nhận đối số **đã tính** (không lười) — đủ dùng cho bài học và giữ trình tính đơn giản; hệ quả là `=IF(A1=0,0,10/A1)` khi `A1=0` trả `#DIV/0!` chứ không trả 0. Ghi câu này vào `STATUS.md` và **không dùng mẫu đó trong bài học**.

Danh sách đủ 25 hàm: `SUM AVERAGE MIN MAX COUNT COUNTA ROUND ABS IF AND OR SUMIF COUNTIF AVERAGEIF VLOOKUP LEFT RIGHT MID LEN UPPER LOWER PROPER TRIM CONCAT TODAY`.

- [ ] **Step 1: Viết test FAIL** — `shared/src/formula/functions.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { evaluateFormula, newContext } from './evaluate';
import type { CellSource } from './types';

function source(cells: Record<string, string>): CellSource {
  return {
    raw(_sheet, row, col) {
      const name = String.fromCharCode(65 + col) + String(row + 1);
      return cells[name] ?? null;
    },
  };
}
const calc = (cells: Record<string, string>, f: string, now = 0) =>
  evaluateFormula(newContext(source(cells), 'Sheet1', now), f);

const NUMS = { A1: '10', A2: '20', A3: '', A4: 'chữ', A5: '30' };

describe('hàm gộp số', () => {
  it('SUM AVERAGE MIN MAX bỏ qua ô trống và ô chữ', () => {
    expect(calc(NUMS, '=SUM(A1:A5)')).toBe(60);
    expect(calc(NUMS, '=AVERAGE(A1:A5)')).toBe(20);
    expect(calc(NUMS, '=MIN(A1:A5)')).toBe(10);
    expect(calc(NUMS, '=MAX(A1:A5)')).toBe(30);
  });

  it('COUNT đếm số, COUNTA đếm ô không trống', () => {
    expect(calc(NUMS, '=COUNT(A1:A5)')).toBe(3);
    expect(calc(NUMS, '=COUNTA(A1:A5)')).toBe(4);
  });

  it('SUM nhận cả số rời và nhiều vùng', () => {
    expect(calc({ A1: '1', B1: '2' }, '=SUM(A1,B1,7)')).toBe(10);
  });

  it('AVERAGE trên vùng không có số là #DIV/0!', () => {
    expect(calc({ A1: 'x' }, '=AVERAGE(A1:A2)')).toEqual({ err: '#DIV/0!' });
  });

  it('ROUND và ABS', () => {
    expect(calc({}, '=ROUND(3.14159,2)')).toBe(3.14);
    expect(calc({}, '=ROUND(2.5,0)')).toBe(3);
    expect(calc({}, '=ABS(-7)')).toBe(7);
  });
});

describe('hàm điều kiện', () => {
  it('IF chọn nhánh theo điều kiện', () => {
    expect(calc({ A1: '8' }, '=IF(A1>=5,"Đạt","Chưa đạt")')).toBe('Đạt');
    expect(calc({ A1: '3' }, '=IF(A1>=5,"Đạt","Chưa đạt")')).toBe('Chưa đạt');
  });

  it('IF thiếu nhánh sai trả FALSE', () => {
    expect(calc({ A1: '1' }, '=IF(A1>5,"x")')).toBe(false);
  });

  it('AND và OR', () => {
    expect(calc({ A1: '8' }, '=AND(A1>5,A1<10)')).toBe(true);
    expect(calc({ A1: '2' }, '=OR(A1>5,A1=2)')).toBe(true);
  });
});

describe('cộng và đếm có điều kiện', () => {
  const T = { A1: 'Nam', A2: 'Nữ', A3: 'Nam', B1: '5', B2: '7', B3: '9' };

  it('COUNTIF đếm theo chữ và theo phép so sánh', () => {
    expect(calc(T, '=COUNTIF(A1:A3,"Nam")')).toBe(2);
    expect(calc(T, '=COUNTIF(B1:B3,">6")')).toBe(2);
  });

  it('SUMIF và AVERAGEIF cộng theo vùng khác', () => {
    expect(calc(T, '=SUMIF(A1:A3,"Nam",B1:B3)')).toBe(14);
    expect(calc(T, '=AVERAGEIF(A1:A3,"Nam",B1:B3)')).toBe(7);
  });

  it('SUMIF không có vùng cộng thì cộng chính vùng điều kiện', () => {
    expect(calc(T, '=SUMIF(B1:B3,">6")')).toBe(16);
  });
});

describe('VLOOKUP', () => {
  const T = { D1: 'A', E1: 'Giỏi', D2: 'B', E2: 'Khá', D3: 'C', E3: 'Trung bình', A1: 'B' };

  it('tra đúng giá trị khi khớp chính xác', () => {
    expect(calc(T, '=VLOOKUP(A1,D1:E3,2,FALSE)')).toBe('Khá');
  });

  it('không thấy thì #N/A', () => {
    expect(calc({ ...T, A1: 'Z' }, '=VLOOKUP(A1,D1:E3,2,FALSE)')).toEqual({ err: '#N/A' });
  });

  it('cột vượt bề rộng vùng là #REF!', () => {
    expect(calc(T, '=VLOOKUP(A1,D1:E3,5,FALSE)')).toEqual({ err: '#REF!' });
  });
});

describe('hàm chữ', () => {
  it('cắt, đo và đổi hoa thường', () => {
    expect(calc({ A1: 'Nguyễn Văn Nam' }, '=LEFT(A1,6)')).toBe('Nguyễn');
    expect(calc({ A1: 'Nguyễn Văn Nam' }, '=RIGHT(A1,3)')).toBe('Nam');
    expect(calc({ A1: 'Nguyễn Văn Nam' }, '=MID(A1,8,3)')).toBe('Văn');
    expect(calc({ A1: 'Nam' }, '=LEN(A1)')).toBe(3);
    expect(calc({ A1: 'nam' }, '=UPPER(A1)')).toBe('NAM');
    expect(calc({ A1: 'NAM' }, '=LOWER(A1)')).toBe('nam');
    expect(calc({ A1: 'nguyễn văn nam' }, '=PROPER(A1)')).toBe('Nguyễn Văn Nam');
    expect(calc({ A1: '  Nam  ' }, '=TRIM(A1)')).toBe('Nam');
    expect(calc({ A1: 'Nguyễn', B1: 'Nam' }, '=CONCAT(A1," ",B1)')).toBe('Nguyễn Nam');
  });
});

describe('TODAY', () => {
  it('lấy ngày từ ngữ cảnh, không từ đồng hồ máy', () => {
    const t = Date.UTC(2026, 0, 15);
    expect(calc({}, '=TODAY()', t)).toBe('15/01/2026');
  });
});

describe('sai số đối số', () => {
  it('thiếu hoặc thừa đối số là #VALUE!', () => {
    expect(calc({}, '=ROUND(1)')).toEqual({ err: '#VALUE!' });
    expect(calc({}, '=LEN()')).toEqual({ err: '#VALUE!' });
  });
});
```

- [ ] **Step 2: Chạy, xác nhận FAIL** — `npm test -w shared -- functions`

- [ ] **Step 3: Viết `functions.ts` và cắm vào `evaluate.ts`**

Chỗ dễ sai: `evaluate` phải truyền **vùng còn nguyên dạng danh sách** (`{ a: 'range' }`) chứ không ép về một giá trị, nếu không `SUM(A1:A5)` sẽ chỉ lấy ô đầu. `COUNT` chỉ đếm `typeof v === 'number'`. Lỗi trong vùng: `SUM` lan truyền lỗi (gặp ô lỗi thì cả phép cộng là lỗi đó). `TODAY` trả **chuỗi ngày `dd/mm/yyyy`** — đơn giản và đọc được ngay, ta không có kiểu ngày riêng.

- [ ] **Step 4: Chạy, xác nhận PASS** — `npm test -w shared -- functions`, rồi `npm test -w shared && npm run typecheck`

- [ ] **Step 5: Ghi vào `STATUS.md`** dòng task 4, kèm quyết định "IF tính sẵn cả hai nhánh".

- [ ] **Step 6: Commit**

```bash
git add shared/src/formula docs/superpowers/plans/2026-09-21-phase4a-excel/STATUS.md
git commit -m "feat(formula): the 25 spreadsheet functions" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
