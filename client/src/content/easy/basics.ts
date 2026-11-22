import type { EasyLesson } from './types';

/**
 * Lời dễ cho lộ trình Làm quen máy tính (bản Windows), viết cho người lớn tuổi mới học máy tính:
 * câu ngắn, mỗi đoạn tối đa 3 câu, ít tiếng Anh, gợi ý mỗi bước một động tác.
 */
export const BASICS_EASY: Record<string, EasyLesson> = {
  'basics.welcome': {
    steps: {
      0: {
        kind: 'explain',
        body: 'Chào bạn! Mình là **Mochi** 🐱.\n\nMình sẽ cùng bạn học máy tính từ những bước đầu tiên. Đầu tiên là cầm [[mouse|con chuột]] và bấm [[keyboard|bàn phím]].\n\nSau đó mình học làm **trang trình chiếu** (PowerPoint), **soạn chữ** (Word) và **bảng tính** (Excel).',
      },
      1: {
        kind: 'explain',
        body: 'Mỗi bài học có 3 loại bước:\n\n- **Nghe giải thích**: Mochi kể cho bạn nghe.\n- **Tự làm thử**: bạn làm, Mochi xem giúp ngay.\n- **Câu hỏi nhỏ**: bạn chọn câu trả lời đúng.',
      },
      2: {
        kind: 'explain',
        body: 'Gặp chữ lạ thì đừng lo. Chữ nào có **gạch chân chấm chấm**, như [[shortcut|phím tắt]], thì bấm vào để xem nghĩa.\n\nBạn cũng có thể bấm nút **?** tròn màu hồng ở góc dưới bên phải màn hình. Nút đó mở **Từ điển** của Mochi.',
      },
      3: {
        kind: 'quiz',
        question: 'Gặp một chữ không hiểu, bạn làm gì?',
        choices: ['Bấm vào chữ có gạch chân chấm, hoặc mở Từ điển', 'Bỏ qua, tự đoán nghĩa', 'Tắt máy đi'],
        why: 'Đúng rồi! Từ điển luôn ở đó giúp bạn. Cứ bấm xem thoải mái nhé.',
      },
      4: {
        kind: 'quiz',
        question: 'Khi làm bài, nếu bạn bấm **Gợi ý** thì sao?',
        choices: ['Không được học tiếp nữa', 'Vẫn học tiếp được, chỉ bớt một chút sao', 'Mất hết bài đã học'],
        why: 'Đúng rồi! Gợi ý không bao giờ làm bạn dừng lại. Cần thì cứ bấm nhé.',
      },
      5: {
        kind: 'explain',
        body: 'Tuyệt vời! Bạn đã sẵn sàng rồi.\n\nMình cùng bắt đầu nhé! 🎉',
      },
    },
  },

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

  'basics.mouse.double': {
    steps: {
      0: {
        kind: 'explain',
        body: '[[double-click|Nhấp đúp]] nghĩa là ấn nút trái **hai lần liền nhau**, thật nhanh: "tách tách".\n\nNhấp đúp dùng để **mở** một thứ ra, ví dụ mở một tấm ảnh hay một tập giấy tờ.\n\nMẹo: giữ chuột **đứng yên** trong lúc ấn hai lần.',
      },
      1: {
        kind: 'practice',
        task: 'Trên màn hình có các **hộp quà** 🎁. Bạn nhấp đúp vào từng hộp để mở quà.',
        hint: 'Ấn hai lần thật nhanh và giữ chuột đứng yên. Chậm quá thì máy tưởng là hai lần nhấp riêng.',
        steps: ['Đưa mũi tên tới một hộp quà.', 'Giữ chuột đứng yên.', 'Ấn nút trái hai lần thật nhanh: "tách tách".', 'Làm giống vậy với các hộp còn lại.'],
      },
    },
  },

  'basics.mouse.right': {
    steps: {
      0: {
        kind: 'explain',
        body: '[[right-click|Nhấp chuột phải]] nghĩa là ấn nút bên **phải** một lần, bằng ngón giữa.\n\nKhi đó một **danh sách nhỏ** hiện ra, gọi là [[context-menu|menu]]. Danh sách này ghi những việc bạn có thể làm với thứ vừa bấm vào.',
      },
      1: {
        kind: 'practice',
        task: 'Trên màn hình có các **thùng** 📦. Bạn nhấp chuột phải vào từng thùng. Khi danh sách nhỏ hiện ra, bấm dòng **🎁 Mở quà**.',
        hint: 'Lần này dùng nút bên phải (ngón giữa). Danh sách hiện ra rồi thì chọn bằng nút trái như thường.',
        steps: ['Đưa mũi tên tới một thùng.', 'Ấn nút phải một lần.', 'Nhìn danh sách nhỏ vừa hiện ra.', 'Ấn nút trái vào dòng “🎁 Mở quà”.'],
      },
      2: {
        kind: 'quiz',
        question: 'Nhấp chuột phải để làm gì?',
        choices: ['Mở danh sách những việc có thể làm', 'Tắt máy', 'Gõ chữ'],
        why: 'Đúng rồi! Danh sách này rất hay dùng: sao chép, đổi tên, xoá…',
      },
    },
  },

  'basics.mouse.drag': {
    steps: {
      0: {
        kind: 'explain',
        body: '[[drag-and-drop|Kéo và thả]] giống như cầm một món đồ lên rồi đặt sang chỗ khác.\n\nẤn **giữ** nút trái lên món đồ, đừng nhấc tay. Đẩy chuột tới chỗ mới, rồi mới **nhấc tay** ra.',
      },
      1: {
        kind: 'practice',
        task: 'Trên màn hình có mấy chú **cá** 🐟 và một cái **giỏ** 🧺. Bạn kéo từng chú cá thả vào giỏ cho Mochi.',
        hint: 'Giữ chặt nút trái suốt đường đi. Chỉ nhấc tay khi con cá đã nằm trên giỏ.',
        steps: ['Đưa mũi tên tới một con cá.', 'Ấn giữ nút trái, đừng nhấc tay.', 'Đẩy chuột tới cái giỏ.', 'Nhấc tay ra.'],
      },
    },
  },

  'basics.mouse.scroll': {
    steps: {
      0: {
        kind: 'explain',
        body: 'Nhiều khi màn hình không chứa hết, phần còn lại bị khuất ở bên dưới. Muốn xem thì ta [[scroll|cuộn]] xuống, giống như kéo tờ giấy lên.\n\nGiữa hai nút chuột có một **bánh xe nhỏ**. Bạn lăn bánh xe về phía mình để cuộn xuống.\n\nMáy tính xách tay không có chuột thì dùng **hai ngón tay** vuốt trên miếng cảm ứng.',
      },
      1: {
        kind: 'practice',
        task: 'Có 3 chú **mèo** 🐱 đang trốn ở bên dưới. Bạn cuộn xuống để tìm, thấy chú nào thì nhấp vào chú đó.',
        hint: 'Mũi tên phải nằm bên trong khung xanh thì lăn bánh xe mới có tác dụng.',
        steps: ['Đưa mũi tên vào trong khung xanh.', 'Lăn bánh xe về phía mình.', 'Thấy mèo thì ấn nút trái vào nó.', 'Lăn tiếp để tìm các chú còn lại.'],
      },
    },
  },

  'basics.keys.special': {
    steps: {
      0: {
        kind: 'explain',
        body: 'Ngoài các phím chữ, bàn phím có vài phím đặc biệt hay dùng:\n\n- [[enter|Enter]] {{enter}}: xuống dòng mới, hoặc đồng ý.\n- [[shift|Shift]] {{shift}}: giữ phím này rồi bấm chữ để ra chữ **HOA**.\n- [[backspace|Backspace]] {{backspace}}: xoá chữ đứng ngay trước.\n- [[space-bar|Phím cách]]: thanh dài nhất, tạo khoảng trống giữa hai chữ.',
      },
      1: {
        kind: 'quiz',
        question: 'Muốn gõ chữ **M** hoa, bạn làm thế nào?',
        choices: ['Giữ Shift rồi bấm M', 'Bấm M hai lần', 'Bấm Enter rồi bấm M'],
        why: 'Đúng rồi! Giữ Shift, bấm chữ, là ra chữ hoa.',
      },
      2: {
        kind: 'practice',
        task: 'Gõ lại câu dưới đây, có chữ hoa và dấu chấm. Gõ sai thì bấm {{backspace}} để xoá rồi gõ lại.',
        hint: 'Chữ X và chữ M là chữ hoa: giữ Shift trong lúc bấm hai chữ này.',
        steps: ['Giữ Shift, bấm X, rồi thả Shift.', 'Gõ tiếp “in chao ” (nhớ bấm phím cách).', 'Giữ Shift, bấm M, rồi thả Shift.', 'Gõ “ochi.” (có dấu chấm ở cuối).'],
      },
    },
  },

  'basics.keys.shortcuts': {
    steps: {
      0: {
        kind: 'explain',
        body: '[[shortcut|Phím tắt]] là bấm hai phím cùng lúc để làm việc nhanh hơn. Cách bấm: **giữ** phím Ctrl, rồi bấm phím thứ hai.\n\n- {{mod+c}} [[copy|sao chép]]\n- {{mod+v}} [[paste|dán]]\n- {{mod+z}} [[undo|hoàn tác]] (quay lại như cũ)\n- {{mod+s}} [[save|lưu]]',
      },
      1: {
        kind: 'quiz',
        question: 'Lỡ tay xoá mất một đoạn chữ. Bấm phím tắt nào để lấy lại?',
        choices: ['{{mod+z}}', '{{mod+s}}', '{{mod+c}}'],
        why: 'Đúng rồi! {{mod+z}} quay lại việc vừa làm. Đây là phím cứu mình khi lỡ tay.',
      },
      2: {
        kind: 'quiz',
        question: 'Đã sao chép xong, muốn dán ra thì bấm…',
        choices: ['{{mod+v}}', '{{mod+x}}', '{{mod+z}}'],
        why: 'Đúng rồi! {{mod+v}} là dán.',
      },
    },
  },

  'basics.shell.win': {
    steps: {
      0: {
        kind: 'explain',
        body: 'Ở cạnh dưới màn hình Windows có một thanh dài, gọi là [[taskbar|thanh Taskbar]].\n\nỞ góc trái thanh này có nút **Start** (nút bắt đầu). Bấm vào sẽ mở [[start-menu|Start menu]]: một bảng bày sẵn các chương trình như Word, Excel, PowerPoint.',
      },
      1: {
        kind: 'explain',
        body: 'Chương trình hay dùng thường có sẵn hình nhỏ ngay trên thanh Taskbar. Bấm vào hình đó một lần là mở.\n\nMẹo: bấm phím {{win}} trên bàn phím cũng mở Start menu.',
      },
      2: {
        kind: 'practice',
        task: 'Mở chương trình **Word** bằng nút Start.',
        hint: 'Bấm nút “▦ Start” ở góc trái thanh dưới cùng. Bảng hiện ra thì tìm hình chữ W màu xanh.',
        steps: ['Bấm nút “▦ Start” ở góc dưới bên trái.', 'Tìm hình chữ W màu xanh, tên “Word”.', 'Bấm vào hình đó.'],
      },
      3: {
        kind: 'explain',
        body: 'Không thấy chương trình mình cần? Mở Start menu rồi **gõ tên** chương trình.\n\nGõ tới đâu, danh sách lọc theo tới đó. Thấy đúng tên thì bấm {{enter}} để mở.',
      },
      4: {
        kind: 'practice',
        task: 'Mở Start menu, gõ **exc** để tìm chương trình **Excel**, rồi mở nó.',
        hint: 'Bấm “▦ Start” trước. Bảng hiện ra rồi mới gõ chữ “exc”.',
        steps: ['Bấm nút “▦ Start”.', 'Gõ “exc” trên bàn phím.', 'Bấm Enter, hoặc bấm vào hình Excel.'],
      },
    },
  },

  'basics.files.open.win': {
    steps: {
      0: {
        kind: 'explain',
        body: 'Trong máy tính, giấy tờ được cất thành từng [[file|file]]. Nhiều file xếp chung trong một [[folder|thư mục]], giống tập giấy kẹp trong **cái kẹp hồ sơ**.\n\nĐể xem file và thư mục, ta mở chương trình **File Explorer**. Bấm hình **thư mục vàng** 📁 trên [[taskbar|thanh Taskbar]] là mở được.',
      },
      1: {
        kind: 'explain',
        body: 'Cửa sổ File Explorer có 3 phần:\n\n- **Bên trái**: các thư mục hay dùng.\n- **Phía trên**: dòng chữ cho biết bạn đang ở thư mục nào.\n- **Ở giữa**: file và thư mục bên trong.',
      },
      2: {
        kind: 'practice',
        task: 'Mở thư mục **Tải về** bằng cách [[double-click|nhấp đúp]] vào nó.',
        hint: 'Nhấp đúp là ấn nút trái hai lần thật nhanh, giữ chuột đứng yên.',
        steps: ['Tìm thư mục “Tải về” ở khung giữa.', 'Đưa mũi tên tới thư mục đó.', 'Ấn nút trái hai lần thật nhanh.'],
      },
    },
  },

  'basics.files.newfolder.win': {
    steps: {
      0: {
        kind: 'explain',
        body: 'Thư mục giống **cái kẹp hồ sơ**: giúp xếp giấy tờ cho gọn, dễ tìm.\n\nMuốn có thư mục mới, bấm nút **Thư mục mới**. Sau đó gõ tên cho nó rồi bấm {{enter}}.',
      },
      1: {
        kind: 'practice',
        task: 'Trong thư mục **Tài liệu**, tạo một thư mục mới tên là **Học tập**.',
        hint: 'Bấm nút “📁 Thư mục mới” ở hàng nút phía trên.',
        steps: ['Bấm nút “📁 Thư mục mới”.', 'Bấm Backspace để xoá tên có sẵn.', 'Gõ “Học tập”.', 'Bấm Enter.'],
      },
    },
  },

  'basics.files.rename.win': {
    steps: {
      0: {
        kind: 'explain',
        body: 'Muốn đổi tên một file: nhấp chọn file đó, rồi bấm phím {{f2}} ở hàng phím trên cùng. Hoặc nhấp chuột phải vào file rồi chọn **Đổi tên**.\n\nLưu ý: đừng xoá phần **sau dấu chấm**, như .txt hay .docx. Phần này gọi là [[file-extension|đuôi file]], giúp máy biết đây là loại giấy tờ gì.',
      },
      1: {
        kind: 'practice',
        task: 'Đổi tên file **ghi-chu.txt** thành **viec-can-lam.txt**.',
        hint: 'Nhấp chọn file trước, rồi bấm nút “✏️ Đổi tên”. Nhớ giữ lại phần “.txt”.',
        steps: ['Nhấp một lần vào file ghi-chu.txt.', 'Bấm nút “✏️ Đổi tên”.', 'Xoá chữ “ghi-chu”, gõ “viec-can-lam”. Giữ nguyên “.txt”.', 'Bấm Enter.'],
      },
    },
  },

  'basics.files.move.win': {
    steps: {
      0: {
        kind: 'explain',
        body: 'Muốn chuyển file sang thư mục khác, có hai cách:\n\n- [[drag-and-drop|Kéo]] file rồi thả lên thư mục mới.\n- Bấm [[cut|Cắt]], mở thư mục mới, rồi bấm [[paste|Dán]].\n\nMuốn chọn nhiều file một lúc: giữ phím Ctrl, rồi nhấp từng file.',
      },
      1: {
        kind: 'practice',
        task: 'Chuyển 2 tấm ảnh **bien-nha-trang.jpg** và **nui-da-lat.jpg** sang thư mục **Ảnh**.',
        hint: 'Chọn cả 2 ảnh, bấm “✂️ Cắt”. Mở thư mục “Ảnh” ở bên trái, rồi bấm “📥 Dán”.',
        steps: ['Nhấp ảnh thứ nhất.', 'Giữ phím Ctrl rồi nhấp ảnh thứ hai.', 'Bấm nút “✂️ Cắt”.', 'Bấm “📁 Ảnh” ở bên trái.', 'Bấm nút “📥 Dán”.'],
      },
    },
  },

  'basics.files.copy.win': {
    steps: {
      0: {
        kind: 'explain',
        body: '[[copy|Sao chép]] khác với [[cut|cắt]]. Sao chép thì **file cũ vẫn còn**, bạn có thêm một bản giống hệt ở chỗ mới. Giống như đem tờ giấy đi photo.\n\nCách làm: chọn file, bấm **Sao chép**. Mở thư mục mới, rồi bấm [[paste|Dán]].',
      },
      1: {
        kind: 'explain',
        body: 'Lỡ tay xoá, đổi tên hay chuyển nhầm cũng đừng lo.\n\nBấm {{mod+z}} để [[undo|hoàn tác]], tức là quay lại y như trước. Bấm nhiều lần thì quay lại được nhiều bước.',
      },
      2: {
        kind: 'practice',
        task: 'Chép file **bang-luong.xlsx** sang thư mục **Tài liệu**. File cũ trong **Tải về** vẫn phải còn.',
        hint: 'Dùng nút “📋 Sao chép”, đừng dùng “✂️ Cắt”. Cắt sẽ mang file cũ đi mất.',
        steps: ['Nhấp một lần vào bang-luong.xlsx.', 'Bấm nút “📋 Sao chép”.', 'Bấm “📁 Tài liệu” ở bên trái.', 'Bấm nút “📥 Dán”.'],
      },
      3: {
        kind: 'practice',
        task: 'Bạn vừa lỡ xoá file **don-xin-viec.docx**. Lấy lại bằng **hoàn tác**.',
        hint: 'Bấm nút “↩️ Hoàn tác” ở hàng nút phía trên, hoặc bấm {{mod+z}}.',
        steps: ['Bấm nút “↩️ Hoàn tác” (hoặc giữ Ctrl rồi bấm Z).', 'Nhìn xem file don-xin-viec.docx đã hiện lại.'],
      },
    },
  },

  'basics.files.trash.win': {
    steps: {
      0: {
        kind: 'explain',
        body: 'Muốn xoá một file: nhấp chọn file, rồi bấm phím {{delete}}. File sẽ vào [[recycle-bin|Thùng rác]].\n\nThùng rác giống **cái sọt rác** cạnh bàn: giấy bỏ vào vẫn nhặt lại được. File chỉ mất hẳn khi bạn **đổ sạch thùng rác**.',
      },
      1: {
        kind: 'practice',
        task: 'Xoá file **bang-luong.xlsx**.',
        hint: 'Nhấp chọn file trước, rồi bấm nút “🗑️ Xoá”.',
        steps: ['Nhấp một lần vào bang-luong.xlsx.', 'Bấm nút “🗑️ Xoá”.'],
      },
      2: {
        kind: 'practice',
        task: 'Ôi, xoá nhầm rồi! Mở **Thùng rác** và lấy lại file bang-luong.xlsx.',
        hint: 'Bấm hình 🗑️ Thùng rác. Chọn file, rồi bấm “♻️ Khôi phục”.',
        steps: ['Bấm hình 🗑️ Thùng rác.', 'Nhấp một lần vào bang-luong.xlsx.', 'Bấm nút “♻️ Khôi phục”.'],
      },
    },
  },

  'basics.files.project.win': {
    steps: {
      0: {
        kind: 'explain',
        body: 'Bài cuối của phần này rồi! Sau chuyến du lịch, thư mục **Tải về** đang lộn xộn.\n\nMình cùng dọn cho gọn nhé. Bạn sẽ dùng lại những gì vừa học.',
      },
      1: {
        kind: 'practice',
        task: 'Làm 3 việc:\n\n- Trong **Ảnh**, tạo thư mục **Ảnh du lịch**.\n- Chuyển 3 tấm ảnh .jpg trong **Tải về** vào đó.\n- Xoá file **ghi-chu-cu.txt**.',
        hint: 'Làm từng việc một, xong việc này mới sang việc kia. Nhớ đừng xoá vé máy bay nhé!',
        steps: [
          'Bấm “Ảnh” ở bên trái. Bấm “📁 Thư mục mới”, gõ tên “Ảnh du lịch”, bấm Enter.',
          'Bấm “Tải về”. Nhấp ảnh thứ nhất, giữ Ctrl rồi nhấp 2 ảnh .jpg còn lại.',
          'Bấm “✂️ Cắt”.',
          'Bấm “Ảnh”, nhấp đúp vào “Ảnh du lịch”, rồi bấm “📥 Dán”.',
          'Bấm “Tải về”. Nhấp chọn ghi-chu-cu.txt, bấm “🗑️ Xoá”.',
        ],
      },
    },
  },
};
