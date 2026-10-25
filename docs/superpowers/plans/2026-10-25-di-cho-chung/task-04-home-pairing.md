### Task 04: Tạo nhà, ghép đôi bằng mã mời, mời lại khi đổi máy

**Files:**
- Create: `data/Role.kt`, `data/Home.kt`, `data/HomeRepository.kt`, `home/InviteCode.kt`, `home/HomeViewModel.kt`, `home/HomeScreen.kt`, `home/OnboardingScreen.kt`, `home/QrImage.kt`
- Modify: `AppContainer.kt` (thêm `homeRepository`), `MainActivity.kt` (chưa có nhà → `OnboardingScreen`, có rồi → `MainScaffold`)
- Modify: `app/build.gradle.kts` (+ zxing core, play-services-code-scanner)
- Test: `home/InviteCodeTest.kt`, `home/HomeScreenScreenshotTest.kt`, `home/OnboardingScreenshotTest.kt`

**Interfaces:**
- Consumes: `FirebaseModule` (Task 03), `GreenHeader`, `DiChoTheme` (Task 01).
- Produces:
  ```kotlin
  enum class Role(val key: String, val vi: String, val emoji: String) { VO("vo","Vợ","👩"), CHONG("chong","Chồng","👨");
    val other: Role get() = if (this == VO) CHONG else VO }
  data class Member(val uid: String, val role: Role, val name: String, val fcmToken: String?)
  data class Home(val id: String, val members: List<Member>) { fun me(uid: String): Member?; fun partner(uid: String): Member? }
  data class Invite(val code: String, val role: Role, val expiresAt: Long)
  object InviteCode { fun generate(random: Random = Random.Default): String /* 6 chữ số, cho phép số 0 đầu */;
                      const val TTL_MS = 15 * 60 * 1000L; fun isExpired(expiresAt: Long, now: Long): Boolean }
  interface HomeRepository {
    val uid: String?; val home: StateFlow<Home?>
    suspend fun ensureSignedIn(): String
    suspend fun createHome(role: Role): String
    suspend fun createInvite(role: Role, replace: Boolean): Invite   // role = vai của người được mời
    suspend fun join(code: String): Result<Unit>                    // vai lấy từ invite
  }
  class FirestoreHomeRepository(...) : HomeRepository
  ```
- `homeId` của máy lưu trong `SharedPreferences("home")` để mở app là vào thẳng; nhà bị xoá/không còn là thành viên → quay về Onboarding.
- `join` lỗi trả thông điệp tiếng Việt: "Mã không đúng", "Mã đã hết hạn, nhờ người kia tạo mã mới", "Mã đã được dùng".

**Màn hình:**
- Onboarding: chào "Đi Chợ Chung", hai nút lớn **"Tạo nhà mới"** (rồi chọn "Tôi là Vợ" / "Tôi là Chồng") và **"Nhập mã mời"** (ô 6 số + nút "Quét QR").
- Tab Nhà mình (phần ghép đôi): thẻ "Thành viên" liệt kê Vợ/Chồng; nếu thiếu người → nút **"Mời <vai còn thiếu>"** hiện QR (zxing, 220 dp) + mã 6 số cỡ chữ lớn + đếm ngược "Hết hạn sau 14:59"; nếu đủ 2 → nút phụ **"Mời lại <vai người kia> (đổi máy)"** tạo invite `replace = true`. Các thẻ "Siêu thị đã lưu" và "Quyền & pin" để chỗ trống (Task 08, 09).

- [ ] **Step 1: Viết test:** `inviteCode_isSixDigits` (1000 lần, regex `^\d{6}$`); `inviteCode_expiredAfter15Minutes` (`isExpired(t0+TTL, t0+TTL+1) == true`, `t0+TTL-1` false); `role_other_isOpposite`; `home_partner_returnsOtherMember`; `onboarding_snapshot` → `onboarding.png`; `homeScreen_inviteShown_snapshot` (1 thành viên, invite đang hiện) → `home_invite.png`; `homeScreen_paired_snapshot` (2 thành viên) → `home_paired.png`.
- [ ] **Step 2:** Chạy test → FAIL.
- [ ] **Step 3:** Viết `Role`, `Home`, `InviteCode`, `FirestoreHomeRepository` (ghi `homes` + `invites` trong một `WriteBatch`; `join` = transaction: đọc invite, kiểm, ghi `members[uid]`, `joinCode`, gỡ thành viên cũ cùng vai khi `replace`, đặt `used = true`).
- [ ] **Step 4:** Viết `HomeViewModel`, `OnboardingScreen`, `HomeScreen`, `QrImage`; quét QR bằng `GmsBarcodeScanning.getClient(context).startScan()` (không cần quyền camera).
- [ ] **Step 5:** Record Roborazzi + chạy test → PASS. **Mở 3 ảnh soi** dấu, mã 6 số không bị cắt, QR đủ rõ.
- [ ] **Step 6:** Thêm vào thẻ "Thành viên" nút ✏️ đổi **tên hiển thị** của chính mình (spec 4.4; mặc định "Vợ"/"Chồng", ≤ 20 ký tự) — ghi `members.{uid}.name`. `./gradlew.bat :app:assembleDebug` → OK. Ghép đôi với Firebase thật **không kiểm được ở máy dev** (không có máy ảo); ghi vào STATUS "ghép đôi thật: kiểm ở Task 13 Step 2" — luật đã được Task 03 test trên emulator.
- [ ] **Step 7:** Cập nhật `STATUS.md`; commit `feat: add home creation and invite-code pairing`.
