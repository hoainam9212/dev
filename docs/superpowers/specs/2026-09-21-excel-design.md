# Giai đoạn 4 — Excel: bộ tính công thức, bảng tính mô phỏng và 20 bài học

Ngày 2026-09-21. Chi tiết hoá §7.5 của `2026-09-19-office-neko-design.md`. Nơi nào tài liệu này
khác bản gốc thì tài liệu này thắng, và chỗ khác đó đều được nêu lý do.

## 1. Chia giai đoạn

Excel lớn hơn Word (Word: 14 task). Giai đoạn 4 tách làm hai nhánh, mỗi nhánh có plan riêng và
gộp vào `master` riêng, để `master` luôn chạy thử được:

**4A — nền tảng và tính toán (~13 task).** Bộ tính công thức trọn vẹn, lưới, định dạng, và 12 bài:
ô/hàng/cột/sheet, nhập liệu, định dạng số và tiền VNĐ, dấu `=`, SUM/AVERAGE/MIN/MAX/COUNT/COUNTA,
ROUND, địa chỉ tương đối/tuyệt đối, IF.

**4B — tra cứu, dữ liệu và biểu đồ (~10 task).** SUMIF/COUNTIF/AVERAGEIF, VLOOKUP, hàm chữ,
sắp xếp và AutoFilter, bốn loại biểu đồ, 8 bài còn lại, dự án "Bảng lương 10 nhân viên",
mục từ điển và câu Hỏi Mèo.

Tổng 20 bài, đúng con số spec gốc.

## 2. Bộ tính công thức — `shared/src/formula/`

Thuần TypeScript, không phụ thuộc React, không phụ thuộc cấu trúc sổ tính.

| Tệp | Trách nhiệm |
|---|---|
| `refs.ts` | Phân tích và dựng lại địa chỉ: `A1`, `$A$1`, `A$1`, `B2:B10`, `Sheet2!A1`; đổi cột ↔ số; dịch địa chỉ khi copy/fill (`shiftRef`) |
| `lex.ts` | Chuỗi → token: số, chuỗi, địa chỉ, tên hàm, toán tử, dấu phẩy, ngoặc |
| `parse.ts` | Token → AST. Ưu tiên: `%` (hậu tố) > `^` > `* /` > `+ -` > `&` > `= <> < > <= >=`. Dấu trừ một ngôi. |
| `functions.ts` | 25 hàm, mỗi hàm là một `FormulaFn` thuần |
| `evaluate.ts` | AST + `CellSource` → `CellValue`; bắt tham chiếu vòng |
| `errors.ts` | 6 mã lỗi (5 mã của Excel + `#CIRC!` cho tham chiếu vòng) kèm giải thích và gợi ý sửa tiếng Việt |

### 2.1 Giao diện lõi

```ts
export type CellValue = number | string | boolean | FormulaError;
export type FormulaError = { err: '#DIV/0!' | '#N/A' | '#REF!' | '#NAME?' | '#VALUE!' | '#CIRC!' };

/** Trình tính chỉ biết "cho tôi ô này", không biết sổ tính trông ra sao. */
export interface CellSource {
  /** Chữ người dùng gõ trong ô, hoặc null nếu ô trống / ngoài lưới. */
  raw(sheet: string, row: number, col: number): string | null;
}

export function evaluateCell(src: CellSource, sheet: string, row: number, col: number): CellValue;
export function evaluateFormula(src: CellSource, sheet: string, text: string): CellValue;
```

Nhờ `CellSource`, mọi test của bộ tính chạy trên một `Map` chứ không cần dựng sổ tính, và lưới
không lọt được vào lõi.

### 2.2 Tính lại: toàn bộ theo yêu cầu, có memo — KHÁC spec gốc

Spec gốc ghi "đồ thị phụ thuộc, tính lại tăng dần". Ở đây bỏ đồ thị phụ thuộc.

