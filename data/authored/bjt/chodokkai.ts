import type { BjtItem } from '@nihongo/shared';
import { W01 } from './chodokkai/w01';
import { W02 } from './chodokkai/w02';
import { W03 } from './chodokkai/w03';
import { W04 } from './chodokkai/w04';

// 聴読解 (状況把握, 資料聴読解, 総合聴読解): weekly practice w01…w16 and full tests mock1…mock3.
// Rules and targets: docs/superpowers/specs/2026-11-13-bjt-design.md
export const BJT_CHODOKKAI: BjtItem[] = [...W01, ...W02, ...W03, ...W04];
