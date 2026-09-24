import { describe, expect, it } from 'vitest';
import { pptInitial, reducePpt, slideOf, type PptAction } from './state';

const run = (...actions: PptAction[]) => actions.reduce(reducePpt, pptInitial());

describe('reducePpt – slide', () => {
  it('bài mới có đúng một slide bố cục title', () => {
    const s = pptInitial();
    expect(s.slides).toHaveLength(1);
    expect(s.slides[0]?.layout).toBe('title');
    expect(s.active).toBe(0);
  });

  it('addSlide chèn NGAY SAU slide đang mở và mở nó', () => {
    const s = run({ type: 'addSlide' }, { type: 'gotoSlide', index: 0 }, { type: 'addSlide', layout: 'blank' });
    expect(s.slides.map((x) => x.layout)).toEqual(['title', 'blank', 'titleContent']);
    expect(s.active).toBe(1);
  });

  it('addSlide mặc định bố cục titleContent', () => {
    expect(slideOf(run({ type: 'addSlide' })).layout).toBe('titleContent');
  });

  it('duplicateSlide chép nội dung nhưng cấp id mới cho slide và đối tượng', () => {
    const s0 = pptInitial();
    const typed = {
      ...s0,
      slides: s0.slides.map((sl) => ({ ...sl, els: sl.els.map((e) => ({ ...e, text: 'Mochi' })) })),
    };
    const s = reducePpt(typed, { type: 'duplicateSlide' });
    expect(s.slides).toHaveLength(2);
    expect(s.slides[1]?.id).not.toBe(s.slides[0]?.id);
    expect(s.slides[1]?.els[0]?.id).not.toBe(s.slides[0]?.els[0]?.id);
    expect(s.slides[1]?.els[0]?.text).toBe('Mochi');
    expect(s.active).toBe(1);
  });

  it('đổi slide thì bỏ chọn và bỏ đang-sửa', () => {
    const s0 = reducePpt(pptInitial(), { type: 'addSlide' });
    const busy = { ...s0, sel: 'e1', editing: 'e1' };
    expect(reducePpt(busy, { type: 'gotoSlide', index: 0 })).toMatchObject({ sel: null, editing: null });
    expect(reducePpt(busy, { type: 'setLayout', layout: 'blank' })).toMatchObject({ sel: null, editing: null });
  });

  it('deleteSlide slide cuối cùng là phép không', () => {
    const s = run({ type: 'deleteSlide' });
    expect(s.slides).toHaveLength(1);
  });

  it('deleteSlide lùi active khi xoá slide cuối danh sách', () => {
    const s = run({ type: 'addSlide' }, { type: 'deleteSlide' });
    expect(s.slides).toHaveLength(1);
    expect(s.active).toBe(0);
  });

  it('moveSlide đổi thứ tự và giữ slide đang mở là slide vừa kéo', () => {
    const s = run({ type: 'addSlide', layout: 'blank' }, { type: 'moveSlide', from: 1, to: 0 });
    expect(s.slides.map((x) => x.layout)).toEqual(['blank', 'title']);
    expect(s.active).toBe(0);
  });

  it('gotoSlide ra ngoài danh sách là phép không', () => {
    const s0 = pptInitial();
    expect(reducePpt(s0, { type: 'gotoSlide', index: 3 })).toBe(s0);
  });

  it('setLayout đổi bố cục của slide đang mở', () => {
    const s = run({ type: 'setLayout', layout: 'twoContent' });
    expect(slideOf(s).els.map((e) => e.role)).toEqual(['title', 'body', 'body2']);
  });

  it('mọi slide và đối tượng đều có id riêng, không trùng nhau', () => {
    const s = run({ type: 'addSlide' }, { type: 'addSlide', layout: 'twoContent' });
    const ids = [...s.slides.map((x) => x.id), ...s.slides.flatMap((x) => x.els.map((e) => e.id))];
    expect(new Set(ids).size).toBe(ids.length);
  });
});
