### Task 4: Tab Data — Sort, Filter, và lưới ẩn hàng đã lọc

Đọc `00-overview.md` trước. **Task giao diện — bắt buộc kiểm tra trên trình duyệt trong chính task này, và làm đủ ba điều tự soi ở overview.**

**Files:** tạo `client/src/sims/excel/RibbonData.tsx`, `FilterMenu.tsx`, `RibbonData.test.tsx`; sửa `Ribbon.tsx` (thay `SoonTab` của tab Data), `Grid.tsx` (ẩn hàng), `client/src/content/help-ids.ts`.

**Consumes:** `hiddenRows`, `filterOptions` (Task 2); `Group`, `ToolButton`, `Picker` từ `./RibbonHome` — **dùng lại, đừng viết kiểu nút mới**.

**Produces:**

```tsx
export function RibbonData(props: { state: excelSim.WorkbookState; dispatch: (a: excelSim.ExcelAction) => void }): JSX.Element;
export function FilterMenu(props: { state: excelSim.WorkbookState; col: string; dispatch: (a: excelSim.ExcelAction) => void; onClose: () => void }): JSX.Element;
```

Tab Data có: `Picker` chọn **cột cần sắp** (`aria-label="Cột cần sắp"`), hai nút **A→Z** / **Z→A** sắp vùng đang chọn, nút **Filter** bật/tắt AutoFilter cho vùng đang chọn. Khi lọc đang bật, mỗi cột trong vùng có một nút mũi tên mở `FilterMenu` — hộp tích chọn các giá trị kèm "Chọn tất cả".

Lưới: hàng trong `hiddenRows(state)` **không được dựng ra**; đầu hàng vẫn đánh số thật (1, 2, 5, 6…) như Excel. `Grid` đang dựng cửa sổ 18 hàng quanh ô chọn — khi lọc thì **bỏ qua hàng ẩn rồi lấy tiếp cho đủ cửa sổ**, đừng để lưới trống hoác.

**Test phải viết** (bảng bốn nhân viên, cột C phòng ban):
1. chọn cột B rồi bấm A→Z → `dispatch({ type: 'sortRange', range: <vùng đang chọn>, by: 'B', dir: 'asc' })`
2. Z→A phát `dir: 'desc'`
3. Filter khi chưa bật → `enableFilter` với vùng đang chọn; khi đã bật → `disableFilter`
4. mọi `button` và `combobox` đều có `data-help-id` khai báo trong `HELP_IDS`
5. (qua `ExcelSim`) đang lọc thì hàng không thoả bị ẩn khỏi DOM, hàng thoả vẫn còn, `rowhead-4` vẫn đúng số
6. không lọc thì không ẩn hàng nào

- [ ] **Step 1: Viết 6 test trên, chạy xác nhận FAIL** — `npm test -w client -- RibbonData`
- [ ] **Step 2: Viết `RibbonData.tsx`, `FilterMenu.tsx`, thêm `helpId`, lắp vào `Ribbon.tsx` và `Grid.tsx`**
- [ ] **Step 3: Chạy xác nhận PASS** — `npm test -w client && npm run typecheck`
- [ ] **Step 4: Kiểm tra trên trình duyệt** (bắt buộc)

Chưa có bài nào dùng tab Data, nên thêm route tạm `/dev/excel` (trang `client/src/pages/DevExcelPage.tsx` dựng `ExcelSim` với bảng bốn nhân viên) — **Task 7 phải xoá**, ghi ngay vào `STATUS.md`.

Làm đủ: (a) chọn A2:C4, chọn cột B, A→Z — thứ tự đổi đúng, tên đi theo lương; (b) chọn A1:C4, bấm Filter, mở menu cột Phòng, bỏ tích một giá trị — hàng biến mất, số hàng nhảy; (c) bấm Filter lần nữa — mọi hàng hiện lại; (d) `Ctrl+Z` sau khi sắp. **Chụp một ảnh và tự nhìn** xem tab Data có giống các tab khác không. Console sạch.

- [ ] **Step 5: Commit**

```bash
git add client/src docs/superpowers/plans/2026-09-22-phase4b-excel/STATUS.md
git commit -m "feat(excel): Data tab with sort and AutoFilter" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
