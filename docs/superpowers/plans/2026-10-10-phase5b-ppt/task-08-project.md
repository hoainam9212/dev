# Task 8: Dự án `ppt.project` — "Slide giới thiệu bản thân" (3 chặng)

**Files:**
- Create: `client/src/content/lessons/ppt-project.ts` (export `PPT_PROJECT: Lesson[]`)
- Modify: `lessons/index.ts`, `tracks.ts`

## Interfaces

- Consumes: mọi check PowerPoint (5A + Task 1). Mẫu dự án nhiều chặng: `client/src/content/lessons/excel-project.ts`
  (hằng dựng lại kết quả chặng trước làm `setup` cho chặng sau, để người học không phải làm lại từ đầu).
- Produces: chương `{ id: 'ppt.final', title: 'Dự án: Giới thiệu bản thân', lessonIds: ['ppt.project'] }`.
  PowerPoint đủ **12 bài / 5 chương** như spec §7.

## Ba chặng

| Chặng | Người học làm | Checks (đề mở → check mở) |
|---|---|---|
| 1. Ba slide | slide 1 Title Slide gõ **tên mình**; thêm slide 2 "Sở thích" (Title and Content) có nội dung; slide 3 "Mục tiêu" Two Content có chữ ở cả hai cột | `slideCount 3`; `slideTitle {1, notEmpty}`; `slideTitle {2, text:'Sở thích'}`; `placeholder {2, body, notEmpty}`; `slideLayout {3, twoContent}`; `placeholder {3, body, notEmpty}`; `placeholder {3, body2, notEmpty}` |
| 2. Hình và ảnh | slide 2 chèn một **ảnh**; slide 3 chèn một **hình khối** bất kỳ | `hasElement {2, image}`; `hasElement {3, shape}` |
| 3. Trang trí và trình bày | chọn **theme bất kỳ khác Mochi**; chuyển cảnh **bất kỳ** cho mọi slide; trình chiếu từ đầu tới hết | `notTheme {theme:'mochi'}`; `transition {slide:1..3, transition:'any'}`; `presented` |

Chặng 3 là đề mở (người học chọn theme/chuyển cảnh nào cũng được), nên dùng `notTheme` và `transition: 'any'` —
cả hai đã có từ Task 1.

Mỗi chặng là một `pptPractice` riêng; `setup` của chặng 2 dựng lại kết quả mẫu chặng 1 (tên "Mochi"), chặng 3 dựng
kết quả chặng 2. Explain mở đầu nói rõ 3 chặng, như `excel-project.ts`. Kết bài: `realShot` `ppt-08-slideshow.png`
(nhắc "trên PowerPoint thật, F5 là trình chiếu"). Explain cuối chúc mừng là bước cuối cùng (sau realShot).

## Bước

- [ ] **1. Viết `ppt-project.ts`**, đăng ký bài + chương.
- [ ] **2. `npm test -w client -- content`** → xanh; mỗi chặng không đạt sẵn.
- [ ] **3. Học thật cả dự án bằng chuột**, với **tên của mình khác "Mochi"**, theme Hoa, chuyển cảnh Push, rồi F5 tới
  hết → 3 sao. Chụp ảnh màn kết quả.
- [ ] **4. `npm test && npm run typecheck`**, commit `feat(ppt): dự án Slide giới thiệu bản thân` + dòng STATUS.
