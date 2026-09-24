import { HELP_IDS } from '../content/help-ids';

/**
 * Chữ cho thuộc tính `title` (ô trắng của trình duyệt). Nút đã có gợi ý màu tối của app thì trả
 * `undefined`, để người học không thấy hai chú thích chồng nhau. Tên đọc cho trình đọc màn hình
 * vẫn nằm ở `aria-label`.
 */
export function nativeTitle(helpId: string, text: string): string | undefined {
  return HELP_IDS[helpId] ? undefined : text;
}
