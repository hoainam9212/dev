### Task 03: Firebase project, Firestore, Anonymous Auth, luật bảo mật

**Files:**
- Create: `firebase.json` (firestore rules+indexes, storage rules, functions source `functions`, emulators firestore:8080 storage:9199), `.firebaserc` (`default: di-cho-chung` hoặc id thực tế nếu bị trùng), `firestore.rules`, `firestore.indexes.json`, `storage.rules`
- Create: `rules-test/package.json`, `rules-test/firestore.rules.test.ts` (vitest + @firebase/rules-unit-testing)
- Create: `android/app/google-services.json` (tải bằng Firebase MCP `firebase_get_sdk_config`); Modify: `android/app/build.gradle.kts` bật plugin google-services + thêm firebase-bom, auth, firestore, storage, messaging
- Create: `app/.../data/FirebaseModule.kt`

**Interfaces:**
- Firestore layout (đúng spec mục 6):
  - `homes/{homeId}`: `members: map<uid, {role: "vo"|"chong", name: string, fcmToken: string?}>`, `createdAt`.
  - `invites/{code}`: `homeId, role, replace: bool, expiresAt: timestamp, used: bool, createdBy: uid`.
  - `homes/{homeId}/items/{itemId}`, `/list/{entryId}`, `/stores/{storeId}`, `/events/{eventId}`.
- Luật (tóm tắt — test bên dưới là định nghĩa chính xác):
  - Người đã đăng nhập (kể cả ẩn danh) được **tạo** `homes/{id}` khi `members` chỉ có đúng uid của mình.
  - Thành viên (`request.auth.uid in resource.data.members`) đọc/ghi nhà và mọi collection con.
  - **Tham gia:** người ngoài được `update` nhà khi ghi thêm `members[uid]` + trường `joinCode`, và `invites/{joinCode}` có `homeId` khớp, `used == false`, `expiresAt > request.time`, `role` khớp vai đang ghi; nếu `replace == false` thì nhà hiện có < 2 thành viên và vai đó chưa ai giữ; nếu `replace == true` thì được gỡ đúng thành viên đang giữ vai đó.
  - `invites/{code}`: thành viên tạo; bất kỳ ai đăng nhập được `get` (mã là bí mật); người tham gia được đặt `used = true`; không ai `list`.
  - Storage: `homes/{homeId}/items/{file}` — chỉ thành viên đọc/ghi (dùng `firestore.get` trong storage rules), ≤ 1 MB, `image/*`.
- Produces: `object FirebaseModule { val auth; val db: FirebaseFirestore; val storage }` — bật cache offline mặc định (`persistentCacheSettings`).

- [ ] **Step 1:** Cài CLI: `npm i -g firebase-tools` (15.x). Soát tài khoản: `gcloud config get-value account` phải là `lehoainam.htd@gmail.com`; nếu `firebase projects:list` báo chưa đăng nhập thì nhờ user chạy `firebase login` (mục "Việc user cần làm").
- [ ] **Step 2:** Tạo project `di-cho-chung` (Firebase MCP `firebase_create_project`, tên hiển thị "Đi Chợ Chung"), tạo Android app `com.namle.dichochung` (`firebase_create_app`), tạo Firestore (Native, vùng `asia-northeast1`): `gcloud firestore databases create --location=asia-northeast1 --project <id>`.
- [ ] **Step 3:** Bật Anonymous Auth qua REST: `PATCH https://identitytoolkit.googleapis.com/admin/v2/projects/<id>/config?updateMask=signIn.anonymous.enabled` body `{"signIn":{"anonymous":{"enabled":true}}}` với token `gcloud auth print-access-token` (header `x-goog-user-project: <id>`). Không được thì ghi vào STATUS "user bật Anonymous trong Console" và đi tiếp.
- [ ] **Step 4: Viết test luật (mỗi dòng một test):** `owner_canCreateHome_withOnlySelf`; `stranger_cannotReadHome`; `member_canWriteList`; `stranger_cannotWriteList`; `join_withValidInvite_succeeds`; `join_withExpiredInvite_fails`; `join_withUsedInvite_fails`; `join_wrongRole_fails`; `join_thirdMember_withoutReplace_fails`; `join_replace_removesOldMemberSameRole`; `invite_listForbidden`; `storage_member_canUpload_under1MB`; `storage_stranger_cannotRead`.
- [ ] **Step 5:** `cd rules-test && npm i && firebase emulators:exec --only firestore,storage "npx vitest run"` → FAIL (luật đang chặn hết).
- [ ] **Step 6:** Viết `firestore.rules`, `storage.rules` cho tới khi PASS. Deploy: `firebase deploy --only firestore:rules,firestore:indexes,storage --project <id>` (Storage có thể đòi Blaze → nếu lỗi thì để deploy storage sang Task 10 và ghi vào STATUS).
- [ ] **Step 7:** Thêm `google-services.json`, bật plugin, viết `FirebaseModule`; `./gradlew.bat :app:assembleDebug` → BUILD SUCCESSFUL.
- [ ] **Step 8:** Cập nhật `STATUS.md` (ghi project id); commit `feat: add Firebase project config and security rules with tests`.
