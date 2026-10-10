import { BADGES } from '@office-neko/shared';

export function BadgeShelf({ earned }: { earned: ReadonlySet<string> }) {
  const count = BADGES.filter((b) => earned.has(b.id)).length;
  return (
    <section className="card p-5" aria-labelledby="badge-shelf-title">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h2 id="badge-shelf-title" className="text-lg font-extrabold">Huy hiệu</h2>
        <span className="text-sm font-bold text-muted">{count}/{BADGES.length}</span>
      </div>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {BADGES.map((b) => {
          const has = earned.has(b.id);
          return (
            <li
              key={b.id}
              title={has ? b.title : `${b.title}: ${b.how}`}
              aria-label={has ? `Huy hiệu: ${b.title}, đã đạt` : `Huy hiệu: ${b.title}, chưa đạt. ${b.how}`}
              className={`flex items-center gap-2 rounded-2xl border-2 p-2 ${has ? 'border-peach bg-peach/15' : 'border-dashed border-muted/40 opacity-70'}`}
            >
              <span aria-hidden className={`text-3xl ${has ? '' : 'grayscale'}`}>{b.emoji}</span>
              <span className="min-w-0">
                <span className="block text-sm font-bold leading-tight">{b.title}</span>
                {!has && <span className="block text-xs leading-tight text-muted">{b.how}</span>}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
