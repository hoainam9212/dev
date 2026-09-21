import { describe, it, expect } from 'vitest';
import { gradeWord } from './grade';
import { reduceWord, wordInitial, type WordAction, type WordState } from './state';

const run = (s: WordState, ...as: WordAction[]) => as.reduce(reduceWord, s);

describe('word grader', () => {
  it('checks text presence and absence', () => {
    const s = wordInitial({ text: 'Kính gửi Quý công ty' });
    expect(gradeWord(s, { kind: 'textContains', text: 'kính gửi' }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'textContains', text: 'Trân trọng' }).ok).toBe(false);
    expect(gradeWord(s, { kind: 'textNotContains', text: 'Trân trọng' }).ok).toBe(true);
  });

  it('explains what is missing in Vietnamese', () => {
    const r = gradeWord(wordInitial({ text: 'a' }), { kind: 'textContains', text: 'Trân trọng' });
    expect(r.messageVi).toMatch(/Trân trọng/);
  });

  it('checks a mark, with and without a value', () => {
    const s = run(wordInitial({ text: 'ĐƠN XIN VIỆC' }), { type: 'selectText', text: 'ĐƠN XIN VIỆC' },
      { type: 'toggleMark', mark: 'bold' }, { type: 'setStyle', attr: 'fontSize', value: '16pt' });
    expect(gradeWord(s, { kind: 'markOnText', text: 'ĐƠN XIN VIỆC', mark: 'bold' }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'markOnText', text: 'ĐƠN XIN VIỆC', mark: 'fontSize', value: '16pt' }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'markOnText', text: 'ĐƠN XIN VIỆC', mark: 'fontSize', value: '11pt' }).ok).toBe(false);
    expect(gradeWord(s, { kind: 'markOnText', text: 'ĐƠN XIN VIỆC', mark: 'italic' }).ok).toBe(false);
  });

  it('fails a mark check when the text is not in the document at all', () => {
    const r = gradeWord(wordInitial({ text: 'a' }), { kind: 'markOnText', text: 'không có', mark: 'bold' });
    expect(r.ok).toBe(false);
  });

  it('checks alignment, line height, list and heading', () => {
    const s = run(wordInitial({ text: 'Tiêu đề' }), { type: 'selectText', text: 'Tiêu đề' },
      { type: 'setAlign', align: 'center' }, { type: 'setLineHeight', value: '1.5' }, { type: 'setHeading', level: 1 });
    expect(gradeWord(s, { kind: 'paragraphAlign', text: 'Tiêu đề', align: 'center' }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'lineHeight', text: 'Tiêu đề', value: '1.5' }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'headingLevel', text: 'Tiêu đề', level: 1 }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'headingLevel', text: 'Tiêu đề', level: 2 }).ok).toBe(false);
    expect(gradeWord(s, { kind: 'listType', text: 'Tiêu đề', list: 'bullet' }).ok).toBe(false);
  });

  it('checks tables, cells and images', () => {
    const s = run(wordInitial(), { type: 'insertTable', rows: 3, cols: 2 }, { type: 'fillCell', row: 0, col: 0, text: 'Môn' },
      { type: 'insertImage', src: '/images/word/meo.svg', alt: 'Mèo' });
    expect(gradeWord(s, { kind: 'tableSize', rows: 3, cols: 2 }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'tableSize', rows: 4, cols: 2 }).ok).toBe(false);
    expect(gradeWord(s, { kind: 'cellText', row: 0, col: 0, text: 'môn' }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'imageCount', count: 1 }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'imageCount', count: 2 }).ok).toBe(false);
  });

  it('checks the image width', () => {
    const s = run(wordInitial(), { type: 'insertImage', src: '/images/word/meo.svg', alt: 'Mèo' }, { type: 'setImageWidth', width: '60%' });
    expect(gradeWord(s, { kind: 'imageWidth', width: '60%' }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'imageWidth', width: '25%' }).ok).toBe(false);
    expect(gradeWord(wordInitial(), { kind: 'imageWidth', width: '60%' }).ok).toBe(false);
  });

  it('checks the table of contents, saving and printing', () => {
    let s = run(wordInitial({ text: 'Giới thiệu' }), { type: 'selectText', text: 'Giới thiệu' }, { type: 'setHeading', level: 1 }, { type: 'insertToc' });
    expect(gradeWord(s, { kind: 'hasToc' }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'saved' }).ok).toBe(false);
    s = run(s, { type: 'save', name: 'don.docx', at: 1 }, { type: 'print' });
    expect(gradeWord(s, { kind: 'saved', name: 'don.docx' }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'saved', name: 'khac.docx' }).ok).toBe(false);
    expect(gradeWord(s, { kind: 'printed' }).ok).toBe(true);
  });
});
