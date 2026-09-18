import { describe, it, expect } from 'vitest';
import { LEVELS, isKana, parseFurigana, stripFurigana } from '@nihongo/shared';
import { READING } from '../authored/reading';
import { LISTENING } from '../authored/listening';

describe('authored reading lessons', () => {
  it('has at least 3 lessons per level with unique ids', () => {
    for (const l of LEVELS) expect(READING.filter((r) => r.level === l).length, l).toBeGreaterThanOrEqual(3);
    expect(new Set(READING.map((r) => r.id)).size).toBe(READING.length);
  });
  it('questions have 4 choices and a valid answer; furigana markup is well-formed', () => {
    for (const r of READING) {
      expect(r.questions.length, r.id).toBeGreaterThanOrEqual(2);
      for (const q of r.questions) {
        expect(q.choices.length, q.id).toBe(4);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(4);
      }
      const segs = parseFurigana(r.body);
      expect(segs.some((s) => s.ruby), r.id).toBe(true);
      expect(stripFurigana(r.body)).not.toMatch(/[[\]|]/);
      for (const v of r.vocab) expect(stripFurigana(r.body), `${r.id} vocab ${v.word}`).toContain([...v.word][0]!);
    }
  });
});

describe('authored listening lessons', () => {
  it('has at least 3 lessons per level, kana-only dictation and valid questions', () => {
    for (const l of LEVELS) expect(LISTENING.filter((r) => r.level === l).length, l).toBeGreaterThanOrEqual(3);
    expect(new Set(LISTENING.map((r) => r.id)).size).toBe(LISTENING.length);
    for (const s of LISTENING) {
      expect(s.script.length).toBeGreaterThanOrEqual(4);
      for (const line of s.script) expect(line.vi.length, s.id).toBeGreaterThan(0);
      expect(s.dictation.length).toBeGreaterThanOrEqual(2);
      for (const d of s.dictation) expect(isKana(d), `${s.id}: ${d}`).toBe(true);
      for (const q of s.questions) {
        expect(q.choices.length).toBe(4);
        expect(q.answer).toBeLessThan(4);
      }
    }
  });
});
