import { describe, it, expect } from 'vitest';
import { pathToPoints } from './svgpath';

describe('pathToPoints', () => {
  it('handles absolute M and L', () => {
    expect(pathToPoints('M10,20 L30,40')).toEqual([{ x: 10, y: 20 }, { x: 30, y: 40 }]);
  });
  it('handles relative l and implicit repeated commands', () => {
    expect(pathToPoints('M0 0 l10 0 10 0')).toEqual([{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 20, y: 0 }]);
  });
  it('samples cubic curves and ends at the curve end', () => {
    const pts = pathToPoints('M0,0 C0,10 10,10 10,0', 4);
    expect(pts[0]).toEqual({ x: 0, y: 0 });
    expect(pts[pts.length - 1]!.x).toBeCloseTo(10);
    expect(pts[pts.length - 1]!.y).toBeCloseTo(0);
    expect(pts.length).toBe(5);
  });
  it('parses a real KanjiVG stroke with c chains', () => {
    const d = 'M11,54.25c3.19,0.62,6.25,0.75,9.73,0.5c20.64-1.5,50.39-5.12,68.58-5.24c3.6-0.02,5.77,0.24,7.57,0.49';
    const pts = pathToPoints(d);
    expect(pts[0]).toEqual({ x: 11, y: 54.25 });
    const last = pts[pts.length - 1]!;
    expect(last.x).toBeCloseTo(11 + 9.73 + 68.58 + 7.57, 1);
  });
  it('handles s (smooth) after c and negative numbers without separators', () => {
    const pts = pathToPoints('M10,10c5,0,10,5,10,10s5,10,10,10', 2);
    expect(pts[pts.length - 1]).toEqual({ x: 30, y: 30 });
    expect(pathToPoints('M1-2L-3-4')).toEqual([{ x: 1, y: -2 }, { x: -3, y: -4 }]);
  });
});
