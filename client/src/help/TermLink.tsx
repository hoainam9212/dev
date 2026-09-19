import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { findTerm } from '../content';
import { useHelp } from './helpStore';
import { InlineText } from './RichText';
import { placePopover, type PopoverPosition } from './placement';

const POPUP_WIDTH = 288;

export function TermLink({ termKey, label }: { termKey: string; label: string }) {
  const entry = findTerm(termKey);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<PopoverPosition | null>(null);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLSpanElement>(null);
  const openGlossary = useHelp((s) => s.openGlossary);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: Event) => {
      const target = e.target as Node;
      if (anchorRef.current?.contains(target)) return;
      if (popupRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !anchorRef.current) return;
    const anchor = anchorRef.current.getBoundingClientRect();
    const popupHeight = popupRef.current?.getBoundingClientRect().height ?? 0;
    setPos(placePopover(anchor, { width: POPUP_WIDTH, height: popupHeight }, { width: window.innerWidth, height: window.innerHeight }));
  }, [open]);

  if (!entry) return <span>{label}</span>;
  return (
    <span className="relative inline-block">
      <button ref={anchorRef} type="button" className="term" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {label}
      </button>
      {open && (
        <span
          ref={popupRef}
          role="dialog"
          aria-label={entry.term}
          className="card fixed z-40 block p-4 text-left text-base font-normal"
          style={{ width: POPUP_WIDTH, left: pos?.left ?? 0, top: pos?.top ?? 0, visibility: pos ? 'visible' : 'hidden' }}
        >
          <span className="block text-lg font-extrabold">
            {entry.term} <span className="text-sm font-semibold text-muted">/{entry.say}/</span>
          </span>
          <span className="block font-bold text-rose-ink">{entry.vi}</span>
          <span className="mt-1 block text-sm"><InlineText text={entry.explain} /></span>
          <span className="mt-3 flex gap-2">
            <button type="button" className="btn-soft !px-3 !py-1 text-sm" onClick={() => { setOpen(false); openGlossary(entry.id); }}>
              Xem thêm
            </button>
            <button type="button" className="btn !px-3 !py-1 text-sm" onClick={() => setOpen(false)}>
              Đóng
            </button>
          </span>
        </span>
      )}
    </span>
  );
}
