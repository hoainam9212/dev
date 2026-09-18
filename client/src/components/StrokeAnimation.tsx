import './strokes.css';

interface Props {
  paths: string[];
  size?: number;
  playKey?: number;
  showNumbers?: boolean;
}

/** Animated stroke order (KanjiVG 109×109 space). Change `playKey` to replay. */
export function StrokeAnimation({ paths, size = 160, playKey = 0, showNumbers = true }: Props) {
  return (
    <svg
      key={playKey}
      viewBox="0 0 109 109"
      width={size}
      height={size}
      className="rounded-2xl bg-cream ring-2 ring-sakura/40 dark:bg-bg"
      role="img"
      aria-label="Thứ tự nét"
    >
      <g stroke="#FFB7C5" strokeWidth="0.8" strokeDasharray="3 3">
        <line x1="54.5" y1="0" x2="54.5" y2="109" />
        <line x1="0" y1="54.5" x2="109" y2="54.5" />
      </g>
      {paths.map((d, i) => (
        <path key={i} d={d} className="stroke-anim" style={{ animationDelay: `${i * 0.75}s` }} />
      ))}
      {showNumbers &&
        paths.map((d, i) => {
          const m = d.match(/^M\s*(-?[\d.]+)[ ,]\s*(-?[\d.]+)/);
          return m ? (
            <text key={i} x={Number(m[1]) - 5} y={Number(m[2]) - 2} fontSize="7" fill="#FF6F91" fontWeight="700">
              {i + 1}
            </text>
          ) : null;
        })}
    </svg>
  );
}
