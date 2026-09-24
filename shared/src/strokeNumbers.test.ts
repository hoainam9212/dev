import { it, expect } from 'vitest';
import { labelsOverlap, placeStrokeNumbers, strokeStart } from './strokeNumbers';

it('keeps labels that already have room where they are', () => {
  const pts: [number, number][] = [
    [10, 20],
    [60, 20],
    [30, 80],
  ];
  expect(placeStrokeNumbers(pts)).toEqual(pts);
});

it('moves a label off one it would cover, staying inside the 109×109 box', () => {
  const out = placeStrokeNumbers([
    [40, 40],
    [41, 41],
    [40, 42],
  ]);
  expect(out[0]).toEqual([40, 40]);
  for (let i = 0; i < out.length; i++)
    for (let j = i + 1; j < out.length; j++) expect(labelsOverlap(out[i]!, i + 1, out[j]!, j + 1)).toBe(false);
  for (const [x, y] of out) {
    expect(x).toBeGreaterThanOrEqual(0);
    expect(x).toBeLessThanOrEqual(105);
    expect(y).toBeGreaterThanOrEqual(6);
    expect(y).toBeLessThanOrEqual(109);
  }
});

it('treats two-digit labels as wider', () => {
  expect(labelsOverlap([10, 10], 1, [15, 10], 2)).toBe(false);
  expect(labelsOverlap([10, 10], 10, [15, 10], 11)).toBe(true);
});

it('finds the start of a path whether the moveto is upper or lower case', () => {
  expect(strokeStart('M52.5,15.25c1,2')).toEqual([52.5, 15.25]);
  expect(strokeStart('m13.5,67.39c1.62,0.9')).toEqual([13.5, 67.39]);
  expect(strokeStart('M 10 -2 L5,5')).toEqual([10, -2]);
  expect(strokeStart('')).toBeNull();
});
