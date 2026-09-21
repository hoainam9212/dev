import { Schema, type MarkSpec, type Node, type NodeSpec } from '@tiptap/pm/model';

/** Tài liệu Word ở dạng JSON của ProseMirror. */
export type WordDoc = Record<string, unknown>;

/** Hai thuộc tính dùng chung cho đoạn văn và tiêu đề. */
const blockAttrs = {
  textAlign: { default: null as string | null },
  lineHeight: { default: null as string | null },
};

function styleOf(attrs: Record<string, unknown>): string {
  const parts: string[] = [];
  if (attrs.textAlign) parts.push(`text-align:${String(attrs.textAlign)}`);
  if (attrs.lineHeight) parts.push(`line-height:${String(attrs.lineHeight)}`);
  return parts.join(';');
}

const cellAttrs = {
  colspan: { default: 1 },
  rowspan: { default: 1 },
  colwidth: { default: null as number[] | null },
};

/**
 * Tên node và mark viết kiểu camelCase để TRÙNG tên TipTap dùng ở giao diện
 * (`bulletList`, `tableRow`, `textStyle`…). `prosemirror-schema-list` và
 * `prosemirror-tables` sinh tên kiểu `bullet_list`, `table_row` nên ta tự khai
 * báo; hành vi của bảng vẫn do `tableRole` quyết định chứ không do tên.
 */
const nodes: Record<string, NodeSpec> = {
  doc: { content: 'block+' },
  paragraph: {
    content: 'inline*',
    group: 'block',
    attrs: blockAttrs,
    parseDOM: [{ tag: 'p' }],
    toDOM: (node) => ['p', { style: styleOf(node.attrs) }, 0],
  },
  heading: {
    content: 'inline*',
    group: 'block',
    defining: true,
    attrs: { level: { default: 1 }, ...blockAttrs },
    parseDOM: [1, 2, 3].map((level) => ({ tag: `h${level}`, attrs: { level } })),
    toDOM: (node) => [`h${node.attrs.level as number}`, { style: styleOf(node.attrs) }, 0],
  },
  bulletList: {
    content: 'listItem+',
    group: 'block',
    parseDOM: [{ tag: 'ul' }],
    toDOM: () => ['ul', 0],
  },
  orderedList: {
    content: 'listItem+',
    group: 'block',
    parseDOM: [{ tag: 'ol' }],
    toDOM: () => ['ol', 0],
  },
  listItem: {
    content: 'paragraph block*',
    defining: true,
    parseDOM: [{ tag: 'li' }],
    toDOM: () => ['li', 0],
  },
  table: {
    content: 'tableRow+',
    tableRole: 'table',
    isolating: true,
    group: 'block',
    parseDOM: [{ tag: 'table' }],
    toDOM: () => ['table', ['tbody', 0]],
  },
  tableRow: {
    content: '(tableCell | tableHeader)*',
    tableRole: 'row',
    parseDOM: [{ tag: 'tr' }],
    toDOM: () => ['tr', 0],
  },
  tableCell: {
    content: 'block+',
    attrs: cellAttrs,
    tableRole: 'cell',
    isolating: true,
    parseDOM: [{ tag: 'td' }],
    toDOM: () => ['td', 0],
  },
  tableHeader: {
    content: 'block+',
    attrs: cellAttrs,
    tableRole: 'header_cell',
    isolating: true,
    parseDOM: [{ tag: 'th' }],
    toDOM: () => ['th', 0],
  },
  image: {
    inline: false,
    group: 'block',
    draggable: true,
    attrs: { src: {}, alt: { default: '' }, width: { default: '40%' } },
    parseDOM: [
      {
        tag: 'img[src]',
        // `shared` không bật lib DOM (nó phải chạy được ngoài trình duyệt), nên
        // dùng kiểu cấu trúc thay vì HTMLElement.
        getAttrs: (dom) => {
          const el = dom as { getAttribute(name: string): string | null };
          return { src: el.getAttribute('src'), alt: el.getAttribute('alt') ?? '' };
        },
      },
    ],
    toDOM: (node) => ['img', { src: node.attrs.src as string, alt: node.attrs.alt as string, style: `width:${node.attrs.width as string}` }],
  },
  text: { group: 'inline' },
};

