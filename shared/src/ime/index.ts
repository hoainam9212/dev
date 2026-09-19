export type ImeMethod = 'telex' | 'vni';
export interface Letter {
  ch: string;
  up: boolean;
  /** ư sinh ra từ phím w đứng một mình (gõ w lần nữa → w). */
  fromW?: boolean;
}
export interface ImeWord {
  letters: Letter[];
  tone: number;
}
export interface ImeState {
  done: string;
  word: ImeWord;
}

/** Nguyên âm → 6 dạng: không dấu, sắc, huyền, hỏi, ngã, nặng. */
const TONE_TABLE: Record<string, string> = {
  a: 'aáàảãạ', ă: 'ăắằẳẵặ', â: 'âấầẩẫậ', e: 'eéèẻẽẹ', ê: 'êếềểễệ', i: 'iíìỉĩị',
  o: 'oóòỏõọ', ô: 'ôốồổỗộ', ơ: 'ơớờởỡợ', u: 'uúùủũụ', ư: 'ưứừửữự', y: 'yýỳỷỹỵ',
};
const MODIFIED = 'ăâêôơư';

export const emptyWord = (): ImeWord => ({ letters: [], tone: 0 });
export const emptyIme = (): ImeState => ({ done: '', word: emptyWord() });

const isVowel = (ch: string) => ch in TONE_TABLE;
const hasVowel = (w: ImeWord) => w.letters.some((l) => isVowel(l.ch));

function nucleus(ls: Letter[]): number[] {
  let start = ls.findIndex((l) => isVowel(l.ch));
  if (start < 0) return [];
  let end = start;
  while (end + 1 < ls.length && isVowel(ls[end + 1]!.ch)) end++;
  if (start > 0 && end > start) {
    const prev = ls[start - 1]!.ch;
    const first = ls[start]!.ch;
    if ((prev === 'q' && first === 'u') || (prev === 'g' && first === 'i')) start++;
  }
  const idx: number[] = [];
  for (let i = start; i <= end; i++) idx.push(i);
  return idx;
}

export function tonePosition(ls: Letter[]): number {
  const idx = nucleus(ls);
  if (!idx.length) return -1;
  const modified = idx.filter((i) => MODIFIED.includes(ls[i]!.ch));
  if (modified.length) return modified[modified.length - 1]!;
  if (idx.length === 1) return idx[0]!;
  const last = idx[idx.length - 1]!;
  if (last < ls.length - 1) return last;
  if (idx.length === 2) {
    const pair = ls[idx[0]!]!.ch + ls[idx[1]!]!.ch;
    return ['oa', 'oe', 'uy'].includes(pair) ? idx[1]! : idx[0]!;
  }
  return idx[1]!;
}

export function renderWord(w: ImeWord): string {
  const pos = w.tone ? tonePosition(w.letters) : -1;
  return w.letters
    .map((l, i) => {
      let ch = l.ch;
      if (i === pos) {
        const row = TONE_TABLE[ch];
        if (row) ch = [...row][w.tone] ?? ch;
      }
      return l.up ? ch.toUpperCase() : ch;
    })
    .join('');
}

function append(w: ImeWord, l: Letter): ImeWord {
  return { ...w, letters: [...w.letters, l] };
}

function setCh(w: ImeWord, i: number, ch: string): ImeWord {
  return { ...w, letters: w.letters.map((l, j) => (j === i ? { ch, up: l.up } : l)) };
}

function setTone(w: ImeWord, tone: number, lit: Letter): ImeWord {
  if (w.tone === tone) return append({ ...w, tone: 0 }, lit);
  return { ...w, tone };
}

/** Sửa chữ cuối cùng khớp `map`; nếu gặp chữ đã sửa (`revert`) trước thì trả lại chữ gốc và thêm phím gõ. */
function modifyLast(w: ImeWord, map: Record<string, string>, revert: Record<string, string>, lit: Letter): ImeWord | null {
  for (let i = w.letters.length - 1; i >= 0; i--) {
    const ch = w.letters[i]!.ch;
    const back = revert[ch];
    if (back !== undefined) return append(setCh(w, i, back), lit);
    const to = map[ch];
    if (to !== undefined) return setCh(w, i, to);
  }
  return null;
}

function hornPair(w: ImeWord, lit: Letter): ImeWord | null {
  for (let i = w.letters.length - 2; i >= 0; i--) {
    const a = w.letters[i]!.ch;
    const b = w.letters[i + 1]!.ch;
    if ((a === 'u' || a === 'ư') && (b === 'o' || b === 'ô' || b === 'ơ')) {
      if (a === 'ư' && b === 'ơ') return append(setCh(setCh(w, i, 'u'), i + 1, 'o'), lit);
      return setCh(setCh(w, i, 'ư'), i + 1, 'ơ');
    }
  }
  return null;
}

