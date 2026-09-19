import { useEffect, useRef, useState } from 'react';
import { findTerm } from '../content';
import { useHelp } from './helpStore';
import { InlineText } from './RichText';

export function TermLink({ termKey, label }: { termKey: string; label: string }) {
  const entry = findTerm(termKey);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const openGlossary = useHelp((s) => s.openGlossary);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  if (!entry) return <span>{label}</span>;
  return (
    <span ref={ref} className="relative inline-block">
      <button type="button" className="term" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {label}
      </button>
      {open && (
        <span role="dialog" aria-label={entry.term} className="card absolute left-0 top-full z-40 mt-2 block w-72 p-4 text-left text-base font-normal">
          <span className="block text-lg font-extrabold">
            {entry.term} <span className="text-sm font-semibold text-muted">/{entry.say}/</span>
          </span>
          <span className="block font-bold text-rose">{entry.vi}</span>
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
