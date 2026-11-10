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
  it('Insert xếp nhóm như PowerPoint 365', () => {
    setup();
    expect([...document.querySelectorAll('[data-variant="office"] > span')].map((e) => e.textContent))
      .toEqual(['Slides', 'Images', 'Illustrations', 'Text']);
  });

  it('New Slide ở thẻ Insert là cùng nút tách đôi của thẻ Home', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByRole('button', { name: 'Slide mới' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'addSlide' });
    await userEvent.click(screen.getByRole('button', { name: 'Chọn bố cục cho slide mới' }));
    expect(screen.getByRole('button', { name: 'Nhân đôi slide đang chọn' })).toBeInTheDocument();
  });

  it('Text Box chèn hộp chữ ở vị trí định sẵn, trong khung', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByRole('button', { name: 'Hộp chữ' }));
    const a = dispatch.mock.calls[0]?.[0];
    expect(a).toMatchObject({ type: 'addText', x: 80, y: 400, w: 480, h: 80 });
    expect(a.x + a.w).toBeLessThanOrEqual(pptSim.SLIDE_W);
    expect(a.y + a.h).toBeLessThanOrEqual(pptSim.SLIDE_H);
  });

  it('hộp chữ mới không đè chỗ dành sẵn của bất kỳ bố cục nào', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByRole('button', { name: 'Hộp chữ' }));
    const a = dispatch.mock.calls[0]?.[0];
    for (const [layout, holders] of Object.entries(pptSim.PLACEHOLDERS)) {
      for (const p of holders) {
        const apart = a.x + a.w <= p.x || p.x + p.w <= a.x || a.y + a.h <= p.y || p.y + p.h <= a.y;
        expect(apart, `${layout}/${p.role}`).toBe(true);
      }
    }
  });

  it('Shapes ▾ mời đủ bốn hình, chọn thì phát addShape', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByRole('button', { name: 'Hình khối' }));
    for (const vi of ['Hình chữ nhật', 'Hình tròn', 'Mũi tên', 'Ngôi sao']) {
      expect(screen.getByRole('button', { name: vi })).toBeInTheDocument();
    }
    await userEvent.click(screen.getByRole('button', { name: 'Ngôi sao' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'addShape', shape: 'star', x: 400, y: 216, w: 160, h: 160 });
  });

  it('mỗi loại hình có cỡ mặc định riêng: chữ nhật nằm ngang, không vuông', async () => {
    const { dispatch } = setup();
    const sizes: Record<string, [number, number]> = { 'Hình chữ nhật': [240, 128], 'Hình tròn': [160, 160], 'Mũi tên': [200, 96], 'Ngôi sao': [160, 160] };
    for (const [vi, [w, h]] of Object.entries(sizes)) {
      await userEvent.click(screen.getByRole('button', { name: 'Hình khối' }));
      await userEvent.click(screen.getByRole('button', { name: vi }));
      const a = dispatch.mock.calls.at(-1)?.[0];
      expect(a, vi).toMatchObject({ w, h });
      // Cùng tâm với chỗ đặt cũ, nằm trọn trong slide.
      expect(a.x + a.w / 2).toBe(480);
      expect(a.y + a.h / 2).toBe(296);
      expect(a.x + a.w).toBeLessThanOrEqual(pptSim.SLIDE_W);
      expect(a.y + a.h).toBeLessThanOrEqual(pptSim.SLIDE_H);
    }
    expect(dispatch.mock.calls[0]?.[0].w).toBeGreaterThan(dispatch.mock.calls[0]?.[0].h);
  });

  it('Pictures mở hộp thoại chèn ảnh', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByRole('button', { name: 'Chèn ảnh' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'openDialog', dialog: 'image' });
  });

  it('nút mang icon và chữ tiếng Anh như PowerPoint', () => {
    setup();
    for (const [vi, en] of [['Chèn ảnh', 'Pictures'], ['Hình khối', 'Shapes'], ['Hộp chữ', 'Text Box']] as const) {
      const b = screen.getByRole('button', { name: vi });
      expect(b.querySelector('svg')).not.toBeNull();
      expect(b).toHaveTextContent(en);
    }
  });
});
