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
    expect(screen.queryByRole('button', { name: 'Slide mới' })).toBeNull();
  });

  it('thanh thẻ kiểu Office, thẻ đang mở gạch chân màu cam PowerPoint', () => {
    render(<Ribbon state={pptSim.pptInitial()} dispatch={vi.fn()} />);
    expect(screen.getByRole('tab', { name: 'Home' }).style.borderColor).toBe('rgb(196, 62, 28)');
  });

  it('File có Save As và Print kiểu Office', () => {
    const dispatch = vi.fn();
    render(<Ribbon state={pptSim.pptInitial()} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('tab', { name: 'File' }));
    expect(document.querySelector('[data-variant="office"] > span')?.textContent).toBe('File');
    fireEvent.click(screen.getByRole('button', { name: 'Lưu tệp' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'openDialog', dialog: 'save' });
    fireEvent.click(screen.getByRole('button', { name: 'In' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'openDialog', dialog: 'print' });
  });
});
