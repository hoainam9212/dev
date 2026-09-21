import type { Node } from '@tiptap/pm/model';
import { TextSelection } from '@tiptap/pm/state';
import { docFromJSON, type WordDoc } from './schema';
import { clampRange, editDoc, type DocEdit, type Range } from './text';

export type ImageWidth = '25%' | '40%' | '60%' | '100%';

/** Thư viện ảnh có sẵn — file tĩnh trong `client/public/images/word/`. */
export const IMAGE_LIBRARY: { src: string; alt: string }[] = [
  { src: '/images/word/meo.svg', alt: 'Mèo Mochi' },
  { src: '/images/word/hoa.svg', alt: 'Bông hoa' },
  { src: '/images/word/bien.svg', alt: 'Bãi biển' },
  { src: '/images/word/nui.svg', alt: 'Ngọn núi' },
  { src: '/images/word/sach.svg', alt: 'Quyển sách' },
  { src: '/images/word/may-tinh.svg', alt: 'Máy tính' },
];

/** Bảng thứ `nth` trong tài liệu (đếm từ 1) kèm vị trí của nó. */
function tableAt(node: Node, nth = 1): { node: Node; pos: number } | null {
  const tables: { node: Node; pos: number }[] = [];
  node.descendants((child, pos) => {
    if (child.type.name === 'table') tables.push({ node: child, pos });
    return child.type.name !== 'table';
  });
  return tables[nth - 1] ?? null;
}

/** Bảng chứa vị trí `pos`, nếu có. */
function tableAround(node: Node, pos: number): { node: Node; pos: number } | null {
  const $pos = node.resolve(Math.min(Math.max(pos, 0), node.content.size));
  for (let depth = $pos.depth; depth > 0; depth--) {
    if ($pos.node(depth).type.name === 'table') return { node: $pos.node(depth), pos: $pos.before(depth) };
  }
  return null;
}

/** Ô đang chứa con trỏ: chỉ số hàng và cột trong bảng bao ngoài. */
function cellIndexAt(node: Node, pos: number): { row: number; col: number } | null {
  const table = tableAround(node, pos);
  if (!table) return null;
  let found: { row: number; col: number } | null = null;
  table.node.forEach((row, rowOffset, rowIndex) => {
    row.forEach((cell, cellOffset, colIndex) => {
      const start = table.pos + 1 + rowOffset + 1 + cellOffset;
      if (pos >= start && pos <= start + cell.nodeSize) found = { row: rowIndex, col: colIndex };
    });
  });
  return found;
}

function emptyCell(node: Node, header: boolean) {
  const schema = node.type.schema;
  const type = header ? schema.nodes.tableHeader : schema.nodes.tableCell;
  return type!.createAndFill()!;
}

export function insertTable(doc: WordDoc, sel: Range, rows: number, cols: number): DocEdit | null {
  if (rows < 1 || cols < 1) return null;
  const node = docFromJSON(doc);
  const schema = node.type.schema;
  const range = clampRange(doc, sel);

  const rowNodes = Array.from({ length: rows }, (_, r) =>
    schema.nodes.tableRow!.create(null, Array.from({ length: cols }, () => emptyCell(node, r === 0))),
  );
  const table = schema.nodes.table!.create(null, rowNodes);

  return editDoc(doc, range, (tr) => {
    const $pos = tr.doc.resolve(range.from);
    const after = $pos.after(1);
    tr.insert(after, table);
    // Con trỏ vào ô đầu tiên: sau thẻ mở của table, row, cell và paragraph.
    const pos = Math.min(after + 4, tr.doc.content.size);
    tr.setSelection(TextSelection.create(tr.doc, pos));
  });
}

export function tableRowOp(doc: WordDoc, sel: Range, op: 'add' | 'remove'): DocEdit | null {
  const node = docFromJSON(doc);
  const range = clampRange(doc, sel);
  const table = tableAround(node, range.from);
  const at = cellIndexAt(node, range.from);
  if (!table || !at) return null;
  const rows = table.node.childCount;
  if (op === 'remove' && (rows <= 2 || at.row === 0)) return null;

  return editDoc(doc, range, (tr) => {
    const current = tr.doc.nodeAt(table.pos);
    if (!current) return;
    if (op === 'add') {
      const template = current.child(Math.max(1, at.row));
      const fresh = template.type.create(null, Array.from({ length: template.childCount }, () => emptyCell(node, false)));
      tr.insert(table.pos + 1 + offsetOfRow(current, at.row + 1), fresh);
    } else {
      const start = table.pos + 1 + offsetOfRow(current, at.row);
      tr.delete(start, start + current.child(at.row).nodeSize);
    }
  });
}

