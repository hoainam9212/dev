import { describe, it, expect } from 'vitest';
import { lex } from './lex';
import { ParseError, parse } from './parse';

describe('tách token', () => {
  it('nhận số, chuỗi, địa chỉ, vùng và tên hàm', () => {
    expect(lex('SUM(B2:B10)')).toEqual([
      { t: 'name', v: 'SUM' }, { t: 'lp' }, { t: 'range', v: 'B2:B10' }, { t: 'rp' },
    ]);
    expect(lex('1,5')).toEqual([{ t: 'num', v: 1 }, { t: 'comma' }, { t: 'num', v: 5 }]);
    expect(lex('"xin chào"')).toEqual([{ t: 'str', v: 'xin chào' }]);
    expect(lex('$A$1')).toEqual([{ t: 'ref', v: '$A$1' }]);
    expect(lex('TRUE')).toEqual([{ t: 'bool', v: true }]);
  });

  it('nhận toán tử hai ký tự', () => {
    expect(lex('1<=2')).toEqual([{ t: 'num', v: 1 }, { t: 'op', v: '<=' }, { t: 'num', v: 2 }]);
    expect(lex('1<>2')).toEqual([{ t: 'num', v: 1 }, { t: 'op', v: '<>' }, { t: 'num', v: 2 }]);
  });

  it('nhận tên sheet tiếng Việt có dấu và có khoảng trắng', () => {
    expect(lex('Báo cáo!B1')).toEqual([{ t: 'ref', v: 'Báo cáo!B1' }]);
    expect(lex('Bảng lương!A1:B5')).toEqual([{ t: 'range', v: 'Bảng lương!A1:B5' }]);
  });

  it('bỏ qua khoảng trắng', () => {
    expect(lex('  1 +  2 ')).toEqual([{ t: 'num', v: 1 }, { t: 'op', v: '+' }, { t: 'num', v: 2 }]);
  });
});

describe('dựng cây cú pháp', () => {
  it('nhân chia trước cộng trừ', () => {
    expect(parse('1+2*3')).toEqual({
      k: 'bin', op: '+', l: { k: 'num', v: 1 },
      r: { k: 'bin', op: '*', l: { k: 'num', v: 2 }, r: { k: 'num', v: 3 } },
    });
  });

  it('ngoặc thắng ưu tiên', () => {
    expect(parse('(1+2)*3')).toEqual({
      k: 'bin', op: '*',
      l: { k: 'bin', op: '+', l: { k: 'num', v: 1 }, r: { k: 'num', v: 2 } },
      r: { k: 'num', v: 3 },
    });
  });

  it('luỹ thừa kết hợp phải và trên cả dấu trừ một ngôi', () => {
    expect(parse('2^3^2')).toEqual({
      k: 'bin', op: '^', l: { k: 'num', v: 2 },
      r: { k: 'bin', op: '^', l: { k: 'num', v: 3 }, r: { k: 'num', v: 2 } },
    });
    expect(parse('-2^2')).toEqual({ k: 'neg', e: { k: 'bin', op: '^', l: { k: 'num', v: 2 }, r: { k: 'num', v: 2 } } });
  });

  it('so sánh đứng ngoài cùng, nối chuỗi ở trong', () => {
    expect(parse('A1&"x"=B1')).toEqual({
      k: 'bin', op: '=',
      l: { k: 'bin', op: '&', l: { k: 'ref', v: 'A1' }, r: { k: 'str', v: 'x' } },
      r: { k: 'ref', v: 'B1' },
    });
  });

  it('đọc phần trăm hậu tố', () => {
    expect(parse('20%')).toEqual({ k: 'pct', e: { k: 'num', v: 20 } });
  });

  it('đọc hàm nhiều đối số và hàm lồng nhau', () => {
    expect(parse('IF(A1>5,SUM(B1:B3),0)')).toEqual({
      k: 'call', name: 'IF', args: [
        { k: 'bin', op: '>', l: { k: 'ref', v: 'A1' }, r: { k: 'num', v: 5 } },
        { k: 'call', name: 'SUM', args: [{ k: 'range', v: 'B1:B3' }] },
        { k: 'num', v: 0 },
      ],
    });
  });

  it('đọc hàm không đối số', () => {
    expect(parse('TODAY()')).toEqual({ k: 'call', name: 'TODAY', args: [] });
  });

  it('báo lỗi khi thiếu ngoặc đóng hoặc thừa toán tử', () => {
    expect(() => parse('SUM(A1')).toThrow(ParseError);
    expect(() => parse('1+')).toThrow(ParseError);
    expect(() => parse('')).toThrow(ParseError);
  });
});
