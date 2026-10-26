### Task 13: Thử thật trên Galaxy S22 + S26 Ultra (cùng user)

> Không viết mã mới, trừ khi sửa lỗi tìm thấy (mỗi lỗi: test tái hiện → sửa → commit `fix: …` riêng, tăng versionCode, build lại APK).

**Files:**
- Create: `docs/smoke-2026-xx-xx.md` (bảng kết quả: bước, máy, đạt/không, ghi chú, ảnh chụp màn hình user gửi)

**Interfaces:**
- Consumes: `release/DiChoChung-1.0.0.apk` (Task 12).

- [ ] **Step 1: Cài đặt (user làm, Claude hướng dẫn từng bước):** gửi APK bằng SendUserFile; trên mỗi máy cho phép "Cài ứng dụng không rõ nguồn gốc" cho trình mở file, cài, mở app.
- [ ] **Step 2: Ghép đôi:** máy Vợ chọn "Vợ" → "Tạo nhà mới" → "Mời thêm người"; máy Chồng chọn "Chồng" → "Quét QR". Đạt khi cả hai thấy đủ 2 thành viên. Thử thêm "Đổi máy" cạnh tên Chồng (máy Chồng xoá dữ liệu app rồi vào lại bằng mã mới) → vẫn 2 thành viên, không thành 3. Thử thêm: nhập mã sai → báo "Mã không đúng".
- [ ] **Step 3: Quyền:** cả hai máy làm hết 4 dòng thẻ "Quyền & pin" tới khi đủ ✅ (Samsung: Pin → Không hạn chế; Ứng dụng không bao giờ ngủ).
- [ ] **Step 4: Gửi + thông báo:** tắt app trên máy Chồng (vuốt khỏi đa nhiệm). Máy Vợ chọn 4 món, chỉnh số lượng, Gửi. Đạt khi máy Chồng nhận "🧺 Vợ vừa gửi 4 món cần mua" trong ≤ 30 s, chạm vào mở đúng tab Cần mua với đúng số lượng. Gửi thêm 1 món → "Vợ vừa thêm: …".
- [ ] **Step 5: Tick + mất sóng (Review Focus #1, #2):** máy Chồng bật **chế độ máy bay**, tick 2 món, vuốt hết hàng 1 món; máy Vợ cùng lúc sửa ghi chú món thứ 4. Tắt chế độ máy bay. Đạt khi sau ≤ 30 s hai máy giống hệt nhau: 2 tick, 1 nhãn hết hàng, ghi chú mới — không mất thay đổi nào.
- [ ] **Step 6: Hoàn thành:** máy Chồng bấm "Hoàn thành đi chợ". Đạt khi món đã nhặt biến mất, món chưa nhặt + hết hàng còn lại, máy Vợ nhận "Chồng đã đi chợ xong · Nhặt 2/4 món".
- [ ] **Step 7: Siêu thị thật (user tự đi, báo lại):** tại một siêu thị quanh 西葛西 bấm "Lưu chỗ này là siêu thị" → chọn đúng tên từ danh sách OSM. Hôm sau (hoặc đi ra xa > 300 m rồi quay lại sau 2 giờ) khi danh sách còn món: đạt khi có "🛒 Đang ở <tên>, còn N món" trong ≤ 2 phút sau khi bước vào; vuốt hết hàng ở đó → nhãn "Hết ở <tên>". Khởi động lại máy rồi thử lại lần nữa (Review Focus #5).
- [ ] **Step 8:** Ghi kết quả vào `docs/smoke-*.md`, cập nhật `STATUS.md`; commit `docs: record real-phone smoke test`. Hỏi user có muốn push lên GitHub (`di-cho-gia-dinh/master`) không.
