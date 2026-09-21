import { describe, it, expect } from 'vitest';
import { cellRaw, cellValue, excelInitial, reduceExcel, type ExcelAction, type WorkbookState } from './state';

const run = (s: WorkbookState, ...as: ExcelAction[]) => as.reduce(reduceExcel, s);

describe('copy và dán', () => {
  it('dán công thức thì địa chỉ tương đối dịch theo', () => {
    let s = excelInitial({ cells: { A1: '1', B1: '2', A2: '10', B2: '20', C1: '=A1+B1' } });
    s = run(s, { type: 'select', cell: 'C1' }, { type: 'copy' }, { type: 'select', cell: 'C2' }, { type: 'paste' });
    expect(cellRaw(s, 'C2')).toBe('=A2+B2');
    expect(cellValue(s, 'C2')).toBe(30);
  });

  it('địa chỉ có $ giữ nguyên khi dán', () => {
    let s = excelInitial({ cells: { A1: '1', A2: '2', E1: '1000', C1: '=A1*$E$1' } });
    s = run(s, { type: 'select', cell: 'C1' }, { type: 'copy' }, { type: 'select', cell: 'C2' }, { type: 'paste' });
    expect(cellRaw(s, 'C2')).toBe('=A2*$E$1');
    expect(cellValue(s, 'C2')).toBe(2000);
  });

  it('dán chữ và số thì y nguyên', () => {
    let s = excelInitial({ cells: { A1: 'Nam' } });
    s = run(s, { type: 'select', cell: 'A1' }, { type: 'copy' }, { type: 'select', cell: 'B5' }, { type: 'paste' });
    expect(cellRaw(s, 'B5')).toBe('Nam');
  });

  it('copy cả vùng rồi dán giữ nguyên hình dạng', () => {
    let s = excelInitial({ cells: { A1: '1', A2: '2' } });
    s = run(s, { type: 'selectRange', range: 'A1:A2' }, { type: 'copy' }, { type: 'select', cell: 'C1' }, { type: 'paste' });
    expect(cellRaw(s, 'C1')).toBe('1');
    expect(cellRaw(s, 'C2')).toBe('2');
  });

  it('dán là MỘT bước hoàn tác dù chép nhiều ô', () => {
    let s = excelInitial({ cells: { A1: '1', A2: '2' } });
    s = run(s, { type: 'selectRange', range: 'A1:A2' }, { type: 'copy' }, { type: 'select', cell: 'C1' }, { type: 'paste' }, { type: 'undo' });
    expect(cellRaw(s, 'C1')).toBe('');
    expect(cellRaw(s, 'C2')).toBe('');
  });

  it('dán khi chưa copy thì không đổi gì', () => {
    const s = excelInitial({ cells: { A1: '1' } });
    expect(reduceExcel(s, { type: 'paste' })).toEqual(s);
  });
});

describe('fill', () => {
  it('đổ công thức xuống hết vùng chọn', () => {
    let s = excelInitial({ cells: { A1: '1', B1: '2', A2: '3', B2: '4', A3: '5', B3: '6', C1: '=A1*B1' } });
    s = run(s, { type: 'selectRange', range: 'C1:C3' }, { type: 'fillDown' });
    expect(cellRaw(s, 'C2')).toBe('=A2*B2');
    expect(cellValue(s, 'C3')).toBe(30);
  });

  it('đổ sang phải', () => {
    let s = excelInitial({ cells: { A1: '2', B1: '3', C1: '4', A2: '=A1*10' } });
    s = run(s, { type: 'selectRange', range: 'A2:C2' }, { type: 'fillRight' });
    expect(cellRaw(s, 'C2')).toBe('=C1*10');
  });

  it('đổ số thì lặp lại y nguyên, không tự tăng dần', () => {
    let s = excelInitial({ cells: { A1: '5' } });
    s = run(s, { type: 'selectRange', range: 'A1:A3' }, { type: 'fillDown' });
    expect(cellRaw(s, 'A3')).toBe('5');
  });

  it('công thức trôi ra ngoài lưới thành #REF!', () => {
    let s = excelInitial({ cells: { A5: '=A4' } });
    s = run(s, { type: 'select', cell: 'A5' }, { type: 'copy' }, { type: 'select', cell: 'A1' }, { type: 'paste' });
    expect(cellRaw(s, 'A1')).toBe('=#REF!');
    expect(cellValue(s, 'A1')).toEqual({ err: '#REF!' });
  });
});
