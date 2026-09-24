import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { wordSim } from '@office-neko/shared';
import { RibbonHome } from './RibbonHome';

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
    fireEvent.change(screen.getByRole('combobox', { name: 'Kiểu đoạn' }), { target: { value: '1' } });
    expect(dispatch).toHaveBeenCalledWith({ type: 'setHeading', level: 1 });
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
    expect(screen.getByRole('button', { name: 'In đậm' })).toHaveAttribute('title', 'Bold (Ctrl+B) — In đậm');
    expect(screen.getByRole('button', { name: 'In nghiêng' })).toHaveAttribute('title', 'Italic (Ctrl+I) — In nghiêng');
    expect(screen.getByRole('button', { name: 'Gạch chân' })).toHaveAttribute('title', 'Underline (Ctrl+U) — Gạch chân');
    expect(screen.getByRole('button', { name: 'In đậm' }).querySelector('svg')).not.toBeNull();
  });

  it('gives every control a help id', () => {
    const { container } = render(<RibbonHome state={withSelection()} dispatch={vi.fn()} />);
    const ids = [...container.querySelectorAll('[data-help-id]')].map((e) => e.getAttribute('data-help-id'));
    expect(ids).toEqual(expect.arrayContaining(['word.bold', 'word.italic', 'word.underline', 'word.alignCenter', 'word.bullet', 'word.heading', 'word.font', 'word.size']));
  });
});
