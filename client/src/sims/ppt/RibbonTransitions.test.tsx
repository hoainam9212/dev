import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { pptSim } from '@office-neko/shared';
import { describe, expect, it, vi } from 'vitest';
import { RibbonTransitions } from './RibbonTransitions';

const setup = (s = pptSim.pptInitial()) => {
  const dispatch = vi.fn();
  const onPreview = vi.fn();
  render(<RibbonTransitions state={s} dispatch={dispatch} onPreview={onPreview} />);
  return { dispatch, onPreview };
};

const withPush = pptSim.reducePpt(pptSim.pptInitial(), { type: 'setTransition', transition: 'push' });

describe('RibbonTransitions', () => {
  it('xếp nhóm như PowerPoint: Preview, Transition to This Slide, Timing', () => {
    setup();
    expect([...document.querySelectorAll('[data-variant="office"] > span')].map((e) => e.textContent)).toEqual([
      'Preview',
      'Transition to This Slide',
      'Timing',
    ]);
  });

  it('slide chưa có chuyển cảnh: None được nhấn, Apply To All bị khoá', () => {
    setup();
    expect(screen.getByRole('button', { name: /^None/ })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: /^Fade/ })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('button', { name: /Apply To All/ })).toBeDisabled();
  });

  it('bấm Fade đặt chuyển cảnh cho slide này và phát thử luôn', async () => {
    const { dispatch, onPreview } = setup();
    await userEvent.click(screen.getByRole('button', { name: /^Fade/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setTransition', transition: 'fade' });
    expect(onPreview).toHaveBeenCalledTimes(1);
  });

  it('Apply To All dùng chuyển cảnh của slide đang mở cho mọi slide', async () => {
    const { dispatch } = setup(withPush);
    expect(screen.getByRole('button', { name: /^Push/ })).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(screen.getByRole('button', { name: /Apply To All/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setTransition', transition: 'push', all: true });
  });

  it('nút Preview gọi onPreview đúng một lần', async () => {
    const { onPreview, dispatch } = setup(withPush);
    await userEvent.click(screen.getByRole('button', { name: /^Preview/ }));
    expect(onPreview).toHaveBeenCalledTimes(1);
    expect(dispatch).not.toHaveBeenCalled();
  });
});
