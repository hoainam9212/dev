### Task 07: Tab Cần mua — nhóm theo khu, tick, hết hàng, ghi chú, Hoàn thành

**Files:**
- Create: `list/ListSections.kt`, `list/ListUpdates.kt`, `list/ListViewModel.kt`, `list/ListScreen.kt`, `list/EntryRow.kt`, `list/EntryEditSheet.kt`, `list/ProgressRing.kt`
- Modify: `data/ListRepository.kt` (thêm các thao tác dưới), `MainActivity.kt` (tab LIST, huy hiệu = `ListLogic.needCount`)
- Test: `list/ListSectionsTest.kt`, `list/ListUpdatesTest.kt`, `list/ListScreenScreenshotTest.kt`

**Interfaces:**
- Consumes: `ListEntry`, `EntryState`, `ListLogic`, `ListRepository`, `CatalogRepository` (Task 05); `ItemImage` (Task 05); `GreenHeader` (Task 01).
- Produces:
  ```kotlin
  data class Section(val category: Category?, val title: String, val rows: List<ListEntry>)
  object ListSections {
    fun build(entries: List<ListEntry>, items: Map<String, Item>): List<Section>
    fun progress(entries: List<ListEntry>): Pair<Int, Int>          // (picked, total) — total gồm mọi dòng
  }
  object ListUpdates {   // trả map các trường cần update — CHỈ trường đổi (Review Focus #2)
    fun tick(by: String, now: Long): Map<String, Any?>               // state=PICKED, pickedBy, updatedAt
    fun untick(now: Long): Map<String, Any?>                          // state=NEED, pickedBy=null, updatedAt
    fun outOfStock(storeName: String?, now: Long): Map<String, Any?>  // state=OUT_OF_STOCK, outOfStockStore, updatedAt
    fun edit(qty: Int?, note: String?, now: Long): Map<String, Any?>  // chỉ trường khác null
  }
  data class FinishResult(val deleteIds: List<String>, val picked: Int, val total: Int)
  fun ListLogic.finish(entries: List<ListEntry>): FinishResult       // xoá PICKED, giữ NEED + OUT_OF_STOCK
  // ListRepository thêm: tick(id), untick(id), markOutOfStock(id, storeName: String?), edit(id, qty, note), finish()
  ```
- `build`: thứ tự nhóm cố định theo `Category` (RAU_CU, THIT_CA, TRUNG_SUA, GIA_VI, DO_KHO, DO_UONG, KHAC); trong nhóm: NEED (theo `addedAt`) rồi PICKED. Mọi dòng OUT_OF_STOCK gom vào section cuối `category = null`, title **"Hết hàng — tìm chỗ khác"**. Nhóm rỗng không hiện.
- `markOutOfStock` lấy `storeName` từ `CurrentStore.name` (Task 09 cung cấp; task này truyền `null` → nhãn "Hết hàng").
- `finish()` = batch xoá + event `{type:"finished", by, picked, total, createdAt}`.

**Giao diện** (màn phải `thiet-ke-v2.html`): `GreenHeader("<Vai> gửi lúc HH:MM", "Cần mua", …)` với `extra` = `ProgressRing` trắng "2/4" + "Đã nhặt N món · còn M món nữa"; tiêu đề nhóm chữ hoa xám; thẻ trắng bo 18 dp; dòng = ảnh 40 dp, tên (+ ghi chú xám), ô số lượng xanh in đậm, ô tick vuông 28 dp (`tick_<id>`). PICKED: mờ 50 %, gạch ngang, tick xanh. OUT_OF_STOCK: nhãn cam "Hết ở <tên>" / "Hết hàng". **Vuốt trái** (`SwipeToDismissBox`, không xoá dòng) = hết hàng. **Chạm tên** = `EntryEditSheet` (số lượng − / +, ô ghi chú). Nút nổi `finish_button` "Hoàn thành đi chợ 🛒" chỉ hiện khi có ≥ 1 PICKED. Danh sách trống: emoji 🧺 lớn + "Chưa có gì cần mua". Dòng mới thêm từ máy kia: viền nhấp nháy một lần (so `addedAt` > lúc mở màn).

- [ ] **Step 1: Viết test:** `sections_orderByCategory`; `sections_pickedAfterNeedInGroup`; `sections_outOfStockInLastSection`; `progress_countsPickedOverTotal`; `finish_deletesOnlyPicked`; `finish_keepsNeedAndOutOfStock`; `updates_tick_touchesOnlyStateFields` (đúng 3 khoá); `updates_edit_onlyNonNull` (`edit(null,"bó non",t)` → không có khoá `qty`); `updates_outOfStock_nullStore`; `listScreen_snapshot` (như mẫu: 1 PICKED, 1 OUT_OF_STOCK có nhãn "Hết ở AEON", 2 NEED) → `list.png`; `listScreen_empty_snapshot` → `list_empty.png`.
- [ ] **Step 2:** Chạy → FAIL.
- [ ] **Step 3:** Viết `ListSections`, `ListUpdates`, `ListLogic.finish`, các hàm mới trong `ListRepository` (dùng `update(map)`, không `set`).
- [ ] **Step 4:** Viết `ListViewModel`, `ProgressRing`, `EntryRow`, `EntryEditSheet`, `ListScreen`.
- [ ] **Step 5:** Record + test → PASS. **Mở 2 ảnh so với `mau-ket-hop.png`:** số lượng không bị đẩy xuống dòng, nút Hoàn thành không che mất dòng cuối (thêm `contentPadding` dưới ≥ 96 dp).
- [ ] **Step 6:** Cập nhật `STATUS.md`; commit `feat: add shopping list tab with tick, out-of-stock and finish`.
