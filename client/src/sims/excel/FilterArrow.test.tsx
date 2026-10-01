import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { excelSim } from '@office-neko/shared';
import { ExcelSim } from './ExcelSim';

const filtered = [{ type: 'enableFilter', range: 'A1:C5' } as const].reduce(
  excelSim.reduceExcel,
  excelSim.excelInitial({
    cells: {
      A1: 'Nhân viên', B1: 'Phòng', C1: 'Lương',
      A2: 'Nam', B2: 'Kế toán', C2: '7500000',
      A3: 'Lan', B3: 'Kinh doanh', C3: '6200000',
      A4: 'Tú', B4: 'Kế toán', C4: '8100000',
      A5: 'Hoa', B5: 'Kinh doanh', C5: '6900000',
    },
  }),
);

describe('Mũi tên lọc trong ô tiêu đề', () => {
  it('mũi tên lọc nằm trong ô tiêu đề và menu không bị lưới cắt', () => {
    render(<ExcelSim initial={filtered} onState={vi.fn()} os="win" spotlight={null} />);
    expect(screen.queryByRole('button', { name: 'Mở menu lọc cột D' })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Mở menu lọc cột B' }));
    const box = screen.getByRole('checkbox', { name: 'Kế toán' });
    expect(box.closest('.overflow-auto')).toBeNull(); // portal ra body, ngoài khung cuộn của lưới
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('checkbox', { name: 'Kế toán' })).toBeNull();
  });

  it('mũi tên chỉ có ở hàng đầu vùng lọc, không lồng nút trong nút', () => {
    render(<ExcelSim initial={filtered} onState={vi.fn()} os="win" spotlight={null} />);
    const arrow = screen.getByRole('button', { name: 'Mở menu lọc cột A' });
    expect(arrow.parentElement?.closest('button')).toBeNull();
    expect(arrow.getAttribute('data-help-id')).toBe('excel.filterCol');
    expect(screen.getAllByRole('button', { name: /^Mở menu lọc cột/ })).toHaveLength(3);
  });

  it('bỏ tích một giá trị thì lọc theo phần còn lại', () => {
    const onState = vi.fn();
    render(<ExcelSim initial={filtered} onState={onState} os="win" spotlight={null} />);
    fireEvent.click(screen.getByRole('button', { name: 'Mở menu lọc cột B' }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Kinh doanh' }));
    expect(screen.queryByTestId('cell-A3')).toBeNull();
    expect(screen.getByTestId('cell-A4')).toBeInTheDocument();
  });

  it('bấm ra ngoài thì menu đóng', () => {
    render(<ExcelSim initial={filtered} onState={vi.fn()} os="win" spotlight={null} />);
    fireEvent.click(screen.getByRole('button', { name: 'Mở menu lọc cột C' }));
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('checkbox', { name: '7.500.000' })).toBeNull();
    expect(screen.queryByText('Lọc cột C')).toBeNull();
  });
});
