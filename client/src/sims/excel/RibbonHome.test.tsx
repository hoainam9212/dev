import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { excelSim } from '@office-neko/shared';
import { RibbonHome } from './RibbonHome';
import { SheetTabs } from './SheetTabs';
import { HELP_IDS } from '../../content/help-ids';

const state = excelSim.excelInitial({ cells: { B2: '7500000' } });

describe('Ribbon Home', () => {
  it('bấm Tiền VNĐ thì phát đúng action', () => {
    const dispatch = vi.fn();
    render(<RibbonHome state={state} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: /tiền vnđ/i }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setFormat', fmt: { numFmt: 'currencyVnd' } });
  });

  it('bấm B phát định dạng đậm', () => {
    const dispatch = vi.fn();
    render(<RibbonHome state={state} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: /in đậm/i }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setFormat', fmt: { bold: true } });
  });

  it('nút đậm sáng lên và bấm lần nữa thì bỏ đậm', () => {
    const bold = excelSim.reduceExcel(
      excelSim.reduceExcel(state, { type: 'select', cell: 'B2' }),
      { type: 'setFormat', fmt: { bold: true } },
    );
    const dispatch = vi.fn();
    render(<RibbonHome state={bold} dispatch={dispatch} />);
    const btn = screen.getByRole('button', { name: /in đậm/i });
    expect(btn).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(btn);
    expect(dispatch).toHaveBeenCalledWith({ type: 'setFormat', fmt: { bold: false } });
  });

  it('bấm Merge và Fill xuống', () => {
    const dispatch = vi.fn();
    render(<RibbonHome state={state} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: /gộp ô/i }));
    fireEvent.click(screen.getByRole('button', { name: /fill xuống/i }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'merge' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'fillDown' });
  });

  it('mọi nút đều có helpId đã khai báo', () => {
    render(<RibbonHome state={state} dispatch={() => {}} />);
    for (const btn of screen.getAllByRole('button')) {
      const id = btn.getAttribute('data-help-id');
      expect(id, btn.textContent ?? '').toBeTruthy();
      expect(HELP_IDS, id!).toHaveProperty(id!);
    }
  });
});

describe('Thanh sheet', () => {
  it('hiện tên sheet và chuyển được', () => {
    const dispatch = vi.fn();
    const two = excelSim.excelInitial({ sheets: ['Sheet1', 'Bảng tra'] });
    render(<SheetTabs state={two} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: 'Bảng tra' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'switchSheet', index: 1 });
  });

  it('nút + thêm sheet', () => {
    const dispatch = vi.fn();
    render(<SheetTabs state={state} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: /thêm sheet/i }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'addSheet' });
  });

  it('bấm đúp để đổi tên sheet', () => {
    const dispatch = vi.fn();
    render(<SheetTabs state={state} dispatch={dispatch} />);
    fireEvent.doubleClick(screen.getByRole('button', { name: 'Sheet1' }));
    const input = screen.getByTestId('sheet-rename');
    fireEvent.change(input, { target: { value: 'Bảng lương' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'renameSheet', index: 0, name: 'Bảng lương' });
  });
});
