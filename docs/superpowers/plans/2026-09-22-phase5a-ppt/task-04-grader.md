# Task 4: Chấm bài — `gradePpt` và bốn loại check (shared)

**Files:**
- Create: `shared/src/sims/ppt/grade.ts`, `shared/src/sims/ppt/grade.test.ts`
- Modify: `shared/src/grading/index.ts` (đăng ký grader)
- Modify: `shared/src/sims/ppt/index.ts`

**Interfaces:**
- Consumes (Task 1–3): `PptState`, `Slide`, `El`, `ElKind`, `ShapeKind`, `Layout`.
- Produces: `PptCheck` (4 nhánh của 5A), `gradePpt: Grader<PptState, PptCheck>`. 5B sẽ thêm hai nhánh `theme` và `transition` vào đúng union này.

Đọc spec mục 5. Đọc `shared/src/sims/excel/grade.ts` để lấy đúng giọng thông báo
tiếng Việt và mẫu `ok()` / `no()`; đọc `shared/src/grading/core.ts` để biết kiểu
`Grader` và `CheckResult`.

- [ ] **Bước 1: Viết test (FAIL)**

`shared/src/sims/ppt/grade.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { gradeWith } from '../../grading/core';
import { gradePpt, type PptCheck } from './grade';
import { pptInitial, reducePpt, type PptAction, type PptState } from './state';

const run = (...a: PptAction[]): PptState => a.reduce(reducePpt, pptInitial());
const check = (s: PptState, c: PptCheck) => gradeWith(gradePpt, s, [c]);

describe('gradePpt', () => {
  it('slideCount đúng thì đạt', () => {
    expect(check(run({ type: 'addSlide' }), { kind: 'slideCount', count: 2 }).pass).toBe(true);
  });

  it('slideCount sai thì báo số slide đang có', () => {
    const r = check(pptInitial(), { kind: 'slideCount', count: 3 });
    expect(r.pass).toBe(false);
    expect(r.results[0]?.messageVi).toContain('1');
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
    const s = run({ type: 'startEditEl', id: 'e1' }, { type: 'setText', text: '  Mochi Đi Học  ' }, { type: 'commitEdit' });
    expect(check(s, { kind: 'slideTitle', slide: 1, text: 'mochi đi học' }).pass).toBe(true);
  });

  it('slideTitle notEmpty đạt với chữ bất kỳ, trượt khi để trống', () => {
    expect(check(pptInitial(), { kind: 'slideTitle', slide: 1, notEmpty: true }).pass).toBe(false);
    const s = run({ type: 'startEditEl', id: 'e1' }, { type: 'setText', text: 'Nguyễn Văn A' }, { type: 'commitEdit' });
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
    const s = run(
      { type: 'addShape', shape: 'star', x: 100, y: 300, w: 160, h: 160 },
      { type: 'addText', x: 400, y: 300, w: 320, h: 80 },
      { type: 'startEditEl', id: 'e3' }, { type: 'setText', text: 'Sở thích của tôi' }, { type: 'commitEdit' },
    );
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
});
```

Test áp chót là **quyết định thiết kế quan trọng**: `hasElement` chỉ đếm đối tượng
người học tự chèn (`role` trống). Nếu đếm cả chỗ dành sẵn thì bài "chèn một hộp chữ"
đạt ngay khi chưa làm gì.

- [ ] **Bước 2: Chạy, xác nhận FAIL**

Run: `npm test -w shared -- ppt/grade`
Expected: FAIL — `Failed to resolve import "./grade"`.

- [ ] **Bước 3: Viết `grade.ts`**

```ts
import type { CheckResult } from '../../grading/core';
import type { ElKind, Layout, PptState, ShapeKind, Slide } from './state';

export type PptCheck =
  | { kind: 'slideCount'; count: number }
  | { kind: 'slideLayout'; slide: number; layout: Layout }
  | { kind: 'slideTitle'; slide: number; text?: string; notEmpty?: true }
  | { kind: 'hasElement'; slide: number; el: ElKind; min?: number; shape?: ShapeKind; textContains?: string };

const ok = (messageVi: string): CheckResult => ({ ok: true, messageVi });
const no = (messageVi: string): CheckResult => ({ ok: false, messageVi });

const LAYOUT_VI: Record<Layout, string> = {
  title: 'Slide tiêu đề',
  titleContent: 'Tiêu đề và nội dung',
  twoContent: 'Hai cột nội dung',
  blank: 'Trang trắng',
};

const EL_VI: Record<ElKind, string> = { text: 'hộp chữ', shape: 'hình khối', image: 'ảnh' };

const SHAPE_VI: Record<ShapeKind, string> = {
  rect: 'hình chữ nhật', ellipse: 'hình tròn', arrow: 'mũi tên', star: 'ngôi sao',
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
  }
}
```

- [ ] **Bước 4: Chạy, xác nhận PASS**

Run: `npm test -w shared -- ppt/grade`
Expected: PASS, 11 test.

- [ ] **Bước 5: Đăng ký grader**

`shared/src/grading/index.ts`: thêm `import { gradePpt } from '../sims/ppt/grade';`
và dòng `ppt: gradePpt,` vào bảng `GRADERS`.

Thêm `export * from './grade';` vào `shared/src/sims/ppt/index.ts`.

- [ ] **Bước 6: Test rằng đã đăng ký**

Thêm vào cuối `grade.test.ts`:

```ts
it('đã đăng ký vào bảng GRADERS chung', async () => {
  const { grade } = await import('../../grading');
  expect(grade('ppt', pptInitial(), [{ kind: 'slideCount', count: 1 }]).pass).toBe(true);
});
```

Run: `npm test -w shared -- ppt/grade` → PASS.

- [ ] **Bước 7: Chạy toàn bộ và commit**

Run: `npm test -w shared && npm run typecheck` → PASS. Hết phần `shared` của 5A.

```bash
git add shared/src docs/superpowers
git commit -m "feat(ppt): grader và bốn loại check" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

Cập nhật dòng Task 4 của `STATUS.md` trong cùng commit.
