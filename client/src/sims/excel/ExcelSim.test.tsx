import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { excelSim } from '@office-neko/shared';
import { ExcelSim } from './ExcelSim';

const initial = excelSim.excelInitial({ cells: { A1: 'Họ tên', B1: '10', B2: '20' } });
const show = (state = initial, onState: (s: excelSim.WorkbookState) => void = () => {}) =>
  render(<ExcelSim initial={state} onState={onState} os="win" spotlight={null} />);

describe('ExcelSim', () => {
  it('hiện chữ trong ô và tên cột', () => {
    show();
    expect(screen.getByTestId('cell-A1')).toHaveTextContent('Họ tên');
    expect(screen.getByTestId('colhead-A')).toBeInTheDocument();
  });

  it('bấm vào ô thì Name Box đổi theo', () => {
    show();
    fireEvent.click(screen.getByTestId('cell-B2'));
    expect(screen.getByTestId('name-box')).toHaveTextContent('B2');
  });

  it('gõ công thức rồi Enter thì ô hiện kết quả và báo state ra ngoài', () => {
    const onState = vi.fn();
    show(initial, onState);
    fireEvent.click(screen.getByTestId('cell-B3'));
    fireEvent.change(screen.getByTestId('formula-input'), { target: { value: '=SUM(B1:B2)' } });
    fireEvent.keyDown(screen.getByTestId('formula-input'), { key: 'Enter' });
    expect(screen.getByTestId('cell-B3')).toHaveTextContent('30');
    const last = onState.mock.calls.at(-1)![0] as excelSim.WorkbookState;
    expect(excelSim.cellRaw(last, 'B3')).toBe('=SUM(B1:B2)');
  });

  it('thanh công thức hiện CÔNG THỨC còn ô hiện kết quả', () => {
    const s = excelSim.reduceExcel(initial, { type: 'setCell', cell: 'B3', raw: '=B1+B2' });
    show(s);
    fireEvent.click(screen.getByTestId('cell-B3'));
    expect(screen.getByTestId('formula-input')).toHaveValue('=B1+B2');
    expect(screen.getByTestId('cell-B3')).toHaveTextContent('30');
  });

  it('mũi tên di chuyển ô đang chọn', () => {
    show();
    fireEvent.click(screen.getByTestId('cell-A1'));
    fireEvent.keyDown(screen.getByTestId('grid'), { key: 'ArrowDown' });
    expect(screen.getByTestId('name-box')).toHaveTextContent('A2');
  });

  it('gõ thẳng vào lưới thì bắt đầu sửa ô', () => {
    show();
    fireEvent.click(screen.getByTestId('cell-C1'));
    fireEvent.keyDown(screen.getByTestId('grid'), { key: '5' });
    expect(screen.getByTestId('formula-input')).toHaveValue('5');
  });

  it('Delete xoá ô đang chọn', () => {
    const s = excelSim.excelInitial({ cells: { A1: 'xoá tôi' } });
    show(s);
    fireEvent.click(screen.getByTestId('cell-A1'));
    fireEvent.keyDown(screen.getByTestId('grid'), { key: 'Delete' });
    expect(screen.getByTestId('cell-A1')).toHaveTextContent('');
  });

  it('gõ vào lưới thì con trỏ nhảy sang thanh công thức', () => {
    // Nếu con trỏ ở lại lưới thì các ký tự sau rơi vào hư không — lỗi này chỉ
    // lộ ra khi gõ thật trên trình duyệt, jsdom bắn thẳng sự kiện nên không thấy.
    show();
    fireEvent.click(screen.getByTestId('cell-C1'));
    fireEvent.keyDown(screen.getByTestId('grid'), { key: '=' });
    expect(document.activeElement).toBe(screen.getByTestId('formula-input'));
  });

  it('Enter trên lưới ghi lại ô đang sửa', () => {
    show();
    fireEvent.click(screen.getByTestId('cell-C1'));
    fireEvent.keyDown(screen.getByTestId('grid'), { key: '7' });
    fireEvent.keyDown(screen.getByTestId('grid'), { key: 'Enter' });
    expect(screen.getByTestId('cell-C1')).toHaveTextContent('7');
    expect(screen.getByTestId('name-box')).toHaveTextContent('C2');
  });

  it('sửa xong thì con trỏ về lại lưới, gõ tiếp là đi tiếp được', () => {
    show();
    fireEvent.click(screen.getByTestId('cell-C1'));
    fireEvent.keyDown(screen.getByTestId('grid'), { key: '7' });
    fireEvent.keyDown(screen.getByTestId('formula-input'), { key: 'Enter' });
    expect(document.activeElement).toBe(screen.getByTestId('grid'));
  });

  it('nhắc nhẹ khi quên dấu bằng', () => {
    const s = excelSim.reduceExcel(initial, { type: 'setCell', cell: 'C1', raw: 'SUM(B1:B2)' });
    show(s);
    fireEvent.click(screen.getByTestId('cell-C1'));
    expect(screen.getByText(/quên dấu =/i)).toBeInTheDocument();
  });

  it('ô lỗi hiện mã lỗi kèm lời giải thích tiếng Việt', () => {
    const s = excelSim.reduceExcel(initial, { type: 'setCell', cell: 'C1', raw: '=1/0' });
    show(s);
    expect(screen.getByTestId('cell-C1')).toHaveTextContent('#DIV/0!');
    fireEvent.click(screen.getByTestId('cell-C1'));
    expect(screen.getByText(/chia cho số không/i)).toBeInTheDocument();
  });

  it('số căn phải, chữ căn trái', () => {
    show();
    expect(screen.getByTestId('cell-B1').className).toContain('text-right');
    expect(screen.getByTestId('cell-A1').className).toContain('text-left');
  });
});
