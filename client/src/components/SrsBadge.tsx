import { isDue, type ProgressItem } from '@nihongo/shared';
import { toState } from '../db/srs';

export function srsStatus(p?: ProgressItem, now = new Date()): 'new' | 'due' | 'learned' {
  if (!p) return 'new';
  return isDue(toState(p), now) ? 'due' : 'learned';
}

export function SrsBadge({ p }: { p?: ProgressItem }) {
  const s = srsStatus(p);
  if (s === 'new') return <span className="rounded-full bg-sky/60 px-2 py-0.5 text-xs font-bold">Mới</span>;
  if (s === 'due') return <span className="rounded-full bg-rose/30 px-2 py-0.5 text-xs font-bold text-rose">Đến hạn</span>;
  return (
    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
      Đã học · {p!.interval} ngày
    </span>
  );
}
