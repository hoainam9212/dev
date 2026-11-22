import { describe, expect, it } from 'vitest';
import { extractTermKeys } from '@office-neko/shared';
import { LESSONS, findTerm } from '../index';
import { EASY } from './index';

const entries = Object.entries(EASY);

function textsOf(e: (typeof EASY)[string]): string[] {
  const steps = Object.values(e.steps ?? {}).flatMap((s) =>
    s.kind === 'explain' ? [s.body]
      : s.kind === 'quiz' ? [s.question, ...(s.choices ?? []), s.why]
        : s.kind === 'practice' ? [s.task, s.hint, ...(s.steps ?? [])]
          : [s.caption]);
  return [e.title, e.osNote?.win, e.osNote?.mac, ...steps].filter((t): t is string => t !== undefined);
}

describe('lời dễ (EASY)', () => {
  it('có ít nhất một bài', () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it('khoá là id bài có thật', () => {
    for (const [id] of entries) expect(LESSONS[id], id).toBeDefined();
  });

  it('vị trí bước tồn tại và loại bước khớp', () => {
    for (const [id, e] of entries) {
      for (const [i, s] of Object.entries(e.steps ?? {})) {
        const step = LESSONS[id]!.steps[Number(i)];
        expect(step, `${id} bước ${i}`).toBeDefined();
        expect(s.kind, `${id} bước ${i}`).toBe(step!.kind);
      }
    }
  });

  it('quiz cùng số lựa chọn với bản gốc; practice có lời giải từng bước không rỗng', () => {
    for (const [id, e] of entries) {
      for (const [i, s] of Object.entries(e.steps ?? {})) {
        const step = LESSONS[id]!.steps[Number(i)]!;
        if (s.kind === 'quiz' && s.choices && step.kind === 'quiz') expect(s.choices.length, `${id} bước ${i}`).toBe(step.choices.length);
        if (s.kind === 'practice' && s.steps) expect(s.steps.length, `${id} bước ${i}`).toBeGreaterThan(0);
      }
    }
  });

  it('không có chuỗi rỗng', () => {
    for (const [id, e] of entries) for (const t of textsOf(e)) expect(t.trim(), id).not.toBe('');
  });

  it('mọi [[thuật ngữ]] đều có trong từ điển', () => {
    const missing = entries.flatMap(([, e]) => textsOf(e)).flatMap(extractTermKeys).filter((k) => !findTerm(k));
    expect(missing).toEqual([]);
  });
});
