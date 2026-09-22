import { describe, it, expect } from 'vitest';
import { excelInitial, reduceExcel, type ExcelAction, type WorkbookState } from './state';
import { chartData, chartsOf } from './chart';

const run = (s: WorkbookState, ...as: ExcelAction[]) => as.reduce(reduceExcel, s);
const months = () => excelInitial({
  cells: {
    A1: 'Tháng 1', B1: '12000000',
    A2: 'Tháng 2', B2: '15500000',
    A3: 'Tháng 3', B3: '9800000',
  },
});

describe('số liệu cho biểu đồ', () => {
  it('bóc nhãn ở cột đầu và số ở cột sau', () => {
    const d = chartData(months(), 'A1:B3');
    expect(d.labels).toEqual(['Tháng 1', 'Tháng 2', 'Tháng 3']);
    expect(d.values).toEqual([12000000, 15500000, 9800000]);
    expect(d.max).toBe(15500000);
  });

  it('vùng một cột thì nhãn là địa chỉ ô', () => {
    const d = chartData(months(), 'B1:B3');
    expect(d.labels).toEqual(['B1', 'B2', 'B3']);
    expect(d.values).toEqual([12000000, 15500000, 9800000]);
  });

  it('ô chữ hoặc ô lỗi trong cột số được coi là 0', () => {
    const s = excelInitial({ cells: { A1: 'x', B1: 'chữ', A2: 'y', B2: '=1/0', A3: 'z', B3: '5' } });
    const d = chartData(s, 'A1:B3');
    expect(d.values).toEqual([0, 0, 5]);
    expect(d.max).toBe(5);
  });

  it('vùng rỗng thì max là 0, để chỗ vẽ không chia cho 0', () => {
    expect(chartData(excelInitial(), 'A1:B3').max).toBe(0);
  });
});

describe('chèn và xoá biểu đồ', () => {
  const chart = { id: 'c1', type: 'column' as const, range: 'A1:B3', title: 'Doanh thu' };

  it('chèn biểu đồ vào sheet đang mở', () => {
    expect(chartsOf(run(months(), { type: 'insertChart', chart }))).toEqual([chart]);
  });

  it('xoá biểu đồ theo id', () => {
    const s = run(months(), { type: 'insertChart', chart }, { type: 'removeChart', id: 'c1' });
    expect(chartsOf(s)).toEqual([]);
  });

  it('chèn biểu đồ là một bước hoàn tác', () => {
    const s = run(months(), { type: 'insertChart', chart }, { type: 'undo' });
    expect(chartsOf(s)).toEqual([]);
  });

  it('mỗi sheet giữ biểu đồ riêng', () => {
    let s = excelInitial({ sheets: ['Sheet1', 'Sheet2'] });
    s = run(s, { type: 'insertChart', chart }, { type: 'switchSheet', index: 1 });
    expect(chartsOf(s)).toEqual([]);
  });
});
