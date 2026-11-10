import { useRef, useState } from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDialogFocus } from './useDialogFocus';

function Box({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useDialogFocus(ref, true);
  return (
    <div ref={ref} role="dialog">
      <button type="button" aria-label="Đóng" data-dialog-close onClick={onClose}>✕</button>
      <input aria-label="Tên tệp" />
      <button type="button">Lưu</button>
    </div>
  );
}

function Harness() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>Mở</button>
      <button type="button">Nút khác</button>
      {open ? <Box onClose={() => setOpen(false)} /> : null}
    </>
  );
}

describe('useDialogFocus', () => {
  it('mở thì focus ô nhập đầu tiên, không phải nút Đóng', async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole('button', { name: 'Mở' }));
    expect(screen.getByLabelText('Tên tệp')).toHaveFocus();
  });

  it('Tab và Shift+Tab đi vòng trong hộp thoại', async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole('button', { name: 'Mở' }));
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Lưu' })).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Đóng' })).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(screen.getByRole('button', { name: 'Lưu' })).toHaveFocus();
  });

  it('đóng thì trả focus về nút đã mở', async () => {
    render(<Harness />);
    screen.getByRole('button', { name: 'Mở' }).focus();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByLabelText('Tên tệp')).toHaveFocus();
    await userEvent.click(screen.getByRole('button', { name: 'Đóng' }));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('button', { name: 'Mở' })).toHaveFocus();
  });
});
