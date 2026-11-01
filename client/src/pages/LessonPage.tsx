import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { levelFromXp, newlyUnlocked, nextLessonId, unlockState, type AccessoryId } from '@office-neko/shared';
import { db } from '../db/db';
import { LESSONS, TRACKS } from '../content';
import { useOs, useProfileId, useTestedOut, useUnlockAll } from '../db/profile';
import { recordLessonResult } from '../progress/record';
import { awardBadges } from '../progress/badges';
import { useCompleted } from '../progress/useStats';
import { LessonPlayer, type LessonResult } from '../player/LessonPlayer';
import { FinishView } from '../player/FinishView';

export function LessonPage({ id }: { id: string }) {
  const lesson = LESSONS[id];
  const navigate = useNavigate();
  const os = useOs();
  const unlockAll = useUnlockAll();
  const testedOut = useTestedOut();
  const [done, setDone] = useState<{
    result: LessonResult; xpGained: number; newBadges?: string[]; newAccessories?: AccessoryId[]; saveError?: string;
  } | null>(null);
  const profileId = useProfileId();
  const { completed, loaded } = useCompleted(profileId);

  const onFinish = useCallback(
    async (result: LessonResult) => {
      try {
        if (!profileId) throw new Error('Chưa chọn người học');
        const { xpGained } = await recordLessonResult({ profileId, lessonId: id, stars: result.stars, hintsUsed: result.maxHint, timeMs: result.timeMs });
        // Lỗi trao huy hiệu không được làm mất kết quả bài học vừa lưu.
        const newBadges = await awardBadges(profileId).catch(() => []);
        const xp = (await db.profiles.get(profileId))?.xp ?? 0;
        const newAccessories = newlyUnlocked(levelFromXp(xp - xpGained).level, levelFromXp(xp).level);
        setDone({ result, xpGained, newBadges, newAccessories });
      } catch {
        setDone({ result, xpGained: 0, saveError: 'Chưa lưu được kết quả bài học này, nhưng bạn vẫn có thể học tiếp. Hãy thử lại sau nhé.' });
      }
    },
    [id, profileId],
  );
  const onExit = useCallback(() => navigate('/'), [navigate]);

  if (!lesson) {
    return (
      <div className="card mx-auto mt-10 max-w-md space-y-3 p-6 text-center">
        <p className="text-lg font-bold">Không tìm thấy bài học này 😿</p>
        <Link to="/" className="btn-primary">Về bản đồ</Link>
      </div>
    );
  }
  if (lesson.os && lesson.os !== os) {
    return (
      <div className="card mx-auto mt-10 max-w-md space-y-3 p-6 text-center">
        <p className="text-lg font-bold">Bài này dành cho máy {lesson.os === 'mac' ? 'Mac' : 'Windows'} 🐾</p>
        <p className="text-muted">Bạn có thể đổi hệ điều hành trong Cài đặt nếu cần.</p>
        <Link to="/" className="btn-primary">Về bản đồ</Link>
      </div>
    );
  }
  if (!loaded) return null;
  if (!done && !unlockState(TRACKS, LESSONS, os, completed, unlockAll, testedOut).lessonUnlocked.has(id)) {
    return (
      <div className="card mx-auto mt-10 max-w-md space-y-3 p-6 text-center">
        <p className="text-lg font-bold">Bài này chưa mở khoá 🔒</p>
        <p className="text-muted">Hãy học xong bài trước đó trên bản đồ nhé.</p>
        <Link to="/" className="btn-primary">Về bản đồ</Link>
      </div>
    );
  }
  if (done) {
    return (
      <FinishView
        lesson={lesson}
        result={done.result}
        xpGained={done.xpGained}
        nextId={nextLessonId(TRACKS, LESSONS, os, id)}
        saveError={done.saveError}
        newBadges={done.newBadges}
        newAccessories={done.newAccessories}
      />
    );
  }
  return <LessonPlayer lesson={lesson} onFinish={onFinish} onExit={onExit} />;
}
