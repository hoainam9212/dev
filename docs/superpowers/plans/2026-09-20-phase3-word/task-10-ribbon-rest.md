# Task 10: Các tab còn lại và hộp thoại

Đọc `00-overview.md` trước. **Task giao diện: có bước kiểm tra trình duyệt.**

**Files:**
- Create: `client/src/sims/word/Ribbon.tsx`, `client/src/sims/word/dialogs.tsx`, `client/src/sims/word/Ribbon.test.tsx`
- Modify: `client/src/sims/word/WordSim.tsx`, `client/src/content/help-ids.ts`

**Interfaces:**
- Consumes: `RibbonHome` (Task 9); `wordSim.IMAGE_LIBRARY`, `wordSim.countMatches` (Task 5–6).
- Produces:
```tsx
export function Ribbon(props: { state: wordSim.WordState; dispatch: (a: wordSim.WordAction) => void }): JSX.Element;
export function WordDialogs(props: { state: wordSim.WordState; dispatch: (a: wordSim.WordAction) => void; now: number }): JSX.Element | null;
```

**Thanh tab:** File, Home, Insert, Layout, References, View. Tab đang mở là state cục bộ của `Ribbon` (`useState`) — đây là trạng thái *giao diện thuần tuý*, không thuộc bài chấm, nên được phép nằm ngoài reducer. Mọi thứ **đổi tài liệu** vẫn phải đi qua `dispatch`.

| Tab | Nút | Action | helpId |
|---|---|---|---|
| File | Lưu | mở hộp thoại `save` | `word.save` |
| | In | mở hộp thoại `print` | `word.print` |
| Insert | Bảng (chọn số hàng × cột) | `insertTable` | `word.table` |
| | Thêm hàng / Xoá hàng | `tableRow` | `word.rowAdd`, `word.rowRemove` |
| | Thêm cột / Xoá cột | `tableCol` | `word.colAdd`, `word.colRemove` |
| | Ảnh | mở hộp thoại `image` | `word.image` |
| Layout | Độ rộng ảnh (25/40/60/100%) | `setImageWidth` | `word.imageWidth` |
| References | Chèn mục lục | `insertToc` | `word.toc` |
| | Cập nhật mục lục | `refreshToc` | `word.tocRefresh` |
| View | Tìm & Thay thế | mở hộp thoại `find` | `word.find` |

**Hộp thoại** (`WordDialogs`, hiện theo `state.dialog`, tất cả đều đóng được bằng **Esc** và bằng nút ✕):
- `find`: ô "Tìm", ô "Thay bằng", dòng đếm "Tìm thấy N chỗ" (dùng `countMatches`), nút **Thay tất cả** → `replaceAll`, nút **Thay chỗ đầu tiên** → `replaceOne`.
- `image`: lưới 6 ảnh từ `IMAGE_LIBRARY`, bấm một ảnh → `insertImage` + đóng hộp thoại. Bên dưới có **"Tải ảnh từ máy"** (spec mục 7.4 yêu cầu): `<input type="file" accept="image/*">`, đọc bằng `FileReader.readAsDataURL`, rồi `insertImage` với `src` là data URL và `alt` là tên file (bỏ đuôi). File > 1 MB → hiện câu "Ảnh hơi nặng, bạn chọn ảnh nhỏ hơn nhé" và không chèn; ảnh chỉ nằm trong máy học, không gửi đi đâu.
- `save`: ô tên file (mặc định `van-ban.docx`), nút **Lưu** → `{ type: 'save', name, at: now }`, rồi hiện dòng "Đã lưu ✓". `now` là prop truyền từ `WordSim` (`Date.now()` gọi ở component, **không** trong reducer).
- `print`: bản xem trước thu nhỏ của trang A4 + nút **In** → `print`, kèm câu "Đây là bản in mô phỏng, máy in thật sẽ không chạy."

- [ ] **Step 1: Viết test (FAIL trước)**

