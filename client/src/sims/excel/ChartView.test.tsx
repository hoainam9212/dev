import { describe, it, expect, vi } from 'vitest';
import { menuItem } from '../../test/menu';
import { render, screen, fireEvent } from '@testing-library/react';
import { excelSim } from '@office-neko/shared';
import { ChartView } from './ChartView';
import { RibbonInsert } from './RibbonInsert';
import { HELP_IDS } from '../../content/help-ids';

const months = () => excelSim.excelInitial({
  cells: { A1: 'Tháng 1', B1: '12000000', A2: 'Tháng 2', B2: '15500000', A3: 'Tháng 3', B3: '9800000' },
});
const chart = (type: excelSim.Chart['type']): excelSim.Chart =>
  ({ id: 'c1', type, range: 'A1:B3', title: 'Doanh thu' });

describe('ChartView', () => {
  it('cột: một hình chữ nhật cho mỗi giá trị, cao thấp đúng tỉ lệ', () => {
    render(<ChartView state={months()} chart={chart('column')} onRemove={() => {}} />);
    const bars = screen.getAllByTestId(/^chart-bar-/);
    expect(bars).toHaveLength(3);
    const h = (i: number) => Number(bars[i]!.getAttribute('height'));
    expect(h(1)).toBeGreaterThan(h(0));
    expect(h(0)).toBeGreaterThan(h(2));
  });

  it('thanh ngang: một thanh cho mỗi giá trị, dài ngắn đúng tỉ lệ', () => {
    render(<ChartView state={months()} chart={chart('bar')} onRemove={() => {}} />);
    const bars = screen.getAllByTestId(/^chart-bar-/);
    expect(bars).toHaveLength(3);
    expect(Number(bars[1]!.getAttribute('width'))).toBeGreaterThan(Number(bars[0]!.getAttribute('width')));
  });

  it('tròn: một múi cho mỗi giá trị', () => {
    render(<ChartView state={months()} chart={chart('pie')} onRemove={() => {}} />);
    expect(screen.getAllByTestId(/^chart-slice-/)).toHaveLength(3);
  });

  it('đường: một đường gấp khúc và ba điểm', () => {
    render(<ChartView state={months()} chart={chart('line')} onRemove={() => {}} />);
    expect(screen.getByTestId('chart-line')).toBeInTheDocument();
    expect(screen.getAllByTestId(/^chart-dot-/)).toHaveLength(3);
  });

  it('hiện tiêu đề và nhãn lấy từ bảng', () => {
    render(<ChartView state={months()} chart={chart('column')} onRemove={() => {}} />);
    expect(screen.getByText('Doanh thu')).toBeInTheDocument();
    expect(screen.getByText('Tháng 2')).toBeInTheDocument();
  });

  it('có aria-label đọc được bằng tiếng Việt', () => {
    render(<ChartView state={months()} chart={chart('column')} onRemove={() => {}} />);
    const svg = screen.getByRole('img');
    expect(svg.getAttribute('aria-label')).toContain('Doanh thu');
    expect(svg.getAttribute('aria-label')).toContain('Tháng 1');
  });

  it('vùng chưa có số thì nói ra, không chia cho 0', () => {
    render(<ChartView state={excelSim.excelInitial()} chart={chart('column')} onRemove={() => {}} />);
    expect(screen.getByText(/chưa có số/i)).toBeInTheDocument();
    expect(screen.queryAllByTestId(/^chart-bar-/)).toHaveLength(0);
  });

  it('nhãn dài bị cắt bớt để không tràn ra ngoài khung vẽ', () => {
    // Tên tiếng Việt đầy đủ vẽ hết sẽ chạy ra ngoài viewBox và bị cụt trông như lỗi.
    const s = excelSim.excelInitial({ cells: { A1: 'Nguyễn Văn Nam', B1: '100' } });
    render(<ChartView state={s} chart={{ id: 'c1', type: 'column', range: 'A1:B1', title: 'T' }} onRemove={() => {}} />);
    expect(screen.getByText('Nguyễn Văn…')).toBeInTheDocument();
    // Tên đầy đủ vẫn còn trong aria-label để trình đọc màn hình đọc được.
    expect(screen.getByRole('img').getAttribute('aria-label')).toContain('Nguyễn Văn Nam');
  });

  it('nhãn đầu và cuối của biểu đồ đường neo vào trong, không căn giữa ở mép', () => {
    render(<ChartView state={months()} chart={chart('line')} onRemove={() => {}} />);
    const texts = [...screen.getByRole('img').querySelectorAll('text')];
    expect(texts[0]!.getAttribute('text-anchor')).toBe('start');
    expect(texts[texts.length - 1]!.getAttribute('text-anchor')).toBe('end');
  });

  it('nút ✕ gọi onRemove', () => {
    const onRemove = vi.fn();
    render(<ChartView state={months()} chart={chart('column')} onRemove={onRemove} />);
    fireEvent.click(screen.getByRole('button', { name: /xoá biểu đồ/i }));
    expect(onRemove).toHaveBeenCalled();
  });
});

