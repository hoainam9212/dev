import { describe, it, expect } from 'vitest';
import { PLACEMENT_QUIZ } from './placement';
import { TRACKS } from './tracks';

describe('PLACEMENT_QUIZ', () => {
  const entries = Object.entries(PLACEMENT_QUIZ);

  it('covers basics, word, excel and ppt, all real tracks', () => {
    expect(entries.map(([id]) => id).sort()).toEqual(['basics', 'excel', 'ppt', 'word']);
    for (const [id] of entries) expect(TRACKS.some((t) => t.id === id)).toBe(true);
  });

  it('has exactly 6 questions per track', () => {
    for (const [, quiz] of entries) expect(quiz).toHaveLength(6);
  });

  it('points every answer at an existing choice', () => {
    for (const [, quiz] of entries) {
      for (const q of quiz) {
        expect(Number.isInteger(q.answer)).toBe(true);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(q.choices.length);
      }
    }
  });

  it('never says "tab" (the app says "thẻ")', () => {
    for (const [, quiz] of entries) {
      for (const q of quiz) {
        expect([q.question, q.why, ...q.choices].join(' ')).not.toMatch(/\btab\b/i);
      }
    }
  });

  it('is NFC Vietnamese', () => {
    for (const [, quiz] of entries) {
      for (const q of quiz) expect(q.question).toBe(q.question.normalize('NFC'));
    }
  });
});
