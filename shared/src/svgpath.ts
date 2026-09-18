import type { Point } from './scoring';

const ARGS: Record<string, number> = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, Z: 0 };

function cubic(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const mt = 1 - t;
  return {
    x: mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x,
    y: mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y,
  };
}

function quad(p0: Point, p1: Point, p2: Point, t: number): Point {
  const mt = 1 - t;
  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
  };
}

/**
 * Sample an SVG path `d` string into a polyline.
 * Supports M L H V C S Q T Z (absolute and relative). Curves yield `samplesPerCurve` points each.
 */
export function pathToPoints(d: string, samplesPerCurve = 12): Point[] {
  const tokens = d.match(/[MmLlHhVvCcSsQqTtZz]|-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/g) ?? [];
  const pts: Point[] = [];
  let cur: Point = { x: 0, y: 0 };
  let start: Point = { x: 0, y: 0 };
  let prevCtrl: Point | null = null;
  let cmd = '';
  let i = 0;

  while (i < tokens.length) {
    const tok = tokens[i]!;
    if (/^[A-Za-z]$/.test(tok)) {
      cmd = tok;
      i++;
      if (cmd.toUpperCase() === 'Z') {
        cur = start;
        pts.push(cur);
        prevCtrl = null;
        continue;
      }
    } else {
      // implicit repeat: after M comes L (same relativity)
      if (cmd === 'M') cmd = 'L';
      else if (cmd === 'm') cmd = 'l';
      if (!cmd) {
        i++;
        continue;
      }
    }

    const upper = cmd.toUpperCase();
    const need = ARGS[upper] ?? 0;
    if (i + need > tokens.length) break;
    const args = tokens.slice(i, i + need).map(Number);
    i += need;
    const rel = cmd !== upper;
    const dx = rel ? cur.x : 0;
    const dy = rel ? cur.y : 0;

    switch (upper) {
      case 'M':
        cur = { x: args[0]! + dx, y: args[1]! + dy };
        start = cur;
        pts.push(cur);
        prevCtrl = null;
        break;
      case 'L':
        cur = { x: args[0]! + dx, y: args[1]! + dy };
        pts.push(cur);
        prevCtrl = null;
        break;
      case 'H':
        cur = { x: args[0]! + dx, y: cur.y };
        pts.push(cur);
        prevCtrl = null;
        break;
      case 'V':
        cur = { x: cur.x, y: args[0]! + dy };
        pts.push(cur);
        prevCtrl = null;
        break;
      case 'C':
      case 'S': {
        let c1: Point;
        let rest: number[];
        if (upper === 'C') {
          c1 = { x: args[0]! + dx, y: args[1]! + dy };
          rest = args.slice(2);
        } else {
          c1 = prevCtrl ? { x: 2 * cur.x - prevCtrl.x, y: 2 * cur.y - prevCtrl.y } : cur;
          rest = args;
        }
        const c2 = { x: rest[0]! + dx, y: rest[1]! + dy };
        const end = { x: rest[2]! + dx, y: rest[3]! + dy };
        for (let k = 1; k <= samplesPerCurve; k++) pts.push(cubic(cur, c1, c2, end, k / samplesPerCurve));
        prevCtrl = c2;
        cur = end;
        break;
      }
      case 'Q':
      case 'T': {
        let c1: Point;
        let rest: number[];
        if (upper === 'Q') {
          c1 = { x: args[0]! + dx, y: args[1]! + dy };
          rest = args.slice(2);
        } else {
          c1 = prevCtrl ? { x: 2 * cur.x - prevCtrl.x, y: 2 * cur.y - prevCtrl.y } : cur;
          rest = args;
        }
        const end = { x: rest[0]! + dx, y: rest[1]! + dy };
        for (let k = 1; k <= samplesPerCurve; k++) pts.push(quad(cur, c1, end, k / samplesPerCurve));
        prevCtrl = c1;
        cur = end;
        break;
      }
      default:
        break;
    }
  }
  return pts;
}
