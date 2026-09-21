import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { excelSim } from '@office-neko/shared';
import { ExcelDialogs } from './dialogs';

const open = (dialog: excelSim.ExcelDialog) =>
  excelSim.reduceExcel(excelSim.excelInitial(), { type: 'openDialog', dialog });

describe('Hộp thoại Lưu / In', () => {
  it('không hiện gì khi chưa mở hộp thoại nào', () => {
    const { container } = render(<ExcelDialogs state={excelSim.excelInitial()} dispatch={() => {}} now={0} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('lưu với tên do người học đặt', () => {
    const dispatch = vi.fn();
    render(<ExcelDialogs state={open('save')} dispatch={dispatch} now={1700000000000} />);
    fireEvent.change(screen.getByLabelText('Tên tệp'), { target: { value: 'bang-luong.xlsx' } });
    fireEvent.click(screen.getByRole('button', { name: 'Lưu' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'save', name: 'bang-luong.xlsx', at: 1700000000000 });
  });

  it('Escape đóng hộp thoại', () => {
    const dispatch = vi.fn();
    render(<ExcelDialogs state={open('print')} dispatch={dispatch} now={0} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'openDialog', dialog: null });
  });
});
