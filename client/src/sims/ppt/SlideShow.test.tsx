import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { pptSim } from '@office-neko/shared';
import { describe, expect, it, vi } from 'vitest';
import { RibbonSlideShow } from './RibbonSlideShow';
import { SlideShow } from './SlideShow';

const run = (s: pptSim.PptState, ...a: pptSim.PptAction[]) => a.reduce(pptSim.reducePpt, s);
/** Bài 3 slide, đang chiếu slide 1. */
const deck = () => run(pptSim.pptInitial(), { type: 'addSlide' }, { type: 'addSlide' });
const showing = (at = 0) => {
  let s = run(deck(), { type: 'startShow', from: 'start' });
  for (let i = 0; i < at; i++) s = run(s, { type: 'showNext' });
  return s;
};

const setup = (s: pptSim.PptState) => {
  const dispatch = vi.fn();
  render(<SlideShow state={s} dispatch={dispatch} />);
  return { dispatch };
};

describe('RibbonSlideShow', () => {
  it('From Beginning và From Current Slide phát startShow đúng kiểu', async () => {
    const dispatch = vi.fn();
    render(<RibbonSlideShow dispatch={dispatch} />);
    expect([...document.querySelectorAll('[data-variant="office"] > span')].map((e) => e.textContent)).toEqual(['Start Slide Show']);
    await userEvent.click(screen.getByRole('button', { name: /^From Beginning/ }));
    expect(dispatch).toHaveBeenLastCalledWith({ type: 'startShow', from: 'start' });
    await userEvent.click(screen.getByRole('button', { name: /^From Current Slide/ }));
    expect(dispatch).toHaveBeenLastCalledWith({ type: 'startShow', from: 'current' });
  });
});

describe('SlideShow', () => {
  it('không chiếu thì không vẽ gì', () => {
    setup(deck());
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('đang chiếu: lớp phủ là hộp thoại báo slide mấy trên mấy', () => {
    setup(showing());
    expect(screen.getByRole('dialog', { name: 'Đang trình chiếu, slide 1 trên 3' })).toHaveAttribute('aria-modal', 'true');
  });

  it.each([
    ['ArrowRight', 'showNext'],
    [' ', 'showNext'],
    ['Enter', 'showNext'],
    ['PageDown', 'showNext'],
    ['ArrowLeft', 'showPrev'],
    ['PageUp', 'showPrev'],
    ['Escape', 'endShow'],
  ])('phím %j phát %s và chặn hành vi mặc định', (key, type) => {
    const { dispatch } = setup(showing(1));
    const notPrevented = fireEvent.keyDown(window, { key });
    expect(dispatch).toHaveBeenCalledWith({ type });
    expect(notPrevented).toBe(false);
  });

  it('bấm chuột sang slide sau', async () => {
    const { dispatch } = setup(showing());
    await userEvent.click(screen.getByRole('dialog'));
    expect(dispatch).toHaveBeenCalledWith({ type: 'showNext' });
  });

  it('màn Hết bài: báo hết và phím bất kỳ đi tiếp (reducer tự thoát)', () => {
    const { dispatch } = setup(showing(3));
    expect(screen.getByText(/Hết bài trình chiếu/)).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'a' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'showNext' });
  });

  it('rời toàn màn hình (Esc bị trình duyệt nuốt) thì cũng thoát trình chiếu', () => {
    const { dispatch } = setup(showing());
    act(() => {
      document.dispatchEvent(new Event('fullscreenchange'));
    });
    expect(dispatch).toHaveBeenCalledWith({ type: 'endShow' });
  });

  it('slide có chuyển cảnh chạy hiệu ứng khi hiện ra', () => {
    const s = run(deck(), { type: 'gotoSlide', index: 0 }, { type: 'setTransition', transition: 'zoom' }, { type: 'startShow', from: 'start' });
    setup(s);
    expect(document.querySelector('.ppt-show .ppt-slide-layer')).toHaveClass('ppt-tr-zoom');
  });

  it('không chiếu thì không nuốt phím của chỗ khác', () => {
    const { dispatch } = setup(deck());
    expect(fireEvent.keyDown(window, { key: 'Escape' })).toBe(true);
    expect(dispatch).not.toHaveBeenCalled();
  });
});
