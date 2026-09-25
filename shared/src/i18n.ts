import type { Grammar, GrammarExample, KanaChar, Kanji, Sentence, Vocab } from './types';

export type Lang = 'vi' | 'en';

/** The text in the selected language, falling back to the other one when it is missing or empty. */
export function pickText(vi: string | undefined, en: string | undefined, lang: Lang): string {
  const [first, second] = lang === 'vi' ? [vi, en] : [en, vi];
  return first || second || '';
}

/** Like pickText for lists: an empty list counts as missing. */
export function pickList(vi: string[] | undefined, en: string[] | undefined, lang: Lang): string[] {
  const [first, second] = lang === 'vi' ? [vi, en] : [en, vi];
  if (first && first.length) return first;
  return second ?? [];
}

export const vocabMeanings = (v: Vocab, lang: Lang) => pickList(v.meaningsVi, v.meanings, lang);
export const kanjiMeanings = (k: Kanji, lang: Lang) => pickList(k.meaningsVi, k.meanings, lang);
export const grammarMeaning = (g: Grammar, lang: Lang) => pickText(g.meaningVi, g.meaning, lang);
export const exampleTranslation = (e: GrammarExample, lang: Lang) => pickText(e.vi, e.en, lang);
export const sentenceTranslation = (s: Sentence, lang: Lang) => pickText(s.vi, s.en, lang);
export const kanaMnemonic = (c: KanaChar, lang: Lang) => pickText(c.mnemonic, c.mnemonicEn, lang);
