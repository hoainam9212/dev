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
    expect(screen.getByRole('img', { name: /ngón út tay phải giữ Shift.*ngón trỏ tay trái/i })).toBeInTheDocument();
    expect(active().sort()).toEqual(['li', 'rp']);
  });

  it('chữ hoa: số 1 trên ngón giữ Shift, số 2 trên ngón bấm chữ', () => {
    render(<Hands finger="lr" shift="rp" />);
    const steps = [...document.querySelectorAll('[data-step]')].map((el) => [el.getAttribute('data-step'), el.getAttribute('data-step-finger'), el.textContent]);
    expect(steps).toEqual([
      ['1', 'rp', '1'],
      ['2', 'lr', '2'],
    ]);
    expect(screen.getByRole('img', { name: /trước tiên ngón út tay phải giữ Shift, rồi ngón áp út tay trái bấm/i })).toBeInTheDocument();
  });

  it('chữ thường: không có số thứ tự', () => {
    render(<Hands finger="lr" />);
    expect(document.querySelectorAll('[data-step]')).toHaveLength(0);
  });

  it('số trên tay phải nằm đúng phía ngón út phải (không bị lật như ảnh gương)', () => {
    render(<Hands finger="li" shift="rp" />);
    const one = document.querySelector('[data-step="1"]')!;
    expect(Number(one.getAttribute('data-x'))).toBeGreaterThan(250);
    expect(one.closest('[transform*="scale"]')).toBeNull();
  });
});
