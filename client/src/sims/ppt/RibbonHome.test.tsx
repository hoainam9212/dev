import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { pptSim } from '@office-neko/shared';
import { describe, expect, it, vi } from 'vitest';
import { RibbonHome } from './RibbonHome';

const withShape = pptSim.reducePpt(pptSim.pptInitial(), { type: 'addShape', shape: 'rect', x: 200, y: 300, w: 160, h: 80 });

const setup = (s = pptSim.pptInitial()) => {
  const dispatch = vi.fn();
  render(<RibbonHome state={s} dispatch={dispatch} />);
  return { dispatch };
};

describe('RibbonHome', () => {
  it('New Slide thêm slide', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByRole('button', { name: /New Slide/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'addSlide' });
  });

  it('Layout mời đủ bốn bố cục, chọn thì phát setLayout', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByRole('button', { name: /Layout/ }));
    for (const l of pptSim.PPT_LAYOUTS) expect(screen.getByRole('button', { name: new RegExp(l.vi) })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /Hai cột nội dung/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setLayout', layout: 'twoContent' });
  });

  it('Bold phát setFmt đúng trạng thái đảo lại của đối tượng đang chọn', async () => {
    const { dispatch } = setup({ ...pptSim.pptInitial(), sel: 'e1' });
    await userEvent.click(screen.getByRole('button', { name: /Bold/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setFmt', fmt: { bold: false } });
  });

  it('nút định dạng bị khoá khi chưa chọn đối tượng nào', () => {
    setup();
    expect(screen.getByRole('button', { name: /Bold/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Font size/ })).toBeDisabled();
  });

  it('Bold sáng lên khi đối tượng đang chọn đang in đậm', () => {
    setup({ ...pptSim.pptInitial(), sel: 'e1' });
    expect(screen.getByRole('button', { name: /Bold/ })).toHaveAttribute('aria-pressed', 'true');
  });

  it('chọn cỡ chữ phát setFmt size', async () => {
    const { dispatch } = setup(withShape);
    await userEvent.click(screen.getByRole('button', { name: /Font size/ }));
    await userEvent.click(screen.getByRole('button', { name: '32' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setFmt', fmt: { size: 32 } });
  });

  it('chọn màu chữ phát setFmt color, tên màu đọc được bằng tiếng Việt', async () => {
    const { dispatch } = setup(withShape);
    await userEvent.click(screen.getByRole('button', { name: /Font color/ }));
    await userEvent.click(screen.getByRole('button', { name: /Cam Mochi/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setFmt', fmt: { color: '#D2691E' } });
  });

  it('Delete Slide và Undo khoá khi chỉ có một slide và chưa làm gì', () => {
    setup();
    expect(screen.getByRole('button', { name: /Delete Slide/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Undo/ })).toBeDisabled();
  });

  it('Delete Slide và Undo phát đúng action', async () => {
    const { dispatch } = setup(pptSim.reducePpt(pptSim.pptInitial(), { type: 'addSlide' }));
    await userEvent.click(screen.getByRole('button', { name: /Delete Slide/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'deleteSlide' });
    await userEvent.click(screen.getByRole('button', { name: /Undo/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'undo' });
  });
});
