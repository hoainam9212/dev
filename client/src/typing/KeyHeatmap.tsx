import { KEY_ROWS, SPACE_KEY, type KeyDef, type KeyStats } from '@office-neko/shared';

/**
 * Các ký tự mà một phím vật lý có thể tạo ra — `recordKey` lưu đúng ký tự đã
 * gõ (viết thường), nên phím Shift + ký hiệu (vd. Shift+1 → "!") và phím cách
 * (gõ ra `" "`, không phải chữ `"space"`) nằm ở khoá khác `k.id` trong `stats`.
 */
function charsOf(k: KeyDef): string[] {
  if (k.id === 'space') return [' '];
  return k.shiftLabel ? [k.id, k.shiftLabel] : [k.id];
}

function statsFor(stats: KeyStats, k: KeyDef): { hit: number; miss: number } | null {
  const entries = charsOf(k)
    .map((c) => stats[c])
    .filter((s): s is { hit: number; miss: number } => !!s);
  if (entries.length === 0) return null;
  return entries.reduce((a, s) => ({ hit: a.hit + s.hit, miss: a.miss + s.miss }), { hit: 0, miss: 0 });
}

const ROWS: KeyDef[][] = [...KEY_ROWS, [SPACE_KEY]];

export function KeyHeatmap({ stats }: { stats: KeyStats }) {
  return (
    <div className="space-y-1" aria-label="Bản đồ phím hay sai">
      {ROWS.map((row, r) => (
        <div key={r} className="flex gap-1" style={{ paddingLeft: r < KEY_ROWS.length ? `${r * 0.9}rem` : 0 }}>
          {row.map((k) => {
            const s = statsFor(stats, k);
            const total = s ? s.hit + s.miss : 0;
            const rate = total ? s!.miss / total : 0;
            const bg = !total ? '#F3EFEA' : rate === 0 ? '#C8F2DC' : `rgba(255, 122, 154, ${Math.min(0.9, 0.25 + rate)})`;
            return (
              <span
                key={k.id}
                data-key={k.id}
                title={total ? `${k.label}: ${s!.hit} đúng, ${s!.miss} sai` : `${k.label}: chưa có dữ liệu`}
                className={`grid h-9 place-items-center rounded-lg text-sm font-bold ${k.id === 'space' ? 'w-40' : 'w-9'}`}
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
