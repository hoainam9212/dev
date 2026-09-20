# Task 12: Chương 3 và 4 (5 bài)

Đọc `00-overview.md` trước. Quy tắc soạn bài nằm ở `task-11-lessons-1-2.md` mục "Quy tắc soạn bài" — đọc lại đúng mục đó nếu cần, không cần đọc cả file.

**Files:**
- Create: `client/src/content/lessons/word-para.ts`, `client/src/content/lessons/word-objects.ts`
- Modify: `client/src/content/lessons/index.ts`, `client/src/content/tracks.ts`

**Interfaces:**
- Consumes: `wordPractice` (Task 11); `wordSim` checks/actions (Task 3–7).
- Produces: `WORD_PARA: Lesson[]` (3 bài), `WORD_OBJECTS: Lesson[]` (2 bài); hai chương mới trong track `word`.

## Chương 3 — `word.para` "Đoạn văn cho đẹp"

| id | title | phút | Nội dung |
|---|---|---|---|
| `word.align` | Căn lề trái, giữa, phải, đều | 6 | explain (khi nào dùng căn giữa: tiêu đề; căn phải: ngày tháng) + quiz + practice: tài liệu 3 đoạn `ĐƠN XIN VIỆC` / `Hà Nội, ngày 20 tháng 9` / `Kính gửi Quý công ty`; căn giữa tiêu đề, căn phải dòng ngày. Check 2 × `paragraphAlign`. |
| `word.spacing` | Giãn dòng cho dễ đọc | 5 | explain + practice: đặt giãn dòng 1.5 cho đoạn nội dung. Check `lineHeight`. |
| `word.list` | Danh sách chấm và danh sách số | 6 | explain (chấm = không có thứ tự, số = có thứ tự) + quiz + practice: biến 3 dòng kỹ năng thành danh sách chấm, rồi 3 dòng các bước thành danh sách số. Check 2 × `listType` ở hai đoạn khác nhau. |

## Chương 4 — `word.objects` "Bảng và ảnh"

| id | title | phút | Nội dung |
|---|---|---|---|
| `word.table` | Chèn bảng và điền nội dung | 8 | explain ([[table]], [[row]], [[column]], [[cell]]) + quiz + practice: chèn bảng 3×2, điền ô đầu `Môn học` và ô kề `Điểm`, thêm một hàng. Check `tableSize` (4×2 sau khi thêm hàng) + 2 × `cellText`. |
| `word.image` | Chèn ảnh vào văn bản | 6 | explain (ảnh minh hoạ, đừng để ảnh che chữ) + practice: chèn ảnh Mochi rồi đặt độ rộng 60%. Check `imageCount: 1` + `markOnText`? **không** — check độ rộng bằng `imageCount` và một check `textContains` cho chú thích ảnh do học viên gõ. |

> Ghi chú cho `word.image`: grader không có check độ rộng ảnh. Hoặc (a) chỉ chấm `imageCount` và câu chú thích, hoặc (b) thêm `{ kind: 'imageWidth'; width: string }` vào `WordCheck` + `gradeWord` + một test trong `grade.test.ts`. **Chọn (b)** — rẻ và làm bài học chặt hơn. Ghi vào `STATUS.md` rằng Task 12 có mở rộng grader.

- [ ] **Step 1: Mở rộng grader cho độ rộng ảnh**

Thêm `{ kind: 'imageWidth'; width: '25%' | '40%' | '60%' | '100%' }` vào `WordCheck`, xử lý trong `gradeWord` bằng `imagesOf(doc)` (đúng khi **có ít nhất một** ảnh đạt độ rộng đó), và thêm test vào `shared/src/sims/word/grade.test.ts`:
```ts
  it('checks the image width', () => {
    const s = [{ type: 'insertImage', src: '/images/word/meo.svg', alt: 'Mèo' }, { type: 'setImageWidth', width: '60%' }]
      .reduce(reduceWord as never, wordInitial()) as WordState;
    expect(gradeWord(s, { kind: 'imageWidth', width: '60%' }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'imageWidth', width: '25%' }).ok).toBe(false);
  });
```
Run: `npm test -w shared -- grade` → PASS trước khi viết bài.

- [ ] **Step 2: Viết 5 bài**

Theo hai bảng trên. Nhớ: `solve` dùng `selectText`, không dùng số vị trí; thuật ngữ mới ghi vào "Việc còn treo" của `STATUS.md` cho Task 14.

- [ ] **Step 3: Đăng ký bài + chương**

`lessons/index.ts`: gộp `WORD_PARA`, `WORD_OBJECTS`.
`tracks.ts`: thêm vào `chapters` của track `word`:
```ts
      { id: 'word.para', title: 'Đoạn văn cho đẹp', lessonIds: ['word.align', 'word.spacing', 'word.list'] },
      { id: 'word.objects', title: 'Bảng và ảnh', lessonIds: ['word.table', 'word.image'] },
```

- [ ] **Step 4: Chạy test, xác nhận PASS**

Run: `npm test && npm run typecheck`
Expected: PASS, gồm cả "practice steps are wired up and their solutions pass".

- [ ] **Step 5: Kiểm tra trên trình duyệt (BẮT BUỘC)**

1. Học `word.align`: căn giữa rồi căn phải thấy đổi thật trên trang, chấm đạt.
2. Học `word.table`: chèn bảng, gõ vào ô, thêm hàng bằng nút ribbon — bảng vẽ đúng, không tràn khỏi trang A4.
3. Học `word.image`: ảnh hiện ra, đổi 60% thấy nhỏ lại.
4. Gợi ý bậc 2 ở cả 5 bài trỏ đúng nút. Console sạch.

- [ ] **Step 6: Commit + STATUS**

```bash
git add -A
git commit -m "feat(content): Word track chapters 3-4 (paragraphs, lists, tables and pictures)" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
