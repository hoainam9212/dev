### Task 01: Khung dự án, theme, 3 tab rỗng

**Files:**
- Create: `.gitignore` (android build, `local.properties`, `*.keystore`, `keystore.properties`, `functions/node_modules`, `functions/lib`, `rules-test/node_modules`, `.superpowers/`), `README.md` (2–3 dòng)
- Create: `android/settings.gradle.kts`, `android/build.gradle.kts`, `android/gradle/libs.versions.toml`, `android/gradle.properties`, `android/gradlew*` + `gradle/wrapper/*` (sinh bằng `gradle wrapper --gradle-version 8.7` từ `$LOCALAPPDATA/Programs/gradle-8.7`), `android/local.properties` (`sdk.dir`)
- Create: `android/app/build.gradle.kts`, `android/app/src/main/AndroidManifest.xml`
- Create: `app/src/main/java/com/namle/dichochung/MainActivity.kt`, `App.kt` (Application, giữ `AppContainer`), `AppContainer.kt` (rỗng, các task sau thêm vào)
- Create: `ui/theme/Color.kt`, `Type.kt`, `Theme.kt`, `ui/common/GreenHeader.kt`, `ui/MainScaffold.kt`
- Create: `app/src/main/res/font/be_vietnam_pro_{regular,medium,semibold,bold,extrabold}.ttf` (tải từ repo google/fonts, `ofl/bevietnampro/`), `res/values/strings.xml` (`app_name` = "Đi Chợ Chung")
- Test: `app/src/test/java/com/namle/dichochung/ui/MainScaffoldScreenshotTest.kt`

**Interfaces:**
- Produces: `enum class Tab { PICK, LIST, HOME }`; `@Composable fun MainScaffold(selected: Tab, onSelect: (Tab) -> Unit, listBadge: Int, content: @Composable (PaddingValues) -> Unit)` — thanh dưới 3 mục "Chọn đồ" 🧺, "Cần mua" 📋 (huy hiệu đỏ khi `listBadge > 0`), "Nhà mình" 🏠, testTag `tab_pick|tab_list|tab_home`.
- Produces: `@Composable fun GreenHeader(caption: String, title: String, roleLabel: String, roleEmoji: String, extra: @Composable ColumnScope.() -> Unit = {})` — dải gradient + avatar pill, phần nội dung dưới bo góc 22 dp trồi lên (−22 dp) như `thiet-ke-v2.html`.
- Produces: `object AppColors` (các màu ở Global Constraints), `val AppTypography` (Be Vietnam Pro), `@Composable fun DiChoTheme(content)`.
- Produces: `MainActivity` đọc intent extra `"open_tab"` (`"list"` → `Tab.LIST`) — Task 09/10 dùng để mở thẳng Cần mua.

- [ ] **Step 1:** `git init -b master` trong `di-cho-gia-dinh/`, `git config user.email lehoainam.htd@gmail.com`, `git config user.name lehoainam`; tạo `.gitignore`. Commit các file đã có (spec, plan, ảnh mẫu) — soát `.superpowers/` bị bỏ qua.
- [ ] **Step 2:** Dựng Gradle: version catalog với đúng phiên bản ở overview; plugin `com.android.application`, `org.jetbrains.kotlin.android`, `org.jetbrains.kotlin.plugin.compose`, `org.jetbrains.kotlin.plugin.serialization`, `io.github.takahirom.roborazzi`; `com.google.gms.google-services` khai báo `apply false` (bật ở Task 03). `namespace`/`applicationId` = `com.namle.dichochung`, `versionCode 1`, `versionName "0.1.0"`, `testOptions.unitTests.isIncludeAndroidResources = true`.
- [ ] **Step 3:** Viết test ảnh chụp (fail vì chưa có code):
  - `mainScaffold_pickSelected_snapshot` — `MainScaffold(Tab.PICK, listBadge = 0)` với `GreenHeader("Đi Chợ Chung · Thứ Bảy", "Hôm nay mua gì?", "Vợ", "👩")` → `captureRoboImage("snapshots/scaffold_pick.png")`, thiết bị giả `@Config(qualifiers = "w360dp-h780dp-xxhdpi")`.
  - `mainScaffold_listBadge_snapshot` — `Tab.LIST`, `listBadge = 3` → `scaffold_list_badge.png`.
  - `mainScaffold_tabClick_callsOnSelect` — bấm `tab_home` → `onSelect(Tab.HOME)` được gọi.
- [ ] **Step 4:** Chạy `./gradlew.bat :app:testDebugUnitTest` → FAIL (thiếu `MainScaffold`).
- [ ] **Step 5:** Viết theme, `GreenHeader`, `MainScaffold`, `MainActivity` (giữ `Tab` bằng `rememberSaveable`, nội dung mỗi tab tạm là chữ giữa màn).
- [ ] **Step 6:** `./gradlew.bat :app:recordRoborazziDebug` rồi `:app:testDebugUnitTest` → PASS. **Mở 2 ảnh PNG soi:** dấu tiếng Việt ("Chọn đồ", "Cần mua", "Nhà mình", "Hôm nay mua gì?") không lệch, font là Be Vietnam Pro, huy hiệu đỏ đúng chỗ.
- [ ] **Step 7:** `./gradlew.bat :app:assembleDebug` → BUILD SUCCESSFUL, có `app/build/outputs/apk/debug/app-debug.apk`.
- [ ] **Step 8:** Cập nhật `STATUS.md` dòng 01; commit `feat: scaffold Compose app with theme and three tabs`.
