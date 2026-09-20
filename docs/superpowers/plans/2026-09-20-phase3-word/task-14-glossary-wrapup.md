# Task 14: Từ điển, Hỏi Mèo, README và kiểm tra tổng thể

Đọc `00-overview.md` trước. Đây là task **cuối**, và theo thiết kế của plan này nó **không phải** nơi phát hiện lỗi giao diện — mỗi task trước đã tự kiểm tra trên trình duyệt rồi. Nếu tới đây vẫn lòi ra lỗi UI, ghi vào `STATUS.md` phần "Việc còn treo" và sửa, nhưng đồng thời ghi rõ task nào lẽ ra phải bắt được nó (để lần sau chỉnh plan).

**Files:**
- Modify: `client/src/content/glossary.json`, `client/src/content/faq.json`, `README.md`

**Interfaces:** không sinh API mới.

- [ ] **Step 1: Gom thuật ngữ đã dùng**

Đọc phần "Việc còn treo" của `STATUS.md` (Task 11–13 đã ghi lại các `[[thuật ngữ]]` mới). Đối chiếu thêm bằng:

```bash
npm test -w client -- content
```
Test `resolves every [[term]] reference` sẽ FAIL và **liệt kê đúng những khoá còn thiếu** — dùng danh sách đó làm chuẩn, đừng tự đoán.

- [ ] **Step 2: Thêm mục từ điển**

Thêm vào `client/src/content/glossary.json`, mỗi mục đủ `id`, `term`, `say`, `vi`, `explain`, `lessonIds` (chỉ trỏ tới bài có thật). Dự kiến khoảng 18 mục:

`word`, `ribbon`, `tab`, `font`, `font-size`, `bold`, `italic`, `underline`, `highlight`, `align`, `line-spacing`, `bullet-list`, `numbered-list`, `table`, `row`, `column`, `cell`, `image`, `heading`, `table-of-contents`, `find-replace`, `save-as`, `print-preview`, `a4`.

Mẫu một mục, theo đúng lối các mục đã có:
```json
{
  "id": "heading",
  "term": "Heading",
  "say": "/ˈhedɪŋ/ — héc-đinh",
  "vi": "Tiêu đề mục",
  "explain": "Dòng tiêu đề của một phần trong bài. Đặt Heading thay vì chỉ tô đậm thì Word mới tự làm được [[table-of-contents]] cho bạn.",
  "lessonIds": ["word.heading", "word.toc"]
}
```

- [ ] **Step 3: Thêm câu hỏi cho Hỏi Mèo**

Thêm khoảng 15 mục vào `client/src/content/faq.json`, đúng những câu người mới hay hỏi:

- "Làm sao bỏ in đậm?" / "Chữ bị dính nhau, giãn dòng ở đâu?" / "Tôi lỡ xoá mất một đoạn, lấy lại được không?" / "Vì sao chữ tôi gõ bị đè lên chữ cũ?" / "Bảng bị tràn ra ngoài trang thì làm sao?" / "Mục lục không cập nhật?" / "Làm sao đánh số trang?" (trả lời thành thật: bản mô phỏng này chưa có, sẽ học ở Word thật) / "Tìm và thay thế có phân biệt chữ hoa không?" / "Ảnh chèn vào bị to quá?" / "File lưu ở đâu?" (bản mô phỏng lưu trong máy học, không ra file thật) …

Mỗi mục có `id`, `q`, `a`, và `os` nếu riêng một hệ điều hành. Câu trả lời 1–3 câu, tiếng Việt, được phép chứa `[[thuật ngữ]]`.

- [ ] **Step 4: Cập nhật README**

Sửa mục "Đã có" thành "Đã có (giai đoạn 1–3)" và thêm một gạch đầu dòng:
```markdown
- Word: trình soạn thảo mô phỏng (ribbon 6 tab, trang A4, bảng, ảnh, Heading, mục lục, tìm & thay thế, lưu/in) và 15 bài từ gõ chữ tới dự án Đơn xin việc.
```

- [ ] **Step 5: Chạy toàn bộ**

Run: `npm test && npm run typecheck && npm run build`
Expected:
- Mọi test PASS, gồm `content.test.ts` phát lại lời giải của cả 15 bài Word.
- Build thành công, không cảnh báo React Router, không cảnh báo `act()`.
- Kích thước bundle tăng do TipTap là bình thường; nếu `client/dist` vượt 6 MB thì ghi vào "Việc còn treo" để giai đoạn sau tách chunk, **không** xử lý trong task này.

- [ ] **Step 6: Đi một lượt trên trình duyệt (smoke test, không phải đợt săn lỗi)**

1. Bản đồ có 6 chương Word, mở khoá theo thứ tự.
2. Mở Từ điển (F1), tra "Heading" → thấy nghĩa và link tới bài.
3. Hỏi Mèo: gõ "bo in dam" (không dấu) → ra câu trả lời đúng.
4. Học nhanh một bài Word bất kỳ → 3 sao, XP tăng.
5. Console sạch, chạy offline được (tắt mạng, tải lại trang).

- [ ] **Step 7: Commit + STATUS**

```bash
git add -A
git commit -m "docs: Word glossary, FAQ entries and phase 3 README" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

Đánh dấu toàn bộ 14 dòng trong `STATUS.md` là ☑ và ghi một câu tổng kết ở cuối file: giai đoạn 3 xong, giai đoạn 4 là Excel (spec mục 7.5).
