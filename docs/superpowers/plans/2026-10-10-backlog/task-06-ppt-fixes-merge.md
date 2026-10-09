# Task 6: Hai lỗi nhỏ PowerPoint, kết thúc dự án

## 1. Nút "Kiểm tra" đè mép dưới khung slide ở màn hẹp (ghi từ 5A)

Tái hiện ở 390×844 trong một bài PowerPoint: đo `getBoundingClientRect()` của nút Kiểm tra và của `.ppt-stage`; đè
nhau là lỗi. Sửa ở `PracticeView` hoặc bố cục `PptSim` (khoảng cách dưới / nút nằm dưới khung, không `position`
đè lên). Test: khó trong jsdom — viết test bố cục bằng lớp CSS (nút không nằm trong phần tử `position: absolute` phủ
khung) và **kiểm thật bằng ảnh chụp** ở 390 và 768.

## 2. Hình chữ nhật mới chèn là hình vuông 160×160 (ghi từ 5A)

`RibbonInsert.tsx` chèn mọi hình cùng `w = h = 160`. PowerPoint thật vẽ theo kéo chuột; ở đây chọn cỡ mặc định theo
loại: `rect` 240×128, `ellipse` 160×160, `arrow` 200×96, `star` 160×160 (bội số 8). Test: chèn Rectangle → `w > h`.
Bài `ppt.shape` và dự án vẫn đạt (`content.test`).

## 3. Kết thúc

- [ ] **1. Test (FAIL)** cho mục 2 và phần test bố cục được của mục 1; sửa; `npm test && npm run typecheck && npm run build`.
- [ ] **2. Ảnh chụp** 390 / 768 / 1280 cho mục 1.
- [ ] **3. Đi một vòng ngắn** bản build (cổng 4174): mỗi lộ trình mở một bài, ngắt mạng vẫn chạy.
- [ ] **4. Gộp** `git checkout master && git merge --ff-only feat/backlog && git branch -d feat/backlog`.
- [ ] **5. Dọn tài liệu**: `CLAUDE.md` dòng nhánh → "Không có nhánh làm dở; mọi plan trong ROADMAP đã xong";
  `ROADMAP.md` ☑ dòng 4; memory `office-neko-project` (dự án hoàn tất theo spec, việc còn lại nếu có); xoá khỏi memory
  danh sách "carryover" đã trả xong. Commit `docs: dọn tồn đọng xong, dự án hoàn tất theo spec`.
- [ ] **6. Báo người dùng**: tóm tắt ngắn toàn dự án đã xong, số test, master đi trước GitHub bao nhiêu commit, hỏi có
  muốn push và có muốn review cả nhánh/cả dự án không.
