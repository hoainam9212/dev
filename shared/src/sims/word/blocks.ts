import type { Node, NodeType } from '@tiptap/pm/model';
import { liftTarget, findWrapping } from '@tiptap/pm/transform';
import { docFromJSON, type WordDoc } from './schema';
import { clampRange, editDoc, findText, type DocEdit, type Range } from './text';

export type Align = 'left' | 'center' | 'right' | 'justify';
export type LineHeight = '1' | '1.5' | '2';
export type ListKind = 'bullet' | 'ordered';

export interface BlockReport {
  type: 'paragraph' | 'heading';
  /** 0 khi là đoạn thường. */
  level: number;
  align: string;
  lineHeight: string;
  list: ListKind | null;
}

const LIST_NODE: Record<ListKind, string> = { bullet: 'bulletList', ordered: 'orderedList' };

/** Mọi khối đoạn/tiêu đề giao với khoảng chọn, kèm vị trí của chúng. */
function blocksIn(node: Node, range: Range): { node: Node; pos: number }[] {
  const found: { node: Node; pos: number }[] = [];
  node.nodesBetween(range.from, range.to, (child, pos) => {
    if (child.type.name === 'paragraph' || child.type.name === 'heading') found.push({ node: child, pos });
    return true;
  });
  return found;
}

/** Đổi thuộc tính chung (căn lề, giãn dòng) cho mọi khối giao với vùng chọn. */
function setBlockAttr(doc: WordDoc, sel: Range, attr: 'textAlign' | 'lineHeight', value: string): DocEdit | null {
  const range = clampRange(doc, sel);
  const node = docFromJSON(doc);
  const targets = blocksIn(node, range);
  if (targets.length === 0) return null;
  return editDoc(doc, range, (tr) => {
    for (const target of targets) {
      const mapped = tr.mapping.map(target.pos);
      const current = tr.doc.nodeAt(mapped);
      if (!current) continue;
      tr.setNodeMarkup(mapped, undefined, { ...current.attrs, [attr]: value });
    }
  });
}

export function setAlign(doc: WordDoc, sel: Range, align: Align): DocEdit | null {
  return setBlockAttr(doc, sel, 'textAlign', align);
}

export function setLineHeight(doc: WordDoc, sel: Range, value: LineHeight): DocEdit | null {
  return setBlockAttr(doc, sel, 'lineHeight', value);
}

/** `level: 0` đưa khối về đoạn thường; căn lề và giãn dòng được giữ nguyên. */
export function setHeading(doc: WordDoc, sel: Range, level: 0 | 1 | 2 | 3): DocEdit | null {
  const range = clampRange(doc, sel);
  const node = docFromJSON(doc);
  const targets = blocksIn(node, range);
  if (targets.length === 0) return null;
  const schema = node.type.schema;
  const type = level === 0 ? schema.nodes.paragraph : schema.nodes.heading;
  if (!type) return null;

  return editDoc(doc, range, (tr) => {
    for (const target of targets) {
      const mapped = tr.mapping.map(target.pos);
      const current = tr.doc.nodeAt(mapped);
      if (!current) continue;
      const { textAlign, lineHeight } = current.attrs as Record<string, unknown>;
      const attrs = level === 0 ? { textAlign, lineHeight } : { level, textAlign, lineHeight };
      tr.setNodeMarkup(mapped, type, attrs);
    }
  });
}

/** Danh sách bao ngoài một vị trí, nếu có. */
function listAround(node: Node, pos: number): { kind: ListKind; depth: number } | null {
  const $pos = node.resolve(Math.min(Math.max(pos, 0), node.content.size));
  for (let depth = $pos.depth; depth > 0; depth--) {
    const name = $pos.node(depth).type.name;
    if (name === 'bulletList') return { kind: 'bullet', depth };
    if (name === 'orderedList') return { kind: 'ordered', depth };
  }
  return null;
}