function offsetOfRow(table: Node, index: number): number {
  let offset = 0;
  for (let i = 0; i < Math.min(index, table.childCount); i++) offset += table.child(i).nodeSize;
  return offset;
}

export function tableColOp(doc: WordDoc, sel: Range, op: 'add' | 'remove'): DocEdit | null {
  const node = docFromJSON(doc);
  const range = clampRange(doc, sel);
  const table = tableAround(node, range.from);
  const at = cellIndexAt(node, range.from);
  if (!table || !at) return null;
  const cols = table.node.firstChild?.childCount ?? 0;
  if (op === 'remove' && cols <= 1) return null;

  // Dựng lại cả bảng: ít dòng hơn và không phải lo ánh xạ vị trí sau mỗi lần sửa.
  const rows: Node[] = [];
  table.node.forEach((row, _offset, rowIndex) => {
    const cells: Node[] = [];
    row.forEach((cell, _o, colIndex) => {
      if (op === 'remove' && colIndex === at.col) return;
      cells.push(cell);
      if (op === 'add' && colIndex === at.col) cells.push(emptyCell(node, rowIndex === 0));
    });
    rows.push(row.type.create(row.attrs, cells));
  });
  const rebuilt = table.node.type.create(table.node.attrs, rows);

  return editDoc(doc, range, (tr) => {
    tr.replaceWith(table.pos, table.pos + table.node.nodeSize, rebuilt);
  });
}

export function fillCell(doc: WordDoc, sel: Range, row: number, col: number, text: string): DocEdit | null {
  const node = docFromJSON(doc);
  const range = clampRange(doc, sel);
  const table = tableAround(node, range.from) ?? tableAt(node, 1);
  if (!table) return null;
  const rowNode = table.node.maybeChild(row);
  const cell = rowNode?.maybeChild(col);
  if (!rowNode || !cell) return null;

  const start = table.pos + 1 + offsetOfRow(table.node, row) + 1 + offsetOfCell(rowNode, col);
  return editDoc(doc, range, (tr) => {
    const paragraph = node.type.schema.nodes.paragraph!.create(null, text ? node.type.schema.text(text) : null);
    tr.replaceWith(start + 1, start + cell.nodeSize - 1, paragraph);
  });
}

function offsetOfCell(row: Node, index: number): number {
  let offset = 0;
  for (let i = 0; i < Math.min(index, row.childCount); i++) offset += row.child(i).nodeSize;
  return offset;
}

export function insertImage(doc: WordDoc, sel: Range, src: string, alt: string): DocEdit | null {
  const node = docFromJSON(doc);
  const range = clampRange(doc, sel);
  const image = node.type.schema.nodes.image!.create({ src, alt });
  return editDoc(doc, range, (tr) => {
    const $pos = tr.doc.resolve(range.from);
    tr.insert($pos.after(1), image);
  });
}

export function setImageWidth(doc: WordDoc, sel: Range, width: ImageWidth): DocEdit | null {
  const node = docFromJSON(doc);
  const range = clampRange(doc, sel);
  const images: { node: Node; pos: number }[] = [];
  node.descendants((child, pos) => {
    if (child.type.name === 'image') images.push({ node: child, pos });
    return true;
  });
  if (images.length === 0) return null;
  const inSelection = images.filter((i) => i.pos >= range.from - 1 && i.pos <= range.to);
  const target = inSelection[0] ?? images[images.length - 1]!;
  return editDoc(doc, range, (tr) => {
    tr.setNodeMarkup(target.pos, undefined, { ...target.node.attrs, width });
  });
}

export function tableSizeOf(doc: WordDoc, nth = 1): { rows: number; cols: number } | null {
  const table = tableAt(docFromJSON(doc), nth);
  if (!table) return null;
  return { rows: table.node.childCount, cols: table.node.firstChild?.childCount ?? 0 };
}

export function cellText(doc: WordDoc, row: number, col: number, nth = 1): string | null {
  const table = tableAt(docFromJSON(doc), nth);
  const cell = table?.node.maybeChild(row)?.maybeChild(col);
  return cell ? cell.textContent : null;
}

export function imagesOf(doc: WordDoc): { src: string; alt: string; width: string }[] {
  const out: { src: string; alt: string; width: string }[] = [];
  docFromJSON(doc).descendants((child) => {
    if (child.type.name === 'image') {
      const attrs = child.attrs as Record<string, string>;
      out.push({ src: attrs.src!, alt: attrs.alt ?? '', width: attrs.width ?? '40%' });
    }
    return true;
  });
  return out;
}
