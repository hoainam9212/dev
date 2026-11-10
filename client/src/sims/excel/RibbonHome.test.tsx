import { describe, it, expect, vi } from 'vitest';
import { menuItem } from '../../test/menu';
import { render, screen, fireEvent } from '@testing-library/react';
import { excelSim } from '@office-neko/shared';
import { RibbonHome } from './RibbonHome';
import { SheetTabs } from './SheetTabs';
import { HELP_IDS } from '../../content/help-ids';

const state = excelSim.excelInitial({ cells: { B2: '7500000' } });

const groupTitles = () => [...document.querySelectorAll('[data-variant="office"] > span')].map((e) => e.textContent);

describe('Ribbon Home', () => {
  it('xếp nhóm đúng như Excel 365', () => {
    render(<RibbonHome state={state} dispatch={() => {}} />);
    expect(groupTitles()).toEqual(['Undo', 'Clipboard', 'Font', 'Alignment', 'Number', 'Editing']);
  });

  it('Number Format hiện tên tiếng Anh nhưng giá trị bài học không đổi', () => {
    render(<RibbonHome state={state} dispatch={() => {}} />);
    const opts = [...screen.getByLabelText('Kiểu số').querySelectorAll('option')].map((o) => [o.value, o.textContent]);
    expect(opts).toEqual([['general', 'General'], ['number', 'Number'], ['currencyVnd', 'Currency (₫)'], ['percent', 'Percentage'], ['date', 'Short Date']]);
  });

  it('chọn Currency trong ô Number Format thì phát đúng action', () => {
    const dispatch = vi.fn();
    render(<RibbonHome state={state} dispatch={dispatch} />);
    fireEvent.change(screen.getByLabelText('Kiểu số'), { target: { value: 'currencyVnd' } });
    expect(dispatch).toHaveBeenCalledWith({ type: 'setFormat', fmt: { numFmt: 'currencyVnd' } });
  });

  it('Fill ▾ có Down và Right, Clear ▾ có Clear Contents', () => {
    const dispatch = vi.fn();
    render(<RibbonHome state={state} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: 'Fill' }));
    fireEvent.click(menuItem('Fill xuống'));
    fireEvent.click(screen.getByRole('button', { name: 'Fill' }));
    fireEvent.click(menuItem('Fill sang phải'));
    fireEvent.click(screen.getByRole('button', { name: 'Xoá' }));
    fireEvent.click(menuItem('Xoá nội dung'));
    expect(dispatch.mock.calls.map((c) => c[0].type)).toEqual(['fillDown', 'fillRight', 'clear']);
  });

  it('Borders ▾ kẻ và bỏ viền', () => {
    const dispatch = vi.fn();
    render(<RibbonHome state={state} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: 'Viền ô' }));
    fireEvent.click(menuItem('Kẻ mọi viền'));
    fireEvent.click(screen.getByRole('button', { name: 'Viền ô' }));
    fireEvent.click(menuItem('Bỏ viền'));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setFormat', fmt: { border: 'all' } });
    expect(dispatch).toHaveBeenCalledWith({ type: 'setFormat', fmt: { border: 'none' } });
  });

  it('nút mang icon như Excel, lời tiếng Việt nằm ở nhãn trợ giúp', () => {
    render(<RibbonHome state={state} dispatch={() => {}} />);
    const bold = screen.getByRole('button', { name: /in đậm/i });
    expect(bold.querySelector('svg')).not.toBeNull();
    // Lời tiếng Việt nằm ở gợi ý màu tối của app, không ở `title` (tránh hai chú thích chồng nhau).
    expect(HELP_IDS[bold.getAttribute('data-help-id')!]?.vi).toBeTruthy();
    expect(bold).not.toHaveAttribute('title');
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

  it('bấm Merge & Center', () => {
    const dispatch = vi.fn();
    render(<RibbonHome state={state} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: /gộp ô/i }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'merge' });
  });

  it('mọi nút và ô chọn đều có helpId đã khai báo', () => {
    render(<RibbonHome state={state} dispatch={() => {}} />);
    for (const box of screen.getAllByRole('combobox')) {
      const id = box.getAttribute('data-help-id');
      expect(id, box.getAttribute('aria-label') ?? '').toBeTruthy();
      expect(HELP_IDS, id!).toHaveProperty(id!);
    }
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
