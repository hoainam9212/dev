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
import { V16 } from './goi/w16';
import { V01B } from './goi/w01b';
import { V02B } from './goi/w02b';
import { V03B } from './goi/w03b';
import { V04B } from './goi/w04b';
import { V05B } from './goi/w05b';
import { V06B } from './goi/w06b';
import { V07B } from './goi/w07b';
import { V09B } from './goi/w09b';
import { V10B } from './goi/w10b';
import { V11B } from './goi/w11b';
import { V13B } from './goi/w13b';
import { V14B } from './goi/w14b';
import { V16B } from './goi/w16b';

// Business vocabulary and set phrases by week (w01…w16).
// Rules and targets: docs/superpowers/specs/2026-11-13-bjt-design.md
// wNNb: the learner's own list of words missing from the app, sorted into the same weeks and themes
// (meanings and examples written for the app, not taken from the list's book).
export const BJT_VOCAB: BjtVocab[] = [
  ...V01, ...V01B, ...V02, ...V02B, ...V03, ...V03B, ...V04, ...V04B, ...V05, ...V05B, ...V06, ...V06B, ...V07, ...V07B,
  ...V09, ...V09B, ...V10, ...V10B, ...V11, ...V11B, ...V13, ...V13B, ...V14, ...V14B, ...V16, ...V16B,
];
