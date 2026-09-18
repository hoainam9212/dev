const ROMAJI: Record<string, string> = {
  a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お',
  ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ',
  sa: 'さ', shi: 'し', si: 'し', su: 'す', se: 'せ', so: 'そ',
  ta: 'た', chi: 'ち', ti: 'ち', tsu: 'つ', tu: 'つ', te: 'て', to: 'と',
  na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の',
  ha: 'は', hi: 'ひ', fu: 'ふ', hu: 'ふ', he: 'へ', ho: 'ほ',
  ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も',
  ya: 'や', yu: 'ゆ', yo: 'よ',
  ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ',
  wa: 'わ', wo: 'を', n: 'ん', nn: 'ん',
  ga: 'が', gi: 'ぎ', gu: 'ぐ', ge: 'げ', go: 'ご',
  za: 'ざ', ji: 'じ', zi: 'じ', zu: 'ず', ze: 'ぜ', zo: 'ぞ',
  da: 'だ', di: 'ぢ', du: 'づ', de: 'で', do: 'ど',
  ba: 'ば', bi: 'び', bu: 'ぶ', be: 'べ', bo: 'ぼ',
  pa: 'ぱ', pi: 'ぴ', pu: 'ぷ', pe: 'ぺ', po: 'ぽ',
  kya: 'きゃ', kyu: 'きゅ', kyo: 'きょ',
  sha: 'しゃ', shu: 'しゅ', sho: 'しょ', sya: 'しゃ', syu: 'しゅ', syo: 'しょ',
  cha: 'ちゃ', chu: 'ちゅ', cho: 'ちょ', tya: 'ちゃ', tyu: 'ちゅ', tyo: 'ちょ',
  nya: 'にゃ', nyu: 'にゅ', nyo: 'にょ',
  hya: 'ひゃ', hyu: 'ひゅ', hyo: 'ひょ',
  mya: 'みゃ', myu: 'みゅ', myo: 'みょ',
  rya: 'りゃ', ryu: 'りゅ', ryo: 'りょ',
  gya: 'ぎゃ', gyu: 'ぎゅ', gyo: 'ぎょ',
  ja: 'じゃ', ju: 'じゅ', jo: 'じょ', jya: 'じゃ', jyu: 'じゅ', jyo: 'じょ',
  bya: 'びゃ', byu: 'びゅ', byo: 'びょ',
  pya: 'ぴゃ', pyu: 'ぴゅ', pyo: 'ぴょ',
  fa: 'ふぁ', fi: 'ふぃ', fe: 'ふぇ', fo: 'ふぉ',
  va: 'ゔぁ', vi: 'ゔぃ', vu: 'ゔ', ve: 'ゔぇ', vo: 'ゔぉ',
  '-': 'ー',
};

const VOWELS = new Set(['a', 'i', 'u', 'e', 'o']);
const CONSONANTS = 'bcdfghjklmnpqrstvwxyz';

/** Katakana ァ(30A1)..ヶ(30F6) → Hiragana ぁ(3041)..ゖ(3096); other chars unchanged. */
export function toHiragana(s: string): string {
  let out = '';
  for (const ch of s) {
    const c = ch.codePointAt(0)!;
    if (c >= 0x30a1 && c <= 0x30f6) out += String.fromCodePoint(c - 0x60);
    else out += ch;
  }
  return out;
}

export function toKatakana(s: string): string {
  let out = '';
  for (const ch of s) {
    const c = ch.codePointAt(0)!;
    if (c >= 0x3041 && c <= 0x3096) out += String.fromCodePoint(c + 0x60);
    else out += ch;
  }
  return out;
}

export function romajiToHiragana(input: string): string {
  const s = input.toLowerCase();
  let out = '';
  let i = 0;
  while (i < s.length) {
    const c = s[i]!;
    const next = s[i + 1];

    // apostrophe separates n from a following vowel: kin'en
    if (c === "'") {
      i += 1;
      continue;
    }

    // sokuon: doubled consonant (not n), or "tch" as in matcha
    if (CONSONANTS.includes(c) && c !== 'n' && next === c) {
      out += 'っ';
      i += 1;
      continue;
    }
    if (c === 't' && next === 'c' && s[i + 2] === 'h') {
      out += 'っ';
      i += 1;
      continue;
    }

    // syllabic n: "nn", or "n" followed by a consonant (not y) or end of input
    if (c === 'n') {
      if (next === 'n') {
        // "konnichiha" → こん + にちは ; a bare "nn" (IME style) → ん
        const after = s[i + 2];
        const secondNStartsSyllable = after !== undefined && (VOWELS.has(after) || after === 'y');
        out += 'ん';
        i += secondNStartsSyllable ? 1 : 2;
        continue;
      }
      if (next === undefined || (!VOWELS.has(next) && next !== 'y')) {
        out += 'ん';
        i += 1;
        continue;
      }
    }

    // longest match 3, 2, 1
    let matched = false;
    for (const len of [3, 2, 1]) {
      const piece = s.slice(i, i + len);
      if (piece.length !== len) continue;
      const kana = ROMAJI[piece];
      if (kana !== undefined) {
        out += kana;
        i += len;
        matched = true;
        break;
      }
    }
    if (!matched) {
      out += c;
      i += 1;
    }
  }
  return out;
}

const STRIP = /[\s　。、．，,.!?！？「」『』（）()–—~〜・…:;"'“”‘’]/g;

/** NFKC → strip spaces/punctuation → katakana→hiragana → romaji→hiragana. Keeps ー. */
export function normalizeKana(s: string): string {
  let t = s.normalize('NFKC');
  t = t.replace(STRIP, '');
  t = toHiragana(t);
  if (/[a-zA-Z]/.test(t)) t = romajiToHiragana(t);
  return t;
}

export function isKana(s: string): boolean {
  return s.length > 0 && /^[ぁ-ゖァ-ヶー]+$/.test(s);
}

export function hasKanji(s: string): boolean {
  return /[一-龯㐀-䶿]/.test(s);
}
