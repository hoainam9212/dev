import type { Lesson } from '@office-neko/shared';
import { basicsWelcome } from './basics-welcome';

const ALL: Lesson[] = [basicsWelcome];

export const LESSONS: Record<string, Lesson> = Object.fromEntries(ALL.map((l) => [l.id, l]));
