import { pptSim, type Lesson } from '@office-neko/shared';
import { pptChain, pptPractice, pptTypeInto } from '../lessonKit';

const CREDIT = 'Ảnh chụp Microsoft PowerPoint';
const TRANSITIONS_SHOT = '/images/real/ppt-07-transitions.png';
const SLIDESHOW_SHOT = '/images/real/ppt-08-slideshow.png';

/** Bài 3 slide có tiêu đề, dùng chung cho cả chương. */
const SLIDES: pptSim.Layout[] = ['title', 'titleContent', 'titleContent'];
const titled = (s0: pptSim.PptState) =>
  pptChain(
    s0,
    (s) => pptTypeInto(s, 0, 'title', 'Chuyến đi Đà Lạt'),
    (s) => pptTypeInto(s, 1, 'title', 'Ăn gì'),
    (s) => pptTypeInto(s, 2, 'title', 'Chơi gì'),
  );

/** Chương 4 — Trình bày. */
export const PPT_SHOW: Lesson[] = [
  {
    id: 'ppt.transition',
    trackId: 'ppt',
    chapterId: 'ppt.show',
    title: 'Chuyển cảnh',
    minutes: 8,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body: '[[chuyen-canh|Chuyển cảnh]] là cách slide hiện ra khi trình chiếu: **Fade** mờ dần, **Push** đẩy slide cũ sang bên, **Zoom** phóng to. Dùng **một kiểu** cho cả bài là đẹp nhất — mỗi slide một kiểu trông rối mắt.',
      },
      {
        kind: 'explain',
        body: 'Thẻ **Transitions** › nhóm **Transition to This Slide**: bấm một kiểu, slide đang mở nhận kiểu đó và phát thử luôn. Nút **Preview** xem lại; nhóm **Timing** › **Apply To All** dùng kiểu đó cho **mọi slide**. Trên PowerPoint thật, Zoom nằm trong nút **▾** (More) cuối hàng.',
      },
      {
        kind: 'quiz',
        question: 'Bạn đã đặt Fade cho slide 1 và muốn cả 10 slide đều Fade. Cách nhanh nhất?',
        choices: ['Mở từng slide rồi bấm Fade 10 lần', 'Bấm Apply To All', 'Chọn theme khác'],
        answer: 1,
        why: 'Apply To All chép chuyển cảnh của slide đang mở sang mọi slide trong một lần bấm.',
      },
      pptPractice({
        slides: SLIDES,
        task: 'Slide 2 đang mở. Hãy đặt chuyển cảnh **Fade** (Mờ dần) cho slide 2.',
        checks: [{ kind: 'transition', slide: 2, transition: 'fade' }],
        spotlight: { helpId: 'ppt.transitions' },
        hint: 'Chuyển cảnh nằm ở thẻ Transitions, không phải thẻ Animations hay Design.',
        steps: ['Bấm thẻ Transitions ở trên cùng.', 'Nhóm Transition to This Slide › bấm Fade: slide phát thử hiệu ứng mờ dần, cột bên trái có ★ cạnh số 2.'],
        setup: (s0) => [...titled(s0), { type: 'gotoSlide', index: 1 }],
        solve: () => [{ type: 'setTransition', transition: 'fade' }],
      }),
      pptPractice({
        slides: SLIDES,
        task: 'Slide 2 đã có Fade. Hãy dùng **Apply To All** để **cả 3 slide** cùng Fade.',
        checks: [
          { kind: 'transition', slide: 1, transition: 'fade' },
          { kind: 'transition', slide: 2, transition: 'fade' },
          { kind: 'transition', slide: 3, transition: 'fade' },
        ],
        spotlight: { helpId: 'ppt.applyAll' },
        hint: 'Mở slide đã có Fade, rồi tìm nút Apply To All ở nhóm Timing.',
        steps: [
          'Slide 2 (đã có Fade) đang mở. Bấm thẻ Transitions.',
          'Nhóm Timing › bấm Apply To All: cả 3 hình nhỏ bên trái đều có ★.',
        ],
        setup: (s0) => [...titled(s0), { type: 'gotoSlide', index: 1 }, { type: 'setTransition', transition: 'fade' }],
        solve: () => [{ type: 'setTransition', transition: 'fade', all: true }],
      }),
      {
        kind: 'realShot',
        image: TRANSITIONS_SHOT,
        caption: 'Trên PowerPoint thật: thẻ Transitions',
        credit: CREDIT,
        marks: [
          { x: 23.8, y: 45.6, w: 8.2, h: 35, label: 'Fade: slide hiện ra mờ dần' },
          { x: 32, y: 45.6, w: 8.2, h: 35, label: 'Push: slide mới đẩy slide cũ sang bên' },
          { x: 56.7, y: 44.4, w: 2.4, h: 37.5, label: 'Nút ▾ (More): mở thêm hiệu ứng, Zoom nằm trong đây' },
          { x: 0.9, y: 42.5, w: 4.6, h: 43.1, label: 'Preview: xem thử hiệu ứng của slide đang mở' },
          { x: 66.8, y: 71.3, w: 9.3, h: 14.4, label: 'Apply To All: dùng hiệu ứng này cho mọi slide' },
        ],
      },
    ],
  },
  {
    id: 'ppt.present',
    trackId: 'ppt',
    chapterId: 'ppt.show',
    title: 'Trình chiếu',
    minutes: 7,
    steps: [
      {
        kind: 'explain',
        mood: 'happy',
        body: '[[trinh-chieu|Trình chiếu]] là lúc slide phủ **kín màn hình**, nền đen, đúng như khi chiếu lên máy chiếu cho cả phòng xem. Thẻ **Slide Show** › nhóm **Start Slide Show** › **From Beginning** (Từ đầu), hoặc nhấn **F5**.',
      },
      {
        kind: 'explain',
        body: 'Đang chiếu: **mũi tên →**, phím cách hoặc bấm chuột để sang slide sau; **mũi tên ←** để lùi. Hết slide sẽ có màn đen "Hết bài trình chiếu" — bấm thêm một lần là về. Muốn dừng giữa chừng thì nhấn **Esc**. **From Current Slide** (Shift + F5) chiếu từ slide đang mở.',
      },
      {
        kind: 'quiz',
        question: 'Đang trình chiếu, bạn muốn thoát ngay về màn soạn slide. Nhấn phím nào?',
        choices: ['Enter', 'Esc', 'Mũi tên →'],
        answer: 1,
        why: 'Esc thoát trình chiếu ở bất kỳ slide nào; Enter và → chỉ sang slide sau.',
      },
      pptPractice({
        slides: SLIDES,
        task: 'Hãy **trình chiếu từ đầu** bài 3 slide này, đi tới hết rồi thoát về màn soạn slide.',
        checks: [{ kind: 'presented' }],
        spotlight: { helpId: 'ppt.showStart' },
        hint: 'Bấm From Beginning ở thẻ Slide Show (hoặc nhấn F5), rồi nhấn → cho tới khi về lại màn soạn.',
        steps: [
          'Thẻ Slide Show › nhóm Start Slide Show › bấm From Beginning (hoặc nhấn F5): màn hình phủ đen, slide 1 hiện ra.',
          'Nhấn mũi tên → hai lần để xem slide 2 và slide 3.',
          'Nhấn → thêm lần nữa tới màn "Hết bài trình chiếu", rồi → một lần nữa để về (hoặc nhấn Esc).',
        ],
        setup: titled,
        solve: () => [
          { type: 'startShow', from: 'start' },
          { type: 'showNext' },
          { type: 'showNext' },
          { type: 'showNext' },
          { type: 'showNext' },
        ],
      }),
      {
        kind: 'realShot',
        image: SLIDESHOW_SHOT,
        caption: 'Trên PowerPoint thật: thẻ Slide Show › nhóm Start Slide Show',
        credit: CREDIT,
        marks: [
          { x: 0.9, y: 42.5, w: 5.9, h: 43.1, label: 'From Beginning, phím tắt F5: trình chiếu từ slide đầu' },
          { x: 6.8, y: 42.5, w: 7.3, h: 43.1, label: 'From Current Slide, phím tắt Shift + F5: trình chiếu từ slide đang mở' },
        ],
      },
    ],
  },
];
