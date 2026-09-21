# Tin Học Cùng Mochi (office-neko)

Ứng dụng web (PWA, chạy offline) dạy tin học văn phòng cho người mới: làm quen máy tính (Windows/Mac),
gõ 10 ngón + Telex/VNI, Word, Excel, PowerPoint và dùng AI. Mascot: mèo Mochi.

## Đã có (giai đoạn 1–2)

- Làm quen máy tính: phòng tập chuột (5 trò), bàn phím, thư mục & file cho Windows và Mac (dự án "Ảnh du lịch").
- Gõ phím 10 ngón: 20 bài từ hàng cơ sở tới Telex/VNI, dự án 25 WPM.
- Khu Luyện gõ: kiểm tra tốc độ 1/3 phút, trò chơi Mèo bắt cá, biểu đồ WPM, bản đồ phím hay sai.
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
