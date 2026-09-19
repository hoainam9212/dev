import { describe, it, expect } from 'vitest';
import { gradeMouse, mouseInitial, mouseTargets, reduceMouse } from './mouse';

describe('mouse sim', () => {
  it('creates numbered targets', () => {
    expect(mouseTargets(mouseInitial('click', 3))).toEqual(['t1', 't2', 't3']);
  });
  it('counts each target once and ignores unknown ids', () => {
    let s = mouseInitial('double', 2);
    s = reduceMouse(s, { type: 'hit', id: 't1' });
    s = reduceMouse(s, { type: 'hit', id: 't1' });
    s = reduceMouse(s, { type: 'hit', id: 'zz' });
    s = reduceMouse(s, { type: 'miss' });
    expect(s).toEqual({ game: 'double', total: 2, hitIds: ['t1'], misses: 1 });
  });
  it('grades hits and misses', () => {
    let s = mouseInitial('click', 5);
    expect(gradeMouse(s, { kind: 'mouseGame', minHits: 5 })).toMatchObject({ ok: false });
    for (const id of mouseTargets(s)) s = reduceMouse(s, { type: 'hit', id });
    expect(gradeMouse(s, { kind: 'mouseGame', minHits: 5 })).toMatchObject({ ok: true });
    for (let i = 0; i < 4; i++) s = reduceMouse(s, { type: 'miss' });
    const r = gradeMouse(s, { kind: 'mouseGame', minHits: 5, maxMisses: 3 });
    expect(r.ok).toBe(false);
    expect(r.messageVi).toMatch(/Trượt/);
  });
});
