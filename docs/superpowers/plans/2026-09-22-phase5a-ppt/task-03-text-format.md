# Task 3: Sửa chữ, định dạng, hoàn tác, Lưu và In (shared)

**Files:**
- Create: `shared/src/sims/ppt/text.ts`, `shared/src/sims/ppt/text.test.ts`
- Modify: `shared/src/sims/ppt/state.ts` (thêm nhánh action)
- Modify: `shared/src/sims/ppt/index.ts`
- Modify: `shared/src/sims/ppt/state.test.ts` (bật lại hai test `it.todo` của Task 1, nếu có)

**Interfaces:**
- Consumes (Task 1–2): `PptState`, `PptAction`, `El`, `slideOf`, `elOf`, hàm nội bộ `withEls`, `withSlides`.
- Produces: các nhánh action `startEditEl` · `setText` · `commitEdit` · `cancelEdit` · `setFmt` · `undo` · `openDialog` · `closeDialog` · `save` · `print`; hằng `PPT_SIZES: number[]`, `PPT_COLORS: { id: string; vi: string }[]`.

Đọc spec mục 4 (phần "Chữ" và "Khác") trước khi bắt đầu.

**Cách sửa chữ ở PowerPoint khác Word:** không có con trỏ trong dòng, không có vùng
chọn chữ. Nháy đúp vào đối tượng là **thay cả nội dung hộp**: `editing` giữ id đối
tượng, chữ đang gõ nằm thẳng trong `el.text`. Nhờ vậy `setText` là một action duy
nhất và test nội dung phát lại được mà không cần mô phỏng phím.

- [ ] **Bước 1: Viết test (FAIL)**

`shared/src/sims/ppt/text.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { pptInitial, reducePpt, slideOf, type PptAction, type PptState } from './state';

const run = (...a: PptAction[]): PptState => a.reduce(reducePpt, pptInitial());
const title = (s: PptState) => slideOf(s).els.find((e) => e.role === 'title');

describe('reducePpt – chữ', () => {
  it('startEditEl chọn luôn đối tượng đó và bật chế độ sửa', () => {
    const s = run({ type: 'startEditEl', id: 'e1' });
    expect(s.editing).toBe('e1');
    expect(s.sel).toBe('e1');
  });

  it('setText ghi thẳng vào đối tượng đang sửa', () => {
    const s = run({ type: 'startEditEl', id: 'e1' }, { type: 'setText', text: 'Xin chào, tôi là Mochi' });
    expect(title(s)?.text).toBe('Xin chào, tôi là Mochi');
  });

  it('setText khi không sửa gì là phép không', () => {
    const s0 = pptInitial();
    expect(reducePpt(s0, { type: 'setText', text: 'rơi vào hư không' })).toBe(s0);
  });

  it('commitEdit tắt chế độ sửa nhưng giữ chữ và giữ đối tượng đang chọn', () => {
    const s = run({ type: 'startEditEl', id: 'e1' }, { type: 'setText', text: 'Mochi' }, { type: 'commitEdit' });
    expect(s.editing).toBeNull();
    expect(s.sel).toBe('e1');
    expect(title(s)?.text).toBe('Mochi');
  });

  it('cancelEdit trả chữ về như trước khi bắt đầu sửa', () => {
    const s = run(
      { type: 'startEditEl', id: 'e1' }, { type: 'setText', text: 'Bản tốt' }, { type: 'commitEdit' },
      { type: 'startEditEl', id: 'e1' }, { type: 'setText', text: 'Gõ nhầm' }, { type: 'cancelEdit' },
    );
    expect(title(s)?.text).toBe('Bản tốt');
    expect(s.editing).toBeNull();
  });
});

describe('reducePpt – định dạng', () => {
  it('setFmt gộp vào định dạng cũ, không xoá trường khác', () => {
    const s = run({ type: 'selectEl', id: 'e1' }, { type: 'setFmt', fmt: { color: '#D2691E' } });
    expect(title(s)?.fmt).toMatchObject({ size: 40, bold: true, color: '#D2691E' });
  });

  it('setFmt khi không chọn gì là phép không', () => {
    const s0 = pptInitial();
    expect(reducePpt(s0, { type: 'setFmt', fmt: { bold: true } })).toBe(s0);
  });
});

describe('reducePpt – hoàn tác, Lưu, In', () => {
  it('undo trả lại slide trước một bước', () => {
    const s = run({ type: 'addSlide' }, { type: 'undo' });
    expect(s.slides).toHaveLength(1);
  });

  it('undo khi chưa làm gì là phép không', () => {
    const s0 = pptInitial();
    expect(reducePpt(s0, { type: 'undo' })).toBe(s0);
  });

  it('undo bỏ chọn, vì đối tượng đang chọn có thể vừa bị hoàn tác mất', () => {
    const s = run({ type: 'addText', x: 100, y: 300, w: 320, h: 80 }, { type: 'undo' });
    expect(s.sel).toBeNull();
  });

  it('save ghi lại tên và thời điểm do action đưa vào, đóng hộp thoại', () => {
    const s = run({ type: 'openDialog', dialog: 'save' }, { type: 'save', name: 'Gioi thieu.pptx', at: 1700000000000 });
    expect(s.saved).toEqual({ name: 'Gioi thieu.pptx', at: 1700000000000 });
    expect(s.dialog).toBeNull();
  });

  it('print chỉ ghi lại là đã bấm', () => {
    expect(run({ type: 'print' }).printed).toBe(true);
  });
});
```

