import { emptyDoc, type WordDoc } from './schema';
import { setHighlight, setStyle, toggleMark, marksInRange, type MarkReport, type StyleAttr, type ToggleableMark } from './marks';
import {
  backspace,
  clampRange,
  findText,
  insertText,
  textInRange,
  splitBlock,
  wholeDocRange,
  type DocEdit,
  type Range,
} from './text';

export const WORD_UNDO_LIMIT = 30;

export interface WordState {
  doc: WordDoc;
  sel: Range;
  past: WordDoc[];
  /** Task 6 dùng; khai báo sẵn để kiểu không đổi giữa các task. */
  saved: { name: string; at: number } | null;
  printed: boolean;
  dialog: 'find' | 'save' | 'print' | 'image' | null;
}

export type WordAction =
  | { type: 'insertText'; text: string }
  | { type: 'backspace' }
  | { type: 'selectText'; text: string; nth?: number }
  | { type: 'selectAll' }
  | { type: 'setSelection'; from: number; to: number }
  | { type: 'splitBlock' }
  | { type: 'toggleMark'; mark: ToggleableMark }
  | { type: 'setStyle'; attr: StyleAttr; value: string | null }
  | { type: 'setHighlight'; color: string | null }
  | { type: 'undo' };
// Task 4–6 thêm nhánh vào union này.

export function wordInitial(o: { doc?: WordDoc; text?: string } = {}): WordState {
  return {
    doc: o.doc ?? emptyDoc(o.text),
    sel: { from: 1, to: 1 },
    past: [],
    saved: null,
    printed: false,
    dialog: null,
  };
}

/** Ghi lại một thay đổi tài liệu kèm lịch sử hoàn tác. */
export function withEdit(s: WordState, edit: DocEdit | null): WordState {
  if (!edit) return s;
  return { ...s, doc: edit.doc, sel: edit.sel, past: [...s.past, s.doc].slice(-WORD_UNDO_LIMIT) };
}

export function selectedText(s: WordState): string {
  return textInRange(s.doc, s.sel);
}

export { findText };

/** Định dạng của vùng đang chọn — ribbon dùng để tô sáng nút đang bật. */
export function activeMarks(s: WordState): MarkReport | null {
  return marksInRange(s.doc, s.sel);
}

export function reduceWord(s: WordState, a: WordAction): WordState {
  switch (a.type) {
    case 'insertText':
      return withEdit(s, insertText(s.doc, s.sel, a.text));
    case 'backspace':
      return withEdit(s, backspace(s.doc, s.sel));
    case 'splitBlock':
      return withEdit(s, splitBlock(s.doc, s.sel));
    case 'toggleMark':
      return withEdit(s, toggleMark(s.doc, s.sel, a.mark));
    case 'setStyle':
      return withEdit(s, setStyle(s.doc, s.sel, a.attr, a.value));
    case 'setHighlight':
      return withEdit(s, setHighlight(s.doc, s.sel, a.color));
    case 'selectText': {
      const range = findText(s.doc, a.text, a.nth ?? 1);
      return range ? { ...s, sel: range } : s;
    }
    case 'selectAll':
      return { ...s, sel: wholeDocRange(s.doc) };
    case 'setSelection':
      return { ...s, sel: clampRange(s.doc, { from: a.from, to: a.to }) };
    case 'undo': {
      const previous = s.past[s.past.length - 1];
      if (!previous) return s;
      return { ...s, doc: previous, sel: clampRange(previous, s.sel), past: s.past.slice(0, -1) };
    }
  }
}
