import type { BjtItem } from '@nihongo/shared';
import { W09 } from './dokkai/w09';
import { W10 } from './dokkai/w10';
import { W11 } from './dokkai/w11';

// 読解 (語彙・文法, 表現読解, 総合読解): weekly practice w01…w16 and full tests mock1…mock3.
// Rules and targets: docs/superpowers/specs/2026-11-13-bjt-design.md
export const BJT_DOKKAI: BjtItem[] = [...W09, ...W10, ...W11];
