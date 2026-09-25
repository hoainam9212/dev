# Task 3: Excel — Formulas › Function Library, File, View

**Files:**
- Rewrite: `client/src/sims/excel/RibbonFormulas.tsx`
- Modify: `client/src/sims/excel/Ribbon.tsx` (File, View), `client/src/sims/excel/Ribbon.test.tsx`
- Modify: `client/src/content/help-ids.ts` (thêm `excel.fnDate`, `excel.fnMath`, `excel.fnMore`; bỏ `excel.fnCond`, `excel.fnMisc`)

**Interfaces:**
- Consumes: `MenuButton variant="office"` (items `{ value, label, content }`), `FN_HELP` (`client/src/content/fnHelp.ts`),
  action `{ type: 'startEdit', text: '=NAME(' }` như hiện nay.
- Produces: một Group **"Function Library"** gồm bảy `MenuButton` theo thứ tự và nội dung **đúng Excel 365**:

| Nút (chữ hiện) | aria-label | helpId | Các hàm, đúng thứ tự Excel |
|---|---|---|---|
| Σ AutoSum ▾ (chữ "Σ" to, không có icon Fluent) | AutoSum | `excel.fnAuto` | SUM, AVERAGE, COUNT, MAX, MIN |
| Logical ▾ `Lightbulb20Regular` | Logical | `excel.fnLogic` | AND, IF, OR |
| Text ▾ `TextT20Regular` | Text | `excel.fnText` | CONCAT, LEFT, LEN, MID, RIGHT, TRIM, UPPER |
| Date & Time ▾ `Calendar20Regular` | Date & Time | `excel.fnDate` | TODAY |
| Lookup & Reference ▾ `BookSearch20Regular` | Lookup & Reference | `excel.fnLookup` | VLOOKUP |
| Math & Trig ▾ `Calculator20Regular` | Math & Trig | `excel.fnMath` | ABS, ROUND, SUMIF |
| More Functions ▾ `MathFormula20Regular` | More Functions | `excel.fnMore` | AVERAGEIF, COUNTIF (nội dung mục ghi "Statistical › AVERAGEIF") |

Mỗi mục: `label` = `` `${fn} — ${FN_HELP[fn]?.desc ?? ''}` `` (test cũ tìm `/^VLOOKUP/`), `content` = tên hàm chữ
đơn cách. Nút là `large` (icon trên, chữ dưới) như Excel. File: hai nút lớn "Save As" `Save20Regular`
(aria "Lưu tệp", `excel.save`) và "Print" `Print20Regular` (aria "In", `excel.print`) trong Group "File"; dòng
"Đã lưu thành …" giữ nguyên. View giữ câu giải thích hiện có, nằm trong `RibbonPanel`.

- [ ] **Bước 1: Viết test (FAIL)** — thêm vào `excel/Ribbon.test.tsx`; sửa test "đổi tab thì đổi nội dung" để mở menu
  Lookup & Reference trước khi tìm VLOOKUP:

```tsx
const ALL = ['SUM', 'AVERAGE', 'COUNT', 'MAX', 'MIN', 'AND', 'IF', 'OR', 'CONCAT', 'LEFT', 'LEN', 'MID', 'RIGHT', 'TRIM',
  'UPPER', 'TODAY', 'VLOOKUP', 'ABS', 'ROUND', 'SUMIF', 'AVERAGEIF', 'COUNTIF'];
const MENUS = ['AutoSum', 'Logical', 'Text', 'Date & Time', 'Lookup & Reference', 'Math & Trig', 'More Functions'];

it('Formulas là một nhóm Function Library với bảy menu như Excel', () => {
  render(<Ribbon state={state} dispatch={() => {}} />);
  fireEvent.click(screen.getByRole('tab', { name: 'Formulas' }));
  expect([...document.querySelectorAll('[data-variant="office"] > span')].map((e) => e.textContent)).toEqual(['Function Library']);
  const seen: string[] = [];
  for (const m of MENUS) {
    fireEvent.click(screen.getByRole('button', { name: m }));
    seen.push(...within(screen.getByRole('menu')).getAllByRole('button').map((b) => b.textContent!.replace(/^Statistical › /, '')));
    fireEvent.click(screen.getByRole('button', { name: m }));
  }
  expect(seen).toEqual(ALL); // mỗi hàm đúng một chỗ, không sót, không trùng
});

it('SUMIF nằm ở Math & Trig như Excel thật, bấm là điền =SUMIF(', () => {
  const dispatch = vi.fn();
  render(<Ribbon state={state} dispatch={dispatch} />);
  fireEvent.click(screen.getByRole('tab', { name: 'Formulas' }));
  fireEvent.click(screen.getByRole('button', { name: 'Math & Trig' }));
  fireEvent.click(screen.getByRole('button', { name: /^SUMIF/ }));
  expect(dispatch).toHaveBeenCalledWith({ type: 'startEdit', text: '=SUMIF(' });
});
```
Import thêm `within` từ `@testing-library/react`.

- [ ] **Bước 2: Chạy** `npm test -w client -- excel/Ribbon` → FAIL.
- [ ] **Bước 3: Code** theo bảng; File/View như mô tả. PASS.
- [ ] **Bước 4: help-ids + lời bài.** `grep -rn "fnCond\|fnMisc\|Tự động tính\|Có điều kiện" client/src` — mọi chỗ
  đổi sang id mới; label dạng `'AutoSum (Tự động tính)'`, `'Math & Trig (Toán)'`, `'More Functions › Statistical (Thống kê)'`.
  Bài nào nhắc thẻ Formulas thì viết "thẻ Formulas › nhóm Function Library › nút AutoSum ▾ › SUM".
- [ ] **Bước 5:** `npm test && npm run typecheck`.
- [ ] **Bước 6: Trình duyệt:** học `excel.sum` bằng Formulas › AutoSum ▾ › SUM (thẻ cú pháp phải hiện), `excel.if`
  bằng Logical ▾. Mở cả bảy menu, chụp ảnh — không menu nào bị cắt hay tràn ra ngoài màn hình ở 1280 và 375px.
  File: Save As → hộp thoại Lưu.
- [ ] **Bước 7: Commit** `feat(excel): Formulas › Function Library, File theo Excel 365` + dòng STATUS.
