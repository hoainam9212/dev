import { mouseSim, type SimKind } from '@office-neko/shared';
import type { SimDefinition } from './types';
import { MouseSim } from './mouse/MouseSim';

/** Các trình mô phỏng đã có. Mỗi Component phải dùng `useReducer(def.reduce, initial)`. */
export const SIMS: Partial<Record<SimKind, SimDefinition>> = {
  mouse: { kind: 'mouse', Component: MouseSim, reduce: mouseSim.reduceMouse },
};
