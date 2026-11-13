export type Level = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
export const LEVELS: Level[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

export interface Vocab {
  id: string;
  level: Level;
  word: string;
  reading: string;
  meanings: string[];
  /** Vietnamese meanings (added by a later translation phase). */
  meaningsVi?: string[];
  tags: string[];
  kanji: string[];
  sentenceIds: string[];
}

export interface Kanji {
  id: string;
  char: string;
  level: Level;
  strokes: number;
  meanings: string[];
  /** Vietnamese meanings (added by a later translation phase). */
  meaningsVi?: string[];
  /** Sino-Vietnamese reading, e.g. 学 → "Học". */
  hanViet?: string;
  on: string[];
  kun: string[];
  grade?: number;
  freq?: number;
  strokePaths: string[];
  /** Where to draw each stroke's order number, laid out so labels don't cover each other. */
  strokeNumbers?: [number, number][];
  vocabIds: string[];
}

export interface GrammarExample {
  ja: string;
  romaji: string;
  en: string;
  vi?: string;
}

export interface Grammar {
  id: string;
  level: Level;
  title: string;
  meaning: string;
  meaningVi?: string;
  formation: string;
  examples: GrammarExample[];
}

export interface Sentence {
  id: string;
  level: Level;
  ja: string;
  en: string;
  vi?: string;
}

export interface Question {
  id: string;
  prompt: string;
  choices: string[];
  answer: number;
  explain?: string;
  explainEn?: string;
}

export interface ReadingLesson {
  id: string;
  level: Level;
  title: string;
  /** Theme shown as a filter chip (Vietnamese), e.g. "Công nghệ". */
  topic?: string;
  body: string;
  vocab: { word: string; reading: string; vi: string; en?: string }[];
  questions: Question[];
}

export interface ListeningLine {
  speaker: string;
  ja: string;
  vi: string;
  en?: string;
}

export interface ListeningLesson {
  id: string;
  level: Level;
  title: string;
  script: ListeningLine[];
  questions: Question[];
  dictation: string[];
}

export type BusinessCategory = string;

export interface BusinessItem {
  id: string;
  ja: string;
  reading: string;
  vi: string;
  en?: string;
  note?: string;
  category: BusinessCategory;
  keigo?: { sonkei?: string; kenjou?: string; teinei?: string };
  /** Example sentence (glossary terms). */
  example?: { ja: string; vi: string; en?: string };
  /** The blunt/inappropriate way to say it (rephrase topics); `ja` is the recommended wording. */
  ng?: string;
}

export interface ScenarioLine {
  /** true = the learner's line (spoken in roleplay). */
  me: boolean;
  ja: string;
  vi: string;
  en?: string;
}

export interface BusinessScenario {
  id: string;
  title: string;
  /** Situation description in Vietnamese. */
  situation: string;
  roles: { me: string; other: string };
  lines: ScenarioLine[];
  /** Key takeaways in Vietnamese. */
  points: string[];
}

export type BusinessKind = 'keigo' | 'email' | 'phrases' | 'glossary' | 'rephrase' | 'scenarios';
export type BusinessGroup = 'basic' | 'it';

export interface BusinessTopic {
  id: string;
  title: string;
  intro: string;
  group?: BusinessGroup;
  kind?: BusinessKind;
  items: BusinessItem[];
  scenarios?: BusinessScenario[];
}

/** Kind of a topic, inferring it for older bundles without `kind`. */
export function topicKind(t: Pick<BusinessTopic, 'id' | 'kind'>): BusinessKind {
  if (t.kind) return t.kind;
  if (t.id === 'keigo') return 'keigo';
  if (t.id === 'email') return 'email';
  return 'phrases';
}

export type ItemType = 'vocab' | 'kanji' | 'grammar';

export interface ProgressItem {
  itemId: string;
  type: ItemType;
  ease: number;
  interval: number;
  due: string;
  reps: number;
  lapses: number;
  updatedAt: string;
}

export interface KanaChar {
  kana: string;
  romaji: string;
  row: string;
  group: 'basic' | 'dakuten' | 'yoon';
  mnemonic?: string;
  mnemonicEn?: string;
  strokePaths: string[];
  /** Order-number position per stroke, each in its own character's cell. */
  strokeNumbers?: [number, number][];
  /** Strokes per character for multi-character kana (yōon), e.g. きゃ → [4, 3]; each character gets its own cell. */
  strokeSplit?: number[];
}

export interface KanaBundle {
  hiragana: KanaChar[];
  katakana: KanaChar[];
}

export interface ContentIndex {
  builtAt: string;
  counts: Record<string, Partial<Record<Level, number>>>;
}

// ---------------- BJT (ビジネス日本語能力テスト) ----------------

export type BjtPart = 'chokai' | 'chodokkai' | 'dokkai';
export type BjtSection =
  | 'bamen'
  | 'hatsugen'
  | 'sogo-chokai'
  | 'jokyo'
  | 'shiryo'
  | 'sogo-chodokkai'
  | 'goi'
  | 'hyogen'
  | 'sogo-dokkai';

/** The nine section types in exam order, with the number of questions each has in the real test (80 in total). */
export const BJT_SECTIONS: { id: BjtSection; part: BjtPart; ja: string; count: number }[] = [
  { id: 'bamen', part: 'chokai', ja: '場面把握', count: 5 },
  { id: 'hatsugen', part: 'chokai', ja: '発言聴解', count: 10 },
  { id: 'sogo-chokai', part: 'chokai', ja: '総合聴解', count: 10 },
  { id: 'jokyo', part: 'chodokkai', ja: '状況把握', count: 5 },
  { id: 'shiryo', part: 'chodokkai', ja: '資料聴読解', count: 10 },
  { id: 'sogo-chodokkai', part: 'chodokkai', ja: '総合聴読解', count: 10 },
  { id: 'goi', part: 'dokkai', ja: '語彙・文法', count: 10 },
  { id: 'hyogen', part: 'dokkai', ja: '表現読解', count: 10 },
  { id: 'sogo-dokkai', part: 'dokkai', ja: '総合読解', count: 10 },
];
export const BJT_PARTS: { id: BjtPart; ja: string; minutes: number }[] = [
  { id: 'chokai', ja: '聴解', minutes: 45 },
  { id: 'chodokkai', ja: '聴読解', minutes: 30 },
  { id: 'dokkai', ja: '読解', minutes: 30 },
];
export const bjtPartOf = (s: BjtSection): BjtPart => BJT_SECTIONS.find((x) => x.id === s)!.part;

/** What the learner looks at: the photo of the real test is replaced by a description (`scene`). */
export type BjtMaterial =
  | { kind: 'scene'; vi: string }
  | { kind: 'text'; title?: string; body: string }
  | { kind: 'table'; title?: string; head: string[]; rows: string[][]; note?: string }
  | { kind: 'bars'; title?: string; unit?: string; labels: string[]; series: { name: string; values: number[] }[] };

export interface BjtQuestion {
  id: string;
  prompt: string;
  choices: string[];
  answer: number;
  /** Why the answer is right and why the tempting ones are wrong (Vietnamese). */
  explain: string;
}

export interface BjtPoint {
  ja: string;
  reading: string;
  vi: string;
}

/** One exam item: an optional recording and/or material, then one or more questions on it. */
export interface BjtItem {
  id: string;
  section: BjtSection;
  /** `demo`, `w01`…`w16` (weekly practice) or `mock1`…`mock3` (full tests). */
  set: string;
  script?: ListeningLine[];
  material?: BjtMaterial;
  /** The choices are heard, not printed (場面把握 / 発言聴解 in the real test). */
  spokenChoices?: boolean;
  questions: BjtQuestion[];
  /** Words and expressions worth keeping from this item. */
  points?: BjtPoint[];
}

export interface BjtVocab {
  id: string;
  week: number;
  /** Theme label (Vietnamese), e.g. "Điện thoại". */
  tag: string;
  ja: string;
  reading: string;
  vi: string;
  example?: { ja: string; vi: string };
}

export interface BjtWeek {
  week: number;
  title: string;
  goal: string;
  focus: BjtSection[];
  tasks: string[];
  /** Set id of the full test taken this week, if any. */
  mock?: string;
}

export interface BjtGuide {
  section: BjtSection;
  what: string;
  how: string[];
  traps: string[];
}

export interface BjtBundle {
  weeks: BjtWeek[];
  guides: BjtGuide[];
  items: BjtItem[];
  vocab: BjtVocab[];
}

/** Rough score on the 0–800 scale from a share of correct answers. The real test uses IRT; this is only a guide. */
export function bjtEstimate(correct: number, total: number): { score: number; level: string } {
  const score = total > 0 ? Math.round((correct / total) * 800) : 0;
  const level = score >= 600 ? 'J1+' : score >= 530 ? 'J1' : score >= 420 ? 'J2' : score >= 320 ? 'J3' : score >= 200 ? 'J4' : 'J5';
  return { score, level };
}
