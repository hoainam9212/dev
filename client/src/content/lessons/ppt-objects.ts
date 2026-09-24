import { pptSim, wordSim, type Lesson } from '@office-neko/shared';
import { pptPractice } from '../lessonKit';

/** Ảnh mẫu dùng chung với hộp thoại Pictures (Task 8), không chép chuỗi ảnh vào đây. */
const IMG = wordSim.IMAGE_LIBRARY[0]!;

/** Dựng sẵn slide có tiêu đề, để người học chỉ tập đúng một việc mới. */
const titled =
  (title: string) =>
  (s0: pptSim.PptState): pptSim.PptAction[] => [
    { type: 'startEditEl', id: s0.slides[0]!.els[0]!.id },
    { type: 'setText', text: title },
    { type: 'commitEdit' },
  ];

/** Chương 2 — Chữ, hình và ảnh. */
export const PPT_OBJECTS: Lesson[] = [
  {
    id: 'ppt.textbox',
    trackId: 'ppt',
    chapterId: 'ppt.objects',
    title: 'Chèn hộp chữ',
    minutes: 8,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body: '[[cho-danh-san|Chỗ dành sẵn]] của bố cục chỉ nằm ở vài chỗ cố định. Muốn viết chữ ở chỗ khác — một dòng ghi chú ở góc, một câu chú thích cạnh ảnh — thì chèn một [[hop-chu|hộp chữ]] mới.',
      },
      {
        kind: 'explain',
        body: 'Vào tab **Insert** (Chèn), bấm **Text Box** (Hộp chữ). Hộp chữ mới hiện ra và **đang được chọn**: kéo nó là dời được ngay, nháy đúp vào là gõ được chữ.',
      },
      {
        kind: 'quiz',
        question: 'Muốn viết thêm một dòng chữ ở góc dưới slide thì làm gì?',
        choices: ['Gõ thêm nhiều dấu cách vào tiêu đề', 'Chèn một hộp chữ mới', 'Thêm một slide mới'],
        answer: 1,
        why: 'Hộp chữ đặt được ở bất kỳ đâu trên slide, không đụng tới tiêu đề.',
      },
      pptPractice({
        slides: ['titleContent'],
        task: 'Slide đã có tiêu đề «Sở thích của tôi». Hãy chèn một **hộp chữ** và gõ vào đó **Đọc sách**.',
        checks: [{ kind: 'hasElement', slide: 1, el: 'text', textContains: 'Đọc sách' }],
        spotlight: { helpId: 'ppt.textBox' },
        hint: 'Nút Text Box nằm ở tab Insert, không phải tab Home.',
        steps: [
          'Bấm tab Insert (Chèn) ở trên cùng.',
          'Bấm Text Box (Hộp chữ): một khung mới hiện ra ở phía dưới slide.',
          'Nháy đúp vào khung đó, gõ Đọc sách rồi bấm Enter.',
        ],
        setup: titled('Sở thích của tôi'),
        // Id của hộp chữ tìm từ state, không đoán trước.
        solve: (s0) => {
          const add: pptSim.PptAction = { type: 'addText', x: 80, y: 400, w: 480, h: 80 };
          const id = pptSim.reducePpt(s0, add).sel!;
          return [add, { type: 'startEditEl', id }, { type: 'setText', text: 'Đọc sách' }, { type: 'commitEdit' }];
        },
      }),
    ],
  },
  {
    id: 'ppt.shape',
    trackId: 'ppt',
    chapterId: 'ppt.objects',
    title: 'Hình khối',
    minutes: 9,
    steps: [
      {
        kind: 'explain',
        body: '[[hinh-khoi|Hình khối]] — hình chữ nhật, hình tròn, mũi tên, ngôi sao — giúp slide bớt khô và làm ý chính nổi bật. Chúng nằm ở nút **Shapes** (Hình khối) của tab Insert.',
      },
      {
        kind: 'explain',
        mood: 'surprised',
        body: 'Hình đang được chọn có tám chấm tròn nhỏ quanh viền, gọi là [[tay-nam|tay nắm]]: kéo chúng để hình to ra hay nhỏ lại. Muốn đổi màu hình thì dùng **Shape Fill** (Màu nền hình) ở tab Home; **Font color** chỉ đổi màu chữ.',
      },
      {
        kind: 'quiz',
        question: 'Bạn muốn tô ngôi sao thành màu vàng. Dùng nút nào?',
        choices: ['Font color (Màu chữ)', 'Shape Fill (Màu nền hình)', 'Layout (Bố cục)'],
        answer: 1,
        why: 'Shape Fill tô phần ruột của hình. Font color chỉ đổi màu chữ gõ bên trong hình.',
      },
      pptPractice({
        task: 'Chèn một **ngôi sao** vào slide.',
        checks: [{ kind: 'hasElement', slide: 1, el: 'shape', shape: 'star' }],
        spotlight: { helpId: 'ppt.shapes' },
        hint: 'Shapes nằm ở tab Insert, ngay cạnh Text Box.',
        steps: [
          'Bấm tab Insert (Chèn).',
          'Bấm Shapes (Hình khối): một bảng các hình hiện ra.',
          'Chọn Ngôi sao.',
        ],
        solve: () => [{ type: 'addShape', shape: 'star', x: 400, y: 216, w: 160, h: 160 }],
      }),
      pptPractice({
        task: 'Chèn **hai hình chữ nhật**, rồi kéo cho chúng không đè lên nhau.',
        checks: [{ kind: 'hasElement', slide: 1, el: 'shape', shape: 'rect', min: 2 }],
        spotlight: { helpId: 'ppt.shapes' },
        hint: 'Hình mới luôn hiện ở giữa slide, nên hình thứ hai sẽ đè lên hình thứ nhất. Kéo một hình sang bên.',
        steps: [
          'Insert → Shapes → hình chữ nhật. Làm hai lần.',
          'Hai hình đang chồng lên nhau: bấm giữ vào hình trên cùng rồi kéo nó sang một bên.',
          'Mochi chỉ đếm xem có đủ hai hình chữ nhật chưa; phần kéo cho gọn là để bạn luyện tay.',
        ],
        solve: () => [
          { type: 'addShape', shape: 'rect', x: 80, y: 300, w: 160, h: 80 },
          { type: 'addShape', shape: 'rect', x: 480, y: 300, w: 160, h: 80 },
        ],
      }),
    ],
  },
  {
    id: 'ppt.image',
    trackId: 'ppt',
    chapterId: 'ppt.objects',
    title: 'Chèn ảnh',
    minutes: 9,
    steps: [
      {
        kind: 'explain',
        body: 'Vào tab Insert, bấm **Pictures** (Ảnh). Một hộp thoại hiện ra: chọn một ảnh mẫu, hoặc lấy ảnh từ máy của bạn. Ảnh hiện lên giữa slide và đang được chọn.',
      },
      {
        kind: 'explain',
        mood: 'surprised',
        body: 'Muốn đổi cỡ ảnh thì kéo [[tay-nam|tay nắm]] ở **góc**: ảnh to nhỏ mà vẫn giữ đúng hình. Kéo tay nắm ở **giữa cạnh** thì ảnh bị kéo dài hoặc bẹp đi — mặt người trong ảnh sẽ méo ngay.',
      },
      {
        kind: 'quiz',
        question: 'Kéo tay nắm nào để ảnh không bị méo?',
        choices: ['Tay nắm ở giữa cạnh trên', 'Tay nắm ở góc', 'Tay nắm nào cũng như nhau'],
        answer: 1,
        why: 'Tay nắm góc đổi cả bề ngang lẫn bề dọc theo cùng tỉ lệ.',
      },
      pptPractice({
        task: 'Chèn một ảnh vào slide, rồi kéo **tay nắm ở góc** cho ảnh nhỏ lại một chút.',
        checks: [{ kind: 'hasElement', slide: 1, el: 'image' }],
        spotlight: { helpId: 'ppt.pictures' },
        hint: 'Pictures ở tab Insert. Thu nhỏ bằng chấm tròn ở một trong bốn góc ảnh.',
        steps: [
          'Bấm tab Insert (Chèn), rồi bấm Pictures (Ảnh).',
          'Bấm vào một ảnh mẫu trong hộp thoại.',
          'Bấm giữ chấm tròn ở góc dưới bên phải của ảnh, kéo chéo vào trong rồi thả.',
        ],
        solve: () => [
          { type: 'addImage', src: IMG.src, alt: IMG.alt },
          { type: 'resizeEl', handle: 'se', dx: -80, dy: -60 },
        ],
      }),
    ],
  },
];
