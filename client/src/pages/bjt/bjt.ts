import { BJT_PARTS, BJT_SECTIONS, bjtPartOf, type BjtItem, type BjtQuestion, type BjtSection } from '@nihongo/shared';

/** One screen of a run: a question together with the item it belongs to. */
export interface Step {
  item: BjtItem;
  q: BjtQuestion;
  /** True on the first question of an item: the recording plays here. */
  first: boolean;
}

const sectionIndex = (s: BjtSection) => BJT_SECTIONS.findIndex((x) => x.id === s);

/** Items in exam order (聴解 → 聴読解 → 読解, section by section); order inside a section is kept. */
export function examOrder(items: BjtItem[]): BjtItem[] {
  return items
    .map((item, i) => ({ item, i }))
    .sort((a, b) => sectionIndex(a.item.section) - sectionIndex(b.item.section) || a.i - b.i)
    .map((x) => x.item);
}

export function toSteps(items: BjtItem[]): Step[] {
  return items.flatMap((item) => item.questions.map((q, i) => ({ item, q, first: i === 0 })));
}

export const questionCount = (items: BjtItem[]) => items.reduce((n, x) => n + x.questions.length, 0);

/** What the recording says: the script, then the numbered choices when they are heard and not printed. */
export function audioLines(item: BjtItem): string[] {
  const lines = (item.script ?? []).map((l) => l.ja);
  if (item.spokenChoices) item.questions[0]!.choices.forEach((c, i) => lines.push(`${i + 1}番。${c}`));
  return lines;
}

export interface SectionStat {
  section: BjtSection;
  ja: string;
  correct: number;
  total: number;
}

/** Correct / total per section, in exam order, for the sections that appear in `steps`. */
export function sectionStats(steps: Step[], results: Record<string, boolean>): SectionStat[] {
  return BJT_SECTIONS.map((s) => {
    const mine = steps.filter((st) => st.item.section === s.id);
    return { section: s.id, ja: s.ja, total: mine.length, correct: mine.filter((st) => results[st.q.id]).length };
  }).filter((s) => s.total > 0);
}

/**
 * Items for a practice round of about `max` questions: never-answered items first, then items
 * with a wrong answer, then the rest. Order inside each group is kept, so a round is repeatable.
 */
export function pickPractice(items: BjtItem[], answers: Record<string, boolean>, max = 10): BjtItem[] {
  const rank = (x: BjtItem) => {
    const seen = x.questions.filter((q) => q.id in answers);
    if (seen.length < x.questions.length) return 0;
    return seen.every((q) => answers[q.id]) ? 2 : 1;
  };
  const sorted = items.map((item, i) => ({ item, i, r: rank(item) })).sort((a, b) => a.r - b.r || a.i - b.i);
  const out: BjtItem[] = [];
  let n = 0;
  for (const { item } of sorted) {
    if (n >= max) break;
    out.push(item);
    n += item.questions.length;
  }
  return out;
}

/** Time allowed for a timed run: each part's real time scaled by how many of its questions are present. */
export function examSeconds(items: BjtItem[]): number {
  let seconds = 0;
  for (const p of BJT_PARTS) {
    const real = BJT_SECTIONS.filter((s) => s.part === p.id).reduce((n, s) => n + s.count, 0);
    const have = questionCount(items.filter((x) => bjtPartOf(x.section) === p.id));
    seconds += (p.minutes * 60 * have) / real;
  }
  return Math.max(60, Math.round(seconds / 60) * 60);
}

/** Week 1–16 of the plan for `today`, given the day the learner started (YYYY-MM-DD); null before the start. */
export function currentWeek(startDate: string | null, today = new Date()): number | null {
  if (!startDate) return null;
  const start = new Date(`${startDate}T00:00:00`);
  const days = Math.floor((today.getTime() - start.getTime()) / 86_400_000);
  if (Number.isNaN(days) || days < 0) return null;
  return Math.min(16, Math.floor(days / 7) + 1);
}

export const weekSet = (week: number) => `w${String(week).padStart(2, '0')}`;

export function clock(seconds: number): string {
  const s = Math.max(0, seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
