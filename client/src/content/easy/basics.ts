import type { EasyLesson } from './types';

/** Lời dễ cho lộ trình Làm quen máy tính (bản Windows). */
export const BASICS_EASY: Record<string, EasyLesson> = {
  'basics.mouse.click': {
    steps: {
      0: {
        kind: 'explain',
        body: 'Đặt bàn tay lên [[mouse|con chuột]], lòng bàn tay úp nhẹ lên lưng chuột.\n\nNgón **trỏ** đặt lên nút bên **trái**. Ngón **giữa** đặt lên nút bên **phải**.\n\nBạn đẩy chuột trên mặt bàn thì **mũi tên** trên màn hình cũng chạy theo. Mũi tên này gọi là [[cursor|con trỏ]].',
      },
      1: {
        kind: 'explain',
        body: '[[click|Nhấp chuột]] nghĩa là: ấn ngón trỏ xuống nút **trái một lần**, nghe "tách" một tiếng, rồi nhấc ngón tay lên.\n\nNhấp chuột dùng để **chọn** một thứ trên màn hình.',
      },
      2: {
        kind: 'practice',
        task: 'Trên màn hình có các **bong bóng** 🫧. Bạn đưa mũi tên tới từng bong bóng rồi nhấp chuột một cái để làm nó vỡ.',
        hint: 'Đưa mũi tên nằm ngay trên bong bóng rồi mới ấn nút trái. Không cần vội.',
        steps: ['Đẩy chuột nhẹ nhàng cho mũi tên tới một bong bóng.', 'Ấn nút trái một lần rồi nhấc tay lên.', 'Làm giống vậy với các bong bóng còn lại.'],
      },
      3: {
        kind: 'quiz',
        question: 'Muốn chọn một hình nhỏ trên màn hình, bạn làm thế nào?',
        choices: ['Ấn nút trái một lần', 'Ấn nút phải', 'Lắc chuột thật mạnh'],
        why: 'Đúng rồi! Ấn nút trái một lần là để chọn.',
      },
    },
  },
};
