import { FINGER_COLOR, type Finger } from '@office-neko/shared';

const NAME: Record<Finger, string> = {
  lp: 'ngón út tay trái',
  lr: 'ngón áp út tay trái',
  lm: 'ngón giữa tay trái',
  li: 'ngón trỏ tay trái',
  ri: 'ngón trỏ tay phải',
  rm: 'ngón giữa tay phải',
  rr: 'ngón áp út tay phải',
  rp: 'ngón út tay phải',
  th: 'ngón cái',
};

/** Hình học tay trái (út → trỏ, rồi ngón cái); tay phải là ảnh gương của nó. */
const FINGERS: { x: number; y: number; w: number; h: number }[] = [
  { x: 14, y: 36, w: 21, h: 52 },
  { x: 38, y: 17, w: 22, h: 70 },
  { x: 63, y: 8, w: 23, h: 78 },
  { x: 89, y: 19, w: 22, h: 68 },
];
/** Ngón cái nghiêng vào giữa nhưng dừng trước x=150 để hai ngón cái không chéo nhau. */
const THUMB = { x: 104, y: 70, w: 22, h: 46, rotate: 'rotate(28 115 114)' };
const LEFT: Finger[] = ['lp', 'lr', 'lm', 'li'];
const RIGHT: Finger[] = ['rp', 'rr', 'rm', 'ri'];

/**
 * Hai bàn tay nét tròn đặt trên hàng phím cơ sở, tô sáng ngón cần dùng cho phím kế tiếp (cùng màu với phím trên
 * bàn phím ảo). `shift`: ngón út tay kia giữ Shift khi gõ chữ hoa/ký hiệu.
 */
export function Hands({ finger, shift = null }: { finger: Finger | null; shift?: Finger | null }) {
  const label = finger
    ? `Dùng ${NAME[finger]}${shift ? `, ${NAME[shift]} giữ Shift` : ''}`
    : 'Hai bàn tay đặt trên hàng phím cơ sở';

  const part = (f: Finger, shape: { x: number; y: number; w: number; h: number }, transform?: string) => {
    const on = f === finger || f === shift;
    return (
      <rect
        key={`${f}-${shape.x}`}
        data-finger={f}
        data-active={on || undefined}
        x={shape.x}
        y={shape.y}
        width={shape.w}
        height={shape.h}
        rx={shape.w / 2}
        transform={transform}
        fill={on ? FINGER_COLOR[f] : '#FFFFFF'}
        stroke={on ? '#E0607E' : '#8A7A72'}
        strokeWidth={on ? 4 : 2}
      />
    );
  };

  const hand = (names: Finger[]) => (
    <>
      <rect x={12} y={58} width={100} height={64} rx={30} fill="#FFF6EC" stroke="#8A7A72" strokeWidth={2} />
      {names.map((f, i) => part(f, FINGERS[i]!))}
      {part('th', THUMB, THUMB.rotate)}
    </>
  );

  return (
    <svg
      role="img"
      aria-label={label}
      data-testid="hands"
      viewBox="0 0 300 130"
      className="mx-auto block h-auto w-full max-w-[15rem] sm:max-w-xs"
    >
      <g>{hand(LEFT)}</g>
      <g transform="translate(300 0) scale(-1 1)">{hand(RIGHT)}</g>
    </svg>
  );
}
