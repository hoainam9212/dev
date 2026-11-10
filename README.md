# Tin Học Cùng Mochi (office-neko)

Ứng dụng web (PWA, chạy offline) dạy tin học văn phòng cho người mới: làm quen máy tính (Windows/Mac),
gõ 10 ngón + Telex/VNI, Word, Excel, PowerPoint và dùng AI. Mascot: mèo Mochi.

## Đã có (giai đoạn 1–6A)

- Làm quen máy tính: phòng tập chuột (5 trò), bàn phím, thư mục & file cho Windows và Mac (dự án "Ảnh du lịch").
- Gõ phím 10 ngón: 20 bài từ hàng cơ sở tới Telex/VNI, dự án 25 WPM.
- Khu Luyện gõ: kiểm tra tốc độ 1/3 phút, trò chơi Mèo bắt cá, biểu đồ WPM, bản đồ phím hay sai.
- Word: trình soạn thảo mô phỏng (ribbon 6 thẻ, trang A4, bảng, ảnh, Heading, mục lục, tìm & thay thế, lưu/in) và 15 bài từ gõ chữ tới dự án Đơn xin việc.
- Excel: bộ tính công thức riêng trong `shared/src/formula` (25 hàm, 6 mã lỗi có lời giải thích tiếng Việt) và bảng
  tính mô phỏng — lưới 50×26, nhiều sheet, định dạng số/tiền VNĐ, copy và fill có dịch địa chỉ, thẻ cú pháp hàm hiện
  khi đang gõ, sắp xếp có dịch địa chỉ như Excel thật, AutoFilter ẩn hàng mà không xoá dữ liệu, và bốn loại biểu đồ
  tự vẽ bằng SVG (cột, thanh ngang, đường, tròn). Ribbon sáu thẻ File/Home/Insert/Formulas/Data/View. **20 bài**, từ
  ô/hàng/cột tới VLOOKUP, lọc, biểu đồ, kết thúc bằng dự án Bảng lương 10 nhân viên chia ba chặng.
- PowerPoint (giai đoạn 5A + 5B): trình soạn slide mô phỏng — cột thumbnail, khung 16:9 co giãn theo cửa sổ, bốn bố
  cục, hộp chữ / hình khối / ảnh kéo–thả và đổi kích thước bằng 8 tay nắm (ảnh giữ tỉ lệ khi kéo góc), định dạng chữ,
  hoàn tác, lưu/in; sáu theme (Font Color có Automatic theo màu theme), chuyển cảnh Fade/Push/Zoom kèm Preview và
  Apply To All, trình chiếu toàn màn hình (F5 / Shift+F5, mũi tên, Esc; tôn trọng giảm chuyển động). Ribbon
  File/Home/Insert/Design/Transitions/Slide Show. **12 bài / 5 chương**: slide đầu tiên; chữ, hình và ảnh; cho đẹp
  mắt; trình bày; dự án Slide giới thiệu bản thân chia ba chặng.
- Dùng AI (giai đoạn 6A): trợ lý chat **mô phỏng, ngoại tuyến** — không gọi mạng, không API thật; mọi câu trả lời
  soạn sẵn ba mức (kém / tạm / tốt) và Mochi chọn theo độ rõ của prompt. Prompt được chấm năm tiêu chí Vai trò ·
  Bối cảnh · Nhiệm vụ · Định dạng · Giới hạn bằng từ khoá trên chữ đã bỏ dấu (gõ không dấu vẫn được chấm), năm ô
  tiêu chí sáng lên ngay khi gõ. Thêm hai chế độ: bấm chọn câu AI nói sai, và chọn thông tin không nên đưa cho AI.
  **10 bài / 4 chương**: làm quen AI (an toàn, bắt lỗi); viết prompt tốt; AI trong công việc (email, tóm tắt, công
  thức Excel và dàn ý slide ghép với bước Excel/PowerPoint thật của app); dự án Prompt tạo báo cáo tuần ba chặng.
- Ribbon giống Office thật ở cả ba app: thẻ › nhóm › thứ tự › nhãn theo Office **tiếng Anh**, gạch chân thẻ đúng màu
  từng app (Word xanh dương, Excel xanh lá, PowerPoint cam), mọi thẻ cao bằng nhau; giải nghĩa tiếng Việt ở chú thích.
  Cuối mọi bài có nút ribbon là bước **ảnh chụp thật** (`realShot`) có khung đỏ khoanh đúng nút vừa học.
- Trợ giúp ở mọi màn hình: Từ điển (F1), Hỏi Mèo, chú thích khi rê chuột, gợi ý 3 bậc.
- Nhiều người học trên một máy: mỗi người một thẻ tên và ảnh mèo riêng, tiến độ – sao – XP – chuỗi ngày – thống kê gõ tách biệt; đổi người ở thanh trên cùng; sao lưu một file cho cả máy (đọc được cả file bản cũ).

## Chạy

```bash
npm install
npm run dev        # http://localhost:5174
npm test           # test shared + client
npm run typecheck
npm run build      # client/dist, cài được như app
npm run preview    # http://localhost:4174
```

## Học trên web và cài vào máy

App là trang tĩnh (không có server, tiến độ nằm trong trình duyệt), nên chỉ cần đưa `client/dist` lên một dịch vụ host
tĩnh rồi gửi link cho người học.

- **Cài vào máy:** Cài đặt › **Ứng dụng** › **Cài vào máy** (Chrome/Edge). App có biểu tượng riêng, mở cửa sổ riêng,
  học được khi mất mạng. Điện thoại: menu trình duyệt › Thêm vào màn hình chính.
- **Bản mới:** đưa bản build mới lên; người học thấy thông báo "Có bản mới…" và bấm **Tải lại** (không tự tải lại giữa bài).
- Tiến độ **không** đồng bộ giữa các máy hay trình duyệt. Dùng Cài đặt › Sao lưu tiến độ để chuyển sang máy khác.

## Ảnh chụp Office thật

Ảnh nằm ở `client/public/images/real/<app>-NN-*.png`; danh sách cần chụp và độ rộng đã dùng ở
`docs/real-shots-word.md`, `real-shots-excel.md`, `real-shots-ppt.md`. Ảnh nên rộng ~1000 px (bài học hiện ảnh trong
khung ~970 px; hẹp hơn thì bị phóng to và mờ), **không** chụp cửa sổ phóng to hết màn hình.

- **Tự chụp trên Windows có Office tiếng Anh:** `client/scripts/office-shots/` — `lib.ps1` (điều khiển Office bằng COM +
  UI Automation, chụp bằng CopyFromScreen, ghi toạ độ mọi nút), `crop.ps1` (cắt), `mark.mjs` (toạ độ nút → khung %),
  `draw.ps1` (vẽ thử khung lên bản sao). Lúc chụp không ai được chạm chuột/bàn phím; màn hình không khoá.
- **Chụp tay:** Win + Shift + S, dán mỗi ảnh một sheet của một file Excel, rồi
  `node client/scripts/real-shots.mjs <word|excel|ppt> "<file>.xlsx"`.
- **Luôn chạy sau khi có ảnh mới:** `powershell -File client/scripts/blur-names.ps1` (làm mờ tên tài khoản, email;
  `'fill'` tô nền danh sách thư mục gần đây). Rồi `git checkout` lại các ảnh cũ mà script làm mờ lại không cần thiết.

Thiết kế: `docs/superpowers/specs/2026-09-19-office-neko-design.md`
Kế hoạch: `docs/superpowers/plans/`
