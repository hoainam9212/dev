### Task 12: Thẻ cú pháp hàm và chương 1 (3 bài)

Đọc `00-overview.md` trước. **Task giao diện — bắt buộc kiểm tra trên trình duyệt trong chính task này.**

Thẻ cú pháp là thứ dạy học có giá trị nhất của cả giai đoạn: đang gõ `=VLOOKUP(` thì hiện ngay đối số nào đang gõ, giải nghĩa bằng tiếng Việt.

**Files:**
- Tạo: `client/src/sims/excel/FnTip.tsx`, `client/src/sims/excel/FnTip.test.tsx`, `client/src/content/fnHelp.ts`, `client/src/content/lessons/excel-basics.ts`
- Sửa: `client/src/sims/excel/FormulaBar.tsx` (gắn thẻ), `client/src/content/lessonKit.ts` (thêm `excelPractice`), `client/src/content/tracks.ts` (lộ trình Excel), `client/src/content/lessons/index.ts`, `client/src/content/glossary.json`, `client/src/App.tsx` (**xoá route tạm `/dev/excel`**)

**Interfaces — Produces:**

```ts
// fnHelp.ts — mô tả 25 hàm bằng tiếng Việt
export interface FnHelp { name: string; args: { name: string; desc: string }[]; desc: string; example: string }
export const FN_HELP: Record<string, FnHelp>;
/** Chữ đang gõ -> hàm nào và đang ở đối số thứ mấy; null khi không ở trong lời gọi hàm. */
export function activeFn(text: string): { help: FnHelp; argIndex: number } | null;

// lessonKit.ts
export function excelPractice(o: {
  cells?: Record<string, string>;
  sheets?: string[];
  task: string;
  checks: excelSim.ExcelCheck[];
  spotlight: Spotlight;
  hint: string;
  steps: string[];
  setup?: (s0: excelSim.WorkbookState) => excelSim.ExcelAction[];
  solve: (s0: excelSim.WorkbookState) => excelSim.ExcelAction[];
}): PracticeStep<excelSim.WorkbookState, excelSim.ExcelCheck, excelSim.ExcelAction>;
```

`excelPractice` làm đúng như `wordPractice` đã có: dựng state đầu, chạy `setup`, xoá `past`, rồi lấy `solve(initial)` làm `solution`.

**Chương 1 — Làm quen bảng tính** (track `excel`, chapter `excel.start`):

| id | Tựa | Nội dung |
|---|---|---|
| `excel.intro` | Ô, hàng, cột là gì | Giải thích lưới và địa chỉ ô; practice: bấm đúng ô C3 rồi gõ tên mình vào A1 |
| `excel.enter` | Nhập số, chữ và sửa ô | Gõ vào nhiều ô, sửa một ô, xoá một ô; dạy Enter/Tab/Escape |
| `excel.sheet` | Nhiều sheet trong một tệp | Thêm sheet, đổi tên thành "Bảng lương", chuyển qua lại |

Track Excel trong `tracks.ts`: `id: 'excel', order: 3, title: 'Excel – Bảng tính', emoji: '📊'`, mở khoá sau khi xong track `word`.

- [ ] **Step 1: Viết test FAIL** — `client/src/sims/excel/FnTip.test.tsx`

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { activeFn } from '../../content/fnHelp';
import { FnTip } from './FnTip';

describe('nhận ra hàm đang gõ', () => {
  it('biết đang ở đối số thứ mấy', () => {
    expect(activeFn('=SUM(')!.help.name).toBe('SUM');
    expect(activeFn('=VLOOKUP(A1,')!.argIndex).toBe(1);
    expect(activeFn('=VLOOKUP(A1,D1:E3,2,')!.argIndex).toBe(3);
  });

  it('bỏ qua dấu phẩy nằm trong hàm lồng và trong chuỗi', () => {
    expect(activeFn('=IF(SUM(A1,B1)>5,')!.argIndex).toBe(1);
    expect(activeFn('=IF(A1="a,b",')!.argIndex).toBe(1);
  });

  it('không có hàm nào thì null', () => {
    expect(activeFn('=A1+B1')).toBeNull();
    expect(activeFn('Nam')).toBeNull();
    expect(activeFn('=SUM(A1:A2)')).toBeNull();
  });
});

describe('thẻ cú pháp', () => {
  it('in đậm đúng đối số đang gõ và giải nghĩa tiếng Việt', () => {
    render(<FnTip text="=VLOOKUP(A1," />);
    expect(screen.getByTestId('fn-arg-1')).toHaveClass('font-bold');
    expect(screen.getByTestId('fn-arg-0')).not.toHaveClass('font-bold');
    expect(screen.getByText(/bảng tra/i)).toBeInTheDocument();
  });

  it('không hiện gì khi không gõ hàm', () => {
    const { container } = render(<FnTip text="=A1+1" />);
    expect(container).toBeEmptyDOMElement();
  });
});
```

- [ ] **Step 2: Chạy, xác nhận FAIL** — `npm test -w client -- FnTip`

- [ ] **Step 3: Viết `fnHelp.ts` (đủ 25 hàm) và `FnTip.tsx`, gắn vào `FormulaBar`**

`activeFn` quét ngược từ cuối chuỗi, đếm ngoặc và bỏ qua phần trong nháy kép.

- [ ] **Step 4: Chạy, xác nhận PASS** — `npm test -w client -- FnTip`

- [ ] **Step 5: Viết `excelPractice` và 3 bài chương 1, đăng ký track**

Nhớ: thêm mọi `[[thuật ngữ]]` mới vào `glossary.json` (ít nhất: `ô`, `hàng`, `cột`, `sheet`, `bảng tính`, `Name Box`, `thanh công thức`). Bài viết bằng tiếng Việt, giọng động viên, chỉ dùng `**đậm**`, `[[thuật ngữ]]`, `{{phím}}`.

- [ ] **Step 6: Xoá route tạm `/dev/excel`**, chạy `npm test && npm run typecheck` — `content.test.ts` phải xanh (nó phát lại `solution` của 3 bài mới).

- [ ] **Step 7: Kiểm tra trên trình duyệt** (bắt buộc)

Vào bản đồ, thấy lộ trình Excel với 3 bài. **Học hết bài `excel.intro` và `excel.sheet` từ đầu tới lúc chấm đạt.** Gõ `=VLOOKUP(` trong ô để xem thẻ cú pháp. Console sạch.

- [ ] **Step 8: Commit**

```bash
git add client/src docs/superpowers/plans/2026-09-21-phase4a-excel/STATUS.md
git commit -m "feat(excel): function syntax card, lesson kit and chapter 1" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
