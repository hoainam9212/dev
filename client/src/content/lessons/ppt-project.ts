import { pptSim, wordSim, type Lesson } from '@office-neko/shared';
import { pptChain, pptPractice, pptTypeInto } from '../lessonKit';

const CREDIT = 'Ảnh chụp Microsoft PowerPoint';
/** Ảnh mẫu dùng chung với hộp thoại Pictures, như bài `ppt.image`. */
const IMG = wordSim.IMAGE_LIBRARY[0]!;

/** Kết quả mẫu của chặng 1, dựng lại làm điểm xuất phát cho chặng 2. */
const stage1 = (s0: pptSim.PptState): pptSim.PptAction[] =>
  pptChain(
    s0,
    (s) => pptTypeInto(s, 0, 'title', 'Mochi'),
    () => [{ type: 'addSlide', layout: 'titleContent' }],
    (s) => pptTypeInto(s, 1, 'title', 'Sở thích'),
    (s) => pptTypeInto(s, 1, 'body', 'Đọc sách và vẽ mèo'),
    () => [{ type: 'addSlide', layout: 'twoContent' }],
    (s) => pptTypeInto(s, 2, 'title', 'Mục tiêu'),
    (s) => pptTypeInto(s, 2, 'body', 'Năm nay: gõ 10 ngón'),
    (s) => pptTypeInto(s, 2, 'body2', 'Năm sau: thành thạo Excel'),
  );

/** Chặng 2 trên nền chặng 1: ảnh ở slide 2, hình khối ở slide 3. */
const stage2 = (s0: pptSim.PptState): pptSim.PptAction[] =>
  pptChain(
    s0,
    stage1,
    () => [
      { type: 'gotoSlide', index: 1 },
      { type: 'addImage', src: IMG.src, alt: IMG.alt },
      { type: 'gotoSlide', index: 2 },
      { type: 'addShape', shape: 'star', x: 400, y: 400, w: 120, h: 120 },
    ],
  );

