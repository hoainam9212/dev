import { Fragment } from 'react';
import { formatCombo, type OS } from '@office-neko/shared';
import { useOs } from '../db/profile';

export function Kbd({ combo, os }: { combo: string; os?: OS }) {
  const current = useOs();
  const labels = formatCombo(combo, os ?? current);
  return (
    <span className="inline-flex items-center gap-1 align-middle" aria-label={labels.join(' + ')}>
      {labels.map((l, i) => (
        <Fragment key={i}>
          {i > 0 && <span aria-hidden className="text-muted">+</span>}
          <kbd aria-hidden className="kbd">{l}</kbd>
        </Fragment>
      ))}
    </span>
  );
}
