import type { Lesson } from '@office-neko/shared';
import { excelPractice } from '../lessonKit';

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
        task: 'Chọn vùng **B2:B3** rồi bấm nút **Tiền VNĐ** trên thanh Ribbon để hai ô lương hiện kèm dấu ₫.',
        checks: [
          { kind: 'cellFormat', cell: 'B2', fmt: { numFmt: 'currencyVnd' } },
          { kind: 'cellFormat', cell: 'B3', fmt: { numFmt: 'currencyVnd' } },
        ],
        spotlight: { helpId: 'excel.fmtCurrency' },
        hint: 'Bấm ô B2, giữ {{Shift}} rồi bấm ô B3 để chọn cả hai, sau đó bấm Tiền VNĐ.',
        steps: [
          'Bấm vào ô B2.',
          'Giữ Shift và bấm ô B3 — hai ô cùng sáng lên.',
          'Bấm nút Tiền VNĐ ở nhóm Định dạng số.',
        ],
        solve: () => [
          { type: 'selectRange', range: 'B2:B3' },
          { type: 'setFormat', fmt: { numFmt: 'currencyVnd' } },
        ],
      }),
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
        task: 'Làm nổi hàng tiêu đề: chọn vùng **A1:B1**, bấm **In đậm**, rồi bấm **Màu nền** và **Căn giữa**.',
        checks: [
          { kind: 'cellFormat', cell: 'A1', fmt: { bold: true, align: 'center' } },
          { kind: 'cellFormat', cell: 'B1', fmt: { bold: true } },
        ],
        spotlight: { helpId: 'excel.bold' },
        hint: 'Chọn A1:B1 trước, rồi bấm lần lượt ba nút trên Ribbon.',
        steps: [
          'Bấm ô A1, giữ Shift rồi bấm ô B1.',
          'Bấm nút In đậm (B).',
          'Bấm nút Màu nền, rồi bấm Căn giữa.',
        ],
        solve: () => [
          { type: 'selectRange', range: 'A1:B1' },
          { type: 'setFormat', fmt: { bold: true } },
          { type: 'setFormat', fmt: { fill: '#FFF3B0' } },
          { type: 'setFormat', fmt: { align: 'center' } },
        ],
      }),
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
        body: '[[gop-o|Gộp ô]] (Merge) nhập nhiều ô liền nhau thành một ô lớn, thường dùng cho dòng tiêu đề nằm vắt ngang cả bảng. Bấm nút Merge lần nữa là tách trở lại.',
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
        task: 'Chọn vùng **A1:B1** rồi bấm **Gộp ô (Merge)** để dòng tiêu đề nằm giữa cả bảng.',
        checks: [{ kind: 'merged', range: 'A1:B1' }],
        spotlight: { helpId: 'excel.merge' },
        hint: 'Chọn A1:B1 rồi bấm nút Gộp ô (Merge) ở nhóm Ô.',
        steps: [
          'Bấm ô A1, giữ Shift rồi bấm ô B1.',
          'Bấm nút Gộp ô (Merge).',
        ],
        solve: () => [
          { type: 'selectRange', range: 'A1:B1' },
          { type: 'merge' },
        ],
      }),
    ],
  },
];
