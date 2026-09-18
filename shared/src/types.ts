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

export type BusinessCategory =
  | 'keigo'
  | 'email'
  | 'phone'
  | 'meeting'
  | 'meishi'
  | 'interview'
  | 'daily';

export interface BusinessItem {
  id: string;
  ja: string;
  reading: string;
  vi: string;
  note?: string;
  category: BusinessCategory;
  keigo?: { sonkei?: string; kenjou?: string; teinei?: string };
}

export interface BusinessTopic {
  id: string;
  title: string;
  intro: string;
  items: BusinessItem[];
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
