import { Fragment, useMemo } from 'react';
import { parseInline, parseRich, type Inline } from '@office-neko/shared';
import { Kbd } from '../components/Kbd';
import { TermLink } from './TermLink';

function Inlines({ items }: { items: Inline[] }) {
  return (
    <>
      {items.map((n, i) => {
        switch (n.t) {
          case 'text':
            return <Fragment key={i}>{n.v}</Fragment>;
          case 'b':
            return <strong key={i}>{n.v}</strong>;
          case 'kbd':
            return <Kbd key={i} combo={n.combo} />;
          case 'term':
            return <TermLink key={i} termKey={n.key} label={n.label} />;
        }
      })}
    </>
  );
}

export function RichText({ text, className = '' }: { text: string; className?: string }) {
  const blocks = useMemo(() => parseRich(text), [text]);
  return (
    <div className={`space-y-3 leading-relaxed ${className}`}>
      {blocks.map((b, i) =>
        b.type === 'p' ? (
          <p key={i}><Inlines items={b.inlines} /></p>
        ) : (
          <ul key={i} className="list-disc space-y-1 pl-6">
            {b.items.map((it, j) => <li key={j}><Inlines items={it} /></li>)}
          </ul>
        ),
      )}
    </div>
  );
}

/** Một dòng nội dung (không tách đoạn), dùng trong popup và danh sách. */
export function InlineText({ text }: { text: string }) {
  const items = useMemo(() => parseInline(text), [text]);
  return <Inlines items={items} />;
}
