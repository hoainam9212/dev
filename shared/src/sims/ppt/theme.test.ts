import { describe, expect, it } from 'vitest';
import { contrastRatio, PPT_THEMES, themeOf } from './theme';
import { pptInitial, reducePpt, type PptAction, type PptState, type ThemeId } from './state';

const run = (s: PptState, ...a: PptAction[]): PptState => a.reduce(reducePpt, s);

describe('PPT_THEMES', () => {
  it('có đúng 6 theme theo thứ tự của spec', () => {
    expect(PPT_THEMES.map((t) => t.id)).toEqual(['mochi', 'bien', 'la', 'hoa', 'tro', 'dem']);
  });

  it('themeOf trả đúng theme, id lạ thì về mochi', () => {
    expect(themeOf('bien').name).toBe('Biển');
    expect(themeOf('lạ' as ThemeId).id).toBe('mochi');
  });

  it('contrastRatio đen/trắng là 21, cùng màu là 1', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 1);
    expect(contrastRatio('#C8571F', '#C8571F')).toBeCloseTo(1, 5);
  });

  it.each(PPT_THEMES.map((t) => [t.id, t] as const))('theme %s đọc rõ: chữ ≥ 7, tiêu đề ≥ 4.5', (_, t) => {
    expect(contrastRatio(t.fg, t.bg)).toBeGreaterThanOrEqual(7);
    expect(contrastRatio(t.accent, t.bg)).toBeGreaterThanOrEqual(4.5);
  });
});

describe('setTheme', () => {
  it('đổi theme cho cả bài', () => {
    expect(run(pptInitial(), { type: 'setTheme', theme: 'bien' }).theme).toBe('bien');
  });

  it('đặt lại đúng theme đang dùng là no-op, không thêm bậc hoàn tác', () => {
    const s = pptInitial();
    expect(run(s, { type: 'setTheme', theme: 'mochi' })).toBe(s);
  });

  it('Undo trả lại theme cũ, slide không đổi', () => {
    const s0 = run(pptInitial(), { type: 'addSlide' });
    const s = run(s0, { type: 'setTheme', theme: 'dem' }, { type: 'undo' });
    expect(s.theme).toBe('mochi');
    expect(s.slides).toEqual(s0.slides);
  });
});

describe('setTransition', () => {
  const three = (): PptState => run(pptInitial(), { type: 'addSlide' }, { type: 'addSlide' }, { type: 'gotoSlide', index: 1 });

  it('chỉ đặt cho slide đang mở', () => {
    const s = run(three(), { type: 'setTransition', transition: 'fade' });
    expect(s.slides.map((x) => x.transition)).toEqual([undefined, 'fade', undefined]);
  });

  it('all: true đặt cho mọi slide', () => {
    const s = run(three(), { type: 'setTransition', transition: 'push', all: true });
    expect(s.slides.map((x) => x.transition)).toEqual(['push', 'push', 'push']);
  });

  it('none xoá chuyển cảnh', () => {
    const s = run(three(), { type: 'setTransition', transition: 'zoom' }, { type: 'setTransition', transition: 'none' });
    expect(s.slides[1]?.transition).toBeUndefined();
    expect('transition' in s.slides[1]!).toBe(false);
  });

  it('Undo bỏ chuyển cảnh vừa đặt', () => {
    const s = run(three(), { type: 'setTransition', transition: 'fade', all: true }, { type: 'undo' });
    expect(s.slides.every((x) => x.transition === undefined)).toBe(true);
  });
});
