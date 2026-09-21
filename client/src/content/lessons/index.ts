import type { Lesson } from '@office-neko/shared';
import { basicsWelcome } from './basics-welcome';
import { basicsMouse } from './basics-mouse';
import { basicsKeys } from './basics-keys';
import { filesLessons } from './basics-files';
import { typingLessons } from './typing';
import { WORD_BASICS } from './word-basics';
import { WORD_FORMAT } from './word-format';
import { WORD_PARA } from './word-para';
import { WORD_OBJECTS } from './word-objects';
import { WORD_LONG } from './word-long';
import { WORD_PROJECT } from './word-project';
import { EXCEL_BASICS } from './excel-basics';
import { EXCEL_FORMAT } from './excel-format';
import { EXCEL_FORMULA } from './excel-formula';
import { EXCEL_ABSOLUTE } from './excel-absolute';

const ALL: Lesson[] = [basicsWelcome, ...basicsMouse, ...basicsKeys, ...filesLessons('win'), ...filesLessons('mac'), ...typingLessons, ...WORD_BASICS, ...WORD_FORMAT, ...WORD_PARA, ...WORD_OBJECTS, ...WORD_LONG, ...WORD_PROJECT, ...EXCEL_BASICS, ...EXCEL_FORMAT, ...EXCEL_FORMULA, ...EXCEL_ABSOLUTE];

export const LESSONS: Record<string, Lesson> = Object.fromEntries(ALL.map((l) => [l.id, l]));
