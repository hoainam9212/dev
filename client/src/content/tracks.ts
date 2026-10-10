import type { Track } from '@office-neko/shared';

export const TRACKS: Track[] = [
  {
    id: 'basics', order: 0, title: 'Làm quen máy tính', emoji: '🖱️', color: '#FFB38A',
    blurb: 'Cầm chuột, bấm phím, sắp xếp thư mục và file.',
    chapters: [
      { id: 'basics.start', title: 'Bắt đầu cùng Mochi', lessonIds: ['basics.welcome'] },
      { id: 'basics.mouse', title: 'Cầm chuột', lessonIds: ['basics.mouse.click', 'basics.mouse.double', 'basics.mouse.right', 'basics.mouse.drag', 'basics.mouse.scroll'] },
      { id: 'basics.keys', title: 'Làm quen bàn phím', lessonIds: ['basics.keys.special', 'basics.keys.shortcuts'] },
      {
        id: 'basics.files',
        title: 'Thư mục và file',
        lessonIds: ['open', 'newfolder', 'rename', 'move', 'trash', 'project'].flatMap((x) => [`basics.files.${x}.win`, `basics.files.${x}.mac`]),
      },
    ],
  },
  {
    id: 'typing', order: 1, title: 'Gõ phím 10 ngón', emoji: '⌨️', color: '#A0D8FF',
    blurb: 'Gõ nhanh, gõ đúng, gõ tiếng Việt có dấu.',
    chapters: [
      { id: 'typing.start', title: 'Tư thế và hàng cơ sở', lessonIds: ['typing.posture', 'typing.home1', 'typing.home2', 'typing.home3'] },
      { id: 'typing.rows', title: 'Hàng trên và hàng dưới', lessonIds: ['typing.top1', 'typing.top2', 'typing.bottom1', 'typing.bottom2'] },
      { id: 'typing.numsym', title: 'Số và ký hiệu', lessonIds: ['typing.numbers', 'typing.symbols'] },
      { id: 'typing.text', title: 'Câu và đoạn văn', lessonIds: ['typing.sentences', 'typing.passage'] },
      { id: 'typing.vi', title: 'Gõ tiếng Việt có dấu', lessonIds: ['typing.vi.setup', 'typing.telex1', 'typing.telex2', 'typing.telex3', 'typing.vni1', 'typing.vni2'] },
      { id: 'typing.final', title: 'Về đích', lessonIds: ['typing.game', 'typing.project'] },
    ],
  },
  {
    id: 'word', order: 2, title: 'Word – Soạn thảo văn bản', emoji: '📝', color: '#7FB2FF',
    blurb: 'Viết đơn, định dạng chữ, chèn bảng và ảnh.',
    chapters: [
      { id: 'word.start', title: 'Làm quen trang giấy', lessonIds: ['word.intro', 'word.edit', 'word.select'] },
      { id: 'word.format', title: 'Định dạng chữ', lessonIds: ['word.bold', 'word.font', 'word.color'] },
      { id: 'word.para', title: 'Đoạn văn cho đẹp', lessonIds: ['word.align', 'word.spacing', 'word.list'] },
      { id: 'word.objects', title: 'Bảng và ảnh', lessonIds: ['word.table', 'word.image'] },
      { id: 'word.long', title: 'Văn bản dài', lessonIds: ['word.heading', 'word.toc', 'word.find'] },
      { id: 'word.final', title: 'Dự án: Đơn xin việc', lessonIds: ['word.project'] },
    ],
  },
  {
    id: 'excel', order: 3, title: 'Excel – Bảng tính', emoji: '📊', color: '#3FB871',
    blurb: 'Nhập số liệu, tính toán bằng công thức, vẽ biểu đồ.',
    chapters: [
      { id: 'excel.start', title: 'Làm quen bảng tính', lessonIds: ['excel.intro', 'excel.enter', 'excel.sheet'] },
      { id: 'excel.format', title: 'Định dạng cho dễ đọc', lessonIds: ['excel.numfmt', 'excel.look', 'excel.width'] },
      { id: 'excel.calc', title: 'Công thức đầu tiên', lessonIds: ['excel.equals', 'excel.sum', 'excel.stats'] },
      { id: 'excel.ref', title: 'Ô nào cố định', lessonIds: ['excel.copy', 'excel.absolute', 'excel.if'] },
      { id: 'excel.cond', title: 'Đếm, cộng có điều kiện và tra cứu', lessonIds: ['excel.countif', 'excel.sumif', 'excel.vlookup', 'excel.text'] },
      { id: 'excel.data', title: 'Sắp xếp, lọc và biểu đồ', lessonIds: ['excel.sort', 'excel.filter', 'excel.chart'] },
      { id: 'excel.final', title: 'Dự án: Bảng lương', lessonIds: ['excel.project'] },
    ],
  },
  { id: 'ppt', order: 4, title: 'PowerPoint – Trình chiếu', emoji: '🎞️', color: '#FFA878', blurb: 'Làm slide đẹp và trình bày tự tin.', chapters: [
      { id: 'ppt.start', title: 'Slide đầu tiên', lessonIds: ['ppt.intro', 'ppt.title', 'ppt.slides'] },
      { id: 'ppt.objects', title: 'Chữ, hình và ảnh', lessonIds: ['ppt.textbox', 'ppt.shape', 'ppt.image'] },
      { id: 'ppt.design', title: 'Cho đẹp mắt', lessonIds: ['ppt.layout', 'ppt.format', 'ppt.theme'] },
    ] },
  { id: 'ai', order: 5, title: 'Dùng AI (Claude) trong công việc', emoji: '🤖', color: '#C8B6FF', blurb: 'Viết prompt tốt, dùng AI an toàn và kiểm chứng kết quả.', chapters: [] },
];
