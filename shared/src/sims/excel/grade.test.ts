import { describe, it, expect } from 'vitest';
import { GRADERS, gradeWith } from '../../grading';
import { excelInitial, reduceExcel, type ExcelAction, type WorkbookState } from './state';
import { gradeExcel, type ExcelCheck } from './grade';

const run = (s: WorkbookState, ...as: ExcelAction[]) => as.reduce(reduceExcel, s);
const check = (s: WorkbookState, ...cs: ExcelCheck[]) => gradeWith(gradeExcel, s, cs);

describe('chấm bài Excel', () => {
  it('đã đăng ký vào GRADERS', () => {
    expect(GRADERS.excel).toBeDefined();
  });

  it('cellValue so sánh GIÁ TRỊ đã tính', () => {
    const s = excelInitial({ cells: { A1: '10', A2: '20', A3: '=SUM(A1:A2)' } });
    expect(check(s, { kind: 'cellValue', cell: 'A3', value: 30 }).pass).toBe(true);
    expect(check(s, { kind: 'cellValue', cell: 'A3', value: 31 }).pass).toBe(false);
  });

  it('cellValue với chữ thì bỏ qua hoa thường và khoảng trắng thừa', () => {
    const s = excelInitial({ cells: { A1: '  Nguyễn Văn Nam ' } });
    expect(check(s, { kind: 'cellValue', cell: 'A1', value: 'nguyễn văn nam' }).pass).toBe(true);
  });

  it('cellFormula đòi đúng hàm và đúng vùng', () => {
    const s = excelInitial({ cells: { B5: '=SUM(B1:B4)' } });
    expect(check(s, { kind: 'cellFormula', cell: 'B5', fn: 'SUM', range: 'B1:B4' }).pass).toBe(true);
    expect(check(s, { kind: 'cellFormula', cell: 'B5', fn: 'AVERAGE' }).pass).toBe(false);
  });

  it('cellFormula bắt được cộng tay thay vì dùng SUM', () => {
    const s = excelInitial({ cells: { B5: '=B1+B2+B3+B4' } });
    const r = check(s, { kind: 'cellFormula', cell: 'B5', fn: 'SUM' });
    expect(r.pass).toBe(false);
    expect(r.results[0]!.messageVi).toContain('SUM');
  });

  it('absolute đòi có dấu $', () => {
    const yes = excelInitial({ cells: { C2: '=B2*$E$1' } });
    const no = excelInitial({ cells: { C2: '=B2*E1' } });
    expect(check(yes, { kind: 'cellFormula', cell: 'C2', absolute: true }).pass).toBe(true);
    expect(check(no, { kind: 'cellFormula', cell: 'C2', absolute: true }).pass).toBe(false);
  });

  it('ô chưa có công thức thì báo là chưa có, không nổ', () => {
    const s = excelInitial({ cells: { B5: '30' } });
    const r = check(s, { kind: 'cellFormula', cell: 'B5', fn: 'SUM' });
    expect(r.pass).toBe(false);
    expect(r.results[0]!.messageVi).toContain('=');
  });

  it('cellFormat chỉ xét những thuộc tính được nêu', () => {
    const s = run(excelInitial({ cells: { B2: '7500000' } }), { type: 'select', cell: 'B2' },
      { type: 'setFormat', fmt: { numFmt: 'currencyVnd', bold: true } });
    expect(check(s, { kind: 'cellFormat', cell: 'B2', fmt: { numFmt: 'currencyVnd' } }).pass).toBe(true);
    expect(check(s, { kind: 'cellFormat', cell: 'B2', fmt: { numFmt: 'percent' } }).pass).toBe(false);
  });

  it('merged và sheetNamed', () => {
    let s = run(excelInitial(), { type: 'selectRange', range: 'A1:C1' }, { type: 'merge' });
    expect(check(s, { kind: 'merged', range: 'A1:C1' }).pass).toBe(true);
    s = reduceExcel(s, { type: 'renameSheet', index: 0, name: 'Bảng lương' });
    expect(check(s, { kind: 'sheetNamed', name: 'Bảng lương' }).pass).toBe(true);
  });

  it('check trên sheet khác', () => {
    let s = excelInitial({ sheets: ['Sheet1', 'Sheet2'] });
    s = run(s, { type: 'switchSheet', index: 1 }, { type: 'setCell', cell: 'A1', raw: '9' });
    expect(check(s, { kind: 'cellValue', cell: 'A1', value: 9, sheet: 'Sheet2' }).pass).toBe(true);
  });

  it('cellNotEmpty đạt với BẤT KỲ nội dung nào', () => {
    // Dùng cho những bài bảo "gõ tên của bạn": đáp án không thể là một chữ cố định.
    for (const raw of ['Nguyễn Văn Nam', 'Lan', '7']) {
      const s = excelInitial({ cells: { C3: raw } });
      expect(check(s, { kind: 'cellNotEmpty', cell: 'C3' }).pass, raw).toBe(true);
    }
  });

  it('cellNotEmpty không đạt khi ô trống hoặc chỉ có khoảng trắng', () => {
    expect(check(excelInitial(), { kind: 'cellNotEmpty', cell: 'C3' }).pass).toBe(false);
    expect(check(excelInitial({ cells: { C3: '   ' } }), { kind: 'cellNotEmpty', cell: 'C3' }).pass).toBe(false);
  });

  it('gộp mọi câu báo lỗi, không dừng ở check đầu tiên', () => {
    const s = excelInitial();
    const r = check(s, { kind: 'cellValue', cell: 'A1', value: 1 }, { kind: 'cellValue', cell: 'A2', value: 2 });
    expect(r.results).toHaveLength(2);
    expect(r.results.every((x) => !x.ok)).toBe(true);
  });

  it('ô lỗi công thức thì câu chấm nói ra mã lỗi', () => {
    const s = excelInitial({ cells: { A1: '=1/0' } });
    const r = check(s, { kind: 'cellValue', cell: 'A1', value: 5 });
    expect(r.results[0]!.messageVi).toContain('#DIV/0!');
  });
});

