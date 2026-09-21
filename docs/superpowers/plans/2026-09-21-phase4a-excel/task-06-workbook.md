### Task 6: Sổ tính và nhập liệu (`state.ts`, `edit.ts`)

Đọc `00-overview.md` trước. Xong task này là hết phần "bộ tính", bắt đầu phần "sim".

**Files:**
- Tạo: `shared/src/sims/excel/state.ts`, `shared/src/sims/excel/edit.ts`, `shared/src/sims/excel/index.ts`, `shared/src/sims/excel/edit.test.ts`
- Sửa: `shared/src/index.ts` (thêm `export * as excelSim from './sims/excel';`)

**Interfaces — Consumes:** `formula`: `parseRef`, `parseRange`, `formatRef`, `Range`, `MAX_ROWS`, `MAX_COLS`, `newContext`, `evaluateCell`, `CellValue`, `CellFormat`, `displayValue`.

**Interfaces — Produces:**

```ts
export interface Cell { raw: string; fmt?: CellFormat }
export interface Sheet {
  name: string;
  cells: Record<string, Cell>;          // khoá "r,c", đếm từ 0
  colWidths?: Record<number, number>;
  merges?: Range[];
  filter?: { range: Range; conditions: Record<number, string[]> } | null;
  charts?: Chart[];                     // luôn [] ở 4A; Chart định nghĩa ở 4B
}
export interface Chart { id: string; type: 'bar' | 'column' | 'line' | 'pie'; range: string; title: string }
export interface WorkbookState {
  sheets: Sheet[];
  active: number;
  sel: Range;                 // vùng chọn; ô neo là sel.from
  editing: string | null;     // chữ đang gõ, null khi không sửa
  now: number;                // mốc thời gian cho TODAY(), do bài học/giao diện đưa vào
  past: Sheet[][];            // undo, tối đa 30
}
export type ExcelAction =
  | { type: 'select'; cell: string }                       // 'B2'
  | { type: 'selectRange'; range: string }                 // 'B2:C5'
  | { type: 'moveSel'; dRow: number; dCol: number; extend?: boolean }
  | { type: 'startEdit'; text?: string }
  | { type: 'setRaw'; text: string }
  | { type: 'commitEdit'; move?: 'down' | 'right' | 'none' }
  | { type: 'cancelEdit' }
  | { type: 'setCell'; cell: string; raw: string }         // đặt thẳng, dùng trong setup bài học
  | { type: 'clear' }
  | { type: 'undo' };

export function excelInitial(o?: { cells?: Record<string, string>; sheets?: string[]; now?: number }): WorkbookState;
export function reduceExcel(s: WorkbookState, a: ExcelAction): WorkbookState;
/** Giá trị đã tính của một ô, theo sheet đang mở. */
export function cellValue(s: WorkbookState, cell: string): CellValue;
/** Chữ hiện trong ô (đã áp định dạng). */
export function cellText(s: WorkbookState, cell: string): string;
export function cellRaw(s: WorkbookState, cell: string): string;
/** Nguồn ô cho trình tính, đọc qua tên sheet. */
export function sourceOf(s: WorkbookState): CellSource;
/** Bọc một phép sửa: đẩy sheets cũ vào past (tối đa 30) rồi sửa. */
export function withEdit(s: WorkbookState, edit: (sheet: Sheet) => Sheet): WorkbookState;
```

`excelInitial({ cells: { A1: 'Họ tên', B1: 'Lương' } })` là cách bài học dựng bảng đầu bài — **một lời gọi, không xếp action**. Đây đúng bài học rút ra từ giai đoạn 3 (`emptyDoc` tách dòng).

