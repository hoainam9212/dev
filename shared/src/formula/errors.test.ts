import { describe, it, expect } from 'vitest';
import { explainError, looksLikeForgottenEquals } from './errors';

describe('giải thích lỗi', () => {
  it('có câu cho cả sáu mã lỗi', () => {
    for (const code of ['#DIV/0!', '#N/A', '#REF!', '#NAME?', '#VALUE!', '#CIRC!'] as const) {
      const e = explainError(code);
      expect(e.what.length, code).toBeGreaterThan(10);
      expect(e.fix.length, code).toBeGreaterThan(10);
    }
  });

  it('nói bằng tiếng Việt, không phải chữ Anh nguyên gốc', () => {
    expect(explainError('#DIV/0!').what).toContain('chia');
    expect(explainError('#N/A').what).toContain('không tìm thấy');
    expect(explainError('#NAME?').fix).toContain('tên hàm');
  });
});

describe('quên dấu bằng', () => {
  it('nhận ra công thức thiếu dấu =', () => {
    expect(looksLikeForgottenEquals('SUM(A1:A5)')).toBe(true);
    expect(looksLikeForgottenEquals('A1+B1')).toBe(true);
  });

  it('không báo nhầm với chữ bình thường', () => {
    expect(looksLikeForgottenEquals('Nguyễn Văn Nam')).toBe(false);
    expect(looksLikeForgottenEquals('=SUM(A1:A5)')).toBe(false);
    expect(looksLikeForgottenEquals('120000')).toBe(false);
    expect(looksLikeForgottenEquals('Ca 1')).toBe(false);
    expect(looksLikeForgottenEquals('')).toBe(false);
  });
});