/**
 * Bọc vào danh sách, gỡ ra, hoặc đổi loại danh sách. Đổi loại làm theo hai
 * bước (gỡ rồi bọc lại) — đủ dùng cho phạm vi bài học và tránh phải tự vá cấu
 * trúc danh sách lồng nhau.
 */
export function toggleList(doc: WordDoc, sel: Range, list: ListKind): DocEdit | null {
  const range = clampRange(doc, sel);
  const node = docFromJSON(doc);
  const targets = blocksIn(node, range);
  if (targets.length === 0) return null;
  const schema = node.type.schema;
  const listType = schema.nodes[LIST_NODE[list]];
  const itemType = schema.nodes.listItem;
  if (!listType || !itemType) return null;

  const firstPos = targets[0]?.pos ?? range.from;
  const current = listAround(node, firstPos + 1);

  if (current && current.kind === list) return lift(doc, range);
  if (current) {
    const lifted = lift(doc, range);
    if (!lifted) return null;
    const newRange = findRangeAgain(lifted.doc, node, range);
    return wrap(lifted.doc, newRange, listType, itemType, lifted);
  }
  return wrap(doc, range, listType, itemType);
}

function lift(doc: WordDoc, range: Range): DocEdit | null {
  return editDoc(doc, range, (tr) => {
    const $from = tr.doc.resolve(range.from);
    const $to = tr.doc.resolve(range.to);
    const blockRange = $from.blockRange($to);
    if (!blockRange) return;
    // Gỡ hai lần: một lần ra khỏi listItem, một lần ra khỏi bulletList/orderedList.
    for (let i = 0; i < 2; i++) {
      const r = tr.doc.resolve(tr.mapping.map(range.from)).blockRange(tr.doc.resolve(tr.mapping.map(range.to)));
      if (!r) break;
      const target = liftTarget(r);
      if (target === null) break;
      tr.lift(r, target);
    }
  });
}

function wrap(doc: WordDoc, range: Range, listType: NodeType, itemType: NodeType, previous?: DocEdit): DocEdit | null {
  const edit = editDoc(doc, range, (tr) => {
    const blockRange = tr.doc.resolve(range.from).blockRange(tr.doc.resolve(range.to));
    if (!blockRange) return;
    const wrapping = findWrapping(blockRange, listType, undefined, undefined) ?? findWrapping(blockRange, itemType);
    if (!wrapping) return;
    tr.wrap(blockRange, wrapping);
  });
  return previous ? { doc: edit.doc, sel: edit.sel } : edit;
}

/** Sau khi gỡ danh sách, vị trí dịch đi; tìm lại khoảng theo chữ đầu tiên. */
function findRangeAgain(doc: WordDoc, before: Node, range: Range): Range {
  const text = before.textBetween(range.from, Math.min(range.to, before.content.size), ' ');
  return findText(doc, text.trim()) ?? clampRange(doc, range);
}

/** Thông tin khối chứa đoạn chữ `text`. */
export function blockOf(doc: WordDoc, text: string, nth = 1): BlockReport | null {
  const range = findText(doc, text, nth);
  if (!range) return null;
  const node = docFromJSON(doc);
  const $pos = node.resolve(range.from);
  let block: Node | null = null;
  for (let depth = $pos.depth; depth > 0; depth--) {
    const candidate = $pos.node(depth);
    if (candidate.type.name === 'paragraph' || candidate.type.name === 'heading') {
      block = candidate;
      break;
    }
  }
  if (!block) return null;
  const attrs = block.attrs as Record<string, unknown>;
  return {
    type: block.type.name === 'heading' ? 'heading' : 'paragraph',
    level: block.type.name === 'heading' ? Number(attrs.level ?? 1) : 0,
    align: (attrs.textAlign as string | null) ?? 'left',
    lineHeight: (attrs.lineHeight as string | null) ?? '1',
    list: listAround(node, range.from)?.kind ?? null,
  };
}
