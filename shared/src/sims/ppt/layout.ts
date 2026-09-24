import type { El, ElFormat, Layout, Role, Slide } from './state';

/**
 * Chỗ nội dung dừng ở y = 384 (không kéo tới 480) để dải 400–480 còn trống: hộp chữ
 * mới của nút Text Box đặt ở đó, không đè lên chỗ dành sẵn nào.
 */
export const PLACEHOLDERS: Record<Layout, { role: Role; x: number; y: number; w: number; h: number }[]> = {
  title: [{ role: 'title', x: 80, y: 176, w: 800, h: 120 }],
  titleContent: [
    { role: 'title', x: 80, y: 56, w: 800, h: 96 },
    { role: 'body', x: 80, y: 176, w: 800, h: 208 },
  ],
  twoContent: [
    { role: 'title', x: 80, y: 56, w: 800, h: 96 },
    { role: 'body', x: 80, y: 176, w: 384, h: 208 },
    { role: 'body2', x: 496, y: 176, w: 384, h: 208 },
  ],
  blank: [],
};

const FMT: Record<Role, ElFormat> = {
  title: { size: 40, bold: true, align: 'center' },
  body: { size: 24, align: 'left' },
  body2: { size: 24, align: 'left' },
};

/**
 * Đổi bố cục **giữ chữ** của chỗ dành sẵn cùng vai trò, và không bao giờ đụng tới
 * đối tượng tự chèn (`role` trống) — người học đã đặt chúng ở đâu thì giữ nguyên đó.
 */
export function applyLayout(slide: Slide, layout: Layout, nextId: number): { slide: Slide; nextId: number } {
  let id = nextId;
  const own = slide.els.filter((e) => !e.role);
  const holders = PLACEHOLDERS[layout].map((p) => {
    const old = slide.els.find((e) => e.role === p.role);
    const el: El = {
      id: old?.id ?? `e${id++}`,
      kind: 'text',
      role: p.role,
      x: p.x,
      y: p.y,
      w: p.w,
      h: p.h,
      text: old?.text ?? '',
      fmt: old?.fmt ?? FMT[p.role],
    };
    return el;
  });
  return { slide: { ...slide, layout, els: [...holders, ...own] }, nextId: id };
}
