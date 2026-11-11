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

describe('chủ đề của bài', () => {
  const TOPIC = { keywords: ['trung'], vi: 'cách luộc trứng' };
  const egg = () => aiChatInitial({ greeting: 'Chào bạn', replies: REPLIES, topic: TOPIC });
  const lastAi = (s: AiChatState) => s.messages.at(-1)!.text;

  it('hỏi đúng chủ đề (có dấu hay không dấu) thì nhận câu trả lời soạn sẵn theo mức prompt', () => {
    expect(lastAi(run(egg(), ...send('Cách luộc trứng như thế nào?')))).toBe(REPLIES.weak);
    expect(lastAi(run(egg(), ...send('cach luoc trung')))).toBe(REPLIES.weak);
    expect(run(egg(), ...send('cach luoc trung')).messages.at(-2)!.onTopic).toBe(true);
  });

  it('hỏi "Bạn là ai" thì AI tự giới thiệu là bản mô phỏng và gợi ý chủ đề, không trả lời chuyện trứng', () => {
    const s = run(egg(), ...send('Bạn là ai'));
    expect(lastAi(s)).toMatch(/mô phỏng/);
    expect(lastAi(s)).toContain('cách luộc trứng');
    expect(lastAi(s)).not.toBe(REPLIES.weak);
    expect(s.messages.at(-2)!.onTopic).toBe(false);
  });

  it('chào và cảm ơn có câu đáp riêng', () => {
    expect(lastAi(run(egg(), ...send('xin chào')))).toMatch(/^Chào bạn/);
    expect(lastAi(run(egg(), ...send('cảm ơn nhé')))).toMatch(/Không có gì/);
  });

  it('câu lạc đề khác: nói thật là chưa hiểu, nhắc chủ đề của bài', () => {
    const s = run(egg(), ...send('Thời tiết hôm nay thế nào?'));
    expect(lastAi(s)).toMatch(/chưa hiểu/);
    expect(lastAi(s)).toContain('cách luộc trứng');
  });

  it('từ khoá khớp theo từ, không khớp giữa chữ khác', () => {
    const s = run(aiChatInitial({ replies: REPLIES, topic: { keywords: ['tet'], vi: 'nghỉ Tết' } }), ...send('mạng internet chậm quá'));
    expect(s.messages.at(-2)!.onTopic).toBe(false);
  });

  it('bài không khai chủ đề thì giữ cách cũ: mọi prompt nhận câu soạn sẵn', () => {
    const s = run(aiChatInitial({ replies: REPLIES }), ...send('Bạn là ai'));
    expect(lastAi(s)).toBe(REPLIES.weak);
    expect(s.messages.at(-2)!.onTopic).toBeUndefined();
  });
});
