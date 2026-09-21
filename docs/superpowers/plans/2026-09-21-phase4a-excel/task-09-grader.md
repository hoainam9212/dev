### Task 9: Chấm bài Excel (`grade.ts`)

Đọc `00-overview.md` trước. Task cuối của phần `shared`; từ Task 10 là giao diện.

**Files:**
- Tạo: `shared/src/sims/excel/grade.ts`, `shared/src/sims/excel/grade.test.ts`
- Sửa: `shared/src/grading/index.ts` (thêm `excel: gradeExcel`), `shared/src/sims/excel/index.ts`

**Interfaces — Consumes:** `WorkbookState`, `cellValue`, `cellRaw`, `formatOf` (Task 6–8).

**Interfaces — Produces:**

```ts
export type ExcelCheck =
  | { kind: 'cellValue'; cell: string; value: string | number | boolean; sheet?: string }
  | { kind: 'cellFormula'; cell: string; fn?: string; range?: string; absolute?: boolean; contains?: string; sheet?: string }
  | { kind: 'cellFormat'; cell: string; fmt: Partial<CellFormat>; sheet?: string }
  | { kind: 'merged'; range: string }
  | { kind: 'sheetNamed'; name: string };
export function gradeExcel(state: WorkbookState, checks: ExcelCheck[]): GradeResult;
```

Xem chữ ký `GradeResult` trong `shared/src/grading/core.ts` và làm đúng như `gradeWord` — mỗi check hỏng trả một câu tiếng Việt nói rõ sai ở đâu.

`rangeSorted`, `filterActive` và `chart` là việc của **4B**, đừng làm ở đây.

- [ ] **Step 1: Viết test FAIL** — `shared/src/sims/excel/grade.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { GRADERS } from '../../grading';
import { excelInitial, reduceExcel, type ExcelAction, type WorkbookState } from './state';
import { gradeExcel } from './grade';

const run = (s: WorkbookState, ...as: ExcelAction[]) => as.reduce(reduceExcel, s);

describe('chấm bài Excel', () => {
  it('đã đăng ký vào GRADERS', () => {
    expect(GRADERS.excel).toBeDefined();
  });

  it('cellValue so sánh GIÁ TRỊ đã tính', () => {
    const s = excelInitial({ cells: { A1: '10', A2: '20', A3: '=SUM(A1:A2)' } });
    expect(gradeExcel(s, [{ kind: 'cellValue', cell: 'A3', value: 30 }]).pass).toBe(true);
    expect(gradeExcel(s, [{ kind: 'cellValue', cell: 'A3', value: 31 }]).pass).toBe(false);
  });

  it('cellValue với chữ thì bỏ qua hoa thường và khoảng trắng thừa', () => {
    const s = excelInitial({ cells: { A1: '  Nguyễn Văn Nam ' } });
    expect(gradeExcel(s, [{ kind: 'cellValue', cell: 'A1', value: 'nguyễn văn nam' }]).pass).toBe(true);
  });

  it('cellFormula đòi đúng hàm và đúng vùng', () => {
    const s = excelInitial({ cells: { B5: '=SUM(B1:B4)' } });
    expect(gradeExcel(s, [{ kind: 'cellFormula', cell: 'B5', fn: 'SUM', range: 'B1:B4' }]).pass).toBe(true);
    expect(gradeExcel(s, [{ kind: 'cellFormula', cell: 'B5', fn: 'AVERAGE' }]).pass).toBe(false);
  });

  it('cellFormula bắt được cộng tay thay vì dùng SUM', () => {
    const s = excelInitial({ cells: { B5: '=B1+B2+B3+B4' } });
    const r = gradeExcel(s, [{ kind: 'cellFormula', cell: 'B5', fn: 'SUM' }]);
    expect(r.pass).toBe(false);
    expect(r.messages.join(' ')).toContain('SUM');
  });

  it('absolute đòi có dấu $', () => {
    const yes = excelInitial({ cells: { C2: '=B2*$E$1' } });
    const no = excelInitial({ cells: { C2: '=B2*E1' } });
    expect(gradeExcel(yes, [{ kind: 'cellFormula', cell: 'C2', absolute: true }]).pass).toBe(true);
    expect(gradeExcel(no, [{ kind: 'cellFormula', cell: 'C2', absolute: true }]).pass).toBe(false);
  });

  it('ô chưa có công thức thì báo là chưa có, không nổ', () => {
    const s = excelInitial({ cells: { B5: '30' } });
    const r = gradeExcel(s, [{ kind: 'cellFormula', cell: 'B5', fn: 'SUM' }]);
    expect(r.pass).toBe(false);
    expect(r.messages.join(' ')).toContain('=');
  });

  it('cellFormat chỉ xét những thuộc tính được nêu', () => {
    const s = run(excelInitial({ cells: { B2: '7500000' } }), { type: 'select', cell: 'B2' },
      { type: 'setFormat', fmt: { numFmt: 'currencyVnd', bold: true } });
    expect(gradeExcel(s, [{ kind: 'cellFormat', cell: 'B2', fmt: { numFmt: 'currencyVnd' } }]).pass).toBe(true);
    expect(gradeExcel(s, [{ kind: 'cellFormat', cell: 'B2', fmt: { numFmt: 'percent' } }]).pass).toBe(false);
  });

  it('merged và sheetNamed', () => {
    let s = run(excelInitial(), { type: 'selectRange', range: 'A1:C1' }, { type: 'merge' });
    expect(gradeExcel(s, [{ kind: 'merged', range: 'A1:C1' }]).pass).toBe(true);
    s = reduceExcel(s, { type: 'renameSheet', index: 0, name: 'Bảng lương' });
    expect(gradeExcel(s, [{ kind: 'sheetNamed', name: 'Bảng lương' }]).pass).toBe(true);
  });

  it('check trên sheet khác', () => {
    let s = excelInitial({ sheets: ['Sheet1', 'Sheet2'] });
    s = run(s, { type: 'switchSheet', index: 1 }, { type: 'setCell', cell: 'A1', raw: '9' });
    expect(gradeExcel(s, [{ kind: 'cellValue', cell: 'A1', value: 9, sheet: 'Sheet2' }]).pass).toBe(true);
  });

  it('gộp mọi câu báo lỗi, không dừng ở check đầu tiên', () => {
    const s = excelInitial();
    const r = gradeExcel(s, [{ kind: 'cellValue', cell: 'A1', value: 1 }, { kind: 'cellValue', cell: 'A2', value: 2 }]);
    expect(r.messages).toHaveLength(2);
  });
});
```

- [ ] **Step 2: Chạy, xác nhận FAIL** — `npm test -w shared -- grade`

- [ ] **Step 3: Viết `gradeExcel` và đăng ký**

Chỗ dễ sai: `cellValue` so số với sai số `1e-9` (ROUND và phần trăm hay ra `0.30000000000000004`). `cellFormula` xét **chữ thô** đã chuẩn hoá hoa thường và bỏ khoảng trắng, không cần AST.

- [ ] **Step 4: Chạy, xác nhận PASS** — `npm test && npm run typecheck` (chạy cả client, vì `GRADERS` được client dùng)

- [ ] **Step 5: Commit**

```bash
git add shared/src docs/superpowers/plans/2026-09-21-phase4a-excel/STATUS.md
git commit -m "feat(excel): grader and GRADERS registration" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
