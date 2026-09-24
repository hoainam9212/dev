/** Stroke-order number labels in KanjiVG 109×109 space. A label sits at its text baseline-left corner. */
export type LabelPos = [number, number];

// Box of a label rendered at font-size 7: ~4 units per digit wide, ~5.5 tall above the baseline.
const DIGIT_W = 4;
const H = 5.5;
const MAX = 109;

const box = ([x, y]: LabelPos, n: number) => ({ x, y: y - H, w: String(n).length * DIGIT_W, h: H });

export function labelsOverlap(a: LabelPos, na: number, b: LabelPos, nb: number): boolean {
  const p = box(a, na);
  const q = box(b, nb);
  return p.x < q.x + q.w && q.x < p.x + p.w && p.y < q.y + q.h && q.y < p.y + p.h;
}

const clamp = ([x, y]: LabelPos, n: number): LabelPos => [
  Math.min(Math.max(x, 0), MAX - String(n).length * DIGIT_W),
  Math.min(Math.max(y, H), MAX),
];
const round = (v: number) => Math.round(v * 100) / 100;

/**
 * Keeps each label (numbered 1..n in order) where it is unless it covers an earlier one; then moves it to the
 * nearest free spot on growing rings around its preferred position.
 */
export function placeStrokeNumbers(preferred: LabelPos[]): LabelPos[] {
  const placed: LabelPos[] = [];
  preferred.forEach((pos, i) => {
    const n = i + 1;
    const free = (c: LabelPos) => placed.every((p, j) => !labelsOverlap(c, n, p, j + 1));
    const start = clamp(pos, n);
    let best = start;
    if (!free(start)) {
      search: for (let r = 2; r <= 30; r += 1.5)
        for (let k = 0; k < 16; k++) {
          const a = (k / 16) * 2 * Math.PI;
          const c = clamp([start[0] + r * Math.cos(a), start[1] + r * Math.sin(a)], n);
          if (free(c)) {
            best = [round(c[0]), round(c[1])];
            break search;
          }
        }
    }
    placed.push(best);
  });
  return placed;
}

/** First point of an SVG path (`M`/`m` moveto), or null. */
export function strokeStart(d: string): LabelPos | null {
  const m = d.match(/^\s*M\s*(-?[\d.]+)[\s,]*(-?[\d.]+)/i);
  return m ? [Number(m[1]), Number(m[2])] : null;
}
