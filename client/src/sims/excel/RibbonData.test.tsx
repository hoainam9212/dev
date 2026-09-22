import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { excelSim } from '@office-neko/shared';
import { RibbonData } from './RibbonData';
import { ExcelSim } from './ExcelSim';
import { HELP_IDS } from '../../content/help-ids';

const staff = () => excelSim.excelInitial({
  cells: {
    A1: 'Nhân viên', B1: 'Lương', C1: 'Phòng',
    A2: 'Nam', B2: '7500000', C2: 'Kế toán',
    A3: 'Lan', B3: '6200000', C3: 'Kinh doanh',
    A4: 'Tú', B4: '8100000', C4: 'Kế toán',
  },
});
const run = (s: excelSim.WorkbookState, ...as: excelSim.ExcelAction[]) => as.reduce(excelSim.reduceExcel, s);

describe('Tab Data', () => {
  it('chọn cột rồi bấm A→Z thì sắp vùng đang chọn tăng dần', () => {
    const dispatch = vi.fn();
    const s = run(staff(), { type: 'selectRange', range: 'A2:C4' });
    render(<RibbonData state={s} dispatch={dispatch} />);
    fireEvent.change(screen.getByLabelText('Cột cần sắp'), { target: { value: 'B' } });
    fireEvent.click(screen.getByRole('button', { name: /A→Z/i }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'sortRange', range: 'A2:C4', by: 'B', dir: 'asc' });
  });

  it('Z→A sắp giảm dần', () => {
    const dispatch = vi.fn();
    const s = run(staff(), { type: 'selectRange', range: 'A2:C4' });
    render(<RibbonData state={s} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: /Z→A/i }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'sortRange', dir: 'desc' }));
  });

  it('Filter bật AutoFilter cho vùng đang chọn', () => {
    const dispatch = vi.fn();
    const s = run(staff(), { type: 'selectRange', range: 'A1:C4' });
    render(<RibbonData state={s} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: /^Filter/i }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'enableFilter', range: 'A1:C4' });
  });

  it('đang lọc thì bấm Filter lần nữa là tắt', () => {
    const dispatch = vi.fn();
    const s = run(staff(), { type: 'selectRange', range: 'A1:C4' }, { type: 'enableFilter', range: 'A1:C4' });
    render(<RibbonData state={s} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: /^Filter/i }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'disableFilter' });
  });

  it('đang lọc thì mỗi cột của vùng có nút mở menu lọc', () => {
    const s = run(staff(), { type: 'enableFilter', range: 'A1:C4' });
    render(<RibbonData state={s} dispatch={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /lọc cột C/i }));
    expect(screen.getByRole('checkbox', { name: 'Kế toán' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Kinh doanh' })).toBeInTheDocument();
  });

  it('bỏ tích một giá trị thì phát setFilterValues với phần còn lại', () => {
    const dispatch = vi.fn();
    const s = run(staff(), { type: 'enableFilter', range: 'A1:C4' });
    render(<RibbonData state={s} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: /lọc cột C/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Kinh doanh' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setFilterValues', col: 'C', values: ['Kế toán'] });
  });

  it('mọi nút và ô chọn đều có helpId đã khai báo', () => {
    render(<RibbonData state={staff()} dispatch={() => {}} />);
    for (const el of [...screen.getAllByRole('button'), ...screen.getAllByRole('combobox')]) {
      const id = el.getAttribute('data-help-id');
      expect(id, el.getAttribute('aria-label') ?? '').toBeTruthy();
      expect(HELP_IDS, id!).toHaveProperty(id!);
    }
  });
});

describe('Lưới khi đang lọc', () => {
  const show = (s: excelSim.WorkbookState) =>
    render(<ExcelSim initial={s} onState={() => {}} os="win" spotlight={null} />);

  it('ẩn hàng không thoả điều kiện, giữ số hàng thật', () => {
    const s = run(staff(),
      { type: 'enableFilter', range: 'A1:C4' },
      { type: 'setFilterValues', col: 'C', values: ['Kế toán'] });
    show(s);
    expect(screen.getByTestId('cell-A2')).toBeInTheDocument();
    expect(screen.queryByTestId('cell-A3')).toBeNull();
    expect(screen.getByTestId('cell-A4')).toBeInTheDocument();
    expect(screen.getByTestId('rowhead-4')).toBeInTheDocument();
  });

  it('không lọc thì không ẩn hàng nào', () => {
    show(staff());
    expect(screen.getByTestId('cell-A3')).toBeInTheDocument();
  });
});
