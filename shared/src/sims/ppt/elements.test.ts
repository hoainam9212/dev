import { describe, expect, it } from 'vitest';
import { clampEl, resizeBy } from './elements';
import { pptInitial, reducePpt, slideOf, type El, type PptAction, type PptState } from './state';

/** Đã nằm sẵn trên lưới 8px, để test đo đúng phép kéo chứ không đo phép hít lưới. */
const base: El = { id: 'e9', kind: 'shape', shape: 'rect', x: 96, y: 96, w: 200, h: 96 };
const run = (...a: PptAction[]): PptState => a.reduce(reducePpt, pptInitial({ slides: ['blank'] }));

describe('clampEl', () => {
  it('hít toạ độ về bội số của 8', () => {
    expect(clampEl({ ...base, x: 101, y: 99, w: 203, h: 101 })).toMatchObject({ x: 104, y: 96, w: 200, h: 104 });
  });

  it('không cho lọt ra ngoài khung', () => {
    expect(clampEl({ ...base, x: -40, y: 500 })).toMatchObject({ x: 0, y: 444 });
    expect(clampEl({ ...base, x: 900 })).toMatchObject({ x: 760 });
  });

  it('không cho nhỏ hơn 64x32', () => {
    expect(clampEl({ ...base, w: 8, h: 8 })).toMatchObject({ w: 64, h: 32 });
  });
});

describe('resizeBy – ảnh', () => {
  const img: El = { id: 'e8', kind: 'image', src: 'x', alt: 'x', x: 320, y: 152, w: 320, h: 240 };

  it('kéo tay nắm góc thì ảnh giữ tỉ lệ, dù kéo lệch hướng', () => {
    for (const [handle, dx, dy] of [['se', -80, -10], ['nw', 80, 0], ['ne', 40, 90], ['sw', 0, 60]] as const) {
      const r = resizeBy(img, handle, dx, dy);
      expect(Math.abs(r.h - (r.w * 3) / 4), `${handle}`).toBeLessThanOrEqual(8);
      expect(r.w, `${handle} phải đổi cỡ`).not.toBe(320);
    }
  });

  it('kéo tay nắm góc nw thì góc dưới phải đứng yên', () => {
    const r = resizeBy(img, 'nw', 80, 0);
    expect(r.x + r.w).toBe(640);
    expect(r.y + r.h).toBe(392);
  });

  it('kéo tay nắm cạnh thì ảnh bẹp như PowerPoint thật', () => {
    expect(resizeBy(img, 'e', -80, 0)).toMatchObject({ w: 240, h: 240 });
  });
});

describe('resizeBy', () => {
  it('tay nắm se chỉ đổi kích thước', () => {
    expect(resizeBy(base, 'se', 40, 40)).toMatchObject({ x: 96, y: 96, w: 240, h: 136 });
  });

  it('tay nắm nw dời cả góc trên trái', () => {
    expect(resizeBy(base, 'nw', 40, 40)).toMatchObject({ x: 136, y: 136, w: 160, h: 56 });
  });

  it('tay nắm n chỉ đổi chiều dọc', () => {
    expect(resizeBy(base, 'n', 40, 40)).toMatchObject({ x: 96, w: 200, y: 136, h: 56 });
  });

  it('kéo tay nắm nw quá xa thì dừng ở kích thước tối thiểu, không lật ngược', () => {
    const r = resizeBy(base, 'nw', 400, 400);
    expect(r.w).toBeGreaterThanOrEqual(64);
    expect(r.h).toBeGreaterThanOrEqual(32);
  });
});

