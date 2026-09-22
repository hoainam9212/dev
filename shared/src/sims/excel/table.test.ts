import { describe, it, expect } from 'vitest';
import { cellRaw, cellValue, excelInitial, reduceExcel, type ExcelAction, type WorkbookState } from './state';
import { filterOptions, hiddenRows, isSorted } from './table';

const run = (s: WorkbookState, ...as: ExcelAction[]) => as.reduce(reduceExcel, s);

/** Ba nhân viên, cột A tên, cột B lương; hàng 1 là tiêu đề. */
const table = () => excelInitial({
  cells: {
    A1: 'Nhân viên', B1: 'Lương',
    A2: 'Nguyễn Văn Nam', B2: '7500000',
    A3: 'Trần Thị Lan', B3: '6200000',
    A4: 'Lê Minh Tú', B4: '8100000',
  },
});

describe('sắp xếp', () => {
  it('sắp tăng dần theo cột lương, cả hàng đi theo', () => {
    const s = run(table(), { type: 'sortRange', range: 'A2:B4', by: 'B', dir: 'asc' });
    expect(cellRaw(s, 'A2')).toBe('Trần Thị Lan');
    expect(cellValue(s, 'B2')).toBe(6200000);
    expect(cellRaw(s, 'A4')).toBe('Lê Minh Tú');
  });

  it('sắp giảm dần', () => {
    const s = run(table(), { type: 'sortRange', range: 'A2:B4', by: 'B', dir: 'desc' });
    expect(cellValue(s, 'B2')).toBe(8100000);
    expect(cellValue(s, 'B4')).toBe(6200000);
  });

  it('sắp theo cột chữ, không phân biệt hoa thường', () => {
    const s = run(excelInitial({ cells: { A1: 'bút', A2: 'Áo', A3: 'Cặp' } }),
      { type: 'sortRange', range: 'A1:A3', by: 'A', dir: 'asc' });
    expect([cellRaw(s, 'A1'), cellRaw(s, 'A2'), cellRaw(s, 'A3')]).toEqual(['Áo', 'bút', 'Cặp']);
  });

  it('giữ hàng tiêu đề tại chỗ khi header: true', () => {
    const s = run(table(), { type: 'sortRange', range: 'A1:B4', by: 'B', dir: 'asc', header: true });
    expect(cellRaw(s, 'A1')).toBe('Nhân viên');
    expect(cellRaw(s, 'A2')).toBe('Trần Thị Lan');
  });

  it('ô trống luôn xuống cuối', () => {
    const s = run(excelInitial({ cells: { A1: '5', A3: '1' } }),
      { type: 'sortRange', range: 'A1:A3', by: 'A', dir: 'asc' });
    expect([cellRaw(s, 'A1'), cellRaw(s, 'A2'), cellRaw(s, 'A3')]).toEqual(['1', '5', '']);
  });

  it('công thức trong hàng đi theo hàng, KHÔNG bị dịch địa chỉ', () => {
    // Sắp xếp là đổi chỗ nội dung, không phải chép công thức sang chỗ khác.
    let s = excelInitial({ cells: { A1: '2', B1: '=A1*10', A2: '1', B2: '=A2*10' } });
    s = run(s, { type: 'sortRange', range: 'A1:B2', by: 'A', dir: 'asc' });
    expect(cellRaw(s, 'A1')).toBe('1');
    expect(cellRaw(s, 'B1')).toBe('=A2*10');
    expect(cellValue(s, 'B1')).toBe(20);
  });

  it('giữ nguyên định dạng của ô theo hàng', () => {
    let s = run(table(), { type: 'selectRange', range: 'A2:B2' }, { type: 'setFormat', fmt: { bold: true } });
    s = run(s, { type: 'sortRange', range: 'A2:B4', by: 'B', dir: 'asc' });
    // Hàng của Nam (đang đậm) tụt xuống giữa vì lương 7,5 triệu.
    expect(cellRaw(s, 'A3')).toBe('Nguyễn Văn Nam');
  });

  it('là một bước hoàn tác', () => {
    const s = run(table(), { type: 'sortRange', range: 'A2:B4', by: 'B', dir: 'asc' }, { type: 'undo' });
    expect(cellRaw(s, 'A2')).toBe('Nguyễn Văn Nam');
  });

  it('cột sắp nằm ngoài vùng thì không đổi gì', () => {
    const s = table();
    expect(reduceExcel(s, { type: 'sortRange', range: 'A2:B4', by: 'E', dir: 'asc' })).toEqual(s);
  });
});

