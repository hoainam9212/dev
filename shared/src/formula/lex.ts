import { parseRange, parseRef } from './refs';

export type Token =
  | { t: 'num'; v: number }
  | { t: 'str'; v: string }
  | { t: 'bool'; v: boolean }
  | { t: 'ref'; v: string }
  | { t: 'range'; v: string }
  | { t: 'name'; v: string }
  | { t: 'op'; v: string }
  | { t: 'lp' }
  | { t: 'rp' }
  | { t: 'comma' };

export class LexError extends Error {}

/** Toán tử hai ký tự phải thử TRƯỚC toán tử một ký tự, kẻo `<=` thành `<` rồi `=`. */
const OPS2 = ['<=', '>=', '<>'];
const OPS1 = ['+', '-', '*', '/', '^', '&', '=', '<', '>', '%'];

/**
 * Một chuỗi chữ cái + số có thể là vùng (`B2:B10`), là ô (`$A$1`), là tên sheet
 * kèm ô (`Sheet2!A1`), hay là tên hàm. Thử theo đúng thứ tự đó: vùng trước ô,
 * ô trước tên — nếu không `B2:B10` sẽ thành ba token rời.
 *
 * Phần tên sheet dùng `\p{L}` chứ không phải `[A-Za-z]`: người học đặt tên sheet
 * bằng tiếng Việt có dấu ("Báo cáo", "Bảng lương"), và `=Báo cáo!B1` phải chạy.
 * Phần địa chỉ ô thì vẫn chỉ ASCII, vì cột bảng tính chỉ có A–Z.
 */
const WORD = /^(?:'[^']+'|[\p{L}_][\p{L}0-9_. ]*)?!?\$?[A-Za-z]+\$?[0-9]*(?::\$?[A-Za-z]+\$?[0-9]+)?/u;

export function lex(src: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  while (i < src.length) {
    const ch = src[i]!;
    if (ch === ' ' || ch === '\t' || ch === '\n') { i++; continue; }
    if (ch === '(') { out.push({ t: 'lp' }); i++; continue; }
    if (ch === ')') { out.push({ t: 'rp' }); i++; continue; }
    if (ch === ',' || ch === ';') { out.push({ t: 'comma' }); i++; continue; }
    if (ch === '"') {
      const end = src.indexOf('"', i + 1);
      if (end < 0) throw new LexError('Thiếu dấu nháy kép đóng');
      out.push({ t: 'str', v: src.slice(i + 1, end) });
      i = end + 1;
      continue;
    }
    if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(src[i + 1] ?? ''))) {
      const m = /^[0-9]*\.?[0-9]+/.exec(src.slice(i))!;
      out.push({ t: 'num', v: Number(m[0]) });
      i += m[0].length;
      continue;
    }
    const two = src.slice(i, i + 2);
    if (OPS2.includes(two)) { out.push({ t: 'op', v: two }); i += 2; continue; }
    if (OPS1.includes(ch)) { out.push({ t: 'op', v: ch }); i++; continue; }
    if (/[\p{L}_$']/u.test(ch)) {
      const m = WORD.exec(src.slice(i));
      if (!m || m[0] === '') throw new LexError(`Không hiểu ký tự "${ch}"`);
      const word = m[0];
      const upper = word.toUpperCase();
      if (upper === 'TRUE' || upper === 'FALSE') out.push({ t: 'bool', v: upper === 'TRUE' });
      else if (word.includes(':') && parseRange(word)) out.push({ t: 'range', v: word });
      else if (parseRef(word)) out.push({ t: 'ref', v: word });
      else out.push({ t: 'name', v: upper });
      i += word.length;
      continue;
    }
    if (ch === '#') {
      // `#REF!` do copy trôi ra ngoài lưới sinh ra; giữ nguyên làm một tên để
      // trình tính đổi thành lỗi.
      const m = /^#[A-Z0-9/!?]+/.exec(src.slice(i));
      if (m) { out.push({ t: 'name', v: m[0] }); i += m[0].length; continue; }
    }
    throw new LexError(`Không hiểu ký tự "${ch}"`);
  }
  return out;
}
