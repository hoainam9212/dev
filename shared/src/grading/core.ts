export interface CheckResult {
  ok: boolean;
  messageVi: string;
}
export type Grader<S = unknown, C = unknown> = (state: S, check: C) => CheckResult;
export interface GradeReport {
  pass: boolean;
  results: CheckResult[];
}

const FALLBACK: CheckResult = { ok: false, messageVi: 'Mochi chưa kiểm tra được bước này, bạn thử lại nhé.' };

export function gradeWith<S, C>(grader: Grader<S, C>, state: S, checks: C[]): GradeReport {
  const results = checks.map((c) => {
    try {
      // Grader trả undefined khi gặp loại check nó chưa biết (switch rơi hết
      // nhánh). Không được để undefined lọt ra: giao diện đọc `r.ok` và sẽ nổ,
      // làm sập cả bài học thay vì chỉ báo một câu.
      return grader(state, c) ?? FALLBACK;
    } catch {
      return FALLBACK;
    }
  });
  return { pass: results.length > 0 && results.every((r) => r.ok), results };
}
