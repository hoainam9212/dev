# Task 3: Thẻ Transitions, nút Preview, dấu ★ trên thumbnail (client)

**Files:**
- Create: `client/src/sims/ppt/RibbonTransitions.tsx`, `RibbonTransitions.test.tsx`, `client/src/sims/ppt/transitions.ts`
- Modify: `Ribbon.tsx`, `Canvas.tsx`, `SlideList.tsx`, `SlideList.test.tsx`, `client/src/styles/theme.css`,
  `client/src/styles/theme.test.ts`, `client/src/content/help-ids.ts`

## Interfaces

- Consumes (Task 1): action `setTransition {transition, all?}`, `Slide.transition`.
- Produces:
  - `transitions.ts`: `export const TRANSITION_CLASS: Record<Exclude<Transition,'none'>, string>` =
    `{ fade: 'ppt-tr-fade', push: 'ppt-tr-push', zoom: 'ppt-tr-zoom' }` và
    `export const TRANSITIONS: { id: Transition; label: string; vi: string }[]` = None/Fade/Push/Zoom
    (label tiếng Anh, vi: "Không có", "Mờ dần", "Đẩy sang", "Phóng to"). Task 4 dùng lại cả hai.
  - CSS (cấp đầu `@layer components`): `.ppt-tr-fade` (opacity 0→1), `.ppt-tr-push` (translateX 100%→0),
    `.ppt-tr-zoom` (scale .3→1), đều `300ms ease-out`. Trong khối reduce-motion có sẵn và trong
    `@media (prefers-reduced-motion: reduce)`: `animation: none`.
  - `Canvas` nhận prop tuỳ chọn `preview?: number` — mỗi lần số này tăng, lớp vẽ slide được gắn `key` mới và lớp
    `TRANSITION_CLASS[slide.transition]` nên hiệu ứng chạy lại. Không có chuyển cảnh thì không gắn lớp.
  - `RibbonTransitions({ state, dispatch, onPreview })`, ba nhóm theo PowerPoint thật:
    - **Preview**: nút lớn `Preview` (helpId `ppt.preview`) gọi `onPreview()`.
    - **Transition to This Slide**: 4 nút theo `TRANSITIONS`, `aria-pressed` theo slide đang mở (`undefined` = None),
      helpId `ppt.transitions`; bấm phát `setTransition {transition}`.
    - **Timing**: nút `Apply To All` (helpId `ppt.applyAll`) phát `setTransition {transition: <của slide đang mở>, all: true}`;
      khoá (`disabled`) khi slide đang mở chưa có chuyển cảnh.
  - `PptSim` giữ `const [preview, setPreview] = useState(0)`; chọn một chuyển cảnh cũng tự `setPreview(n+1)` (PowerPoint
    thật phát thử ngay khi chọn).
  - Thumbnail của slide có chuyển cảnh hiện `★` nhỏ dưới số thứ tự, `aria-label="Có hiệu ứng chuyển cảnh"`.
  - `HELP_IDS`: `ppt.transitions` "Transition to This Slide (Chuyển cảnh)" — "Chọn cách slide này hiện ra khi trình chiếu."
    `ppt.applyAll` "Apply To All (Áp dụng cho tất cả)" — "Dùng chuyển cảnh của slide này cho mọi slide."
    `ppt.preview` "Preview (Xem thử)" — "Phát thử hiệu ứng chuyển cảnh của slide đang mở."

## Bước

- [ ] **1. Test (FAIL)**:
  - Thẻ Transitions có 3 nhóm tên `Preview`, `Transition to This Slide`, `Timing`.
  - Slide chưa có chuyển cảnh: nút None `aria-pressed="true"`, Apply To All `disabled`.
  - Bấm Fade phát `setTransition {transition:'fade'}` (không có `all`).
  - Slide có `push`: Apply To All phát `setTransition {transition:'push', all:true}`.
  - Bấm Preview gọi `onPreview` đúng một lần.
  - SlideList: slide có `transition` hiện nhãn "Có hiệu ứng chuyển cảnh"; slide không có thì không.
  - Canvas với `preview` tăng và slide `fade`: phần tử vẽ slide mang lớp `ppt-tr-fade`.
  - `theme.test.ts`: ba lớp `ppt-tr-*` nằm ở cấp đầu layer components.
- [ ] **2. Chạy, xác nhận FAIL** — `npm test -w client -- ppt theme`.
- [ ] **3. Viết `transitions.ts`, CSS, `RibbonTransitions`**; thay `SoonTab` Transitions trong `Ribbon.tsx` (Ribbon nhận
  thêm `onPreview` từ `PptSim`).
- [ ] **4. Canvas + SlideList** theo Interfaces.
- [ ] **5. Chạy xanh** — `npm test && npm run typecheck`.
- [ ] **6. Kiểm trên trình duyệt** (Chrome headless qua puppeteer-core nếu cần xem animation chạy — pane trong app
  đóng băng animation, xem memory `verify-in-real-chrome`):
  - Chọn Fade/Push/Zoom: hiệu ứng chạy một lần ~300 ms; Preview chạy lại.
  - Push không làm trang cuộn ngang (`document.documentElement.scrollWidth === innerWidth` trong lúc chạy).
  - Cài đặt bật "Giảm chuyển động": không còn hiệu ứng.
  - Apply To All: mọi thumbnail có ★. Undo bỏ ★ khỏi mọi slide.
- [ ] **7. Commit** `feat(ppt): thẻ Transitions với Fade/Push/Zoom, Preview, Apply To All` + dòng STATUS.
