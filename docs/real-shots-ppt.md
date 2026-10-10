# Ảnh chụp PowerPoint thật — danh sách chụp

PowerPoint **tiếng Anh**, **không** phóng to hết màn hình: bài học hiện ảnh trong khung rộng khoảng 970 px. Đã chụp
2026-10-10 trên PowerPoint 2019 (en-us) ở 96 DPI: cửa sổ 1000×650; thẻ Home ở cửa sổ 1350 px (nhóm Slides và Drawing
mới hiện đủ chữ) rồi cắt sau nhóm Drawing → 1018 px; menu cắt từ dưới hàng thẻ. Khung đỏ lấy từ toạ độ UI Automation;
cột hình thu nhỏ và khung tiêu đề không có trong UI Automation nên đo theo điểm ảnh.

Chụp lại bằng tay thì dùng Win + Shift + S rồi dán vào một file Excel: **mỗi ảnh một sheet, đúng thứ tự dưới đây**
(Sheet1 = ảnh 1…). Nhận file xong chạy: `node client/scripts/real-shots.mjs ppt "<file>.xlsx"` → ảnh vào
`client/public/images/real/` với tên ở cột "Tên file" (sheet trống bị bỏ qua). Rồi **bắt buộc** chạy
`powershell -File client/scripts/blur-names.ps1` để làm mờ tên tài khoản trên thanh tiêu đề (chụp lại ảnh nào thì
xem lại khung mờ và khung đỏ của ảnh đó).

| Sheet | Tên file | Chụp gì | Cách mở trên PowerPoint | Dùng cho bài |
|---|---|---|---|---|
| 1 | ppt-01-window | Cả cửa sổ PowerPoint, bài trống | Mở PowerPoint → Blank Presentation, để ở thẻ Home | ppt.intro, ppt.title |
| 2 | ppt-02-home | Cả thanh Ribbon thẻ **Home**, từ Undo tới Drawing | Thẻ Home. Nếu nhóm Drawing bị thu gọn thì kéo rộng cửa sổ | ppt.slides, ppt.shape |
| 3 | ppt-03-layout-menu | Menu **Layout** đang mở | Home › Slides › Layout ▾ | ppt.slides |
| 4 | ppt-04-insert | Cả thanh Ribbon thẻ **Insert** | Thẻ Insert | ppt.textbox, ppt.shape, ppt.image |
| 5 | ppt-05-shapes-menu | Menu **Shapes** đang mở | Insert › Illustrations › Shapes ▾ | ppt.shape |
| 6 | ppt-06-design | Thanh Ribbon thẻ **Design** (Themes, Variants, Customize), 1000×160 | Bài 3 slide, thẻ Design | ppt.theme |
| 7 | ppt-07-transitions | Thanh Ribbon thẻ **Transitions**, 1000×160. Trên Office 2019, Zoom không ở hàng đầu bộ sưu tập mà trong nút More ▾ | Thẻ Transitions | ppt.transition |
| 8 | ppt-08-slideshow | Thanh Ribbon thẻ **Slide Show**, 1000×160 | Thẻ Slide Show | ppt.present |