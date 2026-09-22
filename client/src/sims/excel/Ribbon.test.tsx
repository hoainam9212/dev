import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { excelSim } from '@office-neko/shared';
import { Ribbon } from './Ribbon';

const state = excelSim.excelInitial({ cells: { B2: '7500000' } });
const show = (s = state, dispatch = vi.fn()) => {
  render(<Ribbon state={s} dispatch={dispatch} />);
  return dispatch;
};

describe('Thanh tab ribbon', () => {
  it('mở sẵn tab Home và có đủ sáu tab như Excel thật', () => {
    show();
    for (const name of ['File', 'Home', 'Insert', 'Formulas', 'Data', 'View']) {
      expect(screen.getByRole('tab', { name }), name).toBeInTheDocument();
    }
    expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('aria-selected', 'true');
  });

  it('đổi tab thì đổi nội dung', () => {
    show();
    fireEvent.click(screen.getByRole('tab', { name: 'Formulas' }));
    expect(screen.getByRole('button', { name: /^VLOOKUP/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /in đậm/i })).toBeNull();
  });

  it('bấm một hàm ở tab Formulas thì điền sẵn cú pháp vào ô', () => {
    const dispatch = show();
    fireEvent.click(screen.getByRole('tab', { name: 'Formulas' }));
    const sum = screen.getAllByRole('button').find((b) => b.textContent === 'SUM')!;
    fireEvent.click(sum);
    expect(dispatch).toHaveBeenCalledWith({ type: 'startEdit', text: '=SUM(' });
  });

  it('tab File mở được hộp thoại Lưu', () => {
    const dispatch = show();
    fireEvent.click(screen.getByRole('tab', { name: 'File' }));
    fireEvent.click(screen.getByRole('button', { name: /lưu tệp/i }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'openDialog', dialog: 'save' });
  });

  it('tab chưa có nội dung thì nói rõ là sẽ có sau, không để trống trơn', () => {
    // Trước đây test này dùng tab Data; Task 4 của 4B đã cho Data nội dung thật,
    // nên ví dụ "chưa có gì" giờ là Insert (biểu đồ, làm ở Task 5).
    show();
    fireEvent.click(screen.getByRole('tab', { name: 'Insert' }));
    expect(screen.getByText(/sẽ có ở phần sau/i)).toBeInTheDocument();
  });

  it('tab Data có nút sắp xếp và lọc thật', () => {
    show();
    fireEvent.click(screen.getByRole('tab', { name: 'Data' }));
    expect(screen.getByRole('button', { name: /A→Z/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Filter/i })).toBeInTheDocument();
  });
});
