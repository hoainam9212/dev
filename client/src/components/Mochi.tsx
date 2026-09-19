import type { MochiMood } from '@office-neko/shared';
import './mochi.css';

interface Props {
  mood?: MochiMood;
  size?: number;
  animated?: boolean;
  className?: string;
}

const FUR = '#FFFDF8';
const PATCH = '#F7B98B';
const INK = '#3B2E4A';
const PINK = '#FFB7C5';
const BLUSH = '#FF9EB5';

function Eyes({ mood }: { mood: MochiMood }) {
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
        <text x="92" y="48" fontSize="12" fontWeight="700" fill={INK} stroke="none">z</text>
      </g>
    );
  }
  const ry = mood === 'surprised' ? 10 : 8;
  return (
    <g>
      <g className="mochi-blink">
        <ellipse cx="46" cy="70" rx="7" ry={ry} fill={INK} />
        <ellipse cx="74" cy="70" rx="7" ry={ry} fill={INK} />
        <circle cx="48.5" cy="66.5" r="2.5" fill="#fff" />
        <circle cx="76.5" cy="66.5" r="2.5" fill="#fff" />
      </g>
      {mood === 'sad' && (
        <g>
          <g stroke={INK} strokeWidth="2.5" strokeLinecap="round">
            <path d="M37 58 l14 4" />
            <path d="M83 58 l-14 4" />
          </g>
          <path d="M82 80 q4 6 0 9 q-4 -3 0 -9 z" fill="#A0D8FF" />
        </g>
      )}
    </g>
  );
}

function Mouth({ mood }: { mood: MochiMood }) {
  switch (mood) {
    case 'happy':
      return <path d="M50 84 q10 12 20 0" stroke={INK} strokeWidth="2.5" fill={BLUSH} strokeLinecap="round" />;
    case 'sad':
      return <path d="M52 90 q8 -7 16 0" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />;
    case 'surprised':
      return <ellipse cx="60" cy="88" rx="4.5" ry="6" fill={BLUSH} stroke={INK} strokeWidth="2" />;
    case 'sleepy':
      return <path d="M56 87 h8" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />;
    default:
      return <path d="M52 84 q4 6 8 0 q4 6 8 0" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />;
  }
}

/** Mèo Mochi: lông trắng kem, tai và má vá cam, kẹp tóc dango 3 màu. */
export function Mochi({ mood = 'neutral', size = 160, animated = true, className = '' }: Props) {
  return (
    <svg
      role="img"
      aria-label={`Mochi ${mood}`}
      viewBox="0 0 120 150"
      width={size}
      height={(size * 150) / 120}
      className={`${animated ? 'mochi-bob' : ''} ${className}`}
    >
      <path d="M86 128 q32 -6 22 -36" stroke={PATCH} strokeWidth="11" fill="none" strokeLinecap="round" />
      <path d="M86 128 q32 -6 22 -36" stroke={FUR} strokeWidth="6" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="120" rx="30" ry="24" fill={FUR} stroke="#F1E4D6" strokeWidth="1.5" />
      <ellipse cx="46" cy="140" rx="10" ry="6" fill={FUR} stroke="#F1E4D6" strokeWidth="1.5" />
      <ellipse cx="74" cy="140" rx="10" ry="6" fill={FUR} stroke="#F1E4D6" strokeWidth="1.5" />
      <path d="M26 54 L32 14 L58 40 Z" fill={PATCH} />
      <path d="M94 54 L88 14 L62 40 Z" fill={FUR} stroke="#F1E4D6" strokeWidth="1.5" />
      <path d="M32 48 L35 24 L50 40 Z" fill={PINK} />
      <path d="M88 48 L85 24 L70 40 Z" fill={PINK} />
      <circle cx="60" cy="70" r="37" fill={FUR} stroke="#F1E4D6" strokeWidth="1.5" />
      <path d="M26 62 q6 -26 30 -30 q-10 14 -8 34 q-12 4 -22 -4 z" fill={PATCH} opacity="0.9" />
      <ellipse cx="34" cy="82" rx="6.5" ry="4" fill={PINK} opacity="0.9" />
      <ellipse cx="86" cy="82" rx="6.5" ry="4" fill={PINK} opacity="0.9" />
      <g stroke={INK} strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
        <path d="M20 76 h12" />
        <path d="M21 84 l11 -3" />
        <path d="M100 76 h-12" />
        <path d="M99 84 l-11 -3" />
      </g>
      <path d="M56 79 h8 l-4 4 z" fill={BLUSH} />
      <Eyes mood={mood} />
      <Mouth mood={mood} />
      <path d="M30 100 q30 16 60 0" stroke="#8FE3CF" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="60" cy="109" r="5.5" fill="#FFE08A" stroke="#E0B84A" strokeWidth="1.5" />
      <g transform="translate(84 22) rotate(35)">
        <path d="M0 -14 v28" stroke="#C69C6D" strokeWidth="2" strokeLinecap="round" />
        <circle cy="-9" r="4.5" fill="#FFB7C5" />
        <circle cy="0" r="4.5" fill="#FFFFFF" stroke="#EDE3D8" strokeWidth="1" />
        <circle cy="9" r="4.5" fill="#8FE3CF" />
      </g>
    </svg>
  );
}
