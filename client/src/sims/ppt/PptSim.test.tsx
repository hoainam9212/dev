import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { pptSim } from '@office-neko/shared';
import { describe, expect, it, vi } from 'vitest';
import { PptSim } from './PptSim';

const setup = (initial = pptSim.pptInitial({ slides: ['title', 'titleContent'] })) => {
  const onState = vi.fn();
  render(<PptSim initial={initial} onState={onState} os="win" spotlight={null} />);
  return { onState };
};

describe('PptSim', () => {
  it('vẽ đúng số thumbnail, đánh số từ 1', () => {
    setup();
    expect(screen.getByRole('button', { name: /Slide 1/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Slide 2/ })).toBeInTheDocument();
  });

  it('khung slide giữ đúng tỉ lệ 16:9 của khổ 960x540', () => {
    setup();
    const canvas = screen.getByTestId('ppt-canvas');
    expect(canvas).toHaveAttribute('data-w', String(pptSim.SLIDE_W));
    expect(canvas).toHaveAttribute('data-h', String(pptSim.SLIDE_H));
  });

  it('bấm thumbnail thì mở slide đó và báo state ra ngoài', async () => {
    const { onState } = setup();
    await userEvent.click(screen.getByRole('button', { name: /Slide 2/ }));
    expect(onState).toHaveBeenLastCalledWith(expect.objectContaining({ active: 1 }));
  });

  it('chữ mờ hiện khi chỗ dành sẵn còn trống, và biến mất khi có chữ', () => {
    setup();
    expect(screen.getByText('Bấm để nhập tiêu đề')).toBeInTheDocument();
    const s0 = pptSim.pptInitial();
    const title = s0.slides[0]?.els.find((e) => e.role === 'title');
    expect(title).toBeDefined();
    const withText = pptSim.reducePpt(
      pptSim.reducePpt(s0, { type: 'startEditEl', id: title?.id ?? '' }),
      { type: 'setText', text: 'Mochi' },
    );
    expect(withText.slides[0]?.els[0]?.text).toBe('Mochi');
  });

  it('mọi đối tượng nằm gọn trong khung 960x540', () => {
    setup(pptSim.pptInitial({ slides: ['twoContent'] }));
    for (const el of screen.getAllByTestId('ppt-el')) {
      const x = Number(el.dataset.x),
        y = Number(el.dataset.y);
      const w = Number(el.dataset.w),
        h = Number(el.dataset.h);
      expect(x).toBeGreaterThanOrEqual(0);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(x + w).toBeLessThanOrEqual(pptSim.SLIDE_W);
      expect(y + h).toBeLessThanOrEqual(pptSim.SLIDE_H);
    }
  });
});
