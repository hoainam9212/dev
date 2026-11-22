import { describe, expect, it } from 'vitest';
import type { Lesson } from '@office-neko/shared';
import { applyEasy } from './index';

const lesson: Lesson = {
  id: 'x', trackId: 'basics', chapterId: 'basics.start', title: 'Bài gốc', minutes: 2,
  osNote: { win: 'Ghi chú Windows', mac: 'Ghi chú Mac' },
  steps: [
    { kind: 'explain', body: 'Giải thích gốc' },
    { kind: 'explain', body: 'Giải thích hai' },
    { kind: 'quiz', question: 'Hỏi gốc?', choices: ['A', 'B', 'C'], answer: 2, why: 'Vì gốc' },
    {
      kind: 'practice', sim: 'mouse', task: 'Việc gốc', initial: { n: 1 }, checks: [{ c: 1 }],
      hints: ['Gợi ý 1', { helpId: 'mouse.target' }, ['Bước 1', 'Bước 2']], solution: [{ type: 'hit' }],
    },
    { kind: 'realShot', image: '/a.png', caption: 'Chú thích gốc', marks: [{ x: 1, y: 2, w: 3, h: 4, label: 'Nút' }] },
  ],
};

describe('applyEasy', () => {
  it('không có lời dễ thì trả bài gốc', () => {
    expect(applyEasy(lesson, undefined)).toEqual(lesson);
  });

  it('thay body của explain ở vị trí 0, bước khác giữ nguyên', () => {
    const out = applyEasy(lesson, { steps: { 0: { kind: 'explain', body: 'Dễ hiểu' } } });
    expect(out.steps[0]).toEqual({ kind: 'explain', body: 'Dễ hiểu' });
    expect(out.steps.slice(1)).toEqual(lesson.steps.slice(1));
  });

  it('thay quiz: choices mới, answer giữ nguyên; sai số lựa chọn thì giữ bản gốc', () => {
    const out = applyEasy(lesson, { steps: { 2: { kind: 'quiz', question: 'Hỏi dễ?', choices: ['a', 'b', 'c'], why: 'Vì dễ' } } });
    expect(out.steps[2]).toMatchObject({ question: 'Hỏi dễ?', choices: ['a', 'b', 'c'], answer: 2, why: 'Vì dễ' });
    const bad = applyEasy(lesson, { steps: { 2: { kind: 'quiz', choices: ['a', 'b'] } } });
    expect(bad.steps[2]).toMatchObject({ choices: ['A', 'B', 'C'] });
  });

  it('thay practice: task, hints[0], hints[2]; hints[1], checks, solution, initial y nguyên', () => {
    const out = applyEasy(lesson, { steps: { 3: { kind: 'practice', task: 'Việc dễ', hint: 'Gợi ý dễ', steps: ['Dễ 1'] } } });
    const p = out.steps[3]!;
    const o = lesson.steps[3]!;
    if (p.kind !== 'practice' || o.kind !== 'practice') throw new Error('sai loại');
    expect(p.task).toBe('Việc dễ');
    expect(p.hints).toEqual(['Gợi ý dễ', o.hints[1], ['Dễ 1']]);
    expect(p.checks).toBe(o.checks);
    expect(p.solution).toBe(o.solution);
    expect(p.initial).toBe(o.initial);
  });

  it('thay title, osNote, caption; không đổi marks', () => {
    const out = applyEasy(lesson, { title: 'Tên dễ', osNote: { win: 'Win dễ' }, steps: { 4: { kind: 'realShot', caption: 'Chú thích dễ' } } });
    expect(out.title).toBe('Tên dễ');
    expect(out.osNote).toEqual({ win: 'Win dễ', mac: 'Ghi chú Mac' });
    expect(out.steps[4]).toMatchObject({ caption: 'Chú thích dễ', marks: [{ x: 1, y: 2, w: 3, h: 4, label: 'Nút' }] });
  });

  it('kind không khớp bước gốc thì bỏ qua', () => {
    const out = applyEasy(lesson, { steps: { 0: { kind: 'quiz', question: 'Lạc chỗ' } } });
    expect(out.steps[0]).toEqual(lesson.steps[0]);
  });

  it('không sửa bài gốc', () => {
    const before = structuredClone(lesson);
    applyEasy(lesson, {
      title: 'T', osNote: { win: 'W' },
      steps: { 0: { kind: 'explain', body: 'B' }, 2: { kind: 'quiz', choices: ['1', '2', '3'] }, 3: { kind: 'practice', hint: 'H', steps: ['S'] } },
    });
    expect(lesson).toEqual(before);
  });
});
