import { normalizeKana } from './kana';

export function levenshtein(a: string, b: string): number {
  const A = [...a];
  const B = [...b];
  if (A.length === 0) return B.length;
  if (B.length === 0) return A.length;
  let prev = new Array<number>(B.length + 1);
  let cur = new Array<number>(B.length + 1);
  for (let j = 0; j <= B.length; j++) prev[j] = j;
  for (let i = 1; i <= A.length; i++) {
    cur[0] = i;
    for (let j = 1; j <= B.length; j++) {
      const cost = A[i - 1] === B[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j]! + 1, cur[j - 1]! + 1, prev[j - 1]! + cost);
    }
    [prev, cur] = [cur, prev];
  }
  return prev[B.length]!;
}

/** 0..1, 1 = identical. */
export function similarity(a: string, b: string): number {
  const len = Math.max([...a].length, [...b].length);
  if (len === 0) return 1;
  return 1 - levenshtein(a, b) / len;
}

/** 0..100 integer. Both strings are normalized to hiragana first. */
export function pronunciationScore(expected: string, heard: string): number {
  const e = normalizeKana(expected);
  const h = normalizeKana(heard);
  if (e.length === 0) return 100;
  return Math.round(Math.max(0, similarity(e, h)) * 100);
}

export interface Point {
  x: number;
  y: number;
}

function dist(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/** Resample a polyline to n evenly spaced points. */
export function resample(points: Point[], n: number): Point[] {
  if (points.length === 0) return [];
  if (points.length === 1) return Array.from({ length: n }, () => ({ ...points[0]! }));
  let total = 0;
  for (let i = 1; i < points.length; i++) total += dist(points[i - 1]!, points[i]!);
  if (total === 0) return Array.from({ length: n }, () => ({ ...points[0]! }));
  const step = total / (n - 1);
  const out: Point[] = [{ ...points[0]! }];
  let acc = 0;
  let i = 1;
  let prev = points[0]!;
  while (out.length < n - 1 && i < points.length) {
    const cur = points[i]!;
    const d = dist(prev, cur);
    if (acc + d >= step) {
      const t = (step - acc) / d;
      const p = { x: prev.x + (cur.x - prev.x) * t, y: prev.y + (cur.y - prev.y) * t };
      out.push(p);
      prev = p;
      acc = 0;
    } else {
      acc += d;
      prev = cur;
      i += 1;
    }
  }
  while (out.length < n) out.push({ ...points[points.length - 1]! });
  return out;
}

/**
 * Compare a user-drawn stroke with a reference stroke (same coordinate space).
 * score 0..1; reversed = true when the stroke matches better backwards.
 */
export function scoreStroke(
  user: Point[],
  ref: Point[],
  opts: { size?: number } = {},
): { score: number; reversed: boolean } {
  const size = opts.size ?? 109;
  if (user.length === 0 || ref.length === 0) return { score: 0, reversed: false };
  const N = 32;
  const u = resample(user, N);
  const r = resample(ref, N);
  const rRev = [...r].reverse();
  const mean = (a: Point[], b: Point[]) => a.reduce((s, p, i) => s + dist(p, b[i]!), 0) / N;
  const forward = mean(u, r);
  const backward = mean(u, rRev);
  const reversed = backward < forward;
  // ~18% of the canvas size of mean deviation gives a zero score; linear in between
  const tol = size * 0.18;
  const score = Math.max(0, Math.min(1, 1 - forward / tol));
  return { score: reversed ? Math.min(score, 0.4) : score, reversed };
}

/** Per character of `expected`: ok when it is matched in the LCS alignment with `actual`. */
export function diffChars(expected: string, actual: string): { ch: string; ok: boolean }[] {
  const E = [...expected];
  const A = [...actual];
  const dp: number[][] = Array.from({ length: E.length + 1 }, () =>
    new Array<number>(A.length + 1).fill(0),
  );
  for (let i = E.length - 1; i >= 0; i--)
    for (let j = A.length - 1; j >= 0; j--)
      dp[i]![j] =
        E[i] === A[j] ? dp[i + 1]![j + 1]! + 1 : Math.max(dp[i + 1]![j]!, dp[i]![j + 1]!);
  const ok = new Array<boolean>(E.length).fill(false);
  let i = 0;
  let j = 0;
  while (i < E.length && j < A.length) {
    if (E[i] === A[j]) {
      ok[i] = true;
      i++;
      j++;
    } else if (dp[i + 1]![j]! >= dp[i]![j + 1]!) i++;
    else j++;
  }
  return E.map((ch, k) => ({ ch, ok: ok[k]! }));
}
