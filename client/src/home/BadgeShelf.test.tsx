import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BadgeShelf } from './BadgeShelf';

describe('BadgeShelf', () => {
  it('shows all 8 badges, earned ones marked', () => {
    render(<BadgeShelf earned={new Set(['first-step'])} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(8);
    expect(screen.getByLabelText('Huy hiệu: Bước chân đầu tiên, đã đạt')).toBeInTheDocument();
    expect(screen.getByText('1/8')).toBeInTheDocument();
  });

  it('tells how to earn a missing badge', () => {
    render(<BadgeShelf earned={new Set()} />);
    const item = screen.getByLabelText('Huy hiệu: Ngón tay thần tốc, chưa đạt. Gõ 40 từ/phút');
    expect(item).toHaveTextContent('Gõ 40 từ/phút');
  });
});
