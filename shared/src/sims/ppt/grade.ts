import type { CheckResult } from '../../grading/core';
import type { ElFormat, ElKind, Layout, PptState, Role, ShapeKind, Slide, ThemeId, Transition } from './state';
import { themeOf } from './theme';
import { PPT_COLORS } from './text';

export type PptCheck =
  | { kind: 'slideCount'; count: number }
  /** Chỉ dùng cho bài tập bấm chọn slide: không có nó, đề "mở slide 2" đạt ngay khi vừa mở bài. */
  | { kind: 'activeSlide'; slide: number }
  | { kind: 'slideLayout'; slide: number; layout: Layout }
  | { kind: 'slideTitle'; slide: number; text?: string; notEmpty?: true }
  | { kind: 'hasElement'; slide: number; el: ElKind; min?: number; shape?: ShapeKind; textContains?: string }
  | { kind: 'theme'; theme: ThemeId }
  /** Đề mở "chọn theme bất kỳ khác Mochi". */
  | { kind: 'notTheme'; theme: ThemeId }
  /** `any`: đề mở, chuyển cảnh nào cũng được. */
  | { kind: 'transition'; slide: number; transition: Exclude<Transition, 'none'> | 'any' }
  /** Chữ trong chỗ dành sẵn (cột nội dung), thứ mà `hasElement` cố ý không đếm. */
  | { kind: 'placeholder'; slide: number; role: Role; textContains?: string; notEmpty?: true }
  | { kind: 'elFormat'; slide: number; role: Role; fmt: Pick<ElFormat, 'size' | 'color' | 'align' | 'bold' | 'italic'> }
  /** Đã trình chiếu từ slide 1 tới slide cuối rồi thoát. */
  | { kind: 'presented' };

const ok = (messageVi: string): CheckResult => ({ ok: true, messageVi });
const no = (messageVi: string): CheckResult => ({ ok: false, messageVi });

const LAYOUT_VI: Record<Layout, string> = {
  title: 'Slide tiêu đề',
  titleContent: 'Tiêu đề và nội dung',
  twoContent: 'Hai cột nội dung',
  blank: 'Trang trắng',
};

const EL_VI: Record<ElKind, string> = { text: 'hộp chữ', shape: 'hình khối', image: 'ảnh' };

const TRANSITION_VI: Record<Exclude<Transition, 'none'>, string> = {
  fade: 'Mờ dần (Fade)',
  push: 'Đẩy (Push)',
  zoom: 'Phóng to (Zoom)',
};

const ROLE_VI: Record<Role, string> = { title: 'tiêu đề', body: 'cột nội dung', body2: 'cột nội dung thứ hai' };

/** Định dạng khi chỗ dành sẵn chưa ghi khoá đó: khớp mặc định của `layout.ts`; màu `undefined` = màu theme. */
const FMT_DEFAULT: Record<Role, Required<Pick<ElFormat, 'size' | 'align' | 'bold' | 'italic'>>> = {
  title: { size: 40, align: 'center', bold: true, italic: false },
  body: { size: 24, align: 'left', bold: false, italic: false },
  body2: { size: 24, align: 'left', bold: false, italic: false },
};

const FMT_VI: Record<keyof ElFormat, string> = {
  size: 'cỡ chữ',
  color: 'màu chữ',
  align: 'căn lề',
  bold: 'in đậm',
  italic: 'in nghiêng',
  fill: 'màu nền',
};

const ALIGN_VI: Record<NonNullable<ElFormat['align']>, string> = { left: 'trái', center: 'giữa', right: 'phải' };

