import type { CheckResult } from '../../grading/core';
import { plainText } from './schema';
import { marksOnText } from './marks';
import { blockOf, type Align, type LineHeight, type ListKind } from './blocks';
import { cellText, imagesOf, tableSizeOf } from './objects';
import { hasToc } from './doc';
import type { WordState } from './state';

export type WordCheck =
  | { kind: 'textContains'; text: string }
  | { kind: 'textNotContains'; text: string }
  | { kind: 'markOnText'; text: string; mark: 'bold' | 'italic' | 'underline' | 'color' | 'fontFamily' | 'fontSize' | 'highlight'; value?: string }
  | { kind: 'paragraphAlign'; text: string; align: Align }
  | { kind: 'lineHeight'; text: string; value: LineHeight }
  | { kind: 'listType'; text: string; list: ListKind }
  | { kind: 'headingLevel'; text: string; level: 1 | 2 | 3 }
  | { kind: 'tableSize'; rows: number; cols: number }
  | { kind: 'cellText'; row: number; col: number; text: string }
  | { kind: 'imageCount'; count: number }
  | { kind: 'hasToc' }
  | { kind: 'saved'; name?: string }
  | { kind: 'printed' };

const same = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();
const has = (haystack: string, needle: string) => haystack.toLowerCase().includes(needle.trim().toLowerCase());

const MARK_VI: Record<string, string> = {
  bold: 'in đậm',
  italic: 'in nghiêng',
  underline: 'gạch chân',
  color: 'màu chữ',
  fontFamily: 'phông chữ',
  fontSize: 'cỡ chữ',
  highlight: 'tô nền',
};

const ALIGN_VI: Record<string, string> = { left: 'căn trái', center: 'căn giữa', right: 'căn phải', justify: 'căn đều' };

/**
 * Mỗi thông báo nói rõ CÒN THIẾU GÌ, không phải "sai rồi" — người học mới dùng
 * máy tính cần biết bước tiếp theo, không cần biết mình vừa sai.
 */
export function gradeWord(s: WordState, c: WordCheck): CheckResult {
  const text = plainText(s.doc);

  switch (c.kind) {
    case 'textContains': {
      const ok = has(text, c.text);
      return { ok, messageVi: ok ? `Đã có “${c.text.trim()}” trong bài.` : `Chưa thấy dòng “${c.text.trim()}”.` };
    }
    case 'textNotContains': {
      const ok = !has(text, c.text);
      return { ok, messageVi: ok ? `“${c.text.trim()}” đã được bỏ đi.` : `“${c.text.trim()}” vẫn còn trong bài.` };
    }
    case 'markOnText': {
      const marks = marksOnText(s.doc, c.text);
      const what = MARK_VI[c.mark] ?? c.mark;
      if (!marks) return { ok: false, messageVi: `Chưa thấy chữ “${c.text}” trong bài.` };
      if (c.mark === 'bold' || c.mark === 'italic' || c.mark === 'underline') {
        const ok = marks[c.mark];
        return { ok, messageVi: ok ? `“${c.text}” đã được ${what}.` : `Hãy ${what} cho “${c.text}”.` };
      }
      const value = marks[c.mark];
      const ok = c.value === undefined ? value !== null : value === c.value;
      const wanted = c.value ? ` ${c.value}` : '';
      return { ok, messageVi: ok ? `“${c.text}” đã đổi ${what} rồi.` : `Hãy đặt ${what}${wanted} cho “${c.text}”.` };
    }
    case 'paragraphAlign': {
      const block = blockOf(s.doc, c.text);
      if (!block) return { ok: false, messageVi: `Chưa thấy đoạn “${c.text}” trong bài.` };
      const ok = block.align === c.align;
      return { ok, messageVi: ok ? `Đoạn “${c.text}” đã ${ALIGN_VI[c.align]}.` : `Hãy ${ALIGN_VI[c.align]} cho đoạn “${c.text}”.` };
    }
    case 'lineHeight': {
      const block = blockOf(s.doc, c.text);
      if (!block) return { ok: false, messageVi: `Chưa thấy đoạn “${c.text}” trong bài.` };
      const ok = block.lineHeight === c.value;
      return { ok, messageVi: ok ? `Đoạn “${c.text}” đã giãn dòng ${c.value}.` : `Hãy đặt giãn dòng ${c.value} cho đoạn “${c.text}”.` };
    }
    case 'listType': {
      const block = blockOf(s.doc, c.text);
      if (!block) return { ok: false, messageVi: `Chưa thấy dòng “${c.text}” trong bài.` };
      const ok = block.list === c.list;
      const what = c.list === 'bullet' ? 'danh sách chấm' : 'danh sách đánh số';
      return { ok, messageVi: ok ? `“${c.text}” đã nằm trong ${what}.` : `Hãy đưa “${c.text}” vào ${what}.` };
    }
    case 'headingLevel': {
      const block = blockOf(s.doc, c.text);
      if (!block) return { ok: false, messageVi: `Chưa thấy dòng “${c.text}” trong bài.` };
      const ok = block.type === 'heading' && block.level === c.level;
      return { ok, messageVi: ok ? `“${c.text}” đã là Heading ${c.level}.` : `Hãy đặt “${c.text}” thành Heading ${c.level}.` };
    }
    case 'tableSize': {
      const size = tableSizeOf(s.doc);
      if (!size) return { ok: false, messageVi: `Chưa có bảng nào trong bài. Hãy chèn bảng ${c.rows} hàng × ${c.cols} cột.` };
      const ok = size.rows === c.rows && size.cols === c.cols;
      return {
        ok,
        messageVi: ok
          ? `Bảng đã đúng ${c.rows} hàng × ${c.cols} cột.`
          : `Bảng đang ${size.rows} hàng × ${size.cols} cột, cần ${c.rows} hàng × ${c.cols} cột.`,
      };
    }
    case 'cellText': {
      const value = cellText(s.doc, c.row, c.col);
      if (value === null) return { ok: false, messageVi: `Chưa có ô ở hàng ${c.row + 1}, cột ${c.col + 1}.` };
      const ok = same(value, c.text);
      return { ok, messageVi: ok ? `Ô hàng ${c.row + 1}, cột ${c.col + 1} đã đúng.` : `Hãy gõ “${c.text}” vào ô hàng ${c.row + 1}, cột ${c.col + 1}.` };
    }
    case 'imageCount': {
      const count = imagesOf(s.doc).length;
      const ok = count === c.count;
      return { ok, messageVi: ok ? `Bài đã có ${c.count} ảnh.` : `Bài đang có ${count} ảnh, cần ${c.count} ảnh.` };
    }
    case 'hasToc': {
      const ok = hasToc(s.doc);
      return { ok, messageVi: ok ? 'Mục lục đã có ở đầu bài.' : 'Hãy chèn mục lục ở đầu bài.' };
    }
    case 'saved': {
      if (!s.saved) return { ok: false, messageVi: 'Hãy lưu bài lại (File → Lưu).' };
      const ok = c.name === undefined || same(s.saved.name, c.name);
      return { ok, messageVi: ok ? `Đã lưu với tên “${s.saved.name}”.` : `Hãy lưu với tên “${c.name}”.` };
    }
    case 'printed':
      return { ok: s.printed, messageVi: s.printed ? 'Đã xem bản in.' : 'Hãy mở File → In để xem bản in thử.' };
  }
}
