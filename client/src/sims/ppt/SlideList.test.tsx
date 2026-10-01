import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { pptSim } from '@office-neko/shared';
import { describe, expect, it, vi } from 'vitest';
import { PptSim } from './PptSim';
import { SlideList } from './SlideList';

const twoSlides = pptSim.reducePpt(pptSim.pptInitial(), { type: 'addSlide' });

const setup = (slides: pptSim.Layout[] = ['title', 'titleContent']) => {
  const onState = vi.fn();
  render(<PptSim initial={pptSim.pptInitial({ slides })} onState={onState} os="win" spotlight={null} />);
  return { onState };
};

describe('SlideList', () => {
  it('đánh số thumbnail từ 1', () => {
    setup(['title', 'titleContent', 'blank']);
    expect(screen.getAllByRole('button', { name: /^Slide \d+$/ }).map((b) => b.getAttribute('aria-label'))).toEqual([
      'Slide 1',
      'Slide 2',
      'Slide 3',
    ]);
  });

  it('slide đang mở có aria-current', async () => {
    setup();
    expect(screen.getByRole('button', { name: 'Slide 1' })).toHaveAttribute('aria-current', 'true');
    await userEvent.click(screen.getByRole('button', { name: 'Slide 2' }));
    expect(screen.getByRole('button', { name: 'Slide 2' })).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('button', { name: 'Slide 1' })).not.toHaveAttribute('aria-current');
  });

  it('bấm nút thêm slide thì số thumbnail tăng 1', async () => {
    setup(['title']);
    await userEvent.click(screen.getByRole('button', { name: /^\+ Slide mới/ }));
    expect(screen.getAllByRole('button', { name: /^Slide \d+$/ })).toHaveLength(2);
  });

  it('chuột phải trên slide 2 rồi Delete Slide thì xoá đúng slide 2', () => {
    const dispatch = vi.fn();
    render(<SlideList state={twoSlides} dispatch={dispatch} />);
    fireEvent.contextMenu(screen.getByRole('button', { name: 'Slide 2' }), { clientX: 50, clientY: 50 });
    fireEvent.click(screen.getByRole('button', { name: 'Xoá slide' }));
    expect(dispatch.mock.calls.map((c) => c[0])).toEqual([{ type: 'gotoSlide', index: 1 }, { type: 'deleteSlide' }]);
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('chuột phải › Duplicate Slide nhân đôi đúng slide được bấm', () => {
    const dispatch = vi.fn();
    render(<SlideList state={twoSlides} dispatch={dispatch} />);
    fireEvent.contextMenu(screen.getByRole('button', { name: 'Slide 1' }), { clientX: 50, clientY: 50 });
    fireEvent.click(screen.getByRole('button', { name: 'Nhân đôi slide' }));
    expect(dispatch.mock.calls.map((c) => c[0])).toEqual([{ type: 'gotoSlide', index: 0 }, { type: 'duplicateSlide' }]);
  });

  it('không xoá được slide cuối cùng, kể cả bằng phím Delete', () => {
    const dispatch = vi.fn();
    render(<SlideList state={pptSim.pptInitial()} dispatch={dispatch} />);
    fireEvent.contextMenu(screen.getByRole('button', { name: 'Slide 1' }), { clientX: 50, clientY: 50 });
    expect(screen.getByRole('button', { name: 'Xoá slide' })).toBeDisabled();
    fireEvent.keyDown(screen.getByRole('button', { name: 'Slide 1' }), { key: 'Delete' });
    expect(dispatch).not.toHaveBeenCalledWith({ type: 'deleteSlide' });
  });

  it('phím Delete trên hình thu nhỏ đang focus xoá đúng slide đó', () => {
    const dispatch = vi.fn();
    render(<SlideList state={twoSlides} dispatch={dispatch} />);
    fireEvent.keyDown(screen.getByRole('button', { name: 'Slide 1' }), { key: 'Backspace' });
    expect(dispatch.mock.calls.map((c) => c[0])).toEqual([{ type: 'gotoSlide', index: 0 }, { type: 'deleteSlide' }]);
  });

  it('menu bấm sát mép phải vẫn nằm trong màn hình', () => {
    render(<SlideList state={twoSlides} dispatch={vi.fn()} />);
    fireEvent.contextMenu(screen.getByRole('button', { name: 'Slide 1' }), { clientX: window.innerWidth - 2, clientY: 10 });
    expect(parseFloat(screen.getByRole('menu').style.left)).toBeLessThan(window.innerWidth - 2);
  });

  it('menu nằm ngoài cột slide (portal) và đóng khi Esc hoặc bấm ra ngoài', () => {
    render(<SlideList state={twoSlides} dispatch={vi.fn()} />);
    const list = document.querySelector('[data-help-id="ppt.slideList"]')!;
    fireEvent.contextMenu(screen.getByRole('button', { name: 'Slide 1' }), { clientX: 50, clientY: 50 });
    expect(list.contains(screen.getByRole('menu'))).toBe(false);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).toBeNull();
    fireEvent.contextMenu(screen.getByRole('button', { name: 'Slide 1' }), { clientX: 50, clientY: 50 });
    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('cột tự cuộn khi menu vừa mở thì menu vẫn còn; lăn chuột thì đóng', () => {
    render(<SlideList state={twoSlides} dispatch={vi.fn()} />);
    const list = document.querySelector('[data-help-id="ppt.slideList"]')!;
    fireEvent.contextMenu(screen.getByRole('button', { name: 'Slide 2' }), { clientX: 50, clientY: 50 });
    fireEvent.scroll(list);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    fireEvent.wheel(list);
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('thumbnail không hiện chữ mờ của chỗ dành sẵn', () => {
    setup(['title']);
    expect(screen.getAllByText('Bấm để nhập tiêu đề')).toHaveLength(1);
  });
});
