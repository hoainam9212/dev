# Tin Học Cùng Mochi (office-neko)

Ứng dụng web (PWA, chạy offline) dạy tin học văn phòng cho người mới: làm quen máy tính (Windows/Mac),
gõ 10 ngón + Telex/VNI, Word, Excel, PowerPoint và dùng AI. Mascot: mèo Mochi.

## Đã có (giai đoạn 1–5A)

- Làm quen máy tính: phòng tập chuột (5 trò), bàn phím, thư mục & file cho Windows và Mac (dự án "Ảnh du lịch").
- Gõ phím 10 ngón: 20 bài từ hàng cơ sở tới Telex/VNI, dự án 25 WPM.
- Khu Luyện gõ: kiểm tra tốc độ 1/3 phút, trò chơi Mèo bắt cá, biểu đồ WPM, bản đồ phím hay sai.
- Word: trình soạn thảo mô phỏng (ribbon 6 thẻ, trang A4, bảng, ảnh, Heading, mục lục, tìm & thay thế, lưu/in) và 15 bài từ gõ chữ tới dự án Đơn xin việc.
- Excel: bộ tính công thức riêng trong `shared/src/formula` (25 hàm, 6 mã lỗi có lời giải thích tiếng Việt) và bảng
  tính mô phỏng — lưới 50×26, nhiều sheet, định dạng số/tiền VNĐ, copy và fill có dịch địa chỉ, thẻ cú pháp hàm hiện
  khi đang gõ, sắp xếp có dịch địa chỉ như Excel thật, AutoFilter ẩn hàng mà không xoá dữ liệu, và bốn loại biểu đồ
  tự vẽ bằng SVG (cột, thanh ngang, đường, tròn). Ribbon sáu thẻ File/Home/Insert/Formulas/Data/View. **20 bài**, từ
  ô/hàng/cột tới VLOOKUP, lọc, biểu đồ, kết thúc bằng dự án Bảng lương 10 nhân viên chia ba chặng.
- PowerPoint (giai đoạn 5A): trình soạn slide mô phỏng — cột thumbnail, khung 16:9 co giãn theo cửa sổ, bốn bố cục,
  hộp chữ / hình khối / ảnh kéo–thả và đổi kích thước bằng 8 tay nắm (ảnh giữ tỉ lệ khi kéo góc), định dạng chữ,
  hoàn tác, lưu/in; ribbon File/Home/Insert. **6 bài / 2 chương**: slide đầu tiên, rồi chữ, hình và ảnh. Theme,
  chuyển cảnh, trình chiếu toàn màn hình, các bài còn lại và dự án thuộc giai đoạn 5B, chưa làm.
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

Thiết kế: `docs/superpowers/specs/2026-09-19-office-neko-design.md`
Kế hoạch: `docs/superpowers/plans/`