describe('Sửa tiêu đề ngay trên biểu đồ', () => {
  it('bấm tiêu đề, gõ chữ mới rồi Enter thì gọi onRename', () => {
    const onRename = vi.fn();
    render(<ChartView state={months()} chart={chart('column')} onRemove={() => {}} onRename={onRename} />);
    const title = screen.getByRole('button', { name: 'Sửa tiêu đề biểu đồ' });
    expect(title.getAttribute('data-help-id')).toBe('excel.chartTitle');
    fireEvent.click(title);
    const input = screen.getByLabelText('Tiêu đề biểu đồ') as HTMLInputElement;
    expect(input.value).toBe('Doanh thu');
    expect([input.selectionStart, input.selectionEnd]).toEqual([0, 'Doanh thu'.length]);
    fireEvent.change(input, { target: { value: 'Lương' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onRename).toHaveBeenCalledWith('Lương');
    expect(screen.queryByLabelText('Tiêu đề biểu đồ')).toBeNull();
  });

  it('Esc thì thôi sửa, không gọi onRename, tiêu đề cũ vẫn hiện', () => {
    const onRename = vi.fn();
    render(<ChartView state={months()} chart={chart('column')} onRemove={() => {}} onRename={onRename} />);
    fireEvent.click(screen.getByRole('button', { name: 'Sửa tiêu đề biểu đồ' }));
    const input = screen.getByLabelText('Tiêu đề biểu đồ');
    fireEvent.change(input, { target: { value: 'Lương' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(onRename).not.toHaveBeenCalled();
    expect(screen.getByText('Doanh thu')).toBeInTheDocument();
  });

  it('rời ô nhập cũng là xong', () => {
    const onRename = vi.fn();
    render(<ChartView state={months()} chart={chart('column')} onRemove={() => {}} onRename={onRename} />);
    fireEvent.click(screen.getByRole('button', { name: 'Sửa tiêu đề biểu đồ' }));
    const input = screen.getByLabelText('Tiêu đề biểu đồ');
    fireEvent.change(input, { target: { value: 'Quý 1' } });
    fireEvent.blur(input);
    expect(onRename).toHaveBeenCalledTimes(1);
    expect(onRename).toHaveBeenCalledWith('Quý 1');
  });
});

describe('Thẻ Insert › Charts', () => {
  it('Insert Pie Chart › Pie chèn biểu đồ tròn cho vùng đang chọn, id không dùng thời gian thực', () => {
    const dispatch = vi.fn();
    const s = excelSim.reduceExcel(months(), { type: 'selectRange', range: 'A1:B3' });
    render(<RibbonInsert state={s} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: 'Biểu đồ tròn' }));
    fireEvent.click(menuItem('Pie'));
    expect(dispatch).toHaveBeenCalledWith({
      type: 'insertChart',
      chart: { id: 'chart-0', type: 'pie', range: 'A1:B3', title: 'Chart Title' },
    });
  });

  it('menu cột có cả Clustered Bar, menu đường có Line', () => {
    const dispatch = vi.fn();
    render(<RibbonInsert state={months()} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: 'Biểu đồ cột hoặc thanh' }));
    fireEvent.click(menuItem('Clustered Bar'));
    expect(dispatch).toHaveBeenLastCalledWith(expect.objectContaining({ chart: expect.objectContaining({ type: 'bar' }) }));
    fireEvent.click(screen.getByRole('button', { name: 'Biểu đồ đường' }));
    fireEvent.click(menuItem('Line'));
    expect(dispatch).toHaveBeenLastCalledWith(expect.objectContaining({ chart: expect.objectContaining({ type: 'line' }) }));
  });

  it('nhóm Charts, không còn ô loại / ô tiêu đề / nút Chèn biểu đồ, vẫn nói vẽ từ vùng nào', () => {
    render(<RibbonInsert state={excelSim.reduceExcel(months(), { type: 'selectRange', range: 'A1:B3' })} dispatch={() => {}} />);
    expect(screen.getByText('Charts')).toBeInTheDocument();
    expect(screen.queryByLabelText('Loại biểu đồ')).toBeNull();
    expect(screen.queryByLabelText('Tiêu đề biểu đồ')).toBeNull();
    expect(screen.queryByRole('button', { name: /chèn biểu đồ/i })).toBeNull();
    expect(screen.getByText('A1:B3')).toBeInTheDocument();
  });

  it('mọi nút đều có helpId đã khai báo', () => {
    render(<RibbonInsert state={months()} dispatch={() => {}} />);
    for (const el of screen.getAllByRole('button')) {
      const id = el.getAttribute('data-help-id');
      expect(id, el.getAttribute('aria-label') ?? '').toBeTruthy();
      expect(HELP_IDS, id!).toHaveProperty(id!);
    }
  });
});
