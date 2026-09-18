interface Props {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  unit?: string;
}

const W = 320;

/** Minimal SVG bar chart with value labels; no external library. */
export function BarChart({ data, height = 140, color = 'var(--color-rose)', unit = '' }: Props) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const w = W / Math.max(1, data.length);
  const barW = w * 0.6;
  const top = 18;
  const bottom = 16;
  const inner = height - top - bottom;
  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="h-auto w-full" style={{ maxHeight: height * 1.6 }} role="img" aria-label="Biểu đồ">
      <line x1="0" x2={W} y1={top + inner} y2={top + inner} stroke="var(--color-sakura)" strokeWidth="1" />
      {data.map((d, i) => {
        const h = (d.value / max) * inner;
        const x = i * w + (w - barW) / 2;
        const y = top + inner - h;
        return (
          <g key={`${d.label}-${i}`}>
            <rect x={x} y={y} width={barW} height={Math.max(h, d.value ? 1 : 0)} rx={3} fill={color} opacity={0.9} />
            {d.value > 0 && (
              <text x={x + barW / 2} y={y - 4} fontSize="10" textAnchor="middle" fill="var(--app-text)" fontWeight="700">
                {d.value}
                {unit}
              </text>
            )}
            <text x={x + barW / 2} y={height - 4} fontSize="9" textAnchor="middle" fill="var(--app-muted)">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
