import { useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';

/**
 * Kéo bằng con trỏ, quy về px của khung gốc 960x540. `scale` đọc lại **tại lúc bắt
 * đầu kéo** (cửa sổ có thể vừa đổi cỡ), và mỗi bước chỉ báo phần **chênh so với lần
 * trước**, nên reducer chỉ cần cộng dồn. Chia cho `scale`, không nhân — nhân thì
 * hình chạy chậm hơn con trỏ và jsdom không bao giờ bắt được.
 */
export function useDrag(onMove: (dx: number, dy: number) => void, getScale: () => number) {
  const last = useRef<{ x: number; y: number; k: number } | null>(null);
  return {
    onPointerDown(e: ReactPointerEvent) {
      e.preventDefault();
      e.stopPropagation();
      (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
      last.current = { x: e.clientX, y: e.clientY, k: getScale() || 1 };
    },
    onPointerMove(e: ReactPointerEvent) {
      const l = last.current;
      if (!l) return;
      const dx = (e.clientX - l.x) / l.k;
      const dy = (e.clientY - l.y) / l.k;
      // Chỉ báo khi đã đi đủ một ô lưới, kẻo mỗi pixel một action làm state nhảy loạn.
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      last.current = { ...l, x: e.clientX, y: e.clientY };
      onMove(dx, dy);
    },
    onPointerUp(e: ReactPointerEvent) {
      (e.currentTarget as Element).releasePointerCapture?.(e.pointerId);
      last.current = null;
    },
  };
}
