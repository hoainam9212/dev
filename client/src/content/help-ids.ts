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
  'desktop.newFolder': { label: 'Thư mục mới', vi: 'Tạo một thư mục mới ngay trong thư mục đang mở.' },
  'desktop.rename': { label: 'Đổi tên', vi: 'Đặt lại tên cho mục đang chọn (Windows: F2, Mac: Enter).' },
  'desktop.delete': { label: 'Xoá', vi: 'Chuyển mục đang chọn vào thùng rác.' },
  'desktop.copy': { label: 'Sao chép', vi: 'Chép mục đang chọn để dán sang chỗ khác.' },
  'desktop.cut': { label: 'Cắt', vi: 'Cắt mục đang chọn để chuyển sang chỗ khác.' },
  'desktop.paste': { label: 'Dán', vi: 'Dán thứ vừa sao chép hoặc cắt vào thư mục đang mở.' },
  'desktop.undo': { label: 'Hoàn tác', vi: 'Quay lại thao tác vừa làm.' },
  'desktop.up': { label: 'Lên', vi: 'Quay ra thư mục bên ngoài.' },
  'desktop.restore': { label: 'Khôi phục', vi: 'Đưa mục đang chọn về lại chỗ cũ.' },
  'desktop.emptyTrash': { label: 'Dọn sạch thùng rác', vi: 'Xoá hẳn mọi thứ trong thùng rác. Không lấy lại được nữa!' },
  'desktop.trash': { label: 'Thùng rác', vi: 'Mở thùng rác, hoặc kéo file thả vào đây để xoá.' },
  'desktop.address': { label: 'Thanh địa chỉ', vi: 'Cho biết bạn đang ở thư mục nào.' },
  'keyboard.area': { label: 'Vùng gõ phím', vi: 'Bấm vào đây rồi gõ theo dòng chữ. Chữ xanh là đúng, chữ đỏ là sai.' },
  'keyboard.board': { label: 'Bàn phím ảo', vi: 'Phím sáng viền hồng là phím cần bấm tiếp theo. Màu phím cho biết dùng ngón nào.' },
};
