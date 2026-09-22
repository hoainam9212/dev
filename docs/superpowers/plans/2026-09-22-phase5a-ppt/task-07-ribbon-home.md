# Task 7: Ribbon và tab Home (client)

**Files:**
- Create: `client/src/sims/ppt/Ribbon.tsx`, `RibbonHome.tsx`, `Ribbon.test.tsx`, `RibbonHome.test.tsx`
- Modify: `client/src/sims/ppt/PptSim.tsx` (gắn ribbon lên trên)
- Modify: `client/src/content/help-ids.ts`, `client/src/styles/theme.css`

**Interfaces:**
- Consumes (Task 1–6): action `addSlide`, `duplicateSlide`, `deleteSlide`, `setLayout`, `setFmt`, `undo`, `deleteEl`, `bringToFront`, `sendToBack`; hằng `pptSim.PPT_LAYOUTS`, `pptSim.PPT_SIZES`, `pptSim.PPT_COLORS`; `pptSim.elOf`.
- Produces: `<Ribbon state dispatch />` với sáu tab `File | Home | Insert | Design | Transitions | Slide Show`; `<RibbonHome state dispatch />`.

**Bắt buộc dùng lại** `Group`, `ToolButton`, `Picker` của `client/src/sims/excel/RibbonHome.tsx`
— đọc file đó trước. Nếu ba thành phần ấy đang nằm riêng trong file Excel, **tách ra**
`client/src/components/ribbon.tsx` và cho cả Excel lẫn PowerPoint dùng chung, trong
cùng task này (đổi import của Excel, chạy lại test Excel cho chắc). Không chép mã.

Tab **Insert** làm ở Task 8. Tab **Design**, **Transitions**, **Slide Show** thuộc 5B:
ở 5A chúng hiện một khối "sẽ có ở phần sau" — dùng lại kiểu `SoonTab` mà Excel từng
có (4B đã xoá `SoonTab` khỏi Excel; viết lại một bản nhỏ trong `client/src/components/ribbon.tsx`).

- [ ] **Bước 1: Viết test (FAIL)**

`client/src/sims/ppt/RibbonHome.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { pptSim } from '@office-neko/shared';
import { describe, expect, it, vi } from 'vitest';
import { RibbonHome } from './RibbonHome';

const withShape = pptSim.reducePpt(pptSim.pptInitial(), { type: 'addShape', shape: 'rect', x: 200, y: 300, w: 160, h: 80 });

const setup = (s = pptSim.pptInitial()) => {
  const dispatch = vi.fn();
  render(<RibbonHome state={s} dispatch={dispatch} />);
  return { dispatch };
};

describe('RibbonHome', () => {
  it('New Slide thêm slide', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByRole('button', { name: /New Slide/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'addSlide' });
  });

  it('Layout mời đủ bốn bố cục, chọn thì phát setLayout', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByRole('button', { name: /Layout/ }));
    for (const l of pptSim.PPT_LAYOUTS) expect(screen.getByRole('button', { name: new RegExp(l.vi) })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /Hai cột nội dung/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setLayout', layout: 'twoContent' });
  });

  it('Bold phát setFmt đúng trạng thái đảo lại của đối tượng đang chọn', async () => {
    const { dispatch } = setup({ ...pptSim.pptInitial(), sel: 'e1' });
    await userEvent.click(screen.getByRole('button', { name: /Bold/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setFmt', fmt: { bold: false } });
  });

  it('nút định dạng bị khoá khi chưa chọn đối tượng nào', () => {
    setup();
    expect(screen.getByRole('button', { name: /Bold/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Font size/ })).toBeDisabled();
  });

  it('Bold sáng lên khi đối tượng đang chọn đang in đậm', () => {
    setup({ ...pptSim.pptInitial(), sel: 'e1' });
    expect(screen.getByRole('button', { name: /Bold/ })).toHaveAttribute('aria-pressed', 'true');
  });

  it('chọn cỡ chữ phát setFmt size', async () => {
    const { dispatch } = setup({ ...withShape, sel: 'e2' });
    await userEvent.click(screen.getByRole('button', { name: /Font size/ }));
    await userEvent.click(screen.getByRole('button', { name: '32' }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setFmt', fmt: { size: 32 } });
  });

  it('chọn màu chữ phát setFmt color, tên màu đọc được bằng tiếng Việt', async () => {
    const { dispatch } = setup({ ...withShape, sel: 'e2' });
    await userEvent.click(screen.getByRole('button', { name: /Font color/ }));
    await userEvent.click(screen.getByRole('button', { name: /Cam Mochi/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'setFmt', fmt: { color: '#D2691E' } });
  });

  it('Delete Slide và Undo có mặt và phát đúng action', async () => {
    const { dispatch } = setup();
    await userEvent.click(screen.getByRole('button', { name: /Delete Slide/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'deleteSlide' });
    await userEvent.click(screen.getByRole('button', { name: /Undo/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'undo' });
  });
});
```

