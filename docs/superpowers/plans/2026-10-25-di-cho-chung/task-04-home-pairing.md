### Task 04: Tạo nhà, ghép đôi bằng mã mời, mời lại khi đổi máy

**Files:**
- Create: `data/Role.kt`, `data/Home.kt`, `data/HomeRepository.kt`, `home/InviteCode.kt`, `home/HomeViewModel.kt`, `home/HomeScreen.kt`, `home/OnboardingScreen.kt`, `home/QrImage.kt`
- Modify: `AppContainer.kt` (thêm `homeRepository`), `MainActivity.kt` (chưa có nhà → `OnboardingScreen`, có rồi → `MainScaffold`)
- Modify: `app/build.gradle.kts` (+ zxing core, play-services-code-scanner)
- Test: `home/InviteCodeTest.kt`, `home/HomeScreenScreenshotTest.kt`, `home/OnboardingScreenshotTest.kt`

**Interfaces:**
- Consumes: `FirebaseModule` (Task 03), `GreenHeader`, `DiChoTheme` (Task 01).
- Produces (sửa 2026-10-26: nhóm gia đình tối đa 6 người, xem LEDGER "Task 4: Ruling: nhóm gia đình"):
  ```kotlin
  enum class Role(val key: String, val vi: String, val emoji: String) { VO, CHONG, CON, ONG, BA, KHAC;
    val defaultName: String /* KHAC → "Người nhà", còn lại = vi */; companion object { fun fromKey(key: String?): Role? } }
  data class Member(val uid: String, val role: Role, val name: String, val fcmToken: String?)
  data class Home(val id: String, val members: List<Member>) {
    fun me(uid: String): Member?; fun others(uid: String): List<Member>; val isFull: Boolean  // MAX_MEMBERS = 6
  }
  data class Invite(val code: String, val expiresAt: Long, val replacing: Member? = null)
  object InviteCode { fun generate(random: Random = Random.Default): String; const val TTL_MS = 15 * 60 * 1000L;
                      fun isExpired(expiresAt: Long, now: Long): Boolean; fun remainingLabel(expiresAt: Long, now: Long): String;
                      fun joinError(exists: Boolean, used: Boolean, expiresAt: Long, now: Long): String?; fun clean(raw: String): String }
  interface HomeRepository {
    val uid: String?; val homeId: StateFlow<String?>; val home: StateFlow<Home?>
    suspend fun ensureSignedIn(): String
    suspend fun createHome(role: Role): String
    suspend fun createInvite(replacing: Member?): Invite   // null = mời thêm người; Member = mời lại người đó (đổi máy)
    suspend fun join(code: String, role: Role): Result<Unit> // người vào tự chọn vai
    suspend fun renameMe(name: String); fun cancelInvite(code: String)
  }
  class FirestoreHomeRepository(...) : HomeRepository
  ```
- `homeId` của máy lưu trong `SharedPreferences("home")` để mở app là vào thẳng; nhà bị xoá/không còn là thành viên → quay về Onboarding.
- `join` lỗi trả thông điệp tiếng Việt: "Mã không đúng", "Mã đã hết hạn, nhờ người kia tạo mã mới", "Mã đã được dùng"; nhà đã đủ 6 người → "Không vào được nhà này, nhờ người kia tạo mã mới".

**Màn hình:**
- Onboarding: chào "Đi Chợ Chung"; thẻ **"Bạn là ai trong nhà?"** — 6 ô vai 3×2 (`role_<key>`), chọn một; thẻ **"Tạo nhà mới"** (nút `create_button`); thẻ **"Nhập mã mời"** (ô 6 số `join_code_field` + `join_button` "Vào nhà" + `scan_button` "Quét QR"). Chưa chọn vai thì các nút tắt và có dòng nhắc.
- Tab Nhà mình (phần thành viên): thẻ "Thành viên (n/6)" liệt kê mọi người (emoji vai, tên, vai, "· máy này"); dòng của mình có ✏️ đổi tên (`rename_button`); dòng người khác có nút phụ **"Đổi máy"** (`reinvite_<uid>`) tạo invite thay thế người đó; dưới cùng nút **"Mời thêm người"** (`invite_button`, ẩn khi đủ 6). Bảng mời: QR (zxing, 220 dp) + mã 6 số cỡ lớn + "Hết hạn sau 14:59" + "Đóng". Các thẻ "Siêu thị đã lưu" và "Quyền & pin" để Task 08, 09.

- [ ] **Step 1: Viết test:** `inviteCode_isSixDigits` (1000 lần, regex `^\d{6}$`); `inviteCode_expiredAfter15Minutes` (`isExpired(t0+TTL, t0+TTL+1) == true`, `t0+TTL-1` false); `role_fromKey_andDefaultName`; `home_others_excludesMe` (+ `isFull` ở 6 người); `onboarding_snapshot` → `onboarding.png`; `homeScreen_inviteShown_snapshot` (1 thành viên, invite "Mời thêm người" đang hiện) → `home_invite.png`; `homeScreen_paired_snapshot` (3 thành viên: Vợ, Chồng, Con) → `home_family.png`.
- [ ] **Step 2:** Chạy test → FAIL.
- [ ] **Step 3:** Viết `Role`, `Home`, `InviteCode`, `FirestoreHomeRepository` (ghi `homes` + `invites` trong một `WriteBatch`; `join` = transaction: đọc invite, kiểm, ghi `members[uid]`, `joinCode`, gỡ thành viên cũ cùng vai khi `replace`, đặt `used = true`).
- [ ] **Step 4:** Viết `HomeViewModel`, `OnboardingScreen`, `HomeScreen`, `QrImage`; quét QR bằng `GmsBarcodeScanning.getClient(context).startScan()` (không cần quyền camera).
- [ ] **Step 5:** Record Roborazzi + chạy test → PASS. **Mở 3 ảnh soi** dấu, mã 6 số không bị cắt, QR đủ rõ.
- [ ] **Step 6:** Thêm vào thẻ "Thành viên" nút ✏️ đổi **tên hiển thị** của chính mình (spec 4.4; mặc định "Vợ"/"Chồng", ≤ 20 ký tự) — ghi `members.{uid}.name`. `./gradlew.bat :app:assembleDebug` → OK. Ghép đôi với Firebase thật **không kiểm được ở máy dev** (không có máy ảo); ghi vào STATUS "ghép đôi thật: kiểm ở Task 13 Step 2" — luật đã được Task 03 test trên emulator.
- [ ] **Step 7:** Cập nhật `STATUS.md`; commit `feat: add home creation and invite-code pairing`.
