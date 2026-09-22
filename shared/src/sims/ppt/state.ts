import { clampEl, elOf, resizeBy, SHAPE_FILL, type Handle } from './elements';
import { applyLayout } from './layout';

/** Khung slide 16:9. Mọi toạ độ đối tượng tính bằng px trên khung này; giao diện chỉ co giãn khi vẽ. */
export const SLIDE_W = 960;
export const SLIDE_H = 540;
/** Lưới hít: mọi toạ độ là bội số của 8. */
export const GRID = 8;
export const MIN_W = 60;
export const MIN_H = 32;

export const snap = (n: number): number => Math.round(n / GRID) * GRID;

export type Layout = 'title' | 'titleContent' | 'twoContent' | 'blank';
export type ElKind = 'text' | 'shape' | 'image';
export type ShapeKind = 'rect' | 'ellipse' | 'arrow' | 'star';
/** Vai trò chỗ dành sẵn của bố cục. Đối tượng tự chèn có role = undefined. */
export type Role = 'title' | 'body' | 'body2';
export type ThemeId = 'mochi' | 'bien' | 'la' | 'hoa' | 'tro' | 'dem';
export type Transition = 'none' | 'fade' | 'push' | 'zoom';

export interface ElFormat {
  bold?: boolean;
  italic?: boolean;
  /** pt, 12–54. */
  size?: number;
  color?: string;
  align?: 'left' | 'center' | 'right';
  /** Chỉ dùng cho hình khối. */
  fill?: string;
}

export interface El {
  id: string;
  kind: ElKind;
  role?: Role;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Chữ của hộp chữ và hình khối. */
  text?: string;
  shape?: ShapeKind;
  src?: string;
  alt?: string;
  fmt?: ElFormat;
}

export interface Slide {
  id: string;
  layout: Layout;
  /** Thứ tự mảng = thứ tự vẽ; phần tử cuối nằm trên cùng. */
  els: El[];
  transition?: Transition;
}

export interface PptState {
  slides: Slide[];
  active: number;
  /** id đối tượng đang chọn, của slide đang mở. */
  sel: string | null;
  /** id đối tượng đang sửa chữ, null khi không sửa. */
  editing: string | null;
  /** Chữ trước khi bắt đầu sửa, để `cancelEdit` trả lại. */
  editBackup: string | null;
  theme: ThemeId;
  /** Đang trình chiếu ở slide thứ mấy (giai đoạn 5B). */
  show: { at: number } | null;
  /** Lưu và In là MÔ PHỎNG: chỉ ghi lại là đã bấm, không tạo tệp thật. */
  saved: { name: string; at: number } | null;
  printed: boolean;
  dialog: PptDialog;
  /** Nguồn id; reducer không bao giờ dùng random hay Date.now(). */
  nextId: number;
  past: Slide[][];
}

export type PptDialog = 'save' | 'print' | 'image' | null;

export type PptAction =
  | { type: 'addSlide'; layout?: Layout }
  | { type: 'duplicateSlide' }
  | { type: 'deleteSlide' }
  | { type: 'moveSlide'; from: number; to: number }
  | { type: 'gotoSlide'; index: number }
  | { type: 'setLayout'; layout: Layout }
  | { type: 'addText'; x: number; y: number; w: number; h: number; text?: string }
  | { type: 'addShape'; shape: ShapeKind; x: number; y: number; w: number; h: number }
  | { type: 'addImage'; src: string; alt: string }
  | { type: 'selectEl'; id: string | null }
  | { type: 'deleteEl' }
  | { type: 'moveEl'; dx: number; dy: number }
  | { type: 'resizeEl'; handle: Handle; dx: number; dy: number }
  | { type: 'bringToFront' }
  | { type: 'sendToBack' };

export const PPT_LAYOUTS: { id: Layout; label: string; vi: string }[] = [
  { id: 'title', label: 'Title Slide', vi: 'Slide tiêu đề' },
  { id: 'titleContent', label: 'Title and Content', vi: 'Tiêu đề và nội dung' },
  { id: 'twoContent', label: 'Two Content', vi: 'Hai cột nội dung' },
  { id: 'blank', label: 'Blank', vi: 'Trang trắng' },
];

export function slideOf(s: PptState): Slide {
  const slide = s.slides[s.active];
  if (!slide) throw new Error('Không có slide nào đang mở');
  return slide;
}

export function pptInitial(o?: { slides?: Layout[] }): PptState {
  let nextId = 1;
  const slides = (o?.slides ?? ['title']).map((layout, i) => {
    const r = applyLayout({ id: `s${i + 1}`, layout: 'blank', els: [] }, layout, nextId);
    nextId = r.nextId;
    return r.slide;
  });
  return {
    slides,
    active: 0,
    sel: null,
    editing: null,
    editBackup: null,
    theme: 'mochi',
    show: null,
    saved: null,
    printed: false,
    dialog: null,
    nextId: nextId + slides.length,
    past: [],
  };
}

