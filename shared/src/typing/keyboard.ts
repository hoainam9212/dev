export type Finger = 'lp' | 'lr' | 'lm' | 'li' | 'ri' | 'rm' | 'rr' | 'rp' | 'th';

export interface KeyDef {
  id: string;
  label: string;
  shiftLabel?: string;
  finger: Finger;
  home?: boolean;
}

export const FINGER_VI: Record<Finger, string> = {
  lp: 'Ngón út trái',
  lr: 'Ngón áp út trái',
  lm: 'Ngón giữa trái',
  li: 'Ngón trỏ trái',
  ri: 'Ngón trỏ phải',
  rm: 'Ngón giữa phải',
  rr: 'Ngón áp út phải',
  rp: 'Ngón út phải',
  th: 'Ngón cái',
};

/** Màu pastel cho từng ngón (tay trái và phải đối xứng). */
export const FINGER_COLOR: Record<Finger, string> = {
  lp: '#FFC9DE', lr: '#FFE0B3', lm: '#FFF3B0', li: '#C8F2DC',
  ri: '#C6E7FF', rm: '#FFF3B0', rr: '#FFE0B3', rp: '#FFC9DE',
  th: '#E4D9FF',
};

const FINGER_OF: Record<string, Finger> = {};
const assign = (keys: string, f: Finger) => [...keys].forEach((k) => (FINGER_OF[k] = f));
assign('`1qaz', 'lp');
assign('2wsx', 'lr');
assign('3edc', 'lm');
assign('45rtfgvb', 'li');
assign('67yuhjnm', 'ri');
assign('8ik,', 'rm');
assign('9ol.', 'rr');
assign("0-=p[]\\;'/", 'rp');

const HOME = new Set([...'asdfjkl;']);

function row(ids: string, shifted: string): KeyDef[] {
  const a = [...ids];
  const b = [...shifted];
  return a.map((id, i) => ({
    id,
    label: /[a-z]/.test(id) ? id.toUpperCase() : id,
    shiftLabel: /[a-z]/.test(id) ? undefined : b[i],
    finger: FINGER_OF[id] ?? 'rp',
    home: HOME.has(id) || undefined,
  }));
}

export const KEY_ROWS: KeyDef[][] = [
  row('`1234567890-=', '~!@#$%^&*()_+'),
  row('qwertyuiop[]\\', 'QWERTYUIOP{}|'),
  row("asdfghjkl;'", 'ASDFGHJKL:"'),
  row('zxcvbnm,./', 'ZXCVBNM<>?'),
];

export const SPACE_KEY: KeyDef = { id: 'space', label: 'Space', finger: 'th' };

const BY_ID = new Map<string, KeyDef>();
const BY_CHAR = new Map<string, { id: string; shift: boolean }>();
for (const r of KEY_ROWS) {
  for (const k of r) {
    BY_ID.set(k.id, k);
    BY_CHAR.set(k.id, { id: k.id, shift: false });
    if (k.shiftLabel) BY_CHAR.set(k.shiftLabel, { id: k.id, shift: true });
    else BY_CHAR.set(k.id.toUpperCase(), { id: k.id, shift: true });
  }
}
BY_ID.set('space', SPACE_KEY);
BY_CHAR.set(' ', { id: 'space', shift: false });

export function keyDef(id: string): KeyDef | undefined {
  return BY_ID.get(id);
}

/** Phím cần bấm (và có cần Shift không) để gõ ra ký tự `ch`; null nếu ký tự không có trên bàn phím Mỹ. */
export function keyForChar(ch: string): { id: string; shift: boolean } | null {
  return BY_CHAR.get(ch) ?? null;
}
