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

const ALL: Lesson[] = [basicsWelcome, ...basicsMouse, ...basicsKeys, ...filesLessons('win'), ...filesLessons('mac'), ...typingLessons, ...WORD_BASICS, ...WORD_FORMAT, ...WORD_PARA, ...WORD_OBJECTS];

export const LESSONS: Record<string, Lesson> = Object.fromEntries(ALL.map((l) => [l.id, l]));
