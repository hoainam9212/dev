import type { Lesson } from '@office-neko/shared';
import { wordPractice } from '../lessonKit';

const TITLE = 'ĐƠN XIN VIỆC';
const DATE = 'Hà Nội, ngày 20 tháng 9 năm 2026';
const TO = 'Kính gửi Quý công ty Mochi';
const BODY = 'Tôi tên là Nam, tôi xin ứng tuyển vị trí nhân viên văn phòng.';

/** Tài liệu sau chặng 1 — chặng 2 và 3 bắt đầu từ đây. */
const LETTER = [TITLE, DATE, TO, BODY].join('\n');

/** Chương 6 — Dự án: Đơn xin việc. */
export const WORD_PROJECT: Lesson[] = [
  {
    trackId: 'word',
    chapterId: 'word.final',
    id: 'word.project',
    title: 'Dự án: viết Đơn xin việc',
    minutes: 15,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Đến lúc làm thật rồi! Bạn sẽ viết một **lá đơn xin việc** hoàn chỉnh, qua ba chặng:\n\n1. Gõ đủ nội dung.\n2. Trình bày cho đẹp.\n3. Thêm danh sách, ảnh rồi lưu lại.\n\nLàm xong chặng nào Mochi chấm chặng đó, không phải làm lại từ đầu.',
      },

      // Chặng 1 — nội dung
      wordPractice({
        task: 'Chặng 1: gõ đủ **4 dòng** của lá đơn (tiêu đề, ngày tháng, kính gửi, và câu giới thiệu bản thân).',
        checks: [
          { kind: 'textContains', text: TITLE },
          { kind: 'textContains', text: 'ngày 20 tháng 9' },
          { kind: 'textContains', text: 'Kính gửi' },
          { kind: 'textContains', text: 'ứng tuyển' },
        ],
        spotlight: { helpId: 'word.editor' },
        hint: 'Gõ từng dòng một, hết dòng thì bấm Enter để xuống dòng mới.',
        steps: [`Gõ: ${TITLE}`, 'Bấm Enter.', `Gõ: ${DATE}`, 'Bấm Enter.', `Gõ: ${TO}`, 'Bấm Enter.', `Gõ: ${BODY}`],
        solve: () => [{ type: 'setDoc', doc: { type: 'doc', content: [TITLE, DATE, TO, BODY].map((line) => ({ type: 'paragraph', content: [{ type: 'text', text: line }] })) } }],
      }),

      // Chặng 2 — trình bày
      wordPractice({
        text: LETTER,
        task: 'Chặng 2: **căn giữa** và **in đậm** tiêu đề (cỡ 16pt), **căn phải** dòng ngày tháng.',
        checks: [
          { kind: 'paragraphAlign', text: TITLE, align: 'center' },
          { kind: 'markOnText', text: TITLE, mark: 'bold' },
          { kind: 'markOnText', text: TITLE, mark: 'fontSize', value: '16pt' },
          { kind: 'paragraphAlign', text: DATE, align: 'right' },
        ],
        spotlight: { helpId: 'word.alignCenter' },
        hint: 'Bôi đen tiêu đề rồi làm ba việc: Căn giữa, nút B, cỡ chữ 16.',
        steps: ['Bôi đen dòng tiêu đề.', 'Bấm Căn giữa.', 'Bấm nút B.', 'Chọn cỡ chữ 16.', 'Bấm vào dòng ngày tháng, bấm Căn phải.'],
        solve: () => [
          { type: 'selectText', text: TITLE },
          { type: 'setAlign', align: 'center' },
          { type: 'toggleMark', mark: 'bold' },
          { type: 'setStyle', attr: 'fontSize', value: '16pt' },
          { type: 'selectText', text: DATE },
          { type: 'setAlign', align: 'right' },
        ],
      }),

      // Chặng 3 — hoàn thiện và lưu
      wordPractice({
        text: [LETTER, 'Gõ máy nhanh', 'Dùng được Word', 'Chăm chỉ, đúng giờ'].join('\n'),
        task: 'Chặng 3: biến ba dòng kỹ năng thành **danh sách chấm**, chèn **một ảnh**, rồi **lưu** với tên `don-xin-viec.docx`.',
        checks: [
          { kind: 'listType', text: 'Gõ máy nhanh', list: 'bullet' },
          { kind: 'imageCount', count: 1 },
          { kind: 'saved', name: 'don-xin-viec.docx' },
        ],
        spotlight: { helpId: 'word.save' },
        hint: 'Danh sách ở thẻ Home, ảnh ở thẻ Insert, lưu ở thẻ File.',
        steps: [
          'Bôi đen ba dòng kỹ năng, bấm Danh sách chấm.',
          'Thẻ Insert › Pictures → chọn một ảnh.',
          'Thẻ File › Save As.',
          'Gõ tên: don-xin-viec.docx rồi bấm Lưu.',
        ],
        solve: () => [
          { type: 'selectText', text: 'Gõ máy nhanh' },
          { type: 'toggleList', list: 'bullet' },
          { type: 'selectText', text: 'Dùng được Word' },
          { type: 'toggleList', list: 'bullet' },
          { type: 'selectText', text: 'Chăm chỉ, đúng giờ' },
          { type: 'toggleList', list: 'bullet' },
          { type: 'insertImage', src: '/images/word/meo.svg', alt: 'Mèo Mochi' },
          { type: 'save', name: 'don-xin-viec.docx', at: 0 },
        ],
      }),

      {
        kind: 'explain',
        mood: 'happy',
        body: 'Xong rồi! Bạn vừa tự tay soạn một lá đơn hoàn chỉnh: gõ chữ, trình bày, danh sách, ảnh và lưu lại. 🎉\n\nNhững thứ này dùng được cho mọi văn bản khác: đơn từ, báo cáo, thư mời. Mochi tự hào về bạn!',
      },
    ],
  },
];
