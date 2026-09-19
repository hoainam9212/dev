import type { SimKind } from '@office-neko/shared';
import type { SimDefinition } from './types';

/** Các giai đoạn sau đăng ký trình mô phỏng tại đây (song song với GRADERS trong shared). */
export const SIMS: Partial<Record<SimKind, SimDefinition>> = {};
