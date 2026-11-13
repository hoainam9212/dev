import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useT } from '../i18n';

export const MIN_SCALE = 1;
export const MAX_SCALE = 4;
/** Scale a double-tap jumps to from 1x. */
export const TAP_SCALE = 2.5;
/** Factor of one "+" / "−" button press. */
export const STEP = 1.5;

const TAP_MOVE = 10; // px a finger may drift and still count as a tap
const DOUBLE_TAP_MS = 300;
const DOUBLE_TAP_DIST = 30;

/** Translate (px, in frame coordinates) and scale of the content layer; transform-origin is the top-left corner. */
export type View = { x: number; y: number; scale: number };
/** Frame size and the content's untransformed (1x) size. */
export type Box = { frameW: number; frameH: number; contentW: number; contentH: number };

export function clampScale(s: number): number {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));
}

function clampAxis(t: number, frame: number, content: number): number {
  const min = Math.min(0, frame - content);
  return Math.min(0, Math.max(min, t));
}

/** Clamps scale to 1x..4x and the pan so the scaled content always covers the frame (no empty gap). */
export function clampView(v: View, box: Box): View {
  const scale = clampScale(v.scale);
  return {
    x: clampAxis(v.x, box.frameW, box.contentW * scale),
    y: clampAxis(v.y, box.frameH, box.contentH * scale),
    scale,
  };
}

/** Zooms to `scale` keeping the content point under frame point (px, py) where it is, then clamps. */
export function zoomAt(v: View, scale: number, px: number, py: number, box: Box): View {
  const s = clampScale(scale);
  const cx = (px - v.x) / v.scale;
  const cy = (py - v.y) / v.scale;
  return clampView({ x: px - cx * s, y: py - cy * s, scale: s }, box);
}

type Props = { src?: string; alt?: string; className?: string; children?: ReactNode };

type Gesture =
  | { kind: 'pan'; id: number; startX: number; startY: number; view: View; moved: boolean }
  | { kind: 'pinch'; dist: number; midX: number; midY: number; view: View };

const raf: (cb: () => void) => number =
  typeof requestAnimationFrame === 'function' ? (cb) => requestAnimationFrame(cb) : (cb) => setTimeout(cb, 16) as unknown as number;

/**
 * Image (or any content) that fits the frame width at 1x and zooms up to 4x: pinch, double-tap, ctrl+wheel and
 * corner buttons; one finger or the mouse pans only while zoomed, so at 1x the page scrolls as usual.
 */
