import { describe, it, expect } from 'vitest';
import { levenshtein, similarity, pronunciationScore, resample, scoreStroke, diffChars } from './scoring';

describe('levenshtein / similarity', () => {
  it('computes edit distance', () => {
    expect(levenshtein('kitten', 'sitting')).toBe(3);
    expect(levenshtein('', 'abc')).toBe(3);
    expect(levenshtein('さくら', 'さくら')).toBe(0);
  });
  it('similarity is 1 for equal, 0 for totally different', () => {
    expect(similarity('abc', 'abc')).toBe(1);
    expect(similarity('abc', 'xyz')).toBe(0);
    expect(similarity('', '')).toBe(1);
  });
});

describe('pronunciationScore', () => {
  it('normalizes scripts before comparing', () => {
    expect(pronunciationScore('おはようございます', 'オハヨウゴザイマス')).toBe(100);
    expect(pronunciationScore('おはよう', 'ohayou')).toBe(100);
  });
  it('penalizes differences proportionally', () => {
    const s = pronunciationScore('こんにちは', 'こんにちわ');
    expect(s).toBeGreaterThan(70);
    expect(s).toBeLessThan(100);
    expect(pronunciationScore('こんにちは', '')).toBe(0);
  });
});

describe('resample', () => {
  it('returns n evenly spaced points along the polyline', () => {
    const pts = resample([{ x: 0, y: 0 }, { x: 10, y: 0 }], 3);
    expect(pts).toHaveLength(3);
    expect(pts[1]!.x).toBeCloseTo(5);
    expect(pts[2]!.x).toBeCloseTo(10);
  });
  it('handles a single point', () => {
    expect(resample([{ x: 3, y: 3 }], 4)).toHaveLength(4);
  });
});

describe('scoreStroke', () => {
  const ref = [{ x: 10, y: 50 }, { x: 100, y: 50 }]; // horizontal stroke L->R
  it('scores an accurate stroke near 1', () => {
    const { score, reversed } = scoreStroke([{ x: 12, y: 52 }, { x: 60, y: 51 }, { x: 98, y: 49 }], ref);
    expect(score).toBeGreaterThan(0.85);
    expect(reversed).toBe(false);
  });
  it('flags a reversed stroke', () => {
    const { score, reversed } = scoreStroke([{ x: 100, y: 50 }, { x: 10, y: 50 }], ref);
    expect(reversed).toBe(true);
    expect(score).toBeLessThan(0.6);
  });
  it('scores a far-off stroke low', () => {
    const { score } = scoreStroke([{ x: 10, y: 10 }, { x: 20, y: 100 }], ref);
    expect(score).toBeLessThan(0.5);
  });
});

describe('diffChars', () => {
  it('marks matching characters ok', () => {
    expect(diffChars('さくら', 'さくら').every((d) => d.ok)).toBe(true);
    const d = diffChars('さくら', 'さら');
    expect(d.map((x) => x.ok)).toEqual([true, false, true]);
  });
});