describe('reducePpt – đối tượng', () => {
  it('addText chèn hộp chữ và chọn luôn nó', () => {
    const s = run({ type: 'addText', x: 100, y: 100, w: 320, h: 80 });
    const el = slideOf(s).els[0];
    expect(el).toMatchObject({ kind: 'text', x: 104, y: 104, w: 320, h: 80, text: '' });
    expect(s.sel).toBe(el?.id);
  });

  it('addShape nhớ loại hình và có màu nền mặc định', () => {
    const s = run({ type: 'addShape', shape: 'ellipse', x: 200, y: 200, w: 160, h: 160 });
    expect(slideOf(s).els[0]).toMatchObject({ kind: 'shape', shape: 'ellipse' });
    expect(slideOf(s).els[0]?.fmt?.fill).toBeTruthy();
  });

  it('addImage đặt ảnh vào giữa khung, 320x240', () => {
    const s = run({ type: 'addImage', src: 'data:image/png;base64,AAA', alt: 'mèo' });
    expect(slideOf(s).els[0]).toMatchObject({ kind: 'image', alt: 'mèo', x: 320, y: 152, w: 320, h: 240 });
  });

  it('moveEl dời đối tượng đang chọn và kẹp trong khung', () => {
    const s = run({ type: 'addText', x: 0, y: 0, w: 320, h: 80 }, { type: 'moveEl', dx: -80, dy: 24 });
    expect(slideOf(s).els[0]).toMatchObject({ x: 0, y: 24 });
  });

  it('moveEl không có gì đang chọn là phép không', () => {
    const s0 = run({ type: 'addText', x: 0, y: 0, w: 320, h: 80 }, { type: 'selectEl', id: null });
    expect(reducePpt(s0, { type: 'moveEl', dx: 80, dy: 0 })).toBe(s0);
  });

  it('resizeEl đổi kích thước đối tượng đang chọn', () => {
    const s = run({ type: 'addShape', shape: 'rect', x: 100, y: 100, w: 160, h: 80 }, { type: 'resizeEl', handle: 'se', dx: 80, dy: 40 });
    expect(slideOf(s).els[0]).toMatchObject({ x: 104, y: 104, w: 240, h: 120 });
  });

  it('deleteEl xoá đối tượng đang chọn và bỏ chọn', () => {
    const s = run({ type: 'addText', x: 100, y: 100, w: 320, h: 80 }, { type: 'deleteEl' });
    expect(slideOf(s).els).toHaveLength(0);
    expect(s.sel).toBeNull();
  });

  /** Hai hình: `first` chèn trước (nằm dưới), `second` chèn sau (nằm trên). */
  const twoShapes = () => {
    const s = run(
      { type: 'addShape', shape: 'rect', x: 100, y: 100, w: 160, h: 80 },
      { type: 'addShape', shape: 'star', x: 300, y: 100, w: 160, h: 80 },
    );
    const [first, second] = slideOf(s).els;
    return { s, first: first!.id, second: second!.id };
  };

  it('bringToFront đưa đối tượng đang chọn về cuối mảng (vẽ trên cùng)', () => {
    const { s, first, second } = twoShapes();
    const acts: PptAction[] = [{ type: 'selectEl', id: first }, { type: 'bringToFront' }];
    const done = acts.reduce(reducePpt, s);
    expect(slideOf(done).els.map((e) => e.id)).toEqual([second, first]);
  });

  it('sendToBack đưa về đầu mảng', () => {
    const { s, first, second } = twoShapes();
    const done = reducePpt(s, { type: 'sendToBack' });
    expect(slideOf(done).els.map((e) => e.id)).toEqual([second, first]);
  });

  it('chọn đối tượng không thuộc slide đang mở là phép không', () => {
    const s0 = run({ type: 'addText', x: 100, y: 100, w: 320, h: 80 });
    const id = slideOf(s0).els[0]!.id;
    const s1 = reducePpt(s0, { type: 'addSlide', layout: 'blank' });
    expect(reducePpt(s1, { type: 'selectEl', id }).sel).toBeNull();
  });

  it('mọi đối tượng chèn qua reducer đều nằm gọn trong khung 960x540', () => {
    const s = run(
      { type: 'addText', x: 900, y: 500, w: 320, h: 80 },
      { type: 'addShape', shape: 'arrow', x: -100, y: -100, w: 160, h: 80 },
      { type: 'addImage', src: 'x', alt: 'y' },
    );
    for (const el of slideOf(s).els) {
      expect(el.x).toBeGreaterThanOrEqual(0);
      expect(el.y).toBeGreaterThanOrEqual(0);
      expect(el.x + el.w).toBeLessThanOrEqual(960);
      expect(el.y + el.h).toBeLessThanOrEqual(540);
    }
  });
});
