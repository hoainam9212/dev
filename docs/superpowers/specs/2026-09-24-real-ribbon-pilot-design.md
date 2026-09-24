# Bản thử: nút giống Office thật + ảnh chụp thật (bài `word.bold`)

Duyệt 2026-09-24. Mục tiêu: người học mở Word thật vẫn nhận ra ngay nút vừa học nằm ở đâu.

## Phạm vi
- Chỉ bài `word.bold` và **nhóm Font** của tab Home trong trình mô phỏng Word.
- Ngoài phạm vi: nhóm/tab khác, Excel, PowerPoint, công cụ kéo khung chọn tọa độ.

## 1. Nhóm Font giống thật
- Word bỏ bản `Group`/`ToolButton`/`Picker` tự viết, dùng bản chung `client/src/components/ribbon.tsx`.
- Bản chung thêm `variant="office"`: nút phẳng, không bo, bật = nền xám nhạt + viền. Mặc định giữ nguyên kiểu cũ nên Excel/PPT không đổi.
- Nhóm tên **"Font"**, hai hàng như Word 365: hàng trên ô phông + ô cỡ; hàng dưới B, I, U, màu chữ, tô nền.
- Icon `@fluentui/react-icons` (MIT): `TextBold`, `TextItalic`, `TextUnderline`, `TextColor`, `Highlight`; màu chữ/tô nền có vạch màu bên dưới.
- Tooltip `title` = "Bold (Ctrl+B) — In đậm"; `aria-label` giữ tiếng Việt ("In đậm") nên test cũ không đổi.

## 2. Bước `realShot`
```ts
interface RealShotStep {
  kind: 'realShot';
  image: string;   // đường dẫn trong client/public
  caption: string;
  credit?: string; // mặc định "Ảnh chụp Microsoft Word"
  marks: { x: number; y: number; w: number; h: number; label: string }[]; // đơn vị %
}
```
- Hoàn thành ngay khi mở (như `explain`).
- `RealShot.tsx`: ảnh + khung đỏ chồng theo %, số thứ tự trên mỗi khung; danh sách chú thích, bấm dòng nào khung đó sáng (`data-active`); nút phóng to. Không hoạt ảnh khi `prefers-reduced-motion`.
- Ảnh: `client/public/images/real/word-home.png` (Word 365 tiếng Anh, 885×160). Tọa độ do Claude ước từ ảnh, người dùng duyệt qua ảnh chụp.
- `word.bold` thêm một bước `realShot` cuối bài, đánh dấu B, I, U.

## Kiểm thử
- `RealShot`: đủ số khung, style `left/top/width/height` theo %, bấm chú thích bật `data-active`.
- `content.test`: mọi `realShot` có file ảnh tồn tại, tọa độ trong 0–100 và `x+w ≤ 100`, `y+h ≤ 100`; chữ caption/label qua kiểm tra chính tả như bước khác.
- Test Ribbon Word/Excel/PPT cũ vẫn xanh.
- Trình duyệt: 1280 và 375 px, chụp màn hình gửi duyệt.
