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

const LETTER = ['ĐƠN XIN VIỆC', 'Hà Nội, ngày 20 tháng 9', 'Kính gửi Quý công ty Mochi'].join('\n');

/** Chương 3 — Đoạn văn cho đẹp. */
export const WORD_PARA: Lesson[] = [
  L('word.para', 'align', 'Căn lề trái, giữa, phải, đều', 6, [
    {
      kind: 'explain',
      body: 'Bốn nút [[align|căn lề]] ở thẻ **Home** quyết định chữ nằm về phía nào của trang:\n\n- **Căn trái**: kiểu thường dùng nhất cho nội dung.\n- **Căn giữa**: đẹp cho **tiêu đề**.\n- **Căn phải**: hay dùng cho dòng **ngày tháng** ở đầu đơn.\n- **Căn đều**: hai mép trái phải đều thẳng, trông như sách báo.',
    },
    {
      kind: 'quiz',
      question: 'Dòng "Hà Nội, ngày 20 tháng 9" trong một lá đơn thường được căn thế nào?',
      choices: ['Căn phải', 'Căn giữa', 'Căn đều'],
      answer: 0,
      why: 'Đúng! Ngày tháng đặt ở góc phải phía trên là kiểu trình bày quen thuộc của đơn từ Việt Nam.',
    },
    wordPractice({
      text: LETTER,
      task: '**Căn giữa** dòng tiêu đề và **căn phải** dòng ngày tháng.',
      checks: [
        { kind: 'paragraphAlign', text: 'ĐƠN XIN VIỆC', align: 'center' },
        { kind: 'paragraphAlign', text: 'Hà Nội, ngày 20 tháng 9', align: 'right' },
      ],
      spotlight: { helpId: 'word.alignCenter' },
      hint: 'Chỉ cần bấm chuột vào trong dòng (không phải bôi đen cả dòng) rồi bấm nút căn lề.',
      steps: ['Bấm vào dòng ĐƠN XIN VIỆC.', 'Bấm nút Căn giữa.', 'Bấm vào dòng ngày tháng.', 'Bấm nút Căn phải.'],
      solve: () => [
        { type: 'selectText', text: 'ĐƠN XIN VIỆC' },
        { type: 'setAlign', align: 'center' },
        { type: 'selectText', text: 'Hà Nội, ngày 20 tháng 9' },
        { type: 'setAlign', align: 'right' },
      ],
    }),
  ]),

  L('word.para', 'spacing', 'Giãn dòng cho dễ đọc', 5, [
    {
      kind: 'explain',
      body: 'Các dòng sát nhau quá thì đọc mỏi mắt. Nút **Line Spacing** (giãn dòng) ở thẻ **Home** › nhóm **Paragraph** cho bạn chọn 1,0 — 1,5 — 2,0.\n\nĐơn từ hay dùng **1,5**: thoáng mà vẫn gọn trong một trang.',
    },
    wordPractice({
      text: LETTER,
      task: 'Đặt **giãn dòng 1,5** cho dòng "Kính gửi Quý công ty Mochi".',
      checks: [{ kind: 'lineHeight', text: 'Kính gửi Quý công ty Mochi', value: '1.5' }],
      spotlight: { helpId: 'word.lineHeight' },
      hint: 'Bấm vào dòng đó rồi mở nút Line Spacing ở thẻ Home › nhóm Paragraph, chọn 1,5.',
      steps: ['Bấm vào dòng Kính gửi Quý công ty Mochi.', 'Bấm nút Line Spacing (nhóm Paragraph).', 'Chọn 1,5.'],
      solve: () => [
        { type: 'selectText', text: 'Kính gửi Quý công ty Mochi' },
        { type: 'setLineHeight', value: '1.5' },
      ],
    }),
  ]),

  L('word.para', 'list', 'Danh sách chấm và danh sách số', 6, [
    {
      kind: 'explain',
      body: 'Hai kiểu danh sách:\n\n- **Danh sách chấm** (mỗi dòng một dấu chấm tròn): dùng khi thứ tự **không** quan trọng, ví dụ liệt kê kỹ năng.\n- **Danh sách số** (1, 2, 3…): dùng khi phải làm **theo thứ tự**, ví dụ các bước hướng dẫn.',
    },
    {
      kind: 'quiz',
      question: 'Liệt kê "các bước nộp hồ sơ" thì nên dùng danh sách nào?',
      choices: ['Danh sách số', 'Danh sách chấm', 'Không dùng danh sách'],
      answer: 0,
      why: 'Đúng! Có thứ tự trước sau thì dùng số, người đọc biết làm cái nào trước.',
    },
    wordPractice({
      text: ['Kỹ năng của tôi:', 'Gõ máy nhanh', 'Dùng Word và Excel', 'Chăm chỉ, đúng giờ'].join('\n'),
      task: 'Biến ba dòng kỹ năng thành **danh sách chấm**.',
      checks: [
        { kind: 'listType', text: 'Gõ máy nhanh', list: 'bullet' },
        { kind: 'listType', text: 'Dùng Word và Excel', list: 'bullet' },
        { kind: 'listType', text: 'Chăm chỉ, đúng giờ', list: 'bullet' },
      ],
      spotlight: { helpId: 'word.bullet' },
      hint: 'Bôi đen từ dòng "Gõ máy nhanh" xuống hết dòng cuối, rồi bấm nút danh sách chấm.',
      steps: ['Bôi đen ba dòng kỹ năng.', 'Bấm nút Danh sách chấm (•≡).', 'Ba dòng sẽ có dấu chấm ở đầu.'],
      solve: () => [
        { type: 'selectText', text: 'Gõ máy nhanh' },
        { type: 'toggleList', list: 'bullet' },
        { type: 'selectText', text: 'Dùng Word và Excel' },
        { type: 'toggleList', list: 'bullet' },
        { type: 'selectText', text: 'Chăm chỉ, đúng giờ' },
        { type: 'toggleList', list: 'bullet' },
      ],
    }),
  ]),
];
