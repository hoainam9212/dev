import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const DATA_DIR = path.dirname(fileURLToPath(new URL('../package.json', import.meta.url)));
export const RAW_DIR = path.join(DATA_DIR, 'raw');
export const OUT_DIR = path.resolve(DATA_DIR, '..', 'client', 'public', 'content');
export const KANJIVG_TAG = 'r20250816';

export interface Source {
  url: string;
  file: string;
  kind: 'plain' | 'bz2' | 'zip-kanjivg';
}

export const SOURCES: Source[] = [
  ...['n5', 'n4', 'n3', 'n2', 'n1'].map((l) => ({
    url: `https://raw.githubusercontent.com/elzup/jlpt-word-list/master/src/${l}.csv`,
    file: `vocab/${l}.csv`,
    kind: 'plain' as const,
  })),
  {
    url: 'https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json',
    file: 'kanji.json',
    kind: 'plain',
  },
  {
    url: 'https://hanabira.org/downloads/csv/hanabira_all_jlpt_grammar.csv',
    file: 'grammar.csv',
    kind: 'plain',
  },
  {
    url: 'https://downloads.tatoeba.org/exports/per_language/jpn/jpn_sentences.tsv.bz2',
    file: 'tatoeba/jpn_sentences.tsv',
    kind: 'bz2',
  },
  {
    url: 'https://downloads.tatoeba.org/exports/per_language/jpn/jpn-eng_links.tsv.bz2',
    file: 'tatoeba/jpn-eng_links.tsv',
    kind: 'bz2',
  },
  {
    url: 'https://downloads.tatoeba.org/exports/per_language/eng/eng_sentences.tsv.bz2',
    file: 'tatoeba/eng_sentences.tsv',
    kind: 'bz2',
  },
  {
    url: `https://github.com/KanjiVG/kanjivg/releases/download/${KANJIVG_TAG}/kanjivg-${KANJIVG_TAG.slice(1)}-main.zip`,
    file: 'kanjivg/.done',
    kind: 'zip-kanjivg',
  },
];
