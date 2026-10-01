import type { Lesson } from '@office-neko/shared';
import { pptPractice } from '../lessonKit';

/** Chương 1 — Slide đầu tiên. */
export const PPT_BASICS: Lesson[] = [
  {
    id: 'ppt.intro',
    trackId: 'ppt',
    chapterId: 'ppt.start',
    title: 'Slide là gì',
    minutes: 6,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Chào bạn! Đây là PowerPoint — chỗ để làm bài trình chiếu, thứ bạn hay thấy chiếu lên tường trong buổi họp hay giờ thuyết trình. Mỗi trang chiếu gọi là một [[slide]].',
      },
      {
        kind: 'explain',
        body: 'Cột hẹp **bên trái** là danh sách slide, mỗi slide hiện thành một hình nhỏ có đánh số. Khung lớn **ở giữa** là slide đang mở — bạn soạn nội dung ở đó.',
      },
      {
        kind: 'explain',
        body: 'Khung slide luôn có tỉ lệ [[ty-le-16-9|16:9]], bề ngang dài hơn bề dọc, đúng như màn hình máy chiếu và tivi. Cửa sổ to hay nhỏ thì slide chỉ phóng to thu nhỏ theo, không bao giờ méo.',
      },
      {
        kind: 'quiz',
        question: 'Cột hẹp bên trái màn hình PowerPoint để làm gì?',
        choices: ['Xem và chọn nhanh từng slide', 'Chọn màu chữ', 'Lưu bài trình chiếu'],
        answer: 0,
        why: 'Cột bên trái liệt kê mọi slide theo thứ tự. Bấm vào slide nào thì slide đó mở ra ở khung giữa.',
      },
      pptPractice({
        slides: ['title', 'titleContent'],
        task: 'Bài trình chiếu này có 2 slide. Bấm vào **Slide 2** ở cột bên trái để mở nó ra.',
        // Chỉ đếm slide thì bài đạt ngay khi vừa mở, nên phải chấm cả slide đang mở.
        checks: [{ kind: 'slideCount', count: 2 }, { kind: 'activeSlide', slide: 2 }],
        spotlight: { helpId: 'ppt.slideList' },
        hint: 'Nhìn cột hẹp bên trái: có hai hình nhỏ đánh số 1 và 2.',
        steps: [
          'Tìm hình nhỏ có số 2 ở cột bên trái.',
          'Bấm chuột một lần vào hình đó.',
          'Khung lớn ở giữa đổi sang slide 2 là được.',
        ],
        solve: () => [{ type: 'gotoSlide', index: 1 }],
      }),
    ],
  },
  {
    id: 'ppt.title',
    trackId: 'ppt',
    chapterId: 'ppt.start',
    title: 'Gõ tiêu đề',
    minutes: 8,
    steps: [
      {
        kind: 'explain',
        body: 'Slide mới mở ra đã có sẵn vài khung chữ mờ, kiểu «Bấm để nhập tiêu đề». Đó là [[cho-danh-san|chỗ dành sẵn]] — PowerPoint sắp chỗ trước giúp bạn.',
      },
      {
        kind: 'explain',
        mood: 'surprised',
        body: '**Nháy đúp** vào khung mờ là bắt đầu gõ được. Gõ xong thì bấm {{Enter}}, hoặc bấm ra chỗ trống ngoài khung, để chốt lại. Lỡ gõ sai muốn bỏ thì bấm {{Escape}}: khung trở về như cũ.',
      },
      pptPractice({
        task: 'Nháy đúp vào khung tiêu đề rồi gõ **tên của bạn**.',
        checks: [{ kind: 'slideTitle', slide: 1, notEmpty: true }],
        spotlight: { helpId: 'ppt.canvas' },
        hint: 'Khung tiêu đề là khung mờ to nhất trên slide.',
        steps: [
          'Nháy đúp (bấm hai lần thật nhanh) vào khung «Bấm để nhập tiêu đề».',
          'Gõ tên của bạn.',
          'Bấm Enter để chốt.',
        ],
        // Lời giải mẫu gõ một cái tên bất kỳ; check chỉ đòi tiêu đề có chữ.
        solve: (s0) => [
          { type: 'startEditEl', id: s0.slides[0]!.els[0]!.id },
          { type: 'setText', text: 'Nguyễn Văn An' },
          { type: 'commitEdit' },
        ],
      }),
      pptPractice({
        task: 'Gõ đúng dòng chữ **Giới thiệu bản thân** vào tiêu đề.',
        checks: [{ kind: 'slideTitle', slide: 1, text: 'Giới thiệu bản thân' }],
        spotlight: { helpId: 'ppt.canvas' },
        hint: 'Làm y như bước trước, lần này gõ đúng từng chữ có dấu.',
        steps: [
          'Nháy đúp vào khung tiêu đề.',
          'Gõ: Giới thiệu bản thân',
          'Bấm Enter để chốt.',
        ],
        solve: (s0) => [
          { type: 'startEditEl', id: s0.slides[0]!.els[0]!.id },
          { type: 'setText', text: 'Giới thiệu bản thân' },
          { type: 'commitEdit' },
        ],
      }),
    ],
  },
  {
    id: 'ppt.slides',
    trackId: 'ppt',
    chapterId: 'ppt.start',
    title: 'Thêm, xoá, đổi thứ tự slide',
    minutes: 10,
    steps: [
      {
        kind: 'explain',
        body: 'Thẻ **Home** › nhóm **Slides** › nút **New Slide** (Slide mới) thêm một slide **ngay sau** slide đang mở. Nút **Layout ▾** (Bố cục) ngay cạnh đổi [[bo-cuc|bố cục]] của slide đang mở.',
      },
      {
        kind: 'explain',
        body: 'Bố cục là cách sắp chỗ trên slide: chỉ có tiêu đề, tiêu đề kèm nội dung, hay hai cột đặt cạnh nhau. Muốn đổi thứ tự thì **kéo** hình nhỏ ở cột bên trái lên hoặc xuống. Muốn bỏ một slide thì bấm **chuột phải** vào hình nhỏ của nó ở cột bên trái › **Delete Slide** (Xoá slide).',
      },
      {
        kind: 'quiz',
        question: 'Bạn đang ở slide 2 và bấm New Slide. Slide mới nằm ở đâu?',
        choices: ['Ở đầu, thành slide 1', 'Ngay sau slide 2, thành slide 3', 'Luôn ở cuối cùng'],
        answer: 1,
        why: 'Slide mới luôn chen vào ngay sau slide đang mở.',
      },
      pptPractice({
        task: 'Bài này đang có 1 slide. Hãy thêm **2 slide** nữa, slide thứ 3 dùng bố cục **Hai cột nội dung** (Two Content).',
        checks: [
          { kind: 'slideCount', count: 3 },
          { kind: 'slideLayout', slide: 3, layout: 'twoContent' },
        ],
        spotlight: { helpId: 'ppt.newSlide' },
        hint: 'Bấm New Slide hai lần, rồi đổi bố cục của slide 3 ở nút Layout ▾.',
        steps: [
          'Thẻ Home › nhóm Slides › bấm nửa trên nút New Slide (Slide mới) hai lần — cột bên trái có 3 slide.',
          'Slide 3 vừa thêm đang mở. Thẻ Home › nhóm Slides › nút Layout ▾ (Bố cục), ngay cạnh New Slide.',
          'Chọn Two Content (Hai cột nội dung): slide 3 chia làm hai cột là xong.',
        ],
        solve: () => [{ type: 'addSlide' }, { type: 'addSlide' }, { type: 'setLayout', layout: 'twoContent' }],
      }),
    ],
  },
];
