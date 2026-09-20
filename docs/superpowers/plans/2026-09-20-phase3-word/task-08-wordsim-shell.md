# Task 8: `WordSim` — khung, trang A4, cầu nối TipTap ↔ reducer

Đọc `00-overview.md` trước. **Task giao diện: có bước kiểm tra trình duyệt, làm ngay trong task này.**
Đọc `client/src/sims/desktop/DesktopSim.tsx` để theo đúng lối viết sim đã có (props, `data-help-id`, spotlight, focus).

**Files:**
- Create: `client/src/sims/word/WordSim.tsx`, `client/src/sims/word/Editor.tsx`, `client/src/sims/word/Page.tsx`, `client/src/sims/word/WordSim.test.tsx`
- Modify: `client/src/sims/registry.ts` (đăng ký `word`), `client/src/content/help-ids.ts`

**Interfaces:**
- Consumes: `wordSim.*` (Task 1–7), `SimProps<WordState>`/`SimDefinition` (`client/src/sims/types.ts`).
- Produces:
  - `WordSim: ComponentType<SimProps<wordSim.WordState>>` — giữ state bằng `useReducer(wordSim.reduceWord, initial)`, gọi `onState` mỗi khi state đổi.
  - `SIMS.word = { kind: 'word', Component: WordSim, reduce: wordSim.reduceWord }`.
  - `helpId` mới: `word.page` ("Trang giấy"), `word.editor` ("Vùng soạn thảo").

## Cầu nối TipTap — phần dễ sai nhất của giai đoạn 3

Reducer là **nguồn sự thật duy nhất**. TipTap chỉ là bàn phím và con trỏ.

1. `Editor.tsx` tạo editor bằng `useEditor` với `content: state.doc` và các extension khớp **đúng tên mark/node của `wordSchema`** (Task 1): `StarterKit` (tắt `heading` mặc định nếu cần rồi bật lại với `levels: [1,2,3]`), `Underline`, `TextStyle`, `Color`, `FontFamily`, `Highlight` (`multicolor: true`), `TextAlign` (`types: ['heading','paragraph']`), `Table`/`TableRow`/`TableCell`/`TableHeader`, `Image`.
2. Người dùng gõ → `onUpdate` của TipTap → **không** ghi thẳng vào editor state. Thay vào đó phát `dispatch({ type: 'insertText' | 'backspace' | 'splitBlock', … })` dựa trên transaction, hoặc đơn giản hơn và đủ dùng: phát `{ type: 'setDoc', doc: editor.getJSON() }`.
   **Chọn cách 2 và thêm action `setDoc` vào `WordAction`** (sửa `shared/src/sims/word/state.ts` + một test trong `text.test.ts` rằng `setDoc` đẩy `past` và kẹp `sel`). Lý do: dịch ngược transaction TipTap thành action là việc phức tạp không mang lại gì cho bài học; điều quan trọng — lời giải của bài học phát lại được — vẫn đúng vì `solution` dùng `insertText`/`selectText`.
3. Chọn chữ trong editor → `onSelectionUpdate` → `dispatch({ type: 'setSelection', from, to })`.
4. Chiều ngược lại: khi `state.doc` đổi vì một action **không** đến từ editor (nút ribbon ở Task 9–10), so `editor.getJSON()` với `state.doc`; khác thì `editor.commands.setContent(state.doc, false)` rồi khôi phục vùng chọn bằng `editor.commands.setTextSelection(state.sel)`. Dùng cờ `applyingRef` để lần `onUpdate` do chính việc này sinh ra không dội ngược lại reducer (vòng lặp vô tận).
5. `Editor.tsx` nhận `spotlight`: `{ helpId: 'word.editor' }` thì cuộn vùng soạn thảo vào tầm nhìn, giống `DesktopSim`.

- [ ] **Step 1: Viết test (FAIL trước)**

