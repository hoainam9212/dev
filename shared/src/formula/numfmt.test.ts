import { describe, it, expect } from 'vitest';
import { defaultAlign, displayValue } from './numfmt';

describe('hiển thị giá trị trong ô', () => {
  it('General: số như đã gõ, chữ như đã gõ', () => {
    expect(displayValue(1234.5)).toBe('1234.5');
    expect(displayValue('Nam')).toBe('Nam');
    expect(displayValue(true)).toBe('TRUE');
  });

  it('Number: dấu chấm ngăn nghìn và số lẻ theo yêu cầu', () => {
    expect(displayValue(1234567, { numFmt: 'number' })).toBe('1.234.567');
    expect(displayValue(1234.5, { numFmt: 'number', decimals: 2 })).toBe('1.234,50');
  });

  it('Tiền VNĐ', () => {
    expect(displayValue(7500000, { numFmt: 'currencyVnd' })).toBe('7.500.000 ₫');
  });

  it('Phần trăm', () => {
    expect(displayValue(0.155, { numFmt: 'percent' })).toBe('16%');
    expect(displayValue(0.155, { numFmt: 'percent', decimals: 1 })).toBe('15,5%');
  });

  it('lỗi hiện đúng mã, không bị định dạng số làm méo', () => {
    expect(displayValue({ err: '#DIV/0!' }, { numFmt: 'currencyVnd' })).toBe('#DIV/0!');
  });

  it('chữ không bị định dạng số đụng tới', () => {
    expect(displayValue('Nam', { numFmt: 'currencyVnd' })).toBe('Nam');
  });

  it('ô trống hiện chuỗi rỗng', () => {
    expect(displayValue('')).toBe('');
  });
});

describe('căn lề mặc định', () => {
  it('số phải, chữ trái, lỗi giữa', () => {
    expect(defaultAlign(5)).toBe('right');
    expect(defaultAlign('Nam')).toBe('left');
    expect(defaultAlign({ err: '#N/A' })).toBe('center');
  });
});
