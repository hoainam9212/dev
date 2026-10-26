### Task 05: Tab Chọn đồ — lưới món, − / +, Hay mua, Gửi

**Files:**
- Create: `data/ListEntry.kt`, `data/ListLogic.kt`, `data/CatalogRepository.kt`, `data/ListRepository.kt`
- Create: `pick/PickViewModel.kt`, `pick/PickScreen.kt`, `pick/ItemCard.kt`, `pick/SendBar.kt`, `ui/common/ItemImage.kt`
- Modify: `AppContainer.kt`, `MainActivity.kt` (tab PICK → `PickScreen`)
- Test: `data/ListLogicTest.kt`, `pick/PickSelectionTest.kt`, `pick/PickScreenScreenshotTest.kt`

**Interfaces:**
- Consumes: `Item`, `Category`, `ItemSearch`, `BundledCatalog` (Task 02); `HomeRepository`, `Role` (Task 04); `GreenHeader`, `AppColors` (Task 01).
- Produces:
  ```kotlin
  enum class EntryState { NEED, PICKED, OUT_OF_STOCK }
  data class ListEntry(val id: String, val itemId: String, val qty: Int, val unit: String, val note: String = "",
    val addedBy: String, val addedAt: Long, val state: EntryState = EntryState.NEED,
    val outOfStockStore: String? = null, val pickedBy: String? = null, val updatedAt: Long)
  sealed interface EntryWrite { data class Create(val entry: ListEntry) : EntryWrite
                                data class AddQty(val entryId: String, val newQty: Int, val updatedAt: Long) : EntryWrite }
  object ListLogic {
    fun mergeSend(existing: List<ListEntry>, selection: Map<String, Int>, items: Map<String, Item>,
                  by: String, now: Long, newId: () -> String): List<EntryWrite>
    fun needCount(entries: List<ListEntry>): Int
  }
  class CatalogRepository  // gộp BundledCatalog + homes/{id}/items (bản nhà ghi đè bản kho cùng id); val items: StateFlow<List<Item>>
  class ListRepository {   // homes/{id}/list
    val entries: StateFlow<List<ListEntry>>
    suspend fun send(selection: Map<String, Int>)  // mergeSend → batch; tăng items/{id}.sendCount; ghi event (Task 10 dùng)
  }
  data class PickUiState(val query: String, val category: Category?, val items: List<Item>, val selection: Map<String, Int>)
  class PickViewModel { fun tap(itemId: String); fun plus(itemId: String); fun minus(itemId: String); fun send() }
  @Composable fun ItemImage(item: Item, size: Dp)  // imageAsset → asset, imageUrl → Coil, không có → emoji nhóm trên nền pastel
  ```
- Quy tắc `mergeSend` (Review Focus #4): món có dòng `NEED` → `AddQty` cộng dồn; có dòng `OUT_OF_STOCK` → `AddQty`, giữ nhãn; chỉ có dòng `PICKED` hoặc không có → `Create` dòng `NEED` mới.
- Selection: `tap` chưa chọn → `defaultQty`; `plus` += `step`; `minus` −= `step`, ≤ 0 → bỏ khỏi selection. Selection giữ trong ViewModel (SavedStateHandle), không đồng bộ.
- Event gửi: `homes/{id}/events` `{type:"sent", by: uid, itemNames: [tên…], wasEmpty: needCount(existing)==0, createdAt}` — ghi cùng batch.

**Giao diện** (theo `thiet-ke-v2.html` màn trái): `GreenHeader("Đi Chợ Chung · <thứ>", "Hôm nay mua gì?", vai, emoji)`; ô tìm (chỉ hiển thị + lọc ở task này, phần "+ Thêm" ở Task 06); chip "Hay mua" + 7 nhóm; lưới 3 cột `minmax(0,1fr)`; thẻ chọn viền xanh 2 dp + thanh stepper xanh `[−] 10 quả [+]` (chữ 11 sp, không xuống dòng); thẻ chưa chọn ghi "theo <đơn vị>"; `SendBar` nổi trắng: "Đã chọn / **N món**" + nút gradient cam theo `PickLabels.sendButton` ("Gửi cho Chồng 🚀" khi nhà 2 người, "Gửi cho cả nhà 🚀" từ 3 người) (testTag `send_button`), ẩn khi chưa chọn gì. Gửi xong: snackbar `PickLabels.sentMessage` ("Đã gửi N món cho Chồng" / "cho cả nhà").

- [ ] **Step 1: Viết test:** `mergeSend_newItem_createsNeed`; `mergeSend_existingNeed_addsQty`; `mergeSend_outOfStock_addsQtyKeepsLabel`; `mergeSend_onlyPicked_createsNewNeed`; `needCount_countsNeedAndOutOfStock` (OUT_OF_STOCK tính là chưa mua); `selection_tap_setsDefaultQty`; `selection_plusMinus_usesStep` (thịt bò 300 → 400 → 300); `selection_minusToZero_removes`; `pickScreen_snapshot` (4 món chọn như mẫu) → `pick.png`; `pickScreen_noSelection_hidesSendBar_snapshot` → `pick_empty.png`.
- [ ] **Step 2:** Chạy → FAIL.
- [ ] **Step 3:** Viết `ListEntry`, `ListLogic`, `CatalogRepository`, `ListRepository` (Firestore snapshot listener → StateFlow).
- [ ] **Step 4:** Viết `PickViewModel`, `ItemCard`, `SendBar`, `PickScreen`, `ItemImage`.
- [ ] **Step 5:** Record + test → PASS. **Mở ảnh so với `mau-ket-hop.png`:** thẻ không tràn (3 cột ở 360 dp), stepper không mất dấu "+", nút cam đúng chữ.
- [ ] **Step 6:** Cập nhật `STATUS.md`; commit `feat: add pick tab with quantity stepper and send`.
