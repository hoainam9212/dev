export interface CheckResult {
  ok: boolean;
  messageVi: string;
}
export type Grader<S = unknown, C = unknown> = (state: S, check: C) => CheckResult;
export interface GradeReport {
  pass: boolean;
  results: CheckResult[];
}

export function gradeWith<S, C>(grader: Grader<S, C>, state: S, checks: C[]): GradeReport {
  const results = checks.map((c) => {
    try {
      return grader(state, c);
    } catch {
      return { ok: false, messageVi: 'Mochi chưa kiểm tra được bước này, bạn thử lại nhé.' };
    }
  });
  return { pass: results.length > 0 && results.every((r) => r.ok), results };
}
