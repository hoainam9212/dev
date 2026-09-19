import type { HelpIdEntry } from '@office-neko/shared';

/** Chú thích khi rê chuột vào phần tử có `data-help-id`. Các trình mô phỏng thêm mục của mình ở đây. */
export const HELP_IDS: Record<string, HelpIdEntry> = {
  'app.help': { label: 'Trợ giúp (F1)', vi: 'Mở Từ điển thuật ngữ và Hỏi Mèo.' },
  'app.settings': { label: 'Cài đặt', vi: 'Đổi hệ điều hành, cỡ chữ, sao lưu tiến độ.' },
  'player.hint': { label: 'Gợi ý', vi: 'Xem gợi ý từng bậc. Dùng gợi ý sẽ bớt một chút sao.' },
  'player.check': { label: 'Kiểm tra', vi: 'Nhờ Mochi chấm bài bạn vừa làm.' },
  'player.close': { label: 'Thoát bài', vi: 'Quay về bản đồ. Bài đang học dở sẽ không được lưu.' },
  'mouse.target': { label: 'Mục tiêu', vi: 'Đưa chuột tới đây rồi thao tác theo đề bài.' },
  'mouse.basket': { label: 'Giỏ cá', vi: 'Kéo cá thả vào giỏ này.' },
};
