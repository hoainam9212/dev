# Task 4: Thẻ Slide Show + lớp trình chiếu toàn màn hình (client)

**Files:**
- Create: `client/src/sims/ppt/SlideShow.tsx`, `SlideShow.test.tsx`, `RibbonSlideShow.tsx`, `RibbonSlideShow.test.tsx`
- Modify: `Ribbon.tsx`, `PptSim.tsx`, `PptSim.test.tsx`, `client/src/styles/theme.css`, `theme.test.ts`,
  `client/src/content/help-ids.ts`

## Interfaces

- Consumes: Task 1 (`startShow`, `showNext`, `showPrev`, `endShow`, `state.show`), Task 2 (`themeOf`, `ElementView theme`),
  Task 3 (`TRANSITION_CLASS`).
- Produces:
  - `RibbonSlideShow({ dispatch })`: nhóm **Start Slide Show** với `From Beginning` (helpId `ppt.showStart`,
    label "Trình chiếu từ đầu (F5)") và `From Current Slide` (helpId `ppt.showCurrent`, label "Trình chiếu từ slide
    này (Shift + F5)").
  - `SlideShow({ state, dispatch })`: chỉ vẽ khi `state.show !== null`. Gắn vào `document.body` bằng `createPortal`,
    `position: fixed; inset: 0; z-index` cao hơn mọi thứ trong app, nền đen, `role="dialog"`, `aria-modal="true"`,
    `aria-label="Đang trình chiếu, slide X trên Y"`. Slide 16:9 căn giữa, rộng `min(100vw, 100vh * 16 / 9)`, co giãn
    bằng đúng kỹ thuật `container-type` + `scale(calc(100cqw / 960px))` của `.ppt-stage`. Đối tượng vẽ bằng
    `ElementView` (không tay nắm, không chữ mờ). Slide có chuyển cảnh gắn `TRANSITION_CLASS` với `key` = `at`.
  - Màn Hết bài (`at === slides.length`): nền đen, chữ "Hết bài trình chiếu. Bấm chuột hoặc nhấn phím bất kỳ để thoát."
  - Phím (bắt ở `window`, `preventDefault` + `stopPropagation` để RealShot/HintPanel không nhận):
    `→ ↓ Space Enter PageDown N` = `showNext`; `← ↑ Backspace PageUp P` = `showPrev`; `Escape` = `endShow`.
    Bấm chuột trái = `showNext`; chuột phải không làm gì (chặn menu).
  - Toàn màn hình: khi `show` chuyển từ `null` sang có giá trị, gọi `document.documentElement.requestFullscreen?.()`
    trong `try/catch` (bị từ chối thì vẫn chạy được trong lớp phủ). Nghe `fullscreenchange`: rời fullscreen mà
    `show` vẫn khác `null` → `endShow`. Khi `show` về `null` mà còn fullscreen → `document.exitFullscreen()`.
  - `PptSim`: nghe `keydown` ở `window` khi sim đang gắn: `F5` → `startShow from:'start'`, `Shift+F5` →
    `startShow from:'current'`, cả hai `preventDefault()` (không cho trình duyệt tải lại trang).
  - `HELP_IDS`: `ppt.showStart`, `ppt.showCurrent` như trên, vi giải thích: "Esc để thoát, mũi tên → để sang slide sau."

## Bước

- [ ] **1. Test (FAIL)**:
  - Thẻ Slide Show: bấm From Beginning phát `startShow {from:'start'}`; From Current Slide phát `from:'current'`.
  - `SlideShow` với `show: null` không vẽ gì.
  - Đang chiếu slide 1/3: có dialog nhãn "slide 1 trên 3"; phím `ArrowRight` phát `showNext`, `ArrowLeft` `showPrev`,
    `Escape` `endShow`, `Space` `showNext`; bấm chuột phát `showNext`.
  - Phím đã xử lý thì `defaultPrevented === true`.
  - `at === slides.length`: hiện chữ "Hết bài trình chiếu"; nhấn phím bất kỳ phát `showNext` (reducer tự kết thúc).
  - Phát sự kiện `fullscreenchange` khi `document.fullscreenElement === null` mà `show` khác null → phát `endShow`.
  - `PptSim`: `keydown F5` → overlay hiện ra và `defaultPrevented`; `Shift+F5` ở slide 2 → "slide 2 trên N".
  - Slide có `transition: 'zoom'` → phần tử slide trong overlay mang lớp `ppt-tr-zoom`.
- [ ] **2. Chạy, xác nhận FAIL.** jsdom không có `requestFullscreen`: code phải dùng `?.` nên test không văng.
- [ ] **3. Viết `RibbonSlideShow`, `SlideShow`, nối `PptSim`** (SlideShow cạnh `PptDialogs`). CSS `.ppt-show`,
  `.ppt-show-frame` ở cấp đầu layer; thêm tên vào `theme.test.ts`.
- [ ] **4. Chạy xanh** — `npm test && npm run typecheck`.
- [ ] **5. Kiểm trên trình duyệt thật** (Chrome headless + puppeteer-core cho fullscreen và phím):
  - F5 trong bài PowerPoint: không tải lại trang, overlay phủ kín, slide căn giữa đúng 16:9 ở 1280×720, 1920×1080, 390×844.
  - Đi hết slide bằng →, tới màn Hết bài, nhấn phím → về soạn thảo ở slide cuối.
  - Esc ở giữa → về soạn thảo đúng slide đang chiếu. Esc khi đang fullscreen thật → cũng thoát hẳn (không kẹt
    overlay không fullscreen).
  - Chữ trên slide chiếu cùng cỡ tỉ lệ với khung soạn (so ảnh chụp).
  - Mở RealShot zoom rồi Esc vẫn chạy như cũ (không bị SlideShow nuốt phím khi không chiếu).
- [ ] **6. Commit** `feat(ppt): trình chiếu toàn màn hình, F5/Shift+F5, Esc` + dòng STATUS.