- [ ] **Step 1: Viết test FAIL** — `shared/src/sims/excel/edit.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { cellRaw, cellText, cellValue, excelInitial, reduceExcel, type ExcelAction, type WorkbookState } from './state';

const run = (s: WorkbookState, ...as: ExcelAction[]) => as.reduce(reduceExcel, s);

describe('sổ tính lúc mở', () => {
  it('có một sheet, chọn sẵn A1, chưa sửa gì', () => {
    const s = excelInitial();
    expect(s.sheets).toHaveLength(1);
    expect(s.sheets[0]!.name).toBe('Sheet1');
    expect(s.sel).toEqual({ from: { row: 0, col: 0 }, to: { row: 0, col: 0 } });
    expect(s.editing).toBeNull();
    expect(s.past).toEqual([]);
  });

  it('dựng sẵn dữ liệu đầu bài từ bảng A1', () => {
    const s = excelInitial({ cells: { A1: 'Họ tên', B1: 'Lương', B2: '7500000' } });
    expect(cellRaw(s, 'B2')).toBe('7500000');
    expect(cellValue(s, 'B2')).toBe(7500000);
  });
});

describe('nhập ô', () => {
  it('gõ rồi Enter thì lưu chữ và xuống ô dưới', () => {
    let s = run(excelInitial(), { type: 'select', cell: 'A1' }, { type: 'startEdit' }, { type: 'setRaw', text: 'Nam' });
    expect(s.editing).toBe('Nam');
    s = reduceExcel(s, { type: 'commitEdit', move: 'down' });
    expect(cellRaw(s, 'A1')).toBe('Nam');
    expect(s.editing).toBeNull();
    expect(s.sel.from).toEqual({ row: 1, col: 0 });
  });

  it('Escape bỏ dở, ô giữ nguyên', () => {
    const s0 = run(excelInitial({ cells: { A1: 'cũ' } }), { type: 'select', cell: 'A1' });
    const s = run(s0, { type: 'startEdit' }, { type: 'setRaw', text: 'mới' }, { type: 'cancelEdit' });
    expect(cellRaw(s, 'A1')).toBe('cũ');
    expect(s.editing).toBeNull();
  });

  it('gõ công thức thì ô hiện KẾT QUẢ nhưng vẫn lưu công thức', () => {
    const s = run(excelInitial({ cells: { A1: '10', A2: '20' } }), { type: 'setCell', cell: 'A3', raw: '=SUM(A1:A2)' });
    expect(cellRaw(s, 'A3')).toBe('=SUM(A1:A2)');
    expect(cellValue(s, 'A3')).toBe(30);
    expect(cellText(s, 'A3')).toBe('30');
  });

  it('xoá vùng đang chọn', () => {
    let s = excelInitial({ cells: { A1: '1', A2: '2', B1: '3' } });
    s = run(s, { type: 'selectRange', range: 'A1:A2' }, { type: 'clear' });
    expect(cellRaw(s, 'A1')).toBe('');
    expect(cellRaw(s, 'A2')).toBe('');
    expect(cellRaw(s, 'B1')).toBe('3');
  });
});

describe('chọn ô', () => {
  it('mũi tên đi trong lưới và không ra khỏi mép', () => {
    let s = run(excelInitial(), { type: 'moveSel', dRow: 2, dCol: 1 });
    expect(s.sel.from).toEqual({ row: 2, col: 1 });
    s = run(s, { type: 'moveSel', dRow: -9, dCol: -9 });
    expect(s.sel.from).toEqual({ row: 0, col: 0 });
  });

  it('Shift + mũi tên mở rộng vùng chọn', () => {
    const s = run(excelInitial(), { type: 'moveSel', dRow: 2, dCol: 0, extend: true });
    expect(s.sel).toEqual({ from: { row: 0, col: 0 }, to: { row: 2, col: 0 } });
  });
});

describe('hoàn tác', () => {
  it('trả lại nội dung ô trước đó và giới hạn 30 bước', () => {
    let s = run(excelInitial(), { type: 'setCell', cell: 'A1', raw: 'một' }, { type: 'setCell', cell: 'A1', raw: 'hai' });
    s = reduceExcel(s, { type: 'undo' });
    expect(cellRaw(s, 'A1')).toBe('một');
    let t = excelInitial();
    for (let i = 0; i < 35; i++) t = reduceExcel(t, { type: 'setCell', cell: 'A1', raw: String(i) });
    expect(t.past).toHaveLength(30);
  });

  it('chọn ô KHÔNG vào lịch sử hoàn tác', () => {
    const s = run(excelInitial(), { type: 'select', cell: 'B2' }, { type: 'selectRange', range: 'A1:B2' });
    expect(s.past).toEqual([]);
  });

  it('hoàn tác khi lịch sử rỗng thì không đổi gì', () => {
    const s = excelInitial({ cells: { A1: 'x' } });
    expect(reduceExcel(s, { type: 'undo' })).toEqual(s);
  });
});
```

- [ ] **Step 2: Chạy, xác nhận FAIL** — `npm test -w shared -- excel`

- [ ] **Step 3: Viết `state.ts` + `edit.ts`**

Chỗ dễ sai: `cellValue` phải dựng **ngữ cảnh mới mỗi lần gọi** (memo không được sống qua các lần sửa, kẻo hiện số cũ) — đây chính là cái bẫy mà chương "không dùng đồ thị phụ thuộc" trong spec nói tới. `sourceOf` tra sheet **theo tên**, không theo chỉ số. `withEdit` là cổng duy nhất đẩy lịch sử; Task 7–8 dùng lại, đừng viết lại.

- [ ] **Step 4: Chạy, xác nhận PASS** — `npm test -w shared && npm run typecheck`

- [ ] **Step 5: Commit**

```bash
git add shared/src/sims/excel shared/src/index.ts docs/superpowers/plans/2026-09-21-phase4a-excel/STATUS.md
git commit -m "feat(excel): workbook state, cell entry and undo" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
