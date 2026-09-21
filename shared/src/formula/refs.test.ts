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
