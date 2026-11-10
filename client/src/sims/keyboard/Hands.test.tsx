import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Hands } from './Hands';

const active = () => [...document.querySelectorAll('[data-finger][data-active]')].map((el) => el.getAttribute('data-finger'));

describe('Hands', () => {
  it('ngón trỏ trái: có nhãn và đúng một ngón được tô', () => {
    render(<Hands finger="li" />);
    expect(screen.getByRole('img', { name: /ngón trỏ tay trái/i })).toBeInTheDocument();
    expect(active()).toEqual(['li']);
  });

  it('có đủ 10 ngón', () => {
    render(<Hands finger={null} />);
    expect(document.querySelectorAll('[data-finger]')).toHaveLength(10);
    expect(active()).toEqual([]);
  });

  it('phím cách tô hai ngón cái', () => {
    render(<Hands finger="th" />);
    expect(screen.getByRole('img', { name: /ngón cái/i })).toBeInTheDocument();
    expect(active()).toEqual(['th', 'th']);
  });

  it('chữ hoa: tô thêm ngón út tay kia giữ Shift', () => {
    render(<Hands finger="li" shift="rp" />);
    expect(screen.getByRole('img', { name: /ngón trỏ tay trái.*ngón út tay phải giữ Shift/i })).toBeInTheDocument();
    expect(active().sort()).toEqual(['li', 'rp']);
  });
});
