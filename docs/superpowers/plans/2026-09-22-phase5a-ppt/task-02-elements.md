# Task 2: Đối tượng — chèn, chọn, dời, đổi kích thước, thứ tự vẽ (shared)

**Files:**
- Create: `shared/src/sims/ppt/elements.ts`, `shared/src/sims/ppt/elements.test.ts`
- Modify: `shared/src/sims/ppt/state.ts` (thêm nhánh action, gọi sang `elements.ts`)
- Modify: `shared/src/sims/ppt/index.ts` (export thêm)

**Interfaces:**
- Consumes (Task 1): `PptState`, `PptAction`, `Slide`, `El`, `slideOf`, `snap`, `SLIDE_W`, `SLIDE_H`, `MIN_W`, `MIN_H`, và hàm nội bộ `withSlides(s, slides, extra?)` trong `state.ts`.
- Produces: `clampEl(el: El): El`, `resizeBy(el: El, handle: Handle, dx: number, dy: number): El`, kiểu `Handle = 'nw'|'n'|'ne'|'e'|'se'|'s'|'sw'|'w'`, `elOf(s: PptState): El | null`, và các nhánh action `addText` · `addShape` · `addImage` · `selectEl` · `deleteEl` · `moveEl` · `resizeEl` · `bringToFront` · `sendToBack`.

Đọc spec mục 2 (bất biến 4–6) và mục 4 trước khi bắt đầu.

- [ ] **Bước 1: Viết test (FAIL)**

`shared/src/sims/ppt/elements.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { clampEl, resizeBy } from './elements';
import { pptInitial, reducePpt, slideOf, type El, type PptAction, type PptState } from './state';

const base: El = { id: 'e9', kind: 'shape', shape: 'rect', x: 100, y: 100, w: 200, h: 100 };
const run = (...a: PptAction[]): PptState => a.reduce(reducePpt, pptInitial({ slides: ['blank'] }));

describe('clampEl', () => {
  it('hít toạ độ về bội số của 8', () => {
    expect(clampEl({ ...base, x: 101, y: 99, w: 203, h: 101 })).toMatchObject({ x: 104, y: 96, w: 200, h: 104 });
  });

  it('không cho lọt ra ngoài khung', () => {
    expect(clampEl({ ...base, x: -40, y: 500 })).toMatchObject({ x: 0, y: 440 });
    expect(clampEl({ ...base, x: 900 })).toMatchObject({ x: 760 });
  });

  it('không cho nhỏ hơn 60x32', () => {
    expect(clampEl({ ...base, w: 8, h: 8 })).toMatchObject({ w: 64, h: 32 });
  });
});

describe('resizeBy', () => {
  it('tay nắm se chỉ đổi kích thước', () => {
    expect(resizeBy(base, 'se', 40, 40)).toMatchObject({ x: 100, y: 100, w: 240, h: 140 });
  });

  it('tay nắm nw dời cả góc trên trái', () => {
    expect(resizeBy(base, 'nw', 40, 40)).toMatchObject({ x: 140, y: 140, w: 160, h: 60 });
  });

  it('tay nắm n chỉ đổi chiều dọc', () => {
    expect(resizeBy(base, 'n', 40, 40)).toMatchObject({ x: 100, w: 200, y: 140, h: 60 });
  });

  it('kéo tay nắm nw quá xa thì dừng ở kích thước tối thiểu, không lật ngược', () => {
    const r = resizeBy(base, 'nw', 400, 400);
    expect(r.w).toBeGreaterThanOrEqual(60);
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

  it('deleteEl xoá đối tượng đang chọn và bỏ chọn', () => {
    const s = run({ type: 'addText', x: 100, y: 100, w: 320, h: 80 }, { type: 'deleteEl' });
    expect(slideOf(s).els).toHaveLength(0);
    expect(s.sel).toBeNull();
  });

  it('bringToFront đưa đối tượng đang chọn về cuối mảng (vẽ trên cùng)', () => {
    const s = run(
      { type: 'addShape', shape: 'rect', x: 100, y: 100, w: 160, h: 80 },
      { type: 'addShape', shape: 'star', x: 300, y: 100, w: 160, h: 80 },
      { type: 'selectEl', id: 'e1' },
      { type: 'bringToFront' },
    );
    expect(slideOf(s).els.map((e) => e.id)).toEqual(['e2', 'e1']);
  });

  it('sendToBack đưa về đầu mảng', () => {
    const s = run(
      { type: 'addShape', shape: 'rect', x: 100, y: 100, w: 160, h: 80 },
      { type: 'addShape', shape: 'star', x: 300, y: 100, w: 160, h: 80 },
      { type: 'sendToBack' },
    );
    expect(slideOf(s).els.map((e) => e.id)).toEqual(['e2', 'e1']);
  });

  it('chọn đối tượng không thuộc slide đang mở là phép không', () => {
    const s0 = run({ type: 'addText', x: 100, y: 100, w: 320, h: 80 }, { type: 'addSlide', layout: 'blank' });
    expect(reducePpt(s0, { type: 'selectEl', id: 'e1' }).sel).toBeNull();
  });
});
```

- [ ] **Bước 2: Chạy, xác nhận FAIL**

Run: `npm test -w shared -- ppt/elements`
Expected: FAIL — `Failed to resolve import "./elements"`.

- [ ] **Bước 3: Viết `elements.ts`**