describe('isSorted', () => {
  it('biết vùng đã sắp hay chưa', () => {
    const before = table();
    expect(isSorted(before, 'A2:B4', 'B', 'asc')).toBe(false);
    const after = reduceExcel(before, { type: 'sortRange', range: 'A2:B4', by: 'B', dir: 'asc' });
    expect(isSorted(after, 'A2:B4', 'B', 'asc')).toBe(true);
    expect(isSorted(after, 'A2:B4', 'B', 'desc')).toBe(false);
  });

  it('vùng một hàng thì coi như đã sắp', () => {
    expect(isSorted(table(), 'A2:B2', 'B', 'asc')).toBe(true);
  });
});

describe('AutoFilter', () => {
  /** Bốn nhân viên; cột C là phòng ban, hàng 1 là tiêu đề. */
  const staff = () => excelInitial({
    cells: {
      A1: 'Nhân viên', B1: 'Lương', C1: 'Phòng',
      A2: 'Nam', B2: '7500000', C2: 'Kế toán',
      A3: 'Lan', B3: '6200000', C3: 'Kinh doanh',
      A4: 'Tú', B4: '8100000', C4: 'Kế toán',
      A5: 'Hà', B5: '5500000', C5: 'Kinh doanh',
    },
  });
  const hidden = (s: WorkbookState) => [...hiddenRows(s)].sort((x, y) => x - y);

  it('bật AutoFilter thì nhớ vùng, chưa ẩn hàng nào', () => {
    const s = run(staff(), { type: 'enableFilter', range: 'A1:C5' });
    expect(s.sheets[0]!.filter).toBeTruthy();
    expect(hidden(s)).toEqual([]);
  });

  it('liệt kê giá trị của một cột, không trùng lặp, theo thứ tự xuất hiện', () => {
    const s = run(staff(), { type: 'enableFilter', range: 'A1:C5' });
    expect(filterOptions(s, 'C')).toEqual(['Kế toán', 'Kinh doanh']);
  });

  it('chọn một giá trị thì hàng khác bị ẩn, tiêu đề vẫn hiện', () => {
    const s = run(staff(),
      { type: 'enableFilter', range: 'A1:C5' },
      { type: 'setFilterValues', col: 'C', values: ['Kế toán'] });
    // Hàng 0 là tiêu đề; hàng 1 và 3 là Kế toán nên còn lại bị ẩn.
    expect(hidden(s)).toEqual([2, 4]);
  });

  it('lọc KHÔNG xoá dữ liệu, và SUM vẫn cộng cả hàng đang ẩn', () => {
    let s = run(staff(),
      { type: 'enableFilter', range: 'A1:C5' },
      { type: 'setFilterValues', col: 'C', values: ['Kế toán'] });
    expect(cellRaw(s, 'B3')).toBe('6200000');
    s = reduceExcel(s, { type: 'setCell', cell: 'B7', raw: '=SUM(B2:B5)' });
    expect(cellValue(s, 'B7')).toBe(27300000);
  });

  it('lọc hai cột thì hàng phải thoả cả hai', () => {
    const s = run(staff(),
      { type: 'enableFilter', range: 'A1:C5' },
      { type: 'setFilterValues', col: 'C', values: ['Kế toán'] },
      { type: 'setFilterValues', col: 'A', values: ['Tú'] });
    expect(hidden(s)).toEqual([1, 2, 4]);
  });

  it('chọn lại danh sách rỗng là bỏ lọc cột đó', () => {
    const s = run(staff(),
      { type: 'enableFilter', range: 'A1:C5' },
      { type: 'setFilterValues', col: 'C', values: ['Kế toán'] },
      { type: 'setFilterValues', col: 'C', values: [] });
    expect(hidden(s)).toEqual([]);
  });

  it('tắt AutoFilter thì mọi hàng hiện lại', () => {
    const s = run(staff(),
      { type: 'enableFilter', range: 'A1:C5' },
      { type: 'setFilterValues', col: 'C', values: ['Kế toán'] },
      { type: 'disableFilter' });
    expect(s.sheets[0]!.filter ?? null).toBeNull();
    expect(hidden(s)).toEqual([]);
  });

  it('chưa bật lọc thì không ẩn gì và không có lựa chọn nào', () => {
    const s = staff();
    expect(hidden(s)).toEqual([]);
    expect(filterOptions(s, 'C')).toEqual([]);
  });

  it('bật lọc là một bước hoàn tác', () => {
    const s = run(staff(), { type: 'enableFilter', range: 'A1:C5' }, { type: 'undo' });
    expect(s.sheets[0]!.filter ?? null).toBeNull();
  });
});
