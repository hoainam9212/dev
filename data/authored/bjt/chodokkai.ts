import type { BjtItem } from '@nihongo/shared';
import { W01 } from './chodokkai/w01';
import { W02 } from './chodokkai/w02';
import { W03 } from './chodokkai/w03';
import { W04 } from './chodokkai/w04';
import { W05 } from './chodokkai/w05';
import { W06 } from './chodokkai/w06';
import { W07 } from './chodokkai/w07';
import { W09 } from './chodokkai/w09';
import { W10 } from './chodokkai/w10';
import { W11 } from './chodokkai/w11';
import { W13 } from './chodokkai/w13';
import { W14 } from './chodokkai/w14';
import { W16 } from './chodokkai/w16';
import { MOCK1 } from './chodokkai/mock1';
import { MOCK2 } from './chodokkai/mock2';

// 聴読解 (状況把握, 資料聴読解, 総合聴読解): weekly practice w01…w16 and full tests mock1…mock3.
// Rules and targets: docs/superpowers/specs/2026-11-13-bjt-design.md
export const BJT_CHODOKKAI: BjtItem[] = [...W01, ...W02, ...W03, ...W04, ...W05, ...W06, ...W07, ...W09, ...W10, ...W11, ...W13, ...W14, ...W16, ...MOCK1, ...MOCK2];
