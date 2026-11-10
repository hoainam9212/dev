import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { HelpIdEntry } from '@office-neko/shared';
import { HELP_IDS } from '../content';
import { placePopover, type PopoverPosition } from './placement';

interface Tip {
  entry: HelpIdEntry;
  anchor: DOMRect;
}

export function HelpTooltipLayer() {
  const [tip, setTip] = useState<Tip | null>(null);
  const [pos, setPos] = useState<PopoverPosition | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: number | undefined;
    let current: Element | null = null;
    const show = (el: Element) => {
      const id = el.getAttribute('data-help-id');
      const entry = id ? HELP_IDS[id] : undefined;
      if (!entry) return;
      setTip({ entry, anchor: el.getBoundingClientRect() });
    };
    // Chạm (điện thoại, bút) không có lúc "rời chuột", nên chú thích mở ra sẽ kẹt lại: chỉ mở khi rê chuột thật,
    // hoặc khi focus đến bằng bàn phím. `touched` nhớ cú chạm gần nhất để bỏ qua focus do chính cú chạm đó.
    let touched = false;
    const isTouch = (e: Event) => {
      const t = (e as PointerEvent).pointerType;
      return t === 'touch' || t === 'pen';
    };
    const down = (e: Event) => {
      touched = isTouch(e);
      hide();
    };
    const key = () => {
      touched = false;
    };
    const over = (e: Event) => {
      if (e.type === 'pointerover' ? isTouch(e) : touched) return;
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
    document.addEventListener('pointerdown', down);
    document.addEventListener('keydown', key, true);
    document.addEventListener('scroll', hide, true);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('pointerover', over);
      document.removeEventListener('focusin', over);
      document.removeEventListener('pointerdown', down);
      document.removeEventListener('keydown', key, true);
      document.removeEventListener('scroll', hide, true);
    };
  }, []);

  useLayoutEffect(() => {
    if (!tip) {
      setPos(null);
      return;
    }
    const size = tooltipRef.current?.getBoundingClientRect() ?? { width: 0, height: 0 };
    setPos(placePopover(tip.anchor, size, { width: window.innerWidth, height: window.innerHeight }, { align: 'center' }));
  }, [tip]);

  if (!tip) return null;
  return (
    <div
      ref={tooltipRef}
      role="tooltip"
      className="pointer-events-none fixed z-[70] max-w-xs rounded-2xl bg-text px-3 py-2 text-sm text-white shadow-lg"
      style={{ left: pos?.left ?? 0, top: pos?.top ?? 0, visibility: pos ? 'visible' : 'hidden' }}
    >
      <div className="font-extrabold">{tip.entry.label}</div>
      <div>{tip.entry.vi}</div>
    </div>
  );
}
