import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ACCESSORIES, BADGES, type AccessoryId, type Lesson } from '@office-neko/shared';
import { Confetti } from '../components/Confetti';
import { Mochi } from '../components/Mochi';
import { useSound } from '../lib/sound';
import { useEasyMode } from '../lib/easy';
import type { LessonResult } from './LessonPlayer';

/** Chế độ dễ dùng: thay XP và con số bằng một câu khen theo số sao. */
const EASY_PRAISE: Record<number, string> = {
  3: 'Tuyệt vời! Bạn làm rất giỏi.',
  2: 'Giỏi lắm! Lần sau thử ít gợi ý hơn nhé.',
  1: 'Bạn đã làm xong rồi! Học lại lúc nào cũng được.',
};

export function FinishView({
  lesson, result, xpGained, nextId, saveError, newBadges = [], newAccessories = [],
}: {
  lesson: Lesson; result: LessonResult; xpGained: number; nextId: string | null; saveError?: string;
  newBadges?: string[]; newAccessories?: AccessoryId[];
}) {
  const sound = useSound();
  const easy = useEasyMode();
  useEffect(() => sound('finish'), [sound]);
  // Dễ dùng: XP, huy hiệu vẫn được ghi, chỉ không hiện ra.
  const badges = easy ? [] : BADGES.filter((b) => newBadges.includes(b.id));
  const gifts = easy ? [] : ACCESSORIES.filter((a) => newAccessories.includes(a.id)).map((a) => a.name);
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 p-6 text-center">
      <Confetti />
      <Mochi mood="happy" size={170} />
      <h1 className="text-2xl font-extrabold">Hoàn thành: {lesson.title}</h1>
      <p aria-label={`${result.stars} trên 3 sao`} className="text-5xl tracking-widest">
        {'⭐'.repeat(result.stars)}<span className="opacity-25">{'⭐'.repeat(3 - result.stars)}</span>
      </p>
      {easy ? (
        <p className="text-lg font-bold">{EASY_PRAISE[result.stars] ?? EASY_PRAISE[1]}</p>
      ) : (
        <>
          <p className="text-lg font-bold">
            {xpGained > 0 ? `+${xpGained} XP` : 'Bạn đã có số sao này rồi, ôn lại như vậy rất tốt!'}
          </p>
          <p className="text-muted">Gợi ý đã dùng: {result.maxHint}/3 · Lần kiểm tra chưa đúng: {result.failures}</p>
        </>
      )}
      {badges.length > 0 && (
        <section className="w-full rounded-2xl border-2 border-peach bg-peach/15 p-4">
          <h2 className="text-lg font-extrabold">Huy hiệu mới!</h2>
          <ul className="mt-2 flex flex-wrap justify-center gap-3">
            {badges.map((b) => (
              <li key={b.id} className="flex items-center gap-2 font-bold">
                <span aria-hidden className="text-3xl">{b.emoji}</span>
                <span>{b.title}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
      {gifts.length > 0 && (
        <p className="font-bold">Mochi có phụ kiện mới: {gifts.join(', ')}! Vào Cài đặt để đeo thử.</p>
      )}
      {saveError && <p role="alert" className="font-semibold text-rose-ink">{saveError}</p>}
      <div className="flex flex-wrap justify-center gap-3">
        {nextId && <Link to={`/lesson/${nextId}`} className="btn-primary">Bài tiếp theo →</Link>}
        <Link to="/" className="btn-soft">Về bản đồ</Link>
      </div>
    </div>
  );
}
