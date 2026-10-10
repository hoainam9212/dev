import { describe, expect, it } from 'vitest';
import { gradeWith } from '../../grading/core';
import { gradePpt, type PptCheck } from './grade';
import { pptInitial, reducePpt, slideOf, type PptAction, type PptState } from './state';

const run = (...a: PptAction[]): PptState => a.reduce(reducePpt, pptInitial());
const check = (s: PptState, c: PptCheck) => gradeWith(gradePpt, s, [c]);

/** Id sinh theo `nextId`, không được hardcode trong test (bài học Task 2). */
const titleId = (s: PptState): string => {
  const el = slideOf(s).els.find((e) => e.role === 'title');
  if (!el) throw new Error('Bố cục này không có chỗ dành sẵn tiêu đề');
  return el.id;
};
const lastId = (s: PptState): string => {
  const els = slideOf(s).els;
  const el = els[els.length - 1];
  if (!el) throw new Error('Slide chưa có đối tượng nào');
  return el.id;
};

/** Gõ chữ vào một đối tượng rồi chốt. */
const typeInto = (s: PptState, id: string, text: string): PptState =>
  ([{ type: 'startEditEl', id }, { type: 'setText', text }, { type: 'commitEdit' }] as PptAction[]).reduce(reducePpt, s);

describe('gradePpt', () => {
  it('slideCount đúng thì đạt', () => {
    expect(check(run({ type: 'addSlide' }), { kind: 'slideCount', count: 2 }).pass).toBe(true);
  });

  it('slideCount sai thì báo số slide đang có', () => {
    const r = check(pptInitial(), { kind: 'slideCount', count: 3 });
    expect(r.pass).toBe(false);
    expect(r.results[0]?.messageVi).toContain('1');
  });

  it('activeSlide đạt khi đang mở đúng slide, trượt thì nói slide đang mở', () => {
    const two = pptInitial({ slides: ['title', 'titleContent'] });
    const r = check(two, { kind: 'activeSlide', slide: 2 });
    expect(r.pass).toBe(false);
    expect(r.results[0]?.messageVi).toContain('slide 1');
    expect(check(reducePpt(two, { type: 'gotoSlide', index: 1 }), { kind: 'activeSlide', slide: 2 }).pass).toBe(true);
  });

  it('slide đếm từ 1 trong đề bài', () => {
    const s = run({ type: 'addSlide', layout: 'twoContent' });
    expect(check(s, { kind: 'slideLayout', slide: 2, layout: 'twoContent' }).pass).toBe(true);
    expect(check(s, { kind: 'slideLayout', slide: 1, layout: 'twoContent' }).pass).toBe(false);
  });

  it('slide vượt số slide đang có thì trượt, không văng lỗi', () => {
    expect(() => check(pptInitial(), { kind: 'slideTitle', slide: 9, notEmpty: true })).not.toThrow();
    expect(check(pptInitial(), { kind: 'slideTitle', slide: 9, notEmpty: true }).pass).toBe(false);
  });

  it('slideTitle so chữ bỏ qua hoa thường và khoảng trắng thừa', () => {
    const s0 = pptInitial();
    const s = typeInto(s0, titleId(s0), '  Mochi Đi Học  ');
    expect(check(s, { kind: 'slideTitle', slide: 1, text: 'mochi đi học' }).pass).toBe(true);
  });

  it('slideTitle notEmpty đạt với chữ bất kỳ, trượt khi để trống', () => {
    const s0 = pptInitial();
    expect(check(s0, { kind: 'slideTitle', slide: 1, notEmpty: true }).pass).toBe(false);
    const s = typeInto(s0, titleId(s0), 'Nguyễn Văn A');
    expect(check(s, { kind: 'slideTitle', slide: 1, notEmpty: true }).pass).toBe(true);
  });

  it('slideTitle trượt khi slide không có chỗ dành sẵn tiêu đề', () => {
    const s = run({ type: 'setLayout', layout: 'blank' });
    expect(check(s, { kind: 'slideTitle', slide: 1, notEmpty: true }).pass).toBe(false);
  });

  it('hasElement đếm theo loại, mặc định cần ít nhất 1', () => {
    const s = run({ type: 'addShape', shape: 'star', x: 100, y: 300, w: 160, h: 160 });
    expect(check(s, { kind: 'hasElement', slide: 1, el: 'shape' }).pass).toBe(true);
    expect(check(s, { kind: 'hasElement', slide: 1, el: 'image' }).pass).toBe(false);
  });

  it('hasElement lọc theo loại hình và theo chữ bên trong', () => {
    const s1 = run(
      { type: 'addShape', shape: 'star', x: 100, y: 300, w: 160, h: 160 },
      { type: 'addText', x: 400, y: 300, w: 320, h: 80 },
    );
    const s = typeInto(s1, lastId(s1), 'Sở thích của tôi');
    expect(check(s, { kind: 'hasElement', slide: 1, el: 'shape', shape: 'star' }).pass).toBe(true);
    expect(check(s, { kind: 'hasElement', slide: 1, el: 'shape', shape: 'ellipse' }).pass).toBe(false);
    expect(check(s, { kind: 'hasElement', slide: 1, el: 'text', textContains: 'sở thích' }).pass).toBe(true);
  });

  it('hasElement KHÔNG tính chỗ dành sẵn của bố cục vào số hộp chữ tự chèn', () => {
    const s = pptInitial();
    expect(check(s, { kind: 'hasElement', slide: 1, el: 'text' }).pass).toBe(false);
  });

  it('hasElement min đếm đủ số lượng', () => {
    const s = run(
      { type: 'addShape', shape: 'rect', x: 100, y: 300, w: 160, h: 80 },
      { type: 'addShape', shape: 'rect', x: 400, y: 300, w: 160, h: 80 },
    );
    expect(check(s, { kind: 'hasElement', slide: 1, el: 'shape', min: 2 }).pass).toBe(true);
    expect(check(s, { kind: 'hasElement', slide: 1, el: 'shape', min: 3 }).pass).toBe(false);
  });

  it('đã đăng ký vào bảng GRADERS chung', async () => {
    const { grade } = await import('../../grading');
    expect(grade('ppt', pptInitial(), [{ kind: 'slideCount', count: 1 }]).pass).toBe(true);
  });
});

