import type { BjtVocab } from '@nihongo/shared';
import { V01 } from './goi/w01';
import { V02 } from './goi/w02';
import { V03 } from './goi/w03';
import { V04 } from './goi/w04';
import { V05 } from './goi/w05';
import { V06 } from './goi/w06';
import { V07 } from './goi/w07';
import { V09 } from './goi/w09';
import { V10 } from './goi/w10';
import { V11 } from './goi/w11';
import { V13 } from './goi/w13';
import { V14 } from './goi/w14';

// Business vocabulary and set phrases by week (w01…w16).
// Rules and targets: docs/superpowers/specs/2026-11-13-bjt-design.md
export const BJT_VOCAB: BjtVocab[] = [...V01, ...V02, ...V03, ...V04, ...V05, ...V06, ...V07, ...V09, ...V10, ...V11, ...V13, ...V14];
