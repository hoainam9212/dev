/**
 * Chỗ đặt menu chuột phải mở tại (x, y) trong một khung `boxW × boxH` (toạ độ tính từ góc trên trái khung) sao cho
 * menu nằm trọn trong khung, cách mép `margin`. Như menu thật: hết chỗ bên phải thì lùi sang trái; hết chỗ bên dưới
 * thì lật lên trên con trỏ; trên cũng không đủ thì dính đáy khung. Menu to hơn khung thì bám góc trên trái.
 */
export function clampMenu(x: number, y: number, menuW: number, menuH: number, boxW: number, boxH: number, margin = 4) {
  const left = Math.max(margin, Math.min(x, boxW - menuW - margin));
  let top = y;
  if (y + menuH > boxH - margin) top = y - menuH >= margin ? y - menuH : boxH - menuH - margin;
  return { left, top: Math.max(margin, top) };
}

/** Phím mở menu chuột phải: Shift+F10 hoặc phím Menu (≣) trên bàn phím Windows. */
export const isMenuKey = (e: { key: string; shiftKey: boolean }) => (e.shiftKey && e.key === 'F10') || e.key === 'ContextMenu';

/** Đo khung và menu rồi kẹp; chưa đo được (jsdom, chưa vẽ) thì giữ nguyên toạ độ con trỏ. */
export function clampMenuIn(box: HTMLElement | null, menu: HTMLElement | null, x: number, y: number) {
  const bw = box?.clientWidth ?? 0;
  const bh = box?.clientHeight ?? 0;
  if (!menu || bw === 0 || bh === 0) return { left: x, top: y };
  return clampMenu(x, y, menu.offsetWidth, menu.offsetHeight, bw, bh);
}
