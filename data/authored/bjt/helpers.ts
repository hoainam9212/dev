import type { BjtItem, BjtMaterial, BjtPoint, BjtSection, BjtVocab, ListeningLine } from '@nihongo/shared';

/** [speaker, Japanese, Vietnamese] */
export type L = [speaker: string, ja: string, vi: string];
/** [prompt, four choices, index of the answer, explanation in Vietnamese] */
export type Q = [prompt: string, choices: string[], answer: number, explain: string];
/** [Japanese, reading in kana, Vietnamese] */
export type P = [ja: string, reading: string, vi: string];

export interface ItemInput {
  script?: L[];
  material?: BjtMaterial;
  spokenChoices?: boolean;
  questions: Q[];
  points?: P[];
}

/**
 * Build one exam item. The id is `bjt-<set>-<section>-<nn>`; `n` restarts at 1 for every set + section pair.
 * Example: `item('w03', 'goi', 1, { questions: [[…]] })`.
 */
export function item(set: string, section: BjtSection, n: number, input: ItemInput): BjtItem {
  const id = `bjt-${set}-${section}-${String(n).padStart(2, '0')}`;
  const out: BjtItem = {
    id,
    section,
    set,
    questions: input.questions.map(([prompt, choices, answer, explain], i) => ({ id: `${id}-q${i + 1}`, prompt, choices, answer, explain })),
  };
  if (input.script) out.script = input.script.map(([speaker, ja, vi]): ListeningLine => ({ speaker, ja, vi }));
  if (input.material) out.material = input.material;
  if (input.spokenChoices) out.spokenChoices = true;
  if (input.points) out.points = input.points.map(([ja, reading, vi]): BjtPoint => ({ ja, reading, vi }));
  return out;
}

/** Build the vocabulary of one week and theme. Rows: [Japanese, reading, Vietnamese, example?, example in Vietnamese?]. */
export function vocab(week: number, tag: string, slug: string, rows: [string, string, string, string?, string?][]): BjtVocab[] {
  return rows.map(([ja, reading, vi, exJa, exVi], i): BjtVocab => {
    const v: BjtVocab = { id: `bjtv-w${String(week).padStart(2, '0')}-${slug}-${String(i + 1).padStart(2, '0')}`, week, tag, ja, reading, vi };
    if (exJa && exVi) v.example = { ja: exJa, vi: exVi };
    return v;
  });
}
