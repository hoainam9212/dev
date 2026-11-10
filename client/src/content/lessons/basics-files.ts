import { desktopSim, type Lesson, type OS } from '@office-neko/shared';
import { desktopPractice } from '../lessonKit';

const { idAt, reduceDesktop } = desktopSim;

const HOME = [
  { name: 'Tài liệu', children: [{ name: 'hoa-don-dien.pdf' }, { name: 'don-xin-viec.docx' }] },
  { name: 'Ảnh', children: [{ name: 'meo-con.jpg' }] },
  { name: 'Tải về', children: [{ name: 'bien-nha-trang.jpg' }, { name: 'nui-da-lat.jpg' }, { name: 'bang-luong.xlsx' }, { name: 'ghi-chu.txt' }] },
];

const TRIP = [
  { name: 'Tài liệu', children: [] },
  { name: 'Ảnh', children: [{ name: 'meo-con.jpg' }] },
  { name: 'Tải về', children: [{ name: 'ha-long-1.jpg' }, { name: 'ha-long-2.jpg' }, { name: 'hue-1.jpg' }, { name: 've-may-bay.pdf' }, { name: 'ghi-chu-cu.txt' }] },
];

export function filesLessons(os: OS): Lesson[] {
  const win = os === 'win';
  const app = win ? '[[file-explorer|File Explorer]]' : '[[finder|Finder]]';
  const trash = win ? '[[recycle-bin|Thùng rác (Recycle Bin)]]' : '[[trash|Thùng rác (Trash)]]';
  const base = { trackId: 'basics', chapterId: 'basics.files', minutes: 4, os } as const;
  const renameKey = win ? '{{f2}}' : '{{enter}}';
  const deleteKey = win ? '{{delete}}' : '{{mod+backspace}}';

  return [
    {
      ...base,
      id: `basics.files.open.${os}`,
      title: win ? 'Mở File Explorer' : 'Mở Finder',
      steps: [
        {
          kind: 'explain',
          mood: 'happy',
          body: win
            ? 'Trên Windows, mọi [[file|file]] và [[folder|thư mục]] được xem trong File Explorer. Mở nó bằng biểu tượng thư mục vàng 📁 trên [[taskbar|thanh tác vụ]], hoặc nhấn {{win+e}}.'
            : 'Trên Mac, mọi [[file|file]] và [[folder|thư mục]] được xem trong Finder. Mở nó bằng biểu tượng 🗂️ ở đầu thanh [[dock|Dock]].',
        },
        { kind: 'explain', body: `Trong ${app}: bên trái là **thanh bên** liệt kê các thư mục hay dùng; ở trên là [[address-bar|thanh địa chỉ]] cho biết bạn đang ở đâu ([[path|đường dẫn]]); ở giữa là các file và thư mục.` },
        desktopPractice({
          os,
          tree: HOME,
          task: 'Mở thư mục **Tải về** bằng cách [[double-click|nhấp đúp]] vào nó.',
          checks: [{ kind: 'cwdIs', path: '/Tải về' }],
          spotlight: { path: '/Tải về' },
          hint: 'Nhấp đúp nghĩa là bấm nút trái hai lần thật nhanh.',
          steps: ['Tìm thư mục “Tải về” ở khung giữa.', 'Nhấp đúp vào nó.'],
          solve: (s) => [{ type: 'open', id: idAt(s.fs, '/Tải về') }],
        }),
      ],
    },
    {
      ...base,
      id: `basics.files.newfolder.${os}`,
      title: 'Tạo thư mục mới',
      steps: [
        { kind: 'explain', body: `Thư mục giống ngăn kéo để xếp file cho gọn. Tạo thư mục mới bằng nút **Thư mục mới**, chuột phải vào chỗ trống, hoặc phím tắt {{mod+shift+n}}. Sau đó gõ tên rồi nhấn {{enter}}.` },
        desktopPractice({
          os,
          tree: HOME,
          cwd: '/Tài liệu',
          task: 'Trong thư mục **Tài liệu**, tạo một thư mục mới tên là **Học tập**.',
          checks: [{ kind: 'pathExists', path: '/Tài liệu/Học tập', type: 'folder' }],
          spotlight: { helpId: 'desktop.newFolder' },
          hint: 'Bấm nút “📁 Thư mục mới” trên thanh công cụ.',
          steps: ['Bấm “📁 Thư mục mới”.', 'Xoá tên có sẵn, gõ “Học tập”.', 'Nhấn Enter.'],
          solve: () => [{ type: 'mkdir', name: 'Học tập' }],
        }),
      ],
    },
    {
      ...base,
      id: `basics.files.rename.${os}`,
      title: 'Đổi tên file',
      steps: [
        { kind: 'explain', body: `Đổi tên: chọn file rồi nhấn ${renameKey}, hoặc chuột phải → **Đổi tên**. Giữ nguyên phần [[file-extension|đuôi file]] như .txt, .docx để máy còn biết loại file.` },
        desktopPractice({
          os,
          tree: HOME,
          cwd: '/Tải về',
          task: 'Đổi tên **ghi-chu.txt** thành **viec-can-lam.txt**.',
          checks: [
            { kind: 'pathExists', path: '/Tải về/viec-can-lam.txt', type: 'file' },
            { kind: 'notExists', path: '/Tải về/ghi-chu.txt' },
          ],
          spotlight: { path: '/Tải về/ghi-chu.txt' },
          hint: `Chọn file rồi nhấn ${renameKey}, hoặc dùng nút “✏️ Đổi tên”.`,
          steps: ['Nhấp chọn ghi-chu.txt.', 'Bấm “✏️ Đổi tên”.', 'Gõ “viec-can-lam”, giữ nguyên “.txt”, nhấn Enter.'],
          solve: (s) => [{ type: 'rename', id: idAt(s.fs, '/Tải về/ghi-chu.txt'), name: 'viec-can-lam.txt' }],
        }),
      ],
    },
    {
      ...base,
      id: `basics.files.move.${os}`,
      title: 'Di chuyển file',
      steps: [
        { kind: 'explain', body: `Hai cách chuyển file vào thư mục khác:\n\n- [[drag-and-drop|Kéo và thả]] file lên thư mục đích.\n- [[cut|Cắt]] {{mod+x}}, mở thư mục đích, rồi [[paste|dán]] {{mod+v}}.\n\nMuốn chọn nhiều file: giữ {{mod}} rồi nhấp từng file.` },
        desktopPractice({
          os,
          tree: HOME,
          cwd: '/Tải về',
          task: 'Chuyển 2 tấm ảnh **bien-nha-trang.jpg** và **nui-da-lat.jpg** vào thư mục **Ảnh**.',
          checks: [
            { kind: 'pathExists', path: '/Ảnh/bien-nha-trang.jpg' },
            { kind: 'pathExists', path: '/Ảnh/nui-da-lat.jpg' },
            { kind: 'notExists', path: '/Tải về/bien-nha-trang.jpg' },
            { kind: 'notExists', path: '/Tải về/nui-da-lat.jpg' },
          ],
          spotlight: { path: '/Tải về/bien-nha-trang.jpg' },
          hint: 'Chọn 2 ảnh, bấm “✂️ Cắt”, mở “Ảnh” ở thanh bên, rồi bấm “📥 Dán”.',
          steps: ['Nhấp ảnh thứ nhất, giữ Ctrl/⌘ rồi nhấp ảnh thứ hai.', 'Bấm “✂️ Cắt”.', 'Bấm “📁 Ảnh” ở thanh bên.', 'Bấm “📥 Dán”.'],
          solve: (s) => [
            { type: 'cut', ids: [idAt(s.fs, '/Tải về/bien-nha-trang.jpg'), idAt(s.fs, '/Tải về/nui-da-lat.jpg')] },
            { type: 'open', id: idAt(s.fs, '/Ảnh') },
            { type: 'paste' },
          ],
        }),
      ],
    },
    {
      ...base,
      id: `basics.files.copy.${os}`,
      title: 'Sao chép và hoàn tác',
      // Thêm sau khi chương đã có người học xong: tự chọn để không khoá lại bài sau hay lộ trình Gõ phím.
      optional: true,
      steps: [
        {
          kind: 'explain',
          body: `[[copy|Sao chép]] khác [[cut|cắt]] ở chỗ **file gốc vẫn còn nguyên**, bạn có thêm một bản ở chỗ mới.\n\n- Chọn file, nhấn {{mod+c}}, mở thư mục đích, rồi nhấn {{mod+v}} để [[paste|dán]].\n- Hoặc chuột phải vào file › **Sao chép**, rồi chuột phải vào chỗ trống ở thư mục đích › **Dán**.`,
        },
        {
          kind: 'explain',
          mood: 'happy',
          body: `Lỡ tay xoá, đổi tên hay chuyển nhầm? Nhấn {{mod+z}} để [[undo|hoàn tác]], tức là quay lại đúng như trước khi làm. Nhấn nhiều lần thì lùi được nhiều bước.`,
        },
        desktopPractice({
          os,
          tree: HOME,
          cwd: '/Tải về',
          task: 'Chép **bang-luong.xlsx** sang thư mục **Tài liệu**, nhưng vẫn giữ bản gốc trong **Tải về**.',
          checks: [
            { kind: 'pathExists', path: '/Tài liệu/bang-luong.xlsx', type: 'file' },
            { kind: 'pathExists', path: '/Tải về/bang-luong.xlsx', type: 'file' },
          ],
          spotlight: { path: '/Tải về/bang-luong.xlsx' },
          hint: 'Dùng “📋 Sao chép”, không dùng “✂️ Cắt” — cắt sẽ mang file gốc đi mất.',
          steps: ['Nhấp chọn bang-luong.xlsx.', 'Bấm “📋 Sao chép”.', 'Bấm “📁 Tài liệu” ở thanh bên.', 'Bấm “📥 Dán”.'],
          solve: (s) => [
            { type: 'copy', ids: [idAt(s.fs, '/Tải về/bang-luong.xlsx')] },
            { type: 'open', id: idAt(s.fs, '/Tài liệu') },
            { type: 'paste' },
          ],
        }),
        desktopPractice({
          os,
          tree: HOME,
          cwd: '/Tài liệu',
          setup: (s) => [{ type: 'remove', ids: [idAt(s.fs, '/Tài liệu/don-xin-viec.docx')] }],
          undoableSetup: true,
          task: 'Bạn vừa lỡ xoá **don-xin-viec.docx**. Lấy lại bằng **hoàn tác**.',
          checks: [{ kind: 'pathExists', path: '/Tài liệu/don-xin-viec.docx', type: 'file' }],
          spotlight: { helpId: 'desktop.undo' },
          hint: `Nhấn {{mod+z}}, hoặc bấm “↩️ Hoàn tác” trên thanh công cụ.`,
          steps: ['Bấm “↩️ Hoàn tác” (hoặc nhấn Ctrl+Z, trên Mac là ⌘Z).', 'Xem don-xin-viec.docx hiện lại trong Tài liệu.'],
          solve: () => [{ type: 'undo' }],
        }),
      ],
    },
    {
      ...base,
      id: `basics.files.trash.${os}`,
      title: 'Xoá và khôi phục',
      steps: [
        { kind: 'explain', body: `Xoá file: chọn rồi nhấn ${deleteKey}, hoặc kéo vào ${trash}. File chưa mất hẳn đâu, vẫn khôi phục lại được cho tới khi bạn **dọn sạch thùng rác**.` },
        desktopPractice({
          os,
          tree: HOME,
          cwd: '/Tải về',
          task: 'Xoá file **bang-luong.xlsx**.',
          checks: [{ kind: 'inTrash', name: 'bang-luong.xlsx' }, { kind: 'notExists', path: '/Tải về/bang-luong.xlsx' }],
          spotlight: { path: '/Tải về/bang-luong.xlsx' },
          hint: `Chọn file rồi nhấn ${deleteKey}, hoặc bấm “🗑️ Xoá”.`,
          steps: ['Nhấp chọn bang-luong.xlsx.', 'Bấm “🗑️ Xoá”.'],
          solve: (s) => [{ type: 'remove', ids: [idAt(s.fs, '/Tải về/bang-luong.xlsx')] }],
        }),
        desktopPractice({
          os,
          tree: HOME,
          cwd: '/Tải về',
          setup: (s) => [{ type: 'remove', ids: [idAt(s.fs, '/Tải về/bang-luong.xlsx')] }],
          task: 'Ối, xoá nhầm rồi! Mở **Thùng rác** và **khôi phục** bang-luong.xlsx.',
          checks: [{ kind: 'pathExists', path: '/Tải về/bang-luong.xlsx' }],
          spotlight: { helpId: 'desktop.trash' },
          hint: 'Bấm biểu tượng 🗑️ Thùng rác, chọn file, rồi bấm “♻️ Khôi phục”.',
          steps: ['Bấm 🗑️ Thùng rác.', 'Nhấp chọn bang-luong.xlsx.', 'Bấm “♻️ Khôi phục”.'],
          solve: (s) => [{ type: 'open', id: s.fs.trashId }, { type: 'restore', id: idAt(s.fs, '/Thùng rác/bang-luong.xlsx') }],
        }),
      ],
    },
    {
      ...base,
      id: `basics.files.project.${os}`,
      title: 'Dự án: Sắp xếp “Ảnh du lịch”',
      minutes: 6,
      steps: [
        { kind: 'explain', mood: 'happy', body: 'Dự án cuối phần! Thư mục **Tải về** đang lộn xộn sau chuyến du lịch. Hãy dùng mọi kỹ năng vừa học để dọn dẹp nhé.' },
        desktopPractice({
          os,
          tree: TRIP,
          task: 'Trong **Ảnh**, tạo thư mục **Ảnh du lịch**; chuyển 3 ảnh .jpg trong **Tải về** vào đó; rồi xoá **ghi-chu-cu.txt**.',
          checks: [
            { kind: 'pathExists', path: '/Ảnh/Ảnh du lịch', type: 'folder' },
            { kind: 'pathExists', path: '/Ảnh/Ảnh du lịch/ha-long-1.jpg' },
            { kind: 'pathExists', path: '/Ảnh/Ảnh du lịch/ha-long-2.jpg' },
            { kind: 'pathExists', path: '/Ảnh/Ảnh du lịch/hue-1.jpg' },
            { kind: 'inTrash', name: 'ghi-chu-cu.txt' },
            { kind: 'pathExists', path: '/Tải về/ve-may-bay.pdf' },
          ],
          spotlight: { helpId: 'desktop.newFolder' },
          hint: 'Làm từng việc một: tạo thư mục → chuyển ảnh → xoá file ghi chú. Đừng xoá vé máy bay nhé!',
          steps: [
            'Mở “Ảnh”, bấm “📁 Thư mục mới”, đặt tên “Ảnh du lịch”.',
            'Mở “Tải về”, chọn 3 ảnh .jpg (giữ Ctrl/⌘ khi nhấp), bấm “✂️ Cắt”.',
            'Mở “Ảnh” → nhấp đúp “Ảnh du lịch”, bấm “📥 Dán”.',
            'Quay lại “Tải về”, chọn ghi-chu-cu.txt, bấm “🗑️ Xoá”.',
          ],
          solve: (s0) => {
            const s1 = reduceDesktop(reduceDesktop(s0, { type: 'open', id: idAt(s0.fs, '/Ảnh') }), { type: 'mkdir', name: 'Ảnh du lịch' });
            const album = idAt(s1.fs, '/Ảnh/Ảnh du lịch');
            const jpgs = ['ha-long-1.jpg', 'ha-long-2.jpg', 'hue-1.jpg'].map((n) => idAt(s0.fs, `/Tải về/${n}`));
            return [
              { type: 'open', id: idAt(s0.fs, '/Ảnh') },
              { type: 'mkdir', name: 'Ảnh du lịch' },
              { type: 'move', ids: jpgs, destId: album },
              { type: 'remove', ids: [idAt(s0.fs, '/Tải về/ghi-chu-cu.txt')] },
            ];
          },
        }),
      ],
    },
  ];
}
