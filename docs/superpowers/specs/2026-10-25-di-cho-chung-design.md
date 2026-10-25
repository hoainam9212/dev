# Đi Chợ Chung — Bản thiết kế

*Ngày 2026-10-25. Viết sau buổi trao đổi với chủ dự án (gọi là "chồng" trong tài liệu, người dùng thật là hai vợ chồng). Chỗ nào ghi **[Claude chọn]** là quyết định của người viết, chủ dự án chưa xét riêng; các chỗ khác là chủ dự án đã chốt.*

## 1. Mục đích và lý do

Hai vợ chồng sống ở 西葛西 (Tokyo), hay đi các siêu thị quanh ga. Hiện tại việc "hôm nay mua gì" truyền miệng hoặc nhắn tin, dễ quên món, mua sai số lượng, phải gọi điện hỏi lại khi đang đứng trong siêu thị.

App Android "Đi Chợ Chung" nối hai điện thoại:

- Ai cũng có thể chọn món cần mua (có ảnh, tên, số lượng) rồi **gửi** sang máy kia.
- Máy kia có ngay danh sách **Cần mua**; đứng trong siêu thị thì tick từng món đã nhặt, máy bên này thấy ngay.
- Tới đúng siêu thị đã lưu thì điện thoại tự báo và chạm vào là mở danh sách.

**Thành công là:** hai vợ chồng dùng app thay cho nhắn tin trong mọi lần đi chợ; người đi chợ không phải gọi về hỏi; không mua thiếu, không mua trùng.

## 2. Mục tiêu, không làm, và điều tối kỵ

**Mục tiêu bản 1**
- Chọn món bằng chạm, chỉnh số lượng bằng − / +, gửi sang máy kia.
- Danh sách Cần mua đồng bộ hai chiều gần như tức thì, tick đã nhặt, đánh dấu hết hàng.
- Báo khi tới siêu thị đã lưu.
- Dùng được khi mất sóng trong siêu thị.
- Giao diện đẹp, hiện đại, thân thiện, "không phèn".

**Không làm ở bản 1** (đã bàn và gác lại)
- Thực đơn / gói nguyên liệu theo món ăn (để bản 2).
- Gợi ý món ăn từ đồ đã mua (bỏ hẳn).
- Tìm ảnh món trên mạng (Google, Pexels, Open Food Facts) (bỏ).
- AI nhận diện món qua ảnh, quét mã vạch.
- Ghi giá tiền, thống kê chi tiêu.
- Nhiều gia đình / nhiều nhóm, đăng nhập Google, đưa lên Play Store.
- Nhớ lâu dài "món nào hay hết ở siêu thị nào".

**Điều tối kỵ** (app chạy được nhưng vẫn coi là hỏng)
- Đang đứng trong siêu thị mà tick không ăn, hoặc mất tick khi mạng chập chờn.
- Hai máy lệch danh sách mà không ai biết.
- Thông báo làm phiền: báo khi danh sách trống, báo mỗi lần đi ngang siêu thị không lưu.
- Giao diện loè loẹt, chữ tiếng Việt lệch dấu.
- Phải gõ email / mật khẩu để bắt đầu dùng.

## 3. Người dùng và thiết bị

- Hai người, hai điện thoại **Samsung Galaxy S22** và **Galaxy S26 Ultra** (One UI, Android 14 trở lên). minSdk 29 **[Claude chọn]**, targetSdk theo SDK cài trên máy dev.
- One UI hay đưa app ít dùng vào "Ứng dụng ngủ / ngủ sâu", làm geofence và thông báo bị trễ hoặc mất. Màn quyền ở tab Nhà mình phải hướng dẫn riêng cho Samsung: Pin → **Không hạn chế**, và thêm app vào **"Ứng dụng không bao giờ ngủ"**; có nút mở thẳng trang cài đặt pin của app.
- Giao diện tiếng Việt. Tên món có thêm tên Nhật để tìm.
- Cài bằng file APK ký sẵn, không qua Play Store.

## 4. Màn hình và hành vi

Ba tab ở thanh dưới: **Chọn đồ**, **Cần mua**, **Nhà mình** **[Claude chọn tab thứ ba]**.

Mẫu giao diện đã chốt: `mau-ket-hop.png` và `.superpowers/brainstorm/*/content/thiet-ke-v2.html` (file HTML là bản tham chiếu kích thước, màu, bo góc).

### 4.1 Tab Chọn đồ

