import { useEffect, useRef } from 'react';
import { Extension } from '@tiptap/core';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Image from '@tiptap/extension-image';
import { TextSelection } from '@tiptap/pm/state';
import type { EditorView } from '@tiptap/pm/view';
import type { wordSim } from '@office-neko/shared';

interface Props {
  state: wordSim.WordState;
  dispatch: (a: wordSim.WordAction) => void;
}

/**
 * TipTap chỉ giữ những thuộc tính mà extension của nó khai báo. Schema ở
 * `shared` có `fontSize` (trên mark textStyle) và `lineHeight` (trên đoạn văn và
 * tiêu đề) mà TipTap không biết, nên nếu không khai báo thêm thì hai thuộc tính
 * này bị XOÁ mỗi lần nạp tài liệu vào editor — cỡ chữ và giãn dòng "mất" ngay
 * sau khi đặt.
 */
const TextStyleWithSize = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize || null,
        renderHTML: (attributes) => (attributes.fontSize ? { style: `font-size: ${String(attributes.fontSize)}` } : {}),
      },
    };
  },
});

const LineHeight = Extension.create({
  name: 'lineHeight',
  addGlobalAttributes() {
    return [
      {
        types: ['paragraph', 'heading'],
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: (element) => element.style.lineHeight || null,
            renderHTML: (attributes) => (attributes.lineHeight ? { style: `line-height: ${String(attributes.lineHeight)}` } : {}),
          },
        },
      },
    ];
  },
});

/**
 * Phím di chuyển con trỏ (Shift+End, Home, ↓) do trình duyệt tự làm; ProseMirror chỉ đọc vùng chọn mới khi sự kiện
 * `selectionchange` tới, và lúc keydown nó không đọc lại nếu không có thay đổi nội dung chờ. Phím tắt đến trước sự
 * kiện ấy (công cụ tự động, trình đọc màn hình, người gõ cực nhanh) sẽ in đậm / gạch chân nhầm vùng chọn CŨ. Nên trước
 * mỗi phím, nếu vùng chọn trên màn hình khác vùng chọn ProseMirror đang giữ thì lấy cái trên màn hình.
 * Bỏ qua khi đang gõ dấu bằng bộ gõ (keyCode 229) và khi đang chọn ảnh / ô bảng (không phải TextSelection).
 */
function syncDomSelection(view: EditorView, event: KeyboardEvent): boolean {
  if (event.isComposing || event.keyCode === 229) return false;
  const current = view.state.selection;
  if (!(current instanceof TextSelection)) return false;
  const dom = view.dom.ownerDocument.getSelection();
  if (!dom?.anchorNode || !dom.focusNode) return false;
  if (!view.dom.contains(dom.anchorNode) || !view.dom.contains(dom.focusNode)) return false;
  let anchor: number;
  let head: number;
  try {
    anchor = view.posAtDOM(dom.anchorNode, dom.anchorOffset);
    head = view.posAtDOM(dom.focusNode, dom.focusOffset);
  } catch {
    return false;
  }
  if (current.anchor === anchor && current.head === head) return false;
  view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, anchor, head)));
  return false;
}

const extensions = [
  StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
  Underline,
  TextStyleWithSize,
  LineHeight,
  Color,
  FontFamily,
  Highlight.configure({ multicolor: true }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Table.configure({ resizable: false }),
  TableRow,
  TableCell,
  TableHeader,
  Image,
];

/**
 * Cầu nối TipTap ↔ reducer. Reducer là nguồn sự thật duy nhất:
 * - người dùng gõ → `onUpdate` → `setDoc` vào reducer;
 * - nút ribbon đổi `state.doc` → nạp ngược tài liệu vào editor.
 * Cờ `applying` chặn vòng lặp: lần `onUpdate` sinh ra bởi chính việc nạp ngược
 * không được dội trở lại reducer.
 */
export function Editor({ state, dispatch }: Props) {
  const applying = useRef(false);

  const editor = useEditor({
    extensions,
    content: state.doc,
    onUpdate: ({ editor: instance }) => {
      if (applying.current) return;
      dispatch({ type: 'setDoc', doc: instance.getJSON() as wordSim.WordDoc });
    },
    onSelectionUpdate: ({ editor: instance }) => {
      if (applying.current) return;
      const { from, to } = instance.state.selection;
      dispatch({ type: 'setSelection', from, to });
    },
    editorProps: {
      // Chạy trước mọi keymap của extension (Ctrl+B/I/U…), nên phím tắt luôn thấy vùng chọn đúng.
      handleKeyDown: syncDomSelection,
      attributes: { class: 'word-prose outline-none', 'data-help-id': 'word.editor', 'aria-label': 'Vùng soạn thảo' },
    },
  });

  // Nạp ngược khi tài liệu đổi vì một thao tác KHÔNG đến từ editor.
  useEffect(() => {
    if (!editor) return;
    if (JSON.stringify(editor.getJSON()) === JSON.stringify(state.doc)) return;
    applying.current = true;
    editor.commands.setContent(state.doc as never, false);
    const size = editor.state.doc.content.size;
    editor.commands.setTextSelection({
      from: Math.min(state.sel.from, size),
      to: Math.min(state.sel.to, size),
    });
    applying.current = false;
  }, [editor, state.doc, state.sel.from, state.sel.to]);

  return <EditorContent editor={editor} />;
}