```ts
import { MIN_H, SLIDE_H, SLIDE_W, snap, type El, type PptState } from './state';

export type Handle = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';

/** Spec nói bề rộng tối thiểu 60, nhưng mọi kích thước là bội số 8 → 64. */
const MIN_W8 = 64;

/** Màu nền mặc định của hình khối: cam Mochi nhạt. */
export const SHAPE_FILL = '#FFD9B8';

/**
 * Hít về lưới 8px rồi kẹp vào khung. Thứ tự này quan trọng: hít trước thì kẹp
 * luôn cho ra số tròn; kẹp trước thì hít lại có thể đẩy ra ngoài khung một lần nữa.
 */
export function clampEl(el: El): El {
  const w = Math.min(Math.max(snap(el.w), MIN_W8), SLIDE_W);
  const h = Math.min(Math.max(snap(el.h), MIN_H), SLIDE_H);
  const x = Math.min(Math.max(snap(el.x), 0), SLIDE_W - w);
  const y = Math.min(Math.max(snap(el.y), 0), SLIDE_H - h);
  return { ...el, x, y, w, h };
}

/**
 * Đổi kích thước theo tay nắm. Tay nắm ở cạnh trái/trên vừa dời góc vừa thu bề
 * rộng — kéo quá đà thì `clampEl` giữ lại ở kích thước tối thiểu chứ không lật ngược.
 */
export function resizeBy(el: El, handle: Handle, dx: number, dy: number): El {
  const west = handle.includes('w');
  const east = handle.includes('e');
  const north = handle.startsWith('n');
  const south = handle.startsWith('s');
  const w = east ? el.w + dx : west ? el.w - dx : el.w;
  const h = south ? el.h + dy : north ? el.h - dy : el.h;
  const cw = Math.max(snap(w), MIN_W8);
  const ch = Math.max(snap(h), MIN_H);
  return clampEl({ ...el, w: cw, h: ch, x: west ? el.x + (el.w - cw) : el.x, y: north ? el.y + (el.h - ch) : el.y });
}

/** Đối tượng đang chọn của slide đang mở, hoặc null. */
export function elOf(s: PptState): El | null {
  return s.slides[s.active]?.els.find((e) => e.id === s.sel) ?? null;
}
```

Hằng `MIN_W = 60` trong `state.ts` giữ lại để đọc spec không bị lệch, nhưng vì mọi
kích thước là bội số của 8 nên chỗ tính dùng `MIN_W8 = 64`. `MIN_H = 32` đã là bội số
của 8 nên dùng thẳng.

- [ ] **Bước 4: Nối vào reducer**

Trong `state.ts`, thêm các nhánh vào `reducePpt` (trước `default`). Hàm phụ dùng chung:

```ts
/** Thay danh sách đối tượng của slide đang mở. */
function withEls(s: PptState, els: El[], extra?: Partial<PptState>): PptState {
  return withSlides(s, s.slides.map((x, i) => (i === s.active ? { ...x, els } : x)), extra);
}

/** Chèn một đối tượng mới, chọn luôn nó. */
function addEl(s: PptState, el: Omit<El, 'id'>): PptState {
  const made = clampEl({ ...el, id: `e${s.nextId}` });
  return withEls(s, [...slideOf(s).els, made], { sel: made.id, nextId: s.nextId + 1 });
}
```

```ts
    case 'addText':
      return addEl(s, { kind: 'text', x: a.x, y: a.y, w: a.w, h: a.h, text: a.text ?? '', fmt: { size: 20, align: 'left' } });
    case 'addShape':
      return addEl(s, { kind: 'shape', shape: a.shape, x: a.x, y: a.y, w: a.w, h: a.h, text: '', fmt: { size: 20, align: 'center', fill: SHAPE_FILL } });
    case 'addImage':
      return addEl(s, { kind: 'image', src: a.src, alt: a.alt, x: 320, y: 152, w: 320, h: 240 });
    case 'selectEl': {
      if (a.id !== null && !slideOf(s).els.some((e) => e.id === a.id)) return s;
      return { ...s, sel: a.id, editing: null };
    }
    case 'deleteEl': {
      if (!s.sel) return s;
      return withEls(s, slideOf(s).els.filter((e) => e.id !== s.sel), { sel: null, editing: null });
    }
    case 'moveEl': {
      const el = elOf(s);
      if (!el) return s;
      const moved = clampEl({ ...el, x: el.x + a.dx, y: el.y + a.dy });
      return withEls(s, slideOf(s).els.map((e) => (e.id === el.id ? moved : e)));
    }
    case 'resizeEl': {
      const el = elOf(s);
      if (!el) return s;
      const sized = resizeBy(el, a.handle, a.dx, a.dy);
      return withEls(s, slideOf(s).els.map((e) => (e.id === el.id ? sized : e)));
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
```

Khai báo thêm các nhánh tương ứng trong `PptAction` (spec mục 4, phần "Đối tượng").

- [ ] **Bước 5: Chạy, xác nhận PASS**

Run: `npm test -w shared -- ppt`
Expected: PASS — 13 test mới của `elements.test.ts` cùng toàn bộ test Task 1.

- [ ] **Bước 6: Export**

Thêm `export * from './elements';` vào `shared/src/sims/ppt/index.ts`.

- [ ] **Bước 7: Chạy toàn bộ và commit**

Run: `npm test -w shared && npm run typecheck` → PASS.

```bash
git add shared/src/sims/ppt docs/superpowers
git commit -m "feat(ppt): chèn, chọn, dời và đổi kích thước đối tượng" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

Cập nhật dòng Task 2 của `STATUS.md` trong cùng commit.