- Đầu màn: dải xanh lá chuyển màu, dòng nhỏ "Đi Chợ Chung · <thứ trong tuần>", tiêu đề "Hôm nay mua gì?", avatar người đang dùng máy (Vợ / Chồng) ở góc phải.
- Ô **Tìm thực phẩm…**, hàng nhóm lướt ngang: **Hay mua** (mặc định), Rau củ, Thịt cá, Trứng sữa, Gia vị, Đồ khô, Đồ uống, Khác **[Claude chọn danh sách nhóm]**.
- Lưới 3 cột thẻ món: ảnh trong ô vuông nền pastel theo nhóm, tên món. Chưa chọn thì dưới tên ghi đơn vị mờ ("theo quả").
- **Chạm thẻ** = chọn với số lượng mặc định của món; thẻ viền xanh, hiện thanh **− [số + đơn vị] +**. Bấm − tới 0 = bỏ chọn.
- Mỗi món có **bước tăng** riêng: đếm được thì 1; tính gam thì 100 g **[Claude chọn]**.
- "Hay mua" sắp theo số lần món đó từng được gửi, nhiều nhất lên đầu.
- **Nhấn giữ thẻ**: sửa món trong kho — tên, ảnh, nhóm, đơn vị, bước tăng, hoặc xoá món. (Chỉ việc này; ghi chú nhập ở tab Cần mua.)
- Thanh nổi trắng ở dưới: "Đã chọn **N món**" + nút cam **"Gửi cho Chồng 🚀"** (hoặc "Gửi cho Vợ" tuỳ máy). Không có món nào chọn thì ẩn thanh.
- **Gửi** = gộp các món đã chọn vào danh sách Cần mua chung (món đã có trong danh sách thì cộng dồn số lượng **[Claude chọn]**), xoá lựa chọn trên máy gửi, đẩy thông báo sang máy kia. "Gửi" là **lối duy nhất** để đưa món vào danh sách **[Claude chọn]**.

### 4.2 Tìm và thêm món mới

- Tìm không phân biệt hoa thường, **không cần dấu** (bỏ dấu tiếng Việt cả hai phía trước khi so), chịu được **sai 1–2 ký tự**, khớp cả **tên gọi khác** (thịt heo = thịt lợn; 豆腐 = とうふ = tofu = đậu phụ).
- Không khớp hẳn: hiện "Có phải bạn tìm: …" với các món gần giống, dòng **"+ Thêm "<chữ đã gõ>""** nằm cuối.
- Thêm món mới: bảng nhỏ với ảnh, nhóm, đơn vị app tự đoán sẵn, người dùng sửa nếu sai.
  - Ảnh: lấy từ kho nếu tên khớp; nếu không thì **chụp bằng camera** hoặc lấy từ thư viện (tự cắt vuông); không có thì dùng **biểu tượng của nhóm**.
- Trước khi lưu, so lại với kho; gần giống thì hỏi "Đã có **X** rồi, dùng món này nhé?" — **[Dùng món có sẵn] [Vẫn thêm mới]**.
- Tên tự chuẩn hoá: bỏ khoảng trắng thừa, viết hoa chữ đầu.
- Món mới (kể cả ảnh) đồng bộ sang máy kia.
- Toàn bộ việc tìm chạy trong máy, không cần mạng.

### 4.3 Tab Cần mua

- Đầu màn: dải xanh, "Vợ gửi lúc HH:MM" (lần gửi gần nhất), tiêu đề "Cần mua", avatar; vòng tiến độ "đã nhặt / tổng" + dòng "Đã nhặt N món · còn M món nữa".
- Danh sách **chia theo nhóm** (= khu trong siêu thị), mỗi dòng: ảnh, tên, ghi chú (nếu có), **số lượng in đậm trong ô xanh**, ô tick vuông to.
- **Tick** = đã nhặt: dòng mờ, gạch ngang, dồn xuống cuối nhóm. Chạm lại để bỏ tick.
- **Chạm vào phần tên của dòng** = bảng nhỏ sửa số lượng và **ghi chú ngắn** (ví dụ "lấy bó non"); ai trong hai người cũng sửa được, kể cả sau khi đã gửi **[Claude chọn]**.
- **Vuốt trái** = **Hết hàng**: gắn nhãn cam "Hết ở <tên siêu thị>" (nếu đang ở trong vòng một siêu thị đã lưu) hoặc "Hết hàng"; dòng dồn xuống cuối danh sách; vẫn tính là chưa mua. Nhặt được thì nhãn tự mất.
- Món vừa được người kia thêm khi mình đang mở danh sách: hiện có hiệu ứng nhẹ (nhấp nháy viền một lần) **[Claude chọn]**.
- Nút **"Hoàn thành đi chợ 🛒"** ở dưới: xoá các món đã nhặt khỏi danh sách, **giữ lại** món chưa nhặt và món hết hàng, báo sang máy kia "Chồng đã đi chợ xong · nhặt N/M món".
- Huy hiệu đỏ trên biểu tượng tab = số món chưa nhặt.
- Danh sách trống: hình minh hoạ nhẹ nhàng + "Chưa có gì cần mua".

