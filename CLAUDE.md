# Nihongo Sensei

Ứng dụng học tiếng Nhật N5–N1 cho người Việt (PWA + APK Android), mascot là mèo Sakura. Giao diện tiếng Việt,
có chuyển VI/EN. Toàn bộ nội dung N5–N1 đã dịch tiếng Việt (bản 1.5.4). Spec và plan: `docs/superpowers/`.

Workspaces: `shared` (SM-2, kana, chấm điểm, furigana), `data` (tải + dựng dữ liệu mở và nội dung tự soạn),
`client` (React + Vite + Tailwind v4, Dexie, Capacitor), `server` (Fastify + SQLite, tài khoản và đồng bộ).

## Repo và nhánh

- Repo GitHub `hoainam9212/dev`, dùng chung với office-neko. Mọi nhánh của dự án này mang tiền tố `nihongo-sensei/`:
  `nihongo-sensei/master`, `nihongo-sensei/feat/...`. Nhánh `main` chỉ có README, đừng làm việc trên đó.
- **Commit bằng email `lehoainam.htd@gmail.com`**, không bao giờ dùng email công ty. Soát `git config user.email` trước commit đầu tiên.
- Commit message tiếng Anh, thân commit giải thích nguyên nhân gốc. Dòng cuối: `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.

## Chạy và kiểm tra

```bash
npm install
npm run data:fetch && npm run data:build   # bắt buộc sau khi clone: data/raw/ và client/public/content/ không có trong git
npm test && npm run typecheck              # cả bốn workspace
npm run dev                                # client, cổng 5173 (server: npm run dev:server, cổng 8787)
```

- Sửa nội dung (kể cả một chữ trong `data/translations/`) thì phải `npm run data:build` trước khi build web/APK.
- Trước mỗi bản phát hành: `node scripts/ui-check.cjs --lang en|vi` (cần dev server :5173) để quét tràn chữ.
- Người dùng thử trên điện thoại: lỗi giao diện thì kiểm ở khổ 390×844 trước.

## Phát hành (chỉ làm trên máy gốc)

Build APK cần Android SDK, JDK 17 và keystore ký — keystore, `keystore.properties` và `release/` bị git bỏ qua
và **chỉ có trên máy gốc**. Phiên trên cloud: sửa code, chạy test, commit, push; **không** tăng version và không
build APK — để phiên trên máy gốc làm. Mỗi lần phát hành tăng `versionCode`/`versionName` trong
`client/android/app/build.gradle`; chứng chỉ ký phải giữ nguyên qua mọi bản.

## Cách làm việc (người dùng đã chốt)

- Một nhánh cho mỗi thay đổi; TDD: test đỏ → code → xanh → kiểm trình duyệt → commit → gộp khi test + typecheck xanh.
- Plan nhiều phiên: đọc `00-overview.md` + `STATUS.md` + đúng một file task; **2–3 task một phiên**, không subagent.
- Sửa file bằng tool Edit/Write, không bằng `sed`/python qua shell.
- Trả lời người dùng bằng tiếng Việt: lỗi gì, đã đổi gì, kiểm bằng cách nào, còn gì chưa kiểm.

## Quy tắc nội dung

- Hán Việt theo nghĩa **chữ Nhật**: không đọc Nôm, không lấy âm của chữ Trung cùng mặt chữ (芸 = NGHỆ). Không
  dùng Unihan `kVietnamese`. Tự động chỉ khi KANJIDIC2 và `hanviet.csv` trùng âm đầu; giữ tối đa 3 âm đã khớp.
- Dịch câu từ tiếng Nhật, không dịch từ bản tiếng Anh. Câu hỏi tiếng Nhật kết thúc bằng 。 thì tiếng Việt dùng "?".
- Dữ liệu mở nào cũng phải soát mẫu với đáp án biết trước rồi mới tin; báo tỉ lệ sai, đừng coi "độ phủ" là chất lượng.
- Luyện viết không tự chuyển chữ; màn chi tiết trên điện thoại là toàn màn hình. Vuốt để chấm thẻ: hỏi trước khi làm.

## Bẫy đã gặp

- `.card`/`.btn-*` không nằm trong layer trong `theme.css` thắng tiện ích Tailwind — dùng hậu tố `!` của v4.
- Lỗi giao diện người dùng báo trên một chữ thường là một trong nhiều: đo trên toàn bộ dữ liệu bằng script.
- Service worker, cache, hoạt ảnh CSS: kiểm trên Chrome thật (headless), pane trình duyệt trong app làm đứng hoạt ảnh.

Mã commit cũ ghi trong plan/STATUS trước 2026-10-01 là mã trước khi viết lại lịch sử (đổi email), không còn tồn tại.
