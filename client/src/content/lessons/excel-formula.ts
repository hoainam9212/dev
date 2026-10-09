import type { Lesson } from '@office-neko/shared';
import { excelPractice } from '../lessonKit';

const CREDIT = 'Ảnh chụp Microsoft Excel';
const AUTOSUM_SHOT = '/images/real/excel-05-autosum-menu.png';

/** Chương 3 — Công thức đầu tiên. */
export const EXCEL_FORMULA: Lesson[] = [
  {
    id: 'excel.equals',
    trackId: 'excel',
    chapterId: 'excel.calc',
    title: 'Dấu = và bốn phép tính',
    minutes: 10,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Đây là lúc bảng tính bắt đầu **tự tính hộ bạn**. Mọi [[cong-thuc|công thức]] đều bắt đầu bằng dấu **=**. Không có dấu = thì bảng tính coi đó chỉ là chữ, và nó nằm im.',
      },
      {
        kind: 'explain',
        body: 'Bốn phép tính: cộng **+**, trừ **-**, nhân dấu sao **\\***, chia dấu gạch **/**. Gõ `=10*3` rồi {{Enter}}, ô hiện ngay 30.',
      },
      {
        kind: 'explain',
        body: 'Điều hay nhất: thay vì gõ số, hãy gõ **địa chỉ ô**. `=B2*C2` nghĩa là "lấy số ở B2 nhân số ở C2". Sau này sửa B2 thì kết quả tự đổi theo — không phải tính lại lần nào.',
      },
      {
        kind: 'explain',
        body: 'Nhớ kỹ: **ô hiện KẾT QUẢ, thanh công thức hiện CÔNG THỨC**. Muốn xem một ô đang tính bằng gì thì bấm vào ô đó rồi nhìn lên thanh công thức.',
      },
      {
        kind: 'quiz',
        question: 'Bạn gõ SUM(A1:A5) vào ô mà quên dấu =. Chuyện gì xảy ra?',
        choices: [
          'Ô hiển thị nguyên dòng chữ SUM(A1:A5), không tính gì cả',
          'Vẫn tính bình thường',
          'Báo lỗi #NAME?',
          'Máy tự thêm dấu = giúp',
        ],
        answer: 0,
        why: 'Thiếu dấu = thì bảng tính hiểu đó là chữ. Mochi sẽ nhắc bạn ngay bên dưới lưới khi thấy chuyện này.',
      },
      excelPractice({
        cells: { A1: 'Đơn giá', B1: 'Số lượng', C1: 'Thành tiền', A2: '25000', B2: '4' },
        task: 'Ở ô **C2**, viết công thức nhân đơn giá với số lượng. Kết quả phải ra 100000.',
        checks: [
          { kind: 'cellFormula', cell: 'C2', contains: 'A2' },
          { kind: 'cellValue', cell: 'C2', value: 100000 },
        ],
        spotlight: { helpId: 'excel.formulaBar' },
        hint: 'Bấm ô C2, gõ dấu = rồi A2*B2 và bấm Enter.',
        steps: [
          'Bấm vào ô C2.',
          'Gõ =A2*B2',
          'Bấm Enter. Ô hiện 100000.',
        ],
        solve: () => [{ type: 'setCell', cell: 'C2', raw: '=A2*B2' }],
      }),
      {
        kind: 'realShot',
        image: '/images/real/excel-01-window.png',
        caption: 'Trên Excel thật: ô đang chọn và thanh công thức',
        credit: CREDIT,
        marks: [
          { x: 2.7, y: 34.5, w: 6.4, h: 3.1, label: 'Ô đang chọn (viền xanh đậm): gõ dấu = để bắt đầu công thức' },
          { x: 41.7, y: 26, w: 57.5, h: 3.8, label: 'Thanh công thức (Formula Bar): hiện công thức của ô đang chọn, ví dụ =A2*B2' },
        ],
      },
    ],
  },
  {
    id: 'excel.sum',
    trackId: 'excel',
    chapterId: 'excel.calc',
    title: 'SUM và AVERAGE',
    minutes: 10,
    steps: [
      {
        kind: 'explain',
        body: 'Cộng năm ô thì `=B2+B3+B4+B5+B6` cũng xong. Nhưng cộng năm mươi ô thì sao? Đó là lúc cần [[ham|hàm]] — những phép tính viết sẵn của bảng tính.',
      },
      {
        kind: 'explain',
        body: '**SUM** cộng cả một [[vung|vùng]]: `=SUM(B2:B6)` nghĩa là cộng từ B2 xuống tới B6. Dấu hai chấm đọc là "đến". Thêm một dòng vào giữa vùng thì SUM tự tính luôn dòng đó — cộng tay thì không.',
      },
      {
        kind: 'explain',
        body: '**AVERAGE** tính trung bình cộng. Cả hai hàm đều **bỏ qua ô trống và ô chữ**, chỉ nhặt số ra mà tính, nên bạn không sợ vướng dòng ghi chú.',
      },
      {
        kind: 'explain',
        body: 'Mẹo: khi bạn gõ `=SUM(`, Mochi hiện ngay một tấm thẻ nói hàm này cần gì. Cứ nhìn thẻ đó mà gõ tiếp, không cần nhớ thuộc lòng.',
      },
      {
        kind: 'quiz',
        question: 'Vì sao =SUM(B2:B6) tốt hơn =B2+B3+B4+B5+B6?',
        choices: [
          'Vì ngắn hơn, ít gõ nhầm, và thêm dòng vào giữa thì tự tính luôn',
          'Vì nó tính nhanh hơn nhiều',
          'Vì cộng tay thì bảng tính báo lỗi',
          'Không có gì khác nhau',
        ],
        answer: 0,
        why: 'SUM ngắn, khó gõ sót ô, và co giãn theo vùng. Cộng tay thì mỗi lần thêm dòng phải sửa lại công thức.',
      },
      excelPractice({
        cells: {
          A1: 'Tháng', B1: 'Doanh thu',
          A2: 'Tháng 1', B2: '12000000',
          A3: 'Tháng 2', B3: '15500000',
          A4: 'Tháng 3', B4: '9800000',
          A5: 'Tổng cộng',
        },
        task: 'Ở ô **B5**, dùng hàm **SUM** để cộng doanh thu ba tháng (vùng B2:B4).',
        checks: [
          { kind: 'cellFormula', cell: 'B5', fn: 'SUM', range: 'B2:B4' },
          { kind: 'cellValue', cell: 'B5', value: 37300000 },
        ],
        spotlight: { cell: 'B5' },
        hint: 'Gõ =SUM( rồi vùng B2:B4, đóng ngoặc và Enter.',
        steps: [
          'Bấm vào ô B5.',
          'Gõ =SUM(B2:B4)',
          'Bấm Enter.',
        ],
        solve: () => [{ type: 'setCell', cell: 'B5', raw: '=SUM(B2:B4)' }],
      }),
      {
        kind: 'realShot',
        image: AUTOSUM_SHOT,
        caption: 'Trên Excel thật: thẻ Formulas › nhóm Function Library › AutoSum',
        credit: CREDIT,
        marks: [
          { x: 6.4, y: 18.1, w: 5, h: 13.8, label: 'AutoSum ▾ (nửa dưới của nút): mở danh sách hàm hay dùng' },
          { x: 6.6, y: 32.8, w: 13.4, h: 10.3, label: 'Sum: cộng cả vùng, Excel tự viết =SUM(…)' },
        ],
      },
    ],
  },
  {
    id: 'excel.stats',
    trackId: 'excel',
    chapterId: 'excel.calc',
    title: 'MIN, MAX, COUNT và ROUND',
    minutes: 10,
    steps: [
      {
        kind: 'explain',
        body: '**MIN** cho số nhỏ nhất, **MAX** cho số lớn nhất trong vùng. Hai hàm này trả lời ngay những câu kiểu "tháng nào bán ít nhất".',
      },
      {
        kind: 'explain',
        body: '**COUNT** đếm những ô chứa **số**. **COUNTA** đếm mọi ô **không trống**, kể cả ô chữ. Muốn đếm xem có bao nhiêu nhân viên thì đếm cột tên bằng COUNTA; muốn đếm bao nhiêu người đã chấm điểm thì đếm cột điểm bằng COUNT.',
      },
      {
        kind: 'explain',
        body: '**ROUND** làm tròn: `=ROUND(B2,0)` bỏ hết phần lẻ, `=ROUND(B2,2)` giữ lại hai chữ số sau dấu phẩy. Hàm này đổi **giá trị thật**, khác hẳn định dạng số chỉ đổi cách hiện.',
      },
      {
        kind: 'quiz',
        question: 'Cột A có 5 ô: ba ô ghi tên, một ô ghi số, một ô trống. COUNT(A1:A5) ra mấy?',
        choices: ['5', '4', '1', '3'],
        answer: 2,
        why: 'COUNT chỉ đếm ô chứa SỐ nên ra 1. Muốn ra 4 thì dùng COUNTA (đếm mọi ô không trống).',
      },
      excelPractice({
        cells: {
          A1: 'Tháng', B1: 'Doanh thu',
          A2: 'Tháng 1', B2: '12000000',
          A3: 'Tháng 2', B3: '15500000',
          A4: 'Tháng 3', B4: '9800000',
          A6: 'Cao nhất', A7: 'Thấp nhất', A8: 'Số tháng có số liệu',
        },
        task: 'Điền ba ô: **B6** doanh thu cao nhất, **B7** thấp nhất, **B8** đếm xem có mấy tháng đã có số liệu.',
        checks: [
          { kind: 'cellValue', cell: 'B6', value: 15500000 },
          { kind: 'cellValue', cell: 'B7', value: 9800000 },
          { kind: 'cellValue', cell: 'B8', value: 3 },
        ],
        spotlight: { cell: 'B6' },
        hint: 'Ba hàm cần dùng là MAX, MIN và COUNT, đều trên vùng B2:B4.',
        steps: [
          'Ô B6 gõ =MAX(B2:B4)',
          'Ô B7 gõ =MIN(B2:B4)',
          'Ô B8 gõ =COUNT(B2:B4)',
        ],
        solve: () => [
          { type: 'setCell', cell: 'B6', raw: '=MAX(B2:B4)' },
          { type: 'setCell', cell: 'B7', raw: '=MIN(B2:B4)' },
          { type: 'setCell', cell: 'B8', raw: '=COUNT(B2:B4)' },
        ],
      }),
      {
        kind: 'realShot',
        image: AUTOSUM_SHOT,
        caption: 'Trên Excel thật: thẻ Formulas › nhóm Function Library › AutoSum',
        credit: CREDIT,
        marks: [
          { x: 6.4, y: 18.1, w: 5, h: 13.8, label: 'AutoSum ▾ (nửa dưới của nút): mở danh sách hàm hay dùng' },
          { x: 6.6, y: 53.4, w: 13.4, h: 31, label: 'Count Numbers, Max, Min: đếm ô có số (hàm COUNT), số lớn nhất (MAX), số nhỏ nhất (MIN)' },
        ],
      },
    ],
  },
];
