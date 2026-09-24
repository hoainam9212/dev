import type { Step } from '@office-neko/shared';

export type HintLevel = 0 | 1 | 2 | 3;

/** Những gì một bước để lại khi người học rời nó, để quay lại thấy y như cũ. */
export interface StepSnapshot {
  /** Trạng thái trình mô phỏng. */
  sim?: unknown;
  /** Kết quả chấm đang hiện (các dòng ✅/❌). */
  report?: unknown;
  /** Các đáp án quiz đã chọn sai. */
  wrong?: number[];
}

export interface PlayerState {
  index: number;
  /** Bước xa nhất đã tới. Mọi bước trước nó đều đã xong. */
  furthest: number;
  /** Bước đang hiện đã xong chưa (bước đang xem lại luôn là xong). */
  stepDone: boolean;
  /** Bước `furthest` đã xong chưa — nhớ riêng để quay lại rồi đi tới vẫn đúng. */
  frontierDone: boolean;
  /** Đang xem lại một bước đã qua: thao tác thoải mái, không tính lỗi, gợi ý hay sao. */
  reviewing: boolean;
  /** Bậc gợi ý của bước `furthest`. */
  stepHint: HintLevel;
  maxHint: HintLevel;
  failures: number;
  finished: boolean;
  saved: Record<number, StepSnapshot>;
}

export type PlayerAction =
  | { type: 'next'; snapshot?: StepSnapshot }
  | { type: 'back'; snapshot?: StepSnapshot }
  | { type: 'quizPick'; correct: boolean }
  | { type: 'checkResult'; pass: boolean; manual: boolean }
  | { type: 'hint' };

const doneOnEnter = (step: Step | undefined) => step?.kind === 'explain' || step?.kind === 'realShot';

export function initPlayer(steps: readonly Step[]): PlayerState {
  const done = doneOnEnter(steps[0]);
  return {
    index: 0, furthest: 0, stepDone: done, frontierDone: done, reviewing: false,
    stepHint: 0, maxHint: 0, failures: 0, finished: steps.length === 0, saved: {},
  };
}

const save = (s: PlayerState, snapshot: StepSnapshot | undefined) =>
  snapshot ? { ...s.saved, [s.index]: snapshot } : s.saved;

export function playerReducer(steps: readonly Step[]) {
  return (s: PlayerState, a: PlayerAction): PlayerState => {
    if (s.finished) return s;
    // Bước đang xem lại luôn stepDone = true, nên ba nhánh chấm điểm dưới đây tự bỏ qua nó.
    switch (a.type) {
      case 'quizPick':
        if (s.stepDone) return s;
        return a.correct ? { ...s, stepDone: true, frontierDone: true } : { ...s, failures: s.failures + 1 };
      case 'checkResult':
        if (s.stepDone) return s;
        if (a.pass) return { ...s, stepDone: true, frontierDone: true };
        return a.manual ? { ...s, failures: s.failures + 1 } : s;
      case 'hint': {
        if (s.stepDone) return s;
        const h = Math.min(3, s.stepHint + 1) as HintLevel;
        return { ...s, stepHint: h, maxHint: Math.max(s.maxHint, h) as HintLevel };
      }
      case 'back': {
        if (s.index === 0) return s;
        return { ...s, saved: save(s, a.snapshot), index: s.index - 1, stepDone: true, reviewing: true };
      }
      case 'next': {
        if (!s.stepDone) return s;
        const saved = save(s, a.snapshot);
        const index = s.index + 1;
        if (index >= steps.length) return { ...s, saved, index, finished: true };
        if (index < s.furthest) return { ...s, saved, index, stepDone: true, reviewing: true };
        if (index === s.furthest) return { ...s, saved, index, stepDone: s.frontierDone, reviewing: false };
        const done = doneOnEnter(steps[index]);
        return { ...s, saved, index, furthest: index, stepDone: done, frontierDone: done, reviewing: false, stepHint: 0 };
      }
    }
  };
}
