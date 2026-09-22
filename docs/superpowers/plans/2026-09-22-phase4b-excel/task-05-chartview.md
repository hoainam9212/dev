### Task 5: Biểu đồ SVG và tab Insert

Đọc `00-overview.md` trước. **Task giao diện — bắt buộc kiểm tra trên trình duyệt trong chính task này, và làm đủ ba điều tự soi ở overview.**

**Files:** tạo `client/src/sims/excel/ChartView.tsx`, `RibbonInsert.tsx`, `ChartView.test.tsx`; sửa `Ribbon.tsx` (thay `SoonTab` của tab Insert), `ExcelSim.tsx` (vẽ biểu đồ dưới lưới), `client/src/content/help-ids.ts`.

**Consumes:** `chartData`, `chartsOf`, `type Chart` (Task 3); `Group`, `ToolButton`, `Picker` từ `./RibbonHome`.

**Produces:**

```tsx
export function ChartView(props: { state: excelSim.WorkbookState; chart: excelSim.Chart; onRemove: () => void }): JSX.Element;
export function RibbonInsert(props: { state: excelSim.WorkbookState; dispatch: (a: excelSim.ExcelAction) => void }): JSX.Element;
```

**Tự vẽ bằng SVG, không thêm thư viện.** Bốn loại: `column` (cột dọc), `bar` (thanh ngang), `line` (đường gấp khúc + điểm tròn), `pie` (múi bằng `path` với cung `A`). Mỗi biểu đồ có tiêu đề, nhãn trục (hoặc chú giải với `pie`), nút ✕ xoá.

**Quy ước bắt buộc:**
- `max === 0` → vẽ khung rỗng kèm câu "Vùng chưa có số để vẽ"; **không được chia cho 0**.
- `<svg role="img">` kèm `aria-label` mô tả bằng tiếng Việt, ví dụ "Biểu đồ cột: Doanh thu. Tháng 1: 12.000.000; Tháng 2: 15.500.000".
- `data-testid`: `chart-bar-<i>`, `chart-slice-<i>`, `chart-line`, `chart-dot-<i>`.
- Tab Insert: `Picker` **Loại biểu đồ**, input **Tiêu đề biểu đồ**, nút **Chèn biểu đồ** dùng vùng đang chọn. `id` là `chart-<số biểu đồ đã có>` — **không dùng `Date.now()` hay `Math.random()`**, vì `solution` của bài học phải phát lại y hệt.
- Lớp CSS dùng chung (nếu cần) phải ở **cấp đầu** của `@layer components`, và thêm tên lớp vào danh sách `theme.test.ts` kiểm.

**Test phải viết** (bảng ba tháng, doanh thu 12.000.000 / 15.500.000 / 9.800.000):
1. `column`: ba `chart-bar-*`, chiều cao đúng thứ tự lớn nhỏ (tháng 2 > tháng 1 > tháng 3)
2. `pie`: ba `chart-slice-*`
3. `line`: có `chart-line` và ba `chart-dot-*`
4. hiện tiêu đề "Doanh thu" và nhãn "Tháng 2" lấy từ bảng
5. `aria-label` của `role="img"` chứa cả tiêu đề và tên nhãn
6. sổ tính rỗng → hiện "chưa có số", không có `chart-bar-*` nào
7. nút ✕ gọi `onRemove`
8. tab Insert: chọn `pie` + tiêu đề rồi bấm Chèn → `insertChart` với `id: 'chart-0'`, `range` là vùng đang chọn
9. mọi `button`/`combobox` của tab Insert có `data-help-id` khai báo trong `HELP_IDS`

- [ ] **Step 1: Viết 9 test trên, chạy xác nhận FAIL** — `npm test -w client -- ChartView`
- [ ] **Step 2: Viết `ChartView.tsx` và `RibbonInsert.tsx`**
- [ ] **Step 3: Chạy xác nhận PASS** — `npm test -w client && npm run typecheck`
- [ ] **Step 4: Kiểm tra trên trình duyệt** (bắt buộc)

Qua route tạm `/dev/excel` (Task 4 đã thêm). Chèn lần lượt **cả bốn loại** cho vùng A1:B3, **chụp ảnh và tự nhìn**: cột có đúng tỉ lệ cao thấp, múi tròn có kín vòng, đường có đi qua đúng điểm, nhãn có bị chồng chữ. Sửa một ô số rồi xem biểu đồ đổi theo. Bấm ✕ xoá. Console sạch.

- [ ] **Step 5: Commit**

```bash
git add client/src docs/superpowers/plans/2026-09-22-phase4b-excel/STATUS.md
git commit -m "feat(excel): SVG charts and the Insert tab" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
