import type { Lesson } from '@office-neko/shared';
import { wordPractice } from '../lessonKit';

const L = (chapterId: string, id: string, title: string, minutes: number, steps: Lesson['steps']): Lesson => ({
  trackId: 'word',
  chapterId,
  id: `word.${id}`,
  title,
  minutes,
  steps,
});

/** Chương 4 — Bảng và ảnh. */
export const WORD_OBJECTS: Lesson[] = [
  L('word.objects', 'table', 'Chèn bảng và điền nội dung', 8, [
    {
      kind: 'explain',
      body: 'Có nhiều thứ xếp thành cột thì dùng [[table|bảng]] cho gọn.\n\nBảng gồm [[row|hàng]] (nằm ngang) và [[column|cột]] (nằm dọc). Ô vuông ở chỗ hàng gặp cột gọi là [[cell|ô]]. Bảng nằm ở thẻ **Insert** › nhóm **Tables** › nút **Table**: rê chuột trên lưới ô vuông để chọn số hàng, số cột.',
    },
    {
      kind: 'quiz',
      question: 'Trong một bảng, "hàng" là gì?',
      choices: ['Dãy ô nằm ngang', 'Dãy ô nằm dọc', 'Ô ở góc trên bên trái'],
      answer: 0,
      why: 'Đúng! Hàng nằm ngang, cột nằm dọc. Chỗ hai cái gặp nhau là một ô.',
    },
    wordPractice({
      text: 'Bảng điểm của tôi',
      task: 'Chèn bảng **3 hàng × 2 cột**, gõ **Môn học** vào ô đầu tiên và **Điểm** vào ô bên cạnh.',
      checks: [
        { kind: 'tableSize', rows: 3, cols: 2 },
        { kind: 'cellText', row: 0, col: 0, text: 'Môn học' },
        { kind: 'cellText', row: 0, col: 1, text: 'Điểm' },
      ],
      spotlight: { helpId: 'word.table' },
      hint: 'Thẻ Insert › nhóm Tables › Table, rê chuột trên lưới tới ô thứ 3 hàng, 2 cột rồi bấm. Sau đó bấm vào từng ô để gõ.',
      steps: ['Mở thẻ Insert.', 'Bấm nút Table.', 'Rê chuột trên lưới cho sáng 3 hàng × 2 cột rồi bấm.', 'Bấm vào ô đầu, gõ: Môn học', 'Bấm ô bên cạnh, gõ: Điểm'],
      solve: () => [
        { type: 'insertTable', rows: 3, cols: 2 },
        { type: 'fillCell', row: 0, col: 0, text: 'Môn học' },
        { type: 'fillCell', row: 0, col: 1, text: 'Điểm' },
      ],
    }),
  ]),

  L('word.objects', 'image', 'Chèn ảnh vào văn bản', 6, [
    {
      kind: 'explain',
      body: 'Ảnh làm văn bản dễ nhìn hơn, nhưng đừng để ảnh **che mất chữ** hoặc to quá cả trang.\n\nChèn ảnh ở thẻ **Insert** › nhóm **Illustrations** › nút **Pictures**: chọn một ảnh có sẵn, hoặc lấy ảnh trong máy bạn.\n\nCó ảnh rồi, Word hiện thêm thẻ **Picture Format**. Đổi độ rộng ảnh ở nhóm **Size** của thẻ đó.',
    },
    wordPractice({
      text: 'Ảnh của tôi:',
      task: 'Chèn một ảnh bất kỳ, rồi đặt độ rộng **60%** cho ảnh đó.',
      checks: [
        { kind: 'imageCount', count: 1 },
        { kind: 'imageWidth', width: '60%' },
      ],
      spotlight: { helpId: 'word.image' },
      hint: 'Thẻ Insert › Pictures › bấm một ảnh trong lưới. Rồi mở thẻ Picture Format › nhóm Size, bấm 60%.',
      steps: ['Mở thẻ Insert.', 'Bấm nút Pictures.', 'Chọn một ảnh trong lưới.', 'Mở thẻ Picture Format (vừa hiện ra), bấm 60% ở nhóm Size.'],
      solve: () => [
        { type: 'insertImage', src: '/images/word/meo.svg', alt: 'Mèo Mochi' },
        { type: 'setImageWidth', width: '60%' },
      ],
    }),
  ]),
];