Lý do: lưới chỉ 50×26 = 1.300 ô mỗi sheet. Tính lại tất cả sau mỗi hành động là vài chục micro-giây
trên máy học sinh, trong khi đồ thị phụ thuộc tăng dần là nguồn lỗi kinh điển (một ô không được báo
là phải tính lại thì màn hình hiện số cũ — mà bài học lại chấm đúng theo số đó). Thay vào đó:

- `evaluateCell` nhận một `Memo` (Map `sheet!r,c` → giá trị) và một `Set` "đang thăm".
- Gặp lại một ô đã nằm trong "đang thăm" → trả `#CIRC!`; đây chính là phát hiện tham chiếu vòng,
  và nó bắt buộc phải có, không phải tối ưu hoá.
- Giao diện tính một lượt cho vùng đang nhìn thấy, dùng chung một memo.

Nếu về sau đo được chậm thật thì tối ưu, lúc đó đã có sẵn bộ test làm lưới an toàn.

### 2.3 Hai mươi lăm hàm

`SUM AVERAGE MIN MAX COUNT COUNTA ROUND IF AND OR SUMIF COUNTIF AVERAGEIF VLOOKUP LEFT RIGHT MID
LEN UPPER LOWER PROPER TRIM CONCAT TODAY ABS`, cùng toán tử nối chuỗi `&`.

Quy ước trùng Excel thật, vì học xong phải dùng được ngoài đời:

- Hàm gộp số (`SUM`, `AVERAGE`, `MIN`, `MAX`) **bỏ qua** ô trống và ô chữ; `COUNT` chỉ đếm số,
  `COUNTA` đếm mọi ô không trống.
- `AVERAGE` trên vùng không có số nào → `#DIV/0!`.
- `VLOOKUP(giá trị, vùng, cột, [gần đúng])`: mặc định `TRUE` như Excel, nhưng **mọi bài học đều
  dạy `FALSE`**, và tra không thấy → `#N/A`. Cột vượt bề rộng vùng → `#REF!`.
- Điều kiện của `SUMIF`/`COUNTIF`/`AVERAGEIF` nhận số, chuỗi, hoặc chuỗi so sánh `">5"`, `"<=10"`,
  `"<>x"`. Không hỗ trợ ký tự đại diện `*` `?` — đây là giới hạn có chủ ý, ghi rõ trong bài học.
- `TODAY()` lấy ngày qua một tham số truyền vào trình tính (`now`), không gọi `Date.now()` trong lõi,
  nếu không test sẽ hỏng sau nửa đêm.
- Tên hàm không biết → `#NAME?`; kiểu sai (cộng chuỗi với số) → `#VALUE!`; chia không → `#DIV/0!`.

### 2.4 Lỗi nói tiếng Việt

```ts
export function explainError(err: FormulaError['err']): { what: string; fix: string };
```

Ví dụ `#DIV/0!` → what: "Công thức đang chia cho số không (hoặc chia cho ô trống)." / fix: "Kiểm tra
ô ở mẫu số, có thể ô đó chưa có dữ liệu."

Ngoài 6 mã lỗi, có một chẩn đoán riêng cho lỗi hay gặp nhất của người mới: gõ `SUM(A1:A5)` mà quên
dấu `=`. Ô đó theo Excel là **chữ**, không phải lỗi, nên không thể là `FormulaError`; hàm
`looksLikeForgottenEquals(raw)` trả về true để giao diện nhắc nhẹ "Bạn quên dấu = ở đầu công thức?".

## 3. Sổ tính — `shared/src/sims/excel/`

Chia theo nhóm hành động, đúng khuôn `sims/word/`:

`state.ts` (kiểu + reducer + undo), `edit.ts` (nhập, xoá, copy/paste, fill), `format.ts`
(định dạng số, chữ, màu, viền, gộp ô, độ rộng cột), `table.ts` (sắp xếp, AutoFilter),
`chart.ts` (biểu đồ), `grade.ts` (chấm bài), `index.ts`.

### 3.1 Trạng thái

