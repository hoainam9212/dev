# Giai đoạn 4A (Excel nền tảng) – tình trạng

**XONG toàn bộ 13/13 task, 2026-09-21.** Việc kế tiếp là plan 4B (VLOOKUP, SUMIF, hàm chữ, sắp xếp/lọc, biểu đồ, dự án Bảng lương, 8 bài) — chưa có.

Cập nhật 1 dòng sau mỗi task, trong cùng commit của task đó. Phiên mới đọc file này trước, không đọc lại các file task đã xong.

| Task | Xong | Commit | Ghi chú / việc còn treo |
|---|---|---|---|
| 1 refs | ☑ | (commit này) | 11 test; `shiftFormula` quét regex 3 nhánh (chuỗi → tên hàm → địa chỉ), Task 7 dùng lại, đừng viết regex mới |
| 2 lex + parse | ☑ | (commit này) | 11 test; `lex` thử vùng → ô → tên theo đúng thứ tự đó, và giữ `#REF!` lại làm `name` để Task 3 đổi thành lỗi |
| 3 evaluate | ☑ | (commit này) | 14 test. Bảng hàm cắm vào bằng `registerFunctions()` chứ không import thẳng — `functions.ts` phải import `evaluate`, nên import ngược sẽ thành vòng. Task 4 gọi nó lúc nạp module |
| 4 functions | ☑ | (commit này) | 19 test, đủ 25 hàm. `isErr` nhận `unknown` để thu hẹp được cả `number[] \| FormulaError` |
| 5 errors + numfmt | ☑ | (commit này) | 12 test; `CellFormat` định nghĩa tại `numfmt.ts`, Task 6–8 import lại từ đó |
| 6 workbook | ☑ | (commit này) | 12 test. `withEdit`/`withSheets` là cổng DUY NHẤT đẩy lịch sử |
| 7 copy + fill | ☑ | (commit này) | 10 test. Clipboard nhớ cả `origin` nên độ dịch là phép trừ, không phải đoán |
| 8 format + sheets | ☑ | (commit này) | 13 test. Hết phần `shared` trừ grader; Task 9 là `gradeExcel` rồi sang giao diện |
| 9 grader | ☑ | (commit này) | 12 test. **Plan ghi sai chữ ký:** `Grader` trong codebase là MỘT check một lần, `gradeWith` mới gộp — `gradeExcel(state, check)` chứ không phải `(state, checks[])` |
| 10 grid | ☑ | (commit này) | 13 test. Lưới dựng cửa sổ 18×10 quanh ô chọn. **Route tạm `/dev/excel` + `pages/DevExcelPage.tsx` — Task 12 PHẢI xoá.** Gợi ý bậc 2 trỏ vào ô chưa thử |
| 11 ribbon Home | ☑ | (commit này) | 13 test, 26 helpId mới. Đã thử thật: tiền VNĐ, in đậm (nút sáng đúng), thêm sheet |
| 12 FnTip + chương 1 | ☑ | (commit này) | 7 test FnTip + 3 bài. Đã xoá route tạm `/dev/excel`. Đã học thật bài `excel.sheet` tới lúc chấm đạt |
| 13 chương 2–4 + tổng kết | ☑ | (commit này) | 9 bài, đủ 12 bài / 4 chương; 14 mục từ điển + 12 câu Hỏi Mèo cho Excel; README |

## Quyết định đã chốt

- 2026-09-21 (spec): **không có đồ thị phụ thuộc**. Tính theo yêu cầu, memo + tập "đang thăm" để bắt tham chiếu vòng. Lưới 1.300 ô, tính lại toàn bộ là đủ nhanh và ít lỗi hơn nhiều.
- 2026-09-21 (spec): ô lưu `raw` (chữ người dùng gõ), **không lưu giá trị đã tính**.
- 2026-09-21 (spec): `VLOOKUP` mặc định `TRUE` như Excel thật, nhưng mọi bài học đều dạy `FALSE`.
- 2026-09-21 (spec): điều kiện `SUMIF`/`COUNTIF` **không** hỗ trợ ký tự đại diện `*` `?`; giới hạn có chủ ý, nói rõ trong bài.

## Đính chính plan (phát hiện khi làm)

- **Task 3 nói sai một chỗ:** không phải việc xoá khoá khỏi `visiting` giữ cho "hai ô cùng trỏ vào ô thứ ba"
  khỏi bị báo nhầm là vòng — mà là `memo`. Đã thử bỏ hẳn dòng `visiting.delete` và **toàn bộ test vẫn xanh**.
  Dòng đó giữ lại chỉ để dọn dẹp. Test "hai ô cùng trỏ vào một ô thứ ba" vì vậy ghi lại hành vi, không canh được dòng nào.
