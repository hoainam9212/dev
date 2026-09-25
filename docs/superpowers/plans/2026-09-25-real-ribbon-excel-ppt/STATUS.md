# Ribbon giống Office thật — Excel + PowerPoint: tình trạng

Cập nhật 1 dòng sau mỗi task, trong cùng commit. Phiên mới đọc file này trước.

Nền: Word đã xong trên `feat/real-ribbon-pilot` (tip b249faf, client 309+ / shared 433+): ribbon Word kiểu office,
nút ← Quay lại, `nativeTitle`, `realShot` cho 11 bài Word, `real-shots.mjs` + `blur-names.ps1`.

| Task | Xong | Commit | Ghi chú / việc còn treo |
|---|---|---|---|
| 1 vỏ ribbon chung | ☑ | (commit này) | 5 test mới, client 314. Word dùng `RibbonTabs`/`RibbonPanel`/`activeTab`, `Swatched`/`Labeled` chỉ còn một bản trong `components/ribbon.tsx`; test Word cũ không đổi. Đã học `word.image` bằng chuột: Picture Format chữ rgb(24,90,189), mọi thẻ cao 102px. Pane trong app dùng được server 5174 của phiên khác qua `preview_start {url}` |
| 2 Excel Home | ☑ | (commit này) | client 318. Home = Undo \| Clipboard \| Font \| Alignment \| Number \| Editing, Borders ▾ / Fill ▾ / Clear ▾ là `MenuButton`. aria-label Excel nay tiếng Việt thuần ("In đậm", "Gộp ô"); test "nút mang ký hiệu" đòi `svg` thay chữ "B". Lời bài 4 file + FAQ + 18 mục help-ids theo mẫu. **Không ghi Ctrl+D** cho Fill Down — sim chưa bắt phím đó. Học bằng chuột `excel.numfmt`, `excel.copy` tới "Giỏi quá!"; menu không cắt; 375px không tràn. Thẻ Formulas còn cao 127px (kiểu cũ) — Task 3 |
| 3 Excel Formulas + File | ☐ | | |
| 4 Excel Sort & Filter | ☐ | | |
| 5 Excel Charts | ☐ | | |
| 6 PPT Home + File | ☐ | | |
| 7 PPT Insert + hình thu nhỏ | ☐ | | |
| 8 danh sách chụp | ☐ | | |
| 9 ảnh Excel [chờ ảnh] | ☐ | | |
| 10 ảnh PPT [chờ ảnh] | ☐ | | |
| 11 tổng kết + gộp | ☐ | | |
