# Task 9: Ribbon tab Home

Đọc `00-overview.md` trước. **Task giao diện: có bước kiểm tra trình duyệt.**

**Files:**
- Create: `client/src/sims/word/RibbonHome.tsx`, `client/src/sims/word/RibbonHome.test.tsx`
- Modify: `client/src/sims/word/WordSim.tsx` (gắn ribbon thay hàng nút tạm), `client/src/content/help-ids.ts`

**Interfaces:**
- Consumes: `wordSim.activeMarks`, `wordSim.activeBlock` (Task 3–4); `WordAction`.
- Produces:
```tsx
export function RibbonHome(props: { state: wordSim.WordState; dispatch: (a: wordSim.WordAction) => void }): JSX.Element;
```

**Nội dung tab Home** (đúng chừng này, không thêm nút cho "đủ giống Word"):

| Nhóm | Nút | Action | helpId |
|---|---|---|---|
| Phông chữ | chọn font (5 mục) | `setStyle` fontFamily | `word.font` |
| | chọn cỡ (10, 11, 12, 14, 16, 20 pt) | `setStyle` fontSize | `word.size` |
| | **B**, *I*, <u>U</u> | `toggleMark` | `word.bold`, `word.italic`, `word.underline` |
| | màu chữ (6 màu + "Tự động") | `setStyle` color | `word.color` |
| | tô nền (4 màu + "Không tô") | `setHighlight` | `word.highlight` |
| Đoạn văn | căn trái/giữa/phải/đều | `setAlign` | `word.alignLeft`, `word.alignCenter`, `word.alignRight`, `word.alignJustify` |
| | giãn dòng (1 / 1.5 / 2) | `setLineHeight` | `word.lineHeight` |
| | danh sách chấm, danh sách số | `toggleList` | `word.bullet`, `word.ordered` |
| Kiểu | Đoạn thường, Heading 1, 2, 3 | `setHeading` | `word.heading` |
| Sửa | Hoàn tác | `undo` | `word.undo` |

Quy tắc giao diện:
- 5 font: Times New Roman, Arial, Calibri, Tahoma, Courier New. Mỗi mục `<option>` hiển thị bằng chính font đó.
- Nút đang bật (theo `activeMarks`/`activeBlock`) có nền hồng nhạt + `aria-pressed="true"`.
- Mỗi nút có `data-help-id`, `title` tiếng Việt và `aria-label` tiếng Việt (ví dụ `aria-label="In đậm"`). Test và spotlight dựa vào `aria-label`, nên đặt tên một lần cho chuẩn.
- Ribbon dính trên đầu vùng sim, cuộn ngang được trên màn hình hẹp (`overflow-x-auto`), không đẩy trang A4 tràn.
- Bấm nút **không** làm mất vùng chọn trong editor: dùng `onMouseDown={(e) => e.preventDefault()}` cho mọi nút định dạng.

- [ ] **Step 1: Viết test (FAIL trước)**

`client/src/sims/word/RibbonHome.test.tsx`:
```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { wordSim } from '@office-neko/shared';
import { RibbonHome } from './RibbonHome';

const withSelection = () => [{ type: 'selectText', text: 'Quý công ty' }].reduce(
  wordSim.reduceWord as never, wordSim.wordInitial({ text: 'Kính gửi Quý công ty' }),
) as wordSim.WordState;

describe('RibbonHome', () => {
  it('dispatches the bold action for the current selection', () => {
    const dispatch = vi.fn();
    render(<RibbonHome state={withSelection()} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: 'In đậm' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'toggleMark', mark: 'bold' });
  });

  it('shows a button as pressed when the mark is already on', () => {
    const on = wordSim.reduceWord(withSelection(), { type: 'toggleMark', mark: 'bold' });
    render(<RibbonHome state={on} dispatch={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'In đậm' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('dispatches alignment, list and heading', () => {
    const dispatch = vi.fn();
    render(<RibbonHome state={withSelection()} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: 'Căn giữa' }));
    fireEvent.click(screen.getByRole('button', { name: 'Danh sách chấm' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setAlign', align: 'center' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'toggleList', list: 'bullet' });
    fireEvent.change(screen.getByRole('combobox', { name: 'Kiểu đoạn' }), { target: { value: '1' } });
    expect(dispatch).toHaveBeenCalledWith({ type: 'setHeading', level: 1 });
  });

  it('dispatches font family and size', () => {
    const dispatch = vi.fn();
    render(<RibbonHome state={withSelection()} dispatch={dispatch} />);
    fireEvent.change(screen.getByRole('combobox', { name: 'Phông chữ' }), { target: { value: 'Arial' } });
    fireEvent.change(screen.getByRole('combobox', { name: 'Cỡ chữ' }), { target: { value: '16pt' } });
    expect(dispatch).toHaveBeenCalledWith({ type: 'setStyle', attr: 'fontFamily', value: 'Arial' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'setStyle', attr: 'fontSize', value: '16pt' });
  });

  it('gives every control a help id', () => {
    const { container } = render(<RibbonHome state={withSelection()} dispatch={vi.fn()} />);
    const ids = [...container.querySelectorAll('[data-help-id]')].map((e) => e.getAttribute('data-help-id'));
    expect(ids).toEqual(expect.arrayContaining(['word.bold', 'word.italic', 'word.underline', 'word.alignCenter', 'word.bullet', 'word.heading', 'word.font', 'word.size']));
  });
});
```

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `npm test -w client -- RibbonHome`

- [ ] **Step 3: Viết `RibbonHome.tsx`**

Theo bảng ở trên. Gom các nút lặp lại thành một component nhỏ `ToolButton({ helpId, label, pressed, onClick, children })` ngay trong file để khỏi chép đi chép lại `onMouseDown`/`aria-pressed`.

- [ ] **Step 4: Gắn vào `WordSim`, thêm helpId**

Trong `WordSim.tsx`: thay hàng nút tạm bằng `<RibbonHome state={state} dispatch={dispatch} />`.
Trong `client/src/content/help-ids.ts`: thêm đủ 15 mục `word.*` ở bảng trên, mỗi mục `{ label, vi }` bằng tiếng Việt dễ hiểu, ví dụ:
```ts
  'word.bold': { label: 'Bold (In đậm)', vi: 'Làm chữ đang chọn đậm lên. Phím tắt: Ctrl + B.' },
  'word.lineHeight': { label: 'Line spacing (Giãn dòng)', vi: 'Cho các dòng trong đoạn xa nhau hơn.' },
```

- [ ] **Step 5: Chạy test, xác nhận PASS**

Run: `npm test && npm run typecheck`

- [ ] **Step 6: Kiểm tra trên trình duyệt (BẮT BUỘC)**

Mở preview `/dev/word` (route tạm từ Task 8):
1. Chọn một đoạn chữ, bấm **B** → chữ đậm ngay trên trang; nút sáng lên.
2. Bấm **B** lần nữa → hết đậm. Bấm **Hoàn tác** → quay lại bước trước.
3. Đổi font và cỡ chữ → thấy đổi thật trên trang, **vùng chọn không bị mất** sau khi bấm.
4. Căn giữa một đoạn, bật danh sách chấm, đổi sang Heading 1 → cả ba đổi đúng.
5. Rê chuột vào nút **B** → tooltip tiếng Việt hiện ra.
6. Thu cửa sổ còn 400px → ribbon cuộn ngang, trang không vỡ. Console sạch.

- [ ] **Step 7: Commit + STATUS**

```bash
git add -A
git commit -m "feat(sims): Word Home ribbon with font, paragraph and style controls" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
