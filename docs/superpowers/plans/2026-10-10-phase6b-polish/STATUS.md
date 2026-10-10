# Giai đoạn 6B (hoàn thiện) – tình trạng

Đang làm trên nhánh `feat/phase6b-polish` (từ master 4c142d4).

Cập nhật **một dòng** sau mỗi task, trong cùng commit. Dòng đầu tiên chưa ☑ là task kế tiếp.

| Task | Xong | Commit | Ghi chú / việc còn treo |
|---|---|---|---|
| 1 huy hiệu | ☑ | (commit này) | 11 test shared + 8 client. `awardBadges` chỉ tính bài có sao > 0. Gọi sau `recordLessonResult` (lỗi huy hiệu không làm mất kết quả bài), sau `recordTypingRun` ở trang kiểm tra tốc độ và bước gõ trong bài. **Ruling (ngoài plan):** trang chủ cũng gọi `awardBadges` khi mở — trao bù cho người học từ trước khi có huy hiệu (hồ sơ cũ thấy 0/8 dù đã xong `ai.project`); idempotent nên không hiện "Huy hiệu mới" lần hai. Học thật: hồ sơ mới học `basics.welcome` → "Huy hiệu mới! 🐾 Bước chân đầu tiên"; kệ 1/8; học lại → không báo; hồ sơ cũ không lây sang. 390px kệ 2 cột, scrollWidth 390. shared 525, client 417 |
| 2 phụ kiện Mochi | ☐ | | |
| 3 Phòng tự do | ☐ | | |
| 4 kiểm tra đầu vào | ☐ | | |
| 5 `Start Tin Hoc.bat` + PWA | ☐ | | |
| 6 đi một vòng, sao lưu, gộp | ☐ | | |

## Việc còn treo

(trống)

## Cố ý KHÔNG làm

Đăng nhập/PIN; đồng bộ giữa các máy; bảng xếp hạng; phụ kiện mua bằng XP (chỉ mở theo cấp); bản `.command` cho Mac.
