import { useRef, useState, type PointerEvent } from 'react';
import type { Point } from '@nihongo/shared';
import './strokes.css';

interface Props {
  size?: number;
  guide?: string[];
  hint?: string;
  strokes?: Point[][];
  shaking?: boolean;
  /** Inactive canvases ignore input (used for the not-yet-current cells of a multi-character kana). */
  active?: boolean;
  onStroke: (pts: Point[]) => void;
}

const toD = (pts: Point[]) => pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

/** Pointer drawing surface in KanjiVG 109×109 coordinates. */
export function DrawCanvas({ size = 218, guide = [], hint, strokes = [], shaking = false, active = true, onStroke }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  // The in-progress stroke lives in a ref (pointermove events are batched by React);
  // `cur` state only mirrors it for rendering.
  const drawing = useRef<Point[] | null>(null);
  const [cur, setCur] = useState<Point[]>([]);

  const toLocal = (e: PointerEvent): Point => {
    const r = ref.current!.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * 109, y: ((e.clientY - r.top) / r.height) * 109 };
  };
  const finish = (e: PointerEvent) => {
    const pts = drawing.current;
    drawing.current = null;
    if (pts) {
      pts.push(toLocal(e));
      if (pts.length > 1) onStroke(pts);
    }
    setCur([]);
  };

  return (
    <svg
      ref={ref}
      data-testid="draw-canvas"
      // strokes are often horizontal: never let a surrounding swipe handler read them as "next"
      data-no-swipe
      viewBox="0 0 109 109"
      width={size}
      height={size}
      className={`touch-none select-none rounded-2xl bg-cream dark:bg-bg ${
        active ? 'ring-2 ring-sakura/60' : 'ring-1 ring-sakura/30 opacity-70'
      } ${shaking ? 'shake' : ''}`}
      onPointerDown={(e) => {
        if (!active) return;
        (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
        drawing.current = [toLocal(e)];
        setCur(drawing.current);
      }}
      onPointerMove={(e) => {
        if (!drawing.current) return;
        drawing.current.push(toLocal(e));
        setCur([...drawing.current]);
      }}
      onPointerUp={finish}
      onPointerCancel={finish}
    >
      <g stroke="#FFB7C5" strokeWidth="0.8" strokeDasharray="3 3">
        <line x1="54.5" y1="0" x2="54.5" y2="109" />
        <line x1="0" y1="54.5" x2="109" y2="54.5" />
      </g>
      {guide.map((d, i) => (
        <path key={i} d={d} className="stroke-guide" />
      ))}
      {hint && <path d={hint} className="stroke-hint" data-testid="stroke-hint" />}
      {strokes.map((s, i) => (
        <path
          key={i}
          d={toD(s)}
          fill="none"
          stroke="var(--app-text)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {cur.length > 1 && (
        <path d={toD(cur)} fill="none" stroke="#FF6F91" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}
