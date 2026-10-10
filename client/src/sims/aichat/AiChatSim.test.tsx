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

const renderMode = (o: Parameters<typeof aichatSim.aiChatInitial>[0]) => {
  const onState = vi.fn();
  render(<AiChatSim initial={aichatSim.aiChatInitial(o)} onState={onState} os="win" spotlight={null} />);
  const last = (): aichatSim.AiChatState => onState.mock.lastCall![0];
  return { last };
};

describe('AiChatSim — bắt câu sai (pickSentence)', () => {
  const SENTENCES = ['Hà Nội là thủ đô của Việt Nam.', 'Sông Hồng dài 50 km.', 'Hồ Gươm nằm ở quận Hoàn Kiếm.'];
  const open = () =>
    renderMode({ mode: 'pickSentence', greeting: 'Kể về Hà Nội giúp tôi.', sentences: SENTENCES });

  it('câu hỏi nằm bên phải, mỗi câu trả lời là một nút', () => {
    open();
    expect(screen.getByText('Kể về Hà Nội giúp tôi.').closest('[data-from]')).toHaveAttribute('data-from', 'user');
    expect(screen.getByText('Bấm vào câu bạn thấy sai.')).toBeInTheDocument();
    for (const s of SENTENCES) expect(screen.getByRole('button', { name: s })).toBeInTheDocument();
  });

  it('bấm câu 2 thì chọn câu đó (aria-pressed)', async () => {
    const { last } = open();
    const second = screen.getByRole('button', { name: SENTENCES[1] });
    await userEvent.click(second);
    expect(last().picked).toEqual([1]);
    expect(second).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: SENTENCES[0] })).toHaveAttribute('aria-pressed', 'false');
  });

  it('chọn câu được bằng bàn phím: Tab tới, Enter hoặc Space', async () => {
    const { last } = open();
    await userEvent.tab();
    expect(screen.getByRole('button', { name: SENTENCES[0] })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(last().picked).toEqual([0]);
    await userEvent.tab();
    await userEvent.keyboard(' ');
    expect(last().picked).toEqual([1]);
  });

  it('không có ô gõ và không có chip tiêu chí', () => {
    open();
    expect(screen.queryByRole('textbox')).toBeNull();
    expect(screen.queryByRole('list', { name: 'Mochi chấm prompt' })).toBeNull();
  });
});

describe('AiChatSim — chọn thông tin nhạy cảm (pickItems)', () => {
  const ITEMS = ['Mật khẩu email công ty', 'Tên món ăn yêu thích', 'Số tài khoản ngân hàng'];
  const open = () => renderMode({ mode: 'pickItems', items: ITEMS });

  it('mỗi mục là checkbox, bấm thì chọn và hiện "Không đưa"', async () => {
    const { last } = open();
    expect(screen.getByText('Bạn định dán những thông tin này vào ô chat:')).toBeInTheDocument();
    const boxes = screen.getAllByRole('checkbox');
    expect(boxes).toHaveLength(3);
    const [first, , third] = boxes as [HTMLElement, HTMLElement, HTMLElement];
    await userEvent.click(third);
    expect(last().picked).toEqual([2]);
    expect(third).toHaveAttribute('aria-checked', 'true');
    expect(third).toHaveTextContent('Không đưa');
    expect(first).not.toHaveTextContent('Không đưa');
    expect(screen.queryByRole('textbox')).toBeNull();
  });

  it('dùng được bàn phím: Tab tới mục, Space bật', async () => {
    const { last } = open();
    await userEvent.tab();
    expect(screen.getAllByRole('checkbox')[0]).toHaveFocus();
    await userEvent.keyboard(' ');
    expect(last().picked).toEqual([0]);
  });
});

describe('AiChatSim — đăng ký', () => {
  it('đã đăng ký trong SIMS', () => {
    expect(SIMS.aichat?.kind).toBe('aichat');
    expect(SIMS.aichat?.Component).toBe(AiChatSim);
  });
});
