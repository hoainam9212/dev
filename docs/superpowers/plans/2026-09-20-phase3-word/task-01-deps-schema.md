# Task 1: Thư viện TipTap và schema tài liệu Word

Đọc `00-overview.md` trước. Task này không có giao diện, không cần kiểm tra trình duyệt.

**Files:**
- Modify: `shared/package.json`, `client/package.json`, `client/vite.config.ts`, `shared/src/index.ts`
- Create: `shared/src/sims/word/schema.ts`, `shared/src/sims/word/schema.test.ts`, `shared/src/sims/word/index.ts`

**Interfaces:**
- Produces:
  - `wordSchema: Schema` — schema ProseMirror của tài liệu Word.
  - `type WordDoc = Record<string, unknown>` — doc JSON (kết quả `node.toJSON()`).
  - `docFromJSON(json: WordDoc): Node` và `docToJSON(node: Node): WordDoc`.
  - `emptyDoc(text?: string): WordDoc` — tài liệu một đoạn, rỗng hoặc chứa `text`.
  - `plainText(doc: WordDoc): string` — nối text mọi block, ngăn bằng `\n`.
  - Export namespace: `export * as wordSim from './sims/word';` trong `shared/src/index.ts`.

## Vì sao dùng `@tiptap/pm/*` chứ không phải `prosemirror-model` trực tiếp

`@tiptap/pm` là gói chỉ re-export các gói `prosemirror-*`. Cả `shared` và TipTap ở `client` cùng import qua nó ⇒ chỉ có **một** instance `prosemirror-model` trong bundle. Nếu import thẳng `prosemirror-model` ở `shared` và TipTap kéo bản của nó, hai instance schema khác nhau sẽ ném `RangeError: Invalid content for node doc` lúc chạy — lỗi rất khó truy.

- [ ] **Step 1: Cài thư viện**

```bash
npm i -w shared @tiptap/pm@^2.9.0
npm i -w client @tiptap/core@^2.9.0 @tiptap/react@^2.9.0 @tiptap/pm@^2.9.0 \
  @tiptap/extension-underline@^2.9.0 @tiptap/extension-text-style@^2.9.0 \
  @tiptap/extension-color@^2.9.0 @tiptap/extension-highlight@^2.9.0 \
  @tiptap/extension-font-family@^2.9.0 @tiptap/extension-text-align@^2.9.0 \
  @tiptap/extension-table@^2.9.0 @tiptap/extension-table-row@^2.9.0 \
  @tiptap/extension-table-cell@^2.9.0 @tiptap/extension-table-header@^2.9.0 \
  @tiptap/extension-image@^2.9.0 @tiptap/starter-kit@^2.9.0
```

Trong `client/vite.config.ts`, thêm vào object cấu hình (cùng cấp với `plugins`):
```ts
  resolve: { dedupe: ['@tiptap/pm', 'prosemirror-model', 'prosemirror-state', 'prosemirror-transform', 'prosemirror-view'] },
```

- [ ] **Step 2: Viết test (FAIL trước)**

