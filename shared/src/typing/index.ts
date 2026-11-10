export type CharState = 'pending' | 'correct' | 'wrong';

export function compareText(target: string, typed: string): CharState[] {
  const t = [...target];
  const y = [...typed];
  return t.map((ch, i) => (i >= y.length ? 'pending' : y[i] === ch ? 'correct' : 'wrong'));
}

export function countCorrect(target: string, typed: string): number {
  return compareText(target, typed).filter((s) => s === 'correct').length;
}

export function wpm(correctChars: number, elapsedMs: number): number {
  if (elapsedMs <= 0) return 0;
  return Math.round(correctChars / 5 / (elapsedMs / 60_000));
}

export function accuracy(correctKeys: number, totalKeys: number): number {
  if (totalKeys === 0) return 100;
  return Math.round((correctKeys / totalKeys) * 100);
}

/**
 * Độ chính xác cho bài có Telex/VNI: đếm theo **chữ đã ghép dấu**, không theo phím (gõ "đ" cần `dd`, "ố" cần `oos`
 * nên số phím không bằng số chữ).
 *
 * - `typed`: chữ đã soạn (cả phần đang ghép), so với `target` từng ký tự.
 * - `wrongCommits`: số lần một phím làm tăng số chữ sai **đã chốt**. Reducer đã có sẵn số này:
 *   `keystrokes − correctKeys`.
 *
 * Lỗi = max(`wrongCommits`, số chữ đang sai). Chữ sai đã chốt rồi mới sửa vẫn tính, vì `wrongCommits` không giảm.
 * Sửa bằng Backspace khi chữ chưa chốt thì không tính. Một phím chốt một lúc nhiều chữ sai (cả một từ) đếm là một
 * lỗi đã chốt; nếu từ đó còn nằm đó, số chữ đang sai đếm đủ.
 * Kết quả = chữ đúng / (chữ đúng + lỗi).
 */
export function composedAccuracy(target: string, typed: string, wrongCommits: number): number {
  const states = compareText(target, typed).filter((s) => s !== 'pending');
  const correct = states.filter((s) => s === 'correct').length;
  const mistakes = Math.max(wrongCommits, states.length - correct);
  return accuracy(correct, correct + mistakes);
}

export type KeyStats =Record<string, { hit: number; miss: number }>;

export function recordKey(stats: KeyStats, key: string, ok: boolean): KeyStats {
  const k = key.toLowerCase();
  const prev = stats[k] ?? { hit: 0, miss: 0 };
  return { ...stats, [k]: ok ? { ...prev, hit: prev.hit + 1 } : { ...prev, miss: prev.miss + 1 } };
}

export function weakestKeys(stats: KeyStats, n = 5, minAttempts = 3): string[] {
  return Object.entries(stats)
    .map(([key, s]) => ({ key, total: s.hit + s.miss, miss: s.miss }))
    .filter((e) => e.total >= minAttempts && e.miss > 0)
    .sort((a, b) => b.miss / b.total - a.miss / a.total || b.miss - a.miss)
    .slice(0, n)
    .map((e) => e.key);
}

export * from './keyboard';
