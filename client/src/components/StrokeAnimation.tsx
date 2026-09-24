import { pathToPoints, strokeStart } from '@nihongo/shared';
import './strokes.css';

/** Pen speed in KanjiVG units per second, and the pause between strokes (s). */
const SPEED = 100;
export const STROKE_GAP = 0.2;

const lengthOf = (d: string) =>
  pathToPoints(d).reduce((sum, p, i, pts) => (i ? sum + Math.hypot(p.x - pts[i - 1]!.x, p.y - pts[i - 1]!.y) : 0), 0);

/** When each stroke starts and how long it draws, at an even pen speed; `total` includes the trailing gap. */
export function strokeTimings(paths: string[]): { delays: number[]; durations: number[]; total: number } {
  const durations = paths.map((d) => Math.min(1.2, Math.max(0.3, lengthOf(d) / SPEED)));
  const delays: number[] = [];
  let t = 0;
  for (const dur of durations) {
    delays.push(Math.round(t * 1000) / 1000);
    t += dur + STROKE_GAP;
  }
  return { delays, durations, total: t };
}

interface Props {
  paths: string[];
  /** Order-number positions per stroke (from the content build); without them numbers sit at each stroke's start. */
  numbers?: [number, number][];
  size?: number;
  playKey?: number;
  showNumbers?: boolean;
  /** Seconds to wait before the first stroke (lets several cells play one after another). */
  startDelay?: number;
}

/** Animated stroke order (KanjiVG 109×109 space). Change `playKey` to replay. */
export function StrokeAnimation({ paths, numbers, size = 160, playKey = 0, showNumbers = true, startDelay = 0 }: Props) {
  const { delays, durations } = strokeTimings(paths);
  const pos = (d: string, i: number): [number, number] | null => {
    const n = numbers?.length === paths.length ? numbers[i] : undefined;
    if (n) return n;
    const s = strokeStart(d);
    return s ? [s[0] - 5, s[1] - 2] : null;
  };
  return (
    <svg
      key={playKey}
      viewBox="0 0 109 109"
      width={size}
      height={size}
      className="rounded-2xl bg-cream ring-2 ring-sakura/40 dark:bg-bg"
      role="img"
      aria-label="Thứ tự nét"
    >
      <g stroke="#FFB7C5" strokeWidth="0.8" strokeDasharray="3 3">
        <line x1="54.5" y1="0" x2="54.5" y2="109" />
        <line x1="0" y1="54.5" x2="109" y2="54.5" />
      </g>
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          className="stroke-anim"
          style={{ animationDelay: `${startDelay + delays[i]!}s`, animationDuration: `${durations[i]}s` }}
        />
      ))}
      {showNumbers &&
        paths.map((d, i) => {
          const p = pos(d, i);
          return p ? (
            <text key={i} x={p[0]} y={p[1]} fontSize="7" fill="#FF6F91" fontWeight="700">
              {i + 1}
            </text>
          ) : null;
        })}
    </svg>
  );
}
