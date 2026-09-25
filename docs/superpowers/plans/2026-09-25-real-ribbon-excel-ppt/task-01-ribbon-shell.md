# Task 1: Vỏ ribbon chung, Word chuyển sang dùng

**Files:**
- Modify: `client/src/components/ribbon.tsx` (thêm `RibbonTabs`, `RibbonPanel`, `activeTab`, `Swatched`, `Labeled`, `RIBBON_ACCENT`)
- Create: `client/src/components/ribbon.test.tsx`
- Modify: `client/src/sims/word/Ribbon.tsx` (bỏ thanh thẻ tự viết, `Labeled`, khung `min-h-24`; dùng bản chung)
- Modify: `client/src/sims/word/RibbonHome.tsx` (bỏ `Swatched` tự viết, import bản chung)

**Interfaces — Produces (mọi task sau dùng đúng tên này):**
```ts
export type RibbonApp = 'word' | 'excel' | 'ppt';
export const RIBBON_ACCENT: Record<RibbonApp, string>; // word '#185ABD', excel '#107C41', ppt '#C43E1C'
/** Thanh thẻ kiểu Office: thẻ đang mở gạch chân + chữ màu nhấn; thẻ ngữ cảnh chữ màu nhấn. role="tablist". */
export function RibbonTabs<T extends string>(p: {
  app: RibbonApp; tabs: readonly T[]; contextTabs?: readonly T[]; active: T; onPick: (t: T) => void;
}): JSX.Element;
/** Khung nội dung thẻ, cao tối thiểu 96px (`min-h-24`) để đổi thẻ không giật trang. */
export function RibbonPanel(p: { children: ReactNode }): JSX.Element;
/** Thẻ ngữ cảnh vừa biến mất (xoá ảnh/bảng) thì quay về `fallback`, như Office. */
export function activeTab<T extends string>(picked: T, context: readonly T[], visible: readonly T[], fallback: T): T;
export function Swatched(p: { icon: ReactNode; color: string }): JSX.Element; // chuyển nguyên từ word/RibbonHome
export function Labeled(p: { icon: ReactNode; text: string }): JSX.Element;   // chuyển nguyên từ word/Ribbon
```
Màu nhấn gắn bằng `style` (không phải lớp Tailwind động — Tailwind không sinh lớp từ chuỗi ghép lúc chạy).

- [ ] **Bước 1: Viết test (FAIL)** — `client/src/components/ribbon.test.tsx`

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { activeTab, RibbonPanel, RibbonTabs } from './ribbon';

describe('RibbonTabs', () => {
  it('lists normal then contextual tabs and marks the open one', () => {
    const onPick = vi.fn();
    render(<RibbonTabs app="excel" tabs={['File', 'Home', 'Data'] as const} contextTabs={['Chart Design'] as const} active="Home" onPick={onPick} />);
    expect(screen.getAllByRole('tab').map((t) => t.textContent)).toEqual(['File', 'Home', 'Data', 'Chart Design']);
    expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('aria-selected', 'true');
    fireEvent.click(screen.getByRole('tab', { name: 'Data' }));
    expect(onPick).toHaveBeenCalledWith('Data');
  });

  it('paints the open tab and contextual tabs in the app accent', () => {
    render(<RibbonTabs app="excel" tabs={['Home', 'Data'] as const} contextTabs={['Chart Design'] as const} active="Home" onPick={vi.fn()} />);
    expect(screen.getByRole('tab', { name: 'Home' })).toHaveStyle({ color: 'rgb(16, 124, 65)', borderColor: 'rgb(16, 124, 65)' });
    expect(screen.getByRole('tab', { name: 'Chart Design' })).toHaveStyle({ color: 'rgb(16, 124, 65)' });
    expect(screen.getByRole('tab', { name: 'Data' })).not.toHaveStyle({ color: 'rgb(16, 124, 65)' });
  });

  it('keeps the tab strip from stealing the editor selection', () => {
    render(<RibbonTabs app="word" tabs={['Home'] as const} active="Home" onPick={vi.fn()} />);
    expect(fireEvent.mouseDown(screen.getByRole('tab', { name: 'Home' }))).toBe(false);
  });
});

describe('activeTab', () => {
  it('falls back when the picked contextual tab is gone', () => {
    expect(activeTab('Picture Format', ['Picture Format', 'Table Layout'], [], 'Home')).toBe('Home');
    expect(activeTab('Picture Format', ['Picture Format'], ['Picture Format'], 'Home')).toBe('Picture Format');
    expect(activeTab('Insert', ['Picture Format'], [], 'Home')).toBe('Insert');
  });
});

describe('RibbonPanel', () => {
  it('keeps a fixed minimum height', () => {
    render(<RibbonPanel><span>nội dung</span></RibbonPanel>);
    expect(screen.getByText('nội dung').parentElement).toHaveClass('min-h-24');
  });
});
```

- [ ] **Bước 2: Chạy, xác nhận FAIL** — `npm test -w client -- components/ribbon` → lỗi "RibbonTabs is not exported".

- [ ] **Bước 3: Viết code.** Chép khuôn thanh thẻ đang có ở `word/Ribbon.tsx` (lớp `-mb-px border-b-[3px] px-3 py-1
  text-sm`, `onMouseDown preventDefault`), đổi màu cứng `#185ABD` thành `style={{ color, borderColor }}` lấy từ
  `RIBBON_ACCENT[app]`; thẻ không mở dùng `border-transparent`. `RibbonPanel` = `<div className="flex min-h-24
  flex-col [&>*]:flex-1">`. Chuyển `Swatched`, `Labeled` sang, **xoá bản cũ** trong file Word (không để hai bản).

- [ ] **Bước 4: Word dùng vỏ chung.** Trong `word/Ribbon.tsx`: thay `<div role="tablist">…</div>` bằng
  `<RibbonTabs app="word" tabs={TABS} contextTabs={context} active={tab} onPick={setTab} />`, thay dòng tính `tab`
  bằng `activeTab(picked, CONTEXT_TABS, context, 'Home')`, thay khung `min-h-24` bằng `<RibbonPanel>`.

- [ ] **Bước 5: Chạy toàn bộ** `npm test -w client && npm run typecheck` — test Word cũ phải xanh nguyên, không sửa.

- [ ] **Bước 6: Trình duyệt.** Mở `word.image`, làm tới khi có ảnh: thẻ Picture Format hiện, chữ xanh; mở nó; đo chiều
  cao panel mọi thẻ bằng nhau (JS: `nextElementSibling` của `[role=tablist]`). Ảnh chụp phải **giống hệt** trước.

- [ ] **Bước 7: Commit** `refactor(ribbon): vỏ ribbon chung RibbonTabs/RibbonPanel cho ba app` + dòng STATUS.
