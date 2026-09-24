# Task 9: Chương 1 "Slide đầu tiên" — 3 bài

**Files:**
- Create: `client/src/content/lessons/ppt-basics.ts`
- Modify: `client/src/content/lessonKit.ts` (thêm `pptPractice`), `lessons/index.ts`, `tracks.ts`, `glossary.json`
- Modify: `client/src/content/lessonKit.test.ts`

**Interfaces:**
- Consumes (Task 1–8): `pptSim.pptInitial`, `reducePpt`, `PptState`, `PptAction`, `PptCheck`; sim `ppt` đã đăng ký trong `SIMS` và `GRADERS`.
- Produces: `pptPractice(o)` trong `lessonKit.ts`; ba bài `ppt.intro`, `ppt.title`, `ppt.slides`; chương `ppt.start` trong `TRACKS`.

Đọc spec mục 7 (chương 1) và `client/src/content/lessons/excel-basics.ts` để lấy giọng
văn. Đọc `content.test.ts` để biết những gì nó bắt buộc.

- [ ] **Bước 1: Thêm `pptPractice` vào `lessonKit.ts`**

Đặt ngay sau `excelPractice`, cùng kiểu chữ ký:

```ts
/**
 * Bước thực hành trên PowerPoint. `slides` dựng sẵn các bố cục đầu bài; `setup`
 * thêm nội dung có sẵn (không tính vào lịch sử hoàn tác); `solve` là lời giải mẫu.
 */
export function pptPractice(o: {
  slides?: pptSim.Layout[];
  task: string;
  checks: pptSim.PptCheck[];
  spotlight: Spotlight;
  hint: string;
  steps: string[];
  setup?: (s0: pptSim.PptState) => pptSim.PptAction[];
  solve: (s0: pptSim.PptState) => pptSim.PptAction[];
}): PracticeStep<pptSim.PptState, pptSim.PptCheck, pptSim.PptAction> {
  const fresh = pptSim.pptInitial({ slides: o.slides });
  const prepared = (o.setup ? o.setup(fresh) : []).reduce(pptSim.reducePpt, fresh);
  const initial: pptSim.PptState = { ...prepared, past: [], sel: null, editing: null, editBackup: null };
  return {
    kind: 'practice', sim: 'ppt', task: o.task, initial, checks: o.checks,
    hints: [o.hint, o.spotlight, o.steps], solution: o.solve(initial),
  };
}
```

Thêm một test vào `lessonKit.test.ts`: `pptPractice` với `setup` phải cho `initial.past`
rỗng (nếu không, bài học mở ra đã có sẵn lịch sử hoàn tác — người học bấm Undo là
mất luôn đề bài).

- [ ] **Bước 2: Viết ba bài (FAIL ở `content.test.ts`)**

`client/src/content/lessons/ppt-basics.ts`. Cấu trúc mỗi bài giống `excel-basics.ts`:
vài bước `explain` có `mood`, một `quiz`, một hoặc hai `practice`.

**Bài `ppt.intro` — "Slide là gì"** (`minutes: 6`)
- explain: slide là một trang chiếu; cột bên trái là danh sách slide, khung lớn ở giữa
  là slide đang mở; khung luôn tỉ lệ [[ty-le-16-9|16:9]] như màn hình máy chiếu.
- quiz: "Cột hẹp bên trái màn hình PowerPoint để làm gì?" → 3 lựa chọn, đáp án "Xem
  và chọn nhanh từng [[slide]]".
- practice: đề "Bấm vào Slide 2 ở cột bên trái để mở nó ra."
  - `slides: ['title', 'titleContent']`
  - checks: `[{ kind: 'slideCount', count: 2 }]` — bài này chỉ tập bấm, nên check chỉ
    xác nhận đề bài còn nguyên. **Đừng** thêm check về `active`: `active` không phải
    là kết quả bài làm, và grader 5A cố ý không có loại check ấy.
  - `spotlight: { helpId: 'ppt.canvas' }`
  - `solve: () => [{ type: 'gotoSlide', index: 1 }]`

