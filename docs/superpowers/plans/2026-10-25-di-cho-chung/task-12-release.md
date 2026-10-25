### Task 12: APK ký thật, phiên bản, CLAUDE.md

**Files:**
- Create: `android/dichochung-release.keystore` + `android/keystore.properties` (đều git-ignore), `CLAUDE.md`, `release/` (git-ignore)
- Modify: `android/app/build.gradle.kts` (signingConfig release đọc `keystore.properties`, `isMinifyEnabled = false` cho bản đầu, `versionCode 1` / `versionName "1.0.0"`)

**Interfaces:**
- Consumes: toàn bộ app (Task 01–11).
- Produces: `release/DiChoChung-1.0.0.apk`; quy trình phát hành ghi trong `CLAUDE.md`.

- [ ] **Step 0: Icon app hiện đại vẽ bằng Gemini** (user yêu cầu 2026-10-25). Nhờ user mở Chrome profile có **Gemini Pro**. Soạn 3–4 câu lệnh vẽ: icon phẳng hiện đại, nền dải xanh `#2E9E62→#6DBB5A`, hình chính đơn giản đọc được ở 48 dp (giỏ/xe đẩy đi chợ + dấu hiệu "hai người cùng dùng" như hai trái tim/hai bóng chat), không chữ, không viền, nền trơn để tách lớp. Vẽ mỗi câu 2–3 bản, đưa user chọn (nhắc user có thể chọn bản có mèo con dễ thương). Từ bản đã chọn làm **adaptive icon**: lớp trước PNG/vector 108 dp với hình nằm trong vùng an toàn 66 dp, lớp nền màu/dải xanh, thêm `monochrome` cho icon theo chủ đề Android 13+; `mipmap-anydpi-v26/ic_launcher.xml` + `ic_launcher_round.xml`, PNG dự phòng mdpi→xxxhdpi. Tự soi ảnh icon ở cỡ nhỏ (48 dp) và với mặt nạ tròn/vuông bo góc của Samsung trước khi đưa user duyệt lần cuối.
- [ ] **Step 1:** Tạo keystore: `keytool -genkeypair -v -keystore dichochung-release.keystore -alias dichochung -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Di Cho Chung"`; mật khẩu ngẫu nhiên 20 ký tự ghi vào `keystore.properties` và **báo user cất giữ** (mất là không cập nhật đè được app). Đăng ký SHA-1/SHA-256 của khoá release vào Firebase app (`firebase_create_android_sha`) — cần cho một số dịch vụ Google.
- [ ] **Step 2:** Thêm signingConfig; `./gradlew.bat :app:testDebugUnitTest :app:assembleRelease` → BUILD SUCCESSFUL.
- [ ] **Step 3:** Kiểm APK: `$ANDROID_HOME/build-tools/34.0.0/aapt dump badging app-release.apk | grep -E "package|application-label"` → `com.namle.dichochung`, versionName `1.0.0`, nhãn "Đi Chợ Chung"; `apksigner verify --print-certs` → OK, ghi SHA-256 chứng chỉ vào CLAUDE.md (không ghi mật khẩu).
- [ ] **Step 4:** Copy sang `release/DiChoChung-1.0.0.apk`.
- [ ] **Step 5:** Viết `CLAUDE.md`: bố cục repo, lệnh build/test, quy tắc commit + email gmail, quy tắc "mỗi phiên đọc overview + STATUS + 1 task", phát hành = tăng versionCode + ký cùng keystore + SHA-256 phải trùng, phiên cloud không được build APK/tăng version, Firebase project id.
- [ ] **Step 6:** Cập nhật `STATUS.md`; commit `chore: add release signing and project CLAUDE.md`.
