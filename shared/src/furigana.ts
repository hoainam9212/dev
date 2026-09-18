export interface FuriSeg {
  text: string;
  ruby?: string;
}

const TOKEN = /\[([^\]|]+)\|([^\]]+)\]/g;

/** "[漢字|かんじ]を読む" → [{text:'漢字', ruby:'かんじ'}, {text:'を読む'}] */
export function parseFurigana(s: string): FuriSeg[] {
  const out: FuriSeg[] = [];
  let last = 0;
  for (const m of s.matchAll(TOKEN)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push({ text: s.slice(last, idx) });
    out.push({ text: m[1]!, ruby: m[2]! });
    last = idx + m[0].length;
  }
  if (last < s.length) out.push({ text: s.slice(last) });
  return out;
}

/** Remove the markup, keeping base text: "漢字を読む". */
export function stripFurigana(s: string): string {
  return s.replace(TOKEN, '$1');
}

/** Replace bases with their readings: "かんじを読む". */
export function furiganaToKana(s: string): string {
  return s.replace(TOKEN, '$2');
}
