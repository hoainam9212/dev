import { EditorState, TextSelection, type Transaction } from '@tiptap/pm/state';
import { docFromJSON, docToJSON, type WordDoc } from './schema';

/** Phần state mà một thao tác sửa tài liệu trả về. */
export interface DocEdit {
  doc: WordDoc;
  sel: { from: number; to: number };
}

export interface Range {
  from: number;
  to: number;
}

/** Kẹp vị trí vào trong tài liệu để không bao giờ ném lỗi vì lệch biên. */
export function clampRange(doc: WordDoc, range: Range): Range {
  const node = docFromJSON(doc);
  const max = node.content.size;
  const from = Math.min(Math.max(range.from, 0), max);
  const to = Math.min(Math.max(range.to, from), max);
  return { from, to };
}

/**
 * Bản đồ từ chỉ số ký tự trong `plainText` sang vị trí ProseMirror.
 *
 * ProseMirror đánh vị trí theo "token": mỗi node text tốn đúng `text.length`,
 * mỗi thẻ mở/đóng của một node khác tốn 1. `plainText` thì nối các khối con của
 * `doc` bằng `\n`. Hàm này duyệt tài liệu một lần và ghi lại, với từng ký tự của
 * `plainText`, vị trí ProseMirror tương ứng — mọi việc tìm chữ ở Task 3–7 đều
 * dựa vào đây.
 */
function charPositions(doc: WordDoc): { text: string; pos: number[] } {
  let text = '';
  const pos: number[] = [];
  const node = docFromJSON(doc);

  node.descendants((child, position) => {
    if (child.isText) {
      const value = child.text ?? '';
      for (let i = 0; i < value.length; i++) {
        text += value[i];
        pos.push(position + i);
      }
      return false;
    }
    return true;
  });

  // Ranh giới giữa các khối con trực tiếp của `doc` là một `\n` trong plainText.
  let offset = 0;
  let joined = '';
  const joinedPos: number[] = [];
  node.forEach((block, blockOffset) => {
    const size = blockText(block).length;
    if (joined !== '') {
      joined += '\n';
      joinedPos.push(blockOffset);
    }
    joined += text.slice(offset, offset + size);
    joinedPos.push(...pos.slice(offset, offset + size));
    offset += size;
  });
  return { text: joined, pos: joinedPos };
}

function blockText(node: ReturnType<typeof docFromJSON>): string {
  let out = '';
  node.descendants((child) => {
    if (child.isText) out += child.text ?? '';
    return true;
  });
  return out;
}

/** Vị trí của lần xuất hiện thứ `nth` (đếm từ 1) của `text`, hoặc null. */
export function findText(doc: WordDoc, text: string, nth = 1): Range | null {
  if (!text) return null;
  const map = charPositions(doc);
  let index = -1;
  for (let i = 0; i < nth; i++) {
    index = map.text.indexOf(text, index + 1);
    if (index === -1) return null;
  }
  const first = map.pos[index];
  const last = map.pos[index + text.length - 1];
  if (first === undefined || last === undefined) return null;
  return { from: first, to: last + 1 };
}

/**
 * Mọi thao tác sửa tài liệu đi qua đây: dựng một `EditorState` tạm (không
 * plugin) chỉ để mượn cơ chế transaction của ProseMirror, rồi trả về JSON thuần.
 * `WordState` không bao giờ giữ `EditorState` — state phải so sánh được bằng
 * `toEqual` và lưu được xuống Dexie.
 */
function apply(doc: WordDoc, sel: Range, run: (tr: Transaction) => void): DocEdit {
  const node = docFromJSON(doc);
  const { from, to } = clampRange(doc, sel);
  const state = EditorState.create({ doc: node, selection: TextSelection.create(node, from, to) });
  const tr = state.tr;
  run(tr);
  return { doc: docToJSON(tr.doc), sel: { from: tr.selection.from, to: tr.selection.to } };
}

export function insertText(doc: WordDoc, sel: Range, text: string): DocEdit {
  return apply(doc, sel, (tr) => {
    tr.insertText(text, tr.selection.from, tr.selection.to);
  });
}

export function backspace(doc: WordDoc, sel: Range): DocEdit | null {
  const range = clampRange(doc, sel);
  if (range.from === range.to) {
    if (range.from <= 1) return null;
    return apply(doc, range, (tr) => {
      tr.delete(range.from - 1, range.from);
    });
  }
  return apply(doc, range, (tr) => {
    tr.delete(range.from, range.to);
  });
}

export function splitBlock(doc: WordDoc, sel: Range): DocEdit {
  return apply(doc, sel, (tr) => {
    if (tr.selection.from !== tr.selection.to) tr.deleteSelection();
    tr.split(tr.selection.from);
  });
}

/** Chữ trong một khoảng; `state.ts` bọc lại thành `selectedText(state)`. */
export function textInRange(doc: WordDoc, sel: Range): string {
  const node = docFromJSON(doc);
  const { from, to } = clampRange(doc, sel);
  return node.textBetween(from, to, '\n');
}

export function wholeDocRange(doc: WordDoc): Range {
  const node = docFromJSON(doc);
  return { from: 1, to: Math.max(1, node.content.size - 1) };
}
