# Task 5: Vỏ sim — cột thumbnail và khung 16:9 (client)

**Files:**
- Create: `client/src/sims/ppt/PptSim.tsx`, `SlideList.tsx`, `Canvas.tsx`, `ElementView.tsx`
- Create: `client/src/sims/ppt/PptSim.test.tsx`, `client/src/sims/ppt/SlideList.test.tsx`
- Create tạm: `client/src/pages/DevPptPage.tsx` + một route `/dev/ppt` — **Task 11 PHẢI xoá**
- Modify: `client/src/sims/registry.ts`, `client/src/content/help-ids.ts`, `client/src/styles/theme.css`

**Interfaces:**
- Consumes (Task 1–4): `pptSim.PptState`, `pptSim.reducePpt`, `pptSim.pptInitial`, `pptSim.SLIDE_W`, `pptSim.SLIDE_H`, `pptSim.PptAction`.
- Produces: `PptSim` (dùng được trong `SIMS.ppt`), `<Canvas state dispatch scale? />`, `<SlideList state dispatch />`, `<ElementView el selected scale onPointerDown? />`.

Đọc spec mục 6. Task này **chưa** làm kéo–thả (Task 6) và **chưa** có ribbon (Task 7).
Mục tiêu: nhìn thấy slide trên trình duyệt, bấm thumbnail đổi slide được.

- [ ] **Bước 1: Viết test (FAIL)**

`client/src/sims/ppt/PptSim.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { pptSim } from '@office-neko/shared';
import { describe, expect, it, vi } from 'vitest';
import { PptSim } from './PptSim';

const setup = (initial = pptSim.pptInitial({ slides: ['title', 'titleContent'] })) => {
  const onState = vi.fn();
  render(<PptSim initial={initial} onState={onState} os="win" spotlight={null} />);
  return { onState };
};

describe('PptSim', () => {
  it('vẽ đúng số thumbnail, đánh số từ 1', () => {
    setup();
    expect(screen.getByRole('button', { name: /Slide 1/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Slide 2/ })).toBeInTheDocument();
  });

  it('khung slide giữ đúng tỉ lệ 16:9 của khổ 960x540', () => {
    setup();
    const canvas = screen.getByTestId('ppt-canvas');
    expect(canvas).toHaveAttribute('data-w', String(pptSim.SLIDE_W));
    expect(canvas).toHaveAttribute('data-h', String(pptSim.SLIDE_H));
  });

  it('bấm thumbnail thì mở slide đó và báo state ra ngoài', async () => {
    const { onState } = setup();
    await userEvent.click(screen.getByRole('button', { name: /Slide 2/ }));
    expect(onState).toHaveBeenLastCalledWith(expect.objectContaining({ active: 1 }));
  });

  it('chữ mờ hiện khi chỗ dành sẵn còn trống, và biến mất khi có chữ', async () => {
    setup();
    expect(screen.getByText('Bấm để nhập tiêu đề')).toBeInTheDocument();
    const withText = pptSim.reducePpt(
      pptSim.reducePpt(pptSim.pptInitial(), { type: 'startEditEl', id: 'e1' }),
      { type: 'setText', text: 'Mochi' },
    );
    expect(withText.slides[0]?.els[0]?.text).toBe('Mochi');
  });

  it('mọi đối tượng nằm gọn trong khung 960x540', () => {
    setup(pptSim.pptInitial({ slides: ['twoContent'] }));
    for (const el of screen.getAllByTestId('ppt-el')) {
      const x = Number(el.dataset.x), y = Number(el.dataset.y);
      const w = Number(el.dataset.w), h = Number(el.dataset.h);
      expect(x).toBeGreaterThanOrEqual(0);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(x + w).toBeLessThanOrEqual(pptSim.SLIDE_W);
      expect(y + h).toBeLessThanOrEqual(pptSim.SLIDE_H);
    }
  });
});
```

Test cuối là **tấm lưới an toàn cho cả 5A**: jsdom không có layout, nên đây là cách
duy nhất test bắt được đối tượng lọt ra ngoài khung. Vì thế `ElementView` phải phơi
`data-x/y/w/h`.

- [ ] **Bước 2: Chạy, xác nhận FAIL**

Run: `npm test -w client -- ppt/PptSim`
Expected: FAIL — chưa có `./PptSim`.

- [ ] **Bước 3: `ElementView.tsx`**

```tsx
import type { pptSim } from '@office-neko/shared';

/** Vẽ một đối tượng theo px của khung gốc 960x540; khung cha lo việc co giãn. */
export function ElementView({ el, selected }: { el: pptSim.El; selected: boolean }) {
  const fmt = el.fmt ?? {};
  const style: React.CSSProperties = {
    position: 'absolute', left: el.x, top: el.y, width: el.w, height: el.h,
    fontSize: fmt.size, fontWeight: fmt.bold ? 700 : 400, fontStyle: fmt.italic ? 'italic' : 'normal',
    color: fmt.color, textAlign: fmt.align,
  };
  const empty = !(el.text ?? '').trim();
  return (
    <div
      data-testid="ppt-el" data-x={el.x} data-y={el.y} data-w={el.w} data-h={el.h} data-el-id={el.id}
      className={`ppt-el${selected ? ' is-selected' : ''}`} style={style}
    >
      {el.kind === 'shape' ? <div className="ppt-shape" data-shape={el.shape} style={{ background: fmt.fill }} /> : null}
      {el.kind === 'image' ? <img src={el.src} alt={el.alt ?? ''} className="ppt-img" /> : null}
      {el.kind !== 'image' ? (
        <span className={empty && el.role ? 'ppt-placeholder' : 'ppt-text'}>
          {empty && el.role ? (el.role === 'title' ? 'Bấm để nhập tiêu đề' : 'Bấm để nhập nội dung') : el.text}
        </span>
      ) : null}
    </div>
  );
}
```

