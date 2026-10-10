import { describe, expect, it } from 'vitest';
import { CRITERIA, foldVi, MIN_PROMPT_LEN, scorePrompt, tierOf, type Criterion } from './criteria';

const hit = (text: string): Criterion[] => {
  const s = scorePrompt(text);
  return CRITERIA.map((c) => c.id).filter((id) => s.hits[id]);
};

const FULL =
  'Bạn là nhân viên hành chính giỏi viết thư. Tôi là trưởng phòng kế toán. ' +
  'Hãy viết email báo lịch họp, gồm 3 đoạn, không quá 150 chữ, giọng lịch sự.';

const FULL_NO_ACCENT =
  'ban la nhan vien hanh chinh gioi viet thu. toi la truong phong ke toan. ' +
  'hay viet email bao lich hop, gom 3 doan, khong qua 150 chu, giong lich su.';

describe('foldVi', () => {
  it('bỏ dấu, đ→d, chữ thường, gộp khoảng trắng', () => {
    expect(foldVi('Đơn XIN   việc')).toBe('don xin viec');
  });
});

describe('scorePrompt', () => {
  it('prompt ngắn hơn MIN_PROMPT_LEN thì tooShort, 0 điểm, mức weak', () => {
    const s = scorePrompt('Viết email');
    expect('Viết email'.length).toBeLessThan(MIN_PROMPT_LEN);
    expect(s.tooShort).toBe(true);
    expect(s.score).toBe(0);
    expect(s.tier).toBe('weak');
    expect(Object.values(s.hits).every((v) => !v)).toBe(true);
  });

  it('"Viết cho tôi một email xin nghỉ phép" chỉ có nhiệm vụ; "cho tôi" không phải bối cảnh', () => {
    expect(hit('Viết cho tôi một email xin nghỉ phép')).toEqual(['task']);
  });

  it('prompt đủ 5 phần có dấu được 5 điểm, mức good', () => {
    const s = scorePrompt(FULL);
    expect(s.score).toBe(5);
    expect(s.tier).toBe('good');
    expect(s.tooShort).toBe(false);
  });

  it('cùng prompt gõ không dấu vẫn được 5 điểm', () => {
    expect(scorePrompt(FULL_NO_ACCENT).score).toBe(5);
  });

  it('vai trò + nhiệm vụ + định dạng được 3 điểm, mức ok', () => {
    const s = scorePrompt('Bạn là trợ lý giỏi. Hãy liệt kê các việc cần làm dưới dạng gạch đầu dòng.');
    expect(hit('Bạn là trợ lý giỏi. Hãy liệt kê các việc cần làm dưới dạng gạch đầu dòng.')).toEqual([
      'role',
      'task',
      'format',
    ]);
    expect(s.score).toBe(3);
    expect(s.tier).toBe('ok');
  });

  it('"Liệt kê 5 ý chính" có định dạng nhờ số + "ý"', () => {
    expect(scorePrompt('Liệt kê 5 ý chính của cuộc họp sáng nay').hits.format).toBe(true);
  });

  it('"dưới 100 chữ" khớp giới hạn; "khoảng 3 câu" khớp cả định dạng lẫn giới hạn', () => {
    expect(scorePrompt('Tóm tắt bài báo này dưới 100 chữ nhé').hits.limits).toBe(true);
    const s = scorePrompt('Tóm tắt bài báo này trong khoảng 3 câu nhé');
    expect(s.hits.format).toBe(true);
    expect(s.hits.limits).toBe(true);
  });

  it('"sửa" trong "sửa soạn" vẫn tính nhiệm vụ — đây là góp ý, không chấm khắt khe', () => {
    expect(scorePrompt('Sáng nay mọi người đang sửa soạn đi làm sớm').hits.task).toBe(true);
  });
});

describe('CRITERIA', () => {
  it('có đúng 5 mục theo thứ tự role, context, task, format, limits', () => {
    expect(CRITERIA.map((c) => c.id)).toEqual(['role', 'context', 'task', 'format', 'limits']);
    expect(CRITERIA.map((c) => c.vi)).toEqual(['Vai trò', 'Bối cảnh', 'Nhiệm vụ', 'Định dạng', 'Giới hạn']);
  });
});

describe('tierOf', () => {
  it('0–2 weak, 3–4 ok, 5 good', () => {
    expect([0, 2, 3, 4, 5].map(tierOf)).toEqual(['weak', 'weak', 'ok', 'ok', 'good']);
  });
});
