import { excelSim, formula } from '@office-neko/shared';

interface Props {
  state: excelSim.WorkbookState;
  chart: excelSim.Chart;
  onRemove: () => void;
}

const W = 420;
const H = 200;
const PAD = { left: 40, right: 12, top: 12, bottom: 28 };
/** Thanh ngang để nhãn ở bên trái, mà tên tiếng Việt thì dài — chừa rộng hơn hẳn. */
const BAR_PAD_LEFT = 104;
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

/**
 * Nhãn dài hơn khung thì cắt bớt: "Nguyễn Văn Nam" vẽ đủ sẽ tràn ra ngoài viewBox
 * và bị cắt cụt trông như lỗi. Tên đầy đủ vẫn nằm trong `aria-label` của biểu đồ.
 */
function short(label: string): string {
  return label.length > 12 ? `${label.slice(0, 11).trimEnd()}…` : label;
}

/** Màu pastel lặp lại; đủ tương phản trên nền trắng. */
const COLORS = ['#3FB871', '#7FB2FF', '#FFA878', '#C8B6FF', '#FF7A9A', '#FFD166'];
const color = (i: number) => COLORS[i % COLORS.length]!;

const CHART_VI: Record<excelSim.Chart['type'], string> = {
  column: 'Biểu đồ cột',
  bar: 'Biểu đồ thanh ngang',
  line: 'Biểu đồ đường',
  pie: 'Biểu đồ tròn',
};

/** Một múi hình tròn, vẽ bằng cung `A` của SVG path. */
function slicePath(cx: number, cy: number, r: number, from: number, to: number): string {
  const p = (angle: number) => [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  const [x1, y1] = p(from);
  const [x2, y2] = p(to);
  const large = to - from > Math.PI ? 1 : 0;
  // Một múi chiếm trọn vòng thì cung `A` không vẽ được (điểm đầu trùng điểm cuối).
  if (to - from >= Math.PI * 2 - 1e-9) {
    return `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r} Z`;
  }
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
}

export function ChartView({ state, chart, onRemove }: Props) {
  const data = excelSim.chartData(state, chart.range);
  const money = (n: number) => formula.displayValue(n, { numFmt: 'number' });

  const label = `${CHART_VI[chart.type]}: ${chart.title}. ` +
    data.labels.map((l, i) => `${l}: ${money(data.values[i] ?? 0)}`).join('; ');

  const header = (
    <div className="flex items-center gap-2">
      <h3 className="text-sm font-bold">{chart.title}</h3>
      <span className="text-xs text-muted">{CHART_VI[chart.type]} · {chart.range}</span>
      <button type="button" aria-label="Xoá biểu đồ" className="btn ml-auto !px-2 !py-0.5 text-xs" onClick={onRemove}>✕</button>
    </div>
  );

  // max === 0 nghĩa là vùng chưa có số nào; vẽ tiếp sẽ chia cho 0.
  if (data.max <= 0) {
    return (
      <div className="card space-y-2 p-3">
        {header}
        <p className="text-sm text-muted">Vùng {chart.range} chưa có số để vẽ. Hãy chọn vùng có cột số liệu.</p>
      </div>
    );
  }

  const n = data.values.length;
  const total = data.values.reduce((a, b) => a + b, 0);

  return (
    <div className="card space-y-2 p-3">
      {header}
      <svg role="img" aria-label={label} viewBox={`0 0 ${W} ${H}`} className="w-full max-w-lg">
        {chart.type === 'column' && data.values.map((v, i) => {
          const bw = PLOT_W / n * 0.6;
          const x = PAD.left + (PLOT_W / n) * (i + 0.2);
          const h = (v / data.max) * PLOT_H;
          return (
            <g key={i}>
              <rect data-testid={`chart-bar-${i}`} x={x} y={PAD.top + PLOT_H - h} width={bw} height={h} fill={color(i)} rx="3" />
              <text x={x + bw / 2} y={H - 10} textAnchor="middle" fontSize="10" fill="#6b7280">{short(data.labels[i] ?? '')}</text>
            </g>
          );
        })}

        {chart.type === 'bar' && data.values.map((v, i) => {
          const bh = PLOT_H / n * 0.6;
          const y = PAD.top + (PLOT_H / n) * (i + 0.2);
          const w = (v / data.max) * (W - BAR_PAD_LEFT - PAD.right);
          return (
            <g key={i}>
              <rect data-testid={`chart-bar-${i}`} x={BAR_PAD_LEFT} y={y} width={w} height={bh} fill={color(i)} rx="3" />
              {/* Neo ở mép trái và căn trái: nhãn chạy VÀO trong khung, không ra ngoài. */}
              <text x={4} y={y + bh / 2 + 3} textAnchor="start" fontSize="10" fill="#6b7280">{short(data.labels[i] ?? '')}</text>
            </g>
          );
        })}

        {chart.type === 'line' && (() => {
          const at = (i: number) => [
            PAD.left + (n === 1 ? PLOT_W / 2 : (PLOT_W / (n - 1)) * i),
            PAD.top + PLOT_H - ((data.values[i] ?? 0) / data.max) * PLOT_H,
          ] as const;
          const points = data.values.map((_, i) => at(i).join(',')).join(' ');
          return (
            <g>
              <polyline data-testid="chart-line" points={points} fill="none" stroke={color(0)} strokeWidth="2.5" />
              {data.values.map((_, i) => {
                const [x, y] = at(i);
                return (
                  <g key={i}>
                    <circle data-testid={`chart-dot-${i}`} cx={x} cy={y} r="4" fill={color(0)} />
                    {/* Điểm đầu/cuối nằm sát mép, nhãn căn giữa ở đó sẽ tràn ra ngoài khung. */}
                    <text
                      x={x}
                      y={H - 10}
                      textAnchor={i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'}
                      fontSize="10"
                      fill="#6b7280"
                    >
                      {short(data.labels[i] ?? '')}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })()}

        {chart.type === 'pie' && (() => {
          const cx = W / 2;
          const cy = PAD.top + PLOT_H / 2;
          const r = Math.min(PLOT_W, PLOT_H) / 2 - 4;
          let from = -Math.PI / 2;
          return (
            <g>
              {data.values.map((v, i) => {
                const share = total > 0 ? v / total : 0;
                const to = from + share * Math.PI * 2;
                const d = slicePath(cx, cy, r, from, to);
                from = to;
                return <path key={i} data-testid={`chart-slice-${i}`} d={d} fill={color(i)} stroke="#fff" strokeWidth="1" />;
              })}
            </g>
          );
        })()}

        {chart.type !== 'pie' && (
          <line x1={PAD.left} y1={PAD.top + PLOT_H} x2={W - PAD.right} y2={PAD.top + PLOT_H} stroke="#d1d5db" />
        )}
      </svg>

      {chart.type === 'pie' ? (
        <ul className="flex flex-wrap gap-3 text-xs">
          {data.labels.map((l, i) => (
            <li key={l} className="flex items-center gap-1">
              <span className="inline-block h-3 w-3 rounded" style={{ background: color(i) }} />
              {l} · {total > 0 ? Math.round(((data.values[i] ?? 0) / total) * 100) : 0}%
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
