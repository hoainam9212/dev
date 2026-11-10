import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { wordSim } from '@office-neko/shared';
import { Editor } from './Editor';

/**
 * Phím di chuyển con trỏ (Shift+End, Home, ↓) do trình duyệt tự làm; ProseMirror chỉ biết vùng chọn mới khi sự kiện
 * `selectionchange` tới. Phím tắt bấm ngay sau đó (công cụ tự động, trình đọc màn hình) có thể đến TRƯỚC sự kiện ấy,
 * và Ctrl+U gạch chân nhầm vùng chọn cũ. jsdom không bắn `selectionchange`, nên đây đúng là tình huống đó.
 */
describe('Editor phím tắt dùng vùng chọn đang thấy trên màn hình', () => {
  it('chọn dòng 2 bằng DOM rồi Ctrl+U ngay thì gạch chân dòng 2, không phải chỗ con trỏ cũ', async () => {
    render(<Editor state={wordSim.wordInitial({ text: 'Một\nTrân trọng' })} dispatch={vi.fn()} />);
    const area = screen.getByLabelText('Vùng soạn thảo');
    await waitFor(() => expect(area.querySelectorAll('p')).toHaveLength(2));
    const line2 = area.querySelectorAll('p')[1]!.firstChild!;
    area.focus();
    document.getSelection()!.setBaseAndExtent(line2, 0, line2, line2.textContent!.length);
    fireEvent.keyDown(area, { key: 'u', code: 'KeyU', keyCode: 85, ctrlKey: true });
    expect(area.innerHTML).toContain('<u>Trân trọng</u>');
    expect(area.querySelectorAll('p')[0]!.innerHTML).toBe('Một');
  });
});
