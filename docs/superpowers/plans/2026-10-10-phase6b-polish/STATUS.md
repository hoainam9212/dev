# Giai đoạn 6B (hoàn thiện) – tình trạng

Đang làm trên nhánh `feat/phase6b-polish` (từ master 4c142d4).

Cập nhật **một dòng** sau mỗi task, trong cùng commit. Dòng đầu tiên chưa ☑ là task kế tiếp.

| Task | Xong | Commit | Ghi chú / việc còn treo |
|---|---|---|---|
| 1 huy hiệu | ☑ | (commit này) | 11 test shared + 8 client. `awardBadges` chỉ tính bài có sao > 0. Gọi sau `recordLessonResult` (lỗi huy hiệu không làm mất kết quả bài), sau `recordTypingRun` ở trang kiểm tra tốc độ và bước gõ trong bài. **Ruling (ngoài plan):** trang chủ cũng gọi `awardBadges` khi mở — trao bù cho người học từ trước khi có huy hiệu (hồ sơ cũ thấy 0/8 dù đã xong `ai.project`); idempotent nên không hiện "Huy hiệu mới" lần hai. Học thật: hồ sơ mới học `basics.welcome` → "Huy hiệu mới! 🐾 Bước chân đầu tiên"; kệ 1/8; học lại → không báo; hồ sơ cũ không lây sang. 390px kệ 2 cột, scrollWidth 390. shared 525, client 417 |
| 2 phụ kiện Mochi | ☑ | (commit này) | 5 test shared + 8 client. `wearable()` trong `avatars.ts`; 4 chỗ vẽ Mochi của hồ sơ đeo (AppShell 26px, ProfileList, ProfilePicker, Cài đặt: 6 ô ảnh đại diện + xem trước 64px). Màn chào không đeo (hồ sơ mới cấp 1). Khăn quàng vẽ ngay trên vòng cổ, dưới tay giơ; 4 món còn lại vẽ trên cùng. Màn kết bài: `LessonPage` đọc XP sau khi ghi, lấy `xp - xpGained` làm XP trước (không đổi kiểu trả về của `recordLessonResult`). Kiểm trình duyệt: 5 món × 26/48/96/160px × 6 màu lông, có `mochi-bob` → đúng chỗ; hồ sơ ghi `crown` ở cấp 1 → không vẽ, không lỗi; 40→70 XP qua bài chào → "Mochi có phụ kiện mới: Nơ hồng!"; Cài đặt 390px không tràn. shared 530, client 425 |
| 3 Phòng tự do | ☑ | (commit này) | 8 test `docs.ts` + 9 test trang (sim giả qua `vi.mock` registry để test nhịp lưu). Tên tệp mới: số tăng theo tên đã dùng (xoá «Văn bản 1» rồi tạo không ra hai «Văn bản 2»). Lưu bỏ `past`, và đặt `dialog`/`show` = null (mở lại tệp là về màn soạn, không kẹt trong trình chiếu). Sim báo state lúc mở = `initial` → bỏ qua, chỉ mở tệp không đổi giờ sửa. **Ruling:** trang tệp ghi bằng `putDocState(doc, state)` — một lệnh `put`, không đọc trước (`doc` đã soát chủ lúc mở, tên giữ khớp khi đổi tên); `saveDocState` đọc-rồi-ghi vẫn có cho nơi khác. Ô tên tệp là "Đổi tên tệp" vì hộp thoại Lưu của PowerPoint đã dùng nhãn "Tên tệp". Báo "Chưa lưu được…" khi ghi lỗi. Chrome headless (dev 5174): Word/Excel (`=A1*2` → 246)/PPT tải lại còn nguyên; chuyển tab ngay sau khi gõ → đã lưu; **rời trang ngay khi đang chờ 800 ms → mất phần gõ cuối** (IndexedDB bị huỷ khi gỡ trang, kể cả một lệnh `put`) — đúng mức "mất tối đa ~1 giây" của Review Focus 3; hồ sơ B không thấy tệp của A, mở link tệp của A → về danh sách kèm thông báo; 390px danh sách + Word không tràn (đã sửa tên tệp bị bóp còn 1 chữ). shared 530, client 442 |
| 4 kiểm tra đầu vào | ☑ | (commit này) | 6 test shared + 5 test `placement.ts` + 7 test trang + 1 TrackMap + 3 Welcome. Lộ trình tested-out mở **cả khi** phần trước chưa xong (đạt Excel trước Word vẫn mở Excel) và tính là xong để mở phần kế. **Ruling:** `QuizView` thêm prop `onChoose` (chế độ thi: chọn một lần là nộp, không báo đúng/sai) vì `QuizView` gốc cho chọn lại tới khi đúng; đáp án + giải thích hiện hết ở màn kết quả. **Ruling (ngoài plan):** "Học tiếp" ở trang chủ bỏ qua bài của lộ trình tested-out (hết bài khác mới quay lại) — không thì qua kiểm tra xong vẫn bị dẫn về "Làm quen với Mochi". Màn chào thêm bước 5 sau chọn mèo; nút "Vào học thôi" cũ bỏ, thay bằng **Học từ đầu** / **Kiểm tra đầu vào** (cả hai tạo hồ sơ; điều hướng qua `Navigate to={after}`, không gọi `navigate()`). Ghi `testedOut` bằng `markTestedOut` (transaction, idempotent, không thu hồi). Chrome headless (dev 5174, hồ sơ mới): chào → Kiểm tra đầu vào → /placement; Làm quen máy tính 6/6 → mở; gõ 1 phút `?placement=1` 34 WPM 100% → mở; trang chủ Word mở bài 1, "Học tiếp" → `word.intro`; Excel 0/6 → vẫn khoá, có link "Đã biết rồi?"; AI không có link; 390px placement/câu hỏi/kết quả/trang chủ scrollWidth 390; không lỗi console. Pane trong app không gửi `keydown` khi gõ → bài tốc độ phải kiểm bằng puppeteer. shared 536, client 458 |
| 5 `Start Tin Hoc.bat` + PWA | ☐ | | |
| 6 đi một vòng, sao lưu, gộp | ☐ | | |

## Việc còn treo

(trống)

## Cố ý KHÔNG làm

Đăng nhập/PIN; đồng bộ giữa các máy; bảng xếp hạng; phụ kiện mua bằng XP (chỉ mở theo cấp); bản `.command` cho Mac.