/** Ghi lại slides cũ để hoàn tác, rồi thay bằng slides mới. */
function withSlides(s: PptState, slides: Slide[], extra?: Partial<PptState>): PptState {
  return { ...s, slides, past: [...s.past, s.slides].slice(-30), ...extra };
}

/** Thay danh sách đối tượng của slide đang mở. */
function withEls(s: PptState, els: El[], extra?: Partial<PptState>): PptState {
  return withSlides(
    s,
    s.slides.map((x, i) => (i === s.active ? { ...x, els } : x)),
    extra,
  );
}

/** Chèn một đối tượng mới, chọn luôn nó. */
function addEl(s: PptState, el: Omit<El, 'id'>): PptState {
  const made = clampEl({ ...el, id: `e${s.nextId}` });
  return withEls(s, [...slideOf(s).els, made], { sel: made.id, nextId: s.nextId + 1 });
}

export function reducePpt(s: PptState, a: PptAction): PptState {
  switch (a.type) {
    case 'addSlide': {
      const r = applyLayout({ id: `s${s.nextId}`, layout: 'blank', els: [] }, a.layout ?? 'titleContent', s.nextId + 1);
      const slides = [...s.slides];
      slides.splice(s.active + 1, 0, r.slide);
      return withSlides(s, slides, { active: s.active + 1, sel: null, editing: null, nextId: r.nextId });
    }
    case 'duplicateSlide': {
      let id = s.nextId;
      const src = slideOf(s);
      const copy: Slide = { ...src, id: `s${id++}`, els: src.els.map((e) => ({ ...e, id: `e${id++}` })) };
      const slides = [...s.slides];
      slides.splice(s.active + 1, 0, copy);
      return withSlides(s, slides, { active: s.active + 1, sel: null, editing: null, nextId: id });
    }
    case 'deleteSlide': {
      if (s.slides.length <= 1) return s;
      const slides = s.slides.filter((_, i) => i !== s.active);
      return withSlides(s, slides, { active: Math.min(s.active, slides.length - 1), sel: null, editing: null });
    }
    case 'moveSlide': {
      const slides = [...s.slides];
      const [moved] = slides.splice(a.from, 1);
      if (!moved) return s;
      const to = Math.max(0, Math.min(a.to, slides.length));
      slides.splice(to, 0, moved);
      return withSlides(s, slides, { active: to, sel: null, editing: null });
    }
    case 'gotoSlide': {
      if (a.index < 0 || a.index >= s.slides.length) return s;
      return { ...s, active: a.index, sel: null, editing: null };
    }
    case 'setLayout': {
      const r = applyLayout(slideOf(s), a.layout, s.nextId);
      return withSlides(
        s,
        s.slides.map((x, i) => (i === s.active ? r.slide : x)),
        { nextId: r.nextId, sel: null, editing: null },
      );
    }
    case 'addText':
      return addEl(s, { kind: 'text', x: a.x, y: a.y, w: a.w, h: a.h, text: a.text ?? '', fmt: { size: 20, align: 'left' } });
    case 'addShape':
      return addEl(s, {
        kind: 'shape',
        shape: a.shape,
        x: a.x,
        y: a.y,
        w: a.w,
        h: a.h,
        text: '',
        fmt: { size: 20, align: 'center', fill: SHAPE_FILL },
      });
    case 'addImage':
      return addEl(s, { kind: 'image', src: a.src, alt: a.alt, x: 320, y: 152, w: 320, h: 240 });
    case 'selectEl': {
      if (a.id !== null && !slideOf(s).els.some((e) => e.id === a.id)) return s;
      return { ...s, sel: a.id, editing: null };
    }
    case 'deleteEl': {
      if (!s.sel) return s;
      return withEls(
        s,
        slideOf(s).els.filter((e) => e.id !== s.sel),
        { sel: null, editing: null },
      );
    }
    case 'moveEl': {
      const el = elOf(s);
      if (!el) return s;
      const moved = clampEl({ ...el, x: el.x + a.dx, y: el.y + a.dy });
      return withEls(
        s,
        slideOf(s).els.map((e) => (e.id === el.id ? moved : e)),
      );
    }
    case 'resizeEl': {
      const el = elOf(s);
      if (!el) return s;
      const sized = resizeBy(el, a.handle, a.dx, a.dy);
      return withEls(
        s,
        slideOf(s).els.map((e) => (e.id === el.id ? sized : e)),
      );
    }
    case 'bringToFront': {
      const el = elOf(s);
      if (!el) return s;
      return withEls(s, [...slideOf(s).els.filter((e) => e.id !== el.id), el]);
    }
    case 'sendToBack': {
      const el = elOf(s);
      if (!el) return s;
      return withEls(s, [el, ...slideOf(s).els.filter((e) => e.id !== el.id)]);
    }
    default:
      return s;
  }
}
