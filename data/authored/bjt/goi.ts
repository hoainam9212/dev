import type { BjtVocab } from '@nihongo/shared';
import { V05 } from './goi/w05';
import { V06 } from './goi/w06';
import { V07 } from './goi/w07';

// Business vocabulary and set phrases by week (w01…w16).
// Rules and targets: docs/superpowers/specs/2026-11-13-bjt-design.md
export const BJT_VOCAB: BjtVocab[] = [...V05, ...V06, ...V07];
