import { describe, it, expect } from 'vitest';
import { plainText } from './schema';
import { findText, reduceWord, selectedText, wordInitial, type WordAction, type WordState } from './state';

const run = (s: WordState, ...as: WordAction[]) => as.reduce(reduceWord, s);
const text = (s: WordState) => plainText(s.doc);

describe('word text editing', () => {
  it('starts empty with the cursor inside the first paragraph', () => {
    const s = wordInitial();
    expect(text(s)).toBe('');
    expect(s.sel).toEqual({ from: 1, to: 1 });
    expect(s.past).toEqual([]);
    expect(s.saved).toBeNull();
    expect(s.dialog).toBeNull();
  });

  it('types text at the cursor', () => {
    const s = run(wordInitial(), { type: 'insertText', text: 'Kính gửi' }, { type: 'insertText', text: ' Quý công ty' });
    expect(text(s)).toBe('Kính gửi Quý công ty');
    expect(s.past).toHaveLength(2);
  });

  it('selects a phrase by its text, not by numbers', () => {
    let s = run(wordInitial({ text: 'Tôi tên là Nam, tôi rất vui' }), { type: 'selectText', text: 'Nam' });
    expect(selectedText(s)).toBe('Nam');
    s = run(s, { type: 'insertText', text: 'Lan' });
    expect(text(s)).toBe('Tôi tên là Lan, tôi rất vui');
  });

  it('finds the nth occurrence and ignores missing text', () => {
    const s = wordInitial({ text: 'mèo và mèo' });
    expect(findText(s.doc, 'mèo', 2)).not.toEqual(findText(s.doc, 'mèo', 1));
    expect(findText(s.doc, 'chó')).toBeNull();
    expect(run(s, { type: 'selectText', text: 'chó' })).toEqual(s);
  });

  it('selects the nth occurrence across paragraphs', () => {
    const s = run(
      wordInitial({ text: 'mèo một' }),
      { type: 'selectText', text: 'một' },
      { type: 'setSelection', from: 8, to: 8 },
      { type: 'splitBlock' },
      { type: 'insertText', text: 'mèo hai' },
      { type: 'selectText', text: 'mèo', nth: 2 },
      { type: 'insertText', text: 'CÁ' },
    );
    expect(text(s)).toBe('mèo một\nCÁ hai');
  });

  it('backspaces a character and a selection', () => {
    let s = run(wordInitial({ text: 'Xin chàoo' }), { type: 'setSelection', from: 10, to: 10 }, { type: 'backspace' });
    expect(text(s)).toBe('Xin chào');
    s = run(s, { type: 'selectText', text: 'Xin ' }, { type: 'backspace' });
    expect(text(s)).toBe('chào');
  });

  it('does nothing when backspacing an empty document', () => {
    const s = wordInitial();
    expect(reduceWord(s, { type: 'backspace' })).toEqual(s);
  });

  it('splits a paragraph at the cursor with Enter', () => {
    let s = run(wordInitial({ text: 'Dòng mộtDòng hai' }), { type: 'selectText', text: 'Dòng hai' });
    // Đưa con trỏ về ngay TRƯỚC "Dòng hai" rồi mới Enter.
    s = run(s, { type: 'setSelection', from: s.sel.from, to: s.sel.from }, { type: 'splitBlock' });
    expect(text(s)).toBe('Dòng một\nDòng hai');
  });

  it('replaces the selection when Enter is pressed with text selected', () => {
    const s = run(wordInitial({ text: 'Dòng mộtBỏ điDòng hai' }), { type: 'selectText', text: 'Bỏ đi' }, { type: 'splitBlock' });
    expect(text(s)).toBe('Dòng một\nDòng hai');
  });

  it('selects everything', () => {
    const s = run(wordInitial({ text: 'Một hai' }), { type: 'selectAll' });
    expect(selectedText(s)).toBe('Một hai');
  });

  it('undoes the last document change and caps history', () => {
    let s = run(wordInitial(), { type: 'insertText', text: 'a' }, { type: 'insertText', text: 'b' });
    s = reduceWord(s, { type: 'undo' });
    expect(text(s)).toBe('a');
    let t = wordInitial();
    for (let i = 0; i < 35; i++) t = reduceWord(t, { type: 'insertText', text: 'x' });
    expect(t.past).toHaveLength(30);
  });

  it('does not push history for a selection change', () => {
    const s = run(wordInitial({ text: 'Xin chào' }), { type: 'selectText', text: 'chào' }, { type: 'selectAll' });
    expect(s.past).toEqual([]);
  });

  it('undoing an empty history leaves the document alone', () => {
    const s = wordInitial({ text: 'Xin chào' });
    expect(reduceWord(s, { type: 'undo' })).toEqual(s);
  });
});
