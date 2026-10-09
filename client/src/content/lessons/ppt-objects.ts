import { pptSim, wordSim, type Lesson } from '@office-neko/shared';
import { pptPractice } from '../lessonKit';

const CREDIT = 'Ảnh chụp Microsoft PowerPoint';
const INSERT_SHOT = '/images/real/ppt-04-insert.png';

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
        body: 'Thẻ **Insert** (Chèn) › nhóm **Text** › nút **Text Box** (Hộp chữ). Hộp chữ mới hiện ra và **đang được chọn**: kéo nó là dời được ngay, nháy đúp vào là gõ được chữ.',
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
        hint: 'Nút Text Box nằm ở thẻ Insert, không phải thẻ Home.',
        steps: [
          'Bấm thẻ Insert (Chèn) ở trên cùng.',
          'Nhóm Text › bấm Text Box (Hộp chữ): một khung mới hiện ra ở phía dưới slide.',
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
      {
        kind: 'realShot',
        image: INSERT_SHOT,
        caption: 'Trên PowerPoint thật: thẻ Insert › nhóm Text',
        credit: CREDIT,
        marks: [
          { x: 65.1, y: 42.5, w: 4.2, h: 43.1, label: 'Text Box: vẽ một hộp chữ trên slide rồi gõ vào' },
        ],
      },
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
        body: '[[hinh-khoi|Hình khối]] — hình chữ nhật, hình tròn, mũi tên, ngôi sao — giúp slide bớt khô và làm ý chính nổi bật. Chúng nằm ở thẻ **Insert** › nhóm **Illustrations** › nút **Shapes ▾** (Hình khối).',
      },
      {
        kind: 'explain',
        mood: 'surprised',
        body: 'Hình đang được chọn có tám chấm tròn nhỏ quanh viền, gọi là [[tay-nam|tay nắm]]: kéo chúng để hình to ra hay nhỏ lại. Muốn đổi màu hình thì dùng thẻ **Home** › nhóm **Drawing** › **Shape Fill** (Màu nền hình); **Font Color** chỉ đổi màu chữ.',
      },
      {
        kind: 'quiz',
        question: 'Bạn muốn tô ngôi sao thành màu vàng. Dùng nút nào?',
        choices: ['Font Color (Màu chữ)', 'Shape Fill (Màu nền hình)', 'Layout (Bố cục)'],
        answer: 1,
        why: 'Shape Fill tô phần ruột của hình. Font Color chỉ đổi màu chữ gõ bên trong hình.',
      },
      pptPractice({
        task: 'Chèn một **ngôi sao** vào slide.',
        checks: [{ kind: 'hasElement', slide: 1, el: 'shape', shape: 'star' }],
        spotlight: { helpId: 'ppt.shapes' },
        hint: 'Shapes ▾ nằm ở thẻ Insert › nhóm Illustrations.',
        steps: [
          'Bấm thẻ Insert (Chèn).',
          'Nhóm Illustrations › bấm Shapes ▾ (Hình khối): một bảng các hình hiện ra.',
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
          'Thẻ Insert › nhóm Illustrations › Shapes ▾ › Hình chữ nhật. Làm hai lần.',
          'Hai hình đang chồng lên nhau: bấm giữ vào hình trên cùng rồi kéo nó sang một bên.',
          'Mochi chỉ đếm xem có đủ hai hình chữ nhật chưa; phần kéo cho gọn là để bạn luyện tay.',
        ],
        solve: () => [
          { type: 'addShape', shape: 'rect', x: 80, y: 300, w: 160, h: 80 },
          { type: 'addShape', shape: 'rect', x: 480, y: 300, w: 160, h: 80 },
        ],
      }),
      {
        kind: 'realShot',
        image: INSERT_SHOT,
        caption: 'Trên PowerPoint thật: thẻ Insert › nhóm Illustrations',
        credit: CREDIT,
        marks: [
          { x: 31.2, y: 42.5, w: 4.2, h: 43.1, label: 'Shapes ▾: mở bảng hình khối' },
        ],
      },
      {
        kind: 'realShot',
        image: '/images/real/ppt-05-shapes-menu.png',
        caption: 'Trên PowerPoint thật: bảng Shapes',
        credit: CREDIT,
        marks: [
          { x: 38.6, y: 76.8, w: 2.4, h: 3, label: 'Star: 5 Points (ngôi sao năm cánh), nhóm Stars and Banners' },
          { x: 31.4, y: 26.9, w: 2.4, h: 3, label: 'Rectangle (hình chữ nhật), nhóm Rectangles' },
        ],
      },
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
        body: 'Thẻ **Insert** › nhóm **Images** › nút **Pictures** (Ảnh). Một hộp thoại hiện ra: chọn một ảnh mẫu, hoặc lấy ảnh từ máy của bạn. Ảnh hiện lên giữa slide và đang được chọn.',
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
        hint: 'Pictures ở thẻ Insert › nhóm Images. Thu nhỏ bằng chấm tròn ở một trong bốn góc ảnh.',
        steps: [
          'Bấm thẻ Insert (Chèn), rồi nhóm Images › bấm Pictures (Ảnh).',
          'Bấm vào một ảnh mẫu trong hộp thoại.',
          'Bấm giữ chấm tròn ở góc dưới bên phải của ảnh, kéo chéo vào trong rồi thả.',
        ],
        solve: () => [
          { type: 'addImage', src: IMG.src, alt: IMG.alt },
          { type: 'resizeEl', handle: 'se', dx: -80, dy: -60 },
        ],
      }),
      {
        kind: 'realShot',
        image: INSERT_SHOT,
        caption: 'Trên PowerPoint thật: thẻ Insert › nhóm Images',
        credit: CREDIT,
        marks: [
          { x: 12.5, y: 42.5, w: 4.7, h: 43.1, label: 'Pictures ▾: chèn ảnh có sẵn trong máy' },
        ],
      },
    ],
  },
];
