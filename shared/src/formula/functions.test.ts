import { describe, it, expect } from 'vitest';
import { evaluateFormula, newContext } from './evaluate';
import { FUNCTIONS } from './functions';
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

describe('bảng hàm', () => {
  it('có đủ 25 hàm theo spec', () => {
    const want = ['SUM', 'AVERAGE', 'MIN', 'MAX', 'COUNT', 'COUNTA', 'ROUND', 'ABS', 'IF', 'AND', 'OR',
      'SUMIF', 'COUNTIF', 'AVERAGEIF', 'VLOOKUP', 'LEFT', 'RIGHT', 'MID', 'LEN', 'UPPER', 'LOWER',
      'PROPER', 'TRIM', 'CONCAT', 'TODAY'];
    for (const name of want) expect(FUNCTIONS, name).toHaveProperty(name);
    expect(Object.keys(FUNCTIONS)).toHaveLength(25);
  });
});

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

  it('lỗi trong vùng lan lên kết quả', () => {
    expect(calc({ A1: '=1/0', A2: '5' }, '=SUM(A1:A2)')).toEqual({ err: '#DIV/0!' });
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
