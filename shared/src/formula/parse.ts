import { lex, type Token } from './lex';

export type Ast =
  | { k: 'num'; v: number }
  | { k: 'str'; v: string }
  | { k: 'bool'; v: boolean }
  | { k: 'ref'; v: string }
  | { k: 'range'; v: string }
  | { k: 'bin'; op: string; l: Ast; r: Ast }
  | { k: 'neg'; e: Ast }
  | { k: 'pct'; e: Ast }
  | { k: 'call'; name: string; args: Ast[] };

export class ParseError extends Error {}

const COMPARE = ['=', '<>', '<', '>', '<=', '>='];

/**
 * Đệ quy đi xuống, mỗi mức ưu tiên một hàm. Thấp nhất là so sánh, cao nhất là
 * giá trị. `^` kết hợp PHẢI (`2^3^2` = 2^9) nên nhánh phải gọi lại chính nó.
 */
class Parser {
  private i = 0;
  constructor(private readonly ts: Token[]) {}

  parse(): Ast {
    const e = this.compare();
    if (this.i < this.ts.length) throw new ParseError('Còn thừa ký tự ở cuối công thức');
    return e;
  }

  private peek(): Token | undefined {
    return this.ts[this.i];
  }

  private eatOp(ops: string[]): string | null {
    const t = this.peek();
    if (t && t.t === 'op' && ops.includes(t.v)) { this.i++; return t.v; }
    return null;
  }

  private compare(): Ast {
    let l = this.concat();
    for (let op = this.eatOp(COMPARE); op; op = this.eatOp(COMPARE)) l = { k: 'bin', op, l, r: this.concat() };
    return l;
  }

  private concat(): Ast {
    let l = this.add();
    for (let op = this.eatOp(['&']); op; op = this.eatOp(['&'])) l = { k: 'bin', op, l, r: this.add() };
    return l;
  }

  private add(): Ast {
    let l = this.mul();
    for (let op = this.eatOp(['+', '-']); op; op = this.eatOp(['+', '-'])) l = { k: 'bin', op, l, r: this.mul() };
    return l;
  }

  private mul(): Ast {
    let l = this.unary();
    for (let op = this.eatOp(['*', '/']); op; op = this.eatOp(['*', '/'])) l = { k: 'bin', op, l, r: this.unary() };
    return l;
  }

  /** Dấu trừ một ngôi nằm DƯỚI luỹ thừa: `-2^2` là `-(2^2)`, đúng như Excel. */
  private unary(): Ast {
    if (this.eatOp(['-'])) return { k: 'neg', e: this.unary() };
    if (this.eatOp(['+'])) return this.unary();
    return this.power();
  }

  private power(): Ast {
    const base = this.percent();
    if (this.eatOp(['^'])) return { k: 'bin', op: '^', l: base, r: this.unary() };
    return base;
  }

  private percent(): Ast {
    let e = this.atom();
    while (this.eatOp(['%'])) e = { k: 'pct', e };
    return e;
  }

  private atom(): Ast {
    const t = this.peek();
    if (!t) throw new ParseError('Công thức còn dở');
    this.i++;
    switch (t.t) {
      case 'num': return { k: 'num', v: t.v };
      case 'str': return { k: 'str', v: t.v };
      case 'bool': return { k: 'bool', v: t.v };
      case 'ref': return { k: 'ref', v: t.v };
      case 'range': return { k: 'range', v: t.v };
      case 'lp': {
        const e = this.compare();
        if (this.peek()?.t !== 'rp') throw new ParseError('Thiếu dấu ngoặc đóng');
        this.i++;
        return e;
      }
      case 'name': {
        if (this.peek()?.t !== 'lp') return { k: 'call', name: t.v, args: [] };
        this.i++;
        const args: Ast[] = [];
        if (this.peek()?.t !== 'rp') {
          args.push(this.compare());
          while (this.peek()?.t === 'comma') { this.i++; args.push(this.compare()); }
        }
        if (this.peek()?.t !== 'rp') throw new ParseError('Thiếu dấu ngoặc đóng');
        this.i++;
        return { k: 'call', name: t.v, args };
      }
      default: throw new ParseError('Công thức sai cú pháp');
    }
  }
}

/** Nhận công thức KHÔNG có dấu `=` đứng đầu. */
export function parse(src: string): Ast {
  return new Parser(lex(src)).parse();
}
