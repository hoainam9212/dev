import { describe, it, expect } from 'vitest';
import { marksOnText } from './marks';
import { activeMarks, reduceWord, wordInitial, type WordAction, type WordState } from './state';

const run = (s: WordState, ...as: WordAction[]) => as.reduce(reduceWord, s);
const doc = (t: string) => wordInitial({ text: t });

describe('activeMarks at a bare cursor', () => {
  // Như Word thật: bấm con trỏ vào giữa chữ Times 16pt thì ô phông/cỡ vẫn hiện Times, 16.
  const styled = () =>
    run(doc('ĐƠN XIN VIỆC'),
      { type: 'selectText', text: 'ĐƠN XIN VIỆC' },
      { type: 'setStyle', attr: 'fontFamily', value: 'Times New Roman' },
      { type: 'setStyle', attr: 'fontSize', value: '16pt' },
      { type: 'toggleMark', mark: 'bold' },
    );

  it('reports the marks of the text around the cursor', () => {
    const s = run(styled(), { type: 'setSelection', from: 4, to: 4 });
    expect(activeMarks(s)).toMatchObject({ fontFamily: 'Times New Roman', fontSize: '16pt', bold: true, italic: false });
  });

  it('uses the text just before the cursor at the end of a line, and after it at the start', () => {
    const end = run(styled(), { type: 'setSelection', from: 13, to: 13 });
    expect(activeMarks(end)?.fontFamily).toBe('Times New Roman');
    const start = run(styled(), { type: 'setSelection', from: 1, to: 1 });
    expect(activeMarks(start)?.fontSize).toBe('16pt');
  });

  it('still reports nothing in an empty paragraph', () => {
    expect(activeMarks(run(doc(''), { type: 'setSelection', from: 1, to: 1 }))).toBeNull();
  });
});

describe('word marks', () => {
  it('bolds the selected phrase only', () => {
    const s = run(doc('Kính gửi Quý công ty'), { type: 'selectText', text: 'Quý công ty' }, { type: 'toggleMark', mark: 'bold' });
    expect(marksOnText(s.doc, 'Quý công ty')?.bold).toBe(true);
    expect(marksOnText(s.doc, 'Kính gửi')?.bold).toBe(false);
  });

  it('toggles a mark off again', () => {
    let s = run(doc('Xin chào'), { type: 'selectText', text: 'Xin' }, { type: 'toggleMark', mark: 'italic' });
    expect(marksOnText(s.doc, 'Xin')?.italic).toBe(true);
    s = run(s, { type: 'selectText', text: 'Xin' }, { type: 'toggleMark', mark: 'italic' });
    expect(marksOnText(s.doc, 'Xin')?.italic).toBe(false);
  });

  it('applies font, size and colour without losing each other', () => {
    const s = run(doc('ĐƠN XIN VIỆC'),
      { type: 'selectText', text: 'ĐƠN XIN VIỆC' },
      { type: 'setStyle', attr: 'fontFamily', value: 'Times New Roman' },
      { type: 'setStyle', attr: 'fontSize', value: '16pt' },
      { type: 'setStyle', attr: 'color', value: '#C2185B' },
    );
    expect(marksOnText(s.doc, 'ĐƠN XIN VIỆC')).toMatchObject({ fontFamily: 'Times New Roman', fontSize: '16pt', color: '#C2185B' });
  });

  it('clears one style attribute and keeps the rest', () => {
    const s = run(doc('Nam'), { type: 'selectText', text: 'Nam' },
      { type: 'setStyle', attr: 'color', value: '#C2185B' },
      { type: 'setStyle', attr: 'fontSize', value: '14pt' },
      { type: 'setStyle', attr: 'color', value: null });
    expect(marksOnText(s.doc, 'Nam')).toMatchObject({ color: null, fontSize: '14pt' });
  });

  it('highlights and un-highlights', () => {
    let s = run(doc('quan trọng'), { type: 'selectText', text: 'quan trọng' }, { type: 'setHighlight', color: '#FFF3B0' });
    expect(marksOnText(s.doc, 'quan trọng')?.highlight).toBe('#FFF3B0');
    s = run(s, { type: 'selectText', text: 'quan trọng' }, { type: 'setHighlight', color: null });
    expect(marksOnText(s.doc, 'quan trọng')?.highlight).toBeNull();
  });

  it('reports false when a mark covers only part of the phrase', () => {
    const s = run(doc('Hà Nội'), { type: 'selectText', text: 'Hà' }, { type: 'toggleMark', mark: 'bold' });
    expect(marksOnText(s.doc, 'Hà Nội')?.bold).toBe(false);
  });

  it('ignores formatting with an empty selection and unknown text', () => {
    const s = doc('Xin chào');
    expect(reduceWord(s, { type: 'toggleMark', mark: 'bold' })).toEqual(s);
    expect(marksOnText(s.doc, 'không có')).toBeNull();
  });
});
