import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Đọc thẳng file từ đĩa: đây là test về CÁCH VIẾT CSS nguồn. (`import ... ?raw`
// không dùng được vì plugin Tailwind biên dịch file trước khi tới tay test.)
const css = readFileSync(resolve(process.cwd(), 'src/styles/theme.css'), 'utf8');

/** Nội dung bên trong khối `@layer components { … }` (khối duy nhất, lồng một cấp). */
function componentsLayer(source: string): string {
  const start = source.indexOf('@layer components');
  if (start === -1) return '';
  let depth = 0;
  for (let i = source.indexOf('{', start); i < source.length; i++) {
    if (source[i] === '{') depth++;
    else if (source[i] === '}' && --depth === 0) return source.slice(start, i);
  }
  return '';
}

describe('theme.css', () => {
  /**
   * Tailwind 4 đặt utility vào `@layer utilities`, mà CSS không thuộc layer nào
   * thì luôn thắng CSS có layer. Để `.card` ra ngoài layer thì `box-shadow` của
   * nó nuốt mất `ring-*` (ring cũng là box-shadow) — viền "đang chọn" ở màn hình
   * chào biến mất và người dùng tưởng không bấm chọn được.
   */
  it('keeps component classes inside @layer components so utilities can override them', () => {
    const inLayer = componentsLayer(css);
    expect(inLayer, 'thiếu khối @layer components').not.toBe('');
    for (const cls of ['.card', '.btn', '.btn-primary', '.kbd', '.term', '.cellbox', '.gridhead', '.ppt-stage', '.ppt-canvas', '.ppt-el', '.ppt-thumb', '.ribbon-menu', '.ribbon-soon']) {
      expect(inLayer.includes(`${cls} `) || inLayer.includes(`${cls},`) || inLayer.includes(`${cls} {`), `${cls} phải nằm trong @layer components`).toBe(true);
    }
  });

  /**
   * Mọi lớp thành phần phải nằm ở CẤP ĐẦU của `@layer components`. Lần đầu viết
   * `.cellbox`/`.gridhead` chúng lọt vào trong khối `:root[data-motion="reduce"]`
   * (chèn nhầm ngay trước dấu } cuối file) nên lưới bảng tính không có đường kẻ ô
   * nào — test cũ vẫn xanh vì nó chỉ hỏi "chuỗi này có trong layer không".
   */
  it('declares every component class at the top level of the layer, not nested in another rule', () => {
    const inLayer = componentsLayer(css);
    const body = inLayer.slice(inLayer.indexOf('{') + 1);
    let depth = 0;
    const topLevel: string[] = [];
    let line = '';
    for (const ch of body) {
      if (ch === '{') {
        if (depth === 0) topLevel.push(line.trim());
        depth++;
        line = '';
      } else if (ch === '}') {
        depth--;
        line = '';
      } else if (depth === 0) {
        line += ch;
      }
    }
    const selectors = topLevel.join(' | ');
    for (const cls of ['.card', '.btn', '.kbd', '.term', '.cellbox', '.gridhead', '.ppt-stage', '.ppt-canvas', '.ppt-el', '.ppt-thumb', '.ribbon-menu', '.ribbon-soon', '.ppt-slide-layer', '.ppt-tr-fade', '.ppt-tr-push', '.ppt-tr-zoom']) {
      expect(selectors.includes(cls), `${cls} phải ở cấp đầu của @layer components`).toBe(true);
    }
  });

  it('does not declare box-shadow for .card outside a layer', () => {
    const outside = css.replace(componentsLayer(css), '');
    expect(outside.includes('.card')).toBe(false);
  });
});
