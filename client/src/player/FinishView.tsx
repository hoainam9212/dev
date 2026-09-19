import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Lesson } from '@office-neko/shared';
import { Confetti } from '../components/Confetti';
import { Mochi } from '../components/Mochi';
import { useSound } from '../lib/sound';
import type { LessonResult } from './LessonPlayer';

export function FinishView({
  lesson, result, xpGained, nextId, saveError,
}: { lesson: Lesson; result: LessonResult; xpGained: number; nextId: string | null; saveError?: string }) {
  const sound = useSound();
  useEffect(() => sound('finish'), [sound]);
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 p-6 text-center">
      <Confetti />
      <Mochi mood="happy" size={170} />
      <h1 className="text-2xl font-extrabold">Hoàn thành: {lesson.title}</h1>
      <p aria-label={`${result.stars} trên 3 sao`} className="text-5xl tracking-widest">
        {'⭐'.repeat(result.stars)}<span className="opacity-25">{'⭐'.repeat(3 - result.stars)}</span>
      </p>
      <p className="text-lg font-bold">
        {xpGained > 0 ? `+${xpGained} XP` : 'Bạn đã có số sao này rồi, ôn lại như vậy rất tốt!'}
      </p>
      <p className="text-muted">Gợi ý đã dùng: {result.maxHint}/3 · Lần kiểm tra chưa đúng: {result.failures}</p>
      {saveError && <p role="alert" className="font-semibold text-rose-ink">{saveError}</p>}
      <div className="flex flex-wrap justify-center gap-3">
        {nextId && <Link to={`/lesson/${nextId}`} className="btn-primary">Bài tiếp theo →</Link>}
        <Link to="/" className="btn-soft">Về bản đồ</Link>
      </div>
    </div>
  );
}
