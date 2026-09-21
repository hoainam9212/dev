import type { SimKind } from '../types';
import { gradeWith, type GradeReport, type Grader } from './core';
import { gradeMouse } from '../sims/mouse';
import { gradeDesktop } from '../sims/desktop';
import { gradeTyping } from '../sims/typingSession';
import { gradeFish } from '../sims/fishSim';

export * from './core';

/** Mỗi giai đoạn thêm grader của trình mô phỏng mình vào đây. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GRADERS: Partial<Record<SimKind, Grader<any, any>>> = {
  mouse: gradeMouse,
  desktop: gradeDesktop,
  keyboard: gradeTyping,
  fish: gradeFish,
};

export function grade(sim: SimKind, state: unknown, checks: unknown[]): GradeReport {
  const g = GRADERS[sim];
  if (!g) throw new Error(`No grader for sim "${sim}"`);
  return gradeWith(g, state, checks);
}
