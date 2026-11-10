import { useEffect, type RefObject } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function focusables(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
}

/**
 * Focus của một hộp thoại: mở thì focus ô nhập đầu tiên (không có ô nhập thì nút đầu tiên
 * không phải nút Đóng `data-dialog-close`), Tab/Shift+Tab đi vòng trong hộp thoại,
 * đóng (hoặc gỡ khỏi trang) thì trả focus về `returnTo` — mặc định là chỗ đang có focus lúc mở,
 * tức nút đã mở hộp thoại. Esc do hộp thoại tự lo vì nó biết cách đóng.
 */
export function useDialogFocus(ref: RefObject<HTMLElement | null>, open: boolean, returnTo?: HTMLElement | null) {
  useEffect(() => {
    const box = ref.current;
    if (!open || !box) return;
    const back = returnTo ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);

    const all = focusables(box);
    const field = box.querySelector<HTMLElement>('input:not([disabled]), select:not([disabled]), textarea:not([disabled])');
    (field ?? all.find((el) => !el.hasAttribute('data-dialog-close')) ?? all[0] ?? box).focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const list = focusables(box);
      if (list.length === 0) {
        e.preventDefault();
        return;
      }
      const first = list[0]!;
      const last = list[list.length - 1]!;
      const at = document.activeElement;
      if (e.shiftKey && (at === first || !box.contains(at))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (at === last || !box.contains(at))) {
        e.preventDefault();
        first.focus();
      }
    };
    box.addEventListener('keydown', trap);
    return () => {
      box.removeEventListener('keydown', trap);
      if (back?.isConnected) back.focus();
    };
  }, [ref, open, returnTo]);
}
