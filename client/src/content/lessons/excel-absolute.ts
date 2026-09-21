import type { Lesson } from '@office-neko/shared';
import { excelPractice } from '../lessonKit';

/** Chương 4 — Ô nào cố định. */
export const EXCEL_ABSOLUTE: Lesson[] = [
  {
    id: 'excel.copy',
    trackId: 'excel',
    chapterId: 'excel.ref',
    title: 'Chép công thức, địa chỉ tự đổi',
    minutes: 10,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Viết một công thức cho dòng đầu, rồi chép xuống cả trăm dòng — đó là lý do bảng tính tiết kiệm được cả buổi chiều.',
      },
      {
        kind: 'explain',
        body: 'Điều kỳ lạ mà hoá ra rất tiện: khi chép công thức `=A2*B2` xuống dòng dưới, nó **tự thành** `=A3*B3`. Bảng tính hiểu ý bạn là "lấy hai ô cùng dòng với tôi", chứ không phải "lấy đúng ô A2".',
      },
      {
        kind: 'explain',
        body: 'Cách viết như `A2`, `B2` gọi là [[dia-chi-tuong-doi|địa chỉ tương đối]] — tương đối so với chỗ công thức đang đứng. Nút **Fill xuống** đổ công thức từ ô trên cùng xuống hết vùng bạn chọn.',
      },
      {
        kind: 'quiz',
        question: 'Ô C2 chứa =A2*B2. Bạn chép ô C2 xuống ô C5. Công thức ở C5 sẽ là gì?',
        choices: ['=A2*B2', '=A5*B5', '=A5*B2', 'Báo lỗi #REF!'],
        answer: 1,
        why: 'Chép xuống 3 dòng thì mọi địa chỉ tương đối cũng dịch xuống 3 dòng: A2 thành A5, B2 thành B5.',
      },
      excelPractice({
        cells: {
          A1: 'Mặt hàng', B1: 'Đơn giá', C1: 'Số lượng', D1: 'Thành tiền',
          A2: 'Bút bi', B2: '5000', C2: '10',
          A3: 'Vở ô li', B3: '12000', C3: '5',
          A4: 'Thước kẻ', B4: '8000', C4: '3',
          D2: '=B2*C2',
        },
        task: 'Ô **D2** đã có công thức sẵn. Chọn vùng **D2:D4** rồi bấm **Fill xuống** để hai dòng còn lại cũng tính được thành tiền.',
        checks: [
          { kind: 'cellFormula', cell: 'D4', contains: 'B4' },
          { kind: 'cellValue', cell: 'D3', value: 60000 },
          { kind: 'cellValue', cell: 'D4', value: 24000 },
        ],
        spotlight: { helpId: 'excel.fillDown' },
        hint: 'Bấm ô D2, giữ Shift bấm ô D4, rồi bấm nút Fill xuống.',
        steps: [
          'Bấm ô D2.',
          'Giữ Shift và bấm ô D4.',
          'Bấm nút Fill xuống ở nhóm Sửa.',
        ],
        solve: () => [
          { type: 'selectRange', range: 'D2:D4' },
          { type: 'fillDown' },
        ],
      }),
    ],
  },
  {
    id: 'excel.absolute',
    trackId: 'excel',
    chapterId: 'excel.ref',
    title: 'Dấu $ khoá ô lại',
    minutes: 12,
    steps: [
      {
        kind: 'explain',
        body: 'Địa chỉ tự đổi rất tiện — cho tới khi bạn **không muốn** nó đổi. Ví dụ: cột thành tiền nhân với một ô thuế suất nằm riêng ở F1. Chép xuống dòng dưới, ô thuế suất trôi thành F2, F3… rồi ra kết quả sai bét.',
      },
      {
        kind: 'explain',
        body: 'Cách chữa là **khoá ô** bằng dấu **$**: viết `$F$1` thay vì `F1`. Dấu $ trước chữ khoá cột, dấu $ trước số khoá hàng. Khoá cả hai thì dù chép đi đâu, ô đó vẫn đứng yên. Cách viết này gọi là [[dia-chi-tuyet-doi|địa chỉ tuyệt đối]].',
      },
      {
        kind: 'explain',
        body: 'Mẹo nhớ: **cái gì chạy theo từng dòng thì để nguyên, cái gì cả bảng dùng chung thì khoá lại**. Bảng lương: lương từng người chạy theo dòng, hệ số thưởng thì cả bảng dùng chung nên phải khoá.',
      },
      {
        kind: 'quiz',
        question: 'Ô C2 chứa =B2*$E$1. Chép xuống C3 thì thành gì?',
        choices: ['=B3*$E$2', '=B3*$E$1', '=B2*$E$1', '=B3*E1'],
        answer: 1,
        why: 'B2 là tương đối nên thành B3. $E$1 đã khoá cả cột lẫn hàng nên đứng yên.',
      },
      excelPractice({
        cells: {
          E1: '0.1',
          A1: 'Nhân viên', B1: 'Lương', C1: 'Thưởng',
          A2: 'Nguyễn Văn Nam', B2: '7500000',
          A3: 'Trần Thị Lan', B3: '6200000',
          A4: 'Lê Minh Tú', B4: '8100000',
        },
        task: 'Ô **E1** là tỉ lệ thưởng dùng chung. Viết công thức thưởng ở **C2** có khoá ô E1 bằng dấu $, rồi Fill xuống hết **C2:C4**.',
        checks: [
          { kind: 'cellFormula', cell: 'C2', absolute: true },
          { kind: 'cellValue', cell: 'C2', value: 750000 },
          { kind: 'cellValue', cell: 'C4', value: 810000 },
        ],
        spotlight: { cell: 'C2' },
        hint: 'Ở C2 gõ =B2*$E$1 rồi chọn C2:C4 và bấm Fill xuống.',
        steps: [
          'Bấm ô C2, gõ =B2*$E$1 rồi Enter.',
          'Bấm ô C2, giữ Shift bấm ô C4.',
          'Bấm nút Fill xuống.',
        ],
        solve: () => [
          { type: 'setCell', cell: 'C2', raw: '=B2*$E$1' },
          { type: 'selectRange', range: 'C2:C4' },
          { type: 'fillDown' },
        ],
      }),
    ],
  },
  {
    id: 'excel.if',
    trackId: 'excel',
    chapterId: 'excel.ref',
    title: 'IF và câu điều kiện',
    minutes: 12,
    steps: [
      {
        kind: 'explain',
        body: 'Hàm **IF** làm đúng cái việc bạn vẫn nói hằng ngày: "**nếu** điểm từ 5 trở lên **thì** Đạt, **ngược lại** thì Chưa đạt".',
      },
      {
        kind: 'explain',
        body: 'Viết ra là: `=IF(B2>=5,"Đạt","Chưa đạt")`. Ba phần, ngăn nhau bằng dấu phẩy: **điều kiện**, **giá trị khi đúng**, **giá trị khi sai**. Chữ nghĩa phải bỏ trong nháy kép, còn số thì không.',
      },
      {
        kind: 'explain',
        body: 'Các phép so sánh dùng được: bằng **=**, lớn hơn **>**, nhỏ hơn **<**, lớn hơn hoặc bằng **>=**, nhỏ hơn hoặc bằng **<=**, và khác nhau **<>**.',
      },
      {
        kind: 'quiz',
        question: 'Ô B2 chứa 4. Công thức =IF(B2>=5,"Đạt","Chưa đạt") cho kết quả gì?',
        choices: ['Đạt', 'Chưa đạt', 'TRUE', '#VALUE!'],
        answer: 1,
        why: '4 không lớn hơn hoặc bằng 5 nên điều kiện sai, hàm lấy phần thứ ba là "Chưa đạt".',
      },
      excelPractice({
        cells: {
          A1: 'Học viên', B1: 'Điểm', C1: 'Kết quả',
          A2: 'Nguyễn Văn Nam', B2: '8',
          A3: 'Trần Thị Lan', B3: '4',
          A4: 'Lê Minh Tú', B4: '5',
        },
        task: 'Ở **C2** viết hàm **IF**: điểm từ 5 trở lên thì ghi **Đạt**, dưới 5 thì ghi **Chưa đạt**. Rồi Fill xuống hết **C2:C4**.',
        checks: [
          { kind: 'cellFormula', cell: 'C2', fn: 'IF' },
          { kind: 'cellValue', cell: 'C2', value: 'Đạt' },
          { kind: 'cellValue', cell: 'C3', value: 'Chưa đạt' },
          { kind: 'cellValue', cell: 'C4', value: 'Đạt' },
        ],
        spotlight: { cell: 'C2' },
        hint: 'Gõ =IF(B2>=5,"Đạt","Chưa đạt") rồi chọn C2:C4 và Fill xuống.',
        steps: [
          'Bấm ô C2.',
          'Gõ =IF(B2>=5,"Đạt","Chưa đạt") rồi Enter.',
          'Chọn vùng C2:C4 rồi bấm Fill xuống.',
        ],
        solve: () => [
          { type: 'setCell', cell: 'C2', raw: '=IF(B2>=5,"Đạt","Chưa đạt")' },
          { type: 'selectRange', range: 'C2:C4' },
          { type: 'fillDown' },
        ],
      }),
    ],
  },
];
