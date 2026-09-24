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
