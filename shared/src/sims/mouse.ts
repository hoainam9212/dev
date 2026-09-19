import type { CheckResult } from '../grading/core';

export type MouseGame = 'click' | 'double' | 'right' | 'drag' | 'scroll';
export interface MouseState {
  game: MouseGame;
  total: number;
  hitIds: string[];
  misses: number;
}
export type MouseAction = { type: 'hit'; id: string } | { type: 'miss' };
export interface MouseCheck {
  kind: 'mouseGame';
  minHits: number;
  maxMisses?: number;
}

export function mouseInitial(game: MouseGame, total: number): MouseState {
  return { game, total, hitIds: [], misses: 0 };
}

export function mouseTargets(s: MouseState): string[] {
  return Array.from({ length: s.total }, (_, i) => `t${i + 1}`);
}

export function reduceMouse(s: MouseState, a: MouseAction): MouseState {
  if (a.type === 'miss') return { ...s, misses: s.misses + 1 };
  if (s.hitIds.includes(a.id) || !mouseTargets(s).includes(a.id)) return s;
  return { ...s, hitIds: [...s.hitIds, a.id] };
}

export function gradeMouse(s: MouseState, c: MouseCheck): CheckResult {
  const hits = s.hitIds.length;
  if (hits < c.minHits) return { ok: false, messageVi: `Cần trúng ít nhất ${c.minHits} mục tiêu (bạn mới trúng ${hits}).` };
  if (c.maxMisses !== undefined && s.misses > c.maxMisses) {
    return { ok: false, messageVi: `Trượt hơi nhiều (${s.misses} lần) — thử chậm lại một chút nhé.` };
  }
  return { ok: true, messageVi: `Bạn đã trúng ${hits}/${c.minHits} mục tiêu.` };
}
