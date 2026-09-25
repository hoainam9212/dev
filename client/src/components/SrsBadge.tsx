import { isDue, type ProgressItem } from '@nihongo/shared';
import { toState } from '../db/srs';
import { useT } from '../i18n';

export function srsStatus(p?: ProgressItem, now = new Date()): 'new' | 'due' | 'learned' {
  if (!p) return 'new';
  return isDue(toState(p), now) ? 'due' : 'learned';
}

export function SrsBadge({ p }: { p?: ProgressItem }) {
  const t = useT();
  const s = srsStatus(p);
  if (s === 'new') return <span className="rounded-full bg-sky/60 px-2 py-0.5 text-xs font-bold">{t.flashcards.srs.new}</span>;
  if (s === 'due') return <span className="rounded-full bg-rose/30 px-2 py-0.5 text-xs font-bold text-rose">{t.flashcards.srs.due}</span>;
  return (
    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
      {t.flashcards.srs.learned(p!.interval)}
    </span>
  );
}
