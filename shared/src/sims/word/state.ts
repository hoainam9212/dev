import { emptyDoc, type WordDoc } from './schema';
import { setHighlight, setStyle, toggleMark, marksAtCursor, marksInRange, type MarkReport, type StyleAttr, type ToggleableMark } from './marks';
import { setAlign, setHeading, setLineHeight, toggleList, blockOf, type Align, type BlockReport, type LineHeight, type ListKind } from './blocks';
import { fillCell, insertImage, insertTable, setImageWidth, tableColOp, tableRowOp, type ImageWidth } from './objects';
import { replaceAll, replaceOne, writeToc } from './doc';
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
  | { type: 'setAlign'; align: Align }
  | { type: 'setLineHeight'; value: LineHeight }
  | { type: 'setHeading'; level: 0 | 1 | 2 | 3 }
  | { type: 'toggleList'; list: ListKind }
  | { type: 'insertTable'; rows: number; cols: number }
  | { type: 'tableRow'; op: 'add' | 'remove' }
  | { type: 'tableCol'; op: 'add' | 'remove' }
  | { type: 'fillCell'; row: number; col: number; text: string }
  | { type: 'insertImage'; src: string; alt: string }
  | { type: 'setImageWidth'; width: ImageWidth }
  | { type: 'replaceAll'; find: string; replace: string }
  | { type: 'replaceOne'; find: string; replace: string; nth?: number }
  | { type: 'insertToc' }
  | { type: 'refreshToc' }
  | { type: 'openDialog'; dialog: WordState['dialog'] }
  | { type: 'save'; name: string; at: number }
  | { type: 'print' }
  | { type: 'setDoc'; doc: WordDoc }
  | { type: 'undo' };

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
  return s.sel.from === s.sel.to ? marksAtCursor(s.doc, s.sel.from) : marksInRange(s.doc, s.sel);
}

/** Khối chứa con trỏ — ribbon dùng để hiện kiểu đoạn đang áp dụng. */
export function activeBlock(s: WordState): BlockReport | null {
  const text = textInRange(s.doc, s.sel);
  return text ? blockOf(s.doc, text) : null;
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
    case 'setAlign':
      return withEdit(s, setAlign(s.doc, s.sel, a.align));
    case 'setLineHeight':
      return withEdit(s, setLineHeight(s.doc, s.sel, a.value));
    case 'setHeading':
      return withEdit(s, setHeading(s.doc, s.sel, a.level));
    case 'toggleList':
      return withEdit(s, toggleList(s.doc, s.sel, a.list));
    case 'insertTable':
      return withEdit(s, insertTable(s.doc, s.sel, a.rows, a.cols));
    case 'tableRow':
      return withEdit(s, tableRowOp(s.doc, s.sel, a.op));
    case 'tableCol':
      return withEdit(s, tableColOp(s.doc, s.sel, a.op));
    case 'fillCell':
      return withEdit(s, fillCell(s.doc, s.sel, a.row, a.col, a.text));
    case 'insertImage':
      return withEdit(s, insertImage(s.doc, s.sel, a.src, a.alt));
    case 'setImageWidth':
      return withEdit(s, setImageWidth(s.doc, s.sel, a.width));
    // Giao diện TipTap báo về cả tài liệu sau khi người dùng gõ; dịch ngược từng
    // phím thành action không mang lại gì cho bài học, mà lời giải của bài vẫn
    // dùng `insertText`/`selectText` nên vẫn phát lại được.
    case 'setDoc':
      return withEdit(s, { doc: a.doc, sel: clampRange(a.doc, s.sel) });
    case 'replaceAll':
      return withEdit(s, replaceAll(s.doc, s.sel, a.find, a.replace));
    case 'replaceOne':
      return withEdit(s, replaceOne(s.doc, s.sel, a.find, a.replace, a.nth ?? 1));
    case 'insertToc':
    case 'refreshToc':
      return withEdit(s, writeToc(s.doc, s.sel));
    case 'openDialog':
      return { ...s, dialog: a.dialog };
    // Lưu và in không đổi tài liệu nên không đẩy lịch sử hoàn tác.
    case 'save':
      return { ...s, saved: { name: a.name, at: a.at } };
    case 'print':
      return { ...s, printed: true };
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