const HORN: Record<string, string> = { a: 'ă', â: 'ă', o: 'ơ', ô: 'ơ', u: 'ư' };
const UNHORN: Record<string, string> = { ă: 'a', ơ: 'o', ư: 'u' };

function telexW(w: ImeWord, lit: Letter): ImeWord {
  const pair = hornPair(w, lit);
  if (pair) return pair;
  for (let i = w.letters.length - 1; i >= 0; i--) {
    const l = w.letters[i]!;
    const back = UNHORN[l.ch];
    if (back !== undefined) {
      if (l.fromW) return { ...w, letters: w.letters.map((x, j) => (j === i ? { ch: 'w', up: x.up } : x)) };
      return append(setCh(w, i, back), lit);
    }
    const to = HORN[l.ch];
    if (to !== undefined) return setCh(w, i, to);
  }
  return append(w, { ch: 'ư', up: lit.up, fromW: true });
}

const TELEX_TONES: Record<string, number> = { s: 1, f: 2, r: 3, x: 4, j: 5 };

function telexKey(w: ImeWord, k: string, lit: Letter): ImeWord | null {
  const tone = TELEX_TONES[k];
  if (tone !== undefined && hasVowel(w)) return setTone(w, tone, lit);
  if (k === 'z' && w.tone) return { ...w, tone: 0 };
  switch (k) {
    case 'a':
      return modifyLast(w, { a: 'â', ă: 'â' }, { â: 'a' }, lit);
    case 'e':
      return modifyLast(w, { e: 'ê' }, { ê: 'e' }, lit);
    case 'o':
      return modifyLast(w, { o: 'ô', ơ: 'ô' }, { ô: 'o' }, lit);
    case 'd':
      return modifyLast(w, { d: 'đ' }, { đ: 'd' }, lit);
    case 'w':
      return telexW(w, lit);
    default:
      return null;
  }
}

function vniKey(w: ImeWord, k: string, lit: Letter): ImeWord | null {
  if ('12345'.includes(k) && hasVowel(w)) return setTone(w, Number(k), lit);
  if (k === '0' && w.tone) return { ...w, tone: 0 };
  switch (k) {
    case '6':
      return modifyLast(w, { a: 'â', ă: 'â', e: 'ê', o: 'ô', ơ: 'ô' }, { â: 'a', ê: 'e', ô: 'o' }, lit);
    case '7':
      return hornPair(w, lit) ?? modifyLast(w, { o: 'ơ', ô: 'ơ', u: 'ư' }, { ơ: 'o', ư: 'u' }, lit);
    case '8':
      return modifyLast(w, { a: 'ă', â: 'ă' }, { ă: 'a' }, lit);
    case '9':
      return modifyLast(w, { d: 'đ' }, { đ: 'd' }, lit);
    default:
      return null;
  }
}

export function pressKey(w: ImeWord, key: string, method: ImeMethod): ImeWord {
  const k = key.toLowerCase();
  const lit: Letter = { ch: k, up: key !== k };
  const r = method === 'telex' ? telexKey(w, k, lit) : vniKey(w, k, lit);
  return r ?? append(w, lit);
}

function isWordKey(key: string, method: ImeMethod, w: ImeWord): boolean {
  if (/^[a-z]$/i.test(key)) return true;
  return method === 'vni' && /^[0-9]$/.test(key) && w.letters.some((l) => /[a-zăâêôơưđ]/.test(l.ch));
}

export function imeBackspace(s: ImeState): ImeState {
  if (s.word.letters.length) {
    const letters = s.word.letters.slice(0, -1);
    const tone = tonePosition(letters) >= 0 ? s.word.tone : 0;
    return { ...s, word: { letters, tone } };
  }
  return { ...s, done: [...s.done].slice(0, -1).join('') };
}

export function imeInput(s: ImeState, key: string, method: ImeMethod): ImeState {
  if (key === '\b' || key === 'Backspace') return imeBackspace(s);
  if ([...key].length !== 1) return s;
  if (isWordKey(key, method, s.word)) return { ...s, word: pressKey(s.word, key, method) };
  return { done: s.done + renderWord(s.word) + key, word: emptyWord() };
}

export function imeText(s: ImeState): string {
  return s.done + renderWord(s.word);
}

export function typeKeys(keys: string, method: ImeMethod): string {
  return imeText([...keys].reduce((s, k) => imeInput(s, k, method), emptyIme()));
}
