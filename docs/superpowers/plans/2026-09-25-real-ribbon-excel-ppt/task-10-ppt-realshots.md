# Task 10 [CHỜ ẢNH]: Gắn ảnh PowerPoint thật

Chỉ bắt đầu khi người dùng đã gửi file `.xlsx` 5 sheet theo `docs/real-shots-ppt.md`. Chưa có thì dừng, hỏi.

**Files:**
- Create: `client/public/images/real/ppt-01-window.png` … `ppt-05-shapes-menu.png` (do công cụ tách)
- Modify: `client/scripts/blur-names.ps1` (khung làm mờ cho 5 ảnh PowerPoint)
- Modify: `client/src/content/lessons/ppt-basics.ts`, `ppt-objects.ts`
- Modify: `client/src/content/content.test.ts`

**Interfaces:** Consumes `RealShotStep` `{ kind: 'realShot', image, caption, credit?, marks: { x, y, w, h, label }[] }`,
toạ độ % của ảnh. `credit: 'Ảnh chụp Microsoft PowerPoint'` (bắt buộc ghi — mặc định là Word). Bài hai ảnh
(`ppt.slides`: Home + Layout menu; `ppt.shape`: Insert + Shapes menu) thì hai bước liền nhau, thanh Ribbon trước.
Ảnh cửa sổ (`ppt-01-window`) khoanh **cột hình thu nhỏ bên trái** cho `ppt.intro` và **khung tiêu đề/nội dung** trên
slide cho `ppt.title`.

- [ ] **Bước 1: Test (FAIL)** — `content.test.ts`, sau vòng lặp Excel:

```ts
// PowerPoint: cả 6 bài của 5A đều kết bằng ảnh PowerPoint thật.
for (const l of lessons.filter((l) => l.trackId === 'ppt')) {
  const shots = l.steps.filter((s) => s.kind === 'realShot');
  expect(shots.length, `${l.id}: no real screenshot`).toBeGreaterThan(0);
  for (const s of shots) expect(s.credit, `${l.id}: credit`).toBe('Ảnh chụp Microsoft PowerPoint');
}
```
Chạy `npm test -w client -- content` → FAIL đủ 6 bài. (Bài 5B thêm sau cũng phải theo quy tắc này.)

- [ ] **Bước 2: Tách ảnh** `node client/scripts/real-shots.mjs ppt "C:/…/<file>.xlsx"`. Đủ 5 tên, đúng thứ tự.
  **Mở từng ảnh ra xem**; ảnh sai nội dung thì báo người dùng chụp lại.

- [ ] **Bước 3: Làm mờ tên tài khoản** trên thanh tiêu đề mọi ảnh: thêm `@('ppt-NN-….png', x, y, rộng, cao)` vào
  `blur-names.ps1` (giữ UTF-8 có BOM), chạy `powershell -File client/scripts/blur-names.ps1`, mở lại ảnh xác nhận.

- [ ] **Bước 4: Ước toạ độ khung** bằng cách vẽ thử lên **bản sao** trong scratchpad (`System.Drawing`) rồi xem;
  chỉnh tới khi ôm đúng nút. Không vẽ lên ảnh trong `public/`.

- [ ] **Bước 5: Thêm bước `realShot`** cho 6 bài. Caption "Trên PowerPoint thật: thẻ X › nhóm Y"; nhãn khung "Tên nút
  tiếng Anh, phím tắt nếu có: việc nó làm", ví dụ `'New Slide, phím tắt Ctrl + M: thêm slide mới'`. Chỉ khoanh
  nút bài vừa dùng, theo thứ tự bấm.

- [ ] **Bước 6:** `npm test && npm run typecheck`.

- [ ] **Bước 7: Trình duyệt:** học tới bước ảnh của `ppt.slides`, `ppt.shape`, `ppt.image`; chụp màn hình, soi khung
  ôm đúng nút, số không đè nhau, phóng to được, 375px không tràn.

- [ ] **Bước 8: Commit** `feat(ppt): ảnh PowerPoint thật ở cuối mọi bài` + STATUS; gửi người dùng ảnh chụp để duyệt.
