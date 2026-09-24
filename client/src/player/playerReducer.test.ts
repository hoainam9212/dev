import { describe, it, expect } from 'vitest';
import type { Step } from '@office-neko/shared';
import { initPlayer, playerReducer } from './playerReducer';

const steps: Step[] = [
  { kind: 'explain', body: 'a' },
  { kind: 'quiz', question: 'q', choices: ['x', 'y'], answer: 1, why: 'w' },
  { kind: 'practice', sim: 'mouse', task: 't', initial: {}, checks: [{}], hints: ['h', { helpId: 'x' }, ['s']], solution: [] },
];

describe('playerReducer', () => {
  const r = playerReducer(steps);

  it('starts on a done explain step', () => {
    expect(initPlayer(steps)).toMatchObject({ index: 0, stepDone: true, failures: 0, finished: false });
  });

  it('counts wrong quiz picks and blocks next until correct', () => {
    let s = r(initPlayer(steps), { type: 'next' });
    expect(s).toMatchObject({ index: 1, stepDone: false });
    s = r(s, { type: 'next' });
    expect(s.index).toBe(1);
    s = r(s, { type: 'quizPick', correct: false });
    s = r(s, { type: 'quizPick', correct: true });
    s = r(s, { type: 'quizPick', correct: false });
    expect(s).toMatchObject({ stepDone: true, failures: 1 });
  });

  it('only counts manual failed checks and tracks hints', () => {
    let s = { ...initPlayer(steps), index: 2, stepDone: false };
    s = r(s, { type: 'checkResult', pass: false, manual: false });
    expect(s.failures).toBe(0);
    s = r(s, { type: 'checkResult', pass: false, manual: true });
    expect(s.failures).toBe(1);
    s = r(s, { type: 'hint' });
    s = r(s, { type: 'hint' });
    s = r(s, { type: 'hint' });
    s = r(s, { type: 'hint' });
    expect(s).toMatchObject({ stepHint: 3, maxHint: 3 });
    s = r(s, { type: 'checkResult', pass: true, manual: false });
    expect(s.stepDone).toBe(true);
    s = r(s, { type: 'next' });
    expect(s).toMatchObject({ finished: true, maxHint: 3 });
  });

  it('treats a real screenshot step as done on arrival', () => {
    const shot: Step[] = [{ kind: 'realShot', image: '/x.png', caption: 'c', marks: [{ x: 1, y: 1, w: 1, h: 1, label: 'l' }] }];
    expect(initPlayer(shot)).toMatchObject({ stepDone: true });
  });
});
