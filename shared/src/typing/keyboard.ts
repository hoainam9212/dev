import type { OS } from '../types';

export type Finger ='lp' | 'lr' | 'lm' | 'li' | 'ri' | 'rm' | 'rr' | 'rp' | 'th';

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

/**
 * Một phím vẽ trên bàn phím ảo. `width` tính bằng đơn vị phím (phím chữ = 1); hàng nào cũng cộng lại đủ 15 để mép
 * phải thẳng hàng. `label` là chữ in trên phím (ký hiệu ngắn để vừa màn hẹp), `name` là tên đầy đủ của phím bổ trợ.
 * `finger` null: phím bổ trợ hàng dưới, không thuộc bài gõ.
 */
export interface KeyCap extends Omit<KeyDef, 'finger'> {
  finger: Finger | null;
  width: number;
  name?: string;
}

const ROW_UNITS = 15;

const cap = (id: string, label: string, name: string, width: number, finger: Finger | null = null): KeyCap => ({
  id,
  label,
  name,
  width,
  finger,
});

/** Tên phím bổ trợ theo HĐH: [nhãn in trên phím, tên đầy đủ]. */
const MOD: Record<OS, Record<'back' | 'tab' | 'caps' | 'enter' | 'shift' | 'ctrl' | 'alt' | 'meta', [string, string]>> = {
  win: {
    back: ['⌫', 'Backspace'],
    tab: ['⇥', 'Tab'],
    caps: ['⇪', 'Caps Lock'],
    enter: ['↵', 'Enter'],
    shift: ['⇧', 'Shift'],
    ctrl: ['Ctrl', 'Ctrl'],
    alt: ['Alt', 'Alt'],
    meta: ['⊞', 'Win'],
  },
  mac: {
    back: ['⌫', 'delete'],
    tab: ['⇥', 'tab'],
    caps: ['⇪', 'caps lock'],
    enter: ['↩', 'return'],
    shift: ['⇧', 'shift'],
    ctrl: ['⌃', 'control'],
    alt: ['⌥', 'option'],
    meta: ['⌘', 'command'],
  },
};

/**
 * Bố cục bàn phím ảo đủ năm hàng theo HĐH. Phím chữ/số y như `KEY_ROWS` ở cả hai HĐH; chỉ phím bổ trợ và hàng dưới
 * cùng đổi: Windows `Ctrl Win Alt [Space] Alt Ctrl`, Mac `control option command [Space] command option`.
 */
export function keyboardRows(os: OS): KeyCap[][] {
  const m = MOD[os];
  const keys = (r: number): KeyCap[] =>
    KEY_ROWS[r]!.map((k) => ({ ...k, width: k.id === '\\' ? 1.5 : 1 }));
  const mod = (id: string, which: keyof typeof m, width: number, finger: Finger | null = null) =>
    cap(id, m[which][0], m[which][1], width, finger);

  const bottomMods =
    os === 'mac'
      ? [mod('ctrl-left', 'ctrl', 1.5), mod('alt-left', 'alt', 1.25), mod('meta-left', 'meta', 1.5)]
      : [mod('ctrl-left', 'ctrl', 1.5), mod('meta-left', 'meta', 1.25), mod('alt-left', 'alt', 1.5)];
  const bottomRight =
    os === 'mac'
      ? [mod('meta-right', 'meta', 1.5), mod('alt-right', 'alt', 1.25)]
      : [mod('alt-right', 'alt', 1.5), mod('ctrl-right', 'ctrl', 1.5)];
  const used = [...bottomMods, ...bottomRight].reduce((s, k) => s + k.width, 0);
  const space: KeyCap = { ...SPACE_KEY, name: 'Space', width: ROW_UNITS - used };

  return [
    [...keys(0), mod('backspace', 'back', 2, 'rp')],
    [mod('tab', 'tab', 1.5, 'lp'), ...keys(1)],
    [mod('caps', 'caps', 1.75, 'lp'), ...keys(2), mod('enter', 'enter', 2.25, 'rp')],
    [mod('shift-left', 'shift', 2.25, 'lp'), ...keys(3), mod('shift-right', 'shift', 2.75, 'rp')],
    [...bottomMods, space, ...bottomRight],
  ];
}

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

const LEFT: ReadonlySet<Finger> = new Set(['lp', 'lr', 'lm', 'li']);

/**
 * Ngón gõ ký tự `ch`, và nếu cần Shift thì phím Shift nào: luôn là Shift ở **tay kia** (ngón út tay kia giữ).
 * Bàn phím ảo và hình bàn tay cùng dùng hàm này để không lệch nhau.
 */
export function fingersForChar(
  ch: string,
): { key: KeyDef; shiftKey: 'shift-left' | 'shift-right' | null; shiftFinger: Finger | null } | null {
  const want = keyForChar(ch);
  const key = want ? keyDef(want.id) : undefined;
  if (!want || !key) return null;
  if (!want.shift) return { key, shiftKey: null, shiftFinger: null };
  return LEFT.has(key.finger)
    ? { key, shiftKey: 'shift-right', shiftFinger: 'rp' }
    : { key, shiftKey: 'shift-left', shiftFinger: 'lp' };
}
