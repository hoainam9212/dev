import { describe, it, expect } from 'vitest';
import { extractTermKeys, parseInline, parseRich } from './rich';

describe('parseInline', () => {
  it('parses bold, terms with labels and shortcuts', () => {
    expect(parseInline('Bấm **Lưu** hoặc {{mod+s}} để [[save|lưu]] [[Cell]].')).toEqual([
      { t: 'text', v: 'Bấm ' },
      { t: 'b', v: 'Lưu' },
      { t: 'text', v: ' hoặc ' },
      { t: 'kbd', combo: 'mod+s' },
      { t: 'text', v: ' để ' },
      { t: 'term', key: 'save', label: 'lưu' },
      { t: 'text', v: ' ' },
      { t: 'term', key: 'Cell', label: 'Cell' },
      { t: 'text', v: '.' },
    ]);
  });
});

describe('parseRich', () => {
  it('splits paragraphs and bullet lists', () => {
    const blocks = parseRich('Dòng một\ncòn tiếp.\n\n- A\n- **B**\n\n');
    expect(blocks).toEqual([
      { type: 'p', inlines: [{ t: 'text', v: 'Dòng một còn tiếp.' }] },
      { type: 'ul', items: [[{ t: 'text', v: 'A' }], [{ t: 'b', v: 'B' }]] },
    ]);
  });
  it('returns nothing for blank text', () => {
    expect(parseRich('   ')).toEqual([]);
  });
});

describe('extractTermKeys', () => {
  it('lists term keys', () => {
    expect(extractTermKeys('[[mouse|chuột]] và [[keyboard]] {{mod+c}}')).toEqual(['mouse', 'keyboard']);
  });
});