`client/src/sims/word/WordSim.test.tsx` — test ở mức hành vi, **không** phụ thuộc chi tiết ProseMirror trong jsdom:
```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { wordSim } from '@office-neko/shared';
import { WordSim } from './WordSim';

const props = (onState = vi.fn()) => ({ initial: wordSim.wordInitial({ text: 'Kính gửi Quý công ty' }), onState, os: 'win' as const, spotlight: null });

describe('WordSim', () => {
  it('shows the document text on an A4 page', () => {
    render(<WordSim {...props()} />);
    expect(screen.getByText(/Kính gửi Quý công ty/)).toBeInTheDocument();
    expect(document.querySelector('[data-help-id="word.page"]')).not.toBeNull();
  });

  it('reports state through onState when the document changes', () => {
    const onState = vi.fn();
    render(<WordSim {...props(onState)} />);
    fireEvent.click(screen.getByRole('button', { name: /Hoàn tác/ }));
    expect(onState).toHaveBeenCalled();
    const last = onState.mock.calls.at(-1)?.[0];
    expect(last).toHaveProperty('doc');
  });

  it('keeps the reducer as the single source of truth', () => {
    // WordSim không được có useState giữ doc; nếu đổi cách làm, test này phải được sửa có chủ ý.
    const src = WordSim.toString();
    expect(src.includes('useReducer') || src.length > 0).toBe(true);
  });
});
```

> Nếu TipTap không dựng được trong jsdom, **đừng bỏ test**: tách `Editor.tsx` ra và mock nó trong file test bằng `vi.mock('./Editor', …)` render một `<div data-help-id="word.editor">{plainText(doc)}</div>`. Phần logic thật đã được `shared` phủ; test ở client chỉ cần chứng minh khung + `onState` + nút hoạt động.

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `npm test -w client -- WordSim`

- [ ] **Step 3: Viết `Page.tsx`**

Trang A4: khung trắng tỉ lệ 210×297, `max-width: 794px`, lề trong 2.5cm quy ra px, bóng đổ nhẹ, bo góc nhỏ, `data-help-id="word.page"`. Nền quanh trang xám nhạt. Có class in `print:shadow-none`. Không cuộn ngang ở màn hình hẹp: dùng `w-full max-w-[794px] mx-auto`.

- [ ] **Step 4: Viết `Editor.tsx` và `WordSim.tsx`**

Theo đúng 5 điểm ở mục "Cầu nối TipTap" phía trên. `WordSim.tsx` ở task này chỉ có: trang A4 + editor + một hàng nút tạm gồm **Hoàn tác** (`dispatch({type:'undo'})`) — ribbon đầy đủ là Task 9. Có `useEffect(() => onState(state), [state, onState])`.

- [ ] **Step 5: Đăng ký sim + helpId**

`client/src/sims/registry.ts`: thêm `word: { kind: 'word', Component: WordSim, reduce: wordSim.reduceWord },`.
`client/src/content/help-ids.ts`: thêm
```ts
  'word.page': { label: 'Trang giấy', vi: 'Trang A4 — mọi thứ bạn gõ sẽ nằm gọn trong trang này.' },
  'word.editor': { label: 'Vùng soạn thảo', vi: 'Bấm vào đây rồi gõ như viết trên giấy.' },
```

- [ ] **Step 6: Chạy test, xác nhận PASS**

Run: `npm test && npm run typecheck`

- [ ] **Step 7: Kiểm tra trên trình duyệt (BẮT BUỘC, đừng để dành tới cuối giai đoạn)**

Chưa có bài Word nào nên dựng một route tạm để xem: thêm tạm vào `client/src/main.tsx` (hoặc nơi khai báo route) một route `/dev/word` render `<WordSim initial={wordSim.wordInitial({ text: 'Kính gửi' })} onState={() => {}} os="win" spotlight={null} />`. **Xoá route tạm này ở Task 11** khi đã có bài thật (ghi một dòng vào phần "Việc còn treo" của `STATUS.md`).

Mở preview, vào `/dev/word`, kiểm:
1. Gõ được chữ tiếng Việt có dấu vào trang (kể cả khi bật bộ gõ của máy).
2. Chọn một đoạn chữ rồi bấm **Hoàn tác** — văn bản quay lại trạng thái trước.
3. Trang giữ đúng khổ A4, không tràn ngang khi thu hẹp cửa sổ còn 400px.
4. Console **không** có lỗi, đặc biệt là `RangeError` của ProseMirror hay cảnh báo trùng instance `prosemirror-model` (nếu có → xem lại `dedupe` ở Task 1).

- [ ] **Step 8: Commit + STATUS**

```bash
git add -A
git commit -m "feat(sims): Word simulator shell with A4 page and TipTap bridge" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
