import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { pptSim } from '@office-neko/shared';
import { describe, expect, it, vi } from 'vitest';
import { RibbonHome } from './RibbonHome';

const withShape = pptSim.reducePpt(pptSim.pptInitial(), { type: 'addShape', shape: 'rect', x: 200, y: 300, w: 160, h: 80 });
/** Id phần tử cuối của slide đang mở — không hardcode id (bài học Task 2 của 5A). */
const lastElId = (s: pptSim.PptState) => pptSim.slideOf(s).els.at(-1)!.id;
const firstElId = (s: pptSim.PptState) => pptSim.slideOf(s).els[0]!.id;

const setup = (s = pptSim.pptInitial()) => {
  const dispatch = vi.fn();
  render(<RibbonHome state={s} dispatch={dispatch} />);
  return { dispatch };
};

describe('Thẻ Home của PowerPoint', () => {
  it('xếp nhóm như PowerPoint 365', () => {
    setup();
    expect([...document.querySelectorAll('[data-variant="office"] > span')].map((e) => e.textContent))
      .toEqual(['Undo', 'Slides', 'Font', 'Paragraph', 'Drawing']);
  });

  it('nửa trên New Slide thêm slide', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByRole('button', { name: 'Slide mới' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'addSlide' });
  });

  it('New Slide ▾ chọn bố cục thì thêm slide rồi đặt bố cục', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByRole('button', { name: 'Chọn bố cục cho slide mới' }));
    for (const l of pptSim.PPT_LAYOUTS) expect(screen.getByRole('button', { name: new RegExp(l.vi) })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /Hai cột nội dung/ }));
    expect(dispatch.mock.calls.map((c) => c[0])).toEqual([{ type: 'addSlide' }, { type: 'setLayout', layout: 'twoContent' }]);
  });

  it('New Slide ▾ › Duplicate Selected Slides nhân đôi slide', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByRole('button', { name: 'Chọn bố cục cho slide mới' }));
    await userEvent.click(screen.getByRole('button', { name: 'Nhân đôi slide đang chọn' }));
    expect(dispatch.mock.calls.map((c) => c[0])).toEqual([{ type: 'duplicateSlide' }]);
  });

  it('Layout ▾ đổi bố cục slide đang mở', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByRole('button', { name: 'Bố cục' }));
    await userEvent.click(screen.getByRole('button', { name: /Hai cột nội dung/ }));
    expect(dispatch.mock.calls.map((c) => c[0])).toEqual([{ type: 'setLayout', layout: 'twoContent' }]);
  });

  it('In đậm phát setFmt đúng trạng thái đảo lại của đối tượng đang chọn, và sáng khi đang đậm', async () => {
    const s = { ...pptSim.pptInitial(), sel: firstElId(pptSim.pptInitial()) };
    const { dispatch } = setup(s);
    const bold = screen.getByRole('button', { name: 'In đậm' });
    expect(bold).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(bold);
    expect(dispatch).toHaveBeenCalledWith({ type: 'setFmt', fmt: { bold: false } });
  });

  it('nút định dạng và Arrange khoá khi chưa chọn đối tượng nào', () => {
    setup();
    for (const name of ['In đậm', 'In nghiêng', 'Cỡ chữ', 'Màu chữ', 'Căn trái', 'Căn giữa', 'Căn phải', 'Sắp xếp lớp', 'Màu nền hình']) {
      expect(screen.getByRole('button', { name }), name).toBeDisabled();
    }
  });

  it('chọn cỡ chữ phát setFmt size', async () => {
    const { dispatch } = setup(withShape);
    await userEvent.click(screen.getByRole('button', { name: 'Cỡ chữ' }));
    await userEvent.click(screen.getByRole('button', { name: '32' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setFmt', fmt: { size: 32 } });
  });

  it('chọn màu chữ phát setFmt color, tên màu đọc được bằng tiếng Việt', async () => {
    const { dispatch } = setup(withShape);
    await userEvent.click(screen.getByRole('button', { name: 'Màu chữ' }));
    await userEvent.click(screen.getByRole('button', { name: /Cam Mochi/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setFmt', fmt: { color: '#D2691E' } });
  });

  it('căn giữa phát setFmt align', async () => {
    const { dispatch } = setup(withShape);
    await userEvent.click(screen.getByRole('button', { name: 'Căn giữa' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setFmt', fmt: { align: 'center' } });
  });

  it('Shape Fill chỉ mở khi đang chọn hình khối, chọn thì phát setFmt fill', async () => {
    setup({ ...pptSim.pptInitial(), sel: firstElId(pptSim.pptInitial()) });
    expect(screen.getByRole('button', { name: 'Màu nền hình' })).toBeDisabled();
    cleanup();
    const { dispatch } = setup(withShape);
    await userEvent.click(screen.getByRole('button', { name: 'Màu nền hình' }));
    await userEvent.click(screen.getByRole('button', { name: /Nền Xanh biển/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setFmt', fmt: { fill: '#3B82F6' } });
  });

  it('Arrange ▾ đưa đối tượng lên trên cùng / xuống dưới cùng', async () => {
    const { dispatch } = setup({ ...withShape, sel: lastElId(withShape) });
    await userEvent.click(screen.getByRole('button', { name: 'Sắp xếp lớp' }));
    await userEvent.click(screen.getByRole('button', { name: 'Đưa lên trên cùng' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'bringToFront' });
    await userEvent.click(screen.getByRole('button', { name: 'Sắp xếp lớp' }));
    await userEvent.click(screen.getByRole('button', { name: 'Đưa xuống dưới cùng' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'sendToBack' });
  });

  it('Undo khoá khi chưa làm gì, làm rồi thì phát undo', async () => {
    setup();
    expect(screen.getByRole('button', { name: 'Hoàn tác' })).toBeDisabled();
    cleanup();
    const { dispatch } = setup(pptSim.reducePpt(pptSim.pptInitial(), { type: 'addSlide' }));
    await userEvent.click(screen.getByRole('button', { name: 'Hoàn tác' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'undo' });
  });

  it('không còn nút Duplicate / Delete Slide trên ribbon', () => {
    setup(pptSim.reducePpt(pptSim.pptInitial(), { type: 'addSlide' }));
    expect(screen.queryByRole('button', { name: /Xoá slide|Delete Slide/ })).toBeNull();
    expect(screen.queryByRole('button', { name: /^Duplicate/ })).toBeNull();
  });
});
