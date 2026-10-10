import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { pptSim } from '@office-neko/shared';
import { describe, expect, it, vi } from 'vitest';
import { RibbonDesign } from './RibbonDesign';

const setup = (s = pptSim.pptInitial()) => {
  const dispatch = vi.fn();
  render(<RibbonDesign state={s} dispatch={dispatch} />);
  return { dispatch };
};

const themeButtons = () => screen.getAllByRole('button', { name: /– chủ đề trang trí$/ });

describe('RibbonDesign', () => {
  it('nhóm Themes có 6 theme đúng thứ tự', () => {
    setup();
    expect([...document.querySelectorAll('[data-variant="office"] > span')].map((e) => e.textContent)).toEqual(['Themes']);
    expect(themeButtons().map((b) => b.getAttribute('aria-label'))).toEqual(
      pptSim.PPT_THEMES.map((t) => `${t.name} – chủ đề trang trí`),
    );
  });

  it('theme đang dùng được nhấn, các theme khác thì không', () => {
    setup(pptSim.reducePpt(pptSim.pptInitial(), { type: 'setTheme', theme: 'la' }));
    expect(themeButtons().map((b) => b.getAttribute('aria-pressed'))).toEqual(['false', 'false', 'true', 'false', 'false', 'false']);
  });

  it('bấm Biển phát setTheme bien', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByRole('button', { name: 'Biển – chủ đề trang trí' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setTheme', theme: 'bien' });
  });
});
