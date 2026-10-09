import type { Lesson } from '@office-neko/shared';
import { excelPractice } from '../lessonKit';

const CREDIT = 'Ảnh chụp Microsoft Excel';
const WINDOW_SHOT = '/images/real/excel-01-window.png';

/** Chương 1 — Làm quen bảng tính. */
export const EXCEL_BASICS: Lesson[] = [
  {
    id: 'excel.intro',
    trackId: 'excel',
    chapterId: 'excel.start',
    title: 'Ô, hàng, cột là gì',
    minutes: 8,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Chào bạn! Hôm nay Mochi dắt bạn vào [[bang-tinh|bảng tính]] — thứ dân văn phòng dùng để tính tiền, đếm số, làm báo cáo mà không phải bấm máy tính tay.',
      },
      {
        kind: 'explain',
        body: 'Bảng tính là một tấm lưới. Cột đánh dấu bằng **chữ** A, B, C… Hàng đánh dấu bằng **số** 1, 2, 3… Chỗ một cột gặp một hàng gọi là một [[o|ô]]. Ô ở cột B hàng 2 có tên là **B2** — cứ chữ trước, số sau.',
      },
      {
        kind: 'explain',
        body: 'Ô bạn đang chọn có viền đậm, và tên nó hiện ở ô vuông bên trái thanh công thức, gọi là [[name-box|Name Box]]. Nhìn vào đó là biết mình đang đứng ở đâu.',
      },
      {
        kind: 'quiz',
        question: 'Ô nằm ở cột C, hàng 5 có tên là gì?',
        choices: ['5C', 'C5', 'c-5', 'Cột C hàng 5'],
        answer: 1,
        why: 'Tên ô luôn là chữ của cột đứng trước, số của hàng đứng sau: C5.',
      },
      excelPractice({
        task: 'Bấm vào ô **C3** rồi gõ tên của bạn vào đó, xong bấm {{Enter}}.',
        checks: [{ kind: 'cellNotEmpty', cell: 'C3' }],
        spotlight: { helpId: 'excel.nameBox' },
        hint: 'Đi sang cột C (cột thứ ba), xuống hàng 3, rồi gõ chữ vào.',
        steps: [
          'Bấm chuột vào ô ở cột C, hàng 3.',
          'Nhìn Name Box, phải thấy chữ C3.',
          'Gõ tên rồi bấm Enter.',
        ],
        // Lời giải mẫu gõ một cái tên bất kỳ; check chỉ đòi ô có nội dung.
        solve: () => [{ type: 'setCell', cell: 'C3', raw: 'Nguyễn Văn Nam' }],
      }),
      {
        kind: 'realShot',
        image: WINDOW_SHOT,
        caption: 'Trên Excel thật: lưới ô, tên cột, số hàng và Name Box',
        credit: CREDIT,
        marks: [
          { x: 2.7, y: 31.4, w: 51.2, h: 3.1, label: 'Tên cột: chữ A, B, C… ở hàng trên cùng của lưới' },
          { x: 0.1, y: 34.5, w: 2.6, h: 15.4, label: 'Số hàng: 1, 2, 3… ở cột bên trái' },
          { x: 0.6, y: 26, w: 26.6, h: 3.8, label: 'Name Box: tên ô đang chọn, ở đây là A1 (ô có viền xanh đậm)' },
        ],
      },
    ],
  },
  {
    id: 'excel.enter',
    trackId: 'excel',
    chapterId: 'excel.start',
    title: 'Nhập số, chữ và sửa ô',
    minutes: 10,
    steps: [
      {
        kind: 'explain',
        body: 'Gõ xong một ô, bấm {{Enter}} để xuống ô dưới, hoặc {{Tab}} để sang ô bên phải. Đang gõ mà đổi ý thì bấm {{Escape}}: ô trở về như cũ.',
      },
      {
        kind: 'explain',
        body: 'Muốn sửa một ô đã có sẵn thì bấm vào ô đó rồi bấm {{F2}}, hoặc bấm đúp chuột. Muốn xoá sạch một ô thì chọn nó và bấm {{Delete}}.',
      },
      {
        kind: 'explain',
        body: 'Bảng tính tự nhận ra bạn gõ gì: **số thì nằm sát mép phải**, **chữ thì nằm sát mép trái**. Nhìn ô mà thấy số lại nằm bên trái thì coi chừng — nó đang bị hiểu là chữ.',
      },
      {
        kind: 'quiz',
        question: 'Bạn gõ dở vào ô rồi đổi ý, không muốn ghi nữa. Bấm phím nào?',
        choices: ['Enter', 'Escape', 'Tab', 'Delete'],
        answer: 1,
        why: 'Escape huỷ phần đang gõ, ô giữ nguyên nội dung cũ.',
      },
      excelPractice({
        cells: { A1: 'Tên hàng', B1: 'Số lượng', A2: 'Bút bi' },
        task: 'Điền số lượng **25** vào ô **B2**, rồi thêm hàng mới: **Vở** ở ô A3 và **12** ở ô B3.',
        checks: [
          { kind: 'cellValue', cell: 'B2', value: 25 },
          { kind: 'cellValue', cell: 'A3', value: 'Vở' },
          { kind: 'cellValue', cell: 'B3', value: 12 },
        ],
        spotlight: { cell: 'B2' },
        hint: 'Bấm vào ô B2, gõ 25 rồi Enter. Làm tiếp cho hàng 3.',
        steps: [
          'Bấm ô B2, gõ 25, bấm Enter.',
          'Bấm ô A3, gõ Vở, bấm Tab để sang B3.',
          'Gõ 12 rồi bấm Enter.',
        ],
        solve: () => [
          { type: 'setCell', cell: 'B2', raw: '25' },
          { type: 'setCell', cell: 'A3', raw: 'Vở' },
          { type: 'setCell', cell: 'B3', raw: '12' },
        ],
      }),
    ],
  },
  {
    id: 'excel.sheet',
    trackId: 'excel',
    chapterId: 'excel.start',
    title: 'Nhiều sheet trong một tệp',
    minutes: 8,
    steps: [
      {
        kind: 'explain',
        body: 'Một tệp bảng tính chứa được nhiều trang, mỗi trang gọi là một [[sheet|sheet]]. Tên các sheet nằm ở thanh phía dưới. Bấm dấu **+** để thêm sheet mới, bấm đúp vào tên để đổi tên.',
      },
      {
        kind: 'explain',
        body: 'Nhiều sheet giúp mỗi thứ một chỗ: một sheet cho bảng lương tháng này, một sheet cho bảng tra hệ số. Muốn lấy số từ sheet khác, viết tên sheet rồi dấu chấm than: **=Sheet1!A1**.',
      },
      {
        kind: 'quiz',
        question: 'Công thức =Sheet1!B2 có nghĩa là gì?',
        choices: [
          'Lấy giá trị ô B2 của sheet tên Sheet1',
          'Đổi tên sheet thành B2',
          'Chuyển sang Sheet1',
          'Báo lỗi vì không được dùng dấu chấm than',
        ],
        answer: 0,
        why: 'Dấu chấm than ngăn giữa tên sheet và địa chỉ ô: Sheet1!B2 là ô B2 nằm ở Sheet1.',
      },
      excelPractice({
        cells: { A1: 'Tổng doanh thu', B1: '4500000' },
        sheets: ['Sheet1', 'Sheet2'],
        task: 'Đổi tên sheet đầu thành **Báo cáo**, rồi sang Sheet2 và gõ vào ô A1 công thức lấy đúng số doanh thu bên kia.',
        checks: [
          { kind: 'sheetNamed', name: 'Báo cáo' },
          { kind: 'cellValue', cell: 'A1', value: 4500000, sheet: 'Sheet2' },
        ],
        spotlight: { helpId: 'excel.sheetTab' },
        hint: 'Bấm đúp vào tên sheet để đổi tên. Sang Sheet2 rồi gõ =Báo cáo!B1',
        steps: [
          'Bấm đúp vào chữ Sheet1 ở thanh dưới, gõ Báo cáo rồi Enter.',
          'Bấm vào tab Sheet2.',
          'Ở ô A1 gõ =Báo cáo!B1 rồi bấm Enter.',
        ],
        solve: () => [
          { type: 'renameSheet', index: 0, name: 'Báo cáo' },
          { type: 'switchSheet', index: 1 },
          { type: 'setCell', cell: 'A1', raw: '=Báo cáo!B1' },
        ],
      }),
      {
        kind: 'realShot',
        image: WINDOW_SHOT,
        caption: 'Trên Excel thật: thanh tên sheet ở đáy cửa sổ',
        credit: CREDIT,
        marks: [
          { x: 10.1, y: 92.2, w: 6.5, h: 4.3, label: 'Tên sheet (Sheet1): bấm đúp để đổi tên' },
          { x: 19.4, y: 92.2, w: 2.8, h: 4.3, label: 'New sheet (dấu +): thêm sheet mới' },
        ],
      },
    ],
  },
];
