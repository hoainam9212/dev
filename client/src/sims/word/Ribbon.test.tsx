import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { wordSim } from '@office-neko/shared';
import { Ribbon, WordDialogs } from './Ribbon';   // Ribbon.tsx re-export WordDialogs từ dialogs.tsx

const base = () => wordSim.wordInitial({ text: 'công ty ABC và công ty ABC' });

describe('Ribbon tabs', () => {
  it('starts on Home and switches to Insert', () => {
    const dispatch = vi.fn();
    render(<Ribbon state={base()} dispatch={dispatch} />);
    expect(screen.getByRole('button', { name: 'In đậm' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: 'Insert' }));
    fireEvent.click(screen.getByRole('button', { name: 'Chèn bảng' }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'insertTable' }));
  });

  it('opens the find dialog from View', () => {
    const dispatch = vi.fn();
    render(<Ribbon state={base()} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('tab', { name: 'View' }));
    fireEvent.click(screen.getByRole('button', { name: 'Tìm và thay thế' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'openDialog', dialog: 'find' });
  });

  it('inserts a table of contents from References', () => {
    const dispatch = vi.fn();
    render(<Ribbon state={base()} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('tab', { name: 'References' }));
    fireEvent.click(screen.getByRole('button', { name: 'Chèn mục lục' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'insertToc' });
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
