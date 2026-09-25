# Ảnh chụp Word thật — danh sách chụp

Word 365 **tiếng Anh**, cửa sổ phóng to hết màn hình, chụp bằng Win + Shift + S rồi dán vào Excel:
**mỗi ảnh một sheet, đúng thứ tự dưới đây** (Sheet1 = ảnh 1…). Tên sheet không quan trọng, thứ tự thì có.
Nhận file xong chạy: `node client/scripts/real-shots.mjs "<file>.xlsx"` → ảnh vào `client/public/images/real/`
(sheet trống bị bỏ qua). Rồi **bắt buộc** chạy `powershell -File client/scripts/blur-names.ps1` để làm mờ tên
tài khoản trên thanh tiêu đề và email trên màn hình Save As; chụp lại ảnh nào thì xem lại khung mờ của ảnh đó.

| Sheet | Chụp gì | Cách mở trên Word | Dùng cho bài |
|---|---|---|---|
| 1 | Cả cửa sổ Word, tài liệu trống | Mở Word → Blank document, để ở thẻ Home | word.intro |
| 2 | Cả thanh Ribbon thẻ **Home**, từ Undo tới Editing | Thẻ Home. Nếu không thấy nhóm Editing thì kéo rộng cửa sổ | word.bold, word.font, word.color, word.align, word.list, word.heading, word.find |
| 3 | Menu **Line Spacing** đang mở | Home › Paragraph › nút Line and Paragraph Spacing (mũi tên ↕) | word.spacing |
| 4 | Hộp thoại **Find and Replace**, thẻ Replace | Home › Editing › Replace (hoặc Ctrl + H) | word.find |
| 5 | Cả thanh Ribbon thẻ **Insert** | Thẻ Insert | word.table, word.image |
| 6 | Menu **Table** đang mở, rê chuột tô 2 cột × 3 hàng | Insert › Table, rê chuột trên lưới (chưa bấm) | word.table |
| 7 | Cả thanh Ribbon thẻ **Picture Format** | Chèn một ảnh bất kỳ, bấm chọn ảnh đó | word.image |
| 8 | Cả thanh Ribbon thẻ **References** | Thẻ References | word.toc |
| 9 | Màn hình **File › Save As** | Thẻ File › Save As (hoặc Save a Copy) | word.project |

Không cần ảnh cho word.edit, word.select (chỉ gõ và bôi đen trong trang).
