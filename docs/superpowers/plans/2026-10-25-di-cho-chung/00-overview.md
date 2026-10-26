# Đi Chợ Chung — Implementation Plan (overview)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Mỗi phiên chỉ đọc 3 file:** file này + `STATUS.md` + đúng một `task-NN-*.md`. Xong task thì cập nhật dòng của task đó trong `STATUS.md` **trong cùng commit**.

**Goal:** App Android "Đi Chợ Chung" cho cả nhà (tối đa 6 người, trước mắt hai vợ chồng): chọn món → gửi sang các máy khác → tick khi nhặt ở siêu thị, báo khi tới siêu thị đã lưu.

**Architecture:** Một app Kotlin + Jetpack Compose (single Activity, 3 tab, ViewModel + StateFlow, DI thủ công qua `AppContainer`). Dữ liệu chung nằm trên Cloud Firestore (cache offline bật sẵn), danh tính bằng Anonymous Auth, ảnh tự chụp ở Firebase Storage. Thông báo giữa hai máy do một Cloud Function (TypeScript) nghe `homes/{homeId}/events` rồi gửi FCM. Geofence + thông báo tới siêu thị chạy hoàn toàn trên máy.

**Tech Stack:** Kotlin 2.0.21, AGP 8.5.2, Gradle 8.7, compileSdk/targetSdk 34, minSdk 29, Compose BOM 2024.09.03 (Material 3), Firebase BoM 33.5.1 (auth, firestore, storage, messaging), play-services-location 21.3.0, play-services-code-scanner 16.1.0, zxing core 3.5.3, Coil 2.7.0, OkHttp 4.12.0, kotlinx-serialization-json 1.7.3, JUnit 4.13.2, Robolectric 4.13, Roborazzi 1.32.2. Functions: Node 20, firebase-functions 6.x, firebase-admin 12.x, vitest. Rules tests: @firebase/rules-unit-testing 3.x + Firestore emulator.

**Spec:** `docs/superpowers/specs/2026-10-25-di-cho-chung-design.md` — mọi quyết định giao diện/hành vi lấy từ đây. Mẫu giao diện tham chiếu: `mau-ket-hop.png` và `.superpowers/brainstorm/577-1792897248/content/thiet-ke-v2.html` (màu, bo góc, cỡ chữ lấy từ CSS của file này).

## Global Constraints

- Repo gốc: `Dev/di-cho-gia-dinh/` (git riêng, nhánh `master`, `user.email` = `lehoainam.htd@gmail.com` — soát trước mỗi commit). Commit tiếng Anh, kết bằng dòng `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. **Không push** khi user chưa bảo (remote sau này: `github` → `hoainam9212/dev`, nhánh `di-cho-gia-dinh/<branch>`).
- Bố cục thư mục: `android/` (Gradle root, module `app`), `functions/` (Cloud Functions), `firestore.rules`, `storage.rules`, `firebase.json`, `.firebaserc`, `rules-test/` (test luật), `catalog/` (nguồn dữ liệu kho món + ảnh gốc).
- Package: `com.namle.dichochung`. Gói con: `catalog`, `data`, `home`, `pick`, `list`, `stores`, `geo`, `notify`, `ui.theme`, `ui.common`.
- Build: Git Bash, trong `android/`: `export JAVA_HOME="$LOCALAPPDATA/Programs/jdk-17.0.20.1+1" ANDROID_HOME="$LOCALAPPDATA/Android/Sdk"; ./gradlew.bat <task>`. Không đổi biến môi trường hệ thống.
- Toàn bộ chữ trên giao diện là **tiếng Việt**, đúng như spec. Font **Be Vietnam Pro** (400/500/600/700/800) đóng gói trong `res/font`, không dùng font hệ thống.
- Màu (từ `thiet-ke-v2.html`): xanh chính `#2E9E62`, xanh dải đầu `#2E9E62→#6DBB5A`, nền `#F6F5F0`, chữ `#1B2420`, chữ phụ `#7A857F`, cam nút gửi `#FF8A3D→#F2683A`, đỏ huy hiệu `#F2545B`, xanh đậm nút hoàn thành `#1F7A4C`. Pastel nhóm: rau `#E7F4EA`, thịt cá `#FCE8EC`, trứng sữa `#E6F0FB`/`#FFF6D9`, củ quả `#FFF0E3`. Bo góc thẻ 18 dp, ô ảnh 16 dp.
- Vai (2026-10-26, nhóm gia đình): `Role.VO` "Vợ", `CHONG` "Chồng", `CON` "Con", `ONG` "Ông", `BA` "Bà", `KHAC` "Khác" (tên mặc định "Người nhà"); vai được trùng. Nút gửi ghi "Gửi cho cả nhà". Thông báo đi tới mọi thành viên trừ người làm, mở đầu bằng tên hiển thị.
- Geofence bán kính **90 m**; không báo lại cùng siêu thị trong **2 giờ**; chỉ báo khi còn món `NEED`.
- Mã mời: **6 chữ số**, hết hạn **15 phút**, dùng **một lần**. Một nhà tối đa **6** thành viên (`Home.MAX_MEMBERS`).
- Firebase project dùng tài khoản **lehoainam.htd@gmail.com** (gcloud ADC đã đăng nhập sẵn tài khoản này). Gói Blaze + cảnh báo ngân sách **¥100**: user tự gắn thẻ (Task 10).
- testTag Compose: `snake_case`, có hậu tố id khi lặp: `tab_pick`, `tab_list`, `tab_home`, `item_card_<itemId>`, `stepper_plus_<itemId>`, `stepper_minus_<itemId>`, `send_button`, `list_row_<entryId>`, `tick_<entryId>`, `finish_button`, `search_field`, `add_item_row`.
- Mỗi task UI phải có **ảnh chụp Roborazzi** của màn đã làm (lưu `android/app/src/test/snapshots/`), và người làm **tự mở ảnh soi** dấu tiếng Việt, chữ tràn, bố cục trước khi đánh dấu xong.

