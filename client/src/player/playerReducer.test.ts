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

  it('goes back to a finished step as a review that cannot change the score', () => {
    let s = r(initPlayer(steps), { type: 'next' });
    s = r(s, { type: 'quizPick', correct: false });
    s = r(s, { type: 'quizPick', correct: true });
    s = r(s, { type: 'next', snapshot: { wrong: [0] } });
    s = r(s, { type: 'hint' });
    s = r(s, { type: 'back', snapshot: { sim: { half: true } } });
    expect(s).toMatchObject({ index: 1, stepDone: true, reviewing: true, failures: 1, maxHint: 1 });
    expect(s.saved[1]).toEqual({ wrong: [0] });
    s = r(s, { type: 'quizPick', correct: false });
    s = r(s, { type: 'hint' });
    expect(s).toMatchObject({ failures: 1, maxHint: 1 });
  });

  it('returns to the unfinished frontier with its hints and saved work', () => {
    let s = r(initPlayer(steps), { type: 'next' });
    s = r(s, { type: 'quizPick', correct: true });
    s = r(s, { type: 'next' });
    s = r(s, { type: 'hint' });
    s = r(s, { type: 'back', snapshot: { sim: { half: true } } });
    s = r(s, { type: 'next' });
    expect(s).toMatchObject({ index: 2, stepDone: false, reviewing: false, stepHint: 1 });
    expect(s.saved[2]).toEqual({ sim: { half: true } });
    s = r(s, { type: 'checkResult', pass: false, manual: true });
    expect(s.failures).toBe(1);
  });

  it('keeps edits made while reviewing and ignores back on the first step', () => {
    let s = r(initPlayer(steps), { type: 'back' });
    expect(s.index).toBe(0);
    s = r(s, { type: 'next' });
    s = r(s, { type: 'quizPick', correct: true });
    s = r(s, { type: 'next', snapshot: { wrong: [] } });
    s = r(s, { type: 'back' });
    s = r(s, { type: 'next', snapshot: { wrong: [9] } });
    expect(s.saved[1]).toEqual({ wrong: [9] });
    expect(s).toMatchObject({ index: 2, reviewing: false, stepDone: false });
  });

  it('treats a real screenshot step as done on arrival', () => {
    const shot: Step[] = [{ kind: 'realShot', image: '/x.png', caption: 'c', marks: [{ x: 1, y: 1, w: 1, h: 1, label: 'l' }] }];
    expect(initPlayer(shot)).toMatchObject({ stepDone: true });
  });
});
