import { describe, it, expect } from 'vitest';
import { parseFurigana, stripFurigana, furiganaToKana } from './furigana';

describe('furigana markup', () => {
  const s = 'わたしは[日本語|にほんご]を[勉強|べんきょう]します。';
  it('parses into segments', () => {
    expect(parseFurigana(s)).toEqual([
      { text: 'わたしは' },
      { text: '日本語', ruby: 'にほんご' },
      { text: 'を' },
      { text: '勉強', ruby: 'べんきょう' },
      { text: 'します。' },
    ]);
  });
  it('strips and converts', () => {
    expect(stripFurigana(s)).toBe('わたしは日本語を勉強します。');
    expect(furiganaToKana(s)).toBe('わたしはにほんごをべんきょうします。');
  });
  it('handles text without markup', () => {
    expect(parseFurigana('こんにちは')).toEqual([{ text: 'こんにちは' }]);
    expect(stripFurigana('')).toBe('');
  });
});
