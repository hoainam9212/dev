# Task 8: Danh sách chụp Excel + PowerPoint, công cụ tách ảnh nhiều app

**Files:**
- Create: `docs/real-shots-excel.md`, `docs/real-shots-ppt.md` (khuôn giống `docs/real-shots-word.md`)
- Modify: `client/scripts/real-shots.mjs` (`SHOTS` theo app, `parseArgs`)
- Create: `client/src/content/realShots.test.ts` (+ `client/scripts/real-shots.d.mts` nếu typecheck đòi kiểu)

**Interfaces — Produces:**
```js
export const SHOTS = { word: [...9 tên cũ, không đổi], excel: [...11 tên], ppt: [...5 tên] };
/** argv sau tên script. Không ghi app thì là 'word' (cách gọi cũ vẫn chạy). */
export function parseArgs(argv) // → { app: 'word' | 'excel' | 'ppt', file: string }; sai → throw Error tiếng Việt
```
Cách gọi: `node client/scripts/real-shots.mjs excel "C:/…/excel.xlsx"`. Tên file ra: `SHOTS[app][i] + đuôi`.

**Nội dung `docs/real-shots-excel.md`** (Excel 365 tiếng Anh, cửa sổ phóng to, Win+Shift+S, mỗi ảnh một sheet):

| Sheet | Tên file | Chụp gì | Cách mở | Dùng cho bài |
|---|---|---|---|---|
| 1 | excel-01-window | Cả cửa sổ, sổ trống | Blank workbook, thẻ Home | excel.intro, excel.sheet, excel.equals |
| 2 | excel-02-home | Cả thanh Ribbon thẻ **Home** (Undo → Editing) | Thẻ Home; kéo rộng cửa sổ nếu thiếu nhóm Editing | excel.numfmt, excel.look, excel.width, excel.project |
| 3 | excel-03-fill-menu | Menu **Fill** đang mở | Home › Editing › Fill ▾ | excel.copy, excel.absolute |
| 4 | excel-04-formulas | Cả thanh Ribbon thẻ **Formulas** | Thẻ Formulas | excel.if, excel.countif, excel.sumif, excel.vlookup, excel.text |
| 5 | excel-05-autosum-menu | Menu **AutoSum** đang mở | Formulas › AutoSum ▾ | excel.sum, excel.stats |
| 6 | excel-06-data | Cả thanh Ribbon thẻ **Data** | Thẻ Data | excel.sort, excel.filter |
| 7 | excel-07-sort-dialog | Hộp thoại **Sort** | Gõ vài dòng dữ liệu, chọn vùng, Data › Sort | excel.sort |
| 8 | excel-08-filter-menu | Menu lọc của một cột đang mở | Chọn bảng có tiêu đề, Data › Filter, bấm ▾ ở ô tiêu đề | excel.filter |
| 9 | excel-09-insert | Cả thanh Ribbon thẻ **Insert** | Thẻ Insert | excel.chart |
| 10 | excel-10-column-menu | Menu **Insert Column or Bar Chart** đang mở | Insert › Charts › nút cột ▾ | excel.chart |
| 11 | excel-11-save-as | Màn hình **File › Save As** | File › Save As (hoặc Save a Copy) | excel.project |

Không cần ảnh: `excel.enter` (chỉ gõ trong ô). **Nội dung `docs/real-shots-ppt.md`:**

| Sheet | Tên file | Chụp gì | Cách mở | Dùng cho bài |
|---|---|---|---|---|
| 1 | ppt-01-window | Cả cửa sổ, bài trống | Blank Presentation, thẻ Home | ppt.intro, ppt.title |
| 2 | ppt-02-home | Cả thanh Ribbon thẻ **Home** (Undo → Drawing) | Thẻ Home | ppt.slides, ppt.shape |
| 3 | ppt-03-layout-menu | Menu **Layout** đang mở | Home › Slides › Layout ▾ | ppt.slides |
| 4 | ppt-04-insert | Cả thanh Ribbon thẻ **Insert** | Thẻ Insert | ppt.textbox, ppt.shape, ppt.image |
| 5 | ppt-05-shapes-menu | Menu **Shapes** đang mở | Insert › Illustrations › Shapes ▾ | ppt.shape |

Cả hai file ghi rõ: sau khi tách **bắt buộc** chạy `blur-names.ps1` (tên tài khoản trên thanh tiêu đề, email trên
Save As); sheet trống bị bỏ qua; tên sheet không quan trọng, thứ tự thì có.

- [ ] **Bước 1: Test (FAIL)** — `client/src/content/realShots.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { SHOTS, parseArgs } from '../../scripts/real-shots.mjs';

const ROOT = join(__dirname, '../../..');
const rows = (app: string) =>
  readFileSync(join(ROOT, `docs/real-shots-${app}.md`), 'utf8').split('\n').filter((l) => /^\| \d+ \|/.test(l));

describe('real-shots', () => {
  it('danh sách gửi người dùng và tên file của công cụ khớp nhau từng dòng', () => {
    for (const app of ['excel', 'ppt'] as const) {
      expect(rows(app).map((r) => r.split('|')[2]!.trim())).toEqual(SHOTS[app]);
    }
    expect(SHOTS.word).toHaveLength(9);
  });
  it('đọc tham số: có app hoặc không', () => {
    expect(parseArgs(['excel', 'C:/a.xlsx'])).toEqual({ app: 'excel', file: 'C:/a.xlsx' });
    expect(parseArgs(['C:/a.xlsx'])).toEqual({ app: 'word', file: 'C:/a.xlsx' });
    expect(() => parseArgs(['visio', 'C:/a.xlsx'])).toThrow(/word, excel hoặc ppt/);
    expect(() => parseArgs([])).toThrow();
  });
});
```
(Word đã có `docs/real-shots-word.md` không có cột "Tên file" nên không so; chỉ khoá số lượng 9.)

- [ ] **Bước 2: Chạy** `npm test -w client -- realShots` → FAIL.
- [ ] **Bước 3: Code:** hai file docs; `SHOTS` thành object; `parseArgs`; phần CLI dùng `parseArgs(process.argv.slice(2))`,
  đọc `SHOTS[app]`. Nếu typecheck báo thiếu kiểu cho `.mjs`, thêm `real-shots.d.mts` khai báo đúng hai export trên.
- [ ] **Bước 4:** `npm test && npm run typecheck`.
- [ ] **Bước 5: Thử thật** bằng Python + openpyxl (đã có trên máy) dựng một `.xlsx` 3 sheet có ảnh vào **thư mục
  scratchpad**, gọi `node client/scripts/real-shots.mjs excel "C:/…/scratch/test.xlsx"` với thư mục ra tạm (chép script
  sang scratchpad như lần Word, đường dẫn `C:/…`), so byte ảnh ra với ảnh vào. Không để file thử lọt vào `public/`.
- [ ] **Bước 6: Commit** `chore: danh sách ảnh Excel/PowerPoint cần chụp, công cụ tách ảnh theo app` + STATUS.
- [ ] **Bước 7: Báo người dùng** hai bảng trên (dán thẳng vào chat, một bảng một app), rồi **dừng chờ ảnh**.
