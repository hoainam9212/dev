### Task 02: Mô hình món, kho mẫu, tìm kiếm dễ tính

**Files:**
- Create: `catalog/Category.kt`, `catalog/Item.kt`, `catalog/TextNorm.kt`, `catalog/ItemSearch.kt`, `catalog/BundledCatalog.kt` (trong `app/src/main/java/com/namle/dichochung/`)
- Create: `app/src/main/assets/catalog/items.json` — **kho mẫu 20 món** (Task 11 thay bằng ~130 món): trứng gà, sữa tươi, cá hồi, thịt bò, thịt heo, cà chua, rau muống, rau cải, hành lá, tỏi, khoai lang, khoai tây, cà rốt, đậu phụ, nước mắm, dầu ăn, gạo, mì gói, bánh mì, chuối.
- Test: `app/src/test/java/com/namle/dichochung/catalog/TextNormTest.kt`, `ItemSearchTest.kt`, `BundledCatalogTest.kt`

**Interfaces:**
- Produces:
  ```kotlin
  enum class Category(val key: String, val vi: String, val emoji: String) {
    RAU_CU("rau_cu","Rau củ","🥬"), THIT_CA("thit_ca","Thịt cá","🥩"), TRUNG_SUA("trung_sua","Trứng sữa","🥚"),
    GIA_VI("gia_vi","Gia vị","🧂"), DO_KHO("do_kho","Đồ khô","🍚"), DO_UONG("do_uong","Đồ uống","🧃"), KHAC("khac","Khác","🛍️") }
  @Serializable data class Item(
    val id: String, val name: String, val aliases: List<String> = emptyList(), val nameJa: String? = null,
    val category: Category, val unit: String, val defaultQty: Int = 1, val step: Int = 1,
    val imageAsset: String? = null, val imageUrl: String? = null, val sendCount: Int = 0, val deleted: Boolean = false)
  object TextNorm { fun fold(s: String): String; fun normalizeName(s: String): String }
  data class SearchResult(val matches: List<Item>, val suggestions: List<Item>)
  class ItemSearch(items: List<Item>) { fun search(query: String, limit: Int = 20): SearchResult; fun findDuplicate(name: String): Item? }
  object BundledCatalog { fun load(context: Context): List<Item> }  // đọc assets/catalog/items.json
  ```
- Quy tắc `fold`: NFKC → chữ thường → bỏ dấu tiếng Việt (NFD rồi xoá dấu kết hợp, `đ→d`) → katakana→hiragana → gộp khoảng trắng. `normalizeName`: trim, gộp khoảng trắng, viết hoa chữ cái đầu, giữ nguyên dấu.
- Quy tắc `search`: so `fold(query)` với `fold` của `name`, mọi `aliases`, `nameJa`. `matches` = chứa nguyên chuỗi (ưu tiên khớp đầu từ); `suggestions` = không nằm trong matches nhưng khoảng cách Levenshtein tới một từ/cụm ≤ 1 (khi query ≤ 4 ký tự) hoặc ≤ 2 (dài hơn). Món `deleted` bị loại. Query rỗng → `matches` = tất cả, sắp theo `sendCount` giảm dần rồi theo tên.
- `findDuplicate(name)`: món có `fold(name)` bằng hoặc Levenshtein ≤ 1 với `name`/alias của nó; null nếu không có.
- Mỗi món trong `items.json` có `id` dạng slug không dấu (`trung_ga`), `imageAsset` để null ở task này.

- [ ] **Step 1: Viết test (mỗi dòng một test):**
  - `fold_removesVietnameseDiacritics` — `"Trứng Gà"` → `"trung ga"`; `"Đậu phụ"` → `"dau phu"`.
  - `fold_katakanaAndHalfWidthToHiragana` — `"トウフ"`, `"ﾄｳﾌ"` → `"とうふ"`.
  - `fold_collapsesSpaces` — `"  khoai   lang "` → `"khoai lang"`.
  - `normalizeName_trimsAndCapitalizes` — `"  khoai   lang "` → `"Khoai lang"`.
  - `search_withoutAccents_findsItem` — `"khoai lang"`, `"khoai lag"` → Khoai lang trong `matches` hoặc `suggestions`.
  - `search_typo_givesSuggestion` — `"trưng ga"` → Trứng gà; `"ca chuaa"` → Cà chua.
  - `search_alias_findsItem` — `"thịt lợn"` → Thịt heo; `"tofu"`, `"豆腐"`, `"とうふ"` → Đậu phụ.
  - `search_unrelated_returnsEmpty` — `"xe máy"` → cả hai danh sách rỗng.
  - `search_emptyQuery_sortsBySendCount` — món có `sendCount` cao đứng đầu.
  - `search_excludesDeleted`.
  - `findDuplicate_detectsNearName` — `"khoai lang"` khi kho có "Khoai lang" → trả món đó; `"bơ"` khi không có → null.
  - `bundledCatalog_parsesAllItems` (Robolectric) — 20 món, id không trùng, mọi món có `unit` và `category`.
- [ ] **Step 2:** `./gradlew.bat :app:testDebugUnitTest --tests "*catalog*"` → FAIL.
- [ ] **Step 3:** Viết `Category`, `Item`, `TextNorm` (dùng `java.text.Normalizer`).
- [ ] **Step 4:** Viết `ItemSearch` (Levenshtein tự viết, không thêm thư viện) và `BundledCatalog`; tạo `items.json` 20 món (aliases thực tế: thịt heo↔thịt lợn, đậu phụ↔đậu hũ/tofu/豆腐/とうふ, trứng gà↔trứng/卵/たまご, hành lá↔ねぎ…; đơn vị + bước: thịt/cá `g`, mặc định 300, bước 100; trứng `quả` 10/1; sữa `hộp` 1/1; rau `bó` 1/1).
- [ ] **Step 5:** Chạy lại → PASS.
- [ ] **Step 6:** Cập nhật `STATUS.md`; commit `feat: add item catalog model and forgiving search`.
