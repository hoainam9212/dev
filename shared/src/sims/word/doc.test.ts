import { describe, it, expect } from 'vitest';
import { plainText } from './schema';
import { countMatches, hasToc, headingsOf, tocEntries } from './doc';
import { reduceWord, wordInitial, type WordAction, type WordState } from './state';

const run = (s: WordState, ...as: WordAction[]) => as.reduce(reduceWord, s);

/** Tài liệu hai Heading 1: "Giới thiệu" rồi "Nội dung". */
function report(): WordState {
  // Con trỏ phải ở CUỐI chữ rồi mới Enter, xem ghi chú trong STATUS.md.
  let s = run(wordInitial({ text: 'Giới thiệu' }), { type: 'selectText', text: 'Giới thiệu' });
  s = run(s, { type: 'setSelection', from: s.sel.to, to: s.sel.to }, { type: 'splitBlock' }, { type: 'insertText', text: 'Nội dung' });
  s = run(s, { type: 'selectText', text: 'Giới thiệu' }, { type: 'setHeading', level: 1 });
  s = run(s, { type: 'selectText', text: 'Nội dung' }, { type: 'setHeading', level: 1 });
  return s;
}

describe('word find and replace', () => {
  it('counts matches case-insensitively', () => {
    const s = wordInitial({ text: 'Nam và nam và năm' });
    expect(countMatches(s.doc, 'nam')).toBe(2);
    expect(countMatches(s.doc, 'xyz')).toBe(0);
  });

  it('replaces every match in a single undo step', () => {
    let s = run(wordInitial({ text: 'công ty ABC, công ty ABC' }), { type: 'replaceAll', find: 'ABC', replace: 'Mochi' });
    expect(plainText(s.doc)).toBe('công ty Mochi, công ty Mochi');
    s = run(s, { type: 'undo' });
    expect(plainText(s.doc)).toBe('công ty ABC, công ty ABC');
  });

  it('replaces only the nth match', () => {
    const s = run(wordInitial({ text: 'mèo mèo mèo' }), { type: 'replaceOne', find: 'mèo', replace: 'cá', nth: 2 });
    expect(plainText(s.doc)).toBe('mèo cá mèo');
  });

  it('does nothing when there is no match', () => {
    const s = wordInitial({ text: 'xin chào' });
    expect(reduceWord(s, { type: 'replaceAll', find: 'zzz', replace: 'a' })).toEqual(s);
  });
});

describe('word table of contents', () => {
  it('lists the headings', () => {
    const s = report();
    expect(headingsOf(s.doc)).toEqual([{ level: 1, title: 'Giới thiệu' }, { level: 1, title: 'Nội dung' }]);
    expect(hasToc(s.doc)).toBe(false);
  });

  it('inserts a table of contents built from the headings', () => {
    const s = run(report(), { type: 'insertToc' });
    expect(hasToc(s.doc)).toBe(true);
    expect(tocEntries(s.doc)).toEqual([{ level: 1, title: 'Giới thiệu' }, { level: 1, title: 'Nội dung' }]);
    expect(plainText(s.doc).startsWith('Mục lục')).toBe(true);
  });

  it('puts the table of contents first, so its lines come first in the text', () => {
    const s = run(report(), { type: 'insertToc' });
    expect(plainText(s.doc).split('\n').slice(0, 3)).toEqual(['Mục lục', 'Giới thiệu Nội dung', 'Giới thiệu']);
  });

  it('refreshes instead of duplicating', () => {
    let s = run(report(), { type: 'insertToc' });
    // Mục lục nằm ở ĐẦU tài liệu nên lần xuất hiện thứ nhất của "Nội dung" là
    // dòng mục lục; muốn sửa tiêu đề thật thì phải lấy lần thứ hai.
    s = run(s, { type: 'selectText', text: 'Nội dung', nth: 2 }, { type: 'insertText', text: 'Nội dung chính' }, { type: 'refreshToc' });
    expect(tocEntries(s.doc).map((e) => e.title)).toEqual(['Giới thiệu', 'Nội dung chính']);
    s = run(s, { type: 'insertToc' });
    expect(tocEntries(s.doc)).toHaveLength(2);
  });
});

describe('word save and print', () => {
  it('records the saved name and the print, without touching the document', () => {
    const before = wordInitial({ text: 'Đơn xin việc' });
    const s = run(before, { type: 'save', name: 'don-xin-viec.docx', at: 1700000000000 }, { type: 'print' });
    expect(s.saved).toEqual({ name: 'don-xin-viec.docx', at: 1700000000000 });
    expect(s.printed).toBe(true);
    expect(s.doc).toEqual(before.doc);
    expect(s.past).toEqual([]);
  });

  it('opens and closes dialogs', () => {
    let s = run(wordInitial(), { type: 'openDialog', dialog: 'find' });
    expect(s.dialog).toBe('find');
    s = run(s, { type: 'openDialog', dialog: null });
    expect(s.dialog).toBeNull();
  });
});