```ts
export interface Cell {
  /** Đúng chữ người dùng gõ: "120000", "=SUM(B2:B5)", "Nguyễn Văn A". */
  raw: string;
  fmt?: CellFormat;
}
export interface CellFormat {
  numFmt?: 'general' | 'number' | 'currencyVnd' | 'percent' | 'date';
  decimals?: number;
  bold?: boolean; italic?: boolean;
  color?: string; fill?: string;
  align?: 'left' | 'center' | 'right';
  border?: 'none' | 'all' | 'outer';
}
export interface Sheet {
  name: string;
  /** Thưa: chỉ ô có nội dung. Khoá "r,c" đếm từ 0. */
  cells: Record<string, Cell>;
  colWidths?: Record<number, number>;
  merges?: Range[];
  filter?: { range: Range; conditions: Record<number, string[]> } | null;
  charts?: Chart[];
}
export interface WorkbookState {
  sheets: Sheet[];
  active: number;          // sheet đang mở
  sel: Range;              // vùng chọn; ô neo là sel.from
  editing: string | null;  // chữ đang gõ trên thanh công thức, null nếu không sửa
  past: Sheet[][];         // undo, tối đa 30 bước như Word
}
```

**Ô lưu chữ gõ vào, không lưu giá trị đã tính.** Undo trở nên tầm thường, `cellFormula` chấm được
chính xác công thức học sinh viết, và không bao giờ có chuyện giá trị lưu lệch với công thức.

### 3.2 Hành động

`setCell`, `setRaw` (đang gõ), `commitEdit`, `clear`, `select`, `selectRange`, `moveSel`,
`copy`, `paste`, `fillDown`, `fillRight`, `setFormat`, `merge`, `setColWidth`,
`addSheet`, `renameSheet`, `switchSheet`, `sortRange`, `setFilter`, `insertChart`, `removeChart`,
`undo`. Mỗi hành động sửa tài liệu đẩy một bản sao `sheets` vào `past`.

`paste` và `fillDown`/`fillRight` **dịch địa chỉ tương đối** qua `shiftRef` của `refs.ts`; đó là
điểm mấu chốt của bài "$ khoá ô", nên nó có test riêng.

## 4. Giao diện — `client/src/sims/excel/`

`ExcelSim.tsx` (bắc cầu reducer ↔ `onState`), `Grid.tsx`, `FormulaBar.tsx`, `SheetTabs.tsx`,
`RibbonHome.tsx`, `RibbonInsert.tsx`, `RibbonData.tsx`, `ChartView.tsx`, `FnTip.tsx`, `dialogs.tsx`.

- Lưới 50 hàng × 26 cột dựng bằng `div` + CSS grid, **không thêm thư viện**. Chỉ dựng phần nhìn
  thấy được (ước chừng 20×12) cộng đệm — 1.300 ô DOM cùng lúc làm cuộn giật trên máy yếu.
- Đầu hàng/cột bấm được để chọn cả hàng/cột; kéo chuột và Shift+click chọn vùng; fill handle ở
  góc dưới phải vùng chọn.
- Phím: mũi tên, Tab, Enter (xuống), F2 (sửa), Delete, Ctrl+C/V, Ctrl+Z, Escape (bỏ sửa).
- `FnTip` hiện khi chữ đang gõ khớp `=TÊNHÀM(`: tên hàm, danh sách đối số, **đối số đang gõ in đậm**,
  giải thích tiếng Việt, một ví dụ. Đây là thứ dạy học có giá trị nhất của cả giai đoạn, nên nó là
  một task riêng chứ không nhét kèm.
- Biểu đồ vẽ bằng SVG: `bar`, `column`, `line`, `pie`. Trục, nhãn và chú giải tự tính; không thư viện.
- Mọi nút ribbon có `helpId` để gợi ý bậc 2 chỉ đúng chỗ.

## 5. Chấm bài

Thêm `excel: gradeExcel` vào `GRADERS`. Sáu loại check:

