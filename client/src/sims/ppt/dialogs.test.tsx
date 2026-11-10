import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { pptSim, wordSim } from '@office-neko/shared';
import { describe, expect, it, vi } from 'vitest';
import { PptDialogs } from './dialogs';

const open = (dialog: pptSim.PptDialog) => {
  const dispatch = vi.fn();
  render(<PptDialogs state={{ ...pptSim.pptInitial(), dialog }} dispatch={dispatch} now={1234} />);
  return { dispatch };
};

describe('PptDialogs', () => {
  it('không mở hộp thoại nào thì không vẽ gì', () => {
    open(null);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('hộp thoại ảnh: bấm một ảnh mẫu thì chèn đúng src/alt rồi đóng', async () => {
    const { dispatch } = open('image');
    const first = wordSim.IMAGE_LIBRARY[0]!;
    expect(screen.getAllByRole('button', { name: /./ }).length).toBeGreaterThan(wordSim.IMAGE_LIBRARY.length);
    await userEvent.click(screen.getByRole('button', { name: first.alt }));
    expect(dispatch.mock.calls.map((c) => c[0])).toEqual([
      { type: 'addImage', src: first.src, alt: first.alt },
      { type: 'closeDialog' },
    ]);
  });

  it('hộp thoại Lưu: gõ tên rồi bấm Lưu thì phát save kèm thời điểm', async () => {
    const { dispatch } = open('save');
    const input = screen.getByRole('textbox', { name: 'Tên tệp' });
    expect(input).toHaveValue('Bai trinh chieu.pptx');
    await userEvent.clear(input);
    await userEvent.type(input, 'Gioi thieu.pptx');
    await userEvent.click(screen.getByRole('button', { name: 'Lưu' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'save', name: 'Gioi thieu.pptx', at: 1234 });
  });

  it('hộp thoại In: bấm In thì phát print', async () => {
    const { dispatch } = open('print');
    await userEvent.click(screen.getByRole('button', { name: 'In' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'print' });
  });

  it('Esc thì đóng hộp thoại', () => {
    const { dispatch } = open('save');
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'closeDialog' });
  });
});

describe('PptDialogs – trợ năng', () => {
  it('có tên theo tiêu đề, mở thì focus ô đầu tiên, Tab đi vòng bên trong', async () => {
    open('save');
    const dlg = screen.getByRole('dialog', { name: 'Lưu bài trình chiếu' });
    expect(dlg).toHaveAttribute('aria-modal', 'true');
    expect(dlg).toHaveAttribute('aria-labelledby');
    expect(screen.getByLabelText('Tên tệp')).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Lưu' })).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Đóng' })).toHaveFocus();
  });

  it('Esc đóng hộp thoại', async () => {
    const { dispatch } = open('print');
    await userEvent.keyboard('{Escape}');
    expect(dispatch).toHaveBeenCalledWith({ type: 'closeDialog' });
  });
});
