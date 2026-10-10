import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { aichatSim } from '@office-neko/shared';
import { describe, expect, it, vi } from 'vitest';
import { AiChatSim } from './AiChatSim';
import { SIMS } from '../registry';

const REPLIES = { weak: 'Trả lời chung chung.', ok: 'Trả lời khá ổn.', good: 'Trả lời sát ý.' };

const setup = () => {
  const onState = vi.fn();
  render(
    <AiChatSim
      initial={aichatSim.aiChatInitial({ greeting: 'Chào bạn, mình giúp gì được?', replies: REPLIES })}
      onState={onState}
      os="win"
      spotlight={null}
    />,
  );
  const box = screen.getByRole('textbox', { name: 'Nhập prompt' });
  const last = (): aichatSim.AiChatState => onState.mock.lastCall![0];
  return { onState, box, last };
};

describe('AiChatSim', () => {
  it('ghi rõ đây là trợ lý mô phỏng, không gửi đi đâu', () => {
    setup();
    expect(screen.getByText('Trợ lý AI (mô phỏng)')).toBeInTheDocument();
    expect(screen.getByText(/không gửi đi đâu cả/)).toBeInTheDocument();
  });

  it('tin chào nằm trong nhóm tin của AI (bên trái)', () => {
    setup();
    const bubble = screen.getByText('Chào bạn, mình giúp gì được?');
    expect(bubble.closest('[data-from]')).toHaveAttribute('data-from', 'ai');
  });

  it('gõ prompt rồi bấm Gửi: thêm 2 tin, ô gõ trống lại', async () => {
    const { box, last } = setup();
    await userEvent.type(box, 'Viết cho tôi một email xin nghỉ phép');
    await userEvent.click(screen.getByRole('button', { name: 'Gửi' }));
    expect(last().messages).toHaveLength(3);
    expect(box).toHaveValue('');
    expect(screen.getByText('Trả lời chung chung.').closest('[data-from]')).toHaveAttribute('data-from', 'ai');
  });

  it('nút Gửi bị khoá khi ô gõ trống', () => {
    setup();
    expect(screen.getByRole('button', { name: 'Gửi' })).toBeDisabled();
  });

  it('Enter gửi, Shift+Enter không gửi', async () => {
    const { box, last } = setup();
    await userEvent.type(box, 'Viết cho tôi một email xin nghỉ phép');
    await userEvent.type(box, '{Shift>}{Enter}{/Shift}');
    expect(last().messages).toHaveLength(1);
    await userEvent.type(box, '{Enter}');
    expect(last().messages).toHaveLength(3);
  });

  it('Enter khi bộ gõ tiếng Việt đang ghép chữ (isComposing) thì không gửi', async () => {
    const { box, last } = setup();
    await userEvent.type(box, 'Viết cho tôi một email xin nghỉ phép');
    fireEvent.keyDown(box, { key: 'Enter', isComposing: true });
    expect(last().messages).toHaveLength(1);
  });

  it('chip tiêu chí chấm ngay trên nháp đang gõ', async () => {
    const { box } = setup();
    await userEvent.type(box, 'Bạn là trợ lý giỏi việc văn phòng nhé');
    expect(screen.getByLabelText('Vai trò: đã có')).toBeInTheDocument();
    expect(screen.getByLabelText('Giới hạn: chưa có')).toBeInTheDocument();
  });

  it('nháp quá ngắn thì nhắc nói rõ hơn', async () => {
    const { box } = setup();
    await userEvent.type(box, 'Viết thư');
    expect(screen.getByText(/Prompt hơi ngắn/)).toBeInTheDocument();
  });

  it('đã đăng ký trong SIMS', () => {
    expect(SIMS.aichat?.kind).toBe('aichat');
    expect(SIMS.aichat?.Component).toBe(AiChatSim);
  });
});
