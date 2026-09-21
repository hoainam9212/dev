import type { Node } from '@tiptap/pm/model';
import { docFromJSON, plainText, type WordDoc } from './schema';
import { clampRange, editDoc, findText, type DocEdit, type Range } from './text';

export const TOC_TITLE = 'Mục lục';
const INDENT: Record<number, string> = { 1: '', 2: '   ', 3: '      ' };

export interface Heading {
  level: number;
  title: string;
}

/** Mọi khoảng khớp `find`, không phân biệt hoa thường (nhưng phân biệt dấu). */
function matches(doc: WordDoc, find: string): Range[] {
  if (!find) return [];
  const haystack = plainText(doc).toLowerCase();
  const needle = find.toLowerCase();
  const out: Range[] = [];
  let index = haystack.indexOf(needle);
  let nth = 1;
  while (index !== -1) {
    // Tìm theo đúng chữ trong tài liệu để lấy vị trí ProseMirror thật.
    const original = plainText(doc).slice(index, index + find.length);
    const range = findText(doc, original, countBefore(doc, original, index));
    if (range) out.push(range);
    index = haystack.indexOf(needle, index + 1);
    nth += 1;
  }
  return out;
}

/** `original` là lần xuất hiện thứ mấy tính tới vị trí `index`. */
function countBefore(doc: WordDoc, original: string, index: number): number {
  const text = plainText(doc);
  let count = 0;
  let at = text.indexOf(original);
  while (at !== -1 && at <= index) {
    count += 1;
    if (at === index) break;
    at = text.indexOf(original, at + 1);
  }
  return Math.max(1, count);
}

export function countMatches(doc: WordDoc, find: string): number {
  if (!find) return 0;
  const haystack = plainText(doc).toLowerCase();
  const needle = find.toLowerCase();
  let count = 0;
  let index = haystack.indexOf(needle);
  while (index !== -1) {
    count += 1;
    index = haystack.indexOf(needle, index + 1);
  }
  return count;
}

/** Thay mọi lần xuất hiện trong MỘT transaction: một lần hoàn tác là về như cũ. */
export function replaceAll(doc: WordDoc, sel: Range, find: string, replace: string): DocEdit | null {
  const ranges = matches(doc, find);
  if (ranges.length === 0) return null;
  return editDoc(doc, clampRange(doc, sel), (tr) => {
    // Thay từ CUỐI về ĐẦU để vị trí phía trước không bị dịch.
    for (const range of [...ranges].sort((a, b) => b.from - a.from)) {
      tr.insertText(replace, range.from, range.to);
    }
  });
}

export function replaceOne(doc: WordDoc, sel: Range, find: string, replace: string, nth = 1): DocEdit | null {
  const ranges = matches(doc, find);
  const range = ranges[nth - 1];
  if (!range) return null;
  return editDoc(doc, clampRange(doc, sel), (tr) => {
    tr.insertText(replace, range.from, range.to);
  });
}

/** Heading 1–3 trong tài liệu, bỏ qua chính tiêu đề "Mục lục". */
export function headingsOf(doc: WordDoc): Heading[] {
  const out: Heading[] = [];
  docFromJSON(doc).forEach((block) => {
    if (block.type.name !== 'heading') return;
    const title = block.textContent;
    if (title === TOC_TITLE) return;
    out.push({ level: Number((block.attrs as Record<string, unknown>).level ?? 1), title });
  });
  return out;
}

/** Vị trí khối `heading "Mục lục"` và danh sách ngay sau nó, nếu có. */
function tocBlocks(node: Node): { from: number; to: number; list: Node } | null {
  let found: { from: number; to: number; list: Node } | null = null;
  let offset = 0;
  node.forEach((block, blockOffset, index) => {
    if (found) return;
    const isTitle = block.type.name === 'heading' && block.textContent === TOC_TITLE;
    const next = index + 1 < node.childCount ? node.child(index + 1) : null;
    if (isTitle && next && (next.type.name === 'bulletList' || next.type.name === 'orderedList')) {
      found = { from: blockOffset, to: blockOffset + block.nodeSize + next.nodeSize, list: next };
    }
    offset = blockOffset;
  });
  void offset;
  return found;
}

export function hasToc(doc: WordDoc): boolean {
  return tocBlocks(docFromJSON(doc)) !== null;
}

/** Các dòng mục lục hiện có, đọc ngược từ phần thụt đầu dòng. */
export function tocEntries(doc: WordDoc): Heading[] {
  const toc = tocBlocks(docFromJSON(doc));
  if (!toc) return [];
  const out: Heading[] = [];
  toc.list.forEach((item) => {
    const raw = item.textContent;
    const level = raw.startsWith(INDENT[3]!) ? 3 : raw.startsWith(INDENT[2]!) ? 2 : 1;
    out.push({ level, title: raw.trimStart() });
  });
  return out;
}

/** Dựng (hoặc dựng lại) mục lục ở đầu tài liệu từ các Heading hiện có. */
export function writeToc(doc: WordDoc, sel: Range): DocEdit | null {
  const node = docFromJSON(doc);
  const schema = node.type.schema;
  const headings = headingsOf(doc);
  const existing = tocBlocks(node);
  if (headings.length === 0 && !existing) return null;

  const title = schema.nodes.heading!.create({ level: 1 }, schema.text(TOC_TITLE));
  const items = headings.map((h) =>
    schema.nodes.listItem!.create(null, schema.nodes.paragraph!.create(null, schema.text(`${INDENT[h.level] ?? ''}${h.title}`))),
  );
  const list = items.length ? schema.nodes.bulletList!.create(null, items) : null;

  return editDoc(doc, clampRange(doc, sel), (tr) => {
    if (existing) tr.delete(existing.from, existing.to);
    const blocks = list ? [title, list] : [title];
    tr.insert(0, blocks);
  });
}
