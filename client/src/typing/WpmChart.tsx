import type { TypingRun } from '../db/db';

export function WpmChart({ runs }: { runs: TypingRun[] }) {
  if (runs.length === 0) return <p className="text-muted">Chưa có lần kiểm tra nào. Thử một bài 1 phút nhé!</p>;
  const W = 320;
  const H = 120;
  const max = Math.max(40, ...runs.map((r) => r.wpm));
  const x = (i: number) => (runs.length === 1 ? W / 2 : 16 + (i * (W - 32)) / (runs.length - 1));
  const y = (wpm: number) => H - 16 - (wpm / max) * (H - 32);
  const points = runs.map((r, i) => `${x(i)},${y(r.wpm)}`).join(' ');
  return (
    <svg role="img" aria-label="Biểu đồ WPM" viewBox={`0 0 ${W} ${H}`} className="w-full max-w-md">
      <line x1="16" y1={H - 16} x2={W - 16} y2={H - 16} stroke="#E6DDD3" />
      <polyline points={points} fill="none" stroke="#D6336C" strokeWidth="3" strokeLinejoin="round" />
      {runs.map((r, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(r.wpm)} r="4" fill="#D6336C" />
          <text x={x(i)} y={y(r.wpm) - 8} textAnchor="middle" fontSize="10" fill="#3B2E4A">{r.wpm}</text>
        </g>
      ))}
    </svg>
  );
}
