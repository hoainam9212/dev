# 🌸 Nihongo Sensei

Ứng dụng web học tiếng Nhật toàn diện (N5–N1): kana, từ vựng, kanji, ngữ pháp, đọc, nghe, nói, viết, tiếng Nhật business. Giao diện anime với mascot Sakura.

## Chạy nhanh

```bash
npm install
npm run dev -w client      # http://localhost:5173
npm test                   # chạy test mọi workspace
npm run typecheck          # kiểm tra kiểu mọi workspace
```

## Cấu trúc

- `shared/` – kiểu dữ liệu và thuật toán dùng chung (SM-2, kana, chấm điểm)
- `client/` – React + Vite + Tailwind PWA
- `data/` – pipeline tải và build nội dung (giai đoạn 2)
- `server/` – Fastify + SQLite tài khoản và đồng bộ (giai đoạn 5)
- `docs/superpowers/` – spec và kế hoạch

Xem `docs/superpowers/specs/2026-09-19-nihongo-sensei-design.md`.
