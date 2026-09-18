import './mascot.css';

export type Mood = 'happy' | 'sad' | 'surprised' | 'sleepy' | 'neutral';

interface Props {
  mood?: Mood;
  size?: number;
  className?: string;
}

function Eyes({ mood }: { mood: Mood }) {
  if (mood === 'happy') {
    return (
      <g stroke="#3B2E4A" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M38 62 q7 -8 14 0" />
        <path d="M68 62 q7 -8 14 0" />
      </g>
    );
  }
  if (mood === 'sleepy') {
    return (
      <g stroke="#3B2E4A" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M38 64 h14" />
        <path d="M68 64 h14" />
      </g>
    );
  }
  const ry = mood === 'surprised' ? 9 : 7;
  return (
    <g className="mascot-blink">
      <ellipse cx="45" cy="63" rx="6" ry={ry} fill="#3B2E4A" />
      <ellipse cx="75" cy="63" rx="6" ry={ry} fill="#3B2E4A" />
      <circle cx="47" cy="60" r="2" fill="#fff" />
      <circle cx="77" cy="60" r="2" fill="#fff" />
      {mood === 'sad' && (
        <g stroke="#3B2E4A" strokeWidth="2.5" strokeLinecap="round">
          <path d="M37 52 l14 4" />
          <path d="M83 52 l-14 4" />
        </g>
      )}
    </g>
  );
}

function Mouth({ mood }: { mood: Mood }) {
  switch (mood) {
    case 'happy':
      return <path d="M50 78 q10 10 20 0" stroke="#D94F70" strokeWidth="3" fill="none" strokeLinecap="round" />;
    case 'sad':
      return <path d="M50 84 q10 -8 20 0" stroke="#D94F70" strokeWidth="3" fill="none" strokeLinecap="round" />;
    case 'surprised':
      return <ellipse cx="60" cy="81" rx="5" ry="7" fill="#D94F70" />;
    case 'sleepy':
      return <path d="M54 80 h12" stroke="#D94F70" strokeWidth="3" strokeLinecap="round" />;
    default:
      return <path d="M52 80 q8 4 16 0" stroke="#D94F70" strokeWidth="3" fill="none" strokeLinecap="round" />;
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
      {/* back hair */}
      <path d="M22 70 q-6 60 20 76 h36 q26 -16 20 -76 z" fill="#FF8FB1" />
      {/* body: sailor uniform */}
      <path d="M38 100 h44 l8 44 h-60 z" fill="#5B7DB1" />
      <path d="M38 100 h44 l-22 14 z" fill="#FFF" />
      <path d="M52 108 l8 10 l8 -10 l-8 -4 z" fill="#FF6F91" />
      {/* neck */}
      <rect x="52" y="92" width="16" height="12" rx="6" fill="#FFE1D6" />
      {/* face */}
      <ellipse cx="60" cy="66" rx="34" ry="36" fill="#FFE9E0" />
      {/* blush */}
      <ellipse cx="36" cy="74" rx="6" ry="3.5" fill="#FFB7C5" opacity="0.9" />
      <ellipse cx="84" cy="74" rx="6" ry="3.5" fill="#FFB7C5" opacity="0.9" />
      {/* bangs */}
      <path
        d="M24 60 q4 -40 36 -40 q32 0 36 40 q-10 -14 -20 -10 q-8 -14 -16 -8 q-8 -6 -16 8 q-10 -4 -20 10 z"
        fill="#FF8FB1"
      />
      {/* sakura hairpin */}
      <g transform="translate(86 40)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-5" rx="3" ry="5" fill="#FFF" transform={`rotate(${a})`} />
        ))}
        <circle r="2" fill="#FFD166" />
      </g>
      <Eyes mood={mood} />
      <Mouth mood={mood} />
    </svg>
  );
}
