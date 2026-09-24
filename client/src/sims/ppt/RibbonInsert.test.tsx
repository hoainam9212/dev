import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { pptSim } from '@office-neko/shared';
import { describe, expect, it, vi } from 'vitest';
import { RibbonInsert } from './RibbonInsert';

const setup = () => {
  const dispatch = vi.fn();
  render(<RibbonInsert state={pptSim.pptInitial()} dispatch={dispatch} />);
  return { dispatch };
};

describe('RibbonInsert', () => {
  it('Text Box chèn hộp chữ ở vị trí định sẵn, trong khung', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByRole('button', { name: /Text Box/ }));
    const a = dispatch.mock.calls[0]?.[0];
    expect(a).toMatchObject({ type: 'addText', x: 80, y: 400, w: 480, h: 80 });
    expect(a.x + a.w).toBeLessThanOrEqual(pptSim.SLIDE_W);
    expect(a.y + a.h).toBeLessThanOrEqual(pptSim.SLIDE_H);
  });

  it('Shapes mời đủ bốn hình, chọn thì phát addShape', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByRole('button', { name: /Shapes/ }));
    for (const vi of ['Hình chữ nhật', 'Hình tròn', 'Mũi tên', 'Ngôi sao']) {
      expect(screen.getByRole('button', { name: new RegExp(vi) })).toBeInTheDocument();
    }
    await userEvent.click(screen.getByRole('button', { name: /Ngôi sao/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'addShape', shape: 'star', x: 400, y: 216, w: 160, h: 160 });
  });

  it('Pictures mở hộp thoại chèn ảnh', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByRole('button', { name: /Pictures/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'openDialog', dialog: 'image' });
  });
});
