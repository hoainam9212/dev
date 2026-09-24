import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { pptSim } from '@office-neko/shared';
import { describe, expect, it, vi } from 'vitest';
import { Canvas } from './Canvas';

const base = pptSim.reducePpt(pptSim.pptInitial({ slides: ['blank'] }), {
  type: 'addShape',
  shape: 'rect',
  x: 200,
  y: 200,
  w: 160,
  h: 80,
});
/** Id sinh theo `nextId`, không hardcode. */
const shapeId = base.slides[0]?.els[0]?.id ?? '';

/** `addShape` chọn luôn đối tượng vừa chèn, nên cần một state "chưa chọn gì". */
const unsel: pptSim.PptState = { ...base, sel: null };

const setup = (s = base) => {
  const dispatch = vi.fn();
  render(<Canvas state={s} dispatch={dispatch} />);
  return { dispatch };
};

describe('Canvas', () => {
  it('bấm vào đối tượng thì chọn nó', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByTestId('ppt-el'));
    expect(dispatch).toHaveBeenCalledWith({ type: 'selectEl', id: shapeId });
  });

  it('bấm vào chỗ trống thì bỏ chọn', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByTestId('ppt-canvas'));
    expect(dispatch).toHaveBeenCalledWith({ type: 'selectEl', id: null });
  });

  it('chỉ đối tượng đang chọn mới có 8 tay nắm', () => {
    const { unmount } = render(<Canvas state={unsel} dispatch={vi.fn()} />);
    expect(screen.queryAllByTestId('ppt-handle')).toHaveLength(0);
    unmount();
    render(<Canvas state={{ ...base, sel: shapeId }} dispatch={vi.fn()} />);
    expect(screen.getAllByTestId('ppt-handle')).toHaveLength(8);
  });

  it('nháy đúp thì bắt đầu sửa chữ', async () => {
    const { dispatch } = setup({ ...base, sel: shapeId });
    await userEvent.dblClick(screen.getAllByTestId('ppt-el')[0]!);
    expect(dispatch).toHaveBeenCalledWith({ type: 'startEditEl', id: shapeId });
  });

  it('đang sửa thì hiện ô nhập, gõ phát setText, Enter xong, Esc huỷ', async () => {
    const { dispatch } = setup({ ...base, sel: shapeId, editing: shapeId });
    const box = screen.getByRole('textbox', { name: /nội dung/i });
    await userEvent.type(box, 'A');
    expect(dispatch).toHaveBeenCalledWith({ type: 'setText', text: 'A' });
    await userEvent.type(box, '{Enter}');
    expect(dispatch).toHaveBeenCalledWith({ type: 'commitEdit' });
    await userEvent.type(box, '{Escape}');
    expect(dispatch).toHaveBeenCalledWith({ type: 'cancelEdit' });
  });

  it('mũi tên dời 8px, Delete xoá, Esc bỏ chọn', async () => {
    const { dispatch } = setup({ ...base, sel: shapeId });
    const canvas = screen.getByTestId('ppt-canvas');
    canvas.focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(dispatch).toHaveBeenCalledWith({ type: 'moveEl', dx: 8, dy: 0 });
    await userEvent.keyboard('{ArrowUp}');
    expect(dispatch).toHaveBeenCalledWith({ type: 'moveEl', dx: 0, dy: -8 });
    await userEvent.keyboard('{Delete}');
    expect(dispatch).toHaveBeenCalledWith({ type: 'deleteEl' });
    await userEvent.keyboard('{Escape}');
    expect(dispatch).toHaveBeenCalledWith({ type: 'selectEl', id: null });
  });

  it('mũi tên không dời gì khi chưa chọn đối tượng nào', async () => {
    const { dispatch } = setup(unsel);
    screen.getByTestId('ppt-canvas').focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'moveEl' }));
  });

  it('đang sửa chữ thì phím mũi tên không dời đối tượng', async () => {
    const { dispatch } = setup({ ...base, sel: shapeId, editing: shapeId });
    screen.getByTestId('ppt-canvas').focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'moveEl' }));
  });
});
