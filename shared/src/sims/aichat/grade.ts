import type { CheckResult, Grader } from '../../grading/core';
import { CRITERIA, type Criterion } from './criteria';
import type { AiChatState } from './state';

export type AiCheck =
  /** Số prompt đã gửi ≥ min (mặc định 1). */
  | { kind: 'sent'; min?: number }
  /** BẤT KỲ prompt đã gửi có đủ `required` và đạt `minScore`: prompt sau kém hơn không làm mất điểm. */
  | { kind: 'promptCriteria'; required: Criterion[]; minScore?: number }
  | { kind: 'pickSentence'; answer: number }
  /** Tập đang chọn phải TRÙNG KHÍT tập đáp án. */
  | { kind: 'pickItems'; answer: number[] };

const ok = (messageVi: string): CheckResult => ({ ok: true, messageVi });
const no = (messageVi: string): CheckResult => ({ ok: false, messageVi });

const VI = Object.fromEntries(CRITERIA.map((c) => [c.id, c.vi])) as Record<Criterion, string>;

function gradePrompt(s: AiChatState, required: Criterion[], minScore: number): CheckResult {
  const scores = s.messages.flatMap((m) => (m.from === 'user' && m.score ? [m.score] : []));
  if (scores.length === 0) return no('Hãy gõ prompt rồi bấm Gửi.');
  // Chấm prompt gần đạt nhất: ít tiêu chí bắt buộc còn thiếu nhất, rồi điểm cao nhất.
  const ranked = scores
    .map((sc) => ({ sc, missing: CRITERIA.filter((c) => required.includes(c.id) && !sc.hits[c.id]).map((c) => c.id) }))
    .sort((a, b) => a.missing.length - b.missing.length || b.sc.score - a.sc.score);
  const best = ranked[0]!;
  if (best.missing.length > 0) return no(`Prompt còn thiếu: ${best.missing.map((id) => VI[id]).join(', ')}.`);
  if (best.sc.score < minScore) return no(`Prompt mới đạt ${best.sc.score}/5 tiêu chí, cần ${minScore}.`);
  return ok('Prompt rõ ràng, đủ các phần cần thiết.');
}

export const gradeAiChat: Grader<AiChatState, AiCheck> = (s, c) => {
  switch (c.kind) {
    case 'sent': {
      const min = c.min ?? 1;
      const n = s.messages.filter((m) => m.from === 'user').length;
      if (n >= min) return ok(`Đã gửi ${n} prompt.`);
      return no(n === 0 ? 'Hãy gõ prompt rồi bấm Gửi.' : `Hãy gửi thêm ${min - n} prompt nữa.`);
    }
    case 'promptCriteria':
      return gradePrompt(s, c.required, c.minScore ?? 0);
    case 'pickSentence': {
      const p = s.picked[0];
      if (p === undefined) return no('Bấm vào câu bạn thấy sai.');
      if (p !== c.answer) return no('Câu này đúng đấy. Đọc lại thật kỹ con số và tên riêng trong từng câu nhé.');
      return ok('Đúng rồi, câu này sai. Luôn kiểm tra lại câu trả lời của AI.');
    }
    case 'pickItems': {
      const extra = s.picked.filter((i) => !c.answer.includes(i)).sort((a, b) => a - b);
      if (extra.length > 0) return no(`«${s.items[extra[0]!] ?? ''}» thì đưa cho AI được.`);
      const missing = c.answer.filter((i) => !s.picked.includes(i)).length;
      if (missing > 0) return no(`Còn ${missing} thông tin nhạy cảm chưa chọn.`);
      return ok('Đúng rồi, những thông tin này không nên đưa cho AI.');
    }
  }
};