const marks: Record<string, MarkSpec> = {
  bold: { parseDOM: [{ tag: 'strong' }, { tag: 'b' }], toDOM: () => ['strong', 0] },
  italic: { parseDOM: [{ tag: 'em' }, { tag: 'i' }], toDOM: () => ['em', 0] },
  underline: { parseDOM: [{ tag: 'u' }], toDOM: () => ['u', 0] },
  highlight: {
    attrs: { color: { default: '#FFF3B0' } },
    parseDOM: [{ tag: 'mark' }],
    toDOM: (mark) => ['mark', { style: `background-color:${mark.attrs.color as string}` }, 0],
  },
  textStyle: {
    attrs: {
      color: { default: null as string | null },
      fontFamily: { default: null as string | null },
      fontSize: { default: null as string | null },
    },
    parseDOM: [{ tag: 'span', getAttrs: () => ({}) }],
    toDOM: (mark) => {
      const { color, fontFamily, fontSize } = mark.attrs as Record<string, string | null>;
      const style = [
        color ? `color:${color}` : '',
        fontFamily ? `font-family:${fontFamily}` : '',
        fontSize ? `font-size:${fontSize}` : '',
      ].filter(Boolean).join(';');
      return ['span', { style }, 0];
    },
  },
};

export const wordSchema = new Schema({ nodes, marks });

export function docFromJSON(json: WordDoc): Node {
  return wordSchema.nodeFromJSON(json);
}

/**
 * `Node.toJSON` của ProseMirror kèm `attrs` bất cứ khi nào node có thuộc tính,
 * kể cả khi mọi giá trị đúng bằng mặc định — tài liệu sẽ đầy `{"textAlign":null}`
 * và bài học rất khó đọc. Ở đây ta lược bỏ những giá trị bằng mặc định, nên một
 * đoạn chưa định dạng xuất ra đúng `{ "type": "paragraph" }`.
 */
export function docToJSON(node: Node): WordDoc {
  return strip(node.toJSON() as WordDoc) as WordDoc;
}

function strip(json: unknown): unknown {
  if (Array.isArray(json)) return json.map(strip);
  if (!json || typeof json !== 'object') return json;
  const obj = { ...(json as Record<string, unknown>) };
  const kind = typeof obj.type === 'string' ? obj.type : '';
  const defaults = wordSchema.nodes[kind]?.spec.attrs ?? wordSchema.marks[kind]?.spec.attrs;
  if (obj.attrs && defaults) {
    const kept: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj.attrs as Record<string, unknown>)) {
      const spec = defaults[key];
      const hasDefault = spec !== undefined && 'default' in spec;
      if (!hasDefault || JSON.stringify(value) !== JSON.stringify(spec.default)) kept[key] = value;
    }
    if (Object.keys(kept).length) obj.attrs = kept;
    else delete obj.attrs;
  }
  if (Array.isArray(obj.content)) obj.content = obj.content.map(strip);
  if (Array.isArray(obj.marks)) obj.marks = obj.marks.map(strip);
  return obj;
}

/**
 * Tài liệu từ chữ thô: MỖI DÒNG một đoạn văn. Nhờ vậy bài học dựng sẵn tài liệu
 * nhiều đoạn chỉ bằng một chuỗi, không phải xếp `splitBlock` thủ công (rất dễ
 * tách nhầm chỗ vì con trỏ mặc định nằm ở đầu đoạn).
 */
export function emptyDoc(text?: string): WordDoc {
  const lines = (text ?? '').split('\n');
  const content = lines.map((line) => (line ? { type: 'paragraph', content: [{ type: 'text', text: line }] } : { type: 'paragraph' }));
  return { type: 'doc', content };
}

/** Text của một node và mọi node con. */
function textOf(json: unknown): string {
  if (!json || typeof json !== 'object') return '';
  const node = json as { type?: string; text?: string; content?: unknown[] };
  if (node.type === 'text') return node.text ?? '';
  const parts = (node.content ?? []).map(textOf).filter((t) => t !== '');
  // Ô bảng và mục danh sách nằm cùng một dòng với nhau, ngăn bằng khoảng trắng.
  const sep = node.type === 'table' || node.type === 'tableRow' || node.type === 'bulletList' || node.type === 'orderedList' ? ' ' : '';
  return parts.join(sep);
}

/** Toàn bộ chữ trong tài liệu; mỗi khối con của `doc` là một dòng. */
export function plainText(doc: WordDoc): string {
  return ((doc as { content?: unknown[] }).content ?? []).map(textOf).join('\n');
}
