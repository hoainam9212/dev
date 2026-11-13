import type { BjtItem } from '@nihongo/shared';
import { W05 } from './dokkai/w05';
import { W06 } from './dokkai/w06';
import { W07 } from './dokkai/w07';
import { MOCK1 } from './dokkai/mock1';

// 読解 (語彙・文法, 表現読解, 総合読解): weekly practice w01…w16 and full tests mock1…mock3.
// Rules and targets: docs/superpowers/specs/2026-11-13-bjt-design.md
export const BJT_DOKKAI: BjtItem[] = [...W05, ...W06, ...W07, ...MOCK1];
