import { describe, it, expect } from 'vitest';
import { accuracy, compareText, countCorrect, recordKey, weakestKeys, wpm } from './index';

describe('compareText', () => {
  it('marks each target char', () => {
    expect(compareText('mèo', 'mé')).toEqual(['correct', 'wrong', 'pending']);
    expect(compareText('ab', '')).toEqual(['pending', 'pending']);
  });
  it('counts correct chars', () => {
    expect(countCorrect('xin chào', 'xin chao')).toBe(7);
  });
});

describe('wpm / accuracy', () => {
  it('computes words per minute from correct chars', () => {
    expect(wpm(250, 60_000)).toBe(50);
    expect(wpm(125, 30_000)).toBe(50);
    expect(wpm(10, 0)).toBe(0);
  });
  it('computes accuracy percent', () => {
    expect(accuracy(95, 100)).toBe(95);
    expect(accuracy(2, 3)).toBe(67);
    expect(accuracy(0, 0)).toBe(100);
  });
});

describe('key stats', () => {
  it('records hits and misses case-insensitively without mutating', () => {
    const a = recordKey({}, 'A', true);
    const b = recordKey(a, 'a', false);
    expect(a).toEqual({ a: { hit: 1, miss: 0 } });
    expect(b).toEqual({ a: { hit: 1, miss: 1 } });
  });
  it('finds weakest keys by miss rate with a minimum number of attempts', () => {
    let s = {};
    for (let i = 0; i < 4; i++) s = recordKey(s, 'j', i < 2);
    for (let i = 0; i < 4; i++) s = recordKey(s, 'k', i < 3);
    s = recordKey(s, 'q', false);
    expect(weakestKeys(s, 5, 3)).toEqual(['j', 'k']);
  });
});
