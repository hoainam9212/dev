export const LEVEL_NAMES = ['Tân binh 🌱', 'Học viên 📖', 'Bạn của Sakura 🌸', 'Người kể chuyện 🎐', 'Samurai chữ 🗡️', 'Cao thủ 🎋', 'Sensei 🎓'];

export function levelName(level: number): string {
  return LEVEL_NAMES[Math.min(LEVEL_NAMES.length - 1, Math.max(0, level - 1))]!;
}

export interface MascotLine {
  ja: string;
  vi: string;
}

/** Pick a contextual greeting for the home page. Deterministic for the same inputs. */
export function pickMascotLine(ctx: { hour: number; streak: number; due: number }): MascotLine {
  if (ctx.due >= 20) return { ja: '復習がたまってるよ！一緒にがんばろう！', vi: `Có ${ctx.due} thẻ đến hạn rồi! Cùng ôn nhé!` };
  if (ctx.due > 0) return { ja: '今日の復習、忘れないでね！', vi: `Đừng quên ${ctx.due} thẻ ôn tập hôm nay nhé!` };
  if (ctx.streak >= 30) return { ja: 'すごい！三十日連続だよ！', vi: `Tuyệt vời! Chuỗi ${ctx.streak} ngày liên tiếp!` };
  if (ctx.streak >= 7) return { ja: '一週間続いてるね。えらい！', vi: `Đã ${ctx.streak} ngày liên tục. Giỏi lắm!` };
  if (ctx.hour < 11) return { ja: 'おはよう！今日もがんばろうね！', vi: 'Chào buổi sáng! Hôm nay cùng cố gắng nhé!' };
  if (ctx.hour < 18) return { ja: 'こんにちは！勉強の時間だよ〜', vi: 'Xin chào! Đến giờ học rồi~' };
  return { ja: 'こんばんは！今日はどこまで進む？', vi: 'Chào buổi tối! Hôm nay học đến đâu nào?' };
}

export const STREAK_MILESTONES = [3, 7, 14, 30, 60, 100];
