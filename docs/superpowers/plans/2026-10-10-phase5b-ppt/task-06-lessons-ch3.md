# Task 6: Chương 3 "Cho đẹp mắt" — `ppt.layout`, `ppt.format`, `ppt.theme`

**Files:**
- Create: `client/src/content/lessons/ppt-design.ts` (export `PPT_DESIGN: Lesson[]`)
- Modify: `client/src/content/lessons/index.ts`, `client/src/content/tracks.ts`, `client/src/content/glossary.json`

## Interfaces

- Consumes: `pptPractice` (`lessonKit.ts`), check `slideLayout`, `placeholder`, `elFormat`, `theme` (Task 1);
  helpId `ppt.layout`, `ppt.size`, `ppt.color`, `ppt.align`, `ppt.themes`; ảnh `ppt-03-layout-menu.png`,
  `ppt-02-home.png` (có sẵn), `ppt-06-design.png` (Task 5, toạ độ khung trong dòng Task 5 của STATUS).
- Produces: chương `{ id: 'ppt.design', title: 'Cho đẹp mắt', lessonIds: ['ppt.layout', 'ppt.format', 'ppt.theme'] }`
  thêm sau `ppt.objects` trong `tracks.ts`. Glossary mới `theme` (term `Theme`, say `thim`, vi `Chủ đề trang trí`,
  lessonIds `['ppt.theme']`).

Mẫu lời và cấu trúc: đọc **một** bài trong `ppt-objects.ts` (explain → explain → quiz → practice → realShot), dùng
`const CREDIT = 'Ảnh chụp Microsoft PowerPoint'` và hằng ảnh ở đầu file. Mỗi bài 6–9 phút, 1 quiz, 1–2 thực hành.

## Nội dung ba bài

| Bài | Dạy | Thực hành (`setup` dựng sẵn → việc người học làm) | Checks |
|---|---|---|---|
| `ppt.layout` "Bố cục hai cột" | thẻ **Home** › nhóm **Slides** › **Layout** › Two Content; so sánh hai món | 2 slide, slide 2 Title and Content tiêu đề "Mèo và chó" → đổi slide 2 sang Two Content, gõ "Mèo" cột trái, "Chó" cột phải | `slideLayout {slide:2, layout:'twoContent'}`, `placeholder {slide:2, role:'body', textContains:'mèo'}`, `placeholder {slide:2, role:'body2', textContains:'chó'}` |
| `ppt.format` "Chữ to, màu, căn giữa" | thẻ **Home** › nhóm **Font** (Font Size, Font Color) và **Paragraph** (Center); chữ slide to hơn Word | slide Title Slide tiêu đề "Chào mừng" → cỡ 54, màu cam, căn giữa | `elFormat {slide:1, role:'title', fmt:{size:54, color:<mã cam trong bảng màu của RibbonHome>, align:'center'}}` |
| `ppt.theme` "Chọn theme" | thẻ **Design** › nhóm **Themes**; theme đổi cả bài; chữ đã tô màu riêng giữ màu → Font Color › Automatic | 3 slide có chữ → chọn theme **Biển** | `theme {theme:'bien'}` |

Ghi chú khi viết:
- `ppt.format`: mặc định tiêu đề Title Slide đã căn giữa? Kiểm `layout.ts`; nếu đã `center` thì đổi yêu cầu thành
  "căn trái" hoặc chọn hộp chữ khác — **bài không được đạt sẵn** (content.test bắt). Mã màu cam lấy đúng từ danh
  sách màu của Font Color, đừng tự đặt.
- `ppt.theme`: quiz hỏi "Đổi theme thì slide nào đổi màu?" (đáp án: tất cả). Explain nhắc Automatic (Review Focus 3).
- Mỗi bài kết bằng `realShot`: layout → `ppt-03-layout-menu.png` (khung Two Content `{15.4,32.4,10.6,21}` đã có ở
  `ppt-basics.ts`); format → `ppt-02-home.png` khung Font Size/Font Color/Center (đo bằng `mark.mjs` nếu chưa có);
  theme → `ppt-06-design.png`.
- `hints[1]` dùng helpId có thật; `steps` là lời giải từng bước nói đúng tên nút trên ribbon của app.

## Bước

- [ ] **1. Viết `ppt-design.ts`** với ba bài theo bảng; `solve` lấy id từ state (không hardcode `e3`).
- [ ] **2. Đăng ký** trong `lessons/index.ts` và chương trong `tracks.ts`; thêm glossary `theme`.
- [ ] **3. Chạy** `npm test -w client -- content` → xanh (solution đạt, không đạt sẵn, realShot đủ, `thẻ` không `tab`).
- [ ] **4. Học thật bằng chuột** cả ba bài trên dev server (memory `learn-lesson-as-learner`): làm đúng ý đề theo cách
  khác lời giải mẫu (ví dụ gõ "MÈO" hoa) vẫn đạt; gợi ý bậc 2 chiếu đúng nút; ảnh thật mở được, khung đúng chỗ.
- [ ] **5. `npm test && npm run typecheck`**, commit `feat(ppt): chương 3 Cho đẹp mắt (3 bài)` + dòng STATUS.
