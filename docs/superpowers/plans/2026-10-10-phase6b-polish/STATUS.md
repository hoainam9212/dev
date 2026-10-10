# Giai đoạn 6B (hoàn thiện) – tình trạng

Đang làm trên nhánh `feat/phase6b-polish` (từ master 4c142d4).

Cập nhật **một dòng** sau mỗi task, trong cùng commit. Dòng đầu tiên chưa ☑ là task kế tiếp.

| Task | Xong | Commit | Ghi chú / việc còn treo |
|---|---|---|---|
| 1 huy hiệu | ☑ | (commit này) | 11 test shared + 8 client. `awardBadges` chỉ tính bài có sao > 0. Gọi sau `recordLessonResult` (lỗi huy hiệu không làm mất kết quả bài), sau `recordTypingRun` ở trang kiểm tra tốc độ và bước gõ trong bài. **Ruling (ngoài plan):** trang chủ cũng gọi `awardBadges` khi mở — trao bù cho người học từ trước khi có huy hiệu (hồ sơ cũ thấy 0/8 dù đã xong `ai.project`); idempotent nên không hiện "Huy hiệu mới" lần hai. Học thật: hồ sơ mới học `basics.welcome` → "Huy hiệu mới! 🐾 Bước chân đầu tiên"; kệ 1/8; học lại → không báo; hồ sơ cũ không lây sang. 390px kệ 2 cột, scrollWidth 390. shared 525, client 417 |
| 2 phụ kiện Mochi | ☑ | (commit này) | 5 test shared + 8 client. `wearable()` trong `avatars.ts`; 4 chỗ vẽ Mochi của hồ sơ đeo (AppShell 26px, ProfileList, ProfilePicker, Cài đặt: 6 ô ảnh đại diện + xem trước 64px). Màn chào không đeo (hồ sơ mới cấp 1). Khăn quàng vẽ ngay trên vòng cổ, dưới tay giơ; 4 món còn lại vẽ trên cùng. Màn kết bài: `LessonPage` đọc XP sau khi ghi, lấy `xp - xpGained` làm XP trước (không đổi kiểu trả về của `recordLessonResult`). Kiểm trình duyệt: 5 món × 26/48/96/160px × 6 màu lông, có `mochi-bob` → đúng chỗ; hồ sơ ghi `crown` ở cấp 1 → không vẽ, không lỗi; 40→70 XP qua bài chào → "Mochi có phụ kiện mới: Nơ hồng!"; Cài đặt 390px không tràn. shared 530, client 425 |
| 3 Phòng tự do | ☐ | | |
| 4 kiểm tra đầu vào | ☐ | | |
| 5 `Start Tin Hoc.bat` + PWA | ☐ | | |
| 6 đi một vòng, sao lưu, gộp | ☐ | | |

## Việc còn treo

(trống)

## Cố ý KHÔNG làm

Đăng nhập/PIN; đồng bộ giữa các máy; bảng xếp hạng; phụ kiện mua bằng XP (chỉ mở theo cấp); bản `.command` cho Mac.