### 4.4 Tab Nhà mình

- **Ghép đôi**: máy đầu tiên tạo "nhà", chọn mình là Vợ hay Chồng, bấm "Mời" để hiện **mã QR + mã 6 số**. Máy thứ hai quét / nhập mã, chọn vai còn lại. Không email, không mật khẩu. Một nhà đúng 2 thành viên.
- **Cài lại / đổi máy** **[Claude chọn]**: máy cài lại mất uid ẩn danh. Máy còn lại vào Nhà mình → "Mời lại <Vợ|Chồng>" để tạo mã mời **thay thế**; máy mới nhập mã thì nhận đúng vai đó, uid cũ bị gỡ khỏi `members`. Mã mời hết hạn sau 15 phút, dùng một lần. Dữ liệu nhà (danh sách, siêu thị, món tự thêm) giữ nguyên vì nằm trên Firestore. Cả hai máy cùng mất thì tạo nhà mới (chấp nhận mất dữ liệu — hiếm).
- **Siêu thị đã lưu**: danh sách tên + khoảng cách; đổi tên; xoá.
- **Cài đặt quyền**: trạng thái quyền vị trí "Luôn cho phép", quyền thông báo, tối ưu pin, kèm nút hướng dẫn bật từng cái.
- Tên hiển thị / avatar của mỗi người (mặc định Vợ / Chồng) **[Claude chọn]**.

### 4.5 Lưu siêu thị và báo khi tới nơi

- Nút **"Lưu chỗ này là siêu thị"** (ở tab Nhà mình và tab Cần mua) lấy vị trí hiện tại, tìm siêu thị trong khoảng 100 m trên **OpenStreetMap** (Overpass API, `shop=supermarket|greengrocer|wholesale|convenience`), hiện danh sách tên + chi nhánh + khoảng cách để chọn, cuối cùng có "✏️ Tự nhập tên khác". Không có kết quả thì điền sẵn địa chỉ từ Geocoder của Android.
  - Đã kiểm tra 2026-10-25: quanh ga 西葛西 bán kính 1,5 km có 29 siêu thị + 1 tiệm rau trên OSM, tất cả có tên, khoảng một nửa có tên chi nhánh.
- Siêu thị đã lưu dùng chung cho cả nhà (đồng bộ hai máy).
- Mỗi siêu thị đã lưu là một **geofence** bán kính **90 m** **[Claude chọn, do khu 西葛西 siêu thị rất dày]**. Chỉ siêu thị đã lưu mới có geofence.
- Khi vào vòng **và** danh sách Cần mua còn món chưa nhặt: thông báo "🛒 Đang ở <tên>, còn N món". Chạm → mở tab Cần mua. Danh sách trống thì không báo.
- Không báo lại cùng một siêu thị trong 2 giờ **[Claude chọn]**.
- Hai vòng đè nhau: lấy siêu thị gần nhất.
- Android không cho app tự bật giao diện từ nền; **thông báo + một chạm** là cách đã chốt.

### 4.6 Thông báo giữa hai máy

Cả hai loại dưới đều sinh ra từ cùng một hành động "Gửi"; khác nhau ở trạng thái danh sách lúc gửi **[Claude chọn]**:
- Danh sách **đang trống** (không còn món "need"): "🧺 Vợ vừa gửi 5 món cần mua".
- Danh sách **còn món chưa nhặt**: "Vợ vừa thêm: Hành lá, Tỏi" (tối đa 3 tên, sau đó "+N món").
- Người đi chợ **bấm Hoàn thành**: "Chồng đã đi chợ xong · nhặt 4/5 món".
- Tick từng món **không** đẩy thông báo (chỉ đồng bộ) **[Claude chọn, tránh làm phiền]**.

## 5. Kho món và ảnh

- Kho ban đầu khoảng 120–150 món, **lẫn đồ Việt và đồ Nhật** **[Claude chọn — chủ dự án chưa trả lời]**, mỗi món có: tên Việt chuẩn, tên gọi khác, tên Nhật (kanji/kana), nhóm, đơn vị, số lượng mặc định, bước tăng.
- Ảnh kho: **nhờ Gemini vẽ cùng một phong cách** (món tách nền, ánh sáng mềm, góc nhìn giống nhau), cắt vuông, nén WebP ~256 px, đóng gói sẵn trong APK. Chủ dự án có Gemini Pro; Claude có thể tự điều khiển Gemini qua Chrome để làm.
  - Phong cách ảnh: **ảnh chụp thật, tách nền**, đặt trên ô pastel theo nhóm như `gemini-mau-1.png` / `gemini-mau-2-tu-do.png` (giao diện chốt là bản kết hợp `mau-ket-hop.png`; `gemini-mau-3-cam.jpg` là hướng bị loại).
  - **Duyệt trước khi làm hàng loạt** **[Claude chọn]**: (1) danh sách món dạng bảng (tên Việt / tên Nhật / nhóm / đơn vị) cho chủ dự án duyệt; (2) lô thử 12 ảnh cho chủ dự án duyệt phong cách; chỉ sau đó mới làm phần còn lại. Trong lúc chờ, app dùng biểu tượng nhóm làm ảnh tạm — kho ảnh không chặn các phần khác.
