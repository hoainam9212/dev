import { useEffect, useState } from 'react';
import type { Spotlight } from '@office-neko/shared';

const esc = (v: string) => v.replace(/["\\]/g, '\\$&');

export function spotlightSelector(s: Spotlight): string {
  if ('helpId' in s) return `[data-help-id="${esc(s.helpId)}"]`;
  // Lưới Excel đánh dấu ô bằng `data-testid="cell-B5"` (không có `data-cell`), nên tìm cả hai.
  if ('cell' in s) return `[data-cell="${esc(s.cell)}"], [data-testid="cell-${esc(s.cell)}"]`;
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
    // Theo dõi phần tử đích đang vẽ; đích có thể bị thay (React vẽ lại) nên đổi theo mỗi lần tính.
    let watched: Element | null = null;
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => schedule());
    const update = () => {
      const el = root.querySelector(sel);
      if (el !== watched) {
        if (watched) ro?.unobserve(watched);
        if (el) ro?.observe(el);
        watched = el;
      }
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
    // Nhiều sự kiện trong một khung hình (cuộn, DOM đổi liên tục) chỉ tính lại một lần.
    let frame = 0;
    function schedule() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    }
    update();
    // Không hỏi vòng: tính lại khi cửa sổ đổi cỡ, khi bất kỳ vùng nào cuộn (capture bắt cả vùng cuộn bên trong như
    // lưới Excel), khi đích đổi cỡ, và khi DOM của sim đổi (đích xuất hiện, dời chỗ).
    const mo = new MutationObserver(schedule);
    mo.observe(root, { childList: true, subtree: true, attributes: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('scroll', schedule, true);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      mo.disconnect();
      ro?.disconnect();
      window.removeEventListener('resize', schedule);
      window.removeEventListener('scroll', schedule, true);
    };
  }, [target, root]);
  if (!target || !box) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed z-40" style={{ left: box.left, top: box.top, width: box.width, height: box.height }}>
      {/* Vòng đặc là border: box-shadow để dành cho quầng nhấp nháy `spotlight-pulse` (dùng ring-* thì bị đè mất). */}
      <div className="spotlight-ring absolute inset-0 rounded-xl border-4 border-rose" />
      <div className="spotlight-paw absolute -top-9 left-1/2 whitespace-nowrap rounded-full bg-rose px-2 py-0.5 text-sm font-bold text-white">
        🐾 Ở đây nè!
      </div>
    </div>
  );
}
