import { describe, it, expect } from 'vitest';
import { IMAGE_LIBRARY, cellText, imagesOf, tableSizeOf } from './objects';
import { reduceWord, wordInitial, type WordAction, type WordState } from './state';

const run = (s: WordState, ...as: WordAction[]) => as.reduce(reduceWord, s);

describe('word tables', () => {
  it('inserts a table of the requested size', () => {
    const s = run(wordInitial({ text: 'Bảng điểm' }), { type: 'insertTable', rows: 3, cols: 2 });
    expect(tableSizeOf(s.doc)).toEqual({ rows: 3, cols: 2 });
  });

  it('fills cells and reads them back', () => {
    const s = run(wordInitial(), { type: 'insertTable', rows: 2, cols: 2 },
      { type: 'fillCell', row: 0, col: 0, text: 'Môn' },
      { type: 'fillCell', row: 1, col: 1, text: '9' });
    expect(cellText(s.doc, 0, 0)).toBe('Môn');
    expect(cellText(s.doc, 1, 1)).toBe('9');
    expect(cellText(s.doc, 5, 5)).toBeNull();
  });

  it('adds and removes rows and columns', () => {
    let s = run(wordInitial(), { type: 'insertTable', rows: 2, cols: 2 }, { type: 'tableRow', op: 'add' });
    expect(tableSizeOf(s.doc)).toEqual({ rows: 3, cols: 2 });
    s = run(s, { type: 'tableCol', op: 'add' });
    expect(tableSizeOf(s.doc)).toEqual({ rows: 3, cols: 3 });
    s = run(s, { type: 'tableRow', op: 'remove' }, { type: 'tableCol', op: 'remove' });
    expect(tableSizeOf(s.doc)).toEqual({ rows: 2, cols: 2 });
  });

  it('never destroys the last body row or column', () => {
    let s = run(wordInitial(), { type: 'insertTable', rows: 2, cols: 1 }, { type: 'tableRow', op: 'remove' });
    const size = tableSizeOf(s.doc);
    s = run(s, { type: 'tableCol', op: 'remove' });
    expect(tableSizeOf(s.doc)).toEqual(size);
  });

  it('ignores table actions outside a table', () => {
    const s = wordInitial({ text: 'Không có bảng' });
    expect(reduceWord(s, { type: 'tableRow', op: 'add' })).toEqual(s);
    expect(tableSizeOf(s.doc)).toBeNull();
  });
});

describe('word images', () => {
  it('ships a small library of local images', () => {
    expect(IMAGE_LIBRARY.length).toBeGreaterThanOrEqual(6);
    for (const i of IMAGE_LIBRARY) {
      expect(i.src.startsWith('/images/word/')).toBe(true);
      expect(i.src.endsWith('.svg')).toBe(true);
      expect(i.alt.length, i.src).toBeGreaterThan(2);
    }
    // Không trùng file và không trùng tên gọi.
    expect(new Set(IMAGE_LIBRARY.map((i) => i.src)).size).toBe(IMAGE_LIBRARY.length);
    expect(new Set(IMAGE_LIBRARY.map((i) => i.alt)).size).toBe(IMAGE_LIBRARY.length);
  });

  it('inserts an image with alt text and default width', () => {
    const s = run(wordInitial({ text: 'Ảnh của tôi' }), { type: 'insertImage', src: '/images/word/meo.svg', alt: 'Mèo Mochi' });
    expect(imagesOf(s.doc)).toEqual([{ src: '/images/word/meo.svg', alt: 'Mèo Mochi', width: '40%' }]);
  });

  it('resizes the image', () => {
    const s = run(wordInitial(), { type: 'insertImage', src: '/images/word/meo.svg', alt: 'Mèo' }, { type: 'setImageWidth', width: '100%' });
    expect(imagesOf(s.doc)[0]?.width).toBe('100%');
  });

  it('counts several images', () => {
    const s = run(wordInitial(), { type: 'insertImage', src: '/images/word/a.svg', alt: 'a' }, { type: 'insertImage', src: '/images/word/b.svg', alt: 'b' });
    expect(imagesOf(s.doc)).toHaveLength(2);
  });
});
