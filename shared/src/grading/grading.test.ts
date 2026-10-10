import { describe, it, expect, afterEach } from 'vitest';
import { gradeWith, grade, GRADERS, type Grader } from './index';
import type { SimKind } from '../types';

type S = { n: number };
type C = { min: number };
const atLeast: Grader<S, C> = (s, c) => ({ ok: s.n >= c.min, messageVi: `Cần ít nhất ${c.min}` });

describe('gradeWith', () => {
  it('passes only when every check passes', () => {
    expect(gradeWith(atLeast, { n: 5 }, [{ min: 1 }, { min: 5 }]).pass).toBe(true);
    const r = gradeWith(atLeast, { n: 3 }, [{ min: 1 }, { min: 5 }]);
    expect(r.pass).toBe(false);
    expect(r.results.map((x) => x.ok)).toEqual([true, false]);
  });
  it('fails with no checks', () => {
    expect(gradeWith(atLeast, { n: 1 }, []).pass).toBe(false);
  });
  it('treats a throwing grader as a failed check', () => {
    const boom: Grader<S, C> = () => {
      throw new Error('x');
    };
    const r = gradeWith(boom, { n: 1 }, [{ min: 0 }]);
    expect(r.pass).toBe(false);
    expect(r.results[0]?.messageVi).toMatch(/thử lại/);
  });
});

describe('grade registry', () => {
  const saved = GRADERS.mouse;
  afterEach(() => {
    GRADERS.mouse = saved;
  });
  it('looks up the grader by sim kind', () => {
    GRADERS.mouse = atLeast;
    expect(grade('mouse', { n: 2 }, [{ min: 2 }]).pass).toBe(true);
  });
  it('throws for sims without a grader', () => {
    // Từ 6A mọi SimKind đều có grader; vẫn giữ nhánh phòng thủ cho kind lạ
    // (ví dụ dữ liệu bài học cũ ghi sai tên sim).
    expect(() => grade('nope' as SimKind, {}, [{}])).toThrow(/nope/);
  });
  it('không sập khi grader trả về undefined vì gặp loại check lạ', () => {
    // Xảy ra thật: bản `shared` cũ còn trong bộ nhớ đệm của Vite không biết loại
    // check mới, `switch` rơi hết nhánh và trả undefined — giao diện nổ ở `r.ok`.
    GRADERS.mouse = (() => undefined) as never;
    const report = grade('mouse', {}, [{ kind: 'loai-check-la' }]);
    expect(report.pass).toBe(false);
    expect(report.results[0]!.ok).toBe(false);
    expect(report.results[0]!.messageVi.length).toBeGreaterThan(10);
  });

  it('registers the real word grader', () => {
    expect(GRADERS.word).toBeDefined();
  });
  it('registers the real excel grader', () => {
    expect(GRADERS.excel).toBeDefined();
  });

  it('registers the real mouse grader', () => {
    expect(saved).toBeDefined();
  });
});
