import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { excelSim } from '@office-neko/shared';
import { Ribbon } from './Ribbon';

const ALL = ['SUM', 'AVERAGE', 'COUNT', 'MAX', 'MIN', 'AND', 'IF', 'OR', 'CONCAT', 'LEFT', 'LEN', 'MID', 'RIGHT', 'TRIM',
  'UPPER', 'TODAY', 'VLOOKUP', 'ABS', 'ROUND', 'SUMIF', 'AVERAGEIF', 'COUNTIF'];
const MENUS = ['AutoSum', 'Logical', 'Text', 'Date & Time', 'Lookup & Reference', 'Math & Trig', 'More Functions'];

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
    fireEvent.click(screen.getByRole('button', { name: 'Lookup & Reference' }));
    expect(screen.getByRole('button', { name: /^VLOOKUP/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /in đậm/i })).toBeNull();
  });

  it('bấm AutoSum ▾ › SUM thì điền sẵn cú pháp vào ô', () => {
    const dispatch = show();
    fireEvent.click(screen.getByRole('tab', { name: 'Formulas' }));
    fireEvent.click(screen.getByRole('button', { name: 'AutoSum' }));
    fireEvent.click(screen.getByRole('button', { name: /^SUM —/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'startEdit', text: '=SUM(' });
  });

  it('Formulas là một nhóm Function Library với bảy menu như Excel', () => {
    show();
    fireEvent.click(screen.getByRole('tab', { name: 'Formulas' }));
    expect([...document.querySelectorAll('[data-variant="office"] > span')].map((e) => e.textContent)).toEqual(['Function Library']);
    const seen: string[] = [];
    for (const m of MENUS) {
      fireEvent.click(screen.getByRole('button', { name: m }));
      seen.push(...within(screen.getByRole('menu')).getAllByRole('button').map((b) => b.textContent!.replace(/^Statistical › /, '')));
      fireEvent.click(screen.getByRole('button', { name: m }));
    }
    expect(seen).toEqual(ALL); // mỗi hàm đúng một chỗ, không sót, không trùng
  });

  it('SUMIF nằm ở Math & Trig như Excel thật, bấm là điền =SUMIF(', () => {
    const dispatch = show();
    fireEvent.click(screen.getByRole('tab', { name: 'Formulas' }));
    fireEvent.click(screen.getByRole('button', { name: 'Math & Trig' }));
    fireEvent.click(screen.getByRole('button', { name: /^SUMIF/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'startEdit', text: '=SUMIF(' });
  });

  it('tab File có Save As và Print như Excel', () => {
    const dispatch = show();
    fireEvent.click(screen.getByRole('tab', { name: 'File' }));
    fireEvent.click(screen.getByRole('button', { name: /lưu tệp/i }));
    fireEvent.click(screen.getByRole('button', { name: 'In' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'openDialog', dialog: 'save' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'openDialog', dialog: 'print' });
    expect(screen.getByRole('button', { name: /lưu tệp/i })).toHaveTextContent('Save As');
  });

  it('không tab nào để trống trơn — View tự giải thích vì sao nó ít nút', () => {
    // Hết 4B thì cả sáu tab đều có nội dung thật, nên `SoonTab` đã bị xoá.
    show();
    fireEvent.click(screen.getByRole('tab', { name: 'View' }));
    expect(screen.getByText(/chưa có gì để đổi/i)).toBeInTheDocument();
  });

  it('tab Insert chèn được biểu đồ', () => {
    show();
    fireEvent.click(screen.getByRole('tab', { name: 'Insert' }));
    expect(screen.getByRole('button', { name: /chèn biểu đồ/i })).toBeInTheDocument();
  });

  it('tab Data có nút sắp xếp và lọc thật', () => {
    show();
    fireEvent.click(screen.getByRole('tab', { name: 'Data' }));
    expect(screen.getByRole('button', { name: 'Sắp tăng dần' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Bật tắt lọc' })).toBeInTheDocument();
  });
});