- **Task 4 nói sai một chỗ:** `IF` tính sẵn cả hai nhánh nhưng lỗi ở nhánh KHÔNG được chọn vẫn không lọt ra,
  vì `IF` chỉ trả về đúng nhánh đã chọn. Chỉ lỗi ở chính ĐIỀU KIỆN mới lan lên. Vậy `=IF(A1=0,0,10/A1)` **chạy đúng**;
  cấm dùng mẫu đó trong bài học là thừa, bỏ lệnh cấm ấy đi.

- **Kiểu "đăng ký" của Task 6 đã bị gỡ (Task 7).** `registerReducers()` chỉ chạy khi ai đó nạp `index.ts`, mà test
  import thẳng `./state` nên nhánh action mới im lặng không hoạt động — 8 test đỏ không rõ lý do. Nay `state.ts`
  gọi thẳng `reduceEdit`/`reduceFormat`; import vòng giữa chúng là cố ý và an toàn vì cả hai phía đều là khai báo hàm.
  (`registerFunctions` của Task 3–4 thì vẫn giữ: ở đó `functions.ts` nạp qua barrel `formula/index.ts` nên không vướng.)

- **Lỗi thật bắt được khi thử trên trình duyệt (Task 10):** gõ một ký tự vào lưới thì ô vào chế độ sửa nhưng con trỏ
  vẫn ở lưới, nên mọi ký tự sau đó rơi vào hư không; lưới lại không xử lý Enter. jsdom bắn sự kiện thẳng vào thanh
  công thức nên 10 test đầu đều xanh mà tính năng vẫn hỏng. Đã sửa (chuyển con trỏ sang thanh công thức khi bắt đầu
  sửa, trả về lưới khi xong) và thêm 3 test canh đúng chỗ đó.

- **Hai lỗi thật do `content.test.ts` và trình duyệt bắt (Task 12):**
  (a) **tên sheet tiếng Việt có dấu làm hỏng công thức** — bộ tách token chỉ nhận `[A-Za-z]`, nên `=Báo cáo!B1`
  thành `#NAME?`. Đã đổi phần tên sheet sang `\p{L}` (địa chỉ ô vẫn ASCII vì cột chỉ có A–Z) và thêm test.
  (b) câu chấm hiện **"✅ ✅"** vì `PracticeView` đã tự thêm dấu — `gradeWord` không hề gắn ✅, chỉ grader Excel gắn. Đã bỏ.
- Cú pháp liên kết từ điển trong bài là `[[id|chữ hiện ra]]`, không phải `[[chữ]]`.

- **Lỗi người dùng chỉ ra sau khi gộp nhánh:** lưới không có đường kẻ ô nào. `.cellbox`/`.gridhead` bị chèn nhầm
  vào TRONG khối `:root[data-motion="reduce"]` (chèn ngay trước dấu `}` cuối file) nên không bao giờ có hiệu lực.
  `theme.test.ts` cũ vẫn xanh vì nó chỉ hỏi "chuỗi lớp có nằm trong layer không", không hỏi lớp đó ở CẤP NÀO.
  Đã thêm test đòi mọi lớp thành phần nằm ở cấp đầu của `@layer components`.

- **Ribbon Excel làm lại (người dùng chỉ ra sau khi gộp):** bản đầu là một bức tường nút bo tròn giống hệt nhau,
  nhãn tiếng Việt dài — không giống Excel, và lạc khỏi chính ribbon Word của app. Nay dùng ĐÚNG khuôn Word:
  thanh tab File/Home/Insert/Formulas/Data/View, nút vuông nhỏ mang ký hiệu (B, I, ⬅, ⤓) với lời tiếng Việt ở
  tooltip + helpId, ô thả xuống cho kiểu số và màu. Tab **Formulas** chèn sẵn `=TÊN(` để thẻ cú pháp bật lên;
  tab **File** có hộp thoại Lưu/In mô phỏng (`saved`, `printed`, `dialog` mới trong `WorkbookState`).
  Insert/Data/View nói rõ "sẽ có ở phần sau" thay vì để trống.

## Việc còn treo (ai phát hiện thì ghi vào đây, đừng sửa lạc task)

- Từ giai đoạn 3 để lại, **chưa xếp lịch**: bài cho vỏ máy tính (Start/Taskbar/Dock/Spotlight); một lượt rà soát trợ năng cho toàn bộ sim; bàn phím ảo theo HĐH; Shift+click chọn dải trong vùng file; `SpotlightOverlay` hỏi lại mỗi 250 ms (**sẽ cắn ở lưới Excel** — Task 10 phải để ý).
- PWA ngoại tuyến chưa kiểm lại từ sau multi-profile (`npm run preview` rồi ngắt mạng).
- 4B (VLOOKUP, SUMIF, hàm chữ, sắp xếp/lọc, biểu đồ, dự án Bảng lương, 8 bài) chưa có plan.
