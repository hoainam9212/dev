# Task 5: Chụp 3 ảnh PowerPoint thật — Design, Transitions, Slide Show

Không có code sản phẩm; ra 3 ảnh + khung đỏ (toạ độ %) để Task 6–8 gắn vào bài.

**Files:**
- Create: `client/public/images/real/ppt-06-design.png`, `ppt-07-transitions.png`, `ppt-08-slideshow.png`
- Modify: `docs/real-shots-ppt.md` (thêm 3 dòng), `client/scripts/blur-names.ps1` (3 khung làm mờ tên tài khoản)

**Đọc trước:** README mục "Ảnh chụp Office thật"; memory `office-screenshot-automation` (bẫy cú bấm lạc).
Máy gốc: Office Home & Business 2019, en-us, màn chính 1920×1080 @96 DPI, màn phụ nằm trên.

## Bước

- [ ] **1. Báo người dùng trước khi chụp** (một câu): "Tôi sắp điều khiển PowerPoint khoảng 5 phút, bạn đừng chạm
  chuột/bàn phím và đừng khoá màn hình nhé." Chờ người dùng đồng ý rồi mới làm.
- [ ] **2. Dựng bài mẫu bằng COM** (`PowerPoint.Application`): 3 slide, slide 1 tiêu đề "Giới thiệu bản thân",
  slide 2 Title and Content, slide 3 Two Content. Cửa sổ 1000×650 bằng `Place`. Ghi lại trạng thái ribbon gốc
  (thu gọn hay không) để **trả lại** ở bước 6.
- [ ] **3. Chụp từng thẻ** bằng `lib.ps1` (`Guard` trước mỗi lần bấm, `ClickEl` theo tên UIA, `SafeRaw` kiểm còn đúng
  cửa sổ rồi mới chụp), cắt bằng `crop.ps1` sát nhóm cuối, cao 160 như `ppt-02-home.png`:
  | Ảnh | Thẻ | Nút cần có khung đỏ (tên UIA cần `DumpProc` để lấy toạ độ) |
  |---|---|---|
  | `ppt-06-design.png` | Design | bộ sưu tập Themes (cả dải), nút More ▾ của Themes |
  | `ppt-07-transitions.png` | Transitions | Preview; Fade; Push; Apply To All |
  | `ppt-08-slideshow.png` | Slide Show | From Beginning; From Current Slide |
  Nếu thẻ Transitions không có **Zoom** ở hàng đầu bộ sưu tập: ghi vào STATUS "Zoom nằm trong More ▾" để Task 7
  viết lời bài đúng (KHÔNG chụp thêm menu nếu bài không cần).
- [ ] **4. Toạ độ khung** — `DumpProc` ra `.tsv`, `node client/scripts/office-shots/mark.mjs <tsv> <crop> "Name@Type#n" ...`
  ra `{x,y,w,h}` %; vẽ thử bằng `draw.ps1` lên bản sao trong `$env:TEMP\office-shots`, **mở ảnh xem** từng khung
  không đè chữ. Ghi các object toạ độ vào dòng Task 5 của `STATUS.md` (Task 6–8 chép từ đó, không đo lại).
- [ ] **5. Làm mờ** — thêm 3 khung tên tài khoản (vùng `688,2,127,32` nếu cửa sổ 1000 px, đo lại nếu khác) vào
  `blur-names.ps1`, chạy `powershell -File client/scripts/blur-names.ps1`, rồi
  `git checkout -- client/public/images/real/word-*.png` (script làm mờ lại ảnh Word, phải trả về bản gốc).
  Mở 3 ảnh xem lại: không còn tên/email/tên thư mục công việc.
- [ ] **6. Trả PowerPoint về như cũ** — đóng bài mẫu không lưu, ribbon về trạng thái gốc; xoá ảnh thô trong
  `$env:TEMP\office-shots` có lộ thông tin cá nhân.
- [ ] **7. `docs/real-shots-ppt.md`** — 3 dòng mới (tên file, thẻ, cỡ, bài dùng: `ppt.theme`, `ppt.transition`,
  `ppt.present`/`ppt.project`).
- [ ] **8. Commit** `docs(ppt): ảnh thật thẻ Design, Transitions, Slide Show` + dòng STATUS (kèm toạ độ khung).
