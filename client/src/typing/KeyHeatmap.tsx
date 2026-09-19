import { KEY_ROWS, type KeyStats } from '@office-neko/shared';

export function KeyHeatmap({ stats }: { stats: KeyStats }) {
  return (
    <div className="space-y-1" aria-label="Bản đồ phím hay sai">
      {KEY_ROWS.map((row, r) => (
        <div key={r} className="flex gap-1" style={{ paddingLeft: `${r * 0.9}rem` }}>
          {row.map((k) => {
            const s = stats[k.id];
            const total = s ? s.hit + s.miss : 0;
            const rate = total ? s!.miss / total : 0;
            const bg = !total ? '#F3EFEA' : rate === 0 ? '#C8F2DC' : `rgba(255, 122, 154, ${Math.min(0.9, 0.25 + rate)})`;
            return (
              <span
                key={k.id}
                data-key={k.id}
                title={total ? `${k.label}: ${s!.hit} đúng, ${s!.miss} sai` : `${k.label}: chưa có dữ liệu`}
                className="grid h-9 w-9 place-items-center rounded-lg text-sm font-bold"
                style={{ background: bg }}
              >
                {k.label}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
