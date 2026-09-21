import { FUNCTIONS } from './functions';
import type { ErrCode } from './types';

/** Mỗi mã lỗi: chuyện gì đã xảy ra, và làm gì để sửa. Cả hai đều bằng tiếng Việt. */
const EXPLAIN: Record<ErrCode, { what: string; fix: string }> = {
  '#DIV/0!': {
    what: 'Công thức đang chia cho số không (hoặc chia cho một ô còn trống).',
    fix: 'Xem lại ô ở dưới dấu chia — có thể ô đó chưa được nhập số.',
  },
  '#N/A': {
    what: 'Hàm tra cứu không tìm thấy giá trị cần tìm trong bảng tra.',
    fix: 'Kiểm tra xem giá trị cần tra có đúng trong cột đầu tiên của bảng tra không, và có thừa khoảng trắng không.',
  },
  '#REF!': {
    what: 'Công thức đang trỏ tới một ô không còn tồn tại, hoặc nằm ngoài bảng tính.',
    fix: 'Gõ lại địa chỉ ô cho đúng. Lỗi này hay xuất hiện sau khi chép công thức ra quá xa.',
  },
  '#NAME?': {
    what: 'Bảng tính không hiểu một cái tên trong công thức.',
    fix: 'Xem lại tên hàm có gõ đúng chính tả không, và đã mở đủ dấu ngoặc chưa.',
  },
  '#VALUE!': {
    what: 'Công thức đang tính toán trên một ô chứa chữ chứ không phải số.',
    fix: 'Kiểm tra các ô trong công thức, đổi chữ thành số hoặc bỏ ô đó ra khỏi phép tính.',
  },
  '#CIRC!': {
    what: 'Công thức đang tự tính bằng chính nó, nên không bao giờ ra kết quả.',
    fix: 'Bỏ địa chỉ của chính ô này ra khỏi công thức của nó.',
  },
};

export function explainError(code: ErrCode): { what: string; fix: string } {
  return EXPLAIN[code];
}

const FN_START = new RegExp(`^(${Object.keys(FUNCTIONS).join('|')})\\s*\\(`, 'i');
/** Địa chỉ + toán tử + thứ gì đó: `A1+B1`, `B2*0.1`. */
const CALC = /^\$?[A-Za-z]{1,2}\$?[0-9]{1,4}\s*[-+*/^&]\s*\S/;

/**
 * Lỗi hay gặp nhất của người mới: gõ `SUM(A1:A5)` mà quên dấu `=`. Theo Excel ô
 * đó là CHỮ chứ không phải lỗi, nên không thể trả về một `FormulaError` — giao
 * diện dùng hàm này để nhắc nhẹ.
 *
 * Bắt hẹp có chủ ý: chỉ khi chuỗi mở đầu bằng tên hàm đã biết kèm `(`, hoặc
 * trông đúng như một phép tính. "Ca 1" hay "Nguyễn Văn Nam" không bị nhắc.
 */
export function looksLikeForgottenEquals(raw: string): boolean {
  const text = raw.trim();
  if (text === '' || text.startsWith('=')) return false;
  return FN_START.test(text) || CALC.test(text);
}
