import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { wordSim } from '@office-neko/shared';
import { Ribbon, WordDialogs } from './Ribbon';   // Ribbon.tsx re-export WordDialogs từ dialogs.tsx

const base = () => wordSim.wordInitial({ text: 'công ty ABC và công ty ABC' });

const withTable = () => wordSim.reduceWord(base(), { type: 'insertTable', rows: 2, cols: 2 });
const withImage = () => wordSim.reduceWord(base(), { type: 'insertImage', src: '/images/word/meo.svg', alt: 'Mèo' });
const groupTitles = () => [...document.querySelectorAll('[data-variant="office"] > span')].map((e) => e.textContent);

describe('Ribbon tabs', () => {
  it('lays Home out in the groups and order of Word 365', () => {
    render(<Ribbon state={base()} dispatch={vi.fn()} />);
    expect(groupTitles()).toEqual(['Undo', 'Font', 'Paragraph', 'Styles', 'Editing']);
  });

  it('picks a table size from the Insert › Table grid, as in Word', () => {
    const dispatch = vi.fn();
    render(<Ribbon state={base()} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Insert' }));
    expect(groupTitles()).toEqual(['Tables', 'Illustrations']);
    fireEvent.click(screen.getByRole('button', { name: 'Chèn bảng' }));
    fireEvent.click(screen.getByRole('button', { name: 'Bảng 3 hàng × 2 cột' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'insertTable', rows: 3, cols: 2 });
    fireEvent.click(screen.getByRole('button', { name: 'Chèn ảnh' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'openDialog', dialog: 'image' });
  });

  it('opens Find & Replace from Home › Editing, where Word keeps it', () => {
    const dispatch = vi.fn();
    render(<Ribbon state={base()} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: 'Tìm và thay thế' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'openDialog', dialog: 'find' });
  });

  it('inserts and updates a table of contents from References', () => {
    const dispatch = vi.fn();
    render(<Ribbon state={base()} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('tab', { name: 'References' }));
    expect(groupTitles()).toEqual(['Table of Contents']);
    fireEvent.click(screen.getByRole('button', { name: 'Chèn mục lục' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cập nhật mục lục' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'insertToc' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'refreshToc' });
  });

  it('saves and prints from File', () => {
    const dispatch = vi.fn();
    render(<Ribbon state={base()} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('tab', { name: 'File' }));
    fireEvent.click(screen.getByRole('button', { name: 'Lưu văn bản' }));
    fireEvent.click(screen.getByRole('button', { name: 'In thử' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'openDialog', dialog: 'save' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'openDialog', dialog: 'print' });
  });

  it('shows Picture Format only when the document has a picture', () => {
    const dispatch = vi.fn();
    const { rerender } = render(<Ribbon state={base()} dispatch={dispatch} />);
    expect(screen.queryByRole('tab', { name: 'Picture Format' })).toBeNull();
    rerender(<Ribbon state={withImage()} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Picture Format' }));
    expect(groupTitles()).toEqual(['Size']);
    fireEvent.click(screen.getByRole('button', { name: 'Độ rộng ảnh 60%' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setImageWidth', width: '60%' });
  });

  it('shows Table Layout only when the document has a table', () => {
    const dispatch = vi.fn();
    const { rerender } = render(<Ribbon state={base()} dispatch={dispatch} />);
    expect(screen.queryByRole('tab', { name: 'Table Layout' })).toBeNull();
    rerender(<Ribbon state={withTable()} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Table Layout' }));
    expect(groupTitles()).toEqual(['Rows & Columns']);
    fireEvent.click(screen.getByRole('button', { name: 'Thêm hàng' }));
    fireEvent.click(screen.getByRole('button', { name: 'Xoá cột' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'tableRow', op: 'add' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'tableCol', op: 'remove' });
  });
});

describe('WordDialogs', () => {
  const open = (dialog: wordSim.WordState['dialog']) => ({ ...base(), dialog });

  it('counts matches and replaces all', () => {
    const dispatch = vi.fn();
    render(<WordDialogs state={open('find')} dispatch={dispatch} now={1} />);
    fireEvent.change(screen.getByLabelText('Tìm'), { target: { value: 'ABC' } });
    expect(screen.getByText(/2 chỗ/)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Thay bằng'), { target: { value: 'Mochi' } });
    fireEvent.click(screen.getByRole('button', { name: 'Thay tất cả' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'replaceAll', find: 'ABC', replace: 'Mochi' });
  });

  it('inserts a picture from the library', () => {
    const dispatch = vi.fn();
    render(<WordDialogs state={open('image')} dispatch={dispatch} now={1} />);
    const first = wordSim.IMAGE_LIBRARY[0]!;
    fireEvent.click(screen.getByRole('button', { name: first.alt }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'insertImage', src: first.src, alt: first.alt });
  });

  it('inserts a picture uploaded from the computer', async () => {
    const dispatch = vi.fn();
    render(<WordDialogs state={open('image')} dispatch={dispatch} now={1} />);
    const file = new File(['<svg/>'], 'anh-cua-toi.svg', { type: 'image/svg+xml' });
    fireEvent.change(screen.getByLabelText('Tải ảnh từ máy'), { target: { files: [file] } });
    await vi.waitFor(() => expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'insertImage', alt: 'anh-cua-toi' })));
  });

  it('refuses a picture larger than 1 MB', async () => {
    const dispatch = vi.fn();
    render(<WordDialogs state={open('image')} dispatch={dispatch} now={1} />);
    const big = new File([new Uint8Array(1_100_000)], 'to-qua.png', { type: 'image/png' });
    fireEvent.change(screen.getByLabelText('Tải ảnh từ máy'), { target: { files: [big] } });
    expect(await screen.findByText(/hơi nặng/)).toBeInTheDocument();
    expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'insertImage' }));
  });

  it('saves with the typed name and closes on Escape', () => {
    const dispatch = vi.fn();
    render(<WordDialogs state={open('save')} dispatch={dispatch} now={1700000000000} />);
    fireEvent.change(screen.getByLabelText('Tên file'), { target: { value: 'don-xin-viec.docx' } });
    fireEvent.click(screen.getByRole('button', { name: 'Lưu' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'save', name: 'don-xin-viec.docx', at: 1700000000000 });
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'openDialog', dialog: null });
  });

  it('renders nothing when no dialog is open', () => {
    const { container } = render(<WordDialogs state={base()} dispatch={vi.fn()} now={1} />);
    expect(container).toBeEmptyDOMElement();
  });
});
