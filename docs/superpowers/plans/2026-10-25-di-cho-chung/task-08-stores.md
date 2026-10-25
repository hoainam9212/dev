### Task 08: Lưu siêu thị (OpenStreetMap + Geocoder), đổi tên, xoá

**Files:**
- Create: `stores/Store.kt`, `stores/Geo.kt`, `stores/OverpassClient.kt`, `stores/OverpassParser.kt`, `stores/StoreRepository.kt`, `stores/SaveStoreSheet.kt`, `stores/StoresCard.kt`, `stores/LocationProvider.kt`
- Create: `app/src/test/resources/overpass_nishikasai.json` — fixture thật: chạy truy vấn ở Step 1 quanh `35.6646,139.8593` bán kính 100 m, lưu nguyên văn.
- Modify: `home/HomeScreen.kt` (thẻ "Siêu thị đã lưu"), `list/ListScreen.kt` (nút nhỏ "📍 Lưu chỗ này là siêu thị" ở cuối danh sách), `AndroidManifest.xml` (INTERNET, ACCESS_FINE_LOCATION, ACCESS_COARSE_LOCATION)
- Test: `stores/OverpassParserTest.kt`, `stores/GeoTest.kt`, `stores/StoresScreenshotTest.kt`

**Interfaces:**
- Consumes: `HomeRepository` (homeId) (Task 04), `FirebaseModule.db` (Task 03).
- Produces:
  ```kotlin
  data class Store(val id: String, val name: String, val lat: Double, val lng: Double, val radiusM: Int = 90, val osmId: String? = null)
  data class StoreCandidate(val name: String, val branch: String?, val lat: Double, val lng: Double, val distanceM: Int, val osmId: String) {
    val label: String  /* "まいばすけっと 西葛西駅前店" hoặc "まいばすけっと" */ }
  object Geo { fun distanceM(lat1: Double, lng1: Double, lat2: Double, lng2: Double): Int /* haversine */ }
  object OverpassParser { fun parse(json: String, fromLat: Double, fromLng: Double): List<StoreCandidate> }
  class OverpassClient(http: OkHttpClient) { suspend fun nearby(lat: Double, lng: Double, radiusM: Int = 100): List<StoreCandidate> }
  class StoreRepository { val stores: StateFlow<List<Store>>; suspend fun add(c: StoreCandidate?, name: String, lat: Double, lng: Double)
                          suspend fun rename(id: String, name: String); suspend fun delete(id: String) }
  class LocationProvider(context) { suspend fun current(): Location? }   // FusedLocationProviderClient.getCurrentLocation(PRIORITY_HIGH_ACCURACY)
  ```
- Truy vấn Overpass (POST `https://overpass-api.de/api/interpreter`, header `User-Agent: DiChoChung/0.1`, timeout 15 s):
  `[out:json][timeout:15];nwr(around:{r},{lat},{lng})["shop"~"^(supermarket|greengrocer|wholesale|convenience)$"];out tags center;`
- `parse`: bỏ phần tử không có `name`; toạ độ = `lat/lon` hoặc `center`; sắp theo khoảng cách tăng dần; gộp trùng `osmId`.
- `StoreRepository.delete` chỉ xoá doc; gỡ geofence do Task 09 lo (nghe `stores`).

**Hành vi:** bấm "Lưu chỗ này là siêu thị" → xin quyền vị trí (lúc dùng) nếu chưa có → lấy vị trí → `SaveStoreSheet`: "Bạn đang ở đâu?" + danh sách radio `label · cách N m` + "✏️ Tự nhập tên khác" (ô chữ). Mạng lỗi / danh sách rỗng → chỉ còn ô tự nhập, điền sẵn `Geocoder.getFromLocation` dòng địa chỉ (bỏ mã bưu điện). Lưu xong snackbar "Đã lưu <tên>". Thẻ "Siêu thị đã lưu" ở Nhà mình: mỗi dòng tên + "cách N m" (nếu có vị trí) + menu ⋮ Đổi tên / Xoá (xác nhận).

- [ ] **Step 1:** Tạo fixture bằng curl (Git Bash) với truy vấn trên, `r=100` → kiểm có ≥ 3 phần tử có `name`.
- [ ] **Step 2: Viết test:** `parse_fixture_returnsNamedSortedByDistance`; `parse_usesCenterForWays`; `parse_skipsUnnamed`; `candidate_label_withAndWithoutBranch`; `geo_distance_knownPair` (ga 西葛西 → イオン葛西店 ≈ 500 m ± 50); `saveStoreSheet_snapshot` (dữ liệu từ fixture) → `save_store.png`; `storesCard_snapshot` (3 siêu thị) → `stores_card.png`.
- [ ] **Step 3:** Chạy → FAIL.
- [ ] **Step 4:** Viết `Store`, `Geo`, `OverpassParser`, `OverpassClient`, `LocationProvider`, `StoreRepository`.
- [ ] **Step 5:** Viết `SaveStoreSheet`, `StoresCard`, nối vào HomeScreen + ListScreen.
- [ ] **Step 6:** Record + test → PASS. **Mở 2 ảnh soi** tên Nhật + chữ Việt hiển thị cùng font không lỗi (Be Vietnam Pro không có kanji → kiểm hệ thống tự fallback, không ra ô vuông).
- [ ] **Step 7:** Cập nhật `STATUS.md`; commit `feat: save supermarkets from OpenStreetMap with rename and delete`.
