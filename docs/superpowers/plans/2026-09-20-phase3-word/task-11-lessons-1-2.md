# Task 11: `wordPractice` + chương 1 và 2 (6 bài)

Đọc `00-overview.md` trước. Xem `client/src/content/lessons/basics-mouse.ts` làm mẫu cách viết bài, và `client/src/content/lessonKit.ts` cho các helper đã có.

**Files:**
- Create: `client/src/content/lessons/word-basics.ts` (chương 1), `client/src/content/lessons/word-format.ts` (chương 2)
- Modify: `client/src/content/lessonKit.ts`, `client/src/content/lessons/index.ts`, `client/src/content/tracks.ts`, `client/src/main.tsx` (xoá route tạm `/dev/word` của Task 8)

**Interfaces:**
- Consumes: `wordSim.*`; `LESSONS`, `TRACKS`.
- Produces — thêm vào `lessonKit.ts`:
```ts
export function wordPractice(o: {
  text?: string;                 // nội dung có sẵn trong trang khi bắt đầu
  doc?: wordSim.WordDoc;         // hoặc doc dựng sẵn; ưu tiên `doc` nếu có cả hai
  task: string;
  checks: wordSim.WordCheck[];
  spotlight: Spotlight;          // hầu hết là { helpId: 'word.<nút>' }
  hint: string;
  steps: string[];
  setup?: (s0: wordSim.WordState) => wordSim.WordAction[];   // chuẩn bị, không tính vào undo
  solve: (s0: wordSim.WordState) => wordSim.WordAction[];
}): PracticeStep<wordSim.WordState, wordSim.WordCheck, wordSim.WordAction>;
```
  Dựng `initial` bằng `wordSim.wordInitial({ doc, text })`, áp `setup` rồi **đặt lại** `past: []`, `dialog: null` (giống `desktopPractice` đang làm), `solution = o.solve(initial)`.

## Bài của chương 1 — `word.start` "Làm quen trang giấy"

| id | title | phút | Nội dung |
|---|---|---|---|
| `word.intro` | Word dùng để làm gì | 4 | 2 explain (trang giấy A4, ribbon là "hộp đồ nghề") + 1 quiz ("Ribbon là gì?") + 1 practice: gõ `Kính gửi Quý công ty` vào trang rỗng. Check `textContains`. |
| `word.edit` | Gõ, xuống dòng và sửa sai | 5 | explain Enter/Backspace + practice: từ `Tôi tên là Nam` gõ thêm dòng thứ hai `Tôi 25 tuổi`; check 2 × `textContains`. |
| `word.select` | Chọn chữ trước khi làm gì | 5 | explain "muốn đổi chữ nào thì phải chọn chữ đó trước" + practice: tài liệu `Kính gửi Quý công ty ABC`, chọn `ABC` rồi gõ `Mochi`; check `textContains: 'Quý công ty Mochi'` + `textNotContains: 'ABC'`. |

## Bài của chương 2 — `word.format` "Định dạng chữ"

| id | title | phút | Nội dung |
|---|---|---|---|
| `word.bold` | In đậm, in nghiêng, gạch chân | 6 | explain + quiz ("Phím tắt in đậm?") + practice: làm đậm `ĐƠN XIN VIỆC` và gạch chân `Trân trọng`; check 2 × `markOnText`. |
| `word.font` | Phông chữ và cỡ chữ | 6 | explain (phông là "nét chữ", cỡ tính bằng pt) + practice: đổi cả tiêu đề sang Times New Roman 16pt; check `markOnText` fontFamily + fontSize. |
| `word.color` | Màu chữ và tô nền | 5 | explain + practice: tô nền vàng cho `ngày 20 tháng 9` và đổi màu tiêu đề; check `markOnText` highlight + color. |

