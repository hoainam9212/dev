import { useEffect, useRef } from 'react';

const COLORS = ['#FFB38A', '#FF7A9A', '#8FE3CF', '#A0D8FF', '#C8B6FF', '#FFE08A'];

/** Pháo giấy ~2,5 giây. Tự bỏ qua khi người dùng bật giảm chuyển động. */
export function Confetti({ onDone }: { onDone?: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    const reduced =
      document.documentElement.dataset.motion === 'reduce' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!canvas || !ctx || reduced) {
      onDone?.();
      return;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const parts = Array.from({ length: 140 }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 3,
      vx: (Math.random() - 0.5) * 14,
      vy: -Math.random() * 14 - 4,
      r: 4 + Math.random() * 5,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      c: COLORS[Math.floor(Math.random() * COLORS.length)]!,
    }));
    let raf = 0;
    const start = performance.now();
    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of parts) {
        p.vy += 0.35;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2);
        ctx.restore();
      }
      if (t - start < 2500) raf = requestAnimationFrame(draw);
      else onDone?.();
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[60]" />;
}
