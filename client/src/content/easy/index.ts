import type { Lesson, Step } from '@office-neko/shared';
import type { EasyLesson, EasyStep } from './types';
import { BASICS_EASY } from './basics';

export type { EasyLesson, EasyStep } from './types';

/** Lời dễ theo id bài, gộp từ từng lộ trình. Bài nào không có thì hiện bản gốc. */
export const EASY: Record<string, EasyLesson> = { ...BASICS_EASY };

function applyStep(step: Step, e: EasyStep | undefined): Step {
  if (!e || e.kind !== step.kind) return step;
  switch (step.kind) {
    case 'explain':
      return e.kind === 'explain' ? { ...step, body: e.body ?? step.body } : step;
    case 'quiz':
      if (e.kind !== 'quiz') return step;
      return {
        ...step,
        question: e.question ?? step.question,
        // Số lựa chọn khác bản gốc thì bỏ, để `answer` không chỉ sai chỗ.
        choices: e.choices && e.choices.length === step.choices.length ? e.choices : step.choices,
        why: e.why ?? step.why,
      };
    case 'practice': {
      if (e.kind !== 'practice') return step;
      const [hint, spot, steps] = step.hints;
      return { ...step, task: e.task ?? step.task, hints: [e.hint ?? hint, spot, e.steps ?? steps] };
    }
    case 'realShot':
      return e.kind === 'realShot' ? { ...step, caption: e.caption ?? step.caption } : step;
  }
}

/** Bản sao của bài với chữ đã thay bằng lời dễ; bài gốc không bị sửa. */
export function applyEasy(lesson: Lesson, easy?: EasyLesson): Lesson {
  if (!easy) return lesson;
  return {
    ...lesson,
    title: easy.title ?? lesson.title,
    ...(easy.osNote || lesson.osNote ? { osNote: { ...lesson.osNote, ...easy.osNote } } : {}),
    steps: lesson.steps.map((s, i) => applyStep(s, easy.steps?.[i])),
  };
}
