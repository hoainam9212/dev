import type { Track } from '@office-neko/shared';

export const TRACKS: Track[] = [
  {
    id: 'basics', order: 0, title: 'Làm quen máy tính', emoji: '🖱️', color: '#FFB38A',
    blurb: 'Cầm chuột, bấm phím, sắp xếp thư mục và file.',
    chapters: [
      { id: 'basics.start', title: 'Bắt đầu cùng Mochi', lessonIds: ['basics.welcome'] },
      { id: 'basics.mouse', title: 'Cầm chuột', lessonIds: ['basics.mouse.click', 'basics.mouse.double', 'basics.mouse.right', 'basics.mouse.drag', 'basics.mouse.scroll'] },
      { id: 'basics.keys', title: 'Làm quen bàn phím', lessonIds: ['basics.keys.special', 'basics.keys.shortcuts'] },
    ],
  },
  { id: 'typing', order: 1, title: 'Gõ phím 10 ngón', emoji: '⌨️', color: '#A0D8FF', blurb: 'Gõ nhanh, gõ đúng, gõ tiếng Việt có dấu.', chapters: [] },
  { id: 'word', order: 2, title: 'Word – Soạn thảo văn bản', emoji: '📝', color: '#7FB2FF', blurb: 'Viết đơn, định dạng chữ, chèn bảng và ảnh.', chapters: [] },
  { id: 'excel', order: 3, title: 'Excel – Bảng tính', emoji: '📊', color: '#3FB871', blurb: 'Nhập số liệu, tính toán bằng công thức, vẽ biểu đồ.', chapters: [] },
  { id: 'ppt', order: 4, title: 'PowerPoint – Trình chiếu', emoji: '🎞️', color: '#FFA878', blurb: 'Làm slide đẹp và trình bày tự tin.', chapters: [] },
  { id: 'ai', order: 5, title: 'Dùng AI (Claude) trong công việc', emoji: '🤖', color: '#C8B6FF', blurb: 'Viết prompt tốt, dùng AI an toàn và kiểm chứng kết quả.', chapters: [] },
];
