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
| 9 Ribbon Home | ☑ | (commit này) | 5 test; đã thử thật trên trình duyệt: đậm, font, cỡ, căn giữa, giãn dòng, heading, danh sách, hoàn tác |
| 10 Ribbon còn lại | ☑ | (commit này) | 14 test; đã thử thật: bảng + thêm hàng, chèn ảnh, tìm & thay thế, mục lục, Esc đóng hộp thoại |
| 11 Bài chương 1–2 | ☑ | (commit này) | 6 bài; đã thêm 6 mục từ điển (a4, bold, italic, underline, font, highlight) — Task 14 chỉ cần bổ sung phần còn lại |
| 12 Bài chương 3–4 | ☑ | (commit này) | 5 bài; grader thêm check `imageWidth`; từ điển thêm align/table/row/column/cell |
| 13 Bài chương 5 + dự án | ☑ | (commit này) | 4 bài; đủ 15 bài / 6 chương trên bản đồ |
| 14 Từ điển + tổng kết | ☐ | | |

## Quyết định đã chốt

- 2026-09-20: Word dựng trên TipTap ở client, nhưng lõi ProseMirror thuần (`@tiptap/pm/*`) nằm trong `shared` làm reducer — giữ được test phát lại `solution`.
- 2026-09-21 (Task 1, phát sinh khi làm): **tự khai báo node bảng và danh sách** thay vì dùng `addListNodes`/`tableNodes`,
  vì hai hàm đó sinh tên `bullet_list`, `table_row` (snake_case) còn TipTap ở giao diện dùng `bulletList`, `tableRow`.
  Hành vi bảng vẫn do `tableRole` quyết định nên không mất gì.
- 2026-09-21 (Task 9, phát sinh khi thử trên trình duyệt): **mọi thuộc tính schema của ta phải được khai báo cho
  TipTap**, nếu không nó bị xoá khi nạp tài liệu vào editor. Đã thêm extension cho `fontSize` (trên textStyle) và
  `lineHeight` (trên đoạn/tiêu đề) trong `Editor.tsx` — trước đó cỡ chữ và giãn dòng "mất" ngay sau khi đặt.
- 2026-09-21 (Task 9): `listItem` chỉ chứa được đoạn văn (giống TipTap) nên bọc một Heading vào danh sách sẽ hạ nó về
  đoạn thường, thay vì im lặng không làm gì.
- 2026-09-21 (Task 1): `Node.toJSON` của ProseMirror **luôn** kèm `attrs` nếu node có thuộc tính, kể cả khi đúng bằng
  mặc định (plan đoán sai chỗ này). `docToJSON` tự lược các giá trị mặc định, nhờ vậy `emptyDoc()` đúng bằng
  `{ type: 'doc', content: [{ type: 'paragraph' }] }` và JSON trong bài học đọc được bằng mắt.

## Việc còn treo (ai phát hiện thì ghi vào đây, đừng sửa lạc task)

- (xong ở Task 11) đã xoá route tạm `/dev/word`.
- **Soạn bài Word: dùng `text` NHIỀU DÒNG** (`'Dòng một
Dòng hai'`) để dựng tài liệu đầu bài — `emptyDoc` tách mỗi dòng
  thành một đoạn. Đừng xếp `splitBlock` thủ công trong `setup`: con trỏ mặc định ở ĐẦU đoạn nên rất dễ tách nhầm
  chỗ (test chỉ kiểm check nên KHÔNG bắt được lỗi này — phải nhìn tài liệu trên trình duyệt).
- Trình kể chuyện chỉ hiểu `**đậm**`, `[[thuật ngữ]]`, `{{phím}}` — **không có `*nghiêng*`**.

- **`wordInitial` đặt con trỏ ở ĐẦU đoạn.** Muốn dựng tài liệu nhiều đoạn thì phải đưa con trỏ về cuối chữ
  (`selectText` rồi `setSelection(from: sel.to, to: sel.to)`) trước khi `splitBlock`, kẻo tách ra một đoạn rỗng phía trước.
  Fixture trong plan Task 4 viết thiếu bước này, đã sửa trong test.
- **Mục lục nằm ở ĐẦU tài liệu** nên sau khi chèn nó, `selectText('<tiêu đề>')` sẽ trúng DÒNG MỤC LỤC chứ không phải
  tiêu đề thật. Bài học Task 13 (mục lục) phải dùng `nth: 2` khi muốn sửa tiêu đề sau khi đã có mục lục.
- Task 3–6 dùng `withEdit(s, edit)` trong `state.ts` để đẩy lịch sử hoàn tác — đừng tự viết lại chỗ này ở từng file.
