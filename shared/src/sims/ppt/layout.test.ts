import { describe, expect, it } from 'vitest';
import { applyLayout, PLACEHOLDERS } from './layout';
import type { Slide } from './state';

const blank: Slide = { id: 's1', layout: 'blank', els: [] };

describe('applyLayout', () => {
  it('bố cục title tạo đúng một chỗ dành sẵn cho tiêu đề', () => {
    const { slide, nextId } = applyLayout(blank, 'title', 1);
    expect(slide.layout).toBe('title');
    expect(slide.els).toHaveLength(1);
    expect(slide.els[0]).toMatchObject({ id: 'e1', kind: 'text', role: 'title', x: 80, y: 176, w: 800, h: 120 });
    expect(nextId).toBe(2);
  });

  it('đổi bố cục giữ nguyên chữ của chỗ dành sẵn cùng vai trò', () => {
    const { slide: a } = applyLayout(blank, 'title', 1);
    const withText: Slide = { ...a, els: a.els.map((e) => ({ ...e, text: 'Xin chào' })) };
    const { slide: b } = applyLayout(withText, 'titleContent', 2);
    expect(b.els.find((e) => e.role === 'title')?.text).toBe('Xin chào');
    expect(b.els.find((e) => e.role === 'body')?.text).toBe('');
  });

  it('đổi bố cục xoá chỗ dành sẵn dư nhưng giữ đối tượng tự chèn', () => {
    const { slide: two } = applyLayout(blank, 'twoContent', 1);
    const withBox: Slide = { ...two, els: [...two.els, { id: 'e9', kind: 'shape', shape: 'rect', x: 8, y: 8, w: 80, h: 40 }] };
    const { slide } = applyLayout(withBox, 'title', 10);
    expect(slide.els.filter((e) => e.role).map((e) => e.role)).toEqual(['title']);
    expect(slide.els.find((e) => e.id === 'e9')).toBeDefined();
  });

  it('mọi chỗ dành sẵn nằm trong khung 960x540', () => {
    for (const list of Object.values(PLACEHOLDERS)) {
      for (const p of list) {
        expect(p.x + p.w).toBeLessThanOrEqual(960);
        expect(p.y + p.h).toBeLessThanOrEqual(540);
      }
    }
  });
  it('mọi chỗ dành sẵn nằm trên lưới 8px (bất biến 6)', () => {
    for (const [layout, holders] of Object.entries(PLACEHOLDERS)) {
      for (const p of holders) {
        for (const n of [p.x, p.y, p.w, p.h]) expect(n % 8, `${layout}/${p.role}`).toBe(0);
      }
    }
  });
});
