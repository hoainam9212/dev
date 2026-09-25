import type { Lesson } from '@office-neko/shared';
import { excelPractice } from '../lessonKit';

/** Bảng dùng chung cả chương: bốn nhân viên, phòng ban và lương. */
const STAFF = {
  A1: 'Nhân viên', B1: 'Phòng', C1: 'Lương',
  A2: 'Nguyễn Văn Nam', B2: 'Kế toán', C2: '7500000',
  A3: 'Trần Thị Lan', B3: 'Kinh doanh', C3: '6200000',
  A4: 'Lê Minh Tú', B4: 'Kế toán', C4: '8100000',
  A5: 'Phạm Thu Hà', B5: 'Kinh doanh', C5: '5500000',
};

/** Chương 5 — Đếm, cộng có điều kiện và tra cứu. */
export const EXCEL_LOOKUP: Lesson[] = [
  {
    id: 'excel.countif',
    trackId: 'excel',
    chapterId: 'excel.cond',
    title: 'Đếm có điều kiện với COUNTIF',
    minutes: 10,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body: 'COUNT đếm mọi ô có số. Nhưng nếu sếp hỏi "phòng Kế toán có mấy người?" thì ta cần đếm **có chọn lọc** — đó là việc của [[countif|COUNTIF]].',
      },
      {
        kind: 'explain',
        body: 'Viết là `=COUNTIF(vùng xét, điều kiện)`. Ví dụ `=COUNTIF(B2:B5,"Kế toán")` đọc là: trong vùng B2:B5, đếm xem có bao nhiêu ô ghi đúng chữ Kế toán. Chữ nghĩa phải bỏ trong nháy kép.',
      },
      {
        kind: 'explain',
        body: 'Điều kiện cũng có thể là phép so sánh, cũng bỏ trong nháy kép: `">6000000"` là đếm những ô lớn hơn sáu triệu. Lưu ý ở bảng tính mô phỏng này: **không dùng được dấu sao** để tìm gần đúng, hãy gõ đủ chữ.',
      },
      {
        kind: 'quiz',
        question: 'Công thức =COUNTIF(B2:B5,"Kế toán") cho biết điều gì?',
        choices: [
          'Có bao nhiêu ô trong B2:B5 ghi Kế toán',
          'Tổng lương của phòng Kế toán',
          'Ô đầu tiên ghi Kế toán nằm ở đâu',
          'Có bao nhiêu ô không phải Kế toán',
        ],
        answer: 0,
        why: 'COUNTIF chỉ ĐẾM SỐ Ô thoả điều kiện. Muốn cộng tiền thì dùng SUMIF, học ở bài sau.',
      },
      excelPractice({
        cells: { ...STAFF, A7: 'Số người phòng Kế toán', A8: 'Số người lương trên 6 triệu' },
        task: 'Ở ô **C7** đếm số người phòng **Kế toán**. Ở ô **C8** đếm số người có lương **trên 6.000.000**.',
        checks: [
          { kind: 'cellFormula', cell: 'C7', fn: 'COUNTIF', range: 'B2:B5' },
          { kind: 'cellValue', cell: 'C7', value: 2 },
          { kind: 'cellValue', cell: 'C8', value: 3 },
        ],
        spotlight: { cell: 'C7' },
        hint: 'Ô C7 gõ =COUNTIF(B2:B5,"Kế toán"). Ô C8 dùng điều kiện ">6000000".',
        steps: [
          'Bấm ô C7, gõ =COUNTIF(B2:B5,"Kế toán") rồi Enter.',
          'Bấm ô C8, gõ =COUNTIF(C2:C5,">6000000") rồi Enter.',
        ],
        solve: () => [
          { type: 'setCell', cell: 'C7', raw: '=COUNTIF(B2:B5,"Kế toán")' },
          { type: 'setCell', cell: 'C8', raw: '=COUNTIF(C2:C5,">6000000")' },
        ],
      }),
    ],
  },
  {
    id: 'excel.sumif',
    trackId: 'excel',
    chapterId: 'excel.cond',
    title: 'Cộng và tính trung bình có điều kiện',
    minutes: 12,
    steps: [
      {
        kind: 'explain',
        body: 'Đếm được rồi thì cộng cũng được: [[sumif|SUMIF]] cộng tiền của **những dòng thoả điều kiện**, bỏ qua các dòng khác.',
      },
      {
        kind: 'explain',
        body: 'SUMIF có **ba** phần: `=SUMIF(vùng xét, điều kiện, vùng cộng)`. Vùng xét là chỗ đem ra so (cột Phòng), còn vùng cộng là chỗ lấy số (cột Lương). Hai vùng phải **cùng số dòng**, nếu không sẽ lệch.',
      },
      {
        kind: 'explain',
        body: 'AVERAGEIF viết y hệt nhưng cho ra trung bình thay vì tổng. Nhớ: cả hai hàm đều **không** hỗ trợ dấu sao trong điều kiện ở bảng tính mô phỏng này.',
      },
      {
        kind: 'quiz',
        question: 'Trong =SUMIF(B2:B5,"Kế toán",C2:C5), vùng C2:C5 đóng vai trò gì?',
        choices: [
          'Vùng chứa số sẽ được cộng lại',
          'Vùng đem ra so với điều kiện',
          'Vùng ghi kết quả',
          'Không dùng đến',
        ],
        answer: 0,
        why: 'Phần đầu là vùng xét điều kiện, phần cuối là vùng lấy số để cộng. Dòng nào thoả thì số ở vùng cuối được cộng vào.',
      },
      excelPractice({
        cells: { ...STAFF, A7: 'Tổng lương Kế toán', A8: 'Lương trung bình Kinh doanh' },
        task: 'Ô **C7**: tổng lương phòng **Kế toán**. Ô **C8**: lương trung bình phòng **Kinh doanh**.',
        checks: [
          { kind: 'cellFormula', cell: 'C7', fn: 'SUMIF', range: 'B2:B5' },
          { kind: 'cellValue', cell: 'C7', value: 15600000 },
          { kind: 'cellFormula', cell: 'C8', fn: 'AVERAGEIF' },
          { kind: 'cellValue', cell: 'C8', value: 5850000 },
        ],
        spotlight: { cell: 'C7' },
        hint: 'Ba phần: vùng xét B2:B5, điều kiện trong nháy kép, vùng cộng C2:C5.',
        steps: [
          'Ô C7 gõ =SUMIF(B2:B5,"Kế toán",C2:C5) rồi Enter.',
          'Ô C8 gõ =AVERAGEIF(B2:B5,"Kinh doanh",C2:C5) rồi Enter.',
        ],
        solve: () => [
          { type: 'setCell', cell: 'C7', raw: '=SUMIF(B2:B5,"Kế toán",C2:C5)' },
          { type: 'setCell', cell: 'C8', raw: '=AVERAGEIF(B2:B5,"Kinh doanh",C2:C5)' },
        ],
      }),
    ],
  },
  {
    id: 'excel.vlookup',
    trackId: 'excel',
    chapterId: 'excel.cond',
    title: 'VLOOKUP tra bảng',
    minutes: 14,
    steps: [
      {
        kind: 'explain',
        mood: 'surprised',
        body: 'Đây là hàm nổi tiếng nhất Excel, và cũng là hàm khiến nhiều người sợ nhất. Thật ra [[vlookup|VLOOKUP]] chỉ làm một việc rất đời thường: **tra bảng**, y như tra từ điển.',
      },
      {
        kind: 'explain',
        body: 'Bạn có một [[bang-tra|bảng tra]]: mã **A** nghĩa là Giỏi, **B** là Khá, **C** là Trung bình. Trong bảng lương chỉ ghi mã. VLOOKUP cầm cái mã đó, đi tìm trong bảng tra, rồi mang chữ tương ứng về.',
      },
      {
        kind: 'explain',
        body: 'Bốn phần: `=VLOOKUP(giá trị cần tra, bảng tra, cột lấy về, FALSE)`. **Cột đầu tiên của bảng tra bắt buộc chứa thứ cần tìm**. Số 2 nghĩa là lấy cột thứ hai của bảng tra. Chữ **FALSE** nghĩa là tìm chính xác — trong lộ trình này ta luôn dùng FALSE.',
      },
      {
        kind: 'explain',
        body: 'Một điều rất quan trọng: khi chép công thức xuống các dòng dưới, **bảng tra phải khoá bằng dấu $** (`$G$1:$H$3`). Không khoá thì bảng tra trôi xuống theo và công thức hỏng ngay từ dòng thứ hai.',
      },
      {
        kind: 'quiz',
        question: 'VLOOKUP tra một mã không có trong bảng tra thì trả về gì?',
        choices: ['0', 'Ô trống', '#N/A', '#VALUE!'],
        answer: 2,
        why: '#N/A nghĩa là "không tìm thấy". Hay gặp nhất là do gõ sai mã hoặc thừa khoảng trắng.',
      },
      excelPractice({
        cells: {
          A1: 'Nhân viên', B1: 'Mã loại', C1: 'Xếp loại',
          A2: 'Nguyễn Văn Nam', B2: 'A',
          A3: 'Trần Thị Lan', B3: 'B',
          A4: 'Lê Minh Tú', B4: 'A',
          A5: 'Phạm Thu Hà', B5: 'C',
          G1: 'A', H1: 'Giỏi',
          G2: 'B', H2: 'Khá',
          G3: 'C', H3: 'Trung bình',
        },
        task: 'Bảng tra nằm ở **G1:H3**. Ở ô **C2** dùng **VLOOKUP** đổi mã loại thành chữ xếp loại, **nhớ khoá bảng tra bằng $**, rồi dùng **Fill ▾ › Down** cho hết **C2:C5**.',
        checks: [
          { kind: 'cellFormula', cell: 'C2', fn: 'VLOOKUP', absolute: true },
          { kind: 'cellValue', cell: 'C2', value: 'Giỏi' },
          { kind: 'cellValue', cell: 'C3', value: 'Khá' },
          { kind: 'cellValue', cell: 'C5', value: 'Trung bình' },
        ],
        spotlight: { cell: 'C2' },
        hint: 'Gõ =VLOOKUP(B2,$G$1:$H$3,2,FALSE) rồi chọn C2:C5 và bấm Fill ▾ › Down (thẻ Home › nhóm Editing).',
        steps: [
          'Bấm ô C2, gõ =VLOOKUP(B2,$G$1:$H$3,2,FALSE) rồi Enter.',
          'Bấm ô C2, giữ Shift bấm ô C5.',
          'Ở thẻ Home › nhóm Editing, bấm Fill ▾ rồi chọn Down.',
        ],
        solve: () => [
          { type: 'setCell', cell: 'C2', raw: '=VLOOKUP(B2,$G$1:$H$3,2,FALSE)' },
          { type: 'selectRange', range: 'C2:C5' },
          { type: 'fillDown' },
        ],
      }),
    ],
  },
  {
    id: 'excel.text',
    trackId: 'excel',
    chapterId: 'excel.cond',
    title: 'Hàm chữ và dấu nối &',
    minutes: 10,
    steps: [
      {
        kind: 'explain',
        body: 'Bảng tính không chỉ tính số. Khi dữ liệu là chữ — họ tên, mã hàng, địa chỉ — ta có một nhóm hàm riêng để cắt, ghép và dọn dẹp.',
      },
      {
        kind: 'explain',
        body: '**LEFT** lấy mấy chữ đầu, **RIGHT** lấy mấy chữ cuối, **MID** lấy đoạn ở giữa, **LEN** đếm độ dài, **UPPER** đổi thành chữ hoa, **TRIM** bỏ khoảng trắng thừa — cái này cứu bạn khi dán dữ liệu từ nơi khác về.',
      },
      {
        kind: 'explain',
        body: 'Muốn ghép chữ thì dùng dấu **&**, gọi là [[noi-chuoi|nối chuỗi]]: `=A2&" "&B2` ghép họ và tên, ở giữa chèn thêm một dấu cách. Đừng quên dấu cách trong nháy kép, không thì hai chữ dính liền nhau.',
      },
      {
        kind: 'quiz',
        question: 'Ô A2 ghi "Nguyễn Văn", ô B2 ghi "Nam". Công thức =A2&B2 cho ra gì?',
        choices: ['Nguyễn Văn Nam', 'Nguyễn VănNam', 'Nguyễn Văn + Nam', '#VALUE!'],
        answer: 1,
        why: 'Dấu & ghép đúng những gì có sẵn, không tự thêm dấu cách. Phải viết =A2&" "&B2 mới có khoảng trắng ở giữa.',
      },
      excelPractice({
        cells: { A1: 'Họ và đệm', B1: 'Tên', C1: 'Họ tên đầy đủ', D1: 'Số ký tự', E1: 'Tên viết hoa', A2: 'Nguyễn Văn', B2: 'Nam' },
        task: 'Ô **C2** ghép họ tên đầy đủ (nhớ dấu cách), ô **D2** đếm số ký tự của C2, ô **E2** đổi tên ở B2 thành **chữ hoa**.',
        checks: [
          { kind: 'cellValue', cell: 'C2', value: 'Nguyễn Văn Nam' },
          { kind: 'cellValue', cell: 'D2', value: 14 },
          { kind: 'cellValue', cell: 'E2', value: 'NAM' },
        ],
        spotlight: { cell: 'C2' },
        hint: 'C2 dùng &, D2 dùng LEN, E2 dùng UPPER.',
        steps: [
          'Ô C2 gõ =A2&" "&B2 rồi Enter.',
          'Ô D2 gõ =LEN(C2) rồi Enter.',
          'Ô E2 gõ =UPPER(B2) rồi Enter.',
        ],
        solve: () => [
          { type: 'setCell', cell: 'C2', raw: '=A2&" "&B2' },
          { type: 'setCell', cell: 'D2', raw: '=LEN(C2)' },
          { type: 'setCell', cell: 'E2', raw: '=UPPER(B2)' },
        ],
      }),
    ],
  },
];
