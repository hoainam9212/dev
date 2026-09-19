import { normalize, type FaqEntry, type GlossaryEntry } from '@office-neko/shared';
import glossaryRaw from './glossary.json';
import faqRaw from './faq.json';

export { TRACKS } from './tracks';
export { LESSONS } from './lessons';
export { HELP_IDS } from './help-ids';

export const GLOSSARY = glossaryRaw as unknown as GlossaryEntry[];
export const FAQ = faqRaw as unknown as FaqEntry[];

const byKey = new Map<string, GlossaryEntry>();
for (const e of GLOSSARY) {
  byKey.set(e.id, e);
  byKey.set(normalize(e.term), e);
}

/** Tìm thuật ngữ theo id hoặc theo tên tiếng Anh (không phân biệt hoa thường/dấu). */
export function findTerm(key: string): GlossaryEntry | undefined {
  return byKey.get(key) ?? byKey.get(normalize(key));
}
