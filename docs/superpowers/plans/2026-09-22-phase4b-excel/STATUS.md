# Giai đoạn 4B (Excel: tra cứu, dữ liệu, biểu đồ) – tình trạng

**XONG toàn bộ 9/9 task, 2026-09-22.** Lộ trình Excel đủ 20 bài / 7 chương. Giai đoạn kế tiếp là 5 (PowerPoint) — chưa có plan.

Cập nhật 1 dòng sau mỗi task, trong cùng commit của task đó. Phiên mới đọc file này trước, không đọc lại các file task đã xong.

Nền: 4A đã lên `master` (tip `d125e6b`), shared 330 + client 224 test.

| Task | Xong | Commit | Ghi chú / việc còn treo |
|---|---|---|---|
| 1 sortRange | ☑ | (commit này) | 11 test. Sắp xếp đổi chỗ **cả object `Cell`** nên định dạng đi theo hàng; ô nguồn trống thì `delete` ô đích, kẻo dữ liệu cũ sót lại. `isSorted` dùng chung cho grader Task 3 |
| 2 AutoFilter | ☑ | (commit này) | 9 test. `conditions` khoá theo **chỉ số cột**, giá trị `[]` là bỏ lọc cột đó. `filterOptions`/`hiddenRows` bỏ hàng tiêu đề (hàng đầu của vùng). So sánh theo chữ hiển thị đã trim, không phân biệt hoa thường |
| 3 chart + grader | ☑ | (commit này) | 12 test. Hết phần `shared` của 4B. `chartData` vùng một cột thì lấy địa chỉ ô làm nhãn; ô chữ/ô lỗi coi là 0. Check dùng `chartType`, không phải `type` |
| 4 tab Data | ☑ | (commit này) | 11 test. **Route tạm `/dev/excel` + `pages/DevExcelPage.tsx` — Task 7 PHẢI xoá.** Đã thử thật: sắp A→Z (tên đi theo lương), lọc cột C (số hàng nhảy 1,4,5), tắt lọc |
| 5 ChartView + tab Insert | ☑ | (commit này) | 12 test. Hết phần giao diện 4B. `SoonTab` đã xoá (cả sáu tab có nội dung thật). Nhãn dài cắt còn 12 ký tự, tên đầy đủ nằm trong `aria-label` |
| 6 Bài chương 5 | ☑ | (commit này) | 4 bài, track Excel 16 bài / 5 chương. Đã học thật bài VLOOKUP tới lúc chấm đạt. **5 mục từ điển của chương 6 (sap-xep, loc, bieu-do, bieu-do-cot, bieu-do-tron) đang để `lessonIds: []`** — Task 7 phải điền, vì test bắt lessonIds trỏ tới bài CÓ THẬT |
| 7 Bài chương 6 | ☑ | (commit này) | 3 bài, track Excel 19 bài / 6 chương. Đã xoá route tạm `/dev/excel`. Đã học thật bài sắp xếp và bài biểu đồ tới lúc chấm đạt |
| 8 Dự án Bảng lương | ☑ | (commit này) | 3 chặng, track Excel **20 bài / 7 chương** (spec nói 6 chương; ta có 7 vì tách 'Ô nào cố định' riêng). Đã làm thật cả ba chặng bằng ribbon trên trình duyệt |
| 9 Từ điển + tổng kết + gộp | ☑ | (commit này) | 10 mục từ điển + 11 câu Hỏi Mèo cho 4B; README; đã thử Hỏi Mèo gõ không dấu |

## Quyết định đã chốt

- 2026-09-21 (spec): không có đồ thị phụ thuộc; ô chỉ lưu `raw`; `VLOOKUP` mặc định TRUE như Excel thật nhưng bài học luôn dạy FALSE; điều kiện `SUMIF`/`COUNTIF` **không** hỗ trợ ký tự đại diện `*` `?`.
- 2026-09-22: **sắp xếp đổi chỗ `raw`**, không sắp xếp giá trị hiển thị — nhờ vậy công thức trong hàng vẫn đi theo hàng.
- 2026-09-22: **lọc chỉ ẩn hàng khi vẽ**, không xoá dữ liệu; `SUM` vẫn cộng cả hàng đang ẩn (đúng như Excel với hàm thường, và đó là một điểm dạy học).

