import type { Lesson } from '@office-neko/shared';
import { basicsWelcome } from './basics-welcome';
import { basicsMouse } from './basics-mouse';
import { basicsKeys } from './basics-keys';
import { filesLessons } from './basics-files';
import { typingLessons } from './typing';

const ALL: Lesson[] = [basicsWelcome, ...basicsMouse, ...basicsKeys, ...filesLessons('win'), ...filesLessons('mac'), ...typingLessons];

export const LESSONS: Record<string, Lesson> = Object.fromEntries(ALL.map((l) => [l.id, l]));
