import './mascot.css';

export type Mood = 'happy' | 'sad' | 'surprised' | 'sleepy' | 'neutral';

interface Props {
  mood?: Mood;
  size?: number;
  className?: string;
}

const FUR = '#FFF4E6';
const FUR_SHADE = '#F6D9C2';
const INK = '#3B2E4A';
const PINK = '#FFB7C5';
const ROSE = '#FF6F91';

function Eyes({ mood }: { mood: Mood }) {
  if (mood === 'happy') {
    return (
      <g stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round">
        <path d="M38 70 q8 -9 16 0" />
        <path d="M66 70 q8 -9 16 0" />
      </g>
    );
  }
  if (mood === 'sleepy') {
    return (
      <g stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round">
        <path d="M38 72 q8 3 16 0" />
        <path d="M66 72 q8 3 16 0" />
        <text x="92" y="48" fontSize="12" fontWeight="700" fill={INK} stroke="none">
          z
        </text>
      </g>
    );
  }
  const ry = mood === 'surprised' ? 10 : 8;
  return (
    <g>
      <g className="mascot-blink">
        <ellipse cx="46" cy="70" rx="7" ry={ry} fill={INK} />
        <ellipse cx="74" cy="70" rx="7" ry={ry} fill={INK} />
        <circle cx="48.5" cy="66.5" r="2.5" fill="#fff" />
        <circle cx="76.5" cy="66.5" r="2.5" fill="#fff" />
        <circle cx="44" cy="74" r="1.2" fill="#fff" />
        <circle cx="72" cy="74" r="1.2" fill="#fff" />
      </g>
      {mood === 'sad' && (
        <g>
          <g stroke={INK} strokeWidth="2.5" strokeLinecap="round">
            <path d="M37 58 l14 4" />
            <path d="M83 58 l-14 4" />
          </g>
          <path d="M82 80 q4 6 0 9 q-4 -3 0 -9 z" fill="#A0E7FF" />
        </g>
      )}
    </g>
  );
}

function Mouth({ mood }: { mood: Mood }) {
  switch (mood) {
    case 'happy':
      return (
        <path d="M50 84 q10 12 20 0" stroke={INK} strokeWidth="2.5" fill="#FF8FB1" strokeLinecap="round" />
      );
    case 'sad':
      return <path d="M52 90 q8 -7 16 0" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />;
    case 'surprised':
      return <ellipse cx="60" cy="88" rx="4.5" ry="6" fill="#FF8FB1" stroke={INK} strokeWidth="2" />;
    case 'sleepy':
      return <path d="M56 87 h8" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />;
    default:
      return (
        <path
          d="M52 84 q4 6 8 0 q4 6 8 0"
          stroke={INK}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
  }
}

export function Mascot({ mood = 'neutral', size = 160, className = '' }: Props) {
  return (
    <svg
      role="img"
      aria-label={`Sakura ${mood}`}
      viewBox="0 0 120 150"
      width={size}
      height={(size * 150) / 120}
      className={`mascot-bob ${className}`}
    >
      {/* tail */}
      <path d="M86 128 q32 -6 22 -36" stroke={FUR_SHADE} strokeWidth="11" fill="none" strokeLinecap="round" />
      <path d="M86 128 q32 -6 22 -36" stroke={FUR} strokeWidth="7" fill="none" strokeLinecap="round" />
      {/* body */}
      <ellipse cx="60" cy="120" rx="30" ry="24" fill={FUR} />
      <ellipse cx="60" cy="126" rx="16" ry="12" fill="#FFFBF5" />
      {/* feet */}
      <ellipse cx="44" cy="140" rx="10" ry="6" fill={FUR} stroke={FUR_SHADE} strokeWidth="2" />
      <ellipse cx="76" cy="140" rx="10" ry="6" fill={FUR} stroke={FUR_SHADE} strokeWidth="2" />
      <g stroke={FUR_SHADE} strokeWidth="1.5" strokeLinecap="round">
        <path d="M41 140 v3" />
        <path d="M47 140 v3" />
        <path d="M73 140 v3" />
        <path d="M79 140 v3" />
      </g>
      {/* arms, resting on the belly */}
      <g fill="none" strokeLinecap="round">
        <path d="M38 106 q2 14 11 22" stroke={FUR_SHADE} strokeWidth="13" />
        <path d="M82 106 q-2 14 -11 22" stroke={FUR_SHADE} strokeWidth="13" />
        <path d="M38 106 q2 14 11 22" stroke={FUR} strokeWidth="9.5" />
        <path d="M82 106 q-2 14 -11 22" stroke={FUR} strokeWidth="9.5" />
      </g>
      <ellipse cx="50" cy="129" rx="7.5" ry="6" fill={FUR} stroke={FUR_SHADE} strokeWidth="2" />
      <ellipse cx="70" cy="129" rx="7.5" ry="6" fill={FUR} stroke={FUR_SHADE} strokeWidth="2" />
      <g stroke={FUR_SHADE} strokeWidth="1.5" strokeLinecap="round">
        <path d="M48 131 v3" />
        <path d="M52 131 v3" />
        <path d="M68 131 v3" />
        <path d="M72 131 v3" />
      </g>
      {/* ears */}
      <path d="M26 54 L32 14 L58 40 Z" fill={FUR} />
      <path d="M94 54 L88 14 L62 40 Z" fill={FUR} />
      <path d="M32 48 L35 24 L50 40 Z" fill={PINK} />
      <path d="M88 48 L85 24 L70 40 Z" fill={PINK} />
      {/* head */}
      <circle cx="60" cy="70" r="37" fill={FUR} />
      {/* forehead stripes */}
      <g stroke={FUR_SHADE} strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M60 36 v8" />
        <path d="M52 38 l2 7" />
        <path d="M68 38 l-2 7" />
      </g>
      {/* blush */}
      <ellipse cx="34" cy="82" rx="6.5" ry="4" fill={PINK} opacity="0.9" />
      <ellipse cx="86" cy="82" rx="6.5" ry="4" fill={PINK} opacity="0.9" />
      {/* whiskers */}
      <g stroke={INK} strokeWidth="1.5" strokeLinecap="round" opacity="0.7">
        <path d="M20 76 h12" />
        <path d="M21 84 l11 -3" />
        <path d="M100 76 h-12" />
        <path d="M99 84 l-11 -3" />
      </g>
      {/* nose */}
      <path d="M56 79 h8 l-4 4 z" fill="#FF8FB1" />
      <Eyes mood={mood} />
      <Mouth mood={mood} />
      {/* collar + bell */}
      <path d="M30 100 q30 16 60 0" stroke={ROSE} strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="60" cy="109" r="5.5" fill="#FFD166" stroke="#E0A800" strokeWidth="1.5" />
      <path d="M57 109 h6" stroke="#E0A800" strokeWidth="1.2" />
      {/* sakura flower on ear */}
      <g transform="translate(88 30)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-5" rx="3.2" ry="5" fill="#FFD1DC" transform={`rotate(${a})`} />
        ))}
        <circle r="2.2" fill="#FFD166" />
      </g>
    </svg>
  );
}
