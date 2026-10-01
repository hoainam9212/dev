# Ảnh chụp PowerPoint thật — danh sách chụp

PowerPoint 365 **tiếng Anh**, cửa sổ phóng to hết màn hình, chụp bằng Win + Shift + S rồi dán vào một file Excel:
**mỗi ảnh một sheet, đúng thứ tự dưới đây** (Sheet1 = ảnh 1…). Tên sheet không quan trọng, thứ tự thì có.
Nhận file xong chạy: `node client/scripts/real-shots.mjs ppt "<file>.xlsx"` → ảnh vào `client/public/images/real/`
với tên ở cột "Tên file" (sheet trống bị bỏ qua). Rồi **bắt buộc** chạy `powershell -File client/scripts/blur-names.ps1`
để làm mờ tên tài khoản trên thanh tiêu đề (khung mờ của ảnh PowerPoint thêm vào script khi có ảnh; chụp lại ảnh
nào thì xem lại khung mờ của ảnh đó).

| Sheet | Tên file | Chụp gì | Cách mở trên PowerPoint | Dùng cho bài |
|---|---|---|---|---|
| 1 | ppt-01-window | Cả cửa sổ PowerPoint, bài trống | Mở PowerPoint → Blank Presentation, để ở thẻ Home | ppt.intro, ppt.title |
| 2 | ppt-02-home | Cả thanh Ribbon thẻ **Home**, từ Undo tới Drawing | Thẻ Home. Nếu nhóm Drawing bị thu gọn thì kéo rộng cửa sổ | ppt.slides, ppt.shape |
| 3 | ppt-03-layout-menu | Menu **Layout** đang mở | Home › Slides › Layout ▾ | ppt.slides |
| 4 | ppt-04-insert | Cả thanh Ribbon thẻ **Insert** | Thẻ Insert | ppt.textbox, ppt.shape, ppt.image |
| 5 | ppt-05-shapes-menu | Menu **Shapes** đang mở | Insert › Illustrations › Shapes ▾ | ppt.shape |
