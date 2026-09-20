# Task 7: `gradeWord` và đăng ký grader

Đọc `00-overview.md` trước. Task này không có giao diện.

**Files:**
- Create: `shared/src/sims/word/grade.ts`, `shared/src/sims/word/grade.test.ts`
- Modify: `shared/src/grading/index.ts`, `shared/src/sims/word/index.ts`

**Interfaces:**
- Consumes: `CheckResult` (`../../grading/core`); `WordState`, `plainText`, `marksOnText`, `blockOf`, `tableSizeOf`, `cellText`, `imagesOf`, `hasToc` (Task 1–6).
- Produces:
```ts
export type WordCheck =
  | { kind: 'textContains'; text: string }
  | { kind: 'textNotContains'; text: string }
  | { kind: 'markOnText'; text: string; mark: 'bold' | 'italic' | 'underline' | 'color' | 'fontFamily' | 'fontSize' | 'highlight'; value?: string }
  | { kind: 'paragraphAlign'; text: string; align: 'left' | 'center' | 'right' | 'justify' }
  | { kind: 'lineHeight'; text: string; value: '1' | '1.5' | '2' }
  | { kind: 'listType'; text: string; list: 'bullet' | 'ordered' }
  | { kind: 'headingLevel'; text: string; level: 1 | 2 | 3 }
  | { kind: 'tableSize'; rows: number; cols: number }
  | { kind: 'cellText'; row: number; col: number; text: string }
  | { kind: 'imageCount'; count: number }
  | { kind: 'hasToc' }
  | { kind: 'saved'; name?: string }
  | { kind: 'printed' };

export function gradeWord(s: WordState, c: WordCheck): CheckResult;
```
  và `GRADERS.word = gradeWord`.
- **Quy tắc thông báo:** mọi `messageVi` là một câu tiếng Việt nói rõ **thiếu gì**, không phải "sai rồi". So text không phân biệt hoa thường; `textContains` bỏ qua khoảng trắng thừa ở hai đầu.

- [ ] **Step 1: Viết test (FAIL trước)**

`shared/src/sims/word/grade.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { gradeWord } from './grade';
import { reduceWord, wordInitial, type WordAction, type WordState } from './state';

const run = (s: WordState, ...as: WordAction[]) => as.reduce(reduceWord, s);

describe('word grader', () => {
  it('checks text presence and absence', () => {
    const s = wordInitial({ text: 'Kính gửi Quý công ty' });
    expect(gradeWord(s, { kind: 'textContains', text: 'kính gửi' }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'textContains', text: 'Trân trọng' }).ok).toBe(false);
    expect(gradeWord(s, { kind: 'textNotContains', text: 'Trân trọng' }).ok).toBe(true);
  });

  it('explains what is missing in Vietnamese', () => {
    const r = gradeWord(wordInitial({ text: 'a' }), { kind: 'textContains', text: 'Trân trọng' });
    expect(r.messageVi).toMatch(/Trân trọng/);
  });

  it('checks a mark, with and without a value', () => {
    const s = run(wordInitial({ text: 'ĐƠN XIN VIỆC' }), { type: 'selectText', text: 'ĐƠN XIN VIỆC' },
      { type: 'toggleMark', mark: 'bold' }, { type: 'setStyle', attr: 'fontSize', value: '16pt' });
    expect(gradeWord(s, { kind: 'markOnText', text: 'ĐƠN XIN VIỆC', mark: 'bold' }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'markOnText', text: 'ĐƠN XIN VIỆC', mark: 'fontSize', value: '16pt' }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'markOnText', text: 'ĐƠN XIN VIỆC', mark: 'fontSize', value: '11pt' }).ok).toBe(false);
    expect(gradeWord(s, { kind: 'markOnText', text: 'ĐƠN XIN VIỆC', mark: 'italic' }).ok).toBe(false);
  });

  it('fails a mark check when the text is not in the document at all', () => {
    const r = gradeWord(wordInitial({ text: 'a' }), { kind: 'markOnText', text: 'không có', mark: 'bold' });
    expect(r.ok).toBe(false);
  });

  it('checks alignment, line height, list and heading', () => {
    const s = run(wordInitial({ text: 'Tiêu đề' }), { type: 'selectText', text: 'Tiêu đề' },
      { type: 'setAlign', align: 'center' }, { type: 'setLineHeight', value: '1.5' }, { type: 'setHeading', level: 1 });
    expect(gradeWord(s, { kind: 'paragraphAlign', text: 'Tiêu đề', align: 'center' }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'lineHeight', text: 'Tiêu đề', value: '1.5' }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'headingLevel', text: 'Tiêu đề', level: 1 }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'headingLevel', text: 'Tiêu đề', level: 2 }).ok).toBe(false);
    expect(gradeWord(s, { kind: 'listType', text: 'Tiêu đề', list: 'bullet' }).ok).toBe(false);
  });

  it('checks tables, cells and images', () => {
    const s = run(wordInitial(), { type: 'insertTable', rows: 3, cols: 2 }, { type: 'fillCell', row: 0, col: 0, text: 'Môn' },
      { type: 'insertImage', src: '/images/word/meo.svg', alt: 'Mèo' });
    expect(gradeWord(s, { kind: 'tableSize', rows: 3, cols: 2 }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'tableSize', rows: 4, cols: 2 }).ok).toBe(false);
    expect(gradeWord(s, { kind: 'cellText', row: 0, col: 0, text: 'môn' }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'imageCount', count: 1 }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'imageCount', count: 2 }).ok).toBe(false);
  });

  it('checks the table of contents, saving and printing', () => {
    let s = run(wordInitial({ text: 'Giới thiệu' }), { type: 'selectText', text: 'Giới thiệu' }, { type: 'setHeading', level: 1 }, { type: 'insertToc' });
    expect(gradeWord(s, { kind: 'hasToc' }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'saved' }).ok).toBe(false);
    s = run(s, { type: 'save', name: 'don.docx', at: 1 }, { type: 'print' });
    expect(gradeWord(s, { kind: 'saved', name: 'don.docx' }).ok).toBe(true);
    expect(gradeWord(s, { kind: 'saved', name: 'khac.docx' }).ok).toBe(false);
    expect(gradeWord(s, { kind: 'printed' }).ok).toBe(true);
  });
});
```

Thêm vào `shared/src/grading/grading.test.ts`, trong `describe('grade registry')`:
```ts
  it('registers the real word grader', () => {
    expect(GRADERS.word).toBeDefined();
  });
```

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `npm test -w shared -- grade`

- [ ] **Step 3: Viết code**

`shared/src/sims/word/grade.ts`: một `switch` trên `c.kind`, mỗi nhánh gọi đúng một hàm tra cứu đã có ở Task 1–6. Không viết lại logic duyệt doc ở đây.

`shared/src/grading/index.ts`: thêm `import { gradeWord } from '../sims/word/grade';` và `word: gradeWord,` vào `GRADERS`.

`shared/src/sims/word/index.ts`: thêm `export * from './grade';`.

- [ ] **Step 4: Chạy test, xác nhận PASS**

Run: `npm test && npm run typecheck`
Expected: PASS. Lưu ý `client/src/content/content.test.ts` vẫn PASS vì chưa có bài Word nào.

- [ ] **Step 5: Commit + STATUS**

```bash
git add -A
git commit -m "feat(shared): Word grader covering text, formatting, tables, images and TOC" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
