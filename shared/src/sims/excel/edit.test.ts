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

  it('sửa ô nguồn thì ô công thức đổi theo ngay', () => {
    let s = excelInitial({ cells: { A1: '10', A2: '=A1*2' } });
    expect(cellValue(s, 'A2')).toBe(20);
    s = reduceExcel(s, { type: 'setCell', cell: 'A1', raw: '50' });
    expect(cellValue(s, 'A2')).toBe(100);
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
