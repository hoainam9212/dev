import { Fragment } from 'react';
import { useT } from '../../i18n';

const MARK = /【([1-4])】/g;

/** A position 【n】 printed on a 総合聴読解 document, drawn as a round numbered badge. */
export function PositionMark({ n }: { n: string }) {
  const t = useT();
  return (
    <span
      role="img"
      aria-label={t.bjt.positionMark(n)}
      data-testid="bjt-mark"
      className="mx-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-rose px-1 align-middle text-xs font-black leading-none text-white tabular-nums ring-2 ring-white/70 dark:ring-black/30"
    >
      {n}
    </span>
  );
}

/** Text with every 【1】–【4】 replaced by a badge; anything else is left as it is. */
export function Marked({ text }: { text: string }) {
  const parts = text.split(MARK);
  if (parts.length === 1) return <>{text}</>;
  // split with a capture group: even indexes are text, odd ones the mark number
  return (
    <>
      {parts.map((p, i) => (i % 2 ? <PositionMark key={i} n={p} /> : p && <Fragment key={i}>{p}</Fragment>))}
    </>
  );
}
