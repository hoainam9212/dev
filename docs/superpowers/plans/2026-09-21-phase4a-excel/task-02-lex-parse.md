### Task 2: Token và cây cú pháp (`lex.ts`, `parse.ts`)

Đọc `00-overview.md` trước. Task 1 đã cho `parseRef`, `parseRange`, `Ref`, `Range`.

**Files:**
- Tạo: `shared/src/formula/lex.ts`, `shared/src/formula/parse.ts`, `shared/src/formula/parse.test.ts`
- Sửa: `shared/src/formula/index.ts`

**Interfaces — Produces:**

```ts
export type Token =
  | { t: 'num'; v: number } | { t: 'str'; v: string } | { t: 'bool'; v: boolean }
  | { t: 'ref'; v: string }        // chữ thô, ví dụ '$A$1' hoặc 'Sheet2!B2'
  | { t: 'range'; v: string }      // 'B2:B10'
  | { t: 'name'; v: string }       // tên hàm, đã viết HOA
  | { t: 'op'; v: string }         // + - * / ^ & = <> < > <= >= %
  | { t: 'lp' } | { t: 'rp' } | { t: 'comma' };
export function lex(src: string): Token[];        // ném LexError khi gặp ký tự lạ

export type Ast =
  | { k: 'num'; v: number } | { k: 'str'; v: string } | { k: 'bool'; v: boolean }
  | { k: 'ref'; v: string } | { k: 'range'; v: string }
  | { k: 'bin'; op: string; l: Ast; r: Ast }
  | { k: 'neg'; e: Ast } | { k: 'pct'; e: Ast }
  | { k: 'call'; name: string; args: Ast[] };
/** Nhận công thức KHÔNG có dấu = đứng đầu. Ném ParseError khi cú pháp sai. */
export function parse(src: string): Ast;
export class LexError extends Error {}
export class ParseError extends Error {}
```

Ưu tiên toán tử, thấp → cao: so sánh (`= <> < > <= >=`) → `&` → `+ -` → `* /` → `^` → dấu trừ một ngôi → `%` hậu tố → ngoặc/hàm/giá trị. `^` kết hợp phải (`2^3^2` = 2^9).

Trình tính (Task 3) là nơi duy nhất biết `CellSource`; ở đây chỉ có chữ.

- [ ] **Step 1: Viết test FAIL** — `shared/src/formula/parse.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { lex } from './lex';
import { ParseError, parse } from './parse';

describe('tách token', () => {
  it('nhận số, chuỗi, địa chỉ, vùng và tên hàm', () => {
    expect(lex('SUM(B2:B10)')).toEqual([
      { t: 'name', v: 'SUM' }, { t: 'lp' }, { t: 'range', v: 'B2:B10' }, { t: 'rp' },
    ]);
    expect(lex('1,5')).toEqual([{ t: 'num', v: 1 }, { t: 'comma' }, { t: 'num', v: 5 }]);
    expect(lex('"xin chào"')).toEqual([{ t: 'str', v: 'xin chào' }]);
    expect(lex('$A$1')).toEqual([{ t: 'ref', v: '$A$1' }]);
    expect(lex('TRUE')).toEqual([{ t: 'bool', v: true }]);
  });

  it('nhận toán tử hai ký tự', () => {
    expect(lex('1<=2')).toEqual([{ t: 'num', v: 1 }, { t: 'op', v: '<=' }, { t: 'num', v: 2 }]);
    expect(lex('1<>2')).toEqual([{ t: 'num', v: 1 }, { t: 'op', v: '<>' }, { t: 'num', v: 2 }]);
  });

  it('bỏ qua khoảng trắng', () => {
    expect(lex('  1 +  2 ')).toEqual([{ t: 'num', v: 1 }, { t: 'op', v: '+' }, { t: 'num', v: 2 }]);
  });
});

describe('dựng cây cú pháp', () => {
  it('nhân chia trước cộng trừ', () => {
    expect(parse('1+2*3')).toEqual({
      k: 'bin', op: '+', l: { k: 'num', v: 1 },
      r: { k: 'bin', op: '*', l: { k: 'num', v: 2 }, r: { k: 'num', v: 3 } },
    });
  });

  it('ngoặc thắng ưu tiên', () => {
    expect(parse('(1+2)*3')).toEqual({
      k: 'bin', op: '*',
      l: { k: 'bin', op: '+', l: { k: 'num', v: 1 }, r: { k: 'num', v: 2 } },
      r: { k: 'num', v: 3 },
    });
  });

  it('luỹ thừa kết hợp phải và trên cả dấu trừ một ngôi', () => {
    expect(parse('2^3^2')).toEqual({
      k: 'bin', op: '^', l: { k: 'num', v: 2 },
      r: { k: 'bin', op: '^', l: { k: 'num', v: 3 }, r: { k: 'num', v: 2 } },
    });
    expect(parse('-2^2')).toEqual({ k: 'neg', e: { k: 'bin', op: '^', l: { k: 'num', v: 2 }, r: { k: 'num', v: 2 } } });
  });

  it('so sánh đứng ngoài cùng, nối chuỗi ở trong', () => {
    expect(parse('A1&"x"=B1')).toEqual({
      k: 'bin', op: '=',
      l: { k: 'bin', op: '&', l: { k: 'ref', v: 'A1' }, r: { k: 'str', v: 'x' } },
      r: { k: 'ref', v: 'B1' },
    });
  });

  it('đọc phần trăm hậu tố', () => {
    expect(parse('20%')).toEqual({ k: 'pct', e: { k: 'num', v: 20 } });
  });

  it('đọc hàm nhiều đối số và hàm lồng nhau', () => {
    expect(parse('IF(A1>5,SUM(B1:B3),0)')).toEqual({
      k: 'call', name: 'IF', args: [
        { k: 'bin', op: '>', l: { k: 'ref', v: 'A1' }, r: { k: 'num', v: 5 } },
        { k: 'call', name: 'SUM', args: [{ k: 'range', v: 'B1:B3' }] },
        { k: 'num', v: 0 },
      ],
    });
  });

  it('đọc hàm không đối số', () => {
    expect(parse('TODAY()')).toEqual({ k: 'call', name: 'TODAY', args: [] });
  });

  it('báo lỗi khi thiếu ngoặc đóng hoặc thừa toán tử', () => {
    expect(() => parse('SUM(A1')).toThrow(ParseError);
    expect(() => parse('1+')).toThrow(ParseError);
    expect(() => parse('')).toThrow(ParseError);
  });
});
```

- [ ] **Step 2: Chạy, xác nhận FAIL** — `npm test -w shared -- parse`

- [ ] **Step 3: Viết `lex.ts` rồi `parse.ts`**

Chỗ dễ sai: `lex` phải thử **vùng trước ô** (`B2:B10` chứ không phải `B2`, `:`, `B10`); `TRUE`/`FALSE` nhận trước khi coi là tên; một tên chỉ là `name` khi ngay sau nó có `(`, còn lại thì thử `parseRef` — nếu không phải địa chỉ thì vẫn cứ trả `name` để Task 3 có cái mà trả `#NAME?`. `parse` viết kiểu đệ quy đi xuống, mỗi mức ưu tiên một hàm.

- [ ] **Step 4: Chạy, xác nhận PASS** — `npm test -w shared -- parse`, rồi `npm test -w shared && npm run typecheck`

- [ ] **Step 5: Commit**

```bash
git add shared/src/formula docs/superpowers/plans/2026-09-21-phase4a-excel/STATUS.md
git commit -m "feat(formula): tokenizer and expression parser" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
