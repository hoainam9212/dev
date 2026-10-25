### Task 09: Geofence 90 m, thông báo tới siêu thị, màn quyền cho Samsung

**Files:**
- Create: `geo/ArrivalPolicy.kt`, `geo/GeofenceSync.kt`, `geo/GeofenceManager.kt`, `geo/GeofenceReceiver.kt`, `geo/BootReceiver.kt`, `geo/CurrentStore.kt`, `notify/Channels.kt`, `notify/ArrivalNotifier.kt`, `home/PermissionsCard.kt`
- Modify: `AndroidManifest.xml` (ACCESS_BACKGROUND_LOCATION, POST_NOTIFICATIONS, RECEIVE_BOOT_COMPLETED; receivers cho geofence, `BOOT_COMPLETED`, `MY_PACKAGE_REPLACED`), `App.kt` (tạo kênh thông báo, bắt đầu đồng bộ geofence khi có nhà), `list/ListRepository.markOutOfStock` (lấy tên từ `CurrentStore`)
- Test: `geo/ArrivalPolicyTest.kt`, `geo/GeofenceSyncTest.kt`, `home/PermissionsCardScreenshotTest.kt`

**Interfaces:**
- Consumes: `Store`, `StoreRepository.stores`, `Geo.distanceM` (Task 08); `ListRepository.entries`, `ListLogic.needCount` (Task 05); intent extra `open_tab=list` (Task 01).
- Produces:
  ```kotlin
  object ArrivalPolicy {
    const val COOLDOWN_MS = 2 * 60 * 60 * 1000L
    fun nearest(triggered: List<Store>, lat: Double, lng: Double): Store
    fun shouldNotify(storeId: String, now: Long, lastNotified: Map<String, Long>, needCount: Int): Boolean
  }
  data class GeofenceDiff(val add: List<Store>, val removeIds: List<String>)
  object GeofenceSync { fun diff(registeredIds: Set<String>, stores: List<Store>): GeofenceDiff }  // store đổi toạ độ/bán kính → remove + add
  class GeofenceManager(context) { fun sync(stores: List<Store>); fun reRegisterAll() }  // id geofence = storeId; lưu set đã đăng ký + hash toạ độ trong SharedPreferences
  object CurrentStore { val name: String? /* siêu thị đang ở trong vòng, null khi đã ra */ }
  object Channels { const val ARRIVAL = "arrival"; const val PARTNER = "partner" }  // "Tới siêu thị", "Từ người nhà"
  ```
- Geofence: `ENTER` + `EXIT`, bán kính `Store.radiusM` (90), `NEVER_EXPIRE`, `setLoiteringDelay` không dùng, `initialTrigger = INITIAL_TRIGGER_ENTER`.
- `GeofenceReceiver` (ENTER): lấy `nearest` trong các geofence vừa kích; đặt `CurrentStore`; đọc `needCount` từ Firestore cache (`Source.CACHE`, lỗi → `Source.DEFAULT`); nếu `shouldNotify` → thông báo kênh ARRIVAL: tiêu đề "🛒 Đang ở <tên>", nội dung "còn N món cần mua", chạm → `MainActivity` với `open_tab=list`; ghi `lastNotified[storeId] = now`. EXIT: xoá `CurrentStore` nếu trùng.
- `BootReceiver`: BOOT_COMPLETED + MY_PACKAGE_REPLACED → `reRegisterAll()` (Review Focus #5).

**Màn quyền (thẻ "Quyền & pin" ở Nhà mình):** 4 dòng có trạng thái ✅/⚠️ và nút: (1) Thông báo → xin `POST_NOTIFICATIONS`; (2) Vị trí khi dùng app → xin `ACCESS_FINE_LOCATION`; (3) Vị trí "Luôn cho phép" → giải thích 1 câu rồi mở `Settings.ACTION_APPLICATION_DETAILS_SETTINGS` kèm hướng dẫn "Quyền → Vị trí → Luôn cho phép"; (4) Pin Samsung → mở `ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS`/trang chi tiết app, hướng dẫn "Pin → **Không hạn chế**" và "Cài đặt → Chăm sóc pin → Giới hạn sử dụng ở chế độ nền → **Ứng dụng không bao giờ ngủ** → thêm Đi Chợ Chung". Trạng thái (4) đọc bằng `PowerManager.isIgnoringBatteryOptimizations`.

- [ ] **Step 1: Viết test:** `policy_notifies_whenNeedAndNoCooldown`; `policy_silent_whenListEmpty`; `policy_silent_withinTwoHours` (now − last = 2h − 1 ms → false; 2h + 1 ms → true); `policy_otherStoreNotAffectedByCooldown`; `nearest_picksClosest`; `sync_addsNewStores`; `sync_removesDeletedStores`; `sync_movedStore_removeAndAdd`; `permissionsCard_snapshot` (2 ✅, 2 ⚠️) → `permissions.png`.
- [ ] **Step 2:** Chạy → FAIL.
- [ ] **Step 3:** Viết `ArrivalPolicy`, `GeofenceSync`, `CurrentStore`, `Channels`.
- [ ] **Step 4:** Viết `GeofenceManager`, `GeofenceReceiver`, `BootReceiver`, `ArrivalNotifier`; nối `App.kt` nghe `StoreRepository.stores` → `sync`.
- [ ] **Step 5:** Viết `PermissionsCard`, nối vào HomeScreen.
- [ ] **Step 6:** Record + test → PASS; `assembleDebug` → OK. **Mở ảnh soi** hướng dẫn Samsung đọc được, không tràn.
- [ ] **Step 7:** Cập nhật `STATUS.md` (ghi: geofence thật chỉ kiểm được ở Task 13); commit `feat: notify on arrival at saved supermarkets via geofences`.
