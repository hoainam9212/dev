import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { wordSim } from '@office-neko/shared';
import { RibbonHome } from './RibbonHome';
import { HELP_IDS } from '../../content/help-ids';

const withSelection = () =>
  wordSim.reduceWord(wordSim.wordInitial({ text: 'Kính gửi Quý công ty' }), { type: 'selectText', text: 'Quý công ty' });

describe('RibbonHome', () => {
  it('dispatches the bold action for the current selection', () => {
    const dispatch = vi.fn();
    render(<RibbonHome state={withSelection()} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: 'In đậm' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'toggleMark', mark: 'bold' });
  });

  it('shows a button as pressed when the mark is already on', () => {
    const on = wordSim.reduceWord(withSelection(), { type: 'toggleMark', mark: 'bold' });
    render(<RibbonHome state={on} dispatch={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'In đậm' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('dispatches alignment, list and heading', () => {
    const dispatch = vi.fn();
    render(<RibbonHome state={withSelection()} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: 'Căn giữa' }));
    fireEvent.click(screen.getByRole('button', { name: 'Danh sách chấm' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setAlign', align: 'center' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'toggleList', list: 'bullet' });
    // Styles là dải ô mẫu như Word (Normal, Heading 1…), không phải ô thả xuống.
    fireEvent.click(screen.getByRole('button', { name: 'Kiểu Heading 1' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setHeading', level: 1 });
    expect(screen.getByRole('button', { name: 'Kiểu Normal' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('sets line spacing from the Line Spacing menu', () => {
    const dispatch = vi.fn();
    render(<RibbonHome state={withSelection()} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: 'Giãn dòng' }));
    fireEvent.click(screen.getByRole('button', { name: 'Giãn dòng 1,5' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setLineHeight', value: '1.5' });
  });

  it('dispatches font family and size', () => {
    const dispatch = vi.fn();
    render(<RibbonHome state={withSelection()} dispatch={dispatch} />);
    fireEvent.change(screen.getByRole('combobox', { name: 'Phông chữ' }), { target: { value: 'Arial' } });
    fireEvent.change(screen.getByRole('combobox', { name: 'Cỡ chữ' }), { target: { value: '16pt' } });
    expect(dispatch).toHaveBeenCalledWith({ type: 'setStyle', attr: 'fontFamily', value: 'Arial' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'setStyle', attr: 'fontSize', value: '16pt' });
  });

  it('names the Font group and its buttons the way English Word does', () => {
    render(<RibbonHome state={withSelection()} dispatch={vi.fn()} />);
    expect(screen.getByText('Font')).toBeInTheDocument();
    // Tên tiếng Anh + phím tắt nằm ở gợi ý màu tối của app (HELP_IDS), không ở `title`.
    for (const [name, en, keys] of [['In đậm', 'Bold', 'Ctrl + B'], ['In nghiêng', 'Italic', 'Ctrl + I'], ['Gạch chân', 'Underline', 'Ctrl + U']] as const) {
      const btn = screen.getByRole('button', { name });
      const help = HELP_IDS[btn.getAttribute('data-help-id')!];
      expect(help?.label).toContain(en);
      expect(help?.vi).toContain(keys);
      expect(btn).not.toHaveAttribute('title');
    }
    expect(screen.getByRole('button', { name: 'In đậm' }).querySelector('svg')).not.toBeNull();
  });

  it('lets a mouse press open every drop-down list', () => {
    // Chặn mousedown trên <select> làm Chrome không mở danh sách: người học bấm mà không chọn được gì.
    render(<RibbonHome state={withSelection()} dispatch={vi.fn()} />);
    for (const box of screen.getAllByRole('combobox')) {
      expect(fireEvent.mouseDown(box), box.getAttribute('aria-label') ?? '').toBe(true);
    }
  });

  it('gives every control a help id', () => {
    const { container } = render(<RibbonHome state={withSelection()} dispatch={vi.fn()} />);
    const ids = [...container.querySelectorAll('[data-help-id]')].map((e) => e.getAttribute('data-help-id'));
    expect(ids).toEqual(expect.arrayContaining(['word.bold', 'word.italic', 'word.underline', 'word.alignCenter', 'word.bullet', 'word.heading', 'word.font', 'word.size']));
  });
});
