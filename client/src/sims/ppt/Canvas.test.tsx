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

  it('Enter hoặc F2 trên đối tượng đang chọn thì bắt đầu gõ chữ, như PowerPoint (không cần nháy đúp)', async () => {
    const { dispatch } = setup({ ...base, sel: shapeId });
    screen.getByTestId('ppt-canvas').focus();
    await userEvent.keyboard('{Enter}');
    expect(dispatch).toHaveBeenCalledWith({ type: 'startEditEl', id: shapeId });
    dispatch.mockClear();
    await userEvent.keyboard('{F2}');
    expect(dispatch).toHaveBeenCalledWith({ type: 'startEditEl', id: shapeId });
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

describe('Canvas – xem thử chuyển cảnh', () => {
  const faded = pptSim.reducePpt(base, { type: 'setTransition', transition: 'fade' });
  const slideId = faded.slides[0]!.id;
  const layer = () => document.querySelector('.ppt-slide-layer')!;

  it('chưa bấm Preview thì không chạy hiệu ứng', () => {
    setup(faded);
    expect(layer().className).not.toContain('ppt-tr-');
  });

  it('Preview của đúng slide này thì gắn lớp hiệu ứng', () => {
    const dispatch = vi.fn();
    render(<Canvas state={faded} dispatch={dispatch} preview={{ n: 1, slideId }} />);
    expect(layer()).toHaveClass('ppt-tr-fade');
  });

  it('Preview của slide khác thì không chạy trên slide này', () => {
    render(<Canvas state={faded} dispatch={vi.fn()} preview={{ n: 1, slideId: 'khác' }} />);
    expect(layer().className).not.toContain('ppt-tr-');
  });

  it('bấm vào chỗ trống của slide vẫn bỏ chọn dù có lớp vẽ', async () => {
    const { dispatch } = setup(faded);
    await userEvent.pointer({ keys: '[MouseLeft]', target: layer() });
    expect(dispatch).toHaveBeenCalledWith({ type: 'selectEl', id: null });
  });
});

describe('Canvas – theme', () => {
  /** jsdom đọc lại `style.color` dạng rgb(...). */
  const rgb = (hex: string) =>
    `rgb(${[1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(', ')})`;
  /** Bài 1 slide Title and Content, đã có chữ ở tiêu đề và nội dung. */
  const typed = (theme: pptSim.ThemeId) => {
    let s = pptSim.pptInitial({ slides: ['titleContent'] });
    for (const el of s.slides[0]!.els) {
      s = [
        { type: 'startEditEl', id: el.id },
        { type: 'setText', text: `Chữ ${el.role}` },
        { type: 'commitEdit' },
      ].reduce<pptSim.PptState>((x, a) => pptSim.reducePpt(x, a as pptSim.PptAction), s);
    }
    return pptSim.reducePpt(s, { type: 'setTheme', theme });
  };
  const elOf = (role: string) => document.querySelector<HTMLElement>(`[data-role="${role}"]`)!;

  it('khung slide mang nền và data-theme của theme đang dùng', () => {
    setup(typed('bien'));
    const canvas = screen.getByTestId('ppt-canvas');
    expect(canvas).toHaveAttribute('data-theme', 'bien');
    expect(canvas.style.background).toBe(rgb(pptSim.themeOf('bien').bg));
  });

  it('tiêu đề chưa tô màu mang màu accent, nội dung mang màu fg', () => {
    setup(typed('dem'));
    const t = pptSim.themeOf('dem');
    expect(elOf('title').style.color).toBe(rgb(t.accent));
    expect(elOf('body').style.color).toBe(rgb(t.fg));
    expect(elOf('title').style.fontFamily).toContain('Segoe UI');
  });

  it('chữ đã tô màu riêng giữ màu đó dù theme tối', () => {
    const s0 = typed('dem');
    const title = s0.slides[0]!.els.find((e) => e.role === 'title')!.id;
    const s = [
      { type: 'selectEl', id: title },
      { type: 'setFmt', fmt: { color: '#000000' } },
    ].reduce<pptSim.PptState>((x, a) => pptSim.reducePpt(x, a as pptSim.PptAction), s0);
    setup(s);
    expect(elOf('title').style.color).toBe('rgb(0, 0, 0)');
  });
});