`shared/src/sims/word/schema.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { docFromJSON, docToJSON, emptyDoc, plainText, wordSchema } from './schema';

describe('word schema', () => {
  it('creates an empty document with one paragraph', () => {
    expect(emptyDoc()).toEqual({ type: 'doc', content: [{ type: 'paragraph' }] });
    expect(plainText(emptyDoc('Xin chào'))).toBe('Xin chào');
  });

  it('round-trips a document through ProseMirror', () => {
    const json = emptyDoc('Kính gửi');
    expect(docToJSON(docFromJSON(json))).toEqual(json);
  });

  it('knows every node and mark the Word sim needs', () => {
    for (const n of ['doc', 'paragraph', 'heading', 'text', 'bulletList', 'orderedList', 'listItem', 'table', 'tableRow', 'tableCell', 'image']) {
      expect(wordSchema.nodes[n], n).toBeDefined();
    }
    for (const m of ['bold', 'italic', 'underline', 'textStyle', 'highlight']) {
      expect(wordSchema.marks[m], m).toBeDefined();
    }
  });

  it('keeps paragraph attributes and text styles', () => {
    const json = {
      type: 'doc',
      content: [
        { type: 'heading', attrs: { level: 2, textAlign: 'center', lineHeight: '1.5' }, content: [{ type: 'text', text: 'ĐƠN XIN VIỆC' }] },
        { type: 'paragraph', attrs: { textAlign: 'right', lineHeight: '1' }, content: [{ type: 'text', marks: [{ type: 'bold' }, { type: 'textStyle', attrs: { color: '#C2185B', fontFamily: 'Times New Roman', fontSize: '14pt' } }], text: 'Nam' }] },
      ],
    };
    expect(docToJSON(docFromJSON(json))).toEqual(json);
  });

  it('joins block text with newlines', () => {
    const json = { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'A' }] }, { type: 'paragraph', content: [{ type: 'text', text: 'B' }] }] };
    expect(plainText(json)).toBe('A\nB');
  });
});
```

- [ ] **Step 3: Chạy test, xác nhận FAIL**

Run: `npm test -w shared -- schema`
Expected: FAIL — không resolve được `./schema`.

- [ ] **Step 4: Viết schema**

`shared/src/sims/word/schema.ts` — dựng schema bằng `Schema` của `@tiptap/pm/model`, cộng list node từ `@tiptap/pm/schema-list` và bảng từ `@tiptap/pm/tables`. Yêu cầu:

- `doc: { content: 'block+' }`.
- `paragraph` và `heading` có chung hai attr: `textAlign` (mặc định `null`, nhận `'left' | 'center' | 'right' | 'justify'`) và `lineHeight` (mặc định `null`, nhận `'1' | '1.5' | '2'`). `heading` thêm `level` mặc định `1`, nhận 1–3.
- Node rỗng thì **không** sinh khoá `attrs` khi `toJSON` — để `emptyDoc()` bằng đúng `{ type: 'doc', content: [{ type: 'paragraph' }] }`. Cách làm: mặc định cả hai attr là `null`, và ProseMirror sẽ bỏ `attrs` khi mọi giá trị bằng mặc định.
- `image`: attr `src` (bắt buộc), `alt` (mặc định `''`), `width` (mặc định `'40%'`), là node `inline: false`, `group: 'block'`.
- Marks: `bold`, `italic`, `underline`, `highlight` (attr `color`, mặc định `'#FFF3B0'`), `textStyle` (attrs `color`, `fontFamily`, `fontSize`, đều mặc định `null`) — tên mark **phải trùng tên TipTap dùng** để Task 8 nối vào được.
- Bảng: `table`, `tableRow`, `tableCell`, `tableHeader` theo `tableNodes({ tableGroup: 'block', cellContent: 'block+', cellAttributes: {} })`.

`plainText` duyệt đệ quy `content`, lấy `text` của node `text`, và nối text của từng block con trực tiếp của `doc` bằng `'\n'` (ô bảng nằm trong block của nó, tính chung vào dòng của bảng, ngăn bằng `' '`).

`shared/src/sims/word/index.ts`:
```ts
export * from './schema';
```

Thêm vào `shared/src/index.ts`, cạnh các dòng `export * as ...Sim` đã có:
```ts
export * as wordSim from './sims/word';
```

- [ ] **Step 5: Chạy test, xác nhận PASS**

Run: `npm test && npm run typecheck`
Expected: PASS toàn bộ (122 test cũ + 5 test mới).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(shared): ProseMirror document schema for the Word simulator" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

Cập nhật `STATUS.md` dòng Task 1 trước khi commit (đánh ☑ + mã commit sau khi commit xong thì amend hoặc ghi ở task sau — chọn cách nào cũng được, miễn là file phản ánh đúng).
