import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { excelSim } from '@office-neko/shared';
import { RibbonData } from './RibbonData';
import { ExcelSim } from './ExcelSim';
import { HELP_IDS } from '../../content/help-ids';

/** Bốn nhân viên: A tên, B phòng, C lương; hàng 1 là tiêu đề. */
const state = excelSim.excelInitial({
  cells: {
    A1: 'Nhân viên', B1: 'Phòng', C1: 'Lương',
    A2: 'Nam', B2: 'Kế toán', C2: '7500000',
    A3: 'Lan', B3: 'Kinh doanh', C3: '6200000',
    A4: 'Tú', B4: 'Kế toán', C4: '8100000',
    A5: 'Hoa', B5: 'Kinh doanh', C5: '6900000',
  },
});
const run = (s: excelSim.WorkbookState, ...as: excelSim.ExcelAction[]) => as.reduce(excelSim.reduceExcel, s);

describe('Thẻ Data › Sort & Filter', () => {
  it('kéo chọn từ C5 lên A2 rồi Z→A thì sắp theo cột C — cột của ô neo', () => {
    const dispatch = vi.fn();
    const s = { ...state, sel: { from: { row: 4, col: 2 }, to: { row: 1, col: 0 } } };
    render(<RibbonData state={s} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: 'Sắp giảm dần' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'sortRange', range: 'A2:C5', by: 'C', dir: 'desc' });
  });

  it('chỉ chọn một ô thì A→Z sắp cả bảng, chừa hàng tiêu đề', () => {
    const dispatch = vi.fn();
    render(<RibbonData state={run(state, { type: 'select', cell: 'B3' })} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: 'Sắp tăng dần' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'sortRange', range: 'A2:C5', by: 'B', dir: 'asc' });
  });

  it('nút Sort mở hộp thoại Sort', () => {
    const dispatch = vi.fn();
    render(<RibbonData state={state} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: 'Sắp xếp tuỳ chọn' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'openDialog', dialog: 'sort' });
  });

  it('nhóm mang tên Sort & Filter, không còn ô "Cột cần sắp"', () => {
    render(<RibbonData state={state} dispatch={() => {}} />);
    expect(screen.getByText('Sort & Filter')).toBeInTheDocument();
    expect(screen.queryByLabelText('Cột cần sắp')).toBeNull();
  });

  it('Filter bật AutoFilter cho vùng đang chọn', () => {
    const dispatch = vi.fn();
    render(<RibbonData state={run(state, { type: 'selectRange', range: 'A1:C5' })} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: 'Bật tắt lọc' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'enableFilter', range: 'A1:C5' });
  });

  it('chỉ đứng một ô thì Filter bật cho cả bảng, gồm hàng tiêu đề', () => {
    const dispatch = vi.fn();
    render(<RibbonData state={run(state, { type: 'select', cell: 'C4' })} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: 'Bật tắt lọc' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'enableFilter', range: 'A1:C5' });
  });

  it('đang lọc thì bấm Filter lần nữa là tắt, và trên ribbon không còn nút "B ▾"', () => {
    const dispatch = vi.fn();
    render(<RibbonData state={run(state, { type: 'enableFilter', range: 'A1:C5' })} dispatch={dispatch} />);
    expect(screen.queryByRole('button', { name: /lọc cột/ })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Bật tắt lọc' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'disableFilter' });
  });

  it('mọi nút đều có helpId đã khai báo', () => {
    render(<RibbonData state={state} dispatch={() => {}} />);
    for (const el of screen.getAllByRole('button')) {
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
    show(run(state,
      { type: 'enableFilter', range: 'A1:C5' },
      { type: 'setFilterValues', col: 'B', values: ['Kế toán'] }));
    expect(screen.getByTestId('cell-A2')).toBeInTheDocument();
    expect(screen.queryByTestId('cell-A3')).toBeNull();
    expect(screen.getByTestId('cell-A4')).toBeInTheDocument();
    expect(screen.getByTestId('rowhead-4')).toBeInTheDocument();
  });

  it('không lọc thì không ẩn hàng nào', () => {
    show(state);
    expect(screen.getByTestId('cell-A3')).toBeInTheDocument();
  });
});