**Bài `ppt.title` — "Gõ tiêu đề"** (`minutes: 8`)
- explain: [[cho-danh-san]] là khung mờ sẵn có trên slide; nháy đúp vào đó rồi gõ.
- practice 1: đề "Nháy đúp vào khung tiêu đề rồi gõ tên của bạn."
  - checks: `[{ kind: 'slideTitle', slide: 1, notEmpty: true }]` — **đề mở thì check
    phải mở**; người học gõ tên thật của mình, không có đáp án duy nhất.
  - `solve: (s0) => [{ type: 'startEditEl', id: s0.slides[0]!.els[0]!.id }, { type: 'setText', text: 'Nguyễn Văn An' }, { type: 'commitEdit' }]`
- practice 2: đề "Gõ đúng dòng chữ «Giới thiệu bản thân» vào tiêu đề."
  - checks: `[{ kind: 'slideTitle', slide: 1, text: 'Giới thiệu bản thân' }]`

**Bài `ppt.slides` — "Thêm, xoá, đổi thứ tự slide"** (`minutes: 10`)
- explain: New Slide thêm slide **ngay sau** slide đang mở; kéo thumbnail để đổi thứ tự.
- quiz: "Bạn đang ở slide 2 và bấm New Slide. Slide mới nằm ở đâu?" → đáp án "Ngay
  sau slide 2, thành slide 3".
- practice: đề "Bài này đang có 1 slide. Hãy thêm 2 slide nữa, slide thứ 3 dùng bố cục
  Hai cột nội dung."
  - checks: `[{ kind: 'slideCount', count: 3 }, { kind: 'slideLayout', slide: 3, layout: 'twoContent' }]`
  - `spotlight: { helpId: 'ppt.newSlide' }`
  - `solve: () => [{ type: 'addSlide' }, { type: 'addSlide', layout: 'twoContent' }]`
  - steps: ba câu, mỗi câu một thao tác, nhắc đúng tên nút tiếng Anh kèm nghĩa.

- [ ] **Bước 3: Nối vào danh mục**

- `lessons/index.ts`: thêm `...pptBasics`.
- `tracks.ts`: track `ppt`, thay `chapters: []` bằng
  `[{ id: 'ppt.start', title: 'Slide đầu tiên', lessonIds: ['ppt.intro', 'ppt.title', 'ppt.slides'] }]`.
- `glossary.json`: thêm `slide`, `cho-danh-san`, `bo-cuc`, `ty-le-16-9`, mỗi mục có
  `lessonIds` trỏ tới bài **vừa tạo** (test bắt điều này — mục nào chưa có bài thì
  đừng thêm vội, để Task 10).

- [ ] **Bước 4: Chạy, xác nhận PASS**

Run: `npm test -w client -- content`
Expected: PASS. `content.test.ts` phát lại `solution` của cả ba bài qua `reducePpt`
rồi chấm bằng `gradePpt` — nếu đỏ, **sửa bài hoặc sửa lời giải, tuyệt đối không sửa
`content.test.ts`**.

- [ ] **Bước 5: Học thật trên trình duyệt — bắt buộc**

Mở app (không phải `/dev/ppt`), vào track PowerPoint, **học hết cả ba bài như một
người mới**: đọc đề, làm bằng chuột, bấm Kiểm tra tới lúc đạt. Ghi lại chỗ nào đề bài
mơ hồ và sửa lời bài ngay.

Đặc biệt kiểm: gợi ý bậc 2 (`spotlight`) có **trỏ đúng** vào nút New Slide / khung
slide không, hay lơ lửng ở góc màn hình?

- [ ] **Bước 6: Commit**

```bash
git add client/src docs/superpowers
git commit -m "feat(ppt): chương 1 — ba bài slide đầu tiên" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

Cập nhật dòng Task 9 của `STATUS.md`: số bài, và mục từ điển nào còn nợ `lessonIds`.
