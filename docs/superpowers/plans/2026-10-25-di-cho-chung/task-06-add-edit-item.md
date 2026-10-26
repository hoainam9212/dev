### Task 06: Thêm món mới, ảnh tự chụp, sửa/xoá món

> Upload ảnh cần Storage, mà Storage cần gói Blaze. Chưa có Blaze thì vẫn làm hết task (test chạy offline), ghi STATUS "upload ảnh chưa thử thật", và `storage.rules` deploy ở Task 10.

**Files:**
- Create: `pick/AddItemSheet.kt`, `pick/EditItemSheet.kt`, `pick/SearchResults.kt`, `catalog/Guess.kt`, `data/PhotoProcessor.kt`, `data/ItemWriter.kt`
- Create: `res/xml/file_paths.xml`; Modify: `AndroidManifest.xml` (FileProvider cho ảnh camera), `PickScreen.kt`, `PickViewModel.kt`
- Test: `catalog/GuessTest.kt`, `data/PhotoProcessorTest.kt`, `pick/AddItemScreenshotTest.kt`

**Interfaces:**
- Consumes: `ItemSearch.search/findDuplicate`, `TextNorm.normalizeName` (Task 02); `CatalogRepository` (Task 05); `FirebaseModule.storage` (Task 03).
- Produces:
  ```kotlin
  object Guess { fun category(name: String, catalog: List<Item>): Category; fun unit(category: Category): Triple<String, Int, Int> /* unit, defaultQty, step */ }
  object PhotoProcessor { fun squareWebp(src: Bitmap, sizePx: Int = 512, quality: Int = 80): ByteArray }
  class ItemWriter { suspend fun upsert(item: Item, photo: ByteArray?): Item   // ảnh → Storage homes/{id}/items/{itemId}.webp → imageUrl
                     suspend fun delete(itemId: String) }                     // đặt deleted = true (món kho gốc) hoặc xoá doc (món tự thêm)
  ```
- `Guess.category`: lấy nhóm của món kho có tên `fold` chung từ đầu dài nhất (ví dụ "rau ngót" → RAU_CU nhờ "rau"); không có → KHAC. `Guess.unit`: THIT_CA → ("khay",1,1) (siêu thị Nhật bán thịt cá theo khay, LEDGER Task 5); RAU_CU → ("bó",1,1); TRUNG_SUA → ("hộp",1,1); GIA_VI/DO_KHO/DO_UONG/KHAC → ("gói",1,1).
- Id món mới: `"u_" + UUID ngắn 8 ký tự`.

**Hành vi** (spec 4.2): gõ vào ô tìm → `SearchResults` hiện `matches`, rồi "Có phải bạn tìm: …" (`suggestions`), cuối cùng dòng `add_item_row` **"+ Thêm "<chữ đã gõ>""**. Chạm → `AddItemSheet`: ảnh (nút 📷 Chụp / 🖼️ Thư viện, mặc định emoji nhóm), tên (đã `normalizeName`), chip nhóm, đơn vị + mặc định + bước (điền theo `Guess`). Bấm **Thêm** → nếu `findDuplicate` có kết quả: hộp thoại "Đã có **X** rồi, dùng món này nhé?" — [Dùng món có sẵn] [Vẫn thêm mới]. Thêm xong: món được chọn luôn với `defaultQty`. Nhấn giữ thẻ ở lưới → `EditItemSheet` (cùng form + nút đỏ "Xoá món", hỏi xác nhận).

- [ ] **Step 1: Viết test:** `guess_category_fromPrefix` ("rau ngót" → RAU_CU, "thịt gà ta" → THIT_CA, "pin AA" → KHAC); `guess_unit_byCategory`; `photo_squareWebp_isSquareAndSmall` (Robolectric, ảnh 1200×800 → giải mã lại 512×512, < 200 KB); `addItemSheet_snapshot` (đang thêm "Khoai mỡ") → `add_item.png`; `searchResults_withSuggestion_snapshot` (gõ "trưng ga") → `search_suggest.png`.
- [ ] **Step 2:** Chạy → FAIL.
- [ ] **Step 3:** Viết `Guess`, `PhotoProcessor` (crop giữa, `Bitmap.CompressFormat.WEBP_LOSSY`).
- [ ] **Step 4:** Viết `ItemWriter`, `SearchResults`, `AddItemSheet`, `EditItemSheet`; camera = `ActivityResultContracts.TakePicture` qua FileProvider, thư viện = `PickVisualMedia`.
- [ ] **Step 5:** Record + test → PASS. **Mở 2 ảnh soi:** dấu, nút không bị cắt, dòng "+ Thêm" nằm cuối.
- [ ] **Step 6:** Cập nhật `STATUS.md`; commit `feat: add new items with photos and edit or delete items`.
