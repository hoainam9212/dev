import { describe, it, expect } from 'vitest';
import { gradeTyping, reduceTyping, typedText, typingInitial, typingMetrics, type TypingAction, type TypingState } from './typingSession';

function typeAll(s: TypingState, keys: string[], start = 1000, step = 200): TypingState {
  return keys.reduce((acc, key, i) => reduceTyping(acc, { type: 'key', key, at: start + i * step } as TypingAction), s);
}

describe('typing session (no IME)', () => {
  it('tracks correct and wrong keys and finishes on exact text', () => {
    let s = typingInitial({ target: 'asdf' });
    s = typeAll(s, ['a', 'x']);
    expect(typedText(s)).toBe('ax');
    expect(s.keystrokes).toBe(2);
    expect(s.correctKeys).toBe(1);
    s = typeAll(s, ['Backspace', 'd', 'f'], 2000);
    expect(typedText(s)).toBe('adf');
    s = reduceTyping(s, { type: 'key', key: 'Backspace', at: 3000 });
    s = reduceTyping(s, { type: 'key', key: 'Backspace', at: 3100 });
    s = typeAll(s, ['s', 'd', 'f'], 3200);
    expect(s.finished).toBe(true);
    expect(s.keyStats.x).toEqual({ hit: 0, miss: 1 });
  });

  it('ignores backspace when not allowed and extra keys past the end', () => {
    let s = typingInitial({ target: 'ab', allowBackspace: false });
    s = typeAll(s, ['a', 'Backspace', 'b', 'c']);
    expect(typedText(s)).toBe('ab');
    expect(s.keystrokes).toBe(2);
  });

  it('ignores modifier-like keys', () => {
    const s = typeAll(typingInitial({ target: 'a' }), ['Shift', 'a']);
    expect(s.keystrokes).toBe(1);
    expect(s.finished).toBe(true);
  });

  it('computes metrics', () => {
    const s = typeAll(typingInitial({ target: 'hello world' }), [...'hello world'], 0, 240);
    const m = typingMetrics(s);
    expect(m.complete).toBe(true);
    expect(m.accuracy).toBe(100);
    expect(m.elapsedMs).toBe(2400);
    expect(m.wpm).toBe(55);
  });

  it('ends a timed test on tick', () => {
    let s = typingInitial({ target: 'abcdefghij', mode: 'test', durationSec: 1 });
    s = typeAll(s, ['a', 'b'], 0, 100);
    s = reduceTyping(s, { type: 'tick', at: 500 });
    expect(s.finished).toBe(false);
    s = reduceTyping(s, { type: 'tick', at: 1000 });
    expect(s.finished).toBe(true);
    expect(typingMetrics(s).elapsedMs).toBe(1000);
  });

  it('drops keys once typed is already wrong but at full length', () => {
    let s = typingInitial({ target: 'ab' });
    s = typeAll(s, ['a', 'x']);
    expect(typedText(s)).toBe('ax');
    expect(s.finished).toBe(false);
    expect(s.keystrokes).toBe(2);
    s = reduceTyping(s, { type: 'key', key: 'y', at: 1400 });
    expect(typedText(s)).toBe('ax');
    expect(s.keystrokes).toBe(2);
  });

  it('ends a timed test when the timeout is discovered on a key action', () => {
    let s = typingInitial({ target: 'abcdefghij', mode: 'test', durationSec: 1 });
    s = reduceTyping(s, { type: 'key', key: 'a', at: 0 });
    s = reduceTyping(s, { type: 'key', key: 'b', at: 1500 });
    expect(s.finished).toBe(true);
    expect(s.lastAt).toBe(s.startedAt! + 1000);
    expect(s.keystrokes).toBe(1);
  });
});

describe('typing session (Telex/VNI)', () => {
  it('composes Vietnamese and does not punish in-word composition', () => {
    let s = typingInitial({ target: 'tiếng Việt', ime: 'telex' });
    s = typeAll(s, [...'tieengs Vieetj']);
    expect(typedText(s)).toBe('tiếng Việt');
    expect(s.finished).toBe(true);
    expect(s.correctKeys).toBe(s.keystrokes);
  });

  it('counts a wrong committed word as a mistake', () => {
    let s = typingInitial({ target: 'ba mẹ', ime: 'telex' });
    s = typeAll(s, [...'bo ']);
    expect(s.correctKeys).toBe(s.keystrokes - 1);
  });

  it('supports VNI', () => {
    const s = typeAll(typingInitial({ target: 'được', ime: 'vni' }), [...'d9u7o7c5']);
    expect(typedText(s)).toBe('được');
    expect(s.finished).toBe(true);
  });

  it('độ chính xác Telex đếm theo chữ đã ghép: gõ đúng 100%, sai dấu thì tụt theo chữ chứ không theo phím', () => {
    const right = typeAll(typingInitial({ target: 'đường ', ime: 'telex' }), [...'dduwowngf ']);
    expect(typingMetrics(right).accuracy).toBe(100);
    // "dương " thay "đường ": đúng 4/6 chữ → 67% (đếm theo phím thì 7/8 = 88%).
    const wrong = typeAll(typingInitial({ target: 'đường ', ime: 'telex' }), [...'duwowng ']);
    expect(typingMetrics(wrong).accuracy).toBe(67);
  });
});

describe('gradeTyping', () => {
  it('requires completion when speed or accuracy is checked', () => {
    let s = typingInitial({ target: 'abc' });
    s = typeAll(s, ['a', 'b'], 0, 100);
    expect(gradeTyping(s, { kind: 'typing', minWpm: 1 }).ok).toBe(false);
    s = typeAll(s, ['c'], 200);
    expect(gradeTyping(s, { kind: 'typing', minWpm: 1, minAccuracy: 90 }).ok).toBe(true);
    expect(gradeTyping(s, { kind: 'typing', minWpm: 1000 }).messageVi).toMatch(/WPM/);
  });
  it('checks full text', () => {
    let s = typingInitial({ target: 'ab' });
    expect(gradeTyping(s, { kind: 'typing', completeText: true }).ok).toBe(false);
    s = typeAll(s, ['a', 'b']);
    expect(gradeTyping(s, { kind: 'typing', completeText: true }).ok).toBe(true);
  });
  it('returns a sensible message when the check has no fields set', () => {
    const s = typingInitial({ target: 'ab' });
    const r = gradeTyping(s, { kind: 'typing' });
    expect(r.ok).toBe(true);
    expect(r.messageVi).not.toBe('.');
    expect(r.messageVi.length).toBeGreaterThan(1);
  });
});
