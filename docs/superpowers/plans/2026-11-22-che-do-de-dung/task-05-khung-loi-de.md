# Task 5: Khung lời dễ hiểu

**Ra được:** hồ sơ dễ dùng thấy bản lời dễ của bài nếu có, không thì bản gốc. File bài gốc không đổi.

## Giao diện

- `client/src/content/easy/types.ts`:
  - `EasyStep = { body?: string } | { question?: string; choices?: string[]; why?: string }
    | { task?: string; hint?: string; steps?: string[] } | { caption?: string }` (khoá theo loại bước).
  - `EasyLesson = { title?: string; osNote?: { win?: string; mac?: string }; steps?: Record<number, EasyStep> }`
    (khoá `steps` là vị trí bước trong `lesson.steps`, đếm từ 0).
- `client/src/content/easy/index.ts`: `EASY: Record<string, EasyLesson>` gộp từ các file lộ trình (`basics.ts`…).
  `applyEasy(lesson: Lesson, easy?: EasyLesson): Lesson` trả bản sao, chỉ thay trường chữ:
  - explain: `body`; quiz: `question`, `choices` (đủ số lượng, giữ thứ tự để `answer` vẫn đúng), `why`;
  - practice: `task`, `hints[0]` ← `hint`, `hints[2]` ← `steps`; **không** đụng `initial`, `checks`, `solution`, `hints[1]`;
  - realShot: `caption`. Không thay `marks`.
- `pages/LessonPage.tsx`: `const shown = easy ? applyEasy(lesson, EASY[id]) : lesson` (useMemo), truyền `shown`
  vào `LessonPlayer`/`FinishView`.

## Test (vitest)

- `applyEasy(lesson, undefined)` trả đúng bài gốc (cùng nội dung).
- Thay `body` của explain ở vị trí 0, các bước khác giữ nguyên.
- Thay quiz: `choices` mới, `answer` giữ nguyên.
- Thay practice: `task`, `hints[0]`, `hints[2]` đổi; `hints[1]`, `checks`, `solution` y nguyên.
- Bài gốc không bị sửa (đối chiếu bản sâu trước/sau).
- `content/easy/easy.test.ts`: mọi khoá trong `EASY` là id bài có thật; mọi vị trí bước tồn tại; loại `EasyStep`
  khớp `kind` của bước; `choices` cùng số lượng với bản gốc; `steps` của practice không rỗng; không chuỗi rỗng.
- `LessonPage` dễ dùng với một mục `EASY` giả (mock) ⇒ thấy chữ dễ; hồ sơ thường ⇒ thấy chữ gốc.

## Mẫu

Viết thử bản dễ cho `basics.mouse.click` để kiểm khung (task 6 viết phần còn lại).

## Kiểm trình duyệt

Hồ sơ dễ dùng mở `basics.mouse.click` thấy chữ mới; hồ sơ thường thấy chữ cũ.

## Commit

`feat(de-dung): khung lời dễ hiểu ghi đè theo bước, mẫu bài Nhấp chuột` + dòng STATUS.
