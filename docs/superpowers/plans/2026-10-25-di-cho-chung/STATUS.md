# STATUS — Đi Chợ Chung

Một dòng mỗi task. Cập nhật trong chính commit hoàn thành task: `[x]`, ngày, hash ngắn, ghi chú ≤ 1 dòng.

- [x] 01 scaffold — 2026-10-25, nhánh feat/v1; 3 test xanh, APK debug build được
- [x] 02 catalog-search — 2026-10-25, feat/v1; kho mẫu 20 món, tìm không dấu/sai chính tả/tiếng Nhật, 16 test xanh
- [x] 03 firebase-backend — 2026-10-25, project `di-cho-chung`, Firestore asia-northeast1, luật Firestore đã deploy, 13 test luật xanh, Anonymous Auth bật, Storage (asia-northeast1) + storage.rules đã deploy
- [ ] 04 home-pairing — 2026-10-25 (cloud) mã xong; **CI xanh** (Actions run #2, commit e9e2019: testDebugUnitTest qua recordRoborazziDebug + assembleDebug); **ảnh chưa soi** — cloud không tải được artifact (blob.core.windows.net bị chặn): user tải artifact `snapshots` run #2, soi onboarding*/home_* rồi đánh [x]; ghép đôi thật: kiểm ở Task 13 Step 2
- [ ] 05 pick-tab
- [ ] 06 add-edit-item
- [ ] 07 list-tab
- [ ] 08 stores
- [ ] 09 geofence
- [ ] 10 push-functions — Blaze + ngân sách ¥100 đã có
- [ ] 11 catalog-images — chờ user duyệt danh sách + 12 ảnh thử
- [ ] 12 release — có thêm Step 0: icon hiện đại vẽ bằng Gemini
- [ ] 13 smoke-real-phones — làm cùng user

## Việc user cần làm (gom một chỗ)

- [x] 2026-10-25 user bật Anonymous Auth + gắn Blaze; Claude bật Storage, deploy storage.rules, đặt ngân sách ¥100/tháng (50/90/100%) cho riêng di-cho-chung.

- [x] (Blaze) đã gắn thẻ 2026-10-25, cảnh báo ¥100 đã đặt.
- [ ] (Task 12) Mở Chrome profile có **Gemini Pro** để vẽ icon app; chọn 1 trong các bản Claude vẽ.
- [ ] (Task 11) Duyệt `catalog/items.csv` (danh sách món); duyệt 12 ảnh thử; mở Chrome profile có **Gemini Pro** khi Claude cần vẽ ảnh.
- [ ] (Task 13) Hai máy S22 + S26 Ultra: cho phép cài app ngoài, cài APK, cấp quyền thông báo + vị trí "Luôn cho phép", Pin → Không hạn chế, thêm vào "Ứng dụng không bao giờ ngủ".
- [ ] (Task 13) Ra một siêu thị thật: bấm "Lưu chỗ này là siêu thị", lần sau quay lại xem có thông báo.
