export interface BadgeStats {
  completed: ReadonlySet<string>;
  bestWpm: number;
  streak: number;
  level: number;
}

export interface Badge {
  id: string;
  emoji: string;
  title: string;
  /** Cách đạt, hiện ở huy hiệu chưa có. */
  how: string;
  earned: (s: BadgeStats) => boolean;
}

const all = (...ids: string[]) => (s: BadgeStats) => ids.every((id) => s.completed.has(id));

export const BADGES: readonly Badge[] = [
  { id: 'first-step', emoji: '🐾', title: 'Bước chân đầu tiên', how: 'Học xong bài đầu tiên', earned: (s) => s.completed.size >= 1 },
  { id: 'fast-fingers', emoji: '⚡', title: 'Ngón tay thần tốc', how: 'Gõ 40 từ/phút', earned: (s) => s.bestWpm >= 40 },
  { id: 'word-writer', emoji: '📝', title: 'Cây bút Word', how: 'Xong dự án Đơn xin việc', earned: all('word.project') },
  {
    id: 'formula-wizard', emoji: '🧙', title: 'Phù thủy công thức',
    how: 'Xong chương Đếm, cộng có điều kiện và tra cứu',
    earned: all('excel.countif', 'excel.sumif', 'excel.vlookup', 'excel.text'),
  },
  { id: 'storyteller', emoji: '🎤', title: 'Người kể chuyện', how: 'Xong dự án PowerPoint', earned: all('ppt.project') },
  { id: 'ai-buddy', emoji: '🤖', title: 'Bạn đồng hành của AI', how: 'Xong dự án Báo cáo tuần', earned: all('ai.project') },
  { id: 'streak-7', emoji: '🔥', title: 'Chăm chỉ 7 ngày', how: 'Học 7 ngày liền', earned: (s) => s.streak >= 7 },
  { id: 'level-5', emoji: '🎓', title: 'Mèo chăm học', how: 'Lên cấp 5', earned: (s) => s.level >= 5 },
];

export function badgesEarned(s: BadgeStats): string[] {
  return BADGES.filter((b) => b.earned(s)).map((b) => b.id);
}