Hình khối vẽ bằng CSS: `rect` bo 8px, `ellipse` `border-radius: 50%`, `arrow` và
`star` dùng `clip-path` (`polygon`) đặt trong `theme.css` theo `[data-shape]`.

- [ ] **Bước 4: `Canvas.tsx`**

```tsx
import { pptSim } from '@office-neko/shared';
import { ElementView } from './ElementView';

/**
 * Khung 16:9. State luôn nói bằng px của khổ 960x540; khung này co giãn bằng
 * `aspect-ratio` + `container` nên không component nào phải biết kích thước thật.
 */
export function Canvas({ state, dispatch }: { state: pptSim.PptState; dispatch: React.Dispatch<pptSim.PptAction> }) {
  const slide = state.slides[state.active];
  if (!slide) return null;
  return (
    <div className="ppt-stage" data-help-id="ppt.canvas">
      <div
        data-testid="ppt-canvas" data-w={pptSim.SLIDE_W} data-h={pptSim.SLIDE_H}
        className="ppt-canvas"
        style={{ width: pptSim.SLIDE_W, height: pptSim.SLIDE_H }}
        onPointerDown={(e) => { if (e.target === e.currentTarget) dispatch({ type: 'selectEl', id: null }); }}
      >
        {slide.els.map((el) => <ElementView key={el.id} el={el} selected={el.id === state.sel} />)}
      </div>
    </div>
  );
}
```

`theme.css`, ở **cấp đầu** của `@layer components` (nếu lồng vào trong thì `theme.test.ts`
sẽ bắt — và hãy thêm các tên lớp mới vào danh sách nó kiểm):

```css
.ppt-stage { container-type: inline-size; width: 100%; }
.ppt-canvas { position: relative; transform-origin: top left; transform: scale(calc(100cqw / 960)); background: var(--paper); border-radius: 12px; box-shadow: var(--shadow-1); }
/* Khung cha phải chừa đúng chiều cao sau khi co giãn, nếu không slide sẽ đè lên thứ bên dưới. */
.ppt-stage { aspect-ratio: 16 / 9; }
```

- [ ] **Bước 5: `SlideList.tsx`**

Cột dọc; mỗi thumbnail là `<button>` có `aria-label="Slide N"`, `aria-current` khi
đang mở, bên trong vẽ lại `Canvas` thu nhỏ (dùng `ElementView`, `pointer-events: none`).
Nút **+** ở cuối phát `{ type: 'addSlide' }`, `data-help-id="ppt.newSlide"`.

`SlideList.test.tsx` kiểm: đánh số từ 1; slide đang mở có `aria-current="true"`;
bấm **+** làm số thumbnail tăng 1.

- [ ] **Bước 6: `PptSim.tsx`**

Đúng khuôn `ExcelSim.tsx`: `useReducer(pptSim.reducePpt, initial)`, `useEffect(() => onState(state), [state, onState])`,
bố cục hai cột (`SlideList` bên trái rộng 140px, `Canvas` chiếm phần còn lại).
**Chưa** render ribbon ở task này.

- [ ] **Bước 7: Đăng ký sim**

`client/src/sims/registry.ts`: thêm `import { PptSim } from './ppt/PptSim';` và dòng
`ppt: { kind: 'ppt', Component: PptSim, reduce: pptSim.reducePpt },` (nhớ thêm
`pptSim` vào danh sách import từ `@office-neko/shared`).

`help-ids.ts`: thêm `'ppt.canvas'` ("Khung slide — mọi thứ bạn thêm sẽ nằm trong
khung 16:9 này, đúng như khi chiếu lên máy chiếu.") và `'ppt.newSlide'` ("New Slide
(Slide mới) — thêm một slide ngay sau slide đang mở.").

- [ ] **Bước 8: Chạy, xác nhận PASS**

Run: `npm test -w client -- ppt`
Expected: PASS.

- [ ] **Bước 9: Kiểm tra trên trình duyệt — bắt buộc**

Tạo route tạm `/dev/ppt` (`DevPptPage.tsx`) render `<PptSim initial={pptSim.pptInitial({ slides: ['title','titleContent','twoContent'] })} ... />`.
Chạy preview `office-neko` (cổng 5174), mở `/dev/ppt`, rồi **tự soi ba điều của
`00-overview.md`**, cộng thêm:

- Chụp ảnh thật: khung có đúng tỉ lệ 16:9 không? Chữ tiêu đề có nằm giữa không? Có
  giống một slide PowerPoint không?
- `getComputedStyle(document.querySelector('.ppt-canvas')).transform` phải là một
  ma trận scale khác `none` — nếu là `none` thì `100cqw` không có tác dụng vì thiếu
  `container-type` ở cha.
- Duyệt mọi `.ppt-el`, so `getBoundingClientRect()` với hình chữ nhật của `.ppt-canvas`:
  **không cái nào được lọt ra ngoài**. Đây chính là cái bẫy đã cắn ở 4B (nhãn SVG
  tràn khung mà test vẫn xanh).

Nếu `rm -rf client/node_modules/.vite` chưa chạy mà giao diện báo `pptSim undefined`,
chạy nó rồi khởi động lại dev server.

- [ ] **Bước 10: Commit**

```bash
git add client/src docs/superpowers
git commit -m "feat(ppt): vỏ trình mô phỏng, cột thumbnail và khung 16:9" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

Cập nhật dòng Task 5 của `STATUS.md`, **ghi rõ** rằng route tạm `/dev/ppt` và
`DevPptPage.tsx` phải bị xoá ở Task 11.
