# Task 13: Chương 5 và dự án "Đơn xin việc" (4 bài)

Đọc `00-overview.md` trước. Quy tắc soạn bài: mục "Quy tắc soạn bài" trong `task-11-lessons-1-2.md`.

**Files:**
- Create: `client/src/content/lessons/word-long.ts`, `client/src/content/lessons/word-project.ts`
- Modify: `client/src/content/lessons/index.ts`, `client/src/content/tracks.ts`

**Interfaces:**
- Consumes: `wordPractice` (Task 11); các check `headingLevel`, `hasToc`, `textContains`, `saved`, `printed` (Task 7).
- Produces: `WORD_LONG: Lesson[]` (3 bài), `WORD_PROJECT: Lesson[]` (1 bài); hai chương cuối của track `word`.

## Chương 5 — `word.long` "Văn bản dài"

| id | title | phút | Nội dung |
|---|---|---|---|
| `word.heading` | Heading 1, 2, 3 | 7 | explain ([[heading]] là "biển chỉ đường" của văn bản; đừng chỉ tô đậm cho to) + quiz ("Vì sao nên dùng Heading thay vì in đậm?") + practice: tài liệu có 3 dòng tiêu đề mục; đặt `Giới thiệu` và `Kinh nghiệm` thành Heading 1, `Kỹ năng mềm` thành Heading 2. Check 3 × `headingLevel`. |
| `word.toc` | Mục lục tự động | 6 | explain (mục lục sinh ra từ Heading, sửa tiêu đề thì bấm Cập nhật) + practice: tài liệu đã có sẵn 3 Heading; chèn mục lục. Check `hasToc` + `textContains: 'Mục lục'`. |
| `word.find` | Tìm và thay thế | 6 | explain (sửa hàng loạt nhanh hơn sửa tay; cẩn thận thay nhầm) + quiz + practice: thay mọi `công ty ABC` thành `công ty Mochi`. Check `textContains: 'công ty Mochi'` + `textNotContains: 'ABC'`. |

## Chương 6 — `word.final` "Dự án: Đơn xin việc"

| id | title | phút | Nội dung |
|---|---|---|---|
| `word.project` | Dự án: viết Đơn xin việc | 15 | 1 explain giới thiệu dự án + **3 practice nối tiếp nhau**, mỗi practice một chặng. Đây là bài dài nhất lộ trình Word. |

Ba chặng của dự án (mỗi chặng là một `PracticeStep` riêng, `text`/`doc` của chặng sau dựng sẵn kết quả chặng trước để học viên không phải làm lại):

1. **Chặng 1 — nội dung:** trang rỗng; gõ 4 dòng: `ĐƠN XIN VIỆC`, `Hà Nội, ngày 20 tháng 9 năm 2026`, `Kính gửi Quý công ty Mochi`, `Tôi tên là ... , tôi xin ứng tuyển vị trí nhân viên văn phòng.`
   Check: 4 × `textContains`.
2. **Chặng 2 — định dạng:** doc đã có 4 dòng; căn giữa + in đậm + cỡ 16pt cho tiêu đề, căn phải dòng ngày tháng, Times New Roman cho toàn bài.
   Check: `paragraphAlign` (2 dòng), `markOnText` bold + fontSize cho tiêu đề, `markOnText` fontFamily.
3. **Chặng 3 — hoàn thiện và lưu:** doc đã định dạng; thêm danh sách chấm 3 kỹ năng, chèn ảnh Mochi, lưu với tên `don-xin-viec.docx`.
   Check: `listType`, `imageCount: 1`, `saved` với `name: 'don-xin-viec.docx'`.

XP thưởng dự án do `progress` xử lý sẵn, không cần làm gì thêm ở đây.

- [ ] **Step 1: Viết 4 bài**

Theo hai bảng trên. Chặng dự án dựng `doc` bằng cách chạy các action chuẩn bị trong `setup` của `wordPractice` — dễ đọc hơn viết doc JSON bằng tay.

- [ ] **Step 2: Đăng ký bài + chương**

`lessons/index.ts`: gộp `WORD_LONG`, `WORD_PROJECT`.
`tracks.ts`: thêm nốt vào `chapters` của track `word`:
```ts
      { id: 'word.long', title: 'Văn bản dài', lessonIds: ['word.heading', 'word.toc', 'word.find'] },
      { id: 'word.final', title: 'Dự án: Đơn xin việc', lessonIds: ['word.project'] },
```
Track `word` giờ có 6 chương, 15 bài — khớp con số "~15 bài" của spec mục 4.

- [ ] **Step 3: Chạy test, xác nhận PASS**

Run: `npm test && npm run typecheck`
Expected: PASS. Bài dự án có 3 practice nên `content.test.ts` sẽ phát lại cả ba lời giải.

- [ ] **Step 4: Kiểm tra trên trình duyệt (BẮT BUỘC)**

1. Học `word.heading` rồi `word.toc`: mục lục hiện ở đầu trang, đúng 3 dòng.
2. Học `word.find`: thay hàng loạt chạy đúng, "Hoàn tác" một lần là về như cũ.
3. **Làm trọn bài `word.project` từ đầu tới cuối bằng tay** (không dùng lời giải): cả ba chặng đều chấm đạt, màn hình hoàn thành hiện ra, XP và sao được lưu.
4. Thoát giữa chừng rồi vào lại: bài vẫn học lại được từ đầu, không lỗi. Console sạch.

- [ ] **Step 5: Commit + STATUS**

```bash
git add -A
git commit -m "feat(content): Word long-document lessons and the job application project" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
