# Task 6: Kéo dời, tám tay nắm, bàn phím và nháy đúp sửa chữ (client)

**Files:**
- Modify: `client/src/sims/ppt/Canvas.tsx`, `client/src/sims/ppt/ElementView.tsx`, `client/src/sims/ppt/PptSim.tsx`
- Create: `client/src/sims/ppt/useDrag.ts`, `client/src/sims/ppt/Canvas.test.tsx`
- Modify: `client/src/styles/theme.css`, `client/src/content/help-ids.ts`

**Interfaces:**
- Consumes (Task 2, 3, 5): action `selectEl`, `moveEl`, `resizeEl`, `deleteEl`, `startEditEl`, `setText`, `commitEdit`, `cancelEdit`; `pptSim.Handle`; `ElementView`, `Canvas`.
- Produces: `useDrag({ scale, onMove })` trả về `{ onPointerDown }`; `ElementView` nhận thêm prop `onStartDrag(handle: pptSim.Handle | 'move', e: React.PointerEvent)`.

**Vấn đề cốt lõi của task này:** chuột đi bằng px màn hình, state nói bằng px khung
gốc. Mọi `dx/dy` phải **chia cho `scale`** trước khi phát action, với
`scale = canvas.getBoundingClientRect().width / 960`. Sai chỗ này thì đối tượng chạy
nhanh hoặc chậm hơn con trỏ — và **không test nào ở jsdom bắt được**, vì mọi
`getBoundingClientRect()` ở đó đều trả về 0. Phải nhìn bằng mắt ở Bước 7.

- [ ] **Bước 1: Viết test (FAIL)**

`client/src/sims/ppt/Canvas.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { pptSim } from '@office-neko/shared';
import { describe, expect, it, vi } from 'vitest';
import { Canvas } from './Canvas';

const state = pptSim.reducePpt(pptSim.pptInitial({ slides: ['blank'] }), {
  type: 'addShape', shape: 'rect', x: 200, y: 200, w: 160, h: 80,
});

const setup = (s = state) => {
  const dispatch = vi.fn();
  render(<Canvas state={s} dispatch={dispatch} />);
  return { dispatch };
};

describe('Canvas', () => {
  it('bấm vào đối tượng thì chọn nó', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByTestId('ppt-el'));
    expect(dispatch).toHaveBeenCalledWith({ type: 'selectEl', id: 'e1' });
  });

  it('bấm vào chỗ trống thì bỏ chọn', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByTestId('ppt-canvas'));
    expect(dispatch).toHaveBeenCalledWith({ type: 'selectEl', id: null });
  });

  it('chỉ đối tượng đang chọn mới có 8 tay nắm', () => {
    setup();
    expect(screen.queryAllByTestId('ppt-handle')).toHaveLength(0);
    setup({ ...state, sel: 'e1' });
    expect(screen.getAllByTestId('ppt-handle')).toHaveLength(8);
  });

  it('nháy đúp thì bắt đầu sửa chữ', async () => {
    const { dispatch } = setup({ ...state, sel: 'e1' });
    await userEvent.dblClick(screen.getAllByTestId('ppt-el')[0]!);
    expect(dispatch).toHaveBeenCalledWith({ type: 'startEditEl', id: 'e1' });
  });

  it('đang sửa thì hiện ô nhập, gõ phát setText, Enter xong, Esc huỷ', async () => {
    const { dispatch } = setup({ ...state, sel: 'e1', editing: 'e1' });
    const box = screen.getByRole('textbox', { name: /nội dung/i });
    await userEvent.type(box, 'A');
    expect(dispatch).toHaveBeenCalledWith({ type: 'setText', text: 'A' });
    await userEvent.type(box, '{Enter}');
    expect(dispatch).toHaveBeenCalledWith({ type: 'commitEdit' });
    await userEvent.type(box, '{Escape}');
    expect(dispatch).toHaveBeenCalledWith({ type: 'cancelEdit' });
  });

  it('mũi tên dời 8px, Delete xoá, Esc bỏ chọn', async () => {
    const { dispatch } = setup({ ...state, sel: 'e1' });
    const canvas = screen.getByTestId('ppt-canvas');
    canvas.focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(dispatch).toHaveBeenCalledWith({ type: 'moveEl', dx: 8, dy: 0 });
    await userEvent.keyboard('{ArrowUp}');
    expect(dispatch).toHaveBeenCalledWith({ type: 'moveEl', dx: 0, dy: -8 });
    await userEvent.keyboard('{Delete}');
    expect(dispatch).toHaveBeenCalledWith({ type: 'deleteEl' });
    await userEvent.keyboard('{Escape}');
    expect(dispatch).toHaveBeenCalledWith({ type: 'selectEl', id: null });
  });

  it('mũi tên không dời gì khi chưa chọn đối tượng nào', async () => {
    const { dispatch } = setup();
    screen.getByTestId('ppt-canvas').focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'moveEl' }));
  });
});
```

- [ ] **Bước 2: Chạy, xác nhận FAIL**

