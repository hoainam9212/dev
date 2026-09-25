import type { Lesson } from '@office-neko/shared';
import { wordPractice } from '../lessonKit';

/** Ribbon thẻ Home của Word thật, đủ từ Undo tới Editing. */
const HOME_SHOT = '/images/real/word-02-home.png';

const L = (chapterId: string, id: string, title: string, minutes: number, steps: Lesson['steps']): Lesson => ({
  trackId: 'word',
  chapterId,
  id: `word.${id}`,
  title,
  minutes,
  steps,
});

/** Chương 2 — Định dạng chữ. */
export const WORD_FORMAT: Lesson[] = [
  L('word.format', 'bold', 'In đậm, in nghiêng, gạch chân', 6, [
    {
      kind: 'explain',
      mood: 'happy',
      body: 'Ba nút hay dùng nhất nằm ở thẻ **Home**:\n\n- **B** ([[bold|Bold]]): chữ **đậm** lên, dùng cho tiêu đề hoặc chỗ quan trọng.\n- **I** ([[italic|Italic]]): chữ nghiêng đi, dùng cho ghi chú hay tên sách.\n- **U** ([[underline|Underline]]): chữ có gạch chân.\n\nNhớ quy tắc vàng: **bôi đen chữ trước, bấm nút sau**.',
    },
    {
      kind: 'quiz',
      question: 'Phím tắt để in đậm chữ đang chọn là gì?',
      choices: ['Ctrl + B', 'Ctrl + Đ', 'Ctrl + P'],
      answer: 0,
      why: 'Đúng! B là chữ đầu của Bold. Ctrl + I là nghiêng, Ctrl + U là gạch chân.',
    },
    wordPractice({
      text: 'ĐƠN XIN VIỆC\nTrân trọng',
      task: 'Làm **đậm** dòng ĐƠN XIN VIỆC, và **gạch chân** dòng Trân trọng.',
      checks: [
        { kind: 'markOnText', text: 'ĐƠN XIN VIỆC', mark: 'bold' },
        { kind: 'markOnText', text: 'Trân trọng', mark: 'underline' },
      ],
      spotlight: { helpId: 'word.bold' },
      hint: 'Bôi đen từng dòng một, rồi bấm nút B hoặc nút U ở thẻ Home.',
      steps: ['Bôi đen dòng ĐƠN XIN VIỆC.', 'Bấm nút B.', 'Bôi đen dòng Trân trọng.', 'Bấm nút U.'],
      solve: () => [
        { type: 'selectText', text: 'ĐƠN XIN VIỆC' },
        { type: 'toggleMark', mark: 'bold' },
        { type: 'selectText', text: 'Trân trọng' },
        { type: 'toggleMark', mark: 'underline' },
      ],
    }),
    {
      kind: 'realShot',
      image: HOME_SHOT,
      caption: 'Trên Word thật: thẻ Home › nhóm Font',
      marks: [
        { x: 7.3, y: 68.8, w: 1.7, h: 13, label: 'Bold (B), phím tắt Ctrl + B: in đậm' },
        { x: 9.1, y: 68.8, w: 1.7, h: 13, label: 'Italic (I), phím tắt Ctrl + I: in nghiêng' },
        { x: 10.9, y: 68.8, w: 2.6, h: 13, label: 'Underline (U), phím tắt Ctrl + U: gạch chân. Mũi tên ▾ bên cạnh để chọn kiểu gạch' },
      ],
    },
  ]),

  L('word.format', 'font', 'Phông chữ và cỡ chữ', 6, [
    {
      kind: 'explain',
      body: '[[font|Phông chữ]] là **nét chữ**: Times New Roman trông cổ điển, Arial trông hiện đại. Đơn xin việc ở Việt Nam thường dùng **Times New Roman**.\n\nCỡ chữ đo bằng **pt**: chữ trong bài thường 12pt, tiêu đề 16pt hoặc lớn hơn. Hai ô này nằm đầu thẻ **Home**.',
    },
    wordPractice({
      text: 'ĐƠN XIN VIỆC',
      task: 'Đổi dòng tiêu đề sang phông **Times New Roman**, cỡ **16pt**.',
      checks: [
        { kind: 'markOnText', text: 'ĐƠN XIN VIỆC', mark: 'fontFamily', value: 'Times New Roman' },
        { kind: 'markOnText', text: 'ĐƠN XIN VIỆC', mark: 'fontSize', value: '16pt' },
      ],
      spotlight: { helpId: 'word.font' },
      hint: 'Bôi đen cả dòng rồi chọn ở hai ô đầu thẻ Home: ô phông chữ và ô cỡ chữ.',
      steps: ['Bôi đen dòng ĐƠN XIN VIỆC.', 'Ở ô phông chữ chọn Times New Roman.', 'Ở ô cỡ chữ chọn 16.'],
      solve: () => [
        { type: 'selectText', text: 'ĐƠN XIN VIỆC' },
        { type: 'setStyle', attr: 'fontFamily', value: 'Times New Roman' },
        { type: 'setStyle', attr: 'fontSize', value: '16pt' },
      ],
    }),
    {
      kind: 'realShot',
      image: HOME_SHOT,
      caption: 'Trên Word thật: thẻ Home › nhóm Font',
      marks: [
        { x: 7.1, y: 47.5, w: 8.7, h: 13.5, label: 'Ô phông chữ (Font): bấm ▾ rồi chọn Times New Roman. Tên phông đang hiện tuỳ từng máy' },
        { x: 15.8, y: 47.5, w: 4.2, h: 13.5, label: 'Ô cỡ chữ (Font Size): bấm ▾ rồi chọn 16' },
      ],
    },
  ]),

  L('word.format', 'color', 'Màu chữ và tô nền', 5, [
    {
      kind: 'explain',
      body: 'Hai nút cạnh nhau, dễ nhầm:\n\n- **Màu chữ**: đổi màu của chính nét chữ.\n- **[[highlight|Tô nền]]**: tô một mảng màu **phía sau** chữ, như dùng bút dạ quang đánh dấu.\n\nDùng vừa phải thôi: một trang mà bảy màu thì đọc rất mệt.',
    },
    wordPractice({
      text: 'ĐƠN XIN VIỆC\nHà Nội, ngày 20 tháng 9',
      task: 'Tô nền **vàng** cho dòng ngày tháng, và đổi **màu chữ** cho dòng tiêu đề.',
      checks: [
        { kind: 'markOnText', text: 'Hà Nội, ngày 20 tháng 9', mark: 'highlight' },
        { kind: 'markOnText', text: 'ĐƠN XIN VIỆC', mark: 'color' },
      ],
      spotlight: { helpId: 'word.highlight' },
      hint: 'Bôi đen dòng ngày tháng rồi chọn màu ở ô "Tô nền"; bôi đen tiêu đề rồi chọn ở ô "Màu chữ".',
      steps: ['Bôi đen dòng ngày tháng.', 'Ở ô Tô nền chọn màu vàng.', 'Bôi đen dòng tiêu đề.', 'Ở ô Màu chữ chọn một màu bạn thích.'],
      solve: () => [
        { type: 'selectText', text: 'Hà Nội, ngày 20 tháng 9' },
        { type: 'setHighlight', color: '#FFF3B0' },
        { type: 'selectText', text: 'ĐƠN XIN VIỆC' },
        { type: 'setStyle', attr: 'color', value: '#C2185B' },
      ],
    }),
    {
      kind: 'realShot',
      image: HOME_SHOT,
      caption: 'Trên Word thật: thẻ Home › nhóm Font',
      marks: [
        { x: 23.9, y: 68.8, w: 2.4, h: 13, label: 'Tô nền (Text Highlight Color), hình cây bút dạ: bấm ▾ để chọn màu vàng' },
        { x: 27.1, y: 68.8, w: 2.2, h: 13, label: 'Màu chữ (Font Color), chữ A có vạch màu: bấm ▾ để chọn màu' },
      ],
    },
  ]),
];
