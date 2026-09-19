# 🌸 Nihongo Sensei

Ứng dụng web (PWA) học tiếng Nhật toàn diện JLPT N5–N1 cùng mèo Sakura: kana, từ vựng, kanji, ngữ pháp, đọc, nghe, nói, viết và tiếng Nhật business. Giao diện anime pastel, hoạt động offline, có tài khoản để đồng bộ tiến độ.

## Tính năng

| Module | Nội dung |
|---|---|
| Kana | Bảng hiragana/katakana, mẹo nhớ tiếng Việt, hoạt hình thứ tự nét, quiz, luyện viết trên canvas có chấm nét |
| Từ vựng | ~8.000 từ N5–N1, flashcard SRS (SM-2), trắc nghiệm, gõ đáp án, nghe-chọn, câu ví dụ Tatoeba |
| Kanji | 2.211 kanji có cấp JLPT, thứ tự nét KanjiVG, âm on/kun, từ vựng chứa kanji, luyện viết |
| Ngữ pháp | 807 mẫu N5–N1, bài học, flashcard, trắc nghiệm, sắp xếp câu |
| Đọc hiểu | 15 bài đọc tự soạn có furigana, chạm từ để tra, câu hỏi hiểu |
| Nghe | 15 hội thoại, đọc bằng TTS trình duyệt, chỉnh tốc độ, câu hỏi, chép chính tả |
| Nói | Shadowing và đóng vai với nhận dạng giọng nói (Chrome/Edge), chấm điểm phát âm |
| Viết | Luyện viết kana/kanji, đặt câu theo mẫu ngữ pháp |
| Business | Bảng kính ngữ 42 động từ, 7 mẫu email, điện thoại, họp, meishi, phỏng vấn, trắc nghiệm, đóng vai |
| Tiến độ | XP, cấp độ, chuỗi ngày, biểu đồ 7 ngày, lịch ôn, sao lưu/khôi phục |
| Tài khoản | Đăng ký/đăng nhập, đồng bộ tiến độ nhiều thiết bị (server Fastify + SQLite) |

## Chạy phát triển

```bash
npm install
npm run data:fetch      # tải dataset mở (~45 MB) vào data/raw
npm run data:build      # build bundle JSON vào client/public/content
npm run dev             # client http://localhost:5173 (proxy /api → 8787)
npm run dev:server      # server http://localhost:8787
```

## Kiểm thử

```bash
npm test                # shared, data, client, server
npm run typecheck
```

## Build và chạy production

```bash
npm run build           # data:build + client (PWA) + server
JWT_SECRET=doi-khoa-nay npm start   # http://localhost:8787 phục vụ cả app lẫn API
```

Biến môi trường: `PORT` (mặc định 8787), `JWT_SECRET` (bắt buộc đổi khi triển khai), `DB_PATH` (mặc định `server/data.db`), `CLIENT_DIST`.

Docker:

```bash
docker build -t nihongo-sensei .
docker run -p 8787:8787 -e JWT_SECRET=doi-khoa-nay -v nihongo-data:/data nihongo-sensei
```

## Ứng dụng Android (Capacitor)

Bản web được đóng gói thành APK bằng Capacitor; nội dung học nằm sẵn trong app nên chạy offline. Nhận dạng giọng nói dùng dịch vụ của Android (cần Google app), đọc văn bản dùng TTS của hệ thống.

```bash
npm run android:apk     # build web → sync → client/android/app/build/outputs/apk/release/app-release.apk
```

Yêu cầu: JDK 17 và Android SDK (platform 34, build-tools 34). Đặt `JAVA_HOME`, `ANDROID_HOME` hoặc tạo `client/android/local.properties` với `sdk.dir=...`.
Ký bản release: đặt `client/android/keystore.properties` (storeFile, storePassword, keyAlias, keyPassword); file này và keystore không đưa vào git.
Để đồng bộ tiến độ trên điện thoại, vào Cài đặt → nhập địa chỉ máy chủ (ví dụ `https://nihongo.example.com`) rồi đăng nhập.

## Cấu trúc

- `shared/` – kiểu dữ liệu và thuật toán dùng chung (SM-2, kana, chấm điểm, SVG path, furigana)
- `data/` – pipeline tải/build dataset mở và nội dung tự soạn (kana, đọc, nghe, business)
- `client/` – React + Vite + Tailwind PWA (Dexie lưu tiến độ, Web Speech API)
- `server/` – Fastify + SQLite: tài khoản, đồng bộ tiến độ
- `docs/superpowers/` – spec và kế hoạch từng giai đoạn

Nguồn dữ liệu và giấy phép: xem `ATTRIBUTION.md`.
