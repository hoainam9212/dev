import { describe, expect, it } from 'vitest';
import { aiChatInitial, reduceAiChat, type AiChatAction, type AiChatState } from './state';

const run = (s: AiChatState, ...a: AiChatAction[]): AiChatState => a.reduce(reduceAiChat, s);

const REPLIES = { weak: 'Trả lời chung chung.', ok: 'Trả lời khá ổn.', good: 'Trả lời sát ý.' };
const WEAK = 'Viết cho tôi một email xin nghỉ phép';
const GOOD =
  'Bạn là nhân viên hành chính giỏi viết thư. Tôi là trưởng phòng kế toán. ' +
  'Hãy viết email báo lịch họp, gồm 3 đoạn, không quá 150 chữ, giọng lịch sự.';

const send = (text: string): AiChatAction[] => [{ type: 'setDraft', text }, { type: 'send' }];

describe('aiChatInitial', () => {
  it('có tin chào của AI, nháp rỗng, mặc định chế độ chat', () => {
    const s = aiChatInitial({ greeting: 'Chào bạn' });
    expect(s.messages).toEqual([{ from: 'ai', text: 'Chào bạn' }]);
    expect(s.draft).toBe('');
    expect(s.mode).toBe('chat');
  });

  it('chỉ có câu good thì cả ba mức đều dùng câu good', () => {
    expect(aiChatInitial({ replies: { good: 'G' } }).replies).toEqual({ weak: 'G', ok: 'G', good: 'G' });
  });
});

describe('send', () => {
  it('thêm tin người dùng kèm điểm, tin AI theo mức, rồi xoá nháp', () => {
    const s = run(aiChatInitial({ replies: REPLIES }), ...send(GOOD));
    expect(s.messages).toHaveLength(2);
    expect(s.messages[0]).toMatchObject({ from: 'user', text: GOOD });
    expect(s.messages[0]!.score?.tier).toBe('good');
    expect(s.messages[1]).toEqual({ from: 'ai', text: REPLIES.good });
    expect(s.draft).toBe('');
  });

  it('nháp chỉ có khoảng trắng thì không đổi gì (cùng tham chiếu)', () => {
    const s0 = run(aiChatInitial({ replies: REPLIES }), { type: 'setDraft', text: '   ' });
    expect(reduceAiChat(s0, { type: 'send' })).toBe(s0);
  });

  it('prompt yếu nhận câu weak, prompt đủ 5 phần nhận câu good', () => {
    const s = run(aiChatInitial({ replies: REPLIES }), ...send(WEAK), ...send(GOOD));
    expect(s.messages.filter((m) => m.from === 'ai').map((m) => m.text)).toEqual([REPLIES.weak, REPLIES.good]);
  });
});

describe('pick', () => {
  it('pickSentence chọn đúng một câu; bấm lại câu đang chọn thì bỏ chọn', () => {
    const s0 = aiChatInitial({ mode: 'pickSentence', sentences: ['A.', 'B.', 'C.'] });
    const s = run(s0, { type: 'pick', index: 2 }, { type: 'pick', index: 0 });
    expect(s.picked).toEqual([0]);
    expect(run(s, { type: 'pick', index: 0 }).picked).toEqual([]);
  });

  it('pickItems bật/tắt từng mục; chỉ số ngoài phạm vi là no-op', () => {
    const s0 = aiChatInitial({ mode: 'pickItems', items: ['a', 'b', 'c', 'd'] });
    const s = run(s0, { type: 'pick', index: 1 }, { type: 'pick', index: 3 }, { type: 'pick', index: 1 });
    expect(s.picked).toEqual([3]);
    expect(reduceAiChat(s, { type: 'pick', index: 9 })).toBe(s);
    expect(reduceAiChat(s, { type: 'pick', index: -1 })).toBe(s);
  });
});

describe('clearChat', () => {
  it('giữ tin chào, xoá phần còn lại', () => {
    const s = run(aiChatInitial({ greeting: 'Chào bạn', replies: REPLIES }), ...send(GOOD), { type: 'clearChat' });
    expect(s.messages).toEqual([{ from: 'ai', text: 'Chào bạn' }]);
  });
});