Quy tắc soạn bài (áp dụng cho cả Task 12–13):
- Mỗi bài 4–6 bước, **luôn** kết thúc bằng ít nhất một `practice`.
- `hints[0]` là một câu gợi ý; `hints[1]` là spotlight trỏ đúng nút cần bấm (`word.bold`, `word.font`…); `hints[2]` là các bước lời giải, mỗi bước một câu ngắn.
- Dùng `[[thuật ngữ]]` cho các từ tiếng Anh mới (`[[ribbon]]`, `[[font]]`, `[[highlight]]`…). **Mọi thuật ngữ dùng ở đây phải được thêm vào `glossary.json` ở Task 14** — ghi danh sách từ đã dùng vào phần "Việc còn treo" của `STATUS.md` ngay khi viết bài, để Task 14 không phải đi dò lại.
- `solve` viết bằng `selectText` + action, **không** dùng số vị trí.
- Giọng văn: xưng "bạn", động viên, câu ngắn, không thuật ngữ thừa.

- [ ] **Step 1: Viết `wordPractice` vào `lessonKit.ts`**

Theo chữ ký ở trên, đặt ngay sau `desktopPractice`.

- [ ] **Step 2: Viết 6 bài**

`word-basics.ts` export `WORD_BASICS: Lesson[]` (3 bài), `word-format.ts` export `WORD_FORMAT: Lesson[]` (3 bài). Mỗi `Lesson` có `trackId: 'word'` và `chapterId` đúng như bảng.

Ví dụ một practice để theo đúng lối viết:
```ts
wordPractice({
  text: 'ĐƠN XIN VIỆC',
  task: 'Hãy làm cho dòng [[ĐƠN XIN VIỆC]] đậm lên nhé.',
  checks: [{ kind: 'markOnText', text: 'ĐƠN XIN VIỆC', mark: 'bold' }],
  spotlight: { helpId: 'word.bold' },
  hint: 'Chọn cả dòng chữ trước, rồi tìm nút chữ B trên ribbon.',
  steps: ['Bôi đen dòng ĐƠN XIN VIỆC.', 'Bấm nút B (Bold) ở tab Home.'],
  solve: () => [{ type: 'selectText', text: 'ĐƠN XIN VIỆC' }, { type: 'toggleMark', mark: 'bold' }],
})
```
(Đừng để `[[ĐƠN XIN VIỆC]]` thật trong bài — đó không phải thuật ngữ; ví dụ trên chỉ minh hoạ cú pháp.)

- [ ] **Step 3: Đăng ký bài và chương**

`client/src/content/lessons/index.ts`: import hai mảng mới và gộp vào `LESSONS` theo đúng cách các mảng cũ đang gộp.
`client/src/content/tracks.ts`: thay `chapters: []` của track `word` bằng:
```ts
    chapters: [
      { id: 'word.start', title: 'Làm quen trang giấy', lessonIds: ['word.intro', 'word.edit', 'word.select'] },
      { id: 'word.format', title: 'Định dạng chữ', lessonIds: ['word.bold', 'word.font', 'word.color'] },
    ],
```

- [ ] **Step 4: Xoá route tạm `/dev/word`**

Gỡ route `/dev/word` đã thêm ở Task 8 khỏi `client/src/main.tsx` và xoá dòng tương ứng trong phần "Việc còn treo" của `STATUS.md`. Từ nay xem Word qua chính bài học.

- [ ] **Step 5: Chạy test, xác nhận PASS**

Run: `npm test && npm run typecheck`
Expected: PASS — đặc biệt là `content.test.ts` "practice steps are wired up and their solutions pass". **Test này fail nghĩa là `solve` của bạn không thật sự qua được bài; sửa bài, đừng sửa check.**

- [ ] **Step 6: Kiểm tra trên trình duyệt (BẮT BUỘC)**

1. Bản đồ: lộ trình Word hiện 2 chương, 6 bài; bài đầu mở khoá, các bài sau khoá đúng thứ tự.
2. Học trọn bài `word.intro` → được 3 sao, XP tăng.
3. Trong bài `word.bold`, bấm gợi ý bậc 2 → Mochi chỉ đúng nút **B** trên ribbon.
4. Làm sai một lần rồi bấm "Kiểm tra" → thông báo tiếng Việt nói rõ còn thiếu gì. Console sạch.

- [ ] **Step 7: Commit + STATUS**

```bash
git add -A
git commit -m "feat(content): Word track chapters 1-2 (page basics and character formatting)" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
