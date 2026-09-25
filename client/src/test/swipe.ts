import { createEvent, fireEvent } from '@testing-library/react';

// jsdom has no PointerEvent, so fireEvent drops `pointerType`; attach it by hand.
export function pointer(
  kind: 'pointerDown' | 'pointerUp' | 'pointerCancel',
  el: Element,
  x: number,
  y: number,
  pointerType = 'touch',
) {
  const ev = createEvent[kind](el, { clientX: x, clientY: y, pointerId: 1 });
  Object.defineProperty(ev, 'pointerType', { value: pointerType });
  fireEvent(el, ev);
}

export function swipe(el: Element, from: [number, number], to: [number, number], pointerType = 'touch') {
  pointer('pointerDown', el, from[0], from[1], pointerType);
  pointer('pointerUp', el, to[0], to[1], pointerType);
}

/** Finger moves right-to-left: the next item. */
export const swipeLeft = (el: Element) => swipe(el, [300, 400], [120, 405]);
/** Finger moves left-to-right: the previous item. */
export const swipeRight = (el: Element) => swipe(el, [100, 400], [280, 405]);