describe('chấm sắp xếp, lọc và biểu đồ', () => {
  const staff = () => excelInitial({
    cells: {
      A1: 'Nhân viên', B1: 'Lương', C1: 'Phòng',
      A2: 'Nam', B2: '7500000', C2: 'Kế toán',
      A3: 'Lan', B3: '6200000', C3: 'Kinh doanh',
    },
  });

  it('rangeSorted sai trước khi sắp, đúng sau khi sắp', () => {
    const before = staff();
    expect(check(before, { kind: 'rangeSorted', range: 'A2:C3', by: 'B', dir: 'asc' }).pass).toBe(false);
    const after = reduceExcel(before, { type: 'sortRange', range: 'A2:C3', by: 'B', dir: 'asc' });
    expect(check(after, { kind: 'rangeSorted', range: 'A2:C3', by: 'B', dir: 'asc' }).pass).toBe(true);
  });

  it('filterActive đòi đúng cột, và đòi đúng giá trị nếu check nói rõ', () => {
    const s = run(staff(),
      { type: 'enableFilter', range: 'A1:C3' },
      { type: 'setFilterValues', col: 'C', values: ['Kế toán'] });
    expect(check(s, { kind: 'filterActive', col: 'C' }).pass).toBe(true);
    expect(check(s, { kind: 'filterActive', col: 'C', values: ['Kế toán'] }).pass).toBe(true);
    expect(check(s, { kind: 'filterActive', col: 'C', values: ['Kinh doanh'] }).pass).toBe(false);
    expect(check(s, { kind: 'filterActive', col: 'A' }).pass).toBe(false);
  });

  it('chart đòi đúng loại, và đúng vùng nếu check nói rõ', () => {
    const s = reduceExcel(staff(), {
      type: 'insertChart',
      chart: { id: 'c1', type: 'pie', range: 'A2:B3', title: 'Lương' },
    });
    expect(check(s, { kind: 'chart', chartType: 'pie' }).pass).toBe(true);
    expect(check(s, { kind: 'chart', chartType: 'pie', range: 'A2:B3' }).pass).toBe(true);
    expect(check(s, { kind: 'chart', chartType: 'column' }).pass).toBe(false);
    expect(check(s, { kind: 'chart', chartType: 'pie', range: 'A1:B9' }).pass).toBe(false);
  });

  it('chart đòi đúng tiêu đề nếu check nói rõ — bỏ tên gốc "Chart Title" là chưa xong', () => {
    const s = reduceExcel(staff(), {
      type: 'insertChart',
      chart: { id: 'c1', type: 'pie', range: 'A2:B3', title: 'Chart Title' },
    });
    const r = check(s, { kind: 'chart', chartType: 'pie', title: 'Lương' });
    expect(r.pass).toBe(false);
    expect(r.results[0]!.messageVi).toContain('Chart Title');
    const named = reduceExcel(s, { type: 'setChartTitle', id: 'c1', title: 'lương ' });
    expect(check(named, { kind: 'chart', chartType: 'pie', title: 'Lương' }).pass).toBe(true);
  });

  it('câu báo lỗi nói rõ phải làm gì', () => {
    const r = check(staff(), { kind: 'chart', chartType: 'column' });
    expect(r.results[0]!.messageVi).toContain('biểu đồ cột');
  });
});
