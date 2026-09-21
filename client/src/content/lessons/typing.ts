import type { Lesson } from '@office-neko/shared';
import { typingPractice } from '../lessonKit';

const L = (chapterId: string, id: string, title: string, steps: Lesson['steps'], extra: Partial<Lesson> = {}): Lesson => ({
  trackId: 'typing',
  chapterId,
  id: `typing.${id}`,
  title,
  minutes: 4,
  steps,
  ...extra,
});

const drill = (task: string, target: string, hint: string) =>
  typingPractice({ task, target, hint, steps: ['Đặt 8 ngón lên hàng cơ sở (A S D F — J K L ;).', 'Nhìn bàn phím ảo: phím viền hồng là phím cần bấm.', 'Gõ chậm mà đúng, tốc độ sẽ tự tăng.'] });

export const typingLessons: Lesson[] = [
  L('typing.start', 'posture', 'Tư thế ngồi đúng', [
    { kind: 'explain', mood: 'happy', body: 'Trước khi gõ nhanh, hãy ngồi cho đúng:\n\n- Lưng thẳng, vai thả lỏng, mắt cách màn hình khoảng một cánh tay.\n- Khuỷu tay vuông góc, cổ tay không tì xuống bàn.\n- Nhìn màn hình, **không nhìn bàn phím**.' },
    { kind: 'explain', body: 'Tám ngón tay đặt trên [[home-row|hàng phím cơ sở]]: tay trái **A S D F**, tay phải **J K L ;**. Ngón cái đặt trên [[space-bar|phím cách]].\n\nPhím **F** và **J** có gờ nhỏ, sờ vào là biết tay đã đặt đúng chỗ.' },
    { kind: 'quiz', question: 'Phím nào có gờ nhỏ để đặt ngón trỏ?', choices: ['F và J', 'A và ;', 'G và H'], answer: 0, why: 'Đúng! Ngón trỏ trái đặt lên F, ngón trỏ phải đặt lên J.' },
  ]),
  L('typing.start', 'home1', 'Hàng cơ sở: A S D F J K L ;', [
    drill('Gõ theo dòng chữ. Mỗi ngón chỉ bấm phím của mình nhé!', 'asdf jkl; asdf jkl; fdsa ;lkj', 'Mỗi ngón một phím: út A, áp út S, giữa D, trỏ F.'),
  ]),
  L('typing.start', 'home2', 'Thêm G và H', [
    { kind: 'explain', body: 'Phím **G** do ngón trỏ trái bấm (dịch sang phải một chút). Phím **H** do ngón trỏ phải bấm (dịch sang trái). Bấm xong nhớ đưa ngón trỏ về F và J.' },
    drill('Gõ theo dòng chữ.', 'fg hj fgf jhj gag hah glad lash', 'Ngón trỏ với sang G/H rồi quay về F/J.'),
  ]),
  L('typing.start', 'home3', 'Từ trên hàng cơ sở', [
    drill('Gõ các từ chỉ dùng hàng cơ sở.', 'a sad lad; ask dad; flash salad; all fall', 'Dùng ngón cái bấm phím cách.'),
  ]),
  L('typing.rows', 'top1', 'Hàng trên: Q W E R T Y U I O P', [
    { kind: 'explain', body: 'Hàng trên do các ngón **vươn lên** bấm, bấm xong quay về hàng cơ sở. Ví dụ: ngón giữa trái từ D lên E, ngón trỏ phải từ J lên U.' },
    drill('Gõ theo dòng chữ.', 'qwert yuiop qwert yuiop were your type', 'Nhìn màu phím trên bàn phím ảo để biết ngón nào bấm.'),
  ]),
  L('typing.rows', 'top2', 'Từ có hàng trên', [
    drill('Gõ các từ sau.', 'we type quite well; our tour is super', 'Gõ đều tay, không vội.'),
  ]),
  L('typing.rows', 'bottom1', 'Hàng dưới: Z X C V B N M , . /', [
    { kind: 'explain', body: 'Hàng dưới do các ngón **co xuống** bấm. Ví dụ: ngón trỏ trái từ F xuống V, B; ngón trỏ phải từ J xuống N, M.' },
    drill('Gõ theo dòng chữ.', 'zxcv bnm, zxcv bnm, cab van mix', 'Co ngón xuống, bấm xong đưa về hàng cơ sở.'),
  ]),
  L('typing.rows', 'bottom2', 'Từ có hàng dưới', [
    drill('Gõ các từ sau.', 'come back soon, mix a nice cake.', 'Dấu phẩy do ngón giữa phải bấm, dấu chấm do ngón áp út phải bấm.'),
  ]),
  L('typing.numsym', 'numbers', 'Hàng số', [
    { kind: 'explain', body: 'Hàng số nằm trên cùng. Ngón nào bấm phím chữ ngay dưới thì bấm luôn số ở trên, ví dụ ngón giữa trái bấm cả D, E và 3.' },
    drill('Gõ các con số.', '2026 12 345 67 89 10 2025', 'Vươn ngón lên hai hàng, bấm xong quay về hàng cơ sở.'),
  ]),
  L('typing.numsym', 'symbols', 'Ký hiệu với Shift', [
    { kind: 'explain', body: 'Giữ [[shift|Shift]] ở **tay bên kia** rồi bấm phím số để ra ký hiệu phía trên: Shift + 1 = !, Shift + 2 = @, Shift + / = ?' },
    drill('Gõ dòng có ký hiệu.', 'Hi! mochi@meo.vn (1+2=3)?', 'Tay phải bấm phím thì tay trái giữ Shift, và ngược lại.'),
  ]),
  L('typing.text', 'sentences', 'Gõ câu', [
    drill('Gõ các câu sau (chưa cần dấu tiếng Việt).', 'Hom nay troi dep. Minh di hoc tin hoc.', 'Chữ hoa: giữ Shift ở tay bên kia.'),
  ]),
  L('typing.text', 'passage', 'Gõ đoạn văn dài', [
    { kind: 'explain', body: 'Bây giờ gõ cả đoạn văn. Chữ **xanh** là đúng, chữ **đỏ** là sai. Gõ sai thì nhấn [[backspace|Backspace]] để sửa. Cố gắng giữ nhịp đều nhé!' },
    typingPractice({
      task: 'Gõ hết đoạn văn với độ chính xác từ 90% trở lên.',
      target: 'Meo Mochi thich an ca va ngu trua. Moi sang Mochi ngoi canh ban phim, nhac ban go cham ma chac. Go deu tay thi toc do se tang dan.',
      mode: 'passage',
      checks: [{ kind: 'typing', completeText: true, minAccuracy: 90 }],
      hint: 'Đừng nhìn bàn phím; nhìn dòng chữ và bàn phím ảo trên màn hình.',
      steps: ['Gõ từng từ một.', 'Sai thì Backspace rồi gõ lại.', 'Gõ tới dấu chấm cuối cùng.'],
    }),
  ]),
  L('typing.vi', 'vi.setup', 'Chuẩn bị gõ tiếng Việt', [
    { kind: 'explain', body: 'Để gõ chữ có dấu, máy tính cần một [[ime|bộ gõ tiếng Việt]]. Có hai kiểu gõ phổ biến: [[telex|Telex]] (dùng chữ cái) và [[vni|VNI]] (dùng số).' },
    {
      kind: 'explain',
      body: 'Cách bật bộ gõ trên máy thật:\n\n- **Windows:** cài Unikey hoặc EVKey, hoặc thêm bàn phím Vietnamese trong Settings → Time & language → Language.\n- **Mac:** System Settings → Keyboard → Input Sources → thêm **Vietnamese – Telex**, rồi chuyển bằng biểu tượng trên thanh menu.\n\n⚠️ Khi luyện trong app này, hãy **tắt** bộ gõ của máy: Mochi tự thêm dấu cho bạn.',
    },
    { kind: 'quiz', question: 'Trong kiểu Telex, gõ “aa” sẽ ra chữ gì?', choices: ['â', 'ă', 'á'], answer: 0, why: 'Đúng! aa → â, còn aw → ă và as → á.' },
  ]),
  L('typing.vi', 'telex1', 'Telex: dấu thanh', [
    { kind: 'explain', body: 'Telex thêm dấu bằng một chữ gõ **sau** nguyên âm:\n\n- **s** sắc (má), **f** huyền (mà), **r** hỏi (mả), **x** ngã (mã), **j** nặng (mạ)\n- **z** xoá dấu' },
    typingPractice({ task: 'Gõ các chữ sau bằng Telex.', target: 'má mà mả mã mạ', raw: 'mas maf mar max maj', ime: 'telex', hint: 'Gõ “m”, “a” rồi chữ tạo dấu: s f r x j.', steps: ['mas → má', 'maf → mà', 'mar → mả', 'max → mã', 'maj → mạ'] }),
  ]),
  L('typing.vi', 'telex2', 'Telex: â ê ô ă ơ ư đ', [
    { kind: 'explain', body: 'Chữ có mũ, có móc trong Telex:\n\n- **aa** â, **ee** ê, **oo** ô\n- **aw** ă, **ow** ơ, **uw** (hoặc **w**) ư\n- **dd** đ' },
    typingPractice({ task: 'Gõ câu sau bằng Telex.', target: 'ăn cơm đi học', raw: 'awn cowm ddi hocj', ime: 'telex', hint: 'aw → ă, ow → ơ, dd → đ, j → dấu nặng.', steps: ['awn → ăn', 'cowm → cơm', 'ddi → đi', 'hocj → học'] }),
  ]),
  L('typing.vi', 'telex3', 'Telex: gõ cả câu', [
    typingPractice({ task: 'Gõ câu sau bằng Telex (nhớ chữ hoa đầu câu).', target: 'Tôi đang học gõ tiếng Việt.', raw: 'Tooi ddang hocj gox tieengs Vieetj.', ime: 'telex', hint: 'Tooi → Tôi, gox → gõ, tieengs → tiếng.', steps: ['Tooi ddang', 'hocj gox', 'tieengs Vieetj.'] }),
  ]),
  L('typing.vi', 'vni1', 'VNI: dấu bằng số', [
    { kind: 'explain', body: 'Hai bài VNI là **tự chọn**: phần lớn người Việt gõ Telex, nên bạn có thể bỏ qua và về đích bình thường. Biết thêm VNI vẫn tiện khi dùng máy của người khác.\n\nVNI dùng **số** gõ sau chữ:\n\n- **1** sắc, **2** huyền, **3** hỏi, **4** ngã, **5** nặng, **0** xoá dấu\n- **6** mũ (â ê ô), **7** móc (ơ ư), **8** trăng (ă), **9** đ' },
    typingPractice({ task: 'Gõ các chữ sau bằng VNI.', target: 'má mà mả mã mạ', raw: 'ma1 ma2 ma3 ma4 ma5', ime: 'vni', hint: 'Gõ chữ rồi gõ số dấu: 1 đến 5.', steps: ['ma1 → má', 'ma2 → mà', 'ma3 → mả', 'ma4 → mã', 'ma5 → mạ'] }),
  ], { optional: true }),
  L('typing.vi', 'vni2', 'VNI: gõ cả câu', [
    typingPractice({ task: 'Gõ câu sau bằng VNI.', target: 'Tôi đang học gõ tiếng Việt.', raw: 'To6i d9ang ho5c go4 tie6ng1 Vie6t5.', ime: 'vni', hint: 'o6 → ô, d9 → đ, 5 → nặng, 4 → ngã, 1 → sắc.', steps: ['To6i d9ang', 'ho5c go4', 'tie6ng1 Vie6t5.'] }),
  ], { optional: true }),
  L('typing.final', 'game', 'Chơi “Mèo bắt cá”', [
    { kind: 'explain', mood: 'happy', body: 'Luyện tập mỗi ngày sẽ giúp bạn gõ nhanh hơn! Vào mục **⌨️ Luyện gõ** trên thanh trên cùng để chơi **Mèo bắt cá** 🐟 (gõ đúng chữ để Mochi bắt cá) và **kiểm tra tốc độ** 1 hoặc 3 phút.' },
    { kind: 'quiz', question: '[[wpm|WPM]] là gì?', choices: ['Số từ gõ được mỗi phút', 'Số lỗi mỗi phút', 'Số phím trên bàn phím'], answer: 0, why: 'Chính xác! WPM (Words Per Minute): cứ 5 ký tự tính là 1 từ.' },
  ]),
  L(
    'typing.final',
    'project',
    'Dự án: Về đích 25 WPM',
    [
      { kind: 'explain', mood: 'happy', body: 'Thử thách cuối lộ trình: gõ hết đoạn văn với tốc độ **từ 25 WPM** và độ chính xác **từ 95%**. Hít thở sâu, gõ đều tay nhé!' },
      typingPractice({
        task: 'Gõ hết đoạn văn: tốc độ ≥ 25 WPM, chính xác ≥ 95%.',
        target: 'Tin hoc van phong giup cong viec nhanh hon. Khi go dung mat va dung ngon, ban se khong can nhin ban phim nua. Mochi tin ban lam duoc!',
        mode: 'passage',
        checks: [{ kind: 'typing', completeText: true, minWpm: 25, minAccuracy: 95 }],
        hint: 'Chậm mà đúng vẫn tốt hơn nhanh mà sai. Chính xác cao thì tốc độ sẽ đến.',
        steps: ['Đặt tay lên hàng cơ sở.', 'Gõ đều, không dừng lâu giữa các từ.', 'Gõ sai thì Backspace sửa ngay.'],
      }),
    ],
    { minutes: 6 },
  ),
];
