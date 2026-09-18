import { describe, it, expect } from 'vitest';
import { toHiragana, toKatakana, romajiToHiragana, normalizeKana, isKana, hasKanji } from './kana';

describe('toHiragana / toKatakana', () => {
  it('converts scripts and leaves other chars', () => {
    expect(toHiragana('カタカナ 漢字')).toBe('かたかな 漢字');
    expect(toKatakana('ひらがな')).toBe('ヒラガナ');
    expect(toHiragana('ー')).toBe('ー');
  });
});

describe('romajiToHiragana', () => {
  it('converts simple syllables', () => {
    expect(romajiToHiragana('konnichiha')).toBe('こんにちは');
    expect(romajiToHiragana('arigatou')).toBe('ありがとう');
  });
  it('handles sokuon, n, and yōon', () => {
    expect(romajiToHiragana('gakkou')).toBe('がっこう');
    expect(romajiToHiragana('kyou')).toBe('きょう');
    expect(romajiToHiragana('shinbun')).toBe('しんぶん');
    expect(romajiToHiragana('kinen')).toBe('きねん');
    expect(romajiToHiragana("kin'en")).toBe('きんえん');
    expect(romajiToHiragana('hon')).toBe('ほん');
    expect(romajiToHiragana('tsu')).toBe('つ');
    expect(romajiToHiragana('ja')).toBe('じゃ');
    expect(romajiToHiragana('cha')).toBe('ちゃ');
    expect(romajiToHiragana('matcha')).toBe('まっちゃ');
  });
  it('keeps unknown characters', () => {
    expect(romajiToHiragana('a-b')).toBe('あーb');
    expect(romajiToHiragana('a?')).toBe('あ?');
  });
});

describe('normalizeKana', () => {
  it('normalizes katakana, romaji, spaces and width', () => {
    expect(normalizeKana('トウキョウ')).toBe('とうきょう');
    expect(normalizeKana('toukyou')).toBe('とうきょう');
    expect(normalizeKana('とう きょう。')).toBe('とうきょう');
    expect(normalizeKana('ｶﾀｶﾅ')).toBe('かたかな');
  });
  it('is case-insensitive for romaji', () => {
    expect(normalizeKana('Sakura')).toBe('さくら');
  });
  it('keeps the long vowel mark', () => {
    expect(normalizeKana('コーヒー')).toBe('こーひー');
  });
});

describe('isKana / hasKanji', () => {
  it('detects scripts', () => {
    expect(isKana('さくら')).toBe(true);
    expect(isKana('サクラー')).toBe(true);
    expect(isKana('桜')).toBe(false);
    expect(isKana('')).toBe(false);
    expect(hasKanji('桜が咲く')).toBe(true);
    expect(hasKanji('さくら')).toBe(false);
  });
});
