# Ảnh món (Task 11)

132 món trong `items.csv`, mỗi món một icon 3D bóng kiểu "app icon", nền trong suốt, 256 px WebP ở
`android/app/src/main/assets/catalog/icons/<id>.webp` (~1,5 MB tổng). Vẽ bằng **Gemini** (tài khoản Pro của chủ dự án),
mỗi lượt một **tấm 2×2 = 4 món** (tấm 3×3 Gemini hay lỗi / từ chối).

## Prompt chuẩn

```
Generate a square 1:1 image: four separate grocery icons in a 2x2 grid with wide white space between them,
plain white background, no text or labels. Style: glossy semi-realistic 3D render like premium app icons,
soft light from top-left, small soft shadow, 3/4 view, each item centered in its own quarter.
Top left: <món 1>. Top right: <món 2>. Bottom left: <món 3>. Bottom right: <món 4>.
```

Mô tả từng món (tiếng Anh, thêm chi tiết kiểu Nhật / Việt cho dễ nhận) nằm trong `sheets.json`; tấm `n ≥ 100` là lượt
vẽ lại món sai. Thịt cá vẽ món trần, **không khay / bao bì** (tấm 101–104) — khay xốp làm các món trông giống nhau.
Đừng tả "túi nhỏ tinh thể trắng" (bột ngọt, muối, đường) — dễ bị chặn; tả lọ rắc / hộp / bát.

## Quy trình

1. Gemini → nút "フルサイズの画像をダウンロード" (JPG 2048 px) → `sh grab.sh <n>` chuyển ảnh mới nhất trong
   `~/Downloads` thành `sheets/NN.jpg` rồi cắt (`cut-sheets.mjs`): loang nền từ mép ô chỉ qua vùng đổi sáng ≤ 2 (giữ được
   món trắng như đậu phụ, hộp sữa), bóng đổ thành bóng đen mờ, cắt sát món + lề 6 %, PNG 512 px ở `raw/<id>.png`.
   Tải từng tấm một rồi chạy grab ngay — tải dồn nhiều tấm từng làm lệch số tấm.
2. Soát: `PER=11 S=110 node preview.mjs out.png <id…>` ghép ảnh lên nền pastel.
3. `npm run check` (thiếu ảnh nào) → `npm run build` → `items.json` + webp, xoá icon thừa.

`sheets/` và `raw/` không commit (~95 MB), chỉ có trên máy gốc.
