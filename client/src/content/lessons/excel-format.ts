import type { Lesson } from '@office-neko/shared';
import { excelPractice } from '../lessonKit';

const CREDIT = 'Ảnh chụp Microsoft Excel';
const HOME_SHOT = '/images/real/excel-02-home.png';

/** Chương 2 — Định dạng cho dễ đọc. */
export const EXCEL_FORMAT: Lesson[] = [
  {
    id: 'excel.numfmt',
    trackId: 'excel',
    chapterId: 'excel.format',
    title: 'Số, tiền và phần trăm',
    minutes: 10,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Cùng một con số, bảng tính hiện ra được nhiều kiểu. Số **7500000** trần trụi rất khó đọc; đổi sang kiểu tiền thì thành **7.500.000 ₫**, nhìn phát biết ngay.',
      },
      {
        kind: 'explain',
        body: 'Điều quan trọng nhất: [[dinh-dang-so|định dạng số]] chỉ đổi **cách hiện ra**, không đổi giá trị thật. Ô vẫn là số 7500000, vẫn cộng trừ nhân chia bình thường. Giống như bạn mặc áo khác chứ không phải đổi người.',
      },
      {
        kind: 'explain',
        body: 'Kiểu **Phần trăm** thì hơi khác một chút: nó nhân giá trị với 100 rồi thêm dấu %. Ô chứa 0,15 sẽ hiện là **15%**.',
      },
      {
        kind: 'quiz',
        question: 'Ô A1 chứa số 7500000. Bạn đổi định dạng sang Tiền VNĐ. Công thức =A1/2 cho kết quả gì?',
        choices: ['3750000 — vì giá trị thật không đổi', 'Báo lỗi vì ô là tiền', '7.500.000 ₫ / 2', '0, vì ô đã thành chữ'],
        answer: 0,
        why: 'Định dạng chỉ đổi cách hiện. Giá trị thật vẫn là số 7500000 nên chia hai vẫn ra 3750000.',
      },
      excelPractice({
        cells: { A1: 'Nhân viên', B1: 'Lương', A2: 'Nguyễn Văn Nam', B2: '7500000', A3: 'Trần Thị Lan', B3: '6200000' },
        task: 'Chọn vùng **B2:B3** rồi ở thẻ **Home** › nhóm **Number** › ô **Number Format**, chọn **Currency (₫)** để hai ô lương hiện kèm dấu ₫.',
        checks: [
          { kind: 'cellFormat', cell: 'B2', fmt: { numFmt: 'currencyVnd' } },
          { kind: 'cellFormat', cell: 'B3', fmt: { numFmt: 'currencyVnd' } },
        ],
        spotlight: { helpId: 'excel.numFmt' },
        hint: 'Bấm ô B2, giữ {{Shift}} rồi bấm ô B3 để chọn cả hai, sau đó mở ô Number Format (thẻ Home › nhóm Number) và chọn Currency (₫).',
        steps: [
          'Bấm vào ô B2.',
          'Giữ Shift và bấm ô B3 — hai ô cùng sáng lên.',
          'Ở thẻ Home › nhóm Number, mở ô Number Format và chọn Currency (₫).',
        ],
        solve: () => [
          { type: 'selectRange', range: 'B2:B3' },
          { type: 'setFormat', fmt: { numFmt: 'currencyVnd' } },
        ],
      }),
      {
        kind: 'realShot',
        image: HOME_SHOT,
        caption: 'Trên Excel thật: thẻ Home › nhóm Number',
        credit: CREDIT,
        marks: [
          { x: 49.5, y: 47.5, w: 10.2, h: 14.4, label: 'Number Format (ô đang ghi General): bấm ▾ rồi chọn Currency để hiện kiểu tiền' },
        ],
      },
    ],
  },
  {
    id: 'excel.look',
    trackId: 'excel',
    chapterId: 'excel.format',
    title: 'Đậm, màu và căn lề',
    minutes: 8,
    steps: [
      {
        kind: 'explain',
        body: 'Một bảng dễ đọc luôn có **hàng tiêu đề nổi bật**: chữ in đậm, nền tô màu nhạt. Người xem nhìn một cái là biết cột nào là cột nào.',
      },
      {
        kind: 'explain',
        body: 'Ba nút căn lề cho biết chữ nằm sát trái, ở giữa hay sát phải trong ô. Số thì cứ để căn phải như mặc định — các chữ số hàng nghìn thẳng cột nhau, dễ so sánh hơn nhiều.',
      },
      {
        kind: 'quiz',
        question: 'Vì sao nên để số căn phải?',
        choices: [
          'Vì các chữ số thẳng cột nhau nên dễ so sánh số lớn nhỏ',
          'Vì bảng tính bắt buộc phải thế',
          'Để tiết kiệm chỗ',
          'Không có lý do gì cả',
        ],
        answer: 0,
        why: 'Căn phải làm hàng đơn vị, hàng chục, hàng trăm thẳng nhau — nhìn là biết số nào lớn hơn.',
      },
      excelPractice({
        cells: { A1: 'Nhân viên', B1: 'Lương', A2: 'Nguyễn Văn Nam', B2: '7500000' },
        task: 'Làm nổi hàng tiêu đề: chọn vùng **A1:B1**, bấm **In đậm**, chọn một **màu nền** (Fill Color) rồi bấm **Căn giữa**.',
        checks: [
          { kind: 'cellFormat', cell: 'A1', fmt: { bold: true, align: 'center' } },
          { kind: 'cellFormat', cell: 'B1', fmt: { bold: true } },
        ],
        spotlight: { helpId: 'excel.bold' },
        hint: 'Chọn A1:B1 trước, rồi dùng thẻ Home: nhóm Font có B và Fill Color, nhóm Alignment có nút căn giữa.',
        steps: [
          'Bấm ô A1, giữ Shift rồi bấm ô B1.',
          'Thẻ Home › nhóm Font: bấm nút B (Bold).',
          'Cũng ở nhóm Font, mở ô Fill Color (xô sơn) chọn một màu.',
          'Thẻ Home › nhóm Alignment: bấm nút căn giữa (Center).',
        ],
        solve: () => [
          { type: 'selectRange', range: 'A1:B1' },
          { type: 'setFormat', fmt: { bold: true } },
          { type: 'setFormat', fmt: { fill: '#FFF3B0' } },
          { type: 'setFormat', fmt: { align: 'center' } },
        ],
      }),
      {
        kind: 'realShot',
        image: HOME_SHOT,
        caption: 'Trên Excel thật: thẻ Home › nhóm Font và nhóm Alignment',
        credit: CREDIT,
        marks: [
          { x: 8.2, y: 66.9, w: 1.6, h: 14.4, label: 'Bold (B), phím tắt Ctrl + B: in đậm' },
          { x: 18.4, y: 66.9, w: 2.7, h: 14.4, label: 'Fill Color (xô sơn): bấm ▾ để chọn màu nền ô' },
          { x: 30.2, y: 66.9, w: 1.6, h: 14.4, label: 'Center: căn chữ vào giữa ô' },
        ],
      },
    ],
  },
  {
    id: 'excel.width',
    trackId: 'excel',
    chapterId: 'excel.format',
    title: 'Độ rộng cột và gộp ô tiêu đề',
    minutes: 8,
    steps: [
      {
        kind: 'explain',
        body: 'Thấy một ô đầy dấu **#####** thì đừng hoảng: đó **không phải lỗi**. Nó chỉ có nghĩa là cột quá hẹp, không đủ chỗ hiện hết con số. Kéo mép cột cho rộng ra là xong.',
      },
      {
        kind: 'explain',
        body: '[[gop-o|Gộp ô]] nhập nhiều ô liền nhau thành một ô lớn, thường dùng cho dòng tiêu đề nằm vắt ngang cả bảng. Nút là **Merge & Center** ở thẻ **Home** › nhóm **Alignment**. Bấm lần nữa là tách trở lại.',
      },
      {
        kind: 'quiz',
        question: 'Ô hiện ##### nghĩa là gì?',
        choices: ['Công thức sai', 'Cột quá hẹp, không đủ chỗ hiện số', 'Ô bị khoá', 'Máy tính bị treo'],
        answer: 1,
        why: 'Dấu ##### chỉ nói cột hẹp quá. Nới cột rộng ra là con số hiện lại bình thường.',
      },
      excelPractice({
        cells: { A1: 'BẢNG LƯƠNG THÁNG 9', A2: 'Nhân viên', B2: 'Lương', A3: 'Nguyễn Văn Nam', B3: '7500000' },
        task: 'Chọn vùng **A1:B1** rồi bấm **Merge & Center** (gộp ô) để dòng tiêu đề nằm giữa cả bảng.',
        checks: [{ kind: 'merged', range: 'A1:B1' }],
        spotlight: { helpId: 'excel.merge' },
        hint: 'Chọn A1:B1 rồi bấm Merge & Center ở thẻ Home › nhóm Alignment.',
        steps: [
          'Bấm ô A1, giữ Shift rồi bấm ô B1.',
          'Thẻ Home › nhóm Alignment: bấm Merge & Center.',
        ],
        solve: () => [
          { type: 'selectRange', range: 'A1:B1' },
          { type: 'merge' },
        ],
      }),
      {
        kind: 'realShot',
        image: HOME_SHOT,
        caption: 'Trên Excel thật: thẻ Home › nhóm Alignment',
        credit: CREDIT,
        marks: [
          { x: 38.3, y: 66.9, w: 10.1, h: 14.4, label: 'Merge & Center: gộp các ô đang chọn thành một ô, chữ nằm giữa. Bấm lần nữa để tách' },
        ],
      },
    ],
  },
];
