import type { BjtItem } from '@nihongo/shared';
import { W01 } from './dokkai/w01';
import { W02 } from './dokkai/w02';
import { W03 } from './dokkai/w03';
import { W04 } from './dokkai/w04';
import { W05 } from './dokkai/w05';
import { W06 } from './dokkai/w06';
import { W07 } from './dokkai/w07';
import { W09 } from './dokkai/w09';
import { W10 } from './dokkai/w10';
import { W11 } from './dokkai/w11';
import { W13 } from './dokkai/w13';
import { W14 } from './dokkai/w14';
import { W16 } from './dokkai/w16';
import { MOCK1 } from './dokkai/mock1';
import { MOCK2 } from './dokkai/mock2';

// 読解 (語彙・文法, 表現読解, 総合読解): weekly practice w01…w16 and full tests mock1…mock3.
// Rules and targets: docs/superpowers/specs/2026-11-13-bjt-design.md
export const BJT_DOKKAI: BjtItem[] = [...W01, ...W02, ...W03, ...W04, ...W05, ...W06, ...W07, ...W09, ...W10, ...W11, ...W13, ...W14, ...W16, ...MOCK1, ...MOCK2];