export function ZoomImage({ src, alt = '', className = '', children }: Props) {
  const t = useT();
  const frameRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const view = useRef<View>({ x: 0, y: 0, scale: 1 });
  const pending = useRef(false);
  const [scale, setScale] = useState(1);

  const box = useCallback((): Box => {
    const f = frameRef.current;
    const l = layerRef.current;
    return { frameW: f?.clientWidth ?? 0, frameH: f?.clientHeight ?? 0, contentW: l?.offsetWidth ?? 0, contentH: l?.offsetHeight ?? 0 };
  }, []);

  const apply = useCallback(() => {
    pending.current = false;
    const v = view.current;
    const l = layerRef.current;
    const f = frameRef.current;
    if (l) l.style.transform = `translate(${v.x}px, ${v.y}px) scale(${v.scale})`;
    if (f) f.style.touchAction = v.scale > 1 ? 'none' : 'pan-y';
    setScale(v.scale);
  }, []);

  const set = useCallback(
    (v: View) => {
      view.current = v.scale <= MIN_SCALE ? { x: 0, y: 0, scale: MIN_SCALE } : v;
      if (!pending.current) {
        pending.current = true;
        raf(apply);
      }
    },
    [apply],
  );

  const zoomTo = useCallback((s: number, px: number, py: number) => set(zoomAt(view.current, s, px, py, box())), [box, set]);

  useEffect(() => {
    const f = frameRef.current;
    if (!f) return;
    const points = new Map<number, { x: number; y: number }>();
    let gesture: Gesture | null = null;
    let lastTap: { time: number; x: number; y: number } | null = null;

    const local = (e: { clientX: number; clientY: number }) => {
      const r = f.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const two = () => {
      const [a, b] = [...points.values()];
      return a && b ? ([a, b] as const) : null;
    };
    const pinchOf = (): Gesture | null => {
      const ab = two();
      if (!ab) return null;
      const [a, b] = ab;
      return { kind: 'pinch', dist: Math.hypot(b.x - a.x, b.y - a.y) || 1, midX: (a.x + b.x) / 2, midY: (a.y + b.y) / 2, view: view.current };
    };

    const down = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      // corner buttons keep their own clicks: no pan, no pointer capture, no tap
      if ((e.target as Element | null)?.closest?.('button')) return;
      points.set(e.pointerId, local(e));
      if (points.size === 2) {
        gesture = pinchOf();
      } else if (points.size === 1) {
        const p = local(e);
        gesture = { kind: 'pan', id: e.pointerId, startX: p.x, startY: p.y, view: view.current, moved: false };
        if (view.current.scale > 1) f.setPointerCapture?.(e.pointerId);
      } else {
        gesture = null;
      }
    };

    const move = (e: PointerEvent) => {
      if (!points.has(e.pointerId)) return;
      const p = local(e);
      points.set(e.pointerId, p);
      const g = gesture;
      if (!g) return;
      const ab = two();
      if (g.kind === 'pinch' && points.size === 2 && ab) {
        e.preventDefault();
        const [a, b] = ab;
        const dist = Math.hypot(b.x - a.x, b.y - a.y);
        const midX = (a.x + b.x) / 2;
        const midY = (a.y + b.y) / 2;
        const s = clampScale((g.view.scale * dist) / g.dist);
        // content point under the starting centre follows the current centre
        const cx = (g.midX - g.view.x) / g.view.scale;
        const cy = (g.midY - g.view.y) / g.view.scale;
        set(clampView({ x: midX - cx * s, y: midY - cy * s, scale: s }, box()));
      } else if (g.kind === 'pan' && g.id === e.pointerId) {
        const dx = p.x - g.startX;
        const dy = p.y - g.startY;
        if (Math.hypot(dx, dy) > TAP_MOVE) g.moved = true;
        if (g.view.scale > 1) {
          e.preventDefault();
          set(clampView({ x: g.view.x + dx, y: g.view.y + dy, scale: g.view.scale }, box()));
        }
      }
    };

    const up = (e: PointerEvent) => {
      if (!points.has(e.pointerId)) return;
      const g = gesture;
      points.delete(e.pointerId);
      if (g?.kind === 'pan' && g.id === e.pointerId && !g.moved && e.type === 'pointerup') {
        const p = local(e);
        const now = Date.now();
        if (lastTap && now - lastTap.time < DOUBLE_TAP_MS && Math.hypot(p.x - lastTap.x, p.y - lastTap.y) < DOUBLE_TAP_DIST) {
          lastTap = null;
          if (view.current.scale > 1) set({ x: 0, y: 0, scale: 1 });
          else zoomTo(TAP_SCALE, p.x, p.y);
        } else {
          lastTap = { time: now, x: p.x, y: p.y };
        }
      } else if (g?.kind === 'pinch') {
        lastTap = null;
      }
      // one finger left after a pinch: carry on panning from where it is
      const rest = points.size === 1 ? [...points.entries()][0] : undefined;
      if (rest) {
        const [id, p] = rest;
        gesture = { kind: 'pan', id, startX: p.x, startY: p.y, view: view.current, moved: true };
      } else if (points.size === 0) {
        gesture = null;
      }
    };

    const wheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      const p = local(e);
      zoomTo(view.current.scale * Math.exp(-e.deltaY * 0.01), p.x, p.y);
    };

    f.addEventListener('pointerdown', down);
    f.addEventListener('pointermove', move);
    f.addEventListener('pointerup', up);
    f.addEventListener('pointercancel', up);
    f.addEventListener('wheel', wheel, { passive: false });

    // re-clamp when the frame or content changes size (rotation, image load)
    const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(() => set(clampView(view.current, box()))) : null;
    ro?.observe(f);
    if (layerRef.current) ro?.observe(layerRef.current);

    return () => {
      f.removeEventListener('pointerdown', down);
      f.removeEventListener('pointermove', move);
      f.removeEventListener('pointerup', up);
      f.removeEventListener('pointercancel', up);
      f.removeEventListener('wheel', wheel);
      ro?.disconnect();
    };
  }, [box, set, zoomTo]);

  const centre = (factor: number) => {
    const b = box();
    zoomTo(view.current.scale * factor, b.frameW / 2, b.frameH / 2);
  };

  return (
    <div
      ref={frameRef}
      data-testid="zoom-frame"
      className={`relative overflow-hidden select-none ${className}`}
      style={{ touchAction: 'pan-y' }}
    >
      <div
        ref={layerRef}
        data-testid="zoom-layer"
        className="origin-top-left will-change-transform"
        style={{ transform: 'translate(0px, 0px) scale(1)' }}
      >
        {src && <img src={src} alt={alt} className="block w-full" draggable={false} />}
        {children}
      </div>
      <div className="absolute right-1 bottom-1 flex gap-1">
        <button
          type="button"
          className="btn-soft h-8 min-w-8 px-2! py-0! text-sm"
          aria-label={t.common.zoomOut}
          disabled={scale <= MIN_SCALE}
          onClick={() => centre(1 / STEP)}
        >
          −
        </button>
        <button type="button" className="btn-soft h-8 min-w-8 px-2! py-0! text-xs" aria-label={t.common.zoomReset} onClick={() => set({ x: 0, y: 0, scale: 1 })}>
          1:1
        </button>
        <button
          type="button"
          className="btn-soft h-8 min-w-8 px-2! py-0! text-sm"
          aria-label={t.common.zoomIn}
          disabled={scale >= MAX_SCALE}
          onClick={() => centre(STEP)}
        >
          +
        </button>
      </div>
    </div>
  );
}