/** Chương 5 — Dự án: Slide giới thiệu bản thân. */
export const PPT_PROJECT: Lesson[] = [
  {
    id: 'ppt.project',
    trackId: 'ppt',
    chapterId: 'ppt.final',
    title: 'Dự án: Slide giới thiệu bản thân',
    minutes: 20,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Bài cuối của lộ trình PowerPoint: bạn làm một bộ slide **giới thiệu bản thân** — đúng thứ hay phải trình bày trong buổi đầu đi làm hay đi học.',
      },
      {
        kind: 'explain',
        body: 'Ba chặng: **dựng 3 slide** → **thêm ảnh và hình** → **trang trí, chuyển cảnh và trình chiếu**. Làm xong chặng nào Mochi chấm chặng đó, chặng sau nối tiếp bản làm mẫu nên không phải làm lại từ đầu.',
      },
      pptPractice({
        task: 'Chặng 1 — dựng 3 slide. Slide 1: gõ **tên của bạn** vào tiêu đề. Thêm slide 2 bố cục **Title and Content**, tiêu đề **Sở thích**, gõ vài sở thích vào phần nội dung. Thêm slide 3 bố cục **Two Content**, tiêu đề **Mục tiêu**, gõ chữ vào **cả hai cột**.',
        checks: [
          { kind: 'slideCount', count: 3 },
          { kind: 'slideTitle', slide: 1, notEmpty: true },
          { kind: 'slideTitle', slide: 2, text: 'Sở thích' },
          { kind: 'placeholder', slide: 2, role: 'body', notEmpty: true },
          { kind: 'slideLayout', slide: 3, layout: 'twoContent' },
          { kind: 'slideTitle', slide: 3, text: 'Mục tiêu' },
          { kind: 'placeholder', slide: 3, role: 'body', notEmpty: true },
          { kind: 'placeholder', slide: 3, role: 'body2', notEmpty: true },
        ],
        spotlight: { helpId: 'ppt.newSlide' },
        hint: 'New Slide thêm slide sau slide đang mở; Layout ▾ đổi bố cục. Nháy đúp vào khung nào thì gõ được vào khung đó.',
        steps: [
          'Nháy đúp vào tiêu đề slide 1, gõ tên bạn, bấm Enter.',
          'Thẻ Home › nhóm Slides › New Slide: slide 2 có sẵn bố cục Title and Content. Gõ Sở thích vào tiêu đề, gõ vài sở thích vào phần nội dung.',
          'Bấm New Slide lần nữa, rồi Layout ▾ › Two Content. Gõ Mục tiêu vào tiêu đề, rồi gõ chữ vào cột trái và cột phải.',
        ],
        solve: stage1,
      }),
      pptPractice({
        task: 'Chặng 2 — thêm hình ảnh. Mochi đã dựng sẵn 3 slide mẫu như chặng 1 để bạn làm tiếp. Chèn **một ảnh** vào slide 2 (Sở thích) và **một hình khối bất kỳ** vào slide 3 (Mục tiêu).',
        checks: [
          { kind: 'hasElement', slide: 2, el: 'image' },
          { kind: 'hasElement', slide: 3, el: 'shape' },
        ],
        spotlight: { helpId: 'ppt.pictures' },
        hint: 'Ảnh và hình khối đều ở thẻ Insert. Nhớ bấm vào hình nhỏ của slide bên trái để mở đúng slide trước khi chèn.',
        steps: [
          'Bấm hình nhỏ của slide 2 ở cột bên trái.',
          'Thẻ Insert › nhóm Images › Pictures, chọn một ảnh mẫu.',
          'Bấm hình nhỏ của slide 3. Thẻ Insert › nhóm Illustrations › Shapes ▾, chọn một hình bất kỳ.',
        ],
        setup: stage1,
        solve: () => [
          { type: 'gotoSlide', index: 1 },
          { type: 'addImage', src: IMG.src, alt: IMG.alt },
          { type: 'gotoSlide', index: 2 },
          { type: 'addShape', shape: 'star', x: 400, y: 400, w: 120, h: 120 },
        ],
      }),
      pptPractice({
        task: 'Chặng 3 — trang trí và trình bày, trên bộ slide mẫu đã có ảnh và hình. Chọn một **theme bất kỳ khác Mochi**, cho **cả 3 slide** một **chuyển cảnh bất kỳ**, rồi **trình chiếu từ đầu tới hết** và thoát.',
        checks: [
          { kind: 'notTheme', theme: 'mochi' },
          { kind: 'transition', slide: 1, transition: 'any' },
          { kind: 'transition', slide: 2, transition: 'any' },
          { kind: 'transition', slide: 3, transition: 'any' },
          { kind: 'presented' },
        ],
        spotlight: { helpId: 'ppt.themes' },
        hint: 'Theme ở thẻ Design, chuyển cảnh ở thẻ Transitions (nhớ Apply To All), trình chiếu bằng F5.',
        steps: [
          'Thẻ Design › nhóm Themes, chọn một theme bạn thích (khác Mochi).',
          'Thẻ Transitions › chọn một kiểu, rồi nhóm Timing › Apply To All để cả 3 slide cùng kiểu.',
          'Nhấn F5 (hoặc Slide Show › From Beginning), nhấn → tới hết rồi bấm thêm một lần để về.',
        ],
        setup: stage2,
        solve: () => [
          { type: 'setTheme', theme: 'hoa' },
          { type: 'setTransition', transition: 'push', all: true },
          { type: 'startShow', from: 'start' },
          { type: 'showNext' },
          { type: 'showNext' },
          { type: 'showNext' },
          { type: 'showNext' },
        ],
      }),
      {
        kind: 'realShot',
        image: '/images/real/ppt-08-slideshow.png',
        caption: 'Trên PowerPoint thật: thẻ Slide Show — F5 là trình chiếu',
        credit: CREDIT,
        marks: [
          { x: 0.9, y: 42.5, w: 5.9, h: 43.1, label: 'From Beginning, phím tắt F5: trình chiếu từ slide đầu' },
          { x: 6.8, y: 42.5, w: 7.3, h: 43.1, label: 'From Current Slide, phím tắt Shift + F5: trình chiếu từ slide đang mở' },
        ],
      },
      {
        kind: 'explain',
        mood: 'happy',
        body: 'Xong rồi! Bạn vừa tự tay làm một bộ slide trọn vẹn: bố cục, chữ, ảnh, hình, theme, chuyển cảnh, và đứng trình chiếu như dân chuyên. Lần tới cần thuyết trình, bạn đã biết bắt đầu từ đâu. 🎉',
      },
    ],
  },
];
