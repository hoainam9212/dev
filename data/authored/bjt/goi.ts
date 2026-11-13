import type { BjtVocab } from '@nihongo/shared';
import { V01 } from './goi/w01';
import { V02 } from './goi/w02';
import { V03 } from './goi/w03';
import { V04 } from './goi/w04';

// Business vocabulary and set phrases by week (w01…w16).
// Rules and targets: docs/superpowers/specs/2026-11-13-bjt-design.md
export const BJT_VOCAB: BjtVocab[] = [...V01, ...V02, ...V03, ...V04];
