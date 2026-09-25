import { getT, type Dict } from '../i18n';
import { vi } from '../i18n/vi';
import { en } from '../i18n/en';

export function levelName(level: number, t: Dict = getT()): string {
  const names = t.progress.levelNames;
  return names[Math.min(names.length - 1, Math.max(0, level - 1))]!;
}

/** Both translations are kept so a language switch re-renders the same line; show it with pickText. */
export interface MascotLine {
  ja: string;
  vi: string;
  en: string;
}

type LineKey = keyof Dict['mascot'];

function line(ja: string, key: LineKey, n = 0): MascotLine {
  const text = (d: Dict) => {
    const v = d.mascot[key];
    return typeof v === 'function' ? v(n) : v;
  };
  return { ja, vi: text(vi), en: text(en) };
}

/** Pick a contextual greeting for the home page. Deterministic for the same inputs. */
export function pickMascotLine(ctx: { hour: number; streak: number; due: number }): MascotLine {
  if (ctx.due >= 20) return line('復習がたまってるよ！一緒にがんばろう！', 'manyDue', ctx.due);
  if (ctx.due > 0) return line('今日の復習、忘れないでね！', 'someDue', ctx.due);
  if (ctx.streak >= 30) return line('すごい！三十日連続だよ！', 'longStreak', ctx.streak);
  if (ctx.streak >= 7) return line('一週間続いてるね。えらい！', 'weekStreak', ctx.streak);
  if (ctx.hour < 11) return line('おはよう！今日もがんばろうね！', 'morning');
  if (ctx.hour < 18) return line('こんにちは！勉強の時間だよ〜', 'afternoon');
  return line('こんばんは！今日はどこまで進む？', 'evening');
}

export const STREAK_MILESTONES = [3, 7, 14, 30, 60, 100];