## Review Focus

1. **Mất sóng trong siêu thị rồi có sóng lại** — tick lúc offline phải còn, tự đẩy lên khi có mạng (Task 07 dùng `update()` theo trường, Task 13 thử bật/tắt chế độ máy bay trên máy thật).
2. **Hai người cùng sửa một dòng cùng lúc** (một người tick, người kia sửa ghi chú) — không được ghi đè lẫn nhau: mọi thay đổi dòng là `update` chỉ các trường đổi (Task 07, test `ListUpdates`).
3. **Gõ tìm bằng tiếng Nhật kiểu khác nhau** — hiragana/katakana/nửa độ rộng/romaji-không-dấu đều ra cùng món (Task 02, test `TextNorm`).
4. **Gửi món đang có trong danh sách ở trạng thái khác** — `NEED` cộng dồn; `OUT_OF_STOCK` cộng dồn và giữ nhãn; `PICKED` tạo dòng `NEED` mới (Task 05, test `ListLogic.mergeSend`).
5. **Geofence sau khi khởi động lại máy / cập nhật app / xoá siêu thị** — phải đăng ký lại hoặc gỡ đúng (Task 09, test `GeofenceSync.diff` + receiver BOOT_COMPLETED/MY_PACKAGE_REPLACED).

## Task index

| # | File | Nội dung | Cần user? |
|---|------|----------|-----------|
| 01 | task-01-scaffold.md | Git, Gradle, theme, font, khung 3 tab, Roborazzi | — |
| 02 | task-02-catalog-search.md | Mô hình món, kho mẫu, tìm không dấu/sai chính tả/tên khác | — |
| 03 | task-03-firebase-backend.md | Tạo project, Firestore, Anonymous Auth, luật + test luật | (có thể) bật Anonymous Auth |
| 04 | task-04-home-pairing.md | Tạo nhà, mã mời QR/6 số, ghép đôi, mời lại khi đổi máy | — |
| 05 | task-05-pick-tab.md | Tab Chọn đồ: lưới, − / +, Hay mua, Gửi | — |
| 06 | task-06-add-edit-item.md | Thêm món mới, ảnh camera/thư viện, sửa/xoá món | — |
| 07 | task-07-list-tab.md | Tab Cần mua: nhóm, tick, hết hàng, ghi chú, Hoàn thành | — |
| 08 | task-08-stores.md | Lưu siêu thị (OSM + Geocoder), đổi tên/xoá | — |
| 09 | task-09-geofence.md | Geofence 90 m, thông báo tới nơi, màn quyền Samsung | — |
| 10 | task-10-push-functions.md | FCM + Cloud Function, cảnh báo ngân sách | **Gắn thẻ Blaze** (nên làm ngay sau Task 03) |
| 11 | task-11-catalog-images.md | Danh sách ~130 món + ảnh Gemini | **Duyệt danh sách + 12 ảnh thử; mở Chrome có Gemini Pro** |
| 12 | task-12-release.md | Ký APK, CLAUDE.md, phiên bản | — |
| 13 | task-13-smoke-real-phones.md | Cài 2 máy, thử thật ở nhà + siêu thị | **Cài APK, cấp quyền, ra siêu thị** |

Thứ tự: 01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 → 09 → 10 → 12 → 13. Task 11 chạy được bất cứ lúc nào sau 02 (song song), nhưng phải xong trước 12.
