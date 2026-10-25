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
- Phiên **cloud**: không build APK phát hành, không tăng version, không deploy Firebase, không tạo keystore.
  Nếu môi trường không có JDK 17/Android SDK để chạy Gradle thì vẫn viết test + mã, commit, và ghi rõ trong
  `STATUS.md` là "chưa chạy test — chờ máy gốc chạy".
- Không commit bí mật (keystore, mật khẩu, token, khoá service account).
