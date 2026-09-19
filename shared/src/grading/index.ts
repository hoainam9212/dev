import type { SimKind } from '../types';
import { gradeWith, type GradeReport, type Grader } from './core';

export * from './core';

/** Mỗi giai đoạn thêm grader của trình mô phỏng mình vào đây. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GRADERS: Partial<Record<SimKind, Grader<any, any>>> = {};

export function grade(sim: SimKind, state: unknown, checks: unknown[]): GradeReport {
  const g = GRADERS[sim];
  if (!g) throw new Error(`No grader for sim "${sim}"`);
  return gradeWith(g, state, checks);
}
