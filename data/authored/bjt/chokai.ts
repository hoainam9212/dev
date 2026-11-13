import type { BjtItem } from '@nihongo/shared';
import { W01 } from './chokai/w01';
import { W02 } from './chokai/w02';
import { W03 } from './chokai/w03';
import { W04 } from './chokai/w04';
import { W05 } from './chokai/w05';
import { W06 } from './chokai/w06';
import { W07 } from './chokai/w07';

// 聴解 (場面把握, 発言聴解, 総合聴解): weekly practice w01…w16 and full tests mock1…mock3.
// Rules and targets: docs/superpowers/specs/2026-11-13-bjt-design.md
export const BJT_CHOKAI: BjtItem[] = [...W01, ...W02, ...W03, ...W04, ...W05, ...W06, ...W07];
