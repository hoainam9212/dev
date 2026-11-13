import type { BjtItem } from '@nihongo/shared';
import { W01 } from './dokkai/w01';
import { W02 } from './dokkai/w02';

// 読解 (語彙・文法, 表現読解, 総合読解): weekly practice w01…w16 and full tests mock1…mock3.
// Rules and targets: docs/superpowers/specs/2026-11-13-bjt-design.md
export const BJT_DOKKAI: BjtItem[] = [...W01, ...W02];