`client/src/sims/word/Ribbon.test.tsx`:
```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { wordSim } from '@office-neko/shared';
import { Ribbon, WordDialogs } from './Ribbon';   // Ribbon.tsx re-export WordDialogs từ dialogs.tsx

const base = () => wordSim.wordInitial({ text: 'công ty ABC và công ty ABC' });

describe('Ribbon tabs', () => {
  it('starts on Home and switches to Insert', () => {
    const dispatch = vi.fn();
    render(<Ribbon state={base()} dispatch={dispatch} />);
    expect(screen.getByRole('button', { name: 'In đậm' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: 'Insert' }));
    fireEvent.click(screen.getByRole('button', { name: 'Chèn bảng' }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'insertTable' }));
  });

  it('opens the find dialog from View', () => {
    const dispatch = vi.fn();
    render(<Ribbon state={base()} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('tab', { name: 'View' }));
    fireEvent.click(screen.getByRole('button', { name: 'Tìm và thay thế' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'openDialog', dialog: 'find' });
  });

  it('inserts a table of contents from References', () => {
    const dispatch = vi.fn();
    render(<Ribbon state={base()} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('tab', { name: 'References' }));
    fireEvent.click(screen.getByRole('button', { name: 'Chèn mục lục' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'insertToc' });
  });
});

describe('WordDialogs', () => {
  const open = (dialog: wordSim.WordState['dialog']) => ({ ...base(), dialog });

  it('counts matches and replaces all', () => {
    const dispatch = vi.fn();
    render(<WordDialogs state={open('find')} dispatch={dispatch} now={1} />);
    fireEvent.change(screen.getByLabelText('Tìm'), { target: { value: 'ABC' } });
    expect(screen.getByText(/2 chỗ/)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Thay bằng'), { target: { value: 'Mochi' } });
    fireEvent.click(screen.getByRole('button', { name: 'Thay tất cả' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'replaceAll', find: 'ABC', replace: 'Mochi' });
  });

  it('inserts a picture from the library', () => {
    const dispatch = vi.fn();
    render(<WordDialogs state={open('image')} dispatch={dispatch} now={1} />);
    const first = wordSim.IMAGE_LIBRARY[0]!;
    fireEvent.click(screen.getByRole('button', { name: first.alt }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'insertImage', src: first.src, alt: first.alt });
  });

  it('inserts a picture uploaded from the computer', async () => {
    const dispatch = vi.fn();
    render(<WordDialogs state={open('image')} dispatch={dispatch} now={1} />);
    const file = new File(['<svg/>'], 'anh-cua-toi.svg', { type: 'image/svg+xml' });
    fireEvent.change(screen.getByLabelText('Tải ảnh từ máy'), { target: { files: [file] } });
    await vi.waitFor(() => expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'insertImage', alt: 'anh-cua-toi' })));
  });

  it('refuses a picture larger than 1 MB', async () => {
    const dispatch = vi.fn();
    render(<WordDialogs state={open('image')} dispatch={dispatch} now={1} />);
    const big = new File([new Uint8Array(1_100_000)], 'to-qua.png', { type: 'image/png' });
    fireEvent.change(screen.getByLabelText('Tải ảnh từ máy'), { target: { files: [big] } });
    expect(await screen.findByText(/hơi nặng/)).toBeInTheDocument();
    expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'insertImage' }));
  });

  it('saves with the typed name and closes on Escape', () => {
    const dispatch = vi.fn();
    render(<WordDialogs state={open('save')} dispatch={dispatch} now={1700000000000} />);
    fireEvent.change(screen.getByLabelText('Tên file'), { target: { value: 'don-xin-viec.docx' } });
    fireEvent.click(screen.getByRole('button', { name: 'Lưu' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'save', name: 'don-xin-viec.docx', at: 1700000000000 });
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'openDialog', dialog: null });
  });

  it('renders nothing when no dialog is open', () => {
    const { container } = render(<WordDialogs state={base()} dispatch={vi.fn()} now={1} />);
    expect(container).toBeEmptyDOMElement();
  });
});
```

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `npm test -w client -- Ribbon`

- [ ] **Step 3: Viết `dialogs.tsx` rồi `Ribbon.tsx`**

Hộp thoại dùng `role="dialog"` + `aria-modal`, bẫy Esc bằng `useEffect` gắn `keydown` trên `window` và gỡ khi đóng (theo đúng cách `TermLink.tsx` đang làm). `Ribbon.tsx` render thanh `role="tablist"` + nội dung tab đang mở, và `export { WordDialogs } from './dialogs';`.

- [ ] **Step 4: Gắn vào `WordSim` + helpId**

`WordSim.tsx`: `<Ribbon …/>` trên cùng, `<Page>` ở giữa, `<WordDialogs … now={Date.now()} />` cuối. Thêm 12 mục `word.*` còn thiếu vào `help-ids.ts`.

- [ ] **Step 5: Chạy test, xác nhận PASS**

Run: `npm test && npm run typecheck`

- [ ] **Step 6: Kiểm tra trên trình duyệt (BẮT BUỘC)**

Tại `/dev/word`:
1. Insert → chèn bảng 3×2, gõ chữ vào một ô, thêm một hàng, xoá một cột.
2. Insert → Ảnh → chọn ảnh Mochi; thử **Tải ảnh từ máy** với một ảnh nhỏ có thật; Layout → đổi độ rộng 100%.
3. References → chèn mục lục sau khi đã có 2 Heading 1; sửa một heading rồi **Cập nhật mục lục** → mục lục đổi theo.
4. View → Tìm & Thay thế: đếm đúng số chỗ, **Thay tất cả** chạy đúng, **Hoàn tác** một lần là về như cũ.
5. File → Lưu: nhập tên, thấy "Đã lưu ✓". File → In: hiện bản xem trước.
6. Đóng hộp thoại bằng **Esc** và bằng ✕ đều được. Console sạch.

- [ ] **Step 7: Commit + STATUS**

```bash
git add -A
git commit -m "feat(sims): Word ribbon tabs with tables, pictures, TOC, find/replace and save dialogs" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
