import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { formula } from '@office-neko/shared';
import { FN_HELP, activeFn } from '../../content/fnHelp';
import { FnTip } from './FnTip';

describe('nhận ra hàm đang gõ', () => {
  it('biết đang ở đối số thứ mấy', () => {
    expect(activeFn('=SUM(')!.help.name).toBe('SUM');
    expect(activeFn('=VLOOKUP(A1,')!.argIndex).toBe(1);
    expect(activeFn('=VLOOKUP(A1,D1:E3,2,')!.argIndex).toBe(3);
  });

  it('bỏ qua dấu phẩy nằm trong hàm lồng và trong chuỗi', () => {
    expect(activeFn('=IF(SUM(A1,B1)>5,')!.argIndex).toBe(1);
    expect(activeFn('=IF(A1="a,b",')!.argIndex).toBe(1);
  });

  it('hàm lồng thì nói về hàm ở TRONG', () => {
    expect(activeFn('=IF(SUM(A1,')!.help.name).toBe('SUM');
  });

  it('không có hàm nào thì null', () => {
    expect(activeFn('=A1+B1')).toBeNull();
    expect(activeFn('Nam')).toBeNull();
    expect(activeFn('=SUM(A1:A2)')).toBeNull();
  });
});

describe('bảng giải nghĩa hàm', () => {
  it('có đủ mục cho cả 25 hàm của bộ tính', () => {
    for (const name of Object.keys(formula.FUNCTIONS)) {
      expect(FN_HELP, name).toHaveProperty(name);
    }
  });
});

describe('thẻ cú pháp', () => {
  it('in đậm đúng đối số đang gõ và giải nghĩa tiếng Việt', () => {
    render(<FnTip text="=VLOOKUP(A1," />);
    expect(screen.getByTestId('fn-arg-1').className).toContain('font-bold');
    expect(screen.getByTestId('fn-arg-0').className).not.toContain('font-bold');
    expect(screen.getAllByText(/bảng tra/i).length).toBeGreaterThan(0);
  });

  it('không hiện gì khi không gõ hàm', () => {
    const { container } = render(<FnTip text="=A1+1" />);
    expect(container).toBeEmptyDOMElement();
  });
});
