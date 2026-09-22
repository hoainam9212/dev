# Task 1: Mô hình slide, bố cục và hành động slide (shared)

**Files:**
- Create: `shared/src/sims/ppt/state.ts`, `shared/src/sims/ppt/layout.ts`, `shared/src/sims/ppt/index.ts`
- Create: `shared/src/sims/ppt/state.test.ts`, `shared/src/sims/ppt/layout.test.ts`
- Modify: `shared/src/index.ts` (thêm một dòng export)

**Interfaces:**
- Consumes: không có (task đầu tiên).
- Produces: `SLIDE_W`, `SLIDE_H`, các kiểu `Layout`, `ElKind`, `ShapeKind`, `Role`, `ElFormat`, `El`, `Slide`, `PptState`, `PptAction`; hàm `pptInitial(o?: { slides?: Layout[] }): PptState`, `reducePpt(state, action): PptState`, `slideOf(s: PptState): Slide`, `applyLayout(slide: Slide, layout: Layout, nextId: number): { slide: Slide; nextId: number }`, `PLACEHOLDERS: Record<Layout, { role: Role; x: number; y: number; w: number; h: number }[]>`.

Đọc spec mục 2 và 3 trước khi bắt đầu.

- [ ] **Bước 1: Viết test bố cục trước (FAIL)**

`shared/src/sims/ppt/layout.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { applyLayout, PLACEHOLDERS } from './layout';
import type { Slide } from './state';

const blank: Slide = { id: 's1', layout: 'blank', els: [] };

describe('applyLayout', () => {
  it('bố cục title tạo đúng một chỗ dành sẵn cho tiêu đề', () => {
    const { slide, nextId } = applyLayout(blank, 'title', 1);
    expect(slide.layout).toBe('title');
    expect(slide.els).toHaveLength(1);
    expect(slide.els[0]).toMatchObject({ id: 'e1', kind: 'text', role: 'title', x: 80, y: 180, w: 800, h: 120 });
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
});
```

- [ ] **Bước 2: Chạy, xác nhận FAIL**

Run: `npm test -w shared -- layout`
Expected: FAIL — `Failed to resolve import "./layout"`.

- [ ] **Bước 3: Viết `state.ts` (chỉ kiểu + hằng, chưa có reducer)**

Chép nguyên khối kiểu ở **mục 2 của spec** vào `shared/src/sims/ppt/state.ts`, kèm:

```ts
export const SLIDE_W = 960;
export const SLIDE_H = 540;
/** Lưới hít: mọi toạ độ là bội số của 8. */
export const GRID = 8;
export const MIN_W = 60;
export const MIN_H = 32;
export type ThemeId = 'mochi' | 'bien' | 'la' | 'hoa' | 'tro' | 'dem';
export const snap = (n: number): number => Math.round(n / GRID) * GRID;
```

Cỡ chữ mặc định của chỗ dành sẵn (spec mục 3): title `{ size: 40, bold: true, align: 'center' }`, body/body2 `{ size: 24, align: 'left' }`.

- [ ] **Bước 4: Viết `layout.ts`**

```ts
import type { El, Layout, Role, Slide } from './state';

export const PLACEHOLDERS: Record<Layout, { role: Role; x: number; y: number; w: number; h: number }[]> = {
  title: [{ role: 'title', x: 80, y: 180, w: 800, h: 120 }],
  titleContent: [
    { role: 'title', x: 80, y: 56, w: 800, h: 96 },
    { role: 'body', x: 80, y: 176, w: 800, h: 304 },
  ],
  twoContent: [
    { role: 'title', x: 80, y: 56, w: 800, h: 96 },
    { role: 'body', x: 80, y: 176, w: 384, h: 304 },
    { role: 'body2', x: 496, y: 176, w: 384, h: 304 },
  ],
  blank: [],
};

const FMT: Record<Role, El['fmt']> = {
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
      x: p.x, y: p.y, w: p.w, h: p.h,
      text: old?.text ?? '',
      fmt: old?.fmt ?? FMT[p.role],
    };
    return el;
  });
  return { slide: { ...slide, layout, els: [...holders, ...own] }, nextId: id };
}
```

- [ ] **Bước 5: Chạy lại, xác nhận PASS**

Run: `npm test -w shared -- layout`
Expected: PASS, 4 test.

- [ ] **Bước 6: Viết test cho các hành động slide (FAIL)**

