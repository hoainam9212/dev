import { pptSim, type Lesson } from '@office-neko/shared';
import { pptChain as chain, pptPractice, pptTypeInto as typeInto } from '../lessonKit';

const CREDIT = 'Ảnh chụp Microsoft PowerPoint';
const HOME_SHOT = '/images/real/ppt-02-home.png';
const LAYOUT_SHOT = '/images/real/ppt-03-layout-menu.png';
const DESIGN_SHOT = '/images/real/ppt-06-design.png';
/** Màu cam trong bảng Font Color của app — lấy từ bảng màu, không tự đặt mã. */
const ORANGE = pptSim.PPT_COLORS.find((c) => c.vi === 'Cam Mochi')!.id;

/** Chương 3 — Cho đẹp mắt. */
export const PPT_DESIGN: Lesson[] = [
  {
    id: 'ppt.layout',
    trackId: 'ppt',
    chapterId: 'ppt.design',
    title: 'Bố cục hai cột',
    minutes: 8,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Muốn **so sánh** hai thứ — mèo và chó, trước và sau, ưu và nhược — thì đặt chúng **cạnh nhau** trên một slide. [[bo-cuc|Bố cục]] **Two Content** (Hai cột nội dung) chia slide làm hai cột, mỗi cột một chỗ để gõ.',
      },
      {
        kind: 'explain',
        body: 'Thẻ **Home** › nhóm **Slides** › nút **Layout ▾** (Bố cục) › **Two Content**. Đổi bố cục **không mất chữ**: tiêu đề cũ vẫn giữ nguyên, chữ ở cột nội dung cũ sang cột bên trái.',
      },
      {
        kind: 'quiz',
        question: 'Bạn muốn đặt "Ưu điểm" và "Nhược điểm" cạnh nhau trên một slide. Chọn bố cục nào?',
        choices: ['Title Slide (Slide tiêu đề)', 'Two Content (Hai cột nội dung)', 'Blank (Trang trắng)'],
        answer: 1,
        why: 'Two Content có sẵn hai cột cạnh nhau, đúng để so sánh.',
      },
      pptPractice({
        slides: ['title', 'titleContent'],
        task: 'Slide 2 có tiêu đề «Mèo và chó». Hãy đổi slide 2 sang bố cục **Two Content** (Hai cột nội dung), rồi gõ **Mèo** vào cột trái và **Chó** vào cột phải.',
        checks: [
          { kind: 'slideLayout', slide: 2, layout: 'twoContent' },
          { kind: 'placeholder', slide: 2, role: 'body', textContains: 'Mèo' },
          { kind: 'placeholder', slide: 2, role: 'body2', textContains: 'Chó' },
        ],
        spotlight: { helpId: 'ppt.layout' },
        hint: 'Nút Layout ▾ nằm ngay cạnh New Slide ở thẻ Home. Đổi bố cục trước, gõ chữ sau.',
        steps: [
          'Slide 2 đang mở. Thẻ Home › nhóm Slides › bấm nút Layout ▾ (Bố cục).',
          'Chọn Two Content (Hai cột nội dung): slide chia thành hai cột.',
          'Nháy đúp vào cột trái, gõ Mèo rồi bấm Enter.',
          'Nháy đúp vào cột phải, gõ Chó rồi bấm Enter.',
        ],
        setup: (s0) => chain(s0, (s) => typeInto(s, 0, 'title', 'Thú cưng'), (s) => typeInto(s, 1, 'title', 'Mèo và chó'), () => [{ type: 'gotoSlide', index: 1 }]),
        solve: (s0) =>
          chain(
            s0,
            () => [{ type: 'setLayout', layout: 'twoContent' }],
            (s) => typeInto(s, 1, 'body', 'Mèo'),
            (s) => typeInto(s, 1, 'body2', 'Chó'),
          ),
      }),
      {
        kind: 'realShot',
        image: LAYOUT_SHOT,
        caption: 'Trên PowerPoint thật: menu Layout',
        credit: CREDIT,
        marks: [{ x: 15.4, y: 32.4, w: 10.6, h: 21, label: 'Two Content: hai cột nội dung đặt cạnh nhau' }],
      },
    ],
  },
  {
    id: 'ppt.format',
    trackId: 'ppt',
    chapterId: 'ppt.design',
    title: 'Chữ to, màu, căn giữa',
    minutes: 8,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Slide được chiếu lên màn lớn, người ngồi cuối phòng cũng phải đọc được. Nên chữ trên slide **to hơn trong Word nhiều**: tiêu đề khoảng 40, nội dung khoảng 24 tới 32.',
      },
      {
        kind: 'explain',
        body: 'Bấm chọn khung chữ trước, rồi dùng thẻ **Home**: nhóm **Font** có **Font Size** (Cỡ chữ) và **Font Color** (Màu chữ); nhóm **Paragraph** có **Center** (Căn giữa). Định dạng áp cho **cả khung** đang chọn.',
      },
      {
        kind: 'quiz',
        question: 'Bạn bấm Center mà chữ không đổi chỗ. Vì sao?',
        choices: ['Chưa chọn khung chữ nào', 'Cỡ chữ quá nhỏ', 'Slide chưa có theme'],
        answer: 0,
        why: 'Phải bấm chọn khung chữ trước, nút định dạng mới biết áp vào đâu.',
      },
      pptPractice({
        slides: ['titleContent'],
        task: 'Khung nội dung có dòng «Bánh dẻo nhân đậu đỏ». Hãy làm dòng đó thật nổi: **cỡ chữ 32**, **màu Cam Mochi**, **căn giữa**.',
        checks: [{ kind: 'elFormat', slide: 1, role: 'body', fmt: { size: 32, color: ORANGE, align: 'center' } }],
        spotlight: { helpId: 'ppt.size' },
        hint: 'Bấm vào khung nội dung để chọn nó trước, rồi mới bấm các nút ở thẻ Home.',
        steps: [
          'Bấm một lần vào khung nội dung (dòng Bánh dẻo nhân đậu đỏ): khung có viền và tay nắm.',
          'Thẻ Home › nhóm Font › bấm ô Font Size (Cỡ chữ), chọn 32.',
          'Nhóm Font › nút Font Color ▾ (Màu chữ), chọn Cam Mochi.',
          'Nhóm Paragraph › bấm Center (Căn giữa).',
        ],
        setup: (s0) => chain(s0, (s) => typeInto(s, 0, 'title', 'Bánh mochi'), (s) => typeInto(s, 0, 'body', 'Bánh dẻo nhân đậu đỏ')),
        solve: (s0) => {
          const body = s0.slides[0]!.els.find((e) => e.role === 'body')!.id;
          return [
            { type: 'selectEl', id: body },
            { type: 'setFmt', fmt: { size: 32 } },
            { type: 'setFmt', fmt: { color: ORANGE } },
            { type: 'setFmt', fmt: { align: 'center' } },
          ];
        },
      }),
      {
        kind: 'realShot',
        image: HOME_SHOT,
        caption: 'Trên PowerPoint thật: thẻ Home › nhóm Font và Paragraph',
        credit: CREDIT,
        marks: [
          { x: 39.7, y: 47.5, w: 4.5, h: 14.4, label: 'Font Size: cỡ chữ của khung đang chọn' },
          { x: 48.3, y: 66.9, w: 3.6, h: 14.4, label: 'Font Color ▾: màu chữ' },
          { x: 55.9, y: 66.9, w: 2.2, h: 14.4, label: 'Center: căn chữ vào giữa khung' },
        ],
      },
    ],
  },
  {
    id: 'ppt.theme',
    trackId: 'ppt',
    chapterId: 'ppt.design',
    title: 'Chọn theme',
    minutes: 7,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Một [[theme|theme]] đổi **cùng lúc** màu nền, màu chữ và kiểu chữ của **mọi slide**. Một cú bấm là cả bài trình chiếu khoác áo mới, không phải tô từng slide.',
      },
      {
        kind: 'explain',
        body: 'Thẻ **Design** › nhóm **Themes**: bấm một mẫu là xong. Chữ bạn đã **tô màu riêng** thì giữ màu đó — nếu nó chìm vào nền mới, chọn khung chữ rồi vào thẻ **Home** › **Font Color ▾** › **Automatic** (Tự động) để chữ theo màu của theme.',
      },
      {
        kind: 'quiz',
        question: 'Bài có 5 slide, bạn đang mở slide 2 và chọn một theme mới. Slide nào đổi màu?',
        choices: ['Chỉ slide 2', 'Cả 5 slide', 'Chỉ slide 1'],
        answer: 1,
        why: 'Theme áp cho cả bài trình chiếu, không theo từng slide.',
      },
      pptPractice({
        slides: ['title', 'titleContent', 'twoContent'],
        task: 'Bài trình chiếu 3 slide đang dùng theme Mochi màu kem. Hãy đổi cả bài sang theme **Biển**.',
        checks: [{ kind: 'theme', theme: 'bien' }],
        spotlight: { helpId: 'ppt.themes' },
        hint: 'Theme nằm ở thẻ Design, không phải thẻ Home.',
        steps: ['Bấm thẻ Design ở trên cùng.', 'Nhóm Themes › bấm ô Biển (màu xanh biển nhạt): cả 3 slide đổi màu.'],
        setup: (s0) =>
          chain(
            s0,
            (s) => typeInto(s, 0, 'title', 'Chuyến đi biển'),
            (s) => typeInto(s, 1, 'title', 'Chuẩn bị'),
            (s) => typeInto(s, 2, 'title', 'Trước và sau'),
            () => [{ type: 'gotoSlide', index: 0 }],
          ),
        solve: () => [{ type: 'setTheme', theme: 'bien' }],
      }),
      {
        kind: 'realShot',
        image: DESIGN_SHOT,
        caption: 'Trên PowerPoint thật: thẻ Design › nhóm Themes',
        credit: CREDIT,
        marks: [
          { x: 1.1, y: 45.6, w: 37.4, h: 35, label: 'Themes: bấm một mẫu để đổi màu nền, màu chữ và kiểu chữ cho mọi slide' },
          { x: 38.5, y: 44.4, w: 2.4, h: 37.5, label: 'Nút ▾ (More): mở thêm nhiều theme khác' },
        ],
      },
    ],
  },
];
