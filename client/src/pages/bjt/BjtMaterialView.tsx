import type { BjtMaterial } from '@nihongo/shared';
import { useT } from '../../i18n';
import { Marked } from './PositionMark';

const BAR_COLORS = ['bg-sky-400', 'bg-rose', 'bg-emerald-400', 'bg-amber-400'];

/** What the learner looks at while answering: photo description, document, table or bar chart. */
export function BjtMaterialView({ material }: { material: BjtMaterial }) {
  const t = useT();
  if (material.kind === 'scene') {
    return (
      <div className="rounded-2xl border-2 border-dashed border-sakura p-3" data-testid="bjt-material">
        <p className="text-xs font-bold text-muted">📷 {t.bjt.scene}</p>
        <p className="mt-1">{material.vi}</p>
      </div>
    );
  }
  if (material.kind === 'text') {
    return (
      <div className="rounded-2xl bg-cream p-4 dark:bg-bg" data-testid="bjt-material">
        {material.title && (
          <p className="mb-2 font-black">
            <Marked text={material.title} />
          </p>
        )}
        <p className="whitespace-pre-wrap break-words leading-loose">
          <Marked text={material.body} />
        </p>
      </div>
    );
  }
  if (material.kind === 'table' && material.head.length === 0) {
    const cols = Math.max(1, ...material.rows.map((r) => r.length));
    return (
      <div className="rounded-2xl bg-cream p-3 dark:bg-bg" data-testid="bjt-material">
        {material.title && (
          <p className="mb-2 font-black">
            <Marked text={material.title} />
          </p>
        )}
        {/* a floor plan or a simple map: equal columns that always fit the screen, no header */}
        <table data-grid className="w-full table-fixed border-separate border-spacing-1 text-xs sm:text-sm">
          <colgroup>
            {Array.from({ length: cols }, (_, i) => (
              <col key={i} style={{ width: `${100 / cols}%` }} />
            ))}
          </colgroup>
          <tbody>
            {material.rows.map((r, i) => (
              <tr key={i}>
                {r.map((c, j) =>
                  c.trim() ? (
                    <td
                      key={j}
                      className="h-12 rounded-lg border-2 border-sakura bg-surface px-0.5 py-1 text-center font-bold leading-snug [overflow-wrap:anywhere]"
                    >
                      <Marked text={c} />
                    </td>
                  ) : (
                    <td key={j} data-empty className="h-12 rounded-lg bg-sakura/20 dark:bg-sakura/10" />
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {material.note && (
          <p className="mt-2 text-sm text-muted">
            <Marked text={material.note} />
          </p>
        )}
      </div>
    );
  }
  if (material.kind === 'table') {
    return (
      <div className="rounded-2xl bg-cream p-3 dark:bg-bg" data-testid="bjt-material">
        {material.title && (
          <p className="mb-2 font-black">
            <Marked text={material.title} />
          </p>
        )}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {material.head.map((h, i) => (
                  <th key={i} className="border border-sakura/60 bg-sakura/30 px-2 py-1 text-left font-bold">
                    <Marked text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {material.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j} className="border border-sakura/60 px-2 py-1">
                      <Marked text={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {material.note && (
          <p className="mt-2 text-sm text-muted">
            <Marked text={material.note} />
          </p>
        )}
      </div>
    );
  }
  const max = Math.max(1, ...material.series.flatMap((s) => s.values));
  return (
    <div className="rounded-2xl bg-cream p-3 dark:bg-bg" data-testid="bjt-material">
      <p className="font-black">
        {material.title}
        {material.unit && <span className="ml-2 text-xs font-normal text-muted">（{material.unit}）</span>}
      </p>
      <div className="mt-1 flex flex-wrap gap-3 text-xs">
        {material.series.map((s, i) => (
          <span key={s.name} className="flex items-center gap-1">
            <span className={`inline-block h-3 w-3 rounded-sm ${BAR_COLORS[i % BAR_COLORS.length]}`} />
            {s.name}
          </span>
        ))}
      </div>
      <div className="mt-2 space-y-2">
        {material.labels.map((label, li) => (
          <div key={label} className="flex items-center gap-2">
            <span className="w-16 shrink-0 text-sm font-bold">{label}</span>
            <div className="min-w-0 flex-1 space-y-1">
              {material.series.map((s, si) => (
                <div key={s.name} className="flex items-center gap-1">
                  <div
                    className={`h-3 rounded-sm ${BAR_COLORS[si % BAR_COLORS.length]}`}
                    style={{ width: `${Math.max(2, (s.values[li]! / max) * 85)}%` }}
                  />
                  <span className="text-xs tabular-nums">{s.values[li]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
