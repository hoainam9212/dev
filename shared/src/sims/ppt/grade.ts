import type { CheckResult } from '../../grading/core';
import type { ElKind, Layout, PptState, ShapeKind, Slide } from './state';

export type PptCheck =
  | { kind: 'slideCount'; count: number }
  | { kind: 'slideLayout'; slide: number; layout: Layout }
  | { kind: 'slideTitle'; slide: number; text?: string; notEmpty?: true }
  | { kind: 'hasElement'; slide: number; el: ElKind; min?: number; shape?: ShapeKind; textContains?: string };

const ok = (messageVi: string): CheckResult => ({ ok: true, messageVi });
const no = (messageVi: string): CheckResult => ({ ok: false, messageVi });

const LAYOUT_VI: Record<Layout, string> = {
  title: 'Slide tiêu đề',
  titleContent: 'Tiêu đề và nội dung',
  twoContent: 'Hai cột nội dung',
  blank: 'Trang trắng',
};

const EL_VI: Record<ElKind, string> = { text: 'hộp chữ', shape: 'hình khối', image: 'ảnh' };

const SHAPE_VI: Record<ShapeKind, string> = {
  rect: 'hình chữ nhật',
  ellipse: 'hình tròn',
  arrow: 'mũi tên',
  star: 'ngôi sao',
};

/** Đề bài nói "slide 2"; mảng đếm từ 0. */
function slideAt(s: PptState, n: number): Slide | null {
  return s.slides[n - 1] ?? null;
}

const same = (a: string, b: string): boolean => a.trim().toLowerCase() === b.trim().toLowerCase();

export function gradePpt(s: PptState, c: PptCheck): CheckResult {
  switch (c.kind) {
    case 'slideCount':
      return s.slides.length === c.count
        ? ok(`Bài trình chiếu có đúng ${c.count} slide.`)
        : no(`Cần ${c.count} slide, hiện có ${s.slides.length}.`);
    case 'slideLayout': {
      const slide = slideAt(s, c.slide);
      if (!slide) return no(`Chưa có slide ${c.slide}.`);
      return slide.layout === c.layout
        ? ok(`Slide ${c.slide} dùng bố cục ${LAYOUT_VI[c.layout]}.`)
        : no(`Slide ${c.slide} cần bố cục ${LAYOUT_VI[c.layout]}, hiện là ${LAYOUT_VI[slide.layout]}.`);
    }
    case 'slideTitle': {
      const slide = slideAt(s, c.slide);
      if (!slide) return no(`Chưa có slide ${c.slide}.`);
      const title = slide.els.find((e) => e.role === 'title');
      if (!title) return no(`Slide ${c.slide} chưa có chỗ nhập tiêu đề. Hãy đổi sang bố cục có tiêu đề.`);
      const text = (title.text ?? '').trim();
      if (c.notEmpty) {
        return text ? ok(`Slide ${c.slide} đã có tiêu đề.`) : no(`Slide ${c.slide} chưa nhập tiêu đề.`);
      }
      if (c.text === undefined) return no('Check slideTitle thiếu cả `text` lẫn `notEmpty`.');
      return same(text, c.text)
        ? ok(`Tiêu đề slide ${c.slide} đúng rồi.`)
        : no(`Tiêu đề slide ${c.slide} phải là "${c.text}", hiện là "${text || '(trống)'}".`);
    }
    case 'hasElement': {
      const slide = slideAt(s, c.slide);
      if (!slide) return no(`Chưa có slide ${c.slide}.`);
      const want = c.min ?? 1;
      const found = slide.els.filter(
        (e) =>
          !e.role &&
          e.kind === c.el &&
          (c.shape === undefined || e.shape === c.shape) &&
          (c.textContains === undefined || (e.text ?? '').toLowerCase().includes(c.textContains.toLowerCase())),
      ).length;
      const what = c.shape ? SHAPE_VI[c.shape] : EL_VI[c.el];
      return found >= want
        ? ok(`Slide ${c.slide} đã có ${want > 1 ? `${want} ` : ''}${what}.`)
        : no(`Slide ${c.slide} cần ${want} ${what}, hiện có ${found}.`);
    }
  }
}
