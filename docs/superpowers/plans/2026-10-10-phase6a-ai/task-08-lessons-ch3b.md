# Task 8: Chương 3 phần 2 — `ai.formula` (ghép Excel), `ai.outline` (ghép PowerPoint)

**Files:**
- Modify: `client/src/content/lessons/ai-work.ts`, `tracks.ts` (thêm hai `lessonIds` còn lại của chương `ai.work`)

## Interfaces

- Consumes: `aiPractice`, `excelPractice` (`lessonKit.ts`, xem chữ ký trong file), `pptPractice`; check Excel đọc giá trị
  công thức (xem `shared/src/sims/excel/grade.ts`, dùng loại check đã có cho "ô X có công thức cho ra Y" — đừng thêm
  loại mới nếu đã có); check PowerPoint `slideCount`, `slideTitle`.

## Nội dung

**`ai.formula` "Nhờ AI viết công thức Excel"** — mô tả bảng (cột nào chứa gì, hàng nào), nói kết quả mong muốn; AI gợi ý
công thức; **chép vào Excel thử** — kết quả lạ thì hỏi lại. Ba bước thực hành trong cùng bài:
1. chat: "Bảng có cột B là **Doanh số** từ B2 đến B8. Nhờ AI viết công thức tính **tổng doanh số**; nói rõ cột và hàng."
   → `promptCriteria {required:['task','context']}`. `replies.good`: "Bạn gõ vào ô B9: `=SUM(B2:B8)`"; `weak`: công thức
   sai vùng `=SUM(B2:B7)` kèm lời "có thể cần chỉnh vùng".
2. excel: bảng 7 hàng doanh số dựng sẵn; đề "Gõ vào **B9** công thức AI gợi ý: `=SUM(B2:B8)`" → check giá trị B9 đúng
   tổng và ô có công thức (không gõ tay con số).
3. quiz: "AI gợi ý `=SUM(B2:B7)` cho bảng tới hàng 8. Bạn làm gì?" (đáp án: sửa thành B8 vì thiếu một hàng).

**`ai.outline` "Nhờ AI lên dàn ý slide"** — xin dàn ý (số slide, tiêu đề mỗi slide) rồi **tự** dựng slide.
1. chat: "Nhờ AI lên **dàn ý 3 slide** giới thiệu sản phẩm bánh mochi của cửa hàng." → `promptCriteria
   {required:['task','format']}`. `replies.good` liệt kê 3 tiêu đề: "Bánh mochi là gì", "Các vị bánh", "Đặt hàng".
2. ppt: 1 slide trống Title Slide; đề "Dựng 3 slide theo dàn ý AI vừa đưa: tiêu đề slide 1 «Bánh mochi là gì», slide 2
   «Các vị bánh», slide 3 «Đặt hàng»." → `slideCount 3` + ba `slideTitle` (so không phân biệt hoa thường).

Bước excel/ppt nhận `realShot`? **Không** — bài thuộc track `ai`, `content.test` chỉ đòi realShot cho track Office.

## Bước

- [ ] **1. Viết hai bài**, thêm `lessonIds` vào chương `ai.work`.
- [ ] **2. `npm test -w client -- content`** xanh (lời giải bước Excel đi qua `reduceExcel`, bước PPT qua `reducePpt`).
- [ ] **3. Học thật** cả hai bài: chuyển từ bước chat sang bước Excel/PPT trong cùng bài mượt (không sót state cũ);
  gõ số tay `2450` vào B9 thay công thức → trượt với lời dễ hiểu.
- [ ] **4. `npm test && npm run typecheck`**, commit `feat(ai): bài công thức Excel và dàn ý slide` + dòng STATUS.
