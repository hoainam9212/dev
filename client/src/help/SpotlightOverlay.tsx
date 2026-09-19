import { useEffect, useState } from 'react';
import type { Spotlight } from '@office-neko/shared';

const esc = (v: string) => v.replace(/["\\]/g, '\\$&');

export function spotlightSelector(s: Spotlight): string {
  if ('helpId' in s) return `[data-help-id="${esc(s.helpId)}"]`;
  if ('cell' in s) return `[data-cell="${esc(s.cell)}"]`;
  if ('path' in s) return `[data-path="${esc(s.path)}"]`;
  return `[data-key="${esc(s.key)}"]`;
}

interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

const PAD = 6;

export function SpotlightOverlay({ target, root }: { target: Spotlight | null; root: HTMLElement | null }) {
  const [box, setBox] = useState<Box | null>(null);
  useEffect(() => {
    if (!target || !root) {
      setBox(null);
      return;
    }
    const sel = spotlightSelector(target);
    const update = () => {
      const el = root.querySelector(sel);
      if (!el) {
        setBox(null);
        return;
      }
      const r = el.getBoundingClientRect();
      const next = { left: r.left - PAD, top: r.top - PAD, width: r.width + PAD * 2, height: r.height + PAD * 2 };
      setBox((prev) =>
        prev && prev.left === next.left && prev.top === next.top && prev.width === next.width && prev.height === next.height ? prev : next,
      );
    };
    update();
    const id = window.setInterval(update, 250);
    window.addEventListener('resize', update);
    return () => {
      window.clearInterval(id);
      window.removeEventListener('resize', update);
    };
  }, [target, root]);
  if (!target || !box) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed z-40" style={{ left: box.left, top: box.top, width: box.width, height: box.height }}>
      <div className="spotlight-ring absolute inset-0 rounded-xl ring-4 ring-rose" />
      <div className="spotlight-paw absolute -top-9 left-1/2 whitespace-nowrap rounded-full bg-rose px-2 py-0.5 text-sm font-bold text-white">
        🐾 Ở đây nè!
      </div>
    </div>
  );
}
