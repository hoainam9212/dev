import { desktopSim, fishGame, fishSim, mouseSim, typingSim, wordSim, type ImeMethod, type OS, type PracticeStep, type Spotlight, type TreeSpec } from '@office-neko/shared';

export function keyActions(raw: string, msPerKey = 150, start = 1000): typingSim.TypingAction[] {
  return [...raw].map((key, i) => ({ type: 'key', key, at: start + i * msPerKey }));
}

export function mousePractice(o: {
  game: mouseSim.MouseGame;
  total: number;
  task: string;
  hint: string;
  steps: string[];
}): PracticeStep<mouseSim.MouseState, mouseSim.MouseCheck, mouseSim.MouseAction> {
  const initial = mouseSim.mouseInitial(o.game, o.total);
  return {
    kind: 'practice',
    sim: 'mouse',
    task: o.task,
    initial,
    checks: [{ kind: 'mouseGame', minHits: o.total }],
    hints: [o.hint, { helpId: o.game === 'drag' ? 'mouse.basket' : 'mouse.target' }, o.steps],
    solution: mouseSim.mouseTargets(initial).map((id) => ({ type: 'hit', id })),
  };
}

export function typingPractice(o: {
  task: string;
  target: string;
  raw?: string;
  ime?: ImeMethod | null;
  mode?: typingSim.TypingMode;
  allowBackspace?: boolean;
  checks?: typingSim.TypingCheck[];
  hint: string;
  steps: string[];
}): PracticeStep<typingSim.TypingState, typingSim.TypingCheck, typingSim.TypingAction> {
  return {
    kind: 'practice',
    sim: 'keyboard',
    task: o.task,
    initial: typingSim.typingInitial({ target: o.target, ime: o.ime ?? null, mode: o.mode ?? 'drill', allowBackspace: o.allowBackspace ?? true }),
    checks: o.checks ?? [{ kind: 'typing', completeText: true }],
    hints: [o.hint, { helpId: 'keyboard.area' }, o.steps],
    solution: keyActions(o.raw ?? o.target),
  };
}

export function desktopPractice(o: {
  os: OS;
  tree: TreeSpec[];
  cwd?: string;
  task: string;
  checks: desktopSim.DesktopCheck[];
  spotlight: Spotlight;
  hint: string;
  steps: string[];
  /** Thao tác chuẩn bị trước (vd. bỏ sẵn một file vào thùng rác); không tính vào lịch sử hoàn tác. */
  setup?: (s0: desktopSim.DesktopState) => desktopSim.DesktopAction[];
  solve: (s0: desktopSim.DesktopState) => desktopSim.DesktopAction[];
}): PracticeStep<desktopSim.DesktopState, desktopSim.DesktopCheck, desktopSim.DesktopAction> {
  const fresh = desktopSim.desktopInitial(o.tree, o.os, o.cwd ?? '/');
  const prepared = (o.setup ? o.setup(fresh) : []).reduce(desktopSim.reduceDesktop, fresh);
  const initial = { ...prepared, past: [], selected: [], clipboard: null };
  return {
    kind: 'practice',
    sim: 'desktop',
    task: o.task,
    initial,
    checks: o.checks,
    hints: [o.hint, o.spotlight, o.steps],
    solution: o.solve(initial),
  };
}

/**
 * Bước thực hành "chơi Mèo bắt cá". Lời giải được sinh bằng cách chơi ngầm với
 * đúng seed của bài, nên test nội dung phát lại được và chứng minh bài qua được.
 */
export function fishPractice(o: {
  words: string[];
  minCaught: number;
  task: string;
  hint: string;
  steps: string[];
  seed?: number;
}): PracticeStep<fishGame.FishState, fishSim.FishCheck, fishGame.FishAction> {
  const initial = fishGame.fishInitial(o.words, o.seed ?? 20260921);
  return {
    kind: 'practice',
    sim: 'fish',
    task: o.task,
    initial,
    checks: [{ kind: 'fishGame', minCaught: o.minCaught }],
    hints: [o.hint, { helpId: 'fish.pond' }, o.steps],
    solution: fishSim.fishSolution(initial, o.minCaught),
  };
}

/**
 * Bước thực hành trên trình soạn thảo Word. `setup` dựng sẵn tài liệu đầu bài
 * (không tính vào lịch sử hoàn tác), `solve` là lời giải mẫu — luôn viết bằng
 * `selectText` chứ không bằng số vị trí, để sửa lời bài không làm hỏng lời giải.
 */
export function wordPractice(o: {
  text?: string;
  doc?: wordSim.WordDoc;
  task: string;
  checks: wordSim.WordCheck[];
  spotlight: Spotlight;
  hint: string;
  steps: string[];
  setup?: (s0: wordSim.WordState) => wordSim.WordAction[];
  solve: (s0: wordSim.WordState) => wordSim.WordAction[];
}): PracticeStep<wordSim.WordState, wordSim.WordCheck, wordSim.WordAction> {
  const fresh = wordSim.wordInitial({ doc: o.doc, text: o.text });
  const prepared = (o.setup ? o.setup(fresh) : []).reduce(wordSim.reduceWord, fresh);
  const initial: wordSim.WordState = { ...prepared, past: [], dialog: null };
  return {
    kind: 'practice',
    sim: 'word',
    task: o.task,
    initial,
    checks: o.checks,
    hints: [o.hint, o.spotlight, o.steps],
    solution: o.solve(initial),
  };
}
