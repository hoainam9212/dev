import type { Mark } from '@tiptap/pm/model';
import { docFromJSON, type WordDoc } from './schema';
import { clampRange, editDoc, findText, type DocEdit, type Range } from './text';

export type ToggleableMark = 'bold' | 'italic' | 'underline';
export type StyleAttr = 'color' | 'fontFamily' | 'fontSize';

export interface MarkReport {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  color: string | null;
  fontFamily: string | null;
  fontSize: string | null;
  highlight: string | null;
}

const isEmpty = (range: Range) => range.from >= range.to;

/** Bật/tắt một mark trên vùng chọn. Đã phủ kín thì gỡ, chưa thì phủ. */
export function toggleMark(doc: WordDoc, sel: Range, mark: ToggleableMark): DocEdit | null {
  const range = clampRange(doc, sel);
  if (isEmpty(range)) return null;
  const type = docFromJSON(doc).type.schema.marks[mark];
  if (!type) return null;
  const covered = docFromJSON(doc).rangeHasMark(range.from, range.to, type);
  return editDoc(doc, range, (tr) => {
    if (covered) tr.removeMark(range.from, range.to, type);
    else tr.addMark(range.from, range.to, type.create());
  });
}

/**
 * Đặt một thuộc tính của mark `textStyle`, giữ nguyên hai thuộc tính kia. Phải
 * gỡ mark cũ rồi thêm mark đã trộn, nếu không ProseMirror sẽ để hai mark
 * `textStyle` khác attrs chồng lên nhau trên cùng đoạn chữ.
 */
export function setStyle(doc: WordDoc, sel: Range, attr: StyleAttr, value: string | null): DocEdit | null {
  const range = clampRange(doc, sel);
  if (isEmpty(range)) return null;
  const node = docFromJSON(doc);
  const type = node.type.schema.marks.textStyle;
  if (!type) return null;

  const current = markAt(node, range.from, 'textStyle')?.attrs ?? {};
  const attrs = { ...current, [attr]: value };
  const keep = Object.values(attrs).some((v) => v !== null && v !== undefined);

  return editDoc(doc, range, (tr) => {
    tr.removeMark(range.from, range.to, type);
    if (keep) tr.addMark(range.from, range.to, type.create(attrs));
  });
}

export function setHighlight(doc: WordDoc, sel: Range, color: string | null): DocEdit | null {
  const range = clampRange(doc, sel);
  if (isEmpty(range)) return null;
  const type = docFromJSON(doc).type.schema.marks.highlight;
  if (!type) return null;
  return editDoc(doc, range, (tr) => {
    tr.removeMark(range.from, range.to, type);
    if (color !== null) tr.addMark(range.from, range.to, type.create({ color }));
  });
}

function markAt(node: ReturnType<typeof docFromJSON>, pos: number, name: string): Mark | undefined {
  const $pos = node.resolve(Math.min(Math.max(pos, 0), node.content.size));
  const marks = $pos.marksAcross($pos) ?? $pos.marks();
  return marks.find((m) => m.type.name === name);
}

/** Báo cáo định dạng của một khoảng: chỉ tính khi mark phủ TOÀN BỘ khoảng đó. */
export function marksInRange(doc: WordDoc, sel: Range): MarkReport | null {
  const range = clampRange(doc, sel);
  if (isEmpty(range)) return null;
  const node = docFromJSON(doc);

  const pieces: Mark[][] = [];
  node.nodesBetween(range.from, range.to, (child) => {
    if (child.isText) pieces.push([...child.marks]);
    return true;
  });
  if (pieces.length === 0) return null;

  const everyHas = (name: string) => pieces.every((marks) => marks.some((m) => m.type.name === name));
  const sameAttr = (name: string, attr: string): string | null => {
    const values = pieces.map((marks) => (marks.find((m) => m.type.name === name)?.attrs[attr] as string | undefined) ?? null);
    const first = values[0] ?? null;
    return values.every((v) => v === first) ? first : null;
  };

  return {
    bold: everyHas('bold'),
    italic: everyHas('italic'),
    underline: everyHas('underline'),
    color: sameAttr('textStyle', 'color'),
    fontFamily: sameAttr('textStyle', 'fontFamily'),
    fontSize: sameAttr('textStyle', 'fontSize'),
    highlight: everyHas('highlight') ? sameAttr('highlight', 'color') : null,
  };
}

/** Các mark đang phủ toàn bộ đoạn chữ `text` (lần xuất hiện thứ `nth`). */
export function marksOnText(doc: WordDoc, text: string, nth = 1): MarkReport | null {
  const range = findText(doc, text, nth);
  return range ? marksInRange(doc, range) : null;
}
