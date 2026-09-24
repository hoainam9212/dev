import { useEffect, useState } from 'react';
import type { RealShotStep } from '@office-neko/shared';
import { Mochi } from '../components/Mochi';
import { BackButton } from './BackButton';

const NUMS = '①②③④⑤⑥⑦⑧⑨';

/** Ảnh cùng các khung đỏ. Khung đặt theo % nên ảnh co giãn thế nào khung cũng nằm đúng nút. */
function Figure({ step, active }: { step: RealShotStep; active: number | null }) {
  return (
    <div className="relative w-full">
      <img src={step.image} alt={step.caption} className="block w-full select-none" draggable={false} />
      {step.marks.map((m, i) => (
        <span
          key={i}
          data-testid="realshot-mark"
          data-active={active === i}
          style={{ left: `${m.x}%`, top: `${m.y}%`, width: `${m.w}%`, height: `${m.h}%` }}
          className={`pointer-events-none absolute rounded-sm border-2 border-red-600 transition ${
            active === i ? 'bg-red-500/20 ring-4 ring-red-500/40 motion-safe:animate-pulse' : ''
          }`}
        >
          {/* Số đặt trên khung, căn giữa: các nút ribbon nằm sát nhau nên đặt ở góc thì số đè lên nhau. */}
          <span className="absolute bottom-full left-1/2 mb-0.5 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full bg-red-600 text-[0.6rem] font-black text-white">
            {i + 1}
          </span>
        </span>
      ))}
    </div>
  );
}

export function RealShot({ step, onNext, onBack }: { step: RealShotStep; onNext: () => void; onBack?: () => void }) {
  const [active, setActive] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (!zoom) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setZoom(false);
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [zoom]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Mochi mood="happy" size={64} />
        <p className="text-lg font-bold">{step.caption}</p>
      </div>

      <figure className="overflow-hidden rounded-2xl border-2 border-peach/50 bg-white p-2">
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <Figure step={step} active={active} />
          </div>
        </div>
        <figcaption className="mt-1 flex items-center justify-between gap-2 text-xs text-muted">
          <span>{step.credit ?? 'Ảnh chụp Microsoft Word'}</span>
          <button type="button" aria-label="Phóng to ảnh" onClick={() => setZoom(true)} className="rounded-lg px-2 py-1 font-bold hover:bg-cream">
            🔍 Phóng to
          </button>
        </figcaption>
      </figure>

      <ol className="flex flex-col gap-2">
        {step.marks.map((m, i) => (
          <li key={i}>
            <button
              type="button"
              aria-pressed={active === i}
              onClick={() => setActive(active === i ? null : i)}
              className={`w-full rounded-xl px-3 py-2 text-left font-semibold transition ${
                active === i ? 'bg-rose/25 ring-2 ring-rose' : 'bg-white hover:bg-cream'
              }`}
            >
              <span className="mr-2 text-red-600">{NUMS[i] ?? i + 1}</span>
              {m.label}
            </button>
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap gap-3">
        {onBack && <BackButton onClick={onBack} />}
        <button type="button" className="btn-primary" onClick={onNext}>Tiếp tục →</button>
      </div>

      {zoom ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={step.caption}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-black/80 p-4"
          onClick={() => setZoom(false)}
        >
          <div className="w-full max-w-[1400px] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="min-w-[900px] bg-white">
              <Figure step={step} active={active} />
            </div>
          </div>
          <button type="button" aria-label="Đóng ảnh" autoFocus onClick={() => setZoom(false)} className="btn-primary">
            ✕ Đóng
          </button>
        </div>
      ) : null}
    </div>
  );
}