`shared/src/sims/ppt/state.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { pptInitial, reducePpt, slideOf } from './state';

const run = (...actions: Parameters<typeof reducePpt>[1][]) => actions.reduce(reducePpt, pptInitial());

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
    const s0 = run({ type: 'setText', text: 'Mochi' });
    const s = reducePpt({ ...s0, editing: null }, { type: 'duplicateSlide' });
    expect(s.slides).toHaveLength(2);
    expect(s.slides[1]?.id).not.toBe(s.slides[0]?.id);
    expect(s.slides[1]?.els[0]?.id).not.toBe(s.slides[0]?.els[0]?.id);
    expect(s.slides[1]?.els[0]?.text).toBe(s.slides[0]?.els[0]?.text);
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

  it('gotoSlide bỏ chọn và bỏ đang-sửa', () => {
    const s0 = run({ type: 'addSlide' });
    const s1 = reducePpt(s0, { type: 'selectEl', id: slideOf(s0).els[0]?.id ?? null });
    const s = reducePpt({ ...s1, editing: 'e1' }, { type: 'gotoSlide', index: 0 });
    expect(s.sel).toBeNull();
    expect(s.editing).toBeNull();
  });

  it('setLayout đổi bố cục của slide đang mở', () => {
    const s = run({ type: 'setLayout', layout: 'twoContent' });
    expect(slideOf(s).els.map((e) => e.role)).toEqual(['title', 'body', 'body2']);
  });
});
```

Lưu ý: test `duplicateSlide` và `gotoSlide` dùng `setText`/`selectEl` của Task 2–3;
ở task này chỉ cần các nhánh ấy **tồn tại và trả về state không đổi** là đủ để test
chạy — hãy để `default: return state` trong `reducePpt`, Task 2 và 3 sẽ điền.
Nếu điều đó làm hai test trên đỏ, **đánh dấu `it.todo` cho đúng hai test ấy** và ghi
vào STATUS rằng Task 3 phải bật lại. Không sửa nội dung test.

- [ ] **Bước 7: Chạy, xác nhận FAIL**

Run: `npm test -w shared -- ppt/state`
Expected: FAIL — chưa có `pptInitial`.

- [ ] **Bước 8: Viết reducer phần slide**

Trong `state.ts`:

```ts
import { applyLayout, PLACEHOLDERS } from './layout';

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
    slides, active: 0, sel: null, editing: null, editBackup: null, theme: 'mochi', show: null,
    saved: null, printed: false, dialog: null, nextId: nextId + slides.length, past: [],
  };
}

/** Ghi lại slides cũ để hoàn tác (Task 3 dùng `past`), rồi thay slides mới. */
function withSlides(s: PptState, slides: Slide[], extra?: Partial<PptState>): PptState {
  return { ...s, slides, past: [...s.past, s.slides].slice(-30), ...extra };
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
      return withSlides(s, s.slides.map((x, i) => (i === s.active ? r.slide : x)), { nextId: r.nextId, sel: null, editing: null });
    }
    default:
      return s;
  }
}
```

`PPT_LAYOUTS` cho giao diện Task 7 (tên tiếng Việt kèm tên tiếng Anh thật):

```ts
export const PPT_LAYOUTS: { id: Layout; label: string; vi: string }[] = [
  { id: 'title', label: 'Title Slide', vi: 'Slide tiêu đề' },
  { id: 'titleContent', label: 'Title and Content', vi: 'Tiêu đề và nội dung' },
  { id: 'twoContent', label: 'Two Content', vi: 'Hai cột nội dung' },
  { id: 'blank', label: 'Blank', vi: 'Trang trắng' },
];
```

Ghi chú: `PLACEHOLDERS` được nhập vào `state.ts` để `PPT_LAYOUTS` không lệch danh
sách bố cục — nếu không dùng tới thì bỏ dòng import đi, đừng để import thừa.

- [ ] **Bước 9: `index.ts` và export ra `shared`**

`shared/src/sims/ppt/index.ts`:

```ts
export * from './state';
export * from './layout';
```

Thêm vào `shared/src/index.ts`, ngay dưới dòng `export * as excelSim ...`:

```ts
export * as pptSim from './sims/ppt';
```

- [ ] **Bước 10: Chạy toàn bộ**

Run: `npm test -w shared && npm run typecheck`
Expected: PASS. Tất cả test cũ vẫn xanh.

- [ ] **Bước 11: Commit**

```bash
git checkout -b feat/phase5a-ppt
git add shared/src/sims/ppt shared/src/index.ts docs/superpowers
git commit -m "feat(ppt): mô hình slide, bố cục và hành động slide" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

Cập nhật dòng Task 1 của `STATUS.md` **trong cùng commit này**: số test, và có phải
đánh `it.todo` hai test nào không.
