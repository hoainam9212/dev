interface Props {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  unit?: string;
}

/** Minimal SVG bar chart with value labels; no external library. */
export function BarChart({ data, height = 140, color = 'var(--color-rose)', unit = '' }: Props) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const w = 100 / Math.max(1, data.length);
  const barW = w * 0.6;
  const top = 18;
  const bottom = 16;
  const inner = height - top - bottom;
  return (
    <svg viewBox={`0 0 100 ${height}`} className="w-full" role="img" aria-label="Biểu đồ" preserveAspectRatio="none">
      {data.map((d, i) => {
        const h = (d.value / max) * inner;
        const x = i * w + (w - barW) / 2;
        const y = top + inner - h;
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={barW} height={h} rx={1.5} fill={color} opacity={d.value ? 0.9 : 0.25} />
            <text x={x + barW / 2} y={y - 3} fontSize="5" textAnchor="middle" fill="var(--app-text)" fontWeight="700">
              {d.value ? `${d.value}${unit}` : ''}
            </text>
            <text x={x + barW / 2} y={height - 4} fontSize="4.5" textAnchor="middle" fill="var(--app-muted)">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
