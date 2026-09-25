import type { Lesson } from '@office-neko/shared';
import { wordSim } from '@office-neko/shared';
import { wordPractice } from '../lessonKit';

/** Vị trí ngay sau đoạn chữ `text` trong tài liệu của bài. */
const findEnd = (s: wordSim.WordState, text: string): number => wordSim.findText(s.doc, text)?.to ?? s.sel.to;

const L = (chapterId: string, id: string, title: string, minutes: number, steps: Lesson['steps']): Lesson => ({
  trackId: 'word',
  chapterId,
  id: `word.${id}`,
  title,
  minutes,
  steps,
});

/** Chương 1 — Làm quen trang giấy. */
export const WORD_BASICS: Lesson[] = [
  L('word.start', 'intro', 'Word dùng để làm gì', 4, [
    {
      kind: 'explain',
      mood: 'happy',
      body: 'Word là chỗ để bạn **viết chữ trên máy tính**: đơn từ, thư, báo cáo, danh sách việc cần làm.\n\nMàn hình Word có một **trang giấy** ở giữa. Trang này đúng bằng tờ [[a4|A4]] mà bạn hay in — gõ tới đâu, chữ nằm vào trang tới đó.',
    },
    {
      kind: 'explain',
      body: 'Phía trên trang giấy là [[ribbon|Ribbon]] — hộp đồ nghề của Word. Các nút được xếp theo **thẻ**: File, Home, Insert, Layout, References, View.\n\nHôm nay bạn chỉ cần nhớ: **muốn làm gì với chữ, tìm nút ở hàng trên**.',
    },
    {
      kind: 'quiz',
      question: '[[ribbon|Ribbon]] trong Word là gì?',
      choices: ['Hàng nút ở phía trên để làm việc với chữ', 'Tên của trang giấy', 'Một loại phông chữ'],
      answer: 0,
      why: 'Đúng rồi! Ribbon là hộp đồ nghề: bấm đậm, đổi phông, chèn bảng… đều ở đó.',
    },
    wordPractice({
      task: 'Bấm vào trang giấy rồi gõ dòng: **Kính gửi Quý công ty**',
      checks: [{ kind: 'textContains', text: 'Kính gửi Quý công ty' }],
      spotlight: { helpId: 'word.editor' },
      hint: 'Bấm chuột vào giữa trang giấy trắng, thấy con trỏ nhấp nháy là gõ được.',
      steps: ['Bấm chuột vào trang giấy.', 'Gõ: Kính gửi Quý công ty', 'Gõ sai thì bấm Backspace xoá rồi gõ lại.'],
      solve: () => [{ type: 'insertText', text: 'Kính gửi Quý công ty' }],
    }),
    {
      kind: 'realShot',
      image: '/images/real/word-01-window.png',
      caption: 'Trên Word thật: cửa sổ Word với một tài liệu trống',
      marks: [
        { x: 0.3, y: 3.4, w: 72.5, h: 2.7, label: 'Các thẻ: File, Home, Insert… Bấm một thẻ để đổi hàng nút bên dưới' },
        { x: 0.3, y: 6.2, w: 99.2, h: 9, label: 'Ribbon: hàng nút của thẻ đang mở, ở đây là thẻ Home' },
        { x: 0.3, y: 16, w: 99.2, h: 81.5, label: 'Trang giấy: bấm vào đây rồi gõ chữ' },
      ],
    },
  ]),

  L('word.start', 'edit', 'Gõ, xuống dòng và sửa sai', 5, [
    {
      kind: 'explain',
      body: 'Ba phím dùng suốt khi soạn thảo:\n\n- **Enter**: xuống dòng, bắt đầu một đoạn mới.\n- **[[backspace|Backspace]]**: xoá chữ bên **trái** con trỏ.\n- **Space**: một khoảng trắng giữa hai chữ.\n\nGõ sai không sao cả — xoá đi gõ lại, giấy này không rách.',
    },
    wordPractice({
      text: 'Tôi tên là Nam',
      task: 'Đặt con trỏ ở cuối dòng, bấm **Enter** rồi gõ dòng thứ hai: **Tôi 25 tuổi**',
      checks: [
        { kind: 'textContains', text: 'Tôi tên là Nam' },
        { kind: 'textContains', text: 'Tôi 25 tuổi' },
      ],
      spotlight: { helpId: 'word.editor' },
      hint: 'Bấm chuột vào ngay sau chữ "Nam", rồi mới bấm Enter.',
      steps: ['Bấm chuột vào cuối dòng, sau chữ Nam.', 'Bấm phím Enter.', 'Gõ: Tôi 25 tuổi'],
      // Đưa con trỏ về CUỐI dòng rồi mới Enter — `wordInitial` đặt con trỏ ở đầu đoạn.
      solve: (s0) => {
        const end = findEnd(s0, 'Tôi tên là Nam');
        return [
          { type: 'setSelection', from: end, to: end },
          { type: 'splitBlock' },
          { type: 'insertText', text: 'Tôi 25 tuổi' },
        ];
      },
    }),
  ]),

  L('word.start', 'select', 'Chọn chữ trước khi làm gì', 5, [
    {
      kind: 'explain',
      mood: 'happy',
      body: 'Quy tắc vàng của Word: **chọn chữ trước, làm sau**.\n\nMuốn đổi chữ nào — in đậm, đổi màu, xoá đi — thì phải **bôi đen** chữ đó trước. Bôi đen bằng cách giữ chuột trái rồi kéo từ đầu tới cuối đoạn chữ.',
    },
    {
      kind: 'explain',
      body: 'Mẹo nhỏ:\n\n- **Nháy đúp** vào một từ: chọn cả từ đó.\n- Gõ chữ mới khi đang bôi đen: chữ mới **thay** chỗ chữ cũ.',
    },
    wordPractice({
      text: 'Kính gửi Quý công ty ABC',
      task: 'Bôi đen chữ **ABC** rồi gõ **Mochi** để thay tên công ty.',
      checks: [
        { kind: 'textContains', text: 'Quý công ty Mochi' },
        { kind: 'textNotContains', text: 'ABC' },
      ],
      spotlight: { helpId: 'word.editor' },
      hint: 'Nháy đúp chuột vào chữ ABC là chọn được cả từ, rồi gõ Mochi đè lên.',
      steps: ['Nháy đúp vào chữ ABC.', 'Thấy chữ ABC được bôi đen.', 'Gõ: Mochi'],
      solve: () => [
        { type: 'selectText', text: 'ABC' },
        { type: 'insertText', text: 'Mochi' },
      ],
    }),
  ]),
];