`Ribbon.test.tsx`: sáu tab đều bấm được; tab đang mở có `aria-selected="true"`; tab
**Design** hiện chữ "sẽ có ở phần sau" (dùng **Design** làm ví dụ "tab chưa có gì" —
5B sẽ đổi ví dụ này, đúng bài học đã ghi trong STATUS của 4B).

- [ ] **Bước 2: Chạy, xác nhận FAIL**

Run: `npm test -w client -- ppt/Ribbon`
Expected: FAIL — chưa có `./RibbonHome`.

- [ ] **Bước 3: Tách `Group`/`ToolButton`/`Picker` ra dùng chung**

Chuyển ba thành phần từ `client/src/sims/excel/RibbonHome.tsx` sang
`client/src/components/ribbon.tsx` (giữ nguyên mã và kiểu), thêm `SoonTab`:

```tsx
export function SoonTab({ what }: { what: string }) {
  return <p className="ribbon-soon">{what} sẽ có ở phần sau của khoá học nhé!</p>;
}
```

Sửa import trong các file Excel. Run: `npm test -w client -- excel` → vẫn PASS.

- [ ] **Bước 4: Viết `RibbonHome.tsx`**

Ba nhóm, theo đúng thứ tự PowerPoint thật:

| Nhóm | Nút |
|---|---|
| **Slides** | `New Slide` (Slide mới) · `Layout` (Bố cục — Picker 4 mục) · `Duplicate` (Nhân đôi slide) · `Delete Slide` (Xoá slide) |
| **Font** | `Font size` (Cỡ chữ — Picker `PPT_SIZES`) · `Bold` · `Italic` · `Font color` (Màu chữ — Picker `PPT_COLORS`) |
| **Paragraph & Arrange** | `Align left` · `Center` · `Align right` · `Bring to Front` (Đưa lên trên) · `Send to Back` (Đưa xuống dưới) · `Undo` |

Quy tắc:
- Nút nào tác động lên đối tượng thì `disabled` khi `pptSim.elOf(state) === null`;
  `Undo` khoá khi `state.past.length === 0`; `Delete Slide` khoá khi chỉ còn 1 slide.
- `Bold`/`Italic`/căn lề dùng `aria-pressed` theo `elOf(state)?.fmt`, và phát giá trị
  **đảo lại** (`{ bold: !(fmt.bold ?? false) }`).
- Mỗi nút có `title` tiếng Việt và `data-help-id` (`ppt.newSlide`, `ppt.layout`,
  `ppt.bold`, `ppt.size`, `ppt.color`, `ppt.align`, `ppt.front`, `ppt.back`,
  `ppt.undo`, `ppt.deleteSlide`) — thêm đủ vào `HELP_IDS`.
- **Không đặt Picker bên trong khung cuộn ngang.** Đây chính là lỗi đã cắn ở Task 4
  của 4B: `overflow-x: auto` cắt luôn theo chiều dọc nên menu thả xuống bị cụt, mà
  jsdom không thấy. Đặt phần thả xuống thành một khối **nằm dưới** hàng nút.

- [ ] **Bước 5: Gắn ribbon vào `PptSim`**

Thêm `<div className="card p-2"><Ribbon state={state} dispatch={dispatch} /></div>`
lên trên hai cột, đúng như `ExcelSim.tsx`.

- [ ] **Bước 6: Chạy, xác nhận PASS**

Run: `npm test -w client` → PASS (cả Excel sau khi đổi import).

- [ ] **Bước 7: Kiểm tra trên trình duyệt — bắt buộc**

Mở `/dev/ppt`, chụp ảnh và tự soi ba điều của `00-overview.md`, cộng thêm:
- Ribbon PowerPoint có **giống hệt** ribbon Excel/Word về khoảng cách, cỡ chữ, viền
  nhóm không? Nếu lệch, nghĩa là chưa dùng chung `Group`/`ToolButton`.
- Mở Picker `Layout` và Picker `Font color`: menu có **hiện đủ**, không bị khung cắt cụt?
- Làm thật: thêm slide → đổi bố cục Hai cột → gõ tiêu đề → chọn tiêu đề → đổi cỡ 32 →
  đổi màu cam → Undo. Mỗi bước đều phải thấy đúng trên khung.

- [ ] **Bước 8: Commit**

```bash
git add client/src docs/superpowers
git commit -m "feat(ppt): ribbon và tab Home" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

Cập nhật dòng Task 7 của `STATUS.md`, ghi rõ `Group`/`ToolButton`/`Picker` nay nằm ở
`client/src/components/ribbon.tsx` và Excel đã đổi import.
