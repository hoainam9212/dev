# Ảnh chụp Excel thật — danh sách chụp

Excel 365 **tiếng Anh**, cửa sổ phóng to hết màn hình, chụp bằng Win + Shift + S rồi dán vào một file Excel:
**mỗi ảnh một sheet, đúng thứ tự dưới đây** (Sheet1 = ảnh 1…). Tên sheet không quan trọng, thứ tự thì có.
Nhận file xong chạy: `node client/scripts/real-shots.mjs excel "<file>.xlsx"` → ảnh vào `client/public/images/real/`
với tên ở cột "Tên file" (sheet trống bị bỏ qua). Rồi **bắt buộc** chạy `powershell -File client/scripts/blur-names.ps1`
để làm mờ tên tài khoản trên thanh tiêu đề và email trên màn hình Save As (khung mờ của ảnh Excel thêm vào script
khi có ảnh; chụp lại ảnh nào thì xem lại khung mờ của ảnh đó).

| Sheet | Tên file | Chụp gì | Cách mở trên Excel | Dùng cho bài |
|---|---|---|---|---|
| 1 | excel-01-window | Cả cửa sổ Excel, sổ trống | Mở Excel → Blank workbook, để ở thẻ Home | excel.intro, excel.sheet, excel.equals |
| 2 | excel-02-home | Cả thanh Ribbon thẻ **Home**, từ Undo tới Editing | Thẻ Home. Nếu không thấy nhóm Editing thì kéo rộng cửa sổ | excel.numfmt, excel.look, excel.width, excel.project |
| 3 | excel-03-fill-menu | Menu **Fill** đang mở | Home › Editing › Fill ▾ | excel.copy, excel.absolute |
| 4 | excel-04-formulas | Cả thanh Ribbon thẻ **Formulas** | Thẻ Formulas | excel.if, excel.countif, excel.sumif, excel.vlookup, excel.text |
| 5 | excel-05-autosum-menu | Menu **AutoSum** đang mở | Formulas › Function Library › AutoSum ▾ | excel.sum, excel.stats |
| 6 | excel-06-data | Cả thanh Ribbon thẻ **Data** | Thẻ Data | excel.sort, excel.filter |
| 7 | excel-07-sort-dialog | Hộp thoại **Sort** | Gõ vài dòng dữ liệu có tiêu đề, chọn vùng, Data › Sort & Filter › Sort | excel.sort |
| 8 | excel-08-filter-menu | Menu lọc của một cột đang mở | Chọn bảng có tiêu đề, Data › Sort & Filter › Filter, bấm ▾ ở ô tiêu đề | excel.filter |
| 9 | excel-09-insert | Cả thanh Ribbon thẻ **Insert** | Thẻ Insert | excel.chart |
| 10 | excel-10-column-menu | Menu **Insert Column or Bar Chart** đang mở | Insert › Charts › nút biểu đồ cột ▾ | excel.chart |
| 11 | excel-11-save-as | Màn hình **File › Save As** | Thẻ File › Save As (hoặc Save a Copy) | excel.project |

Không cần ảnh cho excel.enter (chỉ gõ trong ô).
