### Task 7: Chương 6 — Sắp xếp, lọc và biểu đồ (3 bài)

Đọc `00-overview.md` trước. **Task nội dung — bắt buộc học thử ít nhất hai bài trên trình duyệt trong chính task này.**

**Files:**
- Tạo: `client/src/content/lessons/excel-data.ts`
- Sửa: `client/src/content/lessons/index.ts`, `client/src/content/tracks.ts`, `client/src/content/glossary.json`, `client/src/App.tsx` (**xoá route tạm `/dev/excel`**), xoá `client/src/pages/DevExcelPage.tsx`

**Interfaces — Consumes:** `excelPractice`; các check `rangeSorted`, `filterActive`, `chart` (Task 3).

Chương `excel.data` gồm ba bài:

| id | Tựa | Điểm chính | Check chính |
|---|---|---|---|
| `excel.sort` | Sắp xếp bảng | Phải chọn CẢ vùng dữ liệu, kẻo tên và lương lệch nhau | `rangeSorted` |
| `excel.filter` | Lọc để xem một nhóm | Lọc chỉ ẩn hàng, không xoá; số hàng nhảy là dấu hiệu đang lọc | `filterActive` |
| `excel.chart` | Biểu đồ cột và biểu đồ tròn | Cột để so sánh, tròn để xem tỉ lệ của một tổng | `chart` |

**Ba điều bắt buộc nói trong bài, vì đó là chỗ người mới hay sai thật:**
- **Sắp xếp mà chỉ chọn một cột thì bảng sẽ lệch**: lương đổi chỗ mà tên đứng yên. Bài `excel.sort` phải có một bước `explain` cảnh báo đúng chuyện này.
- **Lọc không xoá dữ liệu**, chỉ ẩn hàng; nhìn số hàng nhảy (1, 2, 5) là biết đang lọc. Và **`SUM` vẫn cộng cả hàng đang ẩn** — một câu quiz tốt.
- **Chọn biểu đồ theo câu hỏi mình muốn trả lời**: so sánh các mục thì cột, xem tỉ lệ phần trăm của một tổng thì tròn.

Mỗi bài: 2–3 bước `explain`, 1 `quiz`, 1–2 `practice`.

- [ ] **Step 1: Viết bài `excel.sort`, chạy `content.test.ts`**

`npm test -w client -- content`. Lời giải mẫu: chọn vùng `A2:C5` rồi `sortRange` theo cột `C`, `dir: 'desc'`.

- [ ] **Step 2: Viết bài `excel.filter`, chạy lại**

Lời giải mẫu: `enableFilter` rồi `setFilterValues`. Check: `{ kind: 'filterActive', col: 'B', values: ['Kế toán'] }`.

- [ ] **Step 3: Viết bài `excel.chart`, chạy lại**

Lời giải mẫu: `selectRange` rồi `insertChart` với `id: 'chart-0'` — id sinh theo số biểu đồ đã có (xem Task 5), **không dùng thời gian thực**, kẻo `solution` không phát lại được.

- [ ] **Step 4: Cập nhật `tracks.ts`** — thêm chương `{ id: 'excel.data', title: 'Sắp xếp, lọc và biểu đồ', lessonIds: ['excel.sort', 'excel.filter', 'excel.chart'] }`.

- [ ] **Step 5: Xoá route tạm** `/dev/excel` trong `App.tsx` và xoá tệp `client/src/pages/DevExcelPage.tsx`. Kiểm bằng `grep -rn "dev/excel" client/src` — phải không còn gì.

- [ ] **Step 6: Chạy toàn bộ** — `npm test && npm run typecheck`

- [ ] **Step 7: Kiểm tra trên trình duyệt** (bắt buộc)

Track Excel phải là **19 bài / 6 chương**. **Học trọn bài `excel.sort` và `excel.chart`** tới lúc chấm đạt — tự bấm A→Z, tự chèn biểu đồ. **Chụp ảnh bài biểu đồ và tự nhìn** xem hình vẽ có đọc được không. Console sạch.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(content): Excel chapter 6 - sorting, filtering and charts" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