- [ ] **Bước 2: Chạy, xác nhận FAIL**

Run: `npm test -w shared -- ppt/text`
Expected: FAIL — chưa có nhánh `startEditEl`, các test trả về state không đổi.

- [ ] **Bước 3: Viết `text.ts`**

```ts
import type { El, ElFormat } from './state';

/** Cỡ chữ mời sẵn trong ribbon (pt). */
export const PPT_SIZES = [12, 16, 20, 24, 28, 32, 40, 54];

/** Bảng màu chữ và màu nền hình khối, đặt tên tiếng Việt để đọc bài học dễ hiểu. */
export const PPT_COLORS: { id: string; vi: string }[] = [
  { id: '#2F2A26', vi: 'Nâu đậm' },
  { id: '#D2691E', vi: 'Cam Mochi' },
  { id: '#3FB871', vi: 'Xanh lá' },
  { id: '#3B82F6', vi: 'Xanh biển' },
  { id: '#E11D74', vi: 'Hồng' },
  { id: '#FFFFFF', vi: 'Trắng' },
];

/** Gộp định dạng mới vào định dạng cũ; trường không nói tới thì giữ nguyên. */
export function mergeFmt(el: El, fmt: Partial<ElFormat>): El {
  return { ...el, fmt: { ...el.fmt, ...fmt } };
}
```

- [ ] **Bước 4: Nối vào reducer**

`PptState.editBackup` (chữ trước khi bắt đầu sửa, để `cancelEdit` trả lại được) đã
khai báo và khởi tạo `null` từ Task 1; task này là chỗ đầu tiên dùng tới nó. Rồi:

```ts
    case 'startEditEl': {
      const el = slideOf(s).els.find((e) => e.id === a.id);
      if (!el) return s;
      return { ...s, sel: el.id, editing: el.id, editBackup: el.text ?? '' };
    }
    case 'setText': {
      if (!s.editing) return s;
      const id = s.editing;
      return withEls(s, slideOf(s).els.map((e) => (e.id === id ? { ...e, text: a.text } : e)));
    }
    case 'commitEdit':
      return s.editing ? { ...s, editing: null, editBackup: null } : s;
    case 'cancelEdit': {
      if (!s.editing) return s;
      const id = s.editing;
      const text = s.editBackup ?? '';
      return withEls(s, slideOf(s).els.map((e) => (e.id === id ? { ...e, text } : e)), { editing: null, editBackup: null });
    }
    case 'setFmt': {
      const el = elOf(s);
      if (!el) return s;
      return withEls(s, slideOf(s).els.map((e) => (e.id === el.id ? mergeFmt(e, a.fmt) : e)));
    }
    case 'undo': {
      const prev = s.past[s.past.length - 1];
      if (!prev) return s;
      return {
        ...s, slides: prev, past: s.past.slice(0, -1), sel: null, editing: null, editBackup: null,
        active: Math.min(s.active, prev.length - 1),
      };
    }
    case 'openDialog':
      return { ...s, dialog: a.dialog, editing: null };
    case 'closeDialog':
      return { ...s, dialog: null };
    case 'save':
      return { ...s, saved: { name: a.name, at: a.at }, dialog: null };
    case 'print':
      return { ...s, printed: true, dialog: null };
```

**Cẩn thận với `withEls` và hoàn tác:** `setText` gọi `withEls` nên mỗi phím gõ sẽ
đẩy một mục vào `past` — hoàn tác sẽ lùi từng ký tự một, rất khó chịu. Sửa bằng cách
cho `withEls` nhận cờ `track = true`; `setText` gọi với `track: false` (giữ nguyên
`past`), `commitEdit` không cần ghi vì `startEditEl` đã ghi một mục. Viết đúng một
test cho điều này, thêm vào `text.test.ts`:

```ts
  it('gõ từng chữ không làm đầy lịch sử hoàn tác', () => {
    const s = run({ type: 'startEditEl', id: 'e1' }, { type: 'setText', text: 'M' }, { type: 'setText', text: 'Mo' }, { type: 'setText', text: 'Moc' });
    expect(s.past.length).toBeLessThanOrEqual(1);
  });
```

- [ ] **Bước 5: Chạy, xác nhận PASS**

Run: `npm test -w shared -- ppt`
Expected: PASS. Nếu Task 1 có đánh `it.todo` hai test (`duplicateSlide`, `gotoSlide`),
**bỏ `.todo` ngay bây giờ** và chạy lại — chúng phải xanh.

- [ ] **Bước 6: Export và commit**

Thêm `export * from './text';` vào `index.ts`.

Run: `npm test -w shared && npm run typecheck` → PASS.

```bash
git add shared/src/sims/ppt docs/superpowers
git commit -m "feat(ppt): sửa chữ, định dạng, hoàn tác, Lưu và In" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

Cập nhật dòng Task 3 của `STATUS.md` trong cùng commit. Hết phần lõi state của 5A.
