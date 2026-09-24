import { fireEvent, render, screen } from '@testing-library/react';
import { pptSim } from '@office-neko/shared';
import { describe, expect, it, vi } from 'vitest';
import { Ribbon } from './Ribbon';

const TABS = ['File', 'Home', 'Insert', 'Design', 'Transitions', 'Slide Show'];

describe('Ribbon PowerPoint', () => {
  it('có đủ sáu tab, mở sẵn Home', () => {
    render(<Ribbon state={pptSim.pptInitial()} dispatch={vi.fn()} />);
    for (const name of TABS) expect(screen.getByRole('tab', { name }), name).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('aria-selected', 'true');
  });

  it('bấm tab nào thì tab đó được chọn', () => {
    render(<Ribbon state={pptSim.pptInitial()} dispatch={vi.fn()} />);
    for (const name of TABS) {
      fireEvent.click(screen.getByRole('tab', { name }));
      expect(screen.getByRole('tab', { name })).toHaveAttribute('aria-selected', 'true');
    }
  });

  it('tab Design chưa có gì thì báo sẽ có ở phần sau', () => {
    render(<Ribbon state={pptSim.pptInitial()} dispatch={vi.fn()} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Design' }));
    expect(screen.getByText(/sẽ có ở phần sau/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /New Slide/ })).toBeNull();
  });
});
