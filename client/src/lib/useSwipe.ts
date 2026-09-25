import { useRef, type PointerEvent } from 'react';

/** Minimum horizontal travel (px), how much more horizontal than vertical it must be, and the edge band (px). */
const MIN_DX = 60;
const RATIO = 1.5;
const EDGE = 24;

interface Options {
  /** Swipe left (finger moves right-to-left). */
  onNext: () => void;
  /** Swipe right. */
  onPrev: () => void;
}

/**
 * Horizontal swipe on touch screens. Spread the result on the container. Vertical scrolling keeps working
 * (touch-action: pan-y); drags that start inside `[data-no-swipe]` (the drawing canvas) or at the screen edges
 * (Android's back gesture) are ignored, and so is the mouse.
 */
export function useSwipe({ onNext, onPrev }: Options) {
  const start = useRef<{ x: number; y: number } | null>(null);

  return {
    style: { touchAction: 'pan-y' } as const,
    onPointerDown: (e: PointerEvent) => {
      start.current = null;
      if (e.pointerType === 'mouse') return;
      if ((e.target as Element).closest?.('[data-no-swipe]')) return;
      if (e.clientX < EDGE || e.clientX > window.innerWidth - EDGE) return;
      start.current = { x: e.clientX, y: e.clientY };
    },
    onPointerUp: (e: PointerEvent) => {
      const s = start.current;
      start.current = null;
      if (!s) return;
      const dx = e.clientX - s.x;
      const dy = e.clientY - s.y;
      if (Math.abs(dx) < MIN_DX || Math.abs(dx) < RATIO * Math.abs(dy)) return;
      if (dx < 0) onNext();
      else onPrev();
    },
    onPointerCancel: () => {
      start.current = null;
    },
  };
}
