import { aichatSim, desktopSim, excelSim, fishGame, mouseSim, pptSim, typingSim, wordSim, type SimKind } from '@office-neko/shared';
import type { SimDefinition } from './types';
import { MouseSim } from './mouse/MouseSim';
import { DesktopSim } from './desktop/DesktopSim';
import { KeyboardSim } from './keyboard/KeyboardSim';
import { FishSim } from './fish/FishSim';
import { WordSim } from './word/WordSim';
import { ExcelSim } from './excel/ExcelSim';
import { PptSim } from './ppt/PptSim';
import { AiChatSim } from './aichat/AiChatSim';

/** Các trình mô phỏng đã có. Mỗi Component phải dùng `useReducer(def.reduce, initial)`. */
export const SIMS: Partial<Record<SimKind, SimDefinition>> = {
  mouse: { kind: 'mouse', Component: MouseSim, reduce: mouseSim.reduceMouse },
  desktop: { kind: 'desktop', Component: DesktopSim, reduce: desktopSim.reduceDesktop },
  keyboard: { kind: 'keyboard', Component: KeyboardSim, reduce: typingSim.reduceTyping },
  fish: { kind: 'fish', Component: FishSim, reduce: fishGame.reduceFish },
  word: { kind: 'word', Component: WordSim, reduce: wordSim.reduceWord },
  excel: { kind: 'excel', Component: ExcelSim, reduce: excelSim.reduceExcel },
  ppt: { kind: 'ppt', Component: PptSim, reduce: pptSim.reducePpt },
  aichat: { kind: 'aichat', Component: AiChatSim, reduce: aichatSim.reduceAiChat },
};
