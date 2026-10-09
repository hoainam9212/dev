# Task 7: Chương 4 "Trình bày" — `ppt.transition`, `ppt.present`

**Files:**
- Create: `client/src/content/lessons/ppt-show.ts` (export `PPT_SHOW: Lesson[]`)
- Modify: `lessons/index.ts`, `tracks.ts`, `glossary.json`

## Interfaces

- Consumes: check `transition`, `presented`, `activeSlide` (Task 1); helpId `ppt.transitions`, `ppt.applyAll`,
  `ppt.preview`, `ppt.showStart`, `ppt.showCurrent` (Task 3–4); ảnh `ppt-07-transitions.png`, `ppt-08-slideshow.png`
  (toạ độ trong dòng Task 5 của STATUS).
- Produces: chương `{ id: 'ppt.show', title: 'Trình bày', lessonIds: ['ppt.transition', 'ppt.present'] }` sau
  `ppt.design`. Glossary mới: `chuyen-canh` (term `Transition`, say `tren-di-sần`, vi `Chuyển cảnh`,
  lessonIds `['ppt.transition']`), `trinh-chieu` (term `Slide Show`, say `slai-sâu`, vi `Trình chiếu`,
  lessonIds `['ppt.present']`). Nếu glossary đã có `ty-le-16-9` (thêm ở 5A) thì không thêm lại.

## Nội dung

| Bài | Dạy | Thực hành | Checks |
|---|---|---|---|
| `ppt.transition` "Chuyển cảnh" | thẻ **Transitions** › nhóm **Transition to This Slide**; Preview; ít hiệu ứng mới chuyên nghiệp | (a) 3 slide, mở slide 2 → đặt **Fade** cho slide 2; (b) bước sau: dùng **Apply To All** cho cả bài | (a) `transition {slide:2, transition:'fade'}`; (b) `transition` cho slide 1, 2, 3 cùng `'fade'` |
| `ppt.present` "Trình chiếu" | thẻ **Slide Show** › **From Beginning** (F5), → sang slide, ← lùi, Esc thoát; Shift+F5 từ slide đang mở | 3 slide có tiêu đề → trình chiếu từ đầu tới hết rồi thoát | `presented` |

Ghi chú khi viết:
- Bước (b) của `ppt.transition`: `setup` dựng sẵn slide 2 đã `fade` để bước này không đạt sẵn ở slide 1/3.
- Nếu STATUS Task 5 ghi "Zoom nằm trong More ▾", lời bài nói rõ; đừng tả nút không có trên ảnh thật.
- `ppt.present`: explain nói trước rằng màn hình sẽ phủ đen toàn bộ và **Esc** để quay lại; quiz hỏi phím thoát.
  Lời giải: `[{type:'startShow', from:'start'}, showNext ×(n-1), showNext (màn Hết bài), showNext]` — kết thúc ở
  `show === null`.
- `realShot` cuối mỗi bài: Transitions (khung Fade, Apply To All, Preview); Slide Show (From Beginning,
  From Current Slide).

## Bước

- [ ] **1. Viết `ppt-show.ts`**, đăng ký bài + chương + glossary.
- [ ] **2. `npm test -w client -- content`** → xanh.
- [ ] **3. Học thật bằng chuột + phím** trên dev server: `ppt.present` chạy bằng F5 thật (không tải lại trang),
  → tới hết, Esc; nút "Kiểm tra" báo đạt sau khi thoát. Thử thoát giữa chừng → chưa đạt, lời nhắn dễ hiểu.
- [ ] **4. `npm test && npm run typecheck`**, commit `feat(ppt): chương 4 Trình bày (2 bài)` + dòng STATUS.
