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

  it('hai ô cùng trỏ vào một ô thứ ba KHÔNG phải vòng', () => {
    const c = ctx({ A1: '5', B1: '=A1*2', C1: '=A1+B1' });
    expect(evaluateCell(c, 'Sheet1', 0, 2)).toBe(15);
  });

  it('địa chỉ ngoài lưới là #REF!', () => {
    expect(calc({}, '=#REF!+1')).toEqual({ err: '#REF!' });
  });
});
