import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { pptSim } from '@office-neko/shared';
import { describe, expect, it, vi } from 'vitest';
import { PptSim } from './PptSim';

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
    await userEvent.click(screen.getByRole('button', { name: /Slide mới/ }));
    expect(screen.getAllByRole('button', { name: /^Slide \d+$/ })).toHaveLength(2);
  });

  it('thumbnail không hiện chữ mờ của chỗ dành sẵn', () => {
    setup(['title']);
    expect(screen.getAllByText('Bấm để nhập tiêu đề')).toHaveLength(1);
  });
});
