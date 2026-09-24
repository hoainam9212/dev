# Task 8: Tab Insert và các hộp thoại (client)

**Files:**
- Create: `client/src/sims/ppt/RibbonInsert.tsx`, `dialogs.tsx`, `RibbonInsert.test.tsx`, `dialogs.test.tsx`
- Modify: `client/src/sims/ppt/Ribbon.tsx` (thay `SoonTab` của Insert), `PptSim.tsx`
- Modify: `client/src/content/help-ids.ts`

**Interfaces:**
- Consumes (Task 2–7): action `addText`, `addShape`, `addImage`, `openDialog`, `closeDialog`, `save`, `print`; `Group`, `ToolButton`, `Picker` ở `client/src/components/ribbon.tsx`.
- Produces: `<RibbonInsert state dispatch />`, `<PptDialogs state dispatch now />`. Sau task này 5A **soạn được trọn một slide** bằng chuột — đủ nền cho bài học Task 9–10.

Đọc `client/src/sims/word/dialogs.tsx` trước: hộp thoại chèn ảnh (chọn ảnh mẫu hoặc
tải lên rồi đọc bằng `FileReader`) đã có sẵn, dùng lại đúng bộ ảnh mẫu đó.

**Vị trí đối tượng mới chèn:** không hỏi người học kéo khung. Hộp chữ mới đặt ở
`(80, 400, 480, 80)`, hình khối mới ở `(400, 216, 160, 160)` — đều trong khung, không
đè lên chỗ dành sẵn của bố cục `titleContent`. Chèn xong đối tượng **được chọn sẵn**
(reducer Task 2 đã lo), nên người học kéo tiếp được ngay.

- [ ] **Bước 1: Viết test (FAIL)**

`client/src/sims/ppt/RibbonInsert.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { pptSim } from '@office-neko/shared';
import { describe, expect, it, vi } from 'vitest';
import { RibbonInsert } from './RibbonInsert';

const setup = () => {
  const dispatch = vi.fn();
  render(<RibbonInsert state={pptSim.pptInitial()} dispatch={dispatch} />);
  return { dispatch };
};

describe('RibbonInsert', () => {
  it('Text Box chèn hộp chữ ở vị trí định sẵn, trong khung', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByRole('button', { name: /Text Box/ }));
    const a = dispatch.mock.calls[0]?.[0];
    expect(a).toMatchObject({ type: 'addText', x: 80, y: 400, w: 480, h: 80 });
    expect(a.x + a.w).toBeLessThanOrEqual(pptSim.SLIDE_W);
    expect(a.y + a.h).toBeLessThanOrEqual(pptSim.SLIDE_H);
  });

  it('Shapes mời đủ bốn hình, chọn thì phát addShape', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByRole('button', { name: /Shapes/ }));
    for (const vi of ['Hình chữ nhật', 'Hình tròn', 'Mũi tên', 'Ngôi sao']) {
      expect(screen.getByRole('button', { name: new RegExp(vi) })).toBeInTheDocument();
    }
    await userEvent.click(screen.getByRole('button', { name: /Ngôi sao/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'addShape', shape: 'star', x: 400, y: 216, w: 160, h: 160 });
  });

  it('Pictures mở hộp thoại chèn ảnh', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByRole('button', { name: /Pictures/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'openDialog', dialog: 'image' });
  });
});
```

`dialogs.test.tsx`: mở hộp thoại `image` thì thấy lưới ảnh mẫu, bấm một ảnh phát
`addImage` kèm `src` và `alt` của ảnh đó rồi đóng hộp thoại; hộp thoại `save` gõ tên
rồi bấm Lưu phát `{ type: 'save', name, at: now }`; `Esc` phát `closeDialog`.

- [ ] **Bước 2: Chạy, xác nhận FAIL**

Run: `npm test -w client -- ppt/RibbonInsert`
Expected: FAIL — chưa có `./RibbonInsert`.

- [ ] **Bước 3: Viết `RibbonInsert.tsx`**

Hai nhóm: **Text** (`Text Box` — Hộp chữ) và **Illustrations** (`Shapes` — Hình khối,
Picker 4 mục có xem trước hình thật; `Pictures` — Ảnh).

Nhãn tiếng Việt cho hình: `rect` → "Hình chữ nhật", `ellipse` → "Hình tròn",
`arrow` → "Mũi tên", `star` → "Ngôi sao" (khớp `SHAPE_VI` của grader Task 4 — nếu
lệch chữ thì người học đọc thông báo chấm bài sẽ không tìm ra nút).

Vẫn quy tắc của Task 7: Picker **không** nằm trong khung cuộn ngang.

- [ ] **Bước 4: Viết `dialogs.tsx`**

`PptDialogs` gồm ba hộp thoại theo `state.dialog`:
- `image`: lưới ảnh mẫu (dùng lại bộ của Word) + ô tải tệp lên; chọn xong →
  `{ type: 'addImage', src, alt }` rồi `closeDialog`.
- `save`: ô nhập tên, mặc định `Bai trinh chieu.pptx`; Lưu → `{ type: 'save', name, at: now }`.
- `print`: một câu mô phỏng + nút In → `{ type: 'print' }`.

`now` truyền từ `PptSim` bằng `Date.now()` **ở lớp React**, không bao giờ trong reducer.

Tab **File** của ribbon (Task 7 để trống) nay có hai nút `Save` và `Print` phát
`openDialog`.

- [ ] **Bước 5: Gắn vào `PptSim`**

Thêm `<PptDialogs state={state} dispatch={dispatch} now={Date.now()} />` ở cuối, đúng
như `ExcelSim.tsx`.

- [ ] **Bước 6: Chạy, xác nhận PASS**

Run: `npm test -w client -- ppt` → PASS.
Run: `npm test && npm run typecheck` → PASS.

- [ ] **Bước 7: Kiểm tra trên trình duyệt — bắt buộc**

Mở `/dev/ppt` và **soạn thật một slide giới thiệu**: bố cục Tiêu đề và nội dung → gõ
tiêu đề → chèn hộp chữ, gõ 3 dòng → chèn ngôi sao, đổi màu → chèn một ảnh, kéo nhỏ
lại → Lưu. Chụp ảnh kết quả.

Tự soi:
- Hình khối `arrow` và `star` vẽ bằng `clip-path` có ra đúng hình không, hay chỉ là
  một khối vuông? (jsdom không bao giờ biết điều này.)
- Ảnh chèn vào có bị méo không? `object-fit: contain` để giữ tỉ lệ.
- Mọi đối tượng vẫn nằm trong khung sau khi kéo (duyệt `.ppt-el` như Task 5–6).
- Menu `Shapes` có bị khung cắt cụt không?

- [ ] **Bước 8: Commit**

```bash
git add client/src docs/superpowers
git commit -m "feat(ppt): tab Insert, hộp thoại chèn ảnh, Lưu và In" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

Cập nhật dòng Task 8 của `STATUS.md`. Hết phần giao diện của 5A.
