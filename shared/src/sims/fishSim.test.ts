import { describe, it, expect } from 'vitest';
import { fishInitial, reduceFish } from '../games/fish';
import { fishSolution, gradeFish } from './fishSim';

const WORDS = ['meo', 'ca', 'nha', 'hoa', 'bien'];
const start = (seed = 7) => fishInitial(WORDS, seed);

describe('fish sim grading', () => {
  it('asks for more fish until the target is reached', () => {
    const s = start();
    const r = gradeFish(s, { kind: 'fishGame', minCaught: 3 });
    expect(r.ok).toBe(false);
    expect(r.messageVi).toMatch(/0\/3/);
  });

  it('passes once enough fish are caught', () => {
    const s = { ...start(), caught: 3 };
    expect(gradeFish(s, { kind: 'fishGame', minCaught: 3 })).toMatchObject({ ok: true });
  });

  it('says what went wrong when the game is over', () => {
    const s = { ...start(), caught: 1, lives: 0, over: true };
    const r = gradeFish(s, { kind: 'fishGame', minCaught: 5 });
    expect(r.ok).toBe(false);
    expect(r.messageVi).toMatch(/Hết mạng/);
  });
});

describe('fish solution for lesson authoring', () => {
  it('plays a round that catches the required fish without losing', () => {
    const initial = start();
    const actions = fishSolution(initial, 8);
    const final = actions.reduce(reduceFish, initial);
    expect(final.caught).toBeGreaterThanOrEqual(8);
    expect(final.over).toBe(false);
    expect(gradeFish(final, { kind: 'fishGame', minCaught: 8 }).ok).toBe(true);
  });

  it('is deterministic for a given seed', () => {
    expect(fishSolution(start(11), 4)).toEqual(fishSolution(start(11), 4));
  });

  it('only uses keys a learner could actually press', () => {
    for (const a of fishSolution(start(), 5)) {
      if (a.type !== 'key') continue;
      expect(a.key === 'Escape' || /^[a-z0-9]$/.test(a.key), `phím lạ: ${a.key}`).toBe(true);
    }
  });
});
