### Task 2: AutoFilter (`table.ts`)

Đọc `00-overview.md` trước. Task 1 đã tạo `table.ts` và nối `reduceTable` vào `reduceExcel`.

**Files:** sửa `shared/src/sims/excel/table.ts`, `state.ts` (thêm nhánh action), `table.test.ts` (thêm `describe` mới, giữ test cũ).

**Produces** — thêm vào `ExcelAction`:

```ts
  | { type: 'enableFilter'; range: string }
  | { type: 'disableFilter' }
  | { type: 'setFilterValues'; col: string; values: string[] }   // [] = bỏ lọc cột đó
```

và trong `table.ts`:

```ts
export function filterOptions(s: WorkbookState, col: string): string[];      // giá trị để dựng menu
export function hiddenRows(s: WorkbookState): ReadonlySet<number>;           // hàng bị ẩn, đếm từ 0
```

Trường đã có sẵn trong `Sheet`: `filter?: { range: Range; conditions: Record<number, string[]> } | null`; khoá của `conditions` là **chỉ số cột đếm từ 0**.

**Quyết định thiết kế:**
- **Lọc chỉ ẩn hàng khi vẽ, không xoá dữ liệu.** `SUM` vẫn cộng cả hàng đang ẩn — đúng như Excel với hàm thường, và là một điểm dạy học ở Task 7.
- Hàng tiêu đề (hàng đầu của vùng lọc) **không bao giờ bị ẩn**.
- So sánh giá trị theo chữ hiển thị đã `trim()`, không phân biệt hoa thường.

**Test phải viết** (dùng bảng bốn nhân viên, cột C là phòng ban, hàng 1 tiêu đề):
1. bật AutoFilter thì nhớ vùng, chưa ẩn hàng nào
2. `filterOptions('C')` liệt kê giá trị không trùng lặp, đúng thứ tự xuất hiện
3. chọn một giá trị thì các hàng khác bị ẩn, tiêu đề vẫn hiện
4. lọc KHÔNG xoá dữ liệu, và `SUM` vẫn cộng cả hàng đang ẩn
5. lọc hai cột thì hàng phải thoả **cả hai**
6. `values: []` là bỏ lọc cột đó
7. `disableFilter` thì mọi hàng hiện lại và `filter` về `null`
8. chưa bật lọc thì `hiddenRows` rỗng và `filterOptions` rỗng
9. bật lọc là một bước hoàn tác

- [ ] **Step 1: Viết 9 test trên, chạy xác nhận FAIL** — `npm test -w shared -- table`
- [ ] **Step 2: Cài ba action, chạy xác nhận PASS** — `npm test -w shared && npm run typecheck`
- [ ] **Step 3: Commit**

```bash
git add shared/src/sims/excel docs/superpowers/plans/2026-09-22-phase4b-excel/STATUS.md
git commit -m "feat(excel): AutoFilter that hides rows without deleting data" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
