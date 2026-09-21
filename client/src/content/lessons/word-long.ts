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

const REPORT = ['Giới thiệu', 'Tôi tên là Nam, 25 tuổi.', 'Kinh nghiệm', 'Tôi từng làm nhân viên bán hàng.', 'Kỹ năng mềm'].join('\n');

/** Chương 5 — Văn bản dài. */
export const WORD_LONG: Lesson[] = [
  L('word.long', 'heading', 'Heading 1, 2, 3', 7, [
    {
      kind: 'explain',
      body: '[[heading|Heading]] là **biển chỉ đường** của văn bản: nó nói cho người đọc biết phần này nói về cái gì.\n\n- **Heading 1**: mục lớn.\n- **Heading 2**: mục nhỏ nằm trong mục lớn.\n- **Heading 3**: nhỏ hơn nữa.\n\nĐặt kiểu đoạn ở ô **Kiểu đoạn** trên thẻ Home.',
    },
    {
      kind: 'quiz',
      question: 'Vì sao nên dùng Heading thay vì chỉ tô đậm cho chữ to lên?',
      choices: [
        'Vì Word dựa vào Heading để tự làm mục lục',
        'Vì Heading làm chữ đậm hơn nút B',
        'Vì Heading đổi được màu chữ',
      ],
      answer: 0,
      why: 'Đúng! Tô đậm chỉ làm chữ trông khác; Heading mới cho Word biết đây là tiêu đề để tự dựng mục lục.',
    },
    wordPractice({
      text: REPORT,
      task: 'Đặt **Giới thiệu** và **Kinh nghiệm** thành Heading 1, **Kỹ năng mềm** thành Heading 2.',
      checks: [
        { kind: 'headingLevel', text: 'Giới thiệu', level: 1 },
        { kind: 'headingLevel', text: 'Kinh nghiệm', level: 1 },
        { kind: 'headingLevel', text: 'Kỹ năng mềm', level: 2 },
      ],
      spotlight: { helpId: 'word.heading' },
      hint: 'Bấm vào dòng tiêu đề rồi chọn Heading 1 (hoặc Heading 2) ở ô Kiểu đoạn.',
      steps: ['Bấm vào dòng Giới thiệu, chọn Heading 1.', 'Bấm vào dòng Kinh nghiệm, chọn Heading 1.', 'Bấm vào dòng Kỹ năng mềm, chọn Heading 2.'],
      solve: () => [
        { type: 'selectText', text: 'Giới thiệu' },
        { type: 'setHeading', level: 1 },
        { type: 'selectText', text: 'Kinh nghiệm' },
        { type: 'setHeading', level: 1 },
        { type: 'selectText', text: 'Kỹ năng mềm' },
        { type: 'setHeading', level: 2 },
      ],
    }),
  ]),

  L('word.long', 'toc', 'Mục lục tự động', 6, [
    {
      kind: 'explain',
      mood: 'happy',
      body: 'Bài dài mấy trang thì nên có [[toc|mục lục]] ở đầu. Word **tự làm** mục lục từ các dòng Heading — bạn không phải gõ tay.\n\nMục lục nằm ở thẻ **References**. Sửa tiêu đề xong thì bấm **Cập nhật mục lục** cho khớp lại.',
    },
    wordPractice({
      text: REPORT,
      setup: () => [
        { type: 'selectText', text: 'Giới thiệu' },
        { type: 'setHeading', level: 1 },
        { type: 'selectText', text: 'Kinh nghiệm' },
        { type: 'setHeading', level: 1 },
      ],
      task: 'Bài đã có hai Heading. Hãy **chèn mục lục** ở đầu bài.',
      checks: [
        { kind: 'hasToc' },
        { kind: 'textContains', text: 'Mục lục' },
      ],
      spotlight: { helpId: 'word.toc' },
      hint: 'Mở thẻ References rồi bấm "Chèn mục lục".',
      steps: ['Mở thẻ References.', 'Bấm Chèn mục lục.', 'Mục lục hiện ra ở đầu trang.'],
      solve: () => [{ type: 'insertToc' }],
    }),
  ]),

  L('word.long', 'find', 'Tìm và thay thế', 6, [
    {
      kind: 'explain',
      body: 'Viết nhầm tên công ty ở mười chỗ? Không cần sửa từng chỗ.\n\n**Tìm & Thay thế** (thẻ **View**) tìm hết mọi chỗ rồi thay một lượt. Cẩn thận một chút: thay nhầm thì bấm **Hoàn tác** là về như cũ.',
    },
    {
      kind: 'quiz',
      question: 'Thay nhầm hàng loạt thì làm sao?',
      choices: ['Bấm Hoàn tác (Ctrl + Z)', 'Đóng Word không lưu', 'Gõ lại cả bài'],
      answer: 0,
      why: 'Đúng! Cả lần thay hàng loạt chỉ tính là một bước, hoàn tác một lần là về nguyên như cũ.',
    },
    wordPractice({
      text: ['Kính gửi công ty ABC', 'Tôi biết công ty ABC đang tuyển nhân viên.', 'Rất mong được làm việc tại công ty ABC.'].join('\n'),
      task: 'Thay mọi chữ **ABC** thành **Mochi**.',
      checks: [
        { kind: 'textNotContains', text: 'ABC' },
        { kind: 'textContains', text: 'công ty Mochi' },
      ],
      spotlight: { helpId: 'word.find' },
      hint: 'Thẻ View → Tìm & Thay thế. Gõ ABC ở ô Tìm, Mochi ở ô Thay bằng, rồi bấm Thay tất cả.',
      steps: ['Mở thẻ View.', 'Bấm Tìm & Thay thế.', 'Ô Tìm gõ: ABC', 'Ô Thay bằng gõ: Mochi', 'Bấm Thay tất cả.'],
      solve: () => [{ type: 'replaceAll', find: 'ABC', replace: 'Mochi' }],
    }),
  ]),
];