function fmtValue(key: keyof ElFormat, v: unknown): string {
  if (v === undefined) return 'tự động';
  if (key === 'align') return `căn ${ALIGN_VI[v as NonNullable<ElFormat['align']>]}`;
  if (typeof v === 'boolean') return v ? 'có' : 'không';
  if (key === 'color' && typeof v === 'string') {
    // Người học chọn màu theo tên trong bảng Font Color, không đọc được mã hex.
    return PPT_COLORS.find((c) => c.id.toLowerCase() === v.toLowerCase())?.vi ?? 'một màu khác';
  }
  return String(v);
}

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
    case 'activeSlide':
      return s.active === c.slide - 1
        ? ok(`Đang mở slide ${c.slide}.`)
        : no(`Hãy mở slide ${c.slide} — bạn đang ở slide ${s.active + 1}.`);
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
    case 'theme':
      return s.theme === c.theme
        ? ok(`Bài trình chiếu đang dùng theme ${themeOf(c.theme).name}.`)
        : no(`Cần theme ${themeOf(c.theme).name}, hiện là ${themeOf(s.theme).name}.`);
    case 'notTheme':
      return s.theme !== c.theme
        ? ok(`Đã đổi sang theme ${themeOf(s.theme).name}.`)
        : no(`Hãy chọn một theme khác ${themeOf(c.theme).name} ở thẻ Design.`);
    case 'transition': {
      const slide = slideAt(s, c.slide);
      if (!slide) return no(`Chưa có slide ${c.slide}.`);
      const t = slide.transition;
      if (c.transition === 'any') {
        return t && t !== 'none'
          ? ok(`Slide ${c.slide} đã có chuyển cảnh.`)
          : no(`Slide ${c.slide} chưa có chuyển cảnh.`);
      }
      if (t === c.transition) return ok(`Slide ${c.slide} có chuyển cảnh ${TRANSITION_VI[c.transition]}.`);
      return no(
        t && t !== 'none'
          ? `Slide ${c.slide} cần chuyển cảnh ${TRANSITION_VI[c.transition]}, hiện là ${TRANSITION_VI[t]}.`
          : `Slide ${c.slide} chưa có chuyển cảnh ${TRANSITION_VI[c.transition]}.`,
      );
    }
    case 'placeholder': {
      const slide = slideAt(s, c.slide);
      if (!slide) return no(`Chưa có slide ${c.slide}.`);
      const el = slide.els.find((e) => e.role === c.role);
      if (!el) return no(`Slide ${c.slide} không có ${ROLE_VI[c.role]}. Hãy đổi sang bố cục có chỗ đó.`);
      const text = (el.text ?? '').trim();
      if (c.notEmpty) {
        return text ? ok(`Đã gõ chữ vào ${ROLE_VI[c.role]} của slide ${c.slide}.`) : no(`${cap(ROLE_VI[c.role])} của slide ${c.slide} còn trống.`);
      }
      if (c.textContains === undefined) return no('Check placeholder thiếu cả `textContains` lẫn `notEmpty`.');
      return text.toLowerCase().includes(c.textContains.trim().toLowerCase())
        ? ok(`${cap(ROLE_VI[c.role])} của slide ${c.slide} có chữ "${c.textContains}".`)
        : no(`${cap(ROLE_VI[c.role])} của slide ${c.slide} cần có chữ "${c.textContains}", hiện là "${text || '(trống)'}".`);
    }
    case 'elFormat': {
      const slide = slideAt(s, c.slide);
      if (!slide) return no(`Chưa có slide ${c.slide}.`);
      const el = slide.els.find((e) => e.role === c.role);
      if (!el) return no(`Slide ${c.slide} không có ${ROLE_VI[c.role]}.`);
      const have: ElFormat = { ...FMT_DEFAULT[c.role], ...el.fmt };
      for (const key of Object.keys(c.fmt) as (keyof typeof c.fmt)[]) {
        const want = c.fmt[key];
        const got = have[key];
        const same = typeof want === 'string' && typeof got === 'string' ? want.toLowerCase() === got.toLowerCase() : want === got;
        if (!same) {
          return no(`${cap(FMT_VI[key])} của ${ROLE_VI[c.role]} slide ${c.slide} cần là ${fmtValue(key, want)}, hiện là ${fmtValue(key, got)}.`);
        }
      }
      return ok(`${cap(ROLE_VI[c.role])} slide ${c.slide} đã định dạng đúng.`);
    }
    case 'presented':
      if (s.show) return no('Nhấn Esc để thoát trình chiếu.');
      return s.presented
        ? ok('Bạn đã trình chiếu trọn bài.')
        : no('Hãy trình chiếu từ slide đầu tới slide cuối rồi nhấn Esc để thoát.');
  }
}

const cap = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);
