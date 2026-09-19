import type { Lesson } from '@office-neko/shared';
import { mousePractice } from '../lessonKit';

const base = { trackId: 'basics', chapterId: 'basics.mouse', minutes: 3 } as const;

export const basicsMouse: Lesson[] = [
  {
    ...base,
    id: 'basics.mouse.click',
    title: 'Nhấp chuột',
    steps: [
      { kind: 'explain', mood: 'happy', body: 'Đặt tay lên [[mouse|chuột]]: lòng bàn tay úp nhẹ, ngón trỏ trên nút **trái**, ngón giữa trên nút **phải**.\n\nKhi di chuột, mũi tên ([[cursor|con trỏ]]) trên màn hình di theo.' },
      { kind: 'explain', body: '[[click|Nhấp chuột]] là nhấn nút trái **một lần** rồi thả ra. Đây là cách chọn một thứ trên màn hình.' },
      mousePractice({ game: 'click', total: 6, task: 'Nhấp vào tất cả **bong bóng** 🫧. Cố đừng bấm ra ngoài nhé!', hint: 'Di mũi tên tới đúng bong bóng rồi mới bấm nút trái.', steps: ['Di chuột tới một bong bóng.', 'Nhấn nút trái một lần.', 'Làm tiếp với các bong bóng còn lại.'] }),
      { kind: 'quiz', question: 'Muốn chọn một biểu tượng, bạn làm gì?', choices: ['Nhấp chuột trái một lần', 'Nhấp chuột phải', 'Lắc chuột thật mạnh'], answer: 0, why: 'Đúng! Nhấp trái một lần là để chọn.' },
    ],
  },
  {
    ...base,
    id: 'basics.mouse.double',
    title: 'Nhấp đúp',
    steps: [
      { kind: 'explain', body: '[[double-click|Nhấp đúp]] là bấm nút trái **hai lần thật nhanh**. Ta dùng nó để **mở** file hoặc thư mục.\n\nMẹo: giữ chuột thật yên giữa hai lần bấm.' },
      mousePractice({ game: 'double', total: 4, task: 'Nhấp đúp để mở hết các **hộp quà** 🎁.', hint: 'Bấm hai lần liên tiếp thật nhanh, không di chuột giữa hai lần bấm.', steps: ['Đặt mũi tên lên hộp quà.', 'Bấm nút trái 2 lần liên tiếp thật nhanh.'] }),
    ],
  },
  {
    ...base,
    id: 'basics.mouse.right',
    title: 'Nhấp chuột phải',
    osNote: { mac: 'Trên Mac: giữ phím control rồi bấm, hoặc chạm HAI ngón lên trackpad. Cách này gọi là [[control-click|Control-click]].' },
    steps: [
      { kind: 'explain', body: '[[right-click|Nhấp chuột phải]] mở ra [[context-menu|menu ngữ cảnh]]: danh sách các việc có thể làm với thứ bạn đang trỏ vào.' },
      mousePractice({ game: 'right', total: 3, task: 'Nhấp chuột phải vào từng **thùng** 📦, rồi chọn **🎁 Mở quà** trong menu.', hint: 'Dùng nút bên phải (Mac: control + bấm, hoặc chạm hai ngón).', steps: ['Nhấp chuột phải vào thùng.', 'Trong menu hiện ra, chọn “🎁 Mở quà”.'] }),
      { kind: 'quiz', question: 'Nhấp chuột phải dùng để làm gì?', choices: ['Mở menu các việc có thể làm', 'Tắt máy', 'Gõ chữ'], answer: 0, why: 'Chính xác! Menu chuột phải rất hữu ích: sao chép, đổi tên, xoá…' },
    ],
  },
  {
    ...base,
    id: 'basics.mouse.drag',
    title: 'Kéo và thả',
    steps: [
      { kind: 'explain', body: '[[drag-and-drop|Kéo và thả]]: nhấn **giữ** nút trái lên một thứ, di chuột tới chỗ mới, rồi **thả** tay ra. Ta hay dùng cách này để chuyển file vào thư mục.' },
      mousePractice({ game: 'drag', total: 4, task: 'Kéo từng chú **cá** 🐟 thả vào **giỏ** 🧺 cho Mochi.', hint: 'Đừng thả tay giữa chừng: giữ nút trái cho tới khi cá nằm trên giỏ.', steps: ['Nhấn giữ nút trái lên con cá.', 'Di chuột tới giỏ (vẫn giữ nút).', 'Thả tay ra.'] }),
    ],
  },
  {
    ...base,
    id: 'basics.mouse.scroll',
    title: 'Cuộn trang',
    steps: [
      { kind: 'explain', body: '[[scroll|Cuộn]] giúp xem phần bị khuất bên dưới. Lăn **bánh xe** giữa chuột, hoặc vuốt **hai ngón** trên touchpad.' },
      mousePractice({ game: 'scroll', total: 3, task: 'Cuộn xuống để tìm 3 chú **mèo** 🐱 đang trốn, rồi nhấp vào từng chú.', hint: 'Đặt chuột bên trong khung xanh rồi lăn bánh xe xuống.', steps: ['Đưa chuột vào khung xanh.', 'Lăn bánh xe xuống dưới.', 'Thấy mèo thì nhấp vào.'] }),
    ],
  },
];