describe('gradePpt – check của 5B', () => {
  const msg = (s: PptState, c: PptCheck) => check(s, c).results[0]?.messageVi ?? '';
  const act = (s: PptState, ...a: PptAction[]): PptState => a.reduce(reducePpt, s);
  /** Bài 3 slide: Title, Title and Content, Two Content; đang mở slide 3. */
  const deck = (): PptState => run({ type: 'addSlide' }, { type: 'addSlide', layout: 'twoContent' });

  it('theme đúng thì đạt, sai thì nêu tên theme đang dùng', () => {
    const s = run({ type: 'setTheme', theme: 'bien' });
    expect(check(s, { kind: 'theme', theme: 'bien' }).pass).toBe(true);
    expect(check(pptInitial(), { kind: 'theme', theme: 'bien' }).pass).toBe(false);
    expect(msg(pptInitial(), { kind: 'theme', theme: 'bien' })).toContain('Mochi');
  });

  it('notTheme mochi trượt ở bài mới, đạt sau khi đổi theme', () => {
    expect(check(pptInitial(), { kind: 'notTheme', theme: 'mochi' }).pass).toBe(false);
    expect(msg(pptInitial(), { kind: 'notTheme', theme: 'mochi' })).toBe('Hãy chọn một theme khác Mochi ở thẻ Design.');
    expect(check(run({ type: 'setTheme', theme: 'hoa' }), { kind: 'notTheme', theme: 'mochi' }).pass).toBe(true);
  });

  it('transition đúng loại, đúng slide', () => {
    const s = act(deck(), { type: 'gotoSlide', index: 1 }, { type: 'setTransition', transition: 'fade' });
    expect(check(s, { kind: 'transition', slide: 2, transition: 'fade' }).pass).toBe(true);
    expect(check(s, { kind: 'transition', slide: 2, transition: 'push' }).pass).toBe(false);
    expect(check(s, { kind: 'transition', slide: 1, transition: 'fade' }).pass).toBe(false);
  });

  it("transition 'any' đạt với chuyển cảnh bất kỳ, trượt khi chưa có", () => {
    expect(check(deck(), { kind: 'transition', slide: 3, transition: 'any' }).pass).toBe(false);
    const s = reducePpt(deck(), { type: 'setTransition', transition: 'push' });
    expect(check(s, { kind: 'transition', slide: 3, transition: 'any' }).pass).toBe(true);
  });

  it('transition ở slide không tồn tại thì trượt, không văng', () => {
    expect(() => check(deck(), { kind: 'transition', slide: 9, transition: 'fade' })).not.toThrow();
    expect(check(deck(), { kind: 'transition', slide: 9, transition: 'fade' }).pass).toBe(false);
  });

  it('placeholder tìm chữ trong cột, không phân biệt hoa thường', () => {
    const s0 = deck();
    const body2 = slideOf(s0).els.find((e) => e.role === 'body2')!.id;
    const s = typeInto(s0, body2, 'Con CHÓ nhà tôi');
    expect(check(s, { kind: 'placeholder', slide: 3, role: 'body2', textContains: 'chó' }).pass).toBe(true);
    expect(check(s, { kind: 'placeholder', slide: 3, role: 'body', textContains: 'chó' }).pass).toBe(false);
  });

  it('placeholder notEmpty', () => {
    const s0 = deck();
    const body = slideOf(s0).els.find((e) => e.role === 'body')!.id;
    expect(check(s0, { kind: 'placeholder', slide: 3, role: 'body', notEmpty: true }).pass).toBe(false);
    expect(check(typeInto(s0, body, 'Ăn'), { kind: 'placeholder', slide: 3, role: 'body', notEmpty: true }).pass).toBe(true);
  });

  it('placeholder trên slide không có vai trò đó thì trượt và khuyên đổi bố cục', () => {
    expect(check(deck(), { kind: 'placeholder', slide: 2, role: 'body2', notEmpty: true }).pass).toBe(false);
    expect(msg(deck(), { kind: 'placeholder', slide: 2, role: 'body2', notEmpty: true })).toContain('bố cục');
  });

  it('elFormat so từng khoá, tính cả giá trị mặc định của chỗ dành sẵn', () => {
    const s0 = pptInitial();
    expect(check(s0, { kind: 'elFormat', slide: 1, role: 'title', fmt: { size: 40, bold: true, align: 'center' } }).pass).toBe(true);
    const s = act(s0, { type: 'selectEl', id: titleId(s0) }, { type: 'setFmt', fmt: { size: 54, color: '#C55A11' } });
    expect(check(s, { kind: 'elFormat', slide: 1, role: 'title', fmt: { size: 54, color: '#C55A11' } }).pass).toBe(true);
    expect(check(s, { kind: 'elFormat', slide: 1, role: 'title', fmt: { size: 54, align: 'left' } }).pass).toBe(false);
  });

  it('elFormat sai thì nêu giá trị đang có', () => {
    expect(msg(pptInitial(), { kind: 'elFormat', slide: 1, role: 'title', fmt: { size: 54 } })).toContain('40');
  });

  it('elFormat gọi màu bằng tên tiếng Việt trong bảng màu, không đọc mã hex', () => {
    const m = msg(pptInitial(), { kind: 'elFormat', slide: 1, role: 'title', fmt: { color: '#D2691E' } });
    expect(m).toContain('Cam Mochi');
    expect(m).toContain('tự động');
    expect(m).not.toContain('#');
  });

  it('presented: chưa chiếu trượt, đang chiếu dở nhắc Esc, chiếu xong và thoát thì đạt', () => {
    const s0 = deck();
    expect(msg(s0, { kind: 'presented' })).toContain('từ slide đầu tới slide cuối');
    const showing = act(s0, { type: 'startShow', from: 'start' }, { type: 'showNext' }, { type: 'showNext' });
    expect(check(showing, { kind: 'presented' }).pass).toBe(false);
    expect(msg(showing, { kind: 'presented' })).toContain('Esc');
    expect(check(reducePpt(showing, { type: 'endShow' }), { kind: 'presented' }).pass).toBe(true);
  });
});
