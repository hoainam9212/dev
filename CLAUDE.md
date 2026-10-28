# Đi Chợ Chung – ghi chú cho Claude

- Trả lời chủ dự án bằng **tiếng Việt**. Commit bằng tiếng Anh, kết thúc bằng dòng
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Email commit **phải** là `lehoainam.htd@gmail.com` (soát `git config user.email` trước khi commit; trên cloud đặt
  `git config user.email lehoainam.htd@gmail.com` và `git config user.name lehoainam` nếu chưa đúng).
- Kế hoạch: `docs/superpowers/plans/2026-10-25-di-cho-chung/`. **Mỗi phiên chỉ đọc 3 file**: `00-overview.md`,
  `STATUS.md`, đúng một `task-NN-*.md`; cộng `LEDGER.md` (sổ tiến độ + các quyết định `Ruling:` đã chốt — đọc trước khi
  làm, ghi thêm dòng của mình vào cuối). Xong task thì cập nhật dòng của task trong `STATUS.md` **trong cùng commit**.
- Spec: `docs/superpowers/specs/2026-10-25-di-cho-chung-design.md`. Làm TDD: viết test, thấy fail, rồi mới viết mã.
- Nhánh làm việc: `feat/v1` (trên GitHub: `di-cho-gia-dinh/feat/v1` trong repo riêng tư `hoainam9212/dev`).
  Không đụng `master`.
- Build/test Android: Gradle trong `android/`, JDK 17, Android SDK 34:
  `./gradlew :app:testDebugUnitTest` (Windows: `./gradlew.bat`). Ảnh chụp Roborazzi lưu ở
  `android/app/src/test/snapshots/` — mở ảnh ra tự soi dấu tiếng Việt, chữ tràn, bố cục.
- Test luật Firebase: `cd rules-test && npm i && npm test` (cần firebase-tools 15 và **Java 21**).
- Firebase project: `di-cho-chung` (gói Blaze, ngân sách ¥100/tháng). `android/app/google-services.json` **không
  commit**; thiếu file thì app vẫn build (plugin google-services chỉ bật khi có file).
- **GitHub Actions** (`.github/workflows/android.yml`) chạy mỗi lần push lên `di-cho-gia-dinh/**`: toàn bộ unit
  test + ghi ảnh Roborazzi (`recordRoborazziDebug`), build APK debug; artifact `test-report`, `snapshots`,
  `dichochung-debug-apk`. `google-services.json` lấy từ secret `GOOGLE_SERVICES_JSON`. Ảnh chụp còn được đẩy lên
  nhánh `ci-snapshots/<nhánh>` (vd. `ci-snapshots/di-cho-gia-dinh/feat/v1`, ghi đè mỗi lần chạy).
- Phiên **cloud**: không build APK phát hành, không tăng version, không deploy Firebase, không tạo keystore.
  Nếu môi trường không chạy được Gradle thì push rồi **xem kết quả GitHub Actions** của commit đó, rồi
  **tự soi ảnh**: `git fetch origin ci-snapshots/<nhánh>` và mở PNG (commit ghi rõ sha nguồn) — không nhờ chủ dự án
  tải artifact; chỉ gửi ảnh cho chủ dự án khi cần họ chọn kiểu dáng. Chỉ báo xong khi lần chạy xanh. Không xem
  được Actions thì ghi trong `STATUS.md` "chưa chạy test — chờ CI/máy gốc". Push bị từ chối vì nhánh có commit mới thì `git pull --rebase` rồi push lại.
- Không commit bí mật (keystore, mật khẩu, token, khoá service account).
- Ảnh món: `catalog/` (CSV + script cắt tấm Gemini 2×2), xem `catalog/PROMPT.md`; sửa danh sách ở `catalog/items.csv`
  rồi `cd catalog && npm run build`. Ảnh gốc `catalog/sheets|raw` chỉ có trên máy gốc.

## Phát hành APK (chỉ máy gốc)

- Khoá: `android/dichochung-release.keystore` + `android/keystore.properties` (git-ignore; chủ dự án giữ bản sao lưu).
  Mất khoá = không cập nhật đè được app đã cài, phải gỡ và cài lại.
- Chứng chỉ: `CN=Di Cho Chung`, SHA-256 `b891ff6821ac907ac8e95a90c1865a17d70e7319d8af4a039184abcee5281e99`
  (SHA-1 `212271413b88fa415433b37592f39aa446c2ad76`, cả hai đã đăng ký trong Firebase app Android).
- Mỗi bản mới: tăng `versionCode` (+1) và `versionName` trong `android/app/build.gradle.kts` →
  `./gradlew.bat :app:testDebugUnitTest :app:assembleRelease` → kiểm `aapt dump badging` (gói, version, nhãn) và
  `apksigner verify --print-certs` (SHA-256 phải trùng dòng trên) → chép sang `release/DiChoChung-<version>.apk`.
- Phiên cloud không build bản phát hành, không tăng version, không tạo keystore.
