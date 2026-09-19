import { describe, it, expect } from 'vitest';
import { levenshtein, normalize, searchItems } from './index';

const items = [
  { term: 'Cell', vi: 'Ô tính' },
  { term: 'Formula', vi: 'Công thức' },
  { term: 'Formula Bar', vi: 'Thanh công thức' },
  { term: 'Folder', vi: 'Thư mục' },
];
const fields = (i: { term: string; vi: string }) => [i.term, i.vi];

describe('normalize', () => {
  it('strips Vietnamese diacritics, đ and extra spaces', () => {
    expect(normalize('  Đường   Dẫn ')).toBe('duong dan');
    expect(normalize('Ô tính')).toBe('o tinh');
  });
});

describe('levenshtein', () => {
  it('counts edits', () => {
    expect(levenshtein('formla', 'formula')).toBe(1);
    expect(levenshtein('abc', 'abc')).toBe(0);
    expect(levenshtein('', 'ab')).toBe(2);
  });
});

describe('searchItems', () => {
  it('matches without diacritics', () => {
    expect(searchItems(items, 'o tinh', fields)[0]?.item.term).toBe('Cell');
  });
  it('ranks exact field matches first', () => {
    const r = searchItems(items, 'cong thuc', fields).map((h) => h.item.term);
    expect(r).toEqual(['Formula', 'Formula Bar']);
  });
  it('tolerates one typo in longer words', () => {
    const r = searchItems(items, 'formla', fields).map((h) => h.item.term);
    expect(r).toEqual(['Formula', 'Formula Bar']);
  });
  it('returns nothing for empty or unknown queries', () => {
    expect(searchItems(items, '   ', fields)).toEqual([]);
    expect(searchItems(items, 'xyz', fields)).toEqual([]);
  });
  it('respects limit', () => {
    expect(searchItems(items, 'f', fields, { limit: 1 })).toHaveLength(1);
  });
  it('supports loose question matching with stopwords', () => {
    const faq = [{ q: 'Làm sao mở Từ điển?' }, { q: 'Lưu file thế nào?' }];
    const r = searchItems(faq, 'cách mở từ điển vậy', (f) => [f.q], { stopwords: true, minMatch: 0.5 });
    expect(r[0]?.item.q).toBe('Làm sao mở Từ điển?');
    expect(r).toHaveLength(1);
  });
});
