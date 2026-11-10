import { describe, it, expect } from 'vitest';
import { accuracy, compareText, composedAccuracy, countCorrect, recordKey, weakestKeys, wpm } from './index';
import { reduceTyping, typedText, typingInitial } from '../sims/typingSession';

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

describe('composedAccuracy (bài có Telex/VNI)', () => {
  /** Chạy phím qua reducer thật, rồi tính như `typingMetrics` sẽ tính khi nối dây. */
  const run = (target: string, keys: string[], ime: 'telex' | 'vni' = 'telex') => {
    let s = typingInitial({ target, ime });
    keys.forEach((key, i) => (s = reduceTyping(s, { type: 'key', key, at: i * 100 })));
    return composedAccuracy(target, typedText(s), s.keystrokes - s.correctKeys);
  };

  it('gõ đúng "đường" bằng Telex (dduwowngf) → 100% dù 9 phím cho 5 chữ', () => {
    expect(run('đường', [...'dduwowngf'])).toBe(100);
  });

  it('gõ "dương" thay cho "đường" → 3/5 chữ đúng = 60% (đếm theo chữ đích, không theo phím)', () => {
    expect(run('đường ', [...'duwowng '])).toBe(Math.round((4 / 6) * 100));
    expect(composedAccuracy('đường', 'dương', 0)).toBe(60);
  });

  it('VNI: d9u7o7ng2 → 100%', () => {
    expect(run('đường', [...'d9u7o7ng2'], 'vni')).toBe(100);
  });

  it('sửa bằng Backspace khi chữ chưa chốt thì không tính sai', () => {
    expect(run('đi ', ['d', 'd', 'a', 'Backspace', 'i', ' '])).toBe(100);
  });

  it('chữ sai đã chốt (đi qua rồi mới sửa) vẫn tính một lỗi', () => {
    // "da " chốt sai chữ "a", xoá về rồi gõ lại "đi ": 3 chữ đúng + 1 lỗi đã chốt → 75%.
    expect(run('đi ', ['d', 'a', ' ', 'Backspace', 'Backspace', 'Backspace', 'd', 'd', 'i', ' '])).toBe(75);
  });

  it('chưa gõ gì → 100%', () => {
    expect(composedAccuracy('đường', '', 0)).toBe(100);
  });
});
