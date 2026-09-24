export type Level = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
export const LEVELS: Level[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

export interface Vocab {
  id: string;
  level: Level;
  word: string;
  reading: string;
  meanings: string[];
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
}

export interface Grammar {
  id: string;
  level: Level;
  title: string;
  meaning: string;
  formation: string;
  examples: GrammarExample[];
}

export interface Sentence {
  id: string;
  level: Level;
  ja: string;
  en: string;
}

export interface Question {
  id: string;
  prompt: string;
  choices: string[];
  answer: number;
  explain?: string;
}

export interface ReadingLesson {
  id: string;
  level: Level;
  title: string;
  /** Theme shown as a filter chip (Vietnamese), e.g. "Công nghệ". */
  topic?: string;
  body: string;
  vocab: { word: string; reading: string; vi: string }[];
  questions: Question[];
}

export interface ListeningLine {
  speaker: string;
  ja: string;
  vi: string;
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
  note?: string;
  category: BusinessCategory;
  keigo?: { sonkei?: string; kenjou?: string; teinei?: string };
  /** Example sentence (glossary terms). */
  example?: { ja: string; vi: string };
  /** The blunt/inappropriate way to say it (rephrase topics); `ja` is the recommended wording. */
  ng?: string;
}

export interface ScenarioLine {
  /** true = the learner's line (spoken in roleplay). */
  me: boolean;
  ja: string;
  vi: string;
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
