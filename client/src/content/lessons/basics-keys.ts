import type { Lesson } from '@office-neko/shared';
import { typingPractice } from '../lessonKit';

const base = { trackId: 'basics', chapterId: 'basics.keys', minutes: 4 } as const;

export const basicsKeys: Lesson[] = [
  {
    ...base,
    id: 'basics.keys.special',
    title: 'Các phím đặc biệt',
    osNote: { mac: 'Trên Mac, phím xoá lùi có tên **delete**, còn phím Enter có tên **return**.' },
    steps: [
      { kind: 'explain', body: 'Làm quen vài phím quan trọng:\n\n- [[enter|Enter]] {{enter}}: xuống dòng, hoặc xác nhận.\n- [[shift|Shift]] {{shift}}: giữ để gõ chữ HOA.\n- [[backspace|Backspace]] {{backspace}}: xoá chữ phía trước con trỏ.\n- [[space-bar|Phím cách]]: tạo khoảng trắng giữa các từ.\n- [[esc|Esc]], [[tab|Tab]] và các [[arrow-keys|phím mũi tên]].' },
      { kind: 'quiz', question: 'Muốn gõ chữ **M** hoa, bạn làm thế nào?', choices: ['Giữ Shift rồi bấm M', 'Bấm M hai lần', 'Bấm Enter rồi bấm M'], answer: 0, why: 'Đúng! Giữ Shift rồi bấm chữ cái sẽ ra chữ hoa.' },
      typingPractice({ task: 'Gõ lại câu sau (có chữ hoa và dấu chấm). Gõ sai thì dùng {{backspace}} để xoá.', target: 'Xin chao Mochi.', hint: 'Giữ Shift khi gõ chữ X và M.', steps: ['Giữ Shift, bấm X.', 'Gõ tiếp “in chao ”.', 'Giữ Shift, bấm M, rồi gõ “ochi.”'] }),
    ],
  },
  {
    ...base,
    id: 'basics.keys.shortcuts',
    title: 'Phím tắt hay dùng',
    steps: [
      { kind: 'explain', body: '[[shortcut|Phím tắt]] giúp làm việc nhanh hơn:\n\n- {{mod+c}} [[copy|sao chép]]\n- {{mod+v}} [[paste|dán]]\n- {{mod+x}} cắt\n- {{mod+z}} [[undo|hoàn tác]]\n- {{mod+s}} [[save|lưu]]\n\nCách bấm: **giữ** phím đầu tiên, rồi bấm phím thứ hai.' },
      { kind: 'quiz', question: 'Lỡ tay xoá mất một đoạn chữ, phím tắt nào lấy lại?', choices: ['{{mod+z}}', '{{mod+s}}', '{{mod+c}}'], answer: 0, why: '{{mod+z}} là hoàn tác: quay lại thao tác vừa làm.' },
      { kind: 'quiz', question: 'Muốn dán thứ vừa sao chép, bạn bấm…', choices: ['{{mod+v}}', '{{mod+x}}', '{{mod+z}}'], answer: 0, why: 'Chính xác! {{mod+v}} là dán.' },
    ],
  },
];
