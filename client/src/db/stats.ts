import { isDue, type ItemType, type ProgressItem } from '@nihongo/shared';
import type { SessionLog } from './db';
import { toState } from './srs';
import { todayStr } from '../store/streak';

const DAY = 86_400_000;
const LEARNED_INTERVAL = 21;

function dayOf(iso: string): string {
  return todayStr(new Date(iso));
}

/** XP per local day for the last `days` days (oldest first, today last). */
export function xpByDay(sessions: SessionLog[], days: number, today = new Date()): { day: string; label: string; xp: number }[] {
  const out: { day: string; label: string; xp: number }[] = [];
  const byDay = new Map<string, number>();
  for (const s of sessions) byDay.set(dayOf(s.startedAt), (byDay.get(dayOf(s.startedAt)) ?? 0) + s.xp);
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today.getTime() - i * DAY);
    const day = todayStr(d);
    out.push({ day, label: `${d.getDate()}/${d.getMonth() + 1}`, xp: byDay.get(day) ?? 0 });
  }
  return out;
}

export interface StatusCount {
  learning: number;
  learned: number;
  due: number;
}

/** Per item type: learning (interval < 21d), learned (≥ 21d), due now. */
export function statusCounts(progress: ProgressItem[], now = new Date()): Record<ItemType, StatusCount> {
  const out: Record<ItemType, StatusCount> = {
    vocab: { learning: 0, learned: 0, due: 0 },
    kanji: { learning: 0, learned: 0, due: 0 },
    grammar: { learning: 0, learned: 0, due: 0 },
  };
  for (const p of progress) {
    const c = out[p.type];
    if (!c) continue;
    if (p.interval >= LEARNED_INTERVAL) c.learned += 1;
    else c.learning += 1;
    if (isDue(toState(p), now)) c.due += 1;
  }
  return out;
}

/** Cards due per day for the next `days` days; overdue items count on day 0. */
export function dueForecast(progress: ProgressItem[], days: number, now = new Date()): { day: string; label: string; count: number }[] {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const out = Array.from({ length: days }, (_, i) => {
    const d = new Date(start.getTime() + i * DAY);
    return { day: todayStr(d), label: i === 0 ? 'Hôm nay' : `${d.getDate()}/${d.getMonth() + 1}`, count: 0 };
  });
  for (const p of progress) {
    const due = new Date(p.due).getTime();
    const idx = Math.max(0, Math.floor((due - start.getTime()) / DAY));
    if (idx < days) out[idx]!.count += 1;
  }
  return out;
}

export function todayStats(sessions: SessionLog[], today = new Date()): { sessions: number; xp: number } {
  const day = todayStr(today);
  const mine = sessions.filter((s) => dayOf(s.startedAt) === day);
  return { sessions: mine.length, xp: mine.reduce((a, s) => a + s.xp, 0) };
}
