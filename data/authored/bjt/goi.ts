import type { BjtVocab } from '@nihongo/shared';
import { V09 } from './goi/w09';
import { V10 } from './goi/w10';

// Business vocabulary and set phrases by week (w01…w16).
// Rules and targets: docs/superpowers/specs/2026-11-13-bjt-design.md
export const BJT_VOCAB: BjtVocab[] = [...V09, ...V10];
