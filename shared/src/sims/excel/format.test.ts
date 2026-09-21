import { describe, it, expect } from 'vitest';
import { cellText, cellValue, excelInitial, formatOf, reduceExcel, type ExcelAction, type WorkbookState } from './state';
import { mergedAt } from './format';

const run = (s: WorkbookState, ...as: ExcelAction[]) => as.reduce(reduceExcel, s);

describe('định dạng ô', () => {
  it('áp định dạng tiền VNĐ cho cả vùng', () => {
    let s = excelInitial({ cells: { B2: '7500000', B3: '6200000' } });
    s = run(s, { type: 'selectRange', range: 'B2:B3' }, { type: 'setFormat', fmt: { numFmt: 'currencyVnd' } });
    expect(cellText(s, 'B2')).toBe('7.500.000 ₫');
    expect(cellText(s, 'B3')).toBe('6.200.000 ₫');
    expect(cellValue(s, 'B2')).toBe(7500000);
  });

  it('gộp định dạng chứ không thay hết', () => {
    const s = run(excelInitial({ cells: { A1: '1' } }), { type: 'select', cell: 'A1' },
      { type: 'setFormat', fmt: { bold: true } }, { type: 'setFormat', fmt: { color: '#C2185B' } });
    expect(formatOf(s, 'A1')).toEqual({ bold: true, color: '#C2185B' });
  });

  it('định dạng được cả ô đang trống', () => {
    const s = run(excelInitial(), { type: 'select', cell: 'C3' }, { type: 'setFormat', fmt: { italic: true } });
    expect(formatOf(s, 'C3').italic).toBe(true);
  });

  it('xoá định dạng, giữ nguyên nội dung', () => {
    const s = run(excelInitial({ cells: { A1: '5' } }), { type: 'select', cell: 'A1' },
      { type: 'setFormat', fmt: { bold: true, numFmt: 'percent' } }, { type: 'clearFormat' });
    expect(formatOf(s, 'A1')).toEqual({});
    expect(cellValue(s, 'A1')).toBe(5);
  });

  it('đổi định dạng là một bước hoàn tác', () => {
    const s = run(excelInitial({ cells: { A1: '5' } }), { type: 'select', cell: 'A1' },
      { type: 'setFormat', fmt: { bold: true } }, { type: 'undo' });
    expect(formatOf(s, 'A1').bold).toBeUndefined();
  });
});

describe('gộp ô', () => {
  it('gộp vùng và tìm lại được vùng gộp từ ô bất kỳ trong đó', () => {
    const s = run(excelInitial({ cells: { A1: 'BẢNG LƯƠNG' } }), { type: 'selectRange', range: 'A1:C1' }, { type: 'merge' });
    expect(mergedAt(s, 'B1')).toEqual({ from: { row: 0, col: 0 }, to: { row: 0, col: 2 } });
  });

  it('gộp lần nữa thì bỏ gộp', () => {
    const s = run(excelInitial(), { type: 'selectRange', range: 'A1:C1' }, { type: 'merge' }, { type: 'merge' });
    expect(mergedAt(s, 'B1')).toBeNull();
  });

  it('ô đơn lẻ thì không gộp gì', () => {
    const s = run(excelInitial(), { type: 'select', cell: 'A1' }, { type: 'merge' });
    expect(mergedAt(s, 'A1')).toBeNull();
  });
});

describe('độ rộng cột', () => {
  it('nhớ độ rộng theo cột', () => {
    const s = run(excelInitial(), { type: 'setColWidth', col: 'B', px: 180 });
    expect(s.sheets[0]!.colWidths?.[1]).toBe(180);
  });
});

describe('nhiều sheet', () => {
  it('thêm sheet mới với tên tự đặt rồi chuyển qua lại', () => {
    let s = run(excelInitial(), { type: 'addSheet' });
    expect(s.sheets.map((x) => x.name)).toEqual(['Sheet1', 'Sheet2']);
    s = reduceExcel(s, { type: 'switchSheet', index: 1 });
    expect(s.active).toBe(1);
    expect(s.sel.from).toEqual({ row: 0, col: 0 });
  });

  it('đổi tên sheet', () => {
    const s = run(excelInitial(), { type: 'renameSheet', index: 0, name: 'Bảng lương' });
    expect(s.sheets[0]!.name).toBe('Bảng lương');
  });

  it('công thức trỏ sang sheet khác', () => {
    let s = excelInitial({ cells: { A1: '10' }, sheets: ['Sheet1', 'Sheet2'] });
    s = run(s, { type: 'switchSheet', index: 1 }, { type: 'setCell', cell: 'A1', raw: '=Sheet1!A1*2' });
    expect(cellValue(s, 'A1')).toBe(20);
  });

  it('mỗi sheet giữ dữ liệu riêng', () => {
    let s = excelInitial({ cells: { A1: 'một' }, sheets: ['Sheet1', 'Sheet2'] });
    s = run(s, { type: 'switchSheet', index: 1 }, { type: 'setCell', cell: 'A1', raw: 'hai' }, { type: 'switchSheet', index: 0 });
    expect(cellText(s, 'A1')).toBe('một');
  });
});
