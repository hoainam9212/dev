# Task 9 [CHỜ ẢNH]: Gắn ảnh Excel thật

Chỉ bắt đầu khi người dùng đã gửi file `.xlsx` 11 sheet theo `docs/real-shots-excel.md`. Chưa có thì dừng, hỏi.

**Files:**
- Create: `client/public/images/real/excel-01-window.png` … `excel-11-save-as.png` (do công cụ tách)
- Modify: `client/scripts/blur-names.ps1` (khung làm mờ cho 11 ảnh Excel)
- Modify: `client/src/content/lessons/excel-*.ts` (bước `realShot` cuối mỗi bài theo bảng trong docs)
- Modify: `client/src/content/content.test.ts` (đòi ảnh cho bài Excel)

**Interfaces:** Consumes `RealShotStep` (`shared/src/types.ts`): `{ kind: 'realShot', image, caption, credit?, marks:
{ x, y, w, h, label }[] }`, toạ độ **% của ảnh**. Bài dùng hai ảnh (sort, filter, chart, project, copy…) thì hai
bước `realShot` liền nhau, ảnh thanh Ribbon trước, ảnh menu/hộp thoại sau. `credit: 'Ảnh chụp Microsoft Excel'`
(mặc định của `RealShot` là Word — **phải ghi**). Ảnh dùng nhiều bài thì khai một hằng đầu file bài học như
`HOME_SHOT` của `word-format.ts`.

- [ ] **Bước 1: Test (FAIL)** — `content.test.ts`, trong test ảnh thật, thêm sau vòng lặp Word:

```ts
// Excel: mọi bài có nút ribbon kết bằng ảnh Excel thật; excel.enter chỉ gõ trong ô.
for (const l of lessons.filter((l) => l.trackId === 'excel' && l.id !== 'excel.enter')) {
  const shots = l.steps.filter((s) => s.kind === 'realShot');
  expect(shots.length, `${l.id}: no real screenshot`).toBeGreaterThan(0);
  for (const s of shots) expect(s.credit, `${l.id}: credit`).toBe('Ảnh chụp Microsoft Excel');
}
```
Chạy `npm test -w client -- content` → FAIL đủ 19 bài.

- [ ] **Bước 2: Tách ảnh** `node client/scripts/real-shots.mjs excel "C:/…/<file>.xlsx"` (đường dẫn `C:/`). Xem
  output: đủ 11 tên, đúng thứ tự; sheet thừa bị bỏ qua có cảnh báo. **Mở từng ảnh ra xem** — ảnh sai nội dung
  (chụp nhầm thẻ, menu chưa mở) thì báo người dùng chụp lại, đừng gắn.

- [ ] **Bước 3: Làm mờ tên tài khoản.** Xem từng ảnh tìm tên/ảnh đại diện trên thanh tiêu đề và email trên Save As,
  thêm dòng `@('excel-NN-….png', x, y, rộng, cao)` (pixel ảnh gốc) vào `$boxes` của `blur-names.ps1` (file giữ
  **UTF-8 có BOM** cho PowerShell 5.1), chạy `powershell -File client/scripts/blur-names.ps1`, mở lại ảnh xác nhận
  đã mờ và không mờ nhầm nút.

- [ ] **Bước 4: Ước toạ độ khung.** Với mỗi nút cần khoanh: đo pixel trên ảnh, đổi ra %, vẽ thử các khung lên **bản sao**
  ảnh trong scratchpad bằng `System.Drawing` (PowerShell) rồi xem ảnh bản sao; lệch thì chỉnh tới khi khung ôm
  đúng nút. Không vẽ lên ảnh thật trong `public/`.

- [ ] **Bước 5: Thêm bước `realShot`** cho 19 bài. Caption theo mẫu "Trên Excel thật: thẻ X › nhóm Y"; nhãn mỗi khung:
  "Tên nút tiếng Anh, phím tắt nếu có: việc nó làm", ví dụ `'Merge & Center: gộp các ô đang chọn thành một ô'`.
  Khoanh **đúng những nút bài vừa dùng**, theo thứ tự bấm.

- [ ] **Bước 6:** `npm test && npm run typecheck` → PASS (content.test kiểm ảnh tồn tại, khung nằm trong ảnh).

- [ ] **Bước 7: Trình duyệt** (headless Chrome nếu pane trong app đang ẩn — xem memory): học tới bước ảnh của ít nhất
  `excel.look`, `excel.sort`, `excel.filter`, `excel.chart`; chụp màn hình từng bước ảnh, soi khung ôm đúng nút, số
  ①②③ không đè nhau, phóng to được, 375px ảnh cuộn ngang trong khung.

- [ ] **Bước 8: Commit** `feat(excel): ảnh Excel thật ở cuối mọi bài có nút ribbon` + STATUS; gửi người dùng vài ảnh
  chụp để duyệt.
