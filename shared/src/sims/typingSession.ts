import type { CheckResult } from '../grading/core';
import { emptyIme, imeBackspace, imeInput, imeText, type ImeMethod, type ImeState } from '../ime';
import { accuracy, compareText, countCorrect, recordKey, wpm, type KeyStats } from '../typing';

export type TypingMode = 'drill' | 'words' | 'sentences' | 'passage' | 'test';

export interface TypingState {
  target: string;
  mode: TypingMode;
  ime: ImeMethod | null;
  allowBackspace: boolean;
  durationSec: number | null;
  typed: string;
  imeState: ImeState;
  keystrokes: number;
  correctKeys: number;
  startedAt: number | null;
  lastAt: number | null;
  finished: boolean;
  keyStats: KeyStats;
}

export type TypingAction = { type: 'key'; key: string; at: number } | { type: 'tick'; at: number };

export interface TypingCheck {
  kind: 'typing';
  minWpm?: number;
  minAccuracy?: number;
  completeText?: boolean;
}

export function typingInitial(o: {
  target: string;
  mode?: TypingMode;
  ime?: ImeMethod | null;
  allowBackspace?: boolean;
  durationSec?: number | null;
}): TypingState {
  return {
    target: o.target,
    mode: o.mode ?? 'passage',
    ime: o.ime ?? null,
    allowBackspace: o.allowBackspace ?? true,
    durationSec: o.durationSec ?? null,
    typed: '',
    imeState: emptyIme(),
    keystrokes: 0,
    correctKeys: 0,
    startedAt: null,
    lastAt: null,
    finished: false,
    keyStats: {},
  };
}

export function typedText(s: TypingState): string {
  return s.ime ? imeText(s.imeState) : s.typed;
}

function wrongCommitted(target: string, ime: ImeState): number {
  const t = [...target];
  return [...ime.done].filter((ch, i) => t[i] !== ch).length;
}

function timeUp(s: TypingState, at: number): boolean {
  return s.durationSec !== null && s.startedAt !== null && at - s.startedAt >= s.durationSec * 1000;
}

export function reduceTyping(s: TypingState, a: TypingAction): TypingState {
  if (s.finished) return s;
  if (a.type === 'tick') return timeUp(s, a.at) ? { ...s, finished: true, lastAt: s.startedAt! + s.durationSec! * 1000 } : s;
  if (timeUp(s, a.at)) return { ...s, finished: true, lastAt: s.startedAt! + s.durationSec! * 1000 };

  if (a.key === 'Backspace') {
    if (!s.allowBackspace) return s;
    return s.ime ? { ...s, imeState: imeBackspace(s.imeState) } : { ...s, typed: [...s.typed].slice(0, -1).join('') };
  }
  if ([...a.key].length !== 1) return s;

  const targetChars = [...s.target];
  let next: TypingState;
  let ok: boolean;
  if (s.ime) {
    const imeState = imeInput(s.imeState, a.key, s.ime);
    if ([...imeText(imeState)].length > targetChars.length) return s;
    ok = wrongCommitted(s.target, imeState) <= wrongCommitted(s.target, s.imeState);
    next = { ...s, imeState };
  } else {
    const typedChars = [...s.typed];
    if (typedChars.length >= targetChars.length) return s;
    ok = a.key === targetChars[typedChars.length];
    next = { ...s, typed: s.typed + a.key };
  }
  const startedAt = s.startedAt ?? a.at;
  const done = typedText(next) === s.target;
  return {
    ...next,
    startedAt,
    lastAt: a.at,
    keystrokes: s.keystrokes + 1,
    correctKeys: s.correctKeys + (ok ? 1 : 0),
    keyStats: recordKey(s.keyStats, a.key, ok),
    finished: done,
  };
}

export function typingMetrics(s: TypingState): { wpm: number; accuracy: number; correctChars: number; elapsedMs: number; complete: boolean } {
  const text = typedText(s);
  const correctChars = countCorrect(s.target, text);
  let elapsedMs = s.startedAt !== null && s.lastAt !== null ? s.lastAt - s.startedAt : 0;
  if (s.durationSec !== null) elapsedMs = Math.min(elapsedMs, s.durationSec * 1000);
  return {
    wpm: wpm(correctChars, elapsedMs),
    accuracy: accuracy(s.correctKeys, s.keystrokes),
    correctChars,
    elapsedMs,
    complete: text === s.target,
  };
}

export function gradeTyping(s: TypingState, c: TypingCheck): CheckResult {
  const m = typingMetrics(s);
  const parts: string[] = [];
  let ok = true;
  if ((c.minWpm !== undefined || c.minAccuracy !== undefined) && !s.finished) {
    return { ok: false, messageVi: 'Hãy gõ hết bài để Mochi tính tốc độ nhé.' };
  }
  if (c.minWpm !== undefined) {
    ok = ok && m.wpm >= c.minWpm;
    parts.push(`tốc độ ${m.wpm} WPM (cần ≥ ${c.minWpm})`);
  }
  if (c.minAccuracy !== undefined) {
    ok = ok && m.accuracy >= c.minAccuracy;
    parts.push(`độ chính xác ${m.accuracy}% (cần ≥ ${c.minAccuracy}%)`);
  }
  if (c.completeText) {
    ok = ok && m.complete;
    parts.push(m.complete ? 'đã gõ đúng hết' : `còn ${compareText(s.target, typedText(s)).filter((x) => x !== 'correct').length} ký tự chưa đúng`);
  }
  const text = parts.join(', ');
  return { ok, messageVi: text.charAt(0).toUpperCase() + text.slice(1) + '.' };
}
