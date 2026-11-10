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

  it('hộp thoại Sort: cột số có Largest to Smallest, OK thì sắp rồi đóng', () => {
    const dispatch = vi.fn();
    let s = excelSim.excelInitial({
      cells: {
        A1: 'Nhân viên', B1: 'Phòng', C1: 'Lương',
        A2: 'Nam', B2: 'Kế toán', C2: '7500000',
        A3: 'Lan', B3: 'Kinh doanh', C3: '6200000',
        A4: 'Tú', B4: 'Kế toán', C4: '8100000',
        A5: 'Hoa', B5: 'Kinh doanh', C5: '6900000',
      },
    });
    s = [{ type: 'selectRange', range: 'A2:C5' } as const, { type: 'openDialog', dialog: 'sort' } as const]
      .reduce(excelSim.reduceExcel, s);
    render(<ExcelDialogs state={s} dispatch={dispatch} now={0} />);
    expect(screen.getByRole('dialog', { name: 'Sort' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'A to Z' })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Sắp theo cột'), { target: { value: 'C' } });
    expect(screen.getByRole('option', { name: 'Largest to Smallest' })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Thứ tự'), { target: { value: 'desc' } });
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'sortRange', range: 'A2:C5', by: 'C', dir: 'desc' });
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: 'openDialog', dialog: null });
  });

  it('hộp thoại Sort: Cancel đóng mà không sắp', () => {
    const dispatch = vi.fn();
    render(<ExcelDialogs state={open('sort')} dispatch={dispatch} now={0} />);
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({ type: 'openDialog', dialog: null });
  });

  it('Escape đóng hộp thoại', () => {
    const dispatch = vi.fn();
    render(<ExcelDialogs state={open('print')} dispatch={dispatch} now={0} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'openDialog', dialog: null });
  });
});

describe('Hộp thoại – trợ năng', () => {
  it('Sort mở thì focus ô Sort by, hộp thoại có nhãn', () => {
    render(<ExcelDialogs state={open('sort')} dispatch={() => {}} now={0} />);
    expect(screen.getByRole('dialog', { name: 'Sort' })).toHaveAttribute('aria-labelledby');
    expect(screen.getByLabelText('Sắp theo cột')).toHaveFocus();
  });
});
