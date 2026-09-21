import { useEffect, useRef } from 'react';
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
import type { wordSim } from '@office-neko/shared';

interface Props {
  state: wordSim.WordState;
  dispatch: (a: wordSim.WordAction) => void;
}

const extensions = [
  StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
  Underline,
  TextStyle,
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
