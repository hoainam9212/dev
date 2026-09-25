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

/** Ribbon thẻ Home của Word thật, đủ từ Undo tới Editing. */
const HOME_SHOT = '/images/real/word-02-home.png';

const REPORT =['Giới thiệu', 'Tôi tên là Nam, 25 tuổi.', 'Kinh nghiệm', 'Tôi từng làm nhân viên bán hàng.', 'Kỹ năng mềm'].join('\n');

/** Chương 5 — Văn bản dài. */
export const WORD_LONG: Lesson[] = [
  L('word.long', 'heading', 'Heading 1, 2, 3', 7, [
    {
      kind: 'explain',
      body: '[[heading|Heading]] là **biển chỉ đường** của văn bản: nó nói cho người đọc biết phần này nói về cái gì.\n\n- **Heading 1**: mục lớn.\n- **Heading 2**: mục nhỏ nằm trong mục lớn.\n- **Heading 3**: nhỏ hơn nữa.\n\nĐặt kiểu đoạn ở thẻ **Home** › nhóm **Styles**: bấm ô **Heading 1**, **Heading 2**… (ô **Normal** là đoạn thường).',
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
      hint: 'Bấm vào dòng tiêu đề rồi bấm ô Heading 1 (hoặc Heading 2) ở thẻ Home › nhóm Styles.',
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
    {
      kind: 'realShot',
      image: HOME_SHOT,
      caption: 'Trên Word thật: thẻ Home › nhóm Styles',
      marks: [
        { x: 59.6, y: 45.5, w: 5.8, h: 34, label: 'Normal: đoạn văn thường' },
        { x: 71.4, y: 45.5, w: 5.6, h: 34, label: 'Heading 1: tiêu đề mục lớn' },
        { x: 77.5, y: 44.6, w: 1.8, h: 37, label: 'Nút ▾ (More): mở hết các kiểu, trong đó có Heading 2 và Heading 3' },
      ],
    },
  ]),

  L('word.long', 'toc', 'Mục lục tự động', 6, [
    {
      kind: 'explain',
      mood: 'happy',
      body: 'Bài dài mấy trang thì nên có [[toc|mục lục]] ở đầu. Word **tự làm** mục lục từ các dòng Heading — bạn không phải gõ tay.\n\nMục lục nằm ở thẻ **References** › nhóm **Table of Contents**. Sửa tiêu đề xong thì bấm **Update Table** (cập nhật mục lục) cho khớp lại.',
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
      hint: 'Thẻ References › nhóm Table of Contents › bấm nút Table of Contents.',
      steps: ['Mở thẻ References.', 'Bấm nút Table of Contents.', 'Mục lục hiện ra ở đầu trang.'],
      solve: () => [{ type: 'insertToc' }],
    }),
    {
      kind: 'realShot',
      image: '/images/real/word-08-references.png',
      caption: 'Trên Word thật: thẻ References › nhóm Table of Contents',
      marks: [
        { x: 1.0, y: 44.9, w: 6.1, h: 42.3, label: 'Nút Table of Contents: bấm rồi chọn một kiểu mục lục có sẵn' },
        { x: 7.5, y: 58.5, w: 9.9, h: 12, label: 'Update Table: cập nhật mục lục sau khi sửa các dòng Heading' },
      ],
    },
  ]),

  L('word.long', 'find', 'Tìm và thay thế', 6, [
    {
      kind: 'explain',
      body: 'Viết nhầm tên công ty ở mười chỗ? Không cần sửa từng chỗ.\n\n**Tìm & Thay thế** (thẻ **Home** › nhóm **Editing** › **Replace**, phím tắt **Ctrl + H**) tìm hết mọi chỗ rồi thay một lượt. Cẩn thận một chút: thay nhầm thì bấm **Hoàn tác** là về như cũ.',
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
      hint: 'Thẻ Home › nhóm Editing › Replace. Gõ ABC ở ô Tìm, Mochi ở ô Thay bằng, rồi bấm Thay tất cả.',
      steps: ['Ở thẻ Home, nhìn nhóm Editing ở cuối bên phải.', 'Bấm Replace.', 'Ô Tìm gõ: ABC', 'Ô Thay bằng gõ: Mochi', 'Bấm Thay tất cả.'],
      solve: () => [{ type: 'replaceAll', find: 'ABC', replace: 'Mochi' }],
    }),
    {
      kind: 'realShot',
      image: HOME_SHOT,
      caption: 'Trên Word thật: thẻ Home › nhóm Editing › nút Replace',
      marks: [{ x: 80.9, y: 59.5, w: 5.4, h: 11, label: 'Replace, phím tắt Ctrl + H: mở hộp Tìm & Thay thế' }],
    },
    {
      kind: 'realShot',
      image: '/images/real/word-04-replace-dialog.png',
      caption: 'Trên Word thật: hộp Find and Replace',
      marks: [
        { x: 24.1, y: 51.3, w: 6.3, h: 4.8, label: 'Thẻ Replace (thay thế) đang mở' },
        { x: 27.6, y: 57.8, w: 47.2, h: 4.5, label: 'Find what (ô Tìm): gõ chữ cần tìm, ví dụ ABC' },
        { x: 27.6, y: 71.4, w: 47.2, h: 4.5, label: 'Replace with (ô Thay bằng): gõ chữ mới, ví dụ Mochi' },
        { x: 49.2, y: 85.0, w: 7.8, h: 5.2, label: 'Replace All (Thay tất cả): thay mọi chỗ một lượt' },
      ],
    },
  ]),
];
