import type { Lesson } from '@office-neko/shared';

export const basicsWelcome: Lesson = {
  id: 'basics.welcome',
  trackId: 'basics',
  chapterId: 'basics.start',
  title: 'Làm quen với Mochi',
  minutes: 3,
  steps: [
    {
      kind: 'explain',
      mood: 'happy',
      body: 'Chào bạn! Mình là **Mochi** 🐱. Mình sẽ cùng bạn học máy tính từ những bước đầu tiên: cầm [[mouse|chuột]], gõ [[keyboard|bàn phím]], rồi đến Word, Excel, PowerPoint và cách nhờ [[ai|AI]] giúp việc.',
    },
    {
      kind: 'explain',
      mood: 'neutral',
      body: 'Mỗi bài học có 3 kiểu bước:\n\n- **Giải thích**: Mochi kể cho bạn nghe.\n- **Thực hành**: bạn tự làm, Mochi chấm ngay.\n- **Câu hỏi nhanh**: chọn đáp án đúng.',
    },
    {
      kind: 'explain',
      mood: 'surprised',
      body: 'Gặp từ lạ? Chữ nào có **gạch chân chấm** như [[shortcut|phím tắt]] hay [[ribbon|Ribbon]] thì bấm vào để xem nghĩa. Bạn cũng mở được Từ điển bất cứ lúc nào bằng nút **?** tròn ở góc dưới bên phải, hoặc phím {{f1}}.',
    },
    {
      kind: 'quiz',
      question: 'Khi gặp một từ không hiểu, bạn nên làm gì?',
      choices: ['Bấm vào từ có gạch chân chấm hoặc mở Từ điển', 'Bỏ qua và đoán nghĩa', 'Tắt app đi'],
      answer: 0,
      why: 'Đúng rồi! Từ điển luôn sẵn sàng giúp bạn, cứ tra thoải mái nhé.',
    },
    {
      kind: 'quiz',
      question: 'Nếu dùng **Gợi ý** khi làm bài thì sao?',
      choices: ['Không được học tiếp nữa', 'Vẫn học tiếp được, chỉ bớt một chút sao', 'Mất hết tiến độ'],
      answer: 1,
      why: 'Chính xác! Gợi ý không bao giờ chặn bạn. Dùng ít gợi ý thì được nhiều sao hơn thôi.',
    },
    {
      kind: 'explain',
      mood: 'happy',
      body: 'Tuyệt vời! Bạn đã sẵn sàng rồi. Mình cùng bắt đầu hành trình nhé! 🎉',
    },
  ],
};
