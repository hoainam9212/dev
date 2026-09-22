import { MIN_H, SLIDE_H, SLIDE_W, snap, type El, type PptState } from './state';

export type Handle = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';

/** Spec nói bề rộng tối thiểu 60, nhưng mọi kích thước là bội số 8 → 64. */
const MIN_W8 = 64;

/** Màu nền mặc định của hình khối: cam Mochi nhạt. */
export const SHAPE_FILL = '#FFD9B8';

/**
 * Hít về lưới 8px rồi kẹp vào khung. Thứ tự này quan trọng: hít trước thì kẹp
 * luôn cho ra số tròn; kẹp trước thì hít lại có thể đẩy ra ngoài khung một lần nữa.
 */
export function clampEl(el: El): El {
  const w = Math.min(Math.max(snap(el.w), MIN_W8), SLIDE_W);
  const h = Math.min(Math.max(snap(el.h), MIN_H), SLIDE_H);
  const x = Math.min(Math.max(snap(el.x), 0), SLIDE_W - w);
  const y = Math.min(Math.max(snap(el.y), 0), SLIDE_H - h);
  return { ...el, x, y, w, h };
}

/**
 * Đổi kích thước theo tay nắm. Tay nắm ở cạnh trái/trên vừa dời góc vừa thu bề
 * rộng — kéo quá đà thì dừng ở kích thước tối thiểu chứ không lật ngược.
 */
export function resizeBy(el: El, handle: Handle, dx: number, dy: number): El {
  const west = handle.includes('w');
  const east = handle.includes('e');
  const north = handle.startsWith('n');
  const south = handle.startsWith('s');
  const w = east ? el.w + dx : west ? el.w - dx : el.w;
  const h = south ? el.h + dy : north ? el.h - dy : el.h;
  const cw = Math.max(snap(w), MIN_W8);
  const ch = Math.max(snap(h), MIN_H);
  return clampEl({ ...el, w: cw, h: ch, x: west ? el.x + (el.w - cw) : el.x, y: north ? el.y + (el.h - ch) : el.y });
}

/** Đối tượng đang chọn của slide đang mở, hoặc null. */
export function elOf(s: PptState): El | null {
  return s.slides[s.active]?.els.find((e) => e.id === s.sel) ?? null;
}
