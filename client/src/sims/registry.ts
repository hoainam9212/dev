import { desktopSim, mouseSim, typingSim, type SimKind } from '@office-neko/shared';
import type { SimDefinition } from './types';
import { MouseSim } from './mouse/MouseSim';
import { DesktopSim } from './desktop/DesktopSim';
import { KeyboardSim } from './keyboard/KeyboardSim';

/** Các trình mô phỏng đã có. Mỗi Component phải dùng `useReducer(def.reduce, initial)`. */
export const SIMS: Partial<Record<SimKind, SimDefinition>> = {
  mouse: { kind: 'mouse', Component: MouseSim, reduce: mouseSim.reduceMouse },
  desktop: { kind: 'desktop', Component: DesktopSim, reduce: desktopSim.reduceDesktop },
  keyboard: { kind: 'keyboard', Component: KeyboardSim, reduce: typingSim.reduceTyping },
};
