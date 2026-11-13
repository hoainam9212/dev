import type { BjtItem } from '@nihongo/shared';
import { W01 } from './chodokkai/w01';

// 聴読解 (状況把握, 資料聴読解, 総合聴読解): weekly practice w01…w16 and full tests mock1…mock3.
// Rules and targets: docs/superpowers/specs/2026-11-13-bjt-design.md
export const BJT_CHODOKKAI: BjtItem[] = [...W01];