## Lỗi bắt được khi nhìn ảnh chụp (không test nào thấy)

- **Task 4: menu lọc bị khung cuộn cắt cụt.** Hàng nút ribbon có `overflow-x: auto`, mà `overflow-x: auto` **cũng cắt
  theo chiều dọc** — menu thả xuống (110px) bị cụt ở đáy khung (126px). jsdom không có layout nên 11 test vẫn xanh.
  Đã sửa bằng cách đưa `FilterMenu` ra **ngoài** khung cuộn (một khối nằm dưới hàng nút), không dùng `absolute` nữa.
  **Task 5 để ý:** `RibbonInsert` cũng nằm trong khung cuộn đó — đừng đặt thứ gì thả xuống bên trong.
- **Test cũ đổ vỡ khi tab có nội dung thật:** `Ribbon.test.tsx` dùng tab **Data** làm ví dụ "tab chưa có gì" → Task 4
  đổi sang **Insert** → Task 5 lại đổ vỡ, giờ đổi sang **View** và xoá hẳn `SoonTab` vì cả sáu tab đã có nội dung.
- **Task 5: nhãn tiếng Việt tràn ra ngoài khung SVG.** Thanh ngang vẽ nhãn từ `x=36` hướng trái nên "Nguyễn Văn Nam"
  (~70px) chạy tới `x≈-34`; biểu đồ đường có điểm cuối sát mép phải, nhãn căn giữa tràn ra ~35px. **Số đo tỉ lệ cột
  vẫn đúng tuyệt đối nên không test nào kêu** — phải ĐỌC mã SVG xuất ra mới thấy. Đã sửa: thanh ngang chừa 104px bên
  trái và neo nhãn căn trái, đường thì nhãn đầu `anchor=start` / cuối `anchor=end`, mọi nhãn cắt còn 12 ký tự.
  Cách kiểm lại: duyệt mọi `<text>` trong SVG, so `getBBox()` với `viewBox` — phải không có cái nào lọt ra ngoài.

## Lỗi thiết kế do bài dự án phơi ra

- **Task 1 sắp xếp KHÔNG dịch địa chỉ tương đối — sai.** Hàng mang `=C3+E3` tụt xuống hàng 5 mà công thức vẫn trỏ
  hàng 3, nên lương ghép nhầm sang tên người khác. Test cũ của Task 1 lại khẳng định đúng cái hành vi sai đó
  (`expect(cellRaw(s,'B1')).toBe('=A2*10')`), nên không ai kêu — mãi tới khi chặng 3 của dự án chấm `rangeSorted`
  mới lộ. Excel thật cũng chỉnh địa chỉ khi sắp xếp. Đã sửa `writeRows` dịch công thức theo độ lệch hàng, và viết lại
  test cho đúng; thêm test riêng khẳng định địa chỉ có `$` KHÔNG dịch — đúng lý do bài học bắt khoá bảng tra.
- Bài học: **một test có thể khoá chặt hành vi sai**. Test xanh chỉ chứng minh code làm đúng điều test nói, không
  chứng minh điều đó đúng.

## Việc còn treo (ai phát hiện thì ghi vào đây, đừng sửa lạc task)

- Từ 4A: gợi ý bậc 2 trỏ vào một ô cụ thể (`spotlight: { cell }`) chưa thử với lưới cuộn được; `SpotlightOverlay` hỏi lại vị trí mỗi 250 ms.
- Từ 4A: PWA ngoại tuyến chưa kiểm lại từ sau multi-profile (`npm run preview` rồi ngắt mạng).
- Từ giai đoạn 3, chưa xếp lịch: bài cho vỏ máy tính (Start/Taskbar/Dock/Spotlight); một lượt rà soát trợ năng cho toàn bộ sim; bàn phím ảo theo HĐH; Shift+click chọn dải trong vùng file.
- Sau 4B là giai đoạn 5 (PowerPoint) — chưa có plan.
- **Cố ý KHÔNG làm ở 4B** (ghi để ai sau khỏi tưởng bỏ sót): không chấm việc đã Lưu tệp (cần thêm loại check mới);
  biểu đồ không có trục số/lưới ngang, chỉ có nhãn; lọc chỉ chọn theo danh sách giá trị, không có lọc theo điều kiện
  số (">5"); sắp xếp chỉ theo MỘT cột, không có sắp nhiều tầng.
