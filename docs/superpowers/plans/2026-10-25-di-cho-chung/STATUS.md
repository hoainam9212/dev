# STATUS — Đi Chợ Chung

Một dòng mỗi task. Cập nhật trong chính commit hoàn thành task: `[x]`, ngày, hash ngắn, ghi chú ≤ 1 dòng.

- [x] 01 scaffold — 2026-10-25, nhánh feat/v1; 3 test xanh, APK debug build được
- [x] 02 catalog-search — 2026-10-25, feat/v1; kho mẫu 20 món, tìm không dấu/sai chính tả/tiếng Nhật, 16 test xanh
- [x] 03 firebase-backend — 2026-10-25, project `di-cho-chung`, Firestore asia-northeast1, luật Firestore đã deploy, 13 test luật xanh, Anonymous Auth bật, Storage (asia-northeast1) + storage.rules đã deploy
- [x] 04 home-pairing — 2026-10-26, nhóm gia đình ≤ 6 người (Vợ/Chồng/Con/Ông/Bà/Khác); CI xanh (Actions run #4, 5230cf2), chủ dự án đã soi 4 ảnh; luật Firestore mới chờ deploy từ máy gốc; ghép đôi thật: kiểm ở Task 13 Step 2
- [x] 05 pick-tab — 2026-10-27 (cloud) xong; CI run #10 xanh, chủ dự án duyệt pick.png (thẻ cao bằng nhau, "1 khay")
- [x] 06 add-edit-item — 2026-10-27 (cloud), b76c5f4; CI run #13 xanh, đã soi add_item/edit_item/search_suggest; upload ảnh thật kiểm ở Task 13
- [x] 07 list-tab — 2026-10-27 (cloud), a718c58; CI run #16 xanh, đã soi list/list_empty/list_edit; nhãn "Hết ở <siêu thị>" chờ CurrentStore (Task 09)
- [x] 08 stores — 2026-10-27 (cloud), e3f10c7; CI run #28 xanh (137/137), đã soi save_store/stores_card; lấy vị trí + Overpass thật kiểm ở Task 13
- [x] 09 geofence — 2026-10-27 (cloud), e3f10c7; CI run #28 xanh, đã soi permissions.png; geofence thật chỉ kiểm được ở Task 13
- [x] 10 push-functions — 2026-10-28, 8696524 (cloud) + máy gốc: onHomeEvent (asia-northeast1) đã deploy, dọn ảnh container > 1 ngày; send-test-event đạt (log "sent" failed:1 + "removed dead tokens"); nhận thông báo trên máy thật kiểm ở Task 13
- [x] 11 catalog-images — 2026-10-28, 132 món (CSV), icon 3D Gemini thay toàn bộ Fluent (tấm 2×2, cắt nền trong suốt, webp 256 px ~1,5 MB); 143 test xanh, đã soi pick/list; ảnh gốc chỉ ở máy gốc
- [x] 12 release — 2026-10-28, APK 1.0.0 ký khoá release (SHA-256 b891ff68…, đã vào Firebase), release/DiChoChung-1.0.0.apk; icon mẫu 20 Gemini (mèo là anh đẩy xe chở dê là em), adaptive + monochrome; 143 test xanh
- [ ] 13 smoke-real-phones — làm cùng user; đang test APK 1.0.0 trên máy thật, feedback xử lý trên feat/v1, xem mục dưới

## Bàn giao cho phiên sau (cập nhật 2026-11-07)

**Đang ở đâu:** chủ dự án đang test APK 1.0.0 và dặn **chưa build vội**: gom thay đổi rồi build một lần. Mọi thứ dưới đây đã có trên `feat/v1` (160 test xanh ở máy gốc) nhưng **chưa vào APK nào, chưa thử trên máy thật**:

- 3471d98: báo "Đang ở siêu thị" sau 3 phút DWELL, chỉ theo dõi khi danh sách còn món (đây mới là sửa chính cho lỗi "đi qua cũng báo").
- 4e95d57: chạm lại thẻ để bỏ chọn, nhóm Hoa quả.
- Geofence 60 m, tìm tên siêu thị qua Overpass + Nominatim, tìm gần đúng siết lại, kho 140 món (chi tiết: Ruling 2026-11-07 trong `LEDGER.md`).

**Phiên cloud làm được:** sửa mã + test (xem CI theo `CLAUDE.md`), sửa alias/tên/đơn vị trong `catalog/items.csv` rồi `cd catalog && npm run build`.

**Phiên cloud không làm được, để cho máy gốc:** vẽ icon món mới (Gemini, `grab.sh`, cần `~/Downloads` + `catalog/sheets`), build/tăng version, deploy function, sửa dữ liệu Firestore.

**Bản build tới (chỉ khi chủ dự án bảo, máy gốc):**

1. Tăng `versionCode` lên 2 và `versionName`, build + kiểm theo mục "Phát hành APK" trong `CLAUDE.md`.
2. Deploy function **cùng lúc** với cài APK (mục "Việc user cần làm" bên dưới).
3. Cài đè trên cả hai máy, **không gỡ app** (gỡ = mất uid ẩn danh, phải mời lại vào nhà).
4. Lúc cài xong, hỏi chủ dự án có xoá 3 món tự thêm nay đã trùng kho không: `u_9b1579ae` (Hẹ), `u_6aa800b8` (Que xiên), `u_7a9eb335` (Chân gà) trong `homes/{id}/items`. Đừng xoá sớm: APK 1.0.0 chưa có các món này trong kho. Chưa có câu trả lời, phải được chủ dự án đồng ý từng lần.

**Chờ chủ dự án quyết:** thêm trái cây (dâu, nho, lê, đào, kiwi, dưa hấu; cần vẽ icon); tên app (đề xuất "Anh Ơi Mua Giùm" / "Chợ Nhà", hiện giữ "Đi Chợ Chung").

**Chưa kiểm chứng:** nguyên nhân "hiện địa chỉ thay tên" là suy đoán từ Overpass lỗi 2026-11-07, chưa tái hiện trên điện thoại. Vòng 60 m có thể hụt báo nếu GPS trong nhà trôi. 3 siêu thị đã lưu không có liên kết OSM, tâm là điểm GPS lúc lưu, có thể nên lưu lại.

**Sau Task 13:** review nhánh, rồi chỉ kết thúc nhánh khi chủ dự án đồng ý.

## Việc user cần làm (gom một chỗ)

- [x] 2026-10-25 user bật Anonymous Auth + gắn Blaze; Claude bật Storage, deploy storage.rules, đặt ngân sách ¥100/tháng (50/90/100%) cho riêng di-cho-chung.

- [x] (Blaze) đã gắn thẻ 2026-10-25, cảnh báo ¥100 đã đặt.
- [x] 2026-10-28 (Task 04) Đã deploy luật nhóm gia đình; rules-test 15/15 xanh (gồm 2 test storage, Java 21).
- [x] 2026-10-28 (Task 10) Trên máy gốc: `cd functions && npm ci && npm run build && firebase deploy --only functions --project di-cho-chung`, rồi `node scripts/send-test-event.mjs test-home-1` (đạt khi in "✔ event đã bị function xoá") và `npm run logs` có dòng "sent".
- [x] 2026-10-28 (Task 12) Chủ dự án chọn icon mẫu 20 (mèo = anh, dê = em).
- [ ] (Task 12) Sao lưu `android/dichochung-release.keystore` + `android/keystore.properties` ra chỗ an toàn (Google Drive cá nhân) — mất là không cập nhật đè được app.
- [x] 2026-10-28 (Task 11) Chủ dự án chọn icon 3D (vẽ lại cả món Fluent cũ cho đồng bộ), gộp 4 món / ảnh, món sai vẽ lại một lượt cuối; danh sách 132 món dùng luôn.
- [ ] (2026-10-28) Lúc cài APK bản sau 1.0.0: deploy lại function **cùng lúc** (`cd functions && npm run build && npm run deploy`) — function mới gửi tin chỉ có data, APK 1.0.0 không hiện được loại tin này. Claude làm trên máy gốc khi build bản mới.
- [ ] (Task 13) Hai máy S22 + S26 Ultra: cho phép cài app ngoài, cài APK, cấp quyền thông báo + vị trí "Luôn cho phép", Pin → Không hạn chế, thêm vào "Ứng dụng không bao giờ ngủ".
- [ ] (Task 13) Ra một siêu thị thật: bấm "Lưu chỗ này là siêu thị", lần sau quay lại xem có thông báo.
