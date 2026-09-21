import { describe, it, expect } from 'vitest';
import { plainText } from './schema';
import { blockOf } from './blocks';
import { reduceWord, wordInitial, type WordAction, type WordState } from './state';

const run = (s: WordState, ...as: WordAction[]) => as.reduce(reduceWord, s);
/**
 * Tài liệu ba đoạn: "Tiêu đề", "Đoạn một", "Đoạn hai".
 * `wordInitial` đặt con trỏ ở ĐẦU đoạn, nên phải đưa con trỏ về cuối chữ rồi
 * mới Enter — nếu không sẽ tách ra một đoạn rỗng phía trước.
 */
function threeParagraphs(): WordState {
  let s = run(wordInitial({ text: 'Tiêu đề' }), { type: 'selectText', text: 'Tiêu đề' });
  s = run(s, { type: 'setSelection', from: s.sel.to, to: s.sel.to });
  return run(s, { type: 'splitBlock' }, { type: 'insertText', text: 'Đoạn một' }, { type: 'splitBlock' }, { type: 'insertText', text: 'Đoạn hai' });
}

describe('word blocks', () => {
  it('builds the three-paragraph fixture', () => {
    expect(plainText(threeParagraphs().doc)).toBe('Tiêu đề\nĐoạn một\nĐoạn hai');
  });

  it('defaults to left alignment and single line spacing', () => {
    expect(blockOf(threeParagraphs().doc, 'Đoạn một')).toMatchObject({ type: 'paragraph', align: 'left', lineHeight: '1', list: null, level: 0 });
  });

  it('centres only the selected paragraph', () => {
    const s = run(threeParagraphs(), { type: 'selectText', text: 'Tiêu đề' }, { type: 'setAlign', align: 'center' });
    expect(blockOf(s.doc, 'Tiêu đề')?.align).toBe('center');
    expect(blockOf(s.doc, 'Đoạn một')?.align).toBe('left');
  });

  it('sets line spacing', () => {
    const s = run(threeParagraphs(), { type: 'selectText', text: 'Đoạn hai' }, { type: 'setLineHeight', value: '1.5' });
    expect(blockOf(s.doc, 'Đoạn hai')?.lineHeight).toBe('1.5');
  });

  it('turns a paragraph into Heading 1 and back, keeping alignment', () => {
    let s = run(threeParagraphs(), { type: 'selectText', text: 'Tiêu đề' }, { type: 'setAlign', align: 'center' }, { type: 'setHeading', level: 1 });
    expect(blockOf(s.doc, 'Tiêu đề')).toMatchObject({ type: 'heading', level: 1, align: 'center' });
    s = run(s, { type: 'selectText', text: 'Tiêu đề' }, { type: 'setHeading', level: 0 });
    expect(blockOf(s.doc, 'Tiêu đề')).toMatchObject({ type: 'paragraph', level: 0, align: 'center' });
  });

  it('makes a bullet list, switches it to numbered, then removes it', () => {
    let s = run(threeParagraphs(), { type: 'selectText', text: 'Đoạn một' }, { type: 'toggleList', list: 'bullet' });
    expect(blockOf(s.doc, 'Đoạn một')?.list).toBe('bullet');
    s = run(s, { type: 'selectText', text: 'Đoạn một' }, { type: 'toggleList', list: 'ordered' });
    expect(blockOf(s.doc, 'Đoạn một')?.list).toBe('ordered');
    s = run(s, { type: 'selectText', text: 'Đoạn một' }, { type: 'toggleList', list: 'ordered' });
    expect(blockOf(s.doc, 'Đoạn một')?.list).toBeNull();
    expect(plainText(s.doc)).toBe('Tiêu đề\nĐoạn một\nĐoạn hai');
  });

  it('turns a heading into a plain paragraph when it is put in a list', () => {
    // `listItem` chỉ chứa được đoạn văn (giống TipTap), nên bọc một Heading vào
    // danh sách thì phải hạ nó về đoạn thường — im lặng không làm gì thì người
    // học bấm nút mà tưởng app hỏng.
    let s = run(threeParagraphs(), { type: 'selectText', text: 'Tiêu đề' }, { type: 'setHeading', level: 1 });
    expect(blockOf(s.doc, 'Tiêu đề')?.type).toBe('heading');
    s = run(s, { type: 'selectText', text: 'Tiêu đề' }, { type: 'toggleList', list: 'bullet' });
    expect(blockOf(s.doc, 'Tiêu đề')).toMatchObject({ type: 'paragraph', list: 'bullet' });
  });

  it('applies to every paragraph the selection touches', () => {
    const s = run(threeParagraphs(), { type: 'selectAll' }, { type: 'toggleList', list: 'bullet' });
    for (const t of ['Tiêu đề', 'Đoạn một', 'Đoạn hai']) expect(blockOf(s.doc, t)?.list, t).toBe('bullet');
  });

  it('returns null for text that is not there', () => {
    expect(blockOf(threeParagraphs().doc, 'không có')).toBeNull();
  });
});
