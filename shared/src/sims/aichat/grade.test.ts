import { describe, expect, it } from 'vitest';
import { grade } from '../../grading';
import { gradeAiChat, type AiCheck } from './grade';
import { aiChatInitial, reduceAiChat, type AiChatAction, type AiChatState } from './state';

const run = (s: AiChatState, ...a: AiChatAction[]): AiChatState => a.reduce(reduceAiChat, s);
const send = (text: string): AiChatAction[] => [{ type: 'setDraft', text }, { type: 'send' }];
const chat = (...prompts: string[]): AiChatState =>
  run(aiChatInitial({ replies: { good: 'ok' } }), ...prompts.flatMap(send));

const GOOD =
  'Bạn là nhân viên hành chính giỏi viết thư. Tôi là trưởng phòng kế toán. ' +
  'Hãy viết email báo lịch họp, gồm 3 đoạn, không quá 150 chữ, giọng lịch sự.';
/** Vai trò + nhiệm vụ + định dạng: thiếu Bối cảnh và Giới hạn. */
const THREE = 'Bạn là trợ lý giỏi. Hãy liệt kê các việc cần làm dưới dạng gạch đầu dòng.';
const WEAK = 'Viết cho tôi một email xin nghỉ phép';

describe('sent', () => {
  it('chưa gửi trượt, gửi một lần đạt, min 2 cần hai lần', () => {
    expect(gradeAiChat(chat(), { kind: 'sent' }).ok).toBe(false);
    expect(gradeAiChat(chat(WEAK), { kind: 'sent' }).ok).toBe(true);
    expect(gradeAiChat(chat(WEAK), { kind: 'sent', min: 2 }).ok).toBe(false);
    expect(gradeAiChat(chat(WEAK, WEAK), { kind: 'sent', min: 2 }).ok).toBe(true);
  });
});

describe('promptCriteria', () => {
  const all: AiCheck = { kind: 'promptCriteria', required: ['role', 'context', 'task', 'format', 'limits'] };

  it('chưa gửi gì thì nhắc gõ prompt', () => {
    const r = gradeAiChat(chat(), all);
    expect(r.ok).toBe(false);
    expect(r.messageVi).toBe('Hãy gõ prompt rồi bấm Gửi.');
  });

  it('thiếu tiêu chí thì nêu đúng tên, đúng thứ tự', () => {
    const r = gradeAiChat(chat(THREE), all);
    expect(r.ok).toBe(false);
    expect(r.messageVi).toBe('Prompt còn thiếu: Bối cảnh, Giới hạn.');
  });

  it('gửi prompt tốt rồi prompt kém vẫn đạt', () => {
    expect(gradeAiChat(chat(GOOD, WEAK), all).ok).toBe(true);
  });

  it('đủ tiêu chí bắt buộc nhưng điểm dưới minScore thì trượt, nói rõ đạt mấy/5', () => {
    const r = gradeAiChat(chat(THREE), { kind: 'promptCriteria', required: ['task'], minScore: 4 });
    expect(r.ok).toBe(false);
    expect(r.messageVi).toBe('Prompt mới đạt 3/5 tiêu chí, cần 4.');
  });
});

describe('pickSentence', () => {
  const s0 = aiChatInitial({ mode: 'pickSentence', sentences: ['A.', 'B.', 'C.'] });
  const check: AiCheck = { kind: 'pickSentence', answer: 1 };

  it('chọn đúng câu thì đạt', () => {
    expect(gradeAiChat(run(s0, { type: 'pick', index: 1 }), check).ok).toBe(true);
  });

  it('chọn sai câu thì nhắc đọc kỹ con số và tên riêng', () => {
    const r = gradeAiChat(run(s0, { type: 'pick', index: 0 }), check);
    expect(r.ok).toBe(false);
    expect(r.messageVi).toBe('Câu này đúng đấy. Đọc lại thật kỹ con số và tên riêng trong từng câu nhé.');
  });

  it('chưa chọn thì nhắc bấm vào câu sai', () => {
    expect(gradeAiChat(s0, check).messageVi).toBe('Bấm vào câu bạn thấy sai.');
  });
});

describe('pickItems', () => {
  const s0 = aiChatInitial({ mode: 'pickItems', items: ['Tên công ty', 'Số CCCD', 'Mật khẩu email', 'Chủ đề họp'] });
  const check: AiCheck = { kind: 'pickItems', answer: [1, 2] };
  const pick = (...ix: number[]): AiChatState => run(s0, ...ix.map((index) => ({ type: 'pick' as const, index })));

  it('chọn trùng khít đáp án thì đạt (thứ tự bấm không quan trọng)', () => {
    expect(gradeAiChat(pick(2, 1), check).ok).toBe(true);
  });

  it('thiếu một mục thì trượt, nói còn mấy mục', () => {
    const r = gradeAiChat(pick(1), check);
    expect(r.ok).toBe(false);
    expect(r.messageVi).toBe('Còn 1 thông tin nhạy cảm chưa chọn.');
  });

  it('thừa một mục thì trượt và nêu tên mục thừa', () => {
    const r = gradeAiChat(pick(1, 2, 3), check);
    expect(r.ok).toBe(false);
    expect(r.messageVi).toBe('«Chủ đề họp» thì đưa cho AI được.');
  });
});

describe('đăng ký', () => {
  it('grade("aichat") chạy qua GRADERS', () => {
    expect(grade('aichat', chat(WEAK), [{ kind: 'sent' }]).pass).toBe(true);
  });
});

describe('chủ đề của bài', () => {
  const topical = (...prompts: string[]): AiChatState =>
    run(aiChatInitial({ replies: { good: 'ok' }, topic: { keywords: ['nghi phep', 'xin nghi'], vi: 'email xin nghỉ phép' } }), ...prompts.flatMap(send));
  const OFF =
    'Bạn là nhân viên hành chính giỏi viết thư. Tôi là trưởng phòng kế toán. ' +
    'Hãy viết bài thơ về mùa thu, gồm 3 đoạn, không quá 150 chữ, giọng lịch sự.';
  const ON =
    'Bạn là nhân viên hành chính giỏi viết thư. Tôi là nhân viên kế toán. ' +
    'Hãy viết email xin nghỉ phép 2 ngày, gồm 3 đoạn, không quá 150 chữ, giọng lịch sự.';
  const all5: AiCheck = { kind: 'promptCriteria', required: ['role', 'context', 'task', 'format', 'limits'] };

  it('"sent": gửi câu lạc đề không tính, có lời nhắc chủ đề', () => {
    const r = gradeAiChat(topical('Bạn là ai'), { kind: 'sent' });
    expect(r.ok).toBe(false);
    expect(r.messageVi).toContain('email xin nghỉ phép');
    expect(gradeAiChat(topical('Bạn là ai', 'cho tôi email xin nghỉ'), { kind: 'sent' }).ok).toBe(true);
  });

  it('"promptCriteria": prompt đủ 5 phần nhưng lạc đề vẫn chưa đạt', () => {
    const r = gradeAiChat(topical(OFF), all5);
    expect(r.ok).toBe(false);
    expect(r.messageVi).toContain('email xin nghỉ phép');
    expect(gradeAiChat(topical(OFF, ON), all5).ok).toBe(true);
  });
});