```ts
export type ExcelCheck =
  | { kind: 'cellValue'; cell: string; value: string | number; sheet?: string }
  | { kind: 'cellFormula'; cell: string; fn?: string; range?: string; absolute?: boolean; contains?: string }
  | { kind: 'cellFormat'; cell: string; fmt: Partial<CellFormat> }
  | { kind: 'rangeSorted'; range: string; by: string; dir: 'asc' | 'desc' }
  | { kind: 'filterActive'; range: string; col: string }
  | { kind: 'chart'; type: Chart['type']; range: string };
```

`cellValue` so sánh **giá trị đã tính**, số so với sai số 1e-9, chữ bỏ qua hoa thường và khoảng
trắng thừa. `cellFormula` xét công thức: `fn` là hàm bắt buộc phải dùng, `range` là vùng phải trỏ
tới, `absolute: true` đòi có `$`. Nhờ vậy bài "dùng SUM chứ đừng cộng tay" chấm được đúng ý.

Mỗi check hỏng trả một câu tiếng Việt nói rõ sai ở đâu, như các sim trước.

## 6. Lộ trình 20 bài, 6 chương

**Chương 1 — Làm quen bảng tính (4A, 3 bài).** Ô, hàng, cột, sheet và Name Box; nhập số, chữ, ngày;
sửa và xoá ô.

**Chương 2 — Định dạng cho dễ đọc (4A, 3 bài).** Định dạng số và tiền VNĐ; đậm/nghiêng, màu, căn lề,
viền; độ rộng cột và gộp ô tiêu đề.

**Chương 3 — Công thức đầu tiên (4A, 3 bài).** Dấu `=` và bốn phép tính; SUM và AVERAGE;
MIN/MAX/COUNT/COUNTA và ROUND.

**Chương 4 — Ô nào cố định (4A, 3 bài).** Copy công thức và chuyện địa chỉ tự đổi; `$` khoá ô;
IF và câu điều kiện đầu tiên.

**Chương 5 — Đếm, cộng có điều kiện và tra cứu (4B, 4 bài).** COUNTIF; SUMIF và AVERAGEIF;
VLOOKUP tra bảng; hàm chữ LEFT/RIGHT/MID/LEN/UPPER/TRIM và toán tử `&`.

**Chương 6 — Sắp xếp, lọc, biểu đồ và dự án (4B, 4 bài).** Sắp xếp; AutoFilter; biểu đồ cột và tròn;
**dự án Bảng lương 10 nhân viên** chia 3 chặng (nhập và định dạng bảng → lương thực lĩnh bằng công
thức, phụ cấp bằng IF, xếp loại bằng VLOOKUP → sắp xếp, lọc và vẽ biểu đồ).

Mỗi bài theo khuôn đã dùng: vài bước `explain`, một `quiz`, một hoặc hai `practice`. Test nội dung
phát lại `solution` của từng bài qua đúng reducer mà giao diện dùng.

## 7. Kiểm thử

- `shared/src/formula/*.test.ts`: từng hàm, từng mã lỗi, ưu tiên toán tử, dịch địa chỉ, tham chiếu
  vòng, tham chiếu chéo sheet.
- `shared/src/sims/excel/*.test.ts`: reducer từng nhóm hành động, undo, chấm từng loại check.
- `client`: `ExcelSim` gõ được vào ô và báo trạng thái ra ngoài; `FnTip` in đậm đúng đối số;
  biểu đồ SVG dựng đúng số cột.
- `client/src/content/content.test.ts`: mọi bài Excel giải được.

## 8. Cố ý không làm

Không có: đóng băng dòng, định dạng có điều kiện, PivotTable, macro, nhiều cửa sổ, hàm ngày tháng
ngoài `TODAY`, ký tự đại diện trong điều kiện, tham chiếu vòng lặp có chủ ý, tự động hoàn thành tên
hàm khi gõ (chỉ có thẻ cú pháp sau khi gõ đủ `=TÊN(`).

Danh sách này để các phiên sau không tự ý thêm; muốn thêm thì hỏi người dùng.
