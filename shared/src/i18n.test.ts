import { describe, expect, it } from 'vitest';
import { pickList, pickText, vocabMeanings } from './i18n';
import type { Vocab } from './types';

describe('pickText', () => {
  it('returns the selected language', () => {
    expect(pickText('xin chào', 'hello', 'vi')).toBe('xin chào');
    expect(pickText('xin chào', 'hello', 'en')).toBe('hello');
  });
  it('falls back to the other language when missing or empty', () => {
    expect(pickText(undefined, 'hello', 'vi')).toBe('hello');
    expect(pickText('', 'hello', 'vi')).toBe('hello');
    expect(pickText('xin chào', undefined, 'en')).toBe('xin chào');
    expect(pickText('xin chào', '', 'en')).toBe('xin chào');
  });
  it("returns '' when both are missing", () => {
    expect(pickText(undefined, undefined, 'vi')).toBe('');
  });
});

describe('pickList', () => {
  it('prefers a non-empty list of the selected language', () => {
    expect(pickList(['mèo'], ['cat'], 'vi')).toEqual(['mèo']);
    expect(pickList(['mèo'], ['cat'], 'en')).toEqual(['cat']);
  });
  it('falls back when the selected list is empty or missing', () => {
    expect(pickList([], ['cat'], 'vi')).toEqual(['cat']);
    expect(pickList(undefined, ['cat'], 'vi')).toEqual(['cat']);
    expect(pickList(undefined, undefined, 'en')).toEqual([]);
  });
});

it('vocabMeanings uses meaningsVi in vi and meanings in en', () => {
  const v = { meanings: ['cat'], meaningsVi: ['con mèo'] } as Vocab;
  expect(vocabMeanings(v, 'vi')).toEqual(['con mèo']);
  expect(vocabMeanings(v, 'en')).toEqual(['cat']);
});
