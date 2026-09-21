# Giai đoạn 3 (Word) – tình trạng

Cập nhật 1 dòng sau mỗi task, trong cùng commit của task đó. Phiên mới đọc file này trước, không đọc lại các file task đã xong.

| Task | Xong | Commit | Ghi chú / việc còn treo |
|---|---|---|---|
| 1 Deps + schema | ☑ | (commit này) | shared 148 test xanh; schema tự khai báo node, không dùng addListNodes/tableNodes |
| 2 Reducer lõi | ☑ | (commit này) | 13 test; `findText` là bản đồ ký tự→pos mà Task 3–7 dùng lại |
| 3 Marks | ☑ | (commit này) | 7 test lấy nguyên từ plan; `editDoc()` trong text.ts là cổng chung cho mọi thao tác sửa tài liệu |
| 4 Blocks | ☑ | (commit này) | 8 test |
| 5 Bảng + ảnh | ☑ | (commit này) | 9 test; 6 ảnh SVG đã tạo trong client/public/images/word/ |
| 6 Find/TOC/Save | ☑ | (commit này) | 10 test |
| 7 Grader | ☑ | (commit này) | 7 test; `GRADERS.word` đã đăng ký. Xong toàn bộ phần shared — từ Task 8 là giao diện |
| 8 WordSim shell | ☑ | (commit này) | 3 test client + 2 test `setDoc` ở shared; đã gõ thật trong TipTap và Hoàn tác trên trình duyệt |
| 9 Ribbon Home | ☐ | | |
| 10 Ribbon còn lại | ☐ | | |
| 11 Bài chương 1–2 | ☐ | | |
| 12 Bài chương 3–4 | ☐ | | |
| 13 Bài chương 5 + dự án | ☐ | | |
| 14 Từ điển + tổng kết | ☐ | | |

## Quyết định đã chốt

- 2026-09-20: Word dựng trên TipTap ở client, nhưng lõi ProseMirror thuần (`@tiptap/pm/*`) nằm trong `shared` làm reducer — giữ được test phát lại `solution`.
- 2026-09-21 (Task 1, phát sinh khi làm): **tự khai báo node bảng và danh sách** thay vì dùng `addListNodes`/`tableNodes`,
  vì hai hàm đó sinh tên `bullet_list`, `table_row` (snake_case) còn TipTap ở giao diện dùng `bulletList`, `tableRow`.
  Hành vi bảng vẫn do `tableRole` quyết định nên không mất gì.
- 2026-09-21 (Task 1): `Node.toJSON` của ProseMirror **luôn** kèm `attrs` nếu node có thuộc tính, kể cả khi đúng bằng
  mặc định (plan đoán sai chỗ này). `docToJSON` tự lược các giá trị mặc định, nhờ vậy `emptyDoc()` đúng bằng
  `{ type: 'doc', content: [{ type: 'paragraph' }] }` và JSON trong bài học đọc được bằng mắt.

## Việc còn treo (ai phát hiện thì ghi vào đây, đừng sửa lạc task)

- Route tạm `/dev/word` + file `client/src/sims/word/WordDevPage.tsx` — **Task 11 phải xoá** khi đã có bài học Word thật.

- **`wordInitial` đặt con trỏ ở ĐẦU đoạn.** Muốn dựng tài liệu nhiều đoạn thì phải đưa con trỏ về cuối chữ
  (`selectText` rồi `setSelection(from: sel.to, to: sel.to)`) trước khi `splitBlock`, kẻo tách ra một đoạn rỗng phía trước.
  Fixture trong plan Task 4 viết thiếu bước này, đã sửa trong test.
- **Mục lục nằm ở ĐẦU tài liệu** nên sau khi chèn nó, `selectText('<tiêu đề>')` sẽ trúng DÒNG MỤC LỤC chứ không phải
  tiêu đề thật. Bài học Task 13 (mục lục) phải dùng `nth: 2` khi muốn sửa tiêu đề sau khi đã có mục lục.
- Task 3–6 dùng `withEdit(s, edit)` trong `state.ts` để đẩy lịch sử hoàn tác — đừng tự viết lại chỗ này ở từng file.
