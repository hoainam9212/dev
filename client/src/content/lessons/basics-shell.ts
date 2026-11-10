import type { Lesson, OS } from '@office-neko/shared';
import { desktopPractice } from '../lessonKit';

const HOME = [
  { name: 'Tài liệu', children: [{ name: 'don-xin-viec.docx' }] },
  { name: 'Ảnh', children: [{ name: 'meo-con.jpg' }] },
  { name: 'Tải về', children: [{ name: 'bang-luong.xlsx' }] },
];

/** Chương "Mở ứng dụng": Start menu + Taskbar (Windows), Dock + Spotlight (Mac). */
export function shellLessons(os: OS): Lesson[] {
  // Tự chọn: chương này thêm sau khi nhiều người đã học xong "Làm quen máy tính"; không tự chọn thì họ bị khoá lại
  // lộ trình Gõ phím và chương "Thư mục và file".
  const base = { trackId: 'basics', chapterId: 'basics.shell', minutes: 3, os, optional: true } as const;

  if (os === 'win') {
    return [
      {
        ...base,
        id: 'basics.shell.win',
        title: 'Start và thanh Taskbar',
        steps: [
          {
            kind: 'explain',
            mood: 'happy',
            body: 'Thanh dài ở cạnh dưới màn hình Windows là [[taskbar|thanh Taskbar]]. Ở góc trái của nó có nút **Start**: bấm vào sẽ mở [[start-menu|Start menu]], nơi bày sẵn các ứng dụng như Word, Excel, PowerPoint.',
          },
          {
            kind: 'explain',
            body: 'Ứng dụng hay dùng còn được **ghim** thẳng lên taskbar, bấm một lần là mở. Mẹo: nhấn phím {{win}} trên bàn phím cũng mở Start menu.',
          },
          desktopPractice({
            os,
            tree: HOME,
            task: 'Mở **Word** bằng Start menu.',
            checks: [{ kind: 'launched', app: 'word' }],
            spotlight: { helpId: 'shell.start' },
            hint: 'Bấm nút “▦ Start” ở góc trái thanh dưới cùng, rồi bấm biểu tượng Word.',
            steps: ['Bấm “▦ Start”.', 'Bấm biểu tượng chữ W màu xanh, tên “Word”.'],
            solve: () => [{ type: 'toggleMenu' }, { type: 'launch', app: 'word' }],
          }),
          {
            kind: 'explain',
            body: 'Không thấy ứng dụng mình cần? Mở Start menu rồi **gõ tên** của nó vào ô tìm kiếm trên cùng: danh sách lọc dần theo chữ bạn gõ. Nhấn {{enter}} để mở kết quả đầu tiên.',
          },
          desktopPractice({
            os,
            tree: HOME,
            task: 'Mở Start menu, gõ **exc** vào ô tìm kiếm để tìm **Excel**, rồi mở nó.',
            checks: [{ kind: 'launched', app: 'excel' }],
            spotlight: { helpId: 'shell.start' },
            hint: 'Bấm “▦ Start”, gõ “exc” vào ô tìm kiếm, rồi nhấn Enter.',
            steps: ['Bấm “▦ Start”.', 'Gõ “exc” vào ô tìm kiếm.', 'Nhấn Enter hoặc bấm biểu tượng Excel.'],
            solve: () => [{ type: 'toggleMenu' }, { type: 'setQuery', text: 'exc' }, { type: 'launch', app: 'excel' }],
          }),
        ],
      },
    ];
  }

  return [
    {
      ...base,
      id: 'basics.shell.mac',
      title: 'Dock và Spotlight',
      steps: [
        {
          kind: 'explain',
          mood: 'happy',
          body: 'Trên Mac, các ứng dụng hay dùng nằm trên [[dock|Dock]], dãy biểu tượng ở cạnh dưới màn hình. Bấm một biểu tượng là mở ứng dụng đó.',
        },
        desktopPractice({
          os,
          tree: HOME,
          task: 'Mở **Word** từ Dock.',
          checks: [{ kind: 'launched', app: 'word' }],
          spotlight: { helpId: 'shell.dock' },
          hint: 'Nhìn xuống Dock ở cạnh dưới, bấm biểu tượng chữ W màu xanh.',
          steps: ['Tìm Dock ở cạnh dưới.', 'Bấm biểu tượng chữ W màu xanh (Word).'],
          solve: () => [{ type: 'launch', app: 'word' }],
        }),
        {
          kind: 'explain',
          body: 'Muốn tìm bất kỳ ứng dụng nào, dùng [[spotlight|Spotlight]]: bấm kính lúp 🔍 ở góc phải thanh menu trên cùng, gõ tên ứng dụng, rồi nhấn {{enter}} để mở kết quả đầu tiên. Mẹo: phím tắt {{mod+space}} cũng mở Spotlight.',
        },
        desktopPractice({
          os,
          tree: HOME,
          task: 'Dùng **Spotlight** để tìm và mở **Excel**.',
          checks: [{ kind: 'launched', app: 'excel' }],
          spotlight: { helpId: 'shell.spotlight' },
          hint: 'Bấm kính lúp 🔍 ở góc phải trên cùng, gõ “excel”, rồi nhấn Enter.',
          steps: ['Bấm kính lúp 🔍 trên thanh menu.', 'Gõ “excel”.', 'Nhấn Enter.'],
          solve: () => [{ type: 'toggleMenu' }, { type: 'setQuery', text: 'excel' }, { type: 'launch', app: 'excel' }],
        }),
      ],
    },
  ];
}
