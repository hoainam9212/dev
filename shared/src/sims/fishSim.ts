import type { CheckResult } from '../grading/core';
import { reduceFish, type FishAction, type FishState } from '../games/fish';

export interface FishCheck {
  kind: 'fishGame';
  /** Số cá phải bắt được trong một lượt chơi (chưa hết mạng). */
  minCaught: number;
}

export function gradeFish(s: FishState, c: FishCheck): CheckResult {
  if (s.caught >= c.minCaught) {
    return { ok: true, messageVi: `Bạn bắt được ${s.caught} con cá rồi — giỏi quá!` };
  }
  if (s.over) {
    return { ok: false, messageVi: `Hết mạng mất rồi, mới bắt được ${s.caught}/${c.minCaught} con. Bấm "Chơi lại" thử tiếp nhé!` };
  }
  return { ok: false, messageVi: `Bắt thêm nhé: ${s.caught}/${c.minCaught} con cá.` };
}

/**
 * Chơi ngầm một lượt để sinh `solution` cho bài học: cứ nhích thời gian tới khi
 * có cá, rồi gõ đúng chữ của con cá thấp nhất. Nhờ engine có seed cố định, cùng
 * một `initial` luôn cho ra cùng một chuỗi thao tác — test nội dung phát lại
 * chuỗi này để chứng minh bài học qua được.
 */
export function fishSolution(initial: FishState, minCaught: number, tickMs = 120): FishAction[] {
  const actions: FishAction[] = [];
  const play = (a: FishAction, s: FishState): FishState => {
    actions.push(a);
    return reduceFish(s, a);
  };
  let s = initial;
  // Trần vòng lặp: lời giải hỏng thì dừng hẳn thay vì treo máy khi build nội dung.
  for (let guard = 0; s.caught < minCaught && !s.over && guard < 20_000; guard++) {
    const lowest = [...s.fish].sort((a, b) => b.y - a.y)[0];
    if (!lowest) {
      s = play({ type: 'tick', dt: tickMs }, s);
      continue;
    }
    for (const ch of lowest.word) s = play({ type: 'key', key: ch }, s);
    if (s.input) s = play({ type: 'key', key: 'Escape' }, s);
  }
  return actions;
}