Run: `npm test -w client -- ppt/Canvas`
Expected: FAIL — chưa có tay nắm, chưa có ô nhập.

- [ ] **Bước 3: `useDrag.ts`**

```ts
import { useRef } from 'react';

/**
 * Kéo bằng con trỏ, quy về px của khung gốc. `scale` đọc lại **tại lúc bắt đầu kéo**
 * (cửa sổ có thể vừa đổi cỡ), và mỗi bước chỉ báo phần **chênh so với lần trước**,
 * nên reducer chỉ cần cộng dồn.
 */
export function useDrag(onMove: (dx: number, dy: number) => void, getScale: () => number) {
  const last = useRef<{ x: number; y: number; k: number } | null>(null);
  return {
    onPointerDown(e: React.PointerEvent) {
      e.preventDefault();
      e.stopPropagation();
      (e.target as Element).setPointerCapture(e.pointerId);
      last.current = { x: e.clientX, y: e.clientY, k: getScale() || 1 };
    },
    onPointerMove(e: React.PointerEvent) {
      const l = last.current;
      if (!l) return;
      const dx = (e.clientX - l.x) / l.k;
      const dy = (e.clientY - l.y) / l.k;
      // Chỉ báo khi đã đi đủ một ô lưới, kẻo mỗi pixel một action làm state nhảy loạn.
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      last.current = { ...l, x: e.clientX, y: e.clientY };
      onMove(dx, dy);
    },
    onPointerUp(e: React.PointerEvent) {
      (e.target as Element).releasePointerCapture?.(e.pointerId);
      last.current = null;
    },
  };
}
```

- [ ] **Bước 4: Tay nắm trong `ElementView`**

Khi `selected`, vẽ 8 `<span data-testid="ppt-handle" data-handle="nw" …>` ở bốn góc
và bốn cạnh, mỗi cái `aria-hidden` (đã có bàn phím thay thế), `cursor` đúng hướng
(`nwse-resize`, `ns-resize`, `nesw-resize`, `ew-resize`). Tay nắm **không co giãn
theo scale**: đặt `width/height` bằng `calc(10px / var(--ppt-scale, 1))` để trên màn
hình luôn to 10px thật.

- [ ] **Bước 5: Kéo và sửa chữ trong `Canvas`**

- Giữ `ref` tới `.ppt-canvas`; `getScale = () => el.getBoundingClientRect().width / pptSim.SLIDE_W`.
- `onPointerDown` trên thân đối tượng → `selectEl` rồi bắt đầu kéo `moveEl`.
- `onPointerDown` trên tay nắm → `resizeEl` với `handle` lấy từ `dataset.handle`.
- `onDoubleClick` → `startEditEl`.
- Khi `state.editing === el.id`, thay phần chữ bằng `<textarea aria-label="Nội dung đối tượng">`
  đặt chồng đúng vị trí, `value = el.text`, `onChange` → `setText`, `Enter` (không
  Shift) → `commitEdit`, `Escape` → `cancelEdit`, `onBlur` → `commitEdit`. Tự `focus`
  khi xuất hiện.
- Khung `.ppt-canvas` có `tabIndex={0}`; `onKeyDown` lo mũi tên / `Delete` / `Escape`
  (chỉ khi `state.editing === null`).

- [ ] **Bước 6: Chạy, xác nhận PASS**

Run: `npm test -w client -- ppt`
Expected: PASS, 7 test mới.

- [ ] **Bước 7: Kiểm tra trên trình duyệt — bắt buộc, và đây là task dễ sai nhất**

Mở `/dev/ppt`. Làm thật và **chụp ảnh**:

1. Kéo một hình khối: con trỏ và hình có đi **cùng tốc độ** không? Nếu hình chạy chậm
   hơn thì `scale` đang bị nhân thay vì chia.
2. Kéo tay nắm `nw` vào trong tới hết cỡ: hình phải **dừng lại** ở 64×32, không lật ngược.
3. Kéo một đối tượng ra khỏi mép trái và mép dưới: phải **dừng ở mép**, không lọt ra.
4. Thu hẹp cửa sổ trình duyệt xuống ~700px rồi kéo lại: tốc độ vẫn phải khớp (đây là
   lý do `getScale` đọc lại mỗi lần bắt đầu kéo).
5. Nháy đúp gõ tiếng Việt có dấu vào tiêu đề: chữ hiện đúng, Enter xong, Esc trả lại
   chữ cũ.
6. Duyệt mọi `.ppt-el`, so `getBoundingClientRect()` với khung — không cái nào lọt ra.

- [ ] **Bước 8: Commit**

```bash
git add client/src docs/superpowers
git commit -m "feat(ppt): kéo dời, tay nắm đổi kích thước và sửa chữ trên slide" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

Cập nhật dòng Task 6 của `STATUS.md`: ghi lại bất cứ sai lệch nào giữa số đo của test
và cái nhìn thấy trên trình duyệt — mục "Lỗi bắt được khi nhìn ảnh chụp" của STATUS
là tài sản của cả dự án.
