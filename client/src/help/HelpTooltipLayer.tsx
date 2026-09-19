import { useEffect, useState } from 'react';
import type { HelpIdEntry } from '@office-neko/shared';
import { HELP_IDS } from '../content';

interface Tip {
  entry: HelpIdEntry;
  x: number;
  y: number;
}

export function HelpTooltipLayer() {
  const [tip, setTip] = useState<Tip | null>(null);
  useEffect(() => {
    let timer: number | undefined;
    let current: Element | null = null;
    const show = (el: Element) => {
      const id = el.getAttribute('data-help-id');
      const entry = id ? HELP_IDS[id] : undefined;
      if (!entry) return;
      const r = el.getBoundingClientRect();
      setTip({ entry, x: r.left + r.width / 2, y: r.bottom + 8 });
    };
    const over = (e: Event) => {
      const target = e.target instanceof Element ? e.target : null;
      const el = target?.closest('[data-help-id]') ?? null;
      if (el === current) return;
      current = el;
      window.clearTimeout(timer);
      setTip(null);
      if (el) timer = window.setTimeout(() => show(el), 400);
    };
    const hide = () => {
      window.clearTimeout(timer);
      current = null;
      setTip(null);
    };
    document.addEventListener('pointerover', over);
    document.addEventListener('focusin', over);
    document.addEventListener('pointerdown', hide);
    document.addEventListener('scroll', hide, true);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('pointerover', over);
      document.removeEventListener('focusin', over);
      document.removeEventListener('pointerdown', hide);
      document.removeEventListener('scroll', hide, true);
    };
  }, []);
  if (!tip) return null;
  return (
    <div
      role="tooltip"
      className="pointer-events-none fixed z-[70] max-w-xs -translate-x-1/2 rounded-2xl bg-text px-3 py-2 text-sm text-white shadow-lg"
      style={{ left: tip.x, top: tip.y }}
    >
      <div className="font-extrabold">{tip.entry.label}</div>
      <div>{tip.entry.vi}</div>
    </div>
  );
}
