import type { Step } from '@office-neko/shared';

export type HintLevel = 0 | 1 | 2 | 3;

export interface PlayerState {
  index: number;
  stepDone: boolean;
  stepHint: HintLevel;
  maxHint: HintLevel;
  failures: number;
  finished: boolean;
}

export type PlayerAction =
  | { type: 'next' }
  | { type: 'quizPick'; correct: boolean }
  | { type: 'checkResult'; pass: boolean; manual: boolean }
  | { type: 'hint' };

const doneOnEnter = (step: Step | undefined) => step?.kind === 'explain' || step?.kind === 'realShot';

export function initPlayer(steps: readonly Step[]): PlayerState {
  return { index: 0, stepDone: doneOnEnter(steps[0]), stepHint: 0, maxHint: 0, failures: 0, finished: steps.length === 0 };
}

export function playerReducer(steps: readonly Step[]) {
  return (s: PlayerState, a: PlayerAction): PlayerState => {
    if (s.finished) return s;
    switch (a.type) {
      case 'quizPick':
        if (s.stepDone) return s;
        return a.correct ? { ...s, stepDone: true } : { ...s, failures: s.failures + 1 };
      case 'checkResult':
        if (s.stepDone) return s;
        if (a.pass) return { ...s, stepDone: true };
        return a.manual ? { ...s, failures: s.failures + 1 } : s;
      case 'hint': {
        if (s.stepDone) return s;
        const h = Math.min(3, s.stepHint + 1) as HintLevel;
        return { ...s, stepHint: h, maxHint: Math.max(s.maxHint, h) as HintLevel };
      }
      case 'next': {
        if (!s.stepDone) return s;
        const index = s.index + 1;
        if (index >= steps.length) return { ...s, index, finished: true };
        return { ...s, index, stepDone: doneOnEnter(steps[index]), stepHint: 0 };
      }
    }
  };
}
