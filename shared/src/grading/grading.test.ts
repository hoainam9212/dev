import { describe, it, expect, afterEach } from 'vitest';
import { gradeWith, grade, GRADERS, type Grader } from './index';

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
    expect(() => grade('excel', {}, [{}])).toThrow(/excel/);
  });
  it('registers the real word grader', () => {
    expect(GRADERS.word).toBeDefined();
  });

  it('registers the real mouse grader', () => {
    expect(saved).toBeDefined();
  });
});