- Ảnh do người dùng chụp: nén ~512 px, lưu lên kho file trên mây để máy kia tải.

## 6. Kỹ thuật

- **Android gốc: Kotlin + Jetpack Compose (Material 3)**, một module app. Lý do: geofence và thông báo chạy nền cần ổn định; bản web/Capacitor kém tin cậy ở phần này. Máy dev đã có JDK 17 + Android SDK 34 (xem memory `android-toolchain`).
- **Đồng bộ: Firebase Cloud Firestore** với bộ nhớ đệm offline sẵn có (tick khi mất sóng tự gửi lại khi có sóng).
- **Danh tính: Firebase Anonymous Auth**; mỗi máy một uid ẩn danh, gắn vào "nhà" khi ghép đôi. Luật bảo mật Firestore: chỉ thành viên của nhà đọc/ghi dữ liệu nhà đó.
- **Ảnh người dùng chụp: Firebase Storage** (cần kiểm tra điều kiện gói miễn phí hiện hành — xem mục 8).
- **Thông báo giữa hai máy: Firebase Cloud Messaging**, kích hoạt bởi **Cloud Functions** khi danh sách thay đổi (cần gói Blaze — xem mục 8).
- **Geofence: Google Play services Geofencing API** + quyền ACCESS_BACKGROUND_LOCATION.
- **Gợi ý tên siêu thị: Overpass API của OpenStreetMap** (miễn phí, không khoá), gọi trực tiếp từ máy chỉ lúc bấm "Lưu chỗ này".
- **Font: Be Vietnam Pro** đóng gói trong app (không phụ thuộc font hệ thống — máy dev chạy Windows tiếng Nhật từng làm lệch dấu tiếng Việt).

### Dữ liệu (gợi ý)

```
homes/{homeId}
  members: {uid: {role: "vo"|"chong", name, fcmToken}}
  inviteCode, inviteExpiresAt
homes/{homeId}/items/{itemId}        // kho món riêng của nhà (món tự thêm + món kho đã sửa)
homes/{homeId}/list/{entryId}        // danh sách Cần mua
  itemId, qty, unit, note, addedBy, addedAt,
  state: "need"|"picked"|"outOfStock", outOfStockAt: storeId?, pickedBy, updatedAt
homes/{homeId}/stores/{storeId}      // siêu thị đã lưu: name, lat, lng, radius, osmId?
homes/{homeId}/events/{eventId}      // "sent" | "added" | "finished" → kích Cloud Function gửi FCM
```

Kho món mặc định (ảnh + tên) nằm trong APK; Firestore chỉ lưu phần nhà mình thêm hoặc sửa.

## 7. Phần để người làm tự quyết

Cấu trúc package, thư viện DI, kiến trúc ViewModel, cách kiểm thử chi tiết, hiệu ứng chuyển cảnh, cách xử lý xung đột khi hai người cùng sửa một dòng (Firestore last-write-wins là đủ), biểu tượng app, tên gói (gợi ý `com.namle.dichochung`).

## 8. Việc chủ dự án phải tự làm (Claude không làm thay được)

1. **Firebase project + gói Blaze** — **đã đồng ý (2026-10-25)**: tạo project (hoặc để Claude tạo sau khi chủ dự án đăng nhập Firebase CLI một lần), **chủ dự án tự gắn thẻ thanh toán để bật gói Blaze** — bắt buộc cho Cloud Functions (thông báo giữa hai máy) và Storage (ảnh tự chụp). Đặt **cảnh báo ngân sách ¥100**. Tài khoản Google dùng cho Firebase: chưa chốt, đề xuất gmail cá nhân.
2. **Đăng nhập** `firebase login` trên máy dev (mở trình duyệt, chọn tài khoản Google).
3. **Bật Anonymous Auth** trong Firebase Console nếu công cụ dòng lệnh không bật được.
4. **Hai điện thoại**: cho phép cài app từ nguồn ngoài, cài APK; khi app hỏi thì bật quyền thông báo, vị trí "Luôn cho phép", tắt tối ưu pin cho app.
5. **Đứng ở siêu thị thật** để lưu siêu thị và thử thông báo khi tới nơi (không giả lập trọn vẹn được).
